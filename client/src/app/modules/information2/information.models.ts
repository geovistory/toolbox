import { InfPersistentItem, DfhClass, DfhProperty, InfRole, InfTemporalEntity, InfAppellation } from "app/core";

/**
 * Root state for Information Module
 */
export interface Information {
    // search results
    _peIt_list?: { [key: string]: PeItSearchHit },

    // the peIt to remove (are you sure?)
    _peIt_remove?: PeItSearchHit,

    // the peIt in editable detail view
    _peIt_editable?: PeItDetail,

    // the peIt to add
    _peIt_add_form?: PeItDetail

    // the peIt to create
    _peIt_create_form?: PeItDetail
}


/*******************************
 * Data Unit Base Interface
 *******************************/

export interface DataUnit {
    // role sets like e.g. 'mother', 'born children'
    _roleSet_list?: RoleSetList;

    pkEntity?: number,
    // roles?: InfRole[],

    parentPeIt?: InfPersistentItem,

    fkClass?: number;
    dfhClass?: DfhClass;

    /** gui */
    label?: string;
    toggle?: CollapsedExpanded;
    ingoingRoleSets?: RoleSet[];
    outgoingRoleSets?: RoleSet[];
    selectPropState?: SelectPropStateType; // state of child components for adding or creating properties
    propertyToAdd?: RoleSet; // role set that is currently chosen in order to add a role of this kind
}

/*******************************
 * PeIt Interface
 *******************************/

export interface PeItSearchHit {

}

export interface PeItDetail extends DataUnit {

    // record
    peIt?: InfPersistentItem;

    /** display data */
    ontoInfoVisible?: boolean;
    communityStatsVisible?: boolean
}



/*******************************
 * TeEnt Interface
 *******************************/

export interface TeEntDetail extends DataUnit {

    // record
    teEnt?: InfTemporalEntity;

    _existenceTime?: ExistenceTimeDetail;

}


/*******************************
 * RoleSet Interface
 * - there is only one interface since roleSets are produced in GUI on the fly and 
 *   are not persisted in db: no need to create, add or edit role sets
 *******************************/

export interface RoleSet {

    _role_list?: RoleDetailList

    _role_set_form?: RoleSetForm

    // record
    roles?: InfRole[];

    // gui
    label?: RoleSetLabelObj;
    property?: DfhProperty
    isOutgoing?: boolean;
    toggle?: CollapsedExpanded;
    targetClassPk?: number;

    //True during loading of roles in other projects and roles in no project    
    rolesNotInProjectLoading?: boolean;
    roleStatesToCreateVisible?: boolean
    roleStatesInNoProjectVisible?: boolean
    roleStatesInOtherProjectsVisible?: boolean
    roleStatesInProjectVisible?: boolean

}

/*******************************
 * RoleSetForm Interface
 *******************************/

export interface RoleSetForm {
    _role_add_list?: RoleDetailList
    _role_add_in_no_project_list?: RoleDetailList

    _role_create_list?: RoleDetailList
}

/*******************************
 * RoleDetail Interface
 *******************************/

export interface RoleDetail {
    _teEnt?: TeEntDetail;

    _appe?: AppeDetail;
    _lang?: LangDetail;
    _timePrimitive?: TimePrimitveDetail;
    _leaf_peIt?: PeItDetail
    _leaf_teEnt?: TeEntDetail

    // record
    role?: InfRole;

    // gui
    isOutgoing?: boolean,

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

    /**
     * The target class of a RoleState. 
     * Used to select persistent Items or temporal entities of the given dfhClass.
     * E.g.: When selecting the Father of a Birth, targetDfhClass is used to initialize
     * the GUI for selecting a person.  
     */
    targetDfhClass?: DfhClass;

    /** true if the parent role of the parent teEnt is the same role */
    isCircular?: boolean;


    /** True while changing the display role (eye) */
    changingDisplayRole?: boolean;

    isReadyToCreate?: boolean;

}


/*******************************
 * Leaf Entities Interfaces 
 *******************************/

export interface AppeDetail {
    appellation?: InfAppellation
}
export interface LangDetail { }
export interface TimePrimitveDetail { }


/*******************************
 * List interfaces
 *******************************/

export interface RoleSetList { [key: string]: RoleSet }
export interface RoleDetailList { [key: string]: RoleDetail }

/*******************************
 * Other interfaces 
 *******************************/

export type CollapsedExpanded = 'collapsed' | 'expanded';
export type SelectPropStateType = 'init' | 'selectProp'

export type RoleSetLabelObj = {
    default: string
    pl: string
    sg: string
}


export interface ExistenceTimeDetail {

    _roleSet_list?: RoleSetList;

    // records
    roles?: InfRole[];

    // gui
    toggle?: CollapsedExpanded;
    ingoingRoleSets?: RoleSet[];
}
