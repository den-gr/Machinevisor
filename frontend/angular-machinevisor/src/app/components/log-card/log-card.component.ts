import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { APIService } from 'src/app/utilities/services/APIService/api.service';

@Component({
  selector: 'app-log-card',
  templateUrl: './log-card.component.html',
  styleUrls: ['./log-card.component.scss']
})
export class LogCardComponent implements OnInit {

  constructor(private apiService: APIService, public datepipe: DatePipe) { }

  @Input() data: any; //TODO change type

  dateTime = ''
  values = Array();

  ngOnInit(): void {

    /*
    let curr = new Date();
    let tmp = new Date(curr.setMonth(curr.getMonth()-1));
    this.apiService.getLogs(this.machineID, tmp.toDateString()).subscribe(res => {
      console.log("RES QUERY LOG DATE --> " + JSON.stringify(res))
    });
    */

    console.log("dati del log --> " + this.data.toString());

    this.dateTime = "29/06/2022 11:52:35"

    let info = Array("Val1", "Val2", "Val3", "Val4", "Val5");
    let data = Array(this.data.toString(), "123", "123", "123", "123");

    for(let i=0; i<data.length; i++){
      this.values.push({key:info[i], value:data[i]})
    }

  }

}
