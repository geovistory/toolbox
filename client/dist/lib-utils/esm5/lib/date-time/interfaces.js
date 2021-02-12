/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/interfaces.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function HoursMinutesSeconds() { }
if (false) {
    /** @type {?} */
    HoursMinutesSeconds.prototype.hours;
    /** @type {?} */
    HoursMinutesSeconds.prototype.minutes;
    /** @type {?} */
    HoursMinutesSeconds.prototype.seconds;
}
/**
 * @record
 */
export function YearMonthDay() { }
if (false) {
    /** @type {?} */
    YearMonthDay.prototype.year;
    /** @type {?} */
    YearMonthDay.prototype.month;
    /** @type {?} */
    YearMonthDay.prototype.day;
}
/**
 * @record
 */
export function DateTime() { }
if (false) {
    /** @type {?} */
    DateTime.prototype.hours;
    /** @type {?} */
    DateTime.prototype.minutes;
    /** @type {?} */
    DateTime.prototype.seconds;
    /** @type {?} */
    DateTime.prototype.year;
    /** @type {?} */
    DateTime.prototype.month;
    /** @type {?} */
    DateTime.prototype.day;
    /** @type {?} */
    DateTime.prototype.onDateChange;
    /**
     * get the julian day
     *
     * @return {?}
     */
    DateTime.prototype.getJulianDay = function () { };
    /**
     * Set julian day of the DateTime value (only affecting year, month, day)
     *
     * @param {?} julianDay
     * @return {?}
     */
    DateTime.prototype.fromJulianDay = function (julianDay) { };
    /**
     * get the julian second
     * @return {?}
     */
    DateTime.prototype.getJulianSecond = function () { };
    /**
     * Set julian second of the DateTime value (affecting year, month, day, hours, minutes, seconds)
     *
     * @param {?} julianSecond julian second
     * @return {?}
     */
    DateTime.prototype.fromJulianSecond = function (julianSecond) { };
    /**
     * Returns length of current month. If no month or year provided, returns
     * undefined.
     * @return {?}
     */
    DateTime.prototype.lengthOfMonth = function () { };
    /**
     * Returns true if this.year is a leap year
     * @return {?}
     */
    DateTime.prototype.isLeapYear = function () { };
    /**
     * @return {?}
     */
    DateTime.prototype.addYear = function () { };
    /**
     * @return {?}
     */
    DateTime.prototype.addMonth = function () { };
    /**
     * @return {?}
     */
    DateTime.prototype.addDay = function () { };
    /**
     * @return {?}
     */
    DateTime.prototype.addHour = function () { };
    /**
     * @return {?}
     */
    DateTime.prototype.addMinute = function () { };
    /**
     * @return {?}
     */
    DateTime.prototype.addSecond = function () { };
    /**
     * @param {?} duration
     * @return {?}
     */
    DateTime.prototype.add = function (duration) { };
    /**
     * @param {?} duration
     * @return {?}
     */
    DateTime.prototype.toLastSecondOf = function (duration) { };
    /**
     * @param {?} duration
     * @return {?}
     */
    DateTime.prototype.getEndOf = function (duration) { };
    /**
     * @return {?}
     */
    DateTime.prototype.getDate = function () { };
    /**
     * @return {?}
     */
    DateTime.prototype.emitDateChange = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2ludGVyZmFjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFLQSx5Q0FJQzs7O0lBSEMsb0NBQWM7O0lBQ2Qsc0NBQWdCOztJQUNoQixzQ0FBZ0I7Ozs7O0FBR2xCLGtDQUtDOzs7SUFKQyw0QkFBYTs7SUFDYiw2QkFBYzs7SUFDZCwyQkFBWTs7Ozs7QUFJZCw4QkE2RUM7OztJQTFFQyx5QkFBYzs7SUFDZCwyQkFBZ0I7O0lBQ2hCLDJCQUFnQjs7SUFHaEIsd0JBQWE7O0lBQ2IseUJBQWM7O0lBQ2QsdUJBQVk7O0lBSVosZ0NBQXlDOzs7Ozs7SUFPekMsa0RBQXVCOzs7Ozs7O0lBT3ZCLDREQUFxRTs7Ozs7SUFLckUscURBQXlCOzs7Ozs7O0lBT3pCLGtFQUEyRTs7Ozs7O0lBTzNFLG1EQUF3Qjs7Ozs7SUFLeEIsZ0RBQXNCOzs7O0lBR3RCLDZDQUFlOzs7O0lBRWYsOENBQWlCOzs7O0lBRWpCLDRDQUFlOzs7O0lBRWYsNkNBQWdCOzs7O0lBRWhCLCtDQUFrQjs7OztJQUVsQiwrQ0FBa0I7Ozs7O0lBRWxCLGlEQUEyQjs7Ozs7SUFFM0IsNERBQXNDOzs7OztJQUV0QyxzREFBMEM7Ozs7SUFFMUMsNkNBQWdCOzs7O0lBRWhCLG9EQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3JhbnVsYXJpdHkgfSBmcm9tICcuL2NsYXNzZXMvZGF0ZS10aW1lLWNvbW1vbnMnO1xuaW1wb3J0IHsgR3JlZ29yaWFuRGF0ZVRpbWUsIEp1bGlhbkRhdGVUaW1lIH0gZnJvbSAnLic7XG5cblxuZXhwb3J0IGludGVyZmFjZSBIb3Vyc01pbnV0ZXNTZWNvbmRzIHtcbiAgaG91cnM6IG51bWJlcjtcbiAgbWludXRlczogbnVtYmVyO1xuICBzZWNvbmRzOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgWWVhck1vbnRoRGF5IHtcbiAgeWVhcjogbnVtYmVyO1xuICBtb250aDogbnVtYmVyO1xuICBkYXk6IG51bWJlcjtcblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhdGVUaW1lIHtcblxuICAvLyBUaW1lIHZhbHVlc1xuICBob3VyczogbnVtYmVyO1xuICBtaW51dGVzOiBudW1iZXI7XG4gIHNlY29uZHM6IG51bWJlcjtcblxuICAvLyBEYXRlIHZhbHVlc1xuICB5ZWFyOiBudW1iZXI7IC8vIHRoZSB5ZWFyIChuZWdhdGl2ZSBhbmQgcG9zaXRpdmUgdmFsdWVzIGV4Y2VwdCAwKVxuICBtb250aDogbnVtYmVyOyAvLyB0aGUgbW9udGggZnJvbSAxPWphbnVhcnkgdG8gMTI9ZGVjZW1iZXJcbiAgZGF5OiBudW1iZXI7IC8vIHRoZSBkYXkgb2YgbW9udGggZnJvbSAxIHRvIDMxXG5cblxuICAvLyBFbWl0cyBZZWFyTW9udGhEYXkgd2hlbiBEYXRlIGNoYW5nZXNcbiAgb25EYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8WWVhck1vbnRoRGF5PjtcblxuICAvKipcbiAgICogZ2V0IHRoZSBqdWxpYW4gZGF5XG4gICAqXG4gICAqIEByZXR1cm4ge251bWJlcn0gIGp1bGlhbiBkYXlcbiAgICovXG4gIGdldEp1bGlhbkRheSgpOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFNldCBqdWxpYW4gZGF5IG9mIHRoZSBEYXRlVGltZSB2YWx1ZSAob25seSBhZmZlY3RpbmcgeWVhciwgbW9udGgsIGRheSlcbiAgICpcbiAgICogQHBhcmFtIGp1bGlhblNlY29uZCBqdWxpYW4gc2Vjb25kXG4gICAqL1xuICBmcm9tSnVsaWFuRGF5KGp1bGlhbkRheTogbnVtYmVyKTogR3JlZ29yaWFuRGF0ZVRpbWUgfCBKdWxpYW5EYXRlVGltZTtcblxuICAvKipcbiAgICogZ2V0IHRoZSBqdWxpYW4gc2Vjb25kXG4gICAqL1xuICBnZXRKdWxpYW5TZWNvbmQoKTogbnVtYmVyXG5cbiAgLyoqXG4gICAqIFNldCBqdWxpYW4gc2Vjb25kIG9mIHRoZSBEYXRlVGltZSB2YWx1ZSAoYWZmZWN0aW5nIHllYXIsIG1vbnRoLCBkYXksIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzKVxuICAgKlxuICAgKiBAcGFyYW0ganVsaWFuU2Vjb25kIGp1bGlhbiBzZWNvbmRcbiAgICovXG4gIGZyb21KdWxpYW5TZWNvbmQoanVsaWFuU2Vjb25kOiBudW1iZXIpOiBHcmVnb3JpYW5EYXRlVGltZSB8IEp1bGlhbkRhdGVUaW1lO1xuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgbGVuZ3RoIG9mIGN1cnJlbnQgbW9udGguIElmIG5vIG1vbnRoIG9yIHllYXIgcHJvdmlkZWQsIHJldHVybnNcbiAgICogdW5kZWZpbmVkLlxuICAgKi9cbiAgbGVuZ3RoT2ZNb250aCgpOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzLnllYXIgaXMgYSBsZWFwIHllYXJcbiAgICovXG4gIGlzTGVhcFllYXIoKTogYm9vbGVhbjtcblxuXG4gIGFkZFllYXIoKTogdm9pZFxuXG4gIGFkZE1vbnRoKCk6IHZvaWQ7XG5cbiAgYWRkRGF5KCk6IHZvaWQ7XG5cbiAgYWRkSG91cigpOiB2b2lkO1xuXG4gIGFkZE1pbnV0ZSgpOiB2b2lkO1xuXG4gIGFkZFNlY29uZCgpOiB2b2lkO1xuXG4gIGFkZChkdXJhdGlvbjogR3JhbnVsYXJpdHkpO1xuXG4gIHRvTGFzdFNlY29uZE9mKGR1cmF0aW9uOiBHcmFudWxhcml0eSk7XG5cbiAgZ2V0RW5kT2YoZHVyYXRpb246IEdyYW51bGFyaXR5KTogRGF0ZVRpbWU7XG5cbiAgZ2V0RGF0ZSgpOiBEYXRlO1xuXG4gIGVtaXREYXRlQ2hhbmdlKClcblxufVxuXG4iXX0=