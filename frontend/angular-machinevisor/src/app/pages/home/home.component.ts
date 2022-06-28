import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("Actual token home --> " + localStorage.getItem("token"))
    console.log("Actual User home --> " + localStorage.getItem("userID"))
    //console.log(this.authService.isTokenStored())
  }

}
