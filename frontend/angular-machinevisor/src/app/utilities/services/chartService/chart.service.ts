import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Observable, Subject } from 'rxjs';
import { APIService } from '../APIService/api.service';

class Data {
  temperature: ChartConfiguration['data'];
  kWatt: ChartConfiguration['data'];
}

class TemplateInput{
  label: string;
  values: number[];
  labels: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private readonly blueLineTemplate = {
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
  private readonly template2 = {
    data: [0],
    label: 'Series',
    backgroundColor: 'rgba(229, 115, 115, 0.1)',
    borderColor: 'rgb(229, 115, 115)',
    pointBackgroundColor: 'rgba(0, 32, 68,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(0, 32, 68, 0.8)',
    fill: "origin",
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
 
  public data: Data = new Data();

  private readonly updateSubject = new Subject<any>();
  public readonly updateObservable: Observable<any> = this.updateSubject.asObservable();

  constructor(apiService: APIService) { }

  public getDataConfiguration(chartValue: string): ChartConfiguration['data'] {
    if(chartValue === "temperature"){
      return this.getTemperature()
    }else if(chartValue === "kWatt"){
      return this.getKWatt();
    }
    //default
    return this.barChartData
  }

  public getOptionsConfiguration(type: ChartType): ChartConfiguration['options']{
    if(type.toString() == this.lineChart.toString()){
      return this.lineChartOptions;
    }
    return this.barChartOptions
  }

  
  private getTemperature(): ChartConfiguration['data']{
    let inp: TemplateInput = {
      label: "temperature",
      values:  [ 20, 21, 22, 23, 25, 28, 40 ],
      labels: [ '01/01/22', '01/02/22', '01/03/22', '01/04/22', '01/05/22', '01/06/22', '01/07/22' ]
    }
    this.data.temperature = this.fillSingleLineTemplate(inp)
    return this.data.temperature ;
  }

  private getKWatt(): ChartConfiguration['data']{
    let inp: TemplateInput = {
      label: "kWatt",
      values:  [ 3.1, 3.2, 4.1, 3.5, 3.7, 3.1, 2.9],
      labels: [ '01/01/22', '01/02/22', '01/03/22', '01/04/22', '01/05/22', '01/06/22', '01/07/22' ]
    }
    this.data.kWatt = this.fillSingleLineTemplate(inp)
    return this.data.kWatt;
  }


  public pushOne(): void {
    this.data.temperature.datasets.forEach((x, i) => {
      const num = ChartService.generateNumber(i);
      x.data.push(num);
    });
    this.data.temperature?.labels?.push(`Label ${ this.data.temperature.labels.length }`);
    this.updateSubject.next(null)
  }


  ngOnInit(): void {
  }

  private fillSingleLineTemplate(tempInput: TemplateInput): ChartConfiguration['data']{
    let copy = { ...this.blueLineTemplate};
    copy.data = tempInput.values
    copy.label = tempInput.label
    return {
      datasets: [copy],
      labels: tempInput.labels
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

