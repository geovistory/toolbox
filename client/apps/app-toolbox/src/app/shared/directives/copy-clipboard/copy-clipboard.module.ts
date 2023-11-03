import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CopyClipboardDirective } from './copy-clipboard.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CopyClipboardDirective
  ],
  exports: [
    CopyClipboardDirective
  ]
})
export class CopyClipboardModule { }
