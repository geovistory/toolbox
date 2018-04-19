
import { IEntityEditorWrapper } from './entity-editor.model';
import { EntityEditorAction, EntityEditorActions } from './entity-editor.actions';

const INITIAL_STATE: IEntityEditorWrapper = {

};


export const entityEditorReducer =
    (lastState: IEntityEditorWrapper = INITIAL_STATE, action: EntityEditorAction): IEntityEditorWrapper => {
        switch (action.type) {

            case EntityEditorActions.ENTITY_EDITOR_INITIALIZED:
                lastState = Object.assign({}, lastState, action.payload);
                break;

            case EntityEditorActions.ENTITY_EDITOR_DESTROYED:
                lastState = {};
                break;
        }

        return lastState;
    };

export const createEntityEditorReducer = () => { return entityEditorReducer }