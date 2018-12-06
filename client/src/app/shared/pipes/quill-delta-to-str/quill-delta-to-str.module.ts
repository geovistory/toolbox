import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillDeltaToStrPipe } from './quill-delta-to-str.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [QuillDeltaToStrPipe],
  exports: [QuillDeltaToStrPipe]
})
export class QuillDeltaToStrModule { }
