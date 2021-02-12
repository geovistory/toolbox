/**
 * @fileoverview added by tsickle
 * Generated from: lib/functions/combineLatestOrEmpty.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYmluZUxhdGVzdE9yRW1wdHkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzLyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy9jb21iaW5lTGF0ZXN0T3JFbXB0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQWMsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7QUFLckMsTUFBTSxVQUFVLG9CQUFvQixDQUFJLEdBQW9CO0lBQzFELEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLE9BQU8sYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FDNUIsR0FBRzs7OztJQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDYixNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDLEVBQUMsQ0FDSCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRPRE8gREVMRVRFIFVOVVNFRFxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgY29tYmluZUxhdGVzdCwgb2YgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5cbi8qKlxuICogQ29tYmluZSBMYXRlc3Qgb3IsIGlmIGlucHV0IGlzIGFuIGVtcHR5IGFycmF5LCBlbWl0IGVtcHR5IGFycmF5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0T3JFbXB0eTxJPihvYnM6IE9ic2VydmFibGU8ST5bXSkge1xuICBvYnMgPSBbb2YobnVsbCksIC4uLm9ic107XG4gIHJldHVybiBjb21iaW5lTGF0ZXN0KG9icykucGlwZShcbiAgICBtYXAoKHZhbHVlcykgPT4ge1xuICAgICAgdmFsdWVzLnNoaWZ0KCk7XG4gICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH0pXG4gICk7XG59XG4iXX0=