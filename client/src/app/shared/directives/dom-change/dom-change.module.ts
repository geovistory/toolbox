import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomChangeDirective } from './dom-change.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DomChangeDirective
  ],
  exports: [
    DomChangeDirective
  ]
})
export class DomChangeModule { }
