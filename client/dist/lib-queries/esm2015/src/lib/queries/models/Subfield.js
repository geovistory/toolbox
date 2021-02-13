/**
 * @fileoverview added by tsickle
 * Generated from: models/Subfield.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A Subfiel contains contains information to create the different GUI's to display and edit
 * statements of an entity.
 *
 * Each Subfield stands for one property with a unique domain, pk_propery and range.
 *
 * Since the display of the statement and its target value depends on the target class, the Subfield
 * has a SubfieldType. This SubfieldType determines what components are used to create, edit or display
 * the statement and its target.
 * @record
 */
export function Subfield() { }
if (false) {
    /** @type {?} */
    Subfield.prototype.listType;
    /** @type {?} */
    Subfield.prototype.targetClass;
    /** @type {?} */
    Subfield.prototype.targetClassLabel;
    /** @type {?} */
    Subfield.prototype.removedFromAllProfiles;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ViZmllbGQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsibW9kZWxzL1N1YmZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZQSw4QkFVQzs7O0lBUEcsNEJBQXVCOztJQUV2QiwrQkFBb0I7O0lBRXBCLG9DQUF5Qjs7SUFFekIsMENBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViZmllbGRUeXBlIH0gZnJvbSAnLi9TdWJmaWVsZFR5cGUnO1xuaW1wb3J0IHsgRmllbGRCYXNlIH0gZnJvbSAnLi9GaWVsZEJhc2UnO1xuLyoqXG4gKiBBIFN1YmZpZWwgY29udGFpbnMgY29udGFpbnMgaW5mb3JtYXRpb24gdG8gY3JlYXRlIHRoZSBkaWZmZXJlbnQgR1VJJ3MgdG8gZGlzcGxheSBhbmQgZWRpdFxuICogc3RhdGVtZW50cyBvZiBhbiBlbnRpdHkuXG4gKlxuICogRWFjaCBTdWJmaWVsZCBzdGFuZHMgZm9yIG9uZSBwcm9wZXJ0eSB3aXRoIGEgdW5pcXVlIGRvbWFpbiwgcGtfcHJvcGVyeSBhbmQgcmFuZ2UuXG4gKlxuICogU2luY2UgdGhlIGRpc3BsYXkgb2YgdGhlIHN0YXRlbWVudCBhbmQgaXRzIHRhcmdldCB2YWx1ZSBkZXBlbmRzIG9uIHRoZSB0YXJnZXQgY2xhc3MsIHRoZSBTdWJmaWVsZFxuICogaGFzIGEgU3ViZmllbGRUeXBlLiBUaGlzIFN1YmZpZWxkVHlwZSBkZXRlcm1pbmVzIHdoYXQgY29tcG9uZW50cyBhcmUgdXNlZCB0byBjcmVhdGUsIGVkaXQgb3IgZGlzcGxheVxuICogdGhlIHN0YXRlbWVudCBhbmQgaXRzIHRhcmdldC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdWJmaWVsZCBleHRlbmRzIEZpZWxkQmFzZSB7XG4gICAgLy8gZGV0ZXJtaW5lcyB3aGF0IGNvbXBvbmVudHMgYXJlIHVzZWQgdG8gY3JlYXRlLCBlZGl0IG9yIGRpc3BsYXlcbiAgICAvLyB0aGUgc3RhdGVtZW50IGFuZCBpdHMgdGFyZ2V0LlxuICAgIGxpc3RUeXBlOiBTdWJmaWVsZFR5cGU7XG4gICAgLy8gdGhlIHRhcmdldCBjbGFzcyBvZiB0aGUgc3ViLWZpZWxkIChpZiBpcyBvdXRnb2luZyByYW5nZSBlbHNlIGRvbWFpbilcbiAgICB0YXJnZXRDbGFzczogbnVtYmVyO1xuICAgIC8vIGxhYmVsIG9mIHRoZSB0YXJnZXQgY2xhc3NcbiAgICB0YXJnZXRDbGFzc0xhYmVsOiBzdHJpbmc7XG4gICAgLy8gdHJ1ZSBpZiB0aGUgcHJvcGVydHkgaXMgcmVtb3ZlZCBmcm9tIGFsbCBwcm9maWxlcyBhY3RpdmF0ZWQgYnkgdGhlIHByb2plY3RcbiAgICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBib29sZWFuO1xufVxuIl19