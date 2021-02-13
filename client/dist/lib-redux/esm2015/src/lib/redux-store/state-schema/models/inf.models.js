/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/models/inf.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function PaginationInfo() { }
if (false) {
    /** @type {?} */
    PaginationInfo.prototype.loading;
    /** @type {?} */
    PaginationInfo.prototype.count;
    /** @type {?} */
    PaginationInfo.prototype.rows;
}
export class InfPersistentItemSlice {
}
if (false) {
    /** @type {?} */
    InfPersistentItemSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfPersistentItemSlice.prototype.by_fk_class;
    /** @type {?} */
    InfPersistentItemSlice.prototype.loading;
}
export class InfTemporalEntitySlice {
}
if (false) {
    /** @type {?} */
    InfTemporalEntitySlice.prototype.by_pk_entity;
    /** @type {?} */
    InfTemporalEntitySlice.prototype.by_fk_class;
    /** @type {?} */
    InfTemporalEntitySlice.prototype.loading;
}
export class InfStatementSlice {
}
if (false) {
    /** @type {?} */
    InfStatementSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfStatementSlice.prototype.by_subject;
    /** @type {?} */
    InfStatementSlice.prototype.by_object;
    /* Skipping unnamed member:
    'by_subject+property'?: ByPk<ByPk<InfStatement>>;*/
    /* Skipping unnamed member:
    'by_object+property'?: ByPk<ByPk<InfStatement>>;*/
    /** @type {?} */
    InfStatementSlice.prototype.by_fk_subject_data;
    /** @type {?} */
    InfStatementSlice.prototype.pag_by_fk_property__fk_target_class__fk_object_info__ofProject;
    /** @type {?} */
    InfStatementSlice.prototype.pag_by_fk_property__fk_target_class__fk_subject_info__ofProject;
    /** @type {?} */
    InfStatementSlice.prototype.loading;
}
export class InfPlaceSlice {
}
if (false) {
    /** @type {?} */
    InfPlaceSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfPlaceSlice.prototype.loading;
}
export class InfTimePrimitiveSlice {
}
if (false) {
    /** @type {?} */
    InfTimePrimitiveSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfTimePrimitiveSlice.prototype.loading;
}
export class InfLanguageSlice {
}
if (false) {
    /** @type {?} */
    InfLanguageSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfLanguageSlice.prototype.loading;
}
export class InfAppellationSlice {
}
if (false) {
    /** @type {?} */
    InfAppellationSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfAppellationSlice.prototype.loading;
}
export class InfLangStringSlice {
}
if (false) {
    /** @type {?} */
    InfLangStringSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfLangStringSlice.prototype.loading;
}
export class InfDimensionSlice {
}
if (false) {
    /** @type {?} */
    InfDimensionSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfDimensionSlice.prototype.loading;
}
export class InfTextPropertySlice {
}
if (false) {
    /** @type {?} */
    InfTextPropertySlice.prototype.by_pk_entity;
    /** @type {?} */
    InfTextPropertySlice.prototype.by_fk_concerned_entity__fk_class_field;
    /** @type {?} */
    InfTextPropertySlice.prototype.by_fk_concerned_entity;
    /** @type {?} */
    InfTextPropertySlice.prototype.loading;
}
/**
 * @record
 */
export function Inf() { }
if (false) {
    /** @type {?|undefined} */
    Inf.prototype.persistent_item;
    /** @type {?|undefined} */
    Inf.prototype.temporal_entity;
    /** @type {?|undefined} */
    Inf.prototype.statement;
    /** @type {?|undefined} */
    Inf.prototype.place;
    /** @type {?|undefined} */
    Inf.prototype.time_primitive;
    /** @type {?|undefined} */
    Inf.prototype.language;
    /** @type {?|undefined} */
    Inf.prototype.appellation;
    /** @type {?|undefined} */
    Inf.prototype.lang_string;
    /** @type {?|undefined} */
    Inf.prototype.dimension;
    /** @type {?|undefined} */
    Inf.prototype.text_property;
    /** @type {?|undefined} */
    Inf.prototype.pkEntityModelMap;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLm1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9tb2RlbHMvaW5mLm1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLDZCQVFDOzs7SUFQQyxpQ0FFRTs7SUFDRiwrQkFBYzs7SUFDZCw4QkFFQzs7QUFFSCxNQUFNLE9BQU8sc0JBQXNCO0NBSWxDOzs7SUFIQyw4Q0FBdUM7O0lBQ3ZDLDZDQUE0Qzs7SUFDNUMseUNBQWlCOztBQUduQixNQUFNLE9BQU8sc0JBQXNCO0NBSWxDOzs7SUFIQyw4Q0FBdUM7O0lBQ3ZDLDZDQUE0Qzs7SUFDNUMseUNBQWlCOztBQUduQixNQUFNLE9BQU8saUJBQWlCO0NBVTdCOzs7SUFUQyx5Q0FBa0M7O0lBQ2xDLHVDQUFzQzs7SUFDdEMsc0NBQXFDOzs7Ozs7SUFHckMsK0NBQThDOztJQUM5QywyRkFBcUY7O0lBQ3JGLDRGQUFzRjs7SUFDdEYsb0NBQWlCOztBQUduQixNQUFNLE9BQU8sYUFBYTtDQUd6Qjs7O0lBRkMscUNBQThCOztJQUM5QixnQ0FBaUI7O0FBR25CLE1BQU0sT0FBTyxxQkFBcUI7Q0FHakM7OztJQUZDLDZDQUFzQzs7SUFDdEMsd0NBQWlCOztBQUduQixNQUFNLE9BQU8sZ0JBQWdCO0NBRzVCOzs7SUFGQyx3Q0FBaUM7O0lBQ2pDLG1DQUFpQjs7QUFHbkIsTUFBTSxPQUFPLG1CQUFtQjtDQUcvQjs7O0lBRkMsMkNBQW9DOztJQUNwQyxzQ0FBaUI7O0FBSW5CLE1BQU0sT0FBTyxrQkFBa0I7Q0FHOUI7OztJQUZDLDBDQUFtQzs7SUFDbkMscUNBQWlCOztBQUluQixNQUFNLE9BQU8saUJBQWlCO0NBRzdCOzs7SUFGQyx5Q0FBa0M7O0lBQ2xDLG9DQUFpQjs7QUFHbkIsTUFBTSxPQUFPLG9CQUFvQjtDQUtoQzs7O0lBSkMsNENBQXFDOztJQUNyQyxzRUFBcUU7O0lBQ3JFLHNEQUFxRDs7SUFDckQsdUNBQWlCOzs7OztBQUluQix5QkFhQzs7O0lBWkMsOEJBQXlDOztJQUN6Qyw4QkFBeUM7O0lBQ3pDLHdCQUE4Qjs7SUFDOUIsb0JBQXNCOztJQUN0Qiw2QkFBdUM7O0lBQ3ZDLHVCQUE0Qjs7SUFDNUIsMEJBQWtDOztJQUNsQywwQkFBaUM7O0lBQ2pDLHdCQUE4Qjs7SUFDOUIsNEJBQXFDOztJQUVyQywrQkFBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmZBcHBlbGxhdGlvbiwgSW5mRGltZW5zaW9uLCBJbmZMYW5nU3RyaW5nLCBJbmZMYW5ndWFnZSwgSW5mUGVyc2lzdGVudEl0ZW0sIEluZlBsYWNlLCBJbmZUZW1wb3JhbEVudGl0eSwgSW5mVGV4dFByb3BlcnR5LCBJbmZUaW1lUHJpbWl0aXZlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEluZlN0YXRlbWVudCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBCeVBrIH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMvbW9kZWwnO1xuXG5pbnRlcmZhY2UgUGFnaW5hdGlvbkluZm8ge1xuICBsb2FkaW5nOiB7XG4gICAgW2tleTogc3RyaW5nXTogYm9vbGVhblxuICB9LFxuICBjb3VudDogbnVtYmVyLFxuICByb3dzOiB7XG4gICAgW2tleTogc3RyaW5nXTogbnVtYmVyXG4gIH1cbn1cbmV4cG9ydCBjbGFzcyBJbmZQZXJzaXN0ZW50SXRlbVNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxJbmZQZXJzaXN0ZW50SXRlbT47XG4gIGJ5X2ZrX2NsYXNzPzogQnlQazxCeVBrPEluZlBlcnNpc3RlbnRJdGVtPj47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBJbmZUZW1wb3JhbEVudGl0eVNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxJbmZUZW1wb3JhbEVudGl0eT47XG4gIGJ5X2ZrX2NsYXNzPzogQnlQazxCeVBrPEluZlBlcnNpc3RlbnRJdGVtPj47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBJbmZTdGF0ZW1lbnRTbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8SW5mU3RhdGVtZW50PjtcbiAgYnlfc3ViamVjdD86IEJ5UGs8QnlQazxJbmZTdGF0ZW1lbnQ+PjtcbiAgYnlfb2JqZWN0PzogQnlQazxCeVBrPEluZlN0YXRlbWVudD4+O1xuICAnYnlfc3ViamVjdCtwcm9wZXJ0eSc/OiBCeVBrPEJ5UGs8SW5mU3RhdGVtZW50Pj47XG4gICdieV9vYmplY3QrcHJvcGVydHknPzogQnlQazxCeVBrPEluZlN0YXRlbWVudD4+O1xuICBieV9ma19zdWJqZWN0X2RhdGE/OiBCeVBrPEJ5UGs8SW5mU3RhdGVtZW50Pj47XG4gIHBhZ19ieV9ma19wcm9wZXJ0eV9fZmtfdGFyZ2V0X2NsYXNzX19ma19vYmplY3RfaW5mb19fb2ZQcm9qZWN0PzogQnlQazxQYWdpbmF0aW9uSW5mbz5cbiAgcGFnX2J5X2ZrX3Byb3BlcnR5X19ma190YXJnZXRfY2xhc3NfX2ZrX3N1YmplY3RfaW5mb19fb2ZQcm9qZWN0PzogQnlQazxQYWdpbmF0aW9uSW5mbz5cbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIEluZlBsYWNlU2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEluZlBsYWNlPjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIEluZlRpbWVQcmltaXRpdmVTbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8SW5mVGltZVByaW1pdGl2ZT47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBJbmZMYW5ndWFnZVNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxJbmZMYW5ndWFnZT47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBJbmZBcHBlbGxhdGlvblNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxJbmZBcHBlbGxhdGlvbj47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cblxuZXhwb3J0IGNsYXNzIEluZkxhbmdTdHJpbmdTbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8SW5mTGFuZ1N0cmluZz47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cblxuZXhwb3J0IGNsYXNzIEluZkRpbWVuc2lvblNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxJbmZEaW1lbnNpb24+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgSW5mVGV4dFByb3BlcnR5U2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEluZlRleHRQcm9wZXJ0eT47XG4gIGJ5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfX2ZrX2NsYXNzX2ZpZWxkPzogQnlQazxCeVBrPEluZlRleHRQcm9wZXJ0eT4+O1xuICBieV9ma19jb25jZXJuZWRfZW50aXR5PzogQnlQazxCeVBrPEluZlRleHRQcm9wZXJ0eT4+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5mIHtcbiAgcGVyc2lzdGVudF9pdGVtPzogSW5mUGVyc2lzdGVudEl0ZW1TbGljZTtcbiAgdGVtcG9yYWxfZW50aXR5PzogSW5mVGVtcG9yYWxFbnRpdHlTbGljZTtcbiAgc3RhdGVtZW50PzogSW5mU3RhdGVtZW50U2xpY2U7XG4gIHBsYWNlPzogSW5mUGxhY2VTbGljZTtcbiAgdGltZV9wcmltaXRpdmU/OiBJbmZUaW1lUHJpbWl0aXZlU2xpY2U7XG4gIGxhbmd1YWdlPzogSW5mTGFuZ3VhZ2VTbGljZTtcbiAgYXBwZWxsYXRpb24/OiBJbmZBcHBlbGxhdGlvblNsaWNlO1xuICBsYW5nX3N0cmluZz86IEluZkxhbmdTdHJpbmdTbGljZTtcbiAgZGltZW5zaW9uPzogSW5mRGltZW5zaW9uU2xpY2U7XG4gIHRleHRfcHJvcGVydHk/OiBJbmZUZXh0UHJvcGVydHlTbGljZTtcblxuICBwa0VudGl0eU1vZGVsTWFwPzogQnlQazx7IG1vZGVsTmFtZTogc3RyaW5nIH0+XG59XG5cblxuXG5cbiJdfQ==