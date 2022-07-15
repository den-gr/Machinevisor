import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utilities/services/authService/auth.service';
import { NavigationService } from 'src/app/utilities/services/navigationService/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(public authService: AuthService, private navService: NavigationService) { 
  }

  ngOnInit(): void {      
  }

  goToHome(){
    if(this.authService.isTokenStored()){
      this.navService.goToPage('/home');
    }
  }

  // open/close menu
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

}
