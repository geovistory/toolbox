import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { QueryList } from './query-list.models';
import { QueryListAPIAction, QueryListAPIActions } from './query-list.actions';

const INITIAL_STATE = new QueryList();

export function queryListReducer(state: QueryList = INITIAL_STATE, a: Action): QueryList {

  const action = a as QueryListAPIAction;

  switch (action.type) {
    case QueryListAPIActions.LOAD:
      state = {
        ...state,
        items: {}
      };
      break;
    case QueryListAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        items: indexBy(prop('pk_entity'), action.meta.itemsArray)
      };
      break;

    case QueryListAPIActions.LOAD_FAILED:
      state = {
        ...state,
        items: {}
      };
      break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case QueryListAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

