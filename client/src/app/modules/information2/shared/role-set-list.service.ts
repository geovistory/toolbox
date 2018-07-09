import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { RoleSet } from '../information.models';
import { ClassService } from './class.service';
import { PropertyService } from './property.service';
import { RoleService } from './role.service';
import { U } from 'app/core';

@Injectable()
export class RoleSetListService {

  constructor(
    private classService: ClassService,
    private propertyService: PropertyService,
    private roleService: RoleService
  ) { }

  //TODO Remove this in favor to initDataUnitChildList
  initChildren(fkClass$, roles$, state$): BehaviorSubject<{ roleSetsWithRoles: RoleSet[], ingoingRoleSets: RoleSet[], outgoingRoleSets: RoleSet[] }> {
    const subject: BehaviorSubject<{ roleSetsWithRoles: RoleSet[], ingoingRoleSets: RoleSet[], outgoingRoleSets: RoleSet[] }> = new BehaviorSubject(null)

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
          const ingoingRoleSets = U.infProperties2RoleSets(false, ingoingProperties)
          const outgoingRoleSets = U.infProperties2RoleSets(true, outgoingProperties)

          // Generate roleSets (like e.g. the names-section, the birth-section or the detailed-name secition)
          const options: RoleSet = { toggle: 'collapsed' }
          const roleSetsWithRoles = this.roleService.addRolesToRoleSets(roles, ingoingRoleSets, outgoingRoleSets, options)

          subject.next({ roleSetsWithRoles, ingoingRoleSets, outgoingRoleSets });

        })
    })


    return subject;
  }

}
