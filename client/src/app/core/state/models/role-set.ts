import { DfhClass, DfhPropertyInterface, InfRole } from 'app/core/sdk';
import { RoleDetailList } from './role-detail-list';
import { RoleSetForm } from './role-set-form';
import { FieldLabel } from './field-label';
import { CollapsedExpanded, FieldType } from './types';
import { Field } from './field';

/*******************************
 * RoleSet
 * - roleSets are produced in GUI on the fly and
 *   are not persisted in db: no need to create, add or edit role sets
 *******************************/

export class RoleSet extends Field {

    readonly type? = 'RoleSet';

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

    hasAlternatives?= false;

    // GUI
    pkUiContext?: number;
    isViewMode?= false;
    dragEnabled?: boolean;
    label?: FieldLabel;
    toggle?= 'expanded' as CollapsedExpanded;
    rolesNotInProjectLoading?: boolean;
    roleStatesToCreateVisible?: boolean;
    roleStatesInNoProjectVisible?: boolean;
    roleStatesInOtherProjectsVisible?: boolean;
    roleStatesInProjectVisible?: boolean;
    loading?: boolean;

    constructor(data?: RoleSet) {
        super()
        Object.assign(this, data);
    }

}
