/**
 * @fileoverview added by tsickle
 * Generated from: time-primitive.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1wcmltaXRpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzL3NyYy9saWIvZGF0ZS10aW1lLyIsInNvdXJjZXMiOlsidGltZS1wcmltaXRpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFJcEQsNkJBSUM7OztJQUhDLG1DQUFtQjs7SUFDbkIsa0NBQXVCOztJQUN2QixrQ0FBd0I7O0FBRzFCO0lBU0UsdUJBQVksSUFBcUI7O1FBTnhCLGdCQUFXLEdBQUcsT0FBTyxDQUFDO1FBTzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLFVBQVU7WUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxVQUFVLENBQUE7SUFDekUsQ0FBQzs7OztJQUVELDRDQUFvQjs7O0lBQXBCOztZQUNRLENBQUMsR0FBRyxJQUFJLGlCQUFpQixFQUFFO1FBQ2pDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7OztJQUVELHlDQUFpQjs7O0lBQWpCOztZQUNRLENBQUMsR0FBRyxJQUFJLGNBQWMsRUFBRTtRQUM5QixDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFJRDs7O09BR0c7Ozs7Ozs7SUFDSCxtQ0FBVzs7Ozs7O0lBQVgsVUFBWSxRQUFzQztRQUF0Qyx5QkFBQSxFQUFBLFdBQXlCLElBQUksQ0FBQyxRQUFRO1FBRWhELElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFM0IsSUFBSSxRQUFRLEtBQUssV0FBVztZQUFFLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFFakUsSUFBSSxRQUFRLEtBQUssUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0QsQ0FBQztJQUdEOzs7T0FHRzs7Ozs7OztJQUNILCtCQUFPOzs7Ozs7SUFBUCxVQUFRLFFBQXNDO1FBQXRDLHlCQUFBLEVBQUEsV0FBeUIsSUFBSSxDQUFDLFFBQVE7UUFDNUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFDRDs7O09BR0c7Ozs7Ozs7SUFDSCwyQ0FBbUI7Ozs7OztJQUFuQixVQUFvQixXQUF3QjtRQUUxQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN0QyxRQUFRLFdBQVcsRUFBRTtnQkFDbkIsS0FBSyxRQUFRO29CQUNYLE9BQU8sTUFBTSxDQUFDO2dCQUNoQixLQUFLLFNBQVM7b0JBQ1osT0FBTyxXQUFXLENBQUM7Z0JBQ3JCLEtBQUssT0FBTztvQkFDVixPQUFPLGFBQWEsQ0FBQztnQkFDdkIsS0FBSyxRQUFRO29CQUNYLE9BQU8saUJBQWlCLENBQUM7Z0JBQzNCLEtBQUssVUFBVTtvQkFDYixPQUFPLG9CQUFvQixDQUFDO2dCQUM5QixLQUFLLFVBQVU7b0JBQ2IsT0FBTyx1QkFBdUIsQ0FBQztnQkFDakM7b0JBQ0UsT0FBTyxFQUFFLENBQUM7YUFDYjtTQUNGO2FBQU07WUFDTCxRQUFRLFdBQVcsRUFBRTtnQkFDbkIsS0FBSyxRQUFRO29CQUNYLE9BQU8sR0FBRyxDQUFDO2dCQUNiLEtBQUssU0FBUztvQkFDWixPQUFPLFFBQVEsQ0FBQztnQkFDbEIsS0FBSyxPQUFPO29CQUNWLE9BQU8sVUFBVSxDQUFDO2dCQUNwQixLQUFLLFFBQVE7b0JBQ1gsT0FBTyxjQUFjLENBQUM7Z0JBQ3hCLEtBQUssVUFBVTtvQkFDYixPQUFPLGlCQUFpQixDQUFDO2dCQUMzQixLQUFLLFVBQVU7b0JBQ2IsT0FBTyxvQkFBb0IsQ0FBQztnQkFDOUI7b0JBQ0UsT0FBTyxFQUFFLENBQUM7YUFDYjtTQUNGO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILGtEQUEwQjs7OztJQUExQjtRQUVFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBR0Q7OztNQUdFOzs7Ozs7SUFDRix1Q0FBZTs7Ozs7SUFBZjtRQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBR0Q7Ozs7T0FJRzs7Ozs7Ozs7SUFDSCxxQ0FBYTs7Ozs7OztJQUFiLFVBQWMsUUFBc0M7UUFBdEMseUJBQUEsRUFBQSxXQUF5QixJQUFJLENBQUMsUUFBUTs7WUFDNUMsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDN0IsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBRUgsb0JBQUM7QUFBRCxDQUFDLEFBeEhELElBd0hDOzs7O0lBckhDLG9DQUErQjs7SUFFL0Isa0NBQWtCOztJQUNsQixpQ0FBc0I7O0lBQ3RCLGlDQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgR3JhbnVsYXJpdHkgfSBmcm9tICcuL2RhdGUtdGltZS1jb21tb25zJztcbmltcG9ydCB7IEdyZWdvcmlhbkRhdGVUaW1lIH0gZnJvbSAnLi9ncmVnb3JpYW4tZGF0ZS10aW1lJztcbmltcG9ydCB7IEp1bGlhbkRhdGVUaW1lIH0gZnJvbSAnLi9qdWxpYW4tZGF0ZS10aW1lJztcblxuZXhwb3J0IHR5cGUgQ2FsZW5kYXJUeXBlID0gJ2dyZWdvcmlhbicgfCAnanVsaWFuJztcblxuaW50ZXJmYWNlIElUaW1lUHJpbWl0aXZlIHtcbiAganVsaWFuRGF5PzogbnVtYmVyO1xuICBkdXJhdGlvbj86IEdyYW51bGFyaXR5O1xuICBjYWxlbmRhcj86IENhbGVuZGFyVHlwZTtcbn1cblxuZXhwb3J0IGNsYXNzIFRpbWVQcmltaXRpdmUge1xuXG4gIC8vIExhc3QgZGF5IG9mIHRoZSBlcmEgYmVmb3JlIGNocmlzdFxuICByZWFkb25seSBMQVNUX0RBWV9CQyA9IDE3MjE0MjI7XG5cbiAganVsaWFuRGF5OiBudW1iZXI7XG4gIGR1cmF0aW9uOiBHcmFudWxhcml0eTtcbiAgY2FsZW5kYXI6IENhbGVuZGFyVHlwZTsgLy8gdGhlIGNhbGVuZGFyIGluaXRpYWx5IHVzZWQgYnkgdXNlciB0byBjcmVhdGUgdGltZSBwcmltaXRpdmVcblxuICBjb25zdHJ1Y3RvcihkYXRhPzogSVRpbWVQcmltaXRpdmUpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICAgIGlmICgoZGF0YSBhcyBhbnkpLmp1bGlhbl9kYXkpIHRoaXMuanVsaWFuRGF5ID0gKGRhdGEgYXMgYW55KS5qdWxpYW5fZGF5XG4gIH1cblxuICBnZXRHcmVnb3JpYW5EYXRlVGltZSgpOiBHcmVnb3JpYW5EYXRlVGltZSB7XG4gICAgY29uc3QgZyA9IG5ldyBHcmVnb3JpYW5EYXRlVGltZSgpXG4gICAgZy5mcm9tSnVsaWFuRGF5KHRoaXMuanVsaWFuRGF5KTtcbiAgICByZXR1cm4gZztcbiAgfVxuXG4gIGdldEp1bGlhbkRhdGVUaW1lKCk6IEp1bGlhbkRhdGVUaW1lIHtcbiAgICBjb25zdCBqID0gbmV3IEp1bGlhbkRhdGVUaW1lKClcbiAgICBqLmZyb21KdWxpYW5EYXkodGhpcy5qdWxpYW5EYXkpO1xuICAgIHJldHVybiBqO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKiBHZXQgYSBEYXRlVGltZSBvYmplY3QgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBjYWxlbmRhci5cbiAgICpcbiAgICovXG4gIGdldERhdGVUaW1lKGNhbGVuZGFyOiBDYWxlbmRhclR5cGUgPSB0aGlzLmNhbGVuZGFyKTogR3JlZ29yaWFuRGF0ZVRpbWUgfCBKdWxpYW5EYXRlVGltZSB8IG51bGwge1xuXG4gICAgaWYgKCFjYWxlbmRhcikgcmV0dXJuIG51bGw7XG5cbiAgICBpZiAoY2FsZW5kYXIgPT09ICdncmVnb3JpYW4nKSByZXR1cm4gdGhpcy5nZXRHcmVnb3JpYW5EYXRlVGltZSgpO1xuXG4gICAgaWYgKGNhbGVuZGFyID09PSAnanVsaWFuJykgcmV0dXJuIHRoaXMuZ2V0SnVsaWFuRGF0ZVRpbWUoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdldCBhIERhdGUgb2JqZWN0IGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gY2FsZW5kYXIuXG4gICAqXG4gICAqL1xuICBnZXREYXRlKGNhbGVuZGFyOiBDYWxlbmRhclR5cGUgPSB0aGlzLmNhbGVuZGFyKTogRGF0ZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmdldERhdGVUaW1lKGNhbGVuZGFyKS5nZXREYXRlKCk7XG4gIH1cbiAgLyoqXG4gICAqIEdldCBhIHN0cmluZyB0aGF0IGRlZmluZXMgdGhlIGZvcm1hdCB1c2FibGUgd2l0aCB0aGUgRGF0ZVBpcGUsXG4gICAqIGEgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBncmFudWxhcml0eVxuICAgKi9cbiAgZ2V0RGF0ZUZvcm1hdFN0cmluZyhncmFudWxhcml0eTogR3JhbnVsYXJpdHkpOiBzdHJpbmcge1xuXG4gICAgaWYgKHRoaXMuanVsaWFuRGF5IDw9IHRoaXMuTEFTVF9EQVlfQkMpIHtcbiAgICAgIHN3aXRjaCAoZ3JhbnVsYXJpdHkpIHtcbiAgICAgICAgY2FzZSAnMSB5ZWFyJzpcbiAgICAgICAgICByZXR1cm4gJ3kgR0cnO1xuICAgICAgICBjYXNlICcxIG1vbnRoJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSwgeSBHRyc7XG4gICAgICAgIGNhc2UgJzEgZGF5JzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5IEdHJztcbiAgICAgICAgY2FzZSAnMSBob3VyJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5IEdHLCBISCc7XG4gICAgICAgIGNhc2UgJzEgbWludXRlJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5IEdHLCBISDptbSc7XG4gICAgICAgIGNhc2UgJzEgc2Vjb25kJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5IEdHLCBISDptbTpzcyc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGdyYW51bGFyaXR5KSB7XG4gICAgICAgIGNhc2UgJzEgeWVhcic6XG4gICAgICAgICAgcmV0dXJuICd5JztcbiAgICAgICAgY2FzZSAnMSBtb250aCc6XG4gICAgICAgICAgcmV0dXJuICdNTU0sIHknO1xuICAgICAgICBjYXNlICcxIGRheSc6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSc7XG4gICAgICAgIGNhc2UgJzEgaG91cic6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSwgSEgnO1xuICAgICAgICBjYXNlICcxIG1pbnV0ZSc6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSwgSEg6bW0nO1xuICAgICAgICBjYXNlICcxIHNlY29uZCc6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSwgSEg6bW06c3MnO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgZGlzcGxheSBsYWJlbCBvZiB0aGUgY3VycmVudCBUaW1lUHJpbWl0aXZlLlxuICAgKi9cbiAgZ2V0U2hvcnRlc0RhdGVGb3JtYXRTdHJpbmcoKTogc3RyaW5nIHtcblxuICAgIHJldHVybiB0aGlzLmdldERhdGVGb3JtYXRTdHJpbmcodGhpcy5kdXJhdGlvbik7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGp1bGlhbiBkYXkgaW4gc2Vjb25kc1xuICAgKiBUT0RPOiBpbnRlZ3JhdGUgdGltZVxuICAqL1xuICBnZXRKdWxpYW5TZWNvbmQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5qdWxpYW5EYXkgKiA2MCAqIDYwICogMjQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGxhc3Qgc2Vjb25kIG9mIHRoaXMgVGltZVByaW1pdGl2ZS4gVGhpcyBkZXBlbmRzIG9uIHRoZSBjYWxlbmRhcixcbiAgICogc2luY2UgdGhlIG1vbnRoIGZlYnJ1YXJ5IGFuZCBsZWFwIHllYXJzIGRpZmZlciBmcm9tIG9uZSBjYWxlbmRhciB0byB0aGUgb3RoZXJcbiAgICpcbiAgICovXG4gIGdldExhc3RTZWNvbmQoY2FsZW5kYXI6IENhbGVuZGFyVHlwZSA9IHRoaXMuY2FsZW5kYXIpOiBudW1iZXIgfCBudWxsIHtcbiAgICBjb25zdCBkdCA9IHRoaXMuZ2V0RGF0ZVRpbWUoKVxuICAgIHJldHVybiBkdC5nZXRFbmRPZih0aGlzLmR1cmF0aW9uKS5nZXRKdWxpYW5TZWNvbmQoKTtcbiAgfVxuXG59XG4iXX0=