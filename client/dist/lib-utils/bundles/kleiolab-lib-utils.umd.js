(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('ramda'), require('rxjs-spy/operators')) :
    typeof define === 'function' && define.amd ? define('@kleiolab/lib-utils', ['exports', '@angular/common', '@angular/core', 'rxjs', 'rxjs/operators', 'ramda', 'rxjs-spy/operators'], factory) :
    (global = global || self, factory((global.kleiolab = global.kleiolab || {}, global.kleiolab['lib-utils'] = {}), global.ng.common, global.ng.core, global.rxjs, global.rxjs.operators, global.ramda, global.operators$1));
}(this, (function (exports, common, core, rxjs, operators, ramda, operators$1) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/date-time/classes/date-time-commons.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var   /**
     * @abstract
     */
    DateTimeCommons = /** @class */ (function () {
        function DateTimeCommons(data) {
            /**
             * Properties
             */
            this.onDateChange = new core.EventEmitter();
            Object.assign(this, data);
        }
        Object.defineProperty(DateTimeCommons.prototype, "year", {
            get: /**
             * @return {?}
             */
            function () {
                return this._year;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this._year = val;
                this.emitDateChange();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTimeCommons.prototype, "month", {
            get: /**
             * @return {?}
             */
            function () {
                return this._month;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this._month = val;
                this.emitDateChange();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTimeCommons.prototype, "day", {
            get: /**
             * @return {?}
             */
            function () {
                return this._day;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this._day = val;
                this.emitDateChange();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTimeCommons.prototype, "hours", {
            get: /**
             * @return {?}
             */
            function () {
                return this._hours;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this._hours = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTimeCommons.prototype, "minutes", {
            get: /**
             * @return {?}
             */
            function () {
                return this._minutes;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this._minutes = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTimeCommons.prototype, "seconds", {
            get: /**
             * @return {?}
             */
            function () {
                return this._seconds;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this._seconds = val;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * Returns the running day for given month and day with consideration of the
        * isLeap boolean that indicates leap years. Inspired by:
        * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_julianischem_Kalender
        *
        * @param month 1=january .. 12=december
        * @param day 1, 2 .. 31
        * @param isLeap if true, this is a leap year
        */
        /**
         * Returns the running day for given month and day with consideration of the
         * isLeap boolean that indicates leap years. Inspired by:
         * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_julianischem_Kalender
         *
         * @param {?} month 1=january .. 12=december
         * @param {?} day 1, 2 .. 31
         * @param {?} isLeap if true, this is a leap year
         * @return {?}
         */
        DateTimeCommons.prototype.calcRunningDay = /**
         * Returns the running day for given month and day with consideration of the
         * isLeap boolean that indicates leap years. Inspired by:
         * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_julianischem_Kalender
         *
         * @param {?} month 1=january .. 12=december
         * @param {?} day 1, 2 .. 31
         * @param {?} isLeap if true, this is a leap year
         * @return {?}
         */
        function (month, day, isLeap) {
            // if no month or day provided, let's start at 1
            day = (day === undefined || day === null) ? 1 : day;
            month = (month === undefined || month === null) ? 1 : month;
            // month corrections (note that january has index 0)
            /** @type {?} */
            var monthCorrenctions = [-1, 0, -2, -1, -1, 0, 0, 1, +2, +2, +3, +3];
            // leap year correction
            /** @type {?} */
            var lc = 0;
            if (isLeap && month > 2) {
                lc = 1;
            }
            // month correction
            /** @type {?} */
            var mc = monthCorrenctions[month - 1];
            return day + (30 * (month - 1)) + (lc + mc);
        };
        /**
        * Returns the month and day for given running day with consideration of the
        * isLeap boolean that indicates leap years. Inspired by:
        * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_julianischem_Kalender
        *
        * @param runningDay 1, 2 .. 365
        * @param isLeap if true, this is a leap year
        *
        */
        /**
         * Returns the month and day for given running day with consideration of the
         * isLeap boolean that indicates leap years. Inspired by:
         * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_julianischem_Kalender
         *
         * @param {?} runningDay 1, 2 .. 365
         * @param {?} isLeap if true, this is a leap year
         *
         * @return {?}
         */
        DateTimeCommons.prototype.calcDateByRunningDay = /**
         * Returns the month and day for given running day with consideration of the
         * isLeap boolean that indicates leap years. Inspired by:
         * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_julianischem_Kalender
         *
         * @param {?} runningDay 1, 2 .. 365
         * @param {?} isLeap if true, this is a leap year
         *
         * @return {?}
         */
        function (runningDay, isLeap) {
            // month corrections (note that january has index 0)
            /** @type {?} */
            var monthCorrenctions = [-1, 0, -2, -1, -1, 0, 0, 1, +2, +2, +3, +3];
            // resulting month
            /** @type {?} */
            var month = Math.floor((runningDay + 1) / 30) + 1;
            // month correction
            /** @type {?} */
            var mc = monthCorrenctions[month - 1];
            // leap year correction
            /** @type {?} */
            var lc = 0;
            if (isLeap && month > 2) {
                lc = 1;
            }
            // resulting day
            /** @type {?} */
            var day = runningDay - 30 * (month - 1) - (lc + mc);
            // check if month and day still valid
            if (month > 12 || day < 1) {
                month--;
                if (month < 1) {
                    isLeap = !isLeap;
                }
                // leap year correction
                lc = 0;
                if (isLeap && month > 2) {
                    lc = 1;
                }
                // month correction
                mc = monthCorrenctions[month - 1];
                // resulting day
                day = runningDay - 30 * (month - 1) - (lc + mc);
            }
            return { day: day, month: month };
        };
        /**
         * @return {?}
         */
        DateTimeCommons.prototype.emitDateChange = /**
         * @return {?}
         */
        function () {
            this.onDateChange.emit({
                year: this.year,
                month: this.month,
                day: this.day
            });
        };
        /**
         * @return {?}
         */
        DateTimeCommons.prototype.getGranularity = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var duration;
            if (this.year) {
                duration = '1 year';
            }
            if (this.month) {
                duration = '1 month';
            }
            if (this.day) {
                duration = '1 day';
            }
            if (this.hours) {
                duration = '1 hour';
            }
            if (this.minutes) {
                duration = '1 minute';
            }
            if (this.seconds) {
                duration = '1 second';
            }
            return duration;
        };
        /**
         * @return {?}
         */
        DateTimeCommons.prototype.getTimeStamp = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var timestamp = '';
            timestamp = this.year ? this.pad(Math.abs(this.year), 4) : '01';
            timestamp += '-';
            timestamp += this.month ? this.pad(this.month, 2) : '01';
            timestamp += '-';
            timestamp += this.day ? this.pad(this.day, 2) : '01';
            timestamp += ' ';
            timestamp += this.hours ? this.pad(this.hours, 2) : '00';
            timestamp += ':';
            timestamp += this.minutes ? this.pad(this.minutes, 2) : '00';
            timestamp += ':';
            timestamp += this.seconds ? this.pad(this.seconds, 2) : '00';
            timestamp += this.year < 0 ? ' BC' : '';
            return timestamp;
        };
        /**
         * @return {?}
         */
        DateTimeCommons.prototype.getDate = /**
         * @return {?}
         */
        function () {
            // validate
            if (!this.year && this.year !== 0)
                return null;
            if (this.day && !this.month)
                return null;
            if (this.hours && !this.day)
                return null;
            if (this.minutes && !this.hours)
                return null;
            if (this.seconds && !this.hours)
                return null;
            // creat date
            /** @type {?} */
            var date = new Date();
            date.setFullYear(this.year < 0 ? this.year + 1 : this.year);
            date.setMonth((this.month ? (this.month - 1) : 0));
            date.setDate((this.day ? this.day : 1));
            date.setHours(this.hours ? this.hours : 0);
            date.setMinutes(this.minutes ? this.minutes : 0);
            date.setSeconds(this.seconds ? this.seconds : 0);
            return date;
        };
        /**
         * @param {?} number
         * @param {?} width
         * @param {?=} z
         * @return {?}
         */
        DateTimeCommons.prototype.pad = /**
         * @param {?} number
         * @param {?} width
         * @param {?=} z
         * @return {?}
         */
        function (number, width, z) {
            if (z === void 0) { z = '0'; }
            /** @type {?} */
            var n = number.toString();
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        };
        /**
         * @return {?}
         */
        DateTimeCommons.prototype.addYear = /**
         * @return {?}
         */
        function () {
            this.year++;
            if (this.year === 0)
                this.year++;
            if (this.day > this.lengthOfMonth()) {
                this.day = this.lengthOfMonth();
            }
        };
        /**
         * @return {?}
         */
        DateTimeCommons.prototype.addMonth = /**
         * @return {?}
         */
        function () {
            this.month++;
            if (this.month > 12) {
                this.month = 1;
                this.addYear();
            }
            else if (this.day > this.lengthOfMonth()) {
                this.day = this.lengthOfMonth();
            }
        };
        /**
         * @return {?}
         */
        DateTimeCommons.prototype.addDay = /**
         * @return {?}
         */
        function () {
            this.day++;
            if (this.day > this.lengthOfMonth()) {
                this.day = 1;
                this.addMonth();
            }
        };
        /**
         * @return {?}
         */
        DateTimeCommons.prototype.addHour = /**
         * @return {?}
         */
        function () {
            this.hours++;
            if (this.hours > 23) {
                this.hours = 0;
                this.addDay();
            }
        };
        /**
         * @return {?}
         */
        DateTimeCommons.prototype.addMinute = /**
         * @return {?}
         */
        function () {
            this.minutes++;
            if (this.minutes > 59) {
                this.minutes = 0;
                this.addHour();
            }
        };
        /**
         * @return {?}
         */
        DateTimeCommons.prototype.addSecond = /**
         * @return {?}
         */
        function () {
            this.seconds++;
            if (this.seconds > 59) {
                this.seconds = 0;
                this.addMinute();
            }
        };
        /**
         * @return {?}
         */
        DateTimeCommons.prototype.removeYear = /**
         * @return {?}
         */
        function () {
            this.year--;
            if (this.year === 0) {
                this.year = -1;
            }
            if (this.day > this.lengthOfMonth()) {
                this.day = this.lengthOfMonth();
            }
        };
        /**
         * @return {?}
         */
        DateTimeCommons.prototype.removeMonth = /**
         * @return {?}
         */
        function () {
            this.month--;
            if (this.month < 1) {
                this.month = 12;
                this.removeYear();
            }
            else if (this.day > this.lengthOfMonth()) {
                this.day = this.lengthOfMonth();
            }
        };
        /**
         * @return {?}
         */
        DateTimeCommons.prototype.removeDay = /**
         * @return {?}
         */
        function () {
            this.day--;
            if (this.day < 1) {
                this.removeMonth();
                this.day = this.lengthOfMonth();
            }
        };
        /**
         * @return {?}
         */
        DateTimeCommons.prototype.removeHour = /**
         * @return {?}
         */
        function () {
            this.hours--;
            if (this.hours < 0 || !this.hours) {
                this.hours = 23;
                this.removeDay();
            }
        };
        /**
         * @return {?}
         */
        DateTimeCommons.prototype.removeMinute = /**
         * @return {?}
         */
        function () {
            this.minutes--;
            if (this.minutes < 0 || !this.minutes) {
                this.minutes = 59;
                this.removeHour();
            }
        };
        /**
         * @return {?}
         */
        DateTimeCommons.prototype.removeSecond = /**
         * @return {?}
         */
        function () {
            this.seconds--;
            if (this.seconds < 0 || !this.seconds) {
                this.seconds = 59;
                this.removeMinute();
            }
        };
        /**
         * @param {?} quantity
         * @return {?}
         */
        DateTimeCommons.prototype.addDays = /**
         * @param {?} quantity
         * @return {?}
         */
        function (quantity) {
            for (var i = 0; i < quantity; i++) {
                this.addDay();
            }
            ;
        };
        /**
         * @param {?} quantity
         * @return {?}
         */
        DateTimeCommons.prototype.addMonths = /**
         * @param {?} quantity
         * @return {?}
         */
        function (quantity) {
            for (var i = 0; i < quantity; i++) {
                this.addMonth();
            }
            ;
        };
        /**
         * @param {?} quantity
         * @return {?}
         */
        DateTimeCommons.prototype.addYears = /**
         * @param {?} quantity
         * @return {?}
         */
        function (quantity) {
            for (var i = 0; i < quantity; i++) {
                this.addYear();
            }
            ;
        };
        /**
         * @param {?} duration
         * @return {?}
         */
        DateTimeCommons.prototype.add = /**
         * @param {?} duration
         * @return {?}
         */
        function (duration) {
            if (duration === '1 year') {
                this.addYear();
            }
            else if (duration === '1 month') {
                this.addMonth();
            }
            else if (duration === '1 day') {
                this.addDay();
            }
            else if (duration === '1 hour') {
                this.addHour();
            }
            else if (duration === '1 minute') {
                this.addMinute();
            }
            else if (duration === '1 second') {
                this.addSecond();
            }
        };
        /**
         * @param {?} duration
         * @return {?}
         */
        DateTimeCommons.prototype.toLastSecondOf = /**
         * @param {?} duration
         * @return {?}
         */
        function (duration) {
            this.add(duration);
            this.removeSecond();
        };
        return DateTimeCommons;
    }());
    if (false) {
        /**
         * Properties
         * @type {?}
         */
        DateTimeCommons.prototype.onDateChange;
        /**
         * @type {?}
         * @private
         */
        DateTimeCommons.prototype._year;
        /**
         * @type {?}
         * @private
         */
        DateTimeCommons.prototype._month;
        /**
         * @type {?}
         * @private
         */
        DateTimeCommons.prototype._day;
        /**
         * @type {?}
         * @private
         */
        DateTimeCommons.prototype._hours;
        /**
         * @type {?}
         * @private
         */
        DateTimeCommons.prototype._minutes;
        /**
         * @type {?}
         * @private
         */
        DateTimeCommons.prototype._seconds;
        /**
         * @abstract
         * @return {?}
         */
        DateTimeCommons.prototype.lengthOfMonth = function () { };
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/date-time/classes/julian-date-time.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Class to represent a Julian Date and Time
     * TODO: Move this class to common folder as it is needed by server and client
     */
    var   /**
     * Class to represent a Julian Date and Time
     * TODO: Move this class to common folder as it is needed by server and client
     */
    JulianDateTime = /** @class */ (function (_super) {
        __extends(JulianDateTime, _super);
        function JulianDateTime() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
        * Methods
        */
        /**
         * Methods
         * @param {?=} duration
         * @return {?}
         */
        JulianDateTime.prototype.getEndOf = /**
         * Methods
         * @param {?=} duration
         * @return {?}
         */
        function (duration) {
            if (duration === void 0) { duration = this.getGranularity(); }
            /** @type {?} */
            var dt = new JulianDateTime(this);
            dt.toLastSecondOf(duration);
            return dt;
        };
        /**
         * @return {?}
         */
        JulianDateTime.prototype.lengthOfMonth = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var y = this.year;
            /** @type {?} */
            var m = this.month;
            // Assume not leap year by default (note zero index for Jan)
            /** @type {?} */
            var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            // If evenly divisible by 4 and not one of the years 5 BC, 1 BC or 4 AD,
            // when Augustus dropped the leap year
            if (!(y % 4) && !(y == -5) && !(y == -1) && !(y == 4)) {
                daysInMonth[1] = 29;
            }
            return daysInMonth[--m];
        };
        /**
        * Convert the year, month, day of julian calendar to julian day
        *
        * @return  description
        */
        /**
         * Convert the year, month, day of julian calendar to julian day
         *
         * @return {?} description
         */
        JulianDateTime.prototype.getJulianDay = /**
         * Convert the year, month, day of julian calendar to julian day
         *
         * @return {?} description
         */
        function () {
            // running day (conut of days that year)
            /** @type {?} */
            var runningDay = this.calcRunningDay(this.month, this.day, this.isLeapYear());
            /** @type {?} */
            var runningYear;
            if (this.year < 0) {
                // running year
                runningYear = 4716 + this.year;
            }
            else {
                // running year
                runningYear = 4715 + this.year;
            }
            // number of full 4 year cycles
            /** @type {?} */
            var n4 = Math.floor(runningYear / 4)
            // rest of division: number of full years of the last uncomplete 4 years cycle
            ;
            // rest of division: number of full years of the last uncomplete 4 years cycle
            /** @type {?} */
            var n1 = runningYear % 4;
            return 1461 * n4 + 365 * (n1 - 3) + runningDay;
        };
        /**
         * @template THIS
         * @this {THIS}
         * @param {?} julianDay
         * @return {THIS}
         */
        JulianDateTime.prototype.fromJulianDay = /**
         * @template THIS
         * @this {THIS}
         * @param {?} julianDay
         * @return {THIS}
         */
        function (julianDay) {
            if (typeof julianDay === 'string') {
                julianDay = parseInt(julianDay, 10);
            }
            // number of full 4 year cycles
            /** @type {?} */
            var n4 = Math.floor((julianDay + (3 * 365)) / 1461);
            // number of days of the last uncomplete 4 years cycle
            /** @type {?} */
            var r4 = (julianDay + (3 * 365)) % 1461;
            // number of full years of the last uncomplete 4 years cycle
            /** @type {?} */
            var n1 = Math.floor(r4 / 365);
            // number of days in the last year
            /** @type {?} */
            var dayOfYear = r4 % 365;
            if (n1 === 4) {
                n1 = 3;
                dayOfYear = 365;
            }
            // running year
            /** @type {?} */
            var runningYear = 4 * n4 + n1;
            // if BC
            if (runningYear <= 4715) {
                // resulting year
                (/** @type {?} */ (this)).year = runningYear - 4716;
                // if AD
            }
            else {
                (/** @type {?} */ (this)).year = runningYear - 4715;
            }
            /** @type {?} */
            var monthDay = (/** @type {?} */ (this)).calcDateByRunningDay(dayOfYear, (/** @type {?} */ (this)).isLeapYear())
            // resulting month
            ;
            // resulting month
            (/** @type {?} */ (this)).month = monthDay.month;
            // resulting day
            (/** @type {?} */ (this)).day = monthDay.day;
            return (/** @type {?} */ (this));
        };
        /**
        * Returns true if given year is a leap year
        */
        /**
         * Returns true if given year is a leap year
         * @return {?}
         */
        JulianDateTime.prototype.isLeapYear = /**
         * Returns true if given year is a leap year
         * @return {?}
         */
        function () {
            // Return true if evenly divisible by 4
            return !(this.year % 4) ? true : false;
        };
        /**
         * @return {?}
         */
        JulianDateTime.prototype.getJulianSecond = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var seconds = this.getJulianDay() * 60 * 60 * 24;
            if (this.seconds > 0)
                seconds = seconds + this.seconds;
            if (this.minutes > 0)
                seconds = seconds + this.minutes * 60;
            if (this.hours > 0)
                seconds = seconds + this.hours * 60 * 60;
            return seconds;
        };
        /**
         * Set this JulianDateTime from given julian second
         * @param julianSecond julian second
         */
        /**
         * Set this JulianDateTime from given julian second
         * @template THIS
         * @this {THIS}
         * @param {?} julianSecond julian second
         * @return {THIS}
         */
        JulianDateTime.prototype.fromJulianSecond = /**
         * Set this JulianDateTime from given julian second
         * @template THIS
         * @this {THIS}
         * @param {?} julianSecond julian second
         * @return {THIS}
         */
        function (julianSecond) {
            /** @type {?} */
            var secsPerDay = 60 * 60 * 24;
            // number of full days
            /** @type {?} */
            var julianDay = Math.floor(julianSecond / secsPerDay);
            // number of seconds of the julian day
            /** @type {?} */
            var secsOfDay = julianSecond % secsPerDay;
            // number of ours of the day
            (/** @type {?} */ (this)).hours = Math.floor(secsOfDay / (60 * 60));
            // number of seconds of the last hour
            /** @type {?} */
            var secsOfHour = (/** @type {?} */ (this)).hours % (60 * 60);
            // number of ours of the day
            (/** @type {?} */ (this)).minutes = Math.floor(secsOfHour / 60);
            // secs of the last minute
            (/** @type {?} */ (this)).seconds = (/** @type {?} */ (this)).minutes % 60;
            return (/** @type {?} */ (this)).fromJulianDay(julianDay);
        };
        return JulianDateTime;
    }(DateTimeCommons));

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/date-time/classes/gregorian-date-time.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Class to represent a Julian Date and Time
     * TODO: Move this class to common folder as it is needed by server and client
     */
    var   /**
     * Class to represent a Julian Date and Time
     * TODO: Move this class to common folder as it is needed by server and client
     */
    GregorianDateTime = /** @class */ (function (_super) {
        __extends(GregorianDateTime, _super);
        function GregorianDateTime() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @return {?}
         */
        GregorianDateTime.prototype.lengthOfMonth = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var y = this.year;
            /** @type {?} */
            var m = this.month;
            if (!(m > 0) && !(m <= 12)) {
                return undefined;
            }
            // Assume not leap year by default (note zero index for Jan)
            /** @type {?} */
            var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            // If evenly divisible by 4 and not evenly divisible by 100,
            // or is evenly divisible by 400, then a leap year
            if (this.isLeapYear()) {
                daysInMonth[1] = 29;
            }
            return daysInMonth[--m];
        };
        /**
         * @param {?=} duration
         * @return {?}
         */
        GregorianDateTime.prototype.getEndOf = /**
         * @param {?=} duration
         * @return {?}
         */
        function (duration) {
            if (duration === void 0) { duration = this.getGranularity(); }
            /** @type {?} */
            var dt = new GregorianDateTime(this);
            dt.toLastSecondOf(duration);
            return dt;
        };
        /**
         * getJulianDay - Implemented according to this page [2018-03-12]:
         * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_gregorianischem_Kalender
         *
         * @return  description
         */
        /**
         * getJulianDay - Implemented according to this page [2018-03-12]:
         * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_gregorianischem_Kalender
         *
         * @return {?} description
         */
        GregorianDateTime.prototype.getJulianDay = /**
         * getJulianDay - Implemented according to this page [2018-03-12]:
         * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_gregorianischem_Kalender
         *
         * @return {?} description
         */
        function () {
            // running day (conut of days that year)
            /** @type {?} */
            var runningDay = this.calcRunningDay(this.month, this.day, this.isLeapYear());
            // running year
            /** @type {?} */
            var runningYear = this.year - 1;
            // julian day of year 1 AD
            /** @type {?} */
            var julianDay0 = 1721426;
            // number of full 400 year cycles
            /** @type {?} */
            var n400 = Math.floor(runningYear / 400);
            // rest of division: number of years of the last uncomplete 400 years cycle
            /** @type {?} */
            var r400 = runningYear % 400;
            // number of full 100 year cycles
            /** @type {?} */
            var n100 = Math.floor(r400 / 100)
            // rest of division: number of years of the last uncomplete 100 years cycle
            ;
            // rest of division: number of years of the last uncomplete 100 years cycle
            /** @type {?} */
            var r100 = r400 % 100;
            // number of full 4 year cycles
            /** @type {?} */
            var n4 = Math.floor(r100 / 4)
            // rest of division: number of full years of the last uncomplete 4 years cycle
            ;
            // rest of division: number of full years of the last uncomplete 4 years cycle
            /** @type {?} */
            var n1 = r100 % 4;
            return julianDay0 + n400 * 146097 + n100 * 36524 + n4 * 1461 + n1 * 365 + runningDay;
        };
        /**
         * @template THIS
         * @this {THIS}
         * @param {?} julianDay
         * @return {THIS}
         */
        GregorianDateTime.prototype.fromJulianDay = /**
         * @template THIS
         * @this {THIS}
         * @param {?} julianDay
         * @return {THIS}
         */
        function (julianDay) {
            if (typeof julianDay === 'string') {
                julianDay = parseInt(julianDay);
            }
            // julian day of year 1 AD
            /** @type {?} */
            var julianDay0 = 1721426;
            /** @type {?} */
            var firstDayOfGregorianCal = 2299161;
            // conversion of julian day earlier than the introduction of
            // the gregorian calendar October 15th of 1582 are calculated
            // with the julian calendar algoritms
            if (julianDay < firstDayOfGregorianCal) {
                /** @type {?} */
                var jdt = new JulianDateTime().fromJulianDay(julianDay);
                (/** @type {?} */ (this)).year = jdt.year;
                (/** @type {?} */ (this)).month = jdt.month;
                (/** @type {?} */ (this)).day = jdt.day;
            }
            else {
                // number of full 400 year cycles
                /** @type {?} */
                var n400 = Math.floor((julianDay - julianDay0) / 146097);
                // number of days of the last uncomplete 400 years cycle
                /** @type {?} */
                var r400 = (julianDay - julianDay0) % 146097;
                // number of full 100 year cycles
                /** @type {?} */
                var n100 = Math.floor(r400 / 36524);
                // number of days of the last uncomplete 100 years cycle
                /** @type {?} */
                var r100 = r400 % 36524;
                if (n100 === 4) {
                    n100 = 3;
                    r100 = 36524;
                }
                // number of full 4 year cycles
                /** @type {?} */
                var n4 = Math.floor(r100 / 1461);
                // number of days of the last uncomplete 4 years cycle
                /** @type {?} */
                var r4 = r100 % 1461;
                // number of full years of the last uncomplete 4 years cycle
                /** @type {?} */
                var n1 = Math.floor(r4 / 365);
                // number of days in the last year
                /** @type {?} */
                var runningDay = r4 % 365;
                if (n1 === 4) {
                    n1 = 3;
                    runningDay = 365;
                }
                // running year
                /** @type {?} */
                var runningYear = 400 * n400 + 100 * n100 + 4 * n4 + n1;
                // resulting year
                (/** @type {?} */ (this)).year = runningYear + 1;
                /** @type {?} */
                var monthDay = (/** @type {?} */ (this)).calcDateByRunningDay(runningDay, (/** @type {?} */ (this)).isLeapYear())
                // resulting month
                ;
                // resulting month
                (/** @type {?} */ (this)).month = monthDay.month;
                // resulting day
                (/** @type {?} */ (this)).day = monthDay.day;
            }
            return (/** @type {?} */ (this));
        };
        /**
         * Returns true if given year is a leap year
         */
        /**
         * Returns true if given year is a leap year
         * @return {?}
         */
        GregorianDateTime.prototype.isLeapYear = /**
         * Returns true if given year is a leap year
         * @return {?}
         */
        function () {
            /** @type {?} */
            var year = this.year;
            // Return true if evenly divisible by 4 and not evenly divisible by 100,
            // or is evenly divisible by 400, then a leap year
            return ((!(year % 4) && year % 100) || !(year % 400)) ? true : false;
        };
        /**
         * returns julian day in seconds
         *
         * TODO: return julian day plus time in seconds
         */
        /**
         * returns julian day in seconds
         *
         * TODO: return julian day plus time in seconds
         * @return {?}
         */
        GregorianDateTime.prototype.getJulianSecond = /**
         * returns julian day in seconds
         *
         * TODO: return julian day plus time in seconds
         * @return {?}
         */
        function () {
            /** @type {?} */
            var seconds = this.getJulianDay() * 60 * 60 * 24;
            if (this.seconds > 0)
                seconds = seconds + this.seconds;
            if (this.minutes > 0)
                seconds = seconds + this.minutes * 60;
            if (this.hours > 0)
                seconds = seconds + this.hours * 60 * 60;
            return seconds;
        };
        /**
         * Set this JulianDateTime from given julian second
         * @param julianSecond julian second
         */
        /**
         * Set this JulianDateTime from given julian second
         * @template THIS
         * @this {THIS}
         * @param {?} julianSecond julian second
         * @return {THIS}
         */
        GregorianDateTime.prototype.fromJulianSecond = /**
         * Set this JulianDateTime from given julian second
         * @template THIS
         * @this {THIS}
         * @param {?} julianSecond julian second
         * @return {THIS}
         */
        function (julianSecond) {
            /** @type {?} */
            var secsPerDay = 60 * 60 * 24;
            // number of full days
            /** @type {?} */
            var julianDay = Math.floor(julianSecond / secsPerDay);
            // number of seconds of the julian day
            /** @type {?} */
            var secsOfDay = julianSecond % secsPerDay;
            // number of ours of the day
            (/** @type {?} */ (this)).hours = Math.floor(secsOfDay / (60 * 60));
            // number of seconds of the last hour
            /** @type {?} */
            var secsOfHour = (/** @type {?} */ (this)).hours % (60 * 60);
            // number of ours of the day
            (/** @type {?} */ (this)).minutes = Math.floor(secsOfHour / 60);
            // secs of the last minute
            (/** @type {?} */ (this)).seconds = (/** @type {?} */ (this)).minutes % 60;
            return (/** @type {?} */ (this)).fromJulianDay(julianDay);
        };
        return GregorianDateTime;
    }(DateTimeCommons));

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/date-time/classes/time-primitive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TimePrimitive = /** @class */ (function () {
        function TimePrimitive(data) {
            // Last day of the era before christ
            this.LAST_DAY_BC = 1721422;
            Object.assign(this, data);
            if (((/** @type {?} */ (data))).julian_day)
                this.julianDay = ((/** @type {?} */ (data))).julian_day;
        }
        /**
         * @return {?}
         */
        TimePrimitive.prototype.getGregorianDateTime = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var g = new GregorianDateTime();
            g.fromJulianDay(this.julianDay);
            return g;
        };
        /**
         * @return {?}
         */
        TimePrimitive.prototype.getJulianDateTime = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var j = new JulianDateTime();
            j.fromJulianDay(this.julianDay);
            return j;
        };
        /**
         * Get a DateTime object according to the given calendar.
         *
         */
        /**
         * Get a DateTime object according to the given calendar.
         *
         * @param {?=} calendar
         * @return {?}
         */
        TimePrimitive.prototype.getDateTime = /**
         * Get a DateTime object according to the given calendar.
         *
         * @param {?=} calendar
         * @return {?}
         */
        function (calendar) {
            if (calendar === void 0) { calendar = this.calendar; }
            if (!calendar)
                return null;
            if (calendar === 'gregorian')
                return this.getGregorianDateTime();
            if (calendar === 'julian')
                return this.getJulianDateTime();
        };
        /**
         * Get a Date object according to the given calendar.
         *
         */
        /**
         * Get a Date object according to the given calendar.
         *
         * @param {?=} calendar
         * @return {?}
         */
        TimePrimitive.prototype.getDate = /**
         * Get a Date object according to the given calendar.
         *
         * @param {?=} calendar
         * @return {?}
         */
        function (calendar) {
            if (calendar === void 0) { calendar = this.calendar; }
            return this.getDateTime(calendar).getDate();
        };
        /**
         * Get a string that defines the format usable with the DatePipe,
         * a according to the given granularity
         */
        /**
         * Get a string that defines the format usable with the DatePipe,
         * a according to the given granularity
         * @param {?} granularity
         * @return {?}
         */
        TimePrimitive.prototype.getDateFormatString = /**
         * Get a string that defines the format usable with the DatePipe,
         * a according to the given granularity
         * @param {?} granularity
         * @return {?}
         */
        function (granularity) {
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
        };
        /**
         * Get a display label of the current TimePrimitive.
         */
        /**
         * Get a display label of the current TimePrimitive.
         * @return {?}
         */
        TimePrimitive.prototype.getShortesDateFormatString = /**
         * Get a display label of the current TimePrimitive.
         * @return {?}
         */
        function () {
            return this.getDateFormatString(this.duration);
        };
        /**
         * Get the julian day in seconds
         * TODO: integrate time
        */
        /**
         * Get the julian day in seconds
         * TODO: integrate time
         * @return {?}
         */
        TimePrimitive.prototype.getJulianSecond = /**
         * Get the julian day in seconds
         * TODO: integrate time
         * @return {?}
         */
        function () {
            return this.julianDay * 60 * 60 * 24;
        };
        /**
         * Get the last second of this TimePrimitive. This depends on the calendar,
         * since the month february and leap years differ from one calendar to the other
         *
         */
        /**
         * Get the last second of this TimePrimitive. This depends on the calendar,
         * since the month february and leap years differ from one calendar to the other
         *
         * @param {?=} calendar
         * @return {?}
         */
        TimePrimitive.prototype.getLastSecond = /**
         * Get the last second of this TimePrimitive. This depends on the calendar,
         * since the month february and leap years differ from one calendar to the other
         *
         * @param {?=} calendar
         * @return {?}
         */
        function (calendar) {
            if (calendar === void 0) { calendar = this.calendar; }
            /** @type {?} */
            var dt = this.getDateTime();
            return dt.getEndOf(this.duration).getJulianSecond();
        };
        return TimePrimitive;
    }());
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

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/date-time/pipes/time-primitive.pipe.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TimePrimitivePipe = /** @class */ (function () {
        function TimePrimitivePipe(datePipe) {
            this.datePipe = datePipe;
        }
        /**
         * @param {?} timePrimitive
         * @return {?}
         */
        TimePrimitivePipe.prototype.transform = /**
         * @param {?} timePrimitive
         * @return {?}
         */
        function (timePrimitive) {
            if (!timePrimitive)
                return null;
            /** @type {?} */
            var tp = new TimePrimitive(timePrimitive);
            if (!tp)
                return null;
            /** @type {?} */
            var dt = tp.getDateTime();
            if (!dt)
                return null;
            // This is a hack for dataPipe, because datePipe subtracts 1 year from BC
            // Probably to avoid the year 0
            if (dt.year < 0)
                dt.year = dt.year + 1;
            if (!dt.day)
                dt.day = 31;
            /** @type {?} */
            var date = dt.getDate();
            return this.datePipe.transform(date, tp.getShortesDateFormatString());
        };
        TimePrimitivePipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'timePrimitive'
                    },] }
        ];
        /** @nocollapse */
        TimePrimitivePipe.ctorParameters = function () { return [
            { type: common.DatePipe }
        ]; };
        return TimePrimitivePipe;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        TimePrimitivePipe.prototype.datePipe;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/date-time/classes/time-span-util.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var x = undefined;
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
     * Generated from: lib/date-time/pipes/time-span.pipe.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TimeSpanPipe = /** @class */ (function () {
        function TimeSpanPipe(timePrimitivePipe) {
            this.timePrimitivePipe = timePrimitivePipe;
        }
        /**
         * @param {?} timeSpan
         * @return {?}
         */
        TimeSpanPipe.prototype.transform = /**
         * @param {?} timeSpan
         * @return {?}
         */
        function (timeSpan) {
            if (!timeSpan)
                return null;
            /** @type {?} */
            var ts = new TimeSpanUtil(timeSpan).getPrimitivesForPreview();
            // nothing
            if (!ts.single && !ts.begin && !ts.end)
                return '';
            // only sinlge
            if (ts.single && !(ts.begin || ts.end))
                return this.getString(ts.single);
            // only begin and end
            if (ts.begin && ts.end && !ts.single)
                return this.getString(ts.begin) + ' – ' + this.getString(ts.end);
            // only sinlge and end
            if (ts.single && ts.end && !ts.begin)
                return this.getString(ts.single) + ' – ' + this.getString(ts.end);
            // only begin and sinlge
            if (ts.begin && ts.single && !ts.end)
                return this.getString(ts.begin) + ' – ' + this.getString(ts.single);
            // all three
            return this.getString(ts.begin) + ' – ' + this.getString(ts.end);
        };
        /**
         * @param {?} t
         * @return {?}
         */
        TimeSpanPipe.prototype.getString = /**
         * @param {?} t
         * @return {?}
         */
        function (t) {
            /** @type {?} */
            var s = this.timePrimitivePipe.transform(t);
            return s ? s : '(?)';
        };
        TimeSpanPipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'timeSpan'
                    },] }
        ];
        /** @nocollapse */
        TimeSpanPipe.ctorParameters = function () { return [
            { type: TimePrimitivePipe }
        ]; };
        return TimeSpanPipe;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        TimeSpanPipe.prototype.timePrimitivePipe;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/date-time/date-time.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DateTimeModule = /** @class */ (function () {
        function DateTimeModule() {
        }
        DateTimeModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                        ],
                        providers: [
                            TimePrimitivePipe,
                            TimeSpanPipe,
                            common.DatePipe
                        ],
                        declarations: [
                            TimeSpanPipe,
                            TimePrimitivePipe,
                        ],
                        exports: [
                            TimeSpanPipe,
                            TimePrimitivePipe,
                        ]
                    },] }
        ];
        return DateTimeModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/date-time/classes/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/date-time/pipes/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/date-time/public-api.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/date-time/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/functions/combineLatestOrEmpty.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Combine Latest or, if input is an empty array, emit empty array
     * @template I
     * @param {?} obs
     * @return {?}
     */
    function combineLatestOrEmpty(obs) {
        obs = __spread([rxjs.of(null)], obs);
        return rxjs.combineLatest(obs).pipe(operators.map((/**
         * @param {?} values
         * @return {?}
         */
        function (values) {
            values.shift();
            return values;
        })));
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/functions/util.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function LabelGeneratorSettings() { }
    if (false) {
        /** @type {?|undefined} */
        LabelGeneratorSettings.prototype.fieldsMax;
        /** @type {?|undefined} */
        LabelGeneratorSettings.prototype.statementsMax;
        /** @type {?} */
        LabelGeneratorSettings.prototype.path;
    }
    /**
     * Utilities class for static functions
     */
    var U = /** @class */ (function () {
        function U() {
        }
        /**
         * @template T
         * @param {?} obj
         * @return {?}
         */
        U.obj2Arr = /**
         * @template T
         * @param {?} obj
         * @return {?}
         */
        function (obj) {
            /** @type {?} */
            var arr = [];
            if (obj == undefined)
                return arr;
            Object.keys(obj).forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                arr.push(obj[key]);
            }));
            return arr;
        };
        /**
         * @template T
         * @param {?} obj
         * @return {?}
         */
        U.objNr2Arr = /**
         * @template T
         * @param {?} obj
         * @return {?}
         */
        function (obj) {
            /** @type {?} */
            var arr = [];
            if (obj == undefined)
                return arr;
            Object.keys(obj).forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                arr.push(obj[key]);
            }));
            return arr;
        };
        /**
         * converts object to array with {key: value} objects, e.g.:
         * {'a': 12, 'b': 99} --> [{key: 'a', value: 12, key: 'b', value: 99}]
         *
         * @param obj
         */
        /**
         * converts object to array with {key: value} objects, e.g.:
         * {'a': 12, 'b': 99} --> [{key: 'a', value: 12, key: 'b', value: 99}]
         *
         * @template T
         * @param {?} obj
         * @return {?}
         */
        U.obj2KeyValueArr = /**
         * converts object to array with {key: value} objects, e.g.:
         * {'a': 12, 'b': 99} --> [{key: 'a', value: 12, key: 'b', value: 99}]
         *
         * @template T
         * @param {?} obj
         * @return {?}
         */
        function (obj) {
            /** @type {?} */
            var keys = [];
            for (var key in obj) {
                if (obj[key]) {
                    keys.push({ key: key, value: obj[key] });
                }
            }
            return keys;
        };
        /**
         * @param {?} textProperties
         * @param {?} fkSystemType
         * @return {?}
         */
        U.firstProTextPropStringOfType = /**
         * @param {?} textProperties
         * @param {?} fkSystemType
         * @return {?}
         */
        function (textProperties, fkSystemType) {
            return (textProperties.find((/**
             * @param {?} t
             * @return {?}
             */
            function (t) { return t.fk_system_type === fkSystemType; })) || { string: '' }).string;
        };
        /**
        * Erzeugt eine UUID nach RFC 4122
        */
        /**
         * Erzeugt eine UUID nach RFC 4122
         * @return {?}
         */
        U.uuid = /**
         * Erzeugt eine UUID nach RFC 4122
         * @return {?}
         */
        function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (/**
             * @param {?} char
             * @return {?}
             */
            function (char) {
                /** @type {?} */
                var random = Math.random() * 16 | 0;
                // Nachkommastellen abschneiden
                /** @type {?} */
                var value = char === 'x' ? random : (random % 4 + 8);
                return value.toString(16); // Hexadezimales Zeichen zurückgeben
            }));
        };
        /**
         * @param {?} fkProp
         * @param {?} isOutgoing
         * @return {?}
         */
        U.propertyFieldKeyFromParams = /**
         * @param {?} fkProp
         * @param {?} isOutgoing
         * @return {?}
         */
        function (fkProp, isOutgoing) {
            return '_' + fkProp + '_' + (isOutgoing ? 'outgoing' : 'ingoing');
        };
        /**
         * Helper function that converts given number to string
         * but zero (=0) values return undefined.
         */
        /**
         * Helper function that converts given number to string
         * but zero (=0) values return undefined.
         * @param {?} val
         * @return {?}
         */
        U.toStr0undef = /**
         * Helper function that converts given number to string
         * but zero (=0) values return undefined.
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (val === 0)
                return undefined;
            else if (val === undefined)
                return undefined;
            else if (val === null)
                return undefined;
            else
                return val.toString();
        };
        /**
         * Helper function that converts given array to string
         *
         * If array contains 0, null or undefined, return underfined
         */
        /**
         * Helper function that converts given array to string
         *
         * If array contains 0, null or undefined, return underfined
         * @param {?} vals
         * @return {?}
         */
        U.toStrContains0undef = /**
         * Helper function that converts given array to string
         *
         * If array contains 0, null or undefined, return underfined
         * @param {?} vals
         * @return {?}
         */
        function (vals) {
            /** @type {?} */
            var string = '';
            for (var i = 0; i < vals.length; i++) {
                /** @type {?} */
                var val = vals[i];
                if (val === 0)
                    return undefined;
                else if (val === undefined)
                    return undefined;
                else if (val === null)
                    return undefined;
                else if (i === 0) {
                    string = val.toString();
                }
                else {
                    string = string + "_" + val.toString();
                }
            }
            return string;
        };
        U.recursiveMarkAsTouched = (/**
         * @param {?} f
         * @return {?}
         */
        function (f) {
            if (f.controls) {
                if (Array.isArray(f.controls)) {
                    // in this case it is a formArray
                    f.controls.forEach((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) {
                        c.markAsTouched();
                        if (c.controls)
                            U.recursiveMarkAsTouched(c);
                    }));
                }
                else {
                    // in this case it is a formGroup
                    if (f.controls['childControl']) {
                        /** @type {?} */
                        var c = (/** @type {?} */ (f.controls['childControl']));
                        c.markAsTouched();
                        if (c.controls)
                            U.recursiveMarkAsTouched(c);
                    }
                }
            }
        });
        return U;
    }());
    if (false) {
        /** @type {?} */
        U.recursiveMarkAsTouched;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/functions/custom-rxjs-operators.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     * @template T
     */
    function ByPk() { }
    /**
     * @record
     * @template T
     */
    function VersionEntity() { }
    if (false) {
        /** @type {?} */
        VersionEntity.prototype._latestVersion;
        /* Skipping unhandled member: [v: number]: T*/
    }
    /**
     * @record
     * @template T
     */
    function EntityVersionsByPk() { }
    /*****************************************************************************
     * Generic operators
     *****************************************************************************/
    /**
     * Returns an Observable that emits an flatened array consisting of the items of the arrays returned by getArrayFromItemFn.
     * @template T, R
     * @param {?} getArrayFromItemFn
     * @return {?}
     */
    function mapConcat(getArrayFromItemFn) {
        return operators.map((/**
         * @param {?} source
         * @return {?}
         */
        function (source) {
            if (typeof getArrayFromItemFn !== 'function') {
                throw new TypeError('argument is not a function.');
            }
            /** @type {?} */
            var concatenatedArray = [];
            source.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (item)
                    concatenatedArray = ramda.concat(concatenatedArray, getArrayFromItemFn(item));
            }));
            return concatenatedArray;
        }));
    }
    /**
     * Takes an object with EntityVersions indexed by pk
     * Returns an array containing the latest versions for each indexed entity
     * @template T
     * @return {?}
     */
    function latestEntityVersions() {
        return rxjs.pipe(operators.map((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return U.objNr2Arr(d); })), operators.map((/**
         * @param {?} a
         * @return {?}
         */
        function (a) { return a.map((/**
         * @param {?} q
         * @return {?}
         */
        function (q) { return q[q._latestVersion]; })); })));
    }
    /**
     * Takes an object with EntityVersions indexed by pk
     * Returns an the latest versions for entity with given pkEntity
     * @template T
     * @param {?} pkEntity
     * @return {?}
     */
    function latestEntityVersion(pkEntity) {
        return rxjs.pipe(operators.map((/**
         * @param {?} byPkEntity
         * @return {?}
         */
        function (byPkEntity) { return byPkEntity[pkEntity]; })), operators.filter((/**
         * @param {?} entityVersions
         * @return {?}
         */
        function (entityVersions) { return entityVersions && entityVersions._latestVersion !== undefined; })), operators.map((/**
         * @param {?} entityVersions
         * @return {?}
         */
        function (entityVersions) { return entityVersions[entityVersions._latestVersion]; })));
    }
    /**
     * @template T
     * @param {?} versions
     * @return {?}
     */
    function latestVersion(versions) {
        /** @type {?} */
        var latestVersion = 0;
        /** @type {?} */
        var latest;
        ramda.values(versions).forEach((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v.entity_version > latestVersion) {
                latestVersion = v.entity_version;
                latest = v;
            }
        }));
        return latest;
    }
    /**
     * @template T
     * @param {?} versions
     * @param {?} version
     * @return {?}
     */
    function getSpecificVersion(versions, version) {
        /** @type {?} */
        var ver = ramda.values(versions).find((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return v.entity_version === version; }));
        return ver;
    }
    /**
     * limits the number of items in array
     * @template T
     * @param {?=} limit
     * @return {?}
     */
    function limitTo(limit) {
        return operators.map((/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            if (!limit)
                return items;
            return items.slice(0, limit);
        }));
    }
    /**
     * limits the number of items in array
     * @template T
     * @param {?=} limit
     * @param {?=} offset
     * @return {?}
     */
    function limitOffset(limit, offset) {
        return operators.map((/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            if (!limit)
                return items;
            offset = offset ? offset : 0;
            /** @type {?} */
            var start = limit * offset;
            /** @type {?} */
            var end = start + limit;
            return items.slice(start, end);
        }));
    }
    /**
     * @template T
     * @param {?} stringFn
     * @return {?}
     */
    function sortAbc(stringFn) {
        return operators.map((/**
         * @param {?} l
         * @return {?}
         */
        function (l) { return ramda.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) {
            /** @type {?} */
            var textA = stringFn(a);
            /** @type {?} */
            var textB = stringFn(b);
            if (!textA)
                return -1;
            if (!textB)
                return 1;
            textA = textA.toUpperCase(); // ignore upper and lowercase
            textB = textB.toUpperCase(); // ignore upper and lowercase
            if (textA < textB) {
                return -1;
            }
            if (textA > textB) {
                return 1;
            }
            // names are equal
            return 0;
        }), l); }));
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/functions/debug-combine-latest-or-empty.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Debug combineLatestOrEmpty:
     * Waits for a moment and reports to console which items did not next
     *
     * @template I
     * @param {?} obs
     * @param {?=} wait number of miliseconds to wait
     * @return {?}
     */
    function debugCombineLatestOrEmpty(obs, wait) {
        if (wait === void 0) { wait = 500; }
        /** @type {?} */
        var until$ = new rxjs.Subject();
        /** @type {?} */
        var report = [];
        setTimeout((/**
         * @return {?}
         */
        function () {
            until$.next();
            console.log('> Report');
            console.log("  " + report.map((/**
             * @param {?} item
             * @param {?} i
             * @return {?}
             */
            function (item, i) { return i + " " + item; })).join('\n'));
        }), wait);
        obs.forEach((/**
         * @param {?} item
         * @param {?} i
         * @return {?}
         */
        function (item, i) {
            report.push('> No value emitted');
            item.pipe(operators.first(), operators.takeUntil(until$)).subscribe((/**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                report[i] = 'Ok';
            }));
        }));
        obs = __spread([rxjs.of(null)], obs);
        return rxjs.combineLatest(obs).pipe(operators.map((/**
         * @param {?} values
         * @return {?}
         */
        function (values) {
            values.shift();
            return values;
        })));
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/functions/switchMapOr.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * switchMaps to the default, if condition is true, else to provided elseOutput
     *
     * @template I, O
     * @param {?} defaultValue
     * @param {?} elseOutput
     * @param {?=} conditionForDefault
     * @return {?}
     */
    function switchMapOr(defaultValue, elseOutput, conditionForDefault) {
        return (/**
         * @param {?} source
         * @return {?}
         */
        function (source) {
            conditionForDefault = conditionForDefault ? conditionForDefault : (/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return (!x || Object.keys(x).length < 1); });
            return source.pipe(
            // auditTime(1),
            operators.switchMap((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                return rxjs.iif((/**
                 * @return {?}
                 */
                function () { return conditionForDefault(value); }), rxjs.of(defaultValue), elseOutput(value));
            })), operators$1.tag("switchMapOr"));
        });
    }

    exports.DateTimeCommons = DateTimeCommons;
    exports.DateTimeModule = DateTimeModule;
    exports.GregorianDateTime = GregorianDateTime;
    exports.JulianDateTime = JulianDateTime;
    exports.TimePrimitive = TimePrimitive;
    exports.TimePrimitivePipe = TimePrimitivePipe;
    exports.TimeSpanPipe = TimeSpanPipe;
    exports.TimeSpanUtil = TimeSpanUtil;
    exports.U = U;
    exports.combineLatestOrEmpty = combineLatestOrEmpty;
    exports.debugCombineLatestOrEmpty = debugCombineLatestOrEmpty;
    exports.getSpecificVersion = getSpecificVersion;
    exports.latestEntityVersion = latestEntityVersion;
    exports.latestEntityVersions = latestEntityVersions;
    exports.latestVersion = latestVersion;
    exports.limitOffset = limitOffset;
    exports.limitTo = limitTo;
    exports.mapConcat = mapConcat;
    exports.sortAbc = sortAbc;
    exports.switchMapOr = switchMapOr;
    exports.x = x;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=kleiolab-lib-utils.umd.js.map
