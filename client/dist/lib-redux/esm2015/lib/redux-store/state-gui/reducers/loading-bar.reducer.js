/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/loading-bar.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { LoadingBarActions } from '../actions/loading-bar.actions';
/** @type {?} */
const INITIAL_STATE = {
    loading: false,
    progress: 0,
};
/**
 * @param {?=} state
 * @param {?=} a
 * @return {?}
 */
export function loadingBarReducer(state = INITIAL_STATE, a) {
    /** @type {?} */
    const action = (/** @type {?} */ (a));
    switch (action.type) {
        case LoadingBarActions.START:
            return Object.assign({}, state, { loading: true });
        case LoadingBarActions.STOP:
            return Object.assign({}, state, { loading: false });
        case LoadingBarActions.COPMLETE:
            return Object.assign({}, state, { loading: false });
    }
    return state;
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1iYXIucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL3JlZHVjZXJzL2xvYWRpbmctYmFyLnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQW9CLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7O01BRy9FLGFBQWEsR0FBZTtJQUNoQyxPQUFPLEVBQUUsS0FBSztJQUNkLFFBQVEsRUFBRSxDQUFDO0NBQ1o7Ozs7OztBQUdELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxRQUFvQixhQUFhLEVBQUUsQ0FBUzs7VUFFdEUsTUFBTSxHQUFHLG1CQUFBLENBQUMsRUFBb0I7SUFHcEMsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBRW5CLEtBQUssaUJBQWlCLENBQUMsS0FBSztZQUMxQix5QkFDSyxLQUFLLElBQ1IsT0FBTyxFQUFFLElBQUksSUFDYjtRQUVKLEtBQUssaUJBQWlCLENBQUMsSUFBSTtZQUN6Qix5QkFDSyxLQUFLLElBQ1IsT0FBTyxFQUFFLEtBQUssSUFDZDtRQUVKLEtBQUssaUJBQWlCLENBQUMsUUFBUTtZQUM3Qix5QkFDSyxLQUFLLElBQ1IsT0FBTyxFQUFFLEtBQUssSUFDZDtLQUNMO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IExvYWRpbmdCYXJBY3Rpb24sIExvYWRpbmdCYXJBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9sb2FkaW5nLWJhci5hY3Rpb25zJztcbmltcG9ydCB7IExvYWRpbmdCYXIgfSBmcm9tICcuLi9tb2RlbHMvbG9hZGluZy1iYXIubW9kZWxzJztcblxuY29uc3QgSU5JVElBTF9TVEFURTogTG9hZGluZ0JhciA9IHtcbiAgbG9hZGluZzogZmFsc2UsXG4gIHByb2dyZXNzOiAwLFxufTtcblxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZGluZ0JhclJlZHVjZXIoc3RhdGU6IExvYWRpbmdCYXIgPSBJTklUSUFMX1NUQVRFLCBhOiBBY3Rpb24pOiBMb2FkaW5nQmFyIHtcblxuICBjb25zdCBhY3Rpb24gPSBhIGFzIExvYWRpbmdCYXJBY3Rpb247XG5cblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG5cbiAgICBjYXNlIExvYWRpbmdCYXJBY3Rpb25zLlNUQVJUOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGxvYWRpbmc6IHRydWVcbiAgICAgIH07XG5cbiAgICBjYXNlIExvYWRpbmdCYXJBY3Rpb25zLlNUT1A6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgY2FzZSBMb2FkaW5nQmFyQWN0aW9ucy5DT1BNTEVURTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgIH07XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59O1xuXG4iXX0=