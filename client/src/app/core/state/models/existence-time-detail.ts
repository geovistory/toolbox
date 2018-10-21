import { InfRole } from 'app/core/sdk';
import { ExistenceTimeEdit } from './existence-time-edit';
import { RoleSet } from './role-set';
import { RoleSetList } from './role-set-list';
import { CollapsedExpanded, DataUnitChildType } from './types';
;

export interface ExistenceTimeDetailI {
    readonly type?: DataUnitChildType;

    _children?: RoleSetList;

    // records
    roles?: InfRole[];

    // gui
    pkUiContext?: number;
    toggle?: CollapsedExpanded;
    outgoingRoleSets?: RoleSet[];

    // for edit (form that controls consistency between different time-roles)
    _existenceTime_edit?: ExistenceTimeEdit;
}

export class ExistenceTimeDetail implements ExistenceTimeDetailI {

    readonly type: DataUnitChildType = 'ExistenceTimeDetail';

    pkUiContext?: number;
    _children?: RoleSetList;
    roles?= [];
    toggle?= 'expanded' as CollapsedExpanded;
    outgoingRoleSets?: RoleSet[];
    _existenceTime_edit?: ExistenceTimeEdit;

    constructor(data?: ExistenceTimeDetailI) {
        Object.assign(this, data);
    }


}
