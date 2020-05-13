import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailContentComponent } from './detail-content.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DetailContentComponent],
  exports: [DetailContentComponent]
})
export class DetailContentModule { }
