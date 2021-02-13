/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/reducers/loading-bar.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { LoadingBarActions } from '../actions/loading-bar.actions';
/** @type {?} */
var INITIAL_STATE = {
    loading: false,
    progress: 0,
};
/**
 * @param {?=} state
 * @param {?=} a
 * @return {?}
 */
export function loadingBarReducer(state, a) {
    if (state === void 0) { state = INITIAL_STATE; }
    /** @type {?} */
    var action = (/** @type {?} */ (a));
    switch (action.type) {
        case LoadingBarActions.START:
            return tslib_1.__assign({}, state, { loading: true });
        case LoadingBarActions.STOP:
            return tslib_1.__assign({}, state, { loading: false });
        case LoadingBarActions.COPMLETE:
            return tslib_1.__assign({}, state, { loading: false });
    }
    return state;
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1iYXIucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9yZWR1Y2Vycy9sb2FkaW5nLWJhci5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBb0IsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7SUFHL0UsYUFBYSxHQUFlO0lBQ2hDLE9BQU8sRUFBRSxLQUFLO0lBQ2QsUUFBUSxFQUFFLENBQUM7Q0FDWjs7Ozs7O0FBR0QsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEtBQWlDLEVBQUUsQ0FBUztJQUE1QyxzQkFBQSxFQUFBLHFCQUFpQzs7UUFFM0QsTUFBTSxHQUFHLG1CQUFBLENBQUMsRUFBb0I7SUFHcEMsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBRW5CLEtBQUssaUJBQWlCLENBQUMsS0FBSztZQUMxQiw0QkFDSyxLQUFLLElBQ1IsT0FBTyxFQUFFLElBQUksSUFDYjtRQUVKLEtBQUssaUJBQWlCLENBQUMsSUFBSTtZQUN6Qiw0QkFDSyxLQUFLLElBQ1IsT0FBTyxFQUFFLEtBQUssSUFDZDtRQUVKLEtBQUssaUJBQWlCLENBQUMsUUFBUTtZQUM3Qiw0QkFDSyxLQUFLLElBQ1IsT0FBTyxFQUFFLEtBQUssSUFDZDtLQUNMO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IExvYWRpbmdCYXJBY3Rpb24sIExvYWRpbmdCYXJBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9sb2FkaW5nLWJhci5hY3Rpb25zJztcbmltcG9ydCB7IExvYWRpbmdCYXIgfSBmcm9tICcuLi9tb2RlbHMvbG9hZGluZy1iYXIubW9kZWxzJztcblxuY29uc3QgSU5JVElBTF9TVEFURTogTG9hZGluZ0JhciA9IHtcbiAgbG9hZGluZzogZmFsc2UsXG4gIHByb2dyZXNzOiAwLFxufTtcblxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZGluZ0JhclJlZHVjZXIoc3RhdGU6IExvYWRpbmdCYXIgPSBJTklUSUFMX1NUQVRFLCBhOiBBY3Rpb24pOiBMb2FkaW5nQmFyIHtcblxuICBjb25zdCBhY3Rpb24gPSBhIGFzIExvYWRpbmdCYXJBY3Rpb247XG5cblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG5cbiAgICBjYXNlIExvYWRpbmdCYXJBY3Rpb25zLlNUQVJUOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGxvYWRpbmc6IHRydWVcbiAgICAgIH07XG5cbiAgICBjYXNlIExvYWRpbmdCYXJBY3Rpb25zLlNUT1A6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgY2FzZSBMb2FkaW5nQmFyQWN0aW9ucy5DT1BNTEVURTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgIH07XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59O1xuXG4iXX0=