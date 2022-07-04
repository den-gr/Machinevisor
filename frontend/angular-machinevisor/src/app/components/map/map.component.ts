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

  machineNum = 5;

  state1: string;
  state2: string; 
  state3: string; 
  state4: string; 
  state5: string;

  click(machine: String) {
    console.log("Ho cliccato trullallero rullalla! --> " + machine);
    switch (machine) {
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
    let tmp1 = localStorage.getItem("state1");
    let tmp2 = localStorage.getItem("state2");
    let tmp3 = localStorage.getItem("state3");
    let tmp4 = localStorage.getItem("state4");
    let tmp5 = localStorage.getItem("state5");

    if(tmp1 !== null && tmp2 !== null && tmp3 !== null && tmp4 !== null && tmp5 !== null){
      this.state1 = tmp1;
      this.state2 = tmp2;
      this.state3 = tmp3;
      this.state4 = tmp4;
      this.state5 = tmp5;
    }else{
      this.state1 = 'OFF';
      this.state2 = 'OFF';
      this.state3 = 'OFF';
      this.state4 = 'OFF';
      this.state5 = 'OFF';
    }

    this.socketService.connect()
    this.socketService.subscribe(0)

    for (let i = 1; i <= this.machineNum; i++) {
      this.socketService.setMachinePeriod(i, 5000);
    }

    this.socketService.getSocket().on('update', (msg: string) => {
      let log: Log = JSON.parse(msg);
      console.log("-> ", log);
      switch (log.machine_id) {
        case 1:
          this.state1 = log.state;
          break;
        case 2:
          this.state2 = log.state;
          break;
        case 3:
          this.state3 = log.state;
          break;
        case 4:
          this.state4 = log.state;
          break;
        case 5:
          this.state5 = log.state;
          break;
      }
    });
  }

  ngOnDestroy(): void {
    localStorage.setItem('state1', this.state1);
    localStorage.setItem('state2', this.state2);
    localStorage.setItem('state3', this.state3);
    localStorage.setItem('state4', this.state4);
    localStorage.setItem('state5', this.state5);
    this.socketService.disconnect()
  }

}
