(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@kleiolab/lib-utils/src/lib/date-time')) :
    typeof define === 'function' && define.amd ? define('@kleiolab/lib-utils', ['exports', '@kleiolab/lib-utils/src/lib/date-time'], factory) :
    (global = global || self, factory((global.kleiolab = global.kleiolab || {}, global.kleiolab['lib-utils'] = {}), global.kleiolab['lib-utils'].src.lib['date-time']));
}(this, (function (exports, dateTime) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/time-span/time-span.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var x = undefined;
    /**
     * @record
     */
    function TimeSpanWithNumberProps() { }
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
                        _this[key] = new dateTime.TimePrimitive(_this[key]);
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

    exports.TimeSpan = TimeSpan;
    exports.x = x;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=kleiolab-lib-utils.umd.js.map
