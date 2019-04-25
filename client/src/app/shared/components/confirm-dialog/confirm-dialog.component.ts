import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../node_modules/@angular/material';
export interface ConfirmDialogData {

  title: string;
  paragraphs: string[];

  noBtnText: string;
  noBtnColor?: 'primary' | 'warn' | 'accent'

  yesBtnText: string;
  yesBtnColor?: 'primary' | 'warn' | 'accent' 


}


@Component({
  selector: 'gv-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true)
  }
}
