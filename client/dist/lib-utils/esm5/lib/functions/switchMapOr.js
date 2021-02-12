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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoTWFwT3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzLyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy9zd2l0Y2hNYXBPci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7QUFPM0MsTUFBTSxVQUFVLFdBQVcsQ0FBTyxZQUFlLEVBQUUsVUFBbUMsRUFBRSxtQkFBdUM7SUFDN0g7Ozs7SUFBTyxVQUFVLE1BQXFCO1FBRXBDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOzs7O1FBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFqQyxDQUFpQyxDQUFBLENBQUE7UUFFMUcsT0FBTyxNQUFNLENBQUMsSUFBSTtRQUNoQixnQkFBZ0I7UUFDaEIsU0FBUzs7OztRQUFDLFVBQUEsS0FBSztZQUNiLE9BQU8sR0FBRzs7O1lBQUMsY0FBTSxPQUFBLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxFQUExQixDQUEwQixHQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtRQUNuRixDQUFDLEVBQUMsRUFDRixHQUFHLENBQUMsYUFBYSxDQUFDLENBQ25CLENBQUE7SUFFSCxDQUFDLEVBQUE7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaWlmLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFnIH0gZnJvbSAncnhqcy1zcHkvb3BlcmF0b3JzJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG4vKipcbiAqIHN3aXRjaE1hcHMgdG8gdGhlIGRlZmF1bHQsIGlmIGNvbmRpdGlvbiBpcyB0cnVlLCBlbHNlIHRvIHByb3ZpZGVkIGVsc2VPdXRwdXRcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzd2l0Y2hNYXBPcjxJLCBPPihkZWZhdWx0VmFsdWU6IE8sIGVsc2VPdXRwdXQ6IChzOiBJKSA9PiBPYnNlcnZhYmxlPE8+LCBjb25kaXRpb25Gb3JEZWZhdWx0PzogKHg6IEkpID0+IGJvb2xlYW4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzb3VyY2U6IE9ic2VydmFibGU8ST4pOiBPYnNlcnZhYmxlPE8+IHtcblxuICAgIGNvbmRpdGlvbkZvckRlZmF1bHQgPSBjb25kaXRpb25Gb3JEZWZhdWx0ID8gY29uZGl0aW9uRm9yRGVmYXVsdCA6ICh4KSA9PiAoIXggfHwgT2JqZWN0LmtleXMoeCkubGVuZ3RoIDwgMSlcblxuICAgIHJldHVybiBzb3VyY2UucGlwZShcbiAgICAgIC8vIGF1ZGl0VGltZSgxKSxcbiAgICAgIHN3aXRjaE1hcCh2YWx1ZSA9PiB7XG4gICAgICAgIHJldHVybiBpaWYoKCkgPT4gY29uZGl0aW9uRm9yRGVmYXVsdCh2YWx1ZSksIG9mKGRlZmF1bHRWYWx1ZSksIGVsc2VPdXRwdXQodmFsdWUpKVxuICAgICAgfSksXG4gICAgICB0YWcoYHN3aXRjaE1hcE9yYClcbiAgICApXG5cbiAgfVxufVxuIl19