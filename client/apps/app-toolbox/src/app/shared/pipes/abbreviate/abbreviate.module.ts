import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AbbreviatePipe } from './abbreviate.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [AbbreviatePipe],
  declarations: [AbbreviatePipe],
  exports: [AbbreviatePipe]
})
export class AbbreviateModule { }
