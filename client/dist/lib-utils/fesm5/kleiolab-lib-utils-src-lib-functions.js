import { __spread } from 'tslib';
import { of, combineLatest, pipe, Subject, iif } from 'rxjs';
import { map, filter, first, takeUntil, switchMap } from 'rxjs/operators';
import { concat, values, sort } from 'ramda';
import { tag } from 'rxjs-spy/operators';

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
    obs = __spread([of(null)], obs);
    return combineLatest(obs).pipe(map((/**
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
    return map((/**
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
                concatenatedArray = concat(concatenatedArray, getArrayFromItemFn(item));
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
    return pipe(map((/**
     * @param {?} d
     * @return {?}
     */
    function (d) { return U.objNr2Arr(d); })), map((/**
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
    return pipe(map((/**
     * @param {?} byPkEntity
     * @return {?}
     */
    function (byPkEntity) { return byPkEntity[pkEntity]; })), filter((/**
     * @param {?} entityVersions
     * @return {?}
     */
    function (entityVersions) { return entityVersions && entityVersions._latestVersion !== undefined; })), map((/**
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
    values(versions).forEach((/**
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
    var ver = values(versions).find((/**
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
    return map((/**
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
    return map((/**
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
    return map((/**
     * @param {?} l
     * @return {?}
     */
    function (l) { return sort((/**
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
    var until$ = new Subject();
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
        item.pipe(first(), takeUntil(until$)).subscribe((/**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            report[i] = 'Ok';
        }));
    }));
    obs = __spread([of(null)], obs);
    return combineLatest(obs).pipe(map((/**
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
        switchMap((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return iif((/**
             * @return {?}
             */
            function () { return conditionForDefault(value); }), of(defaultValue), elseOutput(value));
        })), tag("switchMapOr"));
    });
}

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: kleiolab-lib-utils-src-lib-functions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { U, combineLatestOrEmpty, debugCombineLatestOrEmpty, getSpecificVersion, latestEntityVersion, latestEntityVersions, latestVersion, limitOffset, limitTo, mapConcat, sortAbc, switchMapOr };
//# sourceMappingURL=kleiolab-lib-utils-src-lib-functions.js.map
