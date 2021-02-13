/**
 * @fileoverview added by tsickle
 * Generated from: functions/functions.ts
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
    const t = new TimeSpanUtil();
    timeSpanItem.properties.forEach((/**
     * @param {?} p
     * @return {?}
     */
    p => {
        /** @type {?} */
        const key = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY[p.listDefinition.property.pkProperty];
        if (p.items && p.items.length)
            t[key] = p.items[0].timePrimitive;
    }));
    return t;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzL3NyYy9saWIvcXVlcmllcy8iLCJzb3VyY2VzIjpbImZ1bmN0aW9ucy9mdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7OztBQUVqRCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsWUFBMEI7O1VBQ3pELENBQUMsR0FBRyxJQUFJLFlBQVksRUFBRTtJQUU1QixZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU87Ozs7SUFBQyxDQUFDLENBQUMsRUFBRTs7Y0FDNUIsR0FBRyxHQUFHLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDN0YsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQTtJQUNsRSxDQUFDLEVBQUMsQ0FBQTtJQUNGLE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRpbWVTcGFuSXRlbSB9IGZyb20gJy4uL21vZGVscy9UaW1lU3Bhbkl0ZW0nO1xuaW1wb3J0IHsgVGltZVNwYW5VdGlsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBEZmhDb25maWcgfSBmcm9tICdAa2xlaW9sYWIvbGliLWNvbmZpZyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lU3Bhbkl0ZW1Ub1RpbWVTcGFuKHRpbWVTcGFuSXRlbTogVGltZVNwYW5JdGVtKTogVGltZVNwYW5VdGlsIHtcbiAgY29uc3QgdCA9IG5ldyBUaW1lU3BhblV0aWwoKTtcblxuICB0aW1lU3Bhbkl0ZW0ucHJvcGVydGllcy5mb3JFYWNoKHAgPT4ge1xuICAgIGNvbnN0IGtleSA9IERmaENvbmZpZy5QUk9QRVJUWV9QS19UT19FWElTVEVOQ0VfVElNRV9LRVlbcC5saXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5XVxuICAgIGlmIChwLml0ZW1zICYmIHAuaXRlbXMubGVuZ3RoKSB0W2tleV0gPSBwLml0ZW1zWzBdLnRpbWVQcmltaXRpdmVcbiAgfSlcbiAgcmV0dXJuIHQ7XG59XG4iXX0=