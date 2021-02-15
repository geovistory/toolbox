/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/actions/account.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @record
 */
export function AccountActionMeta() { }
if (false) {
    /** @type {?|undefined} */
    AccountActionMeta.prototype.accountId;
    /** @type {?|undefined} */
    AccountActionMeta.prototype.accountRoles;
    /** @type {?|undefined} */
    AccountActionMeta.prototype.account;
}
;
export class AccountActions {
    /**
     * @return {?}
     */
    login() {
        return {
            type: AccountActions.LOGIN,
            payload: null,
            meta: null
        };
    }
    /**
     * @param {?} account
     * @return {?}
     */
    loginSucceeded(account) {
        return {
            type: AccountActions.LOGIN_SUCCEEDED,
            payload: null,
            meta: { account }
        };
    }
    /**
     * @param {?} error
     * @return {?}
     */
    loginFailed(error) {
        return {
            type: AccountActions.LOGIN_FAILED,
            payload: null,
            meta: null,
            error
        };
    }
    /**
     * @param {?} account
     * @return {?}
     */
    accountUpdated(account) {
        return {
            type: AccountActions.ACCOUNT_UPDATED,
            payload: null,
            meta: { account }
        };
    }
    // Roles of the account, used to check permissions
    /**
     * @param {?} accountId
     * @return {?}
     */
    loadRoles(accountId) {
        return {
            type: AccountActions.LOAD_ROLES,
            payload: null,
            meta: { accountId }
        };
    }
    /**
     * @param {?} accountRoles
     * @return {?}
     */
    loadRolesSucceeded(accountRoles) {
        return {
            type: AccountActions.LOAD_ROLES_SUCCEEDED,
            payload: null,
            meta: { accountRoles }
        };
    }
    /**
     * @param {?} accountRoles
     * @return {?}
     */
    loadRolesFailed(accountRoles) {
        return {
            type: AccountActions.LOAD_ROLES_FAILED,
            payload: null,
            meta: null
        };
    }
}
AccountActions.LOGIN = 'Account::LOGIN';
AccountActions.LOGIN_SUCCEEDED = 'Account::LOGIN_SUCCEEDED';
AccountActions.LOGIN_FAILED = 'Account::LOGIN_FAILED';
AccountActions.LOAD_ROLES = 'Account::LOAD_ROLES';
AccountActions.LOAD_ROLES_SUCCEEDED = 'Account::LOAD_ROLES_SUCCEEDED';
AccountActions.LOAD_ROLES_FAILED = 'Account::LOAD_ROLES_FAILED';
AccountActions.ACCOUNT_UPDATED = 'Account::ACCOUNT_UPDATED';
AccountActions.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ AccountActions.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AccountActions_Factory() { return new AccountActions(); }, token: AccountActions, providedIn: "root" });
if (false) {
    /** @type {?} */
    AccountActions.LOGIN;
    /** @type {?} */
    AccountActions.LOGIN_SUCCEEDED;
    /** @type {?} */
    AccountActions.LOGIN_FAILED;
    /** @type {?} */
    AccountActions.LOAD_ROLES;
    /** @type {?} */
    AccountActions.LOAD_ROLES_SUCCEEDED;
    /** @type {?} */
    AccountActions.LOAD_ROLES_FAILED;
    /** @type {?} */
    AccountActions.ACCOUNT_UPDATED;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtZ3VpL2FjdGlvbnMvYWNjb3VudC5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFLM0MsdUNBSUM7OztJQUhDLHNDQUFtQjs7SUFDbkIseUNBQTZCOztJQUM3QixvQ0FBcUI7O0FBQ3RCLENBQUM7QUFPRixNQUFNLE9BQU8sY0FBYzs7OztJQVl6QixLQUFLO1FBQ0gsT0FBTztZQUNMLElBQUksRUFBRSxjQUFjLENBQUMsS0FBSztZQUMxQixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLE9BQW1CO1FBQ2hDLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYyxDQUFDLGVBQWU7WUFDcEMsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUU7U0FDbEIsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixPQUFPO1lBQ0wsSUFBSSxFQUFFLGNBQWMsQ0FBQyxZQUFZO1lBQ2pDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLO1NBQ04sQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLE9BQW1CO1FBQ2hDLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYyxDQUFDLGVBQWU7WUFDcEMsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUU7U0FDbEIsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUdELFNBQVMsQ0FBQyxTQUFpQjtRQUN6QixPQUFPO1lBQ0wsSUFBSSxFQUFFLGNBQWMsQ0FBQyxVQUFVO1lBQy9CLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFO1NBQ3BCLENBQUM7SUFDSixDQUFDOzs7OztJQUVELGtCQUFrQixDQUFDLFlBQTJCO1FBQzVDLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYyxDQUFDLG9CQUFvQjtZQUN6QyxPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxFQUFFLFlBQVksRUFBRTtTQUN2QixDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCxlQUFlLENBQUMsWUFBMkI7UUFDekMsT0FBTztZQUNMLElBQUksRUFBRSxjQUFjLENBQUMsaUJBQWlCO1lBQ3RDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDO0lBQ0osQ0FBQzs7QUFuRU0sb0JBQUssR0FBRyxnQkFBZ0IsQ0FBQztBQUN6Qiw4QkFBZSxHQUFHLDBCQUEwQixDQUFDO0FBQzdDLDJCQUFZLEdBQUcsdUJBQXVCLENBQUM7QUFFdkMseUJBQVUsR0FBRyxxQkFBcUIsQ0FBQztBQUNuQyxtQ0FBb0IsR0FBRywrQkFBK0IsQ0FBQztBQUN2RCxnQ0FBaUIsR0FBRyw0QkFBNEIsQ0FBQztBQUVqRCw4QkFBZSxHQUFHLDBCQUEwQixDQUFDOztZQVpyRCxVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7O0lBRUMscUJBQWdDOztJQUNoQywrQkFBb0Q7O0lBQ3BELDRCQUE4Qzs7SUFFOUMsMEJBQTBDOztJQUMxQyxvQ0FBOEQ7O0lBQzlELGlDQUF3RDs7SUFFeEQsK0JBQW9EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHViQWNjb3VudCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBBY2NvdW50Um9sZSwgSUFjY291bnQgfSBmcm9tICcuLi9tb2RlbHMvYWNjb3VudC5tb2RlbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWNjb3VudEFjdGlvbk1ldGEge1xuICBhY2NvdW50SWQ/OiBudW1iZXI7XG4gIGFjY291bnRSb2xlcz86IEFjY291bnRSb2xlW107XG4gIGFjY291bnQ/OiBQdWJBY2NvdW50O1xufTtcbmV4cG9ydCB0eXBlIEFjY291bnRBY3Rpb24gPSBGbHV4U3RhbmRhcmRBY3Rpb248SUFjY291bnQsIEFjY291bnRBY3Rpb25NZXRhPjtcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBY2NvdW50QWN0aW9ucyB7XG4gIHN0YXRpYyBMT0dJTiA9ICdBY2NvdW50OjpMT0dJTic7XG4gIHN0YXRpYyBMT0dJTl9TVUNDRUVERUQgPSAnQWNjb3VudDo6TE9HSU5fU1VDQ0VFREVEJztcbiAgc3RhdGljIExPR0lOX0ZBSUxFRCA9ICdBY2NvdW50OjpMT0dJTl9GQUlMRUQnO1xuXG4gIHN0YXRpYyBMT0FEX1JPTEVTID0gJ0FjY291bnQ6OkxPQURfUk9MRVMnO1xuICBzdGF0aWMgTE9BRF9ST0xFU19TVUNDRUVERUQgPSAnQWNjb3VudDo6TE9BRF9ST0xFU19TVUNDRUVERUQnO1xuICBzdGF0aWMgTE9BRF9ST0xFU19GQUlMRUQgPSAnQWNjb3VudDo6TE9BRF9ST0xFU19GQUlMRUQnO1xuXG4gIHN0YXRpYyBBQ0NPVU5UX1VQREFURUQgPSAnQWNjb3VudDo6QUNDT1VOVF9VUERBVEVEJztcblxuXG4gIGxvZ2luKCk6IEFjY291bnRBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY2NvdW50QWN0aW9ucy5MT0dJTixcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiBudWxsXG4gICAgfTtcbiAgfVxuXG4gIGxvZ2luU3VjY2VlZGVkKGFjY291bnQ6IFB1YkFjY291bnQpOiBBY2NvdW50QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWNjb3VudEFjdGlvbnMuTE9HSU5fU1VDQ0VFREVELFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IHsgYWNjb3VudCB9XG4gICAgfTtcbiAgfVxuXG4gIGxvZ2luRmFpbGVkKGVycm9yKTogQWNjb3VudEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjY291bnRBY3Rpb25zLkxPR0lOX0ZBSUxFRCxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiBudWxsLFxuICAgICAgZXJyb3JcbiAgICB9O1xuICB9XG5cbiAgYWNjb3VudFVwZGF0ZWQoYWNjb3VudDogUHViQWNjb3VudCk6IEFjY291bnRBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY2NvdW50QWN0aW9ucy5BQ0NPVU5UX1VQREFURUQsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogeyBhY2NvdW50IH1cbiAgICB9O1xuICB9XG5cbiAgLy8gUm9sZXMgb2YgdGhlIGFjY291bnQsIHVzZWQgdG8gY2hlY2sgcGVybWlzc2lvbnNcbiAgbG9hZFJvbGVzKGFjY291bnRJZDogbnVtYmVyKTogQWNjb3VudEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjY291bnRBY3Rpb25zLkxPQURfUk9MRVMsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogeyBhY2NvdW50SWQgfVxuICAgIH07XG4gIH1cblxuICBsb2FkUm9sZXNTdWNjZWVkZWQoYWNjb3VudFJvbGVzOiBBY2NvdW50Um9sZVtdKTogQWNjb3VudEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjY291bnRBY3Rpb25zLkxPQURfUk9MRVNfU1VDQ0VFREVELFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IHsgYWNjb3VudFJvbGVzIH1cbiAgICB9O1xuICB9XG5cbiAgbG9hZFJvbGVzRmFpbGVkKGFjY291bnRSb2xlczogQWNjb3VudFJvbGVbXSk6IEFjY291bnRBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY2NvdW50QWN0aW9ucy5MT0FEX1JPTEVTX0ZBSUxFRCxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiBudWxsXG4gICAgfTtcbiAgfVxuXG59XG4iXX0=