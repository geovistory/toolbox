import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TimePrimitivePipe } from './time-primitive.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [DatePipe],
  declarations: [
    TimePrimitivePipe,
  ],
  exports: [
    TimePrimitivePipe
  ]
})
export class TimePrimitivePipeModule { }
