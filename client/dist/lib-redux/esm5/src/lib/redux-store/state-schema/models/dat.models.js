/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/models/dat.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DigitalSlice = /** @class */ (function () {
    function DigitalSlice() {
    }
    return DigitalSlice;
}());
export { DigitalSlice };
if (false) {
    /** @type {?} */
    DigitalSlice.prototype.by_pk_entity__entity_version;
    /** @type {?} */
    DigitalSlice.prototype.by_pk_entity;
    /** @type {?} */
    DigitalSlice.prototype.by_pk_text;
    /** @type {?} */
    DigitalSlice.prototype.loading;
}
var ChunkSlice = /** @class */ (function () {
    function ChunkSlice() {
    }
    return ChunkSlice;
}());
export { ChunkSlice };
if (false) {
    /** @type {?} */
    ChunkSlice.prototype.by_pk_entity;
    /** @type {?} */
    ChunkSlice.prototype.by_fk_text;
    /** @type {?} */
    ChunkSlice.prototype.loading;
}
var ColumnSlice = /** @class */ (function () {
    function ColumnSlice() {
    }
    return ColumnSlice;
}());
export { ColumnSlice };
if (false) {
    /** @type {?} */
    ColumnSlice.prototype.by_pk_entity;
    /** @type {?} */
    ColumnSlice.prototype.by_fk_digital;
}
var ClassColumnMappingSlice = /** @class */ (function () {
    function ClassColumnMappingSlice() {
    }
    return ClassColumnMappingSlice;
}());
export { ClassColumnMappingSlice };
if (false) {
    /** @type {?} */
    ClassColumnMappingSlice.prototype.by_pk_entity;
    /** @type {?} */
    ClassColumnMappingSlice.prototype.by_fk_column;
}
var TextPropertySlice = /** @class */ (function () {
    function TextPropertySlice() {
    }
    return TextPropertySlice;
}());
export { TextPropertySlice };
if (false) {
    /** @type {?} */
    TextPropertySlice.prototype.by_pk_entity;
    /** @type {?} */
    TextPropertySlice.prototype.by_fk_digital;
}
var NamespaceSlice = /** @class */ (function () {
    function NamespaceSlice() {
    }
    return NamespaceSlice;
}());
export { NamespaceSlice };
if (false) {
    /** @type {?} */
    NamespaceSlice.prototype.by_pk_entity;
    /** @type {?} */
    NamespaceSlice.prototype.by_fk_project;
    /** @type {?} */
    NamespaceSlice.prototype.loading;
}
/**
 * @record
 */
export function Dat() { }
if (false) {
    /** @type {?|undefined} */
    Dat.prototype.digital;
    /** @type {?|undefined} */
    Dat.prototype.chunk;
    /** @type {?|undefined} */
    Dat.prototype.column;
    /** @type {?|undefined} */
    Dat.prototype.text_property;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0Lm1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9tb2RlbHMvZGF0Lm1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQU9BO0lBQUE7SUFLQSxDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQzs7OztJQUpDLG9EQUFnRDs7SUFDaEQsb0NBQXNDOztJQUN0QyxrQ0FBb0M7O0lBQ3BDLCtCQUFpQjs7QUFFbkI7SUFBQTtJQUlBLENBQUM7SUFBRCxpQkFBQztBQUFELENBQUMsQUFKRCxJQUlDOzs7O0lBSEMsa0NBQWdDOztJQUNoQyxnQ0FBb0M7O0lBQ3BDLDZCQUFpQjs7QUFHbkI7SUFBQTtJQUdBLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFIRCxJQUdDOzs7O0lBRkMsbUNBQStCOztJQUMvQixvQ0FBc0M7O0FBR3hDO0lBQUE7SUFHQSxDQUFDO0lBQUQsOEJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7OztJQUZDLCtDQUEyQzs7SUFDM0MsK0NBQWlEOztBQUduRDtJQUFBO0lBR0EsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7Ozs7SUFGQyx5Q0FBcUM7O0lBQ3JDLDBDQUE0Qzs7QUFHOUM7SUFBQTtJQUlBLENBQUM7SUFBRCxxQkFBQztBQUFELENBQUMsQUFKRCxJQUlDOzs7O0lBSEMsc0NBQWtDOztJQUNsQyx1Q0FBeUM7O0lBQ3pDLGlDQUFpQjs7Ozs7QUFHbkIseUJBS0M7OztJQUpDLHNCQUF1Qjs7SUFDdkIsb0JBQW1COztJQUNuQixxQkFBcUI7O0lBQ3JCLDRCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdENvbHVtbiwgRGF0TmFtZXNwYWNlLCBEYXRUZXh0UHJvcGVydHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgRGF0Q2xhc3NDb2x1bW5NYXBwaW5nLCBEYXREaWdpdGFsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IEJ5UGsgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5cblxuXG5cbmV4cG9ydCBjbGFzcyBEaWdpdGFsU2xpY2Uge1xuICBieV9wa19lbnRpdHlfX2VudGl0eV92ZXJzaW9uPzogQnlQazxEYXREaWdpdGFsPjtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxCeVBrPERhdERpZ2l0YWw+PjtcbiAgYnlfcGtfdGV4dD86IEJ5UGs8QnlQazxEYXREaWdpdGFsPj47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5leHBvcnQgY2xhc3MgQ2h1bmtTbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8RGF0RGlnaXRhbD47XG4gIGJ5X2ZrX3RleHQ/OiBCeVBrPEJ5UGs8RGF0RGlnaXRhbD4+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgQ29sdW1uU2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPERhdENvbHVtbj47XG4gIGJ5X2ZrX2RpZ2l0YWw/OiBCeVBrPEJ5UGs8RGF0Q29sdW1uPj47XG59XG5cbmV4cG9ydCBjbGFzcyBDbGFzc0NvbHVtbk1hcHBpbmdTbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8RGF0Q2xhc3NDb2x1bW5NYXBwaW5nPjtcbiAgYnlfZmtfY29sdW1uPzogQnlQazxCeVBrPERhdENsYXNzQ29sdW1uTWFwcGluZz4+O1xufVxuXG5leHBvcnQgY2xhc3MgVGV4dFByb3BlcnR5U2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPERhdFRleHRQcm9wZXJ0eT47XG4gIGJ5X2ZrX2RpZ2l0YWw/OiBCeVBrPEJ5UGs8RGF0VGV4dFByb3BlcnR5Pj47XG59XG5cbmV4cG9ydCBjbGFzcyBOYW1lc3BhY2VTbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8RGF0TmFtZXNwYWNlPjtcbiAgYnlfZmtfcHJvamVjdD86IEJ5UGs8QnlQazxEYXROYW1lc3BhY2U+PjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXQge1xuICBkaWdpdGFsPzogRGlnaXRhbFNsaWNlO1xuICBjaHVuaz86IENodW5rU2xpY2U7XG4gIGNvbHVtbj86IENvbHVtblNsaWNlO1xuICB0ZXh0X3Byb3BlcnR5PzogVGV4dFByb3BlcnR5U2xpY2U7XG59XG5cblxuXG5cbiJdfQ==