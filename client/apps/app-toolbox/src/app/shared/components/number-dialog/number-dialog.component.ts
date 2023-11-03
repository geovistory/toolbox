import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface NumberDialogData {
  title: string;
}
export type NumberDialogReturn = number | undefined;

@Component({
  selector: 'gv-number-dialog',
  templateUrl: './number-dialog.component.html',
  styleUrls: ['./number-dialog.component.scss']
})
export class NumberDialogComponent {

  toReturn: number;

  constructor(
    public dialogRef: MatDialogRef<NumberDialogComponent, NumberDialogReturn>,
    @Inject(MAT_DIALOG_DATA) public data: NumberDialogData) { }

  validate(): void {
    this.dialogRef.close(this.toReturn);
  }

  cancel(): void {
    this.dialogRef.close()
  }
}
