import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-machine-modes',
  templateUrl: './machine-modes.component.html',
  styleUrls: ['./machine-modes.component.scss']
})
export class MachineModesComponent implements OnInit {

  constructor() { }

  modes = Array()

  onChangeValue(val: String){
    console.log("Selezionato --> " + val);
  }

  ngOnInit(): void {
    this.modes = Array('Sleepmode', 'Cool down', 'Fast production')
  }

}
