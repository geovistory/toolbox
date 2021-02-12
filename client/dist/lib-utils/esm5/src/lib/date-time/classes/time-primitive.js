/**
 * @fileoverview added by tsickle
 * Generated from: classes/time-primitive.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1wcmltaXRpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzL3NyYy9saWIvZGF0ZS10aW1lLyIsInNvdXJjZXMiOlsiY2xhc3Nlcy90aW1lLXByaW1pdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQUlwRCw2QkFJQzs7O0lBSEMsbUNBQW1COztJQUNuQixrQ0FBdUI7O0lBQ3ZCLGtDQUF3Qjs7QUFHMUI7SUFTRSx1QkFBWSxJQUFxQjs7UUFOeEIsZ0JBQVcsR0FBRyxPQUFPLENBQUM7UUFPN0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUMsVUFBVTtZQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQTtJQUN6RSxDQUFDOzs7O0lBRUQsNENBQW9COzs7SUFBcEI7O1lBQ1EsQ0FBQyxHQUFHLElBQUksaUJBQWlCLEVBQUU7UUFDakMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDOzs7O0lBRUQseUNBQWlCOzs7SUFBakI7O1lBQ1EsQ0FBQyxHQUFHLElBQUksY0FBYyxFQUFFO1FBQzlCLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUlEOzs7T0FHRzs7Ozs7OztJQUNILG1DQUFXOzs7Ozs7SUFBWCxVQUFZLFFBQXNDO1FBQXRDLHlCQUFBLEVBQUEsV0FBeUIsSUFBSSxDQUFDLFFBQVE7UUFFaEQsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPLElBQUksQ0FBQztRQUUzQixJQUFJLFFBQVEsS0FBSyxXQUFXO1lBQUUsT0FBTyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUVqRSxJQUFJLFFBQVEsS0FBSyxRQUFRO1lBQUUsT0FBTyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3RCxDQUFDO0lBR0Q7OztPQUdHOzs7Ozs7O0lBQ0gsK0JBQU87Ozs7OztJQUFQLFVBQVEsUUFBc0M7UUFBdEMseUJBQUEsRUFBQSxXQUF5QixJQUFJLENBQUMsUUFBUTtRQUM1QyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUNEOzs7T0FHRzs7Ozs7OztJQUNILDJDQUFtQjs7Ozs7O0lBQW5CLFVBQW9CLFdBQXdCO1FBRTFDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3RDLFFBQVEsV0FBVyxFQUFFO2dCQUNuQixLQUFLLFFBQVE7b0JBQ1gsT0FBTyxNQUFNLENBQUM7Z0JBQ2hCLEtBQUssU0FBUztvQkFDWixPQUFPLFdBQVcsQ0FBQztnQkFDckIsS0FBSyxPQUFPO29CQUNWLE9BQU8sYUFBYSxDQUFDO2dCQUN2QixLQUFLLFFBQVE7b0JBQ1gsT0FBTyxpQkFBaUIsQ0FBQztnQkFDM0IsS0FBSyxVQUFVO29CQUNiLE9BQU8sb0JBQW9CLENBQUM7Z0JBQzlCLEtBQUssVUFBVTtvQkFDYixPQUFPLHVCQUF1QixDQUFDO2dCQUNqQztvQkFDRSxPQUFPLEVBQUUsQ0FBQzthQUNiO1NBQ0Y7YUFBTTtZQUNMLFFBQVEsV0FBVyxFQUFFO2dCQUNuQixLQUFLLFFBQVE7b0JBQ1gsT0FBTyxHQUFHLENBQUM7Z0JBQ2IsS0FBSyxTQUFTO29CQUNaLE9BQU8sUUFBUSxDQUFDO2dCQUNsQixLQUFLLE9BQU87b0JBQ1YsT0FBTyxVQUFVLENBQUM7Z0JBQ3BCLEtBQUssUUFBUTtvQkFDWCxPQUFPLGNBQWMsQ0FBQztnQkFDeEIsS0FBSyxVQUFVO29CQUNiLE9BQU8saUJBQWlCLENBQUM7Z0JBQzNCLEtBQUssVUFBVTtvQkFDYixPQUFPLG9CQUFvQixDQUFDO2dCQUM5QjtvQkFDRSxPQUFPLEVBQUUsQ0FBQzthQUNiO1NBQ0Y7SUFDSCxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsa0RBQTBCOzs7O0lBQTFCO1FBRUUsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFHRDs7O01BR0U7Ozs7OztJQUNGLHVDQUFlOzs7OztJQUFmO1FBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFHRDs7OztPQUlHOzs7Ozs7OztJQUNILHFDQUFhOzs7Ozs7O0lBQWIsVUFBYyxRQUFzQztRQUF0Qyx5QkFBQSxFQUFBLFdBQXlCLElBQUksQ0FBQyxRQUFROztZQUM1QyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUM3QixPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFFSCxvQkFBQztBQUFELENBQUMsQUF4SEQsSUF3SEM7Ozs7SUFySEMsb0NBQStCOztJQUUvQixrQ0FBa0I7O0lBQ2xCLGlDQUFzQjs7SUFDdEIsaUNBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBHcmFudWxhcml0eSB9IGZyb20gJy4vZGF0ZS10aW1lLWNvbW1vbnMnO1xuaW1wb3J0IHsgR3JlZ29yaWFuRGF0ZVRpbWUgfSBmcm9tICcuL2dyZWdvcmlhbi1kYXRlLXRpbWUnO1xuaW1wb3J0IHsgSnVsaWFuRGF0ZVRpbWUgfSBmcm9tICcuL2p1bGlhbi1kYXRlLXRpbWUnO1xuXG5leHBvcnQgdHlwZSBDYWxlbmRhclR5cGUgPSAnZ3JlZ29yaWFuJyB8ICdqdWxpYW4nO1xuXG5pbnRlcmZhY2UgSVRpbWVQcmltaXRpdmUge1xuICBqdWxpYW5EYXk/OiBudW1iZXI7XG4gIGR1cmF0aW9uPzogR3JhbnVsYXJpdHk7XG4gIGNhbGVuZGFyPzogQ2FsZW5kYXJUeXBlO1xufVxuXG5leHBvcnQgY2xhc3MgVGltZVByaW1pdGl2ZSB7XG5cbiAgLy8gTGFzdCBkYXkgb2YgdGhlIGVyYSBiZWZvcmUgY2hyaXN0XG4gIHJlYWRvbmx5IExBU1RfREFZX0JDID0gMTcyMTQyMjtcblxuICBqdWxpYW5EYXk6IG51bWJlcjtcbiAgZHVyYXRpb246IEdyYW51bGFyaXR5O1xuICBjYWxlbmRhcjogQ2FsZW5kYXJUeXBlOyAvLyB0aGUgY2FsZW5kYXIgaW5pdGlhbHkgdXNlZCBieSB1c2VyIHRvIGNyZWF0ZSB0aW1lIHByaW1pdGl2ZVxuXG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBJVGltZVByaW1pdGl2ZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gICAgaWYgKChkYXRhIGFzIGFueSkuanVsaWFuX2RheSkgdGhpcy5qdWxpYW5EYXkgPSAoZGF0YSBhcyBhbnkpLmp1bGlhbl9kYXlcbiAgfVxuXG4gIGdldEdyZWdvcmlhbkRhdGVUaW1lKCk6IEdyZWdvcmlhbkRhdGVUaW1lIHtcbiAgICBjb25zdCBnID0gbmV3IEdyZWdvcmlhbkRhdGVUaW1lKClcbiAgICBnLmZyb21KdWxpYW5EYXkodGhpcy5qdWxpYW5EYXkpO1xuICAgIHJldHVybiBnO1xuICB9XG5cbiAgZ2V0SnVsaWFuRGF0ZVRpbWUoKTogSnVsaWFuRGF0ZVRpbWUge1xuICAgIGNvbnN0IGogPSBuZXcgSnVsaWFuRGF0ZVRpbWUoKVxuICAgIGouZnJvbUp1bGlhbkRheSh0aGlzLmp1bGlhbkRheSk7XG4gICAgcmV0dXJuIGo7XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIEdldCBhIERhdGVUaW1lIG9iamVjdCBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIGNhbGVuZGFyLlxuICAgKlxuICAgKi9cbiAgZ2V0RGF0ZVRpbWUoY2FsZW5kYXI6IENhbGVuZGFyVHlwZSA9IHRoaXMuY2FsZW5kYXIpOiBHcmVnb3JpYW5EYXRlVGltZSB8IEp1bGlhbkRhdGVUaW1lIHwgbnVsbCB7XG5cbiAgICBpZiAoIWNhbGVuZGFyKSByZXR1cm4gbnVsbDtcblxuICAgIGlmIChjYWxlbmRhciA9PT0gJ2dyZWdvcmlhbicpIHJldHVybiB0aGlzLmdldEdyZWdvcmlhbkRhdGVUaW1lKCk7XG5cbiAgICBpZiAoY2FsZW5kYXIgPT09ICdqdWxpYW4nKSByZXR1cm4gdGhpcy5nZXRKdWxpYW5EYXRlVGltZSgpO1xuICB9XG5cblxuICAvKipcbiAgICogR2V0IGEgRGF0ZSBvYmplY3QgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBjYWxlbmRhci5cbiAgICpcbiAgICovXG4gIGdldERhdGUoY2FsZW5kYXI6IENhbGVuZGFyVHlwZSA9IHRoaXMuY2FsZW5kYXIpOiBEYXRlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZVRpbWUoY2FsZW5kYXIpLmdldERhdGUoKTtcbiAgfVxuICAvKipcbiAgICogR2V0IGEgc3RyaW5nIHRoYXQgZGVmaW5lcyB0aGUgZm9ybWF0IHVzYWJsZSB3aXRoIHRoZSBEYXRlUGlwZSxcbiAgICogYSBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIGdyYW51bGFyaXR5XG4gICAqL1xuICBnZXREYXRlRm9ybWF0U3RyaW5nKGdyYW51bGFyaXR5OiBHcmFudWxhcml0eSk6IHN0cmluZyB7XG5cbiAgICBpZiAodGhpcy5qdWxpYW5EYXkgPD0gdGhpcy5MQVNUX0RBWV9CQykge1xuICAgICAgc3dpdGNoIChncmFudWxhcml0eSkge1xuICAgICAgICBjYXNlICcxIHllYXInOlxuICAgICAgICAgIHJldHVybiAneSBHRyc7XG4gICAgICAgIGNhc2UgJzEgbW9udGgnOlxuICAgICAgICAgIHJldHVybiAnTU1NLCB5IEdHJztcbiAgICAgICAgY2FzZSAnMSBkYXknOlxuICAgICAgICAgIHJldHVybiAnTU1NIGQsIHkgR0cnO1xuICAgICAgICBjYXNlICcxIGhvdXInOlxuICAgICAgICAgIHJldHVybiAnTU1NIGQsIHkgR0csIEhIJztcbiAgICAgICAgY2FzZSAnMSBtaW51dGUnOlxuICAgICAgICAgIHJldHVybiAnTU1NIGQsIHkgR0csIEhIOm1tJztcbiAgICAgICAgY2FzZSAnMSBzZWNvbmQnOlxuICAgICAgICAgIHJldHVybiAnTU1NIGQsIHkgR0csIEhIOm1tOnNzJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAoZ3JhbnVsYXJpdHkpIHtcbiAgICAgICAgY2FzZSAnMSB5ZWFyJzpcbiAgICAgICAgICByZXR1cm4gJ3knO1xuICAgICAgICBjYXNlICcxIG1vbnRoJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSwgeSc7XG4gICAgICAgIGNhc2UgJzEgZGF5JzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5JztcbiAgICAgICAgY2FzZSAnMSBob3VyJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5LCBISCc7XG4gICAgICAgIGNhc2UgJzEgbWludXRlJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5LCBISDptbSc7XG4gICAgICAgIGNhc2UgJzEgc2Vjb25kJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5LCBISDptbTpzcyc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBkaXNwbGF5IGxhYmVsIG9mIHRoZSBjdXJyZW50IFRpbWVQcmltaXRpdmUuXG4gICAqL1xuICBnZXRTaG9ydGVzRGF0ZUZvcm1hdFN0cmluZygpOiBzdHJpbmcge1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZUZvcm1hdFN0cmluZyh0aGlzLmR1cmF0aW9uKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdldCB0aGUganVsaWFuIGRheSBpbiBzZWNvbmRzXG4gICAqIFRPRE86IGludGVncmF0ZSB0aW1lXG4gICovXG4gIGdldEp1bGlhblNlY29uZCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmp1bGlhbkRheSAqIDYwICogNjAgKiAyNDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbGFzdCBzZWNvbmQgb2YgdGhpcyBUaW1lUHJpbWl0aXZlLiBUaGlzIGRlcGVuZHMgb24gdGhlIGNhbGVuZGFyLFxuICAgKiBzaW5jZSB0aGUgbW9udGggZmVicnVhcnkgYW5kIGxlYXAgeWVhcnMgZGlmZmVyIGZyb20gb25lIGNhbGVuZGFyIHRvIHRoZSBvdGhlclxuICAgKlxuICAgKi9cbiAgZ2V0TGFzdFNlY29uZChjYWxlbmRhcjogQ2FsZW5kYXJUeXBlID0gdGhpcy5jYWxlbmRhcik6IG51bWJlciB8IG51bGwge1xuICAgIGNvbnN0IGR0ID0gdGhpcy5nZXREYXRlVGltZSgpXG4gICAgcmV0dXJuIGR0LmdldEVuZE9mKHRoaXMuZHVyYXRpb24pLmdldEp1bGlhblNlY29uZCgpO1xuICB9XG5cbn1cbiJdfQ==