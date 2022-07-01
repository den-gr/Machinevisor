import { Injectable } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Observable, Subject } from 'rxjs';
import { APIService } from '../APIService/api.service';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
 

  private readonly updateSubjectsMap : Map<string, Subject<number>> = new Map();

  constructor(private apiService: APIService) { }

  public getChartsInfo(machineID: string){
    this.reset()
    return this.apiService.getMachineCharts(machineID);
  }

  public getSubjects(topics: string[]){
    let observables : Map<string, Observable<number>> = new Map();
    topics.forEach(topic =>{
      let sub = new Subject<number>()
      let obs = sub.asObservable();
      this.updateSubjectsMap.set(topic, sub)
      observables.set(topic, obs)
    })
    return observables;
  }

  public push(){
    for(let v of this.updateSubjectsMap.values()){
      v.next(Math.ceil(Math.random() * 20))
    }
  }

  private reset(){

  }

  public getDatasetTemplate(values: number[], labels: string[], title: string){
    let copy = { ...this.blueLineTemplate};
    copy.data = values
    copy.label = title
    return {
      datasets: [copy],
      labels: labels
    } 
  }


  public readonly blueLineTemplate = {
    data: [0],
    label: 'Series',
    backgroundColor: 'rgba(0, 150, 214, 0.1)',
    borderColor: 'rgb(0, 150, 214)',
    pointBackgroundColor: 'rgba(0, 32, 68,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(0, 32, 68, 0.8)',
    fill: 'origin',
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
}
