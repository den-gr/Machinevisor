import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from 'src/app/utilities/services/socketService/socket.service';

export interface Period {
  machine_id: number,
  period: number
}

@Component({
  selector: 'app-machine-period',
  templateUrl: './machine-period.component.html',
  styleUrls: ['./machine-period.component.scss']
})
export class MachinePeriodComponent implements OnInit {
  @Input() machineID: number;

  constructor(private socketService: SocketService) { }

  autoTicks = false;
  disabled = false;
  invert = false;
  max = 120;
  min = 5;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value: number;
  vertical = false;
  tickInterval = 1;

  formatLabel(value: number) {
    return value;
  }

  public onChangePeriod() {
    this.socketService.setMachinePeriod(this.machineID, (this.value * 1000))
  }

  ngOnInit(): void {
    this.socketService.getSocket().on("periodUpdate", (msg: string) => {
      let period: Period = JSON.parse(msg);
      this.value = period.period/1000;
    });
    this.socketService.getPeriod(this.machineID);
  }

}
