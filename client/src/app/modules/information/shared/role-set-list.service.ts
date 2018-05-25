import { Injectable, Inject, forwardRef } from '@angular/core';
import { ClassService } from './class.service';
import { BehaviorSubject } from 'rxjs';
import { RoleService } from './role.service';
import { PropertyService } from './property.service';
import { Observable } from 'rxjs/Observable';
import { IRoleSets } from '../components/role-set-list/role-set-list.model';
import { IRoleSetState, RoleSetState } from '../components/role-set/role-set.model';
import { DfhConfig } from './dfh-config';
import { AppellationLabel } from './appellation-label/appellation-label';
import { IRoleState, RoleState } from '../components/role/role.model';
import { RoleSetService } from './role-set.service';
import { InfRole } from 'app/core';
import { roleStateKey } from '../components/role-set/role-set.actions';
import { indexBy, groupBy, prop } from 'ramda';
import { roleSetKey } from '../components/role-set-list/role-set-list-actions';
import { StateToDataService } from './state-to-data.service';

@Injectable()
export class RoleSetListService {

  constructor(
    private classService: ClassService,
    private propertyService: PropertyService,
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

}
