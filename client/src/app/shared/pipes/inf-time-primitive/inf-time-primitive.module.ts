import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfTimePrimitivePipe } from './inf-time-primitive.pipe';
import { TimePrimitivePipe } from '../time-primitive/time-primitive.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [TimePrimitivePipe],
  declarations: [
    InfTimePrimitivePipe,
  ],
  exports: [
    InfTimePrimitivePipe
  ]
})
export class InfTimePrimitivePipeModule { }
