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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLWNvbW1vbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9jbGFzc2VzL2RhdGUtdGltZS1jb21tb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUs3Qzs7OztJQXVFRSx5QkFBWSxJQUFLOzs7O1FBbEVqQixpQkFBWSxHQUErQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBbUU1RCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBaEVELHNCQUFJLGlDQUFJOzs7O1FBS1I7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQzs7Ozs7UUFQRCxVQUFTLEdBQVc7WUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDakIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBUUQsc0JBQUksa0NBQUs7Ozs7UUFLVDtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7OztRQVBELFVBQVUsR0FBVztZQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztZQUNsQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFRRCxzQkFBSSxnQ0FBRzs7OztRQUtQO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUM7Ozs7O1FBUEQsVUFBUSxHQUFXO1lBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQVFELHNCQUFJLGtDQUFLOzs7O1FBSVQ7WUFDRSxPQUFPLElBQUksQ0FBQyxN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c0I7Ozs7O0lBV3RCLGlDQUF3Qjs7Ozs7SUFVeEIsbUNBQTBCOzs7OztJQVUxQixtQ0FBMEI7Ozs7O0lBZTFCLDBEQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGltZVByaW1pdGl2ZVdpdGhDYWwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgWWVhck1vbnRoRGF5IH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCB0eXBlIEdyYW51bGFyaXR5ID0gVGltZVByaW1pdGl2ZVdpdGhDYWwuRHVyYXRpb25FbnVtXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGF0ZVRpbWVDb21tb25zIHtcblxuICAvKipcbiAgICogUHJvcGVydGllc1xuICAgKi9cbiAgb25EYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8WWVhck1vbnRoRGF5PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIF95ZWFyPzogbnVtYmVyO1xuXG4gIHNldCB5ZWFyKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5feWVhciA9IHZhbDtcbiAgICB0aGlzLmVtaXREYXRlQ2hhbmdlKCk7XG4gIH1cblxuICBnZXQgeWVhcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl95ZWFyO1xuICB9XG5cbiAgcHJpdmF0ZSBfbW9udGg/OiBudW1iZXI7XG5cbiAgc2V0IG1vbnRoKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fbW9udGggPSB2YWw7XG4gICAgdGhpcy5lbWl0RGF0ZUNoYW5nZSgpO1xuICB9XG5cbiAgZ2V0IG1vbnRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21vbnRoO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGF5PzogbnVtYmVyO1xuXG4gIHNldCBkYXkodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9kYXkgPSB2YWw7XG4gICAgdGhpcy5lbWl0RGF0ZUNoYW5nZSgpO1xuICB9XG5cbiAgZ2V0IGRheSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kYXk7XG4gIH1cblxuICBwcml2YXRlIF9ob3Vycz86IG51bWJlcjtcblxuICBzZXQgaG91cnModmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9ob3VycyA9IHZhbDtcbiAgfVxuXG4gIGdldCBob3VycygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9ob3VycztcbiAgfVxuXG4gIHByaXZhdGUgX21pbnV0ZXM/OiBudW1iZXI7XG5cbiAgc2V0IG1pbnV0ZXModmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9taW51dGVzID0gdmFsO1xuICB9XG5cbiAgZ2V0IG1pbnV0ZXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbWludXRlcztcbiAgfVxuXG4gIHByaXZhdGUgX3NlY29uZHM/OiBudW1iZXI7XG5cbiAgc2V0IHNlY29uZHModmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZWNvbmRzID0gdmFsO1xuICB9XG5cbiAgZ2V0IHNlY29uZHMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2Vjb25kcztcbiAgfVxuXG5cbiAgY29uc3RydWN0b3IoZGF0YT8pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG5cbiAgYWJzdHJhY3QgbGVuZ3RoT2ZNb250aCgpOiBudW1iZXI7XG5cbiAgLyoqXG4gICogUmV0dXJucyB0aGUgcnVubmluZyBkYXkgZm9yIGdpdmVuIG1vbnRoIGFuZCBkYXkgd2l0aCBjb25zaWRlcmF0aW9uIG9mIHRoZVxuICAqIGlzTGVhcCBib29sZWFuIHRoYXQgaW5kaWNhdGVzIGxlYXAgeWVhcnMuIEluc3BpcmVkIGJ5OlxuICAqIGh0dHBzOi8vZGUud2lraXBlZGlhLm9yZy93aWtpL1VtcmVjaG51bmdfendpc2NoZW5fanVsaWFuaXNjaGVtX0RhdHVtX3VuZF9qdWxpYW5pc2NoZW1fS2FsZW5kZXJcbiAgKlxuICAqIEBwYXJhbSBtb250aCAxPWphbnVhcnkgLi4gMTI9ZGVjZW1iZXJcbiAgKiBAcGFyYW0gZGF5IDEsIDIgLi4gMzFcbiAgKiBAcGFyYW0gaXNMZWFwIGlmIHRydWUsIHRoaXMgaXMgYSBsZWFwIHllYXJcbiAgKi9cbiAgY2FsY1J1bm5pbmdEYXkobW9udGg6IG51bWJlciwgZGF5OiBudW1iZXIsIGlzTGVhcDogYm9vbGVhbik6IG51bWJlciB7XG5cbiAgICAvLyBpZiBubyBtb250aCBvciBkYXkgcHJvdmlkZWQsIGxldCdzIHN0YXJ0IGF0IDFcbiAgICBkYXkgPSAoZGF5ID09PSB1bmRlZmluZWQgfHwgZGF5ID09PSBudWxsKSA/IDEgOiBkYXk7XG4gICAgbW9udGggPSAobW9udGggPT09IHVuZGVmaW5lZCB8fCBtb250aCA9PT0gbnVsbCkgPyAxIDogbW9udGg7XG5cbiAgICAvLyBtb250aCBjb3JyZWN0aW9ucyAobm90ZSB0aGF0IGphbnVhcnkgaGFzIGluZGV4IDApXG4gICAgY29uc3QgbW9udGhDb3JyZW5jdGlvbnMgPSBbLTEsIDAsIC0yLCAtMSwgLTEsIDAsIDAsIDEsICsyLCArMiwgKzMsICszXTtcblxuICAgIC8vIGxlYXAgeWVhciBjb3JyZWN0aW9uXG4gICAgbGV0IGxjID0gMDtcblxuICAgIGlmIChpc0xlYXAgJiYgbW9udGggPiAyKSB7XG4gICAgICBsYyA9IDE7XG4gICAgfVxuXG4gICAgLy8gbW9udGggY29ycmVjdGlvblxuICAgIGNvbnN0IG1jID0gbW9udGhDb3JyZW5jdGlvbnNbbW9udGggLSAxXTtcblxuICAgIHJldHVybiBkYXkgKyAoMzAgKiAobW9udGggLSAxKSkgKyAobGMgKyBtYyk7XG4gIH1cblxuXG4gIC8qKlxuICAqIFJldHVybnMgdGhlIG1vbnRoIGFuZCBkYXkgZm9yIGdpdmVuIHJ1bm5pbmcgZGF5IHdpdGggY29uc2lkZXJhdGlvbiBvZiB0aGVcbiAgKiBpc0xlYXAgYm9vbGVhbiB0aGF0IGluZGljYXRlcyBsZWFwIHllYXJzLiBJbnNwaXJlZCBieTpcbiAgKiBodHRwczovL2RlLndpa2lwZWRpYS5vcmcvd2lraS9VbXJlY2hudW5nX3p3aXNjaGVuX2p1bGlhbmlzY2hlbV9EYXR1bV91bmRfanVsaWFuaXNjaGVtX0thbGVuZGVyXG4gICpcbiAgKiBAcGFyYW0gcnVubmluZ0RheSAxLCAyIC4uIDM2NVxuICAqIEBwYXJhbSBpc0xlYXAgaWYgdHJ1ZSwgdGhpcyBpcyBhIGxlYXAgeWVhclxuICAqXG4gICovXG4gIGNhbGNEYXRlQnlSdW5uaW5nRGF5KHJ1bm5pbmdEYXk6IG51bWJlciwgaXNMZWFwOiBib29sZWFuKTogeyBkYXk6IG51bWJlciwgbW9udGg6IG51bWJlciB9IHtcblxuICAgIC8vIG1vbnRoIGNvcnJlY3Rpb25zIChub3RlIHRoYXQgamFudWFyeSBoYXMgaW5kZXggMClcbiAgICBjb25zdCBtb250aENvcnJlbmN0aW9ucyA9IFstMSwgMCwgLTIsIC0xLCAtMSwgMCwgMCwgMSwgKzIsICsyLCArMywgKzNdO1xuXG4gICAgLy8gcmVzdWx0aW5nIG1vbnRoXG4gICAgbGV0IG1vbnRoID0gTWF0aC5mbG9vcigocnVubmluZ0RheSArIDEpIC8gMzApICsgMTtcblxuICAgIC8vIG1vbnRoIGNvcnJlY3Rpb25cbiAgICBsZXQgbWMgPSBtb250aENvcnJlbmN0aW9uc1ttb250aCAtIDFdO1xuXG4gICAgLy8gbGVhcCB5ZWFyIGNvcnJlY3Rpb25cbiAgICBsZXQgbGMgPSAwO1xuXG4gICAgaWYgKGlzTGVhcCAmJiBtb250aCA+IDIpIHtcbiAgICAgIGxjID0gMTtcbiAgICB9XG5cbiAgICAvLyByZXN1bHRpbmcgZGF5XG4gICAgbGV0IGRheSA9IHJ1bm5pbmdEYXkgLSAzMCAqIChtb250aCAtIDEpIC0gKGxjICsgbWMpO1xuXG4gICAgLy8gY2hlY2sgaWYgbW9udGggYW5kIGRheSBzdGlsbCB2YWxpZFxuICAgIGlmIChtb250aCA+IDEyIHx8IGRheSA8IDEpIHtcblxuICAgICAgbW9udGgtLTtcblxuICAgICAgaWYgKG1vbnRoIDwgMSkge1xuICAgICAgICBpc0xlYXAgPSAhaXNMZWFwO1xuICAgICAgfVxuXG4gICAgICAvLyBsZWFwIHllYXIgY29ycmVjdGlvblxuICAgICAgbGMgPSAwO1xuXG4gICAgICBpZiAoaXNMZWFwICYmIG1vbnRoID4gMikge1xuICAgICAgICBsYyA9IDE7XG4gICAgICB9XG5cbiAgICAgIC8vIG1vbnRoIGNvcnJlY3Rpb25cbiAgICAgIG1jID0gbW9udGhDb3JyZW5jdGlvbnNbbW9udGggLSAxXTtcblxuICAgICAgLy8gcmVzdWx0aW5nIGRheVxuICAgICAgZGF5ID0gcnVubmluZ0RheSAtIDMwICogKG1vbnRoIC0gMSkgLSAobGMgKyBtYyk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4geyBkYXk6IGRheSwgbW9udGg6IG1vbnRoIH07XG4gIH1cblxuICBlbWl0RGF0ZUNoYW5nZSgpIHtcbiAgICB0aGlzLm9uRGF0ZUNoYW5nZS5lbWl0KHtcbiAgICAgIHllYXI6IHRoaXMueWVhcixcbiAgICAgIG1vbnRoOiB0aGlzLm1vbnRoLFxuICAgICAgZGF5OiB0aGlzLmRheVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0R3JhbnVsYXJpdHkoKTogR3JhbnVsYXJpdHkge1xuICAgIGxldCBkdXJhdGlvbjogR3JhbnVsYXJpdHk7XG4gICAgaWYgKHRoaXMueWVhcikgeyBkdXJhdGlvbiA9ICcxIHllYXInIH1cbiAgICBpZiAodGhpcy5tb250aCkgeyBkdXJhdGlvbiA9ICcxIG1vbnRoJyB9XG4gICAgaWYgKHRoaXMuZGF5KSB7IGR1cmF0aW9uID0gJzEgZGF5JyB9XG4gICAgaWYgKHRoaXMuaG91cnMpIHsgZHVyYXRpb24gPSAnMSBob3VyJyB9XG4gICAgaWYgKHRoaXMubWludXRlcykgeyBkdXJhdGlvbiA9ICcxIG1pbnV0ZScgfVxuICAgIGlmICh0aGlzLnNlY29uZHMpIHsgZHVyYXRpb24gPSAnMSBzZWNvbmQnIH1cbiAgICByZXR1cm4gZHVyYXRpb247XG4gIH1cblxuICBnZXRUaW1lU3RhbXAoKTogc3RyaW5nIHtcblxuICAgIGxldCB0aW1lc3RhbXAgPSAnJztcbiAgICB0aW1lc3RhbXAgPSB0aGlzLnllYXIgPyB0aGlzLnBhZChNYXRoLmFicyh0aGlzLnllYXIpLCA0KSA6ICcwMSc7XG4gICAgdGltZXN0YW1wICs9ICctJztcbiAgICB0aW1lc3RhbXAgKz0gdGhpcy5tb250aCA/IHRoaXMucGFkKHRoaXMubW9udGgsIDIpIDogJzAxJztcbiAgICB0aW1lc3RhbXAgKz0gJy0nO1xuICAgIHRpbWVzdGFtcCArPSB0aGlzLmRheSA/IHRoaXMucGFkKHRoaXMuZGF5LCAyKSA6ICcwMSc7XG4gICAgdGltZXN0YW1wICs9ICcgJztcbiAgICB0aW1lc3RhbXAgKz0gdGhpcy5ob3VycyA/IHRoaXMucGFkKHRoaXMuaG91cnMsIDIpIDogJzAwJztcbiAgICB0aW1lc3RhbXAgKz0gJzonO1xuICAgIHRpbWVzdGFtcCArPSB0aGlzLm1pbnV0ZXMgPyB0aGlzLnBhZCh0aGlzLm1pbnV0ZXMsIDIpIDogJzAwJztcbiAgICB0aW1lc3RhbXAgKz0gJzonO1xuICAgIHRpbWVzdGFtcCArPSB0aGlzLnNlY29uZHMgPyB0aGlzLnBhZCh0aGlzLnNlY29uZHMsIDIpIDogJzAwJztcblxuICAgIHRpbWVzdGFtcCArPSB0aGlzLnllYXIgPCAwID8gJyBCQycgOiAnJztcblxuICAgIHJldHVybiB0aW1lc3RhbXA7XG4gIH1cblxuICBnZXREYXRlKCk6IERhdGUgfCBudWxsIHtcblxuICAgIC8vIHZhbGlkYXRlXG4gICAgaWYgKCF0aGlzLnllYXIgJiYgdGhpcy55ZWFyICE9PSAwKSByZXR1cm4gbnVsbDtcbiAgICBpZiAodGhpcy5kYXkgJiYgIXRoaXMubW9udGgpIHJldHVybiBudWxsO1xuICAgIGlmICh0aGlzLmhvdXJzICYmICF0aGlzLmRheSkgcmV0dXJuIG51bGw7XG4gICAgaWYgKHRoaXMubWludXRlcyAmJiAhdGhpcy5ob3VycykgcmV0dXJuIG51bGw7XG4gICAgaWYgKHRoaXMuc2Vjb25kcyAmJiAhdGhpcy5ob3VycykgcmV0dXJuIG51bGw7XG5cbiAgICAvLyBjcmVhdCBkYXRlXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKClcblxuICAgIGRhdGUuc2V0RnVsbFllYXIodGhpcy55ZWFyIDwgMCA/IHRoaXMueWVhciArIDEgOiB0aGlzLnllYXIpO1xuXG4gICAgZGF0ZS5zZXRNb250aCgodGhpcy5tb250aCA/ICh0aGlzLm1vbnRoIC0gMSkgOiAwKSk7XG5cbiAgICBkYXRlLnNldERhdGUoKHRoaXMuZGF5ID8gdGhpcy5kYXkgOiAxKSk7XG5cbiAgICBkYXRlLnNldEhvdXJzKHRoaXMuaG91cnMgPyB0aGlzLmhvdXJzIDogMClcblxuICAgIGRhdGUuc2V0TWludXRlcyh0aGlzLm1pbnV0ZXMgPyB0aGlzLm1pbnV0ZXMgOiAwKVxuXG4gICAgZGF0ZS5zZXRTZWNvbmRzKHRoaXMuc2Vjb25kcyA/IHRoaXMuc2Vjb25kcyA6IDApXG5cbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxuXG4gIHBhZChudW1iZXI6IG51bWJlciwgd2lkdGg6IG51bWJlciwgejogc3RyaW5nID0gJzAnKTogc3RyaW5nIHtcbiAgICBjb25zdCBuID0gbnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgcmV0dXJuIG4ubGVuZ3RoID49IHdpZHRoID8gbiA6IG5ldyBBcnJheSh3aWR0aCAtIG4ubGVuZ3RoICsgMSkuam9pbih6KSArIG47XG4gIH1cblxuXG4gIGFkZFllYXIoKSB7XG4gICAgdGhpcy55ZWFyKys7XG4gICAgaWYgKHRoaXMueWVhciA9PT0gMCkgdGhpcy55ZWFyKys7XG4gICAgaWYgKHRoaXMuZGF5ID4gdGhpcy5sZW5ndGhPZk1vbnRoKCkpIHtcbiAgICAgIHRoaXMuZGF5ID0gdGhpcy5sZW5ndGhPZk1vbnRoKClcbiAgICB9XG4gIH1cblxuICBhZGRNb250aCgpIHtcbiAgICB0aGlzLm1vbnRoKys7XG5cblxuICAgIGlmICh0aGlzLm1vbnRoID4gMTIpIHtcbiAgICAgIHRoaXMubW9udGggPSAxXG4gICAgICB0aGlzLmFkZFllYXIoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5kYXkgPiB0aGlzLmxlbmd0aE9mTW9udGgoKSkge1xuICAgICAgdGhpcy5kYXkgPSB0aGlzLmxlbmd0aE9mTW9udGgoKVxuICAgIH1cbiAgfVxuXG4gIGFkZERheSgpIHtcbiAgICB0aGlzLmRheSsrO1xuICAgIGlmICh0aGlzLmRheSA+IHRoaXMubGVuZ3RoT2ZNb250aCgpKSB7XG4gICAgICB0aGlzLmRheSA9IDE7XG4gICAgICB0aGlzLmFkZE1vbnRoKClcbiAgICB9XG4gIH1cblxuICBhZGRIb3VyKCkge1xuICAgIHRoaXMuaG91cnMrKztcbiAgICBpZiAodGhpcy5ob3VycyA+IDIzKSB7XG4gICAgICB0aGlzLmhvdXJzID0gMDtcbiAgICAgIHRoaXMuYWRkRGF5KClcbiAgICB9XG4gIH1cblxuICBhZGRNaW51dGUoKSB7XG4gICAgdGhpcy5taW51dGVzKys7XG4gICAgaWYgKHRoaXMubWludXRlcyA+IDU5KSB7XG4gICAgICB0aGlzLm1pbnV0ZXMgPSAwO1xuICAgICAgdGhpcy5hZGRIb3VyKClcbiAgICB9XG4gIH1cblxuICBhZGRTZWNvbmQoKSB7XG4gICAgdGhpcy5zZWNvbmRzKys7XG4gICAgaWYgKHRoaXMuc2Vjb25kcyA+IDU5KSB7XG4gICAgICB0aGlzLnNlY29uZHMgPSAwO1xuICAgICAgdGhpcy5hZGRNaW51dGUoKVxuICAgIH1cbiAgfVxuXG5cblxuXG4gIHJlbW92ZVllYXIoKSB7XG4gICAgdGhpcy55ZWFyLS07XG4gICAgaWYgKHRoaXMueWVhciA9PT0gMCkge1xuICAgICAgdGhpcy55ZWFyID0gLTE7XG4gICAgfVxuICAgIGlmICh0aGlzLmRheSA+IHRoaXMubGVuZ3RoT2ZNb250aCgpKSB7XG4gICAgICB0aGlzLmRheSA9IHRoaXMubGVuZ3RoT2ZNb250aCgpXG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTW9udGgoKSB7XG4gICAgdGhpcy5tb250aC0tO1xuXG4gICAgaWYgKHRoaXMubW9udGggPCAxKSB7XG4gICAgICB0aGlzLm1vbnRoID0gMTI7XG4gICAgICB0aGlzLnJlbW92ZVllYXIoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5kYXkgPiB0aGlzLmxlbmd0aE9mTW9udGgoKSkge1xuICAgICAgdGhpcy5kYXkgPSB0aGlzLmxlbmd0aE9mTW9udGgoKVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZURheSgpIHtcbiAgICB0aGlzLmRheS0tO1xuICAgIGlmICh0aGlzLmRheSA8IDEpIHtcbiAgICAgIHRoaXMucmVtb3ZlTW9udGgoKVxuICAgICAgdGhpcy5kYXkgPSB0aGlzLmxlbmd0aE9mTW9udGgoKTtcbiAgICB9XG4gIH1cblxuXG4gIHJlbW92ZUhvdXIoKSB7XG4gICAgdGhpcy5ob3Vycy0tO1xuICAgIGlmICh0aGlzLmhvdXJzIDwgMCB8fCAhdGhpcy5ob3Vycykge1xuICAgICAgdGhpcy5ob3VycyA9IDIzO1xuICAgICAgdGhpcy5yZW1vdmVEYXkoKVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1pbnV0ZSgpIHtcbiAgICB0aGlzLm1pbnV0ZXMtLTtcbiAgICBpZiAodGhpcy5taW51dGVzIDwgMCB8fCAhdGhpcy5taW51dGVzKSB7XG4gICAgICB0aGlzLm1pbnV0ZXMgPSA1OTtcbiAgICAgIHRoaXMucmVtb3ZlSG91cigpXG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlU2Vjb25kKCkge1xuICAgIHRoaXMuc2Vjb25kcy0tO1xuICAgIGlmICh0aGlzLnNlY29uZHMgPCAwIHx8ICF0aGlzLnNlY29uZHMpIHtcbiAgICAgIHRoaXMuc2Vjb25kcyA9IDU5O1xuICAgICAgdGhpcy5yZW1vdmVNaW51dGUoKVxuICAgIH1cbiAgfVxuXG5cbiAgYWRkRGF5cyhxdWFudGl0eTogbnVtYmVyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWFudGl0eTsgaSsrKSB7XG4gICAgICB0aGlzLmFkZERheSgpO1xuICAgIH07XG4gIH1cblxuICBhZGRNb250aHMocXVhbnRpdHk6IG51bWJlcikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVhbnRpdHk7IGkrKykge1xuICAgICAgdGhpcy5hZGRNb250aCgpO1xuICAgIH07XG4gIH1cblxuICBhZGRZZWFycyhxdWFudGl0eTogbnVtYmVyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWFudGl0eTsgaSsrKSB7XG4gICAgICB0aGlzLmFkZFllYXIoKTtcbiAgICB9O1xuICB9XG5cbiAgYWRkKGR1cmF0aW9uOiBHcmFudWxhcml0eSkge1xuICAgIGlmIChkdXJhdGlvbiA9PT0gJzEgeWVhcicpIHtcbiAgICAgIHRoaXMuYWRkWWVhcigpXG4gICAgfVxuICAgIGVsc2UgaWYgKGR1cmF0aW9uID09PSAnMSBtb250aCcpIHtcbiAgICAgIHRoaXMuYWRkTW9udGgoKVxuICAgIH1cbiAgICBlbHNlIGlmIChkdXJhdGlvbiA9PT0gJzEgZGF5Jykge1xuICAgICAgdGhpcy5hZGREYXkoKVxuICAgIH1cbiAgICBlbHNlIGlmIChkdXJhdGlvbiA9PT0gJzEgaG91cicpIHtcbiAgICAgIHRoaXMuYWRkSG91cigpXG4gICAgfVxuICAgIGVsc2UgaWYgKGR1cmF0aW9uID09PSAnMSBtaW51dGUnKSB7XG4gICAgICB0aGlzLmFkZE1pbnV0ZSgpXG4gICAgfVxuICAgIGVsc2UgaWYgKGR1cmF0aW9uID09PSAnMSBzZWNvbmQnKSB7XG4gICAgICB0aGlzLmFkZFNlY29uZCgpXG4gICAgfVxuICB9XG5cblxuXG4gIHRvTGFzdFNlY29uZE9mKGR1cmF0aW9uOiBHcmFudWxhcml0eSkge1xuICAgIHRoaXMuYWRkKGR1cmF0aW9uKTtcbiAgICB0aGlzLnJlbW92ZVNlY29uZCgpO1xuICB9XG5cblxufVxuIl19