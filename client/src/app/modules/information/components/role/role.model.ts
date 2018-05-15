import { InfRole, DfhProperty, DfhClass } from "app/core";
import { EditorStates, CollapsedExpanded } from "../../information.models";
import { ITeEntState } from "../te-ent/te-ent.model";
import { IPeItState } from "../../containers/pe-it/pe-it.model";
import { IAppellationState } from "../appellation/appellation.model";


export interface IRoleState {
    role?: InfRole,
    isOutgoing?: boolean,
    parentProperty?: DfhProperty
    state?: EditorStates,
    toggle?: CollapsedExpanded,
    ontoInfoVisible?: boolean,
    communityStatsVisible?: boolean

    /**
     * The target class of a RoleState. 
     * Used to select persistent Items or temporal entities of the given dfhClass.
     * E.g.: When selecting the Father of a Birth, targetDfhClass is used to initialize
     * the GUI for selecting a person.  
     */
    targetDfhClass?: DfhClass;

    // roleToCreate?: InfRole;
    // roleToAdd?: InfRole;

    /**
     * This field flags roles that are used by the project to produce a display label of a range entity (thus normally a Persistent Item). 
     * It is up to the application logic to create this label. This is usually done by following the path from the Role to the 
     * TemporalEntity and from there to the Role with is_display_role_for_domain=true to some object 
     * like an appellationLabel or a date, that can be used to create a display label.
     */
    isDisplayRoleForRange?: boolean;

    /**
     * This field flags roles that are used by the project to produce a display label of a domain entity (thus normally a Temporal Entity).
     *  It is up to the application logic to create this label. This done by following the path from the Role to the 
     * range entity like an appellationLabel or a date, that can be used to create a display label.
     */
    isDisplayRoleForDomain?: boolean;
    isStandardRoleToAdd?: boolean;

    /** True while changing the display role (eye) */
    changingDisplayRole?: boolean;

    /** true if the parent role of the parent teEnt is the same role */
    isCircular?: boolean;

    isReadyToCreate?: boolean;

    childTeEnt?: ITeEntState;


    /** For roles pointing to a peIt (used for preview) */
    peItState?: IPeItState

    appeState?: IAppellationState
    // langState: ILanguageState
    // timePrimitiveState: ITimePrimitiveState

}


export class RoleState implements IRoleState {
    role?: InfRole;
    isOutgoing?: boolean;
    parentProperty?: DfhProperty
    state?: EditorStates;
    toggle?: CollapsedExpanded;
    ontoInfoVisible?: boolean;
    communityStatsVisible?: boolean;

    targetDfhClass?: DfhClass;

    // roleToCreate?: InfRole;
    // roleToAdd?: InfRole;

    isDisplayRoleForRange?: boolean;
    isDisplayRoleForDomain?: boolean;

    changingDisplayRole?: boolean;

    /** true if the parent role of the parent teEnt is the same role */
    isCircular?: boolean;

    isStandardRoleToAdd?: boolean;

    isReadyToCreate?: boolean;

    childTeEnt?: ITeEntState;

    /** For roles pointing to a peIt (used for preview) */
    peItState?: IPeItState

    appeState?: IAppellationState

    constructor(data?: IRoleState) {
        Object.assign(this, data)
    }
}

