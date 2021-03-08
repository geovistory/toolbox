import { DatePipe, CommonModule } from '@angular/common';
import { EventEmitter, Pipe, NgModule } from '@angular/core';
import { of, combineLatest, pipe, Subject, iif } from 'rxjs';
import { map, filter, first, takeUntil, switchMap } from 'rxjs/operators';
import { concat, values, sort } from 'ramda';
import { tag } from 'rxjs-spy/operators';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/classes/date-time-commons.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class DateTimeCommons {
    /**
     * @param {?=} data
     */
    constructor(data) {
        /**
         * Properties
         */
        this.onDateChange = new EventEmitter();
        Object.assign(this, data);
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set year(val) {
        this._year = val;
        this.emitDateChange();
    }
    /**
     * @return {?}
     */
    get year() {
        return this._year;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set month(val) {
        this._month = val;
        this.emitDateChange();
    }
    /**
     * @return {?}
     */
    get month() {
        return this._month;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set day(val) {
        this._day = val;
        this.emitDateChange();
    }
    /**
     * @return {?}
     */
    get day() {
        return this._day;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set hours(val) {
        this._hours = val;
    }
    /**
     * @return {?}
     */
    get hours() {
        return this._hours;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set minutes(val) {
        this._minutes = val;
    }
    /**
     * @return {?}
     */
    get minutes() {
        return this._minutes;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set seconds(val) {
        this._seconds = val;
    }
    /**
     * @return {?}
     */
    get seconds() {
        return this._seconds;
    }
    /**
     * Returns the running day for given month and day with consideration of the
     * isLeap boolean that indicates leap years. Inspired by:
     * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_julianischem_Kalender
     *
     * @param {?} month 1=january .. 12=december
     * @param {?} day 1, 2 .. 31
     * @param {?} isLeap if true, this is a leap year
     * @return {?}
     */
    calcRunningDay(month, day, isLeap) {
        // if no month or day provided, let's start at 1
        day = (day === undefined || day === null) ? 1 : day;
        month = (month === undefined || month === null) ? 1 : month;
        // month corrections (note that january has index 0)
        /** @type {?} */
        const monthCorrenctions = [-1, 0, -2, -1, -1, 0, 0, 1, +2, +2, +3, +3];
        // leap year correction
        /** @type {?} */
        let lc = 0;
        if (isLeap && month > 2) {
            lc = 1;
        }
        // month correction
        /** @type {?} */
        const mc = monthCorrenctions[month - 1];
        return day + (30 * (month - 1)) + (lc + mc);
    }
    /**
     * Returns the month and day for given running day with consideration of the
     * isLeap boolean that indicates leap years. Inspired by:
     * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_julianischem_Kalender
     *
     * @param {?} runningDay 1, 2 .. 365
     * @param {?} isLeap if true, this is a leap year
     *
     * @return {?}
     */
    calcDateByRunningDay(runningDay, isLeap) {
        // month corrections (note that january has index 0)
        /** @type {?} */
        const monthCorrenctions = [-1, 0, -2, -1, -1, 0, 0, 1, +2, +2, +3, +3];
        // resulting month
        /** @type {?} */
        let month = Math.floor((runningDay + 1) / 30) + 1;
        // month correction
        /** @type {?} */
        let mc = monthCorrenctions[month - 1];
        // leap year correction
        /** @type {?} */
        let lc = 0;
        if (isLeap && month > 2) {
            lc = 1;
        }
        // resulting day
        /** @type {?} */
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
    /**
     * @return {?}
     */
    emitDateChange() {
        this.onDateChange.emit({
            year: this.year,
            month: this.month,
            day: this.day
        });
    }
    /**
     * @return {?}
     */
    getGranularity() {
        /** @type {?} */
        let duration;
        if (this.year) {
            duration = '1 year';
        }
        if (this.month) {
            duration = '1 month';
        }
        if (this.day) {
            duration = '1 day';
        }
        if (this.hours) {
            duration = '1 hour';
        }
        if (this.minutes) {
            duration = '1 minute';
        }
        if (this.seconds) {
            duration = '1 second';
        }
        return duration;
    }
    /**
     * @return {?}
     */
    getTimeStamp() {
        /** @type {?} */
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
    /**
     * @return {?}
     */
    getDate() {
        // validate
        if (!this.year && this.year !== 0)
            return null;
        if (this.day && !this.month)
            return null;
        if (this.hours && !this.day)
            return null;
        if (this.minutes && !this.hours)
            return null;
        if (this.seconds && !this.hours)
            return null;
        // creat date
        /** @type {?} */
        const date = new Date();
        date.setFullYear(this.year < 0 ? this.year + 1 : this.year);
        date.setMonth((this.month ? (this.month - 1) : 0));
        date.setDate((this.day ? this.day : 1));
        date.setHours(this.hours ? this.hours : 0);
        date.setMinutes(this.minutes ? this.minutes : 0);
        date.setSeconds(this.seconds ? this.seconds : 0);
        return date;
    }
    /**
     * @param {?} number
     * @param {?} width
     * @param {?=} z
     * @return {?}
     */
    pad(number, width, z = '0') {
        /** @type {?} */
        const n = number.toString();
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
    /**
     * @return {?}
     */
    addYear() {
        this.year++;
        if (this.year === 0)
            this.year++;
        if (this.day > this.lengthOfMonth()) {
            this.day = this.lengthOfMonth();
        }
    }
    /**
     * @return {?}
     */
    addMonth() {
        this.month++;
        if (this.month > 12) {
            this.month = 1;
            this.addYear();
        }
        else if (this.day > this.lengthOfMonth()) {
            this.day = this.lengthOfMonth();
        }
    }
    /**
     * @return {?}
     */
    addDay() {
        this.day++;
        if (this.day > this.lengthOfMonth()) {
            this.day = 1;
            this.addMonth();
        }
    }
    /**
     * @return {?}
     */
    addHour() {
        this.hours++;
        if (this.hours > 23) {
            this.hours = 0;
            this.addDay();
        }
    }
    /**
     * @return {?}
     */
    addMinute() {
        this.minutes++;
        if (this.minutes > 59) {
            this.minutes = 0;
            this.addHour();
        }
    }
    /**
     * @return {?}
     */
    addSecond() {
        this.seconds++;
        if (this.seconds > 59) {
            this.seconds = 0;
            this.addMinute();
        }
    }
    /**
     * @return {?}
     */
    removeYear() {
        this.year--;
        if (this.year === 0) {
            this.year = -1;
        }
        if (this.day > this.lengthOfMonth()) {
            this.day = this.lengthOfMonth();
        }
    }
    /**
     * @return {?}
     */
    removeMonth() {
        this.month--;
        if (this.month < 1) {
            this.month = 12;
            this.removeYear();
        }
        else if (this.day > this.lengthOfMonth()) {
            this.day = this.lengthOfMonth();
        }
    }
    /**
     * @return {?}
     */
    removeDay() {
        this.day--;
        if (this.day < 1) {
            this.removeMonth();
            this.day = this.lengthOfMonth();
        }
    }
    /**
     * @return {?}
     */
    removeHour() {
        this.hours--;
        if (this.hours < 0 || !this.hours) {
            this.hours = 23;
            this.removeDay();
        }
    }
    /**
     * @return {?}
     */
    removeMinute() {
        this.minutes--;
        if (this.minutes < 0 || !this.minutes) {
            this.minutes = 59;
            this.removeHour();
        }
    }
    /**
     * @return {?}
     */
    removeSecond() {
        this.seconds--;
        if (this.seconds < 0 || !this.seconds) {
            this.seconds = 59;
            this.removeMinute();
        }
    }
    /**
     * @param {?} quantity
     * @return {?}
     */
    addDays(quantity) {
        for (let i = 0; i < quantity; i++) {
            this.addDay();
        }
        ;
    }
    /**
     * @param {?} quantity
     * @return {?}
     */
    addMonths(quantity) {
        for (let i = 0; i < quantity; i++) {
            this.addMonth();
        }
        ;
    }
    /**
     * @param {?} quantity
     * @return {?}
     */
    addYears(quantity) {
        for (let i = 0; i < quantity; i++) {
            this.addYear();
        }
        ;
    }
    /**
     * @param {?} duration
     * @return {?}
     */
    add(duration) {
        if (duration === '1 year') {
            this.addYear();
        }
        else if (duration === '1 month') {
            this.addMonth();
        }
        else if (duration === '1 day') {
            this.addDay();
        }
        else if (duration === '1 hour') {
            this.addHour();
        }
        else if (duration === '1 minute') {
            this.addMinute();
        }
        else if (duration === '1 second') {
            this.addSecond();
        }
    }
    /**
     * @param {?} duration
     * @return {?}
     */
    toLastSecondOf(duration) {
        this.add(duration);
        this.removeSecond();
    }
}
if (false) {
    /**
     * Properties
     * @type {?}
     */
    DateTimeCommons.prototype.onDateChange;
    /**
     * @type {?}
     * @private
     */
    DateTimeCommons.prototype._year;
    /**
     * @type {?}
     * @private
     */
    DateTimeCommons.prototype._month;
    /**
     * @type {?}
     * @private
     */
    DateTimeCommons.prototype._day;
    /**
     * @type {?}
     * @private
     */
    DateTimeCommons.prototype._hours;
    /**
     * @type {?}
     * @private
     */
    DateTimeCommons.prototype._minutes;
    /**
     * @type {?}
     * @private
     */
    DateTimeCommons.prototype._seconds;
    /**
     * @abstract
     * @return {?}
     */
    DateTimeCommons.prototype.lengthOfMonth = function () { };
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/classes/julian-date-time.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Class to represent a Julian Date and Time
 * TODO: Move this class to common folder as it is needed by server and client
 */
class JulianDateTime extends DateTimeCommons {
    /**
     * Methods
     * @param {?=} duration
     * @return {?}
     */
    getEndOf(duration = this.getGranularity()) {
        /** @type {?} */
        const dt = new JulianDateTime(this);
        dt.toLastSecondOf(duration);
        return dt;
    }
    /**
     * @return {?}
     */
    lengthOfMonth() {
        /** @type {?} */
        const y = this.year;
        /** @type {?} */
        let m = this.month;
        // Assume not leap year by default (note zero index for Jan)
        /** @type {?} */
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // If evenly divisible by 4 and not one of the years 5 BC, 1 BC or 4 AD,
        // when Augustus dropped the leap year
        if (!(y % 4) && !(y == -5) && !(y == -1) && !(y == 4)) {
            daysInMonth[1] = 29;
        }
        return daysInMonth[--m];
    }
    /**
     * Convert the year, month, day of julian calendar to julian day
     *
     * @return {?} description
     */
    getJulianDay() {
        // running day (conut of days that year)
        /** @type {?} */
        const runningDay = this.calcRunningDay(this.month, this.day, this.isLeapYear());
        /** @type {?} */
        let runningYear;
        if (this.year < 0) {
            // running year
            runningYear = 4716 + this.year;
        }
        else {
            // running year
            runningYear = 4715 + this.year;
        }
        // number of full 4 year cycles
        /** @type {?} */
        const n4 = Math.floor(runningYear / 4)
        // rest of division: number of full years of the last uncomplete 4 years cycle
        ;
        // rest of division: number of full years of the last uncomplete 4 years cycle
        /** @type {?} */
        const n1 = runningYear % 4;
        return 1461 * n4 + 365 * (n1 - 3) + runningDay;
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} julianDay
     * @return {THIS}
     */
    fromJulianDay(julianDay) {
        if (typeof julianDay === 'string') {
            julianDay = parseInt(julianDay, 10);
        }
        // number of full 4 year cycles
        /** @type {?} */
        const n4 = Math.floor((julianDay + (3 * 365)) / 1461);
        // number of days of the last uncomplete 4 years cycle
        /** @type {?} */
        const r4 = (julianDay + (3 * 365)) % 1461;
        // number of full years of the last uncomplete 4 years cycle
        /** @type {?} */
        let n1 = Math.floor(r4 / 365);
        // number of days in the last year
        /** @type {?} */
        let dayOfYear = r4 % 365;
        if (n1 === 4) {
            n1 = 3;
            dayOfYear = 365;
        }
        // running year
        /** @type {?} */
        const runningYear = 4 * n4 + n1;
        // if BC
        if (runningYear <= 4715) {
            // resulting year
            (/** @type {?} */ (this)).year = runningYear - 4716;
            // if AD
        }
        else {
            (/** @type {?} */ (this)).year = runningYear - 4715;
        }
        /** @type {?} */
        const monthDay = (/** @type {?} */ (this)).calcDateByRunningDay(dayOfYear, (/** @type {?} */ (this)).isLeapYear())
        // resulting month
        ;
        // resulting month
        (/** @type {?} */ (this)).month = monthDay.month;
        // resulting day
        (/** @type {?} */ (this)).day = monthDay.day;
        return (/** @type {?} */ (this));
    }
    /**
     * Returns true if given year is a leap year
     * @return {?}
     */
    isLeapYear() {
        // Return true if evenly divisible by 4
        return !(this.year % 4) ? true : false;
    }
    /**
     * @return {?}
     */
    getJulianSecond() {
        /** @type {?} */
        let seconds = this.getJulianDay() * 60 * 60 * 24;
        if (this.seconds > 0)
            seconds = seconds + this.seconds;
        if (this.minutes > 0)
            seconds = seconds + this.minutes * 60;
        if (this.hours > 0)
            seconds = seconds + this.hours * 60 * 60;
        return seconds;
    }
    /**
     * Set this JulianDateTime from given julian second
     * @template THIS
     * @this {THIS}
     * @param {?} julianSecond julian second
     * @return {THIS}
     */
    fromJulianSecond(julianSecond) {
        /** @type {?} */
        const secsPerDay = 60 * 60 * 24;
        // number of full days
        /** @type {?} */
        const julianDay = Math.floor(julianSecond / secsPerDay);
        // number of seconds of the julian day
        /** @type {?} */
        const secsOfDay = julianSecond % secsPerDay;
        // number of ours of the day
        (/** @type {?} */ (this)).hours = Math.floor(secsOfDay / (60 * 60));
        // number of seconds of the last hour
        /** @type {?} */
        const secsOfHour = (/** @type {?} */ (this)).hours % (60 * 60);
        // number of ours of the day
        (/** @type {?} */ (this)).minutes = Math.floor(secsOfHour / 60);
        // secs of the last minute
        (/** @type {?} */ (this)).seconds = (/** @type {?} */ (this)).minutes % 60;
        return (/** @type {?} */ (this)).fromJulianDay(julianDay);
    }
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/classes/gregorian-date-time.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Class to represent a Julian Date and Time
 * TODO: Move this class to common folder as it is needed by server and client
 */
class GregorianDateTime extends DateTimeCommons {
    /**
     * @return {?}
     */
    lengthOfMonth() {
        /** @type {?} */
        let y = this.year;
        /** @type {?} */
        let m = this.month;
        if (!(m > 0) && !(m <= 12)) {
            return undefined;
        }
        // Assume not leap year by default (note zero index for Jan)
        /** @type {?} */
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // If evenly divisible by 4 and not evenly divisible by 100,
        // or is evenly divisible by 400, then a leap year
        if (this.isLeapYear()) {
            daysInMonth[1] = 29;
        }
        return daysInMonth[--m];
    }
    /**
     * @param {?=} duration
     * @return {?}
     */
    getEndOf(duration = this.getGranularity()) {
        /** @type {?} */
        const dt = new GregorianDateTime(this);
        dt.toLastSecondOf(duration);
        return dt;
    }
    /**
     * getJulianDay - Implemented according to this page [2018-03-12]:
     * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_gregorianischem_Kalender
     *
     * @return {?} description
     */
    getJulianDay() {
        // running day (conut of days that year)
        /** @type {?} */
        const runningDay = this.calcRunningDay(this.month, this.day, this.isLeapYear());
        // running year
        /** @type {?} */
        const runningYear = this.year - 1;
        // julian day of year 1 AD
        /** @type {?} */
        const julianDay0 = 1721426;
        // number of full 400 year cycles
        /** @type {?} */
        const n400 = Math.floor(runningYear / 400);
        // rest of division: number of years of the last uncomplete 400 years cycle
        /** @type {?} */
        const r400 = runningYear % 400;
        // number of full 100 year cycles
        /** @type {?} */
        const n100 = Math.floor(r400 / 100)
        // rest of division: number of years of the last uncomplete 100 years cycle
        ;
        // rest of division: number of years of the last uncomplete 100 years cycle
        /** @type {?} */
        const r100 = r400 % 100;
        // number of full 4 year cycles
        /** @type {?} */
        const n4 = Math.floor(r100 / 4)
        // rest of division: number of full years of the last uncomplete 4 years cycle
        ;
        // rest of division: number of full years of the last uncomplete 4 years cycle
        /** @type {?} */
        const n1 = r100 % 4;
        return julianDay0 + n400 * 146097 + n100 * 36524 + n4 * 1461 + n1 * 365 + runningDay;
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} julianDay
     * @return {THIS}
     */
    fromJulianDay(julianDay) {
        if (typeof julianDay === 'string') {
            julianDay = parseInt(julianDay);
        }
        // julian day of year 1 AD
        /** @type {?} */
        const julianDay0 = 1721426;
        /** @type {?} */
        const firstDayOfGregorianCal = 2299161;
        // conversion of julian day earlier than the introduction of
        // the gregorian calendar October 15th of 1582 are calculated
        // with the julian calendar algoritms
        if (julianDay < firstDayOfGregorianCal) {
            /** @type {?} */
            const jdt = new JulianDateTime().fromJulianDay(julianDay);
            (/** @type {?} */ (this)).year = jdt.year;
            (/** @type {?} */ (this)).month = jdt.month;
            (/** @type {?} */ (this)).day = jdt.day;
        }
        else {
            // number of full 400 year cycles
            /** @type {?} */
            const n400 = Math.floor((julianDay - julianDay0) / 146097);
            // number of days of the last uncomplete 400 years cycle
            /** @type {?} */
            const r400 = (julianDay - julianDay0) % 146097;
            // number of full 100 year cycles
            /** @type {?} */
            let n100 = Math.floor(r400 / 36524);
            // number of days of the last uncomplete 100 years cycle
            /** @type {?} */
            let r100 = r400 % 36524;
            if (n100 === 4) {
                n100 = 3;
                r100 = 36524;
            }
            // number of full 4 year cycles
            /** @type {?} */
            const n4 = Math.floor(r100 / 1461);
            // number of days of the last uncomplete 4 years cycle
            /** @type {?} */
            const r4 = r100 % 1461;
            // number of full years of the last uncomplete 4 years cycle
            /** @type {?} */
            let n1 = Math.floor(r4 / 365);
            // number of days in the last year
            /** @type {?} */
            let runningDay = r4 % 365;
            if (n1 === 4) {
                n1 = 3;
                runningDay = 365;
            }
            // running year
            /** @type {?} */
            const runningYear = 400 * n400 + 100 * n100 + 4 * n4 + n1;
            // resulting year
            (/** @type {?} */ (this)).year = runningYear + 1;
            /** @type {?} */
            const monthDay = (/** @type {?} */ (this)).calcDateByRunningDay(runningDay, (/** @type {?} */ (this)).isLeapYear())
            // resulting month
            ;
            // resulting month
            (/** @type {?} */ (this)).month = monthDay.month;
            // resulting day
            (/** @type {?} */ (this)).day = monthDay.day;
        }
        return (/** @type {?} */ (this));
    }
    /**
     * Returns true if given year is a leap year
     * @return {?}
     */
    isLeapYear() {
        /** @type {?} */
        const year = this.year;
        // Return true if evenly divisible by 4 and not evenly divisible by 100,
        // or is evenly divisible by 400, then a leap year
        return ((!(year % 4) && year % 100) || !(year % 400)) ? true : false;
    }
    /**
     * returns julian day in seconds
     *
     * TODO: return julian day plus time in seconds
     * @return {?}
     */
    getJulianSecond() {
        /** @type {?} */
        let seconds = this.getJulianDay() * 60 * 60 * 24;
        if (this.seconds > 0)
            seconds = seconds + this.seconds;
        if (this.minutes > 0)
            seconds = seconds + this.minutes * 60;
        if (this.hours > 0)
            seconds = seconds + this.hours * 60 * 60;
        return seconds;
    }
    /**
     * Set this JulianDateTime from given julian second
     * @template THIS
     * @this {THIS}
     * @param {?} julianSecond julian second
     * @return {THIS}
     */
    fromJulianSecond(julianSecond) {
        /** @type {?} */
        const secsPerDay = 60 * 60 * 24;
        // number of full days
        /** @type {?} */
        const julianDay = Math.floor(julianSecond / secsPerDay);
        // number of seconds of the julian day
        /** @type {?} */
        const secsOfDay = julianSecond % secsPerDay;
        // number of ours of the day
        (/** @type {?} */ (this)).hours = Math.floor(secsOfDay / (60 * 60));
        // number of seconds of the last hour
        /** @type {?} */
        const secsOfHour = (/** @type {?} */ (this)).hours % (60 * 60);
        // number of ours of the day
        (/** @type {?} */ (this)).minutes = Math.floor(secsOfHour / 60);
        // secs of the last minute
        (/** @type {?} */ (this)).seconds = (/** @type {?} */ (this)).minutes % 60;
        return (/** @type {?} */ (this)).fromJulianDay(julianDay);
    }
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/classes/time-primitive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TimePrimitive {
    // the calendar initialy used by user to create time primitive
    /**
     * @param {?=} data
     */
    constructor(data) {
        // Last day of the era before christ
        this.LAST_DAY_BC = 1721422;
        Object.assign(this, data);
        if (((/** @type {?} */ (data))).julian_day)
            this.julianDay = ((/** @type {?} */ (data))).julian_day;
    }
    /**
     * @return {?}
     */
    getGregorianDateTime() {
        /** @type {?} */
        const g = new GregorianDateTime();
        g.fromJulianDay(this.julianDay);
        return g;
    }
    /**
     * @return {?}
     */
    getJulianDateTime() {
        /** @type {?} */
        const j = new JulianDateTime();
        j.fromJulianDay(this.julianDay);
        return j;
    }
    /**
     * Get a DateTime object according to the given calendar.
     *
     * @param {?=} calendar
     * @return {?}
     */
    getDateTime(calendar = this.calendar) {
        if (!calendar)
            return null;
        if (calendar === 'gregorian')
            return this.getGregorianDateTime();
        if (calendar === 'julian')
            return this.getJulianDateTime();
    }
    /**
     * Get a Date object according to the given calendar.
     *
     * @param {?=} calendar
     * @return {?}
     */
    getDate(calendar = this.calendar) {
        return this.getDateTime(calendar).getDate();
    }
    /**
     * Get a string that defines the format usable with the DatePipe,
     * a according to the given granularity
     * @param {?} granularity
     * @return {?}
     */
    getDateFormatString(granularity) {
        if (this.julianDay <= this.LAST_DAY_BC) {
            switch (granularity) {
                case '1 year':
                    return 'y GG';
                case '1 month':
                    return 'MMM, y GG';
                case '1 day':
                    return 'MMM d, y GG';
                case '1 hour':
                    return 'MMM d, y GG, HH';
                case '1 minute':
                    return 'MMM d, y GG, HH:mm';
                case '1 second':
                    return 'MMM d, y GG, HH:mm:ss';
                default:
                    return '';
            }
        }
        else {
            switch (granularity) {
                case '1 year':
                    return 'y';
                case '1 month':
                    return 'MMM, y';
                case '1 day':
                    return 'MMM d, y';
                case '1 hour':
                    return 'MMM d, y, HH';
                case '1 minute':
                    return 'MMM d, y, HH:mm';
                case '1 second':
                    return 'MMM d, y, HH:mm:ss';
                default:
                    return '';
            }
        }
    }
    /**
     * Get a display label of the current TimePrimitive.
     * @return {?}
     */
    getShortesDateFormatString() {
        return this.getDateFormatString(this.duration);
    }
    /**
     * Get the julian day in seconds
     * TODO: integrate time
     * @return {?}
     */
    getJulianSecond() {
        return this.julianDay * 60 * 60 * 24;
    }
    /**
     * Get the last second of this TimePrimitive. This depends on the calendar,
     * since the month february and leap years differ from one calendar to the other
     *
     * @param {?=} calendar
     * @return {?}
     */
    getLastSecond(calendar = this.calendar) {
        /** @type {?} */
        const dt = this.getDateTime();
        return dt.getEndOf(this.duration).getJulianSecond();
    }
}
if (false) {
    /** @type {?} */
    TimePrimitive.prototype.LAST_DAY_BC;
    /** @type {?} */
    TimePrimitive.prototype.julianDay;
    /** @type {?} */
    TimePrimitive.prototype.duration;
    /** @type {?} */
    TimePrimitive.prototype.calendar;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/pipes/time-primitive.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TimePrimitivePipe {
    /**
     * @param {?} datePipe
     */
    constructor(datePipe) {
        this.datePipe = datePipe;
    }
    /**
     * @param {?} timePrimitive
     * @return {?}
     */
    transform(timePrimitive) {
        if (!timePrimitive)
            return null;
        /** @type {?} */
        const tp = new TimePrimitive(timePrimitive);
        if (!tp)
            return null;
        /** @type {?} */
        const dt = tp.getDateTime();
        if (!dt)
            return null;
        // This is a hack for dataPipe, because datePipe subtracts 1 year from BC
        // Probably to avoid the year 0
        if (dt.year < 0)
            dt.year = dt.year + 1;
        if (!dt.day)
            dt.day = 31;
        /** @type {?} */
        const date = dt.getDate();
        return this.datePipe.transform(date, tp.getShortesDateFormatString());
    }
}
TimePrimitivePipe.decorators = [
    { type: Pipe, args: [{
                name: 'timePrimitive'
            },] }
];
/** @nocollapse */
TimePrimitivePipe.ctorParameters = () => [
    { type: DatePipe }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    TimePrimitivePipe.prototype.datePipe;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/classes/time-span-util.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const x = undefined;
/**
 * @record
 */
function InfTimePrimitiveWithCalendar() { }
if (false) {
    /** @type {?} */
    InfTimePrimitiveWithCalendar.prototype.calendar;
}
/**
 * @record
 */
function TimeSpanWithNumberProps() { }
if (false) {
    /* Skipping unnamed member:
    72?: InfTimePrimitiveWithCalendar;*/
    /* Skipping unnamed member:
    152?: InfTimePrimitiveWithCalendar;*/
    /* Skipping unnamed member:
    153?: InfTimePrimitiveWithCalendar;*/
    /* Skipping unnamed member:
    71?: InfTimePrimitiveWithCalendar;*/
    /* Skipping unnamed member:
    150?: InfTimePrimitiveWithCalendar;*/
    /* Skipping unnamed member:
    151?: InfTimePrimitiveWithCalendar;*/
}
class TimeSpanUtil {
    /**
     * @param {?=} data
     */
    constructor(data) {
        this.tpKeys = ['p82', 'p81', 'p82a', 'p82b', 'p81a', 'p81b'];
        if (data) {
            Object.keys(data).forEach((/**
             * @param {?} key
             * @return {?}
             */
            key => data[key] === undefined ? delete data[key] : ''));
            Object.assign(this, data);
            this.tpKeys.forEach((/**
             * @param {?} key
             * @return {?}
             */
            key => {
                if (this[key])
                    this[key] = new TimePrimitive(this[key]);
            }));
        }
    }
    // end of the end | right outer bound | not after
    /**
     * @return {?}
     */
    get earliestDay() {
        if (this.isEmpty())
            return null;
        /** @type {?} */
        let min = Number.POSITIVE_INFINITY;
        this.tpKeys.forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            if (this[key]) {
                /** @type {?} */
                const current = this[key].julianDay;
                // if this timePrimitive is earlier than min, set this as new min
                min = current < min ? current : min;
            }
        }));
        return min;
    }
    /**
     * get the earliest and latest TimePrimitive of given array of TimePrimitives
     *
     * For earliest it compares the begin of TimePrimitive duration
     * For latest it compares the last second of TimePrimitive duration
     *
     * @param {?} tps
     * @return {?} object with min Date and max Date or null, if no TimePrimitive available
     */
    static getMinMaxTimePrimitveOfArray(tps) {
        if (!tps || tps.length < 1)
            return null;
        /** @type {?} */
        let min = tps[0];
        /** @type {?} */
        let max = tps[0];
        tps.forEach((/**
         * @param {?} tp
         * @return {?}
         */
        tp => {
            // if this timePrimitive is earlier than min, set this as new min
            min = tp.getJulianSecond() < min.getJulianSecond() ? tp : min;
            // if this timePrimitive is later than max, set this as new max
            max = tp.getJulianSecond() > max.getJulianSecond() ? tp : max;
            //  check if we would need the latest second here?
            // max = tp.getLastSecond() > max.getLastSecond() ? tp : max;
        }));
        return { min: min, max: max };
    }
    /**
     * @param {?=} d
     * @return {?}
     */
    static fromTimeSpanDialogData(d = {}) {
        if (!d)
            d = {};
        /** @type {?} */
        const x = {};
        if (d['72'])
            x['p82'] = d['72'];
        if (d['71'])
            x['p81'] = d['71'];
        if (d['152'])
            x['p82a'] = d['152'];
        if (d['150'])
            x['p81a'] = d['150'];
        if (d['151'])
            x['p81b'] = d['151'];
        if (d['153'])
            x['p82b'] = d['153'];
        return new TimeSpanUtil(x);
    }
    /**
     * returns true if no TimePrimitive is there
     * @return {?}
     */
    isEmpty() {
        return !this.isNotEmpty();
    }
    /**
     * returns true if at least one TimePrimitive is there
     * @return {?}
     */
    isNotEmpty() {
        if (this.p82 || this.p81 || this.p82a || this.p82b || this.p81a || this.p81b)
            return true;
        else
            return false;
    }
    /**
     * get the earliest and latest TimePrimitive of this TimeSpan
     *
     * For earliest it compares the begin of TimePrimitive duration
     * For latest it compares the last second of TimePrimitive duration
     *
     * @return {?} object with min Date and max Date or null, if no TimePrimitive available
     */
    getMinMaxTimePrimitive() {
        return TimeSpanUtil.getMinMaxTimePrimitveOfArray(this.getArrayOfTimePrimitives());
    }
    /**
     * @return {?} array of TimePrimitives of this TimeSpan
     */
    getArrayOfTimePrimitives() {
        /** @type {?} */
        const array = [];
        this.tpKeys.forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            if (this[key]) {
                array.push(this[key]);
            }
        }));
        return array;
    }
    /**
     * @return {?}
     */
    getPrimitivesForPreview() {
        /** @type {?} */
        const single = this.p82 || this.p81;
        /** @type {?} */
        const begin = this.p82a || this.p81a;
        /** @type {?} */
        const end = this.p82b || this.p81b;
        return { single, begin, end };
    }
}
if (false) {
    /** @type {?} */
    TimeSpanUtil.prototype.tpKeys;
    /** @type {?} */
    TimeSpanUtil.prototype.p82;
    /** @type {?} */
    TimeSpanUtil.prototype.p81;
    /** @type {?} */
    TimeSpanUtil.prototype.p82a;
    /** @type {?} */
    TimeSpanUtil.prototype.p81a;
    /** @type {?} */
    TimeSpanUtil.prototype.p81b;
    /** @type {?} */
    TimeSpanUtil.prototype.p82b;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/pipes/time-span.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TimeSpanPipe {
    /**
     * @param {?} timePrimitivePipe
     */
    constructor(timePrimitivePipe) {
        this.timePrimitivePipe = timePrimitivePipe;
    }
    /**
     * @param {?} timeSpan
     * @return {?}
     */
    transform(timeSpan) {
        if (!timeSpan)
            return null;
        /** @type {?} */
        const ts = new TimeSpanUtil(timeSpan).getPrimitivesForPreview();
        // nothing
        if (!ts.single && !ts.begin && !ts.end)
            return '';
        // only sinlge
        if (ts.single && !(ts.begin || ts.end))
            return this.getString(ts.single);
        // only begin and end
        if (ts.begin && ts.end && !ts.single)
            return this.getString(ts.begin) + ' – ' + this.getString(ts.end);
        // only sinlge and end
        if (ts.single && ts.end && !ts.begin)
            return this.getString(ts.single) + ' – ' + this.getString(ts.end);
        // only begin and sinlge
        if (ts.begin && ts.single && !ts.end)
            return this.getString(ts.begin) + ' – ' + this.getString(ts.single);
        // all three
        return this.getString(ts.begin) + ' – ' + this.getString(ts.end);
    }
    /**
     * @param {?} t
     * @return {?}
     */
    getString(t) {
        /** @type {?} */
        const s = this.timePrimitivePipe.transform(t);
        return s ? s : '(?)';
    }
}
TimeSpanPipe.decorators = [
    { type: Pipe, args: [{
                name: 'timeSpan'
            },] }
];
/** @nocollapse */
TimeSpanPipe.ctorParameters = () => [
    { type: TimePrimitivePipe }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    TimeSpanPipe.prototype.timePrimitivePipe;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/date-time.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DateTimeModule {
}
DateTimeModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                ],
                providers: [
                    TimePrimitivePipe,
                    TimeSpanPipe,
                    DatePipe
                ],
                declarations: [
                    TimeSpanPipe,
                    TimePrimitivePipe,
                ],
                exports: [
                    TimeSpanPipe,
                    TimePrimitivePipe,
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/classes/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/pipes/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: lib/functions/combineLatestOrEmpty.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Combine Latest or, if input is an empty array, emit empty array
 * @template I
 * @param {?} obs
 * @return {?}
 */
function combineLatestOrEmpty(obs) {
    obs = [of(null), ...obs];
    return combineLatest(obs).pipe(map((/**
     * @param {?} values
     * @return {?}
     */
    (values) => {
        values.shift();
        return values;
    })));
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/functions/util.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function LabelGeneratorSettings() { }
if (false) {
    /** @type {?|undefined} */
    LabelGeneratorSettings.prototype.fieldsMax;
    /** @type {?|undefined} */
    LabelGeneratorSettings.prototype.statementsMax;
    /** @type {?} */
    LabelGeneratorSettings.prototype.path;
}
/**
 * Utilities class for static functions
 */
class U {
    /**
     * @template T
     * @param {?} obj
     * @return {?}
     */
    static obj2Arr(obj) {
        /** @type {?} */
        const arr = [];
        if (obj == undefined)
            return arr;
        Object.keys(obj).forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            arr.push(obj[key]);
        }));
        return arr;
    }
    /**
     * @template T
     * @param {?} obj
     * @return {?}
     */
    static objNr2Arr(obj) {
        /** @type {?} */
        const arr = [];
        if (obj == undefined)
            return arr;
        Object.keys(obj).forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            arr.push(obj[key]);
        }));
        return arr;
    }
    /**
     * converts object to array with {key: value} objects, e.g.:
     * {'a': 12, 'b': 99} --> [{key: 'a', value: 12, key: 'b', value: 99}]
     *
     * @template T
     * @param {?} obj
     * @return {?}
     */
    static obj2KeyValueArr(obj) {
        /** @type {?} */
        const keys = [];
        for (const key in obj) {
            if (obj[key]) {
                keys.push({ key: key, value: obj[key] });
            }
        }
        return keys;
    }
    /**
     * @param {?} textProperties
     * @param {?} fkSystemType
     * @return {?}
     */
    static firstProTextPropStringOfType(textProperties, fkSystemType) {
        return (textProperties.find((/**
         * @param {?} t
         * @return {?}
         */
        t => t.fk_system_type === fkSystemType)) || { string: '' }).string;
    }
    /**
     * Erzeugt eine UUID nach RFC 4122
     * @return {?}
     */
    static uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (/**
         * @param {?} char
         * @return {?}
         */
        (char) => {
            /** @type {?} */
            const random = Math.random() * 16 | 0;
            // Nachkommastellen abschneiden
            /** @type {?} */
            const value = char === 'x' ? random : (random % 4 + 8);
            return value.toString(16); // Hexadezimales Zeichen zurückgeben
        }));
    }
    /**
     * @param {?} fkProp
     * @param {?} isOutgoing
     * @return {?}
     */
    static propertyFieldKeyFromParams(fkProp, isOutgoing) {
        return '_' + fkProp + '_' + (isOutgoing ? 'outgoing' : 'ingoing');
    }
    /**
     * Helper function that converts given number to string
     * but zero (=0) values return undefined.
     * @param {?} val
     * @return {?}
     */
    static toStr0undef(val) {
        if (val === 0)
            return undefined;
        else if (val === undefined)
            return undefined;
        else if (val === null)
            return undefined;
        else
            return val.toString();
    }
    /**
     * Helper function that converts given array to string
     *
     * If array contains 0, null or undefined, return underfined
     * @param {?} vals
     * @return {?}
     */
    static toStrContains0undef(vals) {
        /** @type {?} */
        let string = '';
        for (let i = 0; i < vals.length; i++) {
            /** @type {?} */
            const val = vals[i];
            if (val === 0)
                return undefined;
            else if (val === undefined)
                return undefined;
            else if (val === null)
                return undefined;
            else if (i === 0) {
                string = val.toString();
            }
            else {
                string = `${string}_${val.toString()}`;
            }
        }
        return string;
    }
}
U.recursiveMarkAsTouched = (/**
 * @param {?} f
 * @return {?}
 */
(f) => {
    if (f.controls) {
        if (Array.isArray(f.controls)) {
            // in this case it is a formArray
            f.controls.forEach((/**
             * @param {?} c
             * @return {?}
             */
            (c) => {
                c.markAsTouched();
                if (c.controls)
                    U.recursiveMarkAsTouched(c);
            }));
        }
        else {
            // in this case it is a formGroup
            if (f.controls['childControl']) {
                /** @type {?} */
                const c = (/** @type {?} */ (f.controls['childControl']));
                c.markAsTouched();
                if (c.controls)
                    U.recursiveMarkAsTouched(c);
            }
        }
    }
});
if (false) {
    /** @type {?} */
    U.recursiveMarkAsTouched;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/functions/custom-rxjs-operators.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template T
 */
function ByPk() { }
/**
 * @record
 * @template T
 */
function VersionEntity() { }
if (false) {
    /** @type {?} */
    VersionEntity.prototype._latestVersion;
    /* Skipping unhandled member: [v: number]: T*/
}
/**
 * @record
 * @template T
 */
function EntityVersionsByPk() { }
/*****************************************************************************
 * Generic operators
 *****************************************************************************/
/**
 * Returns an Observable that emits an flatened array consisting of the items of the arrays returned by getArrayFromItemFn.
 * @template T, R
 * @param {?} getArrayFromItemFn
 * @return {?}
 */
function mapConcat(getArrayFromItemFn) {
    return map((/**
     * @param {?} source
     * @return {?}
     */
    (source) => {
        if (typeof getArrayFromItemFn !== 'function') {
            throw new TypeError('argument is not a function.');
        }
        /** @type {?} */
        let concatenatedArray = [];
        source.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            if (item)
                concatenatedArray = concat(concatenatedArray, getArrayFromItemFn(item));
        }));
        return concatenatedArray;
    }));
}
/**
 * Takes an object with EntityVersions indexed by pk
 * Returns an array containing the latest versions for each indexed entity
 * @template T
 * @return {?}
 */
function latestEntityVersions() {
    return pipe(map((/**
     * @param {?} d
     * @return {?}
     */
    d => U.objNr2Arr(d))), map((/**
     * @param {?} a
     * @return {?}
     */
    a => a.map((/**
     * @param {?} q
     * @return {?}
     */
    q => q[q._latestVersion])))));
}
/**
 * Takes an object with EntityVersions indexed by pk
 * Returns an the latest versions for entity with given pkEntity
 * @template T
 * @param {?} pkEntity
 * @return {?}
 */
function latestEntityVersion(pkEntity) {
    return pipe(map((/**
     * @param {?} byPkEntity
     * @return {?}
     */
    byPkEntity => byPkEntity[pkEntity])), filter((/**
     * @param {?} entityVersions
     * @return {?}
     */
    entityVersions => entityVersions && entityVersions._latestVersion !== undefined)), map((/**
     * @param {?} entityVersions
     * @return {?}
     */
    entityVersions => entityVersions[entityVersions._latestVersion])));
}
/**
 * @template T
 * @param {?} versions
 * @return {?}
 */
function latestVersion(versions) {
    /** @type {?} */
    let latestVersion = 0;
    /** @type {?} */
    let latest;
    values(versions).forEach((/**
     * @param {?} v
     * @return {?}
     */
    (v) => {
        if (v.entity_version > latestVersion) {
            latestVersion = v.entity_version;
            latest = v;
        }
    }));
    return latest;
}
/**
 * @template T
 * @param {?} versions
 * @param {?} version
 * @return {?}
 */
function getSpecificVersion(versions, version) {
    /** @type {?} */
    const ver = values(versions).find((/**
     * @param {?} v
     * @return {?}
     */
    (v) => v.entity_version === version));
    return ver;
}
/**
 * limits the number of items in array
 * @template T
 * @param {?=} limit
 * @return {?}
 */
function limitTo(limit) {
    return map((/**
     * @param {?} items
     * @return {?}
     */
    (items) => {
        if (!limit)
            return items;
        return items.slice(0, limit);
    }));
}
/**
 * limits the number of items in array
 * @template T
 * @param {?=} limit
 * @param {?=} offset
 * @return {?}
 */
function limitOffset(limit, offset) {
    return map((/**
     * @param {?} items
     * @return {?}
     */
    (items) => {
        if (!limit)
            return items;
        offset = offset ? offset : 0;
        /** @type {?} */
        const start = limit * offset;
        /** @type {?} */
        const end = start + limit;
        return items.slice(start, end);
    }));
}
/**
 * @template T
 * @param {?} stringFn
 * @return {?}
 */
function sortAbc(stringFn) {
    return map((/**
     * @param {?} l
     * @return {?}
     */
    (l) => sort((/**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    (a, b) => {
        /** @type {?} */
        let textA = stringFn(a);
        /** @type {?} */
        let textB = stringFn(b);
        if (!textA)
            return -1;
        if (!textB)
            return 1;
        textA = textA.toUpperCase(); // ignore upper and lowercase
        textB = textB.toUpperCase(); // ignore upper and lowercase
        if (textA < textB) {
            return -1;
        }
        if (textA > textB) {
            return 1;
        }
        // names are equal
        return 0;
    }), l)));
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/functions/debug-combine-latest-or-empty.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Debug combineLatestOrEmpty:
 * Waits for a moment and reports to console which items did not next
 *
 * @template I
 * @param {?} obs
 * @param {?=} wait number of miliseconds to wait
 * @return {?}
 */
function debugCombineLatestOrEmpty(obs, wait = 500) {
    /** @type {?} */
    const until$ = new Subject();
    /** @type {?} */
    const report = [];
    setTimeout((/**
     * @return {?}
     */
    () => {
        until$.next();
        console.log('> Report');
        console.log(`  ${report.map((/**
         * @param {?} item
         * @param {?} i
         * @return {?}
         */
        (item, i) => `${i} ${item}`)).join('\n')}`);
    }), wait);
    obs.forEach((/**
     * @param {?} item
     * @param {?} i
     * @return {?}
     */
    (item, i) => {
        report.push('> No value emitted');
        item.pipe(first(), takeUntil(until$)).subscribe((/**
         * @param {?} val
         * @return {?}
         */
        (val) => {
            report[i] = 'Ok';
        }));
    }));
    obs = [of(null), ...obs];
    return combineLatest(obs).pipe(map((/**
     * @param {?} values
     * @return {?}
     */
    (values) => {
        values.shift();
        return values;
    })));
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/functions/switchMapOr.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * switchMaps to the default, if condition is true, else to provided elseOutput
 *
 * @template I, O
 * @param {?} defaultValue
 * @param {?} elseOutput
 * @param {?=} conditionForDefault
 * @return {?}
 */
function switchMapOr(defaultValue, elseOutput, conditionForDefault) {
    return (/**
     * @param {?} source
     * @return {?}
     */
    function (source) {
        conditionForDefault = conditionForDefault ? conditionForDefault : (/**
         * @param {?} x
         * @return {?}
         */
        (x) => (!x || Object.keys(x).length < 1));
        return source.pipe(
        // auditTime(1),
        switchMap((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            return iif((/**
             * @return {?}
             */
            () => conditionForDefault(value)), of(defaultValue), elseOutput(value));
        })), tag(`switchMapOr`));
    });
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/functions/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: lib/functions/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: kleiolab-lib-utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { DateTimeCommons, DateTimeModule, GregorianDateTime, JulianDateTime, TimePrimitive, TimePrimitivePipe, TimeSpanPipe, TimeSpanUtil, U, combineLatestOrEmpty, debugCombineLatestOrEmpty, getSpecificVersion, latestEntityVersion, latestEntityVersions, latestVersion, limitOffset, limitTo, mapConcat, sortAbc, switchMapOr, x };
//# sourceMappingURL=kleiolab-lib-utils.js.map
