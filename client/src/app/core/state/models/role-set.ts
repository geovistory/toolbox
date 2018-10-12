import { DfhClass, DfhPropertyInterface, InfRole } from 'app/core/sdk';
import { RoleDetailList } from './role-detail-list';
import { RoleSetForm } from './role-set-form';
import { RoleSetLabel } from './role-set-label';
import { CollapsedExpanded, DataUnitChildType } from './types';

/*******************************
 * RoleSet Interface
 * - there is only one interface since roleSets are produced in GUI on the fly and
 *   are not persisted in db: no need to create, add or edit role sets
 *******************************/

export interface RoleSetI {
    readonly type?: DataUnitChildType;

    _role_list?: RoleDetailList;

    // used for adding roles to a data unit that is in project
    _role_set_form?: RoleSetForm

    // record
    roles?: InfRole[];

    // gui
    label?: RoleSetLabel;
    property?: DfhPropertyInterface;
    isOutgoing?: boolean;
    toggle?: CollapsedExpanded;
    targetClassPk?: number;
    targetMinQuantity?: number;
    targetMaxQuantity?: number;
    dragEnabled?: boolean;

    targetClass?: DfhClass;

    ordNum?: number;

    // True during loading of roles in other projects and roles in no project
    rolesNotInProjectLoading?: boolean;
    roleStatesToCreateVisible?: boolean
    roleStatesInNoProjectVisible?: boolean
    roleStatesInOtherProjectsVisible?: boolean
    roleStatesInProjectVisible?: boolean

}

export class RoleSet implements RoleSetI {

    readonly type: DataUnitChildType = 'RoleSet';

    _role_list?: RoleDetailList;
    _role_set_form?: RoleSetForm;
    roles?: InfRole[];
    label?: RoleSetLabel;
    property?: DfhPropertyInterface;
    isOutgoing?: boolean;
    toggle = 'expanded' as CollapsedExpanded;
    targetClassPk?: number;
    targetMinQuantity?: number;
    targetMaxQuantity?: number;
    dragEnabled?: boolean;
    targetClass?: DfhClass;
    ordNum?: number;
    rolesNotInProjectLoading?: boolean;
    roleStatesToCreateVisible?: boolean;
    roleStatesInNoProjectVisible?: boolean;
    roleStatesInOtherProjectsVisible?: boolean;
    roleStatesInProjectVisible?: boolean;

    constructor(data?: RoleSetI) {
        Object.assign(this, data);
    }

}
