/**
 * @fileoverview added by tsickle
 * Generated from: gregorian-date-time.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JlZ29yaWFuLWRhdGUtdGltZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvc3JjL2xpYi9kYXRlLXRpbWUvIiwic291cmNlcyI6WyJncmVnb3JpYW4tZGF0ZS10aW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQWUsTUFBTSxxQkFBcUIsQ0FBQztBQUVuRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7O0FBT3BEOzs7OztJQUF1Qyw2Q0FBZTtJQUF0RDs7SUEwTUEsQ0FBQzs7OztJQXRNQyx5Q0FBYTs7O0lBQWI7O1lBQ00sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJOztZQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSztRQUVqQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRTtZQUMxQixPQUFPLFNBQVMsQ0FBQztTQUNsQjs7O1lBR0ssV0FBVyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFFcEUsNERBQTREO1FBQzVELGtEQUFrRDtRQUNsRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNyQixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ3JCO1FBQ0QsT0FBTyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMxQixDQUFDOzs7OztJQUVELG9DQUFROzs7O0lBQVIsVUFBUyxRQUE2QztRQUE3Qyx5QkFBQSxFQUFBLFdBQXdCLElBQUksQ0FBQyxjQUFjLEVBQUU7O1lBRTlDLEVBQUUsR0FBRyxJQUFJLGlCQUFpQixD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IjpbImltcG9ydCB7IERhdGVUaW1lQ29tbW9ucywgR3JhbnVsYXJpdHkgfSBmcm9tICcuL2RhdGUtdGltZS1jb21tb25zJztcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEp1bGlhbkRhdGVUaW1lIH0gZnJvbSAnLi9qdWxpYW4tZGF0ZS10aW1lJztcblxuXG4vKipcbiAqIENsYXNzIHRvIHJlcHJlc2VudCBhIEp1bGlhbiBEYXRlIGFuZCBUaW1lXG4gKiBUT0RPOiBNb3ZlIHRoaXMgY2xhc3MgdG8gY29tbW9uIGZvbGRlciBhcyBpdCBpcyBuZWVkZWQgYnkgc2VydmVyIGFuZCBjbGllbnRcbiAqL1xuZXhwb3J0IGNsYXNzIEdyZWdvcmlhbkRhdGVUaW1lIGV4dGVuZHMgRGF0ZVRpbWVDb21tb25zIGltcGxlbWVudHMgRGF0ZVRpbWUge1xuXG5cblxuICBsZW5ndGhPZk1vbnRoKCkge1xuICAgIGxldCB5ID0gdGhpcy55ZWFyLCBtID0gdGhpcy5tb250aDtcblxuICAgIGlmICghKG0gPiAwKSAmJiAhKG0gPD0gMTIpKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8vIEFzc3VtZSBub3QgbGVhcCB5ZWFyIGJ5IGRlZmF1bHQgKG5vdGUgemVybyBpbmRleCBmb3IgSmFuKVxuICAgIGNvbnN0IGRheXNJbk1vbnRoID0gWzMxLCAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdO1xuXG4gICAgLy8gSWYgZXZlbmx5IGRpdmlzaWJsZSBieSA0IGFuZCBub3QgZXZlbmx5IGRpdmlzaWJsZSBieSAxMDAsXG4gICAgLy8gb3IgaXMgZXZlbmx5IGRpdmlzaWJsZSBieSA0MDAsIHRoZW4gYSBsZWFwIHllYXJcbiAgICBpZiAodGhpcy5pc0xlYXBZZWFyKCkpIHtcbiAgICAgIGRheXNJbk1vbnRoWzFdID0gMjk7XG4gICAgfVxuICAgIHJldHVybiBkYXlzSW5Nb250aFstLW1dO1xuICB9XG5cbiAgZ2V0RW5kT2YoZHVyYXRpb246IEdyYW51bGFyaXR5ID0gdGhpcy5nZXRHcmFudWxhcml0eSgpKTogR3JlZ29yaWFuRGF0ZVRpbWUge1xuXG4gICAgY29uc3QgZHQgPSBuZXcgR3JlZ29yaWFuRGF0ZVRpbWUodGhpcyk7XG4gICAgZHQudG9MYXN0U2Vjb25kT2YoZHVyYXRpb24pO1xuXG4gICAgcmV0dXJuIGR0O1xuICB9XG5cblxuICAvKipcbiAgICogZ2V0SnVsaWFuRGF5IC0gSW1wbGVtZW50ZWQgYWNjb3JkaW5nIHRvIHRoaXMgcGFnZSBbMjAxOC0wMy0xMl06XG4gICAqIGh0dHBzOi8vZGUud2lraXBlZGlhLm9yZy93aWtpL1VtcmVjaG51bmdfendpc2NoZW5fanVsaWFuaXNjaGVtX0RhdHVtX3VuZF9ncmVnb3JpYW5pc2NoZW1fS2FsZW5kZXJcbiAgICpcbiAgICogQHJldHVybiAgZGVzY3JpcHRpb25cbiAgICovXG4gIGdldEp1bGlhbkRheSgpIHtcbiAgICAvLyBydW5uaW5nIGRheSAoY29udXQgb2YgZGF5cyB0aGF0IHllYXIpXG4gICAgY29uc3QgcnVubmluZ0RheSA9IHRoaXMuY2FsY1J1bm5pbmdEYXkodGhpcy5tb250aCwgdGhpcy5kYXksIHRoaXMuaXNMZWFwWWVhcigpKTtcblxuICAgIC8vIHJ1bm5pbmcgeWVhclxuICAgIGNvbnN0IHJ1bm5pbmdZZWFyID0gdGhpcy55ZWFyIC0gMTtcblxuICAgIC8vIGp1bGlhbiBkYXkgb2YgeWVhciAxIEFEXG4gICAgY29uc3QganVsaWFuRGF5MCA9IDE3MjE0MjY7XG5cbiAgICAvLyBudW1iZXIgb2YgZnVsbCA0MDAgeWVhciBjeWNsZXNcbiAgICBjb25zdCBuNDAwID0gTWF0aC5mbG9vcihydW5uaW5nWWVhciAvIDQwMCk7XG5cbiAgICAvLyByZXN0IG9mIGRpdmlzaW9uOiBudW1iZXIgb2YgeWVhcnMgb2YgdGhlIGxhc3QgdW5jb21wbGV0ZSA0MDAgeWVhcnMgY3ljbGVcbiAgICBjb25zdCByNDAwID0gcnVubmluZ1llYXIgJSA0MDA7XG5cbiAgICAvLyBudW1iZXIgb2YgZnVsbCAxMDAgeWVhciBjeWNsZXNcbiAgICBjb25zdCBuMTAwID0gTWF0aC5mbG9vcihyNDAwIC8gMTAwKVxuXG4gICAgLy8gcmVzdCBvZiBkaXZpc2lvbjogbnVtYmVyIG9mIHllYXJzIG9mIHRoZSBsYXN0IHVuY29tcGxldGUgMTAwIHllYXJzIGN5Y2xlXG4gICAgY29uc3QgcjEwMCA9IHI0MDAgJSAxMDA7XG5cbiAgICAvLyBudW1iZXIgb2YgZnVsbCA0IHllYXIgY3ljbGVzXG4gICAgY29uc3QgbjQgPSBNYXRoLmZsb29yKHIxMDAgLyA0KVxuXG4gICAgLy8gcmVzdCBvZiBkaXZpc2lvbjogbnVtYmVyIG9mIGZ1bGwgeWVhcnMgb2YgdGhlIGxhc3QgdW5jb21wbGV0ZSA0IHllYXJzIGN5Y2xlXG4gICAgY29uc3QgbjEgPSByMTAwICUgNDtcblxuICAgIHJldHVybiBqdWxpYW5EYXkwICsgbjQwMCAqIDE0NjA5NyArIG4xMDAgKiAzNjUyNCArIG40ICogMTQ2MSArIG4xICogMzY1ICsgcnVubmluZ0RheTtcbiAgfVxuXG5cbiAgZnJvbUp1bGlhbkRheShqdWxpYW5EYXk6IG51bWJlcikge1xuXG4gICAgaWYgKHR5cGVvZiBqdWxpYW5EYXkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBqdWxpYW5EYXkgPSBwYXJzZUludChqdWxpYW5EYXkpXG4gICAgfVxuXG4gICAgLy8ganVsaWFuIGRheSBvZiB5ZWFyIDEgQURcbiAgICBjb25zdCBqdWxpYW5EYXkwID0gMTcyMTQyNjtcblxuICAgIGNvbnN0IGZpcnN0RGF5T2ZHcmVnb3JpYW5DYWwgPSAyMjk5MTYxO1xuXG4gICAgLy8gY29udmVyc2lvbiBvZiBqdWxpYW4gZGF5IGVhcmxpZXIgdGhhbiB0aGUgaW50cm9kdWN0aW9uIG9mXG4gICAgLy8gdGhlIGdyZWdvcmlhbiBjYWxlbmRhciBPY3RvYmVyIDE1dGggb2YgMTU4MiBhcmUgY2FsY3VsYXRlZFxuICAgIC8vIHdpdGggdGhlIGp1bGlhbiBjYWxlbmRhciBhbGdvcml0bXNcbiAgICBpZiAoanVsaWFuRGF5IDwgZmlyc3REYXlPZkdyZWdvcmlhbkNhbCkge1xuXG4gICAgICBjb25zdCBqZHQgPSBuZXcgSnVsaWFuRGF0ZVRpbWUoKS5mcm9tSnVsaWFuRGF5KGp1bGlhbkRheSk7XG4gICAgICB0aGlzLnllYXIgPSBqZHQueWVhcjtcbiAgICAgIHRoaXMubW9udGggPSBqZHQubW9udGg7XG4gICAgICB0aGlzLmRheSA9IGpkdC5kYXk7XG5cbiAgICB9XG4gICAgZWxzZSB7XG5cbiAgICAgIC8vIG51bWJlciBvZiBmdWxsIDQwMCB5ZWFyIGN5Y2xlc1xuICAgICAgY29uc3QgbjQwMCA9IE1hdGguZmxvb3IoKGp1bGlhbkRheSAtIGp1bGlhbkRheTApIC8gMTQ2MDk3KTtcblxuICAgICAgLy8gbnVtYmVyIG9mIGRheXMgb2YgdGhlIGxhc3QgdW5jb21wbGV0ZSA0MDAgeWVhcnMgY3ljbGVcbiAgICAgIGNvbnN0IHI0MDAgPSAoanVsaWFuRGF5IC0ganVsaWFuRGF5MCkgJSAxNDYwOTc7XG5cbiAgICAgIC8vIG51bWJlciBvZiBmdWxsIDEwMCB5ZWFyIGN5Y2xlc1xuICAgICAgbGV0IG4xMDAgPSBNYXRoLmZsb29yKHI0MDAgLyAzNjUyNCk7XG5cbiAgICAgIC8vIG51bWJlciBvZiBkYXlzIG9mIHRoZSBsYXN0IHVuY29tcGxldGUgMTAwIHllYXJzIGN5Y2xlXG4gICAgICBsZXQgcjEwMCA9IHI0MDAgJSAzNjUyNDtcblxuXG4gICAgICBpZiAobjEwMCA9PT0gNCkge1xuICAgICAgICBuMTAwID0gMztcbiAgICAgICAgcjEwMCA9IDM2NTI0O1xuICAgICAgfVxuXG4gICAgICAvLyBudW1iZXIgb2YgZnVsbCA0IHllYXIgY3ljbGVzXG4gICAgICBjb25zdCBuNCA9IE1hdGguZmxvb3IocjEwMCAvIDE0NjEpO1xuXG4gICAgICAvLyBudW1iZXIgb2YgZGF5cyBvZiB0aGUgbGFzdCB1bmNvbXBsZXRlIDQgeWVhcnMgY3ljbGVcbiAgICAgIGNvbnN0IHI0ID0gcjEwMCAlIDE0NjE7XG5cbiAgICAgIC8vIG51bWJlciBvZiBmdWxsIHllYXJzIG9mIHRoZSBsYXN0IHVuY29tcGxldGUgNCB5ZWFycyBjeWNsZVxuICAgICAgbGV0IG4xID0gTWF0aC5mbG9vcihyNCAvIDM2NSk7XG5cbiAgICAgIC8vIG51bWJlciBvZiBkYXlzIGluIHRoZSBsYXN0IHllYXJcbiAgICAgIGxldCBydW5uaW5nRGF5ID0gcjQgJSAzNjU7XG5cbiAgICAgIGlmIChuMSA9PT0gNCkge1xuICAgICAgICBuMSA9IDM7XG4gICAgICAgIHJ1bm5pbmdEYXkgPSAzNjU7XG4gICAgICB9XG5cbiAgICAgIC8vIHJ1bm5pbmcgeWVhclxuICAgICAgY29uc3QgcnVubmluZ1llYXIgPSA0MDAgKiBuNDAwICsgMTAwICogbjEwMCArIDQgKiBuNCArIG4xO1xuXG4gICAgICAvLyByZXN1bHRpbmcgeWVhclxuICAgICAgdGhpcy55ZWFyID0gcnVubmluZ1llYXIgKyAxO1xuXG4gICAgICBjb25zdCBtb250aERheSA9IHRoaXMuY2FsY0RhdGVCeVJ1bm5pbmdEYXkocnVubmluZ0RheSwgdGhpcy5pc0xlYXBZZWFyKCkpXG5cbiAgICAgIC8vIHJlc3VsdGluZyBtb250aFxuICAgICAgdGhpcy5tb250aCA9IG1vbnRoRGF5Lm1vbnRoO1xuXG4gICAgICAvLyByZXN1bHRpbmcgZGF5XG4gICAgICB0aGlzLmRheSA9IG1vbnRoRGF5LmRheTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG5cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIGdpdmVuIHllYXIgaXMgYSBsZWFwIHllYXJcbiAgICovXG4gIGlzTGVhcFllYXIoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgeWVhciA9IHRoaXMueWVhcjtcbiAgICAvLyBSZXR1cm4gdHJ1ZSBpZiBldmVubHkgZGl2aXNpYmxlIGJ5IDQgYW5kIG5vdCBldmVubHkgZGl2aXNpYmxlIGJ5IDEwMCxcbiAgICAvLyBvciBpcyBldmVubHkgZGl2aXNpYmxlIGJ5IDQwMCwgdGhlbiBhIGxlYXAgeWVhclxuICAgIHJldHVybiAoKCEoeWVhciAlIDQpICYmIHllYXIgJSAxMDApIHx8ICEoeWVhciAlIDQwMCkpID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMganVsaWFuIGRheSBpbiBzZWNvbmRzXG4gICAqXG4gICAqIFRPRE86IHJldHVybiBqdWxpYW4gZGF5IHBsdXMgdGltZSBpbiBzZWNvbmRzXG4gICAqL1xuICBnZXRKdWxpYW5TZWNvbmQoKSB7XG4gICAgbGV0IHNlY29uZHMgPSB0aGlzLmdldEp1bGlhbkRheSgpICogNjAgKiA2MCAqIDI0OyAvLyBmaXJzdCBzZWNvbmQgb2YgdGhlIGRheVxuICAgIGlmICh0aGlzLnNlY29uZHMgPiAwKSBzZWNvbmRzID0gc2Vjb25kcyArIHRoaXMuc2Vjb25kcztcbiAgICBpZiAodGhpcy5taW51dGVzID4gMCkgc2Vjb25kcyA9IHNlY29uZHMgKyB0aGlzLm1pbnV0ZXMgKiA2MDtcbiAgICBpZiAodGhpcy5ob3VycyA+IDApIHNlY29uZHMgPSBzZWNvbmRzICsgdGhpcy5ob3VycyAqIDYwICogNjA7XG4gICAgcmV0dXJuIHNlY29uZHM7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoaXMgSnVsaWFuRGF0ZVRpbWUgZnJvbSBnaXZlbiBqdWxpYW4gc2Vjb25kXG4gICAqIEBwYXJhbSBqdWxpYW5TZWNvbmQganVsaWFuIHNlY29uZFxuICAgKi9cbiAgZnJvbUp1bGlhblNlY29uZChqdWxpYW5TZWNvbmQpIHtcblxuICAgIGNvbnN0IHNlY3NQZXJEYXkgPSA2MCAqIDYwICogMjQ7XG5cbiAgICAvLyBudW1iZXIgb2YgZnVsbCBkYXlzXG4gICAgY29uc3QganVsaWFuRGF5ID0gTWF0aC5mbG9vcihqdWxpYW5TZWNvbmQgLyBzZWNzUGVyRGF5KTtcblxuICAgIC8vIG51bWJlciBvZiBzZWNvbmRzIG9mIHRoZSBqdWxpYW4gZGF5XG4gICAgY29uc3Qgc2Vjc09mRGF5ID0ganVsaWFuU2Vjb25kICUgc2Vjc1BlckRheTtcblxuICAgIC8vIG51bWJlciBvZiBvdXJzIG9mIHRoZSBkYXlcbiAgICB0aGlzLmhvdXJzID0gTWF0aC5mbG9vcihzZWNzT2ZEYXkgLyAoNjAgKiA2MCkpXG5cbiAgICAvLyBudW1iZXIgb2Ygc2Vjb25kcyBvZiB0aGUgbGFzdCBob3VyXG4gICAgY29uc3Qgc2Vjc09mSG91ciA9IHRoaXMuaG91cnMgJSAoNjAgKiA2MCk7XG5cbiAgICAvLyBudW1iZXIgb2Ygb3VycyBvZiB0aGUgZGF5XG4gICAgdGhpcy5taW51dGVzID0gTWF0aC5mbG9vcihzZWNzT2ZIb3VyIC8gNjApXG5cbiAgICAvLyBzZWNzIG9mIHRoZSBsYXN0IG1pbnV0ZVxuICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMubWludXRlcyAlIDYwO1xuXG4gICAgcmV0dXJuIHRoaXMuZnJvbUp1bGlhbkRheShqdWxpYW5EYXkpO1xuXG4gIH1cblxuXG59XG4iXX0=