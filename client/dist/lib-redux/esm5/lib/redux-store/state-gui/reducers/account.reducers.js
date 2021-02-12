/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/account.reducers.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { AccountActions } from '../actions';
/** @type {?} */
var INITIAL_STATE = {
    account: undefined,
    roles: undefined
};
/** @type {?} */
export var accountRootReducer = (/**
 * @param {?=} lastState
 * @param {?=} action
 * @return {?}
 */
function (lastState, action) {
    if (lastState === void 0) { lastState = INITIAL_STATE; }
    switch (action.type) {
        case AccountActions.LOGIN_SUCCEEDED:
            lastState = tslib_1.__assign({}, lastState, { account: action.meta.account });
            break;
        case AccountActions.ACCOUNT_UPDATED:
            lastState = tslib_1.__assign({}, lastState, { account: action.meta.account });
            break;
        case AccountActions.LOAD_ROLES_SUCCEEDED:
            lastState = tslib_1.__assign({}, lastState, { roles: action.meta.accountRoles });
            break;
        case AccountActions.LOAD_ROLES_FAILED:
            lastState = tslib_1.__assign({}, lastState, { roles: [] });
            break;
    }
    return lastState;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5yZWR1Y2Vycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL3JlZHVjZXJzL2FjY291bnQucmVkdWNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFpQixjQUFjLEVBQUUsTUFBTSxZQUFZLENBQUM7O0lBR3JELGFBQWEsR0FBYTtJQUM5QixPQUFPLEVBQUUsU0FBUztJQUNsQixLQUFLLEVBQUUsU0FBUztDQUNqQjs7QUFFRCxNQUFNLEtBQU8sa0JBQWtCOzs7OztBQUFHLFVBQUMsU0FBbUMsRUFBRSxNQUFxQjtJQUExRCwwQkFBQSxFQUFBLHlCQUFtQztJQUNwRSxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDbkIsS0FBSyxjQUFjLENBQUMsZUFBZTtZQUNqQyxTQUFTLHdCQUNKLFNBQVMsSUFDWixPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQzdCLENBQUM7WUFDRixNQUFNO1FBR1IsS0FBSyxjQUFjLENBQUMsZUFBZTtZQUNqQyxTQUFTLHdCQUNKLFNBQVMsSUFDWixPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQzdCLENBQUM7WUFDRixNQUFNO1FBRVIsS0FBSyxjQUFjLENBQUMsb0JBQW9CO1lBQ3RDLFNBQVMsd0JBQ0osU0FBUyxJQUNaLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksR0FDaEMsQ0FBQztZQUNGLE1BQU07UUFFUixLQUFLLGNBQWMsQ0FBQyxpQkFBaUI7WUFDbkMsU0FBUyx3QkFDSixTQUFTLElBQ1osS0FBSyxFQUFFLEVBQUUsR0FDVixDQUFDO1lBQ0YsTUFBTTtLQUlUO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWNjb3VudEFjdGlvbiwgQWNjb3VudEFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IElBY2NvdW50IH0gZnJvbSAnLi4vbW9kZWxzJztcblxuY29uc3QgSU5JVElBTF9TVEFURTogSUFjY291bnQgPSB7XG4gIGFjY291bnQ6IHVuZGVmaW5lZCxcbiAgcm9sZXM6IHVuZGVmaW5lZFxufTtcblxuZXhwb3J0IGNvbnN0IGFjY291bnRSb290UmVkdWNlciA9IChsYXN0U3RhdGU6IElBY2NvdW50ID0gSU5JVElBTF9TVEFURSwgYWN0aW9uOiBBY2NvdW50QWN0aW9uKTogSUFjY291bnQgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBY2NvdW50QWN0aW9ucy5MT0dJTl9TVUNDRUVERUQ6XG4gICAgICBsYXN0U3RhdGUgPSB7XG4gICAgICAgIC4uLmxhc3RTdGF0ZSxcbiAgICAgICAgYWNjb3VudDogYWN0aW9uLm1ldGEuYWNjb3VudFxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG5cbiAgICBjYXNlIEFjY291bnRBY3Rpb25zLkFDQ09VTlRfVVBEQVRFRDpcbiAgICAgIGxhc3RTdGF0ZSA9IHtcbiAgICAgICAgLi4ubGFzdFN0YXRlLFxuICAgICAgICBhY2NvdW50OiBhY3Rpb24ubWV0YS5hY2NvdW50XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIEFjY291bnRBY3Rpb25zLkxPQURfUk9MRVNfU1VDQ0VFREVEOlxuICAgICAgbGFzdFN0YXRlID0ge1xuICAgICAgICAuLi5sYXN0U3RhdGUsXG4gICAgICAgIHJvbGVzOiBhY3Rpb24ubWV0YS5hY2NvdW50Um9sZXNcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgQWNjb3VudEFjdGlvbnMuTE9BRF9ST0xFU19GQUlMRUQ6XG4gICAgICBsYXN0U3RhdGUgPSB7XG4gICAgICAgIC4uLmxhc3RTdGF0ZSxcbiAgICAgICAgcm9sZXM6IFtdXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cblxuXG4gIH1cbiAgcmV0dXJuIGxhc3RTdGF0ZTtcbn1cblxuIl19