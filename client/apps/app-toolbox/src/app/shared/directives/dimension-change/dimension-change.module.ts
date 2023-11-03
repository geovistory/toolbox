import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DimensionChangeDirective } from './dimension-change.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DimensionChangeDirective
  ],
  exports: [
    DimensionChangeDirective
  ]
})
export class DimensionChangeModule { }
