/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/reducers/projects.reducers.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ProjectsActions } from '../actions/projects.actions';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMucmVkdWNlcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1ndWkvcmVkdWNlcnMvcHJvamVjdHMucmVkdWNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWtCLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztNQUl4RSxhQUFhLEdBQWlCO0lBQ2xDLE9BQU8sRUFBRSxFQUFFO0NBQ1o7O01BRUssa0JBQWtCOzs7OztBQUFHLENBQUMsWUFBMEIsYUFBYSxFQUFFLE1BQXNCLEVBQWdCLEVBQUU7SUFDM0csUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ25CLEtBQUssZUFBZSxDQUFDLHVCQUF1QixDQUFDLENBQUMseUJBQ3pDLFNBQVMsSUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzs7O1lBQUMsQ0FBQyxNQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUMsSUFDM0Y7S0FDSDtJQUVELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMsQ0FBQTs7O0FBRUQsTUFBTSxPQUFPLHFCQUFxQjs7O0FBQUcsR0FBRyxFQUFFO0lBQ3hDLE9BQU8sa0JBQWtCLENBQUM7QUFDNUIsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvamVjdHNBY3Rpb24sIFByb2plY3RzQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvcHJvamVjdHMuYWN0aW9ucyc7XG5pbXBvcnQgeyBJUHJvamVjdExpc3QgfSBmcm9tICcuLi9tb2RlbHMvcHJvamVjdHMubW9kZWwnO1xuaW1wb3J0IHsgUHJvamVjdFByZXZpZXcgfSBmcm9tICcuLi9tb2RlbHMvYWN0aXZlLXByb2plY3QubW9kZWxzJztcblxuY29uc3QgSU5JVElBTF9TVEFURTogSVByb2plY3RMaXN0ID0ge1xuICByZWNvcmRzOiBbXVxufTtcblxuY29uc3QgcHJvamVjdExpc3RSZWR1Y2VyID0gKGxhc3RTdGF0ZTogSVByb2plY3RMaXN0ID0gSU5JVElBTF9TVEFURSwgYWN0aW9uOiBQcm9qZWN0c0FjdGlvbik6IElQcm9qZWN0TGlzdCA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFByb2plY3RzQWN0aW9ucy5MT0FEX1BST0pFQ1RTX1NVQ0NFRURFRDogcmV0dXJuIHtcbiAgICAgIC4uLmxhc3RTdGF0ZSwgcmVjb3JkczogYWN0aW9uLnBheWxvYWQubWFwKChyZWNvcmQ6IFByb2plY3RQcmV2aWV3KSA9PiAoeyByZWNvcmQ6IHJlY29yZCB9KSlcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGxhc3RTdGF0ZTtcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVByb2plY3RzUmVkdWNlciA9ICgpID0+IHtcbiAgcmV0dXJuIHByb2plY3RMaXN0UmVkdWNlcjtcbn1cbiJdfQ==