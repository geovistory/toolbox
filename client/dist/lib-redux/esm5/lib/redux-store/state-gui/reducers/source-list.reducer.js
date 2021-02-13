/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/source-list.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { SourceListAPIActions } from '../actions/source-list.actions';
import { SourceList } from '../models/source-list.models';
/** @type {?} */
var INITIAL_STATE = new SourceList();
/**
 * @param {?=} state
 * @param {?=} a
 * @return {?}
 */
export function sourceListReducer(state, a) {
    if (state === void 0) { state = INITIAL_STATE; }
    /** @type {?} */
    var action = (/** @type {?} */ (a));
    switch (action.type) {
        case SourceListAPIActions.INITIALIZE_LIST:
            state = tslib_1.__assign({}, state, { list: {
                    pkAllowedClasses: action.meta.pkAllowedClasses
                } });
            break;
        /*****************************************************
        * Reducers called on destroy of component
        *****************************************************/
        case SourceListAPIActions.DESTROY:
            state = {};
            break;
    }
    return state;
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLWxpc3QucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL3JlZHVjZXJzL3NvdXJjZS1saXN0LnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUF1QixvQkFBb0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7SUFFcEQsYUFBYSxHQUFHLElBQUksVUFBVSxFQUFFOzs7Ozs7QUFFdEMsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEtBQWlDLEVBQUUsQ0FBUztJQUE1QyxzQkFBQSxFQUFBLHFCQUFpQzs7UUFFM0QsTUFBTSxHQUFHLG1CQUFBLENBQUMsRUFBdUI7SUFFdkMsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBRW5CLEtBQUssb0JBQW9CLENBQUMsZUFBZTtZQUN2QyxLQUFLLHdCQUNBLEtBQUssSUFDUixJQUFJLEVBQUU7b0JBQ0osZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0I7aUJBQy9DLEdBQ0YsQ0FBQTtZQUNELE1BQU07UUFHUjs7OERBRXNEO1FBQ3RELEtBQUssb0JBQW9CLENBQUMsT0FBTztZQUMvQixLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ1gsTUFBTTtLQUVUO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IFNvdXJjZUxpc3RBUElBY3Rpb24sIFNvdXJjZUxpc3RBUElBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9zb3VyY2UtbGlzdC5hY3Rpb25zJztcbmltcG9ydCB7IFNvdXJjZUxpc3QgfSBmcm9tICcuLi9tb2RlbHMvc291cmNlLWxpc3QubW9kZWxzJztcblxuY29uc3QgSU5JVElBTF9TVEFURSA9IG5ldyBTb3VyY2VMaXN0KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzb3VyY2VMaXN0UmVkdWNlcihzdGF0ZTogU291cmNlTGlzdCA9IElOSVRJQUxfU1RBVEUsIGE6IEFjdGlvbik6IFNvdXJjZUxpc3Qge1xuXG4gIGNvbnN0IGFjdGlvbiA9IGEgYXMgU291cmNlTGlzdEFQSUFjdGlvbjtcblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG5cbiAgICBjYXNlIFNvdXJjZUxpc3RBUElBY3Rpb25zLklOSVRJQUxJWkVfTElTVDpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbGlzdDoge1xuICAgICAgICAgIHBrQWxsb3dlZENsYXNzZXM6IGFjdGlvbi5tZXRhLnBrQWxsb3dlZENsYXNzZXNcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogUmVkdWNlcnMgY2FsbGVkIG9uIGRlc3Ryb3kgb2YgY29tcG9uZW50XG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgY2FzZSBTb3VyY2VMaXN0QVBJQWN0aW9ucy5ERVNUUk9ZOlxuICAgICAgc3RhdGUgPSB7fTtcbiAgICAgIGJyZWFrO1xuXG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59O1xuXG4iXX0=