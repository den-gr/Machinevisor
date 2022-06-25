import { Component, Input, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/utilities/services/navigationService/navigation.service';
import { OnOffButtonService } from 'src/app/utilities/services/on-off-buttonService/on-off-button.service';

@Component({
  selector: 'app-machine-info',
  templateUrl: './machine-info.component.html',
  styleUrls: ['./machine-info.component.scss']
})
export class MachineInfoComponent implements OnInit {
  @Input() machineID:any;

  constructor(private navService: NavigationService, public buttonService: OnOffButtonService) { }

  name = '';
  status = 'Error';
  photo = '../../../assets/img/ciambella.jpeg';
  infoMix = Array()
  valuesMix = Array()

  goTo(page: string){
    this.navService.goToPageWithParameters(page, this.machineID.toString());
  }

  ngOnInit(): void {
    this.name = 'Machine-'+ this.machineID;
    console.log("---> " + this.machineID);
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
