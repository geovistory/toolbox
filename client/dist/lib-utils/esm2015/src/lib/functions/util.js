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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvc3JjL2xpYi9mdW5jdGlvbnMvIiwic291cmNlcyI6WyJ1dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUEsNENBVUM7OztJQVBDLDJDQUFtQjs7SUFHbkIsK0NBQXVCOztJQUd2QixzQ0FBZTs7Ozs7QUFLakIsTUFBTSxPQUFPLENBQUM7Ozs7OztJQUVaLE1BQU0sQ0FBQyxPQUFPLENBQUksR0FBeUI7O2NBQ25DLEdBQUcsR0FBRyxFQUFFO1FBRWQsSUFBSSxHQUFHLElBQUksU0FBUztZQUFFLE9BQU8sR0FBRyxDQUFDO1FBRWpDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckIsQ0FBQyxFQUFDLENBQUM7UUFFSCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Ozs7OztJQUVELE1BQU0sQ0FBQyxTQUFTLENBQUksR0FBeUI7O2NBQ3JDLEdBQUcsR0FBRyxFQUFFO1FBRWQsSUFBSSxHQUFHLElBQUksU0FBUztZQUFFLE9BQU8sR0FBRyxDQUFDO1FBRWpDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckIsQ0FBQyxFQUFDLENBQUM7UUFFSCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Ozs7Ozs7OztJQVFELE1BQU0sQ0FBQyxlQUFlLENBQUksR0FBeUI7O2NBQzNDLElBQUksR0FBRyxFQUFFO1FBQ2YsS0FBSyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUU7WUFDckIsSUFBSSxHQUFHLENBQUMsR0FBRyxD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YSxFQUFFLENBQUE7Z0JBQ2pCLElBQUksQ0FBQyxDQUFDLFFBQVE7b0JBQUUsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzdDLENBQUMsRUFBQyxDQUFBO1NBQ0g7YUFDSTtZQUNILGlDQUFpQztZQUNqQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7O3NCQUN4QixDQUFDLEdBQUcsbUJBQUEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBYTtnQkFDakQsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFBO2dCQUNqQixJQUFJLENBQUMsQ0FBQyxRQUFRO29CQUFFLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUU1QztTQUNGO0tBQ0Y7QUFDSCxDQUFDLEVBQUE7OztJQXBCRCx5QkFvQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtQXJyYXksIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFByb1RleHRQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBMYWJlbEdlbmVyYXRvclNldHRpbmdzIHtcbiAgLy8gbWF4aW11bSBudW1iZXIgb2YgZGF0YSB1bml0IGNoaWxkcmVuIHRoYXQgYXJlIHRha2VuIGludG8gYWNjb3VudCBmb3IgdGhlIGxhYmVsIGdlbmVyYXRvclxuICAvLyBlLmcuOiBmb3IgYSBBcHBlRm9yTGFuZ3VhZ2UgaXQgd2lsbCB0YWtlIG9ubHkgbGFiZWwgYW5kIGxhbmd1YWdlLCB3aGVuIHlvdSBwdXQgaXQgdG8gMlxuICBmaWVsZHNNYXg/OiBudW1iZXI7XG5cbiAgLy8gbWF4aW11bSBudW1iZXIgb2Ygc3RhdGVtZW50cyBwZXIgcHJvcGVydHlGaWVsZCB0YWtlbiBpbnRvIGFjY291bnQgZm9yIHRoZSBsYWJlbCBnZW5lcmF0b3JcbiAgc3RhdGVtZW50c01heD86IG51bWJlcjtcblxuICAvLyBwYXRoIG9mIHRoYXQgZWxlbWVudCBpbiB0aGUgc3RvcmUuIHVzZWZ1bCB0byBhdHRhdGNoIGxlYWYtcGUtaXQtdmlld1xuICBwYXRoOiBzdHJpbmdbXTtcbn0vKipcbiAqIFV0aWxpdGllcyBjbGFzcyBmb3Igc3RhdGljIGZ1bmN0aW9uc1xuICovXG5cbmV4cG9ydCBjbGFzcyBVIHtcblxuICBzdGF0aWMgb2JqMkFycjxUPihvYmo6IHsgW2tleTogc3RyaW5nXTogVCB9KTogVFtdIHtcbiAgICBjb25zdCBhcnIgPSBbXTtcblxuICAgIGlmIChvYmogPT0gdW5kZWZpbmVkKSByZXR1cm4gYXJyO1xuXG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBhcnIucHVzaChvYmpba2V5XSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgc3RhdGljIG9iak5yMkFycjxUPihvYmo6IHsgW2tleTogbnVtYmVyXTogVCB9KTogVFtdIHtcbiAgICBjb25zdCBhcnIgPSBbXTtcblxuICAgIGlmIChvYmogPT0gdW5kZWZpbmVkKSByZXR1cm4gYXJyO1xuXG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBhcnIucHVzaChvYmpba2V5XSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbnZlcnRzIG9iamVjdCB0byBhcnJheSB3aXRoIHtrZXk6IHZhbHVlfSBvYmplY3RzLCBlLmcuOlxuICAgKiB7J2EnOiAxMiwgJ2InOiA5OX0gLS0+IFt7a2V5OiAnYScsIHZhbHVlOiAxMiwga2V5OiAnYicsIHZhbHVlOiA5OX1dXG4gICAqXG4gICAqIEBwYXJhbSBvYmpcbiAgICovXG4gIHN0YXRpYyBvYmoyS2V5VmFsdWVBcnI8VD4ob2JqOiB7IFtrZXk6IHN0cmluZ106IFQgfSk6IHsga2V5OiBzdHJpbmcsIHZhbHVlOiBUIH1bXSB7XG4gICAgY29uc3Qga2V5cyA9IFtdO1xuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgaWYgKG9ialtrZXldKSB7XG4gICAgICAgIGtleXMucHVzaCh7IGtleToga2V5LCB2YWx1ZTogb2JqW2tleV0gfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBrZXlzO1xuICB9XG5cblxuXG4gIHN0YXRpYyBmaXJzdFByb1RleHRQcm9wU3RyaW5nT2ZUeXBlKHRleHRQcm9wZXJ0aWVzOiBQcm9UZXh0UHJvcGVydHlbXSwgZmtTeXN0ZW1UeXBlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRleHRQcm9wZXJ0aWVzLmZpbmQodCA9PiB0LmZrX3N5c3RlbV90eXBlID09PSBma1N5c3RlbVR5cGUpIHx8IHsgc3RyaW5nOiAnJyB9KS5zdHJpbmdcbiAgfVxuXG4gIC8qKlxuICAqIEVyemV1Z3QgZWluZSBVVUlEIG5hY2ggUkZDIDQxMjJcbiAgKi9cbiAgc3RhdGljIHV1aWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCAoY2hhcikgPT4ge1xuICAgICAgY29uc3QgcmFuZG9tID0gTWF0aC5yYW5kb20oKSAqIDE2IHwgMDsgLy8gTmFjaGtvbW1hc3RlbGxlbiBhYnNjaG5laWRlblxuICAgICAgY29uc3QgdmFsdWUgPSBjaGFyID09PSAneCcgPyByYW5kb20gOiAocmFuZG9tICUgNCArIDgpOyAvLyBCZWkgeCBSYW5kb20gMC0xNSAoMC1GKSwgYmVpIHkgUmFuZG9tIDAtMyArIDggPSA4LTExICg4LWIpIGdlbcOkc3MgUkZDIDQxMjJcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygxNik7IC8vIEhleGFkZXppbWFsZXMgWmVpY2hlbiB6dXLDvGNrZ2ViZW5cbiAgICB9KTtcbiAgfVxuXG5cblxuICBzdGF0aWMgcmVjdXJzaXZlTWFya0FzVG91Y2hlZCA9IChmOiBGb3JtQXJyYXkgfCBGb3JtR3JvdXApID0+IHtcblxuICAgIGlmIChmLmNvbnRyb2xzKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShmLmNvbnRyb2xzKSkge1xuICAgICAgICAvLyBpbiB0aGlzIGNhc2UgaXQgaXMgYSBmb3JtQXJyYXlcbiAgICAgICAgZi5jb250cm9scy5mb3JFYWNoKChjOiBGb3JtQXJyYXkpID0+IHtcbiAgICAgICAgICBjLm1hcmtBc1RvdWNoZWQoKVxuICAgICAgICAgIGlmIChjLmNvbnRyb2xzKSBVLnJlY3Vyc2l2ZU1hcmtBc1RvdWNoZWQoYylcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBpbiB0aGlzIGNhc2UgaXQgaXMgYSBmb3JtR3JvdXBcbiAgICAgICAgaWYgKGYuY29udHJvbHNbJ2NoaWxkQ29udHJvbCddKSB7XG4gICAgICAgICAgY29uc3QgYyA9IGYuY29udHJvbHNbJ2NoaWxkQ29udHJvbCddIGFzIEZvcm1BcnJheTtcbiAgICAgICAgICBjLm1hcmtBc1RvdWNoZWQoKVxuICAgICAgICAgIGlmIChjLmNvbnRyb2xzKSBVLnJlY3Vyc2l2ZU1hcmtBc1RvdWNoZWQoYylcblxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHByb3BlcnR5RmllbGRLZXlGcm9tUGFyYW1zKGZrUHJvcDogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuKSB7XG4gICAgcmV0dXJuICdfJyArIGZrUHJvcCArICdfJyArIChpc091dGdvaW5nID8gJ291dGdvaW5nJyA6ICdpbmdvaW5nJylcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IGNvbnZlcnRzIGdpdmVuIG51bWJlciB0byBzdHJpbmdcbiAgICogYnV0IHplcm8gKD0wKSB2YWx1ZXMgcmV0dXJuIHVuZGVmaW5lZC5cbiAgICovXG4gIHN0YXRpYyB0b1N0cjB1bmRlZih2YWw6IG51bWJlcik6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHZhbCA9PT0gMCkgcmV0dXJuIHVuZGVmaW5lZFxuICAgIGVsc2UgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgZWxzZSBpZiAodmFsID09PSBudWxsKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgZWxzZSByZXR1cm4gdmFsLnRvU3RyaW5nKCk7XG4gIH1cbiAgLyoqXG4gICAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IGNvbnZlcnRzIGdpdmVuIGFycmF5IHRvIHN0cmluZ1xuICAgKlxuICAgKiBJZiBhcnJheSBjb250YWlucyAwLCBudWxsIG9yIHVuZGVmaW5lZCwgcmV0dXJuIHVuZGVyZmluZWRcbiAgICovXG4gIHN0YXRpYyB0b1N0ckNvbnRhaW5zMHVuZGVmKHZhbHM6IChudW1iZXIgfCBib29sZWFuIHwgc3RyaW5nIHwgb2JqZWN0KVtdKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBsZXQgc3RyaW5nID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB2YWwgPSB2YWxzW2ldO1xuXG4gICAgICBpZiAodmFsID09PSAwKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgZWxzZSBpZiAodmFsID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICBlbHNlIGlmICh2YWwgPT09IG51bGwpIHJldHVybiB1bmRlZmluZWRcbiAgICAgIGVsc2UgaWYgKGkgPT09IDApIHtcbiAgICAgICAgc3RyaW5nID0gdmFsLnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0cmluZyA9IGAke3N0cmluZ31fJHt2YWwudG9TdHJpbmcoKX1gXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxufVxuIl19