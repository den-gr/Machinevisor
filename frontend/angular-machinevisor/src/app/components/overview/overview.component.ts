import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/utilities/services/APIService/api.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(private apiService: APIService) { }
  overviewData = Array();

  ngOnInit(): void {

    this.apiService.getBestWorstMachine().subscribe(res => {
      let best = res.best;
      let worst = res.worst;
      this.apiService.getMainValuesOverview().subscribe(res => {
        this.overviewData = Array(
          {field: "Consumption average", val: res.kWattAvg+'KW/h'}, 
          {field: "Detected anomaly", val: res.allarms}, 
          {field: "Messages per minute", val: res.msgsForMinute}, 
          {field: "Worst machinary", val: worst}, 
          {field: "Best machinery", val: best}); 
      })
    });
  }

}
