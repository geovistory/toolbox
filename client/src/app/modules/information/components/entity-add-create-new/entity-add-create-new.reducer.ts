import { IEntityCreateNewState } from "./entity-add-create-new.model";
import { EntityCreateNewActions, EntityCreateNewAction } from "./entity-add-create-new.actions";


const INITIAL_STATE: IEntityCreateNewState = {

};


export const entityCreateNewReducer =
    (lastState: IEntityCreateNewState = INITIAL_STATE, action: EntityCreateNewAction): IEntityCreateNewState => {
        switch (action.type) {

            case EntityCreateNewActions.ENTITY_ADD_EXISTING_INITIALIZED:
                lastState = Object.assign({}, lastState, action.payload);
                break;

            case EntityCreateNewActions.ENTITY_ADD_EXISTING_DESTROYED:
                lastState = {};
                break;
        }

        return lastState;
    };

export const createEntityCreateNewReducer = () => { return entityCreateNewReducer }