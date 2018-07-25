import { Injectable } from '@angular/core';
import { InfRole, InfEntityProjectRel, InfTemporalEntity, InfPersistentItem, U, TimePrimitive, ExistenceTime } from 'app/core';
import { RoleSetService } from './role-set.service';
import { DfhConfig } from './dfh-config';
import { AppellationLabel } from './appellation-label/appellation-label';
import { PeItDetail, RoleDetailList, RoleSetList, RoleSet, RoleDetail, TeEntDetail, ExistenceTimeDetail, DataUnitChildList, DataUnitChild } from '../information.models';

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
  static peItStateToPeItToRelate(peItDetail: PeItDetail, eprOptions?: InfEntityProjectRel): InfPersistentItem {
    let peIt = new InfPersistentItem(peItDetail.peIt);
    peIt.entity_version_project_rels = [StateToDataService.createEpr(peIt, eprOptions)]

    peIt.pi_roles = StateToDataService.roleSetsToRolesToRelate(peItDetail._children, eprOptions)

    return peIt;
  }


  /**
   * Transforms a given RoleState object to an object that can be passed to the
   * api in order to chante the project relation to the role (and potentially to its children)
   */
  static roleStateToRoleToRelate(roleState: RoleDetail, eprOptions?: InfEntityProjectRel): InfRole {
    let role = new InfRole(roleState.role);
    role.entity_version_project_rels = [StateToDataService.createEpr(role, eprOptions)]

    /** If the role leads to a peIt or an object, this means that only the role needs to be removed from project */
    if (!roleState._teEnt) {
      return role;
    }
    /** If the role leads to a temporal entity, this means that the temporal entity and its roles need to be removed from project */
    else if (roleState._teEnt) {
      role.temporal_entity = StateToDataService.teEntToTeEntToRelate(roleState._teEnt, eprOptions)
      return role;
    }
  }

  /**
   * Transforms a given TeEntState object to an object that can be passed to the
   * api in order to chante the project relation to the teEnt (and potentially to its children)
   * 
   * @param teEntState 
   */
  static teEntToTeEntToRelate(teEntState: TeEntDetail, eprOptions?: InfEntityProjectRel): InfTemporalEntity {
    let teEnt = new InfTemporalEntity(teEntState.teEnt);
    teEnt.entity_version_project_rels = [StateToDataService.createEpr(teEnt, eprOptions)]


    teEnt.te_roles = StateToDataService.roleSetsToRolesToRelate(teEntState._children, eprOptions);

    return teEnt;
  }

  static roleSetsToRolesToRelate(children: DataUnitChildList, eprOptions?: InfEntityProjectRel): InfRole[] {

    let roles: InfRole[] = [];

    /** for each RoleSet */
    for (const i in children) {
      if (children.hasOwnProperty(i)) {
        const child: DataUnitChild = children[i];

        if (child.type == 'RoleSet') {
          let roleDetailList: RoleDetailList = (child as RoleSet)._role_list;

          /** for each RoleState */
          for (const j in roleDetailList) {
            if (roleDetailList.hasOwnProperty(j)) {
              const roleState: RoleDetail = roleDetailList[j]
              if (!roleState.isCircular)
                roles.push(StateToDataService.roleStateToRoleToRelate(roleState, eprOptions));
            }
          }
        }
        else if (child.type == 'ExistenceTimeDetail') {
          U.obj2Arr((child as ExistenceTimeDetail)._children).forEach((roleSet) => {
            U.obj2Arr(roleSet._role_list).forEach((roleDetail: RoleDetail) => {
              if (!roleDetail.isCircular)
                roles.push(StateToDataService.roleStateToRoleToRelate(roleDetail, eprOptions));
            });
          })
        }

      }
    }

    return roles;
  }

  /**
   * Transforms a given ExistenceTimeState object to an object that can be passed to the
   * api in order to chante the project relation roles (and potentially to its children)
   * 
   * @param teEntState 
   */
  static existenceTimeToRolesToRelate(teEntState: ExistenceTimeDetail, eprOptions?: InfEntityProjectRel): InfRole[] {
    if (teEntState)
      return StateToDataService.roleSetsToRolesToRelate(teEntState._children as DataUnitChildList, eprOptions);
    else
      return []
  }

  /**
   * Convert ExistenceTimeDetail to ExistenceTime
   * @param existTimeDetail 
   */
  static existenceTimeStateToExistenceTime(existTimeDetail: ExistenceTimeDetail): ExistenceTime {
    if (!existTimeDetail) return null;

    let et = new ExistenceTime();

    const conf = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY;

    if (existTimeDetail._children)
      U.obj2Arr(existTimeDetail._children).map((set: RoleSet) => {
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

  // /**
  //  * Extracts Appellation Label string from the given TeEnt-RoleSets
  //  * 
  //  * @param teEntRoleSets 
  //  * @returns appellation label as pure string
  //  */
  // static getDisplayAppeLabelOfTeEntRoleSets(teEntRoleSets: RoleSetList): string {
  //   if (!teEntRoleSets) return null

  //   const detailedNames: RoleSet = teEntRoleSets['_' + DfhConfig.PROPERTY_PK_R64_USED_NAME + '_outgoing'];
  //   if (detailedNames) {
  //     const roleStates = RoleSetService.getRoleStatesContainerForState(detailedNames)
  //     for (const key in roleStates) {
  //       if (roleStates.hasOwnProperty(key)) {
  //         const r: RoleDetail = roleStates[key];

  //         //TODO Add this if clause as soon as we have DisplayRoleForDomain in the db
  //         // if ((r.isOutgoing && r.isDisplayRoleForRange) || (!r.isOutgoing && r.isDisplayRoleForDomain)) {
  //         if (r.role && r.role.appellation && r.role.appellation.appellation_label) {
  //           return new AppellationLabel(r.role.appellation.appellation_label).getString();
  //         }
  //         // }

  //       }
  //     }

  //     return null;
  //   }
  // }



  // /**
  //  * Extracts Appellation Label string from the given PeIt-RoleSets
  //  * @param teEntRoleSets 
  //  * @returns appellation label as pure string
  //  */
  // static getDisplayAppeLabelOfPeItRoleSets(peItRoleSets: DataUnitChildList): string {
  //   if (!peItRoleSets) return null

  //   // get ingoing roles pointing to appellation usage (R63)



  //   const names: RoleSet[] = U.obj2Arr(peItRoleSets).filter((roleSet: RoleSet) => {
  //     if (roleSet && roleSet.property && roleSet.property.dfh_fk_property_of_origin === DfhConfig.PROPERTY_PK_R63_NAMES) {
  //       return roleSet;
  //     }
  //   })

  //   const name: RoleSet = names[0];

  //   if (name) {
  //     const roleStates = RoleSetService.getRoleStatesContainerForState(name)
  //     for (const key in roleStates) {
  //       if (roleStates.hasOwnProperty(key)) {
  //         const r: RoleDetail = roleStates[key];
  //         if ((!r.isOutgoing && r.isDisplayRoleForRange) || (r.isOutgoing && r.isDisplayRoleForDomain)) {
  //           if (r._teEnt && r._teEnt._children) {
  //             // var label = StateToDataService.getDisplayAppeLabelOfTeEntRoleSets(r._teEnt._children);
  //             return 'label to do';
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return null;
  // }



}
