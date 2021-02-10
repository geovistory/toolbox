import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadMoreComponent } from './read-more.component';
import { PassiveLinkModule } from 'projects/toolbox/src/app/shared';

@NgModule({
  imports: [
    CommonModule,
    PassiveLinkModule
  ],
  declarations: [
    ReadMoreComponent
  ],
  exports: [
    ReadMoreComponent
  ]
})
export class ReadMoreModule { }
