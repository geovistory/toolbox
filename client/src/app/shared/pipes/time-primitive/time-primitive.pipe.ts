import { Pipe, PipeTransform } from '@angular/core';
import { TimePrimitive } from 'app/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'timePrimitive'
})
export class TimePrimitivePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) { }

  transform(timePrimitive: TimePrimitive): string {
    if (!timePrimitive) return null;

    const tp = new TimePrimitive(timePrimitive)

    const dt = tp.getDateTime();

    return this.datePipe.transform(dt.getDate(), tp.getShortesDateFormatString());

  }

}

