import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Log } from 'src/app/utilities/dataInterfaces/log';
import { SocketService } from 'src/app/utilities/services/socketService/socket.service';

export interface Values{
  class: string,
  state: string,
  coordinates: {
    x: number,
    y: number
  }
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('clickHoverMenuTrigger1') clickHoverMenuTrigger1: MatMenuTrigger;
  @ViewChild('clickHoverMenuTrigger2') clickHoverMenuTrigger2: MatMenuTrigger;
  @ViewChild('clickHoverMenuTrigger3') clickHoverMenuTrigger3: MatMenuTrigger;
  @ViewChild('clickHoverMenuTrigger4') clickHoverMenuTrigger4: MatMenuTrigger;
  @ViewChild('clickHoverMenuTrigger5') clickHoverMenuTrigger5: MatMenuTrigger;

  constructor(private socketService: SocketService) { }
  ngAfterViewInit(): void {
    console.log("-> " + this.clickHoverMenuTrigger1);
    this.menuTriggers.push(this.clickHoverMenuTrigger1);
    this.menuTriggers.push(this.clickHoverMenuTrigger2);
    this.menuTriggers.push(this.clickHoverMenuTrigger3);
    this.menuTriggers.push(this.clickHoverMenuTrigger4);
    this.menuTriggers.push(this.clickHoverMenuTrigger5);
  }

  machineNum = 5;
  machineData = Array<Values>();
  menuTriggers = Array<MatMenuTrigger>();

  click(machine: String) {
    const ID = +machine
    this.menuTriggers[ID-1].openMenu();
  }

  ngOnInit(): void {

    this.machineData[0] = {class: 'machine-o', state: "OFF", coordinates: {x:1, y: 0.7}}
    this.machineData[1] = {class: 'machine-o', state: "OFF", coordinates: {x: 21, y: 0.7}}
    this.machineData[2] = {class: 'machine-o', state: "OFF", coordinates: {x: 41, y: 0.7}}
    this.machineData[3] = {class: 'machine-o', state: "OFF", coordinates: {x: 1, y: 20.2}}
    this.machineData[4] = {class: 'machine-v', state: "OFF", coordinates: {x: 48, y: 16.2}}

    /*let tmp1 = localStorage.getItem("state1");
    let tmp2 = localStorage.getItem("state2");
    let tmp3 = localStorage.getItem("state3");
    let tmp4 = localStorage.getItem("state4");
    let tmp5 = localStorage.getItem("state5");*/

    this.socketService.connect()
    this.socketService.subscribe(0)

    for (let i = 1; i <= this.machineNum; i++) {
      this.socketService.setMachinePeriod(i, 5000);
    }

    this.socketService.getSocket().on('update', (msg: string) => {
      let log: Log = JSON.parse(msg);
      console.log("-> ", log);
      this.machineData[log.machine_id-1].state = log.state;
    });
  }

  ngOnDestroy(): void {
    /*localStorage.setItem('state1', this.state1);
    localStorage.setItem('state2', this.state2);
    localStorage.setItem('state3', this.state3);
    localStorage.setItem('state4', this.state4);
    localStorage.setItem('state5', this.state5);*/
    this.socketService.disconnect()
  }

}
