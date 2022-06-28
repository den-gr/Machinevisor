import {  Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],

})
export class ChartComponent {

  @Input() data: ChartConfiguration['data'];
  @Input() chartType: ChartType;

  @Input() options: ChartConfiguration['options']; 
  

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }


  public pushOne(): void {
    this.data.datasets.forEach((x, i) => {
      const num = ChartComponent.generateNumber(i);
      x.data.push(num);
    });
    this.data?.labels?.push(`Label ${ this.data.labels.length }`);

    this.chart?.update();
  }



  
  
}
