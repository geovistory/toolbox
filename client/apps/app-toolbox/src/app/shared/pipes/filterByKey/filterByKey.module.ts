import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FilterByKeyPipe } from './filterByKey.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FilterByKeyPipe
  ],
  exports: [
    FilterByKeyPipe
  ]
})
export class FilterByKeyModule { }
