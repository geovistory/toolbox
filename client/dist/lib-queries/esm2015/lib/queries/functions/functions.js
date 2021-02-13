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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzLyIsInNvdXJjZXMiOlsibGliL3F1ZXJpZXMvZnVuY3Rpb25zL2Z1bmN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0FBRWpELE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxZQUEwQjs7VUFDekQsQ0FBQyxHQUFHLElBQUksWUFBWSxFQUFFO0lBRTVCLFlBQVksQ0FBQyxVQUFVLENBQUMsT0FBTzs7OztJQUFDLENBQUMsQ0FBQyxFQUFFOztjQUM1QixHQUFHLEdBQUcsU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUM3RixJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFBO0lBQ2xFLENBQUMsRUFBQyxDQUFBO0lBQ0YsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGltZVNwYW5JdGVtIH0gZnJvbSAnLi4vbW9kZWxzL1RpbWVTcGFuSXRlbSc7XG5pbXBvcnQgeyBUaW1lU3BhblV0aWwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IERmaENvbmZpZyB9IGZyb20gJ0BrbGVpb2xhYi9saWItY29uZmlnJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRpbWVTcGFuSXRlbVRvVGltZVNwYW4odGltZVNwYW5JdGVtOiBUaW1lU3Bhbkl0ZW0pOiBUaW1lU3BhblV0aWwge1xuICBjb25zdCB0ID0gbmV3IFRpbWVTcGFuVXRpbCgpO1xuXG4gIHRpbWVTcGFuSXRlbS5wcm9wZXJ0aWVzLmZvckVhY2gocCA9PiB7XG4gICAgY29uc3Qga2V5ID0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX1RPX0VYSVNURU5DRV9USU1FX0tFWVtwLmxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHldXG4gICAgaWYgKHAuaXRlbXMgJiYgcC5pdGVtcy5sZW5ndGgpIHRba2V5XSA9IHAuaXRlbXNbMF0udGltZVByaW1pdGl2ZVxuICB9KVxuICByZXR1cm4gdDtcbn1cbiJdfQ==