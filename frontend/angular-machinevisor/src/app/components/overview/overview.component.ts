import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor() { }
  overviewData = Array();

  ngOnInit(): void {
    this.overviewData = Array("Total factory consumption: 200000 K/h", 
    "Number of detected anomaly today: 6", 
    "Messages per minute: 6",
    "Worst machinary of the month: machine-1",
    "Best machinery of the month: machine-3");  
  }

}
