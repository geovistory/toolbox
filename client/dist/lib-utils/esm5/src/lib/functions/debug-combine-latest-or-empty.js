/**
 * @fileoverview added by tsickle
 * Generated from: debug-combine-latest-or-empty.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// TODO DELETE UNUSED
import { combineLatest, of, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
/**
 * Debug combineLatestOrEmpty:
 * Waits for a moment and reports to console which items did not next
 *
 * @template I
 * @param {?} obs
 * @param {?=} wait number of miliseconds to wait
 * @return {?}
 */
export function debugCombineLatestOrEmpty(obs, wait) {
    if (wait === void 0) { wait = 500; }
    /** @type {?} */
    var until$ = new Subject();
    /** @type {?} */
    var report = [];
    setTimeout((/**
     * @return {?}
     */
    function () {
        until$.next();
        console.log('> Report');
        console.log("  " + report.map((/**
         * @param {?} item
         * @param {?} i
         * @return {?}
         */
        function (item, i) { return i + " " + item; })).join('\n'));
    }), wait);
    obs.forEach((/**
     * @param {?} item
     * @param {?} i
     * @return {?}
     */
    function (item, i) {
        report.push('> No value emitted');
        item.pipe(first(), takeUntil(until$)).subscribe((/**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            report[i] = 'Ok';
        }));
    }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctY29tYmluZS1sYXRlc3Qtb3ItZW1wdHkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzL3NyYy9saWIvZnVuY3Rpb25zLyIsInNvdXJjZXMiOlsiZGVidWctY29tYmluZS1sYXRlc3Qtb3ItZW1wdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBLE9BQU8sRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5RCxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7OztBQVV2RCxNQUFNLFVBQVUseUJBQXlCLENBQUksR0FBb0IsRUFBRSxJQUFVO0lBQVYscUJBQUEsRUFBQSxVQUFVOztRQUNyRSxNQUFNLEdBQUcsSUFBSSxPQUFPLEVBQUU7O1FBQ3RCLE1BQU0sR0FBRyxFQUFFO0lBQ2pCLFVBQVU7OztJQUFDO1FBQ1QsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQUssTUFBTSxDQUFDLEdBQUc7Ozs7O1FBQUMsVUFBQyxJQUFJLEVBQUUsQ0FBQyxJQUFLLE9BQUcsQ0FBQyxTQUFJLElBQU0sRUFBZCxDQUFjLEVBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFHLENBQUMsQ0FBQTtJQUN4RSxDQUFDLEdBQUUsSUFBSSxDQUFDLENBQUE7SUFDUixHQUFHLENBQUMsT0FBTzs7Ozs7SUFBQyxVQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUNQLEtBQUssRUFBRSxFQUNQLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FDbEIsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxHQUFHO1lBQ2QsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQTtRQUNsQixDQUFDLEVBQUMsQ0FBQTtJQUNKLENBQUMsRUFBQyxDQUFBO0lBQ0YsR0FBRyxxQkFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUssR0FBRyxDQUFDLENBQUM7SUFDekIsT0FBTyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUM1QixHQUFHOzs7O0lBQUMsVUFBQyxNQUFNO1FBQ1QsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUT0RPIERFTEVURSBVTlVTRURcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaXJzdCwgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogRGVidWcgY29tYmluZUxhdGVzdE9yRW1wdHk6XG4gKiBXYWl0cyBmb3IgYSBtb21lbnQgYW5kIHJlcG9ydHMgdG8gY29uc29sZSB3aGljaCBpdGVtcyBkaWQgbm90IG5leHRcbiAqXG4gKiBAcGFyYW0gd2FpdCBudW1iZXIgb2YgbWlsaXNlY29uZHMgdG8gd2FpdFxuICogQHBhcmFtIG5hbWVkT2JzIGFycmF5IG9mIG9iamVjdHMgd2l0aCBhIG5hbWUgYW5kIGEgb2JzZXJ2YWJsZVxuICogICAgICAgICAgICAgICAgICB0aGUgbmFtZSBpcyB1c2VkIHRvIGNyZWF0ZSB0aGUgcmVwb3J0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWJ1Z0NvbWJpbmVMYXRlc3RPckVtcHR5PEk+KG9iczogT2JzZXJ2YWJsZTxJPltdLCB3YWl0ID0gNTAwKSB7XG4gIGNvbnN0IHVudGlsJCA9IG5ldyBTdWJqZWN0KClcbiAgY29uc3QgcmVwb3J0ID0gW11cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgdW50aWwkLm5leHQoKVxuICAgIGNvbnNvbGUubG9nKCc+IFJlcG9ydCcpXG4gICAgY29uc29sZS5sb2coYCAgJHtyZXBvcnQubWFwKChpdGVtLCBpKSA9PiBgJHtpfSAke2l0ZW19YCkuam9pbignXFxuJyl9YClcbiAgfSwgd2FpdClcbiAgb2JzLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICByZXBvcnQucHVzaCgnPiBObyB2YWx1ZSBlbWl0dGVkJylcbiAgICBpdGVtLnBpcGUoXG4gICAgICBmaXJzdCgpLFxuICAgICAgdGFrZVVudGlsKHVudGlsJClcbiAgICApLnN1YnNjcmliZSgodmFsKSA9PiB7XG4gICAgICByZXBvcnRbaV0gPSAnT2snXG4gICAgfSlcbiAgfSlcbiAgb2JzID0gW29mKG51bGwpLCAuLi5vYnNdO1xuICByZXR1cm4gY29tYmluZUxhdGVzdChvYnMpLnBpcGUoXG4gICAgbWFwKCh2YWx1ZXMpID0+IHtcbiAgICAgIHZhbHVlcy5zaGlmdCgpO1xuICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9KVxuICApO1xufVxuIl19