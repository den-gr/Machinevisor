import { Injectable } from '@angular/core';
import { ChartConfiguration} from 'chart.js';
import { Observable } from 'rxjs';
import { ChartDefaultValues, ChartEntry, ChartTemplate } from '../../dataInterfaces/charts';
import { APIService } from '../APIService/api.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  dataset_temperature: number[] = [];

  constructor(private apiService: APIService) { }

  public getDefaultValuesTemp(): [Observable<ChartDefaultValues>, ChartTemplate]{
    let copy_temperature = { ...this.blueLineTemplate};
    copy_temperature.label = "temperature";
    
    let copy_kWatt = { ...this.redLineTemplate};
    copy_kWatt.label = "kWatt";
    
    let labels: string[] = []
    
    let chartTemplate: ChartTemplate = {
      chartType: "line",
      options: this.lineChartOptions,
      data: {
        datasets: [copy_temperature, copy_kWatt],
        labels: labels
      }
    }
    return [this.apiService.getChartDefaultValues(), chartTemplate]
  }

  public getAllarmsTemp(): [Observable<ChartEntry[]>, ChartTemplate]{
    let chartTemplate: ChartTemplate = {
      chartType: "bar",
      options: this.barChartOptions,
      data: this.barChartData
    }
    return [this.apiService.getChartMachineAllarms(), chartTemplate]
  }

  public getActiveTimeTemp(): [Observable<ChartEntry[]>, ChartTemplate]{
    let chartTemplate: ChartTemplate = {
      chartType: "pie",
      options: this.pieChartOptions,
      data: this.pieChartData
    }
    return [this.apiService.getChartActiveTime(), chartTemplate]
  }

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

  private readonly redLineTemplate = {
    data: [0],
    label: 'Series',
    backgroundColor: 'rgba(229, 115, 115, 0.1)',
    borderColor: 'rgb(229, 115, 115)',
    pointBackgroundColor: 'rgba(64, 25, 25,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(64, 25, 25, 0.8)',
    fill: "origin",
  }

  public barChartData: ChartConfiguration['data'] = {
    labels: [ 'Test'],
    datasets: [
      { data: [ 65], label: 'Series A' },
      { data: [ 28], label: 'Series B' },
      { data: [ 32], label: 'Series C' }
    ]
    
  };

  public pieChartData: ChartConfiguration['data'] = {
    labels: [  'Download Sales' ,  'In Store Sales' , 'Mail Sales' ],
    datasets: [ {
      label: "test",
      data: [ 300, 500, 100 ]
    } ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
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
    scales: {
      x: {},
      y: {
        min: 0,
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      legend: {
        display: false,
        position: "left"
      },
      datalabels: {
        display: false,
        anchor: 'center',
        align: 'top',
        color: "white"
      }
    }
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'left',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels && ctx.chart.width > 800) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
        color: "white",
        display: 'auto',
        font: { size: 15}

      },
    }
  };
}
