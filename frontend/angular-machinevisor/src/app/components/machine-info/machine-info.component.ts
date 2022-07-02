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

  name = '';
  status = '...';
  photo = '';
  temp: Values = {val : 0, error : true};
  cons: Values = {val : 0, error : true};
  time: Values = {val : 0, error : true};
  infoMix = Array();

  ngOnInit(): void {

    this.socketService.getSocket().on('update', (msg: string) => {
      let log: Log = JSON.parse(msg);
      console.log("receive mode: ", log);
      this.status = log.state;
      this.buttonService.setIsOnChecked(log.state !== 'OFF');

      this.temp = {val : log.temperature, error : true};
      this.cons = {val : log.kWatt, error : true};
      this.time = {val : log.working_time, error : true};      
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
