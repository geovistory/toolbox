/**
 * @fileoverview added by tsickle
 * Generated from: debug-combine-latest-or-empty.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export function debugCombineLatestOrEmpty(obs, wait = 500) {
    /** @type {?} */
    const until$ = new Subject();
    /** @type {?} */
    const report = [];
    setTimeout((/**
     * @return {?}
     */
    () => {
        until$.next();
        console.log('> Report');
        console.log(`  ${report.map((/**
         * @param {?} item
         * @param {?} i
         * @return {?}
         */
        (item, i) => `${i} ${item}`)).join('\n')}`);
    }), wait);
    obs.forEach((/**
     * @param {?} item
     * @param {?} i
     * @return {?}
     */
    (item, i) => {
        report.push('> No value emitted');
        item.pipe(first(), takeUntil(until$)).subscribe((/**
         * @param {?} val
         * @return {?}
         */
        (val) => {
            report[i] = 'Ok';
        }));
    }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctY29tYmluZS1sYXRlc3Qtb3ItZW1wdHkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzL3NyYy9saWIvZnVuY3Rpb25zLyIsInNvdXJjZXMiOlsiZGVidWctY29tYmluZS1sYXRlc3Qtb3ItZW1wdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlELE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7O0FBVXZELE1BQU0sVUFBVSx5QkFBeUIsQ0FBSSxHQUFvQixFQUFFLElBQUksR0FBRyxHQUFHOztVQUNyRSxNQUFNLEdBQUcsSUFBSSxPQUFPLEVBQUU7O1VBQ3RCLE1BQU0sR0FBRyxFQUFFO0lBQ2pCLFVBQVU7OztJQUFDLEdBQUcsRUFBRTtRQUNkLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxHQUFHOzs7OztRQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ3hFLENBQUMsR0FBRSxJQUFJLENBQUMsQ0FBQTtJQUNSLEdBQUcsQ0FBQyxPQUFPOzs7OztJQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUNQLEtBQUssRUFBRSxFQUNQLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FDbEIsQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNsQixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFBO1FBQ2xCLENBQUMsRUFBQyxDQUFBO0lBQ0osQ0FBQyxFQUFDLENBQUE7SUFDRixHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUN6QixPQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQzVCLEdBQUc7Ozs7SUFBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ2IsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUT0RPIERFTEVURSBVTlVTRURcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaXJzdCwgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogRGVidWcgY29tYmluZUxhdGVzdE9yRW1wdHk6XG4gKiBXYWl0cyBmb3IgYSBtb21lbnQgYW5kIHJlcG9ydHMgdG8gY29uc29sZSB3aGljaCBpdGVtcyBkaWQgbm90IG5leHRcbiAqXG4gKiBAcGFyYW0gd2FpdCBudW1iZXIgb2YgbWlsaXNlY29uZHMgdG8gd2FpdFxuICogQHBhcmFtIG5hbWVkT2JzIGFycmF5IG9mIG9iamVjdHMgd2l0aCBhIG5hbWUgYW5kIGEgb2JzZXJ2YWJsZVxuICogICAgICAgICAgICAgICAgICB0aGUgbmFtZSBpcyB1c2VkIHRvIGNyZWF0ZSB0aGUgcmVwb3J0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWJ1Z0NvbWJpbmVMYXRlc3RPckVtcHR5PEk+KG9iczogT2JzZXJ2YWJsZTxJPltdLCB3YWl0ID0gNTAwKSB7XG4gIGNvbnN0IHVudGlsJCA9IG5ldyBTdWJqZWN0KClcbiAgY29uc3QgcmVwb3J0ID0gW11cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgdW50aWwkLm5leHQoKVxuICAgIGNvbnNvbGUubG9nKCc+IFJlcG9ydCcpXG4gICAgY29uc29sZS5sb2coYCAgJHtyZXBvcnQubWFwKChpdGVtLCBpKSA9PiBgJHtpfSAke2l0ZW19YCkuam9pbignXFxuJyl9YClcbiAgfSwgd2FpdClcbiAgb2JzLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICByZXBvcnQucHVzaCgnPiBObyB2YWx1ZSBlbWl0dGVkJylcbiAgICBpdGVtLnBpcGUoXG4gICAgICBmaXJzdCgpLFxuICAgICAgdGFrZVVudGlsKHVudGlsJClcbiAgICApLnN1YnNjcmliZSgodmFsKSA9PiB7XG4gICAgICByZXBvcnRbaV0gPSAnT2snXG4gICAgfSlcbiAgfSlcbiAgb2JzID0gW29mKG51bGwpLCAuLi5vYnNdO1xuICByZXR1cm4gY29tYmluZUxhdGVzdChvYnMpLnBpcGUoXG4gICAgbWFwKCh2YWx1ZXMpID0+IHtcbiAgICAgIHZhbHVlcy5zaGlmdCgpO1xuICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9KVxuICApO1xufVxuIl19