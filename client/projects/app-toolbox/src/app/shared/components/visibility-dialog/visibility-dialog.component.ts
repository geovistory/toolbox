import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface VisibilityDialogData { }

@Component({
  selector: 'gv-visibility-dialog',
  templateUrl: './visibility-dialog.component.html',
  styleUrls: ['./visibility-dialog.component.scss']
})
export class VisibilityDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<VisibilityDialogComponent, void>,
    @Inject(MAT_DIALOG_DATA) public data: VisibilityDialogData) { }

  onClose(): void {
    this.dialogRef.close();
  }

}
