/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/loading-bar.reducer.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1iYXIucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL3JlZHVjZXJzL2xvYWRpbmctYmFyLnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUFvQixpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOztJQUcvRSxhQUFhLEdBQWU7SUFDaEMsT0FBTyxFQUFFLEtBQUs7SUFDZCxRQUFRLEVBQUUsQ0FBQztDQUNaOzs7Ozs7QUFHRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsS0FBaUMsRUFBRSxDQUFTO0lBQTVDLHNCQUFBLEVBQUEscUJBQWlDOztRQUUzRCxNQUFNLEdBQUcsbUJBQUEsQ0FBQyxFQUFvQjtJQUdwQyxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFFbkIsS0FBSyxpQkFBaUIsQ0FBQyxLQUFLO1lBQzFCLDRCQUNLLEtBQUssSUFDUixPQUFPLEVBQUUsSUFBSSxJQUNiO1FBRUosS0FBSyxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3pCLDRCQUNLLEtBQUssSUFDUixPQUFPLEVBQUUsS0FBSyxJQUNkO1FBRUosS0FBSyxpQkFBaUIsQ0FBQyxRQUFRO1lBQzdCLDRCQUNLLEtBQUssSUFDUixPQUFPLEVBQUUsS0FBSyxJQUNkO0tBQ0w7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgTG9hZGluZ0JhckFjdGlvbiwgTG9hZGluZ0JhckFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2xvYWRpbmctYmFyLmFjdGlvbnMnO1xuaW1wb3J0IHsgTG9hZGluZ0JhciB9IGZyb20gJy4uL21vZGVscy9sb2FkaW5nLWJhci5tb2RlbHMnO1xuXG5jb25zdCBJTklUSUFMX1NUQVRFOiBMb2FkaW5nQmFyID0ge1xuICBsb2FkaW5nOiBmYWxzZSxcbiAgcHJvZ3Jlc3M6IDAsXG59O1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkaW5nQmFyUmVkdWNlcihzdGF0ZTogTG9hZGluZ0JhciA9IElOSVRJQUxfU1RBVEUsIGE6IEFjdGlvbik6IExvYWRpbmdCYXIge1xuXG4gIGNvbnN0IGFjdGlvbiA9IGEgYXMgTG9hZGluZ0JhckFjdGlvbjtcblxuXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblxuICAgIGNhc2UgTG9hZGluZ0JhckFjdGlvbnMuU1RBUlQ6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbG9hZGluZzogdHJ1ZVxuICAgICAgfTtcblxuICAgIGNhc2UgTG9hZGluZ0JhckFjdGlvbnMuU1RPUDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgIH07XG5cbiAgICBjYXNlIExvYWRpbmdCYXJBY3Rpb25zLkNPUE1MRVRFOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgfTtcbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn07XG5cbiJdfQ==