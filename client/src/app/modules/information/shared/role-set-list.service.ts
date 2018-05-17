import { Injectable, Inject, forwardRef } from '@angular/core';
import { ClassService } from './class.service';
import { BehaviorSubject } from 'rxjs';
import { RoleService } from './role.service';
import { PropertyService } from './property.service';
import { Observable } from 'rxjs/Observable';
import { IRoleSets } from '../components/role-set-list/role-set-list.model';
import { IRoleSetState, RoleSetState } from '../components/role-set/role-set.model';
import { ConfigService } from './config.service';
import { AppellationLabel } from './appellation-label/appellation-label';
import { IRoleState, RoleState } from '../components/role/role.model';
import { RoleSetService } from './role-set.service';
import { InfRole } from 'app/core';
import { roleStateKey } from '../components/role-set/role-set.actions';
import { indexBy, groupBy, prop } from 'ramda';
import { roleSetKey } from '../components/role-set-list/role-set-list-actions';

@Injectable()
export class RoleSetListService {

  constructor(
    private classService: ClassService,
    private propertyService: PropertyService,
    private dfhConfig: ConfigService,
    private roleService: RoleService
  ) { }

  //TODO Remove this in favor to initRoleSetList
  initChildren(fkClass$, roles$, state$): BehaviorSubject<{ roleSetsWithRoles: IRoleSetState[], ingoingRoleSets: IRoleSetState[], outgoingRoleSets: IRoleSetState[] }> {
    const subject: BehaviorSubject<{ roleSetsWithRoles: IRoleSetState[], ingoingRoleSets: IRoleSetState[], outgoingRoleSets: IRoleSetState[] }> = new BehaviorSubject(null)

    fkClass$.subscribe(fkClass => {
      if (fkClass)
        Observable.zip(
          // Generate ingoing and outgoing properties
          this.classService.getIngoingProperties(fkClass),
          this.classService.getOutgoingProperties(fkClass),
          roles$,
          state$
        ).subscribe(result => {
          const ingoingProperties = result[0];
          const outgoingProperties = result[1];
          const roles = result[2];
          const state = result[3];

          // Generate Direction Aware Properties (they appear in the select/dropdown to add new RoleSet)
          const ingoingRoleSets = this.propertyService.toRoleSets(false, ingoingProperties)
          const outgoingRoleSets = this.propertyService.toRoleSets(true, outgoingProperties)

          // Generate roleSets (like e.g. the names-section, the birth-section or the detailed-name secition)
          const options: IRoleSetState = { state: state, toggle: 'collapsed' }
          const roleSetsWithRoles = this.roleService.addRolesToRoleSets(roles, ingoingRoleSets, outgoingRoleSets, options)

          subject.next({ roleSetsWithRoles, ingoingRoleSets, outgoingRoleSets });

        })
    })


    return subject;
  }




  /**
 * Returns the Appellation Label String that is for display in this project, from the given teEnt roleSets
 * @param teEntRoleSets 
 * @returns appellation label as pure string
 */
  getDisplayAppeLabelOfTeEntRoleSets(teEntRoleSets: IRoleSets): string {
    if (!teEntRoleSets) return null

    const detailedNames: IRoleSetState = teEntRoleSets[this.dfhConfig.PROPERTY_PK_R64_USED_NAME + '_outgoing'];
    if (detailedNames) {
      const roleStates = RoleSetService.getRoleStatesContainerForState(detailedNames)
      for (const key in roleStates) {
        if (roleStates.hasOwnProperty(key)) {
          const r: IRoleState = roleStates[key];

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



  getDisplayAppeLabelOfPeItRoleSets(peItRoleSets: IRoleSets): string {
    if (!peItRoleSets) return null

    // get ingoing roles pointing to appellation usage (R63)
    const names: RoleSetState = peItRoleSets['1_ingoing'];
    if (names) {
      const roleStates = RoleSetService.getRoleStatesContainerForState(names)
      for (const key in roleStates) {
        if (roleStates.hasOwnProperty(key)) {
          const r: IRoleState = roleStates[key];
          if ((!r.isOutgoing && r.isDisplayRoleForRange) || (r.isOutgoing && r.isDisplayRoleForDomain)) {
            if (r.childTeEnt && r.childTeEnt.roleSets){
              var label = this.getDisplayAppeLabelOfTeEntRoleSets(r.childTeEnt.roleSets);
              console.log(label)
              return label;
            }
          }
        }
      }
    }
    return null;
  }

}
