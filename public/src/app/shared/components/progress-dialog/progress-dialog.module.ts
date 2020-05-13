import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'app/core/material/material.module';
import { ProgressDialogComponent } from './progress-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ProgressDialogComponent],
  entryComponents: [ProgressDialogComponent]
})
export class ProgressDialogModule { }
