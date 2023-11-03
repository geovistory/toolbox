import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressDialogComponent } from './progress-dialog.component';
import { MaterialModule } from '../../../core/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ProgressDialogComponent]
})
export class ProgressDialogModule { }
