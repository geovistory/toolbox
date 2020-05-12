import { AccountActions, AccountAction } from './account.actions';
import { IAccount } from '../account.model';

const INITIAL_STATE: IAccount = {
  account: undefined,
  statements: undefined
};

const accountRootReducer = (lastState: IAccount = INITIAL_STATE, action: AccountAction): IAccount => {
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

export const createAccountReducer = () => {
  return accountRootReducer;
}
