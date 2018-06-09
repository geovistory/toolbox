import { Injectable } from '@angular/core';
import { InfRole, InfEntityProjectRel, InfTemporalEntity, InfPersistentItem, U, TimePrimitive, ExistenceTime } from 'app/core';
import { RoleSetService } from './role-set.service';
import { DfhConfig } from './dfh-config';
import { AppellationLabel } from './appellation-label/appellation-label';
import { PeItDetail, RoleDetailList, RoleSetList, RoleSet, RoleDetail, TeEntDetail, ExistenceTimeDetail } from '../information.models';

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



  // /**
  // * Transforms a given PeItState object to an object that can be passed to the
  //  * api in order to change the project relation to the peIt (and potentially to its children)
  //  */
  // static peItStateToPeItToRelate(peItDetail: PeItDetail, eprOptions?: InfEntityProjectRel): InfPersistentItem {
  //   let peIt = new InfPersistentItem(peItDetail.peIt);
  //   peIt.entity_version_project_rels = [StateToDataService.createEpr(peIt, eprOptions)]

  //   peIt.pi_roles = StateToDataService.roleSetsToRolesToRelate(peItDetail._roleSet_list, eprOptions)

  //   return peIt;
  // }


  // /**
  //  * Transforms a given RoleState object to an object that can be passed to the
  //  * api in order to chante the project relation to the role (and potentially to its children)
  //  */
  // static roleStateToRoleToRelate(roleState: RoleDetail, eprOptions?: InfEntityProjectRel): InfRole {
  //   let role = new InfRole(roleState.role);
  //   role.entity_version_project_rels = [StateToDataService.createEpr(role, eprOptions)]

  //   /** If the role leads to a peIt or an object, this means that only the role needs to be removed from project */
  //   if (!roleState._teEnt) {
  //     return role;
  //   }
  //   /** If the role leads to a temporal entity, this means that the temporal entity and its roles need to be removed from project */
  //   else if (roleState._teEnt) {
  //     role.temporal_entity = StateToDataService.teEntToTeEntToRelate(roleState._teEnt, eprOptions)
  //     return role;
  //   }
  // }

  // /**
  //  * Transforms a given TeEntState object to an object that can be passed to the
  //  * api in order to chante the project relation to the teEnt (and potentially to its children)
  //  * 
  //  * @param teEntState 
  //  */
  // static teEntToTeEntToRelate(teEntState: TeEntDetail, eprOptions?: InfEntityProjectRel): InfTemporalEntity {
  //   let teEnt = new InfTemporalEntity(teEntState.teEnt);
  //   teEnt.entity_version_project_rels = [StateToDataService.createEpr(teEnt, eprOptions)]


  //   teEnt.te_roles = [
  //     ...StateToDataService.roleSetsToRolesToRelate(teEntState._roleSet_list, eprOptions),
  //     ...StateToDataService.existenceTimeToRolesToRelate(teEntState._existenceTime, eprOptions)
  //   ]
  //   //  .map(role=>{
  //   //   return StateToDataService.roleStateToRoleToRelate
  //   // })

  //   return teEnt;
  // }

  // static roleSetsToRolesToRelate(roleSets: RoleSetList, eprOptions?: InfEntityProjectRel): InfRole[] {

  //   let roles: InfRole[] = [];

  //   /** for each RoleSetState */
  //   for (const i in roleSets) {
  //     if (roleSets.hasOwnProperty(i)) {
  //       const roleSet: RoleSet = roleSets[i];
  //       let roleStates: RoleDetailList;

  //       roleSet._role_list

  //       // switch (roleSet.state) {
  //       //   /** if the roleset is in editable mode, the roles that are in project need to be taken */
  //       //   case 'editable':
  //       //     roleStates = roleSet.roleStatesInProject;

  //       //     /** for each RoleState */
  //       //     for (const j in roleStates) {
  //       //       if (roleStates.hasOwnProperty(j)) {
  //       //         const roleState: RoleDetail = roleStates[j]
  //       //         if (!roleState.isCircular)
  //       //           roles.push(StateToDataService.roleStateToRoleToRelate(roleState, eprOptions));

  //       //       }
  //       //     }

  //       //     break;

  //       //   /** 
  //       //    * if the roleset is in add-pe-it mode, the roles that are in other projects need to be taken.
  //       //    * in this case, we take some of the community data and put it in the epr.
  //       //    */
  //       //   case 'add-pe-it':
  //       //     roleStates = roleSet.roleStatesInOtherProjects

  //       //     // find role of roleSet with highest number of display count.
  //       //     let pkEntityWithHighestCount = RoleSetService.getDisplayRangeFavoriteOfRoleStates(roleStates);

  //       //     /** for each RoleState */
  //       //     for (const j in roleStates) {
  //       //       let eprOpt = eprOptions ? eprOptions : new InfEntityProjectRel()

  //       //       if (roleStates.hasOwnProperty(j)) {
  //       //         const roleState: RoleDetail = roleStates[j]

  //       //         // take over the community favorite calendar
  //       //         if (roleState.role.community_favorite_calendar) {
  //       //           eprOpt.calendar = roleState.role.community_favorite_calendar;
  //       //         }

  //       //         // take over the community favorite display role
  //       //         if (roleState.role.pk_entity === pkEntityWithHighestCount) {
  //       //           eprOpt.is_standard_in_project = true;
  //       //         } else {
  //       //           eprOpt.is_standard_in_project = false;
  //       //         }

  //       //         if (!roleState.isCircular)
  //       //           roles.push(StateToDataService.roleStateToRoleToRelate(roleState, eprOpt));

  //       //       }
  //       //     }


  //       //   default:
  //       //     break;
  //       // }



  //     }
  //   }

  //   return roles;
  // }

  // /**
  //  * Transforms a given ExistenceTimeState object to an object that can be passed to the
  //  * api in order to chante the project relation roles (and potentially to its children)
  //  * 
  //  * @param teEntState 
  //  */
  // static existenceTimeToRolesToRelate(teEntState: ExistenceTimeDetail, eprOptions?: InfEntityProjectRel): InfRole[] {
  //   return StateToDataService.roleSetsToRolesToRelate(teEntState.roleSets, eprOptions);
  // }

  /**
   * Convert ExistenceTimeDetail to ExistenceTime
   * @param existTimeDetail 
   */
  static existenceTimeStateToExistenceTime(existTimeDetail: ExistenceTimeDetail): ExistenceTime {
    if (!existTimeDetail) return null;

    let et = new ExistenceTime();

    const conf = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY;

    if (existTimeDetail._roleSet_list)
      U.obj2Arr(existTimeDetail._roleSet_list).map((set: RoleSet) => {
        if (set._role_list)
          U.obj2Arr(set._role_list).map((sta: RoleDetail) => {
            const pkProp = sta.role.fk_property;
            const existTimeKey = conf[pkProp];
            if (existTimeKey) {
              et[existTimeKey] = U.InfTpAndInfRole2Tp(sta.role.time_primitive, sta.role)
            }
          })
      })

    return et;
  }

  /**
   * Extracts Appellation Label string from the given TeEnt-RoleSets
   * 
   * @param teEntRoleSets 
   * @returns appellation label as pure string
   */
  static getDisplayAppeLabelOfTeEntRoleSets(teEntRoleSets: RoleSetList): string {
    if (!teEntRoleSets) return null

    const detailedNames: RoleSet = teEntRoleSets['_' + DfhConfig.PROPERTY_PK_R64_USED_NAME + '_outgoing'];
    if (detailedNames) {
      const roleStates = RoleSetService.getRoleStatesContainerForState(detailedNames)
      for (const key in roleStates) {
        if (roleStates.hasOwnProperty(key)) {
          const r: RoleDetail = roleStates[key];

          //TODO Add this if clause as soon as we have DisplayRoleForDomain in the db
          // if ((r.isOutgoing && r.isDisplayRoleForRange) || (!r.isOutgoing && r.isDisplayRoleForDomain)) {
          if (r.role && r.role.appellation && r.role.appellation.appellation_label) {
            return new AppellationLabel(r.role.appellation.appellation_label).getString();
          }
          // }

        }
      }

      return null;
    }
  }



  /**
   * Extracts Appellation Label string from the given PeIt-RoleSets
   * @param teEntRoleSets 
   * @returns appellation label as pure string
   */
 static getDisplayAppeLabelOfPeItRoleSets(peItRoleSets: RoleSetList): string {
    if (!peItRoleSets) return null

    // get ingoing roles pointing to appellation usage (R63)
    const names: RoleSet = peItRoleSets['_1_ingoing'];
    if (names) {
      const roleStates = RoleSetService.getRoleStatesContainerForState(names)
      for (const key in roleStates) {
        if (roleStates.hasOwnProperty(key)) {
          const r: RoleDetail = roleStates[key];
          if ((!r.isOutgoing && r.isDisplayRoleForRange) || (r.isOutgoing && r.isDisplayRoleForDomain)) {
            if (r._teEnt && r._teEnt._roleSet_list){
              var label = StateToDataService.getDisplayAppeLabelOfTeEntRoleSets(r._teEnt._roleSet_list);
              return label;
            }
          }
        }
      }
    }
    return null;
  }



}
