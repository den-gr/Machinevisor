import { Component, Input, OnInit } from '@angular/core';
import { APIService } from 'src/app/utilities/services/APIService/api.service';

@Component({
  selector: 'app-machine-modes',
  templateUrl: './machine-modes.component.html',
  styleUrls: ['./machine-modes.component.scss']
})
export class MachineModesComponent implements OnInit {
  @Input() machineID:any;

  constructor(private apiService: APIService) { }

  modes = Array()

  onChangeValue(val: String){
    console.log("Selezionato --> " + val);
  }

  ngOnInit(): void {
    this.apiService.getMachineInfo(this.machineID).subscribe(res => {
      res.modalities.forEach(mode => {
        let tmp = '';
        tmp = mode.toLowerCase()
        tmp = tmp.replaceAll('_', ' ');
        this.modes.push(tmp)
      });
    });
  }

}
