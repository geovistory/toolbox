import { Pipe, PipeTransform } from '@angular/core';
import { TimeSpan } from 'app/core';
import { TimePrimitive } from 'app/core/date-time/time-primitive';
import { TimePrimitivePipe } from '../time-primitive/time-primitive.pipe';

@Pipe({
  name: 'timeSpan'
})
export class TimeSpanPipe implements PipeTransform {

  constructor(private timePrimitivePipe: TimePrimitivePipe) { }

  transform(timeSpan: TimeSpan): string {
    if (!timeSpan) return null;

    const ts = new TimeSpan(timeSpan).getPrimitivesForPreview();
    // nothing
    if (!ts.single && !ts.begin && !ts.end) return '';

    // only sinlge
    if (ts.single && !(ts.begin || ts.end)) return this.getString(ts.single);

    // only begin and end
    if (ts.begin && ts.end && !ts.single) return this.getString(ts.begin) + ' – ' + this.getString(ts.end);

    // only sinlge and end
    if (ts.single && ts.end && !ts.begin) return this.getString(ts.single) + ' – ' + this.getString(ts.end);

    // only begin and sinlge
    if (ts.begin && ts.single && !ts.end) return this.getString(ts.begin) + ' – ' + this.getString(ts.single);

    // all three
    return this.getString(ts.begin) + ' – ' + this.getString(ts.end);
  }

  getString(t: TimePrimitive): string {
    const s = this.timePrimitivePipe.transform(t);
    return s ? s : '(?)';
  }

}

