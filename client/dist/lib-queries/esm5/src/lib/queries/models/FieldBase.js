/**
 * @fileoverview added by tsickle
 * Generated from: models/FieldBase.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function FieldBase() { }
if (false) {
    /** @type {?} */
    FieldBase.prototype.label;
    /** @type {?} */
    FieldBase.prototype.ontoInfoUrl;
    /** @type {?} */
    FieldBase.prototype.ontoInfoLabel;
    /** @type {?} */
    FieldBase.prototype.property;
    /** @type {?} */
    FieldBase.prototype.isHasTypeField;
    /** @type {?} */
    FieldBase.prototype.isOutgoing;
    /** @type {?} */
    FieldBase.prototype.sourceClass;
    /** @type {?} */
    FieldBase.prototype.sourceClassLabel;
    /** @type {?} */
    FieldBase.prototype.targetMinQuantity;
    /** @type {?} */
    FieldBase.prototype.targetMaxQuantity;
    /** @type {?} */
    FieldBase.prototype.sourceMinQuantity;
    /** @type {?} */
    FieldBase.prototype.sourceMaxQuantity;
    /** @type {?} */
    FieldBase.prototype.identityDefiningForSource;
    /** @type {?} */
    FieldBase.prototype.identityDefiningForTarget;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmllbGRCYXNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzL3NyYy9saWIvcXVlcmllcy8iLCJzb3VyY2VzIjpbIm1vZGVscy9GaWVsZEJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQSwrQkFpQ0M7OztJQS9CQywwQkFBYzs7SUFFZCxnQ0FBb0I7O0lBRXBCLGtDQUFzQjs7SUFFdEIsNkJBQTBCOztJQUUxQixtQ0FBd0I7O0lBRXhCLCtCQUFvQjs7SUFFcEIsZ0NBQW9COztJQUVwQixxQ0FBeUI7O0lBR3pCLHNDQUEwQjs7SUFHMUIsc0NBQTBCOztJQUcxQixzQ0FBMEI7O0lBRzFCLHNDQUEwQjs7SUFFMUIsOENBQW1DOztJQUVuQyw4Q0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHdkZpZWxkUHJvcGVydHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuZXhwb3J0IGludGVyZmFjZSBGaWVsZEJhc2Uge1xuICAvLyB0aGUgbGFiZWwgb2YgdGhlIGZpZWxkICh0YWtlbiBmcm9tIHRoZSBjb3JyZXNwb25kaW5nIHByb3BlcnR5IGxhYmVsKVxuICBsYWJlbDogc3RyaW5nO1xuICAvLyB1cmwgdG8gcHJvcGVydHkgb24gb250b21lXG4gIG9udG9JbmZvVXJsOiBzdHJpbmc7XG4gIC8vIHNob3J0IGxhYmVsICg9IG9udG9tZSBpZGVudGlmaWVyIGluIG5hbWVzcGFjZSlcbiAgb250b0luZm9MYWJlbDogc3RyaW5nO1xuICAvLyByZWZlcmVuY2UgdG8gdGhlIGRmaF9wcm9wZXJ0eSBvciBkZmhfcHJvcGVydHlfb2ZfcHJvcGVydHlcbiAgcHJvcGVydHk6IEd2RmllbGRQcm9wZXJ0eTtcbiAgLy8gdHJ1ZSBpZiB0aGUgcHJvcGVydHkgb2YgdGhhdCBmaWVsZCBoYXMgZGZoX2hhc190eXBlX3N1YnByb3BlcnR5XG4gIGlzSGFzVHlwZUZpZWxkOiBib29sZWFuO1xuICAvLyBkaXJlY3Rpb24gb2YgdGhlIHByb3BlcnR5IGluIHRoaXMgZmllbGQgKHRydWUgaWYgc291cmNlQ2xhc3MgPSBwcm9wZXJ0eSBkb21haW4pXG4gIGlzT3V0Z29pbmc6IGJvb2xlYW47XG4gIC8vIHRoZSBzb3VyY2UgY2xhc3Mgb2YgdGhlIGZpZWxkIChpZiBpcyBvdXRnb2luZyBkb21haW4gZWxzZSByYW5nZSlcbiAgc291cmNlQ2xhc3M6IG51bWJlcjtcbiAgLy8gbGFiZWwgb2YgdGhlIHNvdXJjZSBjbGFzc1xuICBzb3VyY2VDbGFzc0xhYmVsOiBzdHJpbmc7XG4gIC8vIG1pbmltdW0gbnVtYmVyIG9mIHN0YXRlbWVudHMgaGF2aW5nIHRoZSBwcm9wZXJ0eSBvZiB0aGlzIGZpZWxkIGFuZCB0aGUgc2FtZSBlbnRpdHkgYXMgc291cmNlXG4gIC8vIChhbmQgdGh1cyBkaWZmZXJlbnQgdGFyZ2V0cylcbiAgdGFyZ2V0TWluUXVhbnRpdHk6IG51bWJlcjtcbiAgLy8gbWF4aW11bSBudW1iZXIgb2Ygc3RhdGVtZW50cyBoYXZpbmcgdGhlIHByb3BlcnR5IG9mIHRoaXMgZmllbGQgYW5kIHRoZSBzYW1lIGVudGl0eSBhcyBzb3VyY2VcbiAgLy8gKGFuZCB0aHVzIGRpZmZlcmVudCB0YXJnZXRzKS4gVmFsdWUgLTEgc3RhbmRzIGZvciBuIChpbmZpbml0KVxuICB0YXJnZXRNYXhRdWFudGl0eTogbnVtYmVyO1xuICAvLyBtaW5pbXVtIG51bWJlciBvZiBzdGF0ZW1lbnRzIGhhdmluZyB0aGUgcHJvcGVydHkgb2YgdGhpcyBmaWVsZCBhbmQgdGhlIHNhbWUgZW50aXR5IGFzIHRhcmdldFxuICAvLyAoYW5kIHRodXMgZGlmZmVyZW50IHNvdXJjZXMpXG4gIHNvdXJjZU1pblF1YW50aXR5OiBudW1iZXI7XG4gIC8vIG1heGltdW0gbnVtYmVyIG9mIHN0YXRlbWVudHMgaGF2aW5nIHRoZSBwcm9wZXJ0eSBvZiB0aGlzIGZpZWxkIGFuZCB0aGUgc2FtZSBlbnRpdHkgYXMgdGFyZ2V0XG4gIC8vIChhbmQgdGh1cyBkaWZmZXJlbnQgc291cmNlcykuIFZhbHVlIC0xIHN0YW5kcyBmb3IgbiAoaW5maW5pdClcbiAgc291cmNlTWF4UXVhbnRpdHk6IG51bWJlcjtcbiAgLy8gaWYgdHJ1ZSwgdGhlIGlkZW50aXR5IG9mIHRoZSBzb3VyY2UgZW50aXR5IGlzIGRlZmluZWQgYnkgdGhlIHN0YXRlbWVudChzKSBvZiB0aGlzIGZpZWxkXG4gIGlkZW50aXR5RGVmaW5pbmdGb3JTb3VyY2U6IGJvb2xlYW47XG4gIC8vIGlmIHRydWUsIHRoZSBpZGVudGl0eSBvZiB0aGUgdGFyZ2V0IGVudGl0eSBpcyBkZWZpbmVkIGJ5IHRoZSBzdGF0ZW1lbnQocykgb2YgdGhpcyBmaWVsZFxuICBpZGVudGl0eURlZmluaW5nRm9yVGFyZ2V0OiBib29sZWFuO1xufVxuIl19