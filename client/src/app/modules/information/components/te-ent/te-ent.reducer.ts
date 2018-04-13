
import { Action } from 'redux';
import { ITeEntState } from './te-ent.model';
import { TeEntAction, TeEntActions } from './te-ent.actions';


const INITIAL_STATE: ITeEntState = {

};


export const teEntReducer =
  (lastState: ITeEntState = INITIAL_STATE, action: TeEntAction): ITeEntState => {

    switch (action.type) {
      case TeEntActions.FOO:
        // lastState.TeEntToEdit = action.payload.TeEntToEdit;
        return lastState;
    }


    return lastState;
  };

