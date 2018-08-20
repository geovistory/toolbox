
import { ExistenceTimeAction, ExistenceTimeActions } from './existence-time.actions';
import { ExistenceTimeDetail } from '../information.models'
import { omit } from 'ramda'

const INITIAL_STATE  = new  ExistenceTimeDetail({

});


export const existenceTimeReducer =
  (lastState: ExistenceTimeDetail = INITIAL_STATE, action: ExistenceTimeAction): ExistenceTimeDetail => {

    switch (action.type) {



      case ExistenceTimeActions.EX_TIME_START_EDITING:
        lastState = {
          ...lastState,
          _existenceTime_edit: {
            ...lastState,
            helpMode: 'hidden',
            mode: action.meta.mode
          }
        };
        break;

      case ExistenceTimeActions.EX_TIME_UPDATED:
        lastState = action.payload;
        break;

      case ExistenceTimeActions.EX_TIME_STOP_EDITING:
        lastState = new  ExistenceTimeDetail(omit(['_existenceTime_edit'], lastState));
        break;

      case ExistenceTimeActions.TOGGLE:
        lastState = {
          ...lastState,
          toggle: lastState.toggle === 'expanded' ? 'collapsed' : 'expanded'
        };
        break;


    }


    return lastState;
  };

