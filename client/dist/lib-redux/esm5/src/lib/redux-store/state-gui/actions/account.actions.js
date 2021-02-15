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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtZ3VpL2FjdGlvbnMvYWNjb3VudC5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFLM0MsdUNBSUM7OztJQUhDLHNDQUFtQjs7SUFDbkIseUNBQTZCOztJQUM3QixvQ0FBcUI7O0FBQ3RCLENBQUM7QUFJRjtJQUFBO0tBeUVDOzs7O0lBMURDLDhCQUFLOzs7SUFBTDtRQUNFLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYyxDQUFDLEtBQUs7WUFDMUIsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUM7SUFDSixDQUFDOzs7OztJQUVELHVDQUFjOzs7O0lBQWQsVUFBZSxPQUFtQjtRQUNoQyxPQUFPO1lBQ0wsSUFBSSxFQUFFLGNBQWMsQ0FBQyxlQUFlO1lBQ3BDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLEVBQUUsT0FBTyxTQUFBLEVBQUU7U0FDbEIsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsb0NBQVc7Ozs7SUFBWCxVQUFZLEtBQUs7UUFDZixPQUFPO1lBQ0wsSUFBSSxFQUFFLGNBQWMsQ0FBQyxZQUFZO1lBQ2pDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLE9BQUE7U0FDTixDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCx1Q0FBYzs7OztJQUFkLFVBQWUsT0FBbUI7UUFDaEMsT0FBTztZQUNMLElBQUksRUFBRSxjQUFjLENBQUMsZUFBZTtZQUNwQyxPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFO1NBQ2xCLENBQUM7SUFDSixDQUFDO0lBRUQsa0RBQWtEOzs7Ozs7SUFDbEQsa0NBQVM7Ozs7OztJQUFULFVBQVUsU0FBaUI7UUFDekIsT0FBTztZQUNMLElBQUksRUFBRSxjQUFjLENBQUMsVUFBVTtZQUMvQixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxFQUFFLFNBQVMsV0FBQSxFQUFFO1NBQ3BCLENBQUM7SUFDSixDQUFDOzs7OztJQUVELDJDQUFrQjs7OztJQUFsQixVQUFtQixZQUEyQjtRQUM1QyxPQUFPO1lBQ0wsSUFBSSxFQUFFLGNBQWMsQ0FBQyxvQkFBb0I7WUFDekMsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsRUFBRSxZQUFZLGNBQUEsRUFBRTtTQUN2QixDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCx3Q0FBZTs7OztJQUFmLFVBQWdCLFlBQTJCO1FBQ3pDLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYyxDQUFDLGlCQUFpQjtZQUN0QyxPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQztJQUNKLENBQUM7SUFuRU0sb0JBQUssR0FBRyxnQkFBZ0IsQ0FBQztJQUN6Qiw4QkFBZSxHQUFHLDBCQUEwQixDQUFDO0lBQzdDLDJCQUFZLEdBQUcsdUJBQXVCLENBQUM7SUFFdkMseUJBQVUsR0FBRyxxQkFBcUIsQ0FBQztJQUNuQyxtQ0FBb0IsR0FBRywrQkFBK0IsQ0FBQztJQUN2RCxnQ0FBaUIsR0FBRyw0QkFBNEIsQ0FBQztJQUVqRCw4QkFBZSxHQUFHLDBCQUEwQixDQUFDOztnQkFackQsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7O3lCQWZEO0NBc0ZDLEFBekVELElBeUVDO1NBdEVZLGNBQWM7OztJQUN6QixxQkFBZ0M7O0lBQ2hDLCtCQUFvRDs7SUFDcEQsNEJBQThDOztJQUU5QywwQkFBMEM7O0lBQzFDLG9DQUE4RDs7SUFDOUQsaUNBQXdEOztJQUV4RCwrQkFBb0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQdWJBY2NvdW50IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IEFjY291bnRSb2xlLCBJQWNjb3VudCB9IGZyb20gJy4uL21vZGVscy9hY2NvdW50Lm1vZGVsJztcblxuZXhwb3J0IGludGVyZmFjZSBBY2NvdW50QWN0aW9uTWV0YSB7XG4gIGFjY291bnRJZD86IG51bWJlcjtcbiAgYWNjb3VudFJvbGVzPzogQWNjb3VudFJvbGVbXTtcbiAgYWNjb3VudD86IFB1YkFjY291bnQ7XG59O1xuZXhwb3J0IHR5cGUgQWNjb3VudEFjdGlvbiA9IEZsdXhTdGFuZGFyZEFjdGlvbjxJQWNjb3VudCwgQWNjb3VudEFjdGlvbk1ldGE+O1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFjY291bnRBY3Rpb25zIHtcbiAgc3RhdGljIExPR0lOID0gJ0FjY291bnQ6OkxPR0lOJztcbiAgc3RhdGljIExPR0lOX1NVQ0NFRURFRCA9ICdBY2NvdW50OjpMT0dJTl9TVUNDRUVERUQnO1xuICBzdGF0aWMgTE9HSU5fRkFJTEVEID0gJ0FjY291bnQ6OkxPR0lOX0ZBSUxFRCc7XG5cbiAgc3RhdGljIExPQURfUk9MRVMgPSAnQWNjb3VudDo6TE9BRF9ST0xFUyc7XG4gIHN0YXRpYyBMT0FEX1JPTEVTX1NVQ0NFRURFRCA9ICdBY2NvdW50OjpMT0FEX1JPTEVTX1NVQ0NFRURFRCc7XG4gIHN0YXRpYyBMT0FEX1JPTEVTX0ZBSUxFRCA9ICdBY2NvdW50OjpMT0FEX1JPTEVTX0ZBSUxFRCc7XG5cbiAgc3RhdGljIEFDQ09VTlRfVVBEQVRFRCA9ICdBY2NvdW50OjpBQ0NPVU5UX1VQREFURUQnO1xuXG5cbiAgbG9naW4oKTogQWNjb3VudEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjY291bnRBY3Rpb25zLkxPR0lOLFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IG51bGxcbiAgICB9O1xuICB9XG5cbiAgbG9naW5TdWNjZWVkZWQoYWNjb3VudDogUHViQWNjb3VudCk6IEFjY291bnRBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY2NvdW50QWN0aW9ucy5MT0dJTl9TVUNDRUVERUQsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogeyBhY2NvdW50IH1cbiAgICB9O1xuICB9XG5cbiAgbG9naW5GYWlsZWQoZXJyb3IpOiBBY2NvdW50QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWNjb3VudEFjdGlvbnMuTE9HSU5fRkFJTEVELFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IG51bGwsXG4gICAgICBlcnJvclxuICAgIH07XG4gIH1cblxuICBhY2NvdW50VXBkYXRlZChhY2NvdW50OiBQdWJBY2NvdW50KTogQWNjb3VudEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjY291bnRBY3Rpb25zLkFDQ09VTlRfVVBEQVRFRCxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiB7IGFjY291bnQgfVxuICAgIH07XG4gIH1cblxuICAvLyBSb2xlcyBvZiB0aGUgYWNjb3VudCwgdXNlZCB0byBjaGVjayBwZXJtaXNzaW9uc1xuICBsb2FkUm9sZXMoYWNjb3VudElkOiBudW1iZXIpOiBBY2NvdW50QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWNjb3VudEFjdGlvbnMuTE9BRF9ST0xFUyxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiB7IGFjY291bnRJZCB9XG4gICAgfTtcbiAgfVxuXG4gIGxvYWRSb2xlc1N1Y2NlZWRlZChhY2NvdW50Um9sZXM6IEFjY291bnRSb2xlW10pOiBBY2NvdW50QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWNjb3VudEFjdGlvbnMuTE9BRF9ST0xFU19TVUNDRUVERUQsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogeyBhY2NvdW50Um9sZXMgfVxuICAgIH07XG4gIH1cblxuICBsb2FkUm9sZXNGYWlsZWQoYWNjb3VudFJvbGVzOiBBY2NvdW50Um9sZVtdKTogQWNjb3VudEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjY291bnRBY3Rpb25zLkxPQURfUk9MRVNfRkFJTEVELFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IG51bGxcbiAgICB9O1xuICB9XG5cbn1cbiJdfQ==