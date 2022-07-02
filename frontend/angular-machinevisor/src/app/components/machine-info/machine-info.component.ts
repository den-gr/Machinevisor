import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
  @Input() machineID:any;

  constructor(
    public navService: NavigationService, 
    public buttonService: OnOffButtonService, 
    private apiService: APIService, 
    public datepipe: DatePipe,
    private socketService: SocketService) { }

  name = '';
  status = '...';
  photo = '';
  infoMix = Array()
  valuesMix = Array()

  ngOnInit(): void {

    this.socketService.getSocket().on('update', (msg: string) => {
      let log: Log = JSON.parse(msg);
      console.log("receive mode: ", log.machine_id);
      this.status = log.state;
      this.buttonService.setIsOnChecked(log.state !== 'OFF');
    });

    this.apiService.getMachineInfo(this.machineID).subscribe(data => {
      this.photo = environment.apiUrl + data.img_uri;

      console.log("machine -> " + data.production_year);
      this.name = data.machine_name;

      const prodY = this.datepipe.transform(data.production_year, 'dd/MM/yyyy');
      const lastR = this.datepipe.transform(data.last_revision, 'dd/MM/yyyy');

      let info = Array({"Weight":data.weight, "Brand":data.brand, "Prod. year":prodY, 
      "Last rev.":lastR, "Contacts":data.client_service_number})

      let infoKey = Object.keys(info[0])
      let infoVal = Object.values(info[0])

      for(let i=0; i<infoKey.length; i++){
        this.infoMix.push({key:infoKey[i], value:infoVal[i]})
      }
    });
    
    //socket
    let values = Array({"Value1":["123", true], "Value2":["456", false], "Value3":["789", true], "Value4":["1011", true], "Value5":["1213", true]})

    let valuesKey = Object.keys(values[0])
    let valuesVal = Object.values(values[0])

    for(let i=0; i<valuesKey.length; i++){
      this.valuesMix.push({key:valuesKey[i], value:valuesVal[i][0], error:valuesVal[i][1]})
    }

    console.log(this.valuesMix)
  }

}
