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
        { type: Injectable }
    ];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtZ3VpL2FjdGlvbnMvYWNjb3VudC5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUszQyx1Q0FJQzs7O0lBSEMsc0NBQW1COztJQUNuQix5Q0FBNkI7O0lBQzdCLG9DQUFxQjs7QUFDdEIsQ0FBQztBQUlGO0lBQUE7SUF1RUEsQ0FBQzs7OztJQTFEQyw4QkFBSzs7O0lBQUw7UUFDRSxPQUFPO1lBQ0wsSUFBSSxFQUFFLGNBQWMsQ0FBQyxLQUFLO1lBQzFCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCx1Q0FBYzs7OztJQUFkLFVBQWUsT0FBbUI7UUFDaEMsT0FBTztZQUNMLElBQUksRUFBRSxjQUFjLENBQUMsZUFBZTtZQUNwQyxPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFO1NBQ2xCLENBQUM7SUFDSixDQUFDOzs7OztJQUVELG9DQUFXOzs7O0lBQVgsVUFBWSxLQUFLO1FBQ2YsT0FBTztZQUNMLElBQUksRUFBRSxjQUFjLENBQUMsWUFBWTtZQUNqQyxPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxPQUFBO1NBQ04sQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsdUNBQWM7Ozs7SUFBZCxVQUFlLE9BQW1CO1FBQ2hDLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYyxDQUFDLGVBQWU7WUFDcEMsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsRUFBRSxPQUFPLFNBQUEsRUFBRTtTQUNsQixDQUFDO0lBQ0osQ0FBQztJQUVELGtEQUFrRDs7Ozs7O0lBQ2xELGtDQUFTOzs7Ozs7SUFBVCxVQUFVLFNBQWlCO1FBQ3pCLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYyxDQUFDLFVBQVU7WUFDL0IsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsRUFBRSxTQUFTLFdBQUEsRUFBRTtTQUNwQixDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCwyQ0FBa0I7Ozs7SUFBbEIsVUFBbUIsWUFBMkI7UUFDNUMsT0FBTztZQUNMLElBQUksRUFBRSxjQUFjLENBQUMsb0JBQW9CO1lBQ3pDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLEVBQUUsWUFBWSxjQUFBLEVBQUU7U0FDdkIsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsd0NBQWU7Ozs7SUFBZixVQUFnQixZQUEyQjtRQUN6QyxPQUFPO1lBQ0wsSUFBSSxFQUFFLGNBQWMsQ0FBQyxpQkFBaUI7WUFDdEMsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUM7SUFDSixDQUFDO0lBbkVNLG9CQUFLLEdBQUcsZ0JBQWdCLENBQUM7SUFDekIsOEJBQWUsR0FBRywwQkFBMEIsQ0FBQztJQUM3QywyQkFBWSxHQUFHLHVCQUF1QixDQUFDO0lBRXZDLHlCQUFVLEdBQUcscUJBQXFCLENBQUM7SUFDbkMsbUNBQW9CLEdBQUcsK0JBQStCLENBQUM7SUFDdkQsZ0NBQWlCLEdBQUcsNEJBQTRCLENBQUM7SUFFakQsOEJBQWUsR0FBRywwQkFBMEIsQ0FBQzs7Z0JBVnJELFVBQVU7O0lBdUVYLHFCQUFDO0NBQUEsQUF2RUQsSUF1RUM7U0F0RVksY0FBYzs7O0lBQ3pCLHFCQUFnQzs7SUFDaEMsK0JBQW9EOztJQUNwRCw0QkFBOEM7O0lBRTlDLDBCQUEwQzs7SUFDMUMsb0NBQThEOztJQUM5RCxpQ0FBd0Q7O0lBRXhELCtCQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFB1YkFjY291bnQgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgQWNjb3VudFJvbGUsIElBY2NvdW50IH0gZnJvbSAnLi4vbW9kZWxzL2FjY291bnQubW9kZWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFjY291bnRBY3Rpb25NZXRhIHtcbiAgYWNjb3VudElkPzogbnVtYmVyO1xuICBhY2NvdW50Um9sZXM/OiBBY2NvdW50Um9sZVtdO1xuICBhY2NvdW50PzogUHViQWNjb3VudDtcbn07XG5leHBvcnQgdHlwZSBBY2NvdW50QWN0aW9uID0gRmx1eFN0YW5kYXJkQWN0aW9uPElBY2NvdW50LCBBY2NvdW50QWN0aW9uTWV0YT47XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFjY291bnRBY3Rpb25zIHtcbiAgc3RhdGljIExPR0lOID0gJ0FjY291bnQ6OkxPR0lOJztcbiAgc3RhdGljIExPR0lOX1NVQ0NFRURFRCA9ICdBY2NvdW50OjpMT0dJTl9TVUNDRUVERUQnO1xuICBzdGF0aWMgTE9HSU5fRkFJTEVEID0gJ0FjY291bnQ6OkxPR0lOX0ZBSUxFRCc7XG5cbiAgc3RhdGljIExPQURfUk9MRVMgPSAnQWNjb3VudDo6TE9BRF9ST0xFUyc7XG4gIHN0YXRpYyBMT0FEX1JPTEVTX1NVQ0NFRURFRCA9ICdBY2NvdW50OjpMT0FEX1JPTEVTX1NVQ0NFRURFRCc7XG4gIHN0YXRpYyBMT0FEX1JPTEVTX0ZBSUxFRCA9ICdBY2NvdW50OjpMT0FEX1JPTEVTX0ZBSUxFRCc7XG5cbiAgc3RhdGljIEFDQ09VTlRfVVBEQVRFRCA9ICdBY2NvdW50OjpBQ0NPVU5UX1VQREFURUQnO1xuXG5cbiAgbG9naW4oKTogQWNjb3VudEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjY291bnRBY3Rpb25zLkxPR0lOLFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IG51bGxcbiAgICB9O1xuICB9XG5cbiAgbG9naW5TdWNjZWVkZWQoYWNjb3VudDogUHViQWNjb3VudCk6IEFjY291bnRBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY2NvdW50QWN0aW9ucy5MT0dJTl9TVUNDRUVERUQsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogeyBhY2NvdW50IH1cbiAgICB9O1xuICB9XG5cbiAgbG9naW5GYWlsZWQoZXJyb3IpOiBBY2NvdW50QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWNjb3VudEFjdGlvbnMuTE9HSU5fRkFJTEVELFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IG51bGwsXG4gICAgICBlcnJvclxuICAgIH07XG4gIH1cblxuICBhY2NvdW50VXBkYXRlZChhY2NvdW50OiBQdWJBY2NvdW50KTogQWNjb3VudEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjY291bnRBY3Rpb25zLkFDQ09VTlRfVVBEQVRFRCxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiB7IGFjY291bnQgfVxuICAgIH07XG4gIH1cblxuICAvLyBSb2xlcyBvZiB0aGUgYWNjb3VudCwgdXNlZCB0byBjaGVjayBwZXJtaXNzaW9uc1xuICBsb2FkUm9sZXMoYWNjb3VudElkOiBudW1iZXIpOiBBY2NvdW50QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWNjb3VudEFjdGlvbnMuTE9BRF9ST0xFUyxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiB7IGFjY291bnRJZCB9XG4gICAgfTtcbiAgfVxuXG4gIGxvYWRSb2xlc1N1Y2NlZWRlZChhY2NvdW50Um9sZXM6IEFjY291bnRSb2xlW10pOiBBY2NvdW50QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWNjb3VudEFjdGlvbnMuTE9BRF9ST0xFU19TVUNDRUVERUQsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogeyBhY2NvdW50Um9sZXMgfVxuICAgIH07XG4gIH1cblxuICBsb2FkUm9sZXNGYWlsZWQoYWNjb3VudFJvbGVzOiBBY2NvdW50Um9sZVtdKTogQWNjb3VudEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjY291bnRBY3Rpb25zLkxPQURfUk9MRVNfRkFJTEVELFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IG51bGxcbiAgICB9O1xuICB9XG5cbn1cbiJdfQ==