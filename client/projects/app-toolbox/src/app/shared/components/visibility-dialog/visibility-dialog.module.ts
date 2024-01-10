import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { VisibilityDialogComponent } from './visibility-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  declarations: [VisibilityDialogComponent]
})
export class VisibilityDialogModule { }
