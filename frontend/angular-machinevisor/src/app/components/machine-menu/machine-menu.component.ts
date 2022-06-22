import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/utilities/services/navigationService/navigation.service';

@Component({
  selector: 'app-machine-menu',
  templateUrl: './machine-menu.component.html',
  styleUrls: ['./machine-menu.component.scss'],
  exportAs: 'machineMenu'
})
export class MachineMenuComponent implements OnInit {
  @ViewChild(MatMenu, {static: true}) menu: MatMenu;

  @Input() machineID: any;

  machineName: string;

  constructor(private navService: NavigationService) { }

  onClick(){
    this.navService.goToPageWithParameters('/machinePage', this.machineID);
  }

  ngOnInit(): void {
    this.machineName = "Machine-"+this.machineID;
  }

}
