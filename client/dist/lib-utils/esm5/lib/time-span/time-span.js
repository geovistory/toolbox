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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zcGFuLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi11dGlscy8iLCJzb3VyY2VzIjpbImxpYi90aW1lLXNwYW4vdGltZS1zcGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFnQixhQUFhLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7QUFDcEYsTUFBTSxLQUFPLENBQUMsR0FBa0IsU0FBUzs7OztBQUN6QyxrREFFQzs7O0lBREMsZ0RBQXNCOzs7OztBQUV4Qiw2Q0FRQzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Q7SUF3RUUsc0JBQVksSUFBK0I7UUFBM0MsaUJBUUM7UUE5RVEsV0FBTSxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtRQXVFOUQsSUFBSSxJQUFJLEVBQUU7WUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQS9DLENBQStDLEVBQUMsQ0FBQztZQUNsRixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLEdBQUc7Z0JBQ3JCLElBQUksS0FBSSxDQUFDLEdBQUcsQ0FBQztvQkFBRSxLQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxhQUFhLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUQsQ0FBQyxFQUFDLENBQUE7U0FDSDtJQUNILENBQUM7SUFwRUQsc0JBQUkscUNBQVc7Ozs7OztRQUFmO1lBQUEsaUJBZUM7WUFiQyxJQUFJ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QXFCOztJQUNyQiw0QkFBcUI7O0lBQ3JCLDRCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluZlRpbWVQcmltaXRpdmUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgV2FyRW50aXR5UHJldmlld1RpbWVTcGFuIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IENhbGVuZGFyVHlwZSwgVGltZVByaW1pdGl2ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMvc3JjL2xpYi9kYXRlLXRpbWUnO1xuZXhwb3J0IGNvbnN0IHg6IFRpbWVQcmltaXRpdmUgPSB1bmRlZmluZWRcbmV4cG9ydCBpbnRlcmZhY2UgSW5mVGltZVByaW1pdGl2ZVdpdGhDYWxlbmRhciBleHRlbmRzIEluZlRpbWVQcmltaXRpdmUge1xuICBjYWxlbmRhcjogQ2FsZW5kYXJUeXBlXG59XG5leHBvcnQgaW50ZXJmYWNlIFRpbWVTcGFuV2l0aE51bWJlclByb3BzIHtcbiAgLy8ga2V5IGlzIHRoZSBkZmhfcGtfcHJvcGVydHksIGV4cHJlc3Npbmcgd2hhdCB0aGUgdGltZSBwcmltaXRpdmUgbWVhbnMgZm9yIHRoZSB0aW1lIHNwYW5cbiAgNzI/OiBJbmZUaW1lUHJpbWl0aXZlV2l0aENhbGVuZGFyOyAvLyBwODIgfCBBdCBzb21lIHRpbWUgd2l0aGluIHwgb3V0ZXIgYm91bmRzIHwgbm90IGJlZm9yZSDigJMgbm90IGFmdGVyXG4gIDE1Mj86IEluZlRpbWVQcmltaXRpdmVXaXRoQ2FsZW5kYXI7IC8vIHA4MmEgfCBiZWdpbiBvZiB0aGUgYmVnaW4gfCBsZWZ0IG91dGVyIGJvdW5kIHwgbm90IGJlZm9yZVxuICAxNTM/OiBJbmZUaW1lUHJpbWl0aXZlV2l0aENhbGVuZGFyOyAvLyBwODJiIHwgZW5kIG9mIHRoZSBlbmQgfMKgcmlnaHQgb3V0ZXIgYm91bmQgfMKgbm90IGFmdGVyXG4gIDcxPzogSW5mVGltZVByaW1pdGl2ZVdpdGhDYWxlbmRhcjsgLy8gcDgxIHwgT25nb2luZyB0aHJvdWdob3V0IHwgaW5uZXIgYm91bmRzIHwgc3VyZWx5IGZyb20g4oCTIHN1cmVseSB0b1xuICAxNTA/OiBJbmZUaW1lUHJpbWl0aXZlV2l0aENhbGVuZGFyOyAvLyBwODFhIHwgZW5kIG9mIHRoZSBiZWdpbiB8IGxlZnQgaW5uZXIgYm91bmQgfCBzdXJlbHkgZnJvbVxuICAxNTE/OiBJbmZUaW1lUHJpbWl0aXZlV2l0aENhbGVuZGFyOyAvLyBwODFiIHwgYmVnaW4gb2YgdGhlIGVuZCB8IHJpZ2h0IGlubmVyIGJvdW5kIHwgc3VyZWx5IHRvXG59XG5leHBvcnQgY2xhc3MgVGltZVNwYW5VdGlsIHtcblxuICByZWFkb25seSB0cEtleXMgPSBbJ3A4MicsICdwODEnLCAncDgyYScsICdwODJiJywgJ3A4MWEnLCAncDgxYiddXG5cbiAgcDgyPzogVGltZVByaW1pdGl2ZTsgLy8gQXQgc29tZSB0aW1lIHdpdGhpbiB8IG91dGVyIGJvdW5kcyB8IG5vdCBiZWZvcmUg4oCTIG5vdCBhZnRlclxuICBwODE/OiBUaW1lUHJpbWl0aXZlOyAvLyBPbmdvaW5nIHRocm91Z2hvdXQgfCBpbm5lciBib3VuZHMgfCBzdXJlbHkgZnJvbSDigJMgc3VyZWx5IHRvXG4gIHA4MmE/OiBUaW1lUHJpbWl0aXZlOyAvLyBiZWdpbiBvZiB0aGUgYmVnaW4gfCBsZWZ0IG91dGVyIGJvdW5kIHwgbm90IGJlZm9yZVxuICBwODFhPzogVGltZVByaW1pdGl2ZTsgLy8gZW5kIG9mIHRoZSBiZWdpbiB8IGxlZnQgaW5uZXIgYm91bmQgfCBzdXJlbHkgZnJvbVxuICBwODFiPzogVGltZVByaW1pdGl2ZTsgLy8gYmVnaW4gb2YgdGhlIGVuZCB8IHJpZ2h0IGlubmVyIGJvdW5kIHwgc3VyZWx5IHRvXG4gIHA4MmI/OiBUaW1lUHJpbWl0aXZlOyAvLyBlbmQgb2YgdGhlIGVuZCB8wqByaWdodCBvdXRlciBib3VuZCB8wqBub3QgYWZ0ZXJcblxuXG4gIGdldCBlYXJsaWVzdERheSgpIHtcblxuICAgIGlmICh0aGlzLmlzRW1wdHkoKSkgcmV0dXJuIG51bGw7XG5cbiAgICBsZXQgbWluID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuXG4gICAgdGhpcy50cEtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKHRoaXNba2V5XSkge1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gdGhpc1trZXldLmp1bGlhbkRheTtcbiAgICAgICAgLy8gaWYgdGhpcyB0aW1lUHJpbWl0aXZlIGlzIGVhcmxpZXIgdGhhbiBtaW4sIHNldCB0aGlzIGFzIG5ldyBtaW5cbiAgICAgICAgbWluID0gY3VycmVudCA8IG1pbiA/IGN1cnJlbnQgOiBtaW47XG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBtaW47XG4gIH1cblxuICAvKipcbiAgKiBnZXQgdGhlIGVhcmxpZXN0IGFuZCBsYXRlc3QgVGltZVByaW1pdGl2ZSBvZiBnaXZlbiBhcnJheSBvZiBUaW1lUHJpbWl0aXZlc1xuICAqXG4gICogRm9yIGVhcmxpZXN0IGl0IGNvbXBhcmVzIHRoZSBiZWdpbiBvZiBUaW1lUHJpbWl0aXZlIGR1cmF0aW9uXG4gICogRm9yIGxhdGVzdCBpdCBjb21wYXJlcyB0aGUgbGFzdCBzZWNvbmQgb2YgVGltZVByaW1pdGl2ZSBkdXJhdGlvblxuICAqXG4gICogQHJldHVybnMgb2JqZWN0IHdpdGggbWluIERhdGUgYW5kIG1heCBEYXRlIG9yIG51bGwsIGlmIG5vIFRpbWVQcmltaXRpdmUgYXZhaWxhYmxlXG4gICovXG4gIHN0YXRpYyBnZXRNaW5NYXhUaW1lUHJpbWl0dmVPZkFycmF5KHRwczogVGltZVByaW1pdGl2ZVtdKSB7XG5cbiAgICBpZiAoIXRwcyB8fCB0cHMubGVuZ3RoIDwgMSkgcmV0dXJuIG51bGw7XG5cbiAgICBsZXQgbWluID0gdHBzWzBdO1xuICAgIGxldCBtYXggPSB0cHNbMF07XG5cbiAgICB0cHMuZm9yRWFjaCh0cCA9PiB7XG5cbiAgICAgIC8vIGlmIHRoaXMgdGltZVByaW1pdGl2ZSBpcyBlYXJsaWVyIHRoYW4gbWluLCBzZXQgdGhpcyBhcyBuZXcgbWluXG4gICAgICBtaW4gPSB0cC5nZXRKdWxpYW5TZWNvbmQoKSA8IG1pbi5nZXRKdWxpYW5TZWNvbmQoKSA/IHRwIDogbWluO1xuXG4gICAgICAvLyBpZiB0aGlzIHRpbWVQcmltaXRpdmUgaXMgbGF0ZXIgdGhhbiBtYXgsIHNldCB0aGlzIGFzIG5ldyBtYXhcbiAgICAgIG1heCA9IHRwLmdldEp1bGlhblNlY29uZCgpID4gbWF4LmdldEp1bGlhblNlY29uZCgpID8gdHAgOiBtYXg7XG4gICAgICAvLyAgY2hlY2sgaWYgd2Ugd291bGQgbmVlZCB0aGUgbGF0ZXN0IHNlY29uZCBoZXJlP1xuICAgICAgLy8gbWF4ID0gdHAuZ2V0TGFzdFNlY29uZCgpID4gbWF4LmdldExhc3RTZWNvbmQoKSA/IHRwIDogbWF4O1xuXG5cbiAgICB9KVxuXG4gICAgcmV0dXJuIHsgbWluOiBtaW4sIG1heDogbWF4IH07XG4gIH1cblxuICBzdGF0aWMgZnJvbVRpbWVTcGFuRGlhbG9nRGF0YShkOiBUaW1lU3BhbldpdGhOdW1iZXJQcm9wcyA9IHt9KTogVGltZVNwYW5VdGlsIHtcbiAgICBpZiAoIWQpIGQgPSB7fTtcbiAgICBjb25zdCB4ID0ge31cbiAgICBpZiAoZFsnNzInXSkgeFsncDgyJ10gPSBkWyc3MiddO1xuICAgIGlmIChkWyc3MSddKSB4WydwODEnXSA9IGRbJzcxJ107XG4gICAgaWYgKGRbJzE1MiddKSB4WydwODJhJ10gPSBkWycxNTInXTtcbiAgICBpZiAoZFsnMTUwJ10pIHhbJ3A4MWEnXSA9IGRbJzE1MCddO1xuICAgIGlmIChkWycxNTEnXSkgeFsncDgxYiddID0gZFsnMTUxJ107XG4gICAgaWYgKGRbJzE1MyddKSB4WydwODJiJ10gPSBkWycxNTMnXTtcbiAgICByZXR1cm4gbmV3IFRpbWVTcGFuVXRpbCh4KVxuICB9XG5cbiAgY29uc3RydWN0b3IoZGF0YT86IFdhckVudGl0eVByZXZpZXdUaW1lU3Bhbikge1xuICAgIGlmIChkYXRhKSB7XG4gICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKGtleSA9PiBkYXRhW2tleV0gPT09IHVuZGVmaW5lZCA/IGRlbGV0ZSBkYXRhW2tleV0gOiAnJyk7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICAgICAgdGhpcy50cEtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAodGhpc1trZXldKSB0aGlzW2tleV0gPSBuZXcgVGltZVByaW1pdGl2ZSh0aGlzW2tleV0pO1xuICAgICAgfSlcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiByZXR1cm5zIHRydWUgaWYgbm8gVGltZVByaW1pdGl2ZSBpcyB0aGVyZVxuICAgKi9cbiAgaXNFbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaXNOb3RFbXB0eSgpXG4gIH1cbiAgLyoqXG4gICAqIHJldHVybnMgdHJ1ZSBpZiBhdCBsZWFzdCBvbmUgVGltZVByaW1pdGl2ZSBpcyB0aGVyZVxuICAgKi9cbiAgaXNOb3RFbXB0eSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5wODIgfHwgdGhpcy5wODEgfHwgdGhpcy5wODJhIHx8IHRoaXMucDgyYiB8fCB0aGlzLnA4MWEgfHwgdGhpcy5wODFiKSByZXR1cm4gdHJ1ZVxuICAgIGVsc2UgcmV0dXJuIGZhbHNlXG4gIH1cblxuXG4gIC8qKlxuICAqIGdldCB0aGUgZWFybGllc3QgYW5kIGxhdGVzdCBUaW1lUHJpbWl0aXZlIG9mIHRoaXMgVGltZVNwYW5cbiAgKlxuICAqIEZvciBlYXJsaWVzdCBpdCBjb21wYXJlcyB0aGUgYmVnaW4gb2YgVGltZVByaW1pdGl2ZSBkdXJhdGlvblxuICAqIEZvciBsYXRlc3QgaXQgY29tcGFyZXMgdGhlIGxhc3Qgc2Vjb25kIG9mIFRpbWVQcmltaXRpdmUgZHVyYXRpb25cbiAgKlxuICAqIEByZXR1cm5zIG9iamVjdCB3aXRoIG1pbiBEYXRlIGFuZCBtYXggRGF0ZSBvciBudWxsLCBpZiBubyBUaW1lUHJpbWl0aXZlIGF2YWlsYWJsZVxuICAqL1xuICBnZXRNaW5NYXhUaW1lUHJpbWl0aXZlKCk6IHsgbWluOiBUaW1lUHJpbWl0aXZlLCBtYXg6IFRpbWVQcmltaXRpdmUgfSB8IG51bGwge1xuICAgIHJldHVybiBUaW1lU3BhblV0aWwuZ2V0TWluTWF4VGltZVByaW1pdHZlT2ZBcnJheSh0aGlzLmdldEFycmF5T2ZUaW1lUHJpbWl0aXZlcygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyBhcnJheSBvZiBUaW1lUHJpbWl0aXZlcyBvZiB0aGlzIFRpbWVTcGFuXG4gICAqL1xuICBnZXRBcnJheU9mVGltZVByaW1pdGl2ZXMoKTogVGltZVByaW1pdGl2ZVtdIHtcbiAgICBjb25zdCBhcnJheSA9IFtdO1xuXG4gICAgdGhpcy50cEtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKHRoaXNba2V5XSkge1xuICAgICAgICBhcnJheS5wdXNoKHRoaXNba2V5XSk7XG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBhcnJheTtcbiAgfVxuXG4gIGdldFByaW1pdGl2ZXNGb3JQcmV2aWV3KCk6IHsgc2luZ2xlPzogVGltZVByaW1pdGl2ZSwgYmVnaW4/OiBUaW1lUHJpbWl0aXZlLCBlbmQ/OiBUaW1lUHJpbWl0aXZlIH0ge1xuICAgIGNvbnN0IHNpbmdsZSA9IHRoaXMucDgyIHx8IHRoaXMucDgxO1xuICAgIGNvbnN0IGJlZ2luID0gdGhpcy5wODJhIHx8IHRoaXMucDgxYTtcbiAgICBjb25zdCBlbmQgPSB0aGlzLnA4MmIgfHwgdGhpcy5wODFiO1xuICAgIHJldHVybiB7IHNpbmdsZSwgYmVnaW4sIGVuZCB9O1xuICB9XG5cbn1cbiJdfQ==