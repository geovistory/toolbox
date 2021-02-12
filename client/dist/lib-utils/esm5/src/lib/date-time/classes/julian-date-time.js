/**
 * @fileoverview added by tsickle
 * Generated from: classes/julian-date-time.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVsaWFuLWRhdGUtdGltZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvc3JjL2xpYi9kYXRlLXRpbWUvIiwic291cmNlcyI6WyJjbGFzc2VzL2p1bGlhbi1kYXRlLXRpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBZSxNQUFNLHFCQUFxQixDQUFDOzs7OztBQVNuRTs7Ozs7SUFBb0MsMENBQWU7SUFBbkQ7O0lBa0tBLENBQUM7SUEvSkM7O01BRUU7Ozs7OztJQUVGLGlDQUFROzs7OztJQUFSLFVBQVMsUUFBNkM7UUFBN0MseUJBQUEsRUFBQSxXQUF3QixJQUFJLENBQUMsY0FBYyxFQUFFOztZQUU5QyxFQUFFLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDO1FBQ25DLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFNUIsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzs7O0lBR0Qsc0NBQWE7OztJQUFiOztZQUNRLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSTs7WUFDZixDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUs7OztZQUdaLFdBQVcsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBRXBFLHdFQUF3RTtRQUN4RSxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUNyRCxXQUFXLENBQUMsQ0FBQyxDQUFD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QztRQUVqQyxPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUV2QyxDQUFDO0lBR0gscUJBQUM7QUFBRCxDQUFDLEFBbEtELENBQW9DLGVBQWUsR0FrS2xEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0ZVRpbWVDb21tb25zLCBHcmFudWxhcml0eSB9IGZyb20gJy4vZGF0ZS10aW1lLWNvbW1vbnMnO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcblxuXG5cbi8qKlxuKiBDbGFzcyB0byByZXByZXNlbnQgYSBKdWxpYW4gRGF0ZSBhbmQgVGltZVxuKiBUT0RPOiBNb3ZlIHRoaXMgY2xhc3MgdG8gY29tbW9uIGZvbGRlciBhcyBpdCBpcyBuZWVkZWQgYnkgc2VydmVyIGFuZCBjbGllbnRcbiovXG5leHBvcnQgY2xhc3MgSnVsaWFuRGF0ZVRpbWUgZXh0ZW5kcyBEYXRlVGltZUNvbW1vbnMgaW1wbGVtZW50cyBEYXRlVGltZSB7XG5cblxuICAvKipcbiAgKiBNZXRob2RzXG4gICovXG5cbiAgZ2V0RW5kT2YoZHVyYXRpb246IEdyYW51bGFyaXR5ID0gdGhpcy5nZXRHcmFudWxhcml0eSgpKTogSnVsaWFuRGF0ZVRpbWUge1xuXG4gICAgY29uc3QgZHQgPSBuZXcgSnVsaWFuRGF0ZVRpbWUodGhpcyk7XG4gICAgZHQudG9MYXN0U2Vjb25kT2YoZHVyYXRpb24pO1xuXG4gICAgcmV0dXJuIGR0O1xuICB9XG5cblxuICBsZW5ndGhPZk1vbnRoKCkge1xuICAgIGNvbnN0IHkgPSB0aGlzLnllYXI7XG4gICAgbGV0IG0gPSB0aGlzLm1vbnRoO1xuXG4gICAgLy8gQXNzdW1lIG5vdCBsZWFwIHllYXIgYnkgZGVmYXVsdCAobm90ZSB6ZXJvIGluZGV4IGZvciBKYW4pXG4gICAgY29uc3QgZGF5c0luTW9udGggPSBbMzEsIDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV07XG5cbiAgICAvLyBJZiBldmVubHkgZGl2aXNpYmxlIGJ5IDQgYW5kIG5vdCBvbmUgb2YgdGhlIHllYXJzIDUgQkMsIDEgQkMgb3IgNCBBRCxcbiAgICAvLyB3aGVuIEF1Z3VzdHVzIGRyb3BwZWQgdGhlIGxlYXAgeWVhclxuICAgIGlmICghKHkgJSA0KSAmJiAhKHkgPT0gLTUpICYmICEoeSA9PSAtMSkgJiYgISh5ID09IDQpKSB7XG4gICAgICBkYXlzSW5Nb250aFsxXSA9IDI5O1xuICAgIH1cbiAgICByZXR1cm4gZGF5c0luTW9udGhbLS1tXVxuICB9XG5cblxuXG4gIC8qKlxuICAqIENvbnZlcnQgdGhlIHllYXIsIG1vbnRoLCBkYXkgb2YganVsaWFuIGNhbGVuZGFyIHRvIGp1bGlhbiBkYXlcbiAgKlxuICAqIEByZXR1cm4gIGRlc2NyaXB0aW9uXG4gICovXG4gIGdldEp1bGlhbkRheSgpIHtcblxuICAgIC8vIHJ1bm5pbmcgZGF5IChjb251dCBvZiBkYXlzIHRoYXQgeWVhcilcbiAgICBjb25zdCBydW5uaW5nRGF5ID0gdGhpcy5jYWxjUnVubmluZ0RheSh0aGlzLm1vbnRoLCB0aGlzLmRheSwgdGhpcy5pc0xlYXBZZWFyKCkpO1xuICAgIGxldCBydW5uaW5nWWVhcjtcbiAgICBpZiAodGhpcy55ZWFyIDwgMCkge1xuICAgICAgLy8gcnVubmluZyB5ZWFyXG4gICAgICBydW5uaW5nWWVhciA9IDQ3MTYgKyB0aGlzLnllYXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJ1bm5pbmcgeWVhclxuICAgICAgcnVubmluZ1llYXIgPSA0NzE1ICsgdGhpcy55ZWFyO1xuICAgIH1cblxuICAgIC8vIG51bWJlciBvZiBmdWxsIDQgeWVhciBjeWNsZXNcbiAgICBjb25zdCBuNCA9IE1hdGguZmxvb3IocnVubmluZ1llYXIgLyA0KVxuXG4gICAgLy8gcmVzdCBvZiBkaXZpc2lvbjogbnVtYmVyIG9mIGZ1bGwgeWVhcnMgb2YgdGhlIGxhc3QgdW5jb21wbGV0ZSA0IHllYXJzIGN5Y2xlXG4gICAgY29uc3QgbjEgPSBydW5uaW5nWWVhciAlIDQ7XG5cblxuICAgIHJldHVybiAxNDYxICogbjQgKyAzNjUgKiAobjEgLSAzKSArIHJ1bm5pbmdEYXk7XG4gIH1cblxuXG4gIGZyb21KdWxpYW5EYXkoanVsaWFuRGF5OiBudW1iZXIpIHtcblxuICAgIGlmICh0eXBlb2YganVsaWFuRGF5ID09PSAnc3RyaW5nJykge1xuICAgICAganVsaWFuRGF5ID0gcGFyc2VJbnQoanVsaWFuRGF5LCAxMClcbiAgICB9XG5cbiAgICAvLyBudW1iZXIgb2YgZnVsbCA0IHllYXIgY3ljbGVzXG4gICAgY29uc3QgbjQgPSBNYXRoLmZsb29yKChqdWxpYW5EYXkgKyAoMyAqIDM2NSkpIC8gMTQ2MSk7XG5cbiAgICAvLyBudW1iZXIgb2YgZGF5cyBvZiB0aGUgbGFzdCB1bmNvbXBsZXRlIDQgeWVhcnMgY3ljbGVcbiAgICBjb25zdCByNCA9IChqdWxpYW5EYXkgKyAoMyAqIDM2NSkpICUgMTQ2MTtcblxuICAgIC8vIG51bWJlciBvZiBmdWxsIHllYXJzIG9mIHRoZSBsYXN0IHVuY29tcGxldGUgNCB5ZWFycyBjeWNsZVxuICAgIGxldCBuMSA9IE1hdGguZmxvb3IocjQgLyAzNjUpO1xuXG4gICAgLy8gbnVtYmVyIG9mIGRheXMgaW4gdGhlIGxhc3QgeWVhclxuICAgIGxldCBkYXlPZlllYXIgPSByNCAlIDM2NTtcblxuICAgIGlmIChuMSA9PT0gNCkge1xuICAgICAgbjEgPSAzO1xuICAgICAgZGF5T2ZZZWFyID0gMzY1O1xuICAgIH1cblxuICAgIC8vIHJ1bm5pbmcgeWVhclxuICAgIGNvbnN0IHJ1bm5pbmdZZWFyID0gNCAqIG40ICsgbjE7XG5cbiAgICAvLyBpZiBCQ1xuICAgIGlmIChydW5uaW5nWWVhciA8PSA0NzE1KSB7XG4gICAgICAvLyByZXN1bHRpbmcgeWVhclxuICAgICAgdGhpcy55ZWFyID0gcnVubmluZ1llYXIgLSA0NzE2O1xuXG4gICAgICAvLyBpZiBBRFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnllYXIgPSBydW5uaW5nWWVhciAtIDQ3MTU7XG5cbiAgICB9XG5cbiAgICBjb25zdCBtb250aERheSA9IHRoaXMuY2FsY0RhdGVCeVJ1bm5pbmdEYXkoZGF5T2ZZZWFyLCB0aGlzLmlzTGVhcFllYXIoKSlcblxuICAgIC8vIHJlc3VsdGluZyBtb250aFxuICAgIHRoaXMubW9udGggPSBtb250aERheS5tb250aDtcblxuICAgIC8vIHJlc3VsdGluZyBkYXlcbiAgICB0aGlzLmRheSA9IG1vbnRoRGF5LmRheTtcblxuXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfVxuXG5cbiAgLyoqXG4gICogUmV0dXJucyB0cnVlIGlmIGdpdmVuIHllYXIgaXMgYSBsZWFwIHllYXJcbiAgKi9cbiAgaXNMZWFwWWVhcigpOiBib29sZWFuIHtcblxuICAgIC8vIFJldHVybiB0cnVlIGlmIGV2ZW5seSBkaXZpc2libGUgYnkgNFxuICAgIHJldHVybiAhKHRoaXMueWVhciAlIDQpID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cblxuICBnZXRKdWxpYW5TZWNvbmQoKSB7XG4gICAgbGV0IHNlY29uZHMgPSB0aGlzLmdldEp1bGlhbkRheSgpICogNjAgKiA2MCAqIDI0OyAvLyBmaXJzdCBzZWNvbmQgb2YgdGhlIGRheVxuICAgIGlmICh0aGlzLnNlY29uZHMgPiAwKSBzZWNvbmRzID0gc2Vjb25kcyArIHRoaXMuc2Vjb25kcztcbiAgICBpZiAodGhpcy5taW51dGVzID4gMCkgc2Vjb25kcyA9IHNlY29uZHMgKyB0aGlzLm1pbnV0ZXMgKiA2MDtcbiAgICBpZiAodGhpcy5ob3VycyA+IDApIHNlY29uZHMgPSBzZWNvbmRzICsgdGhpcy5ob3VycyAqIDYwICogNjA7XG4gICAgcmV0dXJuIHNlY29uZHM7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoaXMgSnVsaWFuRGF0ZVRpbWUgZnJvbSBnaXZlbiBqdWxpYW4gc2Vjb25kXG4gICAqIEBwYXJhbSBqdWxpYW5TZWNvbmQganVsaWFuIHNlY29uZFxuICAgKi9cbiAgZnJvbUp1bGlhblNlY29uZChqdWxpYW5TZWNvbmQpIHtcblxuICAgIGNvbnN0IHNlY3NQZXJEYXkgPSA2MCAqIDYwICogMjQ7XG5cbiAgICAvLyBudW1iZXIgb2YgZnVsbCBkYXlzXG4gICAgY29uc3QganVsaWFuRGF5ID0gTWF0aC5mbG9vcihqdWxpYW5TZWNvbmQgLyBzZWNzUGVyRGF5KTtcblxuICAgIC8vIG51bWJlciBvZiBzZWNvbmRzIG9mIHRoZSBqdWxpYW4gZGF5XG4gICAgY29uc3Qgc2Vjc09mRGF5ID0ganVsaWFuU2Vjb25kICUgc2Vjc1BlckRheTtcblxuICAgIC8vIG51bWJlciBvZiBvdXJzIG9mIHRoZSBkYXlcbiAgICB0aGlzLmhvdXJzID0gTWF0aC5mbG9vcihzZWNzT2ZEYXkgLyAoNjAgKiA2MCkpXG5cbiAgICAvLyBudW1iZXIgb2Ygc2Vjb25kcyBvZiB0aGUgbGFzdCBob3VyXG4gICAgY29uc3Qgc2Vjc09mSG91ciA9IHRoaXMuaG91cnMgJSAoNjAgKiA2MCk7XG5cbiAgICAvLyBudW1iZXIgb2Ygb3VycyBvZiB0aGUgZGF5XG4gICAgdGhpcy5taW51dGVzID0gTWF0aC5mbG9vcihzZWNzT2ZIb3VyIC8gNjApXG5cbiAgICAvLyBzZWNzIG9mIHRoZSBsYXN0IG1pbnV0ZVxuICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMubWludXRlcyAlIDYwO1xuXG4gICAgcmV0dXJuIHRoaXMuZnJvbUp1bGlhbkRheShqdWxpYW5EYXkpO1xuXG4gIH1cblxuXG59XG4iXX0=