
import { Action } from 'redux';
import { ITeEntState } from './te-ent.model';
import { TeEntAction, TeEntActions } from './te-ent.actions';
import { last } from '@angular/router/src/utils/collection';
import { roleSetListReducer } from '../role-set-list/role-set-list-reducer';


const INITIAL_STATE: ITeEntState = {
};


export const teEntReducer = (lastState: ITeEntState = INITIAL_STATE, action: TeEntAction): ITeEntState => {

  lastState = roleSetListReducer(lastState, action);

  switch (action.type) {
    case TeEntActions.TE_ENT_TO_EDIT_UPDATED:
      lastState = {
        ...lastState,
        teEntToEdit: action.payload.teEntToEdit
      }
      break;

    case TeEntActions.TE_ENT_TO_ADD_UPDATED:
      lastState = {
        ...lastState,
        teEntToAdd: action.payload.teEntToAdd
      }
      break;

    case TeEntActions.TE_ENT_TO_CREATE_UPDATED:
      lastState = {
        ...lastState,
        teEntToCreate: action.payload.teEntToCreate
      }
      break;

    case TeEntActions.SET_TOGGLE:
      lastState = {
        ...lastState,
        toggle: action.payload.toggle
      };
      break;

    case TeEntActions.TOGGLE:
      lastState = {
        ...lastState,
        toggle: lastState.toggle === 'expanded' ? 'collapsed' : 'expanded'
      };
      break;
  }

  return lastState;
};

