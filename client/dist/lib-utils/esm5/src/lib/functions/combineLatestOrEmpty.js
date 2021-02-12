/**
 * @fileoverview added by tsickle
 * Generated from: combineLatestOrEmpty.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// TODO DELETE UNUSED
import { combineLatest, of } from "rxjs";
import { map } from "rxjs/operators";
/**
 * Combine Latest or, if input is an empty array, emit empty array
 * @template I
 * @param {?} obs
 * @return {?}
 */
export function combineLatestOrEmpty(obs) {
    obs = tslib_1.__spread([of(null)], obs);
    return combineLatest(obs).pipe(map((/**
     * @param {?} values
     * @return {?}
     */
    function (values) {
        values.shift();
        return values;
    })));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYmluZUxhdGVzdE9yRW1wdHkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzL3NyYy9saWIvZnVuY3Rpb25zLyIsInNvdXJjZXMiOlsiY29tYmluZUxhdGVzdE9yRW1wdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBLE9BQU8sRUFBYyxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztBQUtyQyxNQUFNLFVBQVUsb0JBQW9CLENBQUksR0FBb0I7SUFDMUQsR0FBRyxxQkFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUssR0FBRyxDQUFDLENBQUM7SUFDekIsT0FBTyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUM1QixHQUFHOzs7O0lBQUMsVUFBQyxNQUFNO1FBQ1QsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUT0RPIERFTEVURSBVTlVTRURcbmltcG9ydCB7IE9ic2VydmFibGUsIGNvbWJpbmVMYXRlc3QsIG9mIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IG1hcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuXG4vKipcbiAqIENvbWJpbmUgTGF0ZXN0IG9yLCBpZiBpbnB1dCBpcyBhbiBlbXB0eSBhcnJheSwgZW1pdCBlbXB0eSBhcnJheVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdE9yRW1wdHk8ST4ob2JzOiBPYnNlcnZhYmxlPEk+W10pIHtcbiAgb2JzID0gW29mKG51bGwpLCAuLi5vYnNdO1xuICByZXR1cm4gY29tYmluZUxhdGVzdChvYnMpLnBpcGUoXG4gICAgbWFwKCh2YWx1ZXMpID0+IHtcbiAgICAgIHZhbHVlcy5zaGlmdCgpO1xuICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9KVxuICApO1xufVxuIl19