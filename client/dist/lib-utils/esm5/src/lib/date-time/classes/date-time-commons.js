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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLWNvbW1vbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzL3NyYy9saWIvZGF0ZS10aW1lLyIsInNvdXJjZXMiOlsiY2xhc3Nlcy9kYXRlLXRpbWUtY29tbW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFhN0M7Ozs7SUF1RUUseUJBQVksSUFBSzs7OztRQWxFakIsaUJBQVksR0FBK0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQW1FNUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQWhFRCxzQkFBSSxpQ0FBSTs7OztRQUtSO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7Ozs7O1FBUEQsVUFBUyxHQUFXO1lBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQVFELHNCQUFJLGtDQUFLOzs7O1FBS1Q7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzs7Ozs7UUFQRCxVQUFVLEdBQVc7WUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDbEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBUUQsc0JBQUksZ0NBQUc7Ozs7UUFLUDtZQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuQixDQUFDOzs7OztRQVBELFVBQVEsR0FBVztZQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUNoQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFRRCxzQkFBSSxrQ0FBSzs7OztRQUlUO1lBQ0UsT0FBTyxJQUFJLENB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O1lBQUUsUUFBUSxHQUFHLFVBQVUsQ0FBQTtTQUFFO1FBQzNDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUFFLFFBQVEsR0FBRyxVQUFVLENBQUE7U0FBRTtRQUMzQyxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOzs7O0lBRUQsc0NBQVk7OztJQUFaOztZQUVNLFNBQVMsR0FBRyxFQUFFO1FBQ2xCLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDaEUsU0FBUyxJQUFJLEdBQUcsQ0FBQztRQUNqQixTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDekQsU0FBUyxJQUFJLEdBQUcsQ0FBQztRQUNqQixTQUFTLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDckQsU0FBUyxJQUFJLEdBQUcsQ0FBQztRQUNqQixTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDekQsU0FBUyxJQUFJLEdBQUcsQ0FBQztRQUNqQixTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7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K0JBQXNCOzs7OztJQVd0QixpQ0FBd0I7Ozs7O0lBVXhCLG1DQUEwQjs7Ozs7SUFVMUIsbUNBQTBCOzs7OztJQWUxQiwwREFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFllYXJNb250aERheSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuXG5leHBvcnQgdHlwZSBHcmFudWxhcml0eSA9XG4gICcxIGNlbnR1cnknIHxcbiAgJzEgZGVjYWRlJyB8XG4gICcxIHllYXInIHxcbiAgJzEgbW9udGgnIHxcbiAgJzEgZGF5JyB8XG4gICcxIGhvdXInIHxcbiAgJzEgbWludXRlJyB8XG4gICcxIHNlY29uZCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRlVGltZUNvbW1vbnMge1xuXG4gIC8qKlxuICAgKiBQcm9wZXJ0aWVzXG4gICAqL1xuICBvbkRhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxZZWFyTW9udGhEYXk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX3llYXI/OiBudW1iZXI7XG5cbiAgc2V0IHllYXIodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl95ZWFyID0gdmFsO1xuICAgIHRoaXMuZW1pdERhdGVDaGFuZ2UoKTtcbiAgfVxuXG4gIGdldCB5ZWFyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3llYXI7XG4gIH1cblxuICBwcml2YXRlIF9tb250aD86IG51bWJlcjtcblxuICBzZXQgbW9udGgodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9tb250aCA9IHZhbDtcbiAgICB0aGlzLmVtaXREYXRlQ2hhbmdlKCk7XG4gIH1cblxuICBnZXQgbW9udGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbW9udGg7XG4gIH1cblxuICBwcml2YXRlIF9kYXk/OiBudW1iZXI7XG5cbiAgc2V0IGRheSh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX2RheSA9IHZhbDtcbiAgICB0aGlzLmVtaXREYXRlQ2hhbmdlKCk7XG4gIH1cblxuICBnZXQgZGF5KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RheTtcbiAgfVxuXG4gIHByaXZhdGUgX2hvdXJzPzogbnVtYmVyO1xuXG4gIHNldCBob3Vycyh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX2hvdXJzID0gdmFsO1xuICB9XG5cbiAgZ2V0IGhvdXJzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2hvdXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWludXRlcz86IG51bWJlcjtcblxuICBzZXQgbWludXRlcyh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX21pbnV0ZXMgPSB2YWw7XG4gIH1cblxuICBnZXQgbWludXRlcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9taW51dGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2Vjb25kcz86IG51bWJlcjtcblxuICBzZXQgc2Vjb25kcyh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX3NlY29uZHMgPSB2YWw7XG4gIH1cblxuICBnZXQgc2Vjb25kcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zZWNvbmRzO1xuICB9XG5cblxuICBjb25zdHJ1Y3RvcihkYXRhPykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cblxuICBhYnN0cmFjdCBsZW5ndGhPZk1vbnRoKCk6IG51bWJlcjtcblxuICAvKipcbiAgKiBSZXR1cm5zIHRoZSBydW5uaW5nIGRheSBmb3IgZ2l2ZW4gbW9udGggYW5kIGRheSB3aXRoIGNvbnNpZGVyYXRpb24gb2YgdGhlXG4gICogaXNMZWFwIGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgbGVhcCB5ZWFycy4gSW5zcGlyZWQgYnk6XG4gICogaHR0cHM6Ly9kZS53aWtpcGVkaWEub3JnL3dpa2kvVW1yZWNobnVuZ196d2lzY2hlbl9qdWxpYW5pc2NoZW1fRGF0dW1fdW5kX2p1bGlhbmlzY2hlbV9LYWxlbmRlclxuICAqXG4gICogQHBhcmFtIG1vbnRoIDE9amFudWFyeSAuLiAxMj1kZWNlbWJlclxuICAqIEBwYXJhbSBkYXkgMSwgMiAuLiAzMVxuICAqIEBwYXJhbSBpc0xlYXAgaWYgdHJ1ZSwgdGhpcyBpcyBhIGxlYXAgeWVhclxuICAqL1xuICBjYWxjUnVubmluZ0RheShtb250aDogbnVtYmVyLCBkYXk6IG51bWJlciwgaXNMZWFwOiBib29sZWFuKTogbnVtYmVyIHtcblxuICAgIC8vIGlmIG5vIG1vbnRoIG9yIGRheSBwcm92aWRlZCwgbGV0J3Mgc3RhcnQgYXQgMVxuICAgIGRheSA9IChkYXkgPT09IHVuZGVmaW5lZCB8fCBkYXkgPT09IG51bGwpID8gMSA6IGRheTtcbiAgICBtb250aCA9IChtb250aCA9PT0gdW5kZWZpbmVkIHx8IG1vbnRoID09PSBudWxsKSA/IDEgOiBtb250aDtcblxuICAgIC8vIG1vbnRoIGNvcnJlY3Rpb25zIChub3RlIHRoYXQgamFudWFyeSBoYXMgaW5kZXggMClcbiAgICBjb25zdCBtb250aENvcnJlbmN0aW9ucyA9IFstMSwgMCwgLTIsIC0xLCAtMSwgMCwgMCwgMSwgKzIsICsyLCArMywgKzNdO1xuXG4gICAgLy8gbGVhcCB5ZWFyIGNvcnJlY3Rpb25cbiAgICBsZXQgbGMgPSAwO1xuXG4gICAgaWYgKGlzTGVhcCAmJiBtb250aCA+IDIpIHtcbiAgICAgIGxjID0gMTtcbiAgICB9XG5cbiAgICAvLyBtb250aCBjb3JyZWN0aW9uXG4gICAgY29uc3QgbWMgPSBtb250aENvcnJlbmN0aW9uc1ttb250aCAtIDFdO1xuXG4gICAgcmV0dXJuIGRheSArICgzMCAqIChtb250aCAtIDEpKSArIChsYyArIG1jKTtcbiAgfVxuXG5cbiAgLyoqXG4gICogUmV0dXJucyB0aGUgbW9udGggYW5kIGRheSBmb3IgZ2l2ZW4gcnVubmluZyBkYXkgd2l0aCBjb25zaWRlcmF0aW9uIG9mIHRoZVxuICAqIGlzTGVhcCBib29sZWFuIHRoYXQgaW5kaWNhdGVzIGxlYXAgeWVhcnMuIEluc3BpcmVkIGJ5OlxuICAqIGh0dHBzOi8vZGUud2lraXBlZGlhLm9yZy93aWtpL1VtcmVjaG51bmdfendpc2NoZW5fanVsaWFuaXNjaGVtX0RhdHVtX3VuZF9qdWxpYW5pc2NoZW1fS2FsZW5kZXJcbiAgKlxuICAqIEBwYXJhbSBydW5uaW5nRGF5IDEsIDIgLi4gMzY1XG4gICogQHBhcmFtIGlzTGVhcCBpZiB0cnVlLCB0aGlzIGlzIGEgbGVhcCB5ZWFyXG4gICpcbiAgKi9cbiAgY2FsY0RhdGVCeVJ1bm5pbmdEYXkocnVubmluZ0RheTogbnVtYmVyLCBpc0xlYXA6IGJvb2xlYW4pOiB7IGRheTogbnVtYmVyLCBtb250aDogbnVtYmVyIH0ge1xuXG4gICAgLy8gbW9udGggY29ycmVjdGlvbnMgKG5vdGUgdGhhdCBqYW51YXJ5IGhhcyBpbmRleCAwKVxuICAgIGNvbnN0IG1vbnRoQ29ycmVuY3Rpb25zID0gWy0xLCAwLCAtMiwgLTEsIC0xLCAwLCAwLCAxLCArMiwgKzIsICszLCArM107XG5cbiAgICAvLyByZXN1bHRpbmcgbW9udGhcbiAgICBsZXQgbW9udGggPSBNYXRoLmZsb29yKChydW5uaW5nRGF5ICsgMSkgLyAzMCkgKyAxO1xuXG4gICAgLy8gbW9udGggY29ycmVjdGlvblxuICAgIGxldCBtYyA9IG1vbnRoQ29ycmVuY3Rpb25zW21vbnRoIC0gMV07XG5cbiAgICAvLyBsZWFwIHllYXIgY29ycmVjdGlvblxuICAgIGxldCBsYyA9IDA7XG5cbiAgICBpZiAoaXNMZWFwICYmIG1vbnRoID4gMikge1xuICAgICAgbGMgPSAxO1xuICAgIH1cblxuICAgIC8vIHJlc3VsdGluZyBkYXlcbiAgICBsZXQgZGF5ID0gcnVubmluZ0RheSAtIDMwICogKG1vbnRoIC0gMSkgLSAobGMgKyBtYyk7XG5cbiAgICAvLyBjaGVjayBpZiBtb250aCBhbmQgZGF5IHN0aWxsIHZhbGlkXG4gICAgaWYgKG1vbnRoID4gMTIgfHwgZGF5IDwgMSkge1xuXG4gICAgICBtb250aC0tO1xuXG4gICAgICBpZiAobW9udGggPCAxKSB7XG4gICAgICAgIGlzTGVhcCA9ICFpc0xlYXA7XG4gICAgICB9XG5cbiAgICAgIC8vIGxlYXAgeWVhciBjb3JyZWN0aW9uXG4gICAgICBsYyA9IDA7XG5cbiAgICAgIGlmIChpc0xlYXAgJiYgbW9udGggPiAyKSB7XG4gICAgICAgIGxjID0gMTtcbiAgICAgIH1cblxuICAgICAgLy8gbW9udGggY29ycmVjdGlvblxuICAgICAgbWMgPSBtb250aENvcnJlbmN0aW9uc1ttb250aCAtIDFdO1xuXG4gICAgICAvLyByZXN1bHRpbmcgZGF5XG4gICAgICBkYXkgPSBydW5uaW5nRGF5IC0gMzAgKiAobW9udGggLSAxKSAtIChsYyArIG1jKTtcblxuICAgIH1cblxuICAgIHJldHVybiB7IGRheTogZGF5LCBtb250aDogbW9udGggfTtcbiAgfVxuXG4gIGVtaXREYXRlQ2hhbmdlKCkge1xuICAgIHRoaXMub25EYXRlQ2hhbmdlLmVtaXQoe1xuICAgICAgeWVhcjogdGhpcy55ZWFyLFxuICAgICAgbW9udGg6IHRoaXMubW9udGgsXG4gICAgICBkYXk6IHRoaXMuZGF5XG4gICAgfSk7XG4gIH1cblxuICBnZXRHcmFudWxhcml0eSgpOiBHcmFudWxhcml0eSB7XG4gICAgbGV0IGR1cmF0aW9uOiBHcmFudWxhcml0eTtcbiAgICBpZiAodGhpcy55ZWFyKSB7IGR1cmF0aW9uID0gJzEgeWVhcicgfVxuICAgIGlmICh0aGlzLm1vbnRoKSB7IGR1cmF0aW9uID0gJzEgbW9udGgnIH1cbiAgICBpZiAodGhpcy5kYXkpIHsgZHVyYXRpb24gPSAnMSBkYXknIH1cbiAgICBpZiAodGhpcy5ob3VycykgeyBkdXJhdGlvbiA9ICcxIGhvdXInIH1cbiAgICBpZiAodGhpcy5taW51dGVzKSB7IGR1cmF0aW9uID0gJzEgbWludXRlJyB9XG4gICAgaWYgKHRoaXMuc2Vjb25kcykgeyBkdXJhdGlvbiA9ICcxIHNlY29uZCcgfVxuICAgIHJldHVybiBkdXJhdGlvbjtcbiAgfVxuXG4gIGdldFRpbWVTdGFtcCgpOiBzdHJpbmcge1xuXG4gICAgbGV0IHRpbWVzdGFtcCA9ICcnO1xuICAgIHRpbWVzdGFtcCA9IHRoaXMueWVhciA/IHRoaXMucGFkKE1hdGguYWJzKHRoaXMueWVhciksIDQpIDogJzAxJztcbiAgICB0aW1lc3RhbXAgKz0gJy0nO1xuICAgIHRpbWVzdGFtcCArPSB0aGlzLm1vbnRoID8gdGhpcy5wYWQodGhpcy5tb250aCwgMikgOiAnMDEnO1xuICAgIHRpbWVzdGFtcCArPSAnLSc7XG4gICAgdGltZXN0YW1wICs9IHRoaXMuZGF5ID8gdGhpcy5wYWQodGhpcy5kYXksIDIpIDogJzAxJztcbiAgICB0aW1lc3RhbXAgKz0gJyAnO1xuICAgIHRpbWVzdGFtcCArPSB0aGlzLmhvdXJzID8gdGhpcy5wYWQodGhpcy5ob3VycywgMikgOiAnMDAnO1xuICAgIHRpbWVzdGFtcCArPSAnOic7XG4gICAgdGltZXN0YW1wICs9IHRoaXMubWludXRlcyA/IHRoaXMucGFkKHRoaXMubWludXRlcywgMikgOiAnMDAnO1xuICAgIHRpbWVzdGFtcCArPSAnOic7XG4gICAgdGltZXN0YW1wICs9IHRoaXMuc2Vjb25kcyA/IHRoaXMucGFkKHRoaXMuc2Vjb25kcywgMikgOiAnMDAnO1xuXG4gICAgdGltZXN0YW1wICs9IHRoaXMueWVhciA8IDAgPyAnIEJDJyA6ICcnO1xuXG4gICAgcmV0dXJuIHRpbWVzdGFtcDtcbiAgfVxuXG4gIGdldERhdGUoKTogRGF0ZSB8IG51bGwge1xuXG4gICAgLy8gdmFsaWRhdGVcbiAgICBpZiAoIXRoaXMueWVhciAmJiB0aGlzLnllYXIgIT09IDApIHJldHVybiBudWxsO1xuICAgIGlmICh0aGlzLmRheSAmJiAhdGhpcy5tb250aCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKHRoaXMuaG91cnMgJiYgIXRoaXMuZGF5KSByZXR1cm4gbnVsbDtcbiAgICBpZiAodGhpcy5taW51dGVzICYmICF0aGlzLmhvdXJzKSByZXR1cm4gbnVsbDtcbiAgICBpZiAodGhpcy5zZWNvbmRzICYmICF0aGlzLmhvdXJzKSByZXR1cm4gbnVsbDtcblxuICAgIC8vIGNyZWF0IGRhdGVcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKVxuXG4gICAgZGF0ZS5zZXRGdWxsWWVhcih0aGlzLnllYXIgPCAwID8gdGhpcy55ZWFyICsgMSA6IHRoaXMueWVhcik7XG5cbiAgICBkYXRlLnNldE1vbnRoKCh0aGlzLm1vbnRoID8gKHRoaXMubW9udGggLSAxKSA6IDApKTtcblxuICAgIGRhdGUuc2V0RGF0ZSgodGhpcy5kYXkgPyB0aGlzLmRheSA6IDEpKTtcblxuICAgIGRhdGUuc2V0SG91cnModGhpcy5ob3VycyA/IHRoaXMuaG91cnMgOiAwKVxuXG4gICAgZGF0ZS5zZXRNaW51dGVzKHRoaXMubWludXRlcyA/IHRoaXMubWludXRlcyA6IDApXG5cbiAgICBkYXRlLnNldFNlY29uZHModGhpcy5zZWNvbmRzID8gdGhpcy5zZWNvbmRzIDogMClcblxuICAgIHJldHVybiBkYXRlO1xuICB9XG5cbiAgcGFkKG51bWJlcjogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCB6OiBzdHJpbmcgPSAnMCcpOiBzdHJpbmcge1xuICAgIGNvbnN0IG4gPSBudW1iZXIudG9TdHJpbmcoKTtcbiAgICByZXR1cm4gbi5sZW5ndGggPj0gd2lkdGggPyBuIDogbmV3IEFycmF5KHdpZHRoIC0gbi5sZW5ndGggKyAxKS5qb2luKHopICsgbjtcbiAgfVxuXG5cbiAgYWRkWWVhcigpIHtcbiAgICB0aGlzLnllYXIrKztcbiAgICBpZiAodGhpcy55ZWFyID09PSAwKSB0aGlzLnllYXIrKztcbiAgICBpZiAodGhpcy5kYXkgPiB0aGlzLmxlbmd0aE9mTW9udGgoKSkge1xuICAgICAgdGhpcy5kYXkgPSB0aGlzLmxlbmd0aE9mTW9udGgoKVxuICAgIH1cbiAgfVxuXG4gIGFkZE1vbnRoKCkge1xuICAgIHRoaXMubW9udGgrKztcblxuXG4gICAgaWYgKHRoaXMubW9udGggPiAxMikge1xuICAgICAgdGhpcy5tb250aCA9IDFcbiAgICAgIHRoaXMuYWRkWWVhcigpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmRheSA+IHRoaXMubGVuZ3RoT2ZNb250aCgpKSB7XG4gICAgICB0aGlzLmRheSA9IHRoaXMubGVuZ3RoT2ZNb250aCgpXG4gICAgfVxuICB9XG5cbiAgYWRkRGF5KCkge1xuICAgIHRoaXMuZGF5Kys7XG4gICAgaWYgKHRoaXMuZGF5ID4gdGhpcy5sZW5ndGhPZk1vbnRoKCkpIHtcbiAgICAgIHRoaXMuZGF5ID0gMTtcbiAgICAgIHRoaXMuYWRkTW9udGgoKVxuICAgIH1cbiAgfVxuXG4gIGFkZEhvdXIoKSB7XG4gICAgdGhpcy5ob3VycysrO1xuICAgIGlmICh0aGlzLmhvdXJzID4gMjMpIHtcbiAgICAgIHRoaXMuaG91cnMgPSAwO1xuICAgICAgdGhpcy5hZGREYXkoKVxuICAgIH1cbiAgfVxuXG4gIGFkZE1pbnV0ZSgpIHtcbiAgICB0aGlzLm1pbnV0ZXMrKztcbiAgICBpZiAodGhpcy5taW51dGVzID4gNTkpIHtcbiAgICAgIHRoaXMubWludXRlcyA9IDA7XG4gICAgICB0aGlzLmFkZEhvdXIoKVxuICAgIH1cbiAgfVxuXG4gIGFkZFNlY29uZCgpIHtcbiAgICB0aGlzLnNlY29uZHMrKztcbiAgICBpZiAodGhpcy5zZWNvbmRzID4gNTkpIHtcbiAgICAgIHRoaXMuc2Vjb25kcyA9IDA7XG4gICAgICB0aGlzLmFkZE1pbnV0ZSgpXG4gICAgfVxuICB9XG5cblxuXG5cbiAgcmVtb3ZlWWVhcigpIHtcbiAgICB0aGlzLnllYXItLTtcbiAgICBpZiAodGhpcy55ZWFyID09PSAwKSB7XG4gICAgICB0aGlzLnllYXIgPSAtMTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF5ID4gdGhpcy5sZW5ndGhPZk1vbnRoKCkpIHtcbiAgICAgIHRoaXMuZGF5ID0gdGhpcy5sZW5ndGhPZk1vbnRoKClcbiAgICB9XG4gIH1cblxuICByZW1vdmVNb250aCgpIHtcbiAgICB0aGlzLm1vbnRoLS07XG5cbiAgICBpZiAodGhpcy5tb250aCA8IDEpIHtcbiAgICAgIHRoaXMubW9udGggPSAxMjtcbiAgICAgIHRoaXMucmVtb3ZlWWVhcigpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmRheSA+IHRoaXMubGVuZ3RoT2ZNb250aCgpKSB7XG4gICAgICB0aGlzLmRheSA9IHRoaXMubGVuZ3RoT2ZNb250aCgpXG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRGF5KCkge1xuICAgIHRoaXMuZGF5LS07XG4gICAgaWYgKHRoaXMuZGF5IDwgMSkge1xuICAgICAgdGhpcy5yZW1vdmVNb250aCgpXG4gICAgICB0aGlzLmRheSA9IHRoaXMubGVuZ3RoT2ZNb250aCgpO1xuICAgIH1cbiAgfVxuXG5cbiAgcmVtb3ZlSG91cigpIHtcbiAgICB0aGlzLmhvdXJzLS07XG4gICAgaWYgKHRoaXMuaG91cnMgPCAwIHx8ICF0aGlzLmhvdXJzKSB7XG4gICAgICB0aGlzLmhvdXJzID0gMjM7XG4gICAgICB0aGlzLnJlbW92ZURheSgpXG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWludXRlKCkge1xuICAgIHRoaXMubWludXRlcy0tO1xuICAgIGlmICh0aGlzLm1pbnV0ZXMgPCAwIHx8ICF0aGlzLm1pbnV0ZXMpIHtcbiAgICAgIHRoaXMubWludXRlcyA9IDU5O1xuICAgICAgdGhpcy5yZW1vdmVIb3VyKClcbiAgICB9XG4gIH1cblxuICByZW1vdmVTZWNvbmQoKSB7XG4gICAgdGhpcy5zZWNvbmRzLS07XG4gICAgaWYgKHRoaXMuc2Vjb25kcyA8IDAgfHwgIXRoaXMuc2Vjb25kcykge1xuICAgICAgdGhpcy5zZWNvbmRzID0gNTk7XG4gICAgICB0aGlzLnJlbW92ZU1pbnV0ZSgpXG4gICAgfVxuICB9XG5cblxuICBhZGREYXlzKHF1YW50aXR5OiBudW1iZXIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1YW50aXR5OyBpKyspIHtcbiAgICAgIHRoaXMuYWRkRGF5KCk7XG4gICAgfTtcbiAgfVxuXG4gIGFkZE1vbnRocyhxdWFudGl0eTogbnVtYmVyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWFudGl0eTsgaSsrKSB7XG4gICAgICB0aGlzLmFkZE1vbnRoKCk7XG4gICAgfTtcbiAgfVxuXG4gIGFkZFllYXJzKHF1YW50aXR5OiBudW1iZXIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1YW50aXR5OyBpKyspIHtcbiAgICAgIHRoaXMuYWRkWWVhcigpO1xuICAgIH07XG4gIH1cblxuICBhZGQoZHVyYXRpb246IEdyYW51bGFyaXR5KSB7XG4gICAgaWYgKGR1cmF0aW9uID09PSAnMSB5ZWFyJykge1xuICAgICAgdGhpcy5hZGRZZWFyKClcbiAgICB9XG4gICAgZWxzZSBpZiAoZHVyYXRpb24gPT09ICcxIG1vbnRoJykge1xuICAgICAgdGhpcy5hZGRNb250aCgpXG4gICAgfVxuICAgIGVsc2UgaWYgKGR1cmF0aW9uID09PSAnMSBkYXknKSB7XG4gICAgICB0aGlzLmFkZERheSgpXG4gICAgfVxuICAgIGVsc2UgaWYgKGR1cmF0aW9uID09PSAnMSBob3VyJykge1xuICAgICAgdGhpcy5hZGRIb3VyKClcbiAgICB9XG4gICAgZWxzZSBpZiAoZHVyYXRpb24gPT09ICcxIG1pbnV0ZScpIHtcbiAgICAgIHRoaXMuYWRkTWludXRlKClcbiAgICB9XG4gICAgZWxzZSBpZiAoZHVyYXRpb24gPT09ICcxIHNlY29uZCcpIHtcbiAgICAgIHRoaXMuYWRkU2Vjb25kKClcbiAgICB9XG4gIH1cblxuXG5cbiAgdG9MYXN0U2Vjb25kT2YoZHVyYXRpb246IEdyYW51bGFyaXR5KSB7XG4gICAgdGhpcy5hZGQoZHVyYXRpb24pO1xuICAgIHRoaXMucmVtb3ZlU2Vjb25kKCk7XG4gIH1cblxuXG59XG4iXX0=