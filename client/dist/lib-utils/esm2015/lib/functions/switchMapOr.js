/**
 * @fileoverview added by tsickle
 * Generated from: lib/functions/switchMapOr.ts
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
        (x) => (!x || Object.keys(x).length < 1));
        return source.pipe(
        // auditTime(1),
        switchMap((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            return iif((/**
             * @return {?}
             */
            () => conditionForDefault(value)), of(defaultValue), elseOutput(value));
        })), tag(`switchMapOr`));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoTWFwT3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzLyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy9zd2l0Y2hNYXBPci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7QUFPM0MsTUFBTSxVQUFVLFdBQVcsQ0FBTyxZQUFlLEVBQUUsVUFBbUMsRUFBRSxtQkFBdUM7SUFDN0g7Ozs7SUFBTyxVQUFVLE1BQXFCO1FBRXBDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUEsQ0FBQTtRQUUxRyxPQUFPLE1BQU0sQ0FBQyxJQUFJO1FBQ2hCLGdCQUFnQjtRQUNoQixTQUFTOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUU7WUFDaEIsT0FBTyxHQUFHOzs7WUFBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsR0FBRSxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7UUFDbkYsQ0FBQyxFQUFDLEVBQ0YsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUNuQixDQUFBO0lBRUgsQ0FBQyxFQUFBO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlpZiwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhZyB9IGZyb20gJ3J4anMtc3B5L29wZXJhdG9ycyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuLyoqXG4gKiBzd2l0Y2hNYXBzIHRvIHRoZSBkZWZhdWx0LCBpZiBjb25kaXRpb24gaXMgdHJ1ZSwgZWxzZSB0byBwcm92aWRlZCBlbHNlT3V0cHV0XG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3dpdGNoTWFwT3I8SSwgTz4oZGVmYXVsdFZhbHVlOiBPLCBlbHNlT3V0cHV0OiAoczogSSkgPT4gT2JzZXJ2YWJsZTxPPiwgY29uZGl0aW9uRm9yRGVmYXVsdD86ICh4OiBJKSA9PiBib29sZWFuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc291cmNlOiBPYnNlcnZhYmxlPEk+KTogT2JzZXJ2YWJsZTxPPiB7XG5cbiAgICBjb25kaXRpb25Gb3JEZWZhdWx0ID0gY29uZGl0aW9uRm9yRGVmYXVsdCA/IGNvbmRpdGlvbkZvckRlZmF1bHQgOiAoeCkgPT4gKCF4IHx8IE9iamVjdC5rZXlzKHgpLmxlbmd0aCA8IDEpXG5cbiAgICByZXR1cm4gc291cmNlLnBpcGUoXG4gICAgICAvLyBhdWRpdFRpbWUoMSksXG4gICAgICBzd2l0Y2hNYXAodmFsdWUgPT4ge1xuICAgICAgICByZXR1cm4gaWlmKCgpID0+IGNvbmRpdGlvbkZvckRlZmF1bHQodmFsdWUpLCBvZihkZWZhdWx0VmFsdWUpLCBlbHNlT3V0cHV0KHZhbHVlKSlcbiAgICAgIH0pLFxuICAgICAgdGFnKGBzd2l0Y2hNYXBPcmApXG4gICAgKVxuXG4gIH1cbn1cbiJdfQ==