import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {

  constructor( private http: HttpClient) { }

  machineID = 'machine-1'

  getMachineData(){
    const url = `${environment.apiUrl}/machines/1`;
    this.http.get(url).subscribe(responce => {
      console.log("Responce :) --> " + JSON.stringify(responce));
    });
  }

  ngOnInit(): void {
    this.getMachineData();
  }

}
