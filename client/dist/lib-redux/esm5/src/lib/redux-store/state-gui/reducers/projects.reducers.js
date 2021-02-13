/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/reducers/projects.reducers.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMucmVkdWNlcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1ndWkvcmVkdWNlcnMvcHJvamVjdHMucmVkdWNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFrQixlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7SUFJeEUsYUFBYSxHQUFpQjtJQUNsQyxPQUFPLEVBQUUsRUFBRTtDQUNaOztJQUVLLGtCQUFrQjs7Ozs7QUFBRyxVQUFDLFNBQXVDLEVBQUUsTUFBc0I7SUFBL0QsMEJBQUEsRUFBQSx5QkFBdUM7SUFDakUsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ25CLEtBQUssZUFBZSxDQUFDLHVCQUF1QixDQUFDLENBQUMsNEJBQ3pDLFNBQVMsSUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQyxNQUFzQixJQUFLLE9BQUEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFwQixDQUFvQixFQUFDLElBQzNGO0tBQ0g7SUFFRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDLENBQUE7OztBQUVELE1BQU0sS0FBTyxxQkFBcUI7OztBQUFHO0lBQ25DLE9BQU8sa0JBQWtCLENBQUM7QUFDNUIsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvamVjdHNBY3Rpb24sIFByb2plY3RzQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvcHJvamVjdHMuYWN0aW9ucyc7XG5pbXBvcnQgeyBJUHJvamVjdExpc3QgfSBmcm9tICcuLi9tb2RlbHMvcHJvamVjdHMubW9kZWwnO1xuaW1wb3J0IHsgUHJvamVjdFByZXZpZXcgfSBmcm9tICcuLi9tb2RlbHMvYWN0aXZlLXByb2plY3QubW9kZWxzJztcblxuY29uc3QgSU5JVElBTF9TVEFURTogSVByb2plY3RMaXN0ID0ge1xuICByZWNvcmRzOiBbXVxufTtcblxuY29uc3QgcHJvamVjdExpc3RSZWR1Y2VyID0gKGxhc3RTdGF0ZTogSVByb2plY3RMaXN0ID0gSU5JVElBTF9TVEFURSwgYWN0aW9uOiBQcm9qZWN0c0FjdGlvbik6IElQcm9qZWN0TGlzdCA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFByb2plY3RzQWN0aW9ucy5MT0FEX1BST0pFQ1RTX1NVQ0NFRURFRDogcmV0dXJuIHtcbiAgICAgIC4uLmxhc3RTdGF0ZSwgcmVjb3JkczogYWN0aW9uLnBheWxvYWQubWFwKChyZWNvcmQ6IFByb2plY3RQcmV2aWV3KSA9PiAoeyByZWNvcmQ6IHJlY29yZCB9KSlcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGxhc3RTdGF0ZTtcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVByb2plY3RzUmVkdWNlciA9ICgpID0+IHtcbiAgcmV0dXJuIHByb2plY3RMaXN0UmVkdWNlcjtcbn1cbiJdfQ==