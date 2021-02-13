/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/actions/projects.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var ProjectsActions = /** @class */ (function () {
    function ProjectsActions() {
    }
    /**
     * @param {?} payload
     * @return {?}
     */
    ProjectsActions.prototype.loadProjectsSucceeded = /**
     * @param {?} payload
     * @return {?}
     */
    function (payload) {
        return {
            type: ProjectsActions.LOAD_PROJECTS_SUCCEEDED,
            payload: payload,
            meta: null
        };
    };
    ProjectsActions.LOAD_PROJECTS_SUCCEEDED = 'LOAD_PROJECTS_SUCCEEDED';
    ProjectsActions.decorators = [
        { type: Injectable }
    ];
    return ProjectsActions;
}());
export { ProjectsActions };
if (false) {
    /** @type {?} */
    ProjectsActions.LOAD_PROJECTS_SUCCEEDED;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9hY3Rpb25zL3Byb2plY3RzLmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTTNDO0lBQUE7SUFZQSxDQUFDOzs7OztJQVJDLCtDQUFxQjs7OztJQUFyQixVQUFzQixPQUF5QjtRQUM3QyxPQUFPO1lBQ0wsSUFBSSxFQUFFLGVBQWUsQ0FBQyx1QkFBdUI7WUFDN0MsT0FBTyxTQUFBO1lBQ1AsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDO0lBQ0osQ0FBQztJQVJNLHVDQUF1QixHQUFHLHlCQUF5QixDQUFDOztnQkFGNUQsVUFBVTs7SUFZWCxzQkFBQztDQUFBLEFBWkQsSUFZQztTQVhZLGVBQWU7OztJQUMxQix3Q0FBMkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBQcm9qZWN0UHJldmlldyB9IGZyb20gJy4uL21vZGVscy9hY3RpdmUtcHJvamVjdC5tb2RlbHMnO1xuZXhwb3J0IHR5cGUgUHJvamVjdHNBY3Rpb24gPSBGbHV4U3RhbmRhcmRBY3Rpb248UHJvamVjdFByZXZpZXdbXSwge30+O1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQcm9qZWN0c0FjdGlvbnMge1xuICBzdGF0aWMgTE9BRF9QUk9KRUNUU19TVUNDRUVERUQgPSAnTE9BRF9QUk9KRUNUU19TVUNDRUVERUQnO1xuXG4gIGxvYWRQcm9qZWN0c1N1Y2NlZWRlZChwYXlsb2FkOiBQcm9qZWN0UHJldmlld1tdKTogUHJvamVjdHNBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBQcm9qZWN0c0FjdGlvbnMuTE9BRF9QUk9KRUNUU19TVUNDRUVERUQsXG4gICAgICBwYXlsb2FkLFxuICAgICAgbWV0YTogbnVsbFxuICAgIH07XG4gIH1cblxufVxuIl19