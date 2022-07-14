import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { Log } from 'src/app/utilities/dataInterfaces/log';
import { SocketService } from 'src/app/utilities/services/socketService/socket.service';
import { MachineMenuComponent } from '../machine-menu/machine-menu.component';

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

export class MapComponent implements OnInit, OnDestroy {
  @ViewChildren('clickHoverMenuTrigger') clickHoverMenuTriggers: QueryList<MatMenuTrigger>
  @ViewChild('clickMenu1', {static: true}) clickMenu1: MachineMenuComponent
  @ViewChild('clickMenu2', {static: true}) clickMenu2: MachineMenuComponent
  @ViewChild('clickMenu3', {static: true}) clickMenu3: MachineMenuComponent
  @ViewChild('clickMenu4', {static: true}) clickMenu4: MachineMenuComponent
  @ViewChild('clickMenu5', {static: true}) clickMenu5: MachineMenuComponent

  machineNum = 5;
  machineData = Array<Values>();
  menus = Array<MachineMenuComponent>();

  constructor(private socketService: SocketService) { }

  click(machine: number) {
    this.clickHoverMenuTriggers.get(machine)?.openMenu();
  }

  getMenu(machine: number){
    return this.menus[machine]
  }

  ngOnInit(): void {

    this.machineData[0] = {class: 'machine-o', state: "OFF", coordinates: {x:1, y: 0.7}}
    this.machineData[1] = {class: 'machine-o', state: "OFF", coordinates: {x: 21, y: 0.7}}
    this.machineData[2] = {class: 'machine-o', state: "OFF", coordinates: {x: 41, y: 0.7}}
    this.machineData[3] = {class: 'machine-o', state: "OFF", coordinates: {x: 1, y: 20.2}}
    this.machineData[4] = {class: 'machine-v', state: "OFF", coordinates: {x: 48, y: 16.2}}

    this.menus.push(this.clickMenu1);
    this.menus.push(this.clickMenu2);
    this.menus.push(this.clickMenu3);
    this.menus.push(this.clickMenu4);
    this.menus.push(this.clickMenu5);

    this.socketService.connect()
    this.socketService.subscribe(0)

    this.socketService.getSocket().on('update', (msg: string) => {
      let log: Log = JSON.parse(msg);
      this.machineData[log.machine_id-1].state = log.state;
    });
  }

  ngOnDestroy(): void {
    this.socketService.disconnect()
  }

}
