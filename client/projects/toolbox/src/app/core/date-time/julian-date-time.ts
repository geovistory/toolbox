import { DateTimeCommons, Granularity } from './date-time-commons';
import { DateTime } from './interfaces';



/**
* Class to represent a Julian Date and Time
* TODO: Move this class to common folder as it is needed by server and client
*/
export class JulianDateTime extends DateTimeCommons implements DateTime {


  /**
  * Methods
  */

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
    const runningDay = this.calcRunningDay(this.month, this.day, this.isLeapYear());
    let runningYear;
    if (this.year < 0) {
      // running year
      runningYear = 4716 + this.year;
    } else {
      // running year
      runningYear = 4715 + this.year;
    }

    // number of full 4 year cycles
    const n4 = Math.floor(runningYear / 4)

    // rest of division: number of full years of the last uncomplete 4 years cycle
    const n1 = runningYear % 4;


    return 1461 * n4 + 365 * (n1 - 3) + runningDay;
  }


  fromJulianDay(julianDay: number) {

    if (typeof julianDay === 'string') {
      julianDay = parseInt(julianDay, 10)
    }

    // number of full 4 year cycles
    const n4 = Math.floor((julianDay + (3 * 365)) / 1461);

    // number of days of the last uncomplete 4 years cycle
    const r4 = (julianDay + (3 * 365)) % 1461;

    // number of full years of the last uncomplete 4 years cycle
    let n1 = Math.floor(r4 / 365);

    // number of days in the last year
    let dayOfYear = r4 % 365;

    if (n1 === 4) {
      n1 = 3;
      dayOfYear = 365;
    }

    // running year
    const runningYear = 4 * n4 + n1;

    // if BC
    if (runningYear <= 4715) {
      // resulting year
      this.year = runningYear - 4716;

      // if AD
    } else {
      this.year = runningYear - 4715;

    }

    const monthDay = this.calcDateByRunningDay(dayOfYear, this.isLeapYear())

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
