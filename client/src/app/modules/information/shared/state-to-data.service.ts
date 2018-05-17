import { Injectable } from '@angular/core';
import { IRoleState } from '../components/role/role.model';
import { InfRole, InfEntityProjectRel, InfTemporalEntity, InfPersistentItem } from '../../../core';
import { ITeEntState } from '../components/te-ent/te-ent.model';
import { IRoleSetState, IRoleStates } from '../components/role-set/role-set.model';
import { IRoleSets } from '../components/role-set-list/role-set-list.model';
import { IPeItState } from '../containers/pe-it/pe-it.model';
import { RoleSetService } from './role-set.service';

@Injectable()
export class StateToDataService {

  constructor() { }

  private static getOwnEpr(entity): InfEntityProjectRel {
    return !entity.entity_version_project_rels ? {} :
      !entity.entity_version_project_rels[0] ? {} :
        entity.entity_version_project_rels[0];
  }

  private static createEpr(entity, eprOptions): InfEntityProjectRel {
    let ownEpr = StateToDataService.getOwnEpr(entity);
    let overridesOwnEpr = new InfEntityProjectRel;
    overridesOwnEpr.fk_entity_version_concat = entity.pk_entity_version_concat;
    overridesOwnEpr.is_in_project = undefined;

    return new InfEntityProjectRel(Object.assign(ownEpr, overridesOwnEpr, eprOptions));
  }



  /**
  * Transforms a given PeItState object to an object that can be passed to the
   * api in order to change the project relation to the peIt (and potentially to its children)
   */
  static peItStateToPeItToRelate(peItState: IPeItState, eprOptions?: InfEntityProjectRel): InfPersistentItem {
    let peIt = new InfPersistentItem(peItState.peIt);
    peIt.entity_version_project_rels = [StateToDataService.createEpr(peIt, eprOptions)]

    peIt.pi_roles = StateToDataService.roleSetsToRolesToRelate(peItState.roleSets, eprOptions)

    return peIt;
  }


  /**
   * Transforms a given RoleState object to an object that can be passed to the
   * api in order to chante the project relation to the role (and potentially to its children)
   */
  static roleStateToRoleToRelate(roleState: IRoleState, eprOptions?: InfEntityProjectRel): InfRole {
    let role = new InfRole(roleState.role);
    role.entity_version_project_rels = [StateToDataService.createEpr(role, eprOptions)]

    /** If the role leads to a peIt or an object, this means that only the role needs to be removed from project */
    if (!roleState.childTeEnt) {
      return role;
    }
    /** If the role leads to a temporal entity, this means that the temporal entity and its roles need to be removed from project */
    else if (roleState.childTeEnt) {
      role.temporal_entity = StateToDataService.teEntToTeEntToRelate(roleState.childTeEnt, eprOptions)
      return role;
    }
  }

  /**
   * Transforms a given TeEntState object to an object that can be passed to the
   * api in order to chante the project relation to the teEnt (and potentially to its children)
   * 
   * @param teEntState 
   */
  static teEntToTeEntToRelate(teEntState: ITeEntState, eprOptions?: InfEntityProjectRel): InfTemporalEntity {
    let teEnt = new InfTemporalEntity(teEntState.teEnt);
    teEnt.entity_version_project_rels = [StateToDataService.createEpr(teEnt, eprOptions)]


    teEnt.te_roles = StateToDataService.roleSetsToRolesToRelate(teEntState.roleSets, eprOptions)

    //  .map(role=>{
    //   return StateToDataService.roleStateToRoleToRelate
    // })

    return teEnt;
  }

  static roleSetsToRolesToRelate(roleSets: IRoleSets, eprOptions?: InfEntityProjectRel): InfRole[] {

    let roles: InfRole[] = [];

    /** for each RoleSetState */
    for (const i in roleSets) {
      if (roleSets.hasOwnProperty(i)) {
        const roleSet: IRoleSetState = roleSets[i];
        let roleStates: IRoleStates;

        switch (roleSet.state) {
          /** if the roleset is in editable mode, the roles that are in project need to be taken */
          case 'editable':
            roleStates = roleSet.roleStatesInProject;

            /** for each RoleState */
            for (const j in roleStates) {
              if (roleStates.hasOwnProperty(j)) {
                const roleState: IRoleState = roleStates[j]
                if (!roleState.isCircular)
                  roles.push(StateToDataService.roleStateToRoleToRelate(roleState, eprOptions));

              }
            }

            break;

          /** 
           * if the roleset is in add-pe-it mode, the roles that are in other projects need to be taken.
           * in this case, we take some of the community data and put it in the epr.
           */
          case 'add-pe-it':
            roleStates = roleSet.roleStatesInOtherProjects

            // find role of roleSet with highest number of display count.
            let pkEntityWithHighestCount = RoleSetService.getDisplayRangeFavoriteOfRoleStates(roleStates);

            /** for each RoleState */
            for (const j in roleStates) {
              let eprOpt = eprOptions ? eprOptions : new InfEntityProjectRel()

              if (roleStates.hasOwnProperty(j)) {
                const roleState: IRoleState = roleStates[j]

                // take over the community favorite calendar
                if (roleState.role.community_favorite_calendar) {
                  eprOpt.calendar = roleState.role.community_favorite_calendar;
                }

                // take over the community favorite display role
                if (roleState.role.pk_entity === pkEntityWithHighestCount) {
                  eprOpt.is_standard_in_project = true;
                } else {
                  eprOpt.is_standard_in_project = false;
                }

                if (!roleState.isCircular)
                  roles.push(StateToDataService.roleStateToRoleToRelate(roleState, eprOpt));

              }
            }


          default:
            break;
        }



      }
    }

    return roles;
  }

}
