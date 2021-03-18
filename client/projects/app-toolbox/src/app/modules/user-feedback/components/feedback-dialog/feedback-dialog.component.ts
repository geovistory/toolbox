import { Component, Inject, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface FeedbackDialogData {

}
@Component({
  selector: 'gv-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent {
  @ViewChild('btnRef', { static: true }) buttonRef: MatButton;

  constructor(
    public dialogRef: MatDialogRef<FeedbackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FeedbackDialogData) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
