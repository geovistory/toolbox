import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadMoreComponent } from './read-more.component';
import { PassiveLinkModule } from 'app/shared';

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
