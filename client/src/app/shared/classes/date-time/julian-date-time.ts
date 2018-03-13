import { EventEmitter } from '@angular/core';

import { DateTime, YearMonthDay } from './interfaces';
import { DateTimeCommons } from './date-time-commons';


/**
* Class to represent a Julian Date and Time
* TODO: Move this class to common folder as it is needed by server and client
*/
export class JulianDateTime extends DateTimeCommons implements DateTime {


  /**
  * Methods
  */


  /**
  * Validate that the combination of year, month and day exists
  *
  * @return {type}  description
  */
  dateValid() {

  }

  private lengthOfMonthJulian(year: number, month: number) {
    var y = year, m = month;

    // Assume not leap year by default (note zero index for Jan)
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // If evenly divisible by 4 and not one of the years 5 BC, 1 BC or 4 AD,
    // when Augustus dropped the leap year
    if (!(y % 4) && !(y == -5) && !(y == -1) && !(y == 4)) {
      daysInMonth[1] = 29;
    }
    return daysInMonth[--m]
  }



  /**
  * Convert the year, month, day of julian calendar to julian day
  *
  * @return {type}  description
  */
  getJulianDay() {

    // running day (conut of days that year)
    var runningDay = this.calcRunningDay(this.month, this.day, this.isLeapYear());

    if (this.year < 0) {
      // running year
      var runningYear = 4716 + this.year;
    } else {
      // running year
      var runningYear = 4715 + this.year;
    }

    // number of full 4 year cycles
    var n4 = Math.floor(runningYear / 4)

    // rest of division: number of full years of the last uncomplete 4 years cycle
    var n1 = runningYear % 4;


    return 1461 * n4 + 365 * (n1 - 3) + runningDay;
  }


  fromJulianDay(julianDay: number) {

    // number of full 4 year cycles
    var n4 = Math.floor((julianDay + (3 * 365)) / 1461);

    // number of days of the last uncomplete 4 years cycle
    var r4 = (julianDay + (3 * 365)) % 1461;

    // number of full years of the last uncomplete 4 years cycle
    var n1 = Math.floor(r4 / 365);

    // number of days in the last year
    var runningDay = r4 % 365;

    if (n1 === 4) {
      n1 = 3;
      runningDay = 365;
    }

    // running year
    var runningYear = 4 * n4 + n1;

    // if BC
    if (runningYear <= 4715) {
      // resulting year
      this.year = runningYear - 4716;

      // if AD
    } else {
      this.year = runningYear - 4715;

    }

    var monthDay = this.calcDateByRunningDay(runningDay, this.isLeapYear())

    // resulting month
    this.month = monthDay.month;

    // resulting day
    this.day = monthDay.day;


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

    // Return true if evenly divisible by 4
    return !(this.year % 4) ? true : false;
  }



}
