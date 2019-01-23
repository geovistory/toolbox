import { Backoffice } from './backoffice.models';
import { BackofficeAction } from './backoffice.actions';

const INITIAL_STATE: Backoffice = {

};

export const backofficeReducer = (lastState: Backoffice = INITIAL_STATE, action: BackofficeAction): Backoffice => {
    switch (action.type) {

    }

    return lastState;
}

