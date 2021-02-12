/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/models/dfh.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class DfhProfileSlice {
}
if (false) {
    /** @type {?} */
    DfhProfileSlice.prototype.by_pk_profile;
    /** @type {?} */
    DfhProfileSlice.prototype.loading;
}
export class DfhClassSlice {
}
if (false) {
    /** @type {?} */
    DfhClassSlice.prototype.by_pk_class;
    /** @type {?} */
    DfhClassSlice.prototype.by_basic_type;
    /** @type {?} */
    DfhClassSlice.prototype.loading;
}
export class DfhPropertySlice {
}
if (false) {
    /** @type {?} */
    DfhPropertySlice.prototype.by_pk_property;
    /** @type {?} */
    DfhPropertySlice.prototype.by_has_domain__fk_property;
    /** @type {?} */
    DfhPropertySlice.prototype.by_has_range__fk_property;
    /** @type {?} */
    DfhPropertySlice.prototype.by_has_domain;
    /** @type {?} */
    DfhPropertySlice.prototype.by_has_range;
    /** @type {?} */
    DfhPropertySlice.prototype.by_pk_property__has_domain__has_range;
    /** @type {?} */
    DfhPropertySlice.prototype.by_is_has_type_subproperty;
    /** @type {?} */
    DfhPropertySlice.prototype.loading;
}
export class DfhLabelSlice {
}
if (false) {
    /** @type {?} */
    DfhLabelSlice.prototype.by_fks;
    /** @type {?} */
    DfhLabelSlice.prototype.by_fk_class__type;
    /** @type {?} */
    DfhLabelSlice.prototype.by_fk_property__type;
    /** @type {?} */
    DfhLabelSlice.prototype.by_fk_profile__type;
    /** @type {?} */
    DfhLabelSlice.prototype.loading;
}
/**
 * @record
 */
export function Dfh() { }
if (false) {
    /** @type {?|undefined} */
    Dfh.prototype.profile;
    /** @type {?|undefined} */
    Dfh.prototype.klass;
    /** @type {?|undefined} */
    Dfh.prototype.property;
    /** @type {?|undefined} */
    Dfh.prototype.label;
    /** @type {?} */
    Dfh.prototype.pkEntityModelMap;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZoLm1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9tb2RlbHMvZGZoLm1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUtBLE1BQU0sT0FBTyxlQUFlO0NBSTNCOzs7SUFIQyx3Q0FBaUM7O0lBRWpDLGtDQUFrQjs7QUFHcEIsTUFBTSxPQUFPLGFBQWE7Q0FJekI7OztJQUhDLG9DQUE2Qjs7SUFDN0Isc0NBQXFDOztJQUNyQyxnQ0FBa0I7O0FBR3BCLE1BQU0sT0FBTyxnQkFBZ0I7Q0FVNUI7OztJQVRDLDBDQUF5Qzs7SUFDekMsc0RBQXFEOztJQUNyRCxxREFBb0Q7O0lBQ3BELHlDQUF3Qzs7SUFDeEMsd0NBQXVDOztJQUN2QyxpRUFBMEQ7O0lBQzFELHNEQUFxRDs7SUFFckQsbUNBQWtCOztBQUdwQixNQUFNLE9BQU8sYUFBYTtDQU96Qjs7O0lBTkMsK0JBQXdCOztJQUN4QiwwQ0FBeUM7O0lBQ3pDLDZDQUE0Qzs7SUFDNUMsNENBQTJDOztJQUUzQyxnQ0FBa0I7Ozs7O0FBR3BCLHlCQU9DOzs7SUFOQyxzQkFBMEI7O0lBQzFCLG9CQUFzQjs7SUFDdEIsdUJBQTRCOztJQUM1QixvQkFBc0I7O0lBRXRCLCtCQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERmaExhYmVsLCBEZmhQcm9maWxlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IERmaENsYXNzLCBEZmhQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBCeVBrIH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMnO1xuXG5cbmV4cG9ydCBjbGFzcyBEZmhQcm9maWxlU2xpY2Uge1xuICBieV9wa19wcm9maWxlPzogQnlQazxEZmhQcm9maWxlPjtcblxuICBsb2FkaW5nPzogYm9vbGVhbjsgLy8gdG9kbyByZW1vdmUgaW4gcmVkdWNlciBmYWN0b3J5IHRoZW4gaGVyZVxufVxuXG5leHBvcnQgY2xhc3MgRGZoQ2xhc3NTbGljZSB7XG4gIGJ5X3BrX2NsYXNzPzogQnlQazxEZmhDbGFzcz47XG4gIGJ5X2Jhc2ljX3R5cGU/OiBCeVBrPEJ5UGs8RGZoQ2xhc3M+PjtcbiAgbG9hZGluZz86IGJvb2xlYW47IC8vIHRvZG8gcmVtb3ZlIGluIHJlZHVjZXIgZmFjdG9yeSB0aGVuIGhlcmVcbn1cblxuZXhwb3J0IGNsYXNzIERmaFByb3BlcnR5U2xpY2Uge1xuICBieV9wa19wcm9wZXJ0eT86IEJ5UGs8QnlQazxEZmhQcm9wZXJ0eT4+O1xuICBieV9oYXNfZG9tYWluX19ma19wcm9wZXJ0eT86IEJ5UGs8QnlQazxEZmhQcm9wZXJ0eT4+O1xuICBieV9oYXNfcmFuZ2VfX2ZrX3Byb3BlcnR5PzogQnlQazxCeVBrPERmaFByb3BlcnR5Pj47XG4gIGJ5X2hhc19kb21haW4/OiBCeVBrPEJ5UGs8RGZoUHJvcGVydHk+PjtcbiAgYnlfaGFzX3JhbmdlPzogQnlQazxCeVBrPERmaFByb3BlcnR5Pj47XG4gIGJ5X3BrX3Byb3BlcnR5X19oYXNfZG9tYWluX19oYXNfcmFuZ2U/OiBCeVBrPERmaFByb3BlcnR5PjtcbiAgYnlfaXNfaGFzX3R5cGVfc3VicHJvcGVydHk/OiBCeVBrPEJ5UGs8RGZoUHJvcGVydHk+PjtcblxuICBsb2FkaW5nPzogYm9vbGVhbjsgLy8gdG9kbyByZW1vdmUgaW4gcmVkdWNlciBmYWN0b3J5IHRoZW4gaGVyZVxufVxuXG5leHBvcnQgY2xhc3MgRGZoTGFiZWxTbGljZSB7XG4gIGJ5X2Zrcz86IEJ5UGs8RGZoTGFiZWw+O1xuICBieV9ma19jbGFzc19fdHlwZT86IEJ5UGs8QnlQazxEZmhMYWJlbD4+O1xuICBieV9ma19wcm9wZXJ0eV9fdHlwZT86IEJ5UGs8QnlQazxEZmhMYWJlbD4+O1xuICBieV9ma19wcm9maWxlX190eXBlPzogQnlQazxCeVBrPERmaExhYmVsPj47XG5cbiAgbG9hZGluZz86IGJvb2xlYW47IC8vIHRvZG8gcmVtb3ZlIGluIHJlZHVjZXIgZmFjdG9yeSB0aGVuIGhlcmVcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZmgge1xuICBwcm9maWxlPzogRGZoUHJvZmlsZVNsaWNlO1xuICBrbGFzcz86IERmaENsYXNzU2xpY2U7XG4gIHByb3BlcnR5PzogRGZoUHJvcGVydHlTbGljZTtcbiAgbGFiZWw/OiBEZmhMYWJlbFNsaWNlO1xuXG4gIHBrRW50aXR5TW9kZWxNYXA6IEJ5UGs8eyBtb2RlbE5hbWU6IHN0cmluZyB9PlxufVxuIl19