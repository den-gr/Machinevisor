import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  private readonly template1 = {
    data: [0],
    label: 'Series A',
    backgroundColor: 'rgba(0, 150, 214, 0.1)',
    borderColor: 'rgb(0, 150, 214)',
    pointBackgroundColor: 'rgba(0, 32, 68,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(0, 32, 68, 0.8)',
    fill: 'origin',
  }
  private readonly template2 = {
    data: [0],
    label: 'Series A',
    backgroundColor: 'rgba(229, 115, 115, 0.1)',
    borderColor: 'rgb(229, 115, 115)',
    pointBackgroundColor: 'rgba(0, 32, 68,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(0, 32, 68, 0.8)',
    fill: 'origin',
  }

  public barChartData: ChartConfiguration['data'] = {
    labels: [ '2006', '2007', '2008'],
    datasets: [
      { data: [ 65, 59, 80], label: 'Series A' },
      { data: [ 28, 48, 40], label: 'Series B' },
      { data: [ 32, 54, 90 ], label: 'Series C' }
    ]
  };

  public readonly lineChart: ChartType = "line"
  public readonly barChart: ChartType = 'bar';

  public data1: ChartConfiguration['data']
  public data2: ChartConfiguration['data']

  constructor() { 
    this.data1 = this.fillTemplate([ 65, 59, 80, 81, 56, 55, 50 ])
    this.data2 = this.fillTemplate2([ 40, 80, 80, 81, 80, 55, 40 ],[ 65, 59, 80, 81, 56, 55, 50 ])
  }

  ngOnInit(): void {
  }

  private fillTemplate(data: number[]): ChartConfiguration['data']{
    let copy = { ...this.template1};
    copy.data = data
    return {
      datasets: [copy],
      labels: [ '01/01/22', '01/02/22', '01/03/22', '01/04/22', '01/05/22', '01/06/22', '01/07/22' ]
    } 
  }

  private fillTemplate2(data1: number[], data2: number[] ): ChartConfiguration['data']{
    let copy1 = { ...this.template1};
    let copy2 = { ...this.template2};
    copy1.data = data1
    copy2.data = data2
    return {
      datasets: [copy1, copy2],
      labels: [ '01/01/22', '01/02/22', '01/03/22', '01/04/22', '01/05/22', '01/06/22', '01/07/22' ]
    } 
  }

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left', 
          beginAtZero: true
        }
    },

    plugins: {
      legend: { display: true },
    }
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
     
    }
  };

}
