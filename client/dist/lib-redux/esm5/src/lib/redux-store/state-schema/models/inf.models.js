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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLm1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9tb2RlbHMvaW5mLm1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLDZCQVFDOzs7SUFQQyxpQ0FFRTs7SUFDRiwrQkFBYzs7SUFDZCw4QkFFQzs7QUFFSDtJQUFBO0lBSUEsQ0FBQztJQUFELDZCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7Ozs7SUFIQyw4Q0FBdUM7O0lBQ3ZDLDZDQUE0Qzs7SUFDNUMseUNBQWlCOztBQUduQjtJQUFBO0lBSUEsQ0FBQztJQUFELDZCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7Ozs7SUFIQyw4Q0FBdUM7O0lBQ3ZDLDZDQUE0Qzs7SUFDNUMseUNBQWlCOztBQUduQjtJQUFBO0lBU0EsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7Ozs7SUFSQyx5Q0FBa0M7O0lBQ2xDLHVDQUFzQzs7SUFDdEMsc0NBQXFDOzs7Ozs7SUFHckMsK0NBQThDOztJQUM5Qyw2Q0FBdUM7O0lBQ3ZDLG9DQUFpQjs7QUFHbkI7SUFBQTtJQUdBLENBQUM7SUFBRCxvQkFBQztBQUFELENBQUMsQUFIRCxJQUdDOzs7O0lBRkMscUNBQThCOztJQUM5QixnQ0FBaUI7O0FBR25CO0lBQUE7SUFHQSxDQUFDO0lBQUQsNEJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7OztJQUZDLDZDQUFzQzs7SUFDdEMsd0NBQWlCOztBQUduQjtJQUFBO0lBR0EsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7Ozs7SUFGQyx3Q0FBaUM7O0lBQ2pDLG1DQUFpQjs7QUFHbkI7SUFBQTtJQUdBLENBQUM7SUFBRCwwQkFBQztBQUFELENBQUMsQUFIRCxJQUdDOzs7O0lBRkMsMkNBQW9DOztJQUNwQyxzQ0FBaUI7O0FBSW5CO0lBQUE7SUFHQSxDQUFDO0lBQUQseUJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7OztJQUZDLDBDQUFtQzs7SUFDbkMscUNBQWlCOztBQUluQjtJQUFBO0lBR0EsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7Ozs7SUFGQyx5Q0FBa0M7O0lBQ2xDLG9DQUFpQjs7QUFHbkI7SUFBQTtJQUtBLENBQUM7SUFBRCwyQkFBQztBQUFELENBQUMsQUFMRCxJQUtDOzs7O0lBSkMsNENBQXFDOztJQUNyQyxzRUFBcUU7O0lBQ3JFLHNEQUFxRDs7SUFDckQsdUNBQWlCOzs7OztBQUluQix5QkFhQzs7O0lBWkMsOEJBQXlDOztJQUN6Qyw4QkFBeUM7O0lBQ3pDLHdCQUE4Qjs7SUFDOUIsb0JBQXNCOztJQUN0Qiw2QkFBdUM7O0lBQ3ZDLHVCQUE0Qjs7SUFDNUIsMEJBQWtDOztJQUNsQywwQkFBaUM7O0lBQ2pDLHdCQUE4Qjs7SUFDOUIsNEJBQXFDOztJQUVyQywrQkFBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmZBcHBlbGxhdGlvbiwgSW5mRGltZW5zaW9uLCBJbmZMYW5nU3RyaW5nLCBJbmZMYW5ndWFnZSwgSW5mUGVyc2lzdGVudEl0ZW0sIEluZlBsYWNlLCBJbmZUZW1wb3JhbEVudGl0eSwgSW5mVGV4dFByb3BlcnR5LCBJbmZUaW1lUHJpbWl0aXZlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEluZlN0YXRlbWVudCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBCeVBrIH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMvbW9kZWwnO1xuXG5pbnRlcmZhY2UgUGFnaW5hdGlvbkluZm8ge1xuICBsb2FkaW5nOiB7XG4gICAgW2tleTogc3RyaW5nXTogYm9vbGVhblxuICB9LFxuICBjb3VudDogbnVtYmVyLFxuICByb3dzOiB7XG4gICAgW2tleTogc3RyaW5nXTogbnVtYmVyXG4gIH1cbn1cbmV4cG9ydCBjbGFzcyBJbmZQZXJzaXN0ZW50SXRlbVNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxJbmZQZXJzaXN0ZW50SXRlbT47XG4gIGJ5X2ZrX2NsYXNzPzogQnlQazxCeVBrPEluZlBlcnNpc3RlbnRJdGVtPj47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBJbmZUZW1wb3JhbEVudGl0eVNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxJbmZUZW1wb3JhbEVudGl0eT47XG4gIGJ5X2ZrX2NsYXNzPzogQnlQazxCeVBrPEluZlBlcnNpc3RlbnRJdGVtPj47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBJbmZTdGF0ZW1lbnRTbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8SW5mU3RhdGVtZW50PjtcbiAgYnlfc3ViamVjdD86IEJ5UGs8QnlQazxJbmZTdGF0ZW1lbnQ+PjtcbiAgYnlfb2JqZWN0PzogQnlQazxCeVBrPEluZlN0YXRlbWVudD4+O1xuICAnYnlfc3ViamVjdCtwcm9wZXJ0eSc/OiBCeVBrPEJ5UGs8SW5mU3RhdGVtZW50Pj47XG4gICdieV9vYmplY3QrcHJvcGVydHknPzogQnlQazxCeVBrPEluZlN0YXRlbWVudD4+O1xuICBieV9ma19zdWJqZWN0X2RhdGE/OiBCeVBrPEJ5UGs8SW5mU3RhdGVtZW50Pj47XG4gIGJ5X3N1YmZpZWxkX3BhZ2U/OiBCeVBrPFBhZ2luYXRpb25JbmZvPlxuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgSW5mUGxhY2VTbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8SW5mUGxhY2U+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgSW5mVGltZVByaW1pdGl2ZVNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxJbmZUaW1lUHJpbWl0aXZlPjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIEluZkxhbmd1YWdlU2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEluZkxhbmd1YWdlPjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIEluZkFwcGVsbGF0aW9uU2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEluZkFwcGVsbGF0aW9uPjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuXG5leHBvcnQgY2xhc3MgSW5mTGFuZ1N0cmluZ1NsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxJbmZMYW5nU3RyaW5nPjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuXG5leHBvcnQgY2xhc3MgSW5mRGltZW5zaW9uU2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEluZkRpbWVuc2lvbj47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBJbmZUZXh0UHJvcGVydHlTbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8SW5mVGV4dFByb3BlcnR5PjtcbiAgYnlfZmtfY29uY2VybmVkX2VudGl0eV9fZmtfY2xhc3NfZmllbGQ/OiBCeVBrPEJ5UGs8SW5mVGV4dFByb3BlcnR5Pj47XG4gIGJ5X2ZrX2NvbmNlcm5lZF9lbnRpdHk/OiBCeVBrPEJ5UGs8SW5mVGV4dFByb3BlcnR5Pj47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBJbmYge1xuICBwZXJzaXN0ZW50X2l0ZW0/OiBJbmZQZXJzaXN0ZW50SXRlbVNsaWNlO1xuICB0ZW1wb3JhbF9lbnRpdHk/OiBJbmZUZW1wb3JhbEVudGl0eVNsaWNlO1xuICBzdGF0ZW1lbnQ/OiBJbmZTdGF0ZW1lbnRTbGljZTtcbiAgcGxhY2U/OiBJbmZQbGFjZVNsaWNlO1xuICB0aW1lX3ByaW1pdGl2ZT86IEluZlRpbWVQcmltaXRpdmVTbGljZTtcbiAgbGFuZ3VhZ2U/OiBJbmZMYW5ndWFnZVNsaWNlO1xuICBhcHBlbGxhdGlvbj86IEluZkFwcGVsbGF0aW9uU2xpY2U7XG4gIGxhbmdfc3RyaW5nPzogSW5mTGFuZ1N0cmluZ1NsaWNlO1xuICBkaW1lbnNpb24/OiBJbmZEaW1lbnNpb25TbGljZTtcbiAgdGV4dF9wcm9wZXJ0eT86IEluZlRleHRQcm9wZXJ0eVNsaWNlO1xuXG4gIHBrRW50aXR5TW9kZWxNYXA/OiBCeVBrPHsgbW9kZWxOYW1lOiBzdHJpbmcgfT5cbn1cblxuXG5cblxuIl19