import { DfhClass, InfPersistentItem } from 'app/core/sdk';
import { ClassInstanceLabel } from './class-instance-label';
import { FieldList } from './field-list';
import { RoleSet } from './role-set';
import { TypeDetail } from './type-detail';
import { CollapsedExpanded, SelectPropStateType } from './types';

export class DataUnit {

    _fields?: FieldList;

    _type?: TypeDetail;

    pkEntity?: number;
    fkClass?: number;
    dfhClass?: DfhClass;

    parentPeIt?: InfPersistentItem;

    /** gui */
    pkUiContext?: number;
    showAddAPropertyButton?= true;
    isViewMode?= false;

    label?:  ClassInstanceLabel;
    toggle?= 'collapsed' as CollapsedExpanded;
    ingoingRoleSets?: RoleSet[];
    outgoingRoleSets?: RoleSet[];
    selectPropState?: SelectPropStateType; // state of child components for adding or creating properties
    propertyToAdd?: RoleSet; // role set that is currently chosen in order to add a role of this kind

    showRemoveVerification?: boolean;

    constructor(data?: DataUnit) {
        Object.assign(this, data);
    }

}

