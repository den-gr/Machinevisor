import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-machine-info',
  templateUrl: './machine-info.component.html',
  styleUrls: ['./machine-info.component.scss']
})
export class MachineInfoComponent implements OnInit {

  constructor() { }

  name = 'Machine1';
  status = 'Error';
  photo = '../../../assets/img/ciambella.jpeg';
  infoMix = Array()
  valuesMix = Array()

  clickCharts(){
    console.log("Go to Charts");
  }

  clickLog(){
    console.log("Go to Log");
  }

  ngOnInit(): void {
    let info = Array({"Weight":"100kg", "Year":"2010", "Key3":"Val3", "Key4":"Val4", "Key5":"Val5"})
    let values = Array({"Value1":["123", true], "Value2":["456", false], "Value3":["789", true], "Value4":["1011", true], "Value5":["1213", true]})

    let infoKey = Object.keys(info[0])
    let infoVal = Object.values(info[0])
    let valuesKey = Object.keys(values[0])
    let valuesVal = Object.values(values[0])

    for(let i=0; i<infoKey.length; i++){
      this.infoMix.push({key:infoKey[i], value:infoVal[i]})
    }

    for(let i=0; i<valuesKey.length; i++){
      this.valuesMix.push({key:valuesKey[i], value:valuesVal[i][0], error:valuesVal[i][1]})
    }

    console.log(this.valuesMix)
  }

}
