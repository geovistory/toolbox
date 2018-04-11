import { IEntityEditorWrapper } from "../containers/entity-editor/entity-editor.model";
import { IAppState } from "app/core";

export interface IInformationState {
    entityEditor: IEntityEditorWrapper 
}

export interface IAppStateWithInformation extends IAppState {
    information: IInformationState 
}
