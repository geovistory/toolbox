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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvc3JjL2xpYi9kYXRlLXRpbWUvIiwic291cmNlcyI6WyJpbnRlcmZhY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBS0EseUNBSUM7OztJQUhDLG9DQUFjOztJQUNkLHNDQUFnQjs7SUFDaEIsc0NBQWdCOzs7OztBQUdsQixrQ0FLQzs7O0lBSkMsNEJBQWE7O0lBQ2IsNkJBQWM7O0lBQ2QsMkJBQVk7Ozs7O0FBSWQsOEJBNkVDOzs7SUExRUMseUJBQWM7O0lBQ2QsMkJBQWdCOztJQUNoQiwyQkFBZ0I7O0lBR2hCLHdCQUFhOztJQUNiLHlCQUFjOztJQUNkLHVCQUFZOztJQUlaLGdDQUF5Qzs7Ozs7O0lBT3pDLGtEQUF1Qjs7Ozs7OztJQU92Qiw0REFBcUU7Ozs7O0lBS3JFLHFEQUF5Qjs7Ozs7OztJQU96QixrRUFBMkU7Ozs7OztJQU8zRSxtREFBd0I7Ozs7O0lBS3hCLGdEQUFzQjs7OztJQUd0Qiw2Q0FBZTs7OztJQUVmLDhDQUFpQjs7OztJQUVqQiw0Q0FBZTs7OztJQUVmLDZDQUFnQjs7OztJQUVoQiwrQ0FBa0I7Ozs7SUFFbEIsK0NBQWtCOzs7OztJQUVsQixpREFBMkI7Ozs7O0lBRTNCLDREQUFzQzs7Ozs7SUFFdEMsc0RBQTBDOzs7O0lBRTFDLDZDQUFnQjs7OztJQUVoQixvREFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdyYW51bGFyaXR5IH0gZnJvbSAnLi9jbGFzc2VzL2RhdGUtdGltZS1jb21tb25zJztcbmltcG9ydCB7IEdyZWdvcmlhbkRhdGVUaW1lLCBKdWxpYW5EYXRlVGltZSB9IGZyb20gJy4nO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSG91cnNNaW51dGVzU2Vjb25kcyB7XG4gIGhvdXJzOiBudW1iZXI7XG4gIG1pbnV0ZXM6IG51bWJlcjtcbiAgc2Vjb25kczogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFllYXJNb250aERheSB7XG4gIHllYXI6IG51bWJlcjtcbiAgbW9udGg6IG51bWJlcjtcbiAgZGF5OiBudW1iZXI7XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXRlVGltZSB7XG5cbiAgLy8gVGltZSB2YWx1ZXNcbiAgaG91cnM6IG51bWJlcjtcbiAgbWludXRlczogbnVtYmVyO1xuICBzZWNvbmRzOiBudW1iZXI7XG5cbiAgLy8gRGF0ZSB2YWx1ZXNcbiAgeWVhcjogbnVtYmVyOyAvLyB0aGUgeWVhciAobmVnYXRpdmUgYW5kIHBvc2l0aXZlIHZhbHVlcyBleGNlcHQgMClcbiAgbW9udGg6IG51bWJlcjsgLy8gdGhlIG1vbnRoIGZyb20gMT1qYW51YXJ5IHRvIDEyPWRlY2VtYmVyXG4gIGRheTogbnVtYmVyOyAvLyB0aGUgZGF5IG9mIG1vbnRoIGZyb20gMSB0byAzMVxuXG5cbiAgLy8gRW1pdHMgWWVhck1vbnRoRGF5IHdoZW4gRGF0ZSBjaGFuZ2VzXG4gIG9uRGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPFllYXJNb250aERheT47XG5cbiAgLyoqXG4gICAqIGdldCB0aGUganVsaWFuIGRheVxuICAgKlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9ICBqdWxpYW4gZGF5XG4gICAqL1xuICBnZXRKdWxpYW5EYXkoKTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBTZXQganVsaWFuIGRheSBvZiB0aGUgRGF0ZVRpbWUgdmFsdWUgKG9ubHkgYWZmZWN0aW5nIHllYXIsIG1vbnRoLCBkYXkpXG4gICAqXG4gICAqIEBwYXJhbSBqdWxpYW5TZWNvbmQganVsaWFuIHNlY29uZFxuICAgKi9cbiAgZnJvbUp1bGlhbkRheShqdWxpYW5EYXk6IG51bWJlcik6IEdyZWdvcmlhbkRhdGVUaW1lIHwgSnVsaWFuRGF0ZVRpbWU7XG5cbiAgLyoqXG4gICAqIGdldCB0aGUganVsaWFuIHNlY29uZFxuICAgKi9cbiAgZ2V0SnVsaWFuU2Vjb25kKCk6IG51bWJlclxuXG4gIC8qKlxuICAgKiBTZXQganVsaWFuIHNlY29uZCBvZiB0aGUgRGF0ZVRpbWUgdmFsdWUgKGFmZmVjdGluZyB5ZWFyLCBtb250aCwgZGF5LCBob3VycywgbWludXRlcywgc2Vjb25kcylcbiAgICpcbiAgICogQHBhcmFtIGp1bGlhblNlY29uZCBqdWxpYW4gc2Vjb25kXG4gICAqL1xuICBmcm9tSnVsaWFuU2Vjb25kKGp1bGlhblNlY29uZDogbnVtYmVyKTogR3JlZ29yaWFuRGF0ZVRpbWUgfCBKdWxpYW5EYXRlVGltZTtcblxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGxlbmd0aCBvZiBjdXJyZW50IG1vbnRoLiBJZiBubyBtb250aCBvciB5ZWFyIHByb3ZpZGVkLCByZXR1cm5zXG4gICAqIHVuZGVmaW5lZC5cbiAgICovXG4gIGxlbmd0aE9mTW9udGgoKTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcy55ZWFyIGlzIGEgbGVhcCB5ZWFyXG4gICAqL1xuICBpc0xlYXBZZWFyKCk6IGJvb2xlYW47XG5cblxuICBhZGRZZWFyKCk6IHZvaWRcblxuICBhZGRNb250aCgpOiB2b2lkO1xuXG4gIGFkZERheSgpOiB2b2lkO1xuXG4gIGFkZEhvdXIoKTogdm9pZDtcblxuICBhZGRNaW51dGUoKTogdm9pZDtcblxuICBhZGRTZWNvbmQoKTogdm9pZDtcblxuICBhZGQoZHVyYXRpb246IEdyYW51bGFyaXR5KTtcblxuICB0b0xhc3RTZWNvbmRPZihkdXJhdGlvbjogR3JhbnVsYXJpdHkpO1xuXG4gIGdldEVuZE9mKGR1cmF0aW9uOiBHcmFudWxhcml0eSk6IERhdGVUaW1lO1xuXG4gIGdldERhdGUoKTogRGF0ZTtcblxuICBlbWl0RGF0ZUNoYW5nZSgpXG5cbn1cblxuIl19