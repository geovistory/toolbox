
import { Action } from 'redux';
import { IPeItState } from './pe-it.model';
import { PeItAction, PeItActions } from './pe-it.actions';
import { roleSetListReducer } from '../../components/role-set-list/role-set-list-reducer';
import { RoleSetListActions } from '../../components/role-set-list/role-set-list-actions';
import { indexBy, prop } from 'ramda';


const INITIAL_STATE: IPeItState = {
  pkEntity: undefined,
  state: 'edit'
};

export const peItReducer = (lastState: IPeItState = INITIAL_STATE, action: PeItAction) => {

  // Extend this reducer by roleSetListReducer
  lastState = roleSetListReducer(lastState, action)

  switch (action.type) {
    case PeItActions.PEIT_TO_EDIT_UPDATED:
      lastState = {
        ...lastState,
        peItToEdit: action.payload.peItToEdit
      }
      break;

    case PeItActions.PEIT_TO_CREATE_UPDATED:
      lastState = {
        ...lastState,
        peItToCreate: action.payload.peItToCreate
      }
      break;

    case PeItActions.PEIT_TO_ADD_UPDATED:
      lastState = {
        ...lastState,
        peItToAdd: action.payload.peItToAdd,
      }
      break;

  }

  return lastState;
};

