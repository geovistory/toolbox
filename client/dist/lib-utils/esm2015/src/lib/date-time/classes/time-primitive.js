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
export class TimePrimitive {
    // the calendar initialy used by user to create time primitive
    /**
     * @param {?=} data
     */
    constructor(data) {
        // Last day of the era before christ
        this.LAST_DAY_BC = 1721422;
        Object.assign(this, data);
        if (((/** @type {?} */ (data))).julian_day)
            this.julianDay = ((/** @type {?} */ (data))).julian_day;
    }
    /**
     * @return {?}
     */
    getGregorianDateTime() {
        /** @type {?} */
        const g = new GregorianDateTime();
        g.fromJulianDay(this.julianDay);
        return g;
    }
    /**
     * @return {?}
     */
    getJulianDateTime() {
        /** @type {?} */
        const j = new JulianDateTime();
        j.fromJulianDay(this.julianDay);
        return j;
    }
    /**
     * Get a DateTime object according to the given calendar.
     *
     * @param {?=} calendar
     * @return {?}
     */
    getDateTime(calendar = this.calendar) {
        if (!calendar)
            return null;
        if (calendar === 'gregorian')
            return this.getGregorianDateTime();
        if (calendar === 'julian')
            return this.getJulianDateTime();
    }
    /**
     * Get a Date object according to the given calendar.
     *
     * @param {?=} calendar
     * @return {?}
     */
    getDate(calendar = this.calendar) {
        return this.getDateTime(calendar).getDate();
    }
    /**
     * Get a string that defines the format usable with the DatePipe,
     * a according to the given granularity
     * @param {?} granularity
     * @return {?}
     */
    getDateFormatString(granularity) {
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
    }
    /**
     * Get a display label of the current TimePrimitive.
     * @return {?}
     */
    getShortesDateFormatString() {
        return this.getDateFormatString(this.duration);
    }
    /**
     * Get the julian day in seconds
     * TODO: integrate time
     * @return {?}
     */
    getJulianSecond() {
        return this.julianDay * 60 * 60 * 24;
    }
    /**
     * Get the last second of this TimePrimitive. This depends on the calendar,
     * since the month february and leap years differ from one calendar to the other
     *
     * @param {?=} calendar
     * @return {?}
     */
    getLastSecond(calendar = this.calendar) {
        /** @type {?} */
        const dt = this.getDateTime();
        return dt.getEndOf(this.duration).getJulianSecond();
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1wcmltaXRpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzL3NyYy9saWIvZGF0ZS10aW1lLyIsInNvdXJjZXMiOlsiY2xhc3Nlcy90aW1lLXByaW1pdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQUlwRCw2QkFJQzs7O0lBSEMsbUNBQW1COztJQUNuQixrQ0FBdUI7O0lBQ3ZCLGtDQUF3Qjs7QUFHMUIsTUFBTSxPQUFPLGFBQWE7Ozs7O0lBU3hCLFlBQVksSUFBcUI7O1FBTnhCLGdCQUFXLEdBQUcsT0FBTyxDQUFDO1FBTzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLFVBQVU7WUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxVQUFVLENBQUE7SUFDekUsQ0FBQzs7OztJQUVELG9CQUFvQjs7Y0FDWixDQUFDLEdBQUcsSUFBSSxpQkFBaUIsRUFBRTtRQUNqQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7Ozs7SUFFRCxpQkFBaUI7O2NBQ1QsQ0FBQyxHQUFHLElBQUksY0FBYyxFQUFFO1FBQzlCLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7Ozs7OztJQVFELFdBQVcsQ0FBQyxXQUF5QixJQUFJLENBQUMsUUFBUTtRQUVoRCxJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRTNCLElBQUksUUFBUSxLQUFLLFdBQVc7WUFBRSxPQUFPLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRWpFLElBQUksUUFBUSxLQUFLLFFBQVE7WUFBRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdELENBQUM7Ozs7Ozs7SUFPRCxPQUFPLENBQUMsV0FBeUIsSUFBSSxDQUFDLFFBQVE7UUFDNUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzlDLENBQUM7Ozs7Ozs7SUFLRCxtQkFBbUIsQ0FBQyxXQUF3QjtRQUUxQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN0QyxRQUFRLFdBQVcsRUFBRTtnQkFDbkIsS0FBSyxRQUFRO29CQUNYLE9BQU8sTUFBTSxDQUFDO2dCQUNoQixLQUFLLFNBQVM7b0JBQ1osT0FBTyxXQUFXLENBQUM7Z0JBQ3JCLEtBQUssT0FBTztvQkFDVixPQUFPLGFBQWEsQ0FBQztnQkFDdkIsS0FBSyxRQUFRO29CQUNYLE9BQU8saUJBQWlCLENBQUM7Z0JBQzNCLEtBQUssVUFBVTtvQkFDYixPQUFPLG9CQUFvQixDQUFDO2dCQUM5QixLQUFLLFVBQVU7b0JBQ2IsT0FBTyx1QkFBdUIsQ0FBQztnQkFDakM7b0JBQ0UsT0FBTyxFQUFFLENBQUM7YUFDYjtTQUNGO2FBQU07WUFDTCxRQUFRLFdBQVcsRUFBRTtnQkFDbkIsS0FBSyxRQUFRO29CQUNYLE9BQU8sR0FBRyxDQUFDO2dCQUNiLEtBQUssU0FBUztvQkFDWixPQUFPLFFBQVEsQ0FBQztnQkFDbEIsS0FBSyxPQUFPO29CQUNWLE9BQU8sVUFBVSxDQUFDO2dCQUNwQixLQUFLLFFBQVE7b0JBQ1gsT0FBTyxjQUFjLENBQUM7Z0JBQ3hCLEtBQUssVUFBVTtvQkFDYixPQUFPLGlCQUFpQixDQUFDO2dCQUMzQixLQUFLLFVBQVU7b0JBQ2IsT0FBTyxvQkFBb0IsQ0FBQztnQkFDOUI7b0JBQ0UsT0FBTyxFQUFFLENBQUM7YUFDYjtTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFLRCwwQkFBMEI7UUFFeEIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7OztJQU9ELGVBQWU7UUFDYixPQUFPLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDdkMsQ0FBQzs7Ozs7Ozs7SUFRRCxhQUFhLENBQUMsV0FBeUIsSUFBSSxDQUFDLFFBQVE7O2NBQzVDLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQzdCLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDdEQsQ0FBQztDQUVGOzs7SUFySEMsb0NBQStCOztJQUUvQixrQ0FBa0I7O0lBQ2xCLGlDQUFzQjs7SUFDdEIsaUNBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBHcmFudWxhcml0eSB9IGZyb20gJy4vZGF0ZS10aW1lLWNvbW1vbnMnO1xuaW1wb3J0IHsgR3JlZ29yaWFuRGF0ZVRpbWUgfSBmcm9tICcuL2dyZWdvcmlhbi1kYXRlLXRpbWUnO1xuaW1wb3J0IHsgSnVsaWFuRGF0ZVRpbWUgfSBmcm9tICcuL2p1bGlhbi1kYXRlLXRpbWUnO1xuXG5leHBvcnQgdHlwZSBDYWxlbmRhclR5cGUgPSAnZ3JlZ29yaWFuJyB8ICdqdWxpYW4nO1xuXG5pbnRlcmZhY2UgSVRpbWVQcmltaXRpdmUge1xuICBqdWxpYW5EYXk/OiBudW1iZXI7XG4gIGR1cmF0aW9uPzogR3JhbnVsYXJpdHk7XG4gIGNhbGVuZGFyPzogQ2FsZW5kYXJUeXBlO1xufVxuXG5leHBvcnQgY2xhc3MgVGltZVByaW1pdGl2ZSB7XG5cbiAgLy8gTGFzdCBkYXkgb2YgdGhlIGVyYSBiZWZvcmUgY2hyaXN0XG4gIHJlYWRvbmx5IExBU1RfREFZX0JDID0gMTcyMTQyMjtcblxuICBqdWxpYW5EYXk6IG51bWJlcjtcbiAgZHVyYXRpb246IEdyYW51bGFyaXR5O1xuICBjYWxlbmRhcjogQ2FsZW5kYXJUeXBlOyAvLyB0aGUgY2FsZW5kYXIgaW5pdGlhbHkgdXNlZCBieSB1c2VyIHRvIGNyZWF0ZSB0aW1lIHByaW1pdGl2ZVxuXG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBJVGltZVByaW1pdGl2ZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gICAgaWYgKChkYXRhIGFzIGFueSkuanVsaWFuX2RheSkgdGhpcy5qdWxpYW5EYXkgPSAoZGF0YSBhcyBhbnkpLmp1bGlhbl9kYXlcbiAgfVxuXG4gIGdldEdyZWdvcmlhbkRhdGVUaW1lKCk6IEdyZWdvcmlhbkRhdGVUaW1lIHtcbiAgICBjb25zdCBnID0gbmV3IEdyZWdvcmlhbkRhdGVUaW1lKClcbiAgICBnLmZyb21KdWxpYW5EYXkodGhpcy5qdWxpYW5EYXkpO1xuICAgIHJldHVybiBnO1xuICB9XG5cbiAgZ2V0SnVsaWFuRGF0ZVRpbWUoKTogSnVsaWFuRGF0ZVRpbWUge1xuICAgIGNvbnN0IGogPSBuZXcgSnVsaWFuRGF0ZVRpbWUoKVxuICAgIGouZnJvbUp1bGlhbkRheSh0aGlzLmp1bGlhbkRheSk7XG4gICAgcmV0dXJuIGo7XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIEdldCBhIERhdGVUaW1lIG9iamVjdCBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIGNhbGVuZGFyLlxuICAgKlxuICAgKi9cbiAgZ2V0RGF0ZVRpbWUoY2FsZW5kYXI6IENhbGVuZGFyVHlwZSA9IHRoaXMuY2FsZW5kYXIpOiBHcmVnb3JpYW5EYXRlVGltZSB8IEp1bGlhbkRhdGVUaW1lIHwgbnVsbCB7XG5cbiAgICBpZiAoIWNhbGVuZGFyKSByZXR1cm4gbnVsbDtcblxuICAgIGlmIChjYWxlbmRhciA9PT0gJ2dyZWdvcmlhbicpIHJldHVybiB0aGlzLmdldEdyZWdvcmlhbkRhdGVUaW1lKCk7XG5cbiAgICBpZiAoY2FsZW5kYXIgPT09ICdqdWxpYW4nKSByZXR1cm4gdGhpcy5nZXRKdWxpYW5EYXRlVGltZSgpO1xuICB9XG5cblxuICAvKipcbiAgICogR2V0IGEgRGF0ZSBvYmplY3QgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBjYWxlbmRhci5cbiAgICpcbiAgICovXG4gIGdldERhdGUoY2FsZW5kYXI6IENhbGVuZGFyVHlwZSA9IHRoaXMuY2FsZW5kYXIpOiBEYXRlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZVRpbWUoY2FsZW5kYXIpLmdldERhdGUoKTtcbiAgfVxuICAvKipcbiAgICogR2V0IGEgc3RyaW5nIHRoYXQgZGVmaW5lcyB0aGUgZm9ybWF0IHVzYWJsZSB3aXRoIHRoZSBEYXRlUGlwZSxcbiAgICogYSBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIGdyYW51bGFyaXR5XG4gICAqL1xuICBnZXREYXRlRm9ybWF0U3RyaW5nKGdyYW51bGFyaXR5OiBHcmFudWxhcml0eSk6IHN0cmluZyB7XG5cbiAgICBpZiAodGhpcy5qdWxpYW5EYXkgPD0gdGhpcy5MQVNUX0RBWV9CQykge1xuICAgICAgc3dpdGNoIChncmFudWxhcml0eSkge1xuICAgICAgICBjYXNlICcxIHllYXInOlxuICAgICAgICAgIHJldHVybiAneSBHRyc7XG4gICAgICAgIGNhc2UgJzEgbW9udGgnOlxuICAgICAgICAgIHJldHVybiAnTU1NLCB5IEdHJztcbiAgICAgICAgY2FzZSAnMSBkYXknOlxuICAgICAgICAgIHJldHVybiAnTU1NIGQsIHkgR0cnO1xuICAgICAgICBjYXNlICcxIGhvdXInOlxuICAgICAgICAgIHJldHVybiAnTU1NIGQsIHkgR0csIEhIJztcbiAgICAgICAgY2FzZSAnMSBtaW51dGUnOlxuICAgICAgICAgIHJldHVybiAnTU1NIGQsIHkgR0csIEhIOm1tJztcbiAgICAgICAgY2FzZSAnMSBzZWNvbmQnOlxuICAgICAgICAgIHJldHVybiAnTU1NIGQsIHkgR0csIEhIOm1tOnNzJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAoZ3JhbnVsYXJpdHkpIHtcbiAgICAgICAgY2FzZSAnMSB5ZWFyJzpcbiAgICAgICAgICByZXR1cm4gJ3knO1xuICAgICAgICBjYXNlICcxIG1vbnRoJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSwgeSc7XG4gICAgICAgIGNhc2UgJzEgZGF5JzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5JztcbiAgICAgICAgY2FzZSAnMSBob3VyJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5LCBISCc7XG4gICAgICAgIGNhc2UgJzEgbWludXRlJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5LCBISDptbSc7XG4gICAgICAgIGNhc2UgJzEgc2Vjb25kJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5LCBISDptbTpzcyc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBkaXNwbGF5IGxhYmVsIG9mIHRoZSBjdXJyZW50IFRpbWVQcmltaXRpdmUuXG4gICAqL1xuICBnZXRTaG9ydGVzRGF0ZUZvcm1hdFN0cmluZygpOiBzdHJpbmcge1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZUZvcm1hdFN0cmluZyh0aGlzLmR1cmF0aW9uKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdldCB0aGUganVsaWFuIGRheSBpbiBzZWNvbmRzXG4gICAqIFRPRE86IGludGVncmF0ZSB0aW1lXG4gICovXG4gIGdldEp1bGlhblNlY29uZCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmp1bGlhbkRheSAqIDYwICogNjAgKiAyNDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbGFzdCBzZWNvbmQgb2YgdGhpcyBUaW1lUHJpbWl0aXZlLiBUaGlzIGRlcGVuZHMgb24gdGhlIGNhbGVuZGFyLFxuICAgKiBzaW5jZSB0aGUgbW9udGggZmVicnVhcnkgYW5kIGxlYXAgeWVhcnMgZGlmZmVyIGZyb20gb25lIGNhbGVuZGFyIHRvIHRoZSBvdGhlclxuICAgKlxuICAgKi9cbiAgZ2V0TGFzdFNlY29uZChjYWxlbmRhcjogQ2FsZW5kYXJUeXBlID0gdGhpcy5jYWxlbmRhcik6IG51bWJlciB8IG51bGwge1xuICAgIGNvbnN0IGR0ID0gdGhpcy5nZXREYXRlVGltZSgpXG4gICAgcmV0dXJuIGR0LmdldEVuZE9mKHRoaXMuZHVyYXRpb24pLmdldEp1bGlhblNlY29uZCgpO1xuICB9XG5cbn1cbiJdfQ==