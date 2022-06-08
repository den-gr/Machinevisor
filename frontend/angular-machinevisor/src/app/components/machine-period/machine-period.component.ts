import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-machine-period',
  templateUrl: './machine-period.component.html',
  styleUrls: ['./machine-period.component.scss']
})
export class MachinePeriodComponent implements OnInit {

  constructor() { }

  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;
  tickInterval = 1;

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }
    return 0;
  }

  ngOnInit(): void {
  }

}
