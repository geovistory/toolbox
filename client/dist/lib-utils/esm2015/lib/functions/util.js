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
export class U {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvIiwic291cmNlcyI6WyJsaWIvZnVuY3Rpb25zL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQSw0Q0FVQzs7O0lBUEMsMkNBQW1COztJQUduQiwrQ0FBdUI7O0lBR3ZCLHNDQUFlOzs7OztBQUtqQixNQUFNLE9BQU8sQ0FBQzs7Ozs7O0lBRVosTUFBTSxDQUFDLE9BQU8sQ0FBSSxHQUF5Qjs7Y0FDbkMsR0FBRyxHQUFHLEVBQUU7UUFFZCxJQUFJLEdBQUcsSUFBSSxTQUFTO1lBQUUsT0FBTyxHQUFHLENBQUM7UUFFakMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUU7WUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyQixDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7Ozs7O0lBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBSSxHQUF5Qjs7Y0FDckMsR0FBRyxHQUFHLEVBQUU7UUFFZCxJQUFJLEdBQUcsSUFBSSxTQUFTO1lBQUUsT0FBTyxHQUFHLENBQUM7UUFFakMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUU7WUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyQixDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7Ozs7Ozs7O0lBUUQsTUFBTSxDQUFDLGVBQWUsQ0FBSSxHQUF5Qjs7Y0FDM0MsSUFBSSxHQUFHLEVBQUU7UUFDZixLQUFLLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRTtZQUNyQixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMs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QUUsQ0FBQTtnQkFDakIsSUFBSSxDQUFDLENBQUMsUUFBUTtvQkFBRSxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDN0MsQ0FBQyxFQUFDLENBQUE7U0FDSDthQUNJO1lBQ0gsaUNBQWlDO1lBQ2pDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRTs7c0JBQ3hCLENBQUMsR0FBRyxtQkFBQSxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFhO2dCQUNqRCxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUE7Z0JBQ2pCLElBQUksQ0FBQyxDQUFDLFFBQVE7b0JBQUUsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFBO2FBRTVDO1NBQ0Y7S0FDRjtBQUNILENBQUMsRUFBQTs7O0lBcEJELHlCQW9CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1BcnJheSwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUHJvVGV4dFByb3BlcnR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIExhYmVsR2VuZXJhdG9yU2V0dGluZ3Mge1xuICAvLyBtYXhpbXVtIG51bWJlciBvZiBkYXRhIHVuaXQgY2hpbGRyZW4gdGhhdCBhcmUgdGFrZW4gaW50byBhY2NvdW50IGZvciB0aGUgbGFiZWwgZ2VuZXJhdG9yXG4gIC8vIGUuZy46IGZvciBhIEFwcGVGb3JMYW5ndWFnZSBpdCB3aWxsIHRha2Ugb25seSBsYWJlbCBhbmQgbGFuZ3VhZ2UsIHdoZW4geW91IHB1dCBpdCB0byAyXG4gIGZpZWxkc01heD86IG51bWJlcjtcblxuICAvLyBtYXhpbXVtIG51bWJlciBvZiBzdGF0ZW1lbnRzIHBlciBwcm9wZXJ0eUZpZWxkIHRha2VuIGludG8gYWNjb3VudCBmb3IgdGhlIGxhYmVsIGdlbmVyYXRvclxuICBzdGF0ZW1lbnRzTWF4PzogbnVtYmVyO1xuXG4gIC8vIHBhdGggb2YgdGhhdCBlbGVtZW50IGluIHRoZSBzdG9yZS4gdXNlZnVsIHRvIGF0dGF0Y2ggbGVhZi1wZS1pdC12aWV3XG4gIHBhdGg6IHN0cmluZ1tdO1xufS8qKlxuICogVXRpbGl0aWVzIGNsYXNzIGZvciBzdGF0aWMgZnVuY3Rpb25zXG4gKi9cblxuZXhwb3J0IGNsYXNzIFUge1xuXG4gIHN0YXRpYyBvYmoyQXJyPFQ+KG9iajogeyBba2V5OiBzdHJpbmddOiBUIH0pOiBUW10ge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuXG4gICAgaWYgKG9iaiA9PSB1bmRlZmluZWQpIHJldHVybiBhcnI7XG5cbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGFyci5wdXNoKG9ialtrZXldKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBzdGF0aWMgb2JqTnIyQXJyPFQ+KG9iajogeyBba2V5OiBudW1iZXJdOiBUIH0pOiBUW10ge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuXG4gICAgaWYgKG9iaiA9PSB1bmRlZmluZWQpIHJldHVybiBhcnI7XG5cbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGFyci5wdXNoKG9ialtrZXldKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICAvKipcbiAgICogY29udmVydHMgb2JqZWN0IHRvIGFycmF5IHdpdGgge2tleTogdmFsdWV9IG9iamVjdHMsIGUuZy46XG4gICAqIHsnYSc6IDEyLCAnYic6IDk5fSAtLT4gW3trZXk6ICdhJywgdmFsdWU6IDEyLCBrZXk6ICdiJywgdmFsdWU6IDk5fV1cbiAgICpcbiAgICogQHBhcmFtIG9ialxuICAgKi9cbiAgc3RhdGljIG9iajJLZXlWYWx1ZUFycjxUPihvYmo6IHsgW2tleTogc3RyaW5nXTogVCB9KTogeyBrZXk6IHN0cmluZywgdmFsdWU6IFQgfVtdIHtcbiAgICBjb25zdCBrZXlzID0gW107XG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqW2tleV0pIHtcbiAgICAgICAga2V5cy5wdXNoKHsga2V5OiBrZXksIHZhbHVlOiBvYmpba2V5XSB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGtleXM7XG4gIH1cblxuXG5cbiAgc3RhdGljIGZpcnN0UHJvVGV4dFByb3BTdHJpbmdPZlR5cGUodGV4dFByb3BlcnRpZXM6IFByb1RleHRQcm9wZXJ0eVtdLCBma1N5c3RlbVR5cGUpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGV4dFByb3BlcnRpZXMuZmluZCh0ID0+IHQuZmtfc3lzdGVtX3R5cGUgPT09IGZrU3lzdGVtVHlwZSkgfHwgeyBzdHJpbmc6ICcnIH0pLnN0cmluZ1xuICB9XG5cbiAgLyoqXG4gICogRXJ6ZXVndCBlaW5lIFVVSUQgbmFjaCBSRkMgNDEyMlxuICAqL1xuICBzdGF0aWMgdXVpZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIChjaGFyKSA9PiB7XG4gICAgICBjb25zdCByYW5kb20gPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwOyAvLyBOYWNoa29tbWFzdGVsbGVuIGFic2NobmVpZGVuXG4gICAgICBjb25zdCB2YWx1ZSA9IGNoYXIgPT09ICd4JyA/IHJhbmRvbSA6IChyYW5kb20gJSA0ICsgOCk7IC8vIEJlaSB4IFJhbmRvbSAwLTE1ICgwLUYpLCBiZWkgeSBSYW5kb20gMC0zICsgOCA9IDgtMTEgKDgtYikgZ2Vtw6RzcyBSRkMgNDEyMlxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKDE2KTsgLy8gSGV4YWRlemltYWxlcyBaZWljaGVuIHp1csO8Y2tnZWJlblxuICAgIH0pO1xuICB9XG5cblxuXG4gIHN0YXRpYyByZWN1cnNpdmVNYXJrQXNUb3VjaGVkID0gKGY6IEZvcm1BcnJheSB8IEZvcm1Hcm91cCkgPT4ge1xuXG4gICAgaWYgKGYuY29udHJvbHMpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGYuY29udHJvbHMpKSB7XG4gICAgICAgIC8vIGluIHRoaXMgY2FzZSBpdCBpcyBhIGZvcm1BcnJheVxuICAgICAgICBmLmNvbnRyb2xzLmZvckVhY2goKGM6IEZvcm1BcnJheSkgPT4ge1xuICAgICAgICAgIGMubWFya0FzVG91Y2hlZCgpXG4gICAgICAgICAgaWYgKGMuY29udHJvbHMpIFUucmVjdXJzaXZlTWFya0FzVG91Y2hlZChjKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIGluIHRoaXMgY2FzZSBpdCBpcyBhIGZvcm1Hcm91cFxuICAgICAgICBpZiAoZi5jb250cm9sc1snY2hpbGRDb250cm9sJ10pIHtcbiAgICAgICAgICBjb25zdCBjID0gZi5jb250cm9sc1snY2hpbGRDb250cm9sJ10gYXMgRm9ybUFycmF5O1xuICAgICAgICAgIGMubWFya0FzVG91Y2hlZCgpXG4gICAgICAgICAgaWYgKGMuY29udHJvbHMpIFUucmVjdXJzaXZlTWFya0FzVG91Y2hlZChjKVxuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcHJvcGVydHlGaWVsZEtleUZyb21QYXJhbXMoZmtQcm9wOiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gJ18nICsgZmtQcm9wICsgJ18nICsgKGlzT3V0Z29pbmcgPyAnb3V0Z29pbmcnIDogJ2luZ29pbmcnKVxuICB9XG5cblxuICAvKipcbiAgICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgY29udmVydHMgZ2l2ZW4gbnVtYmVyIHRvIHN0cmluZ1xuICAgKiBidXQgemVybyAoPTApIHZhbHVlcyByZXR1cm4gdW5kZWZpbmVkLlxuICAgKi9cbiAgc3RhdGljIHRvU3RyMHVuZGVmKHZhbDogbnVtYmVyKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodmFsID09PSAwKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgZWxzZSBpZiAodmFsID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWRcbiAgICBlbHNlIGlmICh2YWwgPT09IG51bGwpIHJldHVybiB1bmRlZmluZWRcbiAgICBlbHNlIHJldHVybiB2YWwudG9TdHJpbmcoKTtcbiAgfVxuICAvKipcbiAgICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgY29udmVydHMgZ2l2ZW4gYXJyYXkgdG8gc3RyaW5nXG4gICAqXG4gICAqIElmIGFycmF5IGNvbnRhaW5zIDAsIG51bGwgb3IgdW5kZWZpbmVkLCByZXR1cm4gdW5kZXJmaW5lZFxuICAgKi9cbiAgc3RhdGljIHRvU3RyQ29udGFpbnMwdW5kZWYodmFsczogKG51bWJlciB8IGJvb2xlYW4gfCBzdHJpbmcgfCBvYmplY3QpW10pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGxldCBzdHJpbmcgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHZhbCA9IHZhbHNbaV07XG5cbiAgICAgIGlmICh2YWwgPT09IDApIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICBlbHNlIGlmICh2YWwgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIGVsc2UgaWYgKHZhbCA9PT0gbnVsbCkgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgZWxzZSBpZiAoaSA9PT0gMCkge1xuICAgICAgICBzdHJpbmcgPSB2YWwudG9TdHJpbmcoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyaW5nID0gYCR7c3RyaW5nfV8ke3ZhbC50b1N0cmluZygpfWBcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9XG59XG4iXX0=