import { EventEmitter } from '@angular/core';

import { DateTime, YearMonthDay } from './interfaces';
import { DateTimeCommons, Granularity } from './date-time-commons';

/**
 * Class to represent a Julian Date and Time
 * TODO: Move this class to common folder as it is needed by server and client
 */
export class GregorianDateTime extends DateTimeCommons implements DateTime {



  addYear() {
    this.year++;
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
    if(this.year ===0) {
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
    if (this.hours < 0) {
      this.hours = 23;
      this.removeDay()
    }
  }

  removeMinute() {
    this.minutes--;
    if (this.minutes < 0) {
      this.minutes = 59;
      this.removeHour()
    }
  }

  removeSecond() {
    this.seconds--;
    if (this.seconds < 0) {
      this.seconds = 59;
      this.removeMinute()
    }
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

  getEndOf(duration: Granularity): GregorianDateTime {

    var dt = new GregorianDateTime(this);
    dt.toLastSecondOf(duration);

    return dt;
  }

  lengthOfMonth() {
    var y = this.year, m = this.month;

    if (!(m > 0) && !(m <= 12)) {
      return undefined;
    }

    // Assume not leap year by default (note zero index for Jan)
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // If evenly divisible by 4 and not evenly divisible by 100,
    // or is evenly divisible by 400, then a leap year
    if (this.isLeapYear()) {
      daysInMonth[1] = 29;
    }
    return daysInMonth[--m];
  }



  /**
   * getJulianDay - Implemented according to this page [2018-03-12]:
   * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_gregorianischem_Kalender
   *
   * @return {type}  description
   */
  getJulianDay() {
    // running day (conut of days that year)
    var runningDay = this.calcRunningDay(this.month, this.day, this.isLeapYear());

    // running year
    var runningYear = this.year - 1;

    // julian day of year 1 AD
    var julianDay0 = 1721426;

    // number of full 400 year cycles
    var n400 = Math.floor(runningYear / 400);

    // rest of division: number of years of the last uncomplete 400 years cycle
    var r400 = runningYear % 400;

    // number of full 100 year cycles
    var n100 = Math.floor(r400 / 100)

    // rest of division: number of years of the last uncomplete 100 years cycle
    var r100 = r400 % 100;

    // number of full 4 year cycles
    var n4 = Math.floor(r100 / 4)

    // rest of division: number of full years of the last uncomplete 4 years cycle
    var n1 = r100 % 4;

    return julianDay0 + n400 * 146097 + n100 * 36524 + n4 * 1461 + n1 * 365 + runningDay;
  }


  fromJulianDay(julianDay: number) {

    // julian day of year 1 AD
    var julianDay0 = 1721426;

    var firstDayOfGregorianCal = 2299161;

    // conversion of julian day earlier than the introduction of
    // the gregorian calendar October 15th of 1582 are not supported
    // since this makes no sense
    if (julianDay < firstDayOfGregorianCal) {

      this.year = undefined

      this.month = undefined

      this.day = undefined

    }
    else {

      // number of full 400 year cycles
      var n400 = Math.floor((julianDay - julianDay0) / 146097);

      // number of days of the last uncomplete 400 years cycle
      var r400 = (julianDay - julianDay0) % 146097;

      // number of full 100 year cycles
      var n100 = Math.floor(r400 / 36524);

      // number of days of the last uncomplete 100 years cycle
      var r100 = r400 % 36524;


      if (n100 === 4) {
        n100 = 3;
        r100 = 36524;
      }

      // number of full 4 year cycles
      var n4 = Math.floor(r100 / 1461);

      // number of days of the last uncomplete 4 years cycle
      var r4 = r100 % 1461;

      // number of full years of the last uncomplete 4 years cycle
      var n1 = Math.floor(r4 / 365);

      // number of days in the last year
      var runningDay = r4 % 365;

      if (n1 === 4) {
        n1 = 3;
        runningDay = 365;
      }

      // running year
      var runningYear = 400 * n400 + 100 * n100 + 4 * n4 + n1;

      // resulting year
      this.year = runningYear + 1;

      var monthDay = this.calcDateByRunningDay(runningDay, this.isLeapYear())

      // resulting month
      this.month = monthDay.month;

      // resulting day
      this.day = monthDay.day;
    }

    return {
      year: this.year,
      month: this.month,
      day: this.day
    }
  }



  /**
   * Returns true if given year is a leap year
   */
  isLeapYear(): boolean {
    var year = this.year;
    // Return true if evenly divisible by 4 and not evenly divisible by 100,
    // or is evenly divisible by 400, then a leap year
    return ((!(year % 4) && year % 100) || !(year % 400)) ? true : false;
  }



}