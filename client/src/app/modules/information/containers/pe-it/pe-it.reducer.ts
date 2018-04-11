
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

    return lastState;
  };

