/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/models/dfh.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DfhProfileSlice = /** @class */ (function () {
    function DfhProfileSlice() {
    }
    return DfhProfileSlice;
}());
export { DfhProfileSlice };
if (false) {
    /** @type {?} */
    DfhProfileSlice.prototype.by_pk_profile;
    /** @type {?} */
    DfhProfileSlice.prototype.loading;
}
var DfhClassSlice = /** @class */ (function () {
    function DfhClassSlice() {
    }
    return DfhClassSlice;
}());
export { DfhClassSlice };
if (false) {
    /** @type {?} */
    DfhClassSlice.prototype.by_pk_class;
    /** @type {?} */
    DfhClassSlice.prototype.by_basic_type;
    /** @type {?} */
    DfhClassSlice.prototype.loading;
}
var DfhPropertySlice = /** @class */ (function () {
    function DfhPropertySlice() {
    }
    return DfhPropertySlice;
}());
export { DfhPropertySlice };
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
var DfhLabelSlice = /** @class */ (function () {
    function DfhLabelSlice() {
    }
    return DfhLabelSlice;
}());
export { DfhLabelSlice };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZoLm1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL21vZGVscy9kZmgubW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBS0E7SUFBQTtJQUlBLENBQUM7SUFBRCxzQkFBQztBQUFELENBQUMsQUFKRCxJQUlDOzs7O0lBSEMsd0NBQWlDOztJQUVqQyxrQ0FBa0I7O0FBR3BCO0lBQUE7SUFJQSxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQzs7OztJQUhDLG9DQUE2Qjs7SUFDN0Isc0NBQXFDOztJQUNyQyxnQ0FBa0I7O0FBR3BCO0lBQUE7SUFVQSxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQzs7OztJQVRDLDBDQUF5Qzs7SUFDekMsc0RBQXFEOztJQUNyRCxxREFBb0Q7O0lBQ3BELHlDQUF3Qzs7SUFDeEMsd0NBQXVDOztJQUN2QyxpRUFBMEQ7O0lBQzFELHNEQUFxRDs7SUFFckQsbUNBQWtCOztBQUdwQjtJQUFBO0lBT0EsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7Ozs7SUFOQywrQkFBd0I7O0lBQ3hCLDBDQUF5Qzs7SUFDekMsNkNBQTRDOztJQUM1Qyw0Q0FBMkM7O0lBRTNDLGdDQUFrQjs7Ozs7QUFHcEIseUJBT0M7OztJQU5DLHNCQUEwQjs7SUFDMUIsb0JBQXNCOztJQUN0Qix1QkFBNEI7O0lBQzVCLG9CQUFzQjs7SUFFdEIsK0JBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGZoTGFiZWwsIERmaFByb2ZpbGUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgRGZoQ2xhc3MsIERmaFByb3BlcnR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IEJ5UGsgfSBmcm9tICcuLi8uLi9yb290L21vZGVscyc7XG5cblxuZXhwb3J0IGNsYXNzIERmaFByb2ZpbGVTbGljZSB7XG4gIGJ5X3BrX3Byb2ZpbGU/OiBCeVBrPERmaFByb2ZpbGU+O1xuXG4gIGxvYWRpbmc/OiBib29sZWFuOyAvLyB0b2RvIHJlbW92ZSBpbiByZWR1Y2VyIGZhY3RvcnkgdGhlbiBoZXJlXG59XG5cbmV4cG9ydCBjbGFzcyBEZmhDbGFzc1NsaWNlIHtcbiAgYnlfcGtfY2xhc3M/OiBCeVBrPERmaENsYXNzPjtcbiAgYnlfYmFzaWNfdHlwZT86IEJ5UGs8QnlQazxEZmhDbGFzcz4+O1xuICBsb2FkaW5nPzogYm9vbGVhbjsgLy8gdG9kbyByZW1vdmUgaW4gcmVkdWNlciBmYWN0b3J5IHRoZW4gaGVyZVxufVxuXG5leHBvcnQgY2xhc3MgRGZoUHJvcGVydHlTbGljZSB7XG4gIGJ5X3BrX3Byb3BlcnR5PzogQnlQazxCeVBrPERmaFByb3BlcnR5Pj47XG4gIGJ5X2hhc19kb21haW5fX2ZrX3Byb3BlcnR5PzogQnlQazxCeVBrPERmaFByb3BlcnR5Pj47XG4gIGJ5X2hhc19yYW5nZV9fZmtfcHJvcGVydHk/OiBCeVBrPEJ5UGs8RGZoUHJvcGVydHk+PjtcbiAgYnlfaGFzX2RvbWFpbj86IEJ5UGs8QnlQazxEZmhQcm9wZXJ0eT4+O1xuICBieV9oYXNfcmFuZ2U/OiBCeVBrPEJ5UGs8RGZoUHJvcGVydHk+PjtcbiAgYnlfcGtfcHJvcGVydHlfX2hhc19kb21haW5fX2hhc19yYW5nZT86IEJ5UGs8RGZoUHJvcGVydHk+O1xuICBieV9pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eT86IEJ5UGs8QnlQazxEZmhQcm9wZXJ0eT4+O1xuXG4gIGxvYWRpbmc/OiBib29sZWFuOyAvLyB0b2RvIHJlbW92ZSBpbiByZWR1Y2VyIGZhY3RvcnkgdGhlbiBoZXJlXG59XG5cbmV4cG9ydCBjbGFzcyBEZmhMYWJlbFNsaWNlIHtcbiAgYnlfZmtzPzogQnlQazxEZmhMYWJlbD47XG4gIGJ5X2ZrX2NsYXNzX190eXBlPzogQnlQazxCeVBrPERmaExhYmVsPj47XG4gIGJ5X2ZrX3Byb3BlcnR5X190eXBlPzogQnlQazxCeVBrPERmaExhYmVsPj47XG4gIGJ5X2ZrX3Byb2ZpbGVfX3R5cGU/OiBCeVBrPEJ5UGs8RGZoTGFiZWw+PjtcblxuICBsb2FkaW5nPzogYm9vbGVhbjsgLy8gdG9kbyByZW1vdmUgaW4gcmVkdWNlciBmYWN0b3J5IHRoZW4gaGVyZVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERmaCB7XG4gIHByb2ZpbGU/OiBEZmhQcm9maWxlU2xpY2U7XG4gIGtsYXNzPzogRGZoQ2xhc3NTbGljZTtcbiAgcHJvcGVydHk/OiBEZmhQcm9wZXJ0eVNsaWNlO1xuICBsYWJlbD86IERmaExhYmVsU2xpY2U7XG5cbiAgcGtFbnRpdHlNb2RlbE1hcDogQnlQazx7IG1vZGVsTmFtZTogc3RyaW5nIH0+XG59XG4iXX0=