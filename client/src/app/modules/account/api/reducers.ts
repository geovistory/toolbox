import { AccountActions, AccountAction } from "./actions";
import { IAccount } from "../account.model";

const INITIAL_STATE: IAccount = {
  record: undefined,
};

const accountRootReducer = (lastState: IAccount = INITIAL_STATE, action: AccountAction): IAccount => {
  switch (action.type) {
    case AccountActions.LOGIN_SUCCEEDED: return {
      ...lastState, record: action.payload
    };
  }
  switch (action.type) {
    case AccountActions.ACCOUNT_UPDATED: return {
      ...lastState, record: action.payload
    };
  }


  return lastState;
}

export const createAccountReducer = () => {
  return accountRootReducer;
}