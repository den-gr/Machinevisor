import { Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Log } from 'src/app/utilities/dataInterfaces/log';
import { Period } from 'src/app/utilities/dataInterfaces/periods';
import { APIService } from 'src/app/utilities/services/APIService/api.service';
import { SocketService } from 'src/app/utilities/services/socketService/socket.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit, OnDestroy {

  @ViewChild('log-card-div', { read: ViewContainerRef }) logCardDiv: any;

  machineID: number;
  machineName = ''
  machineLogs = Array();
  components = [];

  periods: Period[] = [
    {value: '0', viewValue: 'Real time'},
    {value: '10', viewValue: '10 logs'},
    {value: '20', viewValue: '20 logs'},
    {value: '50', viewValue: '50 logs'},
    {value: '100', viewValue: '100 logs'},
    {value: '150', viewValue: '150 logs'},
    {value: '200', viewValue: '200 logs'},
    {value: '500', viewValue: '500 logs'},
  ];

  selectedValue: string;

  constructor(private routes: ActivatedRoute, private apiService: APIService, private socketService: SocketService) { }

  onChange(){

    this.machineLogs = [];
    if(this.selectedValue == '0'){
      this.socketService.subscribe(this.machineID);
      this.socketService.getSocket().on('update', (msg: string) => {
        console.log(".");
        let log: Log = JSON.parse(msg);
        this.machineLogs.push(log);
      });
    }else{
      //unsubscribe della macchina...
      this.apiService.getLogs(this.machineID, this.selectedValue).subscribe(res => {
        console.log("--> " + res[0]);
        this.machineLogs = res.reverse();
      });
    }
  }

  ngOnInit(): void {
    this.socketService.connect();

    this.routes.paramMap.subscribe(params => {
      let res = params.get('machineID');
      let res2 = params.get('machineName');
      if(res != null && res2 != null){
        this.machineID = +res;
        this.machineName = res2;
      }
    })
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

}
