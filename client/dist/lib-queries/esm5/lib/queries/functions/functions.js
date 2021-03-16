/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/functions/functions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DfhConfig } from '@kleiolab/lib-config';
import { TimeSpanUtil } from '@kleiolab/lib-utils';
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
        var key = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY[p.listDefinition.property.fkProperty];
        if (p.items && p.items.length)
            t[key] = p.items[0].timePrimitive;
    }));
    return t;
}
/**
 * @param {?} infTimePrim
 * @param {?} cal
 * @return {?}
 */
export function infTimePrimToTimePrimWithCal(infTimePrim, cal) {
    return {
        julianDay: infTimePrim.julian_day,
        duration: (/** @type {?} */ (infTimePrim.duration)),
        calendar: cal,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzLyIsInNvdXJjZXMiOlsibGliL3F1ZXJpZXMvZnVuY3Rpb25zL2Z1bmN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBR25ELE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxZQUEwQjs7UUFDekQsQ0FBQyxHQUFHLElBQUksWUFBWSxFQUFFO0lBRTVCLFlBQVksQ0FBQyxVQUFVLENBQUMsT0FBTzs7OztJQUFDLFVBQUEsQ0FBQzs7WUFDekIsR0FBRyxHQUFHLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDN0YsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQTtJQUNsRSxDQUFDLEVBQUMsQ0FBQTtJQUNGLE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLDRCQUE0QixDQUFDLFdBQTZCLEVBQUUsR0FBc0M7SUFDaEgsT0FBTztRQUNMLFNBQVMsRUFBRSxXQUFXLENBQUMsVUFBVTtRQUNqQyxRQUFRLEVBQUUsbUJBQUEsV0FBVyxDQUFDLFFBQVEsRUFBcUM7UUFDbkUsUUFBUSxFQUFFLEdBQUc7S0FDZCxDQUFBO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERmaENvbmZpZyB9IGZyb20gJ0BrbGVpb2xhYi9saWItY29uZmlnJztcbmltcG9ydCB7IEluZlRpbWVQcmltaXRpdmUsIFRpbWVQcmltaXRpdmVXaXRoQ2FsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IFRpbWVTcGFuVXRpbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgVGltZVNwYW5JdGVtIH0gZnJvbSAnLi4vbW9kZWxzL1RpbWVTcGFuSXRlbSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lU3Bhbkl0ZW1Ub1RpbWVTcGFuKHRpbWVTcGFuSXRlbTogVGltZVNwYW5JdGVtKTogVGltZVNwYW5VdGlsIHtcbiAgY29uc3QgdCA9IG5ldyBUaW1lU3BhblV0aWwoKTtcblxuICB0aW1lU3Bhbkl0ZW0ucHJvcGVydGllcy5mb3JFYWNoKHAgPT4ge1xuICAgIGNvbnN0IGtleSA9IERmaENvbmZpZy5QUk9QRVJUWV9QS19UT19FWElTVEVOQ0VfVElNRV9LRVlbcC5saXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5ma1Byb3BlcnR5XVxuICAgIGlmIChwLml0ZW1zICYmIHAuaXRlbXMubGVuZ3RoKSB0W2tleV0gPSBwLml0ZW1zWzBdLnRpbWVQcmltaXRpdmVcbiAgfSlcbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmZUaW1lUHJpbVRvVGltZVByaW1XaXRoQ2FsKGluZlRpbWVQcmltOiBJbmZUaW1lUHJpbWl0aXZlLCBjYWw6IFRpbWVQcmltaXRpdmVXaXRoQ2FsLkNhbGVuZGFyRW51bSk6IFRpbWVQcmltaXRpdmVXaXRoQ2FsIHtcbiAgcmV0dXJuIHtcbiAgICBqdWxpYW5EYXk6IGluZlRpbWVQcmltLmp1bGlhbl9kYXksXG4gICAgZHVyYXRpb246IGluZlRpbWVQcmltLmR1cmF0aW9uIGFzIFRpbWVQcmltaXRpdmVXaXRoQ2FsLkR1cmF0aW9uRW51bSxcbiAgICBjYWxlbmRhcjogY2FsLFxuICB9XG59XG4iXX0=