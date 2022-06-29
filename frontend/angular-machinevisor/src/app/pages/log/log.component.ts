import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  machineID = ''
  machineName = ''

  constructor(private routes: ActivatedRoute) { }

  ngOnInit(): void {
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
