import { InformationAction, InformationActions } from './information.actions';
import { Information } from './information.models';
import { omit } from 'ramda';

const INITIAL_STATE: Information = {

};


export const informationReducer =
    (lastState: Information = INITIAL_STATE, action: InformationAction): Information => {
        switch (action.type) {

            case InformationActions.ENTITY_EDITOR_INITIALIZED:
                lastState = {
                    ...lastState,
                    _peIt_editable: action.payload._peIt_editable
                };
                break;

            case InformationActions.ENTITY_EDITOR_DESTROYED:
                lastState = {
                    ...omit(['_peIt_editable'], lastState),
                }
                break;
        };


        return lastState;
    };

export const createInformationReducer = () => { return informationReducer }