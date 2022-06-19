import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utilities/services/authService/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  machineries: any[] = Array();
  constructor(private router: Router, public authService: AuthService) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  openMenu = false;
  user = 1;

  goToHome(){
    console.log("NAVIGATE HOME!")
    this.router.navigate(['/home']);
    this.close()
  }

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

  logout(){
    this.authService.logout();
    this.close();
  }

  ngOnInit(): void {
    //Ex. machines
    this.machineries = Array('Machine-1', 'Machine-2', 'Machine-3', 'Machine-4', 'Machine-5');
  }

}
