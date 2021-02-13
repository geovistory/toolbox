var AccountActions_1;
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
;
let AccountActions = AccountActions_1 = class AccountActions {
    login() {
        return {
            type: AccountActions_1.LOGIN,
            payload: null,
            meta: null
        };
    }
    loginSucceeded(account) {
        return {
            type: AccountActions_1.LOGIN_SUCCEEDED,
            payload: null,
            meta: { account }
        };
    }
    loginFailed(error) {
        return {
            type: AccountActions_1.LOGIN_FAILED,
            payload: null,
            meta: null,
            error
        };
    }
    accountUpdated(account) {
        return {
            type: AccountActions_1.ACCOUNT_UPDATED,
            payload: null,
            meta: { account }
        };
    }
    // Roles of the account, used to check permissions
    loadRoles(accountId) {
        return {
            type: AccountActions_1.LOAD_ROLES,
            payload: null,
            meta: { accountId }
        };
    }
    loadRolesSucceeded(accountRoles) {
        return {
            type: AccountActions_1.LOAD_ROLES_SUCCEEDED,
            payload: null,
            meta: { accountRoles }
        };
    }
    loadRolesFailed(accountRoles) {
        return {
            type: AccountActions_1.LOAD_ROLES_FAILED,
            payload: null,
            meta: null
        };
    }
};
AccountActions.LOGIN = 'Account::LOGIN';
AccountActions.LOGIN_SUCCEEDED = 'Account::LOGIN_SUCCEEDED';
AccountActions.LOGIN_FAILED = 'Account::LOGIN_FAILED';
AccountActions.LOAD_ROLES = 'Account::LOAD_ROLES';
AccountActions.LOAD_ROLES_SUCCEEDED = 'Account::LOAD_ROLES_SUCCEEDED';
AccountActions.LOAD_ROLES_FAILED = 'Account::LOAD_ROLES_FAILED';
AccountActions.ACCOUNT_UPDATED = 'Account::ACCOUNT_UPDATED';
AccountActions = AccountActions_1 = tslib_1.__decorate([
    Injectable()
], AccountActions);
export { AccountActions };
//# sourceMappingURL=account.actions.js.map