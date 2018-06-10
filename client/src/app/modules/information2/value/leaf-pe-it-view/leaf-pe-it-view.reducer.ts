import { PeItDetail } from '../../information.models';
import { LeafPeItAction, LeafPeItActions } from './leaf-pe-it-view.actions';



const INITIAL_STATE: PeItDetail = {

};


export const leafPeItReducer =
    (lastState: PeItDetail = INITIAL_STATE, action: LeafPeItAction): PeItDetail => {

        switch (action.type) {

            case LeafPeItActions.LEAF_PE_IT_STATE_ADDED:
                lastState = {
                    ...lastState,
                    ...action.payload,
                    // loading: false
                }
                break;

            case LeafPeItActions.LEAF_PE_IT_START_LOADING:
                lastState = {
                    ...lastState,
                    loading: true
                }
                break;

        }

        return lastState;
    };

