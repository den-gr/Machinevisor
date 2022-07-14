import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/utilities/services/socketService/socket.service';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit, OnDestroy {

  constructor(private routes: ActivatedRoute, private socketService: SocketService) {  }

  machineID:number;
  prova = ''

  ngOnInit(): void {
    console.log("ONINIT");

    this.routes.paramMap.subscribe(params => {
      console.log("ID della macchina --> " + params.get('machineID'));
      let res = params.get('machineID');
      if(res != null){
        this.machineID = +res;
      }
    })

    console.log("machine id :) --> " + this.machineID)
    this.socketService.connect();
    this.socketService.subscribe(this.machineID);
  }

  ngOnDestroy(): void {
    console.log("ONDESTROY")
    this.socketService.disconnect(); //TODO ID DELLA MACCHINA
  }

}
