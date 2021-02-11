/**
 * @fileoverview added by tsickle
 * Generated from: lib/sdk-lb4/model/entitySearchHit.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function EntitySearchHit() { }
if (false) {
    /** @type {?|undefined} */
    EntitySearchHit.prototype.pk_entity;
    /** @type {?|undefined} */
    EntitySearchHit.prototype.fk_project;
    /** @type {?} */
    EntitySearchHit.prototype.project;
    /** @type {?} */
    EntitySearchHit.prototype.fk_class;
    /** @type {?|undefined} */
    EntitySearchHit.prototype.class_label;
    /** @type {?|undefined} */
    EntitySearchHit.prototype.entity_label;
    /** @type {?|undefined} */
    EntitySearchHit.prototype.entity_type;
    /** @type {?|undefined} */
    EntitySearchHit.prototype.type_label;
    /** @type {?|undefined} */
    EntitySearchHit.prototype.fk_type;
    /** @type {?|undefined} */
    EntitySearchHit.prototype.time_span;
    /** @type {?|undefined} */
    EntitySearchHit.prototype.first_second;
    /** @type {?|undefined} */
    EntitySearchHit.prototype.last_second;
    /** @type {?|undefined} */
    EntitySearchHit.prototype.tmsp_last_modification;
    /** @type {?|undefined} */
    EntitySearchHit.prototype.full_text_headline;
    /** @type {?|undefined} */
    EntitySearchHit.prototype.class_label_headline;
    /** @type {?|undefined} */
    EntitySearchHit.prototype.entity_label_headline;
    /** @type {?|undefined} */
    EntitySearchHit.prototype.type_label_headline;
    /** @type {?|undefined} */
    EntitySearchHit.prototype.projects;
    /** @type {?|undefined} */
    EntitySearchHit.prototype.related_statements;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5U2VhcmNoSGl0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGI0LyIsInNvdXJjZXMiOlsibGliL3Nkay1sYjQvbW9kZWwvZW50aXR5U2VhcmNoSGl0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBZUEscUNBb0JDOzs7SUFuQkcsb0NBQW1COztJQUNuQixxQ0FBb0I7O0lBQ3BCLGtDQUFnQjs7SUFDaEIsbUNBQWlCOztJQUNqQixzQ0FBcUI7O0lBQ3JCLHVDQUFzQjs7SUFDdEIsc0NBQXFCOztJQUNyQixxQ0FBb0I7O0lBQ3BCLGtDQUFpQjs7SUFDakIsb0NBQXFDOztJQUNyQyx1Q0FBc0I7O0lBQ3RCLHNDQUFxQjs7SUFDckIsaURBQWdDOztJQUNoQyw2Q0FBNEI7O0lBQzVCLCtDQUE4Qjs7SUFDOUIsZ0RBQStCOztJQUMvQiw4Q0FBNkI7O0lBQzdCLG1DQUF5Qjs7SUFDekIsNkNBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBnZW92aXN0b3J5XG4gKiBHZW92aXN0b3J5IOKAkyBQbGF0Zm9ybSBmb3IgRGlnaXRhbCBIaXN0b3J5XG4gKlxuICogVGhlIHZlcnNpb24gb2YgdGhlIE9wZW5BUEkgZG9jdW1lbnQ6IDEuMC4wXG4gKiBcbiAqXG4gKiBOT1RFOiBUaGlzIGNsYXNzIGlzIGF1dG8gZ2VuZXJhdGVkIGJ5IE9wZW5BUEkgR2VuZXJhdG9yIChodHRwczovL29wZW5hcGktZ2VuZXJhdG9yLnRlY2gpLlxuICogaHR0cHM6Ly9vcGVuYXBpLWdlbmVyYXRvci50ZWNoXG4gKiBEbyBub3QgZWRpdCB0aGUgY2xhc3MgbWFudWFsbHkuXG4gKi9cbmltcG9ydCB7IEluZlN0YXRlbWVudCB9IGZyb20gJy4vaW5mU3RhdGVtZW50JztcbmltcG9ydCB7IFdhckVudGl0eVByZXZpZXdUaW1lU3BhbiB9IGZyb20gJy4vd2FyRW50aXR5UHJldmlld1RpbWVTcGFuJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eVNlYXJjaEhpdCB7IFxuICAgIHBrX2VudGl0eT86IG51bWJlcjtcbiAgICBma19wcm9qZWN0PzogbnVtYmVyO1xuICAgIHByb2plY3Q6IG51bWJlcjtcbiAgICBma19jbGFzczogbnVtYmVyO1xuICAgIGNsYXNzX2xhYmVsPzogc3RyaW5nO1xuICAgIGVudGl0eV9sYWJlbD86IHN0cmluZztcbiAgICBlbnRpdHlfdHlwZT86IHN0cmluZztcbiAgICB0eXBlX2xhYmVsPzogc3RyaW5nO1xuICAgIGZrX3R5cGU/OiBudW1iZXI7XG4gICAgdGltZV9zcGFuPzogV2FyRW50aXR5UHJldmlld1RpbWVTcGFuO1xuICAgIGZpcnN0X3NlY29uZD86IHN0cmluZztcbiAgICBsYXN0X3NlY29uZD86IHN0cmluZztcbiAgICB0bXNwX2xhc3RfbW9kaWZpY2F0aW9uPzogc3RyaW5nO1xuICAgIGZ1bGxfdGV4dF9oZWFkbGluZT86IHN0cmluZztcbiAgICBjbGFzc19sYWJlbF9oZWFkbGluZT86IHN0cmluZztcbiAgICBlbnRpdHlfbGFiZWxfaGVhZGxpbmU/OiBzdHJpbmc7XG4gICAgdHlwZV9sYWJlbF9oZWFkbGluZT86IHN0cmluZztcbiAgICBwcm9qZWN0cz86IEFycmF5PG51bWJlcj47XG4gICAgcmVsYXRlZF9zdGF0ZW1lbnRzPzogQXJyYXk8SW5mU3RhdGVtZW50Pjtcbn1cblxuIl19