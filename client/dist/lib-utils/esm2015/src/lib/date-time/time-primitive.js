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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1wcmltaXRpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzL3NyYy9saWIvZGF0ZS10aW1lLyIsInNvdXJjZXMiOlsidGltZS1wcmltaXRpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFJcEQsNkJBSUM7OztJQUhDLG1DQUFtQjs7SUFDbkIsa0NBQXVCOztJQUN2QixrQ0FBd0I7O0FBRzFCLE1BQU0sT0FBTyxhQUFhOzs7OztJQVN4QixZQUFZLElBQXFCOztRQU54QixnQkFBVyxHQUFHLE9BQU8sQ0FBQztRQU83QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxVQUFVO1lBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUMsVUFBVSxDQUFBO0lBQ3pFLENBQUM7Ozs7SUFFRCxvQkFBb0I7O2NBQ1osQ0FBQyxHQUFHLElBQUksaUJBQWlCLEVBQUU7UUFDakMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDOzs7O0lBRUQsaUJBQWlCOztjQUNULENBQUMsR0FBRyxJQUFJLGNBQWMsRUFBRTtRQUM5QixDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7Ozs7Ozs7SUFRRCxXQUFXLENBQUMsV0FBeUIsSUFBSSxDQUFDLFFBQVE7UUFFaEQsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPLElBQUksQ0FBQztRQUUzQixJQUFJLFFBQVEsS0FBSyxXQUFXO1lBQUUsT0FBTyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUVqRSxJQUFJLFFBQVEsS0FBSyxRQUFRO1lBQUUsT0FBTyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3RCxDQUFDOzs7Ozs7O0lBT0QsT0FBTyxDQUFDLFdBQXlCLElBQUksQ0FBQyxRQUFRO1FBQzVDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5QyxDQUFDOzs7Ozs7O0lBS0QsbUJBQW1CLENBQUMsV0FBd0I7UUFFMUMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdEMsUUFBUSxXQUFXLEVBQUU7Z0JBQ25CLEtBQUssUUFBUTtvQkFDWCxPQUFPLE1BQU0sQ0FBQztnQkFDaEIsS0FBSyxTQUFTO29CQUNaLE9BQU8sV0FBVyxDQUFDO2dCQUNyQixLQUFLLE9BQU87b0JBQ1YsT0FBTyxhQUFhLENBQUM7Z0JBQ3ZCLEtBQUssUUFBUTtvQkFDWCxPQUFPLGlCQUFpQixDQUFDO2dCQUMzQixLQUFLLFVBQVU7b0JBQ2IsT0FBTyxvQkFBb0IsQ0FBQztnQkFDOUIsS0FBSyxVQUFVO29CQUNiLE9BQU8sdUJBQXVCLENBQUM7Z0JBQ2pDO29CQUNFLE9BQU8sRUFBRSxDQUFDO2FBQ2I7U0FDRjthQUFNO1lBQ0wsUUFBUSxXQUFXLEVBQUU7Z0JBQ25CLEtBQUssUUFBUTtvQkFDWCxPQUFPLEdBQUcsQ0FBQztnQkFDYixLQUFLLFNBQVM7b0JBQ1osT0FBTyxRQUFRLENBQUM7Z0JBQ2xCLEtBQUssT0FBTztvQkFDVixPQUFPLFVBQVUsQ0FBQztnQkFDcEIsS0FBSyxRQUFRO29CQUNYLE9BQU8sY0FBYyxDQUFDO2dCQUN4QixLQUFLLFVBQVU7b0JBQ2IsT0FBTyxpQkFBaUIsQ0FBQztnQkFDM0IsS0FBSyxVQUFVO29CQUNiLE9BQU8sb0JBQW9CLENBQUM7Z0JBQzlCO29CQUNFLE9BQU8sRUFBRSxDQUFDO2FBQ2I7U0FDRjtJQUNILENBQUM7Ozs7O0lBS0QsMEJBQTBCO1FBRXhCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7Ozs7SUFPRCxlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7Ozs7Ozs7O0lBUUQsYUFBYSxDQUFDLFdBQXlCLElBQUksQ0FBQyxRQUFROztjQUM1QyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUM3QixPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3RELENBQUM7Q0FFRjs7O0lBckhDLG9DQUErQjs7SUFFL0Isa0NBQWtCOztJQUNsQixpQ0FBc0I7O0lBQ3RCLGlDQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgR3JhbnVsYXJpdHkgfSBmcm9tICcuL2RhdGUtdGltZS1jb21tb25zJztcbmltcG9ydCB7IEdyZWdvcmlhbkRhdGVUaW1lIH0gZnJvbSAnLi9ncmVnb3JpYW4tZGF0ZS10aW1lJztcbmltcG9ydCB7IEp1bGlhbkRhdGVUaW1lIH0gZnJvbSAnLi9qdWxpYW4tZGF0ZS10aW1lJztcblxuZXhwb3J0IHR5cGUgQ2FsZW5kYXJUeXBlID0gJ2dyZWdvcmlhbicgfCAnanVsaWFuJztcblxuaW50ZXJmYWNlIElUaW1lUHJpbWl0aXZlIHtcbiAganVsaWFuRGF5PzogbnVtYmVyO1xuICBkdXJhdGlvbj86IEdyYW51bGFyaXR5O1xuICBjYWxlbmRhcj86IENhbGVuZGFyVHlwZTtcbn1cblxuZXhwb3J0IGNsYXNzIFRpbWVQcmltaXRpdmUge1xuXG4gIC8vIExhc3QgZGF5IG9mIHRoZSBlcmEgYmVmb3JlIGNocmlzdFxuICByZWFkb25seSBMQVNUX0RBWV9CQyA9IDE3MjE0MjI7XG5cbiAganVsaWFuRGF5OiBudW1iZXI7XG4gIGR1cmF0aW9uOiBHcmFudWxhcml0eTtcbiAgY2FsZW5kYXI6IENhbGVuZGFyVHlwZTsgLy8gdGhlIGNhbGVuZGFyIGluaXRpYWx5IHVzZWQgYnkgdXNlciB0byBjcmVhdGUgdGltZSBwcmltaXRpdmVcblxuICBjb25zdHJ1Y3RvcihkYXRhPzogSVRpbWVQcmltaXRpdmUpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICAgIGlmICgoZGF0YSBhcyBhbnkpLmp1bGlhbl9kYXkpIHRoaXMuanVsaWFuRGF5ID0gKGRhdGEgYXMgYW55KS5qdWxpYW5fZGF5XG4gIH1cblxuICBnZXRHcmVnb3JpYW5EYXRlVGltZSgpOiBHcmVnb3JpYW5EYXRlVGltZSB7XG4gICAgY29uc3QgZyA9IG5ldyBHcmVnb3JpYW5EYXRlVGltZSgpXG4gICAgZy5mcm9tSnVsaWFuRGF5KHRoaXMuanVsaWFuRGF5KTtcbiAgICByZXR1cm4gZztcbiAgfVxuXG4gIGdldEp1bGlhbkRhdGVUaW1lKCk6IEp1bGlhbkRhdGVUaW1lIHtcbiAgICBjb25zdCBqID0gbmV3IEp1bGlhbkRhdGVUaW1lKClcbiAgICBqLmZyb21KdWxpYW5EYXkodGhpcy5qdWxpYW5EYXkpO1xuICAgIHJldHVybiBqO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKiBHZXQgYSBEYXRlVGltZSBvYmplY3QgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBjYWxlbmRhci5cbiAgICpcbiAgICovXG4gIGdldERhdGVUaW1lKGNhbGVuZGFyOiBDYWxlbmRhclR5cGUgPSB0aGlzLmNhbGVuZGFyKTogR3JlZ29yaWFuRGF0ZVRpbWUgfCBKdWxpYW5EYXRlVGltZSB8IG51bGwge1xuXG4gICAgaWYgKCFjYWxlbmRhcikgcmV0dXJuIG51bGw7XG5cbiAgICBpZiAoY2FsZW5kYXIgPT09ICdncmVnb3JpYW4nKSByZXR1cm4gdGhpcy5nZXRHcmVnb3JpYW5EYXRlVGltZSgpO1xuXG4gICAgaWYgKGNhbGVuZGFyID09PSAnanVsaWFuJykgcmV0dXJuIHRoaXMuZ2V0SnVsaWFuRGF0ZVRpbWUoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdldCBhIERhdGUgb2JqZWN0IGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gY2FsZW5kYXIuXG4gICAqXG4gICAqL1xuICBnZXREYXRlKGNhbGVuZGFyOiBDYWxlbmRhclR5cGUgPSB0aGlzLmNhbGVuZGFyKTogRGF0ZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmdldERhdGVUaW1lKGNhbGVuZGFyKS5nZXREYXRlKCk7XG4gIH1cbiAgLyoqXG4gICAqIEdldCBhIHN0cmluZyB0aGF0IGRlZmluZXMgdGhlIGZvcm1hdCB1c2FibGUgd2l0aCB0aGUgRGF0ZVBpcGUsXG4gICAqIGEgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBncmFudWxhcml0eVxuICAgKi9cbiAgZ2V0RGF0ZUZvcm1hdFN0cmluZyhncmFudWxhcml0eTogR3JhbnVsYXJpdHkpOiBzdHJpbmcge1xuXG4gICAgaWYgKHRoaXMuanVsaWFuRGF5IDw9IHRoaXMuTEFTVF9EQVlfQkMpIHtcbiAgICAgIHN3aXRjaCAoZ3JhbnVsYXJpdHkpIHtcbiAgICAgICAgY2FzZSAnMSB5ZWFyJzpcbiAgICAgICAgICByZXR1cm4gJ3kgR0cnO1xuICAgICAgICBjYXNlICcxIG1vbnRoJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSwgeSBHRyc7XG4gICAgICAgIGNhc2UgJzEgZGF5JzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5IEdHJztcbiAgICAgICAgY2FzZSAnMSBob3VyJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5IEdHLCBISCc7XG4gICAgICAgIGNhc2UgJzEgbWludXRlJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5IEdHLCBISDptbSc7XG4gICAgICAgIGNhc2UgJzEgc2Vjb25kJzpcbiAgICAgICAgICByZXR1cm4gJ01NTSBkLCB5IEdHLCBISDptbTpzcyc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGdyYW51bGFyaXR5KSB7XG4gICAgICAgIGNhc2UgJzEgeWVhcic6XG4gICAgICAgICAgcmV0dXJuICd5JztcbiAgICAgICAgY2FzZSAnMSBtb250aCc6XG4gICAgICAgICAgcmV0dXJuICdNTU0sIHknO1xuICAgICAgICBjYXNlICcxIGRheSc6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSc7XG4gICAgICAgIGNhc2UgJzEgaG91cic6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSwgSEgnO1xuICAgICAgICBjYXNlICcxIG1pbnV0ZSc6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSwgSEg6bW0nO1xuICAgICAgICBjYXNlICcxIHNlY29uZCc6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSwgSEg6bW06c3MnO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgZGlzcGxheSBsYWJlbCBvZiB0aGUgY3VycmVudCBUaW1lUHJpbWl0aXZlLlxuICAgKi9cbiAgZ2V0U2hvcnRlc0RhdGVGb3JtYXRTdHJpbmcoKTogc3RyaW5nIHtcblxuICAgIHJldHVybiB0aGlzLmdldERhdGVGb3JtYXRTdHJpbmcodGhpcy5kdXJhdGlvbik7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGp1bGlhbiBkYXkgaW4gc2Vjb25kc1xuICAgKiBUT0RPOiBpbnRlZ3JhdGUgdGltZVxuICAqL1xuICBnZXRKdWxpYW5TZWNvbmQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5qdWxpYW5EYXkgKiA2MCAqIDYwICogMjQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGxhc3Qgc2Vjb25kIG9mIHRoaXMgVGltZVByaW1pdGl2ZS4gVGhpcyBkZXBlbmRzIG9uIHRoZSBjYWxlbmRhcixcbiAgICogc2luY2UgdGhlIG1vbnRoIGZlYnJ1YXJ5IGFuZCBsZWFwIHllYXJzIGRpZmZlciBmcm9tIG9uZSBjYWxlbmRhciB0byB0aGUgb3RoZXJcbiAgICpcbiAgICovXG4gIGdldExhc3RTZWNvbmQoY2FsZW5kYXI6IENhbGVuZGFyVHlwZSA9IHRoaXMuY2FsZW5kYXIpOiBudW1iZXIgfCBudWxsIHtcbiAgICBjb25zdCBkdCA9IHRoaXMuZ2V0RGF0ZVRpbWUoKVxuICAgIHJldHVybiBkdC5nZXRFbmRPZih0aGlzLmR1cmF0aW9uKS5nZXRKdWxpYW5TZWNvbmQoKTtcbiAgfVxuXG59XG4iXX0=