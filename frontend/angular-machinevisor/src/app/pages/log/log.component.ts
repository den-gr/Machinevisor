import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Period } from 'src/app/utilities/dataInterfaces/periods';
import { APIService } from 'src/app/utilities/services/APIService/api.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  machineID: number;
  machineName = ''
  machineLogs = Array();

  periods: Period[] = [
    {value: '0', viewValue: 'Real time'},
    {value: '10', viewValue: '10 logs'},
    {value: '20', viewValue: '20 logs'},
    {value: '50', viewValue: '50 logs'},
    {value: '100', viewValue: '100 logs'},
    {value: '150', viewValue: '150 logs'},
    {value: '200', viewValue: '200 logs'},
    {value: '500', viewValue: '500 logs'},
  ];

  selectedValue: string;

  constructor(private routes: ActivatedRoute, private apiService: APIService) { }

  onChange(){
    //selectedValue
    this.apiService.getLogs(this.machineID, this.selectedValue).subscribe(res => {
      console.log("--> " + res[0]);
      this.machineLogs = res;
    });
  }

  ngOnInit(): void {

    this.routes.paramMap.subscribe(params => {
      let res = params.get('machineID');
      let res2 = params.get('machineName');
      if(res != null && res2 != null){
        this.machineID = +res;
        this.machineName = res2;
      }
    })
  }

}
