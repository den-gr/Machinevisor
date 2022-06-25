import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  machineName: string;
}

@Component({
  selector: 'app-switch-off-dialog',
  templateUrl: './switch-off-dialog.component.html',
  styleUrls: ['./switch-off-dialog.component.scss']
})
export class SwitchOffDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SwitchOffDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
