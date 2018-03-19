
import { Granularity } from './date-time-commons';
import { GregorianDateTime } from './gregorian-date-time';
import { JulianDateTime } from './julian-date-time';
import { DateTime } from './interfaces';

export type CalendarType = 'gregorian' | 'julian';

export class TimePrimitive {

  julianDay: number;
  duration: Granularity;
  calendar?: CalendarType; // the calendar initialy used by user to create time primitive

  constructor(data?) {
    Object.assign(this, data);
  }

  getGregorianDateTime(): GregorianDateTime {
    let g = new GregorianDateTime()
    g.fromJulianDay(this.julianDay);
    return g;
  }

  getJulianDateTime(): JulianDateTime {
    let j = new JulianDateTime()
    j.fromJulianDay(this.julianDay);
    return j;
  }


  getDateTime(calendar:CalendarType):DateTime|null{

    if(!calendar) return null;

    if(calendar ==='gregorian') return this.getGregorianDateTime();

    if(calendar ==='julian') return this.getJulianDateTime();
  }

}