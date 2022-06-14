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

  openMenu = false;
  user = 1;

  goToHome(){
    console.log("NAVIGATE HOME!")
    this.router.navigate(['/home']);
    this.close()
  }

  /*goToUser(){
    console.log("NAVIGATE USER!")
    this.router.navigate(['/userPage', this.user]);
    this.close()
  }*/

  goTo(page: string, data: any){
    console.log('NAVIGATE!');
    this.router.navigate([page, data.toString()]);
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
    this.machineries = Array('Machine-1', 'Machine-2', 'Machine-3', 'Machine-4', 'Machine-5');
  }

}
