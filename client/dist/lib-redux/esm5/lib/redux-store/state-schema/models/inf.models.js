/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/models/inf.models.ts
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
    InfStatementSlice.prototype.by_subfield_page;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLm1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL21vZGVscy9pbmYubW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUEsNkJBUUM7OztJQVBDLGlDQUVFOztJQUNGLCtCQUFjOztJQUNkLDhCQUVDOztBQUVIO0lBQUE7SUFJQSxDQUFDO0lBQUQsNkJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQzs7OztJQUhDLDhDQUF1Qzs7SUFDdkMsNkNBQTRDOztJQUM1Qyx5Q0FBaUI7O0FBR25CO0lBQUE7SUFJQSxDQUFDO0lBQUQsNkJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQzs7OztJQUhDLDhDQUF1Qzs7SUFDdkMsNkNBQTRDOztJQUM1Qyx5Q0FBaUI7O0FBR25CO0lBQUE7SUFTQSxDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQUFDLEFBVEQsSUFTQzs7OztJQVJDLHlDQUFrQzs7SUFDbEMsdUNBQXNDOztJQUN0QyxzQ0FBcUM7Ozs7OztJQUdyQywrQ0FBOEM7O0lBQzlDLDZDQUF1Qzs7SUFDdkMsb0NBQWlCOztBQUduQjtJQUFBO0lBR0EsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7Ozs7SUFGQyxxQ0FBOEI7O0lBQzlCLGdDQUFpQjs7QUFHbkI7SUFBQTtJQUdBLENBQUM7SUFBRCw0QkFBQztBQUFELENBQUMsQUFIRCxJQUdDOzs7O0lBRkMsNkNBQXNDOztJQUN0Qyx3Q0FBaUI7O0FBR25CO0lBQUE7SUFHQSxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7OztJQUZDLHdDQUFpQzs7SUFDakMsbUNBQWlCOztBQUduQjtJQUFBO0lBR0EsQ0FBQztJQUFELDBCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7Ozs7SUFGQywyQ0FBb0M7O0lBQ3BDLHNDQUFpQjs7QUFJbkI7SUFBQTtJQUdBLENBQUM7SUFBRCx5QkFBQztBQUFELENBQUMsQUFIRCxJQUdDOzs7O0lBRkMsMENBQW1DOztJQUNuQyxxQ0FBaUI7O0FBSW5CO0lBQUE7SUFHQSxDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7OztJQUZDLHlDQUFrQzs7SUFDbEMsb0NBQWlCOztBQUduQjtJQUFBO0lBS0EsQ0FBQztJQUFELDJCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7Ozs7SUFKQyw0Q0FBcUM7O0lBQ3JDLHNFQUFxRTs7SUFDckUsc0RBQXFEOztJQUNyRCx1Q0FBaUI7Ozs7O0FBSW5CLHlCQWFDOzs7SUFaQyw4QkFBeUM7O0lBQ3pDLDhCQUF5Qzs7SUFDekMsd0JBQThCOztJQUM5QixvQkFBc0I7O0lBQ3RCLDZCQUF1Qzs7SUFDdkMsdUJBQTRCOztJQUM1QiwwQkFBa0M7O0lBQ2xDLDBCQUFpQzs7SUFDakMsd0JBQThCOztJQUM5Qiw0QkFBcUM7O0lBRXJDLCtCQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluZkFwcGVsbGF0aW9uLCBJbmZEaW1lbnNpb24sIEluZkxhbmdTdHJpbmcsIEluZkxhbmd1YWdlLCBJbmZQZXJzaXN0ZW50SXRlbSwgSW5mUGxhY2UsIEluZlRlbXBvcmFsRW50aXR5LCBJbmZUZXh0UHJvcGVydHksIEluZlRpbWVQcmltaXRpdmUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgSW5mU3RhdGVtZW50IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IEJ5UGsgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5cbmludGVyZmFjZSBQYWdpbmF0aW9uSW5mbyB7XG4gIGxvYWRpbmc6IHtcbiAgICBba2V5OiBzdHJpbmddOiBib29sZWFuXG4gIH0sXG4gIGNvdW50OiBudW1iZXIsXG4gIHJvd3M6IHtcbiAgICBba2V5OiBzdHJpbmddOiBudW1iZXJcbiAgfVxufVxuZXhwb3J0IGNsYXNzIEluZlBlcnNpc3RlbnRJdGVtU2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEluZlBlcnNpc3RlbnRJdGVtPjtcbiAgYnlfZmtfY2xhc3M/OiBCeVBrPEJ5UGs8SW5mUGVyc2lzdGVudEl0ZW0+PjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIEluZlRlbXBvcmFsRW50aXR5U2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEluZlRlbXBvcmFsRW50aXR5PjtcbiAgYnlfZmtfY2xhc3M/OiBCeVBrPEJ5UGs8SW5mUGVyc2lzdGVudEl0ZW0+PjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIEluZlN0YXRlbWVudFNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxJbmZTdGF0ZW1lbnQ+O1xuICBieV9zdWJqZWN0PzogQnlQazxCeVBrPEluZlN0YXRlbWVudD4+O1xuICBieV9vYmplY3Q/OiBCeVBrPEJ5UGs8SW5mU3RhdGVtZW50Pj47XG4gICdieV9zdWJqZWN0K3Byb3BlcnR5Jz86IEJ5UGs8QnlQazxJbmZTdGF0ZW1lbnQ+PjtcbiAgJ2J5X29iamVjdCtwcm9wZXJ0eSc/OiBCeVBrPEJ5UGs8SW5mU3RhdGVtZW50Pj47XG4gIGJ5X2ZrX3N1YmplY3RfZGF0YT86IEJ5UGs8QnlQazxJbmZTdGF0ZW1lbnQ+PjtcbiAgYnlfc3ViZmllbGRfcGFnZT86IEJ5UGs8UGFnaW5hdGlvbkluZm8+XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBJbmZQbGFjZVNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxJbmZQbGFjZT47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBJbmZUaW1lUHJpbWl0aXZlU2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEluZlRpbWVQcmltaXRpdmU+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgSW5mTGFuZ3VhZ2VTbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8SW5mTGFuZ3VhZ2U+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgSW5mQXBwZWxsYXRpb25TbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8SW5mQXBwZWxsYXRpb24+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5cbmV4cG9ydCBjbGFzcyBJbmZMYW5nU3RyaW5nU2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEluZkxhbmdTdHJpbmc+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5cbmV4cG9ydCBjbGFzcyBJbmZEaW1lbnNpb25TbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8SW5mRGltZW5zaW9uPjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIEluZlRleHRQcm9wZXJ0eVNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxJbmZUZXh0UHJvcGVydHk+O1xuICBieV9ma19jb25jZXJuZWRfZW50aXR5X19ma19jbGFzc19maWVsZD86IEJ5UGs8QnlQazxJbmZUZXh0UHJvcGVydHk+PjtcbiAgYnlfZmtfY29uY2VybmVkX2VudGl0eT86IEJ5UGs8QnlQazxJbmZUZXh0UHJvcGVydHk+PjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIEluZiB7XG4gIHBlcnNpc3RlbnRfaXRlbT86IEluZlBlcnNpc3RlbnRJdGVtU2xpY2U7XG4gIHRlbXBvcmFsX2VudGl0eT86IEluZlRlbXBvcmFsRW50aXR5U2xpY2U7XG4gIHN0YXRlbWVudD86IEluZlN0YXRlbWVudFNsaWNlO1xuICBwbGFjZT86IEluZlBsYWNlU2xpY2U7XG4gIHRpbWVfcHJpbWl0aXZlPzogSW5mVGltZVByaW1pdGl2ZVNsaWNlO1xuICBsYW5ndWFnZT86IEluZkxhbmd1YWdlU2xpY2U7XG4gIGFwcGVsbGF0aW9uPzogSW5mQXBwZWxsYXRpb25TbGljZTtcbiAgbGFuZ19zdHJpbmc/OiBJbmZMYW5nU3RyaW5nU2xpY2U7XG4gIGRpbWVuc2lvbj86IEluZkRpbWVuc2lvblNsaWNlO1xuICB0ZXh0X3Byb3BlcnR5PzogSW5mVGV4dFByb3BlcnR5U2xpY2U7XG5cbiAgcGtFbnRpdHlNb2RlbE1hcD86IEJ5UGs8eyBtb2RlbE5hbWU6IHN0cmluZyB9PlxufVxuXG5cblxuXG4iXX0=