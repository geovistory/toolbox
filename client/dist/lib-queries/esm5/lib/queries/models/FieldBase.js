/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/models/FieldBase.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmllbGRCYXNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzLyIsInNvdXJjZXMiOlsibGliL3F1ZXJpZXMvbW9kZWxzL0ZpZWxkQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBLCtCQWlDQzs7O0lBL0JDLDBCQUFjOztJQUVkLGdDQUFvQjs7SUFFcEIsa0NBQXNCOztJQUV0Qiw2QkFBMEI7O0lBRTFCLG1DQUF3Qjs7SUFFeEIsK0JBQW9COztJQUVwQixnQ0FBb0I7O0lBRXBCLHFDQUF5Qjs7SUFHekIsc0NBQTBCOztJQUcxQixzQ0FBMEI7O0lBRzFCLHNDQUEwQjs7SUFHMUIsc0NBQTBCOztJQUUxQiw4Q0FBbUM7O0lBRW5DLDhDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEd2RmllbGRQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkQmFzZSB7XG4gIC8vIHRoZSBsYWJlbCBvZiB0aGUgZmllbGQgKHRha2VuIGZyb20gdGhlIGNvcnJlc3BvbmRpbmcgcHJvcGVydHkgbGFiZWwpXG4gIGxhYmVsOiBzdHJpbmc7XG4gIC8vIHVybCB0byBwcm9wZXJ0eSBvbiBvbnRvbWVcbiAgb250b0luZm9Vcmw6IHN0cmluZztcbiAgLy8gc2hvcnQgbGFiZWwgKD0gb250b21lIGlkZW50aWZpZXIgaW4gbmFtZXNwYWNlKVxuICBvbnRvSW5mb0xhYmVsOiBzdHJpbmc7XG4gIC8vIHJlZmVyZW5jZSB0byB0aGUgZGZoX3Byb3BlcnR5IG9yIGRmaF9wcm9wZXJ0eV9vZl9wcm9wZXJ0eVxuICBwcm9wZXJ0eTogR3ZGaWVsZFByb3BlcnR5O1xuICAvLyB0cnVlIGlmIHRoZSBwcm9wZXJ0eSBvZiB0aGF0IGZpZWxkIGhhcyBkZmhfaGFzX3R5cGVfc3VicHJvcGVydHlcbiAgaXNIYXNUeXBlRmllbGQ6IGJvb2xlYW47XG4gIC8vIGRpcmVjdGlvbiBvZiB0aGUgcHJvcGVydHkgaW4gdGhpcyBmaWVsZCAodHJ1ZSBpZiBzb3VyY2VDbGFzcyA9IHByb3BlcnR5IGRvbWFpbilcbiAgaXNPdXRnb2luZzogYm9vbGVhbjtcbiAgLy8gdGhlIHNvdXJjZSBjbGFzcyBvZiB0aGUgZmllbGQgKGlmIGlzIG91dGdvaW5nIGRvbWFpbiBlbHNlIHJhbmdlKVxuICBzb3VyY2VDbGFzczogbnVtYmVyO1xuICAvLyBsYWJlbCBvZiB0aGUgc291cmNlIGNsYXNzXG4gIHNvdXJjZUNsYXNzTGFiZWw6IHN0cmluZztcbiAgLy8gbWluaW11bSBudW1iZXIgb2Ygc3RhdGVtZW50cyBoYXZpbmcgdGhlIHByb3BlcnR5IG9mIHRoaXMgZmllbGQgYW5kIHRoZSBzYW1lIGVudGl0eSBhcyBzb3VyY2VcbiAgLy8gKGFuZCB0aHVzIGRpZmZlcmVudCB0YXJnZXRzKVxuICB0YXJnZXRNaW5RdWFudGl0eTogbnVtYmVyO1xuICAvLyBtYXhpbXVtIG51bWJlciBvZiBzdGF0ZW1lbnRzIGhhdmluZyB0aGUgcHJvcGVydHkgb2YgdGhpcyBmaWVsZCBhbmQgdGhlIHNhbWUgZW50aXR5IGFzIHNvdXJjZVxuICAvLyAoYW5kIHRodXMgZGlmZmVyZW50IHRhcmdldHMpLiBWYWx1ZSAtMSBzdGFuZHMgZm9yIG4gKGluZmluaXQpXG4gIHRhcmdldE1heFF1YW50aXR5OiBudW1iZXI7XG4gIC8vIG1pbmltdW0gbnVtYmVyIG9mIHN0YXRlbWVudHMgaGF2aW5nIHRoZSBwcm9wZXJ0eSBvZiB0aGlzIGZpZWxkIGFuZCB0aGUgc2FtZSBlbnRpdHkgYXMgdGFyZ2V0XG4gIC8vIChhbmQgdGh1cyBkaWZmZXJlbnQgc291cmNlcylcbiAgc291cmNlTWluUXVhbnRpdHk6IG51bWJlcjtcbiAgLy8gbWF4aW11bSBudW1iZXIgb2Ygc3RhdGVtZW50cyBoYXZpbmcgdGhlIHByb3BlcnR5IG9mIHRoaXMgZmllbGQgYW5kIHRoZSBzYW1lIGVudGl0eSBhcyB0YXJnZXRcbiAgLy8gKGFuZCB0aHVzIGRpZmZlcmVudCBzb3VyY2VzKS4gVmFsdWUgLTEgc3RhbmRzIGZvciBuIChpbmZpbml0KVxuICBzb3VyY2VNYXhRdWFudGl0eTogbnVtYmVyO1xuICAvLyBpZiB0cnVlLCB0aGUgaWRlbnRpdHkgb2YgdGhlIHNvdXJjZSBlbnRpdHkgaXMgZGVmaW5lZCBieSB0aGUgc3RhdGVtZW50KHMpIG9mIHRoaXMgZmllbGRcbiAgaWRlbnRpdHlEZWZpbmluZ0ZvclNvdXJjZTogYm9vbGVhbjtcbiAgLy8gaWYgdHJ1ZSwgdGhlIGlkZW50aXR5IG9mIHRoZSB0YXJnZXQgZW50aXR5IGlzIGRlZmluZWQgYnkgdGhlIHN0YXRlbWVudChzKSBvZiB0aGlzIGZpZWxkXG4gIGlkZW50aXR5RGVmaW5pbmdGb3JUYXJnZXQ6IGJvb2xlYW47XG59XG4iXX0=