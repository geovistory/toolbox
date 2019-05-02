import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillOpsToStrPipe } from './quill-delta-to-str.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [QuillOpsToStrPipe],
  exports: [QuillOpsToStrPipe]
})
export class QuillDeltaToStrModule { }
