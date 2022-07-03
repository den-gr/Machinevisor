import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Observable, Subject } from 'rxjs';
import { ChartEntry } from 'src/app/utilities/dataInterfaces/charts';
import { Log } from 'src/app/utilities/dataInterfaces/log';
import { ChartsService } from 'src/app/utilities/services/chartService/charts.service';
import { SocketService } from 'src/app/utilities/services/socketService/socket.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  public readonly lineChart: ChartType = "line"
  // public readonly barChart: ChartType = 'bar';

  private machineID: string;

  public observables : Map<string, Observable<number>> = new Map(); // chart name -> observabel
  public chartValuesMap: Map<string, ChartConfiguration['data']> = new Map(); // chart name -> chart configuration
  private readonly updateSubjectsMap : Map<string, Subject<number>> = new Map();
  
  constructor(public chartsService: ChartsService, private routes: ActivatedRoute,private socketService: SocketService) {
    this.routes.paramMap.subscribe(params => {
      let res = params.get('machineID');
      if(res != null){
        this.machineID = res;
      }
    })
    chartsService.getChartsInfo(this.machineID).subscribe((res) =>{
      let topics: string[] = []; 
      res.forEach(e => {
          topics.push(e.type)
          this.chartValuesMap.set(e.type, this.fillChartConfiguration(e.values, e.type));
      })
      topics.forEach(topic =>{
        let sub = new Subject<number>()
        let obs = sub.asObservable();
        this.updateSubjectsMap.set(topic, sub)
        this.observables.set(topic, obs)
      })
    })
  }

  private fillChartConfiguration(entry: ChartEntry[], title: string): ChartConfiguration['data']{
    let labels: string[] = [];
    let values: number[] = [];
    entry.forEach(e => {
      // labels.push(new Date(e.date).toLocaleDateString("it"))
      labels.push(new Date(e.label).toLocaleTimeString())
      values.push(e.value)
    })
    return this.chartsService.getDatasetTemplate(values, labels, title)
  }
  
  ngOnInit(): void {
    this.socketService.connect();
    this.socketService.subscribe(+this.machineID); 
    this.socketService.setMachinePeriod(1, 5000);
    this.socketService.getSocket().on('update', (msg: string) => {
      let log: Log = JSON.parse(msg);
      console.log("-> ", log);
      for(let prop in log){
        if(this.updateSubjectsMap.has(prop)){
          console.log(prop)
          const field = prop as keyof typeof log;
          this.updateSubjectsMap.get(prop)?.next(+log[field])
        }
      }
    })
  }

  // public pushOne(){
  //   this.chartsService.push()
  // }
}
