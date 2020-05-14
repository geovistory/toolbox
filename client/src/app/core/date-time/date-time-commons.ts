import { EventEmitter } from '@angular/core';
import { YearMonthDay } from './interfaces';

export type Granularity =
  '1 century' |
  '1 decade' |
  '1 year' |
  '1 month' |
  '1 day' |
  '1 hour' |
  '1 minute' |
  '1 second';

export abstract class DateTimeCommons {

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

  abstract lengthOfMonth(): number;

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
    const monthCorrenctions = [-1, 0, -2, -1, -1, 0, 0, 1, +2, +2, +3, +3];

    // leap year correction
    let lc = 0;

    if (isLeap && month > 2) {
      lc = 1;
    }

    // month correction
    const mc = monthCorrenctions[month - 1];

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
    const monthCorrenctions = [-1, 0, -2, -1, -1, 0, 0, 1, +2, +2, +3, +3];

    // resulting month
    let month = Math.floor((runningDay + 1) / 30) + 1;

    // month correction
    let mc = monthCorrenctions[month - 1];

    // leap year correction
    let lc = 0;

    if (isLeap && month > 2) {
      lc = 1;
    }

    // resulting day
    let day = runningDay - 30 * (month - 1) - (lc + mc);

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
      mc = monthCorrenctions[month - 1];

      // resulting day
      day = runningDay - 30 * (month - 1) - (lc + mc);

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
    let duration: Granularity;
    if (this.year) { duration = '1 year' }
    if (this.month) { duration = '1 month' }
    if (this.day) { duration = '1 day' }
    if (this.hours) { duration = '1 hour' }
    if (this.minutes) { duration = '1 minute' }
    if (this.seconds) { duration = '1 second' }
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
    if (!this.year && this.year !== 0) return null;
    if (this.day && !this.month) return null;
    if (this.hours && !this.day) return null;
    if (this.minutes && !this.hours) return null;
    if (this.seconds && !this.hours) return null;

    // creat date
    const date = new Date()

    date.setFullYear(this.year < 0 ? this.year + 1 : this.year);

    date.setMonth((this.month ? (this.month - 1) : 0));

    date.setDate((this.day ? this.day : 1));

    date.setHours(this.hours ? this.hours : 0)

    date.setMinutes(this.minutes ? this.minutes : 0)

    date.setSeconds(this.seconds ? this.seconds : 0)

    return date;
  }

  pad(number: number, width: number, z: string = '0'): string {
    const n = number.toString();
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }


  addYear() {
    this.year++;
    if (this.year === 0) this.year++;
    if (this.day > this.lengthOfMonth()) {
      this.day = this.lengthOfMonth()
    }
  }

  addMonth() {
    this.month++;


    if (this.month > 12) {
      this.month = 1
      this.addYear();
    }
    else if (this.day > this.lengthOfMonth()) {
      this.day = this.lengthOfMonth()
    }
  }

  addDay() {
    this.day++;
    if (this.day > this.lengthOfMonth()) {
      this.day = 1;
      this.addMonth()
    }
  }

  addHour() {
    this.hours++;
    if (this.hours > 23) {
      this.hours = 0;
      this.addDay()
    }
  }

  addMinute() {
    this.minutes++;
    if (this.minutes > 59) {
      this.minutes = 0;
      this.addHour()
    }
  }

  addSecond() {
    this.seconds++;
    if (this.seconds > 59) {
      this.seconds = 0;
      this.addMinute()
    }
  }




  removeYear() {
    this.year--;
    if (this.year === 0) {
      this.year = -1;
    }
    if (this.day > this.lengthOfMonth()) {
      this.day = this.lengthOfMonth()
    }
  }

  removeMonth() {
    this.month--;

    if (this.month < 1) {
      this.month = 12;
      this.removeYear();
    }
    else if (this.day > this.lengthOfMonth()) {
      this.day = this.lengthOfMonth()
    }
  }

  removeDay() {
    this.day--;
    if (this.day < 1) {
      this.removeMonth()
      this.day = this.lengthOfMonth();
    }
  }


  removeHour() {
    this.hours--;
    if (this.hours < 0 || !this.hours) {
      this.hours = 23;
      this.removeDay()
    }
  }

  removeMinute() {
    this.minutes--;
    if (this.minutes < 0 || !this.minutes) {
      this.minutes = 59;
      this.removeHour()
    }
  }

  removeSecond() {
    this.seconds--;
    if (this.seconds < 0 || !this.seconds) {
      this.seconds = 59;
      this.removeMinute()
    }
  }


  addDays(quantity: number) {
    for (let i = 0; i < quantity; i++) {
      this.addDay();
    };
  }

  addMonths(quantity: number) {
    for (let i = 0; i < quantity; i++) {
      this.addMonth();
    };
  }

  addYears(quantity: number) {
    for (let i = 0; i < quantity; i++) {
      this.addYear();
    };
  }

  add(duration: Granularity) {
    if (duration === '1 year') {
      this.addYear()
    }
    else if (duration === '1 month') {
      this.addMonth()
    }
    else if (duration === '1 day') {
      this.addDay()
    }
    else if (duration === '1 hour') {
      this.addHour()
    }
    else if (duration === '1 minute') {
      this.addMinute()
    }
    else if (duration === '1 second') {
      this.addSecond()
    }
  }



  toLastSecondOf(duration: Granularity) {
    this.add(duration);
    this.removeSecond();
  }


}
