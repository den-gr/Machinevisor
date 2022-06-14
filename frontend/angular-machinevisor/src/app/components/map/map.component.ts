import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('clickHoverMenuTrigger1') clickHoverMenuTrigger1: MatMenuTrigger;
  @ViewChild('clickHoverMenuTrigger2') clickHoverMenuTrigger2: MatMenuTrigger;
  @ViewChild('clickHoverMenuTrigger3') clickHoverMenuTrigger3: MatMenuTrigger;
  @ViewChild('clickHoverMenuTrigger4') clickHoverMenuTrigger4: MatMenuTrigger;
  @ViewChild('clickHoverMenuTrigger5') clickHoverMenuTrigger5: MatMenuTrigger;

  constructor() { }

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
  }

}
