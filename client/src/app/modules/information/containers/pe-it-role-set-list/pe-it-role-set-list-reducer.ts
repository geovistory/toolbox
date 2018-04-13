
import { Action } from 'redux';
import { IPiRoleSetListState } from './pe-it-role-set-list.model';
import { PiRoleSetListAction, PiRoleSetListActions } from './pe-it-role-set-list-actions';
import { indexBy, prop } from 'ramda';


const INITIAL_STATE: IPiRoleSetListState = {
  roles: [],
  ingoingProperties: [],
  outgoingProperties: [],
  communityStatsVisible: false,
  ontoInfoVisible: false,
  state: 'edit',
  selectPropState: 'init',
  parentPeIt: null,
};


export const piRoleSetListReducer =
  (lastState: IPiRoleSetListState = INITIAL_STATE, action: PiRoleSetListAction): IPiRoleSetListState => {

    switch (action.type) {
      case PiRoleSetListActions.PE_IT_ROLE_SETS_INITIALIZED:
        return {
          ...lastState,
          roleSets: indexBy(prop('fkProperty'), action.payload.roleSets)
        }
    }

    switch (action.type) {
      case PiRoleSetListActions.START_SELECT_PROPERTY:
        return {
          ...lastState,
          selectPropState: action.payload.selectPropState
        }
    }

    switch (action.type) {
      case PiRoleSetListActions.STOP_SELECT_PROPERTY:
        return {
          ...lastState,
          selectPropState: action.payload.selectPropState
        }
    }


    switch (action.type) {
      case PiRoleSetListActions.START_SELECT_ROLES:
        return {
          ...lastState,
          roleSets: action.payload.roleSets,
          selectPropState: action.payload.selectPropState
        }
    }

    switch (action.type) {
      case PiRoleSetListActions.COMMUNITY_STATS_VISIBILITY_TOGGLED:
        return {
          ...lastState,
          communityStatsVisible: action.payload.communityStatsVisible
        }
    }

    switch (action.type) {
      case PiRoleSetListActions.ONTO_INFO_VISIBILITY_TOGGLED:
        return {
          ...lastState,
          ontoInfoVisible: action.payload.ontoInfoVisible
        }
    }


    return lastState;
  };

