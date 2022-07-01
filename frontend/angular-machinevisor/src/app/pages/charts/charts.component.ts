import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Observable } from 'rxjs';
import { ChartEntry } from 'src/app/utilities/dataInterfaces/charts';
import { ChartsService } from 'src/app/utilities/services/chartService/charts.service';

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

  public observables : Map<string, Observable<number>>;
  public chartValuesMap: Map<string, ChartConfiguration['data']> = new Map();



  constructor(public chartsService: ChartsService) {
    chartsService.getChartsInfo("1").subscribe((res) =>{
      let topics: string[] = []; 
      res.forEach(e => {
          topics.push(e.type)
          this.chartValuesMap.set(e.type, this.fillChartConfiguration(e.values, e.type));
      })
      this.observables = chartsService.getSubjects(topics)

    })
  }

  private fillChartConfiguration(entry: ChartEntry[], title: string): ChartConfiguration['data']{
    let labels: string[] = [];
    let values: number[] = [];
    entry.forEach(e => {
      // labels.push(new Date(e.date).toLocaleDateString("it"))
      labels.push(new Date(e.date).toLocaleTimeString())
      values.push(e.value)
    })
    return this.chartsService.getDatasetTemplate(values, labels, title)
  }

  ngOnInit(): void {
  }

  public pushOne(){
    this.chartsService.push()
  }
}
