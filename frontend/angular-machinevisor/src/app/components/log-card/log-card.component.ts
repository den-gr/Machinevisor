import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/utilities/services/APIService/api.service';

@Component({
  selector: 'app-log-card',
  templateUrl: './log-card.component.html',
  styleUrls: ['./log-card.component.scss']
})
export class LogCardComponent implements OnInit {

  constructor(private apiService: APIService, public datepipe: DatePipe) { }

  dateTime = ''
  values = Array();

  ngOnInit(): void {
    this.dateTime = "29/06/2022 11:52:35"

    let info = Array("Val1", "Val2", "Val3", "Val4", "Val5");
    let data = Array("123", "123", "123", "123", "123");

    for(let i=0; i<data.length; i++){
      this.values.push({key:info[i], value:data[i]})
    }

  }

}
