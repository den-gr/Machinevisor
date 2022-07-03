import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Period } from 'src/app/utilities/dataInterfaces/periods';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  machineID = ''
  machineName = ''
  machineLogs = Array();

  periods: Period[] = [
    {value: '0', viewValue: 'Real time'},
    {value: '1', viewValue: '1h'},
    {value: '12', viewValue: '12h'},
    {value: '24', viewValue: '1 day'},
    {value: '168', viewValue: '1 week'},
    {value: '336', viewValue: '2 week'},
    {value: '672', viewValue: '1 month'},
  ];

  selectedValue: any;

  constructor(private routes: ActivatedRoute) { }

  ngOnInit(): void {

    this.machineLogs = Array("data1", "data2", "data3", "data4");

    this.routes.paramMap.subscribe(params => {
      let res = params.get('machineID');
      let res2 = params.get('machineName');
      if(res != null && res2 != null){
        this.machineID = res;
        this.machineName = res2;
      }
    })
  }

}
