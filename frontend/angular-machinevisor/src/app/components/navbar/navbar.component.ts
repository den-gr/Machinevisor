import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utilities/services/authService/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private router: Router, public authService: AuthService) { 
  }

  ngOnInit(): void {      
  }

  goToHome(){
    if(this.authService.isTokenStored()){
      this.router.navigate(['/home']);
    }
  }

  // open/close menu
  onToggleSidenav() {
    console.log("Funzione chiamata")
    this.sidenavToggle.emit();
  }

}
