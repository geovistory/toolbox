import { Pipe, PipeTransform } from '@angular/core';
import { TimePrimitive } from 'app/core/date-time/time-primitive';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'timePrimitive'
})
export class TimePrimitivePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) { }

  transform(timePrimitive: TimePrimitive): string {
    if (!timePrimitive) return null;

    const tp = new TimePrimitive(timePrimitive)

    if (!tp) return null;

    const dt = tp.getDateTime();

    if (!dt) return null;

    // This is a hack for dataPipe, because datePipe subtracts 1 year from BC
    // Probably to avoid the year 0
    if (dt.year < 0) dt.year = dt.year + 1;

    if (!dt.day) dt.day = 31;

    const date = dt.getDate()

    return this.datePipe.transform(date, tp.getShortesDateFormatString());

  }

}

