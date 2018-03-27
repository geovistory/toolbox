import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ExistenceTime } from '../components/existence-time';
import { InfTemporalEntity, ActiveProjectService, InfRole, DfhProperty, InfTemporalEntityApi, TimePrimitive, InfTimePrimitive } from 'app/core';
import { ConfigService } from './config.service';
import { PropertyService } from './property.service';

@Injectable()
export class TeEntService {

  properties: DfhProperty[];

  constructor(
    private activeProject: ActiveProjectService,
    private config: ConfigService,
    private propertyService: PropertyService,
    private teEntApi: InfTemporalEntityApi
  ) { }

  /**
   * Returns an observable that emitts an array of DfhProperty 
   * that have TimePrimitive as range
   */
  relevantProperties(): Observable<DfhProperty[]> {
    const rangeClassPk = this.config.timePrimitiveClass;
    return this.propertyService.getPropertyByFkRangeClass(rangeClassPk)
  }

  /**
   * Persists the existence time of a temporal entity to data base
   * @param newExistenceTime the new ExistenceTime object
   * @param temporalEntity the temporal entity with nested roles that defined the old existence time
   * @return {Observable<teEnt>} returns an Observable with the updated teEnt with the new roles for existence time 
   */
  updateExistenceTime(newExistenceTime: ExistenceTime, temporalEntity: InfTemporalEntity) {
    let rolesToRemove: InfRole[]; // roles to remove from project 
    let rolesToAdd: InfRole[]; // roles to remove from project 


    // get all DfhProperties that have TimePrimitives as range
    this.relevantProperties().subscribe((props: DfhProperty[]) => {

      const tpRoleFks = props.map(prop => prop.dfh_pk_property);

      // Filter all roles of the teEnt, that point to a time primitive      
      var oldRoles = temporalEntity.te_roles.filter(role => tpRoleFks.includes(role.fk_property))

      // Create a nested object of the teEnt
      let teEnt = new InfTemporalEntity(temporalEntity);
      teEnt.te_roles = [];

      // add roles and time primitives
      const keys = Object.keys(this.config.existenceTimeToFk)
      for (const key in newExistenceTime) {
        if (newExistenceTime.hasOwnProperty(key) && keys.includes(key)) {
          const timePrimitive: TimePrimitive = newExistenceTime[key];

          const infTimePrimitive = new InfTimePrimitive({
            julian_day: timePrimitive.julianDay,
            duration: timePrimitive.duration,
            fk_class: this.config.timePrimitiveClass
          });

          let role = new InfRole();
          role.fk_temporal_entity = teEnt.pk_entity;
          role.fk_property = this.config.existenceTimeToFk[key];
          role.time_primitive = infTimePrimitive;

          teEnt.te_roles.push(role);
        }
      }

      // persist this in DB
      this.teEntApi.findOrCreateInfTemporalEntity(
        this.activeProject.project.pk_project,
        teEnt
      ).subscribe(teEnts => {

        let resultingRoles = teEnts[0].te_roles;

        // Iterate over the old timePrimitive-roles of teEnt 

        // If role is still present in resultingRoles, remove the role from resultingRoles

        // If the role is not present anymore, add the role to rolesToRemove

        // remove the rolesToRemove
        this.teEntApi

        // Now iterate over resultingRoles and push them to the teEnt

        //return the teEnt


      });
    });
  };


  /**
   * Builds an ExistenceTime Instance for the given teEnt
   * @param teEnt the temporalEntity coming from the DB
   */
  buildExistenceTime(teEnt: InfTemporalEntity): EventEmitter<ExistenceTime> {
    const emitter: EventEmitter<ExistenceTime> = new EventEmitter();

    let existenceTime = new ExistenceTime()

    // switch keys and vals
    let keyByPk = {};
    for (let key in this.config.existenceTimeToFk) {
      let value = this.config.existenceTimeToFk[key];
      keyByPk[value] = key;
    }

    this.filterRolesPointingToTimePrimitive(teEnt).subscribe(roles => {
      roles.forEach(role => {
        var key = keyByPk[role.fk_property]
        existenceTime[key]= new TimePrimitive();
        existenceTime[key].duration =role.time_primitive.duration;
        existenceTime[key].julianDay = parseInt(role.time_primitive.julian_day);
        existenceTime[key].calendar = 'julian';
        
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