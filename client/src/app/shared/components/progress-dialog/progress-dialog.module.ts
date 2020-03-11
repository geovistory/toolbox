import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressDialogComponent } from './progress-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressBarModule
  ],
  declarations: [ProgressDialogComponent],
})
export class ProgressDialogModule { }
