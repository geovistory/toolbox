/**
 * @fileoverview added by tsickle
 * Generated from: time-span.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { TimePrimitive } from '@kleiolab/lib-utils/src/lib/date-time';
/** @type {?} */
export var x = undefined;
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
var TimeSpanUtil = /** @class */ (function () {
    function TimeSpanUtil(data) {
        var _this = this;
        this.tpKeys = ['p82', 'p81', 'p82a', 'p82b', 'p81a', 'p81b'];
        if (data) {
            Object.keys(data).forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return data[key] === undefined ? delete data[key] : ''; }));
            Object.assign(this, data);
            this.tpKeys.forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                if (_this[key])
                    _this[key] = new TimePrimitive(_this[key]);
            }));
        }
    }
    Object.defineProperty(TimeSpanUtil.prototype, "earliestDay", {
        get: 
        // end of the end | right outer bound | not after
        /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.isEmpty())
                return null;
            /** @type {?} */
            var min = Number.POSITIVE_INFINITY;
            this.tpKeys.forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                if (_this[key]) {
                    /** @type {?} */
                    var current = _this[key].julianDay;
                    // if this timePrimitive is earlier than min, set this as new min
                    min = current < min ? current : min;
                }
            }));
            return min;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * get the earliest and latest TimePrimitive of given array of TimePrimitives
    *
    * For earliest it compares the begin of TimePrimitive duration
    * For latest it compares the last second of TimePrimitive duration
    *
    * @returns object with min Date and max Date or null, if no TimePrimitive available
    */
    /**
     * get the earliest and latest TimePrimitive of given array of TimePrimitives
     *
     * For earliest it compares the begin of TimePrimitive duration
     * For latest it compares the last second of TimePrimitive duration
     *
     * @param {?} tps
     * @return {?} object with min Date and max Date or null, if no TimePrimitive available
     */
    TimeSpanUtil.getMinMaxTimePrimitveOfArray = /**
     * get the earliest and latest TimePrimitive of given array of TimePrimitives
     *
     * For earliest it compares the begin of TimePrimitive duration
     * For latest it compares the last second of TimePrimitive duration
     *
     * @param {?} tps
     * @return {?} object with min Date and max Date or null, if no TimePrimitive available
     */
    function (tps) {
        if (!tps || tps.length < 1)
            return null;
        /** @type {?} */
        var min = tps[0];
        /** @type {?} */
        var max = tps[0];
        tps.forEach((/**
         * @param {?} tp
         * @return {?}
         */
        function (tp) {
            // if this timePrimitive is earlier than min, set this as new min
            min = tp.getJulianSecond() < min.getJulianSecond() ? tp : min;
            // if this timePrimitive is later than max, set this as new max
            max = tp.getJulianSecond() > max.getJulianSecond() ? tp : max;
            //  check if we would need the latest second here?
            // max = tp.getLastSecond() > max.getLastSecond() ? tp : max;
        }));
        return { min: min, max: max };
    };
    /**
     * @param {?=} d
     * @return {?}
     */
    TimeSpanUtil.fromTimeSpanDialogData = /**
     * @param {?=} d
     * @return {?}
     */
    function (d) {
        if (d === void 0) { d = {}; }
        if (!d)
            d = {};
        /** @type {?} */
        var x = {};
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
        return new TimeSpanUtil(x);
    };
    /**
     * returns true if no TimePrimitive is there
     */
    /**
     * returns true if no TimePrimitive is there
     * @return {?}
     */
    TimeSpanUtil.prototype.isEmpty = /**
     * returns true if no TimePrimitive is there
     * @return {?}
     */
    function () {
        return !this.isNotEmpty();
    };
    /**
     * returns true if at least one TimePrimitive is there
     */
    /**
     * returns true if at least one TimePrimitive is there
     * @return {?}
     */
    TimeSpanUtil.prototype.isNotEmpty = /**
     * returns true if at least one TimePrimitive is there
     * @return {?}
     */
    function () {
        if (this.p82 || this.p81 || this.p82a || this.p82b || this.p81a || this.p81b)
            return true;
        else
            return false;
    };
    /**
    * get the earliest and latest TimePrimitive of this TimeSpan
    *
    * For earliest it compares the begin of TimePrimitive duration
    * For latest it compares the last second of TimePrimitive duration
    *
    * @returns object with min Date and max Date or null, if no TimePrimitive available
    */
    /**
     * get the earliest and latest TimePrimitive of this TimeSpan
     *
     * For earliest it compares the begin of TimePrimitive duration
     * For latest it compares the last second of TimePrimitive duration
     *
     * @return {?} object with min Date and max Date or null, if no TimePrimitive available
     */
    TimeSpanUtil.prototype.getMinMaxTimePrimitive = /**
     * get the earliest and latest TimePrimitive of this TimeSpan
     *
     * For earliest it compares the begin of TimePrimitive duration
     * For latest it compares the last second of TimePrimitive duration
     *
     * @return {?} object with min Date and max Date or null, if no TimePrimitive available
     */
    function () {
        return TimeSpanUtil.getMinMaxTimePrimitveOfArray(this.getArrayOfTimePrimitives());
    };
    /**
     * @returns array of TimePrimitives of this TimeSpan
     */
    /**
     * @return {?} array of TimePrimitives of this TimeSpan
     */
    TimeSpanUtil.prototype.getArrayOfTimePrimitives = /**
     * @return {?} array of TimePrimitives of this TimeSpan
     */
    function () {
        var _this = this;
        /** @type {?} */
        var array = [];
        this.tpKeys.forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            if (_this[key]) {
                array.push(_this[key]);
            }
        }));
        return array;
    };
    /**
     * @return {?}
     */
    TimeSpanUtil.prototype.getPrimitivesForPreview = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var single = this.p82 || this.p81;
        /** @type {?} */
        var begin = this.p82a || this.p81a;
        /** @type {?} */
        var end = this.p82b || this.p81b;
        return { single: single, begin: begin, end: end };
    };
    return TimeSpanUtil;
}());
export { TimeSpanUtil };
if (false) {
    /** @type {?} */
    TimeSpanUtil.prototype.tpKeys;
    /** @type {?} */
    TimeSpanUtil.prototype.p82;
    /** @type {?} */
    TimeSpanUtil.prototype.p81;
    /** @type {?} */
    TimeSpanUtil.prototype.p82a;
    /** @type {?} */
    TimeSpanUtil.prototype.p81a;
    /** @type {?} */
    TimeSpanUtil.prototype.p81b;
    /** @type {?} */
    TimeSpanUtil.prototype.p82b;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zcGFuLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi11dGlscy9zcmMvbGliL3RpbWUtc3Bhbi8iLCJzb3VyY2VzIjpbInRpbWUtc3Bhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBZ0IsYUFBYSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7O0FBQ3BGLE1BQU0sS0FBTyxDQUFDLEdBQWtCLFNBQVM7Ozs7QUFDekMsa0RBRUM7OztJQURDLGdEQUFzQjs7Ozs7QUFFeEIsNkNBUUM7Ozs7Ozs7Ozs7Ozs7OztBQUNEO0lBd0VFLHNCQUFZLElBQStCO1FBQTNDLGlCQVFDO1FBOUVRLFdBQU0sR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7UUF1RTlELElBQUksSUFBSSxFQUFFO1lBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUEvQyxDQUErQyxFQUFDLENBQUM7WUFDbEYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQSxHQUFHO2dCQUNyQixJQUFJLEtBQUksQ0FBQyxHQUFHLENBQUM7b0JBQUUsS0FBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksYUFBYSxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzFELENBQUMsRUFBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0lBcEVELHNCQUFJLHFDQUFXOzs7Ozs7UUFBZjtZQUFBLGlCQWVDO1lBYkMs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LDRCQUFxQjs7SUFDckIsNEJBQXFCOztJQUNyQiw0QkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmZUaW1lUHJpbWl0aXZlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IFdhckVudGl0eVByZXZpZXdUaW1lU3BhbiB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBDYWxlbmRhclR5cGUsIFRpbWVQcmltaXRpdmUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzL3NyYy9saWIvZGF0ZS10aW1lJztcbmV4cG9ydCBjb25zdCB4OiBUaW1lUHJpbWl0aXZlID0gdW5kZWZpbmVkXG5leHBvcnQgaW50ZXJmYWNlIEluZlRpbWVQcmltaXRpdmVXaXRoQ2FsZW5kYXIgZXh0ZW5kcyBJbmZUaW1lUHJpbWl0aXZlIHtcbiAgY2FsZW5kYXI6IENhbGVuZGFyVHlwZVxufVxuZXhwb3J0IGludGVyZmFjZSBUaW1lU3BhbldpdGhOdW1iZXJQcm9wcyB7XG4gIC8vIGtleSBpcyB0aGUgZGZoX3BrX3Byb3BlcnR5LCBleHByZXNzaW5nIHdoYXQgdGhlIHRpbWUgcHJpbWl0aXZlIG1lYW5zIGZvciB0aGUgdGltZSBzcGFuXG4gIDcyPzogSW5mVGltZVByaW1pdGl2ZVdpdGhDYWxlbmRhcjsgLy8gcDgyIHwgQXQgc29tZSB0aW1lIHdpdGhpbiB8IG91dGVyIGJvdW5kcyB8IG5vdCBiZWZvcmUg4oCTIG5vdCBhZnRlclxuICAxNTI/OiBJbmZUaW1lUHJpbWl0aXZlV2l0aENhbGVuZGFyOyAvLyBwODJhIHwgYmVnaW4gb2YgdGhlIGJlZ2luIHwgbGVmdCBvdXRlciBib3VuZCB8IG5vdCBiZWZvcmVcbiAgMTUzPzogSW5mVGltZVByaW1pdGl2ZVdpdGhDYWxlbmRhcjsgLy8gcDgyYiB8IGVuZCBvZiB0aGUgZW5kIHzCoHJpZ2h0IG91dGVyIGJvdW5kIHzCoG5vdCBhZnRlclxuICA3MT86IEluZlRpbWVQcmltaXRpdmVXaXRoQ2FsZW5kYXI7IC8vIHA4MSB8IE9uZ29pbmcgdGhyb3VnaG91dCB8IGlubmVyIGJvdW5kcyB8IHN1cmVseSBmcm9tIOKAkyBzdXJlbHkgdG9cbiAgMTUwPzogSW5mVGltZVByaW1pdGl2ZVdpdGhDYWxlbmRhcjsgLy8gcDgxYSB8IGVuZCBvZiB0aGUgYmVnaW4gfCBsZWZ0IGlubmVyIGJvdW5kIHwgc3VyZWx5IGZyb21cbiAgMTUxPzogSW5mVGltZVByaW1pdGl2ZVdpdGhDYWxlbmRhcjsgLy8gcDgxYiB8IGJlZ2luIG9mIHRoZSBlbmQgfCByaWdodCBpbm5lciBib3VuZCB8IHN1cmVseSB0b1xufVxuZXhwb3J0IGNsYXNzIFRpbWVTcGFuVXRpbCB7XG5cbiAgcmVhZG9ubHkgdHBLZXlzID0gWydwODInLCAncDgxJywgJ3A4MmEnLCAncDgyYicsICdwODFhJywgJ3A4MWInXVxuXG4gIHA4Mj86IFRpbWVQcmltaXRpdmU7IC8vIEF0IHNvbWUgdGltZSB3aXRoaW4gfCBvdXRlciBib3VuZHMgfCBub3QgYmVmb3JlIOKAkyBub3QgYWZ0ZXJcbiAgcDgxPzogVGltZVByaW1pdGl2ZTsgLy8gT25nb2luZyB0aHJvdWdob3V0IHwgaW5uZXIgYm91bmRzIHwgc3VyZWx5IGZyb20g4oCTIHN1cmVseSB0b1xuICBwODJhPzogVGltZVByaW1pdGl2ZTsgLy8gYmVnaW4gb2YgdGhlIGJlZ2luIHwgbGVmdCBvdXRlciBib3VuZCB8IG5vdCBiZWZvcmVcbiAgcDgxYT86IFRpbWVQcmltaXRpdmU7IC8vIGVuZCBvZiB0aGUgYmVnaW4gfCBsZWZ0IGlubmVyIGJvdW5kIHwgc3VyZWx5IGZyb21cbiAgcDgxYj86IFRpbWVQcmltaXRpdmU7IC8vIGJlZ2luIG9mIHRoZSBlbmQgfCByaWdodCBpbm5lciBib3VuZCB8IHN1cmVseSB0b1xuICBwODJiPzogVGltZVByaW1pdGl2ZTsgLy8gZW5kIG9mIHRoZSBlbmQgfMKgcmlnaHQgb3V0ZXIgYm91bmQgfMKgbm90IGFmdGVyXG5cblxuICBnZXQgZWFybGllc3REYXkoKSB7XG5cbiAgICBpZiAodGhpcy5pc0VtcHR5KCkpIHJldHVybiBudWxsO1xuXG4gICAgbGV0IG1pbiA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcblxuICAgIHRoaXMudHBLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICh0aGlzW2tleV0pIHtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IHRoaXNba2V5XS5qdWxpYW5EYXk7XG4gICAgICAgIC8vIGlmIHRoaXMgdGltZVByaW1pdGl2ZSBpcyBlYXJsaWVyIHRoYW4gbWluLCBzZXQgdGhpcyBhcyBuZXcgbWluXG4gICAgICAgIG1pbiA9IGN1cnJlbnQgPCBtaW4gPyBjdXJyZW50IDogbWluO1xuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gbWluO1xuICB9XG5cbiAgLyoqXG4gICogZ2V0IHRoZSBlYXJsaWVzdCBhbmQgbGF0ZXN0IFRpbWVQcmltaXRpdmUgb2YgZ2l2ZW4gYXJyYXkgb2YgVGltZVByaW1pdGl2ZXNcbiAgKlxuICAqIEZvciBlYXJsaWVzdCBpdCBjb21wYXJlcyB0aGUgYmVnaW4gb2YgVGltZVByaW1pdGl2ZSBkdXJhdGlvblxuICAqIEZvciBsYXRlc3QgaXQgY29tcGFyZXMgdGhlIGxhc3Qgc2Vjb25kIG9mIFRpbWVQcmltaXRpdmUgZHVyYXRpb25cbiAgKlxuICAqIEByZXR1cm5zIG9iamVjdCB3aXRoIG1pbiBEYXRlIGFuZCBtYXggRGF0ZSBvciBudWxsLCBpZiBubyBUaW1lUHJpbWl0aXZlIGF2YWlsYWJsZVxuICAqL1xuICBzdGF0aWMgZ2V0TWluTWF4VGltZVByaW1pdHZlT2ZBcnJheSh0cHM6IFRpbWVQcmltaXRpdmVbXSkge1xuXG4gICAgaWYgKCF0cHMgfHwgdHBzLmxlbmd0aCA8IDEpIHJldHVybiBudWxsO1xuXG4gICAgbGV0IG1pbiA9IHRwc1swXTtcbiAgICBsZXQgbWF4ID0gdHBzWzBdO1xuXG4gICAgdHBzLmZvckVhY2godHAgPT4ge1xuXG4gICAgICAvLyBpZiB0aGlzIHRpbWVQcmltaXRpdmUgaXMgZWFybGllciB0aGFuIG1pbiwgc2V0IHRoaXMgYXMgbmV3IG1pblxuICAgICAgbWluID0gdHAuZ2V0SnVsaWFuU2Vjb25kKCkgPCBtaW4uZ2V0SnVsaWFuU2Vjb25kKCkgPyB0cCA6IG1pbjtcblxuICAgICAgLy8gaWYgdGhpcyB0aW1lUHJpbWl0aXZlIGlzIGxhdGVyIHRoYW4gbWF4LCBzZXQgdGhpcyBhcyBuZXcgbWF4XG4gICAgICBtYXggPSB0cC5nZXRKdWxpYW5TZWNvbmQoKSA+IG1heC5nZXRKdWxpYW5TZWNvbmQoKSA/IHRwIDogbWF4O1xuICAgICAgLy8gIGNoZWNrIGlmIHdlIHdvdWxkIG5lZWQgdGhlIGxhdGVzdCBzZWNvbmQgaGVyZT9cbiAgICAgIC8vIG1heCA9IHRwLmdldExhc3RTZWNvbmQoKSA+IG1heC5nZXRMYXN0U2Vjb25kKCkgPyB0cCA6IG1heDtcblxuXG4gICAgfSlcblxuICAgIHJldHVybiB7IG1pbjogbWluLCBtYXg6IG1heCB9O1xuICB9XG5cbiAgc3RhdGljIGZyb21UaW1lU3BhbkRpYWxvZ0RhdGEoZDogVGltZVNwYW5XaXRoTnVtYmVyUHJvcHMgPSB7fSk6IFRpbWVTcGFuVXRpbCB7XG4gICAgaWYgKCFkKSBkID0ge307XG4gICAgY29uc3QgeCA9IHt9XG4gICAgaWYgKGRbJzcyJ10pIHhbJ3A4MiddID0gZFsnNzInXTtcbiAgICBpZiAoZFsnNzEnXSkgeFsncDgxJ10gPSBkWyc3MSddO1xuICAgIGlmIChkWycxNTInXSkgeFsncDgyYSddID0gZFsnMTUyJ107XG4gICAgaWYgKGRbJzE1MCddKSB4WydwODFhJ10gPSBkWycxNTAnXTtcbiAgICBpZiAoZFsnMTUxJ10pIHhbJ3A4MWInXSA9IGRbJzE1MSddO1xuICAgIGlmIChkWycxNTMnXSkgeFsncDgyYiddID0gZFsnMTUzJ107XG4gICAgcmV0dXJuIG5ldyBUaW1lU3BhblV0aWwoeClcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBXYXJFbnRpdHlQcmV2aWV3VGltZVNwYW4pIHtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaChrZXkgPT4gZGF0YVtrZXldID09PSB1bmRlZmluZWQgPyBkZWxldGUgZGF0YVtrZXldIDogJycpO1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgICAgIHRoaXMudHBLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKHRoaXNba2V5XSkgdGhpc1trZXldID0gbmV3IFRpbWVQcmltaXRpdmUodGhpc1trZXldKTtcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogcmV0dXJucyB0cnVlIGlmIG5vIFRpbWVQcmltaXRpdmUgaXMgdGhlcmVcbiAgICovXG4gIGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmlzTm90RW1wdHkoKVxuICB9XG4gIC8qKlxuICAgKiByZXR1cm5zIHRydWUgaWYgYXQgbGVhc3Qgb25lIFRpbWVQcmltaXRpdmUgaXMgdGhlcmVcbiAgICovXG4gIGlzTm90RW1wdHkoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucDgyIHx8IHRoaXMucDgxIHx8IHRoaXMucDgyYSB8fCB0aGlzLnA4MmIgfHwgdGhpcy5wODFhIHx8IHRoaXMucDgxYikgcmV0dXJuIHRydWVcbiAgICBlbHNlIHJldHVybiBmYWxzZVxuICB9XG5cblxuICAvKipcbiAgKiBnZXQgdGhlIGVhcmxpZXN0IGFuZCBsYXRlc3QgVGltZVByaW1pdGl2ZSBvZiB0aGlzIFRpbWVTcGFuXG4gICpcbiAgKiBGb3IgZWFybGllc3QgaXQgY29tcGFyZXMgdGhlIGJlZ2luIG9mIFRpbWVQcmltaXRpdmUgZHVyYXRpb25cbiAgKiBGb3IgbGF0ZXN0IGl0IGNvbXBhcmVzIHRoZSBsYXN0IHNlY29uZCBvZiBUaW1lUHJpbWl0aXZlIGR1cmF0aW9uXG4gICpcbiAgKiBAcmV0dXJucyBvYmplY3Qgd2l0aCBtaW4gRGF0ZSBhbmQgbWF4IERhdGUgb3IgbnVsbCwgaWYgbm8gVGltZVByaW1pdGl2ZSBhdmFpbGFibGVcbiAgKi9cbiAgZ2V0TWluTWF4VGltZVByaW1pdGl2ZSgpOiB7IG1pbjogVGltZVByaW1pdGl2ZSwgbWF4OiBUaW1lUHJpbWl0aXZlIH0gfCBudWxsIHtcbiAgICByZXR1cm4gVGltZVNwYW5VdGlsLmdldE1pbk1heFRpbWVQcmltaXR2ZU9mQXJyYXkodGhpcy5nZXRBcnJheU9mVGltZVByaW1pdGl2ZXMoKSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMgYXJyYXkgb2YgVGltZVByaW1pdGl2ZXMgb2YgdGhpcyBUaW1lU3BhblxuICAgKi9cbiAgZ2V0QXJyYXlPZlRpbWVQcmltaXRpdmVzKCk6IFRpbWVQcmltaXRpdmVbXSB7XG4gICAgY29uc3QgYXJyYXkgPSBbXTtcblxuICAgIHRoaXMudHBLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICh0aGlzW2tleV0pIHtcbiAgICAgICAgYXJyYXkucHVzaCh0aGlzW2tleV0pO1xuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cblxuICBnZXRQcmltaXRpdmVzRm9yUHJldmlldygpOiB7IHNpbmdsZT86IFRpbWVQcmltaXRpdmUsIGJlZ2luPzogVGltZVByaW1pdGl2ZSwgZW5kPzogVGltZVByaW1pdGl2ZSB9IHtcbiAgICBjb25zdCBzaW5nbGUgPSB0aGlzLnA4MiB8fCB0aGlzLnA4MTtcbiAgICBjb25zdCBiZWdpbiA9IHRoaXMucDgyYSB8fCB0aGlzLnA4MWE7XG4gICAgY29uc3QgZW5kID0gdGhpcy5wODJiIHx8IHRoaXMucDgxYjtcbiAgICByZXR1cm4geyBzaW5nbGUsIGJlZ2luLCBlbmQgfTtcbiAgfVxuXG59XG4iXX0=