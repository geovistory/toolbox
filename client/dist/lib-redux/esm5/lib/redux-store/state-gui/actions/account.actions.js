/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/actions/account.actions.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1ndWkvYWN0aW9ucy9hY2NvdW50LmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBSzNDLHVDQUlDOzs7SUFIQyxzQ0FBbUI7O0lBQ25CLHlDQUE2Qjs7SUFDN0Isb0NBQXFCOztBQUN0QixDQUFDO0FBSUY7SUFBQTtJQXVFQSxDQUFDOzs7O0lBMURDLDhCQUFLOzs7SUFBTDtRQUNFLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYyxDQUFDLEtBQUs7WUFDMUIsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUM7SUFDSixDQUFDOzs7OztJQUVELHVDQUFjOzs7O0lBQWQsVUFBZSxPQUFtQjtRQUNoQyxPQUFPO1lBQ0wsSUFBSSxFQUFFLGNBQWMsQ0FBQyxlQUFlO1lBQ3BDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLEVBQUUsT0FBTyxTQUFBLEVBQUU7U0FDbEIsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsb0NBQVc7Ozs7SUFBWCxVQUFZLEtBQUs7UUFDZixPQUFPO1lBQ0wsSUFBSSxFQUFFLGNBQWMsQ0FBQyxZQUFZO1lBQ2pDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLE9BQUE7U0FDTixDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCx1Q0FBYzs7OztJQUFkLFVBQWUsT0FBbUI7UUFDaEMsT0FBTztZQUNMLElBQUksRUFBRSxjQUFjLENBQUMsZUFBZTtZQUNwQyxPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFO1NBQ2xCLENBQUM7SUFDSixDQUFDO0lBRUQsa0RBQWtEOzs7Ozs7SUFDbEQsa0NBQVM7Ozs7OztJQUFULFVBQVUsU0FBaUI7UUFDekIsT0FBTztZQUNMLElBQUksRUFBRSxjQUFjLENBQUMsVUFBVTtZQUMvQixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxFQUFFLFNBQVMsV0FBQSxFQUFFO1NBQ3BCLENBQUM7SUFDSixDQUFDOzs7OztJQUVELDJDQUFrQjs7OztJQUFsQixVQUFtQixZQUEyQjtRQUM1QyxPQUFPO1lBQ0wsSUFBSSxFQUFFLGNBQWMsQ0FBQyxvQkFBb0I7WUFDekMsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsRUFBRSxZQUFZLGNBQUEsRUFBRTtTQUN2QixDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCx3Q0FBZTs7OztJQUFmLFVBQWdCLFlBQTJCO1FBQ3pDLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYyxDQUFDLGlCQUFpQjtZQUN0QyxPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQztJQUNKLENBQUM7SUFuRU0sb0JBQUssR0FBRyxnQkFBZ0IsQ0FBQztJQUN6Qiw4QkFBZSxHQUFHLDBCQUEwQixDQUFDO0lBQzdDLDJCQUFZLEdBQUcsdUJBQXVCLENBQUM7SUFFdkMseUJBQVUsR0FBRyxxQkFBcUIsQ0FBQztJQUNuQyxtQ0FBb0IsR0FBRywrQkFBK0IsQ0FBQztJQUN2RCxnQ0FBaUIsR0FBRyw0QkFBNEIsQ0FBQztJQUVqRCw4QkFBZSxHQUFHLDBCQUEwQixDQUFDOztnQkFWckQsVUFBVTs7SUF1RVgscUJBQUM7Q0FBQSxBQXZFRCxJQXVFQztTQXRFWSxjQUFjOzs7SUFDekIscUJBQWdDOztJQUNoQywrQkFBb0Q7O0lBQ3BELDRCQUE4Qzs7SUFFOUMsMEJBQTBDOztJQUMxQyxvQ0FBOEQ7O0lBQzlELGlDQUF3RDs7SUFFeEQsK0JBQW9EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHViQWNjb3VudCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBBY2NvdW50Um9sZSwgSUFjY291bnQgfSBmcm9tICcuLi9tb2RlbHMvYWNjb3VudC5tb2RlbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWNjb3VudEFjdGlvbk1ldGEge1xuICBhY2NvdW50SWQ/OiBudW1iZXI7XG4gIGFjY291bnRSb2xlcz86IEFjY291bnRSb2xlW107XG4gIGFjY291bnQ/OiBQdWJBY2NvdW50O1xufTtcbmV4cG9ydCB0eXBlIEFjY291bnRBY3Rpb24gPSBGbHV4U3RhbmRhcmRBY3Rpb248SUFjY291bnQsIEFjY291bnRBY3Rpb25NZXRhPjtcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWNjb3VudEFjdGlvbnMge1xuICBzdGF0aWMgTE9HSU4gPSAnQWNjb3VudDo6TE9HSU4nO1xuICBzdGF0aWMgTE9HSU5fU1VDQ0VFREVEID0gJ0FjY291bnQ6OkxPR0lOX1NVQ0NFRURFRCc7XG4gIHN0YXRpYyBMT0dJTl9GQUlMRUQgPSAnQWNjb3VudDo6TE9HSU5fRkFJTEVEJztcblxuICBzdGF0aWMgTE9BRF9ST0xFUyA9ICdBY2NvdW50OjpMT0FEX1JPTEVTJztcbiAgc3RhdGljIExPQURfUk9MRVNfU1VDQ0VFREVEID0gJ0FjY291bnQ6OkxPQURfUk9MRVNfU1VDQ0VFREVEJztcbiAgc3RhdGljIExPQURfUk9MRVNfRkFJTEVEID0gJ0FjY291bnQ6OkxPQURfUk9MRVNfRkFJTEVEJztcblxuICBzdGF0aWMgQUNDT1VOVF9VUERBVEVEID0gJ0FjY291bnQ6OkFDQ09VTlRfVVBEQVRFRCc7XG5cblxuICBsb2dpbigpOiBBY2NvdW50QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWNjb3VudEFjdGlvbnMuTE9HSU4sXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogbnVsbFxuICAgIH07XG4gIH1cblxuICBsb2dpblN1Y2NlZWRlZChhY2NvdW50OiBQdWJBY2NvdW50KTogQWNjb3VudEFjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFjY291bnRBY3Rpb25zLkxPR0lOX1NVQ0NFRURFRCxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiB7IGFjY291bnQgfVxuICAgIH07XG4gIH1cblxuICBsb2dpbkZhaWxlZChlcnJvcik6IEFjY291bnRBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY2NvdW50QWN0aW9ucy5MT0dJTl9GQUlMRUQsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogbnVsbCxcbiAgICAgIGVycm9yXG4gICAgfTtcbiAgfVxuXG4gIGFjY291bnRVcGRhdGVkKGFjY291bnQ6IFB1YkFjY291bnQpOiBBY2NvdW50QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWNjb3VudEFjdGlvbnMuQUNDT1VOVF9VUERBVEVELFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IHsgYWNjb3VudCB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIFJvbGVzIG9mIHRoZSBhY2NvdW50LCB1c2VkIHRvIGNoZWNrIHBlcm1pc3Npb25zXG4gIGxvYWRSb2xlcyhhY2NvdW50SWQ6IG51bWJlcik6IEFjY291bnRBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY2NvdW50QWN0aW9ucy5MT0FEX1JPTEVTLFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIG1ldGE6IHsgYWNjb3VudElkIH1cbiAgICB9O1xuICB9XG5cbiAgbG9hZFJvbGVzU3VjY2VlZGVkKGFjY291bnRSb2xlczogQWNjb3VudFJvbGVbXSk6IEFjY291bnRBY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBY2NvdW50QWN0aW9ucy5MT0FEX1JPTEVTX1NVQ0NFRURFRCxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICBtZXRhOiB7IGFjY291bnRSb2xlcyB9XG4gICAgfTtcbiAgfVxuXG4gIGxvYWRSb2xlc0ZhaWxlZChhY2NvdW50Um9sZXM6IEFjY291bnRSb2xlW10pOiBBY2NvdW50QWN0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQWNjb3VudEFjdGlvbnMuTE9BRF9ST0xFU19GQUlMRUQsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgbWV0YTogbnVsbFxuICAgIH07XG4gIH1cblxufVxuIl19