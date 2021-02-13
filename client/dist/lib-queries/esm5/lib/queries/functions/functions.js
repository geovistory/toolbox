/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/functions/functions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { TimeSpanUtil } from '@kleiolab/lib-utils';
import { DfhConfig } from '@kleiolab/lib-config';
/**
 * @param {?} timeSpanItem
 * @return {?}
 */
export function timeSpanItemToTimeSpan(timeSpanItem) {
    /** @type {?} */
    var t = new TimeSpanUtil();
    timeSpanItem.properties.forEach((/**
     * @param {?} p
     * @return {?}
     */
    function (p) {
        /** @type {?} */
        var key = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY[p.listDefinition.property.pkProperty];
        if (p.items && p.items.length)
            t[key] = p.items[0].timePrimitive;
    }));
    return t;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzLyIsInNvdXJjZXMiOlsibGliL3F1ZXJpZXMvZnVuY3Rpb25zL2Z1bmN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0FBRWpELE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxZQUEwQjs7UUFDekQsQ0FBQyxHQUFHLElBQUksWUFBWSxFQUFFO0lBRTVCLFlBQVksQ0FBQyxVQUFVLENBQUMsT0FBTzs7OztJQUFDLFVBQUEsQ0FBQzs7WUFDekIsR0FBRyxHQUFHLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDN0YsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQTtJQUNsRSxDQUFDLEVBQUMsQ0FBQTtJQUNGLE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRpbWVTcGFuSXRlbSB9IGZyb20gJy4uL21vZGVscy9UaW1lU3Bhbkl0ZW0nO1xuaW1wb3J0IHsgVGltZVNwYW5VdGlsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBEZmhDb25maWcgfSBmcm9tICdAa2xlaW9sYWIvbGliLWNvbmZpZyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lU3Bhbkl0ZW1Ub1RpbWVTcGFuKHRpbWVTcGFuSXRlbTogVGltZVNwYW5JdGVtKTogVGltZVNwYW5VdGlsIHtcbiAgY29uc3QgdCA9IG5ldyBUaW1lU3BhblV0aWwoKTtcblxuICB0aW1lU3Bhbkl0ZW0ucHJvcGVydGllcy5mb3JFYWNoKHAgPT4ge1xuICAgIGNvbnN0IGtleSA9IERmaENvbmZpZy5QUk9QRVJUWV9QS19UT19FWElTVEVOQ0VfVElNRV9LRVlbcC5saXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5XVxuICAgIGlmIChwLml0ZW1zICYmIHAuaXRlbXMubGVuZ3RoKSB0W2tleV0gPSBwLml0ZW1zWzBdLnRpbWVQcmltaXRpdmVcbiAgfSlcbiAgcmV0dXJuIHQ7XG59XG4iXX0=