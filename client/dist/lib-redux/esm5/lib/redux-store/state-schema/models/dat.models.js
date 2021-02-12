/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/models/dat.models.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0Lm1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL21vZGVscy9kYXQubW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBT0E7SUFBQTtJQUtBLENBQUM7SUFBRCxtQkFBQztBQUFELENBQUMsQUFMRCxJQUtDOzs7O0lBSkMsb0RBQWdEOztJQUNoRCxvQ0FBc0M7O0lBQ3RDLGtDQUFvQzs7SUFDcEMsK0JBQWlCOztBQUVuQjtJQUFBO0lBSUEsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7Ozs7SUFIQyxrQ0FBZ0M7O0lBQ2hDLGdDQUFvQzs7SUFDcEMsNkJBQWlCOztBQUduQjtJQUFBO0lBR0EsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7Ozs7SUFGQyxtQ0FBK0I7O0lBQy9CLG9DQUFzQzs7QUFHeEM7SUFBQTtJQUdBLENBQUM7SUFBRCw4QkFBQztBQUFELENBQUMsQUFIRCxJQUdDOzs7O0lBRkMsK0NBQTJDOztJQUMzQywrQ0FBaUQ7O0FBR25EO0lBQUE7SUFHQSxDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7OztJQUZDLHlDQUFxQzs7SUFDckMsMENBQTRDOztBQUc5QztJQUFBO0lBSUEsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7Ozs7SUFIQyxzQ0FBa0M7O0lBQ2xDLHVDQUF5Qzs7SUFDekMsaUNBQWlCOzs7OztBQUduQix5QkFLQzs7O0lBSkMsc0JBQXVCOztJQUN2QixvQkFBbUI7O0lBQ25CLHFCQUFxQjs7SUFDckIsNEJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0Q29sdW1uLCBEYXROYW1lc3BhY2UsIERhdFRleHRQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBEYXRDbGFzc0NvbHVtbk1hcHBpbmcsIERhdERpZ2l0YWwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgQnlQayB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzJztcblxuXG5cblxuZXhwb3J0IGNsYXNzIERpZ2l0YWxTbGljZSB7XG4gIGJ5X3BrX2VudGl0eV9fZW50aXR5X3ZlcnNpb24/OiBCeVBrPERhdERpZ2l0YWw+O1xuICBieV9wa19lbnRpdHk/OiBCeVBrPEJ5UGs8RGF0RGlnaXRhbD4+O1xuICBieV9wa190ZXh0PzogQnlQazxCeVBrPERhdERpZ2l0YWw+PjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cbmV4cG9ydCBjbGFzcyBDaHVua1NsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxEYXREaWdpdGFsPjtcbiAgYnlfZmtfdGV4dD86IEJ5UGs8QnlQazxEYXREaWdpdGFsPj47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBDb2x1bW5TbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8RGF0Q29sdW1uPjtcbiAgYnlfZmtfZGlnaXRhbD86IEJ5UGs8QnlQazxEYXRDb2x1bW4+Pjtcbn1cblxuZXhwb3J0IGNsYXNzIENsYXNzQ29sdW1uTWFwcGluZ1NsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxEYXRDbGFzc0NvbHVtbk1hcHBpbmc+O1xuICBieV9ma19jb2x1bW4/OiBCeVBrPEJ5UGs8RGF0Q2xhc3NDb2x1bW5NYXBwaW5nPj47XG59XG5cbmV4cG9ydCBjbGFzcyBUZXh0UHJvcGVydHlTbGljZSB7XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8RGF0VGV4dFByb3BlcnR5PjtcbiAgYnlfZmtfZGlnaXRhbD86IEJ5UGs8QnlQazxEYXRUZXh0UHJvcGVydHk+Pjtcbn1cblxuZXhwb3J0IGNsYXNzIE5hbWVzcGFjZVNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxEYXROYW1lc3BhY2U+O1xuICBieV9ma19wcm9qZWN0PzogQnlQazxCeVBrPERhdE5hbWVzcGFjZT4+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhdCB7XG4gIGRpZ2l0YWw/OiBEaWdpdGFsU2xpY2U7XG4gIGNodW5rPzogQ2h1bmtTbGljZTtcbiAgY29sdW1uPzogQ29sdW1uU2xpY2U7XG4gIHRleHRfcHJvcGVydHk/OiBUZXh0UHJvcGVydHlTbGljZTtcbn1cblxuXG5cblxuIl19