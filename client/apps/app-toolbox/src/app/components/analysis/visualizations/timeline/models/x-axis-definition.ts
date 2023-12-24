import { DatePipe } from '@angular/common';
import { CalendarType, Granularity, GregorianDateTime, JulianDateTime } from '@kleiolab/lib-utils';
import * as d3 from 'd3';
import { ScaleLinear } from 'd3';
import { Zoomer } from './zoomer';

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

  // Zoomer
  zoomer: Zoomer,

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
  marginLeft = 0;
  marginRight = 0;
  marginTop = 30;
  tickSizeInner = 6;
  tickSizeOuter = 6;
  tickPadding = -15;

  // Domain
  domainStart: number;
  domainEnd: number;

  zoomer: Zoomer;

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
  scale: ScaleLinear<number, number>;

  constructor(options: IXAxisDefinition, private datePipe: DatePipe) {
    Object.assign(this, options);

    this.resolution = Math.abs(this.domainStart - this.domainEnd) / (this.rangeEnd - this.rangeStart);

    this.setScale();
  }

  newDateTime(data?) {
    if (this.calendar === 'gregorian') {
      return new GregorianDateTime(data);
    }

    return new JulianDateTime(data);
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
    const addTickIfValid = (ticks: Array<number>, julianSecond: number): boolean => {

      // check if it is inside the domain
      if (!(julianSecond <= this.domainEnd &&
        julianSecond >= this.domainStart)) {
        return false;
      }

      // check if it is inside the calendar boundaries
      if (!(julianSecond <= this.maxJulianSecond &&
        julianSecond >= this.minJulianSecond)) {
        return false;
      }


      ticks.push(julianSecond)
      return true;
    }


    this.scale.ticks = () => {

      // calculates the zoom level
      const zoomLevel = this.zoomer.zoomLevel;

      // date time of minimal julian second
      const dt = this.newDateTime().fromJulianSecond(this.domainStart);
      dt.hours = dt.minutes = dt.seconds = 0;
      // the ticks as numers in julian second
      const ticks: number[] = []

      if (zoomLevel.intervalUnit === 'days') {
        // day level: show a line for each day
        // create first tick
        let julianSec = dt.getJulianSecond();
        while (julianSec <= this.domainEnd) {
          addTickIfValid(ticks, julianSec);
          // proceed a month
          dt.addDays(zoomLevel.intervalCount);
          julianSec = dt.getJulianSecond()
        }
      }
      else if (zoomLevel.intervalUnit === 'half-months') {

        // go to day 1 or 15 of month
        if (dt.day !== 1 && dt.day !== 16) {
          if (dt.day < 15) {
            const daysToAdd = (15 - dt.day + 1);
            dt.addDays(daysToAdd)
          } else {
            const daysToAdd = (dt.lengthOfMonth() - dt.day + 1);
            dt.addDays(daysToAdd)
          }
        }
        let julianSec = dt.getJulianSecond();
        while (julianSec <= this.domainEnd) {
          addTickIfValid(ticks, julianSec);
          // proceed to day 1 or 15
          if (dt.day < 15) {
            const daysToAdd = (15 - dt.day + 1);
            dt.addDays(daysToAdd)
          } else {
            const daysToAdd = (dt.lengthOfMonth() - dt.day + 1);
            dt.addDays(daysToAdd)
          }
          julianSec = dt.getJulianSecond()
        }

      }
      else if (zoomLevel.intervalUnit === 'months') {

        // go to first day of next month
        if (dt.day !== 1) {
          const daysToAdd = (dt.lengthOfMonth() - dt.day + 1);
          dt.addDays(daysToAdd)
        }

        if (zoomLevel.intervalCount === 6) {
          // go to january or july
          if (dt.month !== 1 && dt.month !== 7) {
            const goToMonth = dt.month < 7 ? 7 : 13;
            const monthsToAdd = goToMonth - dt.month;
            dt.addMonths(monthsToAdd)
          }
        }

        // create first tick
        let julianSec = dt.getJulianSecond();
        while (julianSec <= this.domainEnd) {
          addTickIfValid(ticks, julianSec);
          // proceed a month
          dt.addMonths(zoomLevel.intervalCount)
          julianSec = dt.getJulianSecond()
        }


      } else if (zoomLevel.intervalUnit === 'years') {
        if (dt.day !== 1) {
          // go first day of next month
          const daysTillEndOfMonth = (dt.lengthOfMonth() - dt.day + 1);
          dt.addDays(daysTillEndOfMonth);
        }

        if (dt.month !== 1) {
          // go to january of next year
          const monthsTillEndOfYear = (13 - dt.month);
          dt.addMonths(monthsTillEndOfYear);
        }
        const roundTo = dt.year > 0 ? zoomLevel.intervalCount : 0;
        const yearsToRoundNr = roundTo - (dt.year % zoomLevel.intervalCount);
        if (yearsToRoundNr !== zoomLevel.intervalCount) {
          dt.addYears(yearsToRoundNr);
        }


        // create first tick
        let julianSec = dt.getJulianSecond();
        while (julianSec <= this.domainEnd) {
          addTickIfValid(ticks, julianSec);
          // add years
          dt.addYears(zoomLevel.intervalCount);
          julianSec = dt.getJulianSecond()
        }

      }

      return ticks.reverse();


    };

    this.scale.tickFormat = (count) => {



      return (julianSecond) => {
        const dt = this.newDateTime().fromJulianSecond(julianSecond)
        let stringFormat: string;
        const u = this.zoomer.zoomLevel.intervalUnit;

        if (u === 'days' || u === 'half-months') {
          stringFormat = this.getDateFormatString(dt.getJulianDay(), '1 day')
        }
        else if (u === 'months') {
          stringFormat = this.getDateFormatString(dt.getJulianDay(), '1 month')
        }
        else {
          stringFormat = this.getDateFormatString(dt.getJulianDay(), '1 year')
        }

        return this.datePipe.transform(dt.getDate(), stringFormat)

      }

    }

  }



  getDateFormatString(julianDay, granularity: Granularity): string {

    if (julianDay <= 1721422) {
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
}
