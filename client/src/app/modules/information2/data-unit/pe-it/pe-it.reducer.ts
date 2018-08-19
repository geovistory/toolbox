
import { Action } from 'redux';
import { indexBy, prop } from 'ramda';
import { PeItDetail } from '../../information.models';
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


    case PeItActions.ONTO_INFO_VISIBILITY_TOGGLED:
      lastState = {
        ...lastState,
        ontoInfoVisible: action.payload.ontoInfoVisible,
      }
      break;

    case PeItActions.COMMUNITY_STATS_VISIBILITY_TOGGLED:
      lastState = {
        ...lastState,
        communityStatsVisible: action.payload.communityStatsVisible,
      }
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
  }

  return lastState;
};

