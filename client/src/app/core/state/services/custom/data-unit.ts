import { ProjectCrm } from 'app/core/active-project';
import { ComConfig } from 'app/core/config/com-config';
import { InfRole } from 'app/core/sdk/models';
import { DataUnitChildList, ExistenceTimeDetail, RoleSet, DataUnit } from 'app/core/state/models';
import { groupBy, prop, indexBy } from 'ramda';
import { StateSettings } from '../core/state-settings';
import { Injectable } from '@angular/core';
import { RoleSetService } from './role-set';
import { ExistenceTimeDetailService } from './existence-time-detail';

/**
 * Service for TeEntDetailService and PeItDetailService
 */
@Injectable()
export class DataUnitService {

    constructor(
        protected roleSetS: RoleSetService,
        protected exTimeS: ExistenceTimeDetailService
    ) { }

    /**
    * Initialize RoleSetList
    *
    * @param {number} fkClass fk_class of PeIt
    * @param {InfRole[]} roles array of roles a PeIt
    * @param {InfStateSettings} settings settings to create the state
    *
    * @return {DataUnit} Object of RoleSet, the model of the Gui-Element for RoleSets
    */
    initChildren?(fkClass: number, roles: InfRole[], crm: ProjectCrm, settings: StateSettings = {}): DataUnitChildList {

        const children = [];

        // /** exclude the circular role */
        if (roles) {
            const i = roles.findIndex(role => (role.pk_entity === settings.parentRolePk));
            if (i > -1) {
                roles.splice(i, 1)
            };
        }

        // Get class config
        const classConfig = crm.classes[fkClass];


        if (settings.isCreateMode) {
            const uiContext = classConfig.uiContexts[ComConfig.PK_UI_CONTEXT_CREATE];

            // add a roleSet for each roleSet in this ui-context
            if (uiContext && uiContext.uiElements) {
                uiContext.uiElements.forEach(el => {

                    // if this is a element for a RoleSet
                    if (
                        el.roleSetKey
                    ) {
                        const roleSetDef = classConfig.roleSets[el.roleSetKey];

                        // exclude the circular RoleSets
                        if (!RoleSet.similarRoleSet(roleSetDef, settings.parentRoleSet)) {

                            // Generate roleSets (like e.g. the names-section, the birth-section or the detailed-name secition)
                            const options = new RoleSet({ toggle: 'expanded' })
                            const newRole = {
                                fk_property: el.fk_property,
                                entity_version_project_rels: [{
                                    is_in_project: true
                                }]
                            } as InfRole;

                            const roleSet = this.roleSetS.createState(Object.assign({}, roleSetDef, options), [newRole], crm, settings);
                            children.push(roleSet);
                        }
                    } else if (el.fk_property_set == ComConfig.PK_PROPERTY_SET_EXISTENCE_TIME) {

                        // if this ui-element is a Existence-Time PropSet
                        const options = new ExistenceTimeDetail({ toggle: 'expanded' });
                        children.push(this.exTimeS.createState(options, [], crm, settings));
                    }
                });
            }
        } else if (!roles || !roles.length) return;
        else {

            const uiContext = classConfig.uiContexts[ComConfig.PK_UI_CONTEXT_EDITABLE];

            const rolesByFkProp = groupBy(prop('fk_property'), roles) as { [index: number]: InfRole[] }

            let r: InfRole[];

            // for each uiElement in this ui-context
            if (uiContext && uiContext.uiElements) {
                uiContext.uiElements.forEach(el => {

                    // if this is a element for a RoleSet
                    if (el.roleSetKey) {
                        // enrich RoleSet with roles and child RoleDetails

                        // take existing roles of this property
                        r = rolesByFkProp[el.fk_property];

                        // Generate roleSets (like e.g. the names-section, the birth-section or the detailed-name secition)
                        const options = new RoleSet({ toggle: 'collapsed' })
                        const roleSetDef = classConfig.roleSets[el.roleSetKey];
                        if (r && r.length > 0) {
                            children.push(this.roleSetS.createState(Object.assign({}, roleSetDef, options), r, crm, settings));
                        }
                    } else if (el.fk_property_set == ComConfig.PK_PROPERTY_SET_EXISTENCE_TIME) {

                        // if this ui-element is a Existence-Time PropSet
                        const options = new ExistenceTimeDetail({ toggle: 'collapsed' });
                        children.push(this.roleSetS.createState(options, roles, crm, settings));
                    }

                });
            }

        }

        if (!children.length) return;

        return indexBy(DataUnit.dataUnitChildKey, children.filter(c => (c)));
    }
}
