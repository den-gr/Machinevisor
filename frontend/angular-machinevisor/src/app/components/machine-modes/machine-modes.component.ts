import { Component, Input, OnInit } from '@angular/core';
import { Log } from 'src/app/utilities/dataInterfaces/log';
import { APIService } from 'src/app/utilities/services/APIService/api.service';
import { SocketService } from 'src/app/utilities/services/socketService/socket.service';

export interface Mode{
  view: string,
  val: String
}

@Component({
  selector: 'app-machine-modes',
  templateUrl: './machine-modes.component.html',
  styleUrls: ['./machine-modes.component.scss']
})

export class MachineModesComponent implements OnInit {
  @Input() machineID:any;

  constructor(private apiService: APIService, private socketService: SocketService) { }

  modes = Array<Mode>()
  currMode = "";
  isDisabled = true;

  onChangeValue(val: String){
    console.log("Selezionato --> " + val);
    if(val !== this.currMode){
      this.socketService.setModality(1, val)
    }
  }

  ngOnInit(): void {
    this.socketService.getSocket().on('update', (msg: string) => {
      let log: Log = JSON.parse(msg);
      this.currMode = log.modality
      console.log(this.currMode !== "NO_MODE")
      this.isDisabled = this.currMode == "NO_MODE"
    });

    this.apiService.getMachineInfo(this.machineID).subscribe(res => {
      res.modalities.forEach(mode => {
        let tmp = '';
        tmp = mode.toLowerCase()
        tmp = tmp.replaceAll('_', ' ');
        console.log("mode --> " + mode + " | curr --> " + this.currMode)
        this.modes.push({view : tmp, val : mode})
      });
    });
  }

}
