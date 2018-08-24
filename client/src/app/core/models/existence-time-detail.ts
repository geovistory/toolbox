import { DataUnitChildType, CollapsedExpanded } from "./types";
import { RoleSetList } from "./role-set-list";
import { InfRole } from "app/core/sdk";
import { RoleSet } from "./role-set";
import { ExistenceTimeEdit } from "./existence-time-edit";

export interface ExistenceTimeDetailI {
    readonly type?: DataUnitChildType;

    _children?: RoleSetList;

    // records
    roles?: InfRole[];

    // gui
    toggle?: CollapsedExpanded;
    outgoingRoleSets?: RoleSet[];

    // for edit (form that controls consistency between different time-roles)
    _existenceTime_edit?: ExistenceTimeEdit;
}

export class ExistenceTimeDetail implements ExistenceTimeDetailI {
    readonly type: DataUnitChildType = 'ExistenceTimeDetail';

    _children: RoleSetList;
    roles: InfRole[];
    toggle: CollapsedExpanded;
    outgoingRoleSets: RoleSet[];
    _existenceTime_edit: ExistenceTimeEdit;

    constructor(data?: ExistenceTimeDetailI) {
        Object.assign(this, data);
    }
}