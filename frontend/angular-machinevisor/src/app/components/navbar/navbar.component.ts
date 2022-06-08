import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private router: Router) { 
  }

  ngOnInit(): void {      
  }

  goToHome(){
    console.log("NAVIGATE!")
    this.router.navigate(['/home']);
  }

  // open/close menu
  onToggleSidenav() {
    console.log("Funzione chiamata")
    this.sidenavToggle.emit();
  }

}
