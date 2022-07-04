import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Observable } from 'rxjs';
import { ChartDefaultValues, ChartEntry, ChartTemplate } from 'src/app/utilities/dataInterfaces/charts';
import { StatisticService } from 'src/app/utilities/services/chartService/statistic.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit {
  public readonly lineChart: ChartType = "line"
  public readonly barChart: ChartType = 'bar';
  public readonly pieChart: ChartType = 'pie';
  public readonly defaultValuesTitle = "average temperature and kWatt of all machines";
  public readonly allarmTitle = "the number of machines allarms"
  public readonly activeTimeTitle = "machine working time in hours"
  
  public readonly kWatt = "kWatt"

  public meanTemperatureTemp?: ChartTemplate;
  public allarmsTemp?: ChartTemplate;
  public activeTimeTemp?: ChartTemplate;

  constructor(private statisticService: StatisticService){
   
    // console.log("data",this.meanTemperatureTemp.data)
  }
  
  ngOnInit(): void {
    this.setUpDefaulValuesChart();
    this.setUpAllarmsChart();
    this.setUpActiveTimeTemp();
   
  }

  private setUpDefaulValuesChart(){
    let obs:Observable<ChartDefaultValues>
    let chartTemplate:ChartTemplate
    [obs, chartTemplate] = this.statisticService.getDefaultValuesTemp();
    obs.subscribe(res => {
      res.dates.forEach(e =>{
        chartTemplate.data.labels?.push(this.getDateLabel(new Date(e)))
      })
      chartTemplate.data.datasets[0].data = res.temperatures
      chartTemplate.data.datasets[1].data = res.kWatts;
      this.meanTemperatureTemp = chartTemplate;
    })
  }

  private colors: string[] =  ["#0096D6", "#004770", "#AED681", "#E57373", "#002044"]
  private setUpAllarmsChart(){
    let obs:Observable<ChartEntry[]>
    let chartTemplate:ChartTemplate
    [obs, chartTemplate] = this.statisticService.getAllarmsTemp();
    obs.subscribe(ris => {
      chartTemplate.data.datasets = [];
      let data: number[] = []
      chartTemplate.data.labels = []
      ris.forEach(e => {
        data.push(e.value)
        // colors.push(this.getRandomColor())
        chartTemplate.data.labels?.push(e.label)
      })
      let newDataset = {
          data: data,
          label: this.allarmTitle,
          backgroundColor: this.colors
        }
      chartTemplate.data.datasets.push(newDataset)
      this.allarmsTemp = chartTemplate;
    })
  }

  private setUpActiveTimeTemp(){
    let obs:Observable<ChartEntry[]>
    let chartTemplate:ChartTemplate
    [obs, chartTemplate] = this.statisticService.getActiveTimeTemp();
    obs.subscribe(ris => {
      chartTemplate.data.datasets = [];
      let data: number[] = []
      chartTemplate.data.labels = []
      ris.forEach(e => {
        data.push(e.value)
        chartTemplate.data.labels?.push(e.label)
      })
      let newDataset = {
          data: data,
          label: this.activeTimeTitle,
          backgroundColor: this.colors
      }	
      chartTemplate.data.datasets.push(newDataset)
      this.activeTimeTemp = chartTemplate;
    })
  }

  private getDateLabel(date: Date):string{
    return date.toLocaleTimeString("it", {hour: "numeric", minute: "numeric"}) +" "+ date.toLocaleDateString("it", {day: "numeric", month: "numeric", year: "2-digit"})
  }
}
