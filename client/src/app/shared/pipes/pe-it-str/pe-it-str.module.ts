
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PeItStrPipe } from './pe-it-str.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PeItStrPipe,
  ],
  exports: [
    PeItStrPipe
  ]
})
export class PeItStrModule { }
