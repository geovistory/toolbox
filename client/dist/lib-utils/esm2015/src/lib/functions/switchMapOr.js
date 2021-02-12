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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoTWFwT3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzL3NyYy9saWIvZnVuY3Rpb25zLyIsInNvdXJjZXMiOlsic3dpdGNoTWFwT3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7O0FBTzNDLE1BQU0sVUFBVSxXQUFXLENBQU8sWUFBZSxFQUFFLFVBQW1DLEVBQUUsbUJBQXVDO0lBQzdIOzs7O0lBQU8sVUFBVSxNQUFxQjtRQUVwQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBLENBQUE7UUFFMUcsT0FBTyxNQUFNLENBQUMsSUFBSTtRQUNoQixnQkFBZ0I7UUFDaEIsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hCLE9BQU8sR0FBRzs7O1lBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEdBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO1FBQ25GLENBQUMsRUFBQyxFQUNGLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FDbkIsQ0FBQTtJQUVILENBQUMsRUFBQTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpaWYsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWcgfSBmcm9tICdyeGpzLXNweS9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbi8qKlxuICogc3dpdGNoTWFwcyB0byB0aGUgZGVmYXVsdCwgaWYgY29uZGl0aW9uIGlzIHRydWUsIGVsc2UgdG8gcHJvdmlkZWQgZWxzZU91dHB1dFxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN3aXRjaE1hcE9yPEksIE8+KGRlZmF1bHRWYWx1ZTogTywgZWxzZU91dHB1dDogKHM6IEkpID0+IE9ic2VydmFibGU8Tz4sIGNvbmRpdGlvbkZvckRlZmF1bHQ/OiAoeDogSSkgPT4gYm9vbGVhbikge1xuICByZXR1cm4gZnVuY3Rpb24gKHNvdXJjZTogT2JzZXJ2YWJsZTxJPik6IE9ic2VydmFibGU8Tz4ge1xuXG4gICAgY29uZGl0aW9uRm9yRGVmYXVsdCA9IGNvbmRpdGlvbkZvckRlZmF1bHQgPyBjb25kaXRpb25Gb3JEZWZhdWx0IDogKHgpID0+ICgheCB8fCBPYmplY3Qua2V5cyh4KS5sZW5ndGggPCAxKVxuXG4gICAgcmV0dXJuIHNvdXJjZS5waXBlKFxuICAgICAgLy8gYXVkaXRUaW1lKDEpLFxuICAgICAgc3dpdGNoTWFwKHZhbHVlID0+IHtcbiAgICAgICAgcmV0dXJuIGlpZigoKSA9PiBjb25kaXRpb25Gb3JEZWZhdWx0KHZhbHVlKSwgb2YoZGVmYXVsdFZhbHVlKSwgZWxzZU91dHB1dCh2YWx1ZSkpXG4gICAgICB9KSxcbiAgICAgIHRhZyhgc3dpdGNoTWFwT3JgKVxuICAgIClcblxuICB9XG59XG4iXX0=