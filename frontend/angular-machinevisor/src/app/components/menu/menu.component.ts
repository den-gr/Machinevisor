import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  machineries: any[] = Array();
  constructor(private router: Router) { }

  openMenu = false

  goToHome(){
    console.log("NAVIGATE!")
    this.router.navigate(['/home']);
    this.close()
  }

  clickMenu() {
    console.log("CLICK MENU");
    this.openMenu = !this.openMenu;
  }
  
  close(){
    this.openMenu = false
    console.log("CHIUSO")
  }

  ngOnInit(): void {
    //Ex. machines
    this.machineries = Array('M1', 'M2', 'M3', 'M4');
  }

}
