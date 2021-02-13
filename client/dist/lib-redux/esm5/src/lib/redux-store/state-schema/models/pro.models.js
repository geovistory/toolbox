/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/models/pro.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function ProProjectSlice() { }
if (false) {
    /** @type {?|undefined} */
    ProProjectSlice.prototype.by_pk_entity;
}
/**
 * @record
 */
export function ProInfoProjRelSlice() { }
if (false) {
    /** @type {?|undefined} */
    ProInfoProjRelSlice.prototype.by_fk_project__fk_entity;
    /** @type {?|undefined} */
    ProInfoProjRelSlice.prototype.loading;
}
/**
 * @record
 */
export function ProDfhClassProjRelSlice() { }
if (false) {
    /** @type {?|undefined} */
    ProDfhClassProjRelSlice.prototype.by_fk_project__fk_class;
    /** @type {?|undefined} */
    ProDfhClassProjRelSlice.prototype.by_fk_project__enabled_in_entities;
    /** @type {?|undefined} */
    ProDfhClassProjRelSlice.prototype.loading;
}
/**
 * @record
 */
export function ProDfhProfileProjRelSlice() { }
if (false) {
    /** @type {?|undefined} */
    ProDfhProfileProjRelSlice.prototype.by_fk_project__fk_profile;
    /** @type {?|undefined} */
    ProDfhProfileProjRelSlice.prototype.by_fk_project__enabled;
    /** @type {?|undefined} */
    ProDfhProfileProjRelSlice.prototype.loading;
}
/**
 * @record
 */
export function ProClassFieldConfigSlice() { }
if (false) {
    /** @type {?|undefined} */
    ProClassFieldConfigSlice.prototype.by_fk_project__fk_class;
    /** @type {?|undefined} */
    ProClassFieldConfigSlice.prototype.loading;
}
/**
 * @record
 */
export function ProTextPropertySlice() { }
if (false) {
    /** @type {?|undefined} */
    ProTextPropertySlice.prototype.by_pk_entity;
    /** @type {?|undefined} */
    ProTextPropertySlice.prototype.by_fk_project__fk_property__fk_domain_class__fk_range_class;
    /** @type {?|undefined} */
    ProTextPropertySlice.prototype.loading;
}
/**
 * @record
 */
export function ProAnalysisSlice() { }
if (false) {
    /** @type {?|undefined} */
    ProAnalysisSlice.prototype.by_pk_entity;
}
/**
 * @record
 */
export function Pro() { }
if (false) {
    /** @type {?|undefined} */
    Pro.prototype.info_proj_rel;
    /** @type {?|undefined} */
    Pro.prototype.dfh_profile_proj_rel;
    /** @type {?|undefined} */
    Pro.prototype.dfh_class_proj_rel;
    /** @type {?|undefined} */
    Pro.prototype.class_field_config;
    /** @type {?|undefined} */
    Pro.prototype.text_property;
    /** @type {?|undefined} */
    Pro.prototype.analysis;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvLm1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9tb2RlbHMvcHJvLm1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLHFDQUVDOzs7SUFEQyx1Q0FBZ0M7Ozs7O0FBR2xDLHlDQUdDOzs7SUFGQyx1REFBZ0Q7O0lBQ2hELHNDQUFpQjs7Ozs7QUFHbkIsNkNBSUM7OztJQUhDLDBEQUFtRDs7SUFDbkQscUVBQW9FOztJQUNwRSwwQ0FBaUI7Ozs7O0FBRW5CLCtDQUlDOzs7SUFIQyw4REFBdUQ7O0lBQ3ZELDJEQUEwRDs7SUFDMUQsNENBQWlCOzs7OztBQUduQiw4Q0FHQzs7O0lBRkMsMkRBQW9EOztJQUNwRCwyQ0FBaUI7Ozs7O0FBR25CLDBDQUlDOzs7SUFIQyw0Q0FBK0I7O0lBQy9CLDJGQUFvRjs7SUFDcEYsdUNBQWlCOzs7OztBQUVuQixzQ0FFQzs7O0lBREMsd0NBQTJCOzs7OztBQUc3Qix5QkFPQzs7O0lBTkMsNEJBQW9DOztJQUNwQyxtQ0FBaUQ7O0lBQ2pELGlDQUE2Qzs7SUFDN0MsaUNBQThDOztJQUM5Qyw0QkFBcUM7O0lBQ3JDLHVCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb0NsYXNzRmllbGRDb25maWcsIFByb0RmaENsYXNzUHJvalJlbCwgUHJvRGZoUHJvZmlsZVByb2pSZWwsIFByb0luZm9Qcm9qUmVsLCBQcm9Qcm9qZWN0LCBQcm9UZXh0UHJvcGVydHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgUHJvQW5hbHlzaXMgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgQnlQayB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcblxuZXhwb3J0IGludGVyZmFjZSBQcm9Qcm9qZWN0U2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPFByb1Byb2plY3Q+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb0luZm9Qcm9qUmVsU2xpY2Uge1xuICBieV9ma19wcm9qZWN0X19ma19lbnRpdHk/OiBCeVBrPFByb0luZm9Qcm9qUmVsPjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9EZmhDbGFzc1Byb2pSZWxTbGljZSB7XG4gIGJ5X2ZrX3Byb2plY3RfX2ZrX2NsYXNzPzogQnlQazxQcm9EZmhDbGFzc1Byb2pSZWw+O1xuICBieV9ma19wcm9qZWN0X19lbmFibGVkX2luX2VudGl0aWVzPzogQnlQazxCeVBrPFByb0RmaENsYXNzUHJvalJlbD4+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuZXhwb3J0IGludGVyZmFjZSBQcm9EZmhQcm9maWxlUHJvalJlbFNsaWNlIHtcbiAgYnlfZmtfcHJvamVjdF9fZmtfcHJvZmlsZT86IEJ5UGs8UHJvRGZoUHJvZmlsZVByb2pSZWw+O1xuICBieV9ma19wcm9qZWN0X19lbmFibGVkPzogQnlQazxCeVBrPFByb0RmaFByb2ZpbGVQcm9qUmVsPj47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvQ2xhc3NGaWVsZENvbmZpZ1NsaWNlIHtcbiAgYnlfZmtfcHJvamVjdF9fZmtfY2xhc3M/OiBCeVBrPFByb0NsYXNzRmllbGRDb25maWc+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb1RleHRQcm9wZXJ0eVNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogUHJvVGV4dFByb3BlcnR5O1xuICBieV9ma19wcm9qZWN0X19ma19wcm9wZXJ0eV9fZmtfZG9tYWluX2NsYXNzX19ma19yYW5nZV9jbGFzcz86IEJ5UGs8UHJvVGV4dFByb3BlcnR5PjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cbmV4cG9ydCBpbnRlcmZhY2UgUHJvQW5hbHlzaXNTbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IFByb0FuYWx5c2lzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBybyB7XG4gIGluZm9fcHJval9yZWw/OiBQcm9JbmZvUHJvalJlbFNsaWNlO1xuICBkZmhfcHJvZmlsZV9wcm9qX3JlbD86IFByb0RmaFByb2ZpbGVQcm9qUmVsU2xpY2U7XG4gIGRmaF9jbGFzc19wcm9qX3JlbD86IFByb0RmaENsYXNzUHJvalJlbFNsaWNlO1xuICBjbGFzc19maWVsZF9jb25maWc/OiBQcm9DbGFzc0ZpZWxkQ29uZmlnU2xpY2U7XG4gIHRleHRfcHJvcGVydHk/OiBQcm9UZXh0UHJvcGVydHlTbGljZTtcbiAgYW5hbHlzaXM/OiBQcm9BbmFseXNpc1NsaWNlO1xufVxuXG5cblxuXG4iXX0=