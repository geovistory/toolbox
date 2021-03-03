/**
 * @fileoverview added by tsickle
 * Generated from: classes/time-primitive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { GregorianDateTime } from './gregorian-date-time';
import { JulianDateTime } from './julian-date-time';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1wcmltaXRpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzL3NyYy9saWIvZGF0ZS10aW1lLyIsInNvdXJjZXMiOlsiY2xhc3Nlcy90aW1lLXByaW1pdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQU1wRCxNQUFNLE9BQU8sYUFBYTs7Ozs7SUFTeEIsWUFBWSxJQUEyQjs7UUFOOUIsZ0JBQVcsR0FBRyxPQUFPLENBQUM7UUFPN0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUMsVUFBVTtZQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQTtJQUN6RSxDQUFDOzs7O0lBRUQsb0JBQW9COztjQUNaLENBQUMsR0FBRyxJQUFJLGlCQUFpQixFQUFFO1FBQ2pDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7OztJQUVELGlCQUFpQjs7Y0FDVCxDQUFDLEdBQUcsSUFBSSxjQUFjLEVBQUU7UUFDOUIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDOzs7Ozs7O0lBUUQsV0FBVyxDQUFDLFdBQXlCLElBQUksQ0FBQyxRQUFRO1FBRWhELElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFM0IsSUFBSSxRQUFRLEtBQUssV0FBVztZQUFFLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFFakUsSUFBSSxRQUFRLEtBQUssUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0QsQ0FBQzs7Ozs7OztJQU9ELE9BQU8sQ0FBQyxXQUF5QixJQUFJLENBQUMsUUFBUTtRQUM1QyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUMsQ0FBQzs7Ozs7OztJQUtELG1CQUFtQixDQUFDLFdBQXdCO1FBRTFDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3RDLFFBQVEsV0FBVyxFQUFFO2dCQUNuQixLQUFLLFFBQVE7b0JBQ1gsT0FBTyxNQUFNLENBQUM7Z0JBQ2hCLEtBQUssU0FBUztvQkFDWixPQUFPLFdBQVcsQ0FBQztnQkFDckIsS0FBSyxPQUFPO29CQUNWLE9BQU8sYUFBYSxDQUFDO2dCQUN2QixLQUFLLFFBQVE7b0JBQ1gsT0FBTyxpQkFBaUIsQ0FBQztnQkFDM0IsS0FBSyxVQUFVO29CQUNiLE9BQU8sb0JBQW9CLENBQUM7Z0JBQzlCLEtBQUssVUFBVTtvQkFDYixPQUFPLHVCQUF1QixDQUFDO2dCQUNqQztvQkFDRSxPQUFPLEVBQUUsQ0FBQzthQUNiO1NBQ0Y7YUFBTTtZQUNMLFFBQVEsV0FBVyxFQUFFO2dCQUNuQixLQUFLLFFBQVE7b0JBQ1gsT0FBTyxHQUFHLENBQUM7Z0JBQ2IsS0FBSyxTQUFTO29CQUNaLE9BQU8sUUFBUSxDQUFDO2dCQUNsQixLQUFLLE9BQU87b0JBQ1YsT0FBTyxVQUFVLENBQUM7Z0JBQ3BCLEtBQUssUUFBUTtvQkFDWCxPQUFPLGNBQWMsQ0FBQztnQkFDeEIsS0FBSyxVQUFVO29CQUNiLE9BQU8saUJBQWlCLENBQUM7Z0JBQzNCLEtBQUssVUFBVTtvQkFDYixPQUFPLG9CQUFvQixDQUFDO2dCQUM5QjtvQkFDRSxPQUFPLEVBQUUsQ0FBQzthQUNiO1NBQ0Y7SUFDSCxDQUFDOzs7OztJQUtELDBCQUEwQjtRQUV4QixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Ozs7O0lBT0QsZUFBZTtRQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUN2QyxDQUFDOzs7Ozs7OztJQVFELGFBQWEsQ0FBQyxXQUF5QixJQUFJLENBQUMsUUFBUTs7Y0FDNUMsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDN0IsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0NBRUY7OztJQXJIQyxvQ0FBK0I7O0lBRS9CLGtDQUFrQjs7SUFDbEIsaUNBQTRDOztJQUM1QyxpQ0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IFRpbWVQcmltaXRpdmVXaXRoQ2FsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0L3B1YmxpYy1hcGknO1xuaW1wb3J0IHsgR3JhbnVsYXJpdHkgfSBmcm9tICcuL2RhdGUtdGltZS1jb21tb25zJztcbmltcG9ydCB7IEdyZWdvcmlhbkRhdGVUaW1lIH0gZnJvbSAnLi9ncmVnb3JpYW4tZGF0ZS10aW1lJztcbmltcG9ydCB7IEp1bGlhbkRhdGVUaW1lIH0gZnJvbSAnLi9qdWxpYW4tZGF0ZS10aW1lJztcblxuZXhwb3J0IHR5cGUgQ2FsZW5kYXJUeXBlID0gVGltZVByaW1pdGl2ZVdpdGhDYWwuQ2FsZW5kYXJFbnVtXG5cblxuXG5leHBvcnQgY2xhc3MgVGltZVByaW1pdGl2ZSB7XG5cbiAgLy8gTGFzdCBkYXkgb2YgdGhlIGVyYSBiZWZvcmUgY2hyaXN0XG4gIHJlYWRvbmx5IExBU1RfREFZX0JDID0gMTcyMTQyMjtcblxuICBqdWxpYW5EYXk6IG51bWJlcjtcbiAgZHVyYXRpb246IFRpbWVQcmltaXRpdmVXaXRoQ2FsLkR1cmF0aW9uRW51bTtcbiAgY2FsZW5kYXI6IFRpbWVQcmltaXRpdmVXaXRoQ2FsLkNhbGVuZGFyRW51bTsgLy8gdGhlIGNhbGVuZGFyIGluaXRpYWx5IHVzZWQgYnkgdXNlciB0byBjcmVhdGUgdGltZSBwcmltaXRpdmVcblxuICBjb25zdHJ1Y3RvcihkYXRhPzogVGltZVByaW1pdGl2ZVdpdGhDYWwpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICAgIGlmICgoZGF0YSBhcyBhbnkpLmp1bGlhbl9kYXkpIHRoaXMuanVsaWFuRGF5ID0gKGRhdGEgYXMgYW55KS5qdWxpYW5fZGF5XG4gIH1cblxuICBnZXRHcmVnb3JpYW5EYXRlVGltZSgpOiBHcmVnb3JpYW5EYXRlVGltZSB7XG4gICAgY29uc3QgZyA9IG5ldyBHcmVnb3JpYW5EYXRlVGltZSgpXG4gICAgZy5mcm9tSnVsaWFuRGF5KHRoaXMuanVsaWFuRGF5KTtcbiAgICByZXR1cm4gZztcbiAgfVxuXG4gIGdldEp1bGlhbkRhdGVUaW1lKCk6IEp1bGlhbkRhdGVUaW1lIHtcbiAgICBjb25zdCBqID0gbmV3IEp1bGlhbkRhdGVUaW1lKClcbiAgICBqLmZyb21KdWxpYW5EYXkodGhpcy5qdWxpYW5EYXkpO1xuICAgIHJldHVybiBqO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKiBHZXQgYSBEYXRlVGltZSBvYmplY3QgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBjYWxlbmRhci5cbiAgICpcbiAgICovXG4gIGdldERhdGVUaW1lKGNhbGVuZGFyOiBDYWxlbmRhclR5cGUgPSB0aGlzLmNhbGVuZGFyKTogR3JlZ29yaWFuRGF0ZVRpbWUgfCBKdWxpYW5EYXRlVGltZSB8IG51bGwge1xuXG4gICAgaWYgKCFjYWxlbmRhcikgcmV0dXJuIG51bGw7XG5cbiAgICBpZiAoY2FsZW5kYXIgPT09ICdncmVnb3JpYW4nKSByZXR1cm4gdGhpcy5nZXRHcmVnb3JpYW5EYXRlVGltZSgpO1xuXG4gICAgaWYgKGNhbGVuZGFyID09PSAnanVsaWFuJykgcmV0dXJuIHRoaXMuZ2V0SnVsaWFuRGF0ZVRpbWUoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdldCBhIERhdGUgb2JqZWN0IGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gY2FsZW5kYXIuXG4gICAqXG4gICAqL1xuICBnZXREYXRlKGNhbGVuZGFyOiBDYWxlbmRhclR5cGUgPSB0aGlzLmNhbGVuZGFyKTogRGF0ZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmdldERhdGVUaW1lKGNhbGVuZGFyKS5nZXREYXRlKCk7XG4gIH1cbiAgLyoqXG4gICAqIEdldCBhIHN0cmluZyB0aGF0IGRlZmluZXMgdGhlIGZvcm1hdCB1c2FibGUgd2l0aCB0aGUgRGF0ZVBpcGUsXG4gICAqIGEgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBncmFudWxhcml0eVxuICAgKi9cbiAgZ2V0RGF0ZUZvcm1hdFN0cmluZyhncmFudWxhcml0eTogR3JhbnVsYXJpdHkpOiBzdHJpbmcge1xuXG4gICAgaWYgKHRoaXMuanVsaWFuRGF5IDw9IHRoaXMuTEFTVF9EQVlfQkMpIHtcbiAgICAgIHN3aXRjaCAoZ3JhbnVsYXJpdHkpIHtcbiAgICAgICAgY2FzZSAnMSB5ZWFyJzpcbiAgICAgICAgICByZXR1cm4gJ3kgR0cnO1xuICAgICAgICBjYXNlICcxIG1vbnRoJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSwgeSBHRyc7XG4gICAgICAgIGNhc2UgJzEgZGF5JzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5IEdHJztcbiAgICAgICAgY2FzZSAnMSBob3VyJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5IEdHLCBISCc7XG4gICAgICAgIGNhc2UgJzEgbWludXRlJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5IEdHLCBISDptbSc7XG4gICAgICAgIGNhc2UgJzEgc2Vjb25kJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5IEdHLCBISDptbTpzcyc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGdyYW51bGFyaXR5KSB7XG4gICAgICAgIGNhc2UgJzEgeWVhcic6XG4gICAgICAgICAgcmV0dXJuICd5JztcbiAgICAgICAgY2FzZSAnMSBtb250aCc6XG4gICAgICAgICAgcmV0dXJuICdNTU0sIHknO1xuICAgICAgICBjYXNlICcxIGRheSc6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSc7XG4gICAgICAgIGNhc2UgJzEgaG91cic6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSwgSEgnO1xuICAgICAgICBjYXNlICcxIG1pbnV0ZSc6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSwgSEg6bW0nO1xuICAgICAgICBjYXNlICcxIHNlY29uZCc6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSwgSEg6bW06c3MnO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgZGlzcGxheSBsYWJlbCBvZiB0aGUgY3VycmVudCBUaW1lUHJpbWl0aXZlLlxuICAgKi9cbiAgZ2V0U2hvcnRlc0RhdGVGb3JtYXRTdHJpbmcoKTogc3RyaW5nIHtcblxuICAgIHJldHVybiB0aGlzLmdldERhdGVGb3JtYXRTdHJpbmcodGhpcy5kdXJhdGlvbik7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGp1bGlhbiBkYXkgaW4gc2Vjb25kc1xuICAgKiBUT0RPOiBpbnRlZ3JhdGUgdGltZVxuICAqL1xuICBnZXRKdWxpYW5TZWNvbmQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5qdWxpYW5EYXkgKiA2MCAqIDYwICogMjQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGxhc3Qgc2Vjb25kIG9mIHRoaXMgVGltZVByaW1pdGl2ZS4gVGhpcyBkZXBlbmRzIG9uIHRoZSBjYWxlbmRhcixcbiAgICogc2luY2UgdGhlIG1vbnRoIGZlYnJ1YXJ5IGFuZCBsZWFwIHllYXJzIGRpZmZlciBmcm9tIG9uZSBjYWxlbmRhciB0byB0aGUgb3RoZXJcbiAgICpcbiAgICovXG4gIGdldExhc3RTZWNvbmQoY2FsZW5kYXI6IENhbGVuZGFyVHlwZSA9IHRoaXMuY2FsZW5kYXIpOiBudW1iZXIgfCBudWxsIHtcbiAgICBjb25zdCBkdCA9IHRoaXMuZ2V0RGF0ZVRpbWUoKVxuICAgIHJldHVybiBkdC5nZXRFbmRPZih0aGlzLmR1cmF0aW9uKS5nZXRKdWxpYW5TZWNvbmQoKTtcbiAgfVxuXG59XG4iXX0=