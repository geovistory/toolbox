
import { Action } from 'redux';
import { indexBy, prop } from 'ramda';
import { PeItDetail } from 'app/core/state/models';
import { PeItAction, PeItActions } from './pe-it.actions';
import { dataUnitReducer } from '../data-unit.reducer';


const INITIAL_STATE: PeItDetail = {
  pkEntity: undefined,
};

export const peItReducer = (lastState: PeItDetail = INITIAL_STATE, action: PeItAction) => {

  // Extend this reducer by dataUnitReducer
  lastState = dataUnitReducer(lastState, action)

  switch (action.type) {

    case PeItActions.PE_IT_STATE_UPDATED:
      lastState = action.payload
      break;




    case PeItActions.PE_IT_LABEL_UPDATED:
      lastState = {
        ...lastState,
        label: action.payload.label,
      }
      break;

    case PeItActions.SET_LEAF_PE_IT_LOADING:
      lastState = {
        ...lastState,
        leafPeItLoading: action.payload.leafPeItLoading,
      }
      break;

    /************************************************
     * Reducerst to toggle visibility of ui elements
     ************************************************/

    case PeItActions.TOGGLE_RIGHT_PANEL:
      lastState = {
        ...lastState,
        showRightPanel: !lastState.showRightPanel
      }
      break;

    case PeItActions.TOGGLE_ONTO_INFO:
      lastState = {
        ...lastState,
        ontoInfoVisible: !lastState.ontoInfoVisible,
      }
      break;

    case PeItActions.TOGGLE_COMMUNITY_STATS:
      lastState = {
        ...lastState,
        communityStatsVisible: !lastState.communityStatsVisible,
      }
      break;

  }

  return lastState;
};

