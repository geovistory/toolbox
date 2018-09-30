import { Injectable } from '@angular/core';
import { ProjectCrm } from 'app/core/active-project/active-project.models';
import { InfRole } from 'app/core/sdk';
import { RoleSet, RoleDetail } from 'app/core/state/models';
import { indexBy } from 'ramda';
import { StateService } from '../core/state-service';
import { StateSettings } from '../core/state-settings';
import { RoleDetailService } from './role-detail';


/**
 * Service for the 'RoleSet' model
 */
@Injectable()
export class RoleSetService implements StateService<InfRole[], RoleSet> {

    constructor(private roleDetailS: RoleDetailService) { }

    /**
     * Creates a RoleSet object with
     * - a _role_list, containing the list of RoleDetails
     * @param options options will bi merged in RoleSet object
     * @param roles will be converted in _role_list
     * @param crm is not used within the RoleSet but it is passed to RoleDetail.createState()
     * @param settings state settings object. If settings.isAddMode, only one role is taken for the _role_list,
     * TODO: change the behavior with addMode to smthng more clever
     */
    createState(options: RoleSet, roles: InfRole[], crm: ProjectCrm, settings: StateSettings): RoleSet {

        if (!roles || !roles.length) return;

        const roleDetailTemplate: RoleDetail = {
            isOutgoing: options.isOutgoing,
            targetClassPk: options.targetClassPk
        }

        /**
         * This is a shortcut method to take only the number of roles, defined by the max quantiy
         * TODO: change the behavior with addMode to smthng more clever
         */
        if (settings.isAddMode && options.targetMaxQuantity > -1) {
            roles = roles.slice(0, options.targetMaxQuantity)
        }
        // let displayRoleForRangePk;

        // /** if there are no eprs, this will be roles from Repo, not from Project */
        // if (!roles[0].entity_version_project_rels && roles[0].pk_entity) {
        //     displayRoleForRangePk = RoleSetService.getDisplayRangeFavoriteOfRoles(roles)
        // }

        const roleDetailArray = roles.map(role => this.roleDetailS.createState(roleDetailTemplate, role, crm, settings))
        const sortedByOrdNum = RoleSet.sortRoleDetailsByOrdNum(roleDetailArray);

        return new RoleSet({
            _role_list: indexBy(RoleDetail.roleDetailKey, sortedByOrdNum),
            ...options,
            targetClassPk: options.isOutgoing ? options.property.dfh_has_range : options.property.dfh_has_domain,
        });

    }


}
