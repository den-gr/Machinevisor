import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Log } from 'src/app/utilities/dataInterfaces/log';
import { APIService } from 'src/app/utilities/services/APIService/api.service';
import { NavigationService } from 'src/app/utilities/services/navigationService/navigation.service';
import { OnOffButtonService } from 'src/app/utilities/services/on-off-buttonService/on-off-button.service';
import { SocketService } from 'src/app/utilities/services/socketService/socket.service';
import { environment } from 'src/environments/environment.prod';

export interface Values{
  val: number,
  error: boolean,
}

@Component({
  selector: 'app-machine-info',
  templateUrl: './machine-info.component.html',
  styleUrls: ['./machine-info.component.scss']
})

export class MachineInfoComponent implements OnInit {
  @Input() machineID: any;

  constructor(
    public navService: NavigationService,
    public buttonService: OnOffButtonService,
    private apiService: APIService,
    public datepipe: DatePipe,
    private socketService: SocketService) { }

  onInit = true;
  name = '';
  status = '...';
  mode = '';
  photo = '';
  temp: Values = {val : 0, error : true};
  cons: Values = {val : 0, error : true};
  time: Values = {val : 0, error : true};
  oil: Values = {val : 0, error : true};
  infoMix = Array();
  isOil = false;

  ngOnInit(): void {

    this.socketService.getSocket().on('update', (msg: string) => {
      let log: Log = JSON.parse(msg);
      console.log("-> ", log);
      this.status = log.state;
      if(this.status !== "OFF"){
        let tmp = '';
        tmp = log.modality.toLowerCase()
        tmp = tmp.replaceAll('_', ' ');
        this.mode = " - " + tmp;
      }else{
        this.mode = '';
      }
      
      if(this.onInit){
        this.buttonService.setIsOnChecked(log.state !== 'OFF');// <- problema qui
        this.onInit = false;
      }

      let tempErr = false;
      let consErr = false;
      let timeErr = false;
      let oilErr = false;

      if(log.allarm){
        tempErr = log.allarm.includes('temperature')
        consErr = log.allarm.includes('kWatt')
        timeErr = log.allarm.includes('working_time')
        oilErr = log.allarm.includes('machine_oil_level')
      }
      
      if(log.machine_oil_level){
        this.isOil = true;
        this.oil = {val : log.machine_oil_level, error : !oilErr};
      }
      this.temp = {val : log.temperature, error : !tempErr};
      this.cons = {val : log.kWatt, error : !consErr};
      this.time = {val : log.working_time, error : !timeErr};    
    });

    this.apiService.getMachineInfo(this.machineID).subscribe(data => {
      this.photo = environment.apiUrl + data.img_uri;

      console.log("machine -> " + data.production_year);
      this.name = data.machine_name;

      const prodY = this.datepipe.transform(data.production_year, 'dd/MM/yyyy');
      const lastR = this.datepipe.transform(data.last_revision, 'dd/MM/yyyy');

      let info = Array({
        "Weight": data.weight, "Brand": data.brand, "Prod. year": prodY,
        "Last rev.": lastR, "Contacts": data.client_service_number
      })

      let infoKey = Object.keys(info[0])
      let infoVal = Object.values(info[0])

      for (let i = 0; i < infoKey.length; i++) {
        this.infoMix.push({ key: infoKey[i], value: infoVal[i] })
      }
    });
  }

}
