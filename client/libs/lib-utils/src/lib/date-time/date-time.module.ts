import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimePrimitivePipe } from './pipes/time-primitive.pipe';
import { TimeSpanPipe } from './pipes/time-span.pipe';

@NgModule({
    imports: [
        CommonModule,
        TimeSpanPipe,
        TimePrimitivePipe,
    ],
    providers: [
        TimePrimitivePipe,
        TimeSpanPipe,
        DatePipe
    ],
    exports: [
        TimeSpanPipe,
        TimePrimitivePipe,
    ]
})
export class DateTimeModule { }
