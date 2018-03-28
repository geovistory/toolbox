import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassiveLinkDirective } from './passive-link.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PassiveLinkDirective
  ],
  exports: [
    PassiveLinkDirective
  ]
})
export class PassiveLinkModule { }
