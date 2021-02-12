/**
 * @fileoverview added by tsickle
 * Generated from: util.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvc3JjL2xpYi9mdW5jdGlvbnMvIiwic291cmNlcyI6WyJ1dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUEsNENBVUM7OztJQVBDLDJDQUFtQjs7SUFHbkIsK0NBQXVCOztJQUd2QixzQ0FBZTs7Ozs7QUFLakI7SUFBQTtJQXdIQSxDQUFDOzs7Ozs7SUF0SFEsU0FBTzs7Ozs7SUFBZCxVQUFrQixHQUF5Qjs7WUFDbkMsR0FBRyxHQUFHLEVBQUU7UUFFZCxJQUFJLEdBQUcsSUFBSSxTQUFTO1lBQUUsT0FBTyxHQUFHLENBQUM7UUFFakMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQSxHQUFHO1lBQzFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckIsQ0FBQyxFQUFDLENBQUM7UUFFSCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Ozs7OztJQUVNLFdBQVM7Ozs7O0lBQWhCLFVBQW9CLEdBQXlCOztZQUNyQyxHQUFHLEdBQUcsRUFBRTtRQUVkLElBQUksR0FBRyxJQUFJLFNBQVM7WUFBRSxPQUFPLEdBQUcsQ0FBQztRQUVqQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLEdBQUc7WUFDMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyQixDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7Ozs7SUFDSSxpQkFBZTs7Ozs7Ozs7SUFBdEIsVUFBMEIsR0FBeUI7O1lBQzNDLElBQUksR0FBRyxFQUFFO1FBQ2YsS0FBSyxJQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUU7WUFDckIsSUFBSSxHQUFH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QyxDQUFZO29CQUM5QixDQUFDLENBQUMsYUFBYSxFQUFFLENBQUE7b0JBQ2pCLElBQUksQ0FBQyxDQUFDLFFBQVE7d0JBQUUsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUM3QyxDQUFDLEVBQUMsQ0FBQTthQUNIO2lCQUNJO2dCQUNILGlDQUFpQztnQkFDakMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFOzt3QkFDeEIsQ0FBQyxHQUFHLG1CQUFBLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQWE7b0JBQ2pELENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQTtvQkFDakIsSUFBSSxDQUFDLENBQUMsUUFBUTt3QkFBRSxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUE7aUJBRTVDO2FBQ0Y7U0FDRjtJQUNILENBQUMsRUFBQTtJQXVDSCxRQUFDO0NBQUEsQUF4SEQsSUF3SEM7U0F4SFksQ0FBQzs7O0lBNkRaLHlCQW9CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1BcnJheSwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUHJvVGV4dFByb3BlcnR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIExhYmVsR2VuZXJhdG9yU2V0dGluZ3Mge1xuICAvLyBtYXhpbXVtIG51bWJlciBvZiBkYXRhIHVuaXQgY2hpbGRyZW4gdGhhdCBhcmUgdGFrZW4gaW50byBhY2NvdW50IGZvciB0aGUgbGFiZWwgZ2VuZXJhdG9yXG4gIC8vIGUuZy46IGZvciBhIEFwcGVGb3JMYW5ndWFnZSBpdCB3aWxsIHRha2Ugb25seSBsYWJlbCBhbmQgbGFuZ3VhZ2UsIHdoZW4geW91IHB1dCBpdCB0byAyXG4gIGZpZWxkc01heD86IG51bWJlcjtcblxuICAvLyBtYXhpbXVtIG51bWJlciBvZiBzdGF0ZW1lbnRzIHBlciBwcm9wZXJ0eUZpZWxkIHRha2VuIGludG8gYWNjb3VudCBmb3IgdGhlIGxhYmVsIGdlbmVyYXRvclxuICBzdGF0ZW1lbnRzTWF4PzogbnVtYmVyO1xuXG4gIC8vIHBhdGggb2YgdGhhdCBlbGVtZW50IGluIHRoZSBzdG9yZS4gdXNlZnVsIHRvIGF0dGF0Y2ggbGVhZi1wZS1pdC12aWV3XG4gIHBhdGg6IHN0cmluZ1tdO1xufS8qKlxuICogVXRpbGl0aWVzIGNsYXNzIGZvciBzdGF0aWMgZnVuY3Rpb25zXG4gKi9cblxuZXhwb3J0IGNsYXNzIFUge1xuXG4gIHN0YXRpYyBvYmoyQXJyPFQ+KG9iajogeyBba2V5OiBzdHJpbmddOiBUIH0pOiBUW10ge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuXG4gICAgaWYgKG9iaiA9PSB1bmRlZmluZWQpIHJldHVybiBhcnI7XG5cbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGFyci5wdXNoKG9ialtrZXldKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBzdGF0aWMgb2JqTnIyQXJyPFQ+KG9iajogeyBba2V5OiBudW1iZXJdOiBUIH0pOiBUW10ge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuXG4gICAgaWYgKG9iaiA9PSB1bmRlZmluZWQpIHJldHVybiBhcnI7XG5cbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGFyci5wdXNoKG9ialtrZXldKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICAvKipcbiAgICogY29udmVydHMgb2JqZWN0IHRvIGFycmF5IHdpdGgge2tleTogdmFsdWV9IG9iamVjdHMsIGUuZy46XG4gICAqIHsnYSc6IDEyLCAnYic6IDk5fSAtLT4gW3trZXk6ICdhJywgdmFsdWU6IDEyLCBrZXk6ICdiJywgdmFsdWU6IDk5fV1cbiAgICpcbiAgICogQHBhcmFtIG9ialxuICAgKi9cbiAgc3RhdGljIG9iajJLZXlWYWx1ZUFycjxUPihvYmo6IHsgW2tleTogc3RyaW5nXTogVCB9KTogeyBrZXk6IHN0cmluZywgdmFsdWU6IFQgfVtdIHtcbiAgICBjb25zdCBrZXlzID0gW107XG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqW2tleV0pIHtcbiAgICAgICAga2V5cy5wdXNoKHsga2V5OiBrZXksIHZhbHVlOiBvYmpba2V5XSB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGtleXM7XG4gIH1cblxuXG5cbiAgc3RhdGljIGZpcnN0UHJvVGV4dFByb3BTdHJpbmdPZlR5cGUodGV4dFByb3BlcnRpZXM6IFByb1RleHRQcm9wZXJ0eVtdLCBma1N5c3RlbVR5cGUpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGV4dFByb3BlcnRpZXMuZmluZCh0ID0+IHQuZmtfc3lzdGVtX3R5cGUgPT09IGZrU3lzdGVtVHlwZSkgfHwgeyBzdHJpbmc6ICcnIH0pLnN0cmluZ1xuICB9XG5cbiAgLyoqXG4gICogRXJ6ZXVndCBlaW5lIFVVSUQgbmFjaCBSRkMgNDEyMlxuICAqL1xuICBzdGF0aWMgdXVpZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIChjaGFyKSA9PiB7XG4gICAgICBjb25zdCByYW5kb20gPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwOyAvLyBOYWNoa29tbWFzdGVsbGVuIGFic2NobmVpZGVuXG4gICAgICBjb25zdCB2YWx1ZSA9IGNoYXIgPT09ICd4JyA/IHJhbmRvbSA6IChyYW5kb20gJSA0ICsgOCk7IC8vIEJlaSB4IFJhbmRvbSAwLTE1ICgwLUYpLCBiZWkgeSBSYW5kb20gMC0zICsgOCA9IDgtMTEgKDgtYikgZ2Vtw6RzcyBSRkMgNDEyMlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKDE2KTsgLy8gSGV4YWRlemltYWxlcyBaZWljaGVuIHp1csO8Y2tnZWJlblxuICAgIH0pO1xuICB9XG5cblxuXG4gIHN0YXRpYyByZWN1cnNpdmVNYXJrQXNUb3VjaGVkID0gKGY6IEZvcm1BcnJheSB8IEZvcm1Hcm91cCkgPT4ge1xuXG4gICAgaWYgKGYuY29udHJvbHMpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGYuY29udHJvbHMpKSB7XG4gICAgICAgIC8vIGluIHRoaXMgY2FzZSBpdCBpcyBhIGZvcm1BcnJheVxuICAgICAgICBmLmNvbnRyb2xzLmZvckVhY2goKGM6IEZvcm1BcnJheSkgPT4ge1xuICAgICAgICAgIGMubWFya0FzVG91Y2hlZCgpXG4gICAgICAgICAgaWYgKGMuY29udHJvbHMpIFUucmVjdXJzaXZlTWFya0FzVG91Y2hlZChjKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIGluIHRoaXMgY2FzZSBpdCBpcyBhIGZvcm1Hcm91cFxuICAgICAgICBpZiAoZi5jb250cm9sc1snY2hpbGRDb250cm9sJ10pIHtcbiAgICAgICAgICBjb25zdCBjID0gZi5jb250cm9sc1snY2hpbGRDb250cm9sJ10gYXMgRm9ybUFycmF5O1xuICAgICAgICAgIGMubWFya0FzVG91Y2hlZCgpXG4gICAgICAgICAgaWYgKGMuY29udHJvbHMpIFUucmVjdXJzaXZlTWFya0FzVG91Y2hlZChjKVxuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcHJvcGVydHlGaWVsZEtleUZyb21QYXJhbXMoZmtQcm9wOiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gJ18nICsgZmtQcm9wICsgJ18nICsgKGlzT3V0Z29pbmcgPyAnb3V0Z29pbmcnIDogJ2luZ29pbmcnKVxuICB9XG5cblxuICAvKipcbiAgICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgY29udmVydHMgZ2l2ZW4gbnVtYmVyIHRvIHN0cmluZ1xuICAgKiBidXQgemVybyAoPTApIHZhbHVlcyByZXR1cm4gdW5kZWZpbmVkLlxuICAgKi9cbiAgc3RhdGljIHRvU3RyMHVuZGVmKHZhbDogbnVtYmVyKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodmFsID09PSAwKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgZWxzZSBpZiAodmFsID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWRcbiAgICBlbHNlIGlmICh2YWwgPT09IG51bGwpIHJldHVybiB1bmRlZmluZWRcbiAgICBlbHNlIHJldHVybiB2YWwudG9TdHJpbmcoKTtcbiAgfVxuICAvKipcbiAgICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgY29udmVydHMgZ2l2ZW4gYXJyYXkgdG8gc3RyaW5nXG4gICAqXG4gICAqIElmIGFycmF5IGNvbnRhaW5zIDAsIG51bGwgb3IgdW5kZWZpbmVkLCByZXR1cm4gdW5kZXJmaW5lZFxuICAgKi9cbiAgc3RhdGljIHRvU3RyQ29udGFpbnMwdW5kZWYodmFsczogKG51bWJlciB8IGJvb2xlYW4gfCBzdHJpbmcgfCBvYmplY3QpW10pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGxldCBzdHJpbmcgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHZhbCA9IHZhbHNbaV07XG5cbiAgICAgIGlmICh2YWwgPT09IDApIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICBlbHNlIGlmICh2YWwgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIGVsc2UgaWYgKHZhbCA9PT0gbnVsbCkgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgZWxzZSBpZiAoaSA9PT0gMCkge1xuICAgICAgICBzdHJpbmcgPSB2YWwudG9TdHJpbmcoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyaW5nID0gYCR7c3RyaW5nfV8ke3ZhbC50b1N0cmluZygpfWBcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9XG59XG4iXX0=