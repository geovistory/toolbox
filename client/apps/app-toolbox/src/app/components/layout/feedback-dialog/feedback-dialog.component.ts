import { Component, ViewChild } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'gv-feedback-dialog',
    templateUrl: './feedback-dialog.component.html',
    styleUrls: ['./feedback-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, MatTooltipModule, MatIconModule]
})
export class FeedbackDialogComponent {
  @ViewChild('btnRef', { static: true }) buttonRef: MatButton;

  constructor(
    public dialogRef: MatDialogRef<FeedbackDialogComponent>) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
