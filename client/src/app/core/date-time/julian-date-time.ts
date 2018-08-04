import { EventEmitter } from '@angular/core';

import { DateTime, YearMonthDay } from './interfaces';
import { DateTimeCommons, Granularity } from './date-time-commons';


/**
* Class to represent a Julian Date and Time
* TODO: Move this class to common folder as it is needed by server and client
*/
export class JulianDateTime extends DateTimeCommons implements DateTime {


  /**
  * Methods
  */


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
    } else if (this.day > this.lengthOfMonth()) {
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
    } else if (this.day > this.lengthOfMonth()) {
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
    } else if (duration === '1 month') {
      this.addMonth()
    } else if (duration === '1 day') {
      this.addDay()
    } else if (duration === '1 hour') {
      this.addHour()
    } else if (duration === '1 minute') {
      this.addMinute()
    } else if (duration === '1 second') {
      this.addSecond()
    }
  }

  toLastSecondOf(duration: Granularity) {
    this.add(duration);
    this.removeSecond();
  }

  getEndOf(duration: Granularity = this.getGranularity()): JulianDateTime {

    const dt = new JulianDateTime(this);
    dt.toLastSecondOf(duration);

    return dt;
  }


  lengthOfMonth() {
    const y = this.year;
    let m = this.month;

    // Assume not leap year by default (note zero index for Jan)
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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

    if (typeof julianDay === 'string') {
      julianDay = parseInt(julianDay)
    }

    // number of full 4 year cycles
    let n4 = Math.floor((julianDay + (3 * 365)) / 1461);

    // number of days of the last uncomplete 4 years cycle
    let r4 = (julianDay + (3 * 365)) % 1461;

    // number of full years of the last uncomplete 4 years cycle
    let n1 = Math.floor(r4 / 365);

    // number of days in the last year
    let runningDay = r4 % 365;

    if (n1 === 4) {
      n1 = 3;
      runningDay = 365;
    }

    // running year
    let runningYear = 4 * n4 + n1;

    // if BC
    if (runningYear <= 4715) {
      // resulting year
      this.year = runningYear - 4716;

      // if AD
    } else {
      this.year = runningYear - 4715;

    }

    let monthDay = this.calcDateByRunningDay(runningDay, this.isLeapYear())

    // resulting month
    this.month = monthDay.month;

    // resulting day
    this.day = monthDay.day;


    return this;

  }


  /**
  * Returns true if given year is a leap year
  */
  isLeapYear(): boolean {

    // Return true if evenly divisible by 4
    return !(this.year % 4) ? true : false;
  }


  getJulianSecond() {
    let seconds = this.getJulianDay() * 60 * 60 * 24; // first second of the day
    if (this.seconds > 0) seconds = seconds + this.seconds;
    if (this.minutes > 0) seconds = seconds + this.minutes * 60;
    if (this.hours > 0) seconds = seconds + this.hours * 60 * 60;
    return seconds;
  }

  /**
   * Set this JulianDateTime from given julian second
   * @param julianSecond julian second
   */
  fromJulianSecond(julianSecond) {

    const secsPerDay = 60 * 60 * 24;

    // number of full days
    const julianDay = Math.floor(julianSecond / secsPerDay);

    // number of seconds of the julian day
    const secsOfDay = julianSecond % secsPerDay;

    // number of ours of the day
    this.hours = Math.floor(secsOfDay / (60 * 60))

    // number of seconds of the last hour
    const secsOfHour = this.hours % (60 * 60);

    // number of ours of the day
    this.minutes = Math.floor(secsOfHour / 60)

    // secs of the last minute
    this.seconds = this.minutes % 60;

    return this.fromJulianDay(julianDay);

  }


}
