import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utilities/services/authService/auth.service';
import { MenuService } from 'src/app/utilities/services/menuService/menu.service';
import { NavigationService } from 'src/app/utilities/services/navigationService/navigation.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  machineries: any[] = Array();
  constructor(public authService: AuthService, private navService: NavigationService, public menuService: MenuService) { 
    navService.refreshPage();
  }

  //openMenu = false;
  user = 1;

  goToPage(page: string){
    this.navService.goToPage(page);
    this.menuService.close()
  }

  goToPageWithParam(page: string, data: any){
    this.navService.goToPageWithParameters(page, data)
    this.menuService.close()
  }

  /*clickMenu() {
    console.log("CLICK MENU");
    this.openMenu = !this.openMenu;
  }
  
  close(){
    this.openMenu = false
    console.log("CHIUSO")
  }*/

  logout(){
    this.authService.logout();
    this.menuService.close()
  }

  ngOnInit(): void {
    //Ex. machines
    this.machineries = Array('Machine-1', 'Machine-2', 'Machine-3', 'Machine-4', 'Machine-5');
  }

}
