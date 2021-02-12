/**
 * @fileoverview added by tsickle
 * Generated from: switchMapOr.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { iif, of } from 'rxjs';
import { tag } from 'rxjs-spy/operators';
import { switchMap } from 'rxjs/operators';
/**
 * switchMaps to the default, if condition is true, else to provided elseOutput
 *
 * @template I, O
 * @param {?} defaultValue
 * @param {?} elseOutput
 * @param {?=} conditionForDefault
 * @return {?}
 */
export function switchMapOr(defaultValue, elseOutput, conditionForDefault) {
    return (/**
     * @param {?} source
     * @return {?}
     */
    function (source) {
        conditionForDefault = conditionForDefault ? conditionForDefault : (/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return (!x || Object.keys(x).length < 1); });
        return source.pipe(
        // auditTime(1),
        switchMap((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return iif((/**
             * @return {?}
             */
            function () { return conditionForDefault(value); }), of(defaultValue), elseOutput(value));
        })), tag("switchMapOr"));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoTWFwT3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzL3NyYy9saWIvZnVuY3Rpb25zLyIsInNvdXJjZXMiOlsic3dpdGNoTWFwT3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7O0FBTzNDLE1BQU0sVUFBVSxXQUFXLENBQU8sWUFBZSxFQUFFLFVBQW1DLEVBQUUsbUJBQXVDO0lBQzdIOzs7O0lBQU8sVUFBVSxNQUFxQjtRQUVwQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7OztRQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBakMsQ0FBaUMsQ0FBQSxDQUFBO1FBRTFHLE9BQU8sTUFBTSxDQUFDLElBQUk7UUFDaEIsZ0JBQWdCO1FBQ2hCLFNBQVM7Ozs7UUFBQyxVQUFBLEtBQUs7WUFDYixPQUFPLEdBQUc7OztZQUFDLGNBQU0sT0FBQSxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsRUFBMUIsQ0FBMEIsR0FBRSxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7UUFDbkYsQ0FBQyxFQUFDLEVBQ0YsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUNuQixDQUFBO0lBRUgsQ0FBQyxFQUFBO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlpZiwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhZyB9IGZyb20gJ3J4anMtc3B5L29wZXJhdG9ycyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuLyoqXG4gKiBzd2l0Y2hNYXBzIHRvIHRoZSBkZWZhdWx0LCBpZiBjb25kaXRpb24gaXMgdHJ1ZSwgZWxzZSB0byBwcm92aWRlZCBlbHNlT3V0cHV0XG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3dpdGNoTWFwT3I8SSwgTz4oZGVmYXVsdFZhbHVlOiBPLCBlbHNlT3V0cHV0OiAoczogSSkgPT4gT2JzZXJ2YWJsZTxPPiwgY29uZGl0aW9uRm9yRGVmYXVsdD86ICh4OiBJKSA9PiBib29sZWFuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc291cmNlOiBPYnNlcnZhYmxlPEk+KTogT2JzZXJ2YWJsZTxPPiB7XG5cbiAgICBjb25kaXRpb25Gb3JEZWZhdWx0ID0gY29uZGl0aW9uRm9yRGVmYXVsdCA/IGNvbmRpdGlvbkZvckRlZmF1bHQgOiAoeCkgPT4gKCF4IHx8IE9iamVjdC5rZXlzKHgpLmxlbmd0aCA8IDEpXG5cbiAgICByZXR1cm4gc291cmNlLnBpcGUoXG4gICAgICAvLyBhdWRpdFRpbWUoMSksXG4gICAgICBzd2l0Y2hNYXAodmFsdWUgPT4ge1xuICAgICAgICByZXR1cm4gaWlmKCgpID0+IGNvbmRpdGlvbkZvckRlZmF1bHQodmFsdWUpLCBvZihkZWZhdWx0VmFsdWUpLCBlbHNlT3V0cHV0KHZhbHVlKSlcbiAgICAgIH0pLFxuICAgICAgdGFnKGBzd2l0Y2hNYXBPcmApXG4gICAgKVxuXG4gIH1cbn1cbiJdfQ==