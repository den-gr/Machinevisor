import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  onClick(){
    this.router.navigate(['/machinePage', this.machineID]);
  }

  ngOnInit(): void {
    this.machineName = "Machine-"+this.machineID;
  }

}
