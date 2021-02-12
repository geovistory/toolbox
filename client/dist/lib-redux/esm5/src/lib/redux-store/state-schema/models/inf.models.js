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
var InfPersistentItemSlice = /** @class */ (function () {
    function InfPersistentItemSlice() {
    }
    return InfPersistentItemSlice;
}());
export { InfPersistentItemSlice };
if (false) {
    /** @type {?} */
    InfPersistentItemSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfPersistentItemSlice.prototype.by_fk_class;
    /** @type {?} */
    InfPersistentItemSlice.prototype.loading;
}
var InfTemporalEntitySlice = /** @class */ (function () {
    function InfTemporalEntitySlice() {
    }
    return InfTemporalEntitySlice;
}());
export { InfTemporalEntitySlice };
if (false) {
    /** @type {?} */
    InfTemporalEntitySlice.prototype.by_pk_entity;
    /** @type {?} */
    InfTemporalEntitySlice.prototype.by_fk_class;
    /** @type {?} */
    InfTemporalEntitySlice.prototype.loading;
}
var InfStatementSlice = /** @class */ (function () {
    function InfStatementSlice() {
    }
    return InfStatementSlice;
}());
export { InfStatementSlice };
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
var InfPlaceSlice = /** @class */ (function () {
    function InfPlaceSlice() {
    }
    return InfPlaceSlice;
}());
export { InfPlaceSlice };
if (false) {
    /** @type {?} */
    InfPlaceSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfPlaceSlice.prototype.loading;
}
var InfTimePrimitiveSlice = /** @class */ (function () {
    function InfTimePrimitiveSlice() {
    }
    return InfTimePrimitiveSlice;
}());
export { InfTimePrimitiveSlice };
if (false) {
    /** @type {?} */
    InfTimePrimitiveSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfTimePrimitiveSlice.prototype.loading;
}
var InfLanguageSlice = /** @class */ (function () {
    function InfLanguageSlice() {
    }
    return InfLanguageSlice;
}());
export { InfLanguageSlice };
if (false) {
    /** @type {?} */
    InfLanguageSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfLanguageSlice.prototype.loading;
}
var InfAppellationSlice = /** @class */ (function () {
    function InfAppellationSlice() {
    }
    return InfAppellationSlice;
}());
export { InfAppellationSlice };
if (false) {
    /** @type {?} */
    InfAppellationSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfAppellationSlice.prototype.loading;
}
var InfLangStringSlice = /** @class */ (function () {
    function InfLangStringSlice() {
    }
    return InfLangStringSlice;
}());
export { InfLangStringSlice };
if (false) {
    /** @type {?} */
    InfLangStringSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfLangStringSlice.prototype.loading;
}
var InfDimensionSlice = /** @class */ (function () {
    function InfDimensionSlice() {
    }
    return InfDimensionSlice;
}());
export { InfDimensionSlice };
if (false) {
    /** @type {?} */
    InfDimensionSlice.prototype.by_pk_entity;
    /** @type {?} */
    InfDimensionSlice.prototype.loading;
}
var InfTextPropertySlice = /** @class */ (function () {
    function InfTextPropertySlice() {
    }
    return InfTextPropertySlice;
}());
export { InfTextPropertySlice };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLm1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9tb2RlbHMvaW5mLm1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLDZCQVFDOzs7SUFQQyxpQ0FFRTs7SUFDRiwrQkFBYzs7SUFDZCw4QkFFQzs7QUFFSDtJQUFBO0lBSUEsQ0FBQztJQUFELDZCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7Ozs7SUFIQyw4Q0FBdUM7O0lBQ3ZDLDZDQUE0Qzs7SUFDNUMseUNBQWlCOztBQUduQjtJQUFBO0lBSUEsQ0FBQztJQUFELDZCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7Ozs7SUFIQyw4Q0FBdUM7O0lBQ3ZDLDZDQUE0Qzs7SUFDNUMseUNBQWlCOztBQUduQjtJQUFBO0lBVUEsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7Ozs7SUFUQyx5Q0FBa0M7O0lBQ2xDLHVDQUFzQzs7SUFDdEMsc0NBQXFDOzs7Ozs7SUFHckMsK0NBQThDOztJQUM5QywyRkFBcUY7O0lBQ3JGLDRGQUFzRjs7SUFDdEYsb0NBQWlCOztBQUduQjtJQUFBO0lBR0EsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7Ozs7SUFGQyxxQ0FBOEI7O0lBQzlCLGdDQUFpQjs7QUFHbkI7SUFBQTtJQUdBLENBQUM7SUFBRCw0QkFBQztBQUFELENBQUMsQUFIRCxJQUdDOzs7O0lBRkMsNkNBQXNDOztJQUN0Qyx3Q0FBaUI7O0FBR25CO0lBQUE7SUFHQSxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7OztJQUZDLHdDQUFpQzs7SUFDakMsbUNBQWlCOztBQUduQjtJQUFBO0lBR0EsQ0FBQztJQUFELDBCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7Ozs7SUFGQywyQ0FBb0M7O0lBQ3BDLHNDQUFpQjs7QUFJbkI7SUFBQTtJQUdBLENBQUM7SUFBRCx5QkFBQztBQUFELENBQUMsQUFIRCxJQUdDOzs7O0lBRkMsMENBQW1DOztJQUNuQyxxQ0FBaUI7O0FBSW5CO0lBQUE7SUFHQSxDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7OztJQUZDLHlDQUFrQzs7SUFDbEMsb0NBQWlCOztBQUduQjtJQUFBO0lBS0EsQ0FBQztJQUFELDJCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7Ozs7SUFKQyw0Q0FBcUM7O0lBQ3JDLHNFQUFxRTs7SUFDckUsc0RBQXFEOztJQUNyRCx1Q0FBaUI7Ozs7O0FBSW5CLHlCQWFDOzs7SUFaQyw4QkFBeUM7O0lBQ3pDLDhCQUF5Qzs7SUFDekMsd0JBQThCOztJQUM5QixvQkFBc0I7O0lBQ3RCLDZCQUF1Qzs7SUFDdkMsdUJBQTRCOztJQUM1QiwwQkFBa0M7O0lBQ2xDLDBCQUFpQzs7SUFDakMsd0JBQThCOztJQUM5Qiw0QkFBcUM7O0lBRXJDLCtCQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluZkFwcGVsbGF0aW9uLCBJbmZEaW1lbnNpb24sIEluZkxhbmdTdHJpbmcsIEluZkxhbmd1YWdlLCBJbmZQZXJzaXN0ZW50SXRlbSwgSW5mUGxhY2UsIEluZlRlbXBvcmFsRW50aXR5LCBJbmZUZXh0UHJvcGVydHksIEluZlRpbWVQcmltaXRpdmUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgSW5mU3RhdGVtZW50IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IEJ5UGsgfSBmcm9tICcuLi8uLi9yb290L21vZGVscyc7XG5cbmludGVyZmFjZSBQYWdpbmF0aW9uSW5mbyB7XG4gIGxvYWRpbmc6IHtcbiAgICBba2V5OiBzdHJpbmddOiBib29sZWFuXG4gIH0sXG4gIGNvdW50OiBudW1iZXIsXG4gIHJvd3M6IHtcbiAgICBba2V5OiBzdHJpbmddOiBudW1iZXJcbiAgfVxufVxuZXhwb3J0IGNsYXNzIEluZlBlcnNpc3RlbnRJdGVtU2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEluZlBlcnNpc3RlbnRJdGVtPjtcbiAgYnlfZmtfY2xhc3M/OiBCeVBrPEJ5UGs8SW5mUGVyc2lzdGVudEl0ZW0+PjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIEluZlRlbXBvcmFsRW50aXR5U2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEluZlRlbXBvcmFsRW50aXR5PjtcbiAgYnlfZmtfY2xhc3M/OiBCeVBrPEJ5UGs8SW5mUGVyc2lzdGVudEl0ZW0+PjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIEluZlN0YXRlbWVudFNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxJbmZTdGF0ZW1lbnQ+O1xuICBieV9zdWJqZWN0PzogQnlQazxCeVBrPEluZlN0YXRlbWVudD4+O1xuICBieV9vYmplY3Q/OiBCeVBrPEJ5UGs8SW5mU3RhdGVtZW50Pj47XG4gICdieV9zdWJqZWN0K3Byb3BlcnR5Jz86IEJ5UGs8QnlQazxJbmZTdGF0ZW1lbnQ+PjtcbiAgJ2J5X29iamVjdCtwcm9wZXJ0eSc/OiBCeVBrPEJ5UGs8SW5mU3RhdGVtZW50Pj47XG4gIGJ5X2ZrX3N1YmplY3RfZGF0YT86IEJ5UGs8QnlQazxJbmZTdGF0ZW1lbnQ+PjtcbiAgcGFnX2J5X2ZrX3Byb3BlcnR5X19ma190YXJnZXRfY2xhc3NfX2ZrX29iamVjdF9pbmZvX19vZlByb2plY3Q/OiBCeVBrPFBhZ2luYXRpb25JbmZvPlxuICBwYWdfYnlfZmtfcHJvcGVydHlfX2ZrX3RhcmdldF9jbGFzc19fZmtfc3ViamVjdF9pbmZvX19vZlByb2plY3Q/OiBCeVBrPFBhZ2luYXRpb25JbmZvPlxuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgSW5mUGxhY2VTbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8SW5mUGxhY2U+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgSW5mVGltZVByaW1pdGl2ZVNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxJbmZUaW1lUHJpbWl0aXZlPjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIEluZkxhbmd1YWdlU2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEluZkxhbmd1YWdlPjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIEluZkFwcGVsbGF0aW9uU2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEluZkFwcGVsbGF0aW9uPjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuXG5leHBvcnQgY2xhc3MgSW5mTGFuZ1N0cmluZ1NsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxJbmZMYW5nU3RyaW5nPjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuXG5leHBvcnQgY2xhc3MgSW5mRGltZW5zaW9uU2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEluZkRpbWVuc2lvbj47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBJbmZUZXh0UHJvcGVydHlTbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8SW5mVGV4dFByb3BlcnR5PjtcbiAgYnlfZmtfY29uY2VybmVkX2VudGl0eV9fZmtfY2xhc3NfZmllbGQ/OiBCeVBrPEJ5UGs8SW5mVGV4dFByb3BlcnR5Pj47XG4gIGJ5X2ZrX2NvbmNlcm5lZF9lbnRpdHk/OiBCeVBrPEJ5UGs8SW5mVGV4dFByb3BlcnR5Pj47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBJbmYge1xuICBwZXJzaXN0ZW50X2l0ZW0/OiBJbmZQZXJzaXN0ZW50SXRlbVNsaWNlO1xuICB0ZW1wb3JhbF9lbnRpdHk/OiBJbmZUZW1wb3JhbEVudGl0eVNsaWNlO1xuICBzdGF0ZW1lbnQ/OiBJbmZTdGF0ZW1lbnRTbGljZTtcbiAgcGxhY2U/OiBJbmZQbGFjZVNsaWNlO1xuICB0aW1lX3ByaW1pdGl2ZT86IEluZlRpbWVQcmltaXRpdmVTbGljZTtcbiAgbGFuZ3VhZ2U/OiBJbmZMYW5ndWFnZVNsaWNlO1xuICBhcHBlbGxhdGlvbj86IEluZkFwcGVsbGF0aW9uU2xpY2U7XG4gIGxhbmdfc3RyaW5nPzogSW5mTGFuZ1N0cmluZ1NsaWNlO1xuICBkaW1lbnNpb24/OiBJbmZEaW1lbnNpb25TbGljZTtcbiAgdGV4dF9wcm9wZXJ0eT86IEluZlRleHRQcm9wZXJ0eVNsaWNlO1xuXG4gIHBrRW50aXR5TW9kZWxNYXA/OiBCeVBrPHsgbW9kZWxOYW1lOiBzdHJpbmcgfT5cbn1cblxuXG5cblxuIl19