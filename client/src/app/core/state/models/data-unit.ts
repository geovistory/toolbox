import { DfhClass, InfPersistentItem } from 'app/core/sdk';
import { ClassInstanceLabel } from './class-instance-label';
import { FieldList } from './field-list';
import { PropertyField } from './role-set';
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
    ingoingRoleSets?: PropertyField[];
    outgoingRoleSets?: PropertyField[];
    selectPropState?: SelectPropStateType; // state of child components for adding or creating properties
    propertyToAdd?: PropertyField; // role set that is currently chosen in order to add a role of this kind

    showRemoveVerification?: boolean;

    constructor(data?: DataUnit) {
        Object.assign(this, data);
    }

}

