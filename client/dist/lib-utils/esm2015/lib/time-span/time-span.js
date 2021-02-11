/**
 * @fileoverview added by tsickle
 * Generated from: lib/time-span/time-span.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { TimePrimitive } from '@kleiolab/lib-utils/src/lib/date-time';
/** @type {?} */
export const x = undefined;
/**
 * @record
 */
export function TimeSpanWithNumberProps() { }
if (false) {
    /* Skipping unnamed member:
    72?: TimePrimitiveWithCal;*/
    /* Skipping unnamed member:
    152?: TimePrimitiveWithCal;*/
    /* Skipping unnamed member:
    153?: TimePrimitiveWithCal;*/
    /* Skipping unnamed member:
    71?: TimePrimitiveWithCal;*/
    /* Skipping unnamed member:
    150?: TimePrimitiveWithCal;*/
    /* Skipping unnamed member:
    151?: TimePrimitiveWithCal;*/
}
export class TimeSpan {
    /**
     * @param {?=} data
     */
    constructor(data) {
        this.tpKeys = ['p82', 'p81', 'p82a', 'p82b', 'p81a', 'p81b'];
        if (data) {
            Object.keys(data).forEach((/**
             * @param {?} key
             * @return {?}
             */
            key => data[key] === undefined ? delete data[key] : ''));
            Object.assign(this, data);
            this.tpKeys.forEach((/**
             * @param {?} key
             * @return {?}
             */
            key => {
                if (this[key])
                    this[key] = new TimePrimitive(this[key]);
            }));
        }
    }
    // end of the end | right outer bound | not after
    /**
     * @return {?}
     */
    get earliestDay() {
        if (this.isEmpty())
            return null;
        /** @type {?} */
        let min = Number.POSITIVE_INFINITY;
        this.tpKeys.forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            if (this[key]) {
                /** @type {?} */
                const current = this[key].julianDay;
                // if this timePrimitive is earlier than min, set this as new min
                min = current < min ? current : min;
            }
        }));
        return min;
    }
    /**
     * get the earliest and latest TimePrimitive of given array of TimePrimitives
     *
     * For earliest it compares the begin of TimePrimitive duration
     * For latest it compares the last second of TimePrimitive duration
     *
     * @param {?} tps
     * @return {?} object with min Date and max Date or null, if no TimePrimitive available
     */
    static getMinMaxTimePrimitveOfArray(tps) {
        if (!tps || tps.length < 1)
            return null;
        /** @type {?} */
        let min = tps[0];
        /** @type {?} */
        let max = tps[0];
        tps.forEach((/**
         * @param {?} tp
         * @return {?}
         */
        tp => {
            // if this timePrimitive is earlier than min, set this as new min
            min = tp.getJulianSecond() < min.getJulianSecond() ? tp : min;
            // if this timePrimitive is later than max, set this as new max
            max = tp.getJulianSecond() > max.getJulianSecond() ? tp : max;
            //  check if we would need the latest second here?
            // max = tp.getLastSecond() > max.getLastSecond() ? tp : max;
        }));
        return { min: min, max: max };
    }
    /**
     * @param {?=} d
     * @return {?}
     */
    static fromTimeSpanDialogData(d = {}) {
        if (!d)
            d = {};
        /** @type {?} */
        const x = {};
        if (d['72'])
            x['p82'] = d['72'];
        if (d['71'])
            x['p81'] = d['71'];
        if (d['152'])
            x['p82a'] = d['152'];
        if (d['150'])
            x['p81a'] = d['150'];
        if (d['151'])
            x['p81b'] = d['151'];
        if (d['153'])
            x['p82b'] = d['153'];
        return new TimeSpan(x);
    }
    /**
     * returns true if no TimePrimitive is there
     * @return {?}
     */
    isEmpty() {
        return !this.isNotEmpty();
    }
    /**
     * returns true if at least one TimePrimitive is there
     * @return {?}
     */
    isNotEmpty() {
        if (this.p82 || this.p81 || this.p82a || this.p82b || this.p81a || this.p81b)
            return true;
        else
            return false;
    }
    /**
     * get the earliest and latest TimePrimitive of this TimeSpan
     *
     * For earliest it compares the begin of TimePrimitive duration
     * For latest it compares the last second of TimePrimitive duration
     *
     * @return {?} object with min Date and max Date or null, if no TimePrimitive available
     */
    getMinMaxTimePrimitive() {
        return TimeSpan.getMinMaxTimePrimitveOfArray(this.getArrayOfTimePrimitives());
    }
    /**
     * @return {?} array of TimePrimitives of this TimeSpan
     */
    getArrayOfTimePrimitives() {
        /** @type {?} */
        const array = [];
        this.tpKeys.forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            if (this[key]) {
                array.push(this[key]);
            }
        }));
        return array;
    }
    /**
     * @return {?}
     */
    getPrimitivesForPreview() {
        /** @type {?} */
        const single = this.p82 || this.p81;
        /** @type {?} */
        const begin = this.p82a || this.p81a;
        /** @type {?} */
        const end = this.p82b || this.p81b;
        return { single, begin, end };
    }
}
if (false) {
    /** @type {?} */
    TimeSpan.prototype.tpKeys;
    /** @type {?} */
    TimeSpan.prototype.p82;
    /** @type {?} */
    TimeSpan.prototype.p81;
    /** @type {?} */
    TimeSpan.prototype.p82a;
    /** @type {?} */
    TimeSpan.prototype.p81a;
    /** @type {?} */
    TimeSpan.prototype.p81b;
    /** @type {?} */
    TimeSpan.prototype.p82b;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zcGFuLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi11dGlscy8iLCJzb3VyY2VzIjpbImxpYi90aW1lLXNwYW4vdGltZS1zcGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOztBQUV0RSxNQUFNLE9BQU8sQ0FBQyxHQUFrQixTQUFTOzs7O0FBRXpDLDZDQVFDOzs7Ozs7Ozs7Ozs7Ozs7QUFDRCxNQUFNLE9BQU8sUUFBUTs7OztJQXdFbkIsWUFBWSxJQUErQjtRQXRFbEMsV0FBTSxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtRQXVFOUQsSUFBSSxJQUFJLEVBQUU7WUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU87Ozs7WUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQztZQUNsRixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87Ozs7WUFBQyxHQUFHLENBQUMsRUFBRTtnQkFDeEIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMxRCxDQUFDLEVBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQzs7Ozs7SUFwRUQsSUFBSSxXQUFXO1FBRWIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQUUsT0FBTyxJQUFJLENBQUM7O1lBRTVCLEdB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RixPQUFPLEtBQUssQ0FBQTtJQUNuQixDQUFDOzs7Ozs7Ozs7SUFXRCxzQkFBc0I7UUFDcEIsT0FBTyxRQUFRLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUMsQ0FBQztJQUNoRixDQUFDOzs7O0lBS0Qsd0JBQXdCOztjQUNoQixLQUFLLEdBQUcsRUFBRTtRQUVoQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87Ozs7UUFBQyxHQUFHLENBQUMsRUFBRTtZQUN4QixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDYixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3ZCO1FBQ0gsQ0FBQyxFQUFDLENBQUE7UUFFRixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7SUFFRCx1QkFBdUI7O2NBQ2YsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUc7O2NBQzdCLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJOztjQUM5QixHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSTtRQUNsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0NBRUY7OztJQWxJQywwQkFBZ0U7O0lBRWhFLHVCQUFvQjs7SUFDcEIsdUJBQW9COztJQUNwQix3QkFBcUI7O0lBQ3JCLHdCQUFxQjs7SUFDckIsd0JBQXFCOztJQUNyQix3QkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUaW1lUHJpbWl0aXZlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscy9zcmMvbGliL2RhdGUtdGltZSc7XG5pbXBvcnQgeyBXYXJFbnRpdHlQcmV2aWV3VGltZVNwYW4sIFRpbWVQcmltaXRpdmVXaXRoQ2FsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmV4cG9ydCBjb25zdCB4OiBUaW1lUHJpbWl0aXZlID0gdW5kZWZpbmVkXG5cbmV4cG9ydCBpbnRlcmZhY2UgVGltZVNwYW5XaXRoTnVtYmVyUHJvcHMge1xuICAvLyBrZXkgaXMgdGhlIGRmaF9wa19wcm9wZXJ0eSwgZXhwcmVzc2luZyB3aGF0IHRoZSB0aW1lIHByaW1pdGl2ZSBtZWFucyBmb3IgdGhlIHRpbWUgc3BhblxuICA3Mj86IFRpbWVQcmltaXRpdmVXaXRoQ2FsOyAvLyBwODIgfCBBdCBzb21lIHRpbWUgd2l0aGluIHwgb3V0ZXIgYm91bmRzIHwgbm90IGJlZm9yZSDigJMgbm90IGFmdGVyXG4gIDE1Mj86IFRpbWVQcmltaXRpdmVXaXRoQ2FsOyAvLyBwODJhIHwgYmVnaW4gb2YgdGhlIGJlZ2luIHwgbGVmdCBvdXRlciBib3VuZCB8IG5vdCBiZWZvcmVcbiAgMTUzPzogVGltZVByaW1pdGl2ZVdpdGhDYWw7IC8vIHA4MmIgfCBlbmQgb2YgdGhlIGVuZCB8wqByaWdodCBvdXRlciBib3VuZCB8wqBub3QgYWZ0ZXJcbiAgNzE/OiBUaW1lUHJpbWl0aXZlV2l0aENhbDsgLy8gcDgxIHwgT25nb2luZyB0aHJvdWdob3V0IHwgaW5uZXIgYm91bmRzIHwgc3VyZWx5IGZyb20g4oCTIHN1cmVseSB0b1xuICAxNTA/OiBUaW1lUHJpbWl0aXZlV2l0aENhbDsgLy8gcDgxYSB8IGVuZCBvZiB0aGUgYmVnaW4gfCBsZWZ0IGlubmVyIGJvdW5kIHwgc3VyZWx5IGZyb21cbiAgMTUxPzogVGltZVByaW1pdGl2ZVdpdGhDYWw7IC8vIHA4MWIgfCBiZWdpbiBvZiB0aGUgZW5kIHwgcmlnaHQgaW5uZXIgYm91bmQgfCBzdXJlbHkgdG9cbn1cbmV4cG9ydCBjbGFzcyBUaW1lU3BhbiB7XG5cbiAgcmVhZG9ubHkgdHBLZXlzID0gWydwODInLCAncDgxJywgJ3A4MmEnLCAncDgyYicsICdwODFhJywgJ3A4MWInXVxuXG4gIHA4Mj86IFRpbWVQcmltaXRpdmU7IC8vIEF0IHNvbWUgdGltZSB3aXRoaW4gfCBvdXRlciBib3VuZHMgfCBub3QgYmVmb3JlIOKAkyBub3QgYWZ0ZXJcbiAgcDgxPzogVGltZVByaW1pdGl2ZTsgLy8gT25nb2luZyB0aHJvdWdob3V0IHwgaW5uZXIgYm91bmRzIHwgc3VyZWx5IGZyb20g4oCTIHN1cmVseSB0b1xuICBwODJhPzogVGltZVByaW1pdGl2ZTsgLy8gYmVnaW4gb2YgdGhlIGJlZ2luIHwgbGVmdCBvdXRlciBib3VuZCB8IG5vdCBiZWZvcmVcbiAgcDgxYT86IFRpbWVQcmltaXRpdmU7IC8vIGVuZCBvZiB0aGUgYmVnaW4gfCBsZWZ0IGlubmVyIGJvdW5kIHwgc3VyZWx5IGZyb21cbiAgcDgxYj86IFRpbWVQcmltaXRpdmU7IC8vIGJlZ2luIG9mIHRoZSBlbmQgfCByaWdodCBpbm5lciBib3VuZCB8IHN1cmVseSB0b1xuICBwODJiPzogVGltZVByaW1pdGl2ZTsgLy8gZW5kIG9mIHRoZSBlbmQgfMKgcmlnaHQgb3V0ZXIgYm91bmQgfMKgbm90IGFmdGVyXG5cblxuICBnZXQgZWFybGllc3REYXkoKSB7XG5cbiAgICBpZiAodGhpcy5pc0VtcHR5KCkpIHJldHVybiBudWxsO1xuXG4gICAgbGV0IG1pbiA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcblxuICAgIHRoaXMudHBLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICh0aGlzW2tleV0pIHtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IHRoaXNba2V5XS5qdWxpYW5EYXk7XG4gICAgICAgIC8vIGlmIHRoaXMgdGltZVByaW1pdGl2ZSBpcyBlYXJsaWVyIHRoYW4gbWluLCBzZXQgdGhpcyBhcyBuZXcgbWluXG4gICAgICAgIG1pbiA9IGN1cnJlbnQgPCBtaW4gPyBjdXJyZW50IDogbWluO1xuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gbWluO1xuICB9XG5cbiAgLyoqXG4gICogZ2V0IHRoZSBlYXJsaWVzdCBhbmQgbGF0ZXN0IFRpbWVQcmltaXRpdmUgb2YgZ2l2ZW4gYXJyYXkgb2YgVGltZVByaW1pdGl2ZXNcbiAgKlxuICAqIEZvciBlYXJsaWVzdCBpdCBjb21wYXJlcyB0aGUgYmVnaW4gb2YgVGltZVByaW1pdGl2ZSBkdXJhdGlvblxuICAqIEZvciBsYXRlc3QgaXQgY29tcGFyZXMgdGhlIGxhc3Qgc2Vjb25kIG9mIFRpbWVQcmltaXRpdmUgZHVyYXRpb25cbiAgKlxuICAqIEByZXR1cm5zIG9iamVjdCB3aXRoIG1pbiBEYXRlIGFuZCBtYXggRGF0ZSBvciBudWxsLCBpZiBubyBUaW1lUHJpbWl0aXZlIGF2YWlsYWJsZVxuICAqL1xuICBzdGF0aWMgZ2V0TWluTWF4VGltZVByaW1pdHZlT2ZBcnJheSh0cHM6IFRpbWVQcmltaXRpdmVbXSkge1xuXG4gICAgaWYgKCF0cHMgfHwgdHBzLmxlbmd0aCA8IDEpIHJldHVybiBudWxsO1xuXG4gICAgbGV0IG1pbiA9IHRwc1swXTtcbiAgICBsZXQgbWF4ID0gdHBzWzBdO1xuXG4gICAgdHBzLmZvckVhY2godHAgPT4ge1xuXG4gICAgICAvLyBpZiB0aGlzIHRpbWVQcmltaXRpdmUgaXMgZWFybGllciB0aGFuIG1pbiwgc2V0IHRoaXMgYXMgbmV3IG1pblxuICAgICAgbWluID0gdHAuZ2V0SnVsaWFuU2Vjb25kKCkgPCBtaW4uZ2V0SnVsaWFuU2Vjb25kKCkgPyB0cCA6IG1pbjtcblxuICAgICAgLy8gaWYgdGhpcyB0aW1lUHJpbWl0aXZlIGlzIGxhdGVyIHRoYW4gbWF4LCBzZXQgdGhpcyBhcyBuZXcgbWF4XG4gICAgICBtYXggPSB0cC5nZXRKdWxpYW5TZWNvbmQoKSA+IG1heC5nZXRKdWxpYW5TZWNvbmQoKSA/IHRwIDogbWF4O1xuICAgICAgLy8gIGNoZWNrIGlmIHdlIHdvdWxkIG5lZWQgdGhlIGxhdGVzdCBzZWNvbmQgaGVyZT9cbiAgICAgIC8vIG1heCA9IHRwLmdldExhc3RTZWNvbmQoKSA+IG1heC5nZXRMYXN0U2Vjb25kKCkgPyB0cCA6IG1heDtcblxuXG4gICAgfSlcblxuICAgIHJldHVybiB7IG1pbjogbWluLCBtYXg6IG1heCB9O1xuICB9XG5cbiAgc3RhdGljIGZyb21UaW1lU3BhbkRpYWxvZ0RhdGEoZDogVGltZVNwYW5XaXRoTnVtYmVyUHJvcHMgPSB7fSk6IFRpbWVTcGFuIHtcbiAgICBpZiAoIWQpIGQgPSB7fTtcbiAgICBjb25zdCB4ID0ge31cbiAgICBpZiAoZFsnNzInXSkgeFsncDgyJ10gPSBkWyc3MiddO1xuICAgIGlmIChkWyc3MSddKSB4WydwODEnXSA9IGRbJzcxJ107XG4gICAgaWYgKGRbJzE1MiddKSB4WydwODJhJ10gPSBkWycxNTInXTtcbiAgICBpZiAoZFsnMTUwJ10pIHhbJ3A4MWEnXSA9IGRbJzE1MCddO1xuICAgIGlmIChkWycxNTEnXSkgeFsncDgxYiddID0gZFsnMTUxJ107XG4gICAgaWYgKGRbJzE1MyddKSB4WydwODJiJ10gPSBkWycxNTMnXTtcbiAgICByZXR1cm4gbmV3IFRpbWVTcGFuKHgpXG4gIH1cblxuICBjb25zdHJ1Y3RvcihkYXRhPzogV2FyRW50aXR5UHJldmlld1RpbWVTcGFuKSB7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goa2V5ID0+IGRhdGFba2V5XSA9PT0gdW5kZWZpbmVkID8gZGVsZXRlIGRhdGFba2V5XSA6ICcnKTtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gICAgICB0aGlzLnRwS2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmICh0aGlzW2tleV0pIHRoaXNba2V5XSA9IG5ldyBUaW1lUHJpbWl0aXZlKHRoaXNba2V5XSk7XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIHJldHVybnMgdHJ1ZSBpZiBubyBUaW1lUHJpbWl0aXZlIGlzIHRoZXJlXG4gICAqL1xuICBpc0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pc05vdEVtcHR5KClcbiAgfVxuICAvKipcbiAgICogcmV0dXJucyB0cnVlIGlmIGF0IGxlYXN0IG9uZSBUaW1lUHJpbWl0aXZlIGlzIHRoZXJlXG4gICAqL1xuICBpc05vdEVtcHR5KCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnA4MiB8fCB0aGlzLnA4MSB8fCB0aGlzLnA4MmEgfHwgdGhpcy5wODJiIHx8IHRoaXMucDgxYSB8fCB0aGlzLnA4MWIpIHJldHVybiB0cnVlXG4gICAgZWxzZSByZXR1cm4gZmFsc2VcbiAgfVxuXG5cbiAgLyoqXG4gICogZ2V0IHRoZSBlYXJsaWVzdCBhbmQgbGF0ZXN0IFRpbWVQcmltaXRpdmUgb2YgdGhpcyBUaW1lU3BhblxuICAqXG4gICogRm9yIGVhcmxpZXN0IGl0IGNvbXBhcmVzIHRoZSBiZWdpbiBvZiBUaW1lUHJpbWl0aXZlIGR1cmF0aW9uXG4gICogRm9yIGxhdGVzdCBpdCBjb21wYXJlcyB0aGUgbGFzdCBzZWNvbmQgb2YgVGltZVByaW1pdGl2ZSBkdXJhdGlvblxuICAqXG4gICogQHJldHVybnMgb2JqZWN0IHdpdGggbWluIERhdGUgYW5kIG1heCBEYXRlIG9yIG51bGwsIGlmIG5vIFRpbWVQcmltaXRpdmUgYXZhaWxhYmxlXG4gICovXG4gIGdldE1pbk1heFRpbWVQcmltaXRpdmUoKTogeyBtaW46IFRpbWVQcmltaXRpdmUsIG1heDogVGltZVByaW1pdGl2ZSB9IHwgbnVsbCB7XG4gICAgcmV0dXJuIFRpbWVTcGFuLmdldE1pbk1heFRpbWVQcmltaXR2ZU9mQXJyYXkodGhpcy5nZXRBcnJheU9mVGltZVByaW1pdGl2ZXMoKSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMgYXJyYXkgb2YgVGltZVByaW1pdGl2ZXMgb2YgdGhpcyBUaW1lU3BhblxuICAgKi9cbiAgZ2V0QXJyYXlPZlRpbWVQcmltaXRpdmVzKCk6IFRpbWVQcmltaXRpdmVbXSB7XG4gICAgY29uc3QgYXJyYXkgPSBbXTtcblxuICAgIHRoaXMudHBLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICh0aGlzW2tleV0pIHtcbiAgICAgICAgYXJyYXkucHVzaCh0aGlzW2tleV0pO1xuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cblxuICBnZXRQcmltaXRpdmVzRm9yUHJldmlldygpOiB7IHNpbmdsZT86IFRpbWVQcmltaXRpdmUsIGJlZ2luPzogVGltZVByaW1pdGl2ZSwgZW5kPzogVGltZVByaW1pdGl2ZSB9IHtcbiAgICBjb25zdCBzaW5nbGUgPSB0aGlzLnA4MiB8fCB0aGlzLnA4MTtcbiAgICBjb25zdCBiZWdpbiA9IHRoaXMucDgyYSB8fCB0aGlzLnA4MWE7XG4gICAgY29uc3QgZW5kID0gdGhpcy5wODJiIHx8IHRoaXMucDgxYjtcbiAgICByZXR1cm4geyBzaW5nbGUsIGJlZ2luLCBlbmQgfTtcbiAgfVxuXG59XG4iXX0=