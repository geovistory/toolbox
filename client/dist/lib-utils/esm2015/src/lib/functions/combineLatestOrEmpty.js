/**
 * @fileoverview added by tsickle
 * Generated from: combineLatestOrEmpty.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYmluZUxhdGVzdE9yRW1wdHkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzL3NyYy9saWIvZnVuY3Rpb25zLyIsInNvdXJjZXMiOlsiY29tYmluZUxhdGVzdE9yRW1wdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUFjLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBS3JDLE1BQU0sVUFBVSxvQkFBb0IsQ0FBSSxHQUFvQjtJQUMxRCxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUN6QixPQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQzVCLEdBQUc7Ozs7SUFBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ2IsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUT0RPIERFTEVURSBVTlVTRURcbmltcG9ydCB7IE9ic2VydmFibGUsIGNvbWJpbmVMYXRlc3QsIG9mIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IG1hcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuXG4vKipcbiAqIENvbWJpbmUgTGF0ZXN0IG9yLCBpZiBpbnB1dCBpcyBhbiBlbXB0eSBhcnJheSwgZW1pdCBlbXB0eSBhcnJheVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdE9yRW1wdHk8ST4ob2JzOiBPYnNlcnZhYmxlPEk+W10pIHtcbiAgb2JzID0gW29mKG51bGwpLCAuLi5vYnNdO1xuICByZXR1cm4gY29tYmluZUxhdGVzdChvYnMpLnBpcGUoXG4gICAgbWFwKCh2YWx1ZXMpID0+IHtcbiAgICAgIHZhbHVlcy5zaGlmdCgpO1xuICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9KVxuICApO1xufVxuIl19