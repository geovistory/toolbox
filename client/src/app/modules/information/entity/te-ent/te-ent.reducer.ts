import { TeEntDetail } from 'app/core/state/models';
import { entityReducer } from '../entity.reducer';
import { TeEntAction, TeEntActions } from './te-ent.actions';


const INITIAL_STATE: TeEntDetail = {
};


export const teEntReducer = (lastState: TeEntDetail = INITIAL_STATE, action: TeEntAction): TeEntDetail => {

  lastState = entityReducer(lastState, action);

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

    case TeEntActions.TE_ENT_SET_ACCENTUATION:
      lastState = {
        ...lastState,
        accentuation: action.meta.accentuation
      };
      break;

    case TeEntActions.TE_ENT_SET_TIMESPAN_ACTIVATED:
      lastState = {
        ...lastState,
        timespanActivated: action.meta.timespanActivated
      };
      break;

    case TeEntActions.START_EDITING:
      lastState = {
        ...lastState,
        editing: true
      };
      break;

    case TeEntActions.STOP_EDITING:
      lastState = {
        ...lastState,
        editing: false
      };
      break;
  }

  return lastState;
};

