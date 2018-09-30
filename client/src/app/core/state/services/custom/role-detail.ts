import { Injectable } from '@angular/core';
import { ProjectCrm } from 'app/core/active-project/active-project.models';
import { InfRole } from 'app/core/sdk';
import { PeItDetail, RoleDetail } from 'app/core/state/models';
import { RoleSet } from 'app/core/state/models/role-set';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { StateService } from '../core/state-service';
import { StateSettings } from '../core/state-settings';
import { AppeDetailService } from './appe-detail';
import { LangDetailService } from './lang-detail';
import { PeItDetailService } from './pe-it-detail';
import { PlaceDetailService } from './place-detail';
import { TeEntDetailService } from './te-ent-detail';
import { TimePrimitveDetailService } from './time-primitive-detail';

/**
 * Service for the 'ExistenceTimeDetail' model
 */
@Injectable()
export class RoleDetailService implements StateService<InfRole, RoleDetail> {

    constructor(
        private langS: LangDetailService,
        private appeS: AppeDetailService,
        private placeS: PlaceDetailService,
        private timePrimS: TimePrimitveDetailService,
        private teEnS: TeEntDetailService,
        private peItS: PeItDetailService
    ) { }

    createState(options: RoleDetail = new RoleDetail(), role: InfRole, crm: ProjectCrm, settings: StateSettings = {}): RoleDetail {


        if (!role) return undefined;


        const roleDetail: RoleDetail = {
            role: new InfRole(role),
            isCircular: false,
            ...options
        };

        if (role && role.entity_version_project_rels && role.entity_version_project_rels[0]) {
            // TODO uncomment as soon as we have the corresponding data model
            // role.entity_version_project_rels[0].is_display_role_for_domain
            roleDetail.isDisplayRoleForDomain = null
            roleDetail.isDisplayRoleForRange = role.entity_version_project_rels[0].is_standard_in_project;
        }

        const targetClassConfig = crm.classes[options.targetClassPk];

        /** If role leads to TeEnt or Presence */
        if ((
            targetClassConfig
            && (targetClassConfig.dfh_fk_system_type == DfhConfig.PK_SYSTEM_TYPE_TEMPORAL_ENTITY
                || targetClassConfig.dfh_pk_class == DfhConfig.CLASS_PK_PRESENCE)
        ) || role.temporal_entity && role.temporal_entity.pk_entity
        ) {
            // add the parent role pk of the roleDetail to the peEnt
            settings.parentRolePk = role.pk_entity;
            settings.parentRoleSet = crm
                .roleSets[RoleSet.roleSetKeyFromParams(role.fk_property, options.isOutgoing)];

            // if we are in create mode we need the fk_class
            if (settings.isCreateMode) {
                roleDetail.role.temporal_entity = role.temporal_entity = {
                    ...role.temporal_entity,
                    fk_class: options.targetClassPk
                }
            }

            roleDetail._teEnt = this.teEnS.createState(undefined, role.temporal_entity, crm, settings);

        } else if (
            /** If role leads to Appe */
            // else if (role.appellation && Object.keys(role.appellation).length){
            options.targetClassPk == DfhConfig.CLASS_PK_APPELLATION
            || (role.appellation && role.appellation.pk_entity)
        ) {

            // if we are in create mode we need the fk_class
            if (settings.isCreateMode) {
                roleDetail.role.appellation = {
                    ...role.appellation,
                    fk_class: options.targetClassPk
                }
            }

            roleDetail._appe = this.appeS.createState(undefined, role.appellation, crm, settings);

        } else if (
            /** If role leads to Language */
            // else if (role.language && Object.keys(role.language).length){
            options.targetClassPk == DfhConfig.CLASS_PK_LANGUAGE
            || (role.language && role.language.pk_entity)
        ) {

            // if we are in create mode we need the fk_class
            if (settings.isCreateMode) {
                roleDetail.role.language = {
                    ...role.language,
                    fk_class: options.targetClassPk
                }
            }

            roleDetail._lang = this.langS.createState(undefined, role.language, crm, settings);

        } else if (
            /** If role leads to Place (in the sense of geo coordinates!) */
            // else if (role.place && Object.keys(role.place).length){
            options.targetClassPk == DfhConfig.CLASS_PK_PLACE
            || (role.place && role.place.pk_entity)
        ) {

            // if we are in create mode we need the fk_class
            if (settings.isCreateMode) {
                roleDetail.role.place = {
                    ...role.place,
                    fk_class: options.targetClassPk
                }
            }

            roleDetail._place = this.placeS.createState(undefined, role.place, crm, settings);

        } else if (
            /** If role leads to TimePrimitive */
            options.targetClassPk == DfhConfig.CLASS_PK_TIME_PRIMITIVE
            || (role.time_primitive && role.time_primitive.pk_entity)
        ) {

            // if we are in create mode we need the fk_class
            if (settings.isCreateMode) {
                roleDetail.role.time_primitive = {
                    ...role.time_primitive,
                    fk_class: options.targetClassPk
                }
            }

            roleDetail._timePrimitive = this.timePrimS.createState(undefined, role.time_primitive, crm, settings);

        } else {

            // check if it is circular
            if (
                // if not creat mode and the pk's of both roles are the same
                (!settings.isCreateMode && role.pk_entity === settings.parentRolePk) ||
                // or if we are in create mode and the initialized role has a fk_entity
                // (means this is the circular role added upon start creating a new information)
                (settings.isCreateMode && role.fk_entity)
            ) {
                roleDetail.isCircular = true;
            }

            roleDetail._leaf_peIt = this.peItS.createState({ fkClass: options.targetClassPk }, null, crm, settings);

        }

        return new RoleDetail(roleDetail);
    }
}
