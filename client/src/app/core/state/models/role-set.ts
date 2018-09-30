import { DfhClass, DfhPropertyInterface, InfRole } from 'app/core/sdk';
import { sort } from 'ramda';
import { RoleDetail } from './role-detail';
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
    toggle?: CollapsedExpanded;
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


    /**
     * Checks if RoleSet a is of the same property or property-of-origin as RoleSet b.
     * This is useful to check if a RoleSet is circular in a tree of RoleSets and DataUnits
     *
     * @param a RoleSet you want to test if it is circular
     * @param b RoleSet to compare with (typically the parent RoleSet in the tree)
     */
    static similarRoleSet(a: RoleSetI, b: RoleSetI): boolean {
        if (!a || !b) return false;

        if (
            (
                a.property.dfh_pk_property === b.property.dfh_pk_property ||
                (
                    a.property.dfh_fk_property_of_origin &&
                    a.property.dfh_fk_property_of_origin === b.property.dfh_fk_property_of_origin
                )
            )
            && a.isOutgoing != b.isOutgoing
        ) return true;

        else return false;
    }

    /**
     * returns a copy of the given RoleDetail[], where the items are sorted
     * according to the ord_num in the epr.
     *
     * @param roleDetailArray a RoleDetail[]
     * @returns a sorted copy of RoleDetail[]
     */
    static sortRoleDetailsByOrdNum(roleDetailArray: RoleDetail[]): RoleDetail[] {

        const diff = (rdA: RoleDetail, rdB: RoleDetail) => {

            const a = rdA.role.entity_version_project_rels ? rdA.role.entity_version_project_rels[0].ord_num : undefined;
            const b = rdB.role.entity_version_project_rels ? rdB.role.entity_version_project_rels[0].ord_num : undefined;

            if (a === undefined || b === undefined) return 0;

            return a - b;
        }

        return sort(diff, roleDetailArray);
    }

    static roleSetKey(roleSet: RoleSet) {
        return RoleSet.roleSetKeyFromParams(roleSet.property.dfh_pk_property, roleSet.isOutgoing)
    }

    static roleSetKeyFromParams(fkProp: number, isOutgoing: boolean) {
        return '_' + fkProp + '_' + (isOutgoing ? 'outgoing' : 'ingoing')
    }

    constructor(data?: RoleSetI) {
        Object.assign(this, data);
    }

}
