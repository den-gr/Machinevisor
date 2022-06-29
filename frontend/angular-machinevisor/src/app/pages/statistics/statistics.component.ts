import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit {
  public readonly lineChart: ChartType = "line"
  public readonly barChart: ChartType = 'bar';
  public readonly temperature = "temperature";
  public readonly kWatt = "kWatt"

  ngOnInit(): void {
  }

}
