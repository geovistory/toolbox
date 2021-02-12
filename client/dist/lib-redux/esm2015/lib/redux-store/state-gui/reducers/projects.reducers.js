/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/projects.reducers.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMucmVkdWNlcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLWd1aS9yZWR1Y2Vycy9wcm9qZWN0cy5yZWR1Y2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBa0IsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDOztNQUd2RCxhQUFhLEdBQWlCO0lBQ2xDLE9BQU8sRUFBRSxFQUFFO0NBQ1o7O01BRUssa0JBQWtCOzs7OztBQUFHLENBQUMsWUFBMEIsYUFBYSxFQUFFLE1BQXNCLEVBQWdCLEVBQUU7SUFDM0csUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ25CLEtBQUssZUFBZSxDQUFDLHVCQUF1QixDQUFDLENBQUMseUJBQ3pDLFNBQVMsSUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzs7O1lBQUMsQ0FBQyxNQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUMsSUFDM0Y7S0FDSDtJQUVELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMsQ0FBQTs7O0FBRUQsTUFBTSxPQUFPLHFCQUFxQjs7O0FBQUcsR0FBRyxFQUFFO0lBQ3hDLE9BQU8sa0JBQWtCLENBQUM7QUFDNUIsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvamVjdHNBY3Rpb24sIFByb2plY3RzQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgSVByb2plY3RMaXN0LCBQcm9qZWN0UHJldmlldyB9IGZyb20gJy4uL21vZGVscyc7XG5cbmNvbnN0IElOSVRJQUxfU1RBVEU6IElQcm9qZWN0TGlzdCA9IHtcbiAgcmVjb3JkczogW11cbn07XG5cbmNvbnN0IHByb2plY3RMaXN0UmVkdWNlciA9IChsYXN0U3RhdGU6IElQcm9qZWN0TGlzdCA9IElOSVRJQUxfU1RBVEUsIGFjdGlvbjogUHJvamVjdHNBY3Rpb24pOiBJUHJvamVjdExpc3QgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBQcm9qZWN0c0FjdGlvbnMuTE9BRF9QUk9KRUNUU19TVUNDRUVERUQ6IHJldHVybiB7XG4gICAgICAuLi5sYXN0U3RhdGUsIHJlY29yZHM6IGFjdGlvbi5wYXlsb2FkLm1hcCgocmVjb3JkOiBQcm9qZWN0UHJldmlldykgPT4gKHsgcmVjb3JkOiByZWNvcmQgfSkpXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBsYXN0U3RhdGU7XG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVQcm9qZWN0c1JlZHVjZXIgPSAoKSA9PiB7XG4gIHJldHVybiBwcm9qZWN0TGlzdFJlZHVjZXI7XG59XG4iXX0=