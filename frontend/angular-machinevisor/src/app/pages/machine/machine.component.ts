import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/utilities/services/APIService/api.service';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {

  constructor(private routes: ActivatedRoute, private apiService: APIService) { }

  machineID = ''

  getMachineData(){
    this.apiService.getAPI('machines/1').subscribe(res => {
      console.log("Responce :) --> " + JSON.stringify(res));
    });
  }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(params => {
      console.log("ID della macchina --> " + params.get('machineID'));
      let res = params.get('machineID');
      if(res != null){
        this.machineID = res;
      }
    })
    this.getMachineData();
  }

}
