import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
export interface ConfirmDialogData {

  title: string;
  paragraphs: string[];

  noBtnText: string;
  noBtnColor?: 'primary' | 'warn' | 'accent'

  yesBtnText: string;
  yesBtnColor?: 'primary' | 'warn' | 'accent'

  hideNoButton?: boolean;

}

export type ConfirmDialogReturn = boolean

@Component({
    selector: 'gv-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, NgFor, NgIf, MatButtonModule]
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent, ConfirmDialogReturn>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true)
  }
}
