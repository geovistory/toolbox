import { Component, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'gv-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent {
  @ViewChild('btnRef', { static: true }) buttonRef: MatButton;

  constructor(
    public dialogRef: MatDialogRef<FeedbackDialogComponent>) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
