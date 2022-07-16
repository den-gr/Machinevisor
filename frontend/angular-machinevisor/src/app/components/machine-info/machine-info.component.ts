import { DatePipe } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Log } from 'src/app/utilities/dataInterfaces/log';
import { APIService } from 'src/app/utilities/services/APIService/api.service';
import { NavigationService } from 'src/app/utilities/services/navigationService/navigation.service';
import { OnOffButtonService } from 'src/app/utilities/services/on-off-buttonService/on-off-button.service';
import { SocketService } from 'src/app/utilities/services/socketService/socket.service';
import { environment } from 'src/environments/environment.prod';

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
  socketData = Array();
  infoMix = Array();
  isMobile = false;

  ngOnInit(): void {

    this.isMobile = window.screen.width <= 821;

    this.socketService.getSocket().on('update', (msg: string) => {
      let log: Log = JSON.parse(msg);
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
        this.buttonService.setIsOnChecked(log.state !== 'OFF');
        this.onInit = false;
      }

      let tempErr = log.allarm? log.allarm.includes('temperature') : false
      let consErr = log.allarm? log.allarm.includes('kWatt') : false
      let oilErr = log.allarm? log.allarm.includes('machine_oil_level') : false

      this.socketData[0] = {key: 'Temperature', val : log.temperature, unit:'°C', error : !tempErr}
      this.socketData[1] = {key: 'Energy consumption', val : log.kWatt, unit:'KWatt', error : !consErr}
      this.socketData[2] = {key: 'Working time', val : log.working_time, unit:'s', error: true}
    
      if(log.machine_oil_level){
        this.socketData[3] = {key: 'Oil percentage', val : log.machine_oil_level, unit:'%', error : !oilErr};
      }
      
    });

    this.apiService.getMachineInfo(this.machineID).subscribe(data => {
      this.photo = environment.apiUrl + data.img_uri;

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

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.isMobile = window.innerWidth <= 821;
  }

}
