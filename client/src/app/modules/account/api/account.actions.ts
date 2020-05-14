import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { AccountRole, IAccount } from '../account.model';
import { PubAccount } from 'app/core';

interface MetaData {
    accountId?: number;
    accountRoles?: AccountRole[];
    account?: PubAccount;
};
export type AccountAction = FluxStandardAction<IAccount, MetaData>;


@Injectable()
export class AccountActions {
    static LOGIN = 'Account::LOGIN';
    static LOGIN_SUCCEEDED = 'Account::LOGIN_SUCCEEDED';
    static LOGIN_FAILED = 'Account::LOGIN_FAILED';

    static LOAD_ROLES = 'Account::LOAD_ROLES';
    static LOAD_ROLES_SUCCEEDED = 'Account::LOAD_ROLES_SUCCEEDED';
    static LOAD_ROLES_FAILED = 'Account::LOAD_ROLES_FAILED';

    static ACCOUNT_UPDATED = 'Account::ACCOUNT_UPDATED';


    login(): AccountAction {
        return {
            type: AccountActions.LOGIN,
            payload: null,
            meta: null
        };
    }

    loginSucceeded(account: PubAccount): AccountAction {
        return {
            type: AccountActions.LOGIN_SUCCEEDED,
            payload: null,
            meta: { account }
        };
    }

    loginFailed(error): AccountAction {
        return {
            type: AccountActions.LOGIN_FAILED,
            payload: null,
            meta: null,
            error
        };
    }

    accountUpdated(account: PubAccount): AccountAction {
        return {
            type: AccountActions.ACCOUNT_UPDATED,
            payload: null,
            meta: { account }
        };
    }

    // Roles of the account, used to check permissions
    loadRoles(accountId: number): AccountAction {
        return {
            type: AccountActions.LOAD_ROLES,
            payload: null,
            meta: { accountId }
        };
    }

    loadRolesSucceeded(accountRoles: AccountRole[]): AccountAction {
        return {
            type: AccountActions.LOAD_ROLES_SUCCEEDED,
            payload: null,
            meta: { accountRoles }
        };
    }

    loadRolesFailed(accountRoles: AccountRole[]): AccountAction {
        return {
            type: AccountActions.LOAD_ROLES_FAILED,
            payload: null,
            meta: null
        };
    }

}
