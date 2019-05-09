import { Injectable } from '@angular/core';
import { TimeSpan, ProInfoProjRel, InfPersistentItem, InfRole, InfTemporalEntity, U } from 'app/core';
import { FieldList, ExistenceTimeDetail, PeItDetail, RoleDetail, RoleDetailList, PropertyField, TeEntDetail } from 'app/core/state/models';
import { DfhConfig } from './dfh-config';
import { Field } from 'app/core/state/models/field';

@Injectable()
export class StateToDataService {


  private static getOwnEpr(entity): ProInfoProjRel {
    return !entity.entity_version_project_rels ? {} :
      !entity.entity_version_project_rels[0] ? {} :
        entity.entity_version_project_rels[0];
  }

  private static createEpr(entity, eprOptions): ProInfoProjRel {
    const ownEpr = StateToDataService.getOwnEpr(entity);
    const overridesOwnEpr = new ProInfoProjRel;
    overridesOwnEpr.fk_entity_version_concat = entity.pk_entity_version_concat;
    overridesOwnEpr.is_in_project = undefined;

    return new ProInfoProjRel(Object.assign(ownEpr, overridesOwnEpr, eprOptions));
  }



  /**
  * Transforms a given PeItState object to an object that can be passed to the
   * api in order to change the project relation to the peIt (and potentially to its children)
   */
  static peItStateToPeItToRelate(peItDetail: PeItDetail, eprOptions?: ProInfoProjRel): InfPersistentItem {
    const peIt = new InfPersistentItem(peItDetail.peIt);
    peIt.entity_version_project_rels = [StateToDataService.createEpr(peIt, eprOptions)]

    peIt.pi_roles = StateToDataService.propertyFieldsToRolesToRelate(peItDetail._fields, eprOptions)

    return peIt;
  }


  /**
   * Transforms a given RoleState object to an object that can be passed to the
   * api in order to chante the project relation to the role (and potentially to its children)
   */
  static roleStateToRoleToRelate(roleState: RoleDetail, eprOptions?: ProInfoProjRel): InfRole {
    const role = new InfRole(roleState.role);
    role.entity_version_project_rels = [StateToDataService.createEpr(role, eprOptions)]

    if (!roleState._teEnt) {
      /** If the role leads to a peIt or an object, this means that only the role needs to be removed from project */
      return role;
    } else if (roleState._teEnt) {
      /** If the role leads to a temporal entity, this means that the temporal entity and its roles need to be removed from project */
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
  static teEntToTeEntToRelate(teEntState: TeEntDetail, eprOptions?: ProInfoProjRel): InfTemporalEntity {
    const teEnt = new InfTemporalEntity(teEntState.teEnt);
    teEnt.entity_version_project_rels = [StateToDataService.createEpr(teEnt, eprOptions)]


    teEnt.te_roles = StateToDataService.propertyFieldsToRolesToRelate(teEntState._fields, eprOptions);

    return teEnt;
  }

  static propertyFieldsToRolesToRelate(children: FieldList, eprOptions?: ProInfoProjRel): InfRole[] {

    const roles: InfRole[] = [];

    /** for each PropertyField */
    for (const i in children) {
      if (children.hasOwnProperty(i)) {
        const child: Field = children[i];

        if (child.type == 'PropertyField') {
          const roleDetailList: RoleDetailList = (child as PropertyField)._role_list;

          /** for each RoleState */
          for (const j in roleDetailList) {
            if (roleDetailList.hasOwnProperty(j)) {
              const roleState: RoleDetail = roleDetailList[j]
              if (!roleState.isCircular) {
                roles.push(StateToDataService.roleStateToRoleToRelate(roleState, eprOptions));
              }
            }
          }
        } else if (child.type == 'ExistenceTimeDetail') {
          U.obj2Arr((child as ExistenceTimeDetail)._fields).forEach((propertyField) => {
            U.obj2Arr(propertyField._role_list).forEach((roleDetail: RoleDetail) => {
              if (!roleDetail.isCircular) {
                roles.push(StateToDataService.roleStateToRoleToRelate(roleDetail, eprOptions));
              }
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
  static existenceTimeToRolesToRelate(teEntState: ExistenceTimeDetail, eprOptions?: ProInfoProjRel): InfRole[] {
    if (teEntState) return StateToDataService.propertyFieldsToRolesToRelate(teEntState._fields as FieldList, eprOptions);
    else return []
  }

  /**
   * Convert ExistenceTimeDetail to ExistenceTime
   * @param existTimeDetail
   */
  static existenceTimeStateToExistenceTime(existTimeDetail: ExistenceTimeDetail): TimeSpan {
    if (!existTimeDetail) return null;

    const et = new TimeSpan();

    const conf = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY;

    if (existTimeDetail._fields) {
      U.obj2Arr(existTimeDetail._fields).map((set: PropertyField) => {
        if (set._role_list) {
          U.obj2Arr(set._role_list).map((sta: RoleDetail) => {
            const pkProp = sta.role.fk_property;
            const existTimeKey = conf[pkProp];
            if (existTimeKey) {
              et[existTimeKey] = U.InfTpAndInfRole2Tp(sta.role.time_primitive, sta.role)
            }
          })
        }
      })
    }
    return et;
  }

  constructor() { }

  // /**
  //  * Extracts Appellation Label string from the given TeEnt-PropertyFields
  //  *
  //  * @param teEntPropertyFields
  //  * @returns appellation label as pure string
  //  */
  // static getDisplayAppeLabelOfTeEntPropertyFields(teEntPropertyFields: PropertyFieldList): string {
  //   if (!teEntPropertyFields) return null

  //   const detailedNames: PropertyField = teEntPropertyFields['_' + DfhConfig.PROPERTY_PK_R64_USED_NAME + '_outgoing'];
  //   if (detailedNames) {
  //     const roleStates = PropertyFieldService.getRoleStatesContainerForState(detailedNames)
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
  //  * Extracts Appellation Label string from the given PeIt-PropertyFields
  //  * @param teEntPropertyFields
  //  * @returns appellation label as pure string
  //  */
  // static getDisplayAppeLabelOfPeItPropertyFields(peItPropertyFields: FieldList): string {
  //   if (!peItPropertyFields) return null

  //   // get ingoing roles pointing to appellation usage (R63)



  //   const names: PropertyField[] = U.obj2Arr(peItPropertyFields).filter((propertyField: PropertyField) => {
  //     if (propertyField && propertyField.property && propertyField.property.dfh_fk_property_of_origin === DfhConfig.PROPERTY_PK_R63_NAMES) {
  //       return propertyField;
  //     }
  //   })

  //   const name: PropertyField = names[0];

  //   if (name) {
  //     const roleStates = PropertyFieldService.getRoleStatesContainerForState(name)
  //     for (const key in roleStates) {
  //       if (roleStates.hasOwnProperty(key)) {
  //         const r: RoleDetail = roleStates[key];
  //         if ((!r.isOutgoing && r.isDisplayRoleForRange) || (r.isOutgoing && r.isDisplayRoleForDomain)) {
  //           if (r._teEnt && r._teEnt._fields) {
  //             // var label = StateToDataService.getDisplayAppeLabelOfTeEntPropertyFields(r._teEnt._fields);
  //             return 'label to do';
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return null;
  // }



}
