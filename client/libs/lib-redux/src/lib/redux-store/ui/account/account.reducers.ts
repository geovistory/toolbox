import { AccountAction, AccountActions } from './account.actions';
import { AccountState } from './account.model';


export const initialAccountState: AccountState = {
  account: undefined,
  roles: []
};

export const accountReducer = (lastState: AccountState = initialAccountState, action: AccountAction): AccountState => {
  switch (action.type) {
    case AccountActions.LOGIN_SUCCEEDED:
      lastState = {
        ...lastState,
        account: action.meta.account
      };
      break;

    case AccountActions.ACCOUNT_UPDATED:
      lastState = {
        ...lastState,
        account: action.meta.account
      };
      break;

    case AccountActions.LOAD_ROLES_SUCCEEDED:
      lastState = {
        ...lastState,
        roles: action.meta.accountRoles
      };
      break;

    case AccountActions.LOAD_ROLES_FAILED:
      lastState = {
        ...lastState,
        roles: []
      };
      break;



  }
  return lastState;
}

