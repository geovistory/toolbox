/**
 * @fileoverview added by tsickle
 * Generated from: classes/date-time-commons.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EventEmitter } from '@angular/core';
/**
 * @abstract
 */
export class DateTimeCommons {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLWNvbW1vbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzL3NyYy9saWIvZGF0ZS10aW1lLyIsInNvdXJjZXMiOlsiY2xhc3Nlcy9kYXRlLXRpbWUtY29tbW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFhN0MsTUFBTSxPQUFnQixlQUFlOzs7O0lBdUVuQyxZQUFZLElBQUs7Ozs7UUFsRWpCLGlCQUFZLEdBQStCLElBQUksWUFBWSxFQUFFLENBQUM7UUFtRTVELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBaEVELElBQUksSUFBSSxDQUFDLEdBQVc7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDakIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs7Ozs7SUFJRCxJQUFJLEtBQUssQ0FBQyxHQUFXO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7O0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBSUQsSUFBSSxHQUFHLENBQUMsR0FBVztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNoQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7OztJQUVELElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDOzs7OztJQUlELElBQUksS0FBSyxDQUFDLEdBQVc7UUFDbkIsSUFB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QUFFO1FBQzNDLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7Ozs7SUFFRCxZQUFZOztZQUVOLFNBQVMsR0FBRyxFQUFFO1FBQ2xCLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDaEUsU0FBUyxJQUFJLEdBQUcsQ0FBQztRQUNqQixTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDekQsU0FBUyxJQUFJLEdBQUcsQ0FBQztRQUNqQixTQUFTLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDckQsU0FBUyxJQUFJLEdBQUcsQ0FBQztRQUNqQixTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDekQsU0FBUyxJQUFJLEdBQUcsQ0FBQztRQUNqQixTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDN0QsU0FBUyxJQUFJLEdBQUcsQ0FBQztRQUNqQixTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFN0QsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUV4QyxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDOzs7O0lBRUQsT0FBTztRQUVMLFdBQVc7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUMvQyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3pDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPLElBQUksQ0FBQztRQUM3QyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sSUFBSSxDQUFDOzs7Y0FHdkMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO1FBRXZCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFNUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuRCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRTFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUVoRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7Ozs7SUFFRCxHQUFHLENBQUMsTUFBYyxFQUFFLEtBQWEsRUFBRSxJQUFZLEdBQUc7O2NBQzFDLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFO1FBQzNCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3RSxDQUFDOzs7O0lBR0QsT0FBTztRQUNMLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDO1lBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pDLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7U0FDaEM7SUFDSCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUdiLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUU7WUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUE7WUFDZCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEI7YUFDSSxJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO1NBQ2hDO0lBQ0gsQ0FBQzs7OztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDWCxJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1NBQ2hCO0lBQ0gsQ0FBQzs7OztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxFQUFFO1lBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1NBQ2Q7SUFDSCxDQUFDOzs7O0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLEVBQUU7WUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1NBQ2Y7SUFDSCxDQUFDOzs7O0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLEVBQUU7WUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO1NBQ2pCO0lBQ0gsQ0FBQzs7OztJQUtELFVBQVU7UUFDUixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDaEI7UUFDRCxJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO1NBQ2hDO0lBQ0gsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFYixJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQjthQUNJLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDeEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7U0FDaEM7SUFDSCxDQUFDOzs7O0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNYLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQ2xCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQzs7OztJQUdELFVBQVU7UUFDUixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7U0FDakI7SUFDSCxDQUFDOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtTQUNsQjtJQUNILENBQUM7Ozs7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO1NBQ3BCO0lBQ0gsQ0FBQzs7Ozs7SUFHRCxPQUFPLENBQUMsUUFBZ0I7UUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZjtRQUFBLENBQUM7SUFDSixDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxRQUFnQjtRQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNqQjtRQUFBLENBQUM7SUFDSixDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxRQUFnQjtRQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNoQjtRQUFBLENBQUM7SUFDSixDQUFDOzs7OztJQUVELEdBQUcsQ0FBQyxRQUFxQjtRQUN2QixJQUFJLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDekIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1NBQ2Y7YUFDSSxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1NBQ2hCO2FBQ0ksSUFBSSxRQUFRLEtBQUssT0FBTyxFQUFFO1lBQzdCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtTQUNkO2FBQ0ksSUFBSSxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQzlCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUNmO2FBQ0ksSUFBSSxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtTQUNqQjthQUNJLElBQUksUUFBUSxLQUFLLFVBQVUsRUFBRTtZQUNoQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7U0FDakI7SUFDSCxDQUFDOzs7OztJQUlELGNBQWMsQ0FBQyxRQUFxQjtRQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0NBR0Y7Ozs7OztJQXhZQyx1Q0FBOEQ7Ozs7O0lBRTlELGdDQUF1Qjs7Ozs7SUFXdkIsaUNBQXdCOzs7OztJQVd4QiwrQkFBc0I7Ozs7O0lBV3RCLGlDQUF3Qjs7Ozs7SUFVeEIsbUNBQTBCOzs7OztJQVUxQixtQ0FBMEI7Ozs7O0lBZTFCLDBEQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgWWVhck1vbnRoRGF5IH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCB0eXBlIEdyYW51bGFyaXR5ID1cbiAgJzEgY2VudHVyeScgfFxuICAnMSBkZWNhZGUnIHxcbiAgJzEgeWVhcicgfFxuICAnMSBtb250aCcgfFxuICAnMSBkYXknIHxcbiAgJzEgaG91cicgfFxuICAnMSBtaW51dGUnIHxcbiAgJzEgc2Vjb25kJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERhdGVUaW1lQ29tbW9ucyB7XG5cbiAgLyoqXG4gICAqIFByb3BlcnRpZXNcbiAgICovXG4gIG9uRGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPFllYXJNb250aERheT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfeWVhcj86IG51bWJlcjtcblxuICBzZXQgeWVhcih2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX3llYXIgPSB2YWw7XG4gICAgdGhpcy5lbWl0RGF0ZUNoYW5nZSgpO1xuICB9XG5cbiAgZ2V0IHllYXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5feWVhcjtcbiAgfVxuXG4gIHByaXZhdGUgX21vbnRoPzogbnVtYmVyO1xuXG4gIHNldCBtb250aCh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX21vbnRoID0gdmFsO1xuICAgIHRoaXMuZW1pdERhdGVDaGFuZ2UoKTtcbiAgfVxuXG4gIGdldCBtb250aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tb250aDtcbiAgfVxuXG4gIHByaXZhdGUgX2RheT86IG51bWJlcjtcblxuICBzZXQgZGF5KHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fZGF5ID0gdmFsO1xuICAgIHRoaXMuZW1pdERhdGVDaGFuZ2UoKTtcbiAgfVxuXG4gIGdldCBkYXkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZGF5O1xuICB9XG5cbiAgcHJpdmF0ZSBfaG91cnM/OiBudW1iZXI7XG5cbiAgc2V0IGhvdXJzKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5faG91cnMgPSB2YWw7XG4gIH1cblxuICBnZXQgaG91cnMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5faG91cnM7XG4gIH1cblxuICBwcml2YXRlIF9taW51dGVzPzogbnVtYmVyO1xuXG4gIHNldCBtaW51dGVzKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWludXRlcyA9IHZhbDtcbiAgfVxuXG4gIGdldCBtaW51dGVzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21pbnV0ZXM7XG4gIH1cblxuICBwcml2YXRlIF9zZWNvbmRzPzogbnVtYmVyO1xuXG4gIHNldCBzZWNvbmRzKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2Vjb25kcyA9IHZhbDtcbiAgfVxuXG4gIGdldCBzZWNvbmRzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3NlY29uZHM7XG4gIH1cblxuXG4gIGNvbnN0cnVjdG9yKGRhdGE/KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuXG4gIGFic3RyYWN0IGxlbmd0aE9mTW9udGgoKTogbnVtYmVyO1xuXG4gIC8qKlxuICAqIFJldHVybnMgdGhlIHJ1bm5pbmcgZGF5IGZvciBnaXZlbiBtb250aCBhbmQgZGF5IHdpdGggY29uc2lkZXJhdGlvbiBvZiB0aGVcbiAgKiBpc0xlYXAgYm9vbGVhbiB0aGF0IGluZGljYXRlcyBsZWFwIHllYXJzLiBJbnNwaXJlZCBieTpcbiAgKiBodHRwczovL2RlLndpa2lwZWRpYS5vcmcvd2lraS9VbXJlY2hudW5nX3p3aXNjaGVuX2p1bGlhbmlzY2hlbV9EYXR1bV91bmRfanVsaWFuaXNjaGVtX0thbGVuZGVyXG4gICpcbiAgKiBAcGFyYW0gbW9udGggMT1qYW51YXJ5IC4uIDEyPWRlY2VtYmVyXG4gICogQHBhcmFtIGRheSAxLCAyIC4uIDMxXG4gICogQHBhcmFtIGlzTGVhcCBpZiB0cnVlLCB0aGlzIGlzIGEgbGVhcCB5ZWFyXG4gICovXG4gIGNhbGNSdW5uaW5nRGF5KG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyLCBpc0xlYXA6IGJvb2xlYW4pOiBudW1iZXIge1xuXG4gICAgLy8gaWYgbm8gbW9udGggb3IgZGF5IHByb3ZpZGVkLCBsZXQncyBzdGFydCBhdCAxXG4gICAgZGF5ID0gKGRheSA9PT0gdW5kZWZpbmVkIHx8IGRheSA9PT0gbnVsbCkgPyAxIDogZGF5O1xuICAgIG1vbnRoID0gKG1vbnRoID09PSB1bmRlZmluZWQgfHwgbW9udGggPT09IG51bGwpID8gMSA6IG1vbnRoO1xuXG4gICAgLy8gbW9udGggY29ycmVjdGlvbnMgKG5vdGUgdGhhdCBqYW51YXJ5IGhhcyBpbmRleCAwKVxuICAgIGNvbnN0IG1vbnRoQ29ycmVuY3Rpb25zID0gWy0xLCAwLCAtMiwgLTEsIC0xLCAwLCAwLCAxLCArMiwgKzIsICszLCArM107XG5cbiAgICAvLyBsZWFwIHllYXIgY29ycmVjdGlvblxuICAgIGxldCBsYyA9IDA7XG5cbiAgICBpZiAoaXNMZWFwICYmIG1vbnRoID4gMikge1xuICAgICAgbGMgPSAxO1xuICAgIH1cblxuICAgIC8vIG1vbnRoIGNvcnJlY3Rpb25cbiAgICBjb25zdCBtYyA9IG1vbnRoQ29ycmVuY3Rpb25zW21vbnRoIC0gMV07XG5cbiAgICByZXR1cm4gZGF5ICsgKDMwICogKG1vbnRoIC0gMSkpICsgKGxjICsgbWMpO1xuICB9XG5cblxuICAvKipcbiAgKiBSZXR1cm5zIHRoZSBtb250aCBhbmQgZGF5IGZvciBnaXZlbiBydW5uaW5nIGRheSB3aXRoIGNvbnNpZGVyYXRpb24gb2YgdGhlXG4gICogaXNMZWFwIGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgbGVhcCB5ZWFycy4gSW5zcGlyZWQgYnk6XG4gICogaHR0cHM6Ly9kZS53aWtpcGVkaWEub3JnL3dpa2kvVW1yZWNobnVuZ196d2lzY2hlbl9qdWxpYW5pc2NoZW1fRGF0dW1fdW5kX2p1bGlhbmlzY2hlbV9LYWxlbmRlclxuICAqXG4gICogQHBhcmFtIHJ1bm5pbmdEYXkgMSwgMiAuLiAzNjVcbiAgKiBAcGFyYW0gaXNMZWFwIGlmIHRydWUsIHRoaXMgaXMgYSBsZWFwIHllYXJcbiAgKlxuICAqL1xuICBjYWxjRGF0ZUJ5UnVubmluZ0RheShydW5uaW5nRGF5OiBudW1iZXIsIGlzTGVhcDogYm9vbGVhbik6IHsgZGF5OiBudW1iZXIsIG1vbnRoOiBudW1iZXIgfSB7XG5cbiAgICAvLyBtb250aCBjb3JyZWN0aW9ucyAobm90ZSB0aGF0IGphbnVhcnkgaGFzIGluZGV4IDApXG4gICAgY29uc3QgbW9udGhDb3JyZW5jdGlvbnMgPSBbLTEsIDAsIC0yLCAtMSwgLTEsIDAsIDAsIDEsICsyLCArMiwgKzMsICszXTtcblxuICAgIC8vIHJlc3VsdGluZyBtb250aFxuICAgIGxldCBtb250aCA9IE1hdGguZmxvb3IoKHJ1bm5pbmdEYXkgKyAxKSAvIDMwKSArIDE7XG5cbiAgICAvLyBtb250aCBjb3JyZWN0aW9uXG4gICAgbGV0IG1jID0gbW9udGhDb3JyZW5jdGlvbnNbbW9udGggLSAxXTtcblxuICAgIC8vIGxlYXAgeWVhciBjb3JyZWN0aW9uXG4gICAgbGV0IGxjID0gMDtcblxuICAgIGlmIChpc0xlYXAgJiYgbW9udGggPiAyKSB7XG4gICAgICBsYyA9IDE7XG4gICAgfVxuXG4gICAgLy8gcmVzdWx0aW5nIGRheVxuICAgIGxldCBkYXkgPSBydW5uaW5nRGF5IC0gMzAgKiAobW9udGggLSAxKSAtIChsYyArIG1jKTtcblxuICAgIC8vIGNoZWNrIGlmIG1vbnRoIGFuZCBkYXkgc3RpbGwgdmFsaWRcbiAgICBpZiAobW9udGggPiAxMiB8fCBkYXkgPCAxKSB7XG5cbiAgICAgIG1vbnRoLS07XG5cbiAgICAgIGlmIChtb250aCA8IDEpIHtcbiAgICAgICAgaXNMZWFwID0gIWlzTGVhcDtcbiAgICAgIH1cblxuICAgICAgLy8gbGVhcCB5ZWFyIGNvcnJlY3Rpb25cbiAgICAgIGxjID0gMDtcblxuICAgICAgaWYgKGlzTGVhcCAmJiBtb250aCA+IDIpIHtcbiAgICAgICAgbGMgPSAxO1xuICAgICAgfVxuXG4gICAgICAvLyBtb250aCBjb3JyZWN0aW9uXG4gICAgICBtYyA9IG1vbnRoQ29ycmVuY3Rpb25zW21vbnRoIC0gMV07XG5cbiAgICAgIC8vIHJlc3VsdGluZyBkYXlcbiAgICAgIGRheSA9IHJ1bm5pbmdEYXkgLSAzMCAqIChtb250aCAtIDEpIC0gKGxjICsgbWMpO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIHsgZGF5OiBkYXksIG1vbnRoOiBtb250aCB9O1xuICB9XG5cbiAgZW1pdERhdGVDaGFuZ2UoKSB7XG4gICAgdGhpcy5vbkRhdGVDaGFuZ2UuZW1pdCh7XG4gICAgICB5ZWFyOiB0aGlzLnllYXIsXG4gICAgICBtb250aDogdGhpcy5tb250aCxcbiAgICAgIGRheTogdGhpcy5kYXlcbiAgICB9KTtcbiAgfVxuXG4gIGdldEdyYW51bGFyaXR5KCk6IEdyYW51bGFyaXR5IHtcbiAgICBsZXQgZHVyYXRpb246IEdyYW51bGFyaXR5O1xuICAgIGlmICh0aGlzLnllYXIpIHsgZHVyYXRpb24gPSAnMSB5ZWFyJyB9XG4gICAgaWYgKHRoaXMubW9udGgpIHsgZHVyYXRpb24gPSAnMSBtb250aCcgfVxuICAgIGlmICh0aGlzLmRheSkgeyBkdXJhdGlvbiA9ICcxIGRheScgfVxuICAgIGlmICh0aGlzLmhvdXJzKSB7IGR1cmF0aW9uID0gJzEgaG91cicgfVxuICAgIGlmICh0aGlzLm1pbnV0ZXMpIHsgZHVyYXRpb24gPSAnMSBtaW51dGUnIH1cbiAgICBpZiAodGhpcy5zZWNvbmRzKSB7IGR1cmF0aW9uID0gJzEgc2Vjb25kJyB9XG4gICAgcmV0dXJuIGR1cmF0aW9uO1xuICB9XG5cbiAgZ2V0VGltZVN0YW1wKCk6IHN0cmluZyB7XG5cbiAgICBsZXQgdGltZXN0YW1wID0gJyc7XG4gICAgdGltZXN0YW1wID0gdGhpcy55ZWFyID8gdGhpcy5wYWQoTWF0aC5hYnModGhpcy55ZWFyKSwgNCkgOiAnMDEnO1xuICAgIHRpbWVzdGFtcCArPSAnLSc7XG4gICAgdGltZXN0YW1wICs9IHRoaXMubW9udGggPyB0aGlzLnBhZCh0aGlzLm1vbnRoLCAyKSA6ICcwMSc7XG4gICAgdGltZXN0YW1wICs9ICctJztcbiAgICB0aW1lc3RhbXAgKz0gdGhpcy5kYXkgPyB0aGlzLnBhZCh0aGlzLmRheSwgMikgOiAnMDEnO1xuICAgIHRpbWVzdGFtcCArPSAnICc7XG4gICAgdGltZXN0YW1wICs9IHRoaXMuaG91cnMgPyB0aGlzLnBhZCh0aGlzLmhvdXJzLCAyKSA6ICcwMCc7XG4gICAgdGltZXN0YW1wICs9ICc6JztcbiAgICB0aW1lc3RhbXAgKz0gdGhpcy5taW51dGVzID8gdGhpcy5wYWQodGhpcy5taW51dGVzLCAyKSA6ICcwMCc7XG4gICAgdGltZXN0YW1wICs9ICc6JztcbiAgICB0aW1lc3RhbXAgKz0gdGhpcy5zZWNvbmRzID8gdGhpcy5wYWQodGhpcy5zZWNvbmRzLCAyKSA6ICcwMCc7XG5cbiAgICB0aW1lc3RhbXAgKz0gdGhpcy55ZWFyIDwgMCA/ICcgQkMnIDogJyc7XG5cbiAgICByZXR1cm4gdGltZXN0YW1wO1xuICB9XG5cbiAgZ2V0RGF0ZSgpOiBEYXRlIHwgbnVsbCB7XG5cbiAgICAvLyB2YWxpZGF0ZVxuICAgIGlmICghdGhpcy55ZWFyICYmIHRoaXMueWVhciAhPT0gMCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKHRoaXMuZGF5ICYmICF0aGlzLm1vbnRoKSByZXR1cm4gbnVsbDtcbiAgICBpZiAodGhpcy5ob3VycyAmJiAhdGhpcy5kYXkpIHJldHVybiBudWxsO1xuICAgIGlmICh0aGlzLm1pbnV0ZXMgJiYgIXRoaXMuaG91cnMpIHJldHVybiBudWxsO1xuICAgIGlmICh0aGlzLnNlY29uZHMgJiYgIXRoaXMuaG91cnMpIHJldHVybiBudWxsO1xuXG4gICAgLy8gY3JlYXQgZGF0ZVxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpXG5cbiAgICBkYXRlLnNldEZ1bGxZZWFyKHRoaXMueWVhciA8IDAgPyB0aGlzLnllYXIgKyAxIDogdGhpcy55ZWFyKTtcblxuICAgIGRhdGUuc2V0TW9udGgoKHRoaXMubW9udGggPyAodGhpcy5tb250aCAtIDEpIDogMCkpO1xuXG4gICAgZGF0ZS5zZXREYXRlKCh0aGlzLmRheSA/IHRoaXMuZGF5IDogMSkpO1xuXG4gICAgZGF0ZS5zZXRIb3Vycyh0aGlzLmhvdXJzID8gdGhpcy5ob3VycyA6IDApXG5cbiAgICBkYXRlLnNldE1pbnV0ZXModGhpcy5taW51dGVzID8gdGhpcy5taW51dGVzIDogMClcblxuICAgIGRhdGUuc2V0U2Vjb25kcyh0aGlzLnNlY29uZHMgPyB0aGlzLnNlY29uZHMgOiAwKVxuXG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cblxuICBwYWQobnVtYmVyOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIHo6IHN0cmluZyA9ICcwJyk6IHN0cmluZyB7XG4gICAgY29uc3QgbiA9IG51bWJlci50b1N0cmluZygpO1xuICAgIHJldHVybiBuLmxlbmd0aCA+PSB3aWR0aCA/IG4gOiBuZXcgQXJyYXkod2lkdGggLSBuLmxlbmd0aCArIDEpLmpvaW4oeikgKyBuO1xuICB9XG5cblxuICBhZGRZZWFyKCkge1xuICAgIHRoaXMueWVhcisrO1xuICAgIGlmICh0aGlzLnllYXIgPT09IDApIHRoaXMueWVhcisrO1xuICAgIGlmICh0aGlzLmRheSA+IHRoaXMubGVuZ3RoT2ZNb250aCgpKSB7XG4gICAgICB0aGlzLmRheSA9IHRoaXMubGVuZ3RoT2ZNb250aCgpXG4gICAgfVxuICB9XG5cbiAgYWRkTW9udGgoKSB7XG4gICAgdGhpcy5tb250aCsrO1xuXG5cbiAgICBpZiAodGhpcy5tb250aCA+IDEyKSB7XG4gICAgICB0aGlzLm1vbnRoID0gMVxuICAgICAgdGhpcy5hZGRZZWFyKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuZGF5ID4gdGhpcy5sZW5ndGhPZk1vbnRoKCkpIHtcbiAgICAgIHRoaXMuZGF5ID0gdGhpcy5sZW5ndGhPZk1vbnRoKClcbiAgICB9XG4gIH1cblxuICBhZGREYXkoKSB7XG4gICAgdGhpcy5kYXkrKztcbiAgICBpZiAodGhpcy5kYXkgPiB0aGlzLmxlbmd0aE9mTW9udGgoKSkge1xuICAgICAgdGhpcy5kYXkgPSAxO1xuICAgICAgdGhpcy5hZGRNb250aCgpXG4gICAgfVxuICB9XG5cbiAgYWRkSG91cigpIHtcbiAgICB0aGlzLmhvdXJzKys7XG4gICAgaWYgKHRoaXMuaG91cnMgPiAyMykge1xuICAgICAgdGhpcy5ob3VycyA9IDA7XG4gICAgICB0aGlzLmFkZERheSgpXG4gICAgfVxuICB9XG5cbiAgYWRkTWludXRlKCkge1xuICAgIHRoaXMubWludXRlcysrO1xuICAgIGlmICh0aGlzLm1pbnV0ZXMgPiA1OSkge1xuICAgICAgdGhpcy5taW51dGVzID0gMDtcbiAgICAgIHRoaXMuYWRkSG91cigpXG4gICAgfVxuICB9XG5cbiAgYWRkU2Vjb25kKCkge1xuICAgIHRoaXMuc2Vjb25kcysrO1xuICAgIGlmICh0aGlzLnNlY29uZHMgPiA1OSkge1xuICAgICAgdGhpcy5zZWNvbmRzID0gMDtcbiAgICAgIHRoaXMuYWRkTWludXRlKClcbiAgICB9XG4gIH1cblxuXG5cblxuICByZW1vdmVZZWFyKCkge1xuICAgIHRoaXMueWVhci0tO1xuICAgIGlmICh0aGlzLnllYXIgPT09IDApIHtcbiAgICAgIHRoaXMueWVhciA9IC0xO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXkgPiB0aGlzLmxlbmd0aE9mTW9udGgoKSkge1xuICAgICAgdGhpcy5kYXkgPSB0aGlzLmxlbmd0aE9mTW9udGgoKVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1vbnRoKCkge1xuICAgIHRoaXMubW9udGgtLTtcblxuICAgIGlmICh0aGlzLm1vbnRoIDwgMSkge1xuICAgICAgdGhpcy5tb250aCA9IDEyO1xuICAgICAgdGhpcy5yZW1vdmVZZWFyKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuZGF5ID4gdGhpcy5sZW5ndGhPZk1vbnRoKCkpIHtcbiAgICAgIHRoaXMuZGF5ID0gdGhpcy5sZW5ndGhPZk1vbnRoKClcbiAgICB9XG4gIH1cblxuICByZW1vdmVEYXkoKSB7XG4gICAgdGhpcy5kYXktLTtcbiAgICBpZiAodGhpcy5kYXkgPCAxKSB7XG4gICAgICB0aGlzLnJlbW92ZU1vbnRoKClcbiAgICAgIHRoaXMuZGF5ID0gdGhpcy5sZW5ndGhPZk1vbnRoKCk7XG4gICAgfVxuICB9XG5cblxuICByZW1vdmVIb3VyKCkge1xuICAgIHRoaXMuaG91cnMtLTtcbiAgICBpZiAodGhpcy5ob3VycyA8IDAgfHwgIXRoaXMuaG91cnMpIHtcbiAgICAgIHRoaXMuaG91cnMgPSAyMztcbiAgICAgIHRoaXMucmVtb3ZlRGF5KClcbiAgICB9XG4gIH1cblxuICByZW1vdmVNaW51dGUoKSB7XG4gICAgdGhpcy5taW51dGVzLS07XG4gICAgaWYgKHRoaXMubWludXRlcyA8IDAgfHwgIXRoaXMubWludXRlcykge1xuICAgICAgdGhpcy5taW51dGVzID0gNTk7XG4gICAgICB0aGlzLnJlbW92ZUhvdXIoKVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVNlY29uZCgpIHtcbiAgICB0aGlzLnNlY29uZHMtLTtcbiAgICBpZiAodGhpcy5zZWNvbmRzIDwgMCB8fCAhdGhpcy5zZWNvbmRzKSB7XG4gICAgICB0aGlzLnNlY29uZHMgPSA1OTtcbiAgICAgIHRoaXMucmVtb3ZlTWludXRlKClcbiAgICB9XG4gIH1cblxuXG4gIGFkZERheXMocXVhbnRpdHk6IG51bWJlcikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVhbnRpdHk7IGkrKykge1xuICAgICAgdGhpcy5hZGREYXkoKTtcbiAgICB9O1xuICB9XG5cbiAgYWRkTW9udGhzKHF1YW50aXR5OiBudW1iZXIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1YW50aXR5OyBpKyspIHtcbiAgICAgIHRoaXMuYWRkTW9udGgoKTtcbiAgICB9O1xuICB9XG5cbiAgYWRkWWVhcnMocXVhbnRpdHk6IG51bWJlcikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVhbnRpdHk7IGkrKykge1xuICAgICAgdGhpcy5hZGRZZWFyKCk7XG4gICAgfTtcbiAgfVxuXG4gIGFkZChkdXJhdGlvbjogR3JhbnVsYXJpdHkpIHtcbiAgICBpZiAoZHVyYXRpb24gPT09ICcxIHllYXInKSB7XG4gICAgICB0aGlzLmFkZFllYXIoKVxuICAgIH1cbiAgICBlbHNlIGlmIChkdXJhdGlvbiA9PT0gJzEgbW9udGgnKSB7XG4gICAgICB0aGlzLmFkZE1vbnRoKClcbiAgICB9XG4gICAgZWxzZSBpZiAoZHVyYXRpb24gPT09ICcxIGRheScpIHtcbiAgICAgIHRoaXMuYWRkRGF5KClcbiAgICB9XG4gICAgZWxzZSBpZiAoZHVyYXRpb24gPT09ICcxIGhvdXInKSB7XG4gICAgICB0aGlzLmFkZEhvdXIoKVxuICAgIH1cbiAgICBlbHNlIGlmIChkdXJhdGlvbiA9PT0gJzEgbWludXRlJykge1xuICAgICAgdGhpcy5hZGRNaW51dGUoKVxuICAgIH1cbiAgICBlbHNlIGlmIChkdXJhdGlvbiA9PT0gJzEgc2Vjb25kJykge1xuICAgICAgdGhpcy5hZGRTZWNvbmQoKVxuICAgIH1cbiAgfVxuXG5cblxuICB0b0xhc3RTZWNvbmRPZihkdXJhdGlvbjogR3JhbnVsYXJpdHkpIHtcbiAgICB0aGlzLmFkZChkdXJhdGlvbik7XG4gICAgdGhpcy5yZW1vdmVTZWNvbmQoKTtcbiAgfVxuXG5cbn1cbiJdfQ==