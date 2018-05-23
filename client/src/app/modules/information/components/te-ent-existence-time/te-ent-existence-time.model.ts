import { EditorStates, CollapsedExpanded } from "../../information.models";
import { IRoleSets } from "../role-set-list/role-set-list.model";
import { RoleSetState } from "../role-set/role-set.model";

export interface IExistenceTimeState {

  state?: EditorStates;
  toggle?: CollapsedExpanded;
  ingoingRoleSets?: RoleSetState[];
  roleSets?: IRoleSets //RoleSetState Object 

}


export class ExistenceTimeState implements IExistenceTimeState {

  state?: EditorStates;
  toggle?: CollapsedExpanded;
  ingoingRoleSets?: RoleSetState[];
  roleSets?: IRoleSets; //RoleSetState Object 

  constructor(data?: IExistenceTimeState) {
    Object.assign(this, data)
  }

}
