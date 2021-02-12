/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/reducers/loading-bar.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { LoadingBarActions } from '../actions';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1iYXIucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9yZWR1Y2Vycy9sb2FkaW5nLWJhci5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBb0IsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7O0lBRzNELGFBQWEsR0FBZTtJQUNoQyxPQUFPLEVBQUUsS0FBSztJQUNkLFFBQVEsRUFBRSxDQUFDO0NBQ1o7Ozs7OztBQUdELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxLQUFpQyxFQUFFLENBQVM7SUFBNUMsc0JBQUEsRUFBQSxxQkFBaUM7O1FBRTNELE1BQU0sR0FBRyxtQkFBQSxDQUFDLEVBQW9CO0lBR3BDLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUVuQixLQUFLLGlCQUFpQixDQUFDLEtBQUs7WUFDMUIsNEJBQ0ssS0FBSyxJQUNSLE9BQU8sRUFBRSxJQUFJLElBQ2I7UUFFSixLQUFLLGlCQUFpQixDQUFDLElBQUk7WUFDekIsNEJBQ0ssS0FBSyxJQUNSLE9BQU8sRUFBRSxLQUFLLElBQ2Q7UUFFSixLQUFLLGlCQUFpQixDQUFDLFFBQVE7WUFDN0IsNEJBQ0ssS0FBSyxJQUNSLE9BQU8sRUFBRSxLQUFLLElBQ2Q7S0FDTDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBMb2FkaW5nQmFyQWN0aW9uLCBMb2FkaW5nQmFyQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgTG9hZGluZ0JhciB9IGZyb20gJy4uL21vZGVscyc7XG5cbmNvbnN0IElOSVRJQUxfU1RBVEU6IExvYWRpbmdCYXIgPSB7XG4gIGxvYWRpbmc6IGZhbHNlLFxuICBwcm9ncmVzczogMCxcbn07XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRpbmdCYXJSZWR1Y2VyKHN0YXRlOiBMb2FkaW5nQmFyID0gSU5JVElBTF9TVEFURSwgYTogQWN0aW9uKTogTG9hZGluZ0JhciB7XG5cbiAgY29uc3QgYWN0aW9uID0gYSBhcyBMb2FkaW5nQmFyQWN0aW9uO1xuXG5cbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuXG4gICAgY2FzZSBMb2FkaW5nQmFyQWN0aW9ucy5TVEFSVDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBsb2FkaW5nOiB0cnVlXG4gICAgICB9O1xuXG4gICAgY2FzZSBMb2FkaW5nQmFyQWN0aW9ucy5TVE9QOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgfTtcblxuICAgIGNhc2UgTG9hZGluZ0JhckFjdGlvbnMuQ09QTUxFVEU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlO1xufTtcblxuIl19