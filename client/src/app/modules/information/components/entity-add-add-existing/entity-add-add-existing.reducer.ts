import { IEntityAddExistingState } from "./entity-add-add-existing.model";
import { EntityAddExistingActions, EntityAddExistingAction } from "./entity-add-add-existing.actions";


const INITIAL_STATE: IEntityAddExistingState = {

};


export const entityAddExistingReducer =
    (lastState: IEntityAddExistingState = INITIAL_STATE, action: EntityAddExistingAction): IEntityAddExistingState => {
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