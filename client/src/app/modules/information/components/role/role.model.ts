import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { InfRole, DfhProperty } from "app/core";
import { EditorStates, CollapsedExpanded } from "../../information.models";
import { ITeEntState } from "../te-ent/te-ent.model";


export interface IRoleState {
    role?: InfRole,
    isOutgoing?: boolean,
    parentProperty?: DfhProperty
    state?: EditorStates,
    toggle?: CollapsedExpanded,
    ontoInfoVisible?: boolean,
    communityStatsVisible?: boolean


    roleToCreate?: InfRole;
    roleToAdd?: InfRole;

    isStandardInProject?:boolean;
    isStandardRoleToAdd?:boolean;

    childTeEnt?:ITeEntState;

}


export class RoleState implements IRoleState {
    role?: InfRole;
    isOutgoing?: boolean;
    parentProperty?: DfhProperty
    state?: EditorStates;
    toggle?: CollapsedExpanded;
    ontoInfoVisible?: boolean;
    communityStatsVisible?: boolean;

    roleToCreate?: InfRole;
    roleToAdd?: InfRole;

    isStandardInProject?:boolean;
    isStandardRoleToAdd?:boolean;

    childTeEnt? :ITeEntState;

    constructor(data?:IRoleState) {
        Object.assign(this, data)
    }
}

