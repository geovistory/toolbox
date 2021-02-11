/**
 * @fileoverview added by tsickle
 * Generated from: lib/time-span/time-span.ts
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
var TimeSpan = /** @class */ (function () {
    function TimeSpan(data) {
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
    Object.defineProperty(TimeSpan.prototype, "earliestDay", {
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
    TimeSpan.getMinMaxTimePrimitveOfArray = /**
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
    TimeSpan.fromTimeSpanDialogData = /**
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
        return new TimeSpan(x);
    };
    /**
     * returns true if no TimePrimitive is there
     */
    /**
     * returns true if no TimePrimitive is there
     * @return {?}
     */
    TimeSpan.prototype.isEmpty = /**
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
    TimeSpan.prototype.isNotEmpty = /**
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
    TimeSpan.prototype.getMinMaxTimePrimitive = /**
     * get the earliest and latest TimePrimitive of this TimeSpan
     *
     * For earliest it compares the begin of TimePrimitive duration
     * For latest it compares the last second of TimePrimitive duration
     *
     * @return {?} object with min Date and max Date or null, if no TimePrimitive available
     */
    function () {
        return TimeSpan.getMinMaxTimePrimitveOfArray(this.getArrayOfTimePrimitives());
    };
    /**
     * @returns array of TimePrimitives of this TimeSpan
     */
    /**
     * @return {?} array of TimePrimitives of this TimeSpan
     */
    TimeSpan.prototype.getArrayOfTimePrimitives = /**
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
    TimeSpan.prototype.getPrimitivesForPreview = /**
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
    return TimeSpan;
}());
export { TimeSpan };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zcGFuLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi11dGlscy8iLCJzb3VyY2VzIjpbImxpYi90aW1lLXNwYW4vdGltZS1zcGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFnQixhQUFhLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7QUFDcEYsTUFBTSxLQUFPLENBQUMsR0FBa0IsU0FBUzs7OztBQUN6QyxrREFFQzs7O0lBREMsZ0RBQXNCOzs7OztBQUV4Qiw2Q0FRQzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Q7SUF3RUUsa0JBQVksSUFBK0I7UUFBM0MsaUJBUUM7UUE5RVEsV0FBTSxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtRQXVFOUQsSUFBSSxJQUFJLEVBQUU7WUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQS9DLENBQStDLEVBQUMsQ0FBQztZQUNsRixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLEdBQUc7Z0JBQ3JCLElBQUksS0FBSSxDQUFDLEdBQUcsQ0FBQztvQkFBRSxLQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxhQUFhLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUQsQ0FBQyxFQUFDLENBQUE7U0FDSDtJQUNILENBQUM7SUFwRUQsc0JBQUksaUNBQVc7Ozs7OztRQUFmO1lBQUEsaUJBZUM7WUFiQyxJQUFJ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cUI7O0lBQ3JCLHdCQUFxQjs7SUFDckIsd0JBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5mVGltZVByaW1pdGl2ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBXYXJFbnRpdHlQcmV2aWV3VGltZVNwYW4gfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJUeXBlLCBUaW1lUHJpbWl0aXZlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscy9zcmMvbGliL2RhdGUtdGltZSc7XG5leHBvcnQgY29uc3QgeDogVGltZVByaW1pdGl2ZSA9IHVuZGVmaW5lZFxuZXhwb3J0IGludGVyZmFjZSBJbmZUaW1lUHJpbWl0aXZlV2l0aENhbGVuZGFyIGV4dGVuZHMgSW5mVGltZVByaW1pdGl2ZSB7XG4gIGNhbGVuZGFyOiBDYWxlbmRhclR5cGVcbn1cbmV4cG9ydCBpbnRlcmZhY2UgVGltZVNwYW5XaXRoTnVtYmVyUHJvcHMge1xuICAvLyBrZXkgaXMgdGhlIGRmaF9wa19wcm9wZXJ0eSwgZXhwcmVzc2luZyB3aGF0IHRoZSB0aW1lIHByaW1pdGl2ZSBtZWFucyBmb3IgdGhlIHRpbWUgc3BhblxuICA3Mj86IEluZlRpbWVQcmltaXRpdmVXaXRoQ2FsZW5kYXI7IC8vIHA4MiB8IEF0IHNvbWUgdGltZSB3aXRoaW4gfCBvdXRlciBib3VuZHMgfCBub3QgYmVmb3JlIOKAkyBub3QgYWZ0ZXJcbiAgMTUyPzogSW5mVGltZVByaW1pdGl2ZVdpdGhDYWxlbmRhcjsgLy8gcDgyYSB8IGJlZ2luIG9mIHRoZSBiZWdpbiB8IGxlZnQgb3V0ZXIgYm91bmQgfCBub3QgYmVmb3JlXG4gIDE1Mz86IEluZlRpbWVQcmltaXRpdmVXaXRoQ2FsZW5kYXI7IC8vIHA4MmIgfCBlbmQgb2YgdGhlIGVuZCB8wqByaWdodCBvdXRlciBib3VuZCB8wqBub3QgYWZ0ZXJcbiAgNzE/OiBJbmZUaW1lUHJpbWl0aXZlV2l0aENhbGVuZGFyOyAvLyBwODEgfCBPbmdvaW5nIHRocm91Z2hvdXQgfCBpbm5lciBib3VuZHMgfCBzdXJlbHkgZnJvbSDigJMgc3VyZWx5IHRvXG4gIDE1MD86IEluZlRpbWVQcmltaXRpdmVXaXRoQ2FsZW5kYXI7IC8vIHA4MWEgfCBlbmQgb2YgdGhlIGJlZ2luIHwgbGVmdCBpbm5lciBib3VuZCB8IHN1cmVseSBmcm9tXG4gIDE1MT86IEluZlRpbWVQcmltaXRpdmVXaXRoQ2FsZW5kYXI7IC8vIHA4MWIgfCBiZWdpbiBvZiB0aGUgZW5kIHwgcmlnaHQgaW5uZXIgYm91bmQgfCBzdXJlbHkgdG9cbn1cbmV4cG9ydCBjbGFzcyBUaW1lU3BhbiB7XG5cbiAgcmVhZG9ubHkgdHBLZXlzID0gWydwODInLCAncDgxJywgJ3A4MmEnLCAncDgyYicsICdwODFhJywgJ3A4MWInXVxuXG4gIHA4Mj86IFRpbWVQcmltaXRpdmU7IC8vIEF0IHNvbWUgdGltZSB3aXRoaW4gfCBvdXRlciBib3VuZHMgfCBub3QgYmVmb3JlIOKAkyBub3QgYWZ0ZXJcbiAgcDgxPzogVGltZVByaW1pdGl2ZTsgLy8gT25nb2luZyB0aHJvdWdob3V0IHwgaW5uZXIgYm91bmRzIHwgc3VyZWx5IGZyb20g4oCTIHN1cmVseSB0b1xuICBwODJhPzogVGltZVByaW1pdGl2ZTsgLy8gYmVnaW4gb2YgdGhlIGJlZ2luIHwgbGVmdCBvdXRlciBib3VuZCB8IG5vdCBiZWZvcmVcbiAgcDgxYT86IFRpbWVQcmltaXRpdmU7IC8vIGVuZCBvZiB0aGUgYmVnaW4gfCBsZWZ0IGlubmVyIGJvdW5kIHwgc3VyZWx5IGZyb21cbiAgcDgxYj86IFRpbWVQcmltaXRpdmU7IC8vIGJlZ2luIG9mIHRoZSBlbmQgfCByaWdodCBpbm5lciBib3VuZCB8IHN1cmVseSB0b1xuICBwODJiPzogVGltZVByaW1pdGl2ZTsgLy8gZW5kIG9mIHRoZSBlbmQgfMKgcmlnaHQgb3V0ZXIgYm91bmQgfMKgbm90IGFmdGVyXG5cblxuICBnZXQgZWFybGllc3REYXkoKSB7XG5cbiAgICBpZiAodGhpcy5pc0VtcHR5KCkpIHJldHVybiBudWxsO1xuXG4gICAgbGV0IG1pbiA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcblxuICAgIHRoaXMudHBLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICh0aGlzW2tleV0pIHtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IHRoaXNba2V5XS5qdWxpYW5EYXk7XG4gICAgICAgIC8vIGlmIHRoaXMgdGltZVByaW1pdGl2ZSBpcyBlYXJsaWVyIHRoYW4gbWluLCBzZXQgdGhpcyBhcyBuZXcgbWluXG4gICAgICAgIG1pbiA9IGN1cnJlbnQgPCBtaW4gPyBjdXJyZW50IDogbWluO1xuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gbWluO1xuICB9XG5cbiAgLyoqXG4gICogZ2V0IHRoZSBlYXJsaWVzdCBhbmQgbGF0ZXN0IFRpbWVQcmltaXRpdmUgb2YgZ2l2ZW4gYXJyYXkgb2YgVGltZVByaW1pdGl2ZXNcbiAgKlxuICAqIEZvciBlYXJsaWVzdCBpdCBjb21wYXJlcyB0aGUgYmVnaW4gb2YgVGltZVByaW1pdGl2ZSBkdXJhdGlvblxuICAqIEZvciBsYXRlc3QgaXQgY29tcGFyZXMgdGhlIGxhc3Qgc2Vjb25kIG9mIFRpbWVQcmltaXRpdmUgZHVyYXRpb25cbiAgKlxuICAqIEByZXR1cm5zIG9iamVjdCB3aXRoIG1pbiBEYXRlIGFuZCBtYXggRGF0ZSBvciBudWxsLCBpZiBubyBUaW1lUHJpbWl0aXZlIGF2YWlsYWJsZVxuICAqL1xuICBzdGF0aWMgZ2V0TWluTWF4VGltZVByaW1pdHZlT2ZBcnJheSh0cHM6IFRpbWVQcmltaXRpdmVbXSkge1xuXG4gICAgaWYgKCF0cHMgfHwgdHBzLmxlbmd0aCA8IDEpIHJldHVybiBudWxsO1xuXG4gICAgbGV0IG1pbiA9IHRwc1swXTtcbiAgICBsZXQgbWF4ID0gdHBzWzBdO1xuXG4gICAgdHBzLmZvckVhY2godHAgPT4ge1xuXG4gICAgICAvLyBpZiB0aGlzIHRpbWVQcmltaXRpdmUgaXMgZWFybGllciB0aGFuIG1pbiwgc2V0IHRoaXMgYXMgbmV3IG1pblxuICAgICAgbWluID0gdHAuZ2V0SnVsaWFuU2Vjb25kKCkgPCBtaW4uZ2V0SnVsaWFuU2Vjb25kKCkgPyB0cCA6IG1pbjtcblxuICAgICAgLy8gaWYgdGhpcyB0aW1lUHJpbWl0aXZlIGlzIGxhdGVyIHRoYW4gbWF4LCBzZXQgdGhpcyBhcyBuZXcgbWF4XG4gICAgICBtYXggPSB0cC5nZXRKdWxpYW5TZWNvbmQoKSA+IG1heC5nZXRKdWxpYW5TZWNvbmQoKSA/IHRwIDogbWF4O1xuICAgICAgLy8gIGNoZWNrIGlmIHdlIHdvdWxkIG5lZWQgdGhlIGxhdGVzdCBzZWNvbmQgaGVyZT9cbiAgICAgIC8vIG1heCA9IHRwLmdldExhc3RTZWNvbmQoKSA+IG1heC5nZXRMYXN0U2Vjb25kKCkgPyB0cCA6IG1heDtcblxuXG4gICAgfSlcblxuICAgIHJldHVybiB7IG1pbjogbWluLCBtYXg6IG1heCB9O1xuICB9XG5cbiAgc3RhdGljIGZyb21UaW1lU3BhbkRpYWxvZ0RhdGEoZDogVGltZVNwYW5XaXRoTnVtYmVyUHJvcHMgPSB7fSk6IFRpbWVTcGFuIHtcbiAgICBpZiAoIWQpIGQgPSB7fTtcbiAgICBjb25zdCB4ID0ge31cbiAgICBpZiAoZFsnNzInXSkgeFsncDgyJ10gPSBkWyc3MiddO1xuICAgIGlmIChkWyc3MSddKSB4WydwODEnXSA9IGRbJzcxJ107XG4gICAgaWYgKGRbJzE1MiddKSB4WydwODJhJ10gPSBkWycxNTInXTtcbiAgICBpZiAoZFsnMTUwJ10pIHhbJ3A4MWEnXSA9IGRbJzE1MCddO1xuICAgIGlmIChkWycxNTEnXSkgeFsncDgxYiddID0gZFsnMTUxJ107XG4gICAgaWYgKGRbJzE1MyddKSB4WydwODJiJ10gPSBkWycxNTMnXTtcbiAgICByZXR1cm4gbmV3IFRpbWVTcGFuKHgpXG4gIH1cblxuICBjb25zdHJ1Y3RvcihkYXRhPzogV2FyRW50aXR5UHJldmlld1RpbWVTcGFuKSB7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goa2V5ID0+IGRhdGFba2V5XSA9PT0gdW5kZWZpbmVkID8gZGVsZXRlIGRhdGFba2V5XSA6ICcnKTtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gICAgICB0aGlzLnRwS2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmICh0aGlzW2tleV0pIHRoaXNba2V5XSA9IG5ldyBUaW1lUHJpbWl0aXZlKHRoaXNba2V5XSk7XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIHJldHVybnMgdHJ1ZSBpZiBubyBUaW1lUHJpbWl0aXZlIGlzIHRoZXJlXG4gICAqL1xuICBpc0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pc05vdEVtcHR5KClcbiAgfVxuICAvKipcbiAgICogcmV0dXJucyB0cnVlIGlmIGF0IGxlYXN0IG9uZSBUaW1lUHJpbWl0aXZlIGlzIHRoZXJlXG4gICAqL1xuICBpc05vdEVtcHR5KCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnA4MiB8fCB0aGlzLnA4MSB8fCB0aGlzLnA4MmEgfHwgdGhpcy5wODJiIHx8IHRoaXMucDgxYSB8fCB0aGlzLnA4MWIpIHJldHVybiB0cnVlXG4gICAgZWxzZSByZXR1cm4gZmFsc2VcbiAgfVxuXG5cbiAgLyoqXG4gICogZ2V0IHRoZSBlYXJsaWVzdCBhbmQgbGF0ZXN0IFRpbWVQcmltaXRpdmUgb2YgdGhpcyBUaW1lU3BhblxuICAqXG4gICogRm9yIGVhcmxpZXN0IGl0IGNvbXBhcmVzIHRoZSBiZWdpbiBvZiBUaW1lUHJpbWl0aXZlIGR1cmF0aW9uXG4gICogRm9yIGxhdGVzdCBpdCBjb21wYXJlcyB0aGUgbGFzdCBzZWNvbmQgb2YgVGltZVByaW1pdGl2ZSBkdXJhdGlvblxuICAqXG4gICogQHJldHVybnMgb2JqZWN0IHdpdGggbWluIERhdGUgYW5kIG1heCBEYXRlIG9yIG51bGwsIGlmIG5vIFRpbWVQcmltaXRpdmUgYXZhaWxhYmxlXG4gICovXG4gIGdldE1pbk1heFRpbWVQcmltaXRpdmUoKTogeyBtaW46IFRpbWVQcmltaXRpdmUsIG1heDogVGltZVByaW1pdGl2ZSB9IHwgbnVsbCB7XG4gICAgcmV0dXJuIFRpbWVTcGFuLmdldE1pbk1heFRpbWVQcmltaXR2ZU9mQXJyYXkodGhpcy5nZXRBcnJheU9mVGltZVByaW1pdGl2ZXMoKSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMgYXJyYXkgb2YgVGltZVByaW1pdGl2ZXMgb2YgdGhpcyBUaW1lU3BhblxuICAgKi9cbiAgZ2V0QXJyYXlPZlRpbWVQcmltaXRpdmVzKCk6IFRpbWVQcmltaXRpdmVbXSB7XG4gICAgY29uc3QgYXJyYXkgPSBbXTtcblxuICAgIHRoaXMudHBLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICh0aGlzW2tleV0pIHtcbiAgICAgICAgYXJyYXkucHVzaCh0aGlzW2tleV0pO1xuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cblxuICBnZXRQcmltaXRpdmVzRm9yUHJldmlldygpOiB7IHNpbmdsZT86IFRpbWVQcmltaXRpdmUsIGJlZ2luPzogVGltZVByaW1pdGl2ZSwgZW5kPzogVGltZVByaW1pdGl2ZSB9IHtcbiAgICBjb25zdCBzaW5nbGUgPSB0aGlzLnA4MiB8fCB0aGlzLnA4MTtcbiAgICBjb25zdCBiZWdpbiA9IHRoaXMucDgyYSB8fCB0aGlzLnA4MWE7XG4gICAgY29uc3QgZW5kID0gdGhpcy5wODJiIHx8IHRoaXMucDgxYjtcbiAgICByZXR1cm4geyBzaW5nbGUsIGJlZ2luLCBlbmQgfTtcbiAgfVxuXG59XG4iXX0=