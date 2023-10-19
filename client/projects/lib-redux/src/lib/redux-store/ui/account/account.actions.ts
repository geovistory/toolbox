import { PubAccount, PubRole } from '@kleiolab/lib-sdk-lb4';
import { FluxStandardAction } from 'flux-standard-action';
import { AccountState } from './account.model';

export interface AccountActionMeta {
  accountId?: number;
  accountRoles?: PubRole[];
  account?: PubAccount;
};
export type AccountAction = FluxStandardAction<AccountState, AccountActionMeta>;

export class AccountActions {
  static LOGIN = 'Account::LOGIN';
  static LOGIN_SUCCEEDED = 'Account::LOGIN_SUCCEEDED';
  static LOGIN_FAILED = 'Account::LOGIN_FAILED';

  static LOAD_ROLES = 'Account::LOAD_ROLES';
  static LOAD_ROLES_SUCCEEDED = 'Account::LOAD_ROLES_SUCCEEDED';
  static LOAD_ROLES_FAILED = 'Account::LOAD_ROLES_FAILED';

  static ACCOUNT_UPDATED = 'Account::ACCOUNT_UPDATED';


  static login(): AccountAction {
    return {
      type: AccountActions.LOGIN,
      payload: null,
      meta: null
    };
  }

  static loginSucceeded(account: PubAccount): AccountAction {
    return {
      type: AccountActions.LOGIN_SUCCEEDED,
      payload: null,
      meta: { account }
    };
  }

  static loginFailed(error): AccountAction {
    return {
      type: AccountActions.LOGIN_FAILED,
      payload: null,
      meta: null,
      error
    };
  }

  static accountUpdated(account: PubAccount): AccountAction {
    return {
      type: AccountActions.ACCOUNT_UPDATED,
      payload: null,
      meta: { account }
    };
  }

  // Roles of the account, used to check permissions
  static loadRoles(accountId: number): AccountAction {
    return {
      type: AccountActions.LOAD_ROLES,
      payload: null,
      meta: { accountId }
    };
  }

  static loadRolesSucceeded(accountRoles: PubRole[]): AccountAction {
    return {
      type: AccountActions.LOAD_ROLES_SUCCEEDED,
      payload: null,
      meta: { accountRoles }
    };
  }

  static loadRolesFailed(): AccountAction {
    return {
      type: AccountActions.LOAD_ROLES_FAILED,
      payload: null,
      meta: null
    };
  }

}
