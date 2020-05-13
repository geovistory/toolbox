import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'app/core/material/material.module';
import { DigitalPreviewComponent } from './digital-preview.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [DigitalPreviewComponent],
  exports: [DigitalPreviewComponent]
})
export class DigitalPreviewModule { }
