import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


export interface NumberDialogData {
  title: string;
}
export type NumberDialogReturn = number | undefined;

@Component({
    selector: 'gv-number-dialog',
    templateUrl: './number-dialog.component.html',
    styleUrls: ['./number-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule]
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
