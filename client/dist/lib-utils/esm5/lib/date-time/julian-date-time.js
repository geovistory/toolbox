/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/julian-date-time.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DateTimeCommons } from './date-time-commons';
/**
 * Class to represent a Julian Date and Time
 * TODO: Move this class to common folder as it is needed by server and client
 */
var /**
 * Class to represent a Julian Date and Time
 * TODO: Move this class to common folder as it is needed by server and client
 */
JulianDateTime = /** @class */ (function (_super) {
    tslib_1.__extends(JulianDateTime, _super);
    function JulianDateTime() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
    * Methods
    */
    /**
     * Methods
     * @param {?=} duration
     * @return {?}
     */
    JulianDateTime.prototype.getEndOf = /**
     * Methods
     * @param {?=} duration
     * @return {?}
     */
    function (duration) {
        if (duration === void 0) { duration = this.getGranularity(); }
        /** @type {?} */
        var dt = new JulianDateTime(this);
        dt.toLastSecondOf(duration);
        return dt;
    };
    /**
     * @return {?}
     */
    JulianDateTime.prototype.lengthOfMonth = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var y = this.year;
        /** @type {?} */
        var m = this.month;
        // Assume not leap year by default (note zero index for Jan)
        /** @type {?} */
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // If evenly divisible by 4 and not one of the years 5 BC, 1 BC or 4 AD,
        // when Augustus dropped the leap year
        if (!(y % 4) && !(y == -5) && !(y == -1) && !(y == 4)) {
            daysInMonth[1] = 29;
        }
        return daysInMonth[--m];
    };
    /**
    * Convert the year, month, day of julian calendar to julian day
    *
    * @return  description
    */
    /**
     * Convert the year, month, day of julian calendar to julian day
     *
     * @return {?} description
     */
    JulianDateTime.prototype.getJulianDay = /**
     * Convert the year, month, day of julian calendar to julian day
     *
     * @return {?} description
     */
    function () {
        // running day (conut of days that year)
        /** @type {?} */
        var runningDay = this.calcRunningDay(this.month, this.day, this.isLeapYear());
        /** @type {?} */
        var runningYear;
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
        var n4 = Math.floor(runningYear / 4)
        // rest of division: number of full years of the last uncomplete 4 years cycle
        ;
        // rest of division: number of full years of the last uncomplete 4 years cycle
        /** @type {?} */
        var n1 = runningYear % 4;
        return 1461 * n4 + 365 * (n1 - 3) + runningDay;
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} julianDay
     * @return {THIS}
     */
    JulianDateTime.prototype.fromJulianDay = /**
     * @template THIS
     * @this {THIS}
     * @param {?} julianDay
     * @return {THIS}
     */
    function (julianDay) {
        if (typeof julianDay === 'string') {
            julianDay = parseInt(julianDay, 10);
        }
        // number of full 4 year cycles
        /** @type {?} */
        var n4 = Math.floor((julianDay + (3 * 365)) / 1461);
        // number of days of the last uncomplete 4 years cycle
        /** @type {?} */
        var r4 = (julianDay + (3 * 365)) % 1461;
        // number of full years of the last uncomplete 4 years cycle
        /** @type {?} */
        var n1 = Math.floor(r4 / 365);
        // number of days in the last year
        /** @type {?} */
        var dayOfYear = r4 % 365;
        if (n1 === 4) {
            n1 = 3;
            dayOfYear = 365;
        }
        // running year
        /** @type {?} */
        var runningYear = 4 * n4 + n1;
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
        var monthDay = (/** @type {?} */ (this)).calcDateByRunningDay(dayOfYear, (/** @type {?} */ (this)).isLeapYear())
        // resulting month
        ;
        // resulting month
        (/** @type {?} */ (this)).month = monthDay.month;
        // resulting day
        (/** @type {?} */ (this)).day = monthDay.day;
        return (/** @type {?} */ (this));
    };
    /**
    * Returns true if given year is a leap year
    */
    /**
     * Returns true if given year is a leap year
     * @return {?}
     */
    JulianDateTime.prototype.isLeapYear = /**
     * Returns true if given year is a leap year
     * @return {?}
     */
    function () {
        // Return true if evenly divisible by 4
        return !(this.year % 4) ? true : false;
    };
    /**
     * @return {?}
     */
    JulianDateTime.prototype.getJulianSecond = /**
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
    JulianDateTime.prototype.fromJulianSecond = /**
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
    return JulianDateTime;
}(DateTimeCommons));
/**
 * Class to represent a Julian Date and Time
 * TODO: Move this class to common folder as it is needed by server and client
 */
export { JulianDateTime };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVsaWFuLWRhdGUtdGltZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2p1bGlhbi1kYXRlLXRpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBZSxNQUFNLHFCQUFxQixDQUFDOzs7OztBQVNuRTs7Ozs7SUFBb0MsMENBQWU7SUFBbkQ7O0lBa0tBLENBQUM7SUEvSkM7O01BRUU7Ozs7OztJQUVGLGlDQUFROzs7OztJQUFSLFVBQVMsUUFBNkM7UUFBN0MseUJBQUEsRUFBQSxXQUF3QixJQUFJLENBQUMsY0FBYyxFQUFFOztZQUU5QyxFQUFFLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDO1FBQ25DLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFNUIsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzs7O0lBR0Qsc0NBQWE7OztJQUFiOztZQUNRLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSTs7WUFDZixDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUs7OztZQUdaLFdBQVcsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBRXBFLHdFQUF3RTtRQUN4RSxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUNyRCxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxD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LG1CQUFBLElBQUksRUFBQSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUV2QyxDQUFDO0lBR0gscUJBQUM7QUFBRCxDQUFDLEFBbEtELENBQW9DLGVBQWUsR0FrS2xEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0ZVRpbWVDb21tb25zLCBHcmFudWxhcml0eSB9IGZyb20gJy4vZGF0ZS10aW1lLWNvbW1vbnMnO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5cblxuLyoqXG4qIENsYXNzIHRvIHJlcHJlc2VudCBhIEp1bGlhbiBEYXRlIGFuZCBUaW1lXG4qIFRPRE86IE1vdmUgdGhpcyBjbGFzcyB0byBjb21tb24gZm9sZGVyIGFzIGl0IGlzIG5lZWRlZCBieSBzZXJ2ZXIgYW5kIGNsaWVudFxuKi9cbmV4cG9ydCBjbGFzcyBKdWxpYW5EYXRlVGltZSBleHRlbmRzIERhdGVUaW1lQ29tbW9ucyBpbXBsZW1lbnRzIERhdGVUaW1lIHtcblxuXG4gIC8qKlxuICAqIE1ldGhvZHNcbiAgKi9cblxuICBnZXRFbmRPZihkdXJhdGlvbjogR3JhbnVsYXJpdHkgPSB0aGlzLmdldEdyYW51bGFyaXR5KCkpOiBKdWxpYW5EYXRlVGltZSB7XG5cbiAgICBjb25zdCBkdCA9IG5ldyBKdWxpYW5EYXRlVGltZSh0aGlzKTtcbiAgICBkdC50b0xhc3RTZWNvbmRPZihkdXJhdGlvbik7XG5cbiAgICByZXR1cm4gZHQ7XG4gIH1cblxuXG4gIGxlbmd0aE9mTW9udGgoKSB7XG4gICAgY29uc3QgeSA9IHRoaXMueWVhcjtcbiAgICBsZXQgbSA9IHRoaXMubW9udGg7XG5cbiAgICAvLyBBc3N1bWUgbm90IGxlYXAgeWVhciBieSBkZWZhdWx0IChub3RlIHplcm8gaW5kZXggZm9yIEphbilcbiAgICBjb25zdCBkYXlzSW5Nb250aCA9IFszMSwgMjgsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXTtcblxuICAgIC8vIElmIGV2ZW5seSBkaXZpc2libGUgYnkgNCBhbmQgbm90IG9uZSBvZiB0aGUgeWVhcnMgNSBCQywgMSBCQyBvciA0IEFELFxuICAgIC8vIHdoZW4gQXVndXN0dXMgZHJvcHBlZCB0aGUgbGVhcCB5ZWFyXG4gICAgaWYgKCEoeSAlIDQpICYmICEoeSA9PSAtNSkgJiYgISh5ID09IC0xKSAmJiAhKHkgPT0gNCkpIHtcbiAgICAgIGRheXNJbk1vbnRoWzFdID0gMjk7XG4gICAgfVxuICAgIHJldHVybiBkYXlzSW5Nb250aFstLW1dXG4gIH1cblxuXG5cbiAgLyoqXG4gICogQ29udmVydCB0aGUgeWVhciwgbW9udGgsIGRheSBvZiBqdWxpYW4gY2FsZW5kYXIgdG8ganVsaWFuIGRheVxuICAqXG4gICogQHJldHVybiAgZGVzY3JpcHRpb25cbiAgKi9cbiAgZ2V0SnVsaWFuRGF5KCkge1xuXG4gICAgLy8gcnVubmluZyBkYXkgKGNvbnV0IG9mIGRheXMgdGhhdCB5ZWFyKVxuICAgIGNvbnN0IHJ1bm5pbmdEYXkgPSB0aGlzLmNhbGNSdW5uaW5nRGF5KHRoaXMubW9udGgsIHRoaXMuZGF5LCB0aGlzLmlzTGVhcFllYXIoKSk7XG4gICAgbGV0IHJ1bm5pbmdZZWFyO1xuICAgIGlmICh0aGlzLnllYXIgPCAwKSB7XG4gICAgICAvLyBydW5uaW5nIHllYXJcbiAgICAgIHJ1bm5pbmdZZWFyID0gNDcxNiArIHRoaXMueWVhcjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcnVubmluZyB5ZWFyXG4gICAgICBydW5uaW5nWWVhciA9IDQ3MTUgKyB0aGlzLnllYXI7XG4gICAgfVxuXG4gICAgLy8gbnVtYmVyIG9mIGZ1bGwgNCB5ZWFyIGN5Y2xlc1xuICAgIGNvbnN0IG40ID0gTWF0aC5mbG9vcihydW5uaW5nWWVhciAvIDQpXG5cbiAgICAvLyByZXN0IG9mIGRpdmlzaW9uOiBudW1iZXIgb2YgZnVsbCB5ZWFycyBvZiB0aGUgbGFzdCB1bmNvbXBsZXRlIDQgeWVhcnMgY3ljbGVcbiAgICBjb25zdCBuMSA9IHJ1bm5pbmdZZWFyICUgNDtcblxuXG4gICAgcmV0dXJuIDE0NjEgKiBuNCArIDM2NSAqIChuMSAtIDMpICsgcnVubmluZ0RheTtcbiAgfVxuXG5cbiAgZnJvbUp1bGlhbkRheShqdWxpYW5EYXk6IG51bWJlcikge1xuXG4gICAgaWYgKHR5cGVvZiBqdWxpYW5EYXkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBqdWxpYW5EYXkgPSBwYXJzZUludChqdWxpYW5EYXksIDEwKVxuICAgIH1cblxuICAgIC8vIG51bWJlciBvZiBmdWxsIDQgeWVhciBjeWNsZXNcbiAgICBjb25zdCBuNCA9IE1hdGguZmxvb3IoKGp1bGlhbkRheSArICgzICogMzY1KSkgLyAxNDYxKTtcblxuICAgIC8vIG51bWJlciBvZiBkYXlzIG9mIHRoZSBsYXN0IHVuY29tcGxldGUgNCB5ZWFycyBjeWNsZVxuICAgIGNvbnN0IHI0ID0gKGp1bGlhbkRheSArICgzICogMzY1KSkgJSAxNDYxO1xuXG4gICAgLy8gbnVtYmVyIG9mIGZ1bGwgeWVhcnMgb2YgdGhlIGxhc3QgdW5jb21wbGV0ZSA0IHllYXJzIGN5Y2xlXG4gICAgbGV0IG4xID0gTWF0aC5mbG9vcihyNCAvIDM2NSk7XG5cbiAgICAvLyBudW1iZXIgb2YgZGF5cyBpbiB0aGUgbGFzdCB5ZWFyXG4gICAgbGV0IGRheU9mWWVhciA9IHI0ICUgMzY1O1xuXG4gICAgaWYgKG4xID09PSA0KSB7XG4gICAgICBuMSA9IDM7XG4gICAgICBkYXlPZlllYXIgPSAzNjU7XG4gICAgfVxuXG4gICAgLy8gcnVubmluZyB5ZWFyXG4gICAgY29uc3QgcnVubmluZ1llYXIgPSA0ICogbjQgKyBuMTtcblxuICAgIC8vIGlmIEJDXG4gICAgaWYgKHJ1bm5pbmdZZWFyIDw9IDQ3MTUpIHtcbiAgICAgIC8vIHJlc3VsdGluZyB5ZWFyXG4gICAgICB0aGlzLnllYXIgPSBydW5uaW5nWWVhciAtIDQ3MTY7XG5cbiAgICAgIC8vIGlmIEFEXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMueWVhciA9IHJ1bm5pbmdZZWFyIC0gNDcxNTtcblxuICAgIH1cblxuICAgIGNvbnN0IG1vbnRoRGF5ID0gdGhpcy5jYWxjRGF0ZUJ5UnVubmluZ0RheShkYXlPZlllYXIsIHRoaXMuaXNMZWFwWWVhcigpKVxuXG4gICAgLy8gcmVzdWx0aW5nIG1vbnRoXG4gICAgdGhpcy5tb250aCA9IG1vbnRoRGF5Lm1vbnRoO1xuXG4gICAgLy8gcmVzdWx0aW5nIGRheVxuICAgIHRoaXMuZGF5ID0gbW9udGhEYXkuZGF5O1xuXG5cbiAgICByZXR1cm4gdGhpcztcblxuICB9XG5cblxuICAvKipcbiAgKiBSZXR1cm5zIHRydWUgaWYgZ2l2ZW4geWVhciBpcyBhIGxlYXAgeWVhclxuICAqL1xuICBpc0xlYXBZZWFyKCk6IGJvb2xlYW4ge1xuXG4gICAgLy8gUmV0dXJuIHRydWUgaWYgZXZlbmx5IGRpdmlzaWJsZSBieSA0XG4gICAgcmV0dXJuICEodGhpcy55ZWFyICUgNCkgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuXG4gIGdldEp1bGlhblNlY29uZCgpIHtcbiAgICBsZXQgc2Vjb25kcyA9IHRoaXMuZ2V0SnVsaWFuRGF5KCkgKiA2MCAqIDYwICogMjQ7IC8vIGZpcnN0IHNlY29uZCBvZiB0aGUgZGF5XG4gICAgaWYgKHRoaXMuc2Vjb25kcyA+IDApIHNlY29uZHMgPSBzZWNvbmRzICsgdGhpcy5zZWNvbmRzO1xuICAgIGlmICh0aGlzLm1pbnV0ZXMgPiAwKSBzZWNvbmRzID0gc2Vjb25kcyArIHRoaXMubWludXRlcyAqIDYwO1xuICAgIGlmICh0aGlzLmhvdXJzID4gMCkgc2Vjb25kcyA9IHNlY29uZHMgKyB0aGlzLmhvdXJzICogNjAgKiA2MDtcbiAgICByZXR1cm4gc2Vjb25kcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhpcyBKdWxpYW5EYXRlVGltZSBmcm9tIGdpdmVuIGp1bGlhbiBzZWNvbmRcbiAgICogQHBhcmFtIGp1bGlhblNlY29uZCBqdWxpYW4gc2Vjb25kXG4gICAqL1xuICBmcm9tSnVsaWFuU2Vjb25kKGp1bGlhblNlY29uZCkge1xuXG4gICAgY29uc3Qgc2Vjc1BlckRheSA9IDYwICogNjAgKiAyNDtcblxuICAgIC8vIG51bWJlciBvZiBmdWxsIGRheXNcbiAgICBjb25zdCBqdWxpYW5EYXkgPSBNYXRoLmZsb29yKGp1bGlhblNlY29uZCAvIHNlY3NQZXJEYXkpO1xuXG4gICAgLy8gbnVtYmVyIG9mIHNlY29uZHMgb2YgdGhlIGp1bGlhbiBkYXlcbiAgICBjb25zdCBzZWNzT2ZEYXkgPSBqdWxpYW5TZWNvbmQgJSBzZWNzUGVyRGF5O1xuXG4gICAgLy8gbnVtYmVyIG9mIG91cnMgb2YgdGhlIGRheVxuICAgIHRoaXMuaG91cnMgPSBNYXRoLmZsb29yKHNlY3NPZkRheSAvICg2MCAqIDYwKSlcblxuICAgIC8vIG51bWJlciBvZiBzZWNvbmRzIG9mIHRoZSBsYXN0IGhvdXJcbiAgICBjb25zdCBzZWNzT2ZIb3VyID0gdGhpcy5ob3VycyAlICg2MCAqIDYwKTtcblxuICAgIC8vIG51bWJlciBvZiBvdXJzIG9mIHRoZSBkYXlcbiAgICB0aGlzLm1pbnV0ZXMgPSBNYXRoLmZsb29yKHNlY3NPZkhvdXIgLyA2MClcblxuICAgIC8vIHNlY3Mgb2YgdGhlIGxhc3QgbWludXRlXG4gICAgdGhpcy5zZWNvbmRzID0gdGhpcy5taW51dGVzICUgNjA7XG5cbiAgICByZXR1cm4gdGhpcy5mcm9tSnVsaWFuRGF5KGp1bGlhbkRheSk7XG5cbiAgfVxuXG5cbn1cbiJdfQ==