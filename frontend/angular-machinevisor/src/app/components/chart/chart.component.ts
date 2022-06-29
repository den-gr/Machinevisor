import {  Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';
import { ChartService } from 'src/app/utilities/services/chartService/chart.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() chartType: ChartType;
  @Input() chartValue: string;
  data: ChartConfiguration['data'];
  options: ChartConfiguration['options']; 
  title: string;

  constructor(public chartService: ChartService){
  }

  ngOnInit(): void {
    this.data = this.chartService.getDataConfiguration(this.chartValue);
    this.options = this.chartService.getOptionsConfiguration(this.chartType)
    this.chartService.updateObservable.subscribe(_ => this.chart?.update())
    this.title = "Chart of " + this.chartValue;
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public pushOne(): void {
    this.chartService.pushOne();
    this.chart?.update();
  }



  
  
}
