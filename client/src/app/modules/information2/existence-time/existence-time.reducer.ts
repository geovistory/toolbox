
import { ExistenceTimeAction, ExistenceTimeActions } from './existence-time.actions';
import {ExistenceTimeDetail} from '../information.models'

const INITIAL_STATE: ExistenceTimeDetail = {

};


export const existenceTimeReducer =
  (lastState: ExistenceTimeDetail = INITIAL_STATE, action: ExistenceTimeAction): ExistenceTimeDetail => {

    switch (action.type) {

      case ExistenceTimeActions.TOGGLE:
        lastState = {
          ...lastState,
          toggle: lastState.toggle === 'expanded' ? 'collapsed' : 'expanded'
        };
        break;


      case ExistenceTimeActions.EX_TIME_ROLESET_ADDED:
        lastState = {
          ...lastState,
          _roleSet_list: {
            ...lastState._roleSet_list,
            ...action.payload._roleSet_list
          }
        }
        break;

      case ExistenceTimeActions.EX_TIME_ROLESET_REMOVED:
        let newRoleSets = Object.assign({}, lastState._roleSet_list);
        delete newRoleSets[action.meta.key];

        lastState = {
          ...lastState,
          _roleSet_list: newRoleSets
        }
        break;

    }


    return lastState;
  };

