import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from 'src/app/utilities/services/socketService/socket.service';

@Component({
  selector: 'app-machine-period',
  templateUrl: './machine-period.component.html',
  styleUrls: ['./machine-period.component.scss']
})
export class MachinePeriodComponent implements OnInit {
  @Input() machineID:any;

  constructor(private socketService: SocketService) { }

  autoTicks = false;
  disabled = false;
  invert = false;
  max = 120;
  min = 5;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 20;
  vertical = false;
  tickInterval = 1;

  public onChangePeriod(){
    console.log("period -->" + this.value);
    this.socketService.setMachinePeriod(1, (this.value*1000))
  }

  ngOnInit(): void {
  }

}
