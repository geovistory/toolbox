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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2ludGVyZmFjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFNQSx5Q0FJQzs7O0lBSEMsb0NBQWM7O0lBQ2Qsc0NBQWdCOztJQUNoQixzQ0FBZ0I7Ozs7O0FBR2xCLGtDQUtDOzs7SUFKQyw0QkFBYTs7SUFDYiw2QkFBYzs7SUFDZCwyQkFBWTs7Ozs7QUFJZCw4QkE2RUM7OztJQTFFQyx5QkFBYzs7SUFDZCwyQkFBZ0I7O0lBQ2hCLDJCQUFnQjs7SUFHaEIsd0JBQWE7O0lBQ2IseUJBQWM7O0lBQ2QsdUJBQVk7O0lBSVosZ0NBQXlDOzs7Ozs7SUFPekMsa0RBQXVCOzs7Ozs7O0lBT3ZCLDREQUFxRTs7Ozs7SUFLckUscURBQXlCOzs7Ozs7O0lBT3pCLGtFQUEyRTs7Ozs7O0lBTzNFLG1EQUF3Qjs7Ozs7SUFLeEIsZ0RBQXNCOzs7O0lBR3RCLDZDQUFlOzs7O0lBRWYsOENBQWlCOzs7O0lBRWpCLDRDQUFlOzs7O0lBRWYsNkNBQWdCOzs7O0lBRWhCLCtDQUFrQjs7OztJQUVsQiwrQ0FBa0I7Ozs7O0lBRWxCLGlEQUEyQjs7Ozs7SUFFM0IsNERBQXNDOzs7OztJQUV0QyxzREFBMEM7Ozs7SUFFMUMsNkNBQWdCOzs7O0lBRWhCLG9EQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3JhbnVsYXJpdHkgfSBmcm9tICcuL2RhdGUtdGltZS1jb21tb25zJztcbmltcG9ydCB7IEp1bGlhbkRhdGVUaW1lIH0gZnJvbSAnLi9qdWxpYW4tZGF0ZS10aW1lJztcbmltcG9ydCB7IEdyZWdvcmlhbkRhdGVUaW1lIH0gZnJvbSAnLi9ncmVnb3JpYW4tZGF0ZS10aW1lJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIEhvdXJzTWludXRlc1NlY29uZHMge1xuICBob3VyczogbnVtYmVyO1xuICBtaW51dGVzOiBudW1iZXI7XG4gIHNlY29uZHM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBZZWFyTW9udGhEYXkge1xuICB5ZWFyOiBudW1iZXI7XG4gIG1vbnRoOiBudW1iZXI7XG4gIGRheTogbnVtYmVyO1xuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0ZVRpbWUge1xuXG4gIC8vIFRpbWUgdmFsdWVzXG4gIGhvdXJzOiBudW1iZXI7XG4gIG1pbnV0ZXM6IG51bWJlcjtcbiAgc2Vjb25kczogbnVtYmVyO1xuXG4gIC8vIERhdGUgdmFsdWVzXG4gIHllYXI6IG51bWJlcjsgLy8gdGhlIHllYXIgKG5lZ2F0aXZlIGFuZCBwb3NpdGl2ZSB2YWx1ZXMgZXhjZXB0IDApXG4gIG1vbnRoOiBudW1iZXI7IC8vIHRoZSBtb250aCBmcm9tIDE9amFudWFyeSB0byAxMj1kZWNlbWJlclxuICBkYXk6IG51bWJlcjsgLy8gdGhlIGRheSBvZiBtb250aCBmcm9tIDEgdG8gMzFcblxuXG4gIC8vIEVtaXRzIFllYXJNb250aERheSB3aGVuIERhdGUgY2hhbmdlc1xuICBvbkRhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxZZWFyTW9udGhEYXk+O1xuXG4gIC8qKlxuICAgKiBnZXQgdGhlIGp1bGlhbiBkYXlcbiAgICpcbiAgICogQHJldHVybiB7bnVtYmVyfSAganVsaWFuIGRheVxuICAgKi9cbiAgZ2V0SnVsaWFuRGF5KCk6IG51bWJlcjtcblxuICAvKipcbiAgICogU2V0IGp1bGlhbiBkYXkgb2YgdGhlIERhdGVUaW1lIHZhbHVlIChvbmx5IGFmZmVjdGluZyB5ZWFyLCBtb250aCwgZGF5KVxuICAgKlxuICAgKiBAcGFyYW0ganVsaWFuU2Vjb25kIGp1bGlhbiBzZWNvbmRcbiAgICovXG4gIGZyb21KdWxpYW5EYXkoanVsaWFuRGF5OiBudW1iZXIpOiBHcmVnb3JpYW5EYXRlVGltZSB8IEp1bGlhbkRhdGVUaW1lO1xuXG4gIC8qKlxuICAgKiBnZXQgdGhlIGp1bGlhbiBzZWNvbmRcbiAgICovXG4gIGdldEp1bGlhblNlY29uZCgpOiBudW1iZXJcblxuICAvKipcbiAgICogU2V0IGp1bGlhbiBzZWNvbmQgb2YgdGhlIERhdGVUaW1lIHZhbHVlIChhZmZlY3RpbmcgeWVhciwgbW9udGgsIGRheSwgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMpXG4gICAqXG4gICAqIEBwYXJhbSBqdWxpYW5TZWNvbmQganVsaWFuIHNlY29uZFxuICAgKi9cbiAgZnJvbUp1bGlhblNlY29uZChqdWxpYW5TZWNvbmQ6IG51bWJlcik6IEdyZWdvcmlhbkRhdGVUaW1lIHwgSnVsaWFuRGF0ZVRpbWU7XG5cblxuICAvKipcbiAgICogUmV0dXJucyBsZW5ndGggb2YgY3VycmVudCBtb250aC4gSWYgbm8gbW9udGggb3IgeWVhciBwcm92aWRlZCwgcmV0dXJuc1xuICAgKiB1bmRlZmluZWQuXG4gICAqL1xuICBsZW5ndGhPZk1vbnRoKCk6IG51bWJlcjtcblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMueWVhciBpcyBhIGxlYXAgeWVhclxuICAgKi9cbiAgaXNMZWFwWWVhcigpOiBib29sZWFuO1xuXG5cbiAgYWRkWWVhcigpOiB2b2lkXG5cbiAgYWRkTW9udGgoKTogdm9pZDtcblxuICBhZGREYXkoKTogdm9pZDtcblxuICBhZGRIb3VyKCk6IHZvaWQ7XG5cbiAgYWRkTWludXRlKCk6IHZvaWQ7XG5cbiAgYWRkU2Vjb25kKCk6IHZvaWQ7XG5cbiAgYWRkKGR1cmF0aW9uOiBHcmFudWxhcml0eSk7XG5cbiAgdG9MYXN0U2Vjb25kT2YoZHVyYXRpb246IEdyYW51bGFyaXR5KTtcblxuICBnZXRFbmRPZihkdXJhdGlvbjogR3JhbnVsYXJpdHkpOiBEYXRlVGltZTtcblxuICBnZXREYXRlKCk6IERhdGU7XG5cbiAgZW1pdERhdGVDaGFuZ2UoKVxuXG59XG5cbiJdfQ==