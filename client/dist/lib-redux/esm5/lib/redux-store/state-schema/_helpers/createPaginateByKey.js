/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/_helpers/createPaginateByKey.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlUGFnaW5hdGVCeUtleS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL19oZWxwZXJzL2NyZWF0ZVBhZ2luYXRlQnlLZXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsTUFBTSxVQUFVLG1CQUFtQixDQUFDLElBQW9DOztJQUN0RSxPQUFPO1FBQ0wsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUNoQyxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFO2tCQUNyQyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsSUFBRyxJQUFJLENBQUMsY0FBYztrQkFDN0UsR0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBRyxJQUFJLENBQUMsWUFBWTtLQUN4RSxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0TWV0YSwgUGFnaW5hdGVCeVBhcmFtIH0gZnJvbSAnLi4vLi4vcHVibGljLWFwaSc7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGFnaW5hdGVCeUtleShtZXRhOiBMb2FkUGFnaW5hdGVkU3RhdGVtZW50TGlzdE1ldGEpOiBQYWdpbmF0ZUJ5UGFyYW1bXSB7XG4gIHJldHVybiBbXG4gICAgeyBma19wcm9wZXJ0eTogbWV0YS5wa1Byb3BlcnR5IH0sXG4gICAgeyBma190YXJnZXRfY2xhc3M6IG1ldGEuZmtUYXJnZXRDbGFzcyB9LFxuICAgIHsgW21ldGEuaXNPdXRnb2luZyA/ICdma19zdWJqZWN0X2luZm8nIDogJ2ZrX29iamVjdF9pbmZvJ106IG1ldGEucGtTb3VyY2VFbnRpdHkgfSxcbiAgICB7IFttZXRhLmFsdGVybmF0aXZlcyA/ICdhbHRlcm5hdGl2ZXMnIDogJ29mUHJvamVjdCddOiBtZXRhLmFsdGVybmF0aXZlcyB9XG4gIF07XG59XG4iXX0=