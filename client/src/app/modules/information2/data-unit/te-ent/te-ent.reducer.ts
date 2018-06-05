
import { Action } from 'redux';
import { TeEntAction, TeEntActions } from './te-ent.actions';
import { TeEntDetail } from '../../information.models';
import { dataUnitReducer } from '../data-unit.reducer';


const INITIAL_STATE: TeEntDetail = {
};


export const teEntReducer = (lastState: TeEntDetail = INITIAL_STATE, action: TeEntAction): TeEntDetail => {

  lastState = dataUnitReducer(lastState, action);

  switch (action.type) {


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

