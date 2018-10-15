import { DfhClass, DfhPropertyInterface, InfRole } from 'app/core/sdk';
import { RoleDetailList } from './role-detail-list';
import { RoleSetForm } from './role-set-form';
import { RoleSetLabel } from './role-set-label';
import { CollapsedExpanded, DataUnitChildType } from './types';

/*******************************
 * RoleSet
 * - roleSets are produced in GUI on the fly and
 *   are not persisted in db: no need to create, add or edit role sets
 *******************************/

export class RoleSet  {

    readonly type?: DataUnitChildType = 'RoleSet';

    _role_list?: RoleDetailList;
    _role_set_form?: RoleSetForm;
    roles?: InfRole[];
    property?: DfhPropertyInterface;
    isOutgoing?: boolean;
    targetClassPk?: number;
    targetMinQuantity?: number;
    targetMaxQuantity?: number;
    targetClass?: DfhClass;
    ordNum?: number;

    // GUI
    isViewMode?= false;
    dragEnabled?: boolean;
    label?: RoleSetLabel;
    toggle? = 'expanded' as CollapsedExpanded;
    rolesNotInProjectLoading?: boolean;
    roleStatesToCreateVisible?: boolean;
    roleStatesInNoProjectVisible?: boolean;
    roleStatesInOtherProjectsVisible?: boolean;
    roleStatesInProjectVisible?: boolean;

    constructor(data?: RoleSet) {
        Object.assign(this, data);
    }

}
