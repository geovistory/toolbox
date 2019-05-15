import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatProgressBarModule } from '@angular/material';
import { ProgressDialogComponent } from './progress-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressBarModule
  ],
  declarations: [ProgressDialogComponent],
  entryComponents: [ProgressDialogComponent]
})
export class ProgressDialogModule { }
