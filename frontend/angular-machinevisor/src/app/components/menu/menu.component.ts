import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ToolbarService } from '../../services/toolbar.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  @ViewChild('sidenav') public sidenav!: MatDrawer; //! ????
  @Input() sidenavLayout:any;

  machineries: any[] = Array();
  constructor(private toolbarService: ToolbarService) { }

  ngOnInit(): void {
    this.toolbarService.setSidenav(this.sidenav);
    console.log('drawer ', this.toolbarService);

    //Ex. machines
    this.machineries = Array('M1', 'M2', 'M3', 'M4');
  }

}
