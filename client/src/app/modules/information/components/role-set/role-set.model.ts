import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { InfPersistentItem, DfhProperty, InfRole, InfTemporalEntity } from "app/core";
import { CollapsedExpanded, EditorStates } from "../../information.models";

import { IPeItState } from "../../containers/pe-it/pe-it.model";
import { RoleSetLabelObj } from "./role-set.component";
import { IRoleState } from "../role/role.model";

export interface IRoleStates {
    [key: string]: IRoleState;
}

export type AddRoleState = 'init' | 'selectExisting' | 'createNew';

export interface IRoleSetState {
    property?: DfhProperty;
    isOutgoing?: boolean;
    // fkProperty?: number;

    roles?: InfRole[];

    // related to adding roles
    rolesToAdd?: InfRole[];
    rolesInNoProject?: InfRole[];
    rolesInNoProjectVisible?: boolean;
        
    state?: EditorStates;
    toggle?: CollapsedExpanded;
    ontoInfoVisible?: boolean;
    communityStatsVisible?: boolean;
    
    label?: RoleSetLabelObj;
    targetClassPk?: number;
    
    //Roles that are added to the project
    roleStatesInProject?: IRoleStates
    roleStatesInProjectVisible?: boolean
    
    //Roles that are added to at least one other project
    roleStatesInOtherProjects?:IRoleStates;
    roleStatesInOtherProjectsVisible?: boolean
    
    //Roles that are in no project (that have been removed from at least the project that created it)
    roleStatesInNoProject?:IRoleStates;
    roleStatesInNoProjectVisible?: boolean
    
    //Roles currently being created
    roleStatesToCreate?:IRoleStates;
    roleStatesToCreateVisible?: boolean
    
    //True during loading of roles in other projects and roles in no project    
    rolesNotInProjectLoading?:boolean;    

    formGroup?: InfRole[];
}


export class RoleSetState implements IRoleSetState {
    property?: DfhProperty;
    isOutgoing?: boolean;
    // fkProperty?: number;

    roles?: InfRole[];

    // related to adding roles
    rolesToAdd?: InfRole[];
    rolesInNoProject?: InfRole[];
    rolesInNoProjectVisible?: boolean;
        
    state?: EditorStates;
    toggle?: CollapsedExpanded;
    ontoInfoVisible?: boolean;
    communityStatsVisible?: boolean;
    
    label?: RoleSetLabelObj;
    targetClassPk?: number;
    
    //Roles that are added to the project
    roleStatesInProject?: IRoleStates
    roleStatesInProjectVisible?: boolean
    
    //Roles that are added to at least one other project
    roleStatesInOtherProjects?:IRoleStates;
    roleStatesInOtherProjectsVisible?: boolean
    
    //Roles that are in no project (that have been removed from at least the project that created it)
    roleStatesInNoProject?:IRoleStates;
    roleStatesInNoProjectVisible?: boolean
    
    //Roles currently being created
    roleStatesToCreate?:IRoleStates;
    roleStatesToCreateVisible?: boolean
    
    //True during loading of roles in other projects and roles in no project    
    rolesNotInProjectLoading?:boolean;    

    formGroup?: InfRole[];

    constructor(data?: IRoleSetState) {
        Object.assign(
            this,
            data
        )
    }

}
