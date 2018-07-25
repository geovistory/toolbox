import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HighlightPipe } from './highlight.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HighlightPipe
  ],
  exports: [
    HighlightPipe
  ]
})
export class HighlightModule { }
