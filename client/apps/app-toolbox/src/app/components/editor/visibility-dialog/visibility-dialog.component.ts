import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'gv-visibility-dialog',
  templateUrl: './visibility-dialog.component.html',
  styleUrls: ['./visibility-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule]
})
export class VisibilityDialogComponent {

  constructor(public dialogRef: MatDialogRef<VisibilityDialogComponent, void>) { }

  onClose(): void {
    this.dialogRef.close();
  }

}
