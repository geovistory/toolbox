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
export function InfTimePrimitiveWithCalendar() { }
if (false) {
    /** @type {?} */
    InfTimePrimitiveWithCalendar.prototype.calendar;
}
/**
 * @record
 */
export function TimeSpanWithNumberProps() { }
if (false) {
    /* Skipping unnamed member:
    72?: InfTimePrimitiveWithCalendar;*/
    /* Skipping unnamed member:
    152?: InfTimePrimitiveWithCalendar;*/
    /* Skipping unnamed member:
    153?: InfTimePrimitiveWithCalendar;*/
    /* Skipping unnamed member:
    71?: InfTimePrimitiveWithCalendar;*/
    /* Skipping unnamed member:
    150?: InfTimePrimitiveWithCalendar;*/
    /* Skipping unnamed member:
    151?: InfTimePrimitiveWithCalendar;*/
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zcGFuLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi11dGlscy8iLCJzb3VyY2VzIjpbImxpYi90aW1lLXNwYW4vdGltZS1zcGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFnQixhQUFhLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7QUFDcEYsTUFBTSxPQUFPLENBQUMsR0FBa0IsU0FBUzs7OztBQUN6QyxrREFFQzs7O0lBREMsZ0RBQXNCOzs7OztBQUV4Qiw2Q0FRQzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0QsTUFBTSxPQUFPLFFBQVE7Ozs7SUF3RW5CLFlBQVksSUFBK0I7UUF0RWxDLFdBQU0sR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7UUF1RTlELElBQUksSUFBSSxFQUFFO1lBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPOzs7O1lBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLENBQUM7WUFDbEYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7O1lBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUQsQ0FBQyxFQUFDLENBQUE7U0FDSDtJQUNILENBQUM7Ozs7O0lBcEVELElBQUksV0FBVztRQUViLElBQUksSUFBSSxDQUFDLE9BQU8sRUFB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LElBQUk7WUFBRSxPQUFPLElBQUksQ0FBQTs7WUFDcEYsT0FBTyxLQUFLLENBQUE7SUFDbkIsQ0FBQzs7Ozs7Ozs7O0lBV0Qsc0JBQXNCO1FBQ3BCLE9BQU8sUUFBUSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUM7SUFDaEYsQ0FBQzs7OztJQUtELHdCQUF3Qjs7Y0FDaEIsS0FBSyxHQUFHLEVBQUU7UUFFaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUU7WUFDeEIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2IsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN2QjtRQUNILENBQUMsRUFBQyxDQUFBO1FBRUYsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7O0lBRUQsdUJBQXVCOztjQUNmLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHOztjQUM3QixLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSTs7Y0FDOUIsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUk7UUFDbEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDaEMsQ0FBQztDQUVGOzs7SUFsSUMsMEJBQWdFOztJQUVoRSx1QkFBb0I7O0lBQ3BCLHVCQUFvQjs7SUFDcEIsd0JBQXFCOztJQUNyQix3QkFBcUI7O0lBQ3JCLHdCQUFxQjs7SUFDckIsd0JBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5mVGltZVByaW1pdGl2ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBXYXJFbnRpdHlQcmV2aWV3VGltZVNwYW4gfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJUeXBlLCBUaW1lUHJpbWl0aXZlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscy9zcmMvbGliL2RhdGUtdGltZSc7XG5leHBvcnQgY29uc3QgeDogVGltZVByaW1pdGl2ZSA9IHVuZGVmaW5lZFxuZXhwb3J0IGludGVyZmFjZSBJbmZUaW1lUHJpbWl0aXZlV2l0aENhbGVuZGFyIGV4dGVuZHMgSW5mVGltZVByaW1pdGl2ZSB7XG4gIGNhbGVuZGFyOiBDYWxlbmRhclR5cGVcbn1cbmV4cG9ydCBpbnRlcmZhY2UgVGltZVNwYW5XaXRoTnVtYmVyUHJvcHMge1xuICAvLyBrZXkgaXMgdGhlIGRmaF9wa19wcm9wZXJ0eSwgZXhwcmVzc2luZyB3aGF0IHRoZSB0aW1lIHByaW1pdGl2ZSBtZWFucyBmb3IgdGhlIHRpbWUgc3BhblxuICA3Mj86IEluZlRpbWVQcmltaXRpdmVXaXRoQ2FsZW5kYXI7IC8vIHA4MiB8IEF0IHNvbWUgdGltZSB3aXRoaW4gfCBvdXRlciBib3VuZHMgfCBub3QgYmVmb3JlIOKAkyBub3QgYWZ0ZXJcbiAgMTUyPzogSW5mVGltZVByaW1pdGl2ZVdpdGhDYWxlbmRhcjsgLy8gcDgyYSB8IGJlZ2luIG9mIHRoZSBiZWdpbiB8IGxlZnQgb3V0ZXIgYm91bmQgfCBub3QgYmVmb3JlXG4gIDE1Mz86IEluZlRpbWVQcmltaXRpdmVXaXRoQ2FsZW5kYXI7IC8vIHA4MmIgfCBlbmQgb2YgdGhlIGVuZCB8wqByaWdodCBvdXRlciBib3VuZCB8wqBub3QgYWZ0ZXJcbiAgNzE/OiBJbmZUaW1lUHJpbWl0aXZlV2l0aENhbGVuZGFyOyAvLyBwODEgfCBPbmdvaW5nIHRocm91Z2hvdXQgfCBpbm5lciBib3VuZHMgfCBzdXJlbHkgZnJvbSDigJMgc3VyZWx5IHRvXG4gIDE1MD86IEluZlRpbWVQcmltaXRpdmVXaXRoQ2FsZW5kYXI7IC8vIHA4MWEgfCBlbmQgb2YgdGhlIGJlZ2luIHwgbGVmdCBpbm5lciBib3VuZCB8IHN1cmVseSBmcm9tXG4gIDE1MT86IEluZlRpbWVQcmltaXRpdmVXaXRoQ2FsZW5kYXI7IC8vIHA4MWIgfCBiZWdpbiBvZiB0aGUgZW5kIHwgcmlnaHQgaW5uZXIgYm91bmQgfCBzdXJlbHkgdG9cbn1cbmV4cG9ydCBjbGFzcyBUaW1lU3BhbiB7XG5cbiAgcmVhZG9ubHkgdHBLZXlzID0gWydwODInLCAncDgxJywgJ3A4MmEnLCAncDgyYicsICdwODFhJywgJ3A4MWInXVxuXG4gIHA4Mj86IFRpbWVQcmltaXRpdmU7IC8vIEF0IHNvbWUgdGltZSB3aXRoaW4gfCBvdXRlciBib3VuZHMgfCBub3QgYmVmb3JlIOKAkyBub3QgYWZ0ZXJcbiAgcDgxPzogVGltZVByaW1pdGl2ZTsgLy8gT25nb2luZyB0aHJvdWdob3V0IHwgaW5uZXIgYm91bmRzIHwgc3VyZWx5IGZyb20g4oCTIHN1cmVseSB0b1xuICBwODJhPzogVGltZVByaW1pdGl2ZTsgLy8gYmVnaW4gb2YgdGhlIGJlZ2luIHwgbGVmdCBvdXRlciBib3VuZCB8IG5vdCBiZWZvcmVcbiAgcDgxYT86IFRpbWVQcmltaXRpdmU7IC8vIGVuZCBvZiB0aGUgYmVnaW4gfCBsZWZ0IGlubmVyIGJvdW5kIHwgc3VyZWx5IGZyb21cbiAgcDgxYj86IFRpbWVQcmltaXRpdmU7IC8vIGJlZ2luIG9mIHRoZSBlbmQgfCByaWdodCBpbm5lciBib3VuZCB8IHN1cmVseSB0b1xuICBwODJiPzogVGltZVByaW1pdGl2ZTsgLy8gZW5kIG9mIHRoZSBlbmQgfMKgcmlnaHQgb3V0ZXIgYm91bmQgfMKgbm90IGFmdGVyXG5cblxuICBnZXQgZWFybGllc3REYXkoKSB7XG5cbiAgICBpZiAodGhpcy5pc0VtcHR5KCkpIHJldHVybiBudWxsO1xuXG4gICAgbGV0IG1pbiA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcblxuICAgIHRoaXMudHBLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICh0aGlzW2tleV0pIHtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IHRoaXNba2V5XS5qdWxpYW5EYXk7XG4gICAgICAgIC8vIGlmIHRoaXMgdGltZVByaW1pdGl2ZSBpcyBlYXJsaWVyIHRoYW4gbWluLCBzZXQgdGhpcyBhcyBuZXcgbWluXG4gICAgICAgIG1pbiA9IGN1cnJlbnQgPCBtaW4gPyBjdXJyZW50IDogbWluO1xuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gbWluO1xuICB9XG5cbiAgLyoqXG4gICogZ2V0IHRoZSBlYXJsaWVzdCBhbmQgbGF0ZXN0IFRpbWVQcmltaXRpdmUgb2YgZ2l2ZW4gYXJyYXkgb2YgVGltZVByaW1pdGl2ZXNcbiAgKlxuICAqIEZvciBlYXJsaWVzdCBpdCBjb21wYXJlcyB0aGUgYmVnaW4gb2YgVGltZVByaW1pdGl2ZSBkdXJhdGlvblxuICAqIEZvciBsYXRlc3QgaXQgY29tcGFyZXMgdGhlIGxhc3Qgc2Vjb25kIG9mIFRpbWVQcmltaXRpdmUgZHVyYXRpb25cbiAgKlxuICAqIEByZXR1cm5zIG9iamVjdCB3aXRoIG1pbiBEYXRlIGFuZCBtYXggRGF0ZSBvciBudWxsLCBpZiBubyBUaW1lUHJpbWl0aXZlIGF2YWlsYWJsZVxuICAqL1xuICBzdGF0aWMgZ2V0TWluTWF4VGltZVByaW1pdHZlT2ZBcnJheSh0cHM6IFRpbWVQcmltaXRpdmVbXSkge1xuXG4gICAgaWYgKCF0cHMgfHwgdHBzLmxlbmd0aCA8IDEpIHJldHVybiBudWxsO1xuXG4gICAgbGV0IG1pbiA9IHRwc1swXTtcbiAgICBsZXQgbWF4ID0gdHBzWzBdO1xuXG4gICAgdHBzLmZvckVhY2godHAgPT4ge1xuXG4gICAgICAvLyBpZiB0aGlzIHRpbWVQcmltaXRpdmUgaXMgZWFybGllciB0aGFuIG1pbiwgc2V0IHRoaXMgYXMgbmV3IG1pblxuICAgICAgbWluID0gdHAuZ2V0SnVsaWFuU2Vjb25kKCkgPCBtaW4uZ2V0SnVsaWFuU2Vjb25kKCkgPyB0cCA6IG1pbjtcblxuICAgICAgLy8gaWYgdGhpcyB0aW1lUHJpbWl0aXZlIGlzIGxhdGVyIHRoYW4gbWF4LCBzZXQgdGhpcyBhcyBuZXcgbWF4XG4gICAgICBtYXggPSB0cC5nZXRKdWxpYW5TZWNvbmQoKSA+IG1heC5nZXRKdWxpYW5TZWNvbmQoKSA/IHRwIDogbWF4O1xuICAgICAgLy8gIGNoZWNrIGlmIHdlIHdvdWxkIG5lZWQgdGhlIGxhdGVzdCBzZWNvbmQgaGVyZT9cbiAgICAgIC8vIG1heCA9IHRwLmdldExhc3RTZWNvbmQoKSA+IG1heC5nZXRMYXN0U2Vjb25kKCkgPyB0cCA6IG1heDtcblxuXG4gICAgfSlcblxuICAgIHJldHVybiB7IG1pbjogbWluLCBtYXg6IG1heCB9O1xuICB9XG5cbiAgc3RhdGljIGZyb21UaW1lU3BhbkRpYWxvZ0RhdGEoZDogVGltZVNwYW5XaXRoTnVtYmVyUHJvcHMgPSB7fSk6IFRpbWVTcGFuIHtcbiAgICBpZiAoIWQpIGQgPSB7fTtcbiAgICBjb25zdCB4ID0ge31cbiAgICBpZiAoZFsnNzInXSkgeFsncDgyJ10gPSBkWyc3MiddO1xuICAgIGlmIChkWyc3MSddKSB4WydwODEnXSA9IGRbJzcxJ107XG4gICAgaWYgKGRbJzE1MiddKSB4WydwODJhJ10gPSBkWycxNTInXTtcbiAgICBpZiAoZFsnMTUwJ10pIHhbJ3A4MWEnXSA9IGRbJzE1MCddO1xuICAgIGlmIChkWycxNTEnXSkgeFsncDgxYiddID0gZFsnMTUxJ107XG4gICAgaWYgKGRbJzE1MyddKSB4WydwODJiJ10gPSBkWycxNTMnXTtcbiAgICByZXR1cm4gbmV3IFRpbWVTcGFuKHgpXG4gIH1cblxuICBjb25zdHJ1Y3RvcihkYXRhPzogV2FyRW50aXR5UHJldmlld1RpbWVTcGFuKSB7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goa2V5ID0+IGRhdGFba2V5XSA9PT0gdW5kZWZpbmVkID8gZGVsZXRlIGRhdGFba2V5XSA6ICcnKTtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gICAgICB0aGlzLnRwS2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmICh0aGlzW2tleV0pIHRoaXNba2V5XSA9IG5ldyBUaW1lUHJpbWl0aXZlKHRoaXNba2V5XSk7XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIHJldHVybnMgdHJ1ZSBpZiBubyBUaW1lUHJpbWl0aXZlIGlzIHRoZXJlXG4gICAqL1xuICBpc0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pc05vdEVtcHR5KClcbiAgfVxuICAvKipcbiAgICogcmV0dXJucyB0cnVlIGlmIGF0IGxlYXN0IG9uZSBUaW1lUHJpbWl0aXZlIGlzIHRoZXJlXG4gICAqL1xuICBpc05vdEVtcHR5KCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnA4MiB8fCB0aGlzLnA4MSB8fCB0aGlzLnA4MmEgfHwgdGhpcy5wODJiIHx8IHRoaXMucDgxYSB8fCB0aGlzLnA4MWIpIHJldHVybiB0cnVlXG4gICAgZWxzZSByZXR1cm4gZmFsc2VcbiAgfVxuXG5cbiAgLyoqXG4gICogZ2V0IHRoZSBlYXJsaWVzdCBhbmQgbGF0ZXN0IFRpbWVQcmltaXRpdmUgb2YgdGhpcyBUaW1lU3BhblxuICAqXG4gICogRm9yIGVhcmxpZXN0IGl0IGNvbXBhcmVzIHRoZSBiZWdpbiBvZiBUaW1lUHJpbWl0aXZlIGR1cmF0aW9uXG4gICogRm9yIGxhdGVzdCBpdCBjb21wYXJlcyB0aGUgbGFzdCBzZWNvbmQgb2YgVGltZVByaW1pdGl2ZSBkdXJhdGlvblxuICAqXG4gICogQHJldHVybnMgb2JqZWN0IHdpdGggbWluIERhdGUgYW5kIG1heCBEYXRlIG9yIG51bGwsIGlmIG5vIFRpbWVQcmltaXRpdmUgYXZhaWxhYmxlXG4gICovXG4gIGdldE1pbk1heFRpbWVQcmltaXRpdmUoKTogeyBtaW46IFRpbWVQcmltaXRpdmUsIG1heDogVGltZVByaW1pdGl2ZSB9IHwgbnVsbCB7XG4gICAgcmV0dXJuIFRpbWVTcGFuLmdldE1pbk1heFRpbWVQcmltaXR2ZU9mQXJyYXkodGhpcy5nZXRBcnJheU9mVGltZVByaW1pdGl2ZXMoKSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMgYXJyYXkgb2YgVGltZVByaW1pdGl2ZXMgb2YgdGhpcyBUaW1lU3BhblxuICAgKi9cbiAgZ2V0QXJyYXlPZlRpbWVQcmltaXRpdmVzKCk6IFRpbWVQcmltaXRpdmVbXSB7XG4gICAgY29uc3QgYXJyYXkgPSBbXTtcblxuICAgIHRoaXMudHBLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICh0aGlzW2tleV0pIHtcbiAgICAgICAgYXJyYXkucHVzaCh0aGlzW2tleV0pO1xuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cblxuICBnZXRQcmltaXRpdmVzRm9yUHJldmlldygpOiB7IHNpbmdsZT86IFRpbWVQcmltaXRpdmUsIGJlZ2luPzogVGltZVByaW1pdGl2ZSwgZW5kPzogVGltZVByaW1pdGl2ZSB9IHtcbiAgICBjb25zdCBzaW5nbGUgPSB0aGlzLnA4MiB8fCB0aGlzLnA4MTtcbiAgICBjb25zdCBiZWdpbiA9IHRoaXMucDgyYSB8fCB0aGlzLnA4MWE7XG4gICAgY29uc3QgZW5kID0gdGhpcy5wODJiIHx8IHRoaXMucDgxYjtcbiAgICByZXR1cm4geyBzaW5nbGUsIGJlZ2luLCBlbmQgfTtcbiAgfVxuXG59XG4iXX0=