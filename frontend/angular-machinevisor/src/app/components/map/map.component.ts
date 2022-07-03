import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Log } from 'src/app/utilities/dataInterfaces/log';
import { SocketService } from 'src/app/utilities/services/socketService/socket.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('clickHoverMenuTrigger1') clickHoverMenuTrigger1: MatMenuTrigger;
  @ViewChild('clickHoverMenuTrigger2') clickHoverMenuTrigger2: MatMenuTrigger;
  @ViewChild('clickHoverMenuTrigger3') clickHoverMenuTrigger3: MatMenuTrigger;
  @ViewChild('clickHoverMenuTrigger4') clickHoverMenuTrigger4: MatMenuTrigger;
  @ViewChild('clickHoverMenuTrigger5') clickHoverMenuTrigger5: MatMenuTrigger;

  constructor(private socketService: SocketService) { }

  state1 = 'OFF';
  /*state2 = 'OFF';
  state3 = 'OFF';
  state4 = 'OFF';
  state5 = 'OFF';*/

  click(machine: String){
    console.log("Ho cliccato trullallero rullalla! --> " + machine);
    switch(machine){
      case '1':
        this.clickHoverMenuTrigger1.openMenu();
        break;
      case '2':
        this.clickHoverMenuTrigger2.openMenu();
        break;
      case '3':
        this.clickHoverMenuTrigger3.openMenu();
        break;
      case '4':
        this.clickHoverMenuTrigger4.openMenu();
        break;
      case '5':
        this.clickHoverMenuTrigger5.openMenu();
        break;
    }
  }

  ngOnInit(): void {
    this.socketService.connect()
    this.socketService.subscribe(1) //qua ci vanno TUTTE le macchine!!!
    this.socketService.setMachinePeriod(1, 5000);
    /*this.socketService.setMachinePeriod(2, 5000);
    this.socketService.setMachinePeriod(3, 5000);
    this.socketService.setMachinePeriod(4, 5000);
    this.socketService.setMachinePeriod(5, 5000);*/
    this.socketService.getSocket().on('update', (msg: string) => {
      let log: Log = JSON.parse(msg);
      console.log("-> ", log);
      //SWITCH per gestire le varie macchine (?)

      this.state1 = log.state
    });
  }

  ngOnDestroy(): void {
    this.socketService.disconnect()
  }

}
