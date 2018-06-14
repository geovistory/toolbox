
import { Action } from 'redux';
import { TeEntAction, TeEntActions } from './te-ent.actions';
import { TeEntDetail } from '../../information.models';
import { dataUnitReducer } from '../data-unit.reducer';
import { omit } from 'ramda'

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


    case TeEntActions.EX_TIME_START_EDITING:
      lastState = {
        ...lastState,
        _existenceTime_edit: lastState._existenceTime
      };
      break;

    case TeEntActions.EX_TIME_STOP_EDITING:
      lastState = omit(['_existenceTime_edit'], lastState);
      break;

    case TeEntActions.EX_TIME_UPDATED:
      lastState = omit(['_existenceTime_edit'], {
        ...lastState,
        _existenceTime: action.payload._existenceTime
      });

      break;


  }

  return lastState;
};

