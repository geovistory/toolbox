import { DfhClass, DfhPropertyInterface, InfRole } from 'app/core/sdk';
import { Field } from './field';
import { FieldLabel } from './field-label';
import { RoleDetailList } from './role-detail-list';
import { PropertyFieldForm } from './role-set-form';
import { CollapsedExpanded } from './types';

/*******************************
 * RoleSet
 * - roleSets are produced in GUI on the fly and
 *   are not persisted in db: no need to create, add or edit role sets
 *******************************/

export class PropertyField extends Field {

    readonly type? = 'RoleSet';

    _role_list?: RoleDetailList;
    _role_set_form?: PropertyFieldForm;
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

    constructor(data?: PropertyField) {
        super()
        Object.assign(this, data);
    }

}
