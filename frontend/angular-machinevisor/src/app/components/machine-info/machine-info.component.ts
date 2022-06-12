import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwitchOffDialogComponent } from '../switch-off-dialog/switch-off-dialog.component';

@Component({
  selector: 'app-machine-info',
  templateUrl: './machine-info.component.html',
  styleUrls: ['./machine-info.component.scss']
})
export class MachineInfoComponent implements OnInit {
  @Input() machineID:any;

  constructor(public dialog: MatDialog) { }

  name = 'Machine1';
  status = 'Error';
  photo = '../../../assets/img/ciambella.jpeg';
  infoMix = Array()
  valuesMix = Array()
  isOnChecked = true;

  clickOn(){
    if(!this.isOnChecked){
      console.log("On");
      this.isOnChecked = !this.isOnChecked;
    }
  }

  clickOff(){
    if(this.isOnChecked){
      console.log("Off");
      this.openDialog();
      console.log("DIALOG --> " + this.isOnChecked)
      this.isOnChecked = !this.isOnChecked;
    }
  }

  clickCharts(){
    console.log("Go to Charts");
  }

  clickLog(){
    console.log("Go to Log");
  }

  private openDialog(): void {
    console.log("Apri dialog!")
    const dialogRef = this.dialog.open(SwitchOffDialogComponent, {
      width: '250px',
      data: {machineID: "machine-"+this.machineID},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed --> ' + result);
      this.isOnChecked = !result;
    });
  }

  ngOnInit(): void {
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
