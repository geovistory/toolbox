/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/reducers/account.reducers.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5yZWR1Y2Vycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9yZWR1Y2Vycy9hY2NvdW50LnJlZHVjZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBaUIsY0FBYyxFQUFFLE1BQU0sWUFBWSxDQUFDOztJQUdyRCxhQUFhLEdBQWE7SUFDOUIsT0FBTyxFQUFFLFNBQVM7SUFDbEIsS0FBSyxFQUFFLFNBQVM7Q0FDakI7O0FBRUQsTUFBTSxLQUFPLGtCQUFrQjs7Ozs7QUFBRyxVQUFDLFNBQW1DLEVBQUUsTUFBcUI7SUFBMUQsMEJBQUEsRUFBQSx5QkFBbUM7SUFDcEUsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ25CLEtBQUssY0FBYyxDQUFDLGVBQWU7WUFDakMsU0FBUyx3QkFDSixTQUFTLElBQ1osT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUM3QixDQUFDO1lBQ0YsTUFBTTtRQUdSLEtBQUssY0FBYyxDQUFDLGVBQWU7WUFDakMsU0FBUyx3QkFDSixTQUFTLElBQ1osT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUM3QixDQUFDO1lBQ0YsTUFBTTtRQUVSLEtBQUssY0FBYyxDQUFDLG9CQUFvQjtZQUN0QyxTQUFTLHdCQUNKLFNBQVMsSUFDWixLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQ2hDLENBQUM7WUFDRixNQUFNO1FBRVIsS0FBSyxjQUFjLENBQUMsaUJBQWlCO1lBQ25DLFNBQVMsd0JBQ0osU0FBUyxJQUNaLEtBQUssRUFBRSxFQUFFLEdBQ1YsQ0FBQztZQUNGLE1BQU07S0FJVDtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjY291bnRBY3Rpb24sIEFjY291bnRBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBJQWNjb3VudCB9IGZyb20gJy4uL21vZGVscyc7XG5cbmNvbnN0IElOSVRJQUxfU1RBVEU6IElBY2NvdW50ID0ge1xuICBhY2NvdW50OiB1bmRlZmluZWQsXG4gIHJvbGVzOiB1bmRlZmluZWRcbn07XG5cbmV4cG9ydCBjb25zdCBhY2NvdW50Um9vdFJlZHVjZXIgPSAobGFzdFN0YXRlOiBJQWNjb3VudCA9IElOSVRJQUxfU1RBVEUsIGFjdGlvbjogQWNjb3VudEFjdGlvbik6IElBY2NvdW50ID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgQWNjb3VudEFjdGlvbnMuTE9HSU5fU1VDQ0VFREVEOlxuICAgICAgbGFzdFN0YXRlID0ge1xuICAgICAgICAuLi5sYXN0U3RhdGUsXG4gICAgICAgIGFjY291bnQ6IGFjdGlvbi5tZXRhLmFjY291bnRcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuXG4gICAgY2FzZSBBY2NvdW50QWN0aW9ucy5BQ0NPVU5UX1VQREFURUQ6XG4gICAgICBsYXN0U3RhdGUgPSB7XG4gICAgICAgIC4uLmxhc3RTdGF0ZSxcbiAgICAgICAgYWNjb3VudDogYWN0aW9uLm1ldGEuYWNjb3VudFxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBBY2NvdW50QWN0aW9ucy5MT0FEX1JPTEVTX1NVQ0NFRURFRDpcbiAgICAgIGxhc3RTdGF0ZSA9IHtcbiAgICAgICAgLi4ubGFzdFN0YXRlLFxuICAgICAgICByb2xlczogYWN0aW9uLm1ldGEuYWNjb3VudFJvbGVzXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIEFjY291bnRBY3Rpb25zLkxPQURfUk9MRVNfRkFJTEVEOlxuICAgICAgbGFzdFN0YXRlID0ge1xuICAgICAgICAuLi5sYXN0U3RhdGUsXG4gICAgICAgIHJvbGVzOiBbXVxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG5cblxuICB9XG4gIHJldHVybiBsYXN0U3RhdGU7XG59XG5cbiJdfQ==