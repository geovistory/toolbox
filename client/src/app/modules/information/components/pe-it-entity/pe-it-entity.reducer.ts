
import { Action } from 'redux';
import { IPeIt, fromServer } from './pe-it-entity.model';
import { PeItEntityAction, PeItEntityActions } from './pe-it-entity.actions';

const INITIAL_STATE: IPeIt = {
  recordFromServer: null,
  roles: null
};


export const peItEntityReducer =
  (state: IPeIt = INITIAL_STATE, action: PeItEntityAction): IPeIt => {

    switch (action.type) {
      case PeItEntityActions.LOAD_STARTED:
        return {
          ...state,
          recordFromServer: null,
          roles: null,
          loading: true,
          error: null,
        };
      case PeItEntityActions.LOAD_SUCCEEDED:
        return {
          ...state,
          ...fromServer(action.payload),
          loading: false,
          error: null,
        };
      case PeItEntityActions.LOAD_FAILED:
        return {
          ...state,
          recordFromServer: null,
          roles: null,
          loading: false,
          error: action.error,
        };
    }

    return state;
  };

