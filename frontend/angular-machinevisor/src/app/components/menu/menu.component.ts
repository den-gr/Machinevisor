import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() sidenavLayout:any;
  @Output() closeDrawer:any = new EventEmitter<void>();

  machineries: any[] = Array();
  constructor() { }
  
  close(){
    this.closeDrawer.emit();
  }

  ngOnInit(): void {

    //Ex. machines
    this.machineries = Array('M1', 'M2', 'M3', 'M4');
  }

}
