/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/_helpers/createPaginateByKey.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} meta
 * @return {?}
 */
export function createPaginateByKey(meta) {
    var _a, _b;
    return [
        { fk_property: meta.pkProperty },
        { fk_target_class: meta.fkTargetClass },
        (_a = {}, _a[meta.isOutgoing ? 'fk_subject_info' : 'fk_object_info'] = meta.pkSourceEntity, _a),
        (_b = {}, _b[meta.alternatives ? 'alternatives' : 'ofProject'] = meta.alternatives, _b)
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlUGFnaW5hdGVCeUtleS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9faGVscGVycy9jcmVhdGVQYWdpbmF0ZUJ5S2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxJQUFvQzs7SUFDdEUsT0FBTztRQUNMLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDaEMsRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTtrQkFDckMsR0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLElBQUcsSUFBSSxDQUFDLGNBQWM7a0JBQzdFLEdBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUcsSUFBSSxDQUFDLFlBQVk7S0FDeEUsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkUGFnaW5hdGVkU3RhdGVtZW50TGlzdE1ldGEsIFBhZ2luYXRlQnlQYXJhbSB9IGZyb20gJy4uLy4uL3B1YmxpYy1hcGknO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBhZ2luYXRlQnlLZXkobWV0YTogTG9hZFBhZ2luYXRlZFN0YXRlbWVudExpc3RNZXRhKTogUGFnaW5hdGVCeVBhcmFtW10ge1xuICByZXR1cm4gW1xuICAgIHsgZmtfcHJvcGVydHk6IG1ldGEucGtQcm9wZXJ0eSB9LFxuICAgIHsgZmtfdGFyZ2V0X2NsYXNzOiBtZXRhLmZrVGFyZ2V0Q2xhc3MgfSxcbiAgICB7IFttZXRhLmlzT3V0Z29pbmcgPyAnZmtfc3ViamVjdF9pbmZvJyA6ICdma19vYmplY3RfaW5mbyddOiBtZXRhLnBrU291cmNlRW50aXR5IH0sXG4gICAgeyBbbWV0YS5hbHRlcm5hdGl2ZXMgPyAnYWx0ZXJuYXRpdmVzJyA6ICdvZlByb2plY3QnXTogbWV0YS5hbHRlcm5hdGl2ZXMgfVxuICBdO1xufVxuIl19