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
    InfStatementSlice.prototype.by_subfield_page;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLm1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9tb2RlbHMvaW5mLm1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLDZCQVFDOzs7SUFQQyxpQ0FFRTs7SUFDRiwrQkFBYzs7SUFDZCw4QkFFQzs7QUFFSCxNQUFNLE9BQU8sc0JBQXNCO0NBSWxDOzs7SUFIQyw4Q0FBdUM7O0lBQ3ZDLDZDQUE0Qzs7SUFDNUMseUNBQWlCOztBQUduQixNQUFNLE9BQU8sc0JBQXNCO0NBSWxDOzs7SUFIQyw4Q0FBdUM7O0lBQ3ZDLDZDQUE0Qzs7SUFDNUMseUNBQWlCOztBQUduQixNQUFNLE9BQU8saUJBQWlCO0NBUzdCOzs7SUFSQyx5Q0FBa0M7O0lBQ2xDLHVDQUFzQzs7SUFDdEMsc0NBQXFDOzs7Ozs7SUFHckMsK0NBQThDOztJQUM5Qyw2Q0FBdUM7O0lBQ3ZDLG9DQUFpQjs7QUFHbkIsTUFBTSxPQUFPLGFBQWE7Q0FHekI7OztJQUZDLHFDQUE4Qjs7SUFDOUIsZ0NBQWlCOztBQUduQixNQUFNLE9BQU8scUJBQXFCO0NBR2pDOzs7SUFGQyw2Q0FBc0M7O0lBQ3RDLHdDQUFpQjs7QUFHbkIsTUFBTSxPQUFPLGdCQUFnQjtDQUc1Qjs7O0lBRkMsd0NBQWlDOztJQUNqQyxtQ0FBaUI7O0FBR25CLE1BQU0sT0FBTyxtQkFBbUI7Q0FHL0I7OztJQUZDLDJDQUFvQzs7SUFDcEMsc0NBQWlCOztBQUluQixNQUFNLE9BQU8sa0JBQWtCO0NBRzlCOzs7SUFGQywwQ0FBbUM7O0lBQ25DLHFDQUFpQjs7QUFJbkIsTUFBTSxPQUFPLGlCQUFpQjtDQUc3Qjs7O0lBRkMseUNBQWtDOztJQUNsQyxvQ0FBaUI7O0FBR25CLE1BQU0sT0FBTyxvQkFBb0I7Q0FLaEM7OztJQUpDLDRDQUFxQzs7SUFDckMsc0VBQXFFOztJQUNyRSxzREFBcUQ7O0lBQ3JELHVDQUFpQjs7Ozs7QUFJbkIseUJBYUM7OztJQVpDLDhCQUF5Qzs7SUFDekMsOEJBQXlDOztJQUN6Qyx3QkFBOEI7O0lBQzlCLG9CQUFzQjs7SUFDdEIsNkJBQXVDOztJQUN2Qyx1QkFBNEI7O0lBQzVCLDBCQUFrQzs7SUFDbEMsMEJBQWlDOztJQUNqQyx3QkFBOEI7O0lBQzlCLDRCQUFxQzs7SUFFckMsK0JBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5mQXBwZWxsYXRpb24sIEluZkRpbWVuc2lvbiwgSW5mTGFuZ1N0cmluZywgSW5mTGFuZ3VhZ2UsIEluZlBlcnNpc3RlbnRJdGVtLCBJbmZQbGFjZSwgSW5mVGVtcG9yYWxFbnRpdHksIEluZlRleHRQcm9wZXJ0eSwgSW5mVGltZVByaW1pdGl2ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBJbmZTdGF0ZW1lbnQgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgQnlQayB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcblxuaW50ZXJmYWNlIFBhZ2luYXRpb25JbmZvIHtcbiAgbG9hZGluZzoge1xuICAgIFtrZXk6IHN0cmluZ106IGJvb2xlYW5cbiAgfSxcbiAgY291bnQ6IG51bWJlcixcbiAgcm93czoge1xuICAgIFtrZXk6IHN0cmluZ106IG51bWJlclxuICB9XG59XG5leHBvcnQgY2xhc3MgSW5mUGVyc2lzdGVudEl0ZW1TbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8SW5mUGVyc2lzdGVudEl0ZW0+O1xuICBieV9ma19jbGFzcz86IEJ5UGs8QnlQazxJbmZQZXJzaXN0ZW50SXRlbT4+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgSW5mVGVtcG9yYWxFbnRpdHlTbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8SW5mVGVtcG9yYWxFbnRpdHk+O1xuICBieV9ma19jbGFzcz86IEJ5UGs8QnlQazxJbmZQZXJzaXN0ZW50SXRlbT4+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgSW5mU3RhdGVtZW50U2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEluZlN0YXRlbWVudD47XG4gIGJ5X3N1YmplY3Q/OiBCeVBrPEJ5UGs8SW5mU3RhdGVtZW50Pj47XG4gIGJ5X29iamVjdD86IEJ5UGs8QnlQazxJbmZTdGF0ZW1lbnQ+PjtcbiAgJ2J5X3N1YmplY3QrcHJvcGVydHknPzogQnlQazxCeVBrPEluZlN0YXRlbWVudD4+O1xuICAnYnlfb2JqZWN0K3Byb3BlcnR5Jz86IEJ5UGs8QnlQazxJbmZTdGF0ZW1lbnQ+PjtcbiAgYnlfZmtfc3ViamVjdF9kYXRhPzogQnlQazxCeVBrPEluZlN0YXRlbWVudD4+O1xuICBieV9zdWJmaWVsZF9wYWdlPzogQnlQazxQYWdpbmF0aW9uSW5mbz5cbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIEluZlBsYWNlU2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEluZlBsYWNlPjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIEluZlRpbWVQcmltaXRpdmVTbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8SW5mVGltZVByaW1pdGl2ZT47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBJbmZMYW5ndWFnZVNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxJbmZMYW5ndWFnZT47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBJbmZBcHBlbGxhdGlvblNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxJbmZBcHBlbGxhdGlvbj47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cblxuZXhwb3J0IGNsYXNzIEluZkxhbmdTdHJpbmdTbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8SW5mTGFuZ1N0cmluZz47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cblxuZXhwb3J0IGNsYXNzIEluZkRpbWVuc2lvblNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxJbmZEaW1lbnNpb24+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgSW5mVGV4dFByb3BlcnR5U2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEluZlRleHRQcm9wZXJ0eT47XG4gIGJ5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfX2ZrX2NsYXNzX2ZpZWxkPzogQnlQazxCeVBrPEluZlRleHRQcm9wZXJ0eT4+O1xuICBieV9ma19jb25jZXJuZWRfZW50aXR5PzogQnlQazxCeVBrPEluZlRleHRQcm9wZXJ0eT4+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5mIHtcbiAgcGVyc2lzdGVudF9pdGVtPzogSW5mUGVyc2lzdGVudEl0ZW1TbGljZTtcbiAgdGVtcG9yYWxfZW50aXR5PzogSW5mVGVtcG9yYWxFbnRpdHlTbGljZTtcbiAgc3RhdGVtZW50PzogSW5mU3RhdGVtZW50U2xpY2U7XG4gIHBsYWNlPzogSW5mUGxhY2VTbGljZTtcbiAgdGltZV9wcmltaXRpdmU/OiBJbmZUaW1lUHJpbWl0aXZlU2xpY2U7XG4gIGxhbmd1YWdlPzogSW5mTGFuZ3VhZ2VTbGljZTtcbiAgYXBwZWxsYXRpb24/OiBJbmZBcHBlbGxhdGlvblNsaWNlO1xuICBsYW5nX3N0cmluZz86IEluZkxhbmdTdHJpbmdTbGljZTtcbiAgZGltZW5zaW9uPzogSW5mRGltZW5zaW9uU2xpY2U7XG4gIHRleHRfcHJvcGVydHk/OiBJbmZUZXh0UHJvcGVydHlTbGljZTtcblxuICBwa0VudGl0eU1vZGVsTWFwPzogQnlQazx7IG1vZGVsTmFtZTogc3RyaW5nIH0+XG59XG5cblxuXG5cbiJdfQ==