import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimePrimitivePipe } from './pipes/time-primitive.pipe';
import { TimeSpanPipe } from './pipes/time-span.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    TimePrimitivePipe,
    TimeSpanPipe
  ],
  declarations: [
    TimeSpanPipe,
    TimePrimitivePipe,
  ],
  exports: [
    TimeSpanPipe,
    TimePrimitivePipe,
  ]
})
export class DateTimeModule { }
