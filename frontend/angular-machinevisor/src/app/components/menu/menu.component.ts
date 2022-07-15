import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/utilities/services/APIService/api.service';
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
  
  constructor(public authService: AuthService, private navService: NavigationService, public menuService: MenuService, private apiService: APIService) { 
    navService.refreshPage();
  }

  user = 1;

  goToPage(page: string){
    this.navService.goToPage(page);
    this.menuService.close()
  }

  goToPageWithParam(page: string, data: any){
    this.navService.goToPageWithParameters(page, data)
    this.menuService.close()
  }

  logout(){
    this.authService.logout();
    this.menuService.close()
  }

  ngOnInit(): void {
    this.apiService.getMachinesList().subscribe(res => {
      res.forEach(m => this.machineries.push(m.machine_name));
    });
  }

}
