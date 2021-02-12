/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/projects.reducers.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ProjectsActions } from '../actions';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMucmVkdWNlcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLWd1aS9yZWR1Y2Vycy9wcm9qZWN0cy5yZWR1Y2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQWtCLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQzs7SUFHdkQsYUFBYSxHQUFpQjtJQUNsQyxPQUFPLEVBQUUsRUFBRTtDQUNaOztJQUVLLGtCQUFrQjs7Ozs7QUFBRyxVQUFDLFNBQXVDLEVBQUUsTUFBc0I7SUFBL0QsMEJBQUEsRUFBQSx5QkFBdUM7SUFDakUsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ25CLEtBQUssZUFBZSxDQUFDLHVCQUF1QixDQUFDLENBQUMsNEJBQ3pDLFNBQVMsSUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQyxNQUFzQixJQUFLLE9BQUEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFwQixDQUFvQixFQUFDLElBQzNGO0tBQ0g7SUFFRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDLENBQUE7OztBQUVELE1BQU0sS0FBTyxxQkFBcUI7OztBQUFHO0lBQ25DLE9BQU8sa0JBQWtCLENBQUM7QUFDNUIsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvamVjdHNBY3Rpb24sIFByb2plY3RzQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgSVByb2plY3RMaXN0LCBQcm9qZWN0UHJldmlldyB9IGZyb20gJy4uL21vZGVscyc7XG5cbmNvbnN0IElOSVRJQUxfU1RBVEU6IElQcm9qZWN0TGlzdCA9IHtcbiAgcmVjb3JkczogW11cbn07XG5cbmNvbnN0IHByb2plY3RMaXN0UmVkdWNlciA9IChsYXN0U3RhdGU6IElQcm9qZWN0TGlzdCA9IElOSVRJQUxfU1RBVEUsIGFjdGlvbjogUHJvamVjdHNBY3Rpb24pOiBJUHJvamVjdExpc3QgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBQcm9qZWN0c0FjdGlvbnMuTE9BRF9QUk9KRUNUU19TVUNDRUVERUQ6IHJldHVybiB7XG4gICAgICAuLi5sYXN0U3RhdGUsIHJlY29yZHM6IGFjdGlvbi5wYXlsb2FkLm1hcCgocmVjb3JkOiBQcm9qZWN0UHJldmlldykgPT4gKHsgcmVjb3JkOiByZWNvcmQgfSkpXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBsYXN0U3RhdGU7XG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVQcm9qZWN0c1JlZHVjZXIgPSAoKSA9PiB7XG4gIHJldHVybiBwcm9qZWN0TGlzdFJlZHVjZXI7XG59XG4iXX0=