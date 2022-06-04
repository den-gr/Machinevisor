import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor() { 
  }

  ngOnInit(): void {      
  }

  // open/close menu
  onToggleSidenav() {
    console.log("Funzione chiamata")
    this.sidenavToggle.emit();
  }

}
