/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/actions/account.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
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
    { type: Injectable }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtZ3VpL2FjdGlvbnMvYWNjb3VudC5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUszQyx1Q0FJQzs7O0lBSEMsc0NBQW1COztJQUNuQix5Q0FBNkI7O0lBQzdCLG9DQUFxQjs7QUFDdEIsQ0FBQztBQUtGLE1BQU0sT0FBTyxjQUFjOzs7O0lBWXpCLEtBQUs7UUFDSCxPQUFPO1lBQ0wsSUFBSSxFQUFFLGNBQWMsQ0FBQyxLQUFLO1lBQzFCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCxjQUFjLENBQUMsT0FBbUI7UUFDaEMsT0FBTztZQUNMLElBQUksRUFBRSxjQUFjLENBQUMsZUFBZTtZQUNwQyxPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRTtTQUNsQixDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsS0FBSztRQUNmLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYyxDQUFDLFlBQVk7WUFDakMsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUs7U0FDTixDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCxjQUFjLENBQUMsT0FBbUI7UUFDaEMsT0FBTztZQUNMLElBQUksRUFBRSxjQUFjLENBQUMsZUFBZTtZQUNwQyxPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRTtTQUNsQixDQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBR0QsU0FBUyxDQUFDLFNBQWlCO1FBQ3pCLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYyxDQUFDLFVBQVU7WUFDL0IsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUU7U0FDcEIsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsa0JBQWtCLENBQUMsWUFBMkI7UUFDNUMsT0FBTztZQUNMLElBQUksRUFBRSxjQUFjLENBQUMsb0JBQW9CO1lBQ3pDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLEVBQUUsWUFBWSxFQUFFO1NBQ3ZCLENBQUM7SUFDSixDQUFDOzs7OztJQUVELGVBQWUsQ0FBQyxZQUEyQjtRQUN6QyxPQUFPO1lBQ0wsSUFBSSxFQUFFLGNBQWMsQ0FBQyxpQkFBaUI7WUFDdEMsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUM7SUFDSixDQUFDOztBQW5FTSxvQkFBSyxHQUFHLGdCQUFnQixDQUFDO0FBQ3pCLDhCQUFlLEdBQUcsMEJBQTBCLENBQUM7QUFDN0MsMkJBQVksR0FBRyx1QkFBdUIsQ0FBQztBQUV2Qyx5QkFBVSxHQUFHLHFCQUFxQixDQUFDO0FBQ25DLG1DQUFvQixHQUFHLCtCQUErQixDQUFDO0FBQ3ZELGdDQUFpQixHQUFHLDRCQUE0QixDQUFDO0FBRWpELDhCQUFlLEdBQUcsMEJBQTBCLENBQUM7O1lBVnJELFVBQVU7Ozs7SUFFVCxxQkFBZ0M7O0lBQ2hDLCtCQUFvRDs7SUFDcEQsNEJBQThDOztJQUU5QywwQkFBMEM7O0lBQzFDLG9DQUE4RDs7SUFDOUQsaUNBQXdEOztJQUV4RCwrQkFBb0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQdWJBY2NvdW50IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IEFjY291bnRSb2xlLCBJQWNjb3VudCB9IGZyb20gJy4uL21vZGVscy9hY2NvdW50Lm1vZGVsJztcblxuZXhwb3J0IGludGVyZmFjZSBBY2NvdW50QWN0aW9uTWV0YSB7XG4gIGFjY291bnRJZD86IG51bWJlcjtcbiAgYWNjb3VudFJvbGVzPzogQWNjb3VudFJvbGVbXTtcbiAgYWNjb3VudD86IFB1YkFjY291bnQ7XG59O1xuZXhwb3J0IHR5cGUgQWNjb3VudEFjdGlvbiA9IEZsdXhTdGFuZGFyZEFjdGlvbjxJQWNjb3VudCwgQWNjb3VudEFjdGlvbk1ldGE+O1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBY2NvdW50QWN0aW9ucyB7XG4gIHN0YXRpYyBMT0dJTiA9ICdBY2NvdW50OjpMT0dJTic7XG4gIHN0YXRpYyBMT0dJTl9TVUNDRUVERUQgPSAnQWNjb3VudDo6TE9HSU5fU1VDQ0VFREVEJztcbiAgc3RhdGljIExPR0lOX0ZBSUxFRCA9ICdBY2NvdW50OjpMT0dJTl9GQUlMRUQnO1xuXG4gIHN0YXRpYyBMT0FEX1JPTEVTID0gJ0FjY291bnQ6OkxPQURfUk9MRVMnO1xuICBzdGF0aWMgTE9BRF9ST0xFU19TVUNDRUVERUQgPSAnQWNjb3VudDo6TE9BRF9ST0xFU19TVUNDRUVERUQnO1xuICBzdGF0aWMgTE9BRF9ST0xFU19GQUlMRUQgPSAnQWNjb3VudDo6TE9BRF9ST0xFU19GQUlMRUQnO1xuXG4gIHN0YXRpYyBBQ0NPVU5UX1VQREFURUQgPSAnQWNjb3VudDo6QUNDT1VOVF9VUERBVEVEJztcblxuXG4gIGxvZ2luKCk6IEFjY291bnRBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY2NvdW50QWN0aW9ucy5MT0dJTixcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiBudWxsXG4gICAgfTtcbiAgfVxuXG4gIGxvZ2luU3VjY2VlZGVkKGFjY291bnQ6IFB1YkFjY291bnQpOiBBY2NvdW50QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWNjb3VudEFjdGlvbnMuTE9HSU5fU1VDQ0VFREVELFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IHsgYWNjb3VudCB9XG4gICAgfTtcbiAgfVxuXG4gIGxvZ2luRmFpbGVkKGVycm9yKTogQWNjb3VudEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjY291bnRBY3Rpb25zLkxPR0lOX0ZBSUxFRCxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiBudWxsLFxuICAgICAgZXJyb3JcbiAgICB9O1xuICB9XG5cbiAgYWNjb3VudFVwZGF0ZWQoYWNjb3VudDogUHViQWNjb3VudCk6IEFjY291bnRBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY2NvdW50QWN0aW9ucy5BQ0NPVU5UX1VQREFURUQsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogeyBhY2NvdW50IH1cbiAgICB9O1xuICB9XG5cbiAgLy8gUm9sZXMgb2YgdGhlIGFjY291bnQsIHVzZWQgdG8gY2hlY2sgcGVybWlzc2lvbnNcbiAgbG9hZFJvbGVzKGFjY291bnRJZDogbnVtYmVyKTogQWNjb3VudEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjY291bnRBY3Rpb25zLkxPQURfUk9MRVMsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogeyBhY2NvdW50SWQgfVxuICAgIH07XG4gIH1cblxuICBsb2FkUm9sZXNTdWNjZWVkZWQoYWNjb3VudFJvbGVzOiBBY2NvdW50Um9sZVtdKTogQWNjb3VudEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjY291bnRBY3Rpb25zLkxPQURfUk9MRVNfU1VDQ0VFREVELFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IHsgYWNjb3VudFJvbGVzIH1cbiAgICB9O1xuICB9XG5cbiAgbG9hZFJvbGVzRmFpbGVkKGFjY291bnRSb2xlczogQWNjb3VudFJvbGVbXSk6IEFjY291bnRBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY2NvdW50QWN0aW9ucy5MT0FEX1JPTEVTX0ZBSUxFRCxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiBudWxsXG4gICAgfTtcbiAgfVxuXG59XG4iXX0=