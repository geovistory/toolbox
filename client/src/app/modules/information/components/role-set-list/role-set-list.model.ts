import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { InfRole, DfhProperty, InfPersistentItem, DfhClass } from "app/core";
import { EditorStates } from "../../information.models";
import { RoleSetState, IRoleSetState } from "../../components/role-set/role-set.model";


export interface IRoleSets {
    [key: string]: IRoleSetState;
}


export type SelectPropStateType = 'init' | 'selectProp'

export interface IRoleSetListState {
    pkEntity?: number,
    roles?: InfRole[],
    // outgoingProperties?: DfhProperty[],
    // ingoingProperties?: DfhProperty[],
    parentPeIt?: InfPersistentItem,
    
    fkClass?: number;
    dfhClass?: DfhClass;
    
    /** gui */
    state?: EditorStates,
  
    
    ingoingRoleSets?: RoleSetState[];
    outgoingRoleSets?: RoleSetState[];
    selectPropState?: SelectPropStateType; // state of child components for adding or creating properties
    propertyToAdd?: RoleSetState; // role set that is currently chosen in order to add a role of this kind

    roleSets?: IRoleSets //RoleSetState Object 

}

export class RoleSetListState implements IRoleSetListState {
    pkEntity?: number;
    // roles?: InfRole[];
    // outgoingProperties?: DfhProperty[];
    // ingoingProperties?: DfhProperty[];
    parentPeIt?: InfPersistentItem;
    
    fkClass?: number;
    dfhClass?: DfhClass;
    
    /** gui */
    state?: EditorStates;
    
    ingoingRoleSets?: RoleSetState[];
    outgoingRoleSets?: RoleSetState[];
    selectPropState?: SelectPropStateType; // state of child components for adding or creating properties
    propertyToAdd?: RoleSetState; // role set that is currently chosen in order to add a role of this kind


    roleSets?: IRoleSets //RoleSetState Object 

    constructor(data?: IRoleSetListState) {
        Object.assign(
            this,
            data
        )
    }


}


