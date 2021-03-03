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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzLyIsInNvdXJjZXMiOlsibGliL3F1ZXJpZXMvZnVuY3Rpb25zL2Z1bmN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBR25ELE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxZQUEwQjs7VUFDekQsQ0FBQyxHQUFHLElBQUksWUFBWSxFQUFFO0lBRTVCLFlBQVksQ0FBQyxVQUFVLENBQUMsT0FBTzs7OztJQUFDLENBQUMsQ0FBQyxFQUFFOztjQUM1QixHQUFHLEdBQUcsU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUM3RixJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFBO0lBQ2xFLENBQUMsRUFBQyxDQUFBO0lBQ0YsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsNEJBQTRCLENBQUMsV0FBNkIsRUFBRSxHQUFzQztJQUNoSCxPQUFPO1FBQ0wsU0FBUyxFQUFFLFdBQVcsQ0FBQyxVQUFVO1FBQ2pDLFFBQVEsRUFBRSxtQkFBQSxXQUFXLENBQUMsUUFBUSxFQUFxQztRQUNuRSxRQUFRLEVBQUUsR0FBRztLQUNkLENBQUE7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGZoQ29uZmlnIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1jb25maWcnO1xuaW1wb3J0IHsgSW5mVGltZVByaW1pdGl2ZSwgVGltZVByaW1pdGl2ZVdpdGhDYWwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgVGltZVNwYW5VdGlsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBUaW1lU3Bhbkl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvVGltZVNwYW5JdGVtJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRpbWVTcGFuSXRlbVRvVGltZVNwYW4odGltZVNwYW5JdGVtOiBUaW1lU3Bhbkl0ZW0pOiBUaW1lU3BhblV0aWwge1xuICBjb25zdCB0ID0gbmV3IFRpbWVTcGFuVXRpbCgpO1xuXG4gIHRpbWVTcGFuSXRlbS5wcm9wZXJ0aWVzLmZvckVhY2gocCA9PiB7XG4gICAgY29uc3Qga2V5ID0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX1RPX0VYSVNURU5DRV9USU1FX0tFWVtwLmxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHldXG4gICAgaWYgKHAuaXRlbXMgJiYgcC5pdGVtcy5sZW5ndGgpIHRba2V5XSA9IHAuaXRlbXNbMF0udGltZVByaW1pdGl2ZVxuICB9KVxuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluZlRpbWVQcmltVG9UaW1lUHJpbVdpdGhDYWwoaW5mVGltZVByaW06IEluZlRpbWVQcmltaXRpdmUsIGNhbDogVGltZVByaW1pdGl2ZVdpdGhDYWwuQ2FsZW5kYXJFbnVtKTogVGltZVByaW1pdGl2ZVdpdGhDYWwge1xuICByZXR1cm4ge1xuICAgIGp1bGlhbkRheTogaW5mVGltZVByaW0uanVsaWFuX2RheSxcbiAgICBkdXJhdGlvbjogaW5mVGltZVByaW0uZHVyYXRpb24gYXMgVGltZVByaW1pdGl2ZVdpdGhDYWwuRHVyYXRpb25FbnVtLFxuICAgIGNhbGVuZGFyOiBjYWwsXG4gIH1cbn1cbiJdfQ==