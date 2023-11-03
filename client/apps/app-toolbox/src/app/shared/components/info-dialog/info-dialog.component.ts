import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface InfoDialogData {
  title: string;
  infos: string;
}
export type InfoDialogReturn = undefined;

@Component({
  selector: 'gv-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent, InfoDialogReturn>,
    @Inject(MAT_DIALOG_DATA) public data: InfoDialogData) { }

  close(): void {
    this.dialogRef.close()
  }
}
