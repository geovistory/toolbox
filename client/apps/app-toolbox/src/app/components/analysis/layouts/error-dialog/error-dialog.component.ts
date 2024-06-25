import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, JsonPipe } from '@angular/common';
export interface ErrorDialogData {
  title?: string;
  subtitle?: string;
  errorReport?: {
    title?: string
    json?: object
    text?: string
  }
}


@Component({
    selector: 'gv-error-dialog',
    templateUrl: './error-dialog.component.html',
    styleUrls: ['./error-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, NgIf, MatButtonModule, MatIconModule, MatDividerModule, JsonPipe]
})
export class ErrorDialogComponent {
  showReport = false
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ErrorDialogData) {
    data.title = data.title ? data.title : 'Oops, something went wrong...'
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true)
  }
}
