/**
 * @fileoverview added by tsickle
 * Generated from: date-time-commons.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EventEmitter } from '@angular/core';
/**
 * @abstract
 */
var /**
 * @abstract
 */
DateTimeCommons = /** @class */ (function () {
    function DateTimeCommons(data) {
        /**
         * Properties
         */
        this.onDateChange = new EventEmitter();
        Object.assign(this, data);
    }
    Object.defineProperty(DateTimeCommons.prototype, "year", {
        get: /**
         * @return {?}
         */
        function () {
            return this._year;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._year = val;
            this.emitDateChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeCommons.prototype, "month", {
        get: /**
         * @return {?}
         */
        function () {
            return this._month;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._month = val;
            this.emitDateChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeCommons.prototype, "day", {
        get: /**
         * @return {?}
         */
        function () {
            return this._day;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._day = val;
            this.emitDateChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeCommons.prototype, "hours", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hours;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._hours = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeCommons.prototype, "minutes", {
        get: /**
         * @return {?}
         */
        function () {
            return this._minutes;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._minutes = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeCommons.prototype, "seconds", {
        get: /**
         * @return {?}
         */
        function () {
            return this._seconds;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._seconds = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * Returns the running day for given month and day with consideration of the
    * isLeap boolean that indicates leap years. Inspired by:
    * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_julianischem_Kalender
    *
    * @param month 1=january .. 12=december
    * @param day 1, 2 .. 31
    * @param isLeap if true, this is a leap year
    */
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
    DateTimeCommons.prototype.calcRunningDay = /**
     * Returns the running day for given month and day with consideration of the
     * isLeap boolean that indicates leap years. Inspired by:
     * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_julianischem_Kalender
     *
     * @param {?} month 1=january .. 12=december
     * @param {?} day 1, 2 .. 31
     * @param {?} isLeap if true, this is a leap year
     * @return {?}
     */
    function (month, day, isLeap) {
        // if no month or day provided, let's start at 1
        day = (day === undefined || day === null) ? 1 : day;
        month = (month === undefined || month === null) ? 1 : month;
        // month corrections (note that january has index 0)
        /** @type {?} */
        var monthCorrenctions = [-1, 0, -2, -1, -1, 0, 0, 1, +2, +2, +3, +3];
        // leap year correction
        /** @type {?} */
        var lc = 0;
        if (isLeap && month > 2) {
            lc = 1;
        }
        // month correction
        /** @type {?} */
        var mc = monthCorrenctions[month - 1];
        return day + (30 * (month - 1)) + (lc + mc);
    };
    /**
    * Returns the month and day for given running day with consideration of the
    * isLeap boolean that indicates leap years. Inspired by:
    * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_julianischem_Kalender
    *
    * @param runningDay 1, 2 .. 365
    * @param isLeap if true, this is a leap year
    *
    */
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
    DateTimeCommons.prototype.calcDateByRunningDay = /**
     * Returns the month and day for given running day with consideration of the
     * isLeap boolean that indicates leap years. Inspired by:
     * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_julianischem_Kalender
     *
     * @param {?} runningDay 1, 2 .. 365
     * @param {?} isLeap if true, this is a leap year
     *
     * @return {?}
     */
    function (runningDay, isLeap) {
        // month corrections (note that january has index 0)
        /** @type {?} */
        var monthCorrenctions = [-1, 0, -2, -1, -1, 0, 0, 1, +2, +2, +3, +3];
        // resulting month
        /** @type {?} */
        var month = Math.floor((runningDay + 1) / 30) + 1;
        // month correction
        /** @type {?} */
        var mc = monthCorrenctions[month - 1];
        // leap year correction
        /** @type {?} */
        var lc = 0;
        if (isLeap && month > 2) {
            lc = 1;
        }
        // resulting day
        /** @type {?} */
        var day = runningDay - 30 * (month - 1) - (lc + mc);
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
    };
    /**
     * @return {?}
     */
    DateTimeCommons.prototype.emitDateChange = /**
     * @return {?}
     */
    function () {
        this.onDateChange.emit({
            year: this.year,
            month: this.month,
            day: this.day
        });
    };
    /**
     * @return {?}
     */
    DateTimeCommons.prototype.getGranularity = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var duration;
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
    };
    /**
     * @return {?}
     */
    DateTimeCommons.prototype.getTimeStamp = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var timestamp = '';
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
    };
    /**
     * @return {?}
     */
    DateTimeCommons.prototype.getDate = /**
     * @return {?}
     */
    function () {
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
        var date = new Date();
        date.setFullYear(this.year < 0 ? this.year + 1 : this.year);
        date.setMonth((this.month ? (this.month - 1) : 0));
        date.setDate((this.day ? this.day : 1));
        date.setHours(this.hours ? this.hours : 0);
        date.setMinutes(this.minutes ? this.minutes : 0);
        date.setSeconds(this.seconds ? this.seconds : 0);
        return date;
    };
    /**
     * @param {?} number
     * @param {?} width
     * @param {?=} z
     * @return {?}
     */
    DateTimeCommons.prototype.pad = /**
     * @param {?} number
     * @param {?} width
     * @param {?=} z
     * @return {?}
     */
    function (number, width, z) {
        if (z === void 0) { z = '0'; }
        /** @type {?} */
        var n = number.toString();
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };
    /**
     * @return {?}
     */
    DateTimeCommons.prototype.addYear = /**
     * @return {?}
     */
    function () {
        this.year++;
        if (this.year === 0)
            this.year++;
        if (this.day > this.lengthOfMonth()) {
            this.day = this.lengthOfMonth();
        }
    };
    /**
     * @return {?}
     */
    DateTimeCommons.prototype.addMonth = /**
     * @return {?}
     */
    function () {
        this.month++;
        if (this.month > 12) {
            this.month = 1;
            this.addYear();
        }
        else if (this.day > this.lengthOfMonth()) {
            this.day = this.lengthOfMonth();
        }
    };
    /**
     * @return {?}
     */
    DateTimeCommons.prototype.addDay = /**
     * @return {?}
     */
    function () {
        this.day++;
        if (this.day > this.lengthOfMonth()) {
            this.day = 1;
            this.addMonth();
        }
    };
    /**
     * @return {?}
     */
    DateTimeCommons.prototype.addHour = /**
     * @return {?}
     */
    function () {
        this.hours++;
        if (this.hours > 23) {
            this.hours = 0;
            this.addDay();
        }
    };
    /**
     * @return {?}
     */
    DateTimeCommons.prototype.addMinute = /**
     * @return {?}
     */
    function () {
        this.minutes++;
        if (this.minutes > 59) {
            this.minutes = 0;
            this.addHour();
        }
    };
    /**
     * @return {?}
     */
    DateTimeCommons.prototype.addSecond = /**
     * @return {?}
     */
    function () {
        this.seconds++;
        if (this.seconds > 59) {
            this.seconds = 0;
            this.addMinute();
        }
    };
    /**
     * @return {?}
     */
    DateTimeCommons.prototype.removeYear = /**
     * @return {?}
     */
    function () {
        this.year--;
        if (this.year === 0) {
            this.year = -1;
        }
        if (this.day > this.lengthOfMonth()) {
            this.day = this.lengthOfMonth();
        }
    };
    /**
     * @return {?}
     */
    DateTimeCommons.prototype.removeMonth = /**
     * @return {?}
     */
    function () {
        this.month--;
        if (this.month < 1) {
            this.month = 12;
            this.removeYear();
        }
        else if (this.day > this.lengthOfMonth()) {
            this.day = this.lengthOfMonth();
        }
    };
    /**
     * @return {?}
     */
    DateTimeCommons.prototype.removeDay = /**
     * @return {?}
     */
    function () {
        this.day--;
        if (this.day < 1) {
            this.removeMonth();
            this.day = this.lengthOfMonth();
        }
    };
    /**
     * @return {?}
     */
    DateTimeCommons.prototype.removeHour = /**
     * @return {?}
     */
    function () {
        this.hours--;
        if (this.hours < 0 || !this.hours) {
            this.hours = 23;
            this.removeDay();
        }
    };
    /**
     * @return {?}
     */
    DateTimeCommons.prototype.removeMinute = /**
     * @return {?}
     */
    function () {
        this.minutes--;
        if (this.minutes < 0 || !this.minutes) {
            this.minutes = 59;
            this.removeHour();
        }
    };
    /**
     * @return {?}
     */
    DateTimeCommons.prototype.removeSecond = /**
     * @return {?}
     */
    function () {
        this.seconds--;
        if (this.seconds < 0 || !this.seconds) {
            this.seconds = 59;
            this.removeMinute();
        }
    };
    /**
     * @param {?} quantity
     * @return {?}
     */
    DateTimeCommons.prototype.addDays = /**
     * @param {?} quantity
     * @return {?}
     */
    function (quantity) {
        for (var i = 0; i < quantity; i++) {
            this.addDay();
        }
        ;
    };
    /**
     * @param {?} quantity
     * @return {?}
     */
    DateTimeCommons.prototype.addMonths = /**
     * @param {?} quantity
     * @return {?}
     */
    function (quantity) {
        for (var i = 0; i < quantity; i++) {
            this.addMonth();
        }
        ;
    };
    /**
     * @param {?} quantity
     * @return {?}
     */
    DateTimeCommons.prototype.addYears = /**
     * @param {?} quantity
     * @return {?}
     */
    function (quantity) {
        for (var i = 0; i < quantity; i++) {
            this.addYear();
        }
        ;
    };
    /**
     * @param {?} duration
     * @return {?}
     */
    DateTimeCommons.prototype.add = /**
     * @param {?} duration
     * @return {?}
     */
    function (duration) {
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
    };
    /**
     * @param {?} duration
     * @return {?}
     */
    DateTimeCommons.prototype.toLastSecondOf = /**
     * @param {?} duration
     * @return {?}
     */
    function (duration) {
        this.add(duration);
        this.removeSecond();
    };
    return DateTimeCommons;
}());
/**
 * @abstract
 */
export { DateTimeCommons };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLWNvbW1vbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzL3NyYy9saWIvZGF0ZS10aW1lLyIsInNvdXJjZXMiOlsiZGF0ZS10aW1lLWNvbW1vbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBYTdDOzs7O0lBdUVFLHlCQUFZLElBQUs7Ozs7UUFsRWpCLGlCQUFZLEdBQStCLElBQUksWUFBWSxFQUFFLENBQUM7UUFtRTVELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFoRUQsc0JBQUksaUNBQUk7Ozs7UUFLUjtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDOzs7OztRQVBELFVBQVMsR0FBVztZQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUNqQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFRRCxzQkFBSSxrQ0FBSzs7OztRQUtUO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7Ozs7O1FBUEQsVUFBVSxHQUFXO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQVFELHNCQUFJLGdDQUFHOzs7O1FBS1A7WUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkIsQ0FBQzs7Ozs7UUFQRCxVQUFRLEdBQVc7WUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7WUFDaEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBUUQsc0JBQUksa0NBQUs7Ozs7UUFJVDtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0s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Ozs7SUFXdEIsaUNBQXdCOzs7OztJQVV4QixtQ0FBMEI7Ozs7O0lBVTFCLG1DQUEwQjs7Ozs7SUFlMUIsMERBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBZZWFyTW9udGhEYXkgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5leHBvcnQgdHlwZSBHcmFudWxhcml0eSA9XG4gICcxIGNlbnR1cnknIHxcbiAgJzEgZGVjYWRlJyB8XG4gICcxIHllYXInIHxcbiAgJzEgbW9udGgnIHxcbiAgJzEgZGF5JyB8XG4gICcxIGhvdXInIHxcbiAgJzEgbWludXRlJyB8XG4gICcxIHNlY29uZCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRlVGltZUNvbW1vbnMge1xuXG4gIC8qKlxuICAgKiBQcm9wZXJ0aWVzXG4gICAqL1xuICBvbkRhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxZZWFyTW9udGhEYXk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX3llYXI/OiBudW1iZXI7XG5cbiAgc2V0IHllYXIodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl95ZWFyID0gdmFsO1xuICAgIHRoaXMuZW1pdERhdGVDaGFuZ2UoKTtcbiAgfVxuXG4gIGdldCB5ZWFyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3llYXI7XG4gIH1cblxuICBwcml2YXRlIF9tb250aD86IG51bWJlcjtcblxuICBzZXQgbW9udGgodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9tb250aCA9IHZhbDtcbiAgICB0aGlzLmVtaXREYXRlQ2hhbmdlKCk7XG4gIH1cblxuICBnZXQgbW9udGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9udGg7XG4gIH1cblxuICBwcml2YXRlIF9kYXk/OiBudW1iZXI7XG5cbiAgc2V0IGRheSh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX2RheSA9IHZhbDtcbiAgICB0aGlzLmVtaXREYXRlQ2hhbmdlKCk7XG4gIH1cblxuICBnZXQgZGF5KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RheTtcbiAgfVxuXG4gIHByaXZhdGUgX2hvdXJzPzogbnVtYmVyO1xuXG4gIHNldCBob3Vycyh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX2hvdXJzID0gdmFsO1xuICB9XG5cbiAgZ2V0IGhvdXJzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2hvdXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWludXRlcz86IG51bWJlcjtcblxuICBzZXQgbWludXRlcyh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX21pbnV0ZXMgPSB2YWw7XG4gIH1cblxuICBnZXQgbWludXRlcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9taW51dGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2Vjb25kcz86IG51bWJlcjtcblxuICBzZXQgc2Vjb25kcyh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX3NlY29uZHMgPSB2YWw7XG4gIH1cblxuICBnZXQgc2Vjb25kcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zZWNvbmRzO1xuICB9XG5cblxuICBjb25zdHJ1Y3RvcihkYXRhPykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cblxuICBhYnN0cmFjdCBsZW5ndGhPZk1vbnRoKCk6IG51bWJlcjtcblxuICAvKipcbiAgKiBSZXR1cm5zIHRoZSBydW5uaW5nIGRheSBmb3IgZ2l2ZW4gbW9udGggYW5kIGRheSB3aXRoIGNvbnNpZGVyYXRpb24gb2YgdGhlXG4gICogaXNMZWFwIGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgbGVhcCB5ZWFycy4gSW5zcGlyZWQgYnk6XG4gICogaHR0cHM6Ly9kZS53aWtpcGVkaWEub3JnL3dpa2kvVW1yZWNobnVuZ196d2lzY2hlbl9qdWxpYW5pc2NoZW1fRGF0dW1fdW5kX2p1bGlhbmlzY2hlbV9LYWxlbmRlclxuICAqXG4gICogQHBhcmFtIG1vbnRoIDE9amFudWFyeSAuLiAxMj1kZWNlbWJlclxuICAqIEBwYXJhbSBkYXkgMSwgMiAuLiAzMVxuICAqIEBwYXJhbSBpc0xlYXAgaWYgdHJ1ZSwgdGhpcyBpcyBhIGxlYXAgeWVhclxuICAqL1xuICBjYWxjUnVubmluZ0RheShtb250aDogbnVtYmVyLCBkYXk6IG51bWJlciwgaXNMZWFwOiBib29sZWFuKTogbnVtYmVyIHtcblxuICAgIC8vIGlmIG5vIG1vbnRoIG9yIGRheSBwcm92aWRlZCwgbGV0J3Mgc3RhcnQgYXQgMVxuICAgIGRheSA9IChkYXkgPT09IHVuZGVmaW5lZCB8fCBkYXkgPT09IG51bGwpID8gMSA6IGRheTtcbiAgICBtb250aCA9IChtb250aCA9PT0gdW5kZWZpbmVkIHx8IG1vbnRoID09PSBudWxsKSA/IDEgOiBtb250aDtcblxuICAgIC8vIG1vbnRoIGNvcnJlY3Rpb25zIChub3RlIHRoYXQgamFudWFyeSBoYXMgaW5kZXggMClcbiAgICBjb25zdCBtb250aENvcnJlbmN0aW9ucyA9IFstMSwgMCwgLTIsIC0xLCAtMSwgMCwgMCwgMSwgKzIsICsyLCArMywgKzNdO1xuXG4gICAgLy8gbGVhcCB5ZWFyIGNvcnJlY3Rpb25cbiAgICBsZXQgbGMgPSAwO1xuXG4gICAgaWYgKGlzTGVhcCAmJiBtb250aCA+IDIpIHtcbiAgICAgIGxjID0gMTtcbiAgICB9XG5cbiAgICAvLyBtb250aCBjb3JyZWN0aW9uXG4gICAgY29uc3QgbWMgPSBtb250aENvcnJlbmN0aW9uc1ttb250aCAtIDFdO1xuXG4gICAgcmV0dXJuIGRheSArICgzMCAqIChtb250aCAtIDEpKSArIChsYyArIG1jKTtcbiAgfVxuXG5cbiAgLyoqXG4gICogUmV0dXJucyB0aGUgbW9udGggYW5kIGRheSBmb3IgZ2l2ZW4gcnVubmluZyBkYXkgd2l0aCBjb25zaWRlcmF0aW9uIG9mIHRoZVxuICAqIGlzTGVhcCBib29sZWFuIHRoYXQgaW5kaWNhdGVzIGxlYXAgeWVhcnMuIEluc3BpcmVkIGJ5OlxuICAqIGh0dHBzOi8vZGUud2lraXBlZGlhLm9yZy93aWtpL1VtcmVjaG51bmdfendpc2NoZW5fanVsaWFuaXNjaGVtX0RhdHVtX3VuZF9qdWxpYW5pc2NoZW1fS2FsZW5kZXJcbiAgKlxuICAqIEBwYXJhbSBydW5uaW5nRGF5IDEsIDIgLi4gMzY1XG4gICogQHBhcmFtIGlzTGVhcCBpZiB0cnVlLCB0aGlzIGlzIGEgbGVhcCB5ZWFyXG4gICpcbiAgKi9cbiAgY2FsY0RhdGVCeVJ1bm5pbmdEYXkocnVubmluZ0RheTogbnVtYmVyLCBpc0xlYXA6IGJvb2xlYW4pOiB7IGRheTogbnVtYmVyLCBtb250aDogbnVtYmVyIH0ge1xuXG4gICAgLy8gbW9udGggY29ycmVjdGlvbnMgKG5vdGUgdGhhdCBqYW51YXJ5IGhhcyBpbmRleCAwKVxuICAgIGNvbnN0IG1vbnRoQ29ycmVuY3Rpb25zID0gWy0xLCAwLCAtMiwgLTEsIC0xLCAwLCAwLCAxLCArMiwgKzIsICszLCArM107XG5cbiAgICAvLyByZXN1bHRpbmcgbW9udGhcbiAgICBsZXQgbW9udGggPSBNYXRoLmZsb29yKChydW5uaW5nRGF5ICsgMSkgLyAzMCkgKyAxO1xuXG4gICAgLy8gbW9udGggY29ycmVjdGlvblxuICAgIGxldCBtYyA9IG1vbnRoQ29ycmVuY3Rpb25zW21vbnRoIC0gMV07XG5cbiAgICAvLyBsZWFwIHllYXIgY29ycmVjdGlvblxuICAgIGxldCBsYyA9IDA7XG5cbiAgICBpZiAoaXNMZWFwICYmIG1vbnRoID4gMikge1xuICAgICAgbGMgPSAxO1xuICAgIH1cblxuICAgIC8vIHJlc3VsdGluZyBkYXlcbiAgICBsZXQgZGF5ID0gcnVubmluZ0RheSAtIDMwICogKG1vbnRoIC0gMSkgLSAobGMgKyBtYyk7XG5cbiAgICAvLyBjaGVjayBpZiBtb250aCBhbmQgZGF5IHN0aWxsIHZhbGlkXG4gICAgaWYgKG1vbnRoID4gMTIgfHwgZGF5IDwgMSkge1xuXG4gICAgICBtb250aC0tO1xuXG4gICAgICBpZiAobW9udGggPCAxKSB7XG4gICAgICAgIGlzTGVhcCA9ICFpc0xlYXA7XG4gICAgICB9XG5cbiAgICAgIC8vIGxlYXAgeWVhciBjb3JyZWN0aW9uXG4gICAgICBsYyA9IDA7XG5cbiAgICAgIGlmIChpc0xlYXAgJiYgbW9udGggPiAyKSB7XG4gICAgICAgIGxjID0gMTtcbiAgICAgIH1cblxuICAgICAgLy8gbW9udGggY29ycmVjdGlvblxuICAgICAgbWMgPSBtb250aENvcnJlbmN0aW9uc1ttb250aCAtIDFdO1xuXG4gICAgICAvLyByZXN1bHRpbmcgZGF5XG4gICAgICBkYXkgPSBydW5uaW5nRGF5IC0gMzAgKiAobW9udGggLSAxKSAtIChsYyArIG1jKTtcblxuICAgIH1cblxuICAgIHJldHVybiB7IGRheTogZGF5LCBtb250aDogbW9udGggfTtcbiAgfVxuXG4gIGVtaXREYXRlQ2hhbmdlKCkge1xuICAgIHRoaXMub25EYXRlQ2hhbmdlLmVtaXQoe1xuICAgICAgeWVhcjogdGhpcy55ZWFyLFxuICAgICAgbW9udGg6IHRoaXMubW9udGgsXG4gICAgICBkYXk6IHRoaXMuZGF5XG4gICAgfSk7XG4gIH1cblxuICBnZXRHcmFudWxhcml0eSgpOiBHcmFudWxhcml0eSB7XG4gICAgbGV0IGR1cmF0aW9uOiBHcmFudWxhcml0eTtcbiAgICBpZiAodGhpcy55ZWFyKSB7IGR1cmF0aW9uID0gJzEgeWVhcicgfVxuICAgIGlmICh0aGlzLm1vbnRoKSB7IGR1cmF0aW9uID0gJzEgbW9udGgnIH1cbiAgICBpZiAodGhpcy5kYXkpIHsgZHVyYXRpb24gPSAnMSBkYXknIH1cbiAgICBpZiAodGhpcy5ob3VycykgeyBkdXJhdGlvbiA9ICcxIGhvdXInIH1cbiAgICBpZiAodGhpcy5taW51dGVzKSB7IGR1cmF0aW9uID0gJzEgbWludXRlJyB9XG4gICAgaWYgKHRoaXMuc2Vjb25kcykgeyBkdXJhdGlvbiA9ICcxIHNlY29uZCcgfVxuICAgIHJldHVybiBkdXJhdGlvbjtcbiAgfVxuXG4gIGdldFRpbWVTdGFtcCgpOiBzdHJpbmcge1xuXG4gICAgbGV0IHRpbWVzdGFtcCA9ICcnO1xuICAgIHRpbWVzdGFtcCA9IHRoaXMueWVhciA/IHRoaXMucGFkKE1hdGguYWJzKHRoaXMueWVhciksIDQpIDogJzAxJztcbiAgICB0aW1lc3RhbXAgKz0gJy0nO1xuICAgIHRpbWVzdGFtcCArPSB0aGlzLm1vbnRoID8gdGhpcy5wYWQodGhpcy5tb250aCwgMikgOiAnMDEnO1xuICAgIHRpbWVzdGFtcCArPSAnLSc7XG4gICAgdGltZXN0YW1wICs9IHRoaXMuZGF5ID8gdGhpcy5wYWQodGhpcy5kYXksIDIpIDogJzAxJztcbiAgICB0aW1lc3RhbXAgKz0gJyAnO1xuICAgIHRpbWVzdGFtcCArPSB0aGlzLmhvdXJzID8gdGhpcy5wYWQodGhpcy5ob3VycywgMikgOiAnMDAnO1xuICAgIHRpbWVzdGFtcCArPSAnOic7XG4gICAgdGltZXN0YW1wICs9IHRoaXMubWludXRlcyA/IHRoaXMucGFkKHRoaXMubWludXRlcywgMikgOiAnMDAnO1xuICAgIHRpbWVzdGFtcCArPSAnOic7XG4gICAgdGltZXN0YW1wICs9IHRoaXMuc2Vjb25kcyA/IHRoaXMucGFkKHRoaXMuc2Vjb25kcywgMikgOiAnMDAnO1xuXG4gICAgdGltZXN0YW1wICs9IHRoaXMueWVhciA8IDAgPyAnIEJDJyA6ICcnO1xuXG4gICAgcmV0dXJuIHRpbWVzdGFtcDtcbiAgfVxuXG4gIGdldERhdGUoKTogRGF0ZSB8IG51bGwge1xuXG4gICAgLy8gdmFsaWRhdGVcbiAgICBpZiAoIXRoaXMueWVhciAmJiB0aGlzLnllYXIgIT09IDApIHJldHVybiBudWxsO1xuICAgIGlmICh0aGlzLmRheSAmJiAhdGhpcy5tb250aCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKHRoaXMuaG91cnMgJiYgIXRoaXMuZGF5KSByZXR1cm4gbnVsbDtcbiAgICBpZiAodGhpcy5taW51dGVzICYmICF0aGlzLmhvdXJzKSByZXR1cm4gbnVsbDtcbiAgICBpZiAodGhpcy5zZWNvbmRzICYmICF0aGlzLmhvdXJzKSByZXR1cm4gbnVsbDtcblxuICAgIC8vIGNyZWF0IGRhdGVcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKVxuXG4gICAgZGF0ZS5zZXRGdWxsWWVhcih0aGlzLnllYXIgPCAwID8gdGhpcy55ZWFyICsgMSA6IHRoaXMueWVhcik7XG5cbiAgICBkYXRlLnNldE1vbnRoKCh0aGlzLm1vbnRoID8gKHRoaXMubW9udGggLSAxKSA6IDApKTtcblxuICAgIGRhdGUuc2V0RGF0ZSgodGhpcy5kYXkgPyB0aGlzLmRheSA6IDEpKTtcblxuICAgIGRhdGUuc2V0SG91cnModGhpcy5ob3VycyA/IHRoaXMuaG91cnMgOiAwKVxuXG4gICAgZGF0ZS5zZXRNaW51dGVzKHRoaXMubWludXRlcyA/IHRoaXMubWludXRlcyA6IDApXG5cbiAgICBkYXRlLnNldFNlY29uZHModGhpcy5zZWNvbmRzID8gdGhpcy5zZWNvbmRzIDogMClcblxuICAgIHJldHVybiBkYXRlO1xuICB9XG5cbiAgcGFkKG51bWJlcjogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCB6OiBzdHJpbmcgPSAnMCcpOiBzdHJpbmcge1xuICAgIGNvbnN0IG4gPSBudW1iZXIudG9TdHJpbmcoKTtcbiAgICByZXR1cm4gbi5sZW5ndGggPj0gd2lkdGggPyBuIDogbmV3IEFycmF5KHdpZHRoIC0gbi5sZW5ndGggKyAxKS5qb2luKHopICsgbjtcbiAgfVxuXG5cbiAgYWRkWWVhcigpIHtcbiAgICB0aGlzLnllYXIrKztcbiAgICBpZiAodGhpcy55ZWFyID09PSAwKSB0aGlzLnllYXIrKztcbiAgICBpZiAodGhpcy5kYXkgPiB0aGlzLmxlbmd0aE9mTW9udGgoKSkge1xuICAgICAgdGhpcy5kYXkgPSB0aGlzLmxlbmd0aE9mTW9udGgoKVxuICAgIH1cbiAgfVxuXG4gIGFkZE1vbnRoKCkge1xuICAgIHRoaXMubW9udGgrKztcblxuXG4gICAgaWYgKHRoaXMubW9udGggPiAxMikge1xuICAgICAgdGhpcy5tb250aCA9IDFcbiAgICAgIHRoaXMuYWRkWWVhcigpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmRheSA+IHRoaXMubGVuZ3RoT2ZNb250aCgpKSB7XG4gICAgICB0aGlzLmRheSA9IHRoaXMubGVuZ3RoT2ZNb250aCgpXG4gICAgfVxuICB9XG5cbiAgYWRkRGF5KCkge1xuICAgIHRoaXMuZGF5Kys7XG4gICAgaWYgKHRoaXMuZGF5ID4gdGhpcy5sZW5ndGhPZk1vbnRoKCkpIHtcbiAgICAgIHRoaXMuZGF5ID0gMTtcbiAgICAgIHRoaXMuYWRkTW9udGgoKVxuICAgIH1cbiAgfVxuXG4gIGFkZEhvdXIoKSB7XG4gICAgdGhpcy5ob3VycysrO1xuICAgIGlmICh0aGlzLmhvdXJzID4gMjMpIHtcbiAgICAgIHRoaXMuaG91cnMgPSAwO1xuICAgICAgdGhpcy5hZGREYXkoKVxuICAgIH1cbiAgfVxuXG4gIGFkZE1pbnV0ZSgpIHtcbiAgICB0aGlzLm1pbnV0ZXMrKztcbiAgICBpZiAodGhpcy5taW51dGVzID4gNTkpIHtcbiAgICAgIHRoaXMubWludXRlcyA9IDA7XG4gICAgICB0aGlzLmFkZEhvdXIoKVxuICAgIH1cbiAgfVxuXG4gIGFkZFNlY29uZCgpIHtcbiAgICB0aGlzLnNlY29uZHMrKztcbiAgICBpZiAodGhpcy5zZWNvbmRzID4gNTkpIHtcbiAgICAgIHRoaXMuc2Vjb25kcyA9IDA7XG4gICAgICB0aGlzLmFkZE1pbnV0ZSgpXG4gICAgfVxuICB9XG5cblxuXG5cbiAgcmVtb3ZlWWVhcigpIHtcbiAgICB0aGlzLnllYXItLTtcbiAgICBpZiAodGhpcy55ZWFyID09PSAwKSB7XG4gICAgICB0aGlzLnllYXIgPSAtMTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF5ID4gdGhpcy5sZW5ndGhPZk1vbnRoKCkpIHtcbiAgICAgIHRoaXMuZGF5ID0gdGhpcy5sZW5ndGhPZk1vbnRoKClcbiAgICB9XG4gIH1cblxuICByZW1vdmVNb250aCgpIHtcbiAgICB0aGlzLm1vbnRoLS07XG5cbiAgICBpZiAodGhpcy5tb250aCA8IDEpIHtcbiAgICAgIHRoaXMubW9udGggPSAxMjtcbiAgICAgIHRoaXMucmVtb3ZlWWVhcigpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmRheSA+IHRoaXMubGVuZ3RoT2ZNb250aCgpKSB7XG4gICAgICB0aGlzLmRheSA9IHRoaXMubGVuZ3RoT2ZNb250aCgpXG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRGF5KCkge1xuICAgIHRoaXMuZGF5LS07XG4gICAgaWYgKHRoaXMuZGF5IDwgMSkge1xuICAgICAgdGhpcy5yZW1vdmVNb250aCgpXG4gICAgICB0aGlzLmRheSA9IHRoaXMubGVuZ3RoT2ZNb250aCgpO1xuICAgIH1cbiAgfVxuXG5cbiAgcmVtb3ZlSG91cigpIHtcbiAgICB0aGlzLmhvdXJzLS07XG4gICAgaWYgKHRoaXMuaG91cnMgPCAwIHx8ICF0aGlzLmhvdXJzKSB7XG4gICAgICB0aGlzLmhvdXJzID0gMjM7XG4gICAgICB0aGlzLnJlbW92ZURheSgpXG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWludXRlKCkge1xuICAgIHRoaXMubWludXRlcy0tO1xuICAgIGlmICh0aGlzLm1pbnV0ZXMgPCAwIHx8ICF0aGlzLm1pbnV0ZXMpIHtcbiAgICAgIHRoaXMubWludXRlcyA9IDU5O1xuICAgICAgdGhpcy5yZW1vdmVIb3VyKClcbiAgICB9XG4gIH1cblxuICByZW1vdmVTZWNvbmQoKSB7XG4gICAgdGhpcy5zZWNvbmRzLS07XG4gICAgaWYgKHRoaXMuc2Vjb25kcyA8IDAgfHwgIXRoaXMuc2Vjb25kcykge1xuICAgICAgdGhpcy5zZWNvbmRzID0gNTk7XG4gICAgICB0aGlzLnJlbW92ZU1pbnV0ZSgpXG4gICAgfVxuICB9XG5cblxuICBhZGREYXlzKHF1YW50aXR5OiBudW1iZXIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1YW50aXR5OyBpKyspIHtcbiAgICAgIHRoaXMuYWRkRGF5KCk7XG4gICAgfTtcbiAgfVxuXG4gIGFkZE1vbnRocyhxdWFudGl0eTogbnVtYmVyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWFudGl0eTsgaSsrKSB7XG4gICAgICB0aGlzLmFkZE1vbnRoKCk7XG4gICAgfTtcbiAgfVxuXG4gIGFkZFllYXJzKHF1YW50aXR5OiBudW1iZXIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1YW50aXR5OyBpKyspIHtcbiAgICAgIHRoaXMuYWRkWWVhcigpO1xuICAgIH07XG4gIH1cblxuICBhZGQoZHVyYXRpb246IEdyYW51bGFyaXR5KSB7XG4gICAgaWYgKGR1cmF0aW9uID09PSAnMSB5ZWFyJykge1xuICAgICAgdGhpcy5hZGRZZWFyKClcbiAgICB9XG4gICAgZWxzZSBpZiAoZHVyYXRpb24gPT09ICcxIG1vbnRoJykge1xuICAgICAgdGhpcy5hZGRNb250aCgpXG4gICAgfVxuICAgIGVsc2UgaWYgKGR1cmF0aW9uID09PSAnMSBkYXknKSB7XG4gICAgICB0aGlzLmFkZERheSgpXG4gICAgfVxuICAgIGVsc2UgaWYgKGR1cmF0aW9uID09PSAnMSBob3VyJykge1xuICAgICAgdGhpcy5hZGRIb3VyKClcbiAgICB9XG4gICAgZWxzZSBpZiAoZHVyYXRpb24gPT09ICcxIG1pbnV0ZScpIHtcbiAgICAgIHRoaXMuYWRkTWludXRlKClcbiAgICB9XG4gICAgZWxzZSBpZiAoZHVyYXRpb24gPT09ICcxIHNlY29uZCcpIHtcbiAgICAgIHRoaXMuYWRkU2Vjb25kKClcbiAgICB9XG4gIH1cblxuXG5cbiAgdG9MYXN0U2Vjb25kT2YoZHVyYXRpb246IEdyYW51bGFyaXR5KSB7XG4gICAgdGhpcy5hZGQoZHVyYXRpb24pO1xuICAgIHRoaXMucmVtb3ZlU2Vjb25kKCk7XG4gIH1cblxuXG59XG4iXX0=