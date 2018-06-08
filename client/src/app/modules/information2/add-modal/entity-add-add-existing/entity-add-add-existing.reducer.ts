import { EntityAddExistingActions, EntityAddExistingAction } from "./entity-add-add-existing.actions";
import { Information } from "../../information.models";


const INITIAL_STATE: Information = {

};


export const entityAddExistingReducer =
    (lastState: Information = INITIAL_STATE, action: EntityAddExistingAction): Information => {
        switch (action.type) {

            case EntityAddExistingActions.ENTITY_ADD_EXISTING_INITIALIZED:
                lastState = Object.assign({}, lastState, action.payload);
                break;

            case EntityAddExistingActions.ENTITY_ADD_EXISTING_DESTROYED:
                lastState = {};
                break;
        }

        return lastState;
    };

export const createEntityAddExistingReducer = () => { return entityAddExistingReducer }