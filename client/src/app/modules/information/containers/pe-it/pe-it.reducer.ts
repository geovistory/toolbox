
import { Action } from 'redux';
import { IPeItState } from './pe-it.model';
import { PeItAction, PeItActions } from './pe-it.actions';


const INITIAL_STATE: IPeItState = {
  pkEntity: undefined,
  state: 'edit'
};


export const peItReducer =
  (lastState: IPeItState = INITIAL_STATE, action: PeItAction): IPeItState => {

    switch (action.type) {
      case PeItActions.PEIT_TO_EDIT_UPDATED:
        lastState.peItToEdit = action.payload.peItToEdit;
        return lastState;
    }

    switch (action.type) {
      case PeItActions.PEIT_TO_CREATE_UPDATED:
        lastState.peItToCreate = action.payload.peItToCreate;
        return lastState;
    }

    switch (action.type) {
      case PeItActions.PEIT_TO_ADD_UPDATED:
        lastState.peItToAdd = action.payload.peItToAdd;
        return lastState;
    }

    switch (action.type) {
      case PeItActions.PE_IT_ROLE_SET_LIST_INITIALIZED:
        lastState.piRoleSetListState = action.payload.piRoleSetListState;
        return lastState;
    }

    return lastState;
  };

