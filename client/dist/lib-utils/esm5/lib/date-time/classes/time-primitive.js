/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/classes/time-primitive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { GregorianDateTime } from './gregorian-date-time';
import { JulianDateTime } from './julian-date-time';
/**
 * @record
 */
function ITimePrimitive() { }
if (false) {
    /** @type {?|undefined} */
    ITimePrimitive.prototype.julianDay;
    /** @type {?|undefined} */
    ITimePrimitive.prototype.duration;
    /** @type {?|undefined} */
    ITimePrimitive.prototype.calendar;
}
var TimePrimitive = /** @class */ (function () {
    function TimePrimitive(data) {
        // Last day of the era before christ
        this.LAST_DAY_BC = 1721422;
        Object.assign(this, data);
        if (((/** @type {?} */ (data))).julian_day)
            this.julianDay = ((/** @type {?} */ (data))).julian_day;
    }
    /**
     * @return {?}
     */
    TimePrimitive.prototype.getGregorianDateTime = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var g = new GregorianDateTime();
        g.fromJulianDay(this.julianDay);
        return g;
    };
    /**
     * @return {?}
     */
    TimePrimitive.prototype.getJulianDateTime = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var j = new JulianDateTime();
        j.fromJulianDay(this.julianDay);
        return j;
    };
    /**
     * Get a DateTime object according to the given calendar.
     *
     */
    /**
     * Get a DateTime object according to the given calendar.
     *
     * @param {?=} calendar
     * @return {?}
     */
    TimePrimitive.prototype.getDateTime = /**
     * Get a DateTime object according to the given calendar.
     *
     * @param {?=} calendar
     * @return {?}
     */
    function (calendar) {
        if (calendar === void 0) { calendar = this.calendar; }
        if (!calendar)
            return null;
        if (calendar === 'gregorian')
            return this.getGregorianDateTime();
        if (calendar === 'julian')
            return this.getJulianDateTime();
    };
    /**
     * Get a Date object according to the given calendar.
     *
     */
    /**
     * Get a Date object according to the given calendar.
     *
     * @param {?=} calendar
     * @return {?}
     */
    TimePrimitive.prototype.getDate = /**
     * Get a Date object according to the given calendar.
     *
     * @param {?=} calendar
     * @return {?}
     */
    function (calendar) {
        if (calendar === void 0) { calendar = this.calendar; }
        return this.getDateTime(calendar).getDate();
    };
    /**
     * Get a string that defines the format usable with the DatePipe,
     * a according to the given granularity
     */
    /**
     * Get a string that defines the format usable with the DatePipe,
     * a according to the given granularity
     * @param {?} granularity
     * @return {?}
     */
    TimePrimitive.prototype.getDateFormatString = /**
     * Get a string that defines the format usable with the DatePipe,
     * a according to the given granularity
     * @param {?} granularity
     * @return {?}
     */
    function (granularity) {
        if (this.julianDay <= this.LAST_DAY_BC) {
            switch (granularity) {
                case '1 year':
                    return 'y GG';
                case '1 month':
                    return 'MMM, y GG';
                case '1 day':
                    return 'MMM d, y GG';
                case '1 hour':
                    return 'MMM d, y GG, HH';
                case '1 minute':
                    return 'MMM d, y GG, HH:mm';
                case '1 second':
                    return 'MMM d, y GG, HH:mm:ss';
                default:
                    return '';
            }
        }
        else {
            switch (granularity) {
                case '1 year':
                    return 'y';
                case '1 month':
                    return 'MMM, y';
                case '1 day':
                    return 'MMM d, y';
                case '1 hour':
                    return 'MMM d, y, HH';
                case '1 minute':
                    return 'MMM d, y, HH:mm';
                case '1 second':
                    return 'MMM d, y, HH:mm:ss';
                default:
                    return '';
            }
        }
    };
    /**
     * Get a display label of the current TimePrimitive.
     */
    /**
     * Get a display label of the current TimePrimitive.
     * @return {?}
     */
    TimePrimitive.prototype.getShortesDateFormatString = /**
     * Get a display label of the current TimePrimitive.
     * @return {?}
     */
    function () {
        return this.getDateFormatString(this.duration);
    };
    /**
     * Get the julian day in seconds
     * TODO: integrate time
    */
    /**
     * Get the julian day in seconds
     * TODO: integrate time
     * @return {?}
     */
    TimePrimitive.prototype.getJulianSecond = /**
     * Get the julian day in seconds
     * TODO: integrate time
     * @return {?}
     */
    function () {
        return this.julianDay * 60 * 60 * 24;
    };
    /**
     * Get the last second of this TimePrimitive. This depends on the calendar,
     * since the month february and leap years differ from one calendar to the other
     *
     */
    /**
     * Get the last second of this TimePrimitive. This depends on the calendar,
     * since the month february and leap years differ from one calendar to the other
     *
     * @param {?=} calendar
     * @return {?}
     */
    TimePrimitive.prototype.getLastSecond = /**
     * Get the last second of this TimePrimitive. This depends on the calendar,
     * since the month february and leap years differ from one calendar to the other
     *
     * @param {?=} calendar
     * @return {?}
     */
    function (calendar) {
        if (calendar === void 0) { calendar = this.calendar; }
        /** @type {?} */
        var dt = this.getDateTime();
        return dt.getEndOf(this.duration).getJulianSecond();
    };
    return TimePrimitive;
}());
export { TimePrimitive };
if (false) {
    /** @type {?} */
    TimePrimitive.prototype.LAST_DAY_BC;
    /** @type {?} */
    TimePrimitive.prototype.julianDay;
    /** @type {?} */
    TimePrimitive.prototype.duration;
    /** @type {?} */
    TimePrimitive.prototype.calendar;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1wcmltaXRpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9jbGFzc2VzL3RpbWUtcHJpbWl0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7O0FBSXBELDZCQUlDOzs7SUFIQyxtQ0FBbUI7O0lBQ25CLGtDQUF1Qjs7SUFDdkIsa0NBQXdCOztBQUcxQjtJQVNFLHVCQUFZLElBQXFCOztRQU54QixnQkFBVyxHQUFHLE9BQU8sQ0FBQztRQU83QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxVQUFVO1lBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUMsVUFBVSxDQUFBO0lBQ3pFLENBQUM7Ozs7SUFFRCw0Q0FBb0I7OztJQUFwQjs7WUFDUSxDQUFDLEdBQUcsSUFBSSxpQkFBaUIsRUFBRTtRQUNqQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7Ozs7SUFFRCx5Q0FBaUI7OztJQUFqQjs7WUFDUSxDQUFDLEdBQUcsSUFBSSxjQUFjLEVBQUU7UUFDOUIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBSUQ7OztPQUdHOzs7Ozs7O0lBQ0gsbUNBQVc7Ozs7OztJQUFYLFVBQVksUUFBc0M7UUFBdEMseUJBQUEsRUFBQSxXQUF5QixJQUFJLENBQUMsUUFBUTtRQUVoRCxJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRTNCLElBQUksUUFBUSxLQUFLLFdBQVc7WUFBRSxPQUFPLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRWpFLElBQUksUUFBUSxLQUFLLFFBQVE7WUFBRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdELENBQUM7SUFHRDs7O09BR0c7Ozs7Ozs7SUFDSCwrQkFBTzs7Ozs7O0lBQVAsVUFBUSxRQUFzQztRQUF0Qyx5QkFBQSxFQUFBLFdBQXlCLElBQUksQ0FBQyxRQUFRO1FBQzVDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBQ0Q7OztPQUdHOzs7Ozs7O0lBQ0gsMkNBQW1COzs7Ozs7SUFBbkIsVUFBb0IsV0FBd0I7UUFFMUMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdEMsUUFBUSxXQUFXLEVBQUU7Z0JBQ25CLEtBQUssUUFBUTtvQkFDWCxPQUFPLE1BQU0sQ0FBQztnQkFDaEIsS0FBSyxTQUFTO29CQUNaLE9BQU8sV0FBVyxDQUFDO2dCQUNyQixLQUFLLE9BQU87b0JBQ1YsT0FBTyxhQUFhLENBQUM7Z0JBQ3ZCLEtBQUssUUFBUTtvQkFDWCxPQUFPLGlCQUFpQixDQUFDO2dCQUMzQixLQUFLLFVBQVU7b0JBQ2IsT0FBTyxvQkFBb0IsQ0FBQztnQkFDOUIsS0FBSyxVQUFVO29CQUNiLE9BQU8sdUJBQXVCLENBQUM7Z0JBQ2pDO29CQUNFLE9BQU8sRUFBRSxDQUFDO2FBQ2I7U0FDRjthQUFNO1lBQ0wsUUFBUSxXQUFXLEVBQUU7Z0JBQ25CLEtBQUssUUFBUTtvQkFDWCxPQUFPLEdBQUcsQ0FBQztnQkFDYixLQUFLLFNBQVM7b0JBQ1osT0FBTyxRQUFRLENBQUM7Z0JBQ2xCLEtBQUssT0FBTztvQkFDVixPQUFPLFVBQVUsQ0FBQztnQkFDcEIsS0FBSyxRQUFRO29CQUNYLE9BQU8sY0FBYyxDQUFDO2dCQUN4QixLQUFLLFVBQVU7b0JBQ2IsT0FBTyxpQkFBaUIsQ0FBQztnQkFDM0IsS0FBSyxVQUFVO29CQUNiLE9BQU8sb0JBQW9CLENBQUM7Z0JBQzlCO29CQUNFLE9BQU8sRUFBRSxDQUFDO2FBQ2I7U0FDRjtJQUNILENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxrREFBMEI7Ozs7SUFBMUI7UUFFRSxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUdEOzs7TUFHRTs7Ozs7O0lBQ0YsdUNBQWU7Ozs7O0lBQWY7UUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUdEOzs7O09BSUc7Ozs7Ozs7O0lBQ0gscUNBQWE7Ozs7Ozs7SUFBYixVQUFjLFFBQXNDO1FBQXRDLHlCQUFBLEVBQUEsV0FBeUIsSUFBSSxDQUFDLFFBQVE7O1lBQzVDLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQzdCLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDdEQsQ0FBQztJQUVILG9CQUFDO0FBQUQsQ0FBQyxBQXhIRCxJQXdIQzs7OztJQXJIQyxvQ0FBK0I7O0lBRS9CLGtDQUFrQjs7SUFDbEIsaUNBQXNCOztJQUN0QixpQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IEdyYW51bGFyaXR5IH0gZnJvbSAnLi9kYXRlLXRpbWUtY29tbW9ucyc7XG5pbXBvcnQgeyBHcmVnb3JpYW5EYXRlVGltZSB9IGZyb20gJy4vZ3JlZ29yaWFuLWRhdGUtdGltZSc7XG5pbXBvcnQgeyBKdWxpYW5EYXRlVGltZSB9IGZyb20gJy4vanVsaWFuLWRhdGUtdGltZSc7XG5cbmV4cG9ydCB0eXBlIENhbGVuZGFyVHlwZSA9ICdncmVnb3JpYW4nIHwgJ2p1bGlhbic7XG5cbmludGVyZmFjZSBJVGltZVByaW1pdGl2ZSB7XG4gIGp1bGlhbkRheT86IG51bWJlcjtcbiAgZHVyYXRpb24/OiBHcmFudWxhcml0eTtcbiAgY2FsZW5kYXI/OiBDYWxlbmRhclR5cGU7XG59XG5cbmV4cG9ydCBjbGFzcyBUaW1lUHJpbWl0aXZlIHtcblxuICAvLyBMYXN0IGRheSBvZiB0aGUgZXJhIGJlZm9yZSBjaHJpc3RcbiAgcmVhZG9ubHkgTEFTVF9EQVlfQkMgPSAxNzIxNDIyO1xuXG4gIGp1bGlhbkRheTogbnVtYmVyO1xuICBkdXJhdGlvbjogR3JhbnVsYXJpdHk7XG4gIGNhbGVuZGFyOiBDYWxlbmRhclR5cGU7IC8vIHRoZSBjYWxlbmRhciBpbml0aWFseSB1c2VkIGJ5IHVzZXIgdG8gY3JlYXRlIHRpbWUgcHJpbWl0aXZlXG5cbiAgY29uc3RydWN0b3IoZGF0YT86IElUaW1lUHJpbWl0aXZlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgICBpZiAoKGRhdGEgYXMgYW55KS5qdWxpYW5fZGF5KSB0aGlzLmp1bGlhbkRheSA9IChkYXRhIGFzIGFueSkuanVsaWFuX2RheVxuICB9XG5cbiAgZ2V0R3JlZ29yaWFuRGF0ZVRpbWUoKTogR3JlZ29yaWFuRGF0ZVRpbWUge1xuICAgIGNvbnN0IGcgPSBuZXcgR3JlZ29yaWFuRGF0ZVRpbWUoKVxuICAgIGcuZnJvbUp1bGlhbkRheSh0aGlzLmp1bGlhbkRheSk7XG4gICAgcmV0dXJuIGc7XG4gIH1cblxuICBnZXRKdWxpYW5EYXRlVGltZSgpOiBKdWxpYW5EYXRlVGltZSB7XG4gICAgY29uc3QgaiA9IG5ldyBKdWxpYW5EYXRlVGltZSgpXG4gICAgai5mcm9tSnVsaWFuRGF5KHRoaXMuanVsaWFuRGF5KTtcbiAgICByZXR1cm4gajtcbiAgfVxuXG5cblxuICAvKipcbiAgICogR2V0IGEgRGF0ZVRpbWUgb2JqZWN0IGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gY2FsZW5kYXIuXG4gICAqXG4gICAqL1xuICBnZXREYXRlVGltZShjYWxlbmRhcjogQ2FsZW5kYXJUeXBlID0gdGhpcy5jYWxlbmRhcik6IEdyZWdvcmlhbkRhdGVUaW1lIHwgSnVsaWFuRGF0ZVRpbWUgfCBudWxsIHtcblxuICAgIGlmICghY2FsZW5kYXIpIHJldHVybiBudWxsO1xuXG4gICAgaWYgKGNhbGVuZGFyID09PSAnZ3JlZ29yaWFuJykgcmV0dXJuIHRoaXMuZ2V0R3JlZ29yaWFuRGF0ZVRpbWUoKTtcblxuICAgIGlmIChjYWxlbmRhciA9PT0gJ2p1bGlhbicpIHJldHVybiB0aGlzLmdldEp1bGlhbkRhdGVUaW1lKCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXQgYSBEYXRlIG9iamVjdCBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIGNhbGVuZGFyLlxuICAgKlxuICAgKi9cbiAgZ2V0RGF0ZShjYWxlbmRhcjogQ2FsZW5kYXJUeXBlID0gdGhpcy5jYWxlbmRhcik6IERhdGUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5nZXREYXRlVGltZShjYWxlbmRhcikuZ2V0RGF0ZSgpO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgYSBzdHJpbmcgdGhhdCBkZWZpbmVzIHRoZSBmb3JtYXQgdXNhYmxlIHdpdGggdGhlIERhdGVQaXBlLFxuICAgKiBhIGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gZ3JhbnVsYXJpdHlcbiAgICovXG4gIGdldERhdGVGb3JtYXRTdHJpbmcoZ3JhbnVsYXJpdHk6IEdyYW51bGFyaXR5KTogc3RyaW5nIHtcblxuICAgIGlmICh0aGlzLmp1bGlhbkRheSA8PSB0aGlzLkxBU1RfREFZX0JDKSB7XG4gICAgICBzd2l0Y2ggKGdyYW51bGFyaXR5KSB7XG4gICAgICAgIGNhc2UgJzEgeWVhcic6XG4gICAgICAgICAgcmV0dXJuICd5IEdHJztcbiAgICAgICAgY2FzZSAnMSBtb250aCc6XG4gICAgICAgICAgcmV0dXJuICdNTU0sIHkgR0cnO1xuICAgICAgICBjYXNlICcxIGRheSc6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSBHRyc7XG4gICAgICAgIGNhc2UgJzEgaG91cic6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSBHRywgSEgnO1xuICAgICAgICBjYXNlICcxIG1pbnV0ZSc6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSBHRywgSEg6bW0nO1xuICAgICAgICBjYXNlICcxIHNlY29uZCc6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSBHRywgSEg6bW06c3MnO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoIChncmFudWxhcml0eSkge1xuICAgICAgICBjYXNlICcxIHllYXInOlxuICAgICAgICAgIHJldHVybiAneSc7XG4gICAgICAgIGNhc2UgJzEgbW9udGgnOlxuICAgICAgICAgIHJldHVybiAnTU1NLCB5JztcbiAgICAgICAgY2FzZSAnMSBkYXknOlxuICAgICAgICAgIHJldHVybiAnTU1NIGQsIHknO1xuICAgICAgICBjYXNlICcxIGhvdXInOlxuICAgICAgICAgIHJldHVybiAnTU1NIGQsIHksIEhIJztcbiAgICAgICAgY2FzZSAnMSBtaW51dGUnOlxuICAgICAgICAgIHJldHVybiAnTU1NIGQsIHksIEhIOm1tJztcbiAgICAgICAgY2FzZSAnMSBzZWNvbmQnOlxuICAgICAgICAgIHJldHVybiAnTU1NIGQsIHksIEhIOm1tOnNzJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGRpc3BsYXkgbGFiZWwgb2YgdGhlIGN1cnJlbnQgVGltZVByaW1pdGl2ZS5cbiAgICovXG4gIGdldFNob3J0ZXNEYXRlRm9ybWF0U3RyaW5nKCk6IHN0cmluZyB7XG5cbiAgICByZXR1cm4gdGhpcy5nZXREYXRlRm9ybWF0U3RyaW5nKHRoaXMuZHVyYXRpb24pO1xuICB9XG5cblxuICAvKipcbiAgICogR2V0IHRoZSBqdWxpYW4gZGF5IGluIHNlY29uZHNcbiAgICogVE9ETzogaW50ZWdyYXRlIHRpbWVcbiAgKi9cbiAgZ2V0SnVsaWFuU2Vjb25kKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuanVsaWFuRGF5ICogNjAgKiA2MCAqIDI0O1xuICB9XG5cblxuICAvKipcbiAgICogR2V0IHRoZSBsYXN0IHNlY29uZCBvZiB0aGlzIFRpbWVQcmltaXRpdmUuIFRoaXMgZGVwZW5kcyBvbiB0aGUgY2FsZW5kYXIsXG4gICAqIHNpbmNlIHRoZSBtb250aCBmZWJydWFyeSBhbmQgbGVhcCB5ZWFycyBkaWZmZXIgZnJvbSBvbmUgY2FsZW5kYXIgdG8gdGhlIG90aGVyXG4gICAqXG4gICAqL1xuICBnZXRMYXN0U2Vjb25kKGNhbGVuZGFyOiBDYWxlbmRhclR5cGUgPSB0aGlzLmNhbGVuZGFyKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgY29uc3QgZHQgPSB0aGlzLmdldERhdGVUaW1lKClcbiAgICByZXR1cm4gZHQuZ2V0RW5kT2YodGhpcy5kdXJhdGlvbikuZ2V0SnVsaWFuU2Vjb25kKCk7XG4gIH1cblxufVxuIl19