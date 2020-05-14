import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimePrimitivePipeModule } from '../time-primitive/time-primitive.module';
import { TimePrimitivePipe } from '../time-primitive/time-primitive.pipe';
import { TimeSpanPipe } from './time-span.pipe';

@NgModule({
  imports: [
    CommonModule,
    TimePrimitivePipeModule
  ],
  providers: [TimePrimitivePipe, TimeSpanPipe],
  declarations: [
    TimeSpanPipe,
  ],
  exports: [
    TimeSpanPipe
  ]
})
export class TimeSpanPipeModule { }
