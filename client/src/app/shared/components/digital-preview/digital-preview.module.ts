import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { DigitalPreviewComponent } from './digital-preview.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [DigitalPreviewComponent],
  exports: [DigitalPreviewComponent]
})
export class DigitalPreviewModule { }
