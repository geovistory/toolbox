import { PeItDetail } from '../../information.models';
import { LeafPeItAction, LeafPeItActions } from './pe-it-entity-preview.actions';



const INITIAL_STATE: PeItDetail = {

};


export const leafPeItReducer =
    (lastState: PeItDetail = INITIAL_STATE, action: LeafPeItAction): PeItDetail => {

        switch (action.type) {

            case LeafPeItActions.LEAF_PE_IT_STATE_ADDED:
                lastState = action.payload
                break;

        }

        return lastState;
    };

