import { IEntityEditorWrapper } from "../containers/entity-editor/entity-editor.model";
import { IAppState } from "app/core";

export interface IInformationState {
    entityEditor?: IEntityEditorWrapper,
    list?: { [key: string]: IPeItSearchHitState }
}

export interface IAppStateWithInformation extends IAppState {
    information: IInformationState
}

export interface IPeItSearchHitState {

}