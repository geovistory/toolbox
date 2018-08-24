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


            case InformationActions.ENTITY_ADD_EXISTING_INITIALIZED:
                lastState = {
                    ...lastState,
                    _peIt_add_form: action.payload._peIt_add_form
                };
                break;

            case InformationActions.ENTITY_ADD_EXISTING_DESTROYED:
                lastState = {
                    ...omit(['_peIt_add_form'], lastState),
                }
                break;

            case InformationActions.PE_IT_CREATE_ADDED:
                lastState = {
                    ...lastState,
                    _peIt_create_form: action.payload._peIt_create_form
                };
                break;

            case InformationActions.PE_IT_CREATE_DESTROYED:
                lastState = {
                    ...omit(['_peIt_create_form'], lastState),
                }
                break;


        };


        return lastState;
    };

export const createInformationReducer = () => { return informationReducer }