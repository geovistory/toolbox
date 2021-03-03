/**
 * @fileoverview added by tsickle
 * Generated from: classes/date-time-commons.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLWNvbW1vbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzL3NyYy9saWIvZGF0ZS10aW1lLyIsInNvdXJjZXMiOlsiY2xhc3Nlcy9kYXRlLXRpbWUtY29tbW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFLN0M7Ozs7SUF1RUUseUJBQVksSUFBSzs7OztRQWxFakIsaUJBQVksR0FBK0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQW1FNUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQWhFRCxzQkFBSSxpQ0FBSTs7OztRQUtSO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7Ozs7O1FBUEQsVUFBUyxHQUFXO1lBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQVFELHNCQUFJLGtDQUFLOzs7O1FBS1Q7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzs7Ozs7UUFQRCxVQUFVLEdBQVc7WUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDbEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBUUQsc0JBQUksZ0NBQUc7Ozs7UUFLUDtZQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuQixDQUFDOzs7OztRQVBELFVBQVEsR0FBVztZQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUNoQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFRRCxzQkFBSSxrQ0FBSzs7OztRQUlUO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7Ozs7O1FBTkQsVUFBVSxHQUFXO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLENBQUM7OztPQUFBO0lBUUQsc0JBQUksb0NBQU87Ozs7UUFJWDtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDOzs7OztRQU5ELFVBQVksR0FBVztZQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQVFELHNCQUFJLG9DQUFPOzs7O1FBSVg7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzs7Ozs7UUFORCxVQUFZLEdBQVc7WUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFhRDs7Ozs7Ozs7TUFRRTs7Ozs7Ozs7Ozs7SUFDRix3Q0FBYzs7Ozs7Ozs7OztJQUFkLFVBQWUsS0FBYSxFQUFFLEdBQVcsRUFBRSxNQUFlO1FBRXhELGdEQUFnRDtRQUNoRCxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDcEQsS0FBSyxHQUFHLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDOzs7WUFHdEQsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztZQUdsRSxFQUFFLEdBQUcsQ0FBQztRQUVWLElBQUksTUFBTSxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDdkIsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNSOzs7WUFHSyxFQUFFLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUV2QyxPQUFPLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFHRDs7Ozs7Ozs7TUFRRTs7Ozs7Ozs7Ozs7SUFDRiw4Q0FBb0I7Ozs7Ozs7Ozs7SUFBcEIsVUFBcUIsVUFBa0IsRUFBRSxNQUFlOzs7WUFHaEQsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztZQUdsRSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDOzs7WUFHN0MsRUFBRSxHQUFHLGlCQUFpQixDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7OztZQUdqQyxFQUFFLEdBQUcsQ0FBQztRQUVWLElBQUksTUFBTSxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDdkIsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNSOzs7WUFHRyxHQUFHLEdBQUcsVUFBVSxHQUFHLEVBQUUsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFFbkQscUNBQXFDO1FBQ3JDLElBQUksS0FBSyxHQUFHLEVBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFO1lBRXpCLEtBQUssRUFBRSxDQUFDO1lBRVIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO2dCQUNiLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQzthQUNsQjtZQUVELHVCQUF1QjtZQUN2QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRVAsSUFBSSxNQUFNLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDdkIsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNSO1lBRUQsbUJBQW1CO1lBQ25CLEVBQUUsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFbEMsZ0JBQWdCO1lBQ2hCLEdBQUcsR0FBRyxVQUFVLEdBQUcsRUFBRSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBRWpEO1FBRUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQ3BDLENBQUM7Ozs7SUFFRCx3Q0FBYzs7O0lBQWQ7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1NBQ2QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELHdDQUFjOzs7SUFBZDs7WUFDTSxRQUFxQjtRQUN6QixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFBRSxRQUFRLEdBQUcsUUFBUSxDQUFBO1NBQUU7UUFDdEMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQUUsUUFBUSxHQUFHLFNBQVMsQ0FBQTtTQUFFO1FBQ3hDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUFFLFFBQVEsR0FBRyxPQUFPLENBQUE7U0FBRTtRQUNwQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFBRSxRQUFRLEdBQUcsUUFBUSxDQUFBO1NBQUU7UUFDdkMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQUUsUUFBUSxHQUFHLFVBQVUsQ0FBQTtTQUFFO1FBQzNDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUFFLFFBQVEsR0FBRyxVQUFVLENBQUE7U0FBRTtRQUMzQyxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOzs7O0lBRUQsc0NBQVk7OztJQUFaOztZQUVNLFNBQVMsR0FBRyxFQUFFO1FBQ2xCLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDaEUsU0FBUyxJQUFJLEdBQUcsQ0FBQztRQUNqQixTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDekQsU0FBUyxJQUFJLEdBQUcsQ0FBQztRQUNqQixTQUFTLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDckQsU0FBUyxJQUFJLEdBQUcsQ0FBQztRQUNqQixTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDekQsU0FBUyxJQUFJLEdBQUcsQ0FBQztRQUNqQixTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7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K0JBQXNCOzs7OztJQVd0QixpQ0FBd0I7Ozs7O0lBVXhCLG1DQUEwQjs7Ozs7SUFVMUIsbUNBQTBCOzs7OztJQWUxQiwwREFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbWVQcmltaXRpdmVXaXRoQ2FsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IFllYXJNb250aERheSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuXG5leHBvcnQgdHlwZSBHcmFudWxhcml0eSA9IFRpbWVQcmltaXRpdmVXaXRoQ2FsLkR1cmF0aW9uRW51bVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERhdGVUaW1lQ29tbW9ucyB7XG5cbiAgLyoqXG4gICAqIFByb3BlcnRpZXNcbiAgICovXG4gIG9uRGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPFllYXJNb250aERheT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfeWVhcj86IG51bWJlcjtcblxuICBzZXQgeWVhcih2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX3llYXIgPSB2YWw7XG4gICAgdGhpcy5lbWl0RGF0ZUNoYW5nZSgpO1xuICB9XG5cbiAgZ2V0IHllYXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5feWVhcjtcbiAgfVxuXG4gIHByaXZhdGUgX21vbnRoPzogbnVtYmVyO1xuXG4gIHNldCBtb250aCh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX21vbnRoID0gdmFsO1xuICAgIHRoaXMuZW1pdERhdGVDaGFuZ2UoKTtcbiAgfVxuXG4gIGdldCBtb250aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tb250aDtcbiAgfVxuXG4gIHByaXZhdGUgX2RheT86IG51bWJlcjtcblxuICBzZXQgZGF5KHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fZGF5ID0gdmFsO1xuICAgIHRoaXMuZW1pdERhdGVDaGFuZ2UoKTtcbiAgfVxuXG4gIGdldCBkYXkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZGF5O1xuICB9XG5cbiAgcHJpdmF0ZSBfaG91cnM/OiBudW1iZXI7XG5cbiAgc2V0IGhvdXJzKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5faG91cnMgPSB2YWw7XG4gIH1cblxuICBnZXQgaG91cnMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5faG91cnM7XG4gIH1cblxuICBwcml2YXRlIF9taW51dGVzPzogbnVtYmVyO1xuXG4gIHNldCBtaW51dGVzKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWludXRlcyA9IHZhbDtcbiAgfVxuXG4gIGdldCBtaW51dGVzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21pbnV0ZXM7XG4gIH1cblxuICBwcml2YXRlIF9zZWNvbmRzPzogbnVtYmVyO1xuXG4gIHNldCBzZWNvbmRzKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2Vjb25kcyA9IHZhbDtcbiAgfVxuXG4gIGdldCBzZWNvbmRzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3NlY29uZHM7XG4gIH1cblxuXG4gIGNvbnN0cnVjdG9yKGRhdGE/KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuXG4gIGFic3RyYWN0IGxlbmd0aE9mTW9udGgoKTogbnVtYmVyO1xuXG4gIC8qKlxuICAqIFJldHVybnMgdGhlIHJ1bm5pbmcgZGF5IGZvciBnaXZlbiBtb250aCBhbmQgZGF5IHdpdGggY29uc2lkZXJhdGlvbiBvZiB0aGVcbiAgKiBpc0xlYXAgYm9vbGVhbiB0aGF0IGluZGljYXRlcyBsZWFwIHllYXJzLiBJbnNwaXJlZCBieTpcbiAgKiBodHRwczovL2RlLndpa2lwZWRpYS5vcmcvd2lraS9VbXJlY2hudW5nX3p3aXNjaGVuX2p1bGlhbmlzY2hlbV9EYXR1bV91bmRfanVsaWFuaXNjaGVtX0thbGVuZGVyXG4gICpcbiAgKiBAcGFyYW0gbW9udGggMT1qYW51YXJ5IC4uIDEyPWRlY2VtYmVyXG4gICogQHBhcmFtIGRheSAxLCAyIC4uIDMxXG4gICogQHBhcmFtIGlzTGVhcCBpZiB0cnVlLCB0aGlzIGlzIGEgbGVhcCB5ZWFyXG4gICovXG4gIGNhbGNSdW5uaW5nRGF5KG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyLCBpc0xlYXA6IGJvb2xlYW4pOiBudW1iZXIge1xuXG4gICAgLy8gaWYgbm8gbW9udGggb3IgZGF5IHByb3ZpZGVkLCBsZXQncyBzdGFydCBhdCAxXG4gICAgZGF5ID0gKGRheSA9PT0gdW5kZWZpbmVkIHx8IGRheSA9PT0gbnVsbCkgPyAxIDogZGF5O1xuICAgIG1vbnRoID0gKG1vbnRoID09PSB1bmRlZmluZWQgfHwgbW9udGggPT09IG51bGwpID8gMSA6IG1vbnRoO1xuXG4gICAgLy8gbW9udGggY29ycmVjdGlvbnMgKG5vdGUgdGhhdCBqYW51YXJ5IGhhcyBpbmRleCAwKVxuICAgIGNvbnN0IG1vbnRoQ29ycmVuY3Rpb25zID0gWy0xLCAwLCAtMiwgLTEsIC0xLCAwLCAwLCAxLCArMiwgKzIsICszLCArM107XG5cbiAgICAvLyBsZWFwIHllYXIgY29ycmVjdGlvblxuICAgIGxldCBsYyA9IDA7XG5cbiAgICBpZiAoaXNMZWFwICYmIG1vbnRoID4gMikge1xuICAgICAgbGMgPSAxO1xuICAgIH1cblxuICAgIC8vIG1vbnRoIGNvcnJlY3Rpb25cbiAgICBjb25zdCBtYyA9IG1vbnRoQ29ycmVuY3Rpb25zW21vbnRoIC0gMV07XG5cbiAgICByZXR1cm4gZGF5ICsgKDMwICogKG1vbnRoIC0gMSkpICsgKGxjICsgbWMpO1xuICB9XG5cblxuICAvKipcbiAgKiBSZXR1cm5zIHRoZSBtb250aCBhbmQgZGF5IGZvciBnaXZlbiBydW5uaW5nIGRheSB3aXRoIGNvbnNpZGVyYXRpb24gb2YgdGhlXG4gICogaXNMZWFwIGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgbGVhcCB5ZWFycy4gSW5zcGlyZWQgYnk6XG4gICogaHR0cHM6Ly9kZS53aWtpcGVkaWEub3JnL3dpa2kvVW1yZWNobnVuZ196d2lzY2hlbl9qdWxpYW5pc2NoZW1fRGF0dW1fdW5kX2p1bGlhbmlzY2hlbV9LYWxlbmRlclxuICAqXG4gICogQHBhcmFtIHJ1bm5pbmdEYXkgMSwgMiAuLiAzNjVcbiAgKiBAcGFyYW0gaXNMZWFwIGlmIHRydWUsIHRoaXMgaXMgYSBsZWFwIHllYXJcbiAgKlxuICAqL1xuICBjYWxjRGF0ZUJ5UnVubmluZ0RheShydW5uaW5nRGF5OiBudW1iZXIsIGlzTGVhcDogYm9vbGVhbik6IHsgZGF5OiBudW1iZXIsIG1vbnRoOiBudW1iZXIgfSB7XG5cbiAgICAvLyBtb250aCBjb3JyZWN0aW9ucyAobm90ZSB0aGF0IGphbnVhcnkgaGFzIGluZGV4IDApXG4gICAgY29uc3QgbW9udGhDb3JyZW5jdGlvbnMgPSBbLTEsIDAsIC0yLCAtMSwgLTEsIDAsIDAsIDEsICsyLCArMiwgKzMsICszXTtcblxuICAgIC8vIHJlc3VsdGluZyBtb250aFxuICAgIGxldCBtb250aCA9IE1hdGguZmxvb3IoKHJ1bm5pbmdEYXkgKyAxKSAvIDMwKSArIDE7XG5cbiAgICAvLyBtb250aCBjb3JyZWN0aW9uXG4gICAgbGV0IG1jID0gbW9udGhDb3JyZW5jdGlvbnNbbW9udGggLSAxXTtcblxuICAgIC8vIGxlYXAgeWVhciBjb3JyZWN0aW9uXG4gICAgbGV0IGxjID0gMDtcblxuICAgIGlmIChpc0xlYXAgJiYgbW9udGggPiAyKSB7XG4gICAgICBsYyA9IDE7XG4gICAgfVxuXG4gICAgLy8gcmVzdWx0aW5nIGRheVxuICAgIGxldCBkYXkgPSBydW5uaW5nRGF5IC0gMzAgKiAobW9udGggLSAxKSAtIChsYyArIG1jKTtcblxuICAgIC8vIGNoZWNrIGlmIG1vbnRoIGFuZCBkYXkgc3RpbGwgdmFsaWRcbiAgICBpZiAobW9udGggPiAxMiB8fCBkYXkgPCAxKSB7XG5cbiAgICAgIG1vbnRoLS07XG5cbiAgICAgIGlmIChtb250aCA8IDEpIHtcbiAgICAgICAgaXNMZWFwID0gIWlzTGVhcDtcbiAgICAgIH1cblxuICAgICAgLy8gbGVhcCB5ZWFyIGNvcnJlY3Rpb25cbiAgICAgIGxjID0gMDtcblxuICAgICAgaWYgKGlzTGVhcCAmJiBtb250aCA+IDIpIHtcbiAgICAgICAgbGMgPSAxO1xuICAgICAgfVxuXG4gICAgICAvLyBtb250aCBjb3JyZWN0aW9uXG4gICAgICBtYyA9IG1vbnRoQ29ycmVuY3Rpb25zW21vbnRoIC0gMV07XG5cbiAgICAgIC8vIHJlc3VsdGluZyBkYXlcbiAgICAgIGRheSA9IHJ1bm5pbmdEYXkgLSAzMCAqIChtb250aCAtIDEpIC0gKGxjICsgbWMpO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIHsgZGF5OiBkYXksIG1vbnRoOiBtb250aCB9O1xuICB9XG5cbiAgZW1pdERhdGVDaGFuZ2UoKSB7XG4gICAgdGhpcy5vbkRhdGVDaGFuZ2UuZW1pdCh7XG4gICAgICB5ZWFyOiB0aGlzLnllYXIsXG4gICAgICBtb250aDogdGhpcy5tb250aCxcbiAgICAgIGRheTogdGhpcy5kYXlcbiAgICB9KTtcbiAgfVxuXG4gIGdldEdyYW51bGFyaXR5KCk6IEdyYW51bGFyaXR5IHtcbiAgICBsZXQgZHVyYXRpb246IEdyYW51bGFyaXR5O1xuICAgIGlmICh0aGlzLnllYXIpIHsgZHVyYXRpb24gPSAnMSB5ZWFyJyB9XG4gICAgaWYgKHRoaXMubW9udGgpIHsgZHVyYXRpb24gPSAnMSBtb250aCcgfVxuICAgIGlmICh0aGlzLmRheSkgeyBkdXJhdGlvbiA9ICcxIGRheScgfVxuICAgIGlmICh0aGlzLmhvdXJzKSB7IGR1cmF0aW9uID0gJzEgaG91cicgfVxuICAgIGlmICh0aGlzLm1pbnV0ZXMpIHsgZHVyYXRpb24gPSAnMSBtaW51dGUnIH1cbiAgICBpZiAodGhpcy5zZWNvbmRzKSB7IGR1cmF0aW9uID0gJzEgc2Vjb25kJyB9XG4gICAgcmV0dXJuIGR1cmF0aW9uO1xuICB9XG5cbiAgZ2V0VGltZVN0YW1wKCk6IHN0cmluZyB7XG5cbiAgICBsZXQgdGltZXN0YW1wID0gJyc7XG4gICAgdGltZXN0YW1wID0gdGhpcy55ZWFyID8gdGhpcy5wYWQoTWF0aC5hYnModGhpcy55ZWFyKSwgNCkgOiAnMDEnO1xuICAgIHRpbWVzdGFtcCArPSAnLSc7XG4gICAgdGltZXN0YW1wICs9IHRoaXMubW9udGggPyB0aGlzLnBhZCh0aGlzLm1vbnRoLCAyKSA6ICcwMSc7XG4gICAgdGltZXN0YW1wICs9ICctJztcbiAgICB0aW1lc3RhbXAgKz0gdGhpcy5kYXkgPyB0aGlzLnBhZCh0aGlzLmRheSwgMikgOiAnMDEnO1xuICAgIHRpbWVzdGFtcCArPSAnICc7XG4gICAgdGltZXN0YW1wICs9IHRoaXMuaG91cnMgPyB0aGlzLnBhZCh0aGlzLmhvdXJzLCAyKSA6ICcwMCc7XG4gICAgdGltZXN0YW1wICs9ICc6JztcbiAgICB0aW1lc3RhbXAgKz0gdGhpcy5taW51dGVzID8gdGhpcy5wYWQodGhpcy5taW51dGVzLCAyKSA6ICcwMCc7XG4gICAgdGltZXN0YW1wICs9ICc6JztcbiAgICB0aW1lc3RhbXAgKz0gdGhpcy5zZWNvbmRzID8gdGhpcy5wYWQodGhpcy5zZWNvbmRzLCAyKSA6ICcwMCc7XG5cbiAgICB0aW1lc3RhbXAgKz0gdGhpcy55ZWFyIDwgMCA/ICcgQkMnIDogJyc7XG5cbiAgICByZXR1cm4gdGltZXN0YW1wO1xuICB9XG5cbiAgZ2V0RGF0ZSgpOiBEYXRlIHwgbnVsbCB7XG5cbiAgICAvLyB2YWxpZGF0ZVxuICAgIGlmICghdGhpcy55ZWFyICYmIHRoaXMueWVhciAhPT0gMCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKHRoaXMuZGF5ICYmICF0aGlzLm1vbnRoKSByZXR1cm4gbnVsbDtcbiAgICBpZiAodGhpcy5ob3VycyAmJiAhdGhpcy5kYXkpIHJldHVybiBudWxsO1xuICAgIGlmICh0aGlzLm1pbnV0ZXMgJiYgIXRoaXMuaG91cnMpIHJldHVybiBudWxsO1xuICAgIGlmICh0aGlzLnNlY29uZHMgJiYgIXRoaXMuaG91cnMpIHJldHVybiBudWxsO1xuXG4gICAgLy8gY3JlYXQgZGF0ZVxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpXG5cbiAgICBkYXRlLnNldEZ1bGxZZWFyKHRoaXMueWVhciA8IDAgPyB0aGlzLnllYXIgKyAxIDogdGhpcy55ZWFyKTtcblxuICAgIGRhdGUuc2V0TW9udGgoKHRoaXMubW9udGggPyAodGhpcy5tb250aCAtIDEpIDogMCkpO1xuXG4gICAgZGF0ZS5zZXREYXRlKCh0aGlzLmRheSA/IHRoaXMuZGF5IDogMSkpO1xuXG4gICAgZGF0ZS5zZXRIb3Vycyh0aGlzLmhvdXJzID8gdGhpcy5ob3VycyA6IDApXG5cbiAgICBkYXRlLnNldE1pbnV0ZXModGhpcy5taW51dGVzID8gdGhpcy5taW51dGVzIDogMClcblxuICAgIGRhdGUuc2V0U2Vjb25kcyh0aGlzLnNlY29uZHMgPyB0aGlzLnNlY29uZHMgOiAwKVxuXG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cblxuICBwYWQobnVtYmVyOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIHo6IHN0cmluZyA9ICcwJyk6IHN0cmluZyB7XG4gICAgY29uc3QgbiA9IG51bWJlci50b1N0cmluZygpO1xuICAgIHJldHVybiBuLmxlbmd0aCA+PSB3aWR0aCA/IG4gOiBuZXcgQXJyYXkod2lkdGggLSBuLmxlbmd0aCArIDEpLmpvaW4oeikgKyBuO1xuICB9XG5cblxuICBhZGRZZWFyKCkge1xuICAgIHRoaXMueWVhcisrO1xuICAgIGlmICh0aGlzLnllYXIgPT09IDApIHRoaXMueWVhcisrO1xuICAgIGlmICh0aGlzLmRheSA+IHRoaXMubGVuZ3RoT2ZNb250aCgpKSB7XG4gICAgICB0aGlzLmRheSA9IHRoaXMubGVuZ3RoT2ZNb250aCgpXG4gICAgfVxuICB9XG5cbiAgYWRkTW9udGgoKSB7XG4gICAgdGhpcy5tb250aCsrO1xuXG5cbiAgICBpZiAodGhpcy5tb250aCA+IDEyKSB7XG4gICAgICB0aGlzLm1vbnRoID0gMVxuICAgICAgdGhpcy5hZGRZZWFyKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuZGF5ID4gdGhpcy5sZW5ndGhPZk1vbnRoKCkpIHtcbiAgICAgIHRoaXMuZGF5ID0gdGhpcy5sZW5ndGhPZk1vbnRoKClcbiAgICB9XG4gIH1cblxuICBhZGREYXkoKSB7XG4gICAgdGhpcy5kYXkrKztcbiAgICBpZiAodGhpcy5kYXkgPiB0aGlzLmxlbmd0aE9mTW9udGgoKSkge1xuICAgICAgdGhpcy5kYXkgPSAxO1xuICAgICAgdGhpcy5hZGRNb250aCgpXG4gICAgfVxuICB9XG5cbiAgYWRkSG91cigpIHtcbiAgICB0aGlzLmhvdXJzKys7XG4gICAgaWYgKHRoaXMuaG91cnMgPiAyMykge1xuICAgICAgdGhpcy5ob3VycyA9IDA7XG4gICAgICB0aGlzLmFkZERheSgpXG4gICAgfVxuICB9XG5cbiAgYWRkTWludXRlKCkge1xuICAgIHRoaXMubWludXRlcysrO1xuICAgIGlmICh0aGlzLm1pbnV0ZXMgPiA1OSkge1xuICAgICAgdGhpcy5taW51dGVzID0gMDtcbiAgICAgIHRoaXMuYWRkSG91cigpXG4gICAgfVxuICB9XG5cbiAgYWRkU2Vjb25kKCkge1xuICAgIHRoaXMuc2Vjb25kcysrO1xuICAgIGlmICh0aGlzLnNlY29uZHMgPiA1OSkge1xuICAgICAgdGhpcy5zZWNvbmRzID0gMDtcbiAgICAgIHRoaXMuYWRkTWludXRlKClcbiAgICB9XG4gIH1cblxuXG5cblxuICByZW1vdmVZZWFyKCkge1xuICAgIHRoaXMueWVhci0tO1xuICAgIGlmICh0aGlzLnllYXIgPT09IDApIHtcbiAgICAgIHRoaXMueWVhciA9IC0xO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXkgPiB0aGlzLmxlbmd0aE9mTW9udGgoKSkge1xuICAgICAgdGhpcy5kYXkgPSB0aGlzLmxlbmd0aE9mTW9udGgoKVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1vbnRoKCkge1xuICAgIHRoaXMubW9udGgtLTtcblxuICAgIGlmICh0aGlzLm1vbnRoIDwgMSkge1xuICAgICAgdGhpcy5tb250aCA9IDEyO1xuICAgICAgdGhpcy5yZW1vdmVZZWFyKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuZGF5ID4gdGhpcy5sZW5ndGhPZk1vbnRoKCkpIHtcbiAgICAgIHRoaXMuZGF5ID0gdGhpcy5sZW5ndGhPZk1vbnRoKClcbiAgICB9XG4gIH1cblxuICByZW1vdmVEYXkoKSB7XG4gICAgdGhpcy5kYXktLTtcbiAgICBpZiAodGhpcy5kYXkgPCAxKSB7XG4gICAgICB0aGlzLnJlbW92ZU1vbnRoKClcbiAgICAgIHRoaXMuZGF5ID0gdGhpcy5sZW5ndGhPZk1vbnRoKCk7XG4gICAgfVxuICB9XG5cblxuICByZW1vdmVIb3VyKCkge1xuICAgIHRoaXMuaG91cnMtLTtcbiAgICBpZiAodGhpcy5ob3VycyA8IDAgfHwgIXRoaXMuaG91cnMpIHtcbiAgICAgIHRoaXMuaG91cnMgPSAyMztcbiAgICAgIHRoaXMucmVtb3ZlRGF5KClcbiAgICB9XG4gIH1cblxuICByZW1vdmVNaW51dGUoKSB7XG4gICAgdGhpcy5taW51dGVzLS07XG4gICAgaWYgKHRoaXMubWludXRlcyA8IDAgfHwgIXRoaXMubWludXRlcykge1xuICAgICAgdGhpcy5taW51dGVzID0gNTk7XG4gICAgICB0aGlzLnJlbW92ZUhvdXIoKVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVNlY29uZCgpIHtcbiAgICB0aGlzLnNlY29uZHMtLTtcbiAgICBpZiAodGhpcy5zZWNvbmRzIDwgMCB8fCAhdGhpcy5zZWNvbmRzKSB7XG4gICAgICB0aGlzLnNlY29uZHMgPSA1OTtcbiAgICAgIHRoaXMucmVtb3ZlTWludXRlKClcbiAgICB9XG4gIH1cblxuXG4gIGFkZERheXMocXVhbnRpdHk6IG51bWJlcikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVhbnRpdHk7IGkrKykge1xuICAgICAgdGhpcy5hZGREYXkoKTtcbiAgICB9O1xuICB9XG5cbiAgYWRkTW9udGhzKHF1YW50aXR5OiBudW1iZXIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1YW50aXR5OyBpKyspIHtcbiAgICAgIHRoaXMuYWRkTW9udGgoKTtcbiAgICB9O1xuICB9XG5cbiAgYWRkWWVhcnMocXVhbnRpdHk6IG51bWJlcikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVhbnRpdHk7IGkrKykge1xuICAgICAgdGhpcy5hZGRZZWFyKCk7XG4gICAgfTtcbiAgfVxuXG4gIGFkZChkdXJhdGlvbjogR3JhbnVsYXJpdHkpIHtcbiAgICBpZiAoZHVyYXRpb24gPT09ICcxIHllYXInKSB7XG4gICAgICB0aGlzLmFkZFllYXIoKVxuICAgIH1cbiAgICBlbHNlIGlmIChkdXJhdGlvbiA9PT0gJzEgbW9udGgnKSB7XG4gICAgICB0aGlzLmFkZE1vbnRoKClcbiAgICB9XG4gICAgZWxzZSBpZiAoZHVyYXRpb24gPT09ICcxIGRheScpIHtcbiAgICAgIHRoaXMuYWRkRGF5KClcbiAgICB9XG4gICAgZWxzZSBpZiAoZHVyYXRpb24gPT09ICcxIGhvdXInKSB7XG4gICAgICB0aGlzLmFkZEhvdXIoKVxuICAgIH1cbiAgICBlbHNlIGlmIChkdXJhdGlvbiA9PT0gJzEgbWludXRlJykge1xuICAgICAgdGhpcy5hZGRNaW51dGUoKVxuICAgIH1cbiAgICBlbHNlIGlmIChkdXJhdGlvbiA9PT0gJzEgc2Vjb25kJykge1xuICAgICAgdGhpcy5hZGRTZWNvbmQoKVxuICAgIH1cbiAgfVxuXG5cblxuICB0b0xhc3RTZWNvbmRPZihkdXJhdGlvbjogR3JhbnVsYXJpdHkpIHtcbiAgICB0aGlzLmFkZChkdXJhdGlvbik7XG4gICAgdGhpcy5yZW1vdmVTZWNvbmQoKTtcbiAgfVxuXG5cbn1cbiJdfQ==