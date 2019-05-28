
import { Action } from 'redux';
import { indexBy, prop } from 'ramda';
import { PeItDetail } from 'app/core/state/models';
import { PeItAction, PeItActions } from './pe-it.actions';
import { entityReducer } from '../entity.reducer';


const INITIAL_STATE: PeItDetail = {
  pkEntity: undefined,
};

export const peItReducer = (state: PeItDetail = INITIAL_STATE, action: PeItAction) => {

  // Extend this reducer by entityReducer
  state = entityReducer(state, action)

  switch (action.type) {

    case PeItActions.PE_IT_STATE_UPDATED:
      state = action.payload
      break;




    case PeItActions.PE_IT_LABEL_UPDATED:
      state = {
        ...state,
        label: action.payload.label,
      }
      break;

    case PeItActions.SET_LEAF_PE_IT_LOADING:
      state = {
        ...state,
        leafPeItLoading: action.payload.leafPeItLoading,
      }
      break;

    /************************************************
     * Reducer to toggle booleans.
     * Useful to toggle visibiility of ui elements
     ************************************************/

    case PeItActions.TOGGLE_BOOLEAN:
      state = {
        ...state,
        [action.meta.keyToToggle]: !state[action.meta.keyToToggle]
      }
      break;

    /************************************************
    * Reducer to start create a new mentioning
    ************************************************/
    case PeItActions.START_CREATE_MENTIONING:
      state = {
        ...state,
        mentionedEntities: {
          ...state.mentionedEntities,
        }
      }
      break;

  }

  return state;
};

