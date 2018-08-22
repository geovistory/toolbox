import { DataUnitChildList } from "./data-unit-child-list";
import { DfhClass, InfPersistentItem } from "app/core/sdk";
import { DataUnitLabel } from "./data-unit-label";
import { CollapsedExpanded, SelectPropStateType } from "./types";
import { RoleSet } from "./role-set";

/*******************************
 * Data Unit Base Interface
 *******************************/

export interface DataUnitI {

    _children?: DataUnitChildList;

    pkEntity?: number,
    fkClass?: number;
    dfhClass?: DfhClass;

    parentPeIt?: InfPersistentItem,

    /** gui */
    label?: DataUnitLabel;
    toggle?: CollapsedExpanded;
    ingoingRoleSets?: RoleSet[];
    outgoingRoleSets?: RoleSet[];
    selectPropState?: SelectPropStateType; // state of child components for adding or creating properties
    propertyToAdd?: RoleSet; // role set that is currently chosen in order to add a role of this kind

}


export class DataUnit implements DataUnitI {
    _children?: DataUnitChildList;

    pkEntity?: number;
    fkClass?: number;
    dfhClass?: DfhClass;

    parentPeIt?: InfPersistentItem;

    /** gui */
    label?: DataUnitLabel;
    toggle?: CollapsedExpanded;
    ingoingRoleSets?: RoleSet[];
    outgoingRoleSets?: RoleSet[];
    selectPropState?: SelectPropStateType; // state of child components for adding or creating properties
    propertyToAdd?: RoleSet; // role set that is currently chosen in order to add a role of this kind


    constructor(data?: DataUnitI) {
        Object.assign(this, data);
    }
}