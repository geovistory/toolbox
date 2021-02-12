/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/reducers/account.reducers.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AccountActions } from '../actions';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5yZWR1Y2Vycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9yZWR1Y2Vycy9hY2NvdW50LnJlZHVjZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFpQixjQUFjLEVBQUUsTUFBTSxZQUFZLENBQUM7O01BR3JELGFBQWEsR0FBYTtJQUM5QixPQUFPLEVBQUUsU0FBUztJQUNsQixLQUFLLEVBQUUsU0FBUztDQUNqQjs7QUFFRCxNQUFNLE9BQU8sa0JBQWtCOzs7OztBQUFHLENBQUMsWUFBc0IsYUFBYSxFQUFFLE1BQXFCLEVBQVksRUFBRTtJQUN6RyxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDbkIsS0FBSyxjQUFjLENBQUMsZUFBZTtZQUNqQyxTQUFTLHFCQUNKLFNBQVMsSUFDWixPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQzdCLENBQUM7WUFDRixNQUFNO1FBR1IsS0FBSyxjQUFjLENBQUMsZUFBZTtZQUNqQyxTQUFTLHFCQUNKLFNBQVMsSUFDWixPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQzdCLENBQUM7WUFDRixNQUFNO1FBRVIsS0FBSyxjQUFjLENBQUMsb0JBQW9CO1lBQ3RDLFNBQVMscUJBQ0osU0FBUyxJQUNaLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksR0FDaEMsQ0FBQztZQUNGLE1BQU07UUFFUixLQUFLLGNBQWMsQ0FBQyxpQkFBaUI7WUFDbkMsU0FBUyxxQkFDSixTQUFTLElBQ1osS0FBSyxFQUFFLEVBQUUsR0FDVixDQUFDO1lBQ0YsTUFBTTtLQUlUO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWNjb3VudEFjdGlvbiwgQWNjb3VudEFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IElBY2NvdW50IH0gZnJvbSAnLi4vbW9kZWxzJztcblxuY29uc3QgSU5JVElBTF9TVEFURTogSUFjY291bnQgPSB7XG4gIGFjY291bnQ6IHVuZGVmaW5lZCxcbiAgcm9sZXM6IHVuZGVmaW5lZFxufTtcblxuZXhwb3J0IGNvbnN0IGFjY291bnRSb290UmVkdWNlciA9IChsYXN0U3RhdGU6IElBY2NvdW50ID0gSU5JVElBTF9TVEFURSwgYWN0aW9uOiBBY2NvdW50QWN0aW9uKTogSUFjY291bnQgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBY2NvdW50QWN0aW9ucy5MT0dJTl9TVUNDRUVERUQ6XG4gICAgICBsYXN0U3RhdGUgPSB7XG4gICAgICAgIC4uLmxhc3RTdGF0ZSxcbiAgICAgICAgYWNjb3VudDogYWN0aW9uLm1ldGEuYWNjb3VudFxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG5cbiAgICBjYXNlIEFjY291bnRBY3Rpb25zLkFDQ09VTlRfVVBEQVRFRDpcbiAgICAgIGxhc3RTdGF0ZSA9IHtcbiAgICAgICAgLi4ubGFzdFN0YXRlLFxuICAgICAgICBhY2NvdW50OiBhY3Rpb24ubWV0YS5hY2NvdW50XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIEFjY291bnRBY3Rpb25zLkxPQURfUk9MRVNfU1VDQ0VFREVEOlxuICAgICAgbGFzdFN0YXRlID0ge1xuICAgICAgICAuLi5sYXN0U3RhdGUsXG4gICAgICAgIHJvbGVzOiBhY3Rpb24ubWV0YS5hY2NvdW50Um9sZXNcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgQWNjb3VudEFjdGlvbnMuTE9BRF9ST0xFU19GQUlMRUQ6XG4gICAgICBsYXN0U3RhdGUgPSB7XG4gICAgICAgIC4uLmxhc3RTdGF0ZSxcbiAgICAgICAgcm9sZXM6IFtdXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cblxuXG4gIH1cbiAgcmV0dXJuIGxhc3RTdGF0ZTtcbn1cblxuIl19