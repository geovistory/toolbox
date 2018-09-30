import { DfhClass, InfPersistentItem } from 'app/core/sdk';
import { DataUnitChildList } from './data-unit-child-list';
import { DataUnitLabel } from './data-unit-label';
import { RoleSet } from './role-set';
import { CollapsedExpanded, DataUnitChild, SelectPropStateType } from './types';

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



    static dataUnitChildKey(child: DataUnitChild) {

        switch (child.type) {
            case 'RoleSet':
                return RoleSet.roleSetKey(child as RoleSet);

            case 'ExistenceTimeDetail':
                return '_existenceTime';

            default:
                break;
        }
    }

    constructor(data?: DataUnitI) {
        Object.assign(this, data);
    }

}
