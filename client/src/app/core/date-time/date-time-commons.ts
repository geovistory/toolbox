import { EventEmitter } from '@angular/core';
import { DateTime, YearMonthDay } from './interfaces';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export type Granularity =
  '1 century' |
  '1 decade' |
  '1 year' |
  '1 month' |
  '1 day' |
  '1 hour' |
  '1 minute' |
  '1 second';

export class DateTimeCommons {


  /**
  * Properties
  */
  onDateChange: EventEmitter<YearMonthDay> = new EventEmitter();

  private _year?: number;

  set year(val: number) {
    this._year = val;
    this.emitDateChange();
  }

  get year(): number {
    return this._year;
  }

  private _month?: number;

  set month(val: number) {
    this._month = val;
    this.emitDateChange();
  }

  get month(): number {
    return this._month;
  }

  private _day?: number;

  set day(val: number) {
    this._day = val;
    this.emitDateChange();
  }

  get day(): number {
    return this._day;
  }

  private _hours?: number;

  set hours(val: number) {
    this._hours = val;
  }

  get hours(): number {
    return this._hours;
  }

  private _minutes?: number;

  set minutes(val: number) {
    this._minutes = val;
  }

  get minutes(): number {
    return this._minutes;
  }

  private _seconds?: number;

  set seconds(val: number) {
    this._seconds = val;
  }

  get seconds(): number {
    return this._seconds;
  }


  constructor(data?) {
    Object.assign(this, data);
  }

  /**
  * Returns the running day for given month and day with consideration of the
  * isLeap boolean that indicates leap years. Inspired by:
  * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_julianischem_Kalender
  *
  * @param {number} month 1=january .. 12=december
  * @param {number} day 1, 2 .. 31
  * @param {boolean} isLeap if true, this is a leap year
  */
  calcRunningDay(month: number, day: number, isLeap: boolean): number {

    // if no month or day provided, let's start at 1
    day = (day === undefined || day === null) ? 1 : day;
    month = (month === undefined || month === null) ? 1 : month;

    // month corrections (note that january has index 0)
    var monthCorrenctions = [-1, 0, -2, -1, -1, 0, 0, 1, +2, +2, +3, +3];

    // leap year correction
    var lc = 0;

    if (isLeap && month > 2) {
      lc = 1;
    }

    // month correction
    var mc = monthCorrenctions[month - 1];

    return day + (30 * (month - 1)) + (lc + mc);
  }


  /**
  * Returns the month and day for given running day with consideration of the
  * isLeap boolean that indicates leap years. Inspired by:
  * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_julianischem_Kalender
  *
  * @param {number} runningDay 1, 2 .. 365
  * @param {boolean} isLeap if true, this is a leap year
  *
  */
  calcDateByRunningDay(runningDay: number, isLeap: boolean): { day: number, month: number } {

    // month corrections (note that january has index 0)
    var monthCorrenctions = [-1, 0, -2, -1, -1, 0, 0, 1, +2, +2, +3, +3];

    // resulting month
    var month = Math.floor((runningDay + 1) / 30) + 1;

    // month correction
    var mc = monthCorrenctions[month - 1];

    // leap year correction
    var lc = 0;

    if (isLeap && month > 2) {
      lc = 1;
    }

    // resulting day
    var day = runningDay - 30 * (month - 1) - (lc + mc);

    // check if month and day still valid
    if (month > 12 || day < 1) {

      month--;

      if (month < 1) {
        isLeap = !isLeap;
      }

      // leap year correction
      lc = 0;

      if (isLeap && month > 2) {
        lc = 1;
      }

      // month correction
      var mc = monthCorrenctions[month - 1];

      // resulting day
      var day = runningDay - 30 * (month - 1) - (lc + mc);

    }

    return { day: day, month: month };
  }

  emitDateChange() {
    this.onDateChange.emit({
      year: this.year,
      month: this.month,
      day: this.day
    });
  }

  getGranularity(): Granularity {
    let duration: Granularity = undefined;
    if (this.year) { duration = "1 year" }
    if (this.month) { duration = "1 month" }
    if (this.day) { duration = "1 day" }
    if (this.hours) { duration = "1 hour" }
    if (this.minutes) { duration = "1 minute" }
    if (this.seconds) { duration = "1 second" }
    return duration;
  }

  getTimeStamp(): string {

    let timestamp = '';
    timestamp = this.year ? this.pad(Math.abs(this.year), 4) : '01';
    timestamp += '-';
    timestamp += this.month ? this.pad(this.month, 2) : '01';
    timestamp += '-';
    timestamp += this.day ? this.pad(this.day, 2) : '01';
    timestamp += ' ';
    timestamp += this.hours ? this.pad(this.hours, 2) : '00';
    timestamp += ':';
    timestamp += this.minutes ? this.pad(this.minutes, 2) : '00';
    timestamp += ':';
    timestamp += this.seconds ? this.pad(this.seconds, 2) : '00';

    timestamp += this.year < 0 ? ' BC' : '';

    return timestamp;
  }

  getDate(): Date | null {

    // validate
    if (!this.year) return null;
    if (this.day && !this.month) return null;
    if (this.hours && !this.day) return null;
    if (this.minutes && !this.hours) return null;
    if (this.seconds && !this.hours) return null;

    // creat date
    let date = new Date()

    date.setFullYear(this.year);

    date.setMonth((this.month ? (this.month - 1) : 0));

    date.setDate((this.day ? this.day : 1));

    date.setHours(this.hours ? this.hours : 0)

    date.setMinutes(this.minutes ? this.minutes : 0)

    date.setSeconds(this.seconds ? this.seconds : 0)

    return date;
  }

  pad(number: number, width: number, z: string = '0'): string {
    var n = number.toString();
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }


}
