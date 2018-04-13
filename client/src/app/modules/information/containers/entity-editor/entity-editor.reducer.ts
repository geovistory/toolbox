
import { IEntityEditorWrapper } from './entity-editor.model';
import { EntityEditorAction, EntityEditorActions } from './entity-editor.actions';

const INITIAL_STATE: IEntityEditorWrapper = {

};


export const entityEditorReducer =
    (lastState: IEntityEditorWrapper = INITIAL_STATE, action: EntityEditorAction): IEntityEditorWrapper => {

        switch (action.type) {
            case EntityEditorActions.ENTITY_EDITOR_INITIALIZED:
                const y = 'a';
                return action.payload

        }

        return lastState;
    };

export const createEntityEditorReducer = () => { return entityEditorReducer }