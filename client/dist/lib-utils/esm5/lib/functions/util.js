/**
 * @fileoverview added by tsickle
 * Generated from: lib/functions/util.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function LabelGeneratorSettings() { }
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
export { U };
if (false) {
    /** @type {?} */
    U.recursiveMarkAsTouched;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvIiwic291cmNlcyI6WyJsaWIvZnVuY3Rpb25zL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQSw0Q0FVQzs7O0lBUEMsMkNBQW1COztJQUduQiwrQ0FBdUI7O0lBR3ZCLHNDQUFlOzs7OztBQUtqQjtJQUFBO0lBd0hBLENBQUM7Ozs7OztJQXRIUSxTQUFPOzs7OztJQUFkLFVBQWtCLEdBQXlCOztZQUNuQyxHQUFHLEdBQUcsRUFBRTtRQUVkLElBQUksR0FBRyxJQUFJLFNBQVM7WUFBRSxPQUFPLEdBQUcsQ0FBQztRQUVqQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLEdBQUc7WUFDMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyQixDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7Ozs7O0lBRU0sV0FBUzs7Ozs7SUFBaEIsVUFBb0IsR0FBeUI7O1lBQ3JDLEdBQUcsR0FBRyxFQUFFO1FBRWQsSUFBSSxHQUFHLElBQUksU0FBUztZQUFFLE9BQU8sR0FBRyxDQUFDO1FBRWpDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsR0FBRztZQUMxQixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsRUFBQyxDQUFDO1FBRUgsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7OztJQUNJLGlCQUFlOzs7Ozs7OztJQUF0QixVQUEwQixHQUF5Qjs7WUFDM0MsSUFBSSxHQUFHLEVBQUU7UUFDZixLQUFLLElBQU0sR0FBRyxJQUFJLEdBQUcsRUFBRTtZQUNyQixJQUFJLEdBQUcsQ0FB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QVk7b0JBQzlCLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQTtvQkFDakIsSUFBSSxDQUFDLENBQUMsUUFBUTt3QkFBRSxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzdDLENBQUMsRUFBQyxDQUFBO2FBQ0g7aUJBQ0k7Z0JBQ0gsaUNBQWlDO2dCQUNqQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7O3dCQUN4QixDQUFDLEdBQUcsbUJBQUEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBYTtvQkFDakQsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFBO29CQUNqQixJQUFJLENBQUMsQ0FBQyxRQUFRO3dCQUFFLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFFNUM7YUFDRjtTQUNGO0lBQ0gsQ0FBQyxFQUFBO0lBdUNILFFBQUM7Q0FBQSxBQXhIRCxJQXdIQztTQXhIWSxDQUFDOzs7SUE2RFoseUJBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUFycmF5LCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBQcm9UZXh0UHJvcGVydHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgTGFiZWxHZW5lcmF0b3JTZXR0aW5ncyB7XG4gIC8vIG1heGltdW0gbnVtYmVyIG9mIGRhdGEgdW5pdCBjaGlsZHJlbiB0aGF0IGFyZSB0YWtlbiBpbnRvIGFjY291bnQgZm9yIHRoZSBsYWJlbCBnZW5lcmF0b3JcbiAgLy8gZS5nLjogZm9yIGEgQXBwZUZvckxhbmd1YWdlIGl0IHdpbGwgdGFrZSBvbmx5IGxhYmVsIGFuZCBsYW5ndWFnZSwgd2hlbiB5b3UgcHV0IGl0IHRvIDJcbiAgZmllbGRzTWF4PzogbnVtYmVyO1xuXG4gIC8vIG1heGltdW0gbnVtYmVyIG9mIHN0YXRlbWVudHMgcGVyIHByb3BlcnR5RmllbGQgdGFrZW4gaW50byBhY2NvdW50IGZvciB0aGUgbGFiZWwgZ2VuZXJhdG9yXG4gIHN0YXRlbWVudHNNYXg/OiBudW1iZXI7XG5cbiAgLy8gcGF0aCBvZiB0aGF0IGVsZW1lbnQgaW4gdGhlIHN0b3JlLiB1c2VmdWwgdG8gYXR0YXRjaCBsZWFmLXBlLWl0LXZpZXdcbiAgcGF0aDogc3RyaW5nW107XG59LyoqXG4gKiBVdGlsaXRpZXMgY2xhc3MgZm9yIHN0YXRpYyBmdW5jdGlvbnNcbiAqL1xuXG5leHBvcnQgY2xhc3MgVSB7XG5cbiAgc3RhdGljIG9iajJBcnI8VD4ob2JqOiB7IFtrZXk6IHN0cmluZ106IFQgfSk6IFRbXSB7XG4gICAgY29uc3QgYXJyID0gW107XG5cbiAgICBpZiAob2JqID09IHVuZGVmaW5lZCkgcmV0dXJuIGFycjtcblxuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgYXJyLnB1c2gob2JqW2tleV0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIHN0YXRpYyBvYmpOcjJBcnI8VD4ob2JqOiB7IFtrZXk6IG51bWJlcl06IFQgfSk6IFRbXSB7XG4gICAgY29uc3QgYXJyID0gW107XG5cbiAgICBpZiAob2JqID09IHVuZGVmaW5lZCkgcmV0dXJuIGFycjtcblxuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgYXJyLnB1c2gob2JqW2tleV0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIC8qKlxuICAgKiBjb252ZXJ0cyBvYmplY3QgdG8gYXJyYXkgd2l0aCB7a2V5OiB2YWx1ZX0gb2JqZWN0cywgZS5nLjpcbiAgICogeydhJzogMTIsICdiJzogOTl9IC0tPiBbe2tleTogJ2EnLCB2YWx1ZTogMTIsIGtleTogJ2InLCB2YWx1ZTogOTl9XVxuICAgKlxuICAgKiBAcGFyYW0gb2JqXG4gICAqL1xuICBzdGF0aWMgb2JqMktleVZhbHVlQXJyPFQ+KG9iajogeyBba2V5OiBzdHJpbmddOiBUIH0pOiB7IGtleTogc3RyaW5nLCB2YWx1ZTogVCB9W10ge1xuICAgIGNvbnN0IGtleXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChvYmpba2V5XSkge1xuICAgICAgICBrZXlzLnB1c2goeyBrZXk6IGtleSwgdmFsdWU6IG9ialtrZXldIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ga2V5cztcbiAgfVxuXG5cblxuICBzdGF0aWMgZmlyc3RQcm9UZXh0UHJvcFN0cmluZ09mVHlwZSh0ZXh0UHJvcGVydGllczogUHJvVGV4dFByb3BlcnR5W10sIGZrU3lzdGVtVHlwZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0ZXh0UHJvcGVydGllcy5maW5kKHQgPT4gdC5ma19zeXN0ZW1fdHlwZSA9PT0gZmtTeXN0ZW1UeXBlKSB8fCB7IHN0cmluZzogJycgfSkuc3RyaW5nXG4gIH1cblxuICAvKipcbiAgKiBFcnpldWd0IGVpbmUgVVVJRCBuYWNoIFJGQyA0MTIyXG4gICovXG4gIHN0YXRpYyB1dWlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgKGNoYXIpID0+IHtcbiAgICAgIGNvbnN0IHJhbmRvbSA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDA7IC8vIE5hY2hrb21tYXN0ZWxsZW4gYWJzY2huZWlkZW5cbiAgICAgIGNvbnN0IHZhbHVlID0gY2hhciA9PT0gJ3gnID8gcmFuZG9tIDogKHJhbmRvbSAlIDQgKyA4KTsgLy8gQmVpIHggUmFuZG9tIDAtMTUgKDAtRiksIGJlaSB5IFJhbmRvbSAwLTMgKyA4ID0gOC0xMSAoOC1iKSBnZW3DpHNzIFJGQyA0MTIyXG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoMTYpOyAvLyBIZXhhZGV6aW1hbGVzIFplaWNoZW4genVyw7xja2dlYmVuXG4gICAgfSk7XG4gIH1cblxuXG5cbiAgc3RhdGljIHJlY3Vyc2l2ZU1hcmtBc1RvdWNoZWQgPSAoZjogRm9ybUFycmF5IHwgRm9ybUdyb3VwKSA9PiB7XG5cbiAgICBpZiAoZi5jb250cm9scykge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZi5jb250cm9scykpIHtcbiAgICAgICAgLy8gaW4gdGhpcyBjYXNlIGl0IGlzIGEgZm9ybUFycmF5XG4gICAgICAgIGYuY29udHJvbHMuZm9yRWFjaCgoYzogRm9ybUFycmF5KSA9PiB7XG4gICAgICAgICAgYy5tYXJrQXNUb3VjaGVkKClcbiAgICAgICAgICBpZiAoYy5jb250cm9scykgVS5yZWN1cnNpdmVNYXJrQXNUb3VjaGVkKGMpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gaW4gdGhpcyBjYXNlIGl0IGlzIGEgZm9ybUdyb3VwXG4gICAgICAgIGlmIChmLmNvbnRyb2xzWydjaGlsZENvbnRyb2wnXSkge1xuICAgICAgICAgIGNvbnN0IGMgPSBmLmNvbnRyb2xzWydjaGlsZENvbnRyb2wnXSBhcyBGb3JtQXJyYXk7XG4gICAgICAgICAgYy5tYXJrQXNUb3VjaGVkKClcbiAgICAgICAgICBpZiAoYy5jb250cm9scykgVS5yZWN1cnNpdmVNYXJrQXNUb3VjaGVkKGMpXG5cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBwcm9wZXJ0eUZpZWxkS2V5RnJvbVBhcmFtcyhma1Byb3A6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbikge1xuICAgIHJldHVybiAnXycgKyBma1Byb3AgKyAnXycgKyAoaXNPdXRnb2luZyA/ICdvdXRnb2luZycgOiAnaW5nb2luZycpXG4gIH1cblxuXG4gIC8qKlxuICAgKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBjb252ZXJ0cyBnaXZlbiBudW1iZXIgdG8gc3RyaW5nXG4gICAqIGJ1dCB6ZXJvICg9MCkgdmFsdWVzIHJldHVybiB1bmRlZmluZWQuXG4gICAqL1xuICBzdGF0aWMgdG9TdHIwdW5kZWYodmFsOiBudW1iZXIpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGlmICh2YWwgPT09IDApIHJldHVybiB1bmRlZmluZWRcbiAgICBlbHNlIGlmICh2YWwgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZFxuICAgIGVsc2UgaWYgKHZhbCA9PT0gbnVsbCkgcmV0dXJuIHVuZGVmaW5lZFxuICAgIGVsc2UgcmV0dXJuIHZhbC50b1N0cmluZygpO1xuICB9XG4gIC8qKlxuICAgKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBjb252ZXJ0cyBnaXZlbiBhcnJheSB0byBzdHJpbmdcbiAgICpcbiAgICogSWYgYXJyYXkgY29udGFpbnMgMCwgbnVsbCBvciB1bmRlZmluZWQsIHJldHVybiB1bmRlcmZpbmVkXG4gICAqL1xuICBzdGF0aWMgdG9TdHJDb250YWluczB1bmRlZih2YWxzOiAobnVtYmVyIHwgYm9vbGVhbiB8IHN0cmluZyB8IG9iamVjdClbXSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgbGV0IHN0cmluZyA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFscy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgdmFsID0gdmFsc1tpXTtcblxuICAgICAgaWYgKHZhbCA9PT0gMCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIGVsc2UgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgZWxzZSBpZiAodmFsID09PSBudWxsKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgICBlbHNlIGlmIChpID09PSAwKSB7XG4gICAgICAgIHN0cmluZyA9IHZhbC50b1N0cmluZygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHJpbmcgPSBgJHtzdHJpbmd9XyR7dmFsLnRvU3RyaW5nKCl9YFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdHJpbmc7XG4gIH1cbn1cbiJdfQ==