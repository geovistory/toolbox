import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { AccountList } from './account-list.models';
import { AccountListAPIAction, AccountListAPIActions } from './account-list.actions';

const INITIAL_STATE = new AccountList();

export function accountListReducer(state: AccountList = INITIAL_STATE, a: Action): AccountList {

  const action = a as AccountListAPIAction;

  switch (action.type) {
    case AccountListAPIActions.LOAD:
      state = {
        ...state,
        items: {}
      };
      break;
    case AccountListAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        items: indexBy(prop('id'), action.meta.itemsArray)
      };
      break;

    case AccountListAPIActions.LOAD_FAILED:
      state = {
        ...state,
        items: {}
      };
      break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case AccountListAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

