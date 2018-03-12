import { Component, OnInit, EventEmitter } from '@angular/core';


interface YearMonthDay {
  year: number;
  month: number;
  day: number;
}

type Granularity =
  '1 century' |
  '1 decade' |
  '1 year' |
  '1 month' |
  '1 day' |
  '1 hour' |
  '1 minute' |
  '1 second';

class TimePrimitive {

  onDateChange: EventEmitter<YearMonthDay> = new EventEmitter();

  private _century?: number;

  set century(val: number) {
    this._century = val;
    this.update();
  }

  get century(): number {
    return this._century;
  }

  private _decade?: number;

  set decade(val: number) {
    this._decade = val;
    this.update();
  }

  get decade(): number {
    return this._decade;
  }

  private _year?: number;

  set year(val: number) {
    this._year = val;
    this.emitDateChange();
    this.update();
  }

  get year(): number {
    return this._year;
  }

  private _month?: number;

  set month(val: number) {
    this._month = val;
    this.emitDateChange();
    this.update();
  }

  get month(): number {
    return this._month;
  }

  private _day?: number;

  set day(val: number) {
    this._day = val;
    this.emitDateChange();
    this.update();
    console.log(this.validateDateExists())
  }

  get day(): number {
    return this._day;
  }

  private _hours?: number;

  set hours(val: number) {
    this._hours = val;
    this.update();
  }

  get hours(): number {
    return this._hours;
  }

  private _minutes?: number;

  set minutes(val: number) {
    this._minutes = val;
    this.update();
  }

  get minutes(): number {
    return this._minutes;
  }

  private _seconds?: number;

  set seconds(val: number) {
    this._seconds = val;
    this.update();
  }

  get seconds(): number {
    return this._seconds;
  }

  timestamp?: string;
  duration?: Granularity;

  constructor() {
  }

  update() {
    this.updateTimestamp();
    this.updateDuration();

  }

  updateTimestamp() {
    if (this.century || this.decade) {

      const dec = this.decade ? (this.decade).toString() : '0';

      // If we are BC
      if (this.century < 0) {
        this.timestamp = '';
        this.timestamp = this.century ? this.pad(Math.abs(this.century), 2) + dec + '0' : '0000';
        this.timestamp += '-01-01 00:00:00'
        this.timestamp += this.century < 0 ? ' BC' : '';
      }
      // If we have AD
      else {

        const dec = this.decade ? (this.decade - 1).toString() : '0';

        this.timestamp = '';
        this.timestamp = this.century ? this.pad(this.century - 1, 2) + dec + '1' : '01';
        this.timestamp += '-01-01 00:00:00'
      }


    }
    else {

      this.timestamp = '';
      this.timestamp = this.year ? this.pad(Math.abs(this.year), 4) : '01';
      this.timestamp += '-';
      this.timestamp += this.month ? this.pad(this.month, 2) : '01';
      this.timestamp += '-';
      this.timestamp += this.day ? this.pad(this.day, 2) : '01';
      this.timestamp += ' ';
      this.timestamp += this.hours ? this.pad(this.hours, 2) : '00';
      this.timestamp += ':';
      this.timestamp += this.minutes ? this.pad(this.minutes, 2) : '00';
      this.timestamp += ':';
      this.timestamp += this.seconds ? this.pad(this.seconds, 2) : '00';

      this.timestamp += this.year < 0 ? ' BC' : '';
    }

  }

  updateDuration() {
    this.duration = undefined;
    if (this.century) { this.duration = "1 century" }
    if (this.decade) { this.duration = "1 decade" }
    if (this.year) { this.duration = "1 year" }
    if (this.month) { this.duration = "1 month" }
    if (this.day) { this.duration = "1 day" }
    if (this.hours) { this.duration = "1 hour" }
    if (this.minutes) { this.duration = "1 minute" }
    if (this.seconds) { this.duration = "1 second" }
  }


  validateDateExists() {
    var y = this.year,
      m = this.month,
      d = this.day;
    // Assume not leap year by default (note zero index for Jan)
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // If evenly divisible by 4 and not evenly divisible by 100,
    // or is evenly divisible by 400, then a leap year
    if ((!(y % 4) && y % 100) || !(y % 400)) {
      daysInMonth[1] = 29;
    }
    return !(/\D/.test(String(d))) && d > 0 && d <= daysInMonth[--m]
  }

  pad(number: number, width: number, z: string = '0'): string {
    var n = number.toString();
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  emitDateChange() {
    this.onDateChange.emit({
      year: this.year,
      month: this.month,
      day: this.day
    });
  }

  setYearMonthDay(ymd: YearMonthDay) {
    this._year = ymd.year;
    this._month = ymd.month;
    this._day = ymd.day;
    this.update();
  }
}

@Component({
  selector: 'gv-pe-it-date',
  templateUrl: './pe-it-date.component.html',
  styleUrls: ['./pe-it-date.component.scss']
})
export class PeItDateComponent implements OnInit {

  tr: TimePrimitive;

  trYear: TimePrimitive;

  trJulian: TimePrimitive;

  trCentury: TimePrimitive;

  timeInputsVisible: boolean = false;

  centuryInputsVisible: boolean;

  diff;

  constructor() {
    this.tr = new TimePrimitive();
    this.trYear = new TimePrimitive();
    this.trJulian = new TimePrimitive();
    this.trCentury = new TimePrimitive();


    this.trYear.onDateChange.subscribe((ymd: YearMonthDay) => {
      this.diff = this.dayDiffGregJul(ymd);
      this.trJulian.setYearMonthDay(this.gregorianToJulian(ymd))

    })

    this.trJulian.onDateChange.subscribe((ymd: YearMonthDay) => {
      this.diff = this.dayDiffGregJul(ymd);
      this.trYear.setYearMonthDay(this.julianToGregorian(ymd))
    })

    this.hideCenturyInputs();
  }

  ngOnInit() {
  }


  /**
   * Calculate the day difference between gregorian and julian calendar
   *
   * @return {type}  description
   */
  dayDiffGregJul(ymd: YearMonthDay): number {
    var y; // Year
    var m; // Month
    var c; // Number of century
    var a; // ?
    var b; // Rest of division

    y = ymd.year, m = ymd.month || 1;

    if (m <= 2) {
      c = Math.floor((y - 1) / 100);
    }
    else {
      c = Math.floor((y) / 100);
    }

    a = Math.floor(c / 4);

    b = c % 4; // Rest of division

    return 3 * a + b - 2;
  }

  lengthOfMonthGregorian(year: number, month: number) {
    var y = year, m = month;

    // Assume not leap year by default (note zero index for Jan)
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // If evenly divisible by 4 and not evenly divisible by 100,
    // or is evenly divisible by 400, then a leap year
    if ((!(y % 4) && y % 100) || !(y % 400)) {
      daysInMonth[1] = 29;
    }
    return daysInMonth[--m]
  }

  lengthOfMonthJulian(year: number, month: number) {
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

  gregorianToJulian(ymd: YearMonthDay): YearMonthDay {

    if (!ymd.year) return {
      year: undefined,
      month: undefined,
      day: undefined
    };

    var gy = ymd.year || 1,
      gm = ymd.month || 1,
      gd = ymd.day || 1;

    var jy: number;
    var jm: number;
    var jd: number;

    var diff = this.dayDiffGregJul(ymd);

    jd = gd - diff;
    jm = gm;
    jy = gy;

    // if day smaller than one
    if (jd <= 0) {

      // subtract one month
      jm--;

      // if month equal or smaller than one
      if (jm <= 0) {

        // set month to december
        jm = 12;

        // subtract one year
        jy --;
      }

      // take the size of the resulting month and add jd which is 0 or negative
      jd = this.lengthOfMonthJulian(jy, jm) + jd;
    }
    // if the day is bigger than the month
    else if (jd > this.lengthOfMonthJulian(jy, jm)) {
      // add a Month
      jm++;

      // if month bigger than 12
      if(jm >= 12) {

        // set month to january
        jm = 1;

        // add a year
        jy++;

      }

      // set the day
      jd = jd - this.lengthOfMonthJulian(jy,jm);
    }

    return {
      year: jy,
      month: jm,
      day: jd
    }
  }

  julianToGregorian(ymd: YearMonthDay): YearMonthDay {

    if (!ymd.year) return {
      year: undefined,
      month: undefined,
      day: undefined
    };

    var jy = ymd.year || 1,
      jm = ymd.month || 1,
      jd = ymd.day || 1;

    var gy: number;
    var gm: number;
    var gd: number;


    var diff = this.dayDiffGregJul(ymd);
    gd = jd + diff;
    gm = jm;
    gy = jy;
    var lengthOfGregMonth = this.lengthOfMonthGregorian(jy, jm);
    // var correctYear:boolean = correctMonth && (gm - 1) <= 0;

    // if day longer than month
    if (gd > lengthOfGregMonth) {

      // add one month
      gm = jm + 1;

      // reduce day by month length
      gd = gd - lengthOfGregMonth;

    }

    // if day smaller one
    if (gd <= 0) {

      // subtract one month
      gm = jm - 1;

      if (gm <= 0) {

        // set month to december
        gm = 12;

        // subtract one year
        gy--;
      }

      // set month length plus gd which is at this point 0 negative
      gd = this.lengthOfMonthGregorian(gy, gm) + gd;

    }

    // if month bigger than 12
    if (gm > 12) {

      // add one year
      gy++;

      // set month to january
      gm = 1;
    }


    return {
      year: gy,
      month: gm,
      day: gd
    }
  }


  showTimeInputs() {
    this.timeInputsVisible = true;
  }

  hideTimeInputs() {
    this.timeInputsVisible = false;
    this.trYear.hours = undefined;
    this.trYear.minutes = undefined;
    this.trYear.seconds = undefined;
  }

  showCenturyInputs() {
    this.centuryInputsVisible = true;
    this.tr = this.trCentury;

  }

  hideCenturyInputs() {
    this.centuryInputsVisible = false;
    this.tr = this.trYear;

  }


  ok() {
    console.log()
  }
}
