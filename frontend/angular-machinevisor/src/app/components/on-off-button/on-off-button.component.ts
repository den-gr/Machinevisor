import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-on-off-button',
  templateUrl: './on-off-button.component.html',
  styleUrls: ['./on-off-button.component.scss']
})
export class OnOffButtonComponent implements OnInit {

  constructor() { }

  clickOnOff(value: Boolean){
    console.log("On/Off --> " + value);
  }

  ngOnInit(): void {
  }

}
