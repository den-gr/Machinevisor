import {  Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartsService } from 'src/app/utilities/services/chartService/charts.service';
import { ChartEntry } from 'src/app/utilities/dataInterfaces/charts';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  public pieChartPlugins = [ DatalabelsPlugin ];
  public readonly line: ChartType = "line"

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() chartType: ChartType;
  @Input() chartValue: string;
  @Input() data: ChartConfiguration['data'] | undefined;
  @Input() options: ChartConfiguration['options']; 
  @Input() updateObservable?: Observable<ChartEntry> ;
  title: string;
  @Input() typeName: string;
  @Input() machineName: string;

  ngOnInit(): void {
    if(this.chartType == this.line){
      this.pieChartPlugins = [];
    }

    this.updateObservable?.subscribe(val => {
      this.data?.datasets[0].data.push(val.value)
      this.data?.labels?.push(val.label)
      this.chart?.update();
    })

    this.title = this.typeName + " of " + this.chartValue;
    if(this.machineName){
      this.title = this.title + " of " + this.machineName;
    }
    
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
    // console.log("my data", this.data)
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

}
