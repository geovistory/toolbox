import { Injectable, EventEmitter, Inject, forwardRef } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { InfTemporalEntity, InfRole, DfhProperty, InfTemporalEntityApi, TimePrimitive, InfTimePrimitive, InfEntityProjectRel, InfAppellation, TimeSpan } from 'app/core';
import { DfhConfig } from './dfh-config';
import { PropertyService } from './property.service';
import { ClassService } from './class.service';
import { AppellationLabel } from './appellation-label/appellation-label';
import { EprService } from './epr.service';

@Injectable()
export class TeEntService {

  properties: DfhProperty[];

  constructor(
    private propertyService: PropertyService,
    private teEntApi: InfTemporalEntityApi,
    private eprService: EprService,
  ) { }


  getNestedObject(pkEntity: number, pkProject?: number): ReplaySubject<InfTemporalEntity> {

    const subject = new ReplaySubject<InfTemporalEntity>(null);

    this.eprService.checkIfInProject(pkEntity, pkProject).subscribe(isInProject => {

      this.teEntApi.nestedObject(isInProject, pkProject, pkEntity).subscribe((teEnts: InfTemporalEntity[]) => {

        subject.next(teEnts[0]);

      });

    })

    return subject;

  }

  /**
   * Returns an observable that emitts an array of DfhProperty 
   * that have TimePrimitive as range
   */
  relevantProperties(): Observable<DfhProperty[]> {
    const rangeClassPk = DfhConfig.timePrimitiveClass;
    return this.propertyService.getPropertyByFkRangeClass(rangeClassPk)
  }


  /**
   * Builds an ExistenceTime Instance from the given teEnt
   * @param teEnt the temporalEntity coming from the DB
   */
  buildExistenceTime(teEnt: InfTemporalEntity): EventEmitter<TimeSpan> {
    const emitter: EventEmitter<TimeSpan> = new EventEmitter();

    let existenceTime = new TimeSpan()

    // switch keys and vals
    let keyByPk = {};
    for (let key in DfhConfig.existenceTimeToFk) {
      let value = DfhConfig.existenceTimeToFk[key];
      keyByPk[value] = key;
    }

    this.filterRolesPointingToTimePrimitive(teEnt).subscribe(roles => {
      roles.forEach((role: InfRole) => {
        var key = keyByPk[role.fk_property]
        existenceTime[key] = new TimePrimitive();
        existenceTime[key].duration = role.time_primitive.duration;
        existenceTime[key].julianDay = new Number(role.time_primitive.julian_day);

        // Set calendar information for project view
        if (role.entity_version_project_rels && role.entity_version_project_rels[0].calendar)
          existenceTime[key].calendar = role.entity_version_project_rels[0].calendar;

        // Set calendar information for repository view
        else if (role.community_favorite_calendar)
          existenceTime[key].calendar = role.community_favorite_calendar;

        // If no calendar information is provided, throw error
        else throw Error('no calendar information provided');
      });
      emitter.emit(existenceTime);
    })

    return emitter;
  }




  filterRolesPointingToTimePrimitive(teEnt: InfTemporalEntity): EventEmitter<InfRole[]> {

    const emitter: EventEmitter<InfRole[]> = new EventEmitter();

    // get all DfhProperties that have TimePrimitives as range
    this.relevantProperties().subscribe((props: DfhProperty[]) => {

      const tpRoleFks = props.map(prop => prop.dfh_pk_property);

      // Filter all roles of the teEnt, that point to a time primitive      
      var roles = teEnt.te_roles.filter(role => tpRoleFks.includes(role.fk_property))

      emitter.emit(roles)
    });

    return emitter;

  }


}