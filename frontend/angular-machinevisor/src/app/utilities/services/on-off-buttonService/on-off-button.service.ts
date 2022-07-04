import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwitchOffDialogComponent } from '../../../components/switch-off-dialog/switch-off-dialog.component';
import { Log } from '../../dataInterfaces/log';
import { SocketService } from '../socketService/socket.service';

@Injectable({
  providedIn: 'root'
})
export class OnOffButtonService {

  private isOnChecked:boolean /*= true*/;

  constructor(public dialog: MatDialog, private socketService: SocketService) { }

  setIsOnChecked(val: boolean){
    this.isOnChecked = val;
  }

  getIsOnChecked(){
    return this.isOnChecked;
  }

  public clickOn(ID: number){
    if(!this.isOnChecked){
      console.log("On");
      this.isOnChecked = true;
      this.socketService.setState(ID,'ON');
    }
  }

  public clickOff(name: string, ID:number){
    if(this.isOnChecked){
      console.log("Off --> " + name);
      this.openDialog(name, ID);
      console.log("DIALOG --> " + this.isOnChecked)
      this.isOnChecked = !this.isOnChecked;
    }
  }

  private openDialog(name: string, ID:number): void {
    console.log("Apri dialog!")
    const dialogRef = this.dialog.open(SwitchOffDialogComponent, {
      width: '250px',
      data: {machineName: name},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed --> ' + result);
      this.isOnChecked = !result;
      if(result){
        this.socketService.setState(ID,'OFF');
      }
    });
  }

}
