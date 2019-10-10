import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { PeItSearchExisting } from './pe-it-search-existing.models';
import { PeItSearchExistingAPIAction, PeItSearchExistingAPIActions } from './pe-it-search-existing.actions';

const INITIAL_STATE = new PeItSearchExisting();

export function peItSearchExistingReducer(state: PeItSearchExisting = INITIAL_STATE, a: Action): PeItSearchExisting {

  const action = a as PeItSearchExistingAPIAction;

  switch (action.type) {
    case PeItSearchExistingAPIActions.SEARCH:
      state = {
        ...state,
        loading: true,
        persistentItems: []
      };
      break;
    case PeItSearchExistingAPIActions.SEARCH_SUCCEEDED:
      state = {
        ...state,
        loading: false,
        persistentItems: action.meta.persistentItems,
        collectionSize: action.meta.collectionSize
      };
      break;

    case PeItSearchExistingAPIActions.SEARCH_FAILED:
      state = {
        ...state,
        loading: false,
        persistentItems: [],
        collectionSize: 0
      };
      break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case PeItSearchExistingAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

