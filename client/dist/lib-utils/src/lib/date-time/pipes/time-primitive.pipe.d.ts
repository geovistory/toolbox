import { PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TimePrimitive } from '../classes/time-primitive';
export declare class TimePrimitivePipe implements PipeTransform {
    private datePipe;
    constructor(datePipe: DatePipe);
    transform(timePrimitive: TimePrimitive): string;
}
