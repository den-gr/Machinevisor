import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  openMenu = false;

  clickMenu() {
    console.log("CLICK MENU");
    this.openMenu = !this.openMenu;
  }

  closeMenu(){
    console.log("CLOSE MENU");
    this.openMenu = false;
  }

}
