import { of, combineLatest, pipe, iif } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { concat, values, sort } from 'ramda';
import { tag } from 'rxjs-spy/operators';

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
class U {
    /**
     * @template T
     * @param {?} obj
     * @return {?}
     */
    static obj2Arr(obj) {
        /** @type {?} */
        const arr = [];
        if (obj == undefined)
            return arr;
        Object.keys(obj).forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            arr.push(obj[key]);
        }));
        return arr;
    }
    /**
     * @template T
     * @param {?} obj
     * @return {?}
     */
    static objNr2Arr(obj) {
        /** @type {?} */
        const arr = [];
        if (obj == undefined)
            return arr;
        Object.keys(obj).forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            arr.push(obj[key]);
        }));
        return arr;
    }
    /**
     * converts object to array with {key: value} objects, e.g.:
     * {'a': 12, 'b': 99} --> [{key: 'a', value: 12, key: 'b', value: 99}]
     *
     * @template T
     * @param {?} obj
     * @return {?}
     */
    static obj2KeyValueArr(obj) {
        /** @type {?} */
        const keys = [];
        for (const key in obj) {
            if (obj[key]) {
                keys.push({ key: key, value: obj[key] });
            }
        }
        return keys;
    }
    /**
     * @param {?} textProperties
     * @param {?} fkSystemType
     * @return {?}
     */
    static firstProTextPropStringOfType(textProperties, fkSystemType) {
        return (textProperties.find((/**
         * @param {?} t
         * @return {?}
         */
        t => t.fk_system_type === fkSystemType)) || { string: '' }).string;
    }
    /**
     * Erzeugt eine UUID nach RFC 4122
     * @return {?}
     */
    static uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (/**
         * @param {?} char
         * @return {?}
         */
        (char) => {
            /** @type {?} */
            const random = Math.random() * 16 | 0;
            // Nachkommastellen abschneiden
            /** @type {?} */
            const value = char === 'x' ? random : (random % 4 + 8);
            return value.toString(16); // Hexadezimales Zeichen zurückgeben
        }));
    }
    /**
     * @param {?} fkProp
     * @param {?} isOutgoing
     * @return {?}
     */
    static propertyFieldKeyFromParams(fkProp, isOutgoing) {
        return '_' + fkProp + '_' + (isOutgoing ? 'outgoing' : 'ingoing');
    }
    /**
     * Helper function that converts given number to string
     * but zero (=0) values return undefined.
     * @param {?} val
     * @return {?}
     */
    static toStr0undef(val) {
        if (val === 0)
            return undefined;
        else if (val === undefined)
            return undefined;
        else if (val === null)
            return undefined;
        else
            return val.toString();
    }
    /**
     * Helper function that converts given array to string
     *
     * If array contains 0, null or undefined, return underfined
     * @param {?} vals
     * @return {?}
     */
    static toStrContains0undef(vals) {
        /** @type {?} */
        let string = '';
        for (let i = 0; i < vals.length; i++) {
            /** @type {?} */
            const val = vals[i];
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
                string = `${string}_${val.toString()}`;
            }
        }
        return string;
    }
}
U.recursiveMarkAsTouched = (/**
 * @param {?} f
 * @return {?}
 */
(f) => {
    if (f.controls) {
        if (Array.isArray(f.controls)) {
            // in this case it is a formArray
            f.controls.forEach((/**
             * @param {?} c
             * @return {?}
             */
            (c) => {
                c.markAsTouched();
                if (c.controls)
                    U.recursiveMarkAsTouched(c);
            }));
        }
        else {
            // in this case it is a formGroup
            if (f.controls['childControl']) {
                /** @type {?} */
                const c = (/** @type {?} */ (f.controls['childControl']));
                c.markAsTouched();
                if (c.controls)
                    U.recursiveMarkAsTouched(c);
            }
        }
    }
});
if (false) {
    /** @type {?} */
    U.recursiveMarkAsTouched;
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
    obs = [of(null), ...obs];
    return combineLatest(obs).pipe(map((/**
     * @param {?} values
     * @return {?}
     */
    (values) => {
        values.shift();
        return values;
    })));
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
    (source) => {
        if (typeof getArrayFromItemFn !== 'function') {
            throw new TypeError('argument is not a function.');
        }
        /** @type {?} */
        let concatenatedArray = [];
        source.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => {
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
    d => U.objNr2Arr(d))), map((/**
     * @param {?} a
     * @return {?}
     */
    a => a.map((/**
     * @param {?} q
     * @return {?}
     */
    q => q[q._latestVersion])))));
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
    byPkEntity => byPkEntity[pkEntity])), filter((/**
     * @param {?} entityVersions
     * @return {?}
     */
    entityVersions => entityVersions && entityVersions._latestVersion !== undefined)), map((/**
     * @param {?} entityVersions
     * @return {?}
     */
    entityVersions => entityVersions[entityVersions._latestVersion])));
}
/**
 * @template T
 * @param {?} versions
 * @return {?}
 */
function latestVersion(versions) {
    /** @type {?} */
    let latestVersion = 0;
    /** @type {?} */
    let latest;
    values(versions).forEach((/**
     * @param {?} v
     * @return {?}
     */
    (v) => {
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
    const ver = values(versions).find((/**
     * @param {?} v
     * @return {?}
     */
    (v) => v.entity_version === version));
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
    (items) => {
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
    (items) => {
        if (!limit)
            return items;
        offset = offset ? offset : 0;
        /** @type {?} */
        const start = limit * offset;
        /** @type {?} */
        const end = start + limit;
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
    (l) => sort((/**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    (a, b) => {
        /** @type {?} */
        let textA = stringFn(a);
        /** @type {?} */
        let textB = stringFn(b);
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
    }), l)));
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
        (x) => (!x || Object.keys(x).length < 1));
        return source.pipe(
        // auditTime(1),
        switchMap((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            return iif((/**
             * @return {?}
             */
            () => conditionForDefault(value)), of(defaultValue), elseOutput(value));
        })), tag(`switchMapOr`));
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

export { U, combineLatestOrEmpty, getSpecificVersion, latestEntityVersion, latestEntityVersions, latestVersion, limitOffset, limitTo, mapConcat, sortAbc, switchMapOr };
//# sourceMappingURL=kleiolab-lib-utils-src-lib-functions.js.map
