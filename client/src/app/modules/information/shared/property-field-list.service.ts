import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { PropertyField } from 'app/core/state/models';
import { ClassService } from './class.service';
import { PropertyService } from './property.service';
import { RoleService } from './role.service';
import { U, InfRole } from 'app/core';

@Injectable()
export class PropertyFieldListService {

  constructor(
    private classService: ClassService,
    private propertyService: PropertyService,
    private roleService: RoleService
  ) { }

  //TODO Remove this in favor to initFieldList
  initChildren(fkClass$, roles$: Observable<InfRole[]>, state$): BehaviorSubject<{ propertyFieldsWithRoles: PropertyField[], ingoingPropertyFields: PropertyField[], outgoingPropertyFields: PropertyField[] }> {
    const subject: BehaviorSubject<{ propertyFieldsWithRoles: PropertyField[], ingoingPropertyFields: PropertyField[], outgoingPropertyFields: PropertyField[] }> = new BehaviorSubject(null)

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

          // Generate Direction Aware Properties (they appear in the select/dropdown to add new PropertyField)
          const ingoingPropertyFields = U.infProperties2PropertyFields(false, ingoingProperties)
          const outgoingPropertyFields = U.infProperties2PropertyFields(true, outgoingProperties)

          // Generate propertyFields (like e.g. the names-section, the birth-section or the detailed-name secition)
          const options = new PropertyField({ toggle: 'collapsed' })
          const propertyFieldsWithRoles = this.roleService.addRolesToPropertyFields(roles, ingoingPropertyFields, outgoingPropertyFields, options)

          subject.next({ propertyFieldsWithRoles, ingoingPropertyFields, outgoingPropertyFields });

        })
    })


    return subject;
  }

}
