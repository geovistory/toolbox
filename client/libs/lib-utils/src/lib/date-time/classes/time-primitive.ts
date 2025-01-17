
import { TimePrimitiveWithCal } from '@kleiolab/lib-sdk-lb4';
import { Granularity } from './date-time-commons';
import { GregorianDateTime } from './gregorian-date-time';
import { JulianDateTime } from './julian-date-time';

export type CalendarType = TimePrimitiveWithCal.CalendarEnum



export class TimePrimitive {

  // Last day of the era before christ
  readonly LAST_DAY_BC = 1721422;

  julianDay: number;
  duration: TimePrimitiveWithCal.DurationEnum;
  calendar: TimePrimitiveWithCal.CalendarEnum; // the calendar initialy used by user to create time primitive

  constructor(data?: TimePrimitiveWithCal) {
    Object.assign(this, data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((data as any).julian_day) this.julianDay = (data as any).julian_day
  }

  getGregorianDateTime(): GregorianDateTime {
    const g = new GregorianDateTime()
    g.fromJulianDay(this.julianDay);
    return g;
  }

  getJulianDateTime(): JulianDateTime {
    const j = new JulianDateTime()
    j.fromJulianDay(this.julianDay);
    return j;
  }



  /**
   * Get a DateTime object according to the given calendar.
   *
   */
  getDateTime(calendar: CalendarType = this.calendar): GregorianDateTime | JulianDateTime | null {

    if (calendar === 'gregorian') return this.getGregorianDateTime();

    if (calendar === 'julian') return this.getJulianDateTime();

    return null;
  }


  /**
   * Get a Date object according to the given calendar.
   *
   */
  getDate(calendar: CalendarType = this.calendar): Date | null {
    return this.getDateTime(calendar).getDate();
  }
  /**
   * Get a string that defines the format usable with the DatePipe,
   * a according to the given granularity
   */
  getDateFormatString(granularity: Granularity): string {

    if (this.julianDay <= this.LAST_DAY_BC) {
      switch (granularity) {
        case '1 year':
          return 'y GG';
        case '1 month':
          return 'MMM, y GG';
        case '1 day':
          return 'MMM d, y GG';
        case '1 hour':
          return 'MMM d, y GG, HH';
        case '1 minute':
          return 'MMM d, y GG, HH:mm';
        case '1 second':
          return 'MMM d, y GG, HH:mm:ss';
        default:
          return '';
      }
    } else {
      switch (granularity) {
        case '1 year':
          return 'y';
        case '1 month':
          return 'MMM, y';
        case '1 day':
          return 'MMM d, y';
        case '1 hour':
          return 'MMM d, y, HH';
        case '1 minute':
          return 'MMM d, y, HH:mm';
        case '1 second':
          return 'MMM d, y, HH:mm:ss';
        default:
          return '';
      }
    }
  }

  /**
   * Get a display label of the current TimePrimitive.
   */
  getShortesDateFormatString(): string {

    return this.getDateFormatString(this.duration);
  }


  /**
   * Get the julian day in seconds
   * TODO: integrate time
  */
  getJulianSecond(): number {
    return this.julianDay * 60 * 60 * 24;
  }


  /**
   * Get the last second of this TimePrimitive. This depends on the calendar,
   * since the month february and leap years differ from one calendar to the other
   *
   */
  getLastSecond(): number | null {
    const dt = this.getDateTime()
    return dt.getEndOf(this.duration).getJulianSecond();

  }

}
