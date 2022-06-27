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

  public clickOff(name: string){
    if(this.isOnChecked){
      console.log("Off --> " + name);
      this.openDialog(name);
      console.log("DIALOG --> " + this.isOnChecked)
      this.isOnChecked = !this.isOnChecked;
    }
  }

  private openDialog(name: string): void {
    console.log("Apri dialog!")
    const dialogRef = this.dialog.open(SwitchOffDialogComponent, {
      width: '250px',
      data: {machineName: name},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed --> ' + result);
      this.isOnChecked = !result;
    });
  }

}
