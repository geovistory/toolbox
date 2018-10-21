import { DfhClass, InfPersistentItem } from 'app/core/sdk';
import { DataUnitChildList } from './data-unit-child-list';
import { DataUnitLabel } from './data-unit-label';
import { RoleSet } from './role-set';
import { CollapsedExpanded, SelectPropStateType } from './types';
import { TypeDetail } from './type-detail';

export class DataUnit {

    _children?: DataUnitChildList;

    _type?: TypeDetail;

    pkEntity?: number;
    fkClass?: number;
    dfhClass?: DfhClass;

    parentPeIt?: InfPersistentItem;

    /** gui */
    pkUiContext?: number;
    showAddAPropertyButton?= true;
    isViewMode?= false;

    label?: DataUnitLabel;
    toggle?= 'collapsed' as CollapsedExpanded;
    ingoingRoleSets?: RoleSet[];
    outgoingRoleSets?: RoleSet[];
    selectPropState?: SelectPropStateType; // state of child components for adding or creating properties
    propertyToAdd?: RoleSet; // role set that is currently chosen in order to add a role of this kind


    constructor(data?: DataUnit) {
        Object.assign(this, data);
    }

}

