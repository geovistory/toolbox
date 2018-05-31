import { InformationAction } from "./information.actions";
import { IInformationState } from "./information.model";
import { EntityEditorActions } from "../containers/entity-editor/entity-editor.actions";

const INITIAL_STATE: IInformationState = {
  entityEditor: {},
};

const informationReducer = (lastState: IInformationState = INITIAL_STATE, action: InformationAction): IInformationState => {
  switch (action.type) {

  }
  return lastState;
}

export const createInformationReducer = () => {
  return informationReducer
}
