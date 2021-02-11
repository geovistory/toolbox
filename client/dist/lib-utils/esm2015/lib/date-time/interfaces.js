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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2ludGVyZmFjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFNQSx5Q0FJQzs7O0lBSEMsb0NBQWM7O0lBQ2Qsc0NBQWdCOztJQUNoQixzQ0FBZ0I7Ozs7O0FBR2xCLGtDQUtDOzs7SUFKQyw0QkFBYTs7SUFDYiw2QkFBYzs7SUFDZCwyQkFBWTs7Ozs7QUFJZCw4QkE2RUM7OztJQTFFQyx5QkFBYzs7SUFDZCwyQkFBZ0I7O0lBQ2hCLDJCQUFnQjs7SUFHaEIsd0JBQWE7O0lBQ2IseUJBQWM7O0lBQ2QsdUJBQVk7O0lBSVosZ0NBQXlDOzs7Ozs7SUFPekMsa0RBQXVCOzs7Ozs7O0lBT3ZCLDREQUFxRTs7Ozs7SUFLckUscURBQXlCOzs7Ozs7O0lBT3pCLGtFQUEyRTs7Ozs7O0lBTzNFLG1EQUF3Qjs7Ozs7SUFLeEIsZ0RBQXNCOzs7O0lBR3RCLDZDQUFlOzs7O0lBRWYsOENBQWlCOzs7O0lBRWpCLDRDQUFlOzs7O0lBRWYsNkNBQWdCOzs7O0lBRWhCLCtDQUFrQjs7OztJQUVsQiwrQ0FBa0I7Ozs7O0lBRWxCLGlEQUEyQjs7Ozs7SUFFM0IsNERBQXNDOzs7OztJQUV0QyxzREFBMEM7Ozs7SUFFMUMsNkNBQWdCOzs7O0lBRWhCLG9EQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3JhbnVsYXJpdHkgfSBmcm9tICcuL2RhdGUtdGltZS1jb21tb25zJztcbmltcG9ydCB7IEp1bGlhbkRhdGVUaW1lIH0gZnJvbSAnLi9qdWxpYW4tZGF0ZS10aW1lJztcbmltcG9ydCB7IEdyZWdvcmlhbkRhdGVUaW1lIH0gZnJvbSAnLi9ncmVnb3JpYW4tZGF0ZS10aW1lJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIEhvdXJzTWludXRlc1NlY29uZHMge1xuICBob3VyczogbnVtYmVyO1xuICBtaW51dGVzOiBudW1iZXI7XG4gIHNlY29uZHM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBZZWFyTW9udGhEYXkge1xuICB5ZWFyOiBudW1iZXI7XG4gIG1vbnRoOiBudW1iZXI7XG4gIGRheTogbnVtYmVyO1xuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0ZVRpbWUge1xuXG4gIC8vIFRpbWUgdmFsdWVzXG4gIGhvdXJzOiBudW1iZXI7XG4gIG1pbnV0ZXM6IG51bWJlcjtcbiAgc2Vjb25kczogbnVtYmVyO1xuXG4gIC8vIERhdGUgdmFsdWVzXG4gIHllYXI6IG51bWJlcjsgLy8gdGhlIHllYXIgKG5lZ2F0aXZlIGFuZCBwb3NpdGl2ZSB2YWx1ZXMgZXhjZXB0IDApXG4gIG1vbnRoOiBudW1iZXI7IC8vIHRoZSBtb250aCBmcm9tIDE9amFudWFyeSB0byAxMj1kZWNlbWJlclxuICBkYXk6IG51bWJlcjsgLy8gdGhlIGRheSBvZiBtb250aCBmcm9tIDEgdG8gMzFcblxuXG4gIC8vIEVtaXRzIFllYXJNb250aERheSB3aGVuIERhdGUgY2hhbmdlc1xuICBvbkRhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxZZWFyTW9udGhEYXk+O1xuXG4gIC8qKlxuICAgKiBnZXQgdGhlIGp1bGlhbiBkYXkgXG4gICAqXG4gICAqIEByZXR1cm4ge251bWJlcn0gIGp1bGlhbiBkYXlcbiAgICovXG4gIGdldEp1bGlhbkRheSgpOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFNldCBqdWxpYW4gZGF5IG9mIHRoZSBEYXRlVGltZSB2YWx1ZSAob25seSBhZmZlY3RpbmcgeWVhciwgbW9udGgsIGRheSlcbiAgICpcbiAgICogQHBhcmFtIGp1bGlhblNlY29uZCBqdWxpYW4gc2Vjb25kXG4gICAqL1xuICBmcm9tSnVsaWFuRGF5KGp1bGlhbkRheTogbnVtYmVyKTogR3JlZ29yaWFuRGF0ZVRpbWUgfCBKdWxpYW5EYXRlVGltZTtcblxuICAvKipcbiAgICogZ2V0IHRoZSBqdWxpYW4gc2Vjb25kXG4gICAqL1xuICBnZXRKdWxpYW5TZWNvbmQoKTogbnVtYmVyXG5cbiAgLyoqXG4gICAqIFNldCBqdWxpYW4gc2Vjb25kIG9mIHRoZSBEYXRlVGltZSB2YWx1ZSAoYWZmZWN0aW5nIHllYXIsIG1vbnRoLCBkYXksIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzKVxuICAgKiBcbiAgICogQHBhcmFtIGp1bGlhblNlY29uZCBqdWxpYW4gc2Vjb25kXG4gICAqL1xuICBmcm9tSnVsaWFuU2Vjb25kKGp1bGlhblNlY29uZDogbnVtYmVyKTogR3JlZ29yaWFuRGF0ZVRpbWUgfCBKdWxpYW5EYXRlVGltZTtcblxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGxlbmd0aCBvZiBjdXJyZW50IG1vbnRoLiBJZiBubyBtb250aCBvciB5ZWFyIHByb3ZpZGVkLCByZXR1cm5zXG4gICAqIHVuZGVmaW5lZC5cbiAgICovXG4gIGxlbmd0aE9mTW9udGgoKTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcy55ZWFyIGlzIGEgbGVhcCB5ZWFyXG4gICAqL1xuICBpc0xlYXBZZWFyKCk6IGJvb2xlYW47XG5cblxuICBhZGRZZWFyKCk6IHZvaWRcblxuICBhZGRNb250aCgpOiB2b2lkO1xuXG4gIGFkZERheSgpOiB2b2lkO1xuXG4gIGFkZEhvdXIoKTogdm9pZDtcblxuICBhZGRNaW51dGUoKTogdm9pZDtcblxuICBhZGRTZWNvbmQoKTogdm9pZDtcblxuICBhZGQoZHVyYXRpb246IEdyYW51bGFyaXR5KTtcblxuICB0b0xhc3RTZWNvbmRPZihkdXJhdGlvbjogR3JhbnVsYXJpdHkpO1xuXG4gIGdldEVuZE9mKGR1cmF0aW9uOiBHcmFudWxhcml0eSk6IERhdGVUaW1lO1xuXG4gIGdldERhdGUoKTogRGF0ZTtcblxuICBlbWl0RGF0ZUNoYW5nZSgpXG5cbn1cblxuIl19