/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/reducers/projects.reducers.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ProjectsActions } from '../actions';
/** @type {?} */
const INITIAL_STATE = {
    records: []
};
/** @type {?} */
const projectListReducer = (/**
 * @param {?=} lastState
 * @param {?=} action
 * @return {?}
 */
(lastState = INITIAL_STATE, action) => {
    switch (action.type) {
        case ProjectsActions.LOAD_PROJECTS_SUCCEEDED: return Object.assign({}, lastState, { records: action.payload.map((/**
             * @param {?} record
             * @return {?}
             */
            (record) => ({ record: record }))) });
    }
    return lastState;
});
const ɵ0 = projectListReducer;
/** @type {?} */
export const createProjectsReducer = (/**
 * @return {?}
 */
() => {
    return projectListReducer;
});
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMucmVkdWNlcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1ndWkvcmVkdWNlcnMvcHJvamVjdHMucmVkdWNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWtCLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQzs7TUFHdkQsYUFBYSxHQUFpQjtJQUNsQyxPQUFPLEVBQUUsRUFBRTtDQUNaOztNQUVLLGtCQUFrQjs7Ozs7QUFBRyxDQUFDLFlBQTBCLGFBQWEsRUFBRSxNQUFzQixFQUFnQixFQUFFO0lBQzNHLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNuQixLQUFLLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLHlCQUN6QyxTQUFTLElBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRzs7OztZQUFDLENBQUMsTUFBc0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFDLElBQzNGO0tBQ0g7SUFFRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDLENBQUE7OztBQUVELE1BQU0sT0FBTyxxQkFBcUI7OztBQUFHLEdBQUcsRUFBRTtJQUN4QyxPQUFPLGtCQUFrQixDQUFDO0FBQzVCLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb2plY3RzQWN0aW9uLCBQcm9qZWN0c0FjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IElQcm9qZWN0TGlzdCwgUHJvamVjdFByZXZpZXcgfSBmcm9tICcuLi9tb2RlbHMnO1xuXG5jb25zdCBJTklUSUFMX1NUQVRFOiBJUHJvamVjdExpc3QgPSB7XG4gIHJlY29yZHM6IFtdXG59O1xuXG5jb25zdCBwcm9qZWN0TGlzdFJlZHVjZXIgPSAobGFzdFN0YXRlOiBJUHJvamVjdExpc3QgPSBJTklUSUFMX1NUQVRFLCBhY3Rpb246IFByb2plY3RzQWN0aW9uKTogSVByb2plY3RMaXN0ID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgUHJvamVjdHNBY3Rpb25zLkxPQURfUFJPSkVDVFNfU1VDQ0VFREVEOiByZXR1cm4ge1xuICAgICAgLi4ubGFzdFN0YXRlLCByZWNvcmRzOiBhY3Rpb24ucGF5bG9hZC5tYXAoKHJlY29yZDogUHJvamVjdFByZXZpZXcpID0+ICh7IHJlY29yZDogcmVjb3JkIH0pKVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gbGFzdFN0YXRlO1xufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlUHJvamVjdHNSZWR1Y2VyID0gKCkgPT4ge1xuICByZXR1cm4gcHJvamVjdExpc3RSZWR1Y2VyO1xufVxuIl19