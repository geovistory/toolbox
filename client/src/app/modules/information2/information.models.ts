import { InfPlace } from '../../core/sdk';
import { DfhClass, DfhProperty, InfAppellation, InfPersistentItem, InfRole, InfTemporalEntity, UiElement } from 'app/core';

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

    _children?: DataUnitChildList;

    pkEntity?: number,
    fkClass?: number;
    dfhClass?: DfhClass;

    parentPeIt?: InfPersistentItem,

    /** gui */
    label?: string;
    toggle?: CollapsedExpanded;
    ingoingRoleSets?: RoleSet[];
    outgoingRoleSets?: RoleSet[];
    selectPropState?: SelectPropStateType; // state of child components for adding or creating properties
    propertyToAdd?: RoleSet; // role set that is currently chosen in order to add a role of this kind

}


// The options for RoleSet or PropSet available to add to a class instance 
export interface AddOption {
    label: string,
    uiElement: UiElement
}

/*******************************
 * PeIt Interface
 *******************************/

export interface PeItSearchHit {

}



export interface PeItDetail extends DataUnit {

    // record
    peIt?: InfPersistentItem;

    form?: any;

    /** display data */
    ontoInfoVisible?: boolean;
    communityStatsVisible?: boolean;
    loading?: boolean; //for leaf pe it view
}



/*******************************
 * TeEnt Interface
 *******************************/

export interface TeEntDetail extends DataUnit {

    // record
    teEnt?: InfTemporalEntity;
}

export interface ExistenceTimeDetailInterface {
    readonly type?: DataUnitChildType;

    _roleSet_list?: RoleSetList;

    // records
    roles?: InfRole[];

    // gui
    toggle?: CollapsedExpanded;
    outgoingRoleSets?: RoleSet[];

    // for edit (form that controls consistency between different time-roles)
    _existenceTime_edit?: ExistenceTimeEdit;
}

export class ExistenceTimeDetail implements ExistenceTimeDetailInterface {
    readonly type: DataUnitChildType = 'ExistenceTimeDetail';

    _roleSet_list: RoleSetList;
    roles: InfRole[];
    toggle: CollapsedExpanded;
    outgoingRoleSets: RoleSet[];
    _existenceTime_edit: ExistenceTimeEdit;

    constructor(data?: ExistenceTimeDetailInterface) {
        Object.assign(this, data);
    }
}

export interface ExistenceTimeEdit extends ExistenceTimeDetail {

    // mode of help
    helpMode?: ExTimeHelpMode;

    mode?: ExTimeModalMode;


}



/*******************************
 * RoleSet Interface
 * - there is only one interface since roleSets are produced in GUI on the fly and 
 *   are not persisted in db: no need to create, add or edit role sets
 *******************************/

export interface RoleSetInterface {
    readonly type?: DataUnitChildType;

    _role_list?: RoleDetailList;

    _role_set_form?: RoleSetForm

    // record
    roles?: InfRole[];

    // gui
    label?: RoleSetLabelObj;
    property?: DfhProperty;
    isOutgoing?: boolean;
    toggle?: CollapsedExpanded;
    targetClassPk?: number;
    targetClass?: DfhClass;
    ordNum?: number;

    //True during loading of roles in other projects and roles in no project    
    rolesNotInProjectLoading?: boolean;
    roleStatesToCreateVisible?: boolean
    roleStatesInNoProjectVisible?: boolean
    roleStatesInOtherProjectsVisible?: boolean
    roleStatesInProjectVisible?: boolean

}

export class RoleSet implements RoleSetInterface {
    readonly type: DataUnitChildType = 'RoleSet';

    _role_list: RoleDetailList;
    _role_set_form: RoleSetForm;
    roles: InfRole[];
    label: RoleSetLabelObj;
    property: DfhProperty;
    isOutgoing: boolean;
    toggle: CollapsedExpanded;
    targetClassPk: number;
    targetClass: DfhClass;
    ordNum: number;
    rolesNotInProjectLoading: boolean;
    roleStatesToCreateVisible: boolean;
    roleStatesInNoProjectVisible: boolean;
    roleStatesInOtherProjectsVisible: boolean;
    roleStatesInProjectVisible: boolean;

    constructor(data?: RoleSetInterface) {
        Object.assign(this, data);
    }
}


/*******************************
 * RoleSetForm Interface
 *******************************/

export interface RoleSetForm {
    _role_create_list?: RoleDetailList

    _role_add_list?: RoleDetailList

    _role_add_in_no_project_list?: RoleDetailList
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
    _place?: PlaceDetail;

    // record
    role?: InfRole;

    // gui
    isOutgoing?: boolean,

    toggle?: CollapsedExpanded;

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
export interface PlaceDetail { }

/*******************************
 * List interfaces
 *******************************/

export interface DataUnitChildList { [keyInState: string]: DataUnitChild; }
export interface RoleSetList { [key: string]: RoleSet }
export interface RoleDetailList { [key: string]: RoleDetail }


/*******************************
 * Types
 *******************************/

export type CollapsedExpanded = 'collapsed' | 'expanded';
export type SelectPropStateType = 'init' | 'selectProp'
export type ExTimeModalMode = 'one-date' | 'begin-end' | 'advanced';
export type ExTimeHelpMode = 'hidden' | 'short' | 'long';
export type RoleSetLabelObj = { default: string; pl: string; sg: string; }
export type DataUnitChild = RoleSet | ExistenceTimeDetail;
export type DataUnitChildType = 'RoleSet' | 'ExistenceTimeDetail';

