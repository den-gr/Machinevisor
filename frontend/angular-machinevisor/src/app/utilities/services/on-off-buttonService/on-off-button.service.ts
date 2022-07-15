import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwitchOffDialogComponent } from '../../../components/switch-off-dialog/switch-off-dialog.component';
import { Log } from '../../dataInterfaces/log';
import { SocketService } from '../socketService/socket.service';

@Injectable({
  providedIn: 'root'
})
export class OnOffButtonService {

  private isOnChecked:boolean;

  constructor(public dialog: MatDialog, private socketService: SocketService) { }

  setIsOnChecked(val: boolean){
    this.isOnChecked = val;
  }

  getIsOnChecked(){
    return this.isOnChecked;
  }

  public clickOn(ID: number){
    if(!this.isOnChecked){
      this.isOnChecked = true;
      this.socketService.setState(ID,'ON');
    }
  }

  public clickOff(name: string, ID:number){
    if(this.isOnChecked){
      this.openDialog(name, ID);
      this.isOnChecked = !this.isOnChecked;
    }
  }

  private openDialog(name: string, ID:number): void {
    const dialogRef = this.dialog.open(SwitchOffDialogComponent, {
      width: '250px',
      data: {machineName: name},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isOnChecked = !result;
      if(result){
        this.socketService.setState(ID,'OFF');
      }
    });
  }

}
