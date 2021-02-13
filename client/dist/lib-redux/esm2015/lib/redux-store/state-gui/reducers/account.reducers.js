/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/account.reducers.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AccountActions } from '../../state-gui/actions/account.actions';
/** @type {?} */
const INITIAL_STATE = {
    account: undefined,
    roles: undefined
};
/** @type {?} */
export const accountRootReducer = (/**
 * @param {?=} lastState
 * @param {?=} action
 * @return {?}
 */
(lastState = INITIAL_STATE, action) => {
    switch (action.type) {
        case AccountActions.LOGIN_SUCCEEDED:
            lastState = Object.assign({}, lastState, { account: action.meta.account });
            break;
        case AccountActions.ACCOUNT_UPDATED:
            lastState = Object.assign({}, lastState, { account: action.meta.account });
            break;
        case AccountActions.LOAD_ROLES_SUCCEEDED:
            lastState = Object.assign({}, lastState, { roles: action.meta.accountRoles });
            break;
        case AccountActions.LOAD_ROLES_FAILED:
            lastState = Object.assign({}, lastState, { roles: [] });
            break;
    }
    return lastState;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5yZWR1Y2Vycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL3JlZHVjZXJzL2FjY291bnQucmVkdWNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFpQixNQUFNLHlDQUF5QyxDQUFDOztNQUlsRixhQUFhLEdBQWE7SUFDOUIsT0FBTyxFQUFFLFNBQVM7SUFDbEIsS0FBSyxFQUFFLFNBQVM7Q0FDakI7O0FBRUQsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7QUFBRyxDQUFDLFlBQXNCLGFBQWEsRUFBRSxNQUFxQixFQUFZLEVBQUU7SUFDekcsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ25CLEtBQUssY0FBYyxDQUFDLGVBQWU7WUFDakMsU0FBUyxxQkFDSixTQUFTLElBQ1osT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUM3QixDQUFDO1lBQ0YsTUFBTTtRQUdSLEtBQUssY0FBYyxDQUFDLGVBQWU7WUFDakMsU0FBUyxxQkFDSixTQUFTLElBQ1osT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUM3QixDQUFDO1lBQ0YsTUFBTTtRQUVSLEtBQUssY0FBYyxDQUFDLG9CQUFvQjtZQUN0QyxTQUFTLHFCQUNKLFNBQVMsSUFDWixLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQ2hDLENBQUM7WUFDRixNQUFNO1FBRVIsS0FBSyxjQUFjLENBQUMsaUJBQWlCO1lBQ25DLFNBQVMscUJBQ0osU0FBUyxJQUNaLEtBQUssRUFBRSxFQUFFLEdBQ1YsQ0FBQztZQUNGLE1BQU07S0FJVDtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjY291bnRBY3Rpb25zLCBBY2NvdW50QWN0aW9uIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvYWNjb3VudC5hY3Rpb25zJztcbmltcG9ydCB7IElBY2NvdW50IH0gZnJvbSAnLi4vbW9kZWxzL2FjY291bnQubW9kZWwnO1xuXG5cbmNvbnN0IElOSVRJQUxfU1RBVEU6IElBY2NvdW50ID0ge1xuICBhY2NvdW50OiB1bmRlZmluZWQsXG4gIHJvbGVzOiB1bmRlZmluZWRcbn07XG5cbmV4cG9ydCBjb25zdCBhY2NvdW50Um9vdFJlZHVjZXIgPSAobGFzdFN0YXRlOiBJQWNjb3VudCA9IElOSVRJQUxfU1RBVEUsIGFjdGlvbjogQWNjb3VudEFjdGlvbik6IElBY2NvdW50ID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgQWNjb3VudEFjdGlvbnMuTE9HSU5fU1VDQ0VFREVEOlxuICAgICAgbGFzdFN0YXRlID0ge1xuICAgICAgICAuLi5sYXN0U3RhdGUsXG4gICAgICAgIGFjY291bnQ6IGFjdGlvbi5tZXRhLmFjY291bnRcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuXG4gICAgY2FzZSBBY2NvdW50QWN0aW9ucy5BQ0NPVU5UX1VQREFURUQ6XG4gICAgICBsYXN0U3RhdGUgPSB7XG4gICAgICAgIC4uLmxhc3RTdGF0ZSxcbiAgICAgICAgYWNjb3VudDogYWN0aW9uLm1ldGEuYWNjb3VudFxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBBY2NvdW50QWN0aW9ucy5MT0FEX1JPTEVTX1NVQ0NFRURFRDpcbiAgICAgIGxhc3RTdGF0ZSA9IHtcbiAgICAgICAgLi4ubGFzdFN0YXRlLFxuICAgICAgICByb2xlczogYWN0aW9uLm1ldGEuYWNjb3VudFJvbGVzXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIEFjY291bnRBY3Rpb25zLkxPQURfUk9MRVNfRkFJTEVEOlxuICAgICAgbGFzdFN0YXRlID0ge1xuICAgICAgICAuLi5sYXN0U3RhdGUsXG4gICAgICAgIHJvbGVzOiBbXVxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG5cblxuICB9XG4gIHJldHVybiBsYXN0U3RhdGU7XG59XG5cbiJdfQ==