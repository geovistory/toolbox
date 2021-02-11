/**
 * @fileoverview added by tsickle
 * Generated from: time-span.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zcGFuLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi11dGlscy9zcmMvbGliL3RpbWUtc3Bhbi8iLCJzb3VyY2VzIjpbInRpbWUtc3Bhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7QUFFdEUsTUFBTSxPQUFPLENBQUMsR0FBa0IsU0FBUzs7OztBQUV6Qyw2Q0FRQzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0QsTUFBTSxPQUFPLFFBQVE7Ozs7SUF3RW5CLFlBQVksSUFBK0I7UUF0RWxDLFdBQU0sR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7UUF1RTlELElBQUksSUFBSSxFQUFFO1lBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPOzs7O1lBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLENBQUM7WUFDbEYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7O1lBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUQsQ0FBQyxFQUFDLENBQUE7U0FDSDtJQUNILENBQUM7Ozs7O0lBcEVELElBQUksV0FBVztRQUViLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDOztZQUU1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WUFDcEYsT0FBTyxLQUFLLENBQUE7SUFDbkIsQ0FBQzs7Ozs7Ozs7O0lBV0Qsc0JBQXNCO1FBQ3BCLE9BQU8sUUFBUSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUM7SUFDaEYsQ0FBQzs7OztJQUtELHdCQUF3Qjs7Y0FDaEIsS0FBSyxHQUFHLEVBQUU7UUFFaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUU7WUFDeEIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2IsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN2QjtRQUNILENBQUMsRUFBQyxDQUFBO1FBRUYsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7O0lBRUQsdUJBQXVCOztjQUNmLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHOztjQUM3QixLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSTs7Y0FDOUIsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUk7UUFDbEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDaEMsQ0FBQztDQUVGOzs7SUFsSUMsMEJBQWdFOztJQUVoRSx1QkFBb0I7O0lBQ3BCLHVCQUFvQjs7SUFDcEIsd0JBQXFCOztJQUNyQix3QkFBcUI7O0lBQ3JCLHdCQUFxQjs7SUFDckIsd0JBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGltZVByaW1pdGl2ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMvc3JjL2xpYi9kYXRlLXRpbWUnO1xuaW1wb3J0IHsgV2FyRW50aXR5UHJldmlld1RpbWVTcGFuLCBUaW1lUHJpbWl0aXZlV2l0aENhbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5leHBvcnQgY29uc3QgeDogVGltZVByaW1pdGl2ZSA9IHVuZGVmaW5lZFxuXG5leHBvcnQgaW50ZXJmYWNlIFRpbWVTcGFuV2l0aE51bWJlclByb3BzIHtcbiAgLy8ga2V5IGlzIHRoZSBkZmhfcGtfcHJvcGVydHksIGV4cHJlc3Npbmcgd2hhdCB0aGUgdGltZSBwcmltaXRpdmUgbWVhbnMgZm9yIHRoZSB0aW1lIHNwYW5cbiAgNzI/OiBUaW1lUHJpbWl0aXZlV2l0aENhbDsgLy8gcDgyIHwgQXQgc29tZSB0aW1lIHdpdGhpbiB8IG91dGVyIGJvdW5kcyB8IG5vdCBiZWZvcmUg4oCTIG5vdCBhZnRlclxuICAxNTI/OiBUaW1lUHJpbWl0aXZlV2l0aENhbDsgLy8gcDgyYSB8IGJlZ2luIG9mIHRoZSBiZWdpbiB8IGxlZnQgb3V0ZXIgYm91bmQgfCBub3QgYmVmb3JlXG4gIDE1Mz86IFRpbWVQcmltaXRpdmVXaXRoQ2FsOyAvLyBwODJiIHwgZW5kIG9mIHRoZSBlbmQgfMKgcmlnaHQgb3V0ZXIgYm91bmQgfMKgbm90IGFmdGVyXG4gIDcxPzogVGltZVByaW1pdGl2ZVdpdGhDYWw7IC8vIHA4MSB8IE9uZ29pbmcgdGhyb3VnaG91dCB8IGlubmVyIGJvdW5kcyB8IHN1cmVseSBmcm9tIOKAkyBzdXJlbHkgdG9cbiAgMTUwPzogVGltZVByaW1pdGl2ZVdpdGhDYWw7IC8vIHA4MWEgfCBlbmQgb2YgdGhlIGJlZ2luIHwgbGVmdCBpbm5lciBib3VuZCB8IHN1cmVseSBmcm9tXG4gIDE1MT86IFRpbWVQcmltaXRpdmVXaXRoQ2FsOyAvLyBwODFiIHwgYmVnaW4gb2YgdGhlIGVuZCB8IHJpZ2h0IGlubmVyIGJvdW5kIHwgc3VyZWx5IHRvXG59XG5leHBvcnQgY2xhc3MgVGltZVNwYW4ge1xuXG4gIHJlYWRvbmx5IHRwS2V5cyA9IFsncDgyJywgJ3A4MScsICdwODJhJywgJ3A4MmInLCAncDgxYScsICdwODFiJ11cblxuICBwODI/OiBUaW1lUHJpbWl0aXZlOyAvLyBBdCBzb21lIHRpbWUgd2l0aGluIHwgb3V0ZXIgYm91bmRzIHwgbm90IGJlZm9yZSDigJMgbm90IGFmdGVyXG4gIHA4MT86IFRpbWVQcmltaXRpdmU7IC8vIE9uZ29pbmcgdGhyb3VnaG91dCB8IGlubmVyIGJvdW5kcyB8IHN1cmVseSBmcm9tIOKAkyBzdXJlbHkgdG9cbiAgcDgyYT86IFRpbWVQcmltaXRpdmU7IC8vIGJlZ2luIG9mIHRoZSBiZWdpbiB8IGxlZnQgb3V0ZXIgYm91bmQgfCBub3QgYmVmb3JlXG4gIHA4MWE/OiBUaW1lUHJpbWl0aXZlOyAvLyBlbmQgb2YgdGhlIGJlZ2luIHwgbGVmdCBpbm5lciBib3VuZCB8IHN1cmVseSBmcm9tXG4gIHA4MWI/OiBUaW1lUHJpbWl0aXZlOyAvLyBiZWdpbiBvZiB0aGUgZW5kIHwgcmlnaHQgaW5uZXIgYm91bmQgfCBzdXJlbHkgdG9cbiAgcDgyYj86IFRpbWVQcmltaXRpdmU7IC8vIGVuZCBvZiB0aGUgZW5kIHzCoHJpZ2h0IG91dGVyIGJvdW5kIHzCoG5vdCBhZnRlclxuXG5cbiAgZ2V0IGVhcmxpZXN0RGF5KCkge1xuXG4gICAgaWYgKHRoaXMuaXNFbXB0eSgpKSByZXR1cm4gbnVsbDtcblxuICAgIGxldCBtaW4gPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG5cbiAgICB0aGlzLnRwS2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAodGhpc1trZXldKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzW2tleV0uanVsaWFuRGF5O1xuICAgICAgICAvLyBpZiB0aGlzIHRpbWVQcmltaXRpdmUgaXMgZWFybGllciB0aGFuIG1pbiwgc2V0IHRoaXMgYXMgbmV3IG1pblxuICAgICAgICBtaW4gPSBjdXJyZW50IDwgbWluID8gY3VycmVudCA6IG1pbjtcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIG1pbjtcbiAgfVxuXG4gIC8qKlxuICAqIGdldCB0aGUgZWFybGllc3QgYW5kIGxhdGVzdCBUaW1lUHJpbWl0aXZlIG9mIGdpdmVuIGFycmF5IG9mIFRpbWVQcmltaXRpdmVzXG4gICpcbiAgKiBGb3IgZWFybGllc3QgaXQgY29tcGFyZXMgdGhlIGJlZ2luIG9mIFRpbWVQcmltaXRpdmUgZHVyYXRpb25cbiAgKiBGb3IgbGF0ZXN0IGl0IGNvbXBhcmVzIHRoZSBsYXN0IHNlY29uZCBvZiBUaW1lUHJpbWl0aXZlIGR1cmF0aW9uXG4gICpcbiAgKiBAcmV0dXJucyBvYmplY3Qgd2l0aCBtaW4gRGF0ZSBhbmQgbWF4IERhdGUgb3IgbnVsbCwgaWYgbm8gVGltZVByaW1pdGl2ZSBhdmFpbGFibGVcbiAgKi9cbiAgc3RhdGljIGdldE1pbk1heFRpbWVQcmltaXR2ZU9mQXJyYXkodHBzOiBUaW1lUHJpbWl0aXZlW10pIHtcblxuICAgIGlmICghdHBzIHx8IHRwcy5sZW5ndGggPCAxKSByZXR1cm4gbnVsbDtcblxuICAgIGxldCBtaW4gPSB0cHNbMF07XG4gICAgbGV0IG1heCA9IHRwc1swXTtcblxuICAgIHRwcy5mb3JFYWNoKHRwID0+IHtcblxuICAgICAgLy8gaWYgdGhpcyB0aW1lUHJpbWl0aXZlIGlzIGVhcmxpZXIgdGhhbiBtaW4sIHNldCB0aGlzIGFzIG5ldyBtaW5cbiAgICAgIG1pbiA9IHRwLmdldEp1bGlhblNlY29uZCgpIDwgbWluLmdldEp1bGlhblNlY29uZCgpID8gdHAgOiBtaW47XG5cbiAgICAgIC8vIGlmIHRoaXMgdGltZVByaW1pdGl2ZSBpcyBsYXRlciB0aGFuIG1heCwgc2V0IHRoaXMgYXMgbmV3IG1heFxuICAgICAgbWF4ID0gdHAuZ2V0SnVsaWFuU2Vjb25kKCkgPiBtYXguZ2V0SnVsaWFuU2Vjb25kKCkgPyB0cCA6IG1heDtcbiAgICAgIC8vICBjaGVjayBpZiB3ZSB3b3VsZCBuZWVkIHRoZSBsYXRlc3Qgc2Vjb25kIGhlcmU/XG4gICAgICAvLyBtYXggPSB0cC5nZXRMYXN0U2Vjb25kKCkgPiBtYXguZ2V0TGFzdFNlY29uZCgpID8gdHAgOiBtYXg7XG5cblxuICAgIH0pXG5cbiAgICByZXR1cm4geyBtaW46IG1pbiwgbWF4OiBtYXggfTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tVGltZVNwYW5EaWFsb2dEYXRhKGQ6IFRpbWVTcGFuV2l0aE51bWJlclByb3BzID0ge30pOiBUaW1lU3BhbiB7XG4gICAgaWYgKCFkKSBkID0ge307XG4gICAgY29uc3QgeCA9IHt9XG4gICAgaWYgKGRbJzcyJ10pIHhbJ3A4MiddID0gZFsnNzInXTtcbiAgICBpZiAoZFsnNzEnXSkgeFsncDgxJ10gPSBkWyc3MSddO1xuICAgIGlmIChkWycxNTInXSkgeFsncDgyYSddID0gZFsnMTUyJ107XG4gICAgaWYgKGRbJzE1MCddKSB4WydwODFhJ10gPSBkWycxNTAnXTtcbiAgICBpZiAoZFsnMTUxJ10pIHhbJ3A4MWInXSA9IGRbJzE1MSddO1xuICAgIGlmIChkWycxNTMnXSkgeFsncDgyYiddID0gZFsnMTUzJ107XG4gICAgcmV0dXJuIG5ldyBUaW1lU3Bhbih4KVxuICB9XG5cbiAgY29uc3RydWN0b3IoZGF0YT86IFdhckVudGl0eVByZXZpZXdUaW1lU3Bhbikge1xuICAgIGlmIChkYXRhKSB7XG4gICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKGtleSA9PiBkYXRhW2tleV0gPT09IHVuZGVmaW5lZCA/IGRlbGV0ZSBkYXRhW2tleV0gOiAnJyk7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICAgICAgdGhpcy50cEtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAodGhpc1trZXldKSB0aGlzW2tleV0gPSBuZXcgVGltZVByaW1pdGl2ZSh0aGlzW2tleV0pO1xuICAgICAgfSlcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiByZXR1cm5zIHRydWUgaWYgbm8gVGltZVByaW1pdGl2ZSBpcyB0aGVyZVxuICAgKi9cbiAgaXNFbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaXNOb3RFbXB0eSgpXG4gIH1cbiAgLyoqXG4gICAqIHJldHVybnMgdHJ1ZSBpZiBhdCBsZWFzdCBvbmUgVGltZVByaW1pdGl2ZSBpcyB0aGVyZVxuICAgKi9cbiAgaXNOb3RFbXB0eSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5wODIgfHwgdGhpcy5wODEgfHwgdGhpcy5wODJhIHx8IHRoaXMucDgyYiB8fCB0aGlzLnA4MWEgfHwgdGhpcy5wODFiKSByZXR1cm4gdHJ1ZVxuICAgIGVsc2UgcmV0dXJuIGZhbHNlXG4gIH1cblxuXG4gIC8qKlxuICAqIGdldCB0aGUgZWFybGllc3QgYW5kIGxhdGVzdCBUaW1lUHJpbWl0aXZlIG9mIHRoaXMgVGltZVNwYW5cbiAgKlxuICAqIEZvciBlYXJsaWVzdCBpdCBjb21wYXJlcyB0aGUgYmVnaW4gb2YgVGltZVByaW1pdGl2ZSBkdXJhdGlvblxuICAqIEZvciBsYXRlc3QgaXQgY29tcGFyZXMgdGhlIGxhc3Qgc2Vjb25kIG9mIFRpbWVQcmltaXRpdmUgZHVyYXRpb25cbiAgKlxuICAqIEByZXR1cm5zIG9iamVjdCB3aXRoIG1pbiBEYXRlIGFuZCBtYXggRGF0ZSBvciBudWxsLCBpZiBubyBUaW1lUHJpbWl0aXZlIGF2YWlsYWJsZVxuICAqL1xuICBnZXRNaW5NYXhUaW1lUHJpbWl0aXZlKCk6IHsgbWluOiBUaW1lUHJpbWl0aXZlLCBtYXg6IFRpbWVQcmltaXRpdmUgfSB8IG51bGwge1xuICAgIHJldHVybiBUaW1lU3Bhbi5nZXRNaW5NYXhUaW1lUHJpbWl0dmVPZkFycmF5KHRoaXMuZ2V0QXJyYXlPZlRpbWVQcmltaXRpdmVzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIGFycmF5IG9mIFRpbWVQcmltaXRpdmVzIG9mIHRoaXMgVGltZVNwYW5cbiAgICovXG4gIGdldEFycmF5T2ZUaW1lUHJpbWl0aXZlcygpOiBUaW1lUHJpbWl0aXZlW10ge1xuICAgIGNvbnN0IGFycmF5ID0gW107XG5cbiAgICB0aGlzLnRwS2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAodGhpc1trZXldKSB7XG4gICAgICAgIGFycmF5LnB1c2godGhpc1trZXldKTtcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIGFycmF5O1xuICB9XG5cbiAgZ2V0UHJpbWl0aXZlc0ZvclByZXZpZXcoKTogeyBzaW5nbGU/OiBUaW1lUHJpbWl0aXZlLCBiZWdpbj86IFRpbWVQcmltaXRpdmUsIGVuZD86IFRpbWVQcmltaXRpdmUgfSB7XG4gICAgY29uc3Qgc2luZ2xlID0gdGhpcy5wODIgfHwgdGhpcy5wODE7XG4gICAgY29uc3QgYmVnaW4gPSB0aGlzLnA4MmEgfHwgdGhpcy5wODFhO1xuICAgIGNvbnN0IGVuZCA9IHRoaXMucDgyYiB8fCB0aGlzLnA4MWI7XG4gICAgcmV0dXJuIHsgc2luZ2xlLCBiZWdpbiwgZW5kIH07XG4gIH1cblxufVxuIl19