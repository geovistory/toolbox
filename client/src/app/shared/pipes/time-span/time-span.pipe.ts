import { Pipe, PipeTransform } from '@angular/core';
import { TimeSpan } from 'app/core';
import { TimePrimitivePipe } from '../time-primitive/time-primitive.pipe';

@Pipe({
  name: 'timeSpan'
})
export class TimeSpanPipe implements PipeTransform {

  constructor(private timePrimitivePipe: TimePrimitivePipe) { }

  transform(timeSpan: TimeSpan): string {
    if (!timeSpan) return null;

    const ts = new TimeSpan(timeSpan).getPrimitivesForPreview();

    // only sinlge
    if (ts.single && !(ts.begin || ts.end)) return this.timePrimitivePipe.transform(ts.single);

    // only begin and end
    if (ts.begin && ts.end && !ts.single) return this.timePrimitivePipe.transform(ts.begin) + ' – ' + this.timePrimitivePipe.transform(ts.end);

    // only sinlge and end
    if (ts.single && ts.end && !ts.begin) return this.timePrimitivePipe.transform(ts.single) +  ' – ' + this.timePrimitivePipe.transform(ts.end);

    // only begin and sinlge
    if (ts.begin && ts.single && !ts.end) return this.timePrimitivePipe.transform(ts.begin) + ' – ' + this.timePrimitivePipe.transform(ts.single);

    // all three
    return this.timePrimitivePipe.transform(ts.begin) + ' – ' + this.timePrimitivePipe.transform(ts.end);
  }

}

