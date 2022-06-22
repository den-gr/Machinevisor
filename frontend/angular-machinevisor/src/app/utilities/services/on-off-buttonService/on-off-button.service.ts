import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwitchOffDialogComponent } from '../../../components/switch-off-dialog/switch-off-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class OnOffButtonService {

  private isOnChecked = true;

  constructor(public dialog: MatDialog) { }

  getIsOnChecked(){
    return this.isOnChecked;
  }

  public clickOn(){
    if(!this.isOnChecked){
      console.log("On");
      this.isOnChecked = !this.isOnChecked;
    }
  }

  public clickOff(ID: string){
    if(this.isOnChecked){
      console.log("Off");
      this.openDialog(ID);
      console.log("DIALOG --> " + this.isOnChecked)
      this.isOnChecked = !this.isOnChecked;
    }
  }

  private openDialog(ID: string): void {
    console.log("Apri dialog!")
    const dialogRef = this.dialog.open(SwitchOffDialogComponent, {
      width: '250px',
      data: {machineID: "machine-"+ ID},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed --> ' + result);
      this.isOnChecked = !result;
    });
  }

}
