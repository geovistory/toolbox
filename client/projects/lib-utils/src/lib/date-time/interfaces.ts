import { EventEmitter } from '@angular/core';
import { Granularity } from './date-time-commons';
import { JulianDateTime } from './julian-date-time';
import { GregorianDateTime } from './gregorian-date-time';


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
   * get the julian day
   *
   * @return {number}  julian day
   */
  getJulianDay(): number;

  /**
   * Set julian day of the DateTime value (only affecting year, month, day)
   *
   * @param julianSecond julian second
   */
  fromJulianDay(julianDay: number): GregorianDateTime | JulianDateTime;

  /**
   * get the julian second
   */
  getJulianSecond(): number

  /**
   * Set julian second of the DateTime value (affecting year, month, day, hours, minutes, seconds)
   *
   * @param julianSecond julian second
   */
  fromJulianSecond(julianSecond: number): GregorianDateTime | JulianDateTime;


  /**
   * Returns length of current month. If no month or year provided, returns
   * undefined.
   */
  lengthOfMonth(): number;

  /**
   * Returns true if this.year is a leap year
   */
  isLeapYear(): boolean;


  addYear(): void

  addMonth(): void;

  addDay(): void;

  addHour(): void;

  addMinute(): void;

  addSecond(): void;

  add(duration: Granularity);

  toLastSecondOf(duration: Granularity);

  getEndOf(duration: Granularity): DateTime;

  getDate(): Date;

  emitDateChange()

}

