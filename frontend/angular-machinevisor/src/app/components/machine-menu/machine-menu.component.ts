import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Router } from '@angular/router';
import { APIService } from 'src/app/utilities/services/APIService/api.service';
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

  constructor(private navService: NavigationService, private apiService: APIService) { }

  onClick(){
    this.navService.goToPageWithParameters('/machinePage', this.machineID);
  }

  ngOnInit(): void {
    this.apiService.getMachineInfo(this.machineID).subscribe(res => {
      this.machineName = res.machine_name;
    });
  }

}
