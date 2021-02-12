import { TimePrimitive } from '@kleiolab/lib-utils/src/lib/date-time';

/**
 * @fileoverview added by tsickle
 * Generated from: time-span.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const x = undefined;
/**
 * @record
 */
function InfTimePrimitiveWithCalendar() { }
if (false) {
    /** @type {?} */
    InfTimePrimitiveWithCalendar.prototype.calendar;
}
/**
 * @record
 */
function TimeSpanWithNumberProps() { }
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
class TimeSpanUtil {
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
        return new TimeSpanUtil(x);
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
        return TimeSpanUtil.getMinMaxTimePrimitveOfArray(this.getArrayOfTimePrimitives());
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

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: kleiolab-lib-utils-src-lib-time-span.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { TimeSpanUtil, x };
//# sourceMappingURL=kleiolab-lib-utils-src-lib-time-span.js.map
