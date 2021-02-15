/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/actions/account.actions.ts
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
var AccountActions = /** @class */ (function () {
    function AccountActions() {
    }
    /**
     * @return {?}
     */
    AccountActions.prototype.login = /**
     * @return {?}
     */
    function () {
        return {
            type: AccountActions.LOGIN,
            payload: null,
            meta: null
        };
    };
    /**
     * @param {?} account
     * @return {?}
     */
    AccountActions.prototype.loginSucceeded = /**
     * @param {?} account
     * @return {?}
     */
    function (account) {
        return {
            type: AccountActions.LOGIN_SUCCEEDED,
            payload: null,
            meta: { account: account }
        };
    };
    /**
     * @param {?} error
     * @return {?}
     */
    AccountActions.prototype.loginFailed = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        return {
            type: AccountActions.LOGIN_FAILED,
            payload: null,
            meta: null,
            error: error
        };
    };
    /**
     * @param {?} account
     * @return {?}
     */
    AccountActions.prototype.accountUpdated = /**
     * @param {?} account
     * @return {?}
     */
    function (account) {
        return {
            type: AccountActions.ACCOUNT_UPDATED,
            payload: null,
            meta: { account: account }
        };
    };
    // Roles of the account, used to check permissions
    // Roles of the account, used to check permissions
    /**
     * @param {?} accountId
     * @return {?}
     */
    AccountActions.prototype.loadRoles = 
    // Roles of the account, used to check permissions
    /**
     * @param {?} accountId
     * @return {?}
     */
    function (accountId) {
        return {
            type: AccountActions.LOAD_ROLES,
            payload: null,
            meta: { accountId: accountId }
        };
    };
    /**
     * @param {?} accountRoles
     * @return {?}
     */
    AccountActions.prototype.loadRolesSucceeded = /**
     * @param {?} accountRoles
     * @return {?}
     */
    function (accountRoles) {
        return {
            type: AccountActions.LOAD_ROLES_SUCCEEDED,
            payload: null,
            meta: { accountRoles: accountRoles }
        };
    };
    /**
     * @param {?} accountRoles
     * @return {?}
     */
    AccountActions.prototype.loadRolesFailed = /**
     * @param {?} accountRoles
     * @return {?}
     */
    function (accountRoles) {
        return {
            type: AccountActions.LOAD_ROLES_FAILED,
            payload: null,
            meta: null
        };
    };
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
    return AccountActions;
}());
export { AccountActions };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1ndWkvYWN0aW9ucy9hY2NvdW50LmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQUszQyx1Q0FJQzs7O0lBSEMsc0NBQW1COztJQUNuQix5Q0FBNkI7O0lBQzdCLG9DQUFxQjs7QUFDdEIsQ0FBQztBQUlGO0lBQUE7S0F5RUM7Ozs7SUExREMsOEJBQUs7OztJQUFMO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSxjQUFjLENBQUMsS0FBSztZQUMxQixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsdUNBQWM7Ozs7SUFBZCxVQUFlLE9BQW1CO1FBQ2hDLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYyxDQUFDLGVBQWU7WUFDcEMsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsRUFBRSxPQUFPLFNBQUEsRUFBRTtTQUNsQixDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCxvQ0FBVzs7OztJQUFYLFVBQVksS0FBSztRQUNmLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYyxDQUFDLFlBQVk7WUFDakMsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssT0FBQTtTQUNOLENBQUM7SUFDSixDQUFDOzs7OztJQUVELHVDQUFjOzs7O0lBQWQsVUFBZSxPQUFtQjtRQUNoQyxPQUFPO1lBQ0wsSUFBSSxFQUFFLGNBQWMsQ0FBQyxlQUFlO1lBQ3BDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLEVBQUUsT0FBTyxTQUFBLEVBQUU7U0FDbEIsQ0FBQztJQUNKLENBQUM7SUFFRCxrREFBa0Q7Ozs7OztJQUNsRCxrQ0FBUzs7Ozs7O0lBQVQsVUFBVSxTQUFpQjtRQUN6QixPQUFPO1lBQ0wsSUFBSSxFQUFFLGNBQWMsQ0FBQyxVQUFVO1lBQy9CLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLEVBQUUsU0FBUyxXQUFBLEVBQUU7U0FDcEIsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsMkNBQWtCOzs7O0lBQWxCLFVBQW1CLFlBQTJCO1FBQzVDLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYyxDQUFDLG9CQUFvQjtZQUN6QyxPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxFQUFFLFlBQVksY0FBQSxFQUFFO1NBQ3ZCLENBQUM7SUFDSixDQUFDOzs7OztJQUVELHdDQUFlOzs7O0lBQWYsVUFBZ0IsWUFBMkI7UUFDekMsT0FBTztZQUNMLElBQUksRUFBRSxjQUFjLENBQUMsaUJBQWlCO1lBQ3RDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDO0lBQ0osQ0FBQztJQW5FTSxvQkFBSyxHQUFHLGdCQUFnQixDQUFDO0lBQ3pCLDhCQUFlLEdBQUcsMEJBQTBCLENBQUM7SUFDN0MsMkJBQVksR0FBRyx1QkFBdUIsQ0FBQztJQUV2Qyx5QkFBVSxHQUFHLHFCQUFxQixDQUFDO0lBQ25DLG1DQUFvQixHQUFHLCtCQUErQixDQUFDO0lBQ3ZELGdDQUFpQixHQUFHLDRCQUE0QixDQUFDO0lBRWpELDhCQUFlLEdBQUcsMEJBQTBCLENBQUM7O2dCQVpyRCxVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7eUJBZkQ7Q0FzRkMsQUF6RUQsSUF5RUM7U0F0RVksY0FBYzs7O0lBQ3pCLHFCQUFnQzs7SUFDaEMsK0JBQW9EOztJQUNwRCw0QkFBOEM7O0lBRTlDLDBCQUEwQzs7SUFDMUMsb0NBQThEOztJQUM5RCxpQ0FBd0Q7O0lBRXhELCtCQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB1YkFjY291bnQgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgQWNjb3VudFJvbGUsIElBY2NvdW50IH0gZnJvbSAnLi4vbW9kZWxzL2FjY291bnQubW9kZWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFjY291bnRBY3Rpb25NZXRhIHtcbiAgYWNjb3VudElkPzogbnVtYmVyO1xuICBhY2NvdW50Um9sZXM/OiBBY2NvdW50Um9sZVtdO1xuICBhY2NvdW50PzogUHViQWNjb3VudDtcbn07XG5leHBvcnQgdHlwZSBBY2NvdW50QWN0aW9uID0gRmx1eFN0YW5kYXJkQWN0aW9uPElBY2NvdW50LCBBY2NvdW50QWN0aW9uTWV0YT47XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQWNjb3VudEFjdGlvbnMge1xuICBzdGF0aWMgTE9HSU4gPSAnQWNjb3VudDo6TE9HSU4nO1xuICBzdGF0aWMgTE9HSU5fU1VDQ0VFREVEID0gJ0FjY291bnQ6OkxPR0lOX1NVQ0NFRURFRCc7XG4gIHN0YXRpYyBMT0dJTl9GQUlMRUQgPSAnQWNjb3VudDo6TE9HSU5fRkFJTEVEJztcblxuICBzdGF0aWMgTE9BRF9ST0xFUyA9ICdBY2NvdW50OjpMT0FEX1JPTEVTJztcbiAgc3RhdGljIExPQURfUk9MRVNfU1VDQ0VFREVEID0gJ0FjY291bnQ6OkxPQURfUk9MRVNfU1VDQ0VFREVEJztcbiAgc3RhdGljIExPQURfUk9MRVNfRkFJTEVEID0gJ0FjY291bnQ6OkxPQURfUk9MRVNfRkFJTEVEJztcblxuICBzdGF0aWMgQUNDT1VOVF9VUERBVEVEID0gJ0FjY291bnQ6OkFDQ09VTlRfVVBEQVRFRCc7XG5cblxuICBsb2dpbigpOiBBY2NvdW50QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWNjb3VudEFjdGlvbnMuTE9HSU4sXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogbnVsbFxuICAgIH07XG4gIH1cblxuICBsb2dpblN1Y2NlZWRlZChhY2NvdW50OiBQdWJBY2NvdW50KTogQWNjb3VudEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjY291bnRBY3Rpb25zLkxPR0lOX1NVQ0NFRURFRCxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiB7IGFjY291bnQgfVxuICAgIH07XG4gIH1cblxuICBsb2dpbkZhaWxlZChlcnJvcik6IEFjY291bnRBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY2NvdW50QWN0aW9ucy5MT0dJTl9GQUlMRUQsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogbnVsbCxcbiAgICAgIGVycm9yXG4gICAgfTtcbiAgfVxuXG4gIGFjY291bnRVcGRhdGVkKGFjY291bnQ6IFB1YkFjY291bnQpOiBBY2NvdW50QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWNjb3VudEFjdGlvbnMuQUNDT1VOVF9VUERBVEVELFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IHsgYWNjb3VudCB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIFJvbGVzIG9mIHRoZSBhY2NvdW50LCB1c2VkIHRvIGNoZWNrIHBlcm1pc3Npb25zXG4gIGxvYWRSb2xlcyhhY2NvdW50SWQ6IG51bWJlcik6IEFjY291bnRBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY2NvdW50QWN0aW9ucy5MT0FEX1JPTEVTLFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IHsgYWNjb3VudElkIH1cbiAgICB9O1xuICB9XG5cbiAgbG9hZFJvbGVzU3VjY2VlZGVkKGFjY291bnRSb2xlczogQWNjb3VudFJvbGVbXSk6IEFjY291bnRBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY2NvdW50QWN0aW9ucy5MT0FEX1JPTEVTX1NVQ0NFRURFRCxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiB7IGFjY291bnRSb2xlcyB9XG4gICAgfTtcbiAgfVxuXG4gIGxvYWRSb2xlc0ZhaWxlZChhY2NvdW50Um9sZXM6IEFjY291bnRSb2xlW10pOiBBY2NvdW50QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWNjb3VudEFjdGlvbnMuTE9BRF9ST0xFU19GQUlMRUQsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogbnVsbFxuICAgIH07XG4gIH1cblxufVxuIl19