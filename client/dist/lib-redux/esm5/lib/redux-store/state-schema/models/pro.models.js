/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/models/pro.models.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvLm1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL21vZGVscy9wcm8ubW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUEscUNBRUM7OztJQURDLHVDQUFnQzs7Ozs7QUFHbEMseUNBR0M7OztJQUZDLHVEQUFnRDs7SUFDaEQsc0NBQWlCOzs7OztBQUduQiw2Q0FJQzs7O0lBSEMsMERBQW1EOztJQUNuRCxxRUFBb0U7O0lBQ3BFLDBDQUFpQjs7Ozs7QUFFbkIsK0NBSUM7OztJQUhDLDhEQUF1RDs7SUFDdkQsMkRBQTBEOztJQUMxRCw0Q0FBaUI7Ozs7O0FBR25CLDhDQUdDOzs7SUFGQywyREFBb0Q7O0lBQ3BELDJDQUFpQjs7Ozs7QUFHbkIsMENBSUM7OztJQUhDLDRDQUErQjs7SUFDL0IsMkZBQW9GOztJQUNwRix1Q0FBaUI7Ozs7O0FBRW5CLHNDQUVDOzs7SUFEQyx3Q0FBMkI7Ozs7O0FBRzdCLHlCQU9DOzs7SUFOQyw0QkFBb0M7O0lBQ3BDLG1DQUFpRDs7SUFDakQsaUNBQTZDOztJQUM3QyxpQ0FBOEM7O0lBQzlDLDRCQUFxQzs7SUFDckMsdUJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvQ2xhc3NGaWVsZENvbmZpZywgUHJvRGZoQ2xhc3NQcm9qUmVsLCBQcm9EZmhQcm9maWxlUHJvalJlbCwgUHJvSW5mb1Byb2pSZWwsIFByb1Byb2plY3QsIFByb1RleHRQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBQcm9BbmFseXNpcyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBCeVBrIH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMvbW9kZWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFByb1Byb2plY3RTbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8UHJvUHJvamVjdD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvSW5mb1Byb2pSZWxTbGljZSB7XG4gIGJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eT86IEJ5UGs8UHJvSW5mb1Byb2pSZWw+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb0RmaENsYXNzUHJvalJlbFNsaWNlIHtcbiAgYnlfZmtfcHJvamVjdF9fZmtfY2xhc3M/OiBCeVBrPFByb0RmaENsYXNzUHJvalJlbD47XG4gIGJ5X2ZrX3Byb2plY3RfX2VuYWJsZWRfaW5fZW50aXRpZXM/OiBCeVBrPEJ5UGs8UHJvRGZoQ2xhc3NQcm9qUmVsPj47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5leHBvcnQgaW50ZXJmYWNlIFByb0RmaFByb2ZpbGVQcm9qUmVsU2xpY2Uge1xuICBieV9ma19wcm9qZWN0X19ma19wcm9maWxlPzogQnlQazxQcm9EZmhQcm9maWxlUHJvalJlbD47XG4gIGJ5X2ZrX3Byb2plY3RfX2VuYWJsZWQ/OiBCeVBrPEJ5UGs8UHJvRGZoUHJvZmlsZVByb2pSZWw+PjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9DbGFzc0ZpZWxkQ29uZmlnU2xpY2Uge1xuICBieV9ma19wcm9qZWN0X19ma19jbGFzcz86IEJ5UGs8UHJvQ2xhc3NGaWVsZENvbmZpZz47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvVGV4dFByb3BlcnR5U2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBQcm9UZXh0UHJvcGVydHk7XG4gIGJ5X2ZrX3Byb2plY3RfX2ZrX3Byb3BlcnR5X19ma19kb21haW5fY2xhc3NfX2ZrX3JhbmdlX2NsYXNzPzogQnlQazxQcm9UZXh0UHJvcGVydHk+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuZXhwb3J0IGludGVyZmFjZSBQcm9BbmFseXNpc1NsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogUHJvQW5hbHlzaXM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvIHtcbiAgaW5mb19wcm9qX3JlbD86IFByb0luZm9Qcm9qUmVsU2xpY2U7XG4gIGRmaF9wcm9maWxlX3Byb2pfcmVsPzogUHJvRGZoUHJvZmlsZVByb2pSZWxTbGljZTtcbiAgZGZoX2NsYXNzX3Byb2pfcmVsPzogUHJvRGZoQ2xhc3NQcm9qUmVsU2xpY2U7XG4gIGNsYXNzX2ZpZWxkX2NvbmZpZz86IFByb0NsYXNzRmllbGRDb25maWdTbGljZTtcbiAgdGV4dF9wcm9wZXJ0eT86IFByb1RleHRQcm9wZXJ0eVNsaWNlO1xuICBhbmFseXNpcz86IFByb0FuYWx5c2lzU2xpY2U7XG59XG5cblxuXG5cbiJdfQ==