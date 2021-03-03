import { DatePipe } from '@angular/common';
import { PipeTransform } from '@angular/core';
import { TimePrimitiveWithCal } from '@kleiolab/lib-sdk-lb4';
export declare class TimePrimitivePipe implements PipeTransform {
    private datePipe;
    constructor(datePipe: DatePipe);
    transform(timePrimitive: TimePrimitiveWithCal): string;
}
