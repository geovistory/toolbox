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

    /**
     * This field flags roles that are used by the project to produce a display label of a range entity (thus normally a Persistent Item). 
     * It is up to the application logic to create this label. This is usually done by following the path from the Role to the 
     * TemporalEntity and from there to the Role with is_display_role_for_domain=true to some object 
     * like an appellationLabel or a date, that can be used to create a display label.
     */
    isDisplayRoleForRange?:boolean;

    /**
     * This field flags roles that are used by the project to produce a display label of a domain entity (thus normally a Temporal Entity).
     *  It is up to the application logic to create this label. This done by following the path from the Role to the 
     * range entity like an appellationLabel or a date, that can be used to create a display label.
     */
    isDisplayRoleForDomain?:boolean;


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

    isDisplayRoleForRange?:boolean;
    isDisplayRoleForDomain?:boolean;

    isStandardRoleToAdd?:boolean;

    childTeEnt? :ITeEntState;

    constructor(data?:IRoleState) {
        Object.assign(this, data)
    }
}

