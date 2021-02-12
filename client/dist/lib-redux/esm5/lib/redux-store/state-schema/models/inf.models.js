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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLm1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL21vZGVscy9pbmYubW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUEsNkJBUUM7OztJQVBDLGlDQUVFOztJQUNGLCtCQUFjOztJQUNkLDhCQUVDOztBQUVIO0lBQUE7SUFJQSxDQUFDO0lBQUQsNkJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQzs7OztJQUhDLDhDQUF1Qzs7SUFDdkMsNkNBQTRDOztJQUM1Qyx5Q0FBaUI7O0FBR25CO0lBQUE7SUFJQSxDQUFDO0lBQUQsNkJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQzs7OztJQUhDLDhDQUF1Qzs7SUFDdkMsNkNBQTRDOztJQUM1Qyx5Q0FBaUI7O0FBR25CO0lBQUE7SUFVQSxDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQzs7OztJQVRDLHlDQUFrQzs7SUFDbEMsdUNBQXNDOztJQUN0QyxzQ0FBcUM7Ozs7OztJQUdyQywrQ0FBOEM7O0lBQzlDLDJGQUFxRjs7SUFDckYsNEZBQXNGOztJQUN0RixvQ0FBaUI7O0FBR25CO0lBQUE7SUFHQSxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7OztJQUZDLHFDQUE4Qjs7SUFDOUIsZ0NBQWlCOztBQUduQjtJQUFBO0lBR0EsQ0FBQztJQUFELDRCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7Ozs7SUFGQyw2Q0FBc0M7O0lBQ3RDLHdDQUFpQjs7QUFHbkI7SUFBQTtJQUdBLENBQUM7SUFBRCx1QkFBQztBQUFELENBQUMsQUFIRCxJQUdDOzs7O0lBRkMsd0NBQWlDOztJQUNqQyxtQ0FBaUI7O0FBR25CO0lBQUE7SUFHQSxDQUFDO0lBQUQsMEJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7OztJQUZDLDJDQUFvQzs7SUFDcEMsc0NBQWlCOztBQUluQjtJQUFBO0lBR0EsQ0FBQztJQUFELHlCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7Ozs7SUFGQywwQ0FBbUM7O0lBQ25DLHFDQUFpQjs7QUFJbkI7SUFBQTtJQUdBLENBQUM7SUFBRCx3QkFBQztBQUFELENBQUMsQUFIRCxJQUdDOzs7O0lBRkMseUNBQWtDOztJQUNsQyxvQ0FBaUI7O0FBR25CO0lBQUE7SUFLQSxDQUFDO0lBQUQsMkJBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQzs7OztJQUpDLDRDQUFxQzs7SUFDckMsc0VBQXFFOztJQUNyRSxzREFBcUQ7O0lBQ3JELHVDQUFpQjs7Ozs7QUFJbkIseUJBYUM7OztJQVpDLDhCQUF5Qzs7SUFDekMsOEJBQXlDOztJQUN6Qyx3QkFBOEI7O0lBQzlCLG9CQUFzQjs7SUFDdEIsNkJBQXVDOztJQUN2Qyx1QkFBNEI7O0lBQzVCLDBCQUFrQzs7SUFDbEMsMEJBQWlDOztJQUNqQyx3QkFBOEI7O0lBQzlCLDRCQUFxQzs7SUFFckMsK0JBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5mQXBwZWxsYXRpb24sIEluZkRpbWVuc2lvbiwgSW5mTGFuZ1N0cmluZywgSW5mTGFuZ3VhZ2UsIEluZlBlcnNpc3RlbnRJdGVtLCBJbmZQbGFjZSwgSW5mVGVtcG9yYWxFbnRpdHksIEluZlRleHRQcm9wZXJ0eSwgSW5mVGltZVByaW1pdGl2ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBJbmZTdGF0ZW1lbnQgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgQnlQayB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzJztcblxuaW50ZXJmYWNlIFBhZ2luYXRpb25JbmZvIHtcbiAgbG9hZGluZzoge1xuICAgIFtrZXk6IHN0cmluZ106IGJvb2xlYW5cbiAgfSxcbiAgY291bnQ6IG51bWJlcixcbiAgcm93czoge1xuICAgIFtrZXk6IHN0cmluZ106IG51bWJlclxuICB9XG59XG5leHBvcnQgY2xhc3MgSW5mUGVyc2lzdGVudEl0ZW1TbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8SW5mUGVyc2lzdGVudEl0ZW0+O1xuICBieV9ma19jbGFzcz86IEJ5UGs8QnlQazxJbmZQZXJzaXN0ZW50SXRlbT4+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgSW5mVGVtcG9yYWxFbnRpdHlTbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8SW5mVGVtcG9yYWxFbnRpdHk+O1xuICBieV9ma19jbGFzcz86IEJ5UGs8QnlQazxJbmZQZXJzaXN0ZW50SXRlbT4+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgSW5mU3RhdGVtZW50U2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEluZlN0YXRlbWVudD47XG4gIGJ5X3N1YmplY3Q/OiBCeVBrPEJ5UGs8SW5mU3RhdGVtZW50Pj47XG4gIGJ5X29iamVjdD86IEJ5UGs8QnlQazxJbmZTdGF0ZW1lbnQ+PjtcbiAgJ2J5X3N1YmplY3QrcHJvcGVydHknPzogQnlQazxCeVBrPEluZlN0YXRlbWVudD4+O1xuICAnYnlfb2JqZWN0K3Byb3BlcnR5Jz86IEJ5UGs8QnlQazxJbmZTdGF0ZW1lbnQ+PjtcbiAgYnlfZmtfc3ViamVjdF9kYXRhPzogQnlQazxCeVBrPEluZlN0YXRlbWVudD4+O1xuICBwYWdfYnlfZmtfcHJvcGVydHlfX2ZrX3RhcmdldF9jbGFzc19fZmtfb2JqZWN0X2luZm9fX29mUHJvamVjdD86IEJ5UGs8UGFnaW5hdGlvbkluZm8+XG4gIHBhZ19ieV9ma19wcm9wZXJ0eV9fZmtfdGFyZ2V0X2NsYXNzX19ma19zdWJqZWN0X2luZm9fX29mUHJvamVjdD86IEJ5UGs8UGFnaW5hdGlvbkluZm8+XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBJbmZQbGFjZVNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxJbmZQbGFjZT47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBJbmZUaW1lUHJpbWl0aXZlU2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEluZlRpbWVQcmltaXRpdmU+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgSW5mTGFuZ3VhZ2VTbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8SW5mTGFuZ3VhZ2U+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgSW5mQXBwZWxsYXRpb25TbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8SW5mQXBwZWxsYXRpb24+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5cbmV4cG9ydCBjbGFzcyBJbmZMYW5nU3RyaW5nU2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEluZkxhbmdTdHJpbmc+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5cbmV4cG9ydCBjbGFzcyBJbmZEaW1lbnNpb25TbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8SW5mRGltZW5zaW9uPjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIEluZlRleHRQcm9wZXJ0eVNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxJbmZUZXh0UHJvcGVydHk+O1xuICBieV9ma19jb25jZXJuZWRfZW50aXR5X19ma19jbGFzc19maWVsZD86IEJ5UGs8QnlQazxJbmZUZXh0UHJvcGVydHk+PjtcbiAgYnlfZmtfY29uY2VybmVkX2VudGl0eT86IEJ5UGs8QnlQazxJbmZUZXh0UHJvcGVydHk+PjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIEluZiB7XG4gIHBlcnNpc3RlbnRfaXRlbT86IEluZlBlcnNpc3RlbnRJdGVtU2xpY2U7XG4gIHRlbXBvcmFsX2VudGl0eT86IEluZlRlbXBvcmFsRW50aXR5U2xpY2U7XG4gIHN0YXRlbWVudD86IEluZlN0YXRlbWVudFNsaWNlO1xuICBwbGFjZT86IEluZlBsYWNlU2xpY2U7XG4gIHRpbWVfcHJpbWl0aXZlPzogSW5mVGltZVByaW1pdGl2ZVNsaWNlO1xuICBsYW5ndWFnZT86IEluZkxhbmd1YWdlU2xpY2U7XG4gIGFwcGVsbGF0aW9uPzogSW5mQXBwZWxsYXRpb25TbGljZTtcbiAgbGFuZ19zdHJpbmc/OiBJbmZMYW5nU3RyaW5nU2xpY2U7XG4gIGRpbWVuc2lvbj86IEluZkRpbWVuc2lvblNsaWNlO1xuICB0ZXh0X3Byb3BlcnR5PzogSW5mVGV4dFByb3BlcnR5U2xpY2U7XG5cbiAgcGtFbnRpdHlNb2RlbE1hcD86IEJ5UGs8eyBtb2RlbE5hbWU6IHN0cmluZyB9PlxufVxuXG5cblxuXG4iXX0=