import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  public readonly lineChart: ChartType = "line"
  public readonly barChart: ChartType = 'bar';

  // @Input() machineID: number;
  machineID: number = 1;
  public readonly temperature = "temperature";
  public readonly kWatt = "kWatt"
  constructor() {}

  ngOnInit(): void {
  }

}
