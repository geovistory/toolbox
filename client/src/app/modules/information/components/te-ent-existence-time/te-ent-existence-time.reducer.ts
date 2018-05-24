
import { Action } from 'redux';
import { IExistenceTimeState } from './te-ent-existence-time.model';
import { ExistenceTimeAction, ExistenceTimeActions } from './te-ent-existence-time.actions';


const INITIAL_STATE: IExistenceTimeState = {

};


export const existenceTimeReducer =
  (lastState: IExistenceTimeState = INITIAL_STATE, action: ExistenceTimeAction): IExistenceTimeState => {

    switch (action.type) {

      case ExistenceTimeActions.TOGGLE:
        lastState = {
          ...lastState,
          toggle: lastState.toggle === 'expanded' ? 'collapsed' : 'expanded'
        };
        break;

      case ExistenceTimeActions.EX_TIME_START_EDITING:
        lastState = {
          ...lastState,
          state: 'edit'
        };
        break;

      case ExistenceTimeActions.EX_TIME_STOP_EDITING:
        lastState = action.payload;
        break;

      case ExistenceTimeActions.EX_TIME_UPDATED:
        lastState = action.payload;
        break;


      case ExistenceTimeActions.EX_TIME_ROLESET_ADDED:
        lastState = {
          ...lastState,
          roleSets: {
            ...lastState.roleSets,
            ...action.payload.roleSets
          }
        }
        break;

      case ExistenceTimeActions.EX_TIME_ROLESET_REMOVED:
        let newRoleSets = Object.assign({}, lastState.roleSets);
        delete newRoleSets[action.meta.key];

        lastState = {
          ...lastState,
          roleSets: newRoleSets
        }
        break;

    }


    return lastState;
  };

