/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/classes/date-time-commons.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLWNvbW1vbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9jbGFzc2VzL2RhdGUtdGltZS1jb21tb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQWE3Qzs7OztJQXVFRSx5QkFBWSxJQUFLOzs7O1FBbEVqQixpQkFBWSxHQUErQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBbUU1RCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBaEVELHNCQUFJLGlDQUFJOzs7O1FBS1I7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQzs7Ozs7UUFQRCxVQUFTLEdBQVc7WUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDakIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBUUQsc0JBQUksa0NBQUs7Ozs7UUFLVDtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7OztRQVBELFVBQVUsR0FBVztZQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztZQUNsQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFRRCxzQkFBSSxnQ0FBRzs7OztRQUtQO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUM7Ozs7O1FBUEQsVUFBUSxHQUFXO1lBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQVFELHNCQUFJLGtDQUFLOzs7O1FBSVQ7WUFDRSxPQUFPLElBQUksQ0FBQyxN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c0I7Ozs7O0lBV3RCLGlDQUF3Qjs7Ozs7SUFVeEIsbUNBQTBCOzs7OztJQVUxQixtQ0FBMEI7Ozs7O0lBZTFCLDBEQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgWWVhck1vbnRoRGF5IH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCB0eXBlIEdyYW51bGFyaXR5ID1cbiAgJzEgY2VudHVyeScgfFxuICAnMSBkZWNhZGUnIHxcbiAgJzEgeWVhcicgfFxuICAnMSBtb250aCcgfFxuICAnMSBkYXknIHxcbiAgJzEgaG91cicgfFxuICAnMSBtaW51dGUnIHxcbiAgJzEgc2Vjb25kJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERhdGVUaW1lQ29tbW9ucyB7XG5cbiAgLyoqXG4gICAqIFByb3BlcnRpZXNcbiAgICovXG4gIG9uRGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPFllYXJNb250aERheT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfeWVhcj86IG51bWJlcjtcblxuICBzZXQgeWVhcih2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX3llYXIgPSB2YWw7XG4gICAgdGhpcy5lbWl0RGF0ZUNoYW5nZSgpO1xuICB9XG5cbiAgZ2V0IHllYXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5feWVhcjtcbiAgfVxuXG4gIHByaXZhdGUgX21vbnRoPzogbnVtYmVyO1xuXG4gIHNldCBtb250aCh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX21vbnRoID0gdmFsO1xuICAgIHRoaXMuZW1pdERhdGVDaGFuZ2UoKTtcbiAgfVxuXG4gIGdldCBtb250aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tb250aDtcbiAgfVxuXG4gIHByaXZhdGUgX2RheT86IG51bWJlcjtcblxuICBzZXQgZGF5KHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fZGF5ID0gdmFsO1xuICAgIHRoaXMuZW1pdERhdGVDaGFuZ2UoKTtcbiAgfVxuXG4gIGdldCBkYXkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZGF5O1xuICB9XG5cbiAgcHJpdmF0ZSBfaG91cnM/OiBudW1iZXI7XG5cbiAgc2V0IGhvdXJzKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5faG91cnMgPSB2YWw7XG4gIH1cblxuICBnZXQgaG91cnMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5faG91cnM7XG4gIH1cblxuICBwcml2YXRlIF9taW51dGVzPzogbnVtYmVyO1xuXG4gIHNldCBtaW51dGVzKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWludXRlcyA9IHZhbDtcbiAgfVxuXG4gIGdldCBtaW51dGVzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21pbnV0ZXM7XG4gIH1cblxuICBwcml2YXRlIF9zZWNvbmRzPzogbnVtYmVyO1xuXG4gIHNldCBzZWNvbmRzKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2Vjb25kcyA9IHZhbDtcbiAgfVxuXG4gIGdldCBzZWNvbmRzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3NlY29uZHM7XG4gIH1cblxuXG4gIGNvbnN0cnVjdG9yKGRhdGE/KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuXG4gIGFic3RyYWN0IGxlbmd0aE9mTW9udGgoKTogbnVtYmVyO1xuXG4gIC8qKlxuICAqIFJldHVybnMgdGhlIHJ1bm5pbmcgZGF5IGZvciBnaXZlbiBtb250aCBhbmQgZGF5IHdpdGggY29uc2lkZXJhdGlvbiBvZiB0aGVcbiAgKiBpc0xlYXAgYm9vbGVhbiB0aGF0IGluZGljYXRlcyBsZWFwIHllYXJzLiBJbnNwaXJlZCBieTpcbiAgKiBodHRwczovL2RlLndpa2lwZWRpYS5vcmcvd2lraS9VbXJlY2hudW5nX3p3aXNjaGVuX2p1bGlhbmlzY2hlbV9EYXR1bV91bmRfanVsaWFuaXNjaGVtX0thbGVuZGVyXG4gICpcbiAgKiBAcGFyYW0gbW9udGggMT1qYW51YXJ5IC4uIDEyPWRlY2VtYmVyXG4gICogQHBhcmFtIGRheSAxLCAyIC4uIDMxXG4gICogQHBhcmFtIGlzTGVhcCBpZiB0cnVlLCB0aGlzIGlzIGEgbGVhcCB5ZWFyXG4gICovXG4gIGNhbGNSdW5uaW5nRGF5KG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyLCBpc0xlYXA6IGJvb2xlYW4pOiBudW1iZXIge1xuXG4gICAgLy8gaWYgbm8gbW9udGggb3IgZGF5IHByb3ZpZGVkLCBsZXQncyBzdGFydCBhdCAxXG4gICAgZGF5ID0gKGRheSA9PT0gdW5kZWZpbmVkIHx8IGRheSA9PT0gbnVsbCkgPyAxIDogZGF5O1xuICAgIG1vbnRoID0gKG1vbnRoID09PSB1bmRlZmluZWQgfHwgbW9udGggPT09IG51bGwpID8gMSA6IG1vbnRoO1xuXG4gICAgLy8gbW9udGggY29ycmVjdGlvbnMgKG5vdGUgdGhhdCBqYW51YXJ5IGhhcyBpbmRleCAwKVxuICAgIGNvbnN0IG1vbnRoQ29ycmVuY3Rpb25zID0gWy0xLCAwLCAtMiwgLTEsIC0xLCAwLCAwLCAxLCArMiwgKzIsICszLCArM107XG5cbiAgICAvLyBsZWFwIHllYXIgY29ycmVjdGlvblxuICAgIGxldCBsYyA9IDA7XG5cbiAgICBpZiAoaXNMZWFwICYmIG1vbnRoID4gMikge1xuICAgICAgbGMgPSAxO1xuICAgIH1cblxuICAgIC8vIG1vbnRoIGNvcnJlY3Rpb25cbiAgICBjb25zdCBtYyA9IG1vbnRoQ29ycmVuY3Rpb25zW21vbnRoIC0gMV07XG5cbiAgICByZXR1cm4gZGF5ICsgKDMwICogKG1vbnRoIC0gMSkpICsgKGxjICsgbWMpO1xuICB9XG5cblxuICAvKipcbiAgKiBSZXR1cm5zIHRoZSBtb250aCBhbmQgZGF5IGZvciBnaXZlbiBydW5uaW5nIGRheSB3aXRoIGNvbnNpZGVyYXRpb24gb2YgdGhlXG4gICogaXNMZWFwIGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgbGVhcCB5ZWFycy4gSW5zcGlyZWQgYnk6XG4gICogaHR0cHM6Ly9kZS53aWtpcGVkaWEub3JnL3dpa2kvVW1yZWNobnVuZ196d2lzY2hlbl9qdWxpYW5pc2NoZW1fRGF0dW1fdW5kX2p1bGlhbmlzY2hlbV9LYWxlbmRlclxuICAqXG4gICogQHBhcmFtIHJ1bm5pbmdEYXkgMSwgMiAuLiAzNjVcbiAgKiBAcGFyYW0gaXNMZWFwIGlmIHRydWUsIHRoaXMgaXMgYSBsZWFwIHllYXJcbiAgKlxuICAqL1xuICBjYWxjRGF0ZUJ5UnVubmluZ0RheShydW5uaW5nRGF5OiBudW1iZXIsIGlzTGVhcDogYm9vbGVhbik6IHsgZGF5OiBudW1iZXIsIG1vbnRoOiBudW1iZXIgfSB7XG5cbiAgICAvLyBtb250aCBjb3JyZWN0aW9ucyAobm90ZSB0aGF0IGphbnVhcnkgaGFzIGluZGV4IDApXG4gICAgY29uc3QgbW9udGhDb3JyZW5jdGlvbnMgPSBbLTEsIDAsIC0yLCAtMSwgLTEsIDAsIDAsIDEsICsyLCArMiwgKzMsICszXTtcblxuICAgIC8vIHJlc3VsdGluZyBtb250aFxuICAgIGxldCBtb250aCA9IE1hdGguZmxvb3IoKHJ1bm5pbmdEYXkgKyAxKSAvIDMwKSArIDE7XG5cbiAgICAvLyBtb250aCBjb3JyZWN0aW9uXG4gICAgbGV0IG1jID0gbW9udGhDb3JyZW5jdGlvbnNbbW9udGggLSAxXTtcblxuICAgIC8vIGxlYXAgeWVhciBjb3JyZWN0aW9uXG4gICAgbGV0IGxjID0gMDtcblxuICAgIGlmIChpc0xlYXAgJiYgbW9udGggPiAyKSB7XG4gICAgICBsYyA9IDE7XG4gICAgfVxuXG4gICAgLy8gcmVzdWx0aW5nIGRheVxuICAgIGxldCBkYXkgPSBydW5uaW5nRGF5IC0gMzAgKiAobW9udGggLSAxKSAtIChsYyArIG1jKTtcblxuICAgIC8vIGNoZWNrIGlmIG1vbnRoIGFuZCBkYXkgc3RpbGwgdmFsaWRcbiAgICBpZiAobW9udGggPiAxMiB8fCBkYXkgPCAxKSB7XG5cbiAgICAgIG1vbnRoLS07XG5cbiAgICAgIGlmIChtb250aCA8IDEpIHtcbiAgICAgICAgaXNMZWFwID0gIWlzTGVhcDtcbiAgICAgIH1cblxuICAgICAgLy8gbGVhcCB5ZWFyIGNvcnJlY3Rpb25cbiAgICAgIGxjID0gMDtcblxuICAgICAgaWYgKGlzTGVhcCAmJiBtb250aCA+IDIpIHtcbiAgICAgICAgbGMgPSAxO1xuICAgICAgfVxuXG4gICAgICAvLyBtb250aCBjb3JyZWN0aW9uXG4gICAgICBtYyA9IG1vbnRoQ29ycmVuY3Rpb25zW21vbnRoIC0gMV07XG5cbiAgICAgIC8vIHJlc3VsdGluZyBkYXlcbiAgICAgIGRheSA9IHJ1bm5pbmdEYXkgLSAzMCAqIChtb250aCAtIDEpIC0gKGxjICsgbWMpO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIHsgZGF5OiBkYXksIG1vbnRoOiBtb250aCB9O1xuICB9XG5cbiAgZW1pdERhdGVDaGFuZ2UoKSB7XG4gICAgdGhpcy5vbkRhdGVDaGFuZ2UuZW1pdCh7XG4gICAgICB5ZWFyOiB0aGlzLnllYXIsXG4gICAgICBtb250aDogdGhpcy5tb250aCxcbiAgICAgIGRheTogdGhpcy5kYXlcbiAgICB9KTtcbiAgfVxuXG4gIGdldEdyYW51bGFyaXR5KCk6IEdyYW51bGFyaXR5IHtcbiAgICBsZXQgZHVyYXRpb246IEdyYW51bGFyaXR5O1xuICAgIGlmICh0aGlzLnllYXIpIHsgZHVyYXRpb24gPSAnMSB5ZWFyJyB9XG4gICAgaWYgKHRoaXMubW9udGgpIHsgZHVyYXRpb24gPSAnMSBtb250aCcgfVxuICAgIGlmICh0aGlzLmRheSkgeyBkdXJhdGlvbiA9ICcxIGRheScgfVxuICAgIGlmICh0aGlzLmhvdXJzKSB7IGR1cmF0aW9uID0gJzEgaG91cicgfVxuICAgIGlmICh0aGlzLm1pbnV0ZXMpIHsgZHVyYXRpb24gPSAnMSBtaW51dGUnIH1cbiAgICBpZiAodGhpcy5zZWNvbmRzKSB7IGR1cmF0aW9uID0gJzEgc2Vjb25kJyB9XG4gICAgcmV0dXJuIGR1cmF0aW9uO1xuICB9XG5cbiAgZ2V0VGltZVN0YW1wKCk6IHN0cmluZyB7XG5cbiAgICBsZXQgdGltZXN0YW1wID0gJyc7XG4gICAgdGltZXN0YW1wID0gdGhpcy55ZWFyID8gdGhpcy5wYWQoTWF0aC5hYnModGhpcy55ZWFyKSwgNCkgOiAnMDEnO1xuICAgIHRpbWVzdGFtcCArPSAnLSc7XG4gICAgdGltZXN0YW1wICs9IHRoaXMubW9udGggPyB0aGlzLnBhZCh0aGlzLm1vbnRoLCAyKSA6ICcwMSc7XG4gICAgdGltZXN0YW1wICs9ICctJztcbiAgICB0aW1lc3RhbXAgKz0gdGhpcy5kYXkgPyB0aGlzLnBhZCh0aGlzLmRheSwgMikgOiAnMDEnO1xuICAgIHRpbWVzdGFtcCArPSAnICc7XG4gICAgdGltZXN0YW1wICs9IHRoaXMuaG91cnMgPyB0aGlzLnBhZCh0aGlzLmhvdXJzLCAyKSA6ICcwMCc7XG4gICAgdGltZXN0YW1wICs9ICc6JztcbiAgICB0aW1lc3RhbXAgKz0gdGhpcy5taW51dGVzID8gdGhpcy5wYWQodGhpcy5taW51dGVzLCAyKSA6ICcwMCc7XG4gICAgdGltZXN0YW1wICs9ICc6JztcbiAgICB0aW1lc3RhbXAgKz0gdGhpcy5zZWNvbmRzID8gdGhpcy5wYWQodGhpcy5zZWNvbmRzLCAyKSA6ICcwMCc7XG5cbiAgICB0aW1lc3RhbXAgKz0gdGhpcy55ZWFyIDwgMCA/ICcgQkMnIDogJyc7XG5cbiAgICByZXR1cm4gdGltZXN0YW1wO1xuICB9XG5cbiAgZ2V0RGF0ZSgpOiBEYXRlIHwgbnVsbCB7XG5cbiAgICAvLyB2YWxpZGF0ZVxuICAgIGlmICghdGhpcy55ZWFyICYmIHRoaXMueWVhciAhPT0gMCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKHRoaXMuZGF5ICYmICF0aGlzLm1vbnRoKSByZXR1cm4gbnVsbDtcbiAgICBpZiAodGhpcy5ob3VycyAmJiAhdGhpcy5kYXkpIHJldHVybiBudWxsO1xuICAgIGlmICh0aGlzLm1pbnV0ZXMgJiYgIXRoaXMuaG91cnMpIHJldHVybiBudWxsO1xuICAgIGlmICh0aGlzLnNlY29uZHMgJiYgIXRoaXMuaG91cnMpIHJldHVybiBudWxsO1xuXG4gICAgLy8gY3JlYXQgZGF0ZVxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpXG5cbiAgICBkYXRlLnNldEZ1bGxZZWFyKHRoaXMueWVhciA8IDAgPyB0aGlzLnllYXIgKyAxIDogdGhpcy55ZWFyKTtcblxuICAgIGRhdGUuc2V0TW9udGgoKHRoaXMubW9udGggPyAodGhpcy5tb250aCAtIDEpIDogMCkpO1xuXG4gICAgZGF0ZS5zZXREYXRlKCh0aGlzLmRheSA/IHRoaXMuZGF5IDogMSkpO1xuXG4gICAgZGF0ZS5zZXRIb3Vycyh0aGlzLmhvdXJzID8gdGhpcy5ob3VycyA6IDApXG5cbiAgICBkYXRlLnNldE1pbnV0ZXModGhpcy5taW51dGVzID8gdGhpcy5taW51dGVzIDogMClcblxuICAgIGRhdGUuc2V0U2Vjb25kcyh0aGlzLnNlY29uZHMgPyB0aGlzLnNlY29uZHMgOiAwKVxuXG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cblxuICBwYWQobnVtYmVyOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIHo6IHN0cmluZyA9ICcwJyk6IHN0cmluZyB7XG4gICAgY29uc3QgbiA9IG51bWJlci50b1N0cmluZygpO1xuICAgIHJldHVybiBuLmxlbmd0aCA+PSB3aWR0aCA/IG4gOiBuZXcgQXJyYXkod2lkdGggLSBuLmxlbmd0aCArIDEpLmpvaW4oeikgKyBuO1xuICB9XG5cblxuICBhZGRZZWFyKCkge1xuICAgIHRoaXMueWVhcisrO1xuICAgIGlmICh0aGlzLnllYXIgPT09IDApIHRoaXMueWVhcisrO1xuICAgIGlmICh0aGlzLmRheSA+IHRoaXMubGVuZ3RoT2ZNb250aCgpKSB7XG4gICAgICB0aGlzLmRheSA9IHRoaXMubGVuZ3RoT2ZNb250aCgpXG4gICAgfVxuICB9XG5cbiAgYWRkTW9udGgoKSB7XG4gICAgdGhpcy5tb250aCsrO1xuXG5cbiAgICBpZiAodGhpcy5tb250aCA+IDEyKSB7XG4gICAgICB0aGlzLm1vbnRoID0gMVxuICAgICAgdGhpcy5hZGRZZWFyKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuZGF5ID4gdGhpcy5sZW5ndGhPZk1vbnRoKCkpIHtcbiAgICAgIHRoaXMuZGF5ID0gdGhpcy5sZW5ndGhPZk1vbnRoKClcbiAgICB9XG4gIH1cblxuICBhZGREYXkoKSB7XG4gICAgdGhpcy5kYXkrKztcbiAgICBpZiAodGhpcy5kYXkgPiB0aGlzLmxlbmd0aE9mTW9udGgoKSkge1xuICAgICAgdGhpcy5kYXkgPSAxO1xuICAgICAgdGhpcy5hZGRNb250aCgpXG4gICAgfVxuICB9XG5cbiAgYWRkSG91cigpIHtcbiAgICB0aGlzLmhvdXJzKys7XG4gICAgaWYgKHRoaXMuaG91cnMgPiAyMykge1xuICAgICAgdGhpcy5ob3VycyA9IDA7XG4gICAgICB0aGlzLmFkZERheSgpXG4gICAgfVxuICB9XG5cbiAgYWRkTWludXRlKCkge1xuICAgIHRoaXMubWludXRlcysrO1xuICAgIGlmICh0aGlzLm1pbnV0ZXMgPiA1OSkge1xuICAgICAgdGhpcy5taW51dGVzID0gMDtcbiAgICAgIHRoaXMuYWRkSG91cigpXG4gICAgfVxuICB9XG5cbiAgYWRkU2Vjb25kKCkge1xuICAgIHRoaXMuc2Vjb25kcysrO1xuICAgIGlmICh0aGlzLnNlY29uZHMgPiA1OSkge1xuICAgICAgdGhpcy5zZWNvbmRzID0gMDtcbiAgICAgIHRoaXMuYWRkTWludXRlKClcbiAgICB9XG4gIH1cblxuXG5cblxuICByZW1vdmVZZWFyKCkge1xuICAgIHRoaXMueWVhci0tO1xuICAgIGlmICh0aGlzLnllYXIgPT09IDApIHtcbiAgICAgIHRoaXMueWVhciA9IC0xO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXkgPiB0aGlzLmxlbmd0aE9mTW9udGgoKSkge1xuICAgICAgdGhpcy5kYXkgPSB0aGlzLmxlbmd0aE9mTW9udGgoKVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1vbnRoKCkge1xuICAgIHRoaXMubW9udGgtLTtcblxuICAgIGlmICh0aGlzLm1vbnRoIDwgMSkge1xuICAgICAgdGhpcy5tb250aCA9IDEyO1xuICAgICAgdGhpcy5yZW1vdmVZZWFyKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuZGF5ID4gdGhpcy5sZW5ndGhPZk1vbnRoKCkpIHtcbiAgICAgIHRoaXMuZGF5ID0gdGhpcy5sZW5ndGhPZk1vbnRoKClcbiAgICB9XG4gIH1cblxuICByZW1vdmVEYXkoKSB7XG4gICAgdGhpcy5kYXktLTtcbiAgICBpZiAodGhpcy5kYXkgPCAxKSB7XG4gICAgICB0aGlzLnJlbW92ZU1vbnRoKClcbiAgICAgIHRoaXMuZGF5ID0gdGhpcy5sZW5ndGhPZk1vbnRoKCk7XG4gICAgfVxuICB9XG5cblxuICByZW1vdmVIb3VyKCkge1xuICAgIHRoaXMuaG91cnMtLTtcbiAgICBpZiAodGhpcy5ob3VycyA8IDAgfHwgIXRoaXMuaG91cnMpIHtcbiAgICAgIHRoaXMuaG91cnMgPSAyMztcbiAgICAgIHRoaXMucmVtb3ZlRGF5KClcbiAgICB9XG4gIH1cblxuICByZW1vdmVNaW51dGUoKSB7XG4gICAgdGhpcy5taW51dGVzLS07XG4gICAgaWYgKHRoaXMubWludXRlcyA8IDAgfHwgIXRoaXMubWludXRlcykge1xuICAgICAgdGhpcy5taW51dGVzID0gNTk7XG4gICAgICB0aGlzLnJlbW92ZUhvdXIoKVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVNlY29uZCgpIHtcbiAgICB0aGlzLnNlY29uZHMtLTtcbiAgICBpZiAodGhpcy5zZWNvbmRzIDwgMCB8fCAhdGhpcy5zZWNvbmRzKSB7XG4gICAgICB0aGlzLnNlY29uZHMgPSA1OTtcbiAgICAgIHRoaXMucmVtb3ZlTWludXRlKClcbiAgICB9XG4gIH1cblxuXG4gIGFkZERheXMocXVhbnRpdHk6IG51bWJlcikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVhbnRpdHk7IGkrKykge1xuICAgICAgdGhpcy5hZGREYXkoKTtcbiAgICB9O1xuICB9XG5cbiAgYWRkTW9udGhzKHF1YW50aXR5OiBudW1iZXIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1YW50aXR5OyBpKyspIHtcbiAgICAgIHRoaXMuYWRkTW9udGgoKTtcbiAgICB9O1xuICB9XG5cbiAgYWRkWWVhcnMocXVhbnRpdHk6IG51bWJlcikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVhbnRpdHk7IGkrKykge1xuICAgICAgdGhpcy5hZGRZZWFyKCk7XG4gICAgfTtcbiAgfVxuXG4gIGFkZChkdXJhdGlvbjogR3JhbnVsYXJpdHkpIHtcbiAgICBpZiAoZHVyYXRpb24gPT09ICcxIHllYXInKSB7XG4gICAgICB0aGlzLmFkZFllYXIoKVxuICAgIH1cbiAgICBlbHNlIGlmIChkdXJhdGlvbiA9PT0gJzEgbW9udGgnKSB7XG4gICAgICB0aGlzLmFkZE1vbnRoKClcbiAgICB9XG4gICAgZWxzZSBpZiAoZHVyYXRpb24gPT09ICcxIGRheScpIHtcbiAgICAgIHRoaXMuYWRkRGF5KClcbiAgICB9XG4gICAgZWxzZSBpZiAoZHVyYXRpb24gPT09ICcxIGhvdXInKSB7XG4gICAgICB0aGlzLmFkZEhvdXIoKVxuICAgIH1cbiAgICBlbHNlIGlmIChkdXJhdGlvbiA9PT0gJzEgbWludXRlJykge1xuICAgICAgdGhpcy5hZGRNaW51dGUoKVxuICAgIH1cbiAgICBlbHNlIGlmIChkdXJhdGlvbiA9PT0gJzEgc2Vjb25kJykge1xuICAgICAgdGhpcy5hZGRTZWNvbmQoKVxuICAgIH1cbiAgfVxuXG5cblxuICB0b0xhc3RTZWNvbmRPZihkdXJhdGlvbjogR3JhbnVsYXJpdHkpIHtcbiAgICB0aGlzLmFkZChkdXJhdGlvbik7XG4gICAgdGhpcy5yZW1vdmVTZWNvbmQoKTtcbiAgfVxuXG5cbn1cbiJdfQ==