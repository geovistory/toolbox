import { EditorStates, CollapsedExpanded } from "../../information.models";
import { IRoleSets } from "../role-set-list/role-set-list.model";
import { RoleSetState } from "../role-set/role-set.model";
import { InfRole } from "app/core";

export interface IExistenceTimeState {
  
  state?: EditorStates;
  toggle?: CollapsedExpanded;
  ingoingRoleSets?: RoleSetState[];
  roleSets?: IRoleSets //RoleSetState Object 
  roles?: InfRole[];
}


export class ExistenceTimeState implements IExistenceTimeState {

  state?: EditorStates;
  toggle?: CollapsedExpanded;
  ingoingRoleSets?: RoleSetState[];
  roleSets?: IRoleSets; //RoleSetState Object 
  roles?: InfRole[];

  constructor(data?: IExistenceTimeState) {
    Object.assign(this, data)
  }

}
