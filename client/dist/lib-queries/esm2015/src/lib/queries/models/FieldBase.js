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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmllbGRCYXNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzL3NyYy9saWIvcXVlcmllcy8iLCJzb3VyY2VzIjpbIm1vZGVscy9GaWVsZEJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQSwrQkFpQ0M7OztJQS9CRywwQkFBYzs7SUFFZCxnQ0FBb0I7O0lBRXBCLGtDQUFzQjs7SUFFdEIsNkJBQXdCOztJQUV4QixtQ0FBd0I7O0lBRXhCLCtCQUFvQjs7SUFFcEIsZ0NBQW9COztJQUVwQixxQ0FBeUI7O0lBR3pCLHNDQUEwQjs7SUFHMUIsc0NBQTBCOztJQUcxQixzQ0FBMEI7O0lBRzFCLHNDQUEwQjs7SUFFMUIsOENBQW1DOztJQUVuQyw4Q0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWVsZFByb3BlcnR5IH0gZnJvbSAnLi9GaWVsZFByb3BlcnR5JztcbmV4cG9ydCBpbnRlcmZhY2UgRmllbGRCYXNlIHtcbiAgICAvLyB0aGUgbGFiZWwgb2YgdGhlIGZpZWxkICh0YWtlbiBmcm9tIHRoZSBjb3JyZXNwb25kaW5nIHByb3BlcnR5IGxhYmVsKVxuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgLy8gdXJsIHRvIHByb3BlcnR5IG9uIG9udG9tZVxuICAgIG9udG9JbmZvVXJsOiBzdHJpbmc7XG4gICAgLy8gc2hvcnQgbGFiZWwgKD0gb250b21lIGlkZW50aWZpZXIgaW4gbmFtZXNwYWNlKVxuICAgIG9udG9JbmZvTGFiZWw6IHN0cmluZztcbiAgICAvLyByZWZlcmVuY2UgdG8gdGhlIGRmaF9wcm9wZXJ0eSBvciBkZmhfcHJvcGVydHlfb2ZfcHJvcGVydHlcbiAgICBwcm9wZXJ0eTogRmllbGRQcm9wZXJ0eTtcbiAgICAvLyB0cnVlIGlmIHRoZSBwcm9wZXJ0eSBvZiB0aGF0IGZpZWxkIGhhcyBkZmhfaGFzX3R5cGVfc3VicHJvcGVydHlcbiAgICBpc0hhc1R5cGVGaWVsZDogYm9vbGVhbjtcbiAgICAvLyBkaXJlY3Rpb24gb2YgdGhlIHByb3BlcnR5IGluIHRoaXMgZmllbGQgKHRydWUgaWYgc291cmNlQ2xhc3MgPSBwcm9wZXJ0eSBkb21haW4pXG4gICAgaXNPdXRnb2luZzogYm9vbGVhbjtcbiAgICAvLyB0aGUgc291cmNlIGNsYXNzIG9mIHRoZSBmaWVsZCAoaWYgaXMgb3V0Z29pbmcgZG9tYWluIGVsc2UgcmFuZ2UpXG4gICAgc291cmNlQ2xhc3M6IG51bWJlcjtcbiAgICAvLyBsYWJlbCBvZiB0aGUgc291cmNlIGNsYXNzXG4gICAgc291cmNlQ2xhc3NMYWJlbDogc3RyaW5nO1xuICAgIC8vIG1pbmltdW0gbnVtYmVyIG9mIHN0YXRlbWVudHMgaGF2aW5nIHRoZSBwcm9wZXJ0eSBvZiB0aGlzIGZpZWxkIGFuZCB0aGUgc2FtZSBlbnRpdHkgYXMgc291cmNlXG4gICAgLy8gKGFuZCB0aHVzIGRpZmZlcmVudCB0YXJnZXRzKVxuICAgIHRhcmdldE1pblF1YW50aXR5OiBudW1iZXI7XG4gICAgLy8gbWF4aW11bSBudW1iZXIgb2Ygc3RhdGVtZW50cyBoYXZpbmcgdGhlIHByb3BlcnR5IG9mIHRoaXMgZmllbGQgYW5kIHRoZSBzYW1lIGVudGl0eSBhcyBzb3VyY2VcbiAgICAvLyAoYW5kIHRodXMgZGlmZmVyZW50IHRhcmdldHMpLiBWYWx1ZSAtMSBzdGFuZHMgZm9yIG4gKGluZmluaXQpXG4gICAgdGFyZ2V0TWF4UXVhbnRpdHk6IG51bWJlcjtcbiAgICAvLyBtaW5pbXVtIG51bWJlciBvZiBzdGF0ZW1lbnRzIGhhdmluZyB0aGUgcHJvcGVydHkgb2YgdGhpcyBmaWVsZCBhbmQgdGhlIHNhbWUgZW50aXR5IGFzIHRhcmdldFxuICAgIC8vIChhbmQgdGh1cyBkaWZmZXJlbnQgc291cmNlcylcbiAgICBzb3VyY2VNaW5RdWFudGl0eTogbnVtYmVyO1xuICAgIC8vIG1heGltdW0gbnVtYmVyIG9mIHN0YXRlbWVudHMgaGF2aW5nIHRoZSBwcm9wZXJ0eSBvZiB0aGlzIGZpZWxkIGFuZCB0aGUgc2FtZSBlbnRpdHkgYXMgdGFyZ2V0XG4gICAgLy8gKGFuZCB0aHVzIGRpZmZlcmVudCBzb3VyY2VzKS4gVmFsdWUgLTEgc3RhbmRzIGZvciBuIChpbmZpbml0KVxuICAgIHNvdXJjZU1heFF1YW50aXR5OiBudW1iZXI7XG4gICAgLy8gaWYgdHJ1ZSwgdGhlIGlkZW50aXR5IG9mIHRoZSBzb3VyY2UgZW50aXR5IGlzIGRlZmluZWQgYnkgdGhlIHN0YXRlbWVudChzKSBvZiB0aGlzIGZpZWxkXG4gICAgaWRlbnRpdHlEZWZpbmluZ0ZvclNvdXJjZTogYm9vbGVhbjtcbiAgICAvLyBpZiB0cnVlLCB0aGUgaWRlbnRpdHkgb2YgdGhlIHRhcmdldCBlbnRpdHkgaXMgZGVmaW5lZCBieSB0aGUgc3RhdGVtZW50KHMpIG9mIHRoaXMgZmllbGRcbiAgICBpZGVudGl0eURlZmluaW5nRm9yVGFyZ2V0OiBib29sZWFuO1xufVxuIl19