
import { Action } from 'redux';
import { IPiRoleState } from './pe-it-role.model';
import { PiRoleActions, PiRoleAction } from './pe-it-role.actions';


const INITIAL_STATE: IPiRoleState = {

};


export const piRoleReducer =
    (lastState: IPiRoleState = INITIAL_STATE, action: PiRoleAction): IPiRoleState => {

        switch (action.type) {
            case PiRoleActions.FOO:
                return lastState;
        }


        return lastState;
    };

