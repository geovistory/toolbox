import { PubAccount } from '@kleiolab/lib-sdk-lb4';
import { FluxStandardAction } from 'flux-standard-action';
import { AccountRole, IAccount } from '../models';
export interface AccountActionMeta {
    accountId?: number;
    accountRoles?: AccountRole[];
    account?: PubAccount;
}
export declare type AccountAction = FluxStandardAction<IAccount, AccountActionMeta>;
export declare class AccountActions {
    static LOGIN: string;
    static LOGIN_SUCCEEDED: string;
    static LOGIN_FAILED: string;
    static LOAD_ROLES: string;
    static LOAD_ROLES_SUCCEEDED: string;
    static LOAD_ROLES_FAILED: string;
    static ACCOUNT_UPDATED: string;
    login(): AccountAction;
    loginSucceeded(account: PubAccount): AccountAction;
    loginFailed(error: any): AccountAction;
    accountUpdated(account: PubAccount): AccountAction;
    loadRoles(accountId: number): AccountAction;
    loadRolesSucceeded(accountRoles: AccountRole[]): AccountAction;
    loadRolesFailed(accountRoles: AccountRole[]): AccountAction;
}
