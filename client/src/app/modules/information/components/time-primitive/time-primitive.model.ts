import { EditorStates, CollapsedExpanded } from "../../information.models";
import { InfTimePrimitive } from "app/core";

export interface ITimePrimitiveState {

  state?: EditorStates;
  timePrimitive?: InfTimePrimitive;
  
}


export class TimePrimitiveState implements ITimePrimitiveState {

  state?: EditorStates;
  timePrimitive?: InfTimePrimitive;

  constructor(data?: ITimePrimitiveState) {
    Object.assign(this, data)
  }

}
