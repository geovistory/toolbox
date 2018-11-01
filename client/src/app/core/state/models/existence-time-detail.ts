import { InfRole } from 'app/core/sdk';
import { ExistenceTimeEdit } from './existence-time-edit';
import { RoleSet } from './role-set';
import { RoleSetList } from './role-set-list';
import { CollapsedExpanded, FieldType } from './types';
import { Field } from './field';




export class ExistenceTimeDetail extends Field {

    readonly type? = 'ExistenceTimeDetail';

    _fields?: RoleSetList;

    // records
    roles?= [];

    // gui
    pkUiContext?: number;
    toggle?= 'expanded' as CollapsedExpanded;
    outgoingRoleSets?: RoleSet[];

    // for edit (form that controls consistency between different time-roles)
    _existenceTime_edit?: ExistenceTimeEdit;

    constructor(data?: ExistenceTimeDetail) {
        super()
        Object.assign(this, data);
    }


}
