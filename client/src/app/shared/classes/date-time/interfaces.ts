import { EventEmitter } from '@angular/core';


export interface HoursMinutesSeconds {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface YearMonthDay {
  year: number;
  month: number;
  day: number;

}

export interface DateTime {

  // Time values
  hours: number;
  minutes: number;
  seconds: number;

  // Date values
  year: number; // the year (negative and positive values except 0)
  month: number; // the month from 1=january to 12=december
  day: number; // the day of month from 1 to 31


  // Emits YearMonthDay when Date changes
  onDateChange: EventEmitter<YearMonthDay>;

  /**
   * Convert date values (year, month, day) to julian day and return it
   *
   * @return {number}  julian day
   */
  getJulianDay(): number;

  /**
   * Convert julian day to date values (year, month, day)
   *
   * @return {year:number, month:number, day:number} year, month and day in julian calendar
   */
  fromJulianDay(julianDay: number): { year: number, month: number, day: number };


  /**
   * Returns length of current month. If no month or year provided, returns
   * undefined.
   */
  lengthOfMonth():number;

  /**
   * Returns true if this.year is a leap year
   */
  isLeapYear(): boolean;


  addYear():void

  addMonth():void;

  // addDay():void;




  emitDateChange()
}

