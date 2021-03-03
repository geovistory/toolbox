/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/classes/date-time-commons.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLWNvbW1vbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9jbGFzc2VzL2RhdGUtdGltZS1jb21tb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUs3QyxNQUFNLE9BQWdCLGVBQWU7Ozs7SUF1RW5DLFlBQVksSUFBSzs7OztRQWxFakIsaUJBQVksR0FBK0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQW1FNUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFoRUQsSUFBSSxJQUFJLENBQUMsR0FBVztRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNqQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7OztJQUVELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7OztJQUlELElBQUksS0FBSyxDQUFDLEdBQVc7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFJRCxJQUFJLEdBQUcsQ0FBQyxHQUFXO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7O0lBRUQsSUFBSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBSUQsSUFBSSxLQUFLLENBQUMsR0FBVztRQUNuQixJQUFJLENB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UUFDM0MsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7OztJQUVELFlBQVk7O1lBRU4sU0FBUyxHQUFHLEVBQUU7UUFDbEIsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNoRSxTQUFTLElBQUksR0FBRyxDQUFDO1FBQ2pCLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN6RCxTQUFTLElBQUksR0FBRyxDQUFDO1FBQ2pCLFNBQVMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNyRCxTQUFTLElBQUksR0FBRyxDQUFDO1FBQ2pCLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN6RCxTQUFTLElBQUksR0FBRyxDQUFDO1FBQ2pCLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUM3RCxTQUFTLElBQUksR0FBRyxDQUFDO1FBQ2pCLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FB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LFFBQXFCO1FBQ3ZCLElBQUksUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUN6QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7U0FDZjthQUNJLElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUMvQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7U0FDaEI7YUFDSSxJQUFJLFFBQVEsS0FBSyxPQUFPLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1NBQ2Q7YUFDSSxJQUFJLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1NBQ2Y7YUFDSSxJQUFJLFFBQVEsS0FBSyxVQUFVLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO1NBQ2pCO2FBQ0ksSUFBSSxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtTQUNqQjtJQUNILENBQUM7Ozs7O0lBSUQsY0FBYyxDQUFDLFFBQXFCO1FBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7Q0FHRjs7Ozs7O0lBeFlDLHVDQUE4RDs7Ozs7SUFFOUQsZ0NBQXVCOzs7OztJQVd2QixpQ0FBd0I7Ozs7O0lBV3hCLCtCQUFzQjs7Ozs7SUFXdEIsaUNBQXdCOzs7OztJQVV4QixtQ0FBMEI7Ozs7O0lBVTFCLG1DQUEwQjs7Ozs7SUFlMUIsMERBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaW1lUHJpbWl0aXZlV2l0aENhbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBZZWFyTW9udGhEYXkgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcblxuZXhwb3J0IHR5cGUgR3JhbnVsYXJpdHkgPSBUaW1lUHJpbWl0aXZlV2l0aENhbC5EdXJhdGlvbkVudW1cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRlVGltZUNvbW1vbnMge1xuXG4gIC8qKlxuICAgKiBQcm9wZXJ0aWVzXG4gICAqL1xuICBvbkRhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxZZWFyTW9udGhEYXk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX3llYXI/OiBudW1iZXI7XG5cbiAgc2V0IHllYXIodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl95ZWFyID0gdmFsO1xuICAgIHRoaXMuZW1pdERhdGVDaGFuZ2UoKTtcbiAgfVxuXG4gIGdldCB5ZWFyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3llYXI7XG4gIH1cblxuICBwcml2YXRlIF9tb250aD86IG51bWJlcjtcblxuICBzZXQgbW9udGgodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9tb250aCA9IHZhbDtcbiAgICB0aGlzLmVtaXREYXRlQ2hhbmdlKCk7XG4gIH1cblxuICBnZXQgbW9udGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9udGg7XG4gIH1cblxuICBwcml2YXRlIF9kYXk/OiBudW1iZXI7XG5cbiAgc2V0IGRheSh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX2RheSA9IHZhbDtcbiAgICB0aGlzLmVtaXREYXRlQ2hhbmdlKCk7XG4gIH1cblxuICBnZXQgZGF5KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RheTtcbiAgfVxuXG4gIHByaXZhdGUgX2hvdXJzPzogbnVtYmVyO1xuXG4gIHNldCBob3Vycyh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX2hvdXJzID0gdmFsO1xuICB9XG5cbiAgZ2V0IGhvdXJzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2hvdXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWludXRlcz86IG51bWJlcjtcblxuICBzZXQgbWludXRlcyh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX21pbnV0ZXMgPSB2YWw7XG4gIH1cblxuICBnZXQgbWludXRlcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9taW51dGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2Vjb25kcz86IG51bWJlcjtcblxuICBzZXQgc2Vjb25kcyh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX3NlY29uZHMgPSB2YWw7XG4gIH1cblxuICBnZXQgc2Vjb25kcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zZWNvbmRzO1xuICB9XG5cblxuICBjb25zdHJ1Y3RvcihkYXRhPykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cblxuICBhYnN0cmFjdCBsZW5ndGhPZk1vbnRoKCk6IG51bWJlcjtcblxuICAvKipcbiAgKiBSZXR1cm5zIHRoZSBydW5uaW5nIGRheSBmb3IgZ2l2ZW4gbW9udGggYW5kIGRheSB3aXRoIGNvbnNpZGVyYXRpb24gb2YgdGhlXG4gICogaXNMZWFwIGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgbGVhcCB5ZWFycy4gSW5zcGlyZWQgYnk6XG4gICogaHR0cHM6Ly9kZS53aWtpcGVkaWEub3JnL3dpa2kvVW1yZWNobnVuZ196d2lzY2hlbl9qdWxpYW5pc2NoZW1fRGF0dW1fdW5kX2p1bGlhbmlzY2hlbV9LYWxlbmRlclxuICAqXG4gICogQHBhcmFtIG1vbnRoIDE9amFudWFyeSAuLiAxMj1kZWNlbWJlclxuICAqIEBwYXJhbSBkYXkgMSwgMiAuLiAzMVxuICAqIEBwYXJhbSBpc0xlYXAgaWYgdHJ1ZSwgdGhpcyBpcyBhIGxlYXAgeWVhclxuICAqL1xuICBjYWxjUnVubmluZ0RheShtb250aDogbnVtYmVyLCBkYXk6IG51bWJlciwgaXNMZWFwOiBib29sZWFuKTogbnVtYmVyIHtcblxuICAgIC8vIGlmIG5vIG1vbnRoIG9yIGRheSBwcm92aWRlZCwgbGV0J3Mgc3RhcnQgYXQgMVxuICAgIGRheSA9IChkYXkgPT09IHVuZGVmaW5lZCB8fCBkYXkgPT09IG51bGwpID8gMSA6IGRheTtcbiAgICBtb250aCA9IChtb250aCA9PT0gdW5kZWZpbmVkIHx8IG1vbnRoID09PSBudWxsKSA/IDEgOiBtb250aDtcblxuICAgIC8vIG1vbnRoIGNvcnJlY3Rpb25zIChub3RlIHRoYXQgamFudWFyeSBoYXMgaW5kZXggMClcbiAgICBjb25zdCBtb250aENvcnJlbmN0aW9ucyA9IFstMSwgMCwgLTIsIC0xLCAtMSwgMCwgMCwgMSwgKzIsICsyLCArMywgKzNdO1xuXG4gICAgLy8gbGVhcCB5ZWFyIGNvcnJlY3Rpb25cbiAgICBsZXQgbGMgPSAwO1xuXG4gICAgaWYgKGlzTGVhcCAmJiBtb250aCA+IDIpIHtcbiAgICAgIGxjID0gMTtcbiAgICB9XG5cbiAgICAvLyBtb250aCBjb3JyZWN0aW9uXG4gICAgY29uc3QgbWMgPSBtb250aENvcnJlbmN0aW9uc1ttb250aCAtIDFdO1xuXG4gICAgcmV0dXJuIGRheSArICgzMCAqIChtb250aCAtIDEpKSArIChsYyArIG1jKTtcbiAgfVxuXG5cbiAgLyoqXG4gICogUmV0dXJucyB0aGUgbW9udGggYW5kIGRheSBmb3IgZ2l2ZW4gcnVubmluZyBkYXkgd2l0aCBjb25zaWRlcmF0aW9uIG9mIHRoZVxuICAqIGlzTGVhcCBib29sZWFuIHRoYXQgaW5kaWNhdGVzIGxlYXAgeWVhcnMuIEluc3BpcmVkIGJ5OlxuICAqIGh0dHBzOi8vZGUud2lraXBlZGlhLm9yZy93aWtpL1VtcmVjaG51bmdfendpc2NoZW5fanVsaWFuaXNjaGVtX0RhdHVtX3VuZF9qdWxpYW5pc2NoZW1fS2FsZW5kZXJcbiAgKlxuICAqIEBwYXJhbSBydW5uaW5nRGF5IDEsIDIgLi4gMzY1XG4gICogQHBhcmFtIGlzTGVhcCBpZiB0cnVlLCB0aGlzIGlzIGEgbGVhcCB5ZWFyXG4gICpcbiAgKi9cbiAgY2FsY0RhdGVCeVJ1bm5pbmdEYXkocnVubmluZ0RheTogbnVtYmVyLCBpc0xlYXA6IGJvb2xlYW4pOiB7IGRheTogbnVtYmVyLCBtb250aDogbnVtYmVyIH0ge1xuXG4gICAgLy8gbW9udGggY29ycmVjdGlvbnMgKG5vdGUgdGhhdCBqYW51YXJ5IGhhcyBpbmRleCAwKVxuICAgIGNvbnN0IG1vbnRoQ29ycmVuY3Rpb25zID0gWy0xLCAwLCAtMiwgLTEsIC0xLCAwLCAwLCAxLCArMiwgKzIsICszLCArM107XG5cbiAgICAvLyByZXN1bHRpbmcgbW9udGhcbiAgICBsZXQgbW9udGggPSBNYXRoLmZsb29yKChydW5uaW5nRGF5ICsgMSkgLyAzMCkgKyAxO1xuXG4gICAgLy8gbW9udGggY29ycmVjdGlvblxuICAgIGxldCBtYyA9IG1vbnRoQ29ycmVuY3Rpb25zW21vbnRoIC0gMV07XG5cbiAgICAvLyBsZWFwIHllYXIgY29ycmVjdGlvblxuICAgIGxldCBsYyA9IDA7XG5cbiAgICBpZiAoaXNMZWFwICYmIG1vbnRoID4gMikge1xuICAgICAgbGMgPSAxO1xuICAgIH1cblxuICAgIC8vIHJlc3VsdGluZyBkYXlcbiAgICBsZXQgZGF5ID0gcnVubmluZ0RheSAtIDMwICogKG1vbnRoIC0gMSkgLSAobGMgKyBtYyk7XG5cbiAgICAvLyBjaGVjayBpZiBtb250aCBhbmQgZGF5IHN0aWxsIHZhbGlkXG4gICAgaWYgKG1vbnRoID4gMTIgfHwgZGF5IDwgMSkge1xuXG4gICAgICBtb250aC0tO1xuXG4gICAgICBpZiAobW9udGggPCAxKSB7XG4gICAgICAgIGlzTGVhcCA9ICFpc0xlYXA7XG4gICAgICB9XG5cbiAgICAgIC8vIGxlYXAgeWVhciBjb3JyZWN0aW9uXG4gICAgICBsYyA9IDA7XG5cbiAgICAgIGlmIChpc0xlYXAgJiYgbW9udGggPiAyKSB7XG4gICAgICAgIGxjID0gMTtcbiAgICAgIH1cblxuICAgICAgLy8gbW9udGggY29ycmVjdGlvblxuICAgICAgbWMgPSBtb250aENvcnJlbmN0aW9uc1ttb250aCAtIDFdO1xuXG4gICAgICAvLyByZXN1bHRpbmcgZGF5XG4gICAgICBkYXkgPSBydW5uaW5nRGF5IC0gMzAgKiAobW9udGggLSAxKSAtIChsYyArIG1jKTtcblxuICAgIH1cblxuICAgIHJldHVybiB7IGRheTogZGF5LCBtb250aDogbW9udGggfTtcbiAgfVxuXG4gIGVtaXREYXRlQ2hhbmdlKCkge1xuICAgIHRoaXMub25EYXRlQ2hhbmdlLmVtaXQoe1xuICAgICAgeWVhcjogdGhpcy55ZWFyLFxuICAgICAgbW9udGg6IHRoaXMubW9udGgsXG4gICAgICBkYXk6IHRoaXMuZGF5XG4gICAgfSk7XG4gIH1cblxuICBnZXRHcmFudWxhcml0eSgpOiBHcmFudWxhcml0eSB7XG4gICAgbGV0IGR1cmF0aW9uOiBHcmFudWxhcml0eTtcbiAgICBpZiAodGhpcy55ZWFyKSB7IGR1cmF0aW9uID0gJzEgeWVhcicgfVxuICAgIGlmICh0aGlzLm1vbnRoKSB7IGR1cmF0aW9uID0gJzEgbW9udGgnIH1cbiAgICBpZiAodGhpcy5kYXkpIHsgZHVyYXRpb24gPSAnMSBkYXknIH1cbiAgICBpZiAodGhpcy5ob3VycykgeyBkdXJhdGlvbiA9ICcxIGhvdXInIH1cbiAgICBpZiAodGhpcy5taW51dGVzKSB7IGR1cmF0aW9uID0gJzEgbWludXRlJyB9XG4gICAgaWYgKHRoaXMuc2Vjb25kcykgeyBkdXJhdGlvbiA9ICcxIHNlY29uZCcgfVxuICAgIHJldHVybiBkdXJhdGlvbjtcbiAgfVxuXG4gIGdldFRpbWVTdGFtcCgpOiBzdHJpbmcge1xuXG4gICAgbGV0IHRpbWVzdGFtcCA9ICcnO1xuICAgIHRpbWVzdGFtcCA9IHRoaXMueWVhciA/IHRoaXMucGFkKE1hdGguYWJzKHRoaXMueWVhciksIDQpIDogJzAxJztcbiAgICB0aW1lc3RhbXAgKz0gJy0nO1xuICAgIHRpbWVzdGFtcCArPSB0aGlzLm1vbnRoID8gdGhpcy5wYWQodGhpcy5tb250aCwgMikgOiAnMDEnO1xuICAgIHRpbWVzdGFtcCArPSAnLSc7XG4gICAgdGltZXN0YW1wICs9IHRoaXMuZGF5ID8gdGhpcy5wYWQodGhpcy5kYXksIDIpIDogJzAxJztcbiAgICB0aW1lc3RhbXAgKz0gJyAnO1xuICAgIHRpbWVzdGFtcCArPSB0aGlzLmhvdXJzID8gdGhpcy5wYWQodGhpcy5ob3VycywgMikgOiAnMDAnO1xuICAgIHRpbWVzdGFtcCArPSAnOic7XG4gICAgdGltZXN0YW1wICs9IHRoaXMubWludXRlcyA/IHRoaXMucGFkKHRoaXMubWludXRlcywgMikgOiAnMDAnO1xuICAgIHRpbWVzdGFtcCArPSAnOic7XG4gICAgdGltZXN0YW1wICs9IHRoaXMuc2Vjb25kcyA/IHRoaXMucGFkKHRoaXMuc2Vjb25kcywgMikgOiAnMDAnO1xuXG4gICAgdGltZXN0YW1wICs9IHRoaXMueWVhciA8IDAgPyAnIEJDJyA6ICcnO1xuXG4gICAgcmV0dXJuIHRpbWVzdGFtcDtcbiAgfVxuXG4gIGdldERhdGUoKTogRGF0ZSB8IG51bGwge1xuXG4gICAgLy8gdmFsaWRhdGVcbiAgICBpZiAoIXRoaXMueWVhciAmJiB0aGlzLnllYXIgIT09IDApIHJldHVybiBudWxsO1xuICAgIGlmICh0aGlzLmRheSAmJiAhdGhpcy5tb250aCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKHRoaXMuaG91cnMgJiYgIXRoaXMuZGF5KSByZXR1cm4gbnVsbDtcbiAgICBpZiAodGhpcy5taW51dGVzICYmICF0aGlzLmhvdXJzKSByZXR1cm4gbnVsbDtcbiAgICBpZiAodGhpcy5zZWNvbmRzICYmICF0aGlzLmhvdXJzKSByZXR1cm4gbnVsbDtcblxuICAgIC8vIGNyZWF0IGRhdGVcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKVxuXG4gICAgZGF0ZS5zZXRGdWxsWWVhcih0aGlzLnllYXIgPCAwID8gdGhpcy55ZWFyICsgMSA6IHRoaXMueWVhcik7XG5cbiAgICBkYXRlLnNldE1vbnRoKCh0aGlzLm1vbnRoID8gKHRoaXMubW9udGggLSAxKSA6IDApKTtcblxuICAgIGRhdGUuc2V0RGF0ZSgodGhpcy5kYXkgPyB0aGlzLmRheSA6IDEpKTtcblxuICAgIGRhdGUuc2V0SG91cnModGhpcy5ob3VycyA/IHRoaXMuaG91cnMgOiAwKVxuXG4gICAgZGF0ZS5zZXRNaW51dGVzKHRoaXMubWludXRlcyA/IHRoaXMubWludXRlcyA6IDApXG5cbiAgICBkYXRlLnNldFNlY29uZHModGhpcy5zZWNvbmRzID8gdGhpcy5zZWNvbmRzIDogMClcblxuICAgIHJldHVybiBkYXRlO1xuICB9XG5cbiAgcGFkKG51bWJlcjogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCB6OiBzdHJpbmcgPSAnMCcpOiBzdHJpbmcge1xuICAgIGNvbnN0IG4gPSBudW1iZXIudG9TdHJpbmcoKTtcbiAgICByZXR1cm4gbi5sZW5ndGggPj0gd2lkdGggPyBuIDogbmV3IEFycmF5KHdpZHRoIC0gbi5sZW5ndGggKyAxKS5qb2luKHopICsgbjtcbiAgfVxuXG5cbiAgYWRkWWVhcigpIHtcbiAgICB0aGlzLnllYXIrKztcbiAgICBpZiAodGhpcy55ZWFyID09PSAwKSB0aGlzLnllYXIrKztcbiAgICBpZiAodGhpcy5kYXkgPiB0aGlzLmxlbmd0aE9mTW9udGgoKSkge1xuICAgICAgdGhpcy5kYXkgPSB0aGlzLmxlbmd0aE9mTW9udGgoKVxuICAgIH1cbiAgfVxuXG4gIGFkZE1vbnRoKCkge1xuICAgIHRoaXMubW9udGgrKztcblxuXG4gICAgaWYgKHRoaXMubW9udGggPiAxMikge1xuICAgICAgdGhpcy5tb250aCA9IDFcbiAgICAgIHRoaXMuYWRkWWVhcigpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmRheSA+IHRoaXMubGVuZ3RoT2ZNb250aCgpKSB7XG4gICAgICB0aGlzLmRheSA9IHRoaXMubGVuZ3RoT2ZNb250aCgpXG4gICAgfVxuICB9XG5cbiAgYWRkRGF5KCkge1xuICAgIHRoaXMuZGF5Kys7XG4gICAgaWYgKHRoaXMuZGF5ID4gdGhpcy5sZW5ndGhPZk1vbnRoKCkpIHtcbiAgICAgIHRoaXMuZGF5ID0gMTtcbiAgICAgIHRoaXMuYWRkTW9udGgoKVxuICAgIH1cbiAgfVxuXG4gIGFkZEhvdXIoKSB7XG4gICAgdGhpcy5ob3VycysrO1xuICAgIGlmICh0aGlzLmhvdXJzID4gMjMpIHtcbiAgICAgIHRoaXMuaG91cnMgPSAwO1xuICAgICAgdGhpcy5hZGREYXkoKVxuICAgIH1cbiAgfVxuXG4gIGFkZE1pbnV0ZSgpIHtcbiAgICB0aGlzLm1pbnV0ZXMrKztcbiAgICBpZiAodGhpcy5taW51dGVzID4gNTkpIHtcbiAgICAgIHRoaXMubWludXRlcyA9IDA7XG4gICAgICB0aGlzLmFkZEhvdXIoKVxuICAgIH1cbiAgfVxuXG4gIGFkZFNlY29uZCgpIHtcbiAgICB0aGlzLnNlY29uZHMrKztcbiAgICBpZiAodGhpcy5zZWNvbmRzID4gNTkpIHtcbiAgICAgIHRoaXMuc2Vjb25kcyA9IDA7XG4gICAgICB0aGlzLmFkZE1pbnV0ZSgpXG4gICAgfVxuICB9XG5cblxuXG5cbiAgcmVtb3ZlWWVhcigpIHtcbiAgICB0aGlzLnllYXItLTtcbiAgICBpZiAodGhpcy55ZWFyID09PSAwKSB7XG4gICAgICB0aGlzLnllYXIgPSAtMTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF5ID4gdGhpcy5sZW5ndGhPZk1vbnRoKCkpIHtcbiAgICAgIHRoaXMuZGF5ID0gdGhpcy5sZW5ndGhPZk1vbnRoKClcbiAgICB9XG4gIH1cblxuICByZW1vdmVNb250aCgpIHtcbiAgICB0aGlzLm1vbnRoLS07XG5cbiAgICBpZiAodGhpcy5tb250aCA8IDEpIHtcbiAgICAgIHRoaXMubW9udGggPSAxMjtcbiAgICAgIHRoaXMucmVtb3ZlWWVhcigpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmRheSA+IHRoaXMubGVuZ3RoT2ZNb250aCgpKSB7XG4gICAgICB0aGlzLmRheSA9IHRoaXMubGVuZ3RoT2ZNb250aCgpXG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRGF5KCkge1xuICAgIHRoaXMuZGF5LS07XG4gICAgaWYgKHRoaXMuZGF5IDwgMSkge1xuICAgICAgdGhpcy5yZW1vdmVNb250aCgpXG4gICAgICB0aGlzLmRheSA9IHRoaXMubGVuZ3RoT2ZNb250aCgpO1xuICAgIH1cbiAgfVxuXG5cbiAgcmVtb3ZlSG91cigpIHtcbiAgICB0aGlzLmhvdXJzLS07XG4gICAgaWYgKHRoaXMuaG91cnMgPCAwIHx8ICF0aGlzLmhvdXJzKSB7XG4gICAgICB0aGlzLmhvdXJzID0gMjM7XG4gICAgICB0aGlzLnJlbW92ZURheSgpXG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWludXRlKCkge1xuICAgIHRoaXMubWludXRlcy0tO1xuICAgIGlmICh0aGlzLm1pbnV0ZXMgPCAwIHx8ICF0aGlzLm1pbnV0ZXMpIHtcbiAgICAgIHRoaXMubWludXRlcyA9IDU5O1xuICAgICAgdGhpcy5yZW1vdmVIb3VyKClcbiAgICB9XG4gIH1cblxuICByZW1vdmVTZWNvbmQoKSB7XG4gICAgdGhpcy5zZWNvbmRzLS07XG4gICAgaWYgKHRoaXMuc2Vjb25kcyA8IDAgfHwgIXRoaXMuc2Vjb25kcykge1xuICAgICAgdGhpcy5zZWNvbmRzID0gNTk7XG4gICAgICB0aGlzLnJlbW92ZU1pbnV0ZSgpXG4gICAgfVxuICB9XG5cblxuICBhZGREYXlzKHF1YW50aXR5OiBudW1iZXIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1YW50aXR5OyBpKyspIHtcbiAgICAgIHRoaXMuYWRkRGF5KCk7XG4gICAgfTtcbiAgfVxuXG4gIGFkZE1vbnRocyhxdWFudGl0eTogbnVtYmVyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWFudGl0eTsgaSsrKSB7XG4gICAgICB0aGlzLmFkZE1vbnRoKCk7XG4gICAgfTtcbiAgfVxuXG4gIGFkZFllYXJzKHF1YW50aXR5OiBudW1iZXIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1YW50aXR5OyBpKyspIHtcbiAgICAgIHRoaXMuYWRkWWVhcigpO1xuICAgIH07XG4gIH1cblxuICBhZGQoZHVyYXRpb246IEdyYW51bGFyaXR5KSB7XG4gICAgaWYgKGR1cmF0aW9uID09PSAnMSB5ZWFyJykge1xuICAgICAgdGhpcy5hZGRZZWFyKClcbiAgICB9XG4gICAgZWxzZSBpZiAoZHVyYXRpb24gPT09ICcxIG1vbnRoJykge1xuICAgICAgdGhpcy5hZGRNb250aCgpXG4gICAgfVxuICAgIGVsc2UgaWYgKGR1cmF0aW9uID09PSAnMSBkYXknKSB7XG4gICAgICB0aGlzLmFkZERheSgpXG4gICAgfVxuICAgIGVsc2UgaWYgKGR1cmF0aW9uID09PSAnMSBob3VyJykge1xuICAgICAgdGhpcy5hZGRIb3VyKClcbiAgICB9XG4gICAgZWxzZSBpZiAoZHVyYXRpb24gPT09ICcxIG1pbnV0ZScpIHtcbiAgICAgIHRoaXMuYWRkTWludXRlKClcbiAgICB9XG4gICAgZWxzZSBpZiAoZHVyYXRpb24gPT09ICcxIHNlY29uZCcpIHtcbiAgICAgIHRoaXMuYWRkU2Vjb25kKClcbiAgICB9XG4gIH1cblxuXG5cbiAgdG9MYXN0U2Vjb25kT2YoZHVyYXRpb246IEdyYW51bGFyaXR5KSB7XG4gICAgdGhpcy5hZGQoZHVyYXRpb24pO1xuICAgIHRoaXMucmVtb3ZlU2Vjb25kKCk7XG4gIH1cblxuXG59XG4iXX0=