/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/projects.reducers.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ProjectsActions } from '../actions/projects.actions';
/** @type {?} */
var INITIAL_STATE = {
    records: []
};
/** @type {?} */
var projectListReducer = (/**
 * @param {?=} lastState
 * @param {?=} action
 * @return {?}
 */
function (lastState, action) {
    if (lastState === void 0) { lastState = INITIAL_STATE; }
    switch (action.type) {
        case ProjectsActions.LOAD_PROJECTS_SUCCEEDED: return tslib_1.__assign({}, lastState, { records: action.payload.map((/**
             * @param {?} record
             * @return {?}
             */
            function (record) { return ({ record: record }); })) });
    }
    return lastState;
});
var ɵ0 = projectListReducer;
/** @type {?} */
export var createProjectsReducer = (/**
 * @return {?}
 */
function () {
    return projectListReducer;
});
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMucmVkdWNlcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLWd1aS9yZWR1Y2Vycy9wcm9qZWN0cy5yZWR1Y2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQWtCLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztJQUl4RSxhQUFhLEdBQWlCO0lBQ2xDLE9BQU8sRUFBRSxFQUFFO0NBQ1o7O0lBRUssa0JBQWtCOzs7OztBQUFHLFVBQUMsU0FBdUMsRUFBRSxNQUFzQjtJQUEvRCwwQkFBQSxFQUFBLHlCQUF1QztJQUNqRSxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDbkIsS0FBSyxlQUFlLENBQUMsdUJBQXVCLENBQUMsQ0FBQyw0QkFDekMsU0FBUyxJQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUc7Ozs7WUFBQyxVQUFDLE1BQXNCLElBQUssT0FBQSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQXBCLENBQW9CLEVBQUMsSUFDM0Y7S0FDSDtJQUVELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMsQ0FBQTs7O0FBRUQsTUFBTSxLQUFPLHFCQUFxQjs7O0FBQUc7SUFDbkMsT0FBTyxrQkFBa0IsQ0FBQztBQUM1QixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm9qZWN0c0FjdGlvbiwgUHJvamVjdHNBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9wcm9qZWN0cy5hY3Rpb25zJztcbmltcG9ydCB7IElQcm9qZWN0TGlzdCB9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0cy5tb2RlbCc7XG5pbXBvcnQgeyBQcm9qZWN0UHJldmlldyB9IGZyb20gJy4uL21vZGVscy9hY3RpdmUtcHJvamVjdC5tb2RlbHMnO1xuXG5jb25zdCBJTklUSUFMX1NUQVRFOiBJUHJvamVjdExpc3QgPSB7XG4gIHJlY29yZHM6IFtdXG59O1xuXG5jb25zdCBwcm9qZWN0TGlzdFJlZHVjZXIgPSAobGFzdFN0YXRlOiBJUHJvamVjdExpc3QgPSBJTklUSUFMX1NUQVRFLCBhY3Rpb246IFByb2plY3RzQWN0aW9uKTogSVByb2plY3RMaXN0ID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgUHJvamVjdHNBY3Rpb25zLkxPQURfUFJPSkVDVFNfU1VDQ0VFREVEOiByZXR1cm4ge1xuICAgICAgLi4ubGFzdFN0YXRlLCByZWNvcmRzOiBhY3Rpb24ucGF5bG9hZC5tYXAoKHJlY29yZDogUHJvamVjdFByZXZpZXcpID0+ICh7IHJlY29yZDogcmVjb3JkIH0pKVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gbGFzdFN0YXRlO1xufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlUHJvamVjdHNSZWR1Y2VyID0gKCkgPT4ge1xuICByZXR1cm4gcHJvamVjdExpc3RSZWR1Y2VyO1xufVxuIl19