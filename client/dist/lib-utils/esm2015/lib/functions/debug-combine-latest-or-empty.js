/**
 * @fileoverview added by tsickle
 * Generated from: lib/functions/debug-combine-latest-or-empty.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctY29tYmluZS1sYXRlc3Qtb3ItZW1wdHkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzLyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy9kZWJ1Zy1jb21iaW5lLWxhdGVzdC1vci1lbXB0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsYUFBYSxFQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUQsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7QUFVdkQsTUFBTSxVQUFVLHlCQUF5QixDQUFJLEdBQW9CLEVBQUUsSUFBSSxHQUFHLEdBQUc7O1VBQ3JFLE1BQU0sR0FBRyxJQUFJLE9BQU8sRUFBRTs7VUFDdEIsTUFBTSxHQUFHLEVBQUU7SUFDakIsVUFBVTs7O0lBQUMsR0FBRyxFQUFFO1FBQ2QsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssTUFBTSxDQUFDLEdBQUc7Ozs7O1FBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDeEUsQ0FBQyxHQUFFLElBQUksQ0FBQyxDQUFBO0lBQ1IsR0FBRyxDQUFDLE9BQU87Ozs7O0lBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQ1AsS0FBSyxFQUFFLEVBQ1AsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUNsQixDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2xCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUE7UUFDbEIsQ0FBQyxFQUFDLENBQUE7SUFDSixDQUFDLEVBQUMsQ0FBQTtJQUNGLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLE9BQU8sYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FDNUIsR0FBRzs7OztJQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDYixNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDLEVBQUMsQ0FDSCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRPRE8gREVMRVRFIFVOVVNFRFxuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpcnN0LCBtYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBEZWJ1ZyBjb21iaW5lTGF0ZXN0T3JFbXB0eTpcbiAqIFdhaXRzIGZvciBhIG1vbWVudCBhbmQgcmVwb3J0cyB0byBjb25zb2xlIHdoaWNoIGl0ZW1zIGRpZCBub3QgbmV4dFxuICpcbiAqIEBwYXJhbSB3YWl0IG51bWJlciBvZiBtaWxpc2Vjb25kcyB0byB3YWl0XG4gKiBAcGFyYW0gbmFtZWRPYnMgYXJyYXkgb2Ygb2JqZWN0cyB3aXRoIGEgbmFtZSBhbmQgYSBvYnNlcnZhYmxlXG4gKiAgICAgICAgICAgICAgICAgIHRoZSBuYW1lIGlzIHVzZWQgdG8gY3JlYXRlIHRoZSByZXBvcnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlYnVnQ29tYmluZUxhdGVzdE9yRW1wdHk8ST4ob2JzOiBPYnNlcnZhYmxlPEk+W10sIHdhaXQgPSA1MDApIHtcbiAgY29uc3QgdW50aWwkID0gbmV3IFN1YmplY3QoKVxuICBjb25zdCByZXBvcnQgPSBbXVxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICB1bnRpbCQubmV4dCgpXG4gICAgY29uc29sZS5sb2coJz4gUmVwb3J0JylcbiAgICBjb25zb2xlLmxvZyhgICAke3JlcG9ydC5tYXAoKGl0ZW0sIGkpID0+IGAke2l9ICR7aXRlbX1gKS5qb2luKCdcXG4nKX1gKVxuICB9LCB3YWl0KVxuICBvYnMuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xuICAgIHJlcG9ydC5wdXNoKCc+IE5vIHZhbHVlIGVtaXR0ZWQnKVxuICAgIGl0ZW0ucGlwZShcbiAgICAgIGZpcnN0KCksXG4gICAgICB0YWtlVW50aWwodW50aWwkKVxuICAgICkuc3Vic2NyaWJlKCh2YWwpID0+IHtcbiAgICAgIHJlcG9ydFtpXSA9ICdPaydcbiAgICB9KVxuICB9KVxuICBvYnMgPSBbb2YobnVsbCksIC4uLm9ic107XG4gIHJldHVybiBjb21iaW5lTGF0ZXN0KG9icykucGlwZShcbiAgICBtYXAoKHZhbHVlcykgPT4ge1xuICAgICAgdmFsdWVzLnNoaWZ0KCk7XG4gICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH0pXG4gICk7XG59XG4iXX0=