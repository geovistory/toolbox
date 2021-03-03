/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/classes/time-primitive.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1wcmltaXRpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9jbGFzc2VzL3RpbWUtcHJpbWl0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBTXBEO0lBU0UsdUJBQVksSUFBMkI7O1FBTjlCLGdCQUFXLEdBQUcsT0FBTyxDQUFDO1FBTzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLFVBQVU7WUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxVQUFVLENBQUE7SUFDekUsQ0FBQzs7OztJQUVELDRDQUFvQjs7O0lBQXBCOztZQUNRLENBQUMsR0FBRyxJQUFJLGlCQUFpQixFQUFFO1FBQ2pDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7OztJQUVELHlDQUFpQjs7O0lBQWpCOztZQUNRLENBQUMsR0FBRyxJQUFJLGNBQWMsRUFBRTtRQUM5QixDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFJRDs7O09BR0c7Ozs7Ozs7SUFDSCxtQ0FBVzs7Ozs7O0lBQVgsVUFBWSxRQUFzQztRQUF0Qyx5QkFBQSxFQUFBLFdBQXlCLElBQUksQ0FBQyxRQUFRO1FBRWhELElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFM0IsSUFBSSxRQUFRLEtBQUssV0FBVztZQUFFLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFFakUsSUFBSSxRQUFRLEtBQUssUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0QsQ0FBQztJQUdEOzs7T0FHRzs7Ozs7OztJQUNILCtCQUFPOzs7Ozs7SUFBUCxVQUFRLFFBQXNDO1FBQXRDLHlCQUFBLEVBQUEsV0FBeUIsSUFBSSxDQUFDLFFBQVE7UUFDNUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFDRDs7O09BR0c7Ozs7Ozs7SUFDSCwyQ0FBbUI7Ozs7OztJQUFuQixVQUFvQixXQUF3QjtRQUUxQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN0QyxRQUFRLFdBQVcsRUFBRTtnQkFDbkIsS0FBSyxRQUFRO29CQUNYLE9BQU8sTUFBTSxDQUFDO2dCQUNoQixLQUFLLFNBQVM7b0JBQ1osT0FBTyxXQUFXLENBQUM7Z0JBQ3JCLEtBQUssT0FBTztvQkFDVixPQUFPLGFBQWEsQ0FBQztnQkFDdkIsS0FBSyxRQUFRO29CQUNYLE9BQU8saUJBQWlCLENBQUM7Z0JBQzNCLEtBQUssVUFBVTtvQkFDYixPQUFPLG9CQUFvQixDQUFDO2dCQUM5QixLQUFLLFVBQVU7b0JBQ2IsT0FBTyx1QkFBdUIsQ0FBQztnQkFDakM7b0JBQ0UsT0FBTyxFQUFFLENBQUM7YUFDYjtTQUNGO2FBQU07WUFDTCxRQUFRLFdBQVcsRUFBRTtnQkFDbkIsS0FBSyxRQUFRO29CQUNYLE9BQU8sR0FBRyxDQUFDO2dCQUNiLEtBQUssU0FBUztvQkFDWixPQUFPLFFBQVEsQ0FBQztnQkFDbEIsS0FBSyxPQUFPO29CQUNWLE9BQU8sVUFBVSxDQUFDO2dCQUNwQixLQUFLLFFBQVE7b0JBQ1gsT0FBTyxjQUFjLENBQUM7Z0JBQ3hCLEtBQUssVUFBVTtvQkFDYixPQUFPLGlCQUFpQixDQUFDO2dCQUMzQixLQUFLLFVBQVU7b0JBQ2IsT0FBTyxvQkFBb0IsQ0FBQztnQkFDOUI7b0JBQ0UsT0FBTyxFQUFFLENBQUM7YUFDYjtTQUNGO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILGtEQUEwQjs7OztJQUExQjtRQUVFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBR0Q7OztNQUdFOzs7Ozs7SUFDRix1Q0FBZTs7Ozs7SUFBZjtRQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBR0Q7Ozs7T0FJRzs7Ozs7Ozs7SUFDSCxxQ0FBYTs7Ozs7OztJQUFiLFVBQWMsUUFBc0M7UUFBdEMseUJBQUEsRUFBQSxXQUF5QixJQUFJLENBQUMsUUFBUTs7WUFDNUMsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDN0IsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBRUgsb0JBQUM7QUFBRCxDQUFDLEFBeEhELElBd0hDOzs7O0lBckhDLG9DQUErQjs7SUFFL0Isa0NBQWtCOztJQUNsQixpQ0FBNEM7O0lBQzVDLGlDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgVGltZVByaW1pdGl2ZVdpdGhDYWwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQvcHVibGljLWFwaSc7XG5pbXBvcnQgeyBHcmFudWxhcml0eSB9IGZyb20gJy4vZGF0ZS10aW1lLWNvbW1vbnMnO1xuaW1wb3J0IHsgR3JlZ29yaWFuRGF0ZVRpbWUgfSBmcm9tICcuL2dyZWdvcmlhbi1kYXRlLXRpbWUnO1xuaW1wb3J0IHsgSnVsaWFuRGF0ZVRpbWUgfSBmcm9tICcuL2p1bGlhbi1kYXRlLXRpbWUnO1xuXG5leHBvcnQgdHlwZSBDYWxlbmRhclR5cGUgPSBUaW1lUHJpbWl0aXZlV2l0aENhbC5DYWxlbmRhckVudW1cblxuXG5cbmV4cG9ydCBjbGFzcyBUaW1lUHJpbWl0aXZlIHtcblxuICAvLyBMYXN0IGRheSBvZiB0aGUgZXJhIGJlZm9yZSBjaHJpc3RcbiAgcmVhZG9ubHkgTEFTVF9EQVlfQkMgPSAxNzIxNDIyO1xuXG4gIGp1bGlhbkRheTogbnVtYmVyO1xuICBkdXJhdGlvbjogVGltZVByaW1pdGl2ZVdpdGhDYWwuRHVyYXRpb25FbnVtO1xuICBjYWxlbmRhcjogVGltZVByaW1pdGl2ZVdpdGhDYWwuQ2FsZW5kYXJFbnVtOyAvLyB0aGUgY2FsZW5kYXIgaW5pdGlhbHkgdXNlZCBieSB1c2VyIHRvIGNyZWF0ZSB0aW1lIHByaW1pdGl2ZVxuXG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBUaW1lUHJpbWl0aXZlV2l0aENhbCkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gICAgaWYgKChkYXRhIGFzIGFueSkuanVsaWFuX2RheSkgdGhpcy5qdWxpYW5EYXkgPSAoZGF0YSBhcyBhbnkpLmp1bGlhbl9kYXlcbiAgfVxuXG4gIGdldEdyZWdvcmlhbkRhdGVUaW1lKCk6IEdyZWdvcmlhbkRhdGVUaW1lIHtcbiAgICBjb25zdCBnID0gbmV3IEdyZWdvcmlhbkRhdGVUaW1lKClcbiAgICBnLmZyb21KdWxpYW5EYXkodGhpcy5qdWxpYW5EYXkpO1xuICAgIHJldHVybiBnO1xuICB9XG5cbiAgZ2V0SnVsaWFuRGF0ZVRpbWUoKTogSnVsaWFuRGF0ZVRpbWUge1xuICAgIGNvbnN0IGogPSBuZXcgSnVsaWFuRGF0ZVRpbWUoKVxuICAgIGouZnJvbUp1bGlhbkRheSh0aGlzLmp1bGlhbkRheSk7XG4gICAgcmV0dXJuIGo7XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIEdldCBhIERhdGVUaW1lIG9iamVjdCBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIGNhbGVuZGFyLlxuICAgKlxuICAgKi9cbiAgZ2V0RGF0ZVRpbWUoY2FsZW5kYXI6IENhbGVuZGFyVHlwZSA9IHRoaXMuY2FsZW5kYXIpOiBHcmVnb3JpYW5EYXRlVGltZSB8IEp1bGlhbkRhdGVUaW1lIHwgbnVsbCB7XG5cbiAgICBpZiAoIWNhbGVuZGFyKSByZXR1cm4gbnVsbDtcblxuICAgIGlmIChjYWxlbmRhciA9PT0gJ2dyZWdvcmlhbicpIHJldHVybiB0aGlzLmdldEdyZWdvcmlhbkRhdGVUaW1lKCk7XG5cbiAgICBpZiAoY2FsZW5kYXIgPT09ICdqdWxpYW4nKSByZXR1cm4gdGhpcy5nZXRKdWxpYW5EYXRlVGltZSgpO1xuICB9XG5cblxuICAvKipcbiAgICogR2V0IGEgRGF0ZSBvYmplY3QgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBjYWxlbmRhci5cbiAgICpcbiAgICovXG4gIGdldERhdGUoY2FsZW5kYXI6IENhbGVuZGFyVHlwZSA9IHRoaXMuY2FsZW5kYXIpOiBEYXRlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZVRpbWUoY2FsZW5kYXIpLmdldERhdGUoKTtcbiAgfVxuICAvKipcbiAgICogR2V0IGEgc3RyaW5nIHRoYXQgZGVmaW5lcyB0aGUgZm9ybWF0IHVzYWJsZSB3aXRoIHRoZSBEYXRlUGlwZSxcbiAgICogYSBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIGdyYW51bGFyaXR5XG4gICAqL1xuICBnZXREYXRlRm9ybWF0U3RyaW5nKGdyYW51bGFyaXR5OiBHcmFudWxhcml0eSk6IHN0cmluZyB7XG5cbiAgICBpZiAodGhpcy5qdWxpYW5EYXkgPD0gdGhpcy5MQVNUX0RBWV9CQykge1xuICAgICAgc3dpdGNoIChncmFudWxhcml0eSkge1xuICAgICAgICBjYXNlICcxIHllYXInOlxuICAgICAgICAgIHJldHVybiAneSBHRyc7XG4gICAgICAgIGNhc2UgJzEgbW9udGgnOlxuICAgICAgICAgIHJldHVybiAnTU1NLCB5IEdHJztcbiAgICAgICAgY2FzZSAnMSBkYXknOlxuICAgICAgICAgIHJldHVybiAnTU1NIGQsIHkgR0cnO1xuICAgICAgICBjYXNlICcxIGhvdXInOlxuICAgICAgICAgIHJldHVybiAnTU1NIGQsIHkgR0csIEhIJztcbiAgICAgICAgY2FzZSAnMSBtaW51dGUnOlxuICAgICAgICAgIHJldHVybiAnTU1NIGQsIHkgR0csIEhIOm1tJztcbiAgICAgICAgY2FzZSAnMSBzZWNvbmQnOlxuICAgICAgICAgIHJldHVybiAnTU1NIGQsIHkgR0csIEhIOm1tOnNzJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAoZ3JhbnVsYXJpdHkpIHtcbiAgICAgICAgY2FzZSAnMSB5ZWFyJzpcbiAgICAgICAgICByZXR1cm4gJ3knO1xuICAgICAgICBjYXNlICcxIG1vbnRoJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSwgeSc7XG4gICAgICAgIGNhc2UgJzEgZGF5JzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5JztcbiAgICAgICAgY2FzZSAnMSBob3VyJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5LCBISCc7XG4gICAgICAgIGNhc2UgJzEgbWludXRlJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5LCBISDptbSc7XG4gICAgICAgIGNhc2UgJzEgc2Vjb25kJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5LCBISDptbTpzcyc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBkaXNwbGF5IGxhYmVsIG9mIHRoZSBjdXJyZW50IFRpbWVQcmltaXRpdmUuXG4gICAqL1xuICBnZXRTaG9ydGVzRGF0ZUZvcm1hdFN0cmluZygpOiBzdHJpbmcge1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZUZvcm1hdFN0cmluZyh0aGlzLmR1cmF0aW9uKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdldCB0aGUganVsaWFuIGRheSBpbiBzZWNvbmRzXG4gICAqIFRPRE86IGludGVncmF0ZSB0aW1lXG4gICovXG4gIGdldEp1bGlhblNlY29uZCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmp1bGlhbkRheSAqIDYwICogNjAgKiAyNDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbGFzdCBzZWNvbmQgb2YgdGhpcyBUaW1lUHJpbWl0aXZlLiBUaGlzIGRlcGVuZHMgb24gdGhlIGNhbGVuZGFyLFxuICAgKiBzaW5jZSB0aGUgbW9udGggZmVicnVhcnkgYW5kIGxlYXAgeWVhcnMgZGlmZmVyIGZyb20gb25lIGNhbGVuZGFyIHRvIHRoZSBvdGhlclxuICAgKlxuICAgKi9cbiAgZ2V0TGFzdFNlY29uZChjYWxlbmRhcjogQ2FsZW5kYXJUeXBlID0gdGhpcy5jYWxlbmRhcik6IG51bWJlciB8IG51bGwge1xuICAgIGNvbnN0IGR0ID0gdGhpcy5nZXREYXRlVGltZSgpXG4gICAgcmV0dXJuIGR0LmdldEVuZE9mKHRoaXMuZHVyYXRpb24pLmdldEp1bGlhblNlY29uZCgpO1xuICB9XG5cbn1cbiJdfQ==