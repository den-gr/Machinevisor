import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Log } from 'src/app/utilities/dataInterfaces/log';
import { APIService } from 'src/app/utilities/services/APIService/api.service';

@Component({
  selector: 'app-log-card',
  templateUrl: './log-card.component.html',
  styleUrls: ['./log-card.component.scss']
})
export class LogCardComponent implements OnInit {

  constructor(public datepipe: DatePipe) { }

  @Input() data: Log;

  dateTime = ''
  values = Array();

  ngOnInit(): void {

    const newDate = this.datepipe.transform(this.data.timestamp, 'dd/MM/yyyy hh:mm:ss');
    this.dateTime = newDate !== null ? newDate : ''

    let info = Array("State", "Modality", "Temperature", "Energy consumption", "Working time");
    let data = Array(
      this.data.state,
      this.data.modality,
      this.data.temperature.toString(), 
      this.data.kWatt.toString(), 
      this.data.working_time.toString());
    let unit = Array("", "", "°C", "KWatt", "s");

    if(this.data.machine_oil_level){
      info.push("Oil level"),
      data.push(this.data.machine_oil_level.toString()),
      unit.push("m")
    }

    for(let i=0; i<data.length; i++){
      this.values.push({key:info[i], value:data[i], unit:unit[i]});
    }
  }

}
