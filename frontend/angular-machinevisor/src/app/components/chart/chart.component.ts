import {  Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';
import { ChartService } from 'src/app/utilities/services/chartService/chart.service';
import { ChartsService } from 'src/app/utilities/services/chartService/charts.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() chartType: ChartType;
  @Input() chartValue: string;
  @Input() data: ChartConfiguration['data'] | undefined;
  @Input() options: ChartConfiguration['options']; 
  @Input() updateObservable: Observable<number> ;
  title: string;

  constructor(public chartService: ChartService){
    
  }

  ngOnInit(): void {
    // this.data = this.chartService.getDataConfiguration(this.chartValue);
    // this.options = this.chartService.getOptionsConfiguration(this.chartType)
    // this.chartService.updateObservable.subscribe(_ => this.chart?.update())
    this.updateObservable.subscribe(val => {
      this.data?.datasets[0].data.push(val)
      this.data?.labels?.push("label")
      this.chart?.update();
    })
    this.title = "Chart of " + this.chartValue;
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
    console.log("my data", this.data)
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public pushOne(): void {
    this.chartService.pushOne();
    this.chart?.update();
  }
}
