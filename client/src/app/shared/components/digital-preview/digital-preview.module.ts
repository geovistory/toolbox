import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
