/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/models/dat.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class DigitalSlice {
}
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
export class ChunkSlice {
}
if (false) {
    /** @type {?} */
    ChunkSlice.prototype.by_pk_entity;
    /** @type {?} */
    ChunkSlice.prototype.by_fk_text;
    /** @type {?} */
    ChunkSlice.prototype.loading;
}
export class ColumnSlice {
}
if (false) {
    /** @type {?} */
    ColumnSlice.prototype.by_pk_entity;
    /** @type {?} */
    ColumnSlice.prototype.by_fk_digital;
}
export class ClassColumnMappingSlice {
}
if (false) {
    /** @type {?} */
    ClassColumnMappingSlice.prototype.by_pk_entity;
    /** @type {?} */
    ClassColumnMappingSlice.prototype.by_fk_column;
}
export class TextPropertySlice {
}
if (false) {
    /** @type {?} */
    TextPropertySlice.prototype.by_pk_entity;
    /** @type {?} */
    TextPropertySlice.prototype.by_fk_digital;
}
export class NamespaceSlice {
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0Lm1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9tb2RlbHMvZGF0Lm1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQU9BLE1BQU0sT0FBTyxZQUFZO0NBS3hCOzs7SUFKQyxvREFBZ0Q7O0lBQ2hELG9DQUFzQzs7SUFDdEMsa0NBQW9DOztJQUNwQywrQkFBaUI7O0FBRW5CLE1BQU0sT0FBTyxVQUFVO0NBSXRCOzs7SUFIQyxrQ0FBZ0M7O0lBQ2hDLGdDQUFvQzs7SUFDcEMsNkJBQWlCOztBQUduQixNQUFNLE9BQU8sV0FBVztDQUd2Qjs7O0lBRkMsbUNBQStCOztJQUMvQixvQ0FBc0M7O0FBR3hDLE1BQU0sT0FBTyx1QkFBdUI7Q0FHbkM7OztJQUZDLCtDQUEyQzs7SUFDM0MsK0NBQWlEOztBQUduRCxNQUFNLE9BQU8saUJBQWlCO0NBRzdCOzs7SUFGQyx5Q0FBcUM7O0lBQ3JDLDBDQUE0Qzs7QUFHOUMsTUFBTSxPQUFPLGNBQWM7Q0FJMUI7OztJQUhDLHNDQUFrQzs7SUFDbEMsdUNBQXlDOztJQUN6QyxpQ0FBaUI7Ozs7O0FBR25CLHlCQUtDOzs7SUFKQyxzQkFBdUI7O0lBQ3ZCLG9CQUFtQjs7SUFDbkIscUJBQXFCOztJQUNyQiw0QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRDb2x1bW4sIERhdE5hbWVzcGFjZSwgRGF0VGV4dFByb3BlcnR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IERhdENsYXNzQ29sdW1uTWFwcGluZywgRGF0RGlnaXRhbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBCeVBrIH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMnO1xuXG5cblxuXG5leHBvcnQgY2xhc3MgRGlnaXRhbFNsaWNlIHtcbiAgYnlfcGtfZW50aXR5X19lbnRpdHlfdmVyc2lvbj86IEJ5UGs8RGF0RGlnaXRhbD47XG4gIGJ5X3BrX2VudGl0eT86IEJ5UGs8QnlQazxEYXREaWdpdGFsPj47XG4gIGJ5X3BrX3RleHQ/OiBCeVBrPEJ5UGs8RGF0RGlnaXRhbD4+O1xuICBsb2FkaW5nPzogYm9vbGVhblxufVxuZXhwb3J0IGNsYXNzIENodW5rU2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPERhdERpZ2l0YWw+O1xuICBieV9ma190ZXh0PzogQnlQazxCeVBrPERhdERpZ2l0YWw+PjtcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIENvbHVtblNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxEYXRDb2x1bW4+O1xuICBieV9ma19kaWdpdGFsPzogQnlQazxCeVBrPERhdENvbHVtbj4+O1xufVxuXG5leHBvcnQgY2xhc3MgQ2xhc3NDb2x1bW5NYXBwaW5nU2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPERhdENsYXNzQ29sdW1uTWFwcGluZz47XG4gIGJ5X2ZrX2NvbHVtbj86IEJ5UGs8QnlQazxEYXRDbGFzc0NvbHVtbk1hcHBpbmc+Pjtcbn1cblxuZXhwb3J0IGNsYXNzIFRleHRQcm9wZXJ0eVNsaWNlIHtcbiAgYnlfcGtfZW50aXR5PzogQnlQazxEYXRUZXh0UHJvcGVydHk+O1xuICBieV9ma19kaWdpdGFsPzogQnlQazxCeVBrPERhdFRleHRQcm9wZXJ0eT4+O1xufVxuXG5leHBvcnQgY2xhc3MgTmFtZXNwYWNlU2xpY2Uge1xuICBieV9wa19lbnRpdHk/OiBCeVBrPERhdE5hbWVzcGFjZT47XG4gIGJ5X2ZrX3Byb2plY3Q/OiBCeVBrPEJ5UGs8RGF0TmFtZXNwYWNlPj47XG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0IHtcbiAgZGlnaXRhbD86IERpZ2l0YWxTbGljZTtcbiAgY2h1bms/OiBDaHVua1NsaWNlO1xuICBjb2x1bW4/OiBDb2x1bW5TbGljZTtcbiAgdGV4dF9wcm9wZXJ0eT86IFRleHRQcm9wZXJ0eVNsaWNlO1xufVxuXG5cblxuXG4iXX0=