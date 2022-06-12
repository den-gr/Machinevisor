import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {

  constructor( private http: HttpClient, private routes: ActivatedRoute) { }

  machineID = ''

  getMachineData(){
    const url = `${environment.apiUrl}/machines/1`;
    this.http.get(url).subscribe(responce => {
      console.log("Responce :) --> " + JSON.stringify(responce));
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
    //this.getMachineData();
  }

}
