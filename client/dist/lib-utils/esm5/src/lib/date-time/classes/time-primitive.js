/**
 * @fileoverview added by tsickle
 * Generated from: classes/time-primitive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { GregorianDateTime } from './gregorian-date-time';
import { JulianDateTime } from './julian-date-time';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1wcmltaXRpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzL3NyYy9saWIvZGF0ZS10aW1lLyIsInNvdXJjZXMiOlsiY2xhc3Nlcy90aW1lLXByaW1pdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQU1wRDtJQVNFLHVCQUFZLElBQTJCOztRQU45QixnQkFBVyxHQUFHLE9BQU8sQ0FBQztRQU83QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxVQUFVO1lBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUMsVUFBVSxDQUFBO0lBQ3pFLENBQUM7Ozs7SUFFRCw0Q0FBb0I7OztJQUFwQjs7WUFDUSxDQUFDLEdBQUcsSUFBSSxpQkFBaUIsRUFBRTtRQUNqQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7Ozs7SUFFRCx5Q0FBaUI7OztJQUFqQjs7WUFDUSxDQUFDLEdBQUcsSUFBSSxjQUFjLEVBQUU7UUFDOUIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBSUQ7OztPQUdHOzs7Ozs7O0lBQ0gsbUNBQVc7Ozs7OztJQUFYLFVBQVksUUFBc0M7UUFBdEMseUJBQUEsRUFBQSxXQUF5QixJQUFJLENBQUMsUUFBUTtRQUVoRCxJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRTNCLElBQUksUUFBUSxLQUFLLFdBQVc7WUFBRSxPQUFPLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRWpFLElBQUksUUFBUSxLQUFLLFFBQVE7WUFBRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdELENBQUM7SUFHRDs7O09BR0c7Ozs7Ozs7SUFDSCwrQkFBTzs7Ozs7O0lBQVAsVUFBUSxRQUFzQztRQUF0Qyx5QkFBQSxFQUFBLFdBQXlCLElBQUksQ0FBQyxRQUFRO1FBQzVDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBQ0Q7OztPQUdHOzs7Ozs7O0lBQ0gsMkNBQW1COzs7Ozs7SUFBbkIsVUFBb0IsV0FBd0I7UUFFMUMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdEMsUUFBUSxXQUFXLEVBQUU7Z0JBQ25CLEtBQUssUUFBUTtvQkFDWCxPQUFPLE1BQU0sQ0FBQztnQkFDaEIsS0FBSyxTQUFTO29CQUNaLE9BQU8sV0FBVyxDQUFDO2dCQUNyQixLQUFLLE9BQU87b0JBQ1YsT0FBTyxhQUFhLENBQUM7Z0JBQ3ZCLEtBQUssUUFBUTtvQkFDWCxPQUFPLGlCQUFpQixDQUFDO2dCQUMzQixLQUFLLFVBQVU7b0JBQ2IsT0FBTyxvQkFBb0IsQ0FBQztnQkFDOUIsS0FBSyxVQUFVO29CQUNiLE9BQU8sdUJBQXVCLENBQUM7Z0JBQ2pDO29CQUNFLE9BQU8sRUFBRSxDQUFDO2FBQ2I7U0FDRjthQUFNO1lBQ0wsUUFBUSxXQUFXLEVBQUU7Z0JBQ25CLEtBQUssUUFBUTtvQkFDWCxPQUFPLEdBQUcsQ0FBQztnQkFDYixLQUFLLFNBQVM7b0JBQ1osT0FBTyxRQUFRLENBQUM7Z0JBQ2xCLEtBQUssT0FBTztvQkFDVixPQUFPLFVBQVUsQ0FBQztnQkFDcEIsS0FBSyxRQUFRO29CQUNYLE9BQU8sY0FBYyxDQUFDO2dCQUN4QixLQUFLLFVBQVU7b0JBQ2IsT0FBTyxpQkFBaUIsQ0FBQztnQkFDM0IsS0FBSyxVQUFVO29CQUNiLE9BQU8sb0JBQW9CLENBQUM7Z0JBQzlCO29CQUNFLE9BQU8sRUFBRSxDQUFDO2FBQ2I7U0FDRjtJQUNILENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxrREFBMEI7Ozs7SUFBMUI7UUFFRSxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUdEOzs7TUFHRTs7Ozs7O0lBQ0YsdUNBQWU7Ozs7O0lBQWY7UUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUdEOzs7O09BSUc7Ozs7Ozs7O0lBQ0gscUNBQWE7Ozs7Ozs7SUFBYixVQUFjLFFBQXNDO1FBQXRDLHlCQUFBLEVBQUEsV0FBeUIsSUFBSSxDQUFDLFFBQVE7O1lBQzVDLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQzdCLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDdEQsQ0FBQztJQUVILG9CQUFDO0FBQUQsQ0FBQyxBQXhIRCxJQXdIQzs7OztJQXJIQyxvQ0FBK0I7O0lBRS9CLGtDQUFrQjs7SUFDbEIsaUNBQTRDOztJQUM1QyxpQ0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IFRpbWVQcmltaXRpdmVXaXRoQ2FsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0L3B1YmxpYy1hcGknO1xuaW1wb3J0IHsgR3JhbnVsYXJpdHkgfSBmcm9tICcuL2RhdGUtdGltZS1jb21tb25zJztcbmltcG9ydCB7IEdyZWdvcmlhbkRhdGVUaW1lIH0gZnJvbSAnLi9ncmVnb3JpYW4tZGF0ZS10aW1lJztcbmltcG9ydCB7IEp1bGlhbkRhdGVUaW1lIH0gZnJvbSAnLi9qdWxpYW4tZGF0ZS10aW1lJztcblxuZXhwb3J0IHR5cGUgQ2FsZW5kYXJUeXBlID0gVGltZVByaW1pdGl2ZVdpdGhDYWwuQ2FsZW5kYXJFbnVtXG5cblxuXG5leHBvcnQgY2xhc3MgVGltZVByaW1pdGl2ZSB7XG5cbiAgLy8gTGFzdCBkYXkgb2YgdGhlIGVyYSBiZWZvcmUgY2hyaXN0XG4gIHJlYWRvbmx5IExBU1RfREFZX0JDID0gMTcyMTQyMjtcblxuICBqdWxpYW5EYXk6IG51bWJlcjtcbiAgZHVyYXRpb246IFRpbWVQcmltaXRpdmVXaXRoQ2FsLkR1cmF0aW9uRW51bTtcbiAgY2FsZW5kYXI6IFRpbWVQcmltaXRpdmVXaXRoQ2FsLkNhbGVuZGFyRW51bTsgLy8gdGhlIGNhbGVuZGFyIGluaXRpYWx5IHVzZWQgYnkgdXNlciB0byBjcmVhdGUgdGltZSBwcmltaXRpdmVcblxuICBjb25zdHJ1Y3RvcihkYXRhPzogVGltZVByaW1pdGl2ZVdpdGhDYWwpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICAgIGlmICgoZGF0YSBhcyBhbnkpLmp1bGlhbl9kYXkpIHRoaXMuanVsaWFuRGF5ID0gKGRhdGEgYXMgYW55KS5qdWxpYW5fZGF5XG4gIH1cblxuICBnZXRHcmVnb3JpYW5EYXRlVGltZSgpOiBHcmVnb3JpYW5EYXRlVGltZSB7XG4gICAgY29uc3QgZyA9IG5ldyBHcmVnb3JpYW5EYXRlVGltZSgpXG4gICAgZy5mcm9tSnVsaWFuRGF5KHRoaXMuanVsaWFuRGF5KTtcbiAgICByZXR1cm4gZztcbiAgfVxuXG4gIGdldEp1bGlhbkRhdGVUaW1lKCk6IEp1bGlhbkRhdGVUaW1lIHtcbiAgICBjb25zdCBqID0gbmV3IEp1bGlhbkRhdGVUaW1lKClcbiAgICBqLmZyb21KdWxpYW5EYXkodGhpcy5qdWxpYW5EYXkpO1xuICAgIHJldHVybiBqO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKiBHZXQgYSBEYXRlVGltZSBvYmplY3QgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBjYWxlbmRhci5cbiAgICpcbiAgICovXG4gIGdldERhdGVUaW1lKGNhbGVuZGFyOiBDYWxlbmRhclR5cGUgPSB0aGlzLmNhbGVuZGFyKTogR3JlZ29yaWFuRGF0ZVRpbWUgfCBKdWxpYW5EYXRlVGltZSB8IG51bGwge1xuXG4gICAgaWYgKCFjYWxlbmRhcikgcmV0dXJuIG51bGw7XG5cbiAgICBpZiAoY2FsZW5kYXIgPT09ICdncmVnb3JpYW4nKSByZXR1cm4gdGhpcy5nZXRHcmVnb3JpYW5EYXRlVGltZSgpO1xuXG4gICAgaWYgKGNhbGVuZGFyID09PSAnanVsaWFuJykgcmV0dXJuIHRoaXMuZ2V0SnVsaWFuRGF0ZVRpbWUoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdldCBhIERhdGUgb2JqZWN0IGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gY2FsZW5kYXIuXG4gICAqXG4gICAqL1xuICBnZXREYXRlKGNhbGVuZGFyOiBDYWxlbmRhclR5cGUgPSB0aGlzLmNhbGVuZGFyKTogRGF0ZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmdldERhdGVUaW1lKGNhbGVuZGFyKS5nZXREYXRlKCk7XG4gIH1cbiAgLyoqXG4gICAqIEdldCBhIHN0cmluZyB0aGF0IGRlZmluZXMgdGhlIGZvcm1hdCB1c2FibGUgd2l0aCB0aGUgRGF0ZVBpcGUsXG4gICAqIGEgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBncmFudWxhcml0eVxuICAgKi9cbiAgZ2V0RGF0ZUZvcm1hdFN0cmluZyhncmFudWxhcml0eTogR3JhbnVsYXJpdHkpOiBzdHJpbmcge1xuXG4gICAgaWYgKHRoaXMuanVsaWFuRGF5IDw9IHRoaXMuTEFTVF9EQVlfQkMpIHtcbiAgICAgIHN3aXRjaCAoZ3JhbnVsYXJpdHkpIHtcbiAgICAgICAgY2FzZSAnMSB5ZWFyJzpcbiAgICAgICAgICByZXR1cm4gJ3kgR0cnO1xuICAgICAgICBjYXNlICcxIG1vbnRoJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSwgeSBHRyc7XG4gICAgICAgIGNhc2UgJzEgZGF5JzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5IEdHJztcbiAgICAgICAgY2FzZSAnMSBob3VyJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5IEdHLCBISCc7XG4gICAgICAgIGNhc2UgJzEgbWludXRlJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5IEdHLCBISDptbSc7XG4gICAgICAgIGNhc2UgJzEgc2Vjb25kJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5IEdHLCBISDptbTpzcyc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGdyYW51bGFyaXR5KSB7XG4gICAgICAgIGNhc2UgJzEgeWVhcic6XG4gICAgICAgICAgcmV0dXJuICd5JztcbiAgICAgICAgY2FzZSAnMSBtb250aCc6XG4gICAgICAgICAgcmV0dXJuICdNTU0sIHknO1xuICAgICAgICBjYXNlICcxIGRheSc6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSc7XG4gICAgICAgIGNhc2UgJzEgaG91cic6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSwgSEgnO1xuICAgICAgICBjYXNlICcxIG1pbnV0ZSc6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSwgSEg6bW0nO1xuICAgICAgICBjYXNlICcxIHNlY29uZCc6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSwgSEg6bW06c3MnO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgZGlzcGxheSBsYWJlbCBvZiB0aGUgY3VycmVudCBUaW1lUHJpbWl0aXZlLlxuICAgKi9cbiAgZ2V0U2hvcnRlc0RhdGVGb3JtYXRTdHJpbmcoKTogc3RyaW5nIHtcblxuICAgIHJldHVybiB0aGlzLmdldERhdGVGb3JtYXRTdHJpbmcodGhpcy5kdXJhdGlvbik7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGp1bGlhbiBkYXkgaW4gc2Vjb25kc1xuICAgKiBUT0RPOiBpbnRlZ3JhdGUgdGltZVxuICAqL1xuICBnZXRKdWxpYW5TZWNvbmQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5qdWxpYW5EYXkgKiA2MCAqIDYwICogMjQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGxhc3Qgc2Vjb25kIG9mIHRoaXMgVGltZVByaW1pdGl2ZS4gVGhpcyBkZXBlbmRzIG9uIHRoZSBjYWxlbmRhcixcbiAgICogc2luY2UgdGhlIG1vbnRoIGZlYnJ1YXJ5IGFuZCBsZWFwIHllYXJzIGRpZmZlciBmcm9tIG9uZSBjYWxlbmRhciB0byB0aGUgb3RoZXJcbiAgICpcbiAgICovXG4gIGdldExhc3RTZWNvbmQoY2FsZW5kYXI6IENhbGVuZGFyVHlwZSA9IHRoaXMuY2FsZW5kYXIpOiBudW1iZXIgfCBudWxsIHtcbiAgICBjb25zdCBkdCA9IHRoaXMuZ2V0RGF0ZVRpbWUoKVxuICAgIHJldHVybiBkdC5nZXRFbmRPZih0aGlzLmR1cmF0aW9uKS5nZXRKdWxpYW5TZWNvbmQoKTtcbiAgfVxuXG59XG4iXX0=