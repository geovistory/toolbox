/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/classes/gregorian-date-time.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DateTimeCommons } from './date-time-commons';
import { JulianDateTime } from './julian-date-time';
/**
 * Class to represent a Julian Date and Time
 * TODO: Move this class to common folder as it is needed by server and client
 */
var /**
 * Class to represent a Julian Date and Time
 * TODO: Move this class to common folder as it is needed by server and client
 */
GregorianDateTime = /** @class */ (function (_super) {
    tslib_1.__extends(GregorianDateTime, _super);
    function GregorianDateTime() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    GregorianDateTime.prototype.lengthOfMonth = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var y = this.year;
        /** @type {?} */
        var m = this.month;
        if (!(m > 0) && !(m <= 12)) {
            return undefined;
        }
        // Assume not leap year by default (note zero index for Jan)
        /** @type {?} */
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // If evenly divisible by 4 and not evenly divisible by 100,
        // or is evenly divisible by 400, then a leap year
        if (this.isLeapYear()) {
            daysInMonth[1] = 29;
        }
        return daysInMonth[--m];
    };
    /**
     * @param {?=} duration
     * @return {?}
     */
    GregorianDateTime.prototype.getEndOf = /**
     * @param {?=} duration
     * @return {?}
     */
    function (duration) {
        if (duration === void 0) { duration = this.getGranularity(); }
        /** @type {?} */
        var dt = new GregorianDateTime(this);
        dt.toLastSecondOf(duration);
        return dt;
    };
    /**
     * getJulianDay - Implemented according to this page [2018-03-12]:
     * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_gregorianischem_Kalender
     *
     * @return  description
     */
    /**
     * getJulianDay - Implemented according to this page [2018-03-12]:
     * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_gregorianischem_Kalender
     *
     * @return {?} description
     */
    GregorianDateTime.prototype.getJulianDay = /**
     * getJulianDay - Implemented according to this page [2018-03-12]:
     * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_gregorianischem_Kalender
     *
     * @return {?} description
     */
    function () {
        // running day (conut of days that year)
        /** @type {?} */
        var runningDay = this.calcRunningDay(this.month, this.day, this.isLeapYear());
        // running year
        /** @type {?} */
        var runningYear = this.year - 1;
        // julian day of year 1 AD
        /** @type {?} */
        var julianDay0 = 1721426;
        // number of full 400 year cycles
        /** @type {?} */
        var n400 = Math.floor(runningYear / 400);
        // rest of division: number of years of the last uncomplete 400 years cycle
        /** @type {?} */
        var r400 = runningYear % 400;
        // number of full 100 year cycles
        /** @type {?} */
        var n100 = Math.floor(r400 / 100)
        // rest of division: number of years of the last uncomplete 100 years cycle
        ;
        // rest of division: number of years of the last uncomplete 100 years cycle
        /** @type {?} */
        var r100 = r400 % 100;
        // number of full 4 year cycles
        /** @type {?} */
        var n4 = Math.floor(r100 / 4)
        // rest of division: number of full years of the last uncomplete 4 years cycle
        ;
        // rest of division: number of full years of the last uncomplete 4 years cycle
        /** @type {?} */
        var n1 = r100 % 4;
        return julianDay0 + n400 * 146097 + n100 * 36524 + n4 * 1461 + n1 * 365 + runningDay;
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} julianDay
     * @return {THIS}
     */
    GregorianDateTime.prototype.fromJulianDay = /**
     * @template THIS
     * @this {THIS}
     * @param {?} julianDay
     * @return {THIS}
     */
    function (julianDay) {
        if (typeof julianDay === 'string') {
            julianDay = parseInt(julianDay);
        }
        // julian day of year 1 AD
        /** @type {?} */
        var julianDay0 = 1721426;
        /** @type {?} */
        var firstDayOfGregorianCal = 2299161;
        // conversion of julian day earlier than the introduction of
        // the gregorian calendar October 15th of 1582 are calculated
        // with the julian calendar algoritms
        if (julianDay < firstDayOfGregorianCal) {
            /** @type {?} */
            var jdt = new JulianDateTime().fromJulianDay(julianDay);
            (/** @type {?} */ (this)).year = jdt.year;
            (/** @type {?} */ (this)).month = jdt.month;
            (/** @type {?} */ (this)).day = jdt.day;
        }
        else {
            // number of full 400 year cycles
            /** @type {?} */
            var n400 = Math.floor((julianDay - julianDay0) / 146097);
            // number of days of the last uncomplete 400 years cycle
            /** @type {?} */
            var r400 = (julianDay - julianDay0) % 146097;
            // number of full 100 year cycles
            /** @type {?} */
            var n100 = Math.floor(r400 / 36524);
            // number of days of the last uncomplete 100 years cycle
            /** @type {?} */
            var r100 = r400 % 36524;
            if (n100 === 4) {
                n100 = 3;
                r100 = 36524;
            }
            // number of full 4 year cycles
            /** @type {?} */
            var n4 = Math.floor(r100 / 1461);
            // number of days of the last uncomplete 4 years cycle
            /** @type {?} */
            var r4 = r100 % 1461;
            // number of full years of the last uncomplete 4 years cycle
            /** @type {?} */
            var n1 = Math.floor(r4 / 365);
            // number of days in the last year
            /** @type {?} */
            var runningDay = r4 % 365;
            if (n1 === 4) {
                n1 = 3;
                runningDay = 365;
            }
            // running year
            /** @type {?} */
            var runningYear = 400 * n400 + 100 * n100 + 4 * n4 + n1;
            // resulting year
            (/** @type {?} */ (this)).year = runningYear + 1;
            /** @type {?} */
            var monthDay = (/** @type {?} */ (this)).calcDateByRunningDay(runningDay, (/** @type {?} */ (this)).isLeapYear())
            // resulting month
            ;
            // resulting month
            (/** @type {?} */ (this)).month = monthDay.month;
            // resulting day
            (/** @type {?} */ (this)).day = monthDay.day;
        }
        return (/** @type {?} */ (this));
    };
    /**
     * Returns true if given year is a leap year
     */
    /**
     * Returns true if given year is a leap year
     * @return {?}
     */
    GregorianDateTime.prototype.isLeapYear = /**
     * Returns true if given year is a leap year
     * @return {?}
     */
    function () {
        /** @type {?} */
        var year = this.year;
        // Return true if evenly divisible by 4 and not evenly divisible by 100,
        // or is evenly divisible by 400, then a leap year
        return ((!(year % 4) && year % 100) || !(year % 400)) ? true : false;
    };
    /**
     * returns julian day in seconds
     *
     * TODO: return julian day plus time in seconds
     */
    /**
     * returns julian day in seconds
     *
     * TODO: return julian day plus time in seconds
     * @return {?}
     */
    GregorianDateTime.prototype.getJulianSecond = /**
     * returns julian day in seconds
     *
     * TODO: return julian day plus time in seconds
     * @return {?}
     */
    function () {
        /** @type {?} */
        var seconds = this.getJulianDay() * 60 * 60 * 24;
        if (this.seconds > 0)
            seconds = seconds + this.seconds;
        if (this.minutes > 0)
            seconds = seconds + this.minutes * 60;
        if (this.hours > 0)
            seconds = seconds + this.hours * 60 * 60;
        return seconds;
    };
    /**
     * Set this JulianDateTime from given julian second
     * @param julianSecond julian second
     */
    /**
     * Set this JulianDateTime from given julian second
     * @template THIS
     * @this {THIS}
     * @param {?} julianSecond julian second
     * @return {THIS}
     */
    GregorianDateTime.prototype.fromJulianSecond = /**
     * Set this JulianDateTime from given julian second
     * @template THIS
     * @this {THIS}
     * @param {?} julianSecond julian second
     * @return {THIS}
     */
    function (julianSecond) {
        /** @type {?} */
        var secsPerDay = 60 * 60 * 24;
        // number of full days
        /** @type {?} */
        var julianDay = Math.floor(julianSecond / secsPerDay);
        // number of seconds of the julian day
        /** @type {?} */
        var secsOfDay = julianSecond % secsPerDay;
        // number of ours of the day
        (/** @type {?} */ (this)).hours = Math.floor(secsOfDay / (60 * 60));
        // number of seconds of the last hour
        /** @type {?} */
        var secsOfHour = (/** @type {?} */ (this)).hours % (60 * 60);
        // number of ours of the day
        (/** @type {?} */ (this)).minutes = Math.floor(secsOfHour / 60);
        // secs of the last minute
        (/** @type {?} */ (this)).seconds = (/** @type {?} */ (this)).minutes % 60;
        return (/** @type {?} */ (this)).fromJulianDay(julianDay);
    };
    return GregorianDateTime;
}(DateTimeCommons));
/**
 * Class to represent a Julian Date and Time
 * TODO: Move this class to common folder as it is needed by server and client
 */
export { GregorianDateTime };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JlZ29yaWFuLWRhdGUtdGltZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2NsYXNzZXMvZ3JlZ29yaWFuLWRhdGUtdGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFlLE1BQU0scUJBQXFCLENBQUM7QUFFbkUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7OztBQU9wRDs7Ozs7SUFBdUMsNkNBQWU7SUFBdEQ7O0lBME1BLENBQUM7Ozs7SUF0TUMseUNBQWE7OztJQUFiOztZQUNNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSTs7WUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUs7UUFFakMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUU7WUFDMUIsT0FBTyxTQUFTLENBQUM7U0FDbEI7OztZQUdLLFdBQVcsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBRXBFLDREQUE0RDtRQUM1RCxrREFBa0Q7UUFDbEQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDckIsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNyQjtRQUNELE9BQU8sV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFRCxvQ0FBUTs7OztJQUFSLFVBQVMsUUFBNkM7UUFBN0MseUJBQUEsRUFBQSxXQUF3QixJQUFJLENBQUMsY0FBYyxFQUFFOztZQUU5QyxFQUFFLEdBQUcsSUFBSSxpQkFB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dGVudCI6WyJpbXBvcnQgeyBEYXRlVGltZUNvbW1vbnMsIEdyYW51bGFyaXR5IH0gZnJvbSAnLi9kYXRlLXRpbWUtY29tbW9ucyc7XG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgSnVsaWFuRGF0ZVRpbWUgfSBmcm9tICcuL2p1bGlhbi1kYXRlLXRpbWUnO1xuXG5cbi8qKlxuICogQ2xhc3MgdG8gcmVwcmVzZW50IGEgSnVsaWFuIERhdGUgYW5kIFRpbWVcbiAqIFRPRE86IE1vdmUgdGhpcyBjbGFzcyB0byBjb21tb24gZm9sZGVyIGFzIGl0IGlzIG5lZWRlZCBieSBzZXJ2ZXIgYW5kIGNsaWVudFxuICovXG5leHBvcnQgY2xhc3MgR3JlZ29yaWFuRGF0ZVRpbWUgZXh0ZW5kcyBEYXRlVGltZUNvbW1vbnMgaW1wbGVtZW50cyBEYXRlVGltZSB7XG5cblxuXG4gIGxlbmd0aE9mTW9udGgoKSB7XG4gICAgbGV0IHkgPSB0aGlzLnllYXIsIG0gPSB0aGlzLm1vbnRoO1xuXG4gICAgaWYgKCEobSA+IDApICYmICEobSA8PSAxMikpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLy8gQXNzdW1lIG5vdCBsZWFwIHllYXIgYnkgZGVmYXVsdCAobm90ZSB6ZXJvIGluZGV4IGZvciBKYW4pXG4gICAgY29uc3QgZGF5c0luTW9udGggPSBbMzEsIDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV07XG5cbiAgICAvLyBJZiBldmVubHkgZGl2aXNpYmxlIGJ5IDQgYW5kIG5vdCBldmVubHkgZGl2aXNpYmxlIGJ5IDEwMCxcbiAgICAvLyBvciBpcyBldmVubHkgZGl2aXNpYmxlIGJ5IDQwMCwgdGhlbiBhIGxlYXAgeWVhclxuICAgIGlmICh0aGlzLmlzTGVhcFllYXIoKSkge1xuICAgICAgZGF5c0luTW9udGhbMV0gPSAyOTtcbiAgICB9XG4gICAgcmV0dXJuIGRheXNJbk1vbnRoWy0tbV07XG4gIH1cblxuICBnZXRFbmRPZihkdXJhdGlvbjogR3JhbnVsYXJpdHkgPSB0aGlzLmdldEdyYW51bGFyaXR5KCkpOiBHcmVnb3JpYW5EYXRlVGltZSB7XG5cbiAgICBjb25zdCBkdCA9IG5ldyBHcmVnb3JpYW5EYXRlVGltZSh0aGlzKTtcbiAgICBkdC50b0xhc3RTZWNvbmRPZihkdXJhdGlvbik7XG5cbiAgICByZXR1cm4gZHQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBnZXRKdWxpYW5EYXkgLSBJbXBsZW1lbnRlZCBhY2NvcmRpbmcgdG8gdGhpcyBwYWdlIFsyMDE4LTAzLTEyXTpcbiAgICogaHR0cHM6Ly9kZS53aWtpcGVkaWEub3JnL3dpa2kvVW1yZWNobnVuZ196d2lzY2hlbl9qdWxpYW5pc2NoZW1fRGF0dW1fdW5kX2dyZWdvcmlhbmlzY2hlbV9LYWxlbmRlclxuICAgKlxuICAgKiBAcmV0dXJuICBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0SnVsaWFuRGF5KCkge1xuICAgIC8vIHJ1bm5pbmcgZGF5IChjb251dCBvZiBkYXlzIHRoYXQgeWVhcilcbiAgICBjb25zdCBydW5uaW5nRGF5ID0gdGhpcy5jYWxjUnVubmluZ0RheSh0aGlzLm1vbnRoLCB0aGlzLmRheSwgdGhpcy5pc0xlYXBZZWFyKCkpO1xuXG4gICAgLy8gcnVubmluZyB5ZWFyXG4gICAgY29uc3QgcnVubmluZ1llYXIgPSB0aGlzLnllYXIgLSAxO1xuXG4gICAgLy8ganVsaWFuIGRheSBvZiB5ZWFyIDEgQURcbiAgICBjb25zdCBqdWxpYW5EYXkwID0gMTcyMTQyNjtcblxuICAgIC8vIG51bWJlciBvZiBmdWxsIDQwMCB5ZWFyIGN5Y2xlc1xuICAgIGNvbnN0IG40MDAgPSBNYXRoLmZsb29yKHJ1bm5pbmdZZWFyIC8gNDAwKTtcblxuICAgIC8vIHJlc3Qgb2YgZGl2aXNpb246IG51bWJlciBvZiB5ZWFycyBvZiB0aGUgbGFzdCB1bmNvbXBsZXRlIDQwMCB5ZWFycyBjeWNsZVxuICAgIGNvbnN0IHI0MDAgPSBydW5uaW5nWWVhciAlIDQwMDtcblxuICAgIC8vIG51bWJlciBvZiBmdWxsIDEwMCB5ZWFyIGN5Y2xlc1xuICAgIGNvbnN0IG4xMDAgPSBNYXRoLmZsb29yKHI0MDAgLyAxMDApXG5cbiAgICAvLyByZXN0IG9mIGRpdmlzaW9uOiBudW1iZXIgb2YgeWVhcnMgb2YgdGhlIGxhc3QgdW5jb21wbGV0ZSAxMDAgeWVhcnMgY3ljbGVcbiAgICBjb25zdCByMTAwID0gcjQwMCAlIDEwMDtcblxuICAgIC8vIG51bWJlciBvZiBmdWxsIDQgeWVhciBjeWNsZXNcbiAgICBjb25zdCBuNCA9IE1hdGguZmxvb3IocjEwMCAvIDQpXG5cbiAgICAvLyByZXN0IG9mIGRpdmlzaW9uOiBudW1iZXIgb2YgZnVsbCB5ZWFycyBvZiB0aGUgbGFzdCB1bmNvbXBsZXRlIDQgeWVhcnMgY3ljbGVcbiAgICBjb25zdCBuMSA9IHIxMDAgJSA0O1xuXG4gICAgcmV0dXJuIGp1bGlhbkRheTAgKyBuNDAwICogMTQ2MDk3ICsgbjEwMCAqIDM2NTI0ICsgbjQgKiAxNDYxICsgbjEgKiAzNjUgKyBydW5uaW5nRGF5O1xuICB9XG5cblxuICBmcm9tSnVsaWFuRGF5KGp1bGlhbkRheTogbnVtYmVyKSB7XG5cbiAgICBpZiAodHlwZW9mIGp1bGlhbkRheSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGp1bGlhbkRheSA9IHBhcnNlSW50KGp1bGlhbkRheSlcbiAgICB9XG5cbiAgICAvLyBqdWxpYW4gZGF5IG9mIHllYXIgMSBBRFxuICAgIGNvbnN0IGp1bGlhbkRheTAgPSAxNzIxNDI2O1xuXG4gICAgY29uc3QgZmlyc3REYXlPZkdyZWdvcmlhbkNhbCA9IDIyOTkxNjE7XG5cbiAgICAvLyBjb252ZXJzaW9uIG9mIGp1bGlhbiBkYXkgZWFybGllciB0aGFuIHRoZSBpbnRyb2R1Y3Rpb24gb2ZcbiAgICAvLyB0aGUgZ3JlZ29yaWFuIGNhbGVuZGFyIE9jdG9iZXIgMTV0aCBvZiAxNTgyIGFyZSBjYWxjdWxhdGVkXG4gICAgLy8gd2l0aCB0aGUganVsaWFuIGNhbGVuZGFyIGFsZ29yaXRtc1xuICAgIGlmIChqdWxpYW5EYXkgPCBmaXJzdERheU9mR3JlZ29yaWFuQ2FsKSB7XG5cbiAgICAgIGNvbnN0IGpkdCA9IG5ldyBKdWxpYW5EYXRlVGltZSgpLmZyb21KdWxpYW5EYXkoanVsaWFuRGF5KTtcbiAgICAgIHRoaXMueWVhciA9IGpkdC55ZWFyO1xuICAgICAgdGhpcy5tb250aCA9IGpkdC5tb250aDtcbiAgICAgIHRoaXMuZGF5ID0gamR0LmRheTtcblxuICAgIH1cbiAgICBlbHNlIHtcblxuICAgICAgLy8gbnVtYmVyIG9mIGZ1bGwgNDAwIHllYXIgY3ljbGVzXG4gICAgICBjb25zdCBuNDAwID0gTWF0aC5mbG9vcigoanVsaWFuRGF5IC0ganVsaWFuRGF5MCkgLyAxNDYwOTcpO1xuXG4gICAgICAvLyBudW1iZXIgb2YgZGF5cyBvZiB0aGUgbGFzdCB1bmNvbXBsZXRlIDQwMCB5ZWFycyBjeWNsZVxuICAgICAgY29uc3QgcjQwMCA9IChqdWxpYW5EYXkgLSBqdWxpYW5EYXkwKSAlIDE0NjA5NztcblxuICAgICAgLy8gbnVtYmVyIG9mIGZ1bGwgMTAwIHllYXIgY3ljbGVzXG4gICAgICBsZXQgbjEwMCA9IE1hdGguZmxvb3IocjQwMCAvIDM2NTI0KTtcblxuICAgICAgLy8gbnVtYmVyIG9mIGRheXMgb2YgdGhlIGxhc3QgdW5jb21wbGV0ZSAxMDAgeWVhcnMgY3ljbGVcbiAgICAgIGxldCByMTAwID0gcjQwMCAlIDM2NTI0O1xuXG5cbiAgICAgIGlmIChuMTAwID09PSA0KSB7XG4gICAgICAgIG4xMDAgPSAzO1xuICAgICAgICByMTAwID0gMzY1MjQ7XG4gICAgICB9XG5cbiAgICAgIC8vIG51bWJlciBvZiBmdWxsIDQgeWVhciBjeWNsZXNcbiAgICAgIGNvbnN0IG40ID0gTWF0aC5mbG9vcihyMTAwIC8gMTQ2MSk7XG5cbiAgICAgIC8vIG51bWJlciBvZiBkYXlzIG9mIHRoZSBsYXN0IHVuY29tcGxldGUgNCB5ZWFycyBjeWNsZVxuICAgICAgY29uc3QgcjQgPSByMTAwICUgMTQ2MTtcblxuICAgICAgLy8gbnVtYmVyIG9mIGZ1bGwgeWVhcnMgb2YgdGhlIGxhc3QgdW5jb21wbGV0ZSA0IHllYXJzIGN5Y2xlXG4gICAgICBsZXQgbjEgPSBNYXRoLmZsb29yKHI0IC8gMzY1KTtcblxuICAgICAgLy8gbnVtYmVyIG9mIGRheXMgaW4gdGhlIGxhc3QgeWVhclxuICAgICAgbGV0IHJ1bm5pbmdEYXkgPSByNCAlIDM2NTtcblxuICAgICAgaWYgKG4xID09PSA0KSB7XG4gICAgICAgIG4xID0gMztcbiAgICAgICAgcnVubmluZ0RheSA9IDM2NTtcbiAgICAgIH1cblxuICAgICAgLy8gcnVubmluZyB5ZWFyXG4gICAgICBjb25zdCBydW5uaW5nWWVhciA9IDQwMCAqIG40MDAgKyAxMDAgKiBuMTAwICsgNCAqIG40ICsgbjE7XG5cbiAgICAgIC8vIHJlc3VsdGluZyB5ZWFyXG4gICAgICB0aGlzLnllYXIgPSBydW5uaW5nWWVhciArIDE7XG5cbiAgICAgIGNvbnN0IG1vbnRoRGF5ID0gdGhpcy5jYWxjRGF0ZUJ5UnVubmluZ0RheShydW5uaW5nRGF5LCB0aGlzLmlzTGVhcFllYXIoKSlcblxuICAgICAgLy8gcmVzdWx0aW5nIG1vbnRoXG4gICAgICB0aGlzLm1vbnRoID0gbW9udGhEYXkubW9udGg7XG5cbiAgICAgIC8vIHJlc3VsdGluZyBkYXlcbiAgICAgIHRoaXMuZGF5ID0gbW9udGhEYXkuZGF5O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgZ2l2ZW4geWVhciBpcyBhIGxlYXAgeWVhclxuICAgKi9cbiAgaXNMZWFwWWVhcigpOiBib29sZWFuIHtcbiAgICBjb25zdCB5ZWFyID0gdGhpcy55ZWFyO1xuICAgIC8vIFJldHVybiB0cnVlIGlmIGV2ZW5seSBkaXZpc2libGUgYnkgNCBhbmQgbm90IGV2ZW5seSBkaXZpc2libGUgYnkgMTAwLFxuICAgIC8vIG9yIGlzIGV2ZW5seSBkaXZpc2libGUgYnkgNDAwLCB0aGVuIGEgbGVhcCB5ZWFyXG4gICAgcmV0dXJuICgoISh5ZWFyICUgNCkgJiYgeWVhciAlIDEwMCkgfHwgISh5ZWFyICUgNDAwKSkgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBqdWxpYW4gZGF5IGluIHNlY29uZHNcbiAgICpcbiAgICogVE9ETzogcmV0dXJuIGp1bGlhbiBkYXkgcGx1cyB0aW1lIGluIHNlY29uZHNcbiAgICovXG4gIGdldEp1bGlhblNlY29uZCgpIHtcbiAgICBsZXQgc2Vjb25kcyA9IHRoaXMuZ2V0SnVsaWFuRGF5KCkgKiA2MCAqIDYwICogMjQ7IC8vIGZpcnN0IHNlY29uZCBvZiB0aGUgZGF5XG4gICAgaWYgKHRoaXMuc2Vjb25kcyA+IDApIHNlY29uZHMgPSBzZWNvbmRzICsgdGhpcy5zZWNvbmRzO1xuICAgIGlmICh0aGlzLm1pbnV0ZXMgPiAwKSBzZWNvbmRzID0gc2Vjb25kcyArIHRoaXMubWludXRlcyAqIDYwO1xuICAgIGlmICh0aGlzLmhvdXJzID4gMCkgc2Vjb25kcyA9IHNlY29uZHMgKyB0aGlzLmhvdXJzICogNjAgKiA2MDtcbiAgICByZXR1cm4gc2Vjb25kcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhpcyBKdWxpYW5EYXRlVGltZSBmcm9tIGdpdmVuIGp1bGlhbiBzZWNvbmRcbiAgICogQHBhcmFtIGp1bGlhblNlY29uZCBqdWxpYW4gc2Vjb25kXG4gICAqL1xuICBmcm9tSnVsaWFuU2Vjb25kKGp1bGlhblNlY29uZCkge1xuXG4gICAgY29uc3Qgc2Vjc1BlckRheSA9IDYwICogNjAgKiAyNDtcblxuICAgIC8vIG51bWJlciBvZiBmdWxsIGRheXNcbiAgICBjb25zdCBqdWxpYW5EYXkgPSBNYXRoLmZsb29yKGp1bGlhblNlY29uZCAvIHNlY3NQZXJEYXkpO1xuXG4gICAgLy8gbnVtYmVyIG9mIHNlY29uZHMgb2YgdGhlIGp1bGlhbiBkYXlcbiAgICBjb25zdCBzZWNzT2ZEYXkgPSBqdWxpYW5TZWNvbmQgJSBzZWNzUGVyRGF5O1xuXG4gICAgLy8gbnVtYmVyIG9mIG91cnMgb2YgdGhlIGRheVxuICAgIHRoaXMuaG91cnMgPSBNYXRoLmZsb29yKHNlY3NPZkRheSAvICg2MCAqIDYwKSlcblxuICAgIC8vIG51bWJlciBvZiBzZWNvbmRzIG9mIHRoZSBsYXN0IGhvdXJcbiAgICBjb25zdCBzZWNzT2ZIb3VyID0gdGhpcy5ob3VycyAlICg2MCAqIDYwKTtcblxuICAgIC8vIG51bWJlciBvZiBvdXJzIG9mIHRoZSBkYXlcbiAgICB0aGlzLm1pbnV0ZXMgPSBNYXRoLmZsb29yKHNlY3NPZkhvdXIgLyA2MClcblxuICAgIC8vIHNlY3Mgb2YgdGhlIGxhc3QgbWludXRlXG4gICAgdGhpcy5zZWNvbmRzID0gdGhpcy5taW51dGVzICUgNjA7XG5cbiAgICByZXR1cm4gdGhpcy5mcm9tSnVsaWFuRGF5KGp1bGlhbkRheSk7XG5cbiAgfVxuXG5cbn1cbiJdfQ==