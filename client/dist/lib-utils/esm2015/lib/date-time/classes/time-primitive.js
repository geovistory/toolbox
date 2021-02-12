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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1wcmltaXRpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9jbGFzc2VzL3RpbWUtcHJpbWl0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7O0FBSXBELDZCQUlDOzs7SUFIQyxtQ0FBbUI7O0lBQ25CLGtDQUF1Qjs7SUFDdkIsa0NBQXdCOztBQUcxQixNQUFNLE9BQU8sYUFBYTs7Ozs7SUFTeEIsWUFBWSxJQUFxQjs7UUFOeEIsZ0JBQVcsR0FBRyxPQUFPLENBQUM7UUFPN0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUMsVUFBVTtZQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQTtJQUN6RSxDQUFDOzs7O0lBRUQsb0JBQW9COztjQUNaLENBQUMsR0FBRyxJQUFJLGlCQUFpQixFQUFFO1FBQ2pDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7OztJQUVELGlCQUFpQjs7Y0FDVCxDQUFDLEdBQUcsSUFBSSxjQUFjLEVBQUU7UUFDOUIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDOzs7Ozs7O0lBUUQsV0FBVyxDQUFDLFdBQXlCLElBQUksQ0FBQyxRQUFRO1FBRWhELElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFM0IsSUFBSSxRQUFRLEtBQUssV0FBVztZQUFFLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFFakUsSUFBSSxRQUFRLEtBQUssUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0QsQ0FBQzs7Ozs7OztJQU9ELE9BQU8sQ0FBQyxXQUF5QixJQUFJLENBQUMsUUFBUTtRQUM1QyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUMsQ0FBQzs7Ozs7OztJQUtELG1CQUFtQixDQUFDLFdBQXdCO1FBRTFDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3RDLFFBQVEsV0FBVyxFQUFFO2dCQUNuQixLQUFLLFFBQVE7b0JBQ1gsT0FBTyxNQUFNLENBQUM7Z0JBQ2hCLEtBQUssU0FBUztvQkFDWixPQUFPLFdBQVcsQ0FBQztnQkFDckIsS0FBSyxPQUFPO29CQUNWLE9BQU8sYUFBYSxDQUFDO2dCQUN2QixLQUFLLFFBQVE7b0JBQ1gsT0FBTyxpQkFBaUIsQ0FBQztnQkFDM0IsS0FBSyxVQUFVO29CQUNiLE9BQU8sb0JBQW9CLENBQUM7Z0JBQzlCLEtBQUssVUFBVTtvQkFDYixPQUFPLHVCQUF1QixDQUFDO2dCQUNqQztvQkFDRSxPQUFPLEVBQUUsQ0FBQzthQUNiO1NBQ0Y7YUFBTTtZQUNMLFFBQVEsV0FBVyxFQUFFO2dCQUNuQixLQUFLLFFBQVE7b0JBQ1gsT0FBTyxHQUFHLENBQUM7Z0JBQ2IsS0FBSyxTQUFTO29CQUNaLE9BQU8sUUFBUSxDQUFDO2dCQUNsQixLQUFLLE9BQU87b0JBQ1YsT0FBTyxVQUFVLENBQUM7Z0JBQ3BCLEtBQUssUUFBUTtvQkFDWCxPQUFPLGNBQWMsQ0FBQztnQkFDeEIsS0FBSyxVQUFVO29CQUNiLE9BQU8saUJBQWlCLENBQUM7Z0JBQzNCLEtBQUssVUFBVTtvQkFDYixPQUFPLG9CQUFvQixDQUFDO2dCQUM5QjtvQkFDRSxPQUFPLEVBQUUsQ0FBQzthQUNiO1NBQ0Y7SUFDSCxDQUFDOzs7OztJQUtELDBCQUEwQjtRQUV4QixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Ozs7O0lBT0QsZUFBZTtRQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUN2QyxDQUFDOzs7Ozs7OztJQVFELGFBQWEsQ0FBQyxXQUF5QixJQUFJLENBQUMsUUFBUTs7Y0FDNUMsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDN0IsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0NBRUY7OztJQXJIQyxvQ0FBK0I7O0lBRS9CLGtDQUFrQjs7SUFDbEIsaUNBQXNCOztJQUN0QixpQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IEdyYW51bGFyaXR5IH0gZnJvbSAnLi9kYXRlLXRpbWUtY29tbW9ucyc7XG5pbXBvcnQgeyBHcmVnb3JpYW5EYXRlVGltZSB9IGZyb20gJy4vZ3JlZ29yaWFuLWRhdGUtdGltZSc7XG5pbXBvcnQgeyBKdWxpYW5EYXRlVGltZSB9IGZyb20gJy4vanVsaWFuLWRhdGUtdGltZSc7XG5cbmV4cG9ydCB0eXBlIENhbGVuZGFyVHlwZSA9ICdncmVnb3JpYW4nIHwgJ2p1bGlhbic7XG5cbmludGVyZmFjZSBJVGltZVByaW1pdGl2ZSB7XG4gIGp1bGlhbkRheT86IG51bWJlcjtcbiAgZHVyYXRpb24/OiBHcmFudWxhcml0eTtcbiAgY2FsZW5kYXI/OiBDYWxlbmRhclR5cGU7XG59XG5cbmV4cG9ydCBjbGFzcyBUaW1lUHJpbWl0aXZlIHtcblxuICAvLyBMYXN0IGRheSBvZiB0aGUgZXJhIGJlZm9yZSBjaHJpc3RcbiAgcmVhZG9ubHkgTEFTVF9EQVlfQkMgPSAxNzIxNDIyO1xuXG4gIGp1bGlhbkRheTogbnVtYmVyO1xuICBkdXJhdGlvbjogR3JhbnVsYXJpdHk7XG4gIGNhbGVuZGFyOiBDYWxlbmRhclR5cGU7IC8vIHRoZSBjYWxlbmRhciBpbml0aWFseSB1c2VkIGJ5IHVzZXIgdG8gY3JlYXRlIHRpbWUgcHJpbWl0aXZlXG5cbiAgY29uc3RydWN0b3IoZGF0YT86IElUaW1lUHJpbWl0aXZlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgICBpZiAoKGRhdGEgYXMgYW55KS5qdWxpYW5fZGF5KSB0aGlzLmp1bGlhbkRheSA9IChkYXRhIGFzIGFueSkuanVsaWFuX2RheVxuICB9XG5cbiAgZ2V0R3JlZ29yaWFuRGF0ZVRpbWUoKTogR3JlZ29yaWFuRGF0ZVRpbWUge1xuICAgIGNvbnN0IGcgPSBuZXcgR3JlZ29yaWFuRGF0ZVRpbWUoKVxuICAgIGcuZnJvbUp1bGlhbkRheSh0aGlzLmp1bGlhbkRheSk7XG4gICAgcmV0dXJuIGc7XG4gIH1cblxuICBnZXRKdWxpYW5EYXRlVGltZSgpOiBKdWxpYW5EYXRlVGltZSB7XG4gICAgY29uc3QgaiA9IG5ldyBKdWxpYW5EYXRlVGltZSgpXG4gICAgai5mcm9tSnVsaWFuRGF5KHRoaXMuanVsaWFuRGF5KTtcbiAgICByZXR1cm4gajtcbiAgfVxuXG5cblxuICAvKipcbiAgICogR2V0IGEgRGF0ZVRpbWUgb2JqZWN0IGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gY2FsZW5kYXIuXG4gICAqXG4gICAqL1xuICBnZXREYXRlVGltZShjYWxlbmRhcjogQ2FsZW5kYXJUeXBlID0gdGhpcy5jYWxlbmRhcik6IEdyZWdvcmlhbkRhdGVUaW1lIHwgSnVsaWFuRGF0ZVRpbWUgfCBudWxsIHtcblxuICAgIGlmICghY2FsZW5kYXIpIHJldHVybiBudWxsO1xuXG4gICAgaWYgKGNhbGVuZGFyID09PSAnZ3JlZ29yaWFuJykgcmV0dXJuIHRoaXMuZ2V0R3JlZ29yaWFuRGF0ZVRpbWUoKTtcblxuICAgIGlmIChjYWxlbmRhciA9PT0gJ2p1bGlhbicpIHJldHVybiB0aGlzLmdldEp1bGlhbkRhdGVUaW1lKCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXQgYSBEYXRlIG9iamVjdCBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIGNhbGVuZGFyLlxuICAgKlxuICAgKi9cbiAgZ2V0RGF0ZShjYWxlbmRhcjogQ2FsZW5kYXJUeXBlID0gdGhpcy5jYWxlbmRhcik6IERhdGUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5nZXREYXRlVGltZShjYWxlbmRhcikuZ2V0RGF0ZSgpO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgYSBzdHJpbmcgdGhhdCBkZWZpbmVzIHRoZSBmb3JtYXQgdXNhYmxlIHdpdGggdGhlIERhdGVQaXBlLFxuICAgKiBhIGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gZ3JhbnVsYXJpdHlcbiAgICovXG4gIGdldERhdGVGb3JtYXRTdHJpbmcoZ3JhbnVsYXJpdHk6IEdyYW51bGFyaXR5KTogc3RyaW5nIHtcblxuICAgIGlmICh0aGlzLmp1bGlhbkRheSA8PSB0aGlzLkxBU1RfREFZX0JDKSB7XG4gICAgICBzd2l0Y2ggKGdyYW51bGFyaXR5KSB7XG4gICAgICAgIGNhc2UgJzEgeWVhcic6XG4gICAgICAgICAgcmV0dXJuICd5IEdHJztcbiAgICAgICAgY2FzZSAnMSBtb250aCc6XG4gICAgICAgICAgcmV0dXJuICdNTU0sIHkgR0cnO1xuICAgICAgICBjYXNlICcxIGRheSc6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSBHRyc7XG4gICAgICAgIGNhc2UgJzEgaG91cic6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSBHRywgSEgnO1xuICAgICAgICBjYXNlICcxIG1pbnV0ZSc6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSBHRywgSEg6bW0nO1xuICAgICAgICBjYXNlICcxIHNlY29uZCc6XG4gICAgICAgICAgcmV0dXJuICdNTU0gZCwgeSBHRywgSEg6bW06c3MnO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoIChncmFudWxhcml0eSkge1xuICAgICAgICBjYXNlICcxIHllYXInOlxuICAgICAgICAgIHJldHVybiAneSc7XG4gICAgICAgIGNhc2UgJzEgbW9udGgnOlxuICAgICAgICAgIHJldHVybiAnTU1NLCB5JztcbiAgICAgICAgY2FzZSAnMSBkYXknOlxuICAgICAgICAgIHJldHVybiAnTU1NIGQsIHknO1xuICAgICAgICBjYXNlICcxIGhvdXInOlxuICAgICAgICAgIHJldHVybiAnTU1NIGQsIHksIEhIJztcbiAgICAgICAgY2FzZSAnMSBtaW51dGUnOlxuICAgICAgICAgIHJldHVybiAnTU1NIGQsIHksIEhIOm1tJztcbiAgICAgICAgY2FzZSAnMSBzZWNvbmQnOlxuICAgICAgICAgIHJldHVybiAnTU1NIGQsIHksIEhIOm1tOnNzJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGRpc3BsYXkgbGFiZWwgb2YgdGhlIGN1cnJlbnQgVGltZVByaW1pdGl2ZS5cbiAgICovXG4gIGdldFNob3J0ZXNEYXRlRm9ybWF0U3RyaW5nKCk6IHN0cmluZyB7XG5cbiAgICByZXR1cm4gdGhpcy5nZXREYXRlRm9ybWF0U3RyaW5nKHRoaXMuZHVyYXRpb24pO1xuICB9XG5cblxuICAvKipcbiAgICogR2V0IHRoZSBqdWxpYW4gZGF5IGluIHNlY29uZHNcbiAgICogVE9ETzogaW50ZWdyYXRlIHRpbWVcbiAgKi9cbiAgZ2V0SnVsaWFuU2Vjb25kKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuanVsaWFuRGF5ICogNjAgKiA2MCAqIDI0O1xuICB9XG5cblxuICAvKipcbiAgICogR2V0IHRoZSBsYXN0IHNlY29uZCBvZiB0aGlzIFRpbWVQcmltaXRpdmUuIFRoaXMgZGVwZW5kcyBvbiB0aGUgY2FsZW5kYXIsXG4gICAqIHNpbmNlIHRoZSBtb250aCBmZWJydWFyeSBhbmQgbGVhcCB5ZWFycyBkaWZmZXIgZnJvbSBvbmUgY2FsZW5kYXIgdG8gdGhlIG90aGVyXG4gICAqXG4gICAqL1xuICBnZXRMYXN0U2Vjb25kKGNhbGVuZGFyOiBDYWxlbmRhclR5cGUgPSB0aGlzLmNhbGVuZGFyKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgY29uc3QgZHQgPSB0aGlzLmdldERhdGVUaW1lKClcbiAgICByZXR1cm4gZHQuZ2V0RW5kT2YodGhpcy5kdXJhdGlvbikuZ2V0SnVsaWFuU2Vjb25kKCk7XG4gIH1cblxufVxuIl19