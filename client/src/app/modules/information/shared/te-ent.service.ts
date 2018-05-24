import { Injectable, EventEmitter, Inject, forwardRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ExistenceTime } from '../components/existence-time';
import { InfTemporalEntity, ActiveProjectService, InfRole, DfhProperty, InfTemporalEntityApi, TimePrimitive, InfTimePrimitive, InfEntityProjectRel, InfAppellation } from 'app/core';
import { ConfigService } from './config.service';
import { PropertyService } from './property.service';
import { EditorStates } from '../information.models';
import { BehaviorSubject } from 'rxjs';
import { ITeEntState, TeEntState } from '../components/te-ent/te-ent.model';
import { ClassService } from './class.service';
import { AppellationLabel } from './appellation-label/appellation-label';

@Injectable()
export class TeEntService {

  properties: DfhProperty[];

  constructor(
    private activeProject: ActiveProjectService,
    private config: ConfigService,
    private propertyService: PropertyService,
    private teEntApi: InfTemporalEntityApi,
    private classService: ClassService,
    private dfhConfig: ConfigService
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
  upsertExistenceTime(newExistenceTime: ExistenceTime, temporalEntity: InfTemporalEntity): Observable<InfTemporalEntity> {
    const observable: Observable<InfTemporalEntity> = new Observable((observer) => {

      let rolesToRemove: InfRole[] = []; // roles to remove from the teEnt and from the project 
      let rolesToAdd: InfRole[]; // roles to add to the teEnt

      // get all DfhProperties that have TimePrimitives as range
      this.filterRolesPointingToTimePrimitive(temporalEntity).subscribe((oldRolesToTp: InfRole[]) => {
        const oldRoles = oldRolesToTp;

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

            // add calendar info to epr to role
            role.entity_version_project_rels = [];
            role.entity_version_project_rels[0] = new InfEntityProjectRel();
            role.entity_version_project_rels[0].is_in_project = true;
            role.entity_version_project_rels[0].calendar = timePrimitive.calendar;

            teEnt.te_roles.push(role);
          }
        }

        // persist this in DB
        this.teEntApi.findOrCreateInfTemporalEntity(
          this.activeProject.project.pk_project,
          teEnt
        ).subscribe(teEnts => {

          rolesToAdd = teEnts[0].te_roles;

          // Iterate over the old timePrimitive-roles of teEnt 
          oldRoles.forEach(oldR => {
            let wasRemoved = true;

            // If the resultingRole was already there in oldRoles, remove the newRole from rolesToAdd
            for (let i = 0; i < rolesToAdd.length; i++) {
              const newR = rolesToAdd[i];
              if (oldR.pk_entity == newR.pk_entity) {
                wasRemoved = false;
                rolesToAdd.splice(i, 1);
                break;
              }
            }

            // If the role was removed, add the oldRole to rolesToRemove
            if (wasRemoved) {
              rolesToRemove.push(oldR);
            }
          });

          // remove the rolesToRemove from project and from the temporalEntity

          this.removeRolesFromTeEnt(temporalEntity, rolesToRemove)
            .subscribe(teEnt => {

              // Now iterate over rolesToAdd and push them to the teEnt
              rolesToAdd.forEach(roleToAdd => {
                teEnt.te_roles.push(roleToAdd);
              });
              //return the teEnt
              observer.next(teEnt);
              observer.complete();
            })


        });
      });
    })
    return observable;
  };


  /**
   * Remove roles from given teEnt and from active project.
   * 
   * Remarks:
   * - Provide a proper epr for the teEnt
   * - Provide propert eprs for roles
   * 
   * @param teEnt Parent teEnt of the roles
   * @param roles roles to remove from project
   * @returns Observable<InfTemporalEntity>
   */
  removeRolesFromTeEnt(teEnt: InfTemporalEntity, roles: InfRole[]): Observable<InfTemporalEntity> {
    const rolesToRemove = roles;
    const observable: Observable<InfTemporalEntity> = new Observable(observer => {

      // if nothing to remove
      if (rolesToRemove.length === 0) {
        observer.next(teEnt);
        observer.complete();
        return;
      }

      let teEntForQuery = new InfTemporalEntity(teEnt);
      teEntForQuery.te_roles = []

      rolesToRemove.forEach(role => {
        if (role.entity_version_project_rels && role.entity_version_project_rels.length == 1) {
          role.entity_version_project_rels[0].is_in_project = false;
        }
        else {
          role.entity_version_project_rels = [];
        }

        // push role to remove to teEntForQuery
        teEntForQuery.te_roles.push(role);

        // remove role to remove from given teEnt
        const i = teEnt.te_roles.findIndex(r => r.pk_entity == role.pk_entity)
        if (i > -1) teEnt.te_roles.splice(i, 1)
      });

      const isInProject = false;
      this.teEntApi.changeTeEntProjectRelation(this.activeProject.project.pk_project, isInProject, teEntForQuery)
        .subscribe(result => {

          observer.next(teEnt);
          observer.complete();
        })

    })

    return observable;
  }



  /**
   * Builds an ExistenceTime Instance from the given teEnt
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



  /**
* Returns the Appellation Label String that is for display in this project, from the given teEnt
* @param teEnt 
* @returns appellation label as pure string
*/
  getDisplayAppeLabelOfTeEnt(teEnt: InfTemporalEntity): string | null {
    if (!teEnt || !teEnt.te_roles) return null


    const rolesToAppe: InfRole[] = teEnt.te_roles.filter(
      role => (role && role.appellation && role.appellation.appellation_label
        //TODO Add a clause as soon as we have DisplayRoleForDomain in the db to filter for the role that is standard?? or is this not happening on forms?
      ))

    return rolesToAppe.length ? new AppellationLabel(rolesToAppe[0].appellation.appellation_label).getString() : null;

  }
}