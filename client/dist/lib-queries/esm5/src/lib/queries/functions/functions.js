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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzL3NyYy9saWIvcXVlcmllcy8iLCJzb3VyY2VzIjpbImZ1bmN0aW9ucy9mdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7OztBQUVqRCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsWUFBMEI7O1FBQ3pELENBQUMsR0FBRyxJQUFJLFlBQVksRUFBRTtJQUU1QixZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU87Ozs7SUFBQyxVQUFBLENBQUM7O1lBQ3pCLEdBQUcsR0FBRyxTQUFTLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQzdGLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU07WUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUE7SUFDbEUsQ0FBQyxFQUFDLENBQUE7SUFDRixPQUFPLENBQUMsQ0FBQztBQUNYLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUaW1lU3Bhbkl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvVGltZVNwYW5JdGVtJztcbmltcG9ydCB7IFRpbWVTcGFuVXRpbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgRGZoQ29uZmlnIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1jb25maWcnO1xuXG5leHBvcnQgZnVuY3Rpb24gdGltZVNwYW5JdGVtVG9UaW1lU3Bhbih0aW1lU3Bhbkl0ZW06IFRpbWVTcGFuSXRlbSk6IFRpbWVTcGFuVXRpbCB7XG4gIGNvbnN0IHQgPSBuZXcgVGltZVNwYW5VdGlsKCk7XG5cbiAgdGltZVNwYW5JdGVtLnByb3BlcnRpZXMuZm9yRWFjaChwID0+IHtcbiAgICBjb25zdCBrZXkgPSBEZmhDb25maWcuUFJPUEVSVFlfUEtfVE9fRVhJU1RFTkNFX1RJTUVfS0VZW3AubGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eV1cbiAgICBpZiAocC5pdGVtcyAmJiBwLml0ZW1zLmxlbmd0aCkgdFtrZXldID0gcC5pdGVtc1swXS50aW1lUHJpbWl0aXZlXG4gIH0pXG4gIHJldHVybiB0O1xufVxuIl19