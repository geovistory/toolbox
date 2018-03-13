import { EventEmitter } from '@angular/core';
import { DateTime, YearMonthDay } from './interfaces';
import { AbstractControl, ValidatorFn } from '@angular/forms';

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
    var day = runningDay - 30*(month-1) - (lc + mc);

    // check if month and day still valid
    if(month>12 || day <1){

      month--;

      if(month < 1){
        isLeap = !isLeap;
      }

      // leap year correction
      if (isLeap && month > 2) {
        lc = 1;
      }

      // month correction
      var mc = monthCorrenctions[month - 1];

      // resulting day
      var day = runningDay - 30*(month-1) - (lc + mc);

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
}
