import { PipeTransform } from '@angular/core';
import { TimePrimitivePipe } from './time-primitive.pipe';
import { TimeSpanUtil } from '../classes/time-span-util';
export declare class TimeSpanPipe implements PipeTransform {
    private timePrimitivePipe;
    constructor(timePrimitivePipe: TimePrimitivePipe);
    transform(timeSpan: TimeSpanUtil): string;
    getString(t: any): string;
}
