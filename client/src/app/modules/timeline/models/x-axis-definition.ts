import * as d3 from 'd3';
import { JulianDateTime, GregorianDateTime } from '../../../core';
import { DatePipe } from '@angular/common';
import { Granularity, DateTimeCommons } from 'app/core/date-time/date-time-commons';
import { CalendarType, TimePrimitive } from 'app/core/date-time/time-primitive';

/**
 * Configurable API
 */
export interface XAxisOptions {
  marginTop: number
  containerHeight: number
  marginLeft: number
  marginRight: number
}

export interface IXAxisDefinition extends XAxisOptions {

  tickSizeInner: number,
  tickSizeOuter: number,
  tickPadding?: number,

  // Domain
  domainStart: number,
  domainEnd: number,

  // Boundaries representing the minimum and maximum julian second represented with the timeline
  minJulianSecond?: number;
  maxJulianSecond?: number;

  // Width of the parent element ()
  containerWidth: number;

  calendar?: CalendarType;
}

export class XAxisDefinition implements IXAxisDefinition {

  /**
   * Add properties of xAxis here
   */

  // Margins relative to canvas
  marginLeft = 150;
  marginRight = 10;
  marginTop = 30;
  tickSizeInner = 6;
  tickSizeOuter = 6;
  tickPadding = -15;

  // Domain
  domainStart: number;
  domainEnd: number;

  // Boundaries representing the minimum and maximum julian second represented with the timeline
  minJulianSecond: number = Number.NEGATIVE_INFINITY;
  maxJulianSecond: number = Number.POSITIVE_INFINITY;

  // Width of the parent element ()
  containerWidth: number;
  containerHeight: number;

  // Range
  get rangeStart() {
    return this.marginLeft
  };
  get rangeEnd(): number {
    return this.containerWidth - this.marginRight;
  };

  // Resolution: Seconds per pixel on x axis
  resolution: number;

  calendar;

  // d3 Scale object
  scale;

  constructor(options: IXAxisDefinition, private datePipe: DatePipe) {
    Object.assign(this, options);

    this.resolution = Math.abs(this.domainStart - this.domainEnd) / (this.rangeEnd - this.rangeStart);

    this.setScale();
  }

  newDateTime(data?) {
    if (this.calendar === 'gregorian') {

      return new GregorianDateTime(data);

    } else if (this.calendar === 'julian') {

      return new JulianDateTime(data);

    }
  }

  /**
   * A method to create an d3 scale object out of a xAxis object
   */
  setScale() {

    this.scale = d3.scaleLinear()
      .domain([this.domainStart, this.domainEnd])
      .range([this.rangeStart, this.rangeEnd]);

    /**
     * Validates if a julianSecond is valid as tick and if yes, adds
     * it to the given ticks array
     */
    const addTickIfValid = (ticks: Array<number>, julianSecond: number) => {

      // check if it is inside the domain
      if (!(julianSecond <= this.domainEnd &&
        julianSecond >= this.domainStart)) {
        return;
      }

      // check if it is inside the calendar boundaries
      if (!(julianSecond <= this.maxJulianSecond &&
        julianSecond >= this.minJulianSecond)) {
        return;
      }


      ticks.push(julianSecond)

    }


    const yearTicks = (t0, t1, step) => {
      const y0 = this.newDateTime().fromJulianSecond(t0).year;
      const y1 = this.newDateTime().fromJulianSecond(t1).year;
      const diff = Math.abs(y1 - y0);
      let ticks = [];

      for (let i = 1; i < diff; i++) {
        const year = y0 + i;
        // if year is devisable by step
        if ((year % step) === 0) {
          addTickIfValid(ticks, this.newDateTime({ year: year }).getJulianSecond());
        }
      }
      return ticks;
    }


    const monthTicks = (t0, t1, monthStep) => {
      const dt0 = this.newDateTime().fromJulianSecond(t0);
      const dt1 = this.newDateTime().fromJulianSecond(t1);
      const ydiff = Math.abs(dt0.year - dt1.year);

      let ticks = [];

      for (let i = 0; i <= ydiff; i++) {
        for (let m = 1; m <= 12; m = m + monthStep) {

          const tickVal = this.newDateTime({
            year: (dt0.year + i),
            month: m
          }).getJulianSecond()

          addTickIfValid(ticks, tickVal);
        }
      }
      return ticks;
    }

    const dayTicks = (t0, t1, gaps) => {
      const dt0 = this.newDateTime().fromJulianSecond(t0);
      const dt1 = this.newDateTime().fromJulianSecond(t1);
      const ydiff = Math.abs(dt0.year - dt1.year);

      let ticks = [];

      for (let i = 0; i <= ydiff; i++) {
        for (let m = 1; m <= 12; m++) {
          const lengthOfMonth = this.newDateTime({
            year: (dt0.year + i),
            month: m
          }).lengthOfMonth();

          for (let g = 0; g < gaps; g++) {
            const tickVal = this.newDateTime({
              year: (dt0.year + i),
              month: m,
              day: Math.floor(lengthOfMonth / gaps * g + 1)
            }).getJulianSecond()

            addTickIfValid(ticks, tickVal);

          }
        }
      }
      return ticks;
    }


    this.scale.ticks = () => {
      var t0 = this.domainStart,
        t1 = this.domainEnd,
        r = t1 < t0, //is reverse
        t, // ticks
        dSec = Math.abs(this.domainStart - this.domainEnd);

      if (r) t = t0, t0 = t1, t1 = t;


      // Show years if resolution is more than 180000 secs per pixel
      if (this.resolution > 180000) {
        // dynamically step over years on increasing resolution
        const step = Math.floor(this.resolution / 300000) + 1;
        t = yearTicks(t0, t1, step);
      }
      // Else show months if resolution is more than 30000
      else if (this.resolution > 30000) {
        // dynamically step over months on increasing resolution
        const a = this.resolution / 30000;
        const b = Math.floor(12 / a)
        const step = Math.floor(12 / b);

        t = monthTicks(t0, t1, step);
      }
      else {
        const gaps = Math.floor(30000 / this.resolution)
        t = dayTicks(t0, t1, gaps);
      }


      // t = monthTicks(t0, t1);
      // t = t ? t.range(t0, t1 + 1) : []; // inclusive stop
      return r ? t.reverse() : t;
    };

    this.scale.tickFormat = (count) => {
      return (julianSecond) => {
        const dt = this.newDateTime().fromJulianSecond(julianSecond)
        let duration: Granularity;
        if (dt.year) { duration = '1 year' }
        if (dt.month > 1) { duration = '1 month' }
        if (dt.day > 1) { duration = '1 day' }
        if (dt.hours > 0) { duration = '1 hour' }
        if (dt.minutes > 0) { duration = '1 minute' }
        if (dt.seconds > 0) { duration = '1 second' }

        const tp = new TimePrimitive({
          duration,
          calendar: this.calendar,
          julianDay: dt.getJulianDay()
        });

        return this.datePipe.transform(dt.getDate(), tp.getShortesDateFormatString())


        // switch (duration) {
        //     case '1 year':
        //         return dt.year;
        //     case '1 month':
        //         const ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Okt', 'Nov', 'Dec']
        //         return ms[dt.month - 1];
        //     case '1 day':
        //         return dt.day;
        //     case '1 hour':
        //         return 'HH:mm';
        //     case '1 minute':
        //         return 'HH:mm';
        //     case '1 second':
        //         return 'HH:mm:ss';
        //     default:
        //         return '';
        // }

        // return julianSecond
      }
    }

  }



}
