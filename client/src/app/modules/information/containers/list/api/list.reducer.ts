import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { List } from './list.models';
import { ListAPIAction, ListAPIActions } from './list.actions';

const INITIAL_STATE = new List();

export function listReducer(state: List = INITIAL_STATE, a: Action): List {

  const action = a as ListAPIAction;

  switch (action.type) {

    /*****************************************************
    * Reducers to manage searching of data units
    *****************************************************/
    case ListAPIActions.SEARCH_STARTED:
      state = {
        ...state,
        items: [],
        loading: true
      };
      break;
    case ListAPIActions.SEARCH_SUCCEEDED:
      state = {
        ...state,
        items: action.meta.searchResponse.data,
        collectionSize: action.meta.searchResponse.totalCount,
        loading: false
      };
      break;

    case ListAPIActions.SEARCH_FAILED:
      state = {
        ...state,
        items: [],
        loading: false
      };
      break;


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case ListAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

