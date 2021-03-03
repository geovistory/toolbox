/**
 * @fileoverview added by tsickle
 * Generated from: functions/functions.ts
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
        var key = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY[p.listDefinition.property.pkProperty];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzL3NyYy9saWIvcXVlcmllcy8iLCJzb3VyY2VzIjpbImZ1bmN0aW9ucy9mdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7OztBQUduRCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsWUFBMEI7O1FBQ3pELENBQUMsR0FBRyxJQUFJLFlBQVksRUFBRTtJQUU1QixZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU87Ozs7SUFBQyxVQUFBLENBQUM7O1lBQ3pCLEdBQUcsR0FBRyxTQUFTLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQzdGLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU07WUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUE7SUFDbEUsQ0FBQyxFQUFDLENBQUE7SUFDRixPQUFPLENBQUMsQ0FBQztBQUNYLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSw0QkFBNEIsQ0FBQyxXQUE2QixFQUFFLEdBQXNDO0lBQ2hILE9BQU87UUFDTCxTQUFTLEVBQUUsV0FBVyxDQUFDLFVBQVU7UUFDakMsUUFBUSxFQUFFLG1CQUFBLFdBQVcsQ0FBQyxRQUFRLEVBQXFDO1FBQ25FLFFBQVEsRUFBRSxHQUFHO0tBQ2QsQ0FBQTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZmhDb25maWcgfSBmcm9tICdAa2xlaW9sYWIvbGliLWNvbmZpZyc7XG5pbXBvcnQgeyBJbmZUaW1lUHJpbWl0aXZlLCBUaW1lUHJpbWl0aXZlV2l0aENhbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBUaW1lU3BhblV0aWwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IFRpbWVTcGFuSXRlbSB9IGZyb20gJy4uL21vZGVscy9UaW1lU3Bhbkl0ZW0nO1xuXG5leHBvcnQgZnVuY3Rpb24gdGltZVNwYW5JdGVtVG9UaW1lU3Bhbih0aW1lU3Bhbkl0ZW06IFRpbWVTcGFuSXRlbSk6IFRpbWVTcGFuVXRpbCB7XG4gIGNvbnN0IHQgPSBuZXcgVGltZVNwYW5VdGlsKCk7XG5cbiAgdGltZVNwYW5JdGVtLnByb3BlcnRpZXMuZm9yRWFjaChwID0+IHtcbiAgICBjb25zdCBrZXkgPSBEZmhDb25maWcuUFJPUEVSVFlfUEtfVE9fRVhJU1RFTkNFX1RJTUVfS0VZW3AubGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eV1cbiAgICBpZiAocC5pdGVtcyAmJiBwLml0ZW1zLmxlbmd0aCkgdFtrZXldID0gcC5pdGVtc1swXS50aW1lUHJpbWl0aXZlXG4gIH0pXG4gIHJldHVybiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5mVGltZVByaW1Ub1RpbWVQcmltV2l0aENhbChpbmZUaW1lUHJpbTogSW5mVGltZVByaW1pdGl2ZSwgY2FsOiBUaW1lUHJpbWl0aXZlV2l0aENhbC5DYWxlbmRhckVudW0pOiBUaW1lUHJpbWl0aXZlV2l0aENhbCB7XG4gIHJldHVybiB7XG4gICAganVsaWFuRGF5OiBpbmZUaW1lUHJpbS5qdWxpYW5fZGF5LFxuICAgIGR1cmF0aW9uOiBpbmZUaW1lUHJpbS5kdXJhdGlvbiBhcyBUaW1lUHJpbWl0aXZlV2l0aENhbC5EdXJhdGlvbkVudW0sXG4gICAgY2FsZW5kYXI6IGNhbCxcbiAgfVxufVxuIl19