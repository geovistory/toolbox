(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('@kleiolab/lib-utils/src/lib/functions', ['exports'], factory) :
    (global = global || self, factory((global.kleiolab = global.kleiolab || {}, global.kleiolab['lib-utils'] = global.kleiolab['lib-utils'] || {}, global.kleiolab['lib-utils'].src = global.kleiolab['lib-utils'].src || {}, global.kleiolab['lib-utils'].src.lib = global.kleiolab['lib-utils'].src.lib || {}, global.kleiolab['lib-utils'].src.lib.functions = {})));
}(this, (function (exports) { 'use strict';

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

    exports.U = U;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=kleiolab-lib-utils-src-lib-functions.umd.js.map
