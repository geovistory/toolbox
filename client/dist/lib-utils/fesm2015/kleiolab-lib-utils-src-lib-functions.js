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
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: kleiolab-lib-utils-src-lib-functions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { U };
//# sourceMappingURL=kleiolab-lib-utils-src-lib-functions.js.map
