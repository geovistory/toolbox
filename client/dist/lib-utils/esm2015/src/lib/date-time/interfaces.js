/**
 * @fileoverview added by tsickle
 * Generated from: interfaces.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvc3JjL2xpYi9kYXRlLXRpbWUvIiwic291cmNlcyI6WyJpbnRlcmZhY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBTUEseUNBSUM7OztJQUhDLG9DQUFjOztJQUNkLHNDQUFnQjs7SUFDaEIsc0NBQWdCOzs7OztBQUdsQixrQ0FLQzs7O0lBSkMsNEJBQWE7O0lBQ2IsNkJBQWM7O0lBQ2QsMkJBQVk7Ozs7O0FBSWQsOEJBNkVDOzs7SUExRUMseUJBQWM7O0lBQ2QsMkJBQWdCOztJQUNoQiwyQkFBZ0I7O0lBR2hCLHdCQUFhOztJQUNiLHlCQUFjOztJQUNkLHVCQUFZOztJQUlaLGdDQUF5Qzs7Ozs7O0lBT3pDLGtEQUF1Qjs7Ozs7OztJQU92Qiw0REFBcUU7Ozs7O0lBS3JFLHFEQUF5Qjs7Ozs7OztJQU96QixrRUFBMkU7Ozs7OztJQU8zRSxtREFBd0I7Ozs7O0lBS3hCLGdEQUFzQjs7OztJQUd0Qiw2Q0FBZTs7OztJQUVmLDhDQUFpQjs7OztJQUVqQiw0Q0FBZTs7OztJQUVmLDZDQUFnQjs7OztJQUVoQiwrQ0FBa0I7Ozs7SUFFbEIsK0NBQWtCOzs7OztJQUVsQixpREFBMkI7Ozs7O0lBRTNCLDREQUFzQzs7Ozs7SUFFdEMsc0RBQTBDOzs7O0lBRTFDLDZDQUFnQjs7OztJQUVoQixvREFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdyYW51bGFyaXR5IH0gZnJvbSAnLi9kYXRlLXRpbWUtY29tbW9ucyc7XG5pbXBvcnQgeyBKdWxpYW5EYXRlVGltZSB9IGZyb20gJy4vanVsaWFuLWRhdGUtdGltZSc7XG5pbXBvcnQgeyBHcmVnb3JpYW5EYXRlVGltZSB9IGZyb20gJy4vZ3JlZ29yaWFuLWRhdGUtdGltZSc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBIb3Vyc01pbnV0ZXNTZWNvbmRzIHtcbiAgaG91cnM6IG51bWJlcjtcbiAgbWludXRlczogbnVtYmVyO1xuICBzZWNvbmRzOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgWWVhck1vbnRoRGF5IHtcbiAgeWVhcjogbnVtYmVyO1xuICBtb250aDogbnVtYmVyO1xuICBkYXk6IG51bWJlcjtcblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhdGVUaW1lIHtcblxuICAvLyBUaW1lIHZhbHVlc1xuICBob3VyczogbnVtYmVyO1xuICBtaW51dGVzOiBudW1iZXI7XG4gIHNlY29uZHM6IG51bWJlcjtcblxuICAvLyBEYXRlIHZhbHVlc1xuICB5ZWFyOiBudW1iZXI7IC8vIHRoZSB5ZWFyIChuZWdhdGl2ZSBhbmQgcG9zaXRpdmUgdmFsdWVzIGV4Y2VwdCAwKVxuICBtb250aDogbnVtYmVyOyAvLyB0aGUgbW9udGggZnJvbSAxPWphbnVhcnkgdG8gMTI9ZGVjZW1iZXJcbiAgZGF5OiBudW1iZXI7IC8vIHRoZSBkYXkgb2YgbW9udGggZnJvbSAxIHRvIDMxXG5cblxuICAvLyBFbWl0cyBZZWFyTW9udGhEYXkgd2hlbiBEYXRlIGNoYW5nZXNcbiAgb25EYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8WWVhck1vbnRoRGF5PjtcblxuICAvKipcbiAgICogZ2V0IHRoZSBqdWxpYW4gZGF5IFxuICAgKlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9ICBqdWxpYW4gZGF5XG4gICAqL1xuICBnZXRKdWxpYW5EYXkoKTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBTZXQganVsaWFuIGRheSBvZiB0aGUgRGF0ZVRpbWUgdmFsdWUgKG9ubHkgYWZmZWN0aW5nIHllYXIsIG1vbnRoLCBkYXkpXG4gICAqXG4gICAqIEBwYXJhbSBqdWxpYW5TZWNvbmQganVsaWFuIHNlY29uZFxuICAgKi9cbiAgZnJvbUp1bGlhbkRheShqdWxpYW5EYXk6IG51bWJlcik6IEdyZWdvcmlhbkRhdGVUaW1lIHwgSnVsaWFuRGF0ZVRpbWU7XG5cbiAgLyoqXG4gICAqIGdldCB0aGUganVsaWFuIHNlY29uZFxuICAgKi9cbiAgZ2V0SnVsaWFuU2Vjb25kKCk6IG51bWJlclxuXG4gIC8qKlxuICAgKiBTZXQganVsaWFuIHNlY29uZCBvZiB0aGUgRGF0ZVRpbWUgdmFsdWUgKGFmZmVjdGluZyB5ZWFyLCBtb250aCwgZGF5LCBob3VycywgbWludXRlcywgc2Vjb25kcylcbiAgICogXG4gICAqIEBwYXJhbSBqdWxpYW5TZWNvbmQganVsaWFuIHNlY29uZFxuICAgKi9cbiAgZnJvbUp1bGlhblNlY29uZChqdWxpYW5TZWNvbmQ6IG51bWJlcik6IEdyZWdvcmlhbkRhdGVUaW1lIHwgSnVsaWFuRGF0ZVRpbWU7XG5cblxuICAvKipcbiAgICogUmV0dXJucyBsZW5ndGggb2YgY3VycmVudCBtb250aC4gSWYgbm8gbW9udGggb3IgeWVhciBwcm92aWRlZCwgcmV0dXJuc1xuICAgKiB1bmRlZmluZWQuXG4gICAqL1xuICBsZW5ndGhPZk1vbnRoKCk6IG51bWJlcjtcblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMueWVhciBpcyBhIGxlYXAgeWVhclxuICAgKi9cbiAgaXNMZWFwWWVhcigpOiBib29sZWFuO1xuXG5cbiAgYWRkWWVhcigpOiB2b2lkXG5cbiAgYWRkTW9udGgoKTogdm9pZDtcblxuICBhZGREYXkoKTogdm9pZDtcblxuICBhZGRIb3VyKCk6IHZvaWQ7XG5cbiAgYWRkTWludXRlKCk6IHZvaWQ7XG5cbiAgYWRkU2Vjb25kKCk6IHZvaWQ7XG5cbiAgYWRkKGR1cmF0aW9uOiBHcmFudWxhcml0eSk7XG5cbiAgdG9MYXN0U2Vjb25kT2YoZHVyYXRpb246IEdyYW51bGFyaXR5KTtcblxuICBnZXRFbmRPZihkdXJhdGlvbjogR3JhbnVsYXJpdHkpOiBEYXRlVGltZTtcblxuICBnZXREYXRlKCk6IERhdGU7XG5cbiAgZW1pdERhdGVDaGFuZ2UoKVxuXG59XG5cbiJdfQ==