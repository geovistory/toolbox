import { TimePrimitiveWithCal, WarEntityPreviewTimeSpan } from '@kleiolab/lib-sdk-lb4';
import { TimePrimitive } from './time-primitive';
// export interface InfTimePrimitiveWithCalendar extends InfTimePrimitive {
//   calendar: CalendarType
// }
export interface TimeSpanResult {
  julianDay: number,
  calendar: TimePrimitiveWithCal.CalendarEnum
  duration: TimePrimitiveWithCal.DurationEnum
}

export interface TimeSpanWithNumberProps {
  // key is the dfh_pk_property, expressing what the time primitive means for the time span
  72?: TimeSpanResult; // p82 | At some time within | outer bounds | not before – not after
  152?: TimeSpanResult; // p82a | begin of the begin | left outer bound | not before
  153?: TimeSpanResult; // p82b | end of the end | right outer bound | not after
  71?: TimeSpanResult; // p81 | Ongoing throughout | inner bounds | surely from – surely to
  150?: TimeSpanResult; // p81a | end of the begin | left inner bound | surely from
  151?: TimeSpanResult; // p81b | begin of the end | right inner bound | surely to
}
export class TimeSpanUtil {

  readonly tpKeys = ['p82', 'p81', 'p82a', 'p82b', 'p81a', 'p81b']

  p82?: TimePrimitive; // At some time within | outer bounds | not before – not after
  p81?: TimePrimitive; // Ongoing throughout | inner bounds | surely from – surely to
  p82a?: TimePrimitive; // begin of the begin | left outer bound | not before
  p81a?: TimePrimitive; // end of the begin | left inner bound | surely from
  p81b?: TimePrimitive; // begin of the end | right inner bound | surely to
  p82b?: TimePrimitive; // end of the end | right outer bound | not after

  /**
  * get the earliest and latest TimePrimitive of given array of TimePrimitives
  *
  * For earliest it compares the begin of TimePrimitive duration
  * For latest it compares the last second of TimePrimitive duration
  *
  * @returns object with min Date and max Date or null, if no TimePrimitive available
  */
  static getMinMaxTimePrimitveOfArray(tps: TimePrimitive[]) {

    if (!tps || tps.length < 1) return null;

    let min = tps[0];
    let max = tps[0];

    tps.forEach(tp => {

      // if this timePrimitive is earlier than min, set this as new min
      min = tp.getJulianSecond() < min.getJulianSecond() ? tp : min;

      // if this timePrimitive is later than max, set this as new max
      max = tp.getJulianSecond() > max.getJulianSecond() ? tp : max;
      //  check if we would need the latest second here?
      // max = tp.getLastSecond() > max.getLastSecond() ? tp : max;


    })

    return { min: min, max: max };
  }

  static fromTimeSpanDialogData(d: TimeSpanWithNumberProps = {}): TimeSpanUtil {
    if (!d) d = {};
    const x = {}
    if (d['72']) x['p82'] = d['72'];
    if (d['71']) x['p81'] = d['71'];
    if (d['152']) x['p82a'] = d['152'];
    if (d['150']) x['p81a'] = d['150'];
    if (d['151']) x['p81b'] = d['151'];
    if (d['153']) x['p82b'] = d['153'];
    return new TimeSpanUtil(x)
  }


  get earliestDay() {

    if (this.isEmpty()) return null;

    let min = Number.POSITIVE_INFINITY;

    this.tpKeys.forEach(key => {
      if (this[key]) {
        const current = this[key].julianDay;
        // if this timePrimitive is earlier than min, set this as new min
        min = current < min ? current : min;
      }
    })

    return min;
  }

  constructor(data?: WarEntityPreviewTimeSpan) {
    if (data) {
      Object.keys(data).forEach(key => data[key] === undefined ? delete data[key] : '');
      Object.assign(this, data);
      this.tpKeys.forEach(key => {
        if (this[key]) this[key] = new TimePrimitive(this[key]);
      })
    }
  }


  /**
   * returns true if no TimePrimitive is there
   */
  isEmpty(): boolean {
    return !this.isNotEmpty()
  }
  /**
   * returns true if at least one TimePrimitive is there
   */
  isNotEmpty(): boolean {
    if (this.p82 || this.p81 || this.p82a || this.p82b || this.p81a || this.p81b) return true
    else return false
  }


  /**
  * get the earliest and latest TimePrimitive of this TimeSpan
  *
  * For earliest it compares the begin of TimePrimitive duration
  * For latest it compares the last second of TimePrimitive duration
  *
  * @returns object with min Date and max Date or null, if no TimePrimitive available
  */
  getMinMaxTimePrimitive(): { min: TimePrimitive, max: TimePrimitive } | null {
    return TimeSpanUtil.getMinMaxTimePrimitveOfArray(this.getArrayOfTimePrimitives());
  }

  /**
   * @returns array of TimePrimitives of this TimeSpan
   */
  getArrayOfTimePrimitives(): TimePrimitive[] {
    const array = [];

    this.tpKeys.forEach(key => {
      if (this[key]) {
        array.push(this[key]);
      }
    })

    return array;
  }

  getPrimitivesForPreview(): { single?: TimePrimitive, begin?: TimePrimitive, end?: TimePrimitive } {
    const single = this.p82 || this.p81;
    const begin = this.p82a || this.p81a;
    const end = this.p82b || this.p81b;
    return { single, begin, end };
  }

}
