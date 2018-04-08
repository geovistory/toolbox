import { IInformation } from "../information.model";
import { InformationAction } from "./information.actions";

const INITIAL_STATE: IInformation = {
  activePeIt: undefined,
};

const informationReducer = (lastState: IInformation = INITIAL_STATE, action: InformationAction): IInformation => {
  switch (action.type) {

  }

  return lastState;
}

export const createInformationReducer = () => {
  return informationReducer;
}