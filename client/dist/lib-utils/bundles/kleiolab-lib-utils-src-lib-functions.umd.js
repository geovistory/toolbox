(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs/operators'), require('ramda'), require('rxjs-spy/operators')) :
    typeof define === 'function' && define.amd ? define('@kleiolab/lib-utils/src/lib/functions', ['exports', 'rxjs', 'rxjs/operators', 'ramda', 'rxjs-spy/operators'], factory) :
    (global = global || self, factory((global.kleiolab = global.kleiolab || {}, global.kleiolab['lib-utils'] = global.kleiolab['lib-utils'] || {}, global.kleiolab['lib-utils'].src = global.kleiolab['lib-utils'].src || {}, global.kleiolab['lib-utils'].src.lib = global.kleiolab['lib-utils'].src.lib || {}, global.kleiolab['lib-utils'].src.lib.functions = {}), global.rxjs, global.rxjs.operators, global.ramda, global.operators$1));
}(this, (function (exports, rxjs, operators, ramda, operators$1) { 'use strict';

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
     * Generated from: combineLatestOrEmpty.ts
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
     * Generated from: util.ts
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
     * Generated from: custom-rxjs-operators.ts
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
     * Generated from: debug-combine-latest-or-empty.ts
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
     * Generated from: switchMapOr.ts
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

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=kleiolab-lib-utils-src-lib-functions.umd.js.map
