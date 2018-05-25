import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Account } from 'app/core';

interface MetaData { };
export type AccountAction = FluxStandardAction<Account, MetaData>;


@Injectable()
export class AccountActions {
    static LOGIN = 'LOGIN';
    static LOGIN_STARTED = 'LOGIN_STARTED';
    static LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
    static LOGIN_FAILED = 'LOGIN_FAILED';

    static ACCOUNT_UPDATED = 'ACCOUNT_UPDATED';


    login(): AccountAction {
        return {
            type: AccountActions.LOGIN,
            payload: null,
            meta: null
        };
    }

    loginStarted(): AccountAction {
        return {
            type: AccountActions.LOGIN_STARTED,
            payload: null,
            meta: null
        };
    }

    loginSucceeded(payload: Account): AccountAction {
        return {
            type: AccountActions.LOGIN_SUCCEEDED,
            payload,
            meta: null
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

    accountUpdated(payload: Account): AccountAction {
        return {
            type: AccountActions.ACCOUNT_UPDATED,
            payload,
            meta: null
        };
    }

}