import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { APIService } from 'src/app/utilities/services/APIService/api.service';
import { NavigationService } from 'src/app/utilities/services/navigationService/navigation.service';
import { OnOffButtonService } from 'src/app/utilities/services/on-off-buttonService/on-off-button.service';

@Component({
  selector: 'app-machine-info',
  templateUrl: './machine-info.component.html',
  styleUrls: ['./machine-info.component.scss']
})
export class MachineInfoComponent implements OnInit {
  @Input() machineID:any;

  constructor(private navService: NavigationService, public buttonService: OnOffButtonService, private apiService: APIService, public datepipe: DatePipe) { }

  name = '';
  status = 'Error';
  photo = '../../../assets/img/ciambella.jpeg';
  infoMix = Array()
  valuesMix = Array()

  goTo(page: string){
    this.navService.goToPageWithParameters(page, this.machineID.toString());
  }

  ngOnInit(): void {


    this.apiService.getMachineInfo(this.machineID).subscribe(data => {
      console.log("machine -> " + data.production_year);
      this.name = data.machine_name;

      const prodY = this.datepipe.transform(data.production_year, 'dd/MM/yyyy');
      const lastR = this.datepipe.transform(data.last_revision, 'dd/MM/yyyy');

      let info = Array({"Weight":data.weight, "Brand":data.brand, "Prod. year":prodY, 
      "Last rev.":lastR, "Contacts":data.client_service_number})

      let infoKey = Object.keys(info[0])
      let infoVal = Object.values(info[0])

      for(let i=0; i<infoKey.length; i++){
        this.infoMix.push({key:infoKey[i], value:infoVal[i]})
      }
    });
    
    //socket
    let values = Array({"Value1":["123", true], "Value2":["456", false], "Value3":["789", true], "Value4":["1011", true], "Value5":["1213", true]})

    let valuesKey = Object.keys(values[0])
    let valuesVal = Object.values(values[0])

    for(let i=0; i<valuesKey.length; i++){
      this.valuesMix.push({key:valuesKey[i], value:valuesVal[i][0], error:valuesVal[i][1]})
    }

    console.log(this.valuesMix)
  }

}
