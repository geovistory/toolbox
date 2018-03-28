import {
  Component, OnChanges, OnInit, Input, Output, ViewChildren,
  QueryList, EventEmitter, ChangeDetectorRef
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { timer } from 'rxjs/observable/timer';

import { RolePointToEnum, RoleComponent, AppellationStdBool } from '../role/role.component';
import { TeEntComponent } from '../te-ent/te-ent.component';
import { PeItComponent } from '../pe-it/pe-it.component';
import { RoleSetComponent } from '../role-set/role-set.component';
import { TeEntRoleComponent } from '../te-ent-role/te-ent-role.component';
import { InfTemporalEntity, InfRole, InfEntityProjectRelApi, InfRoleApi, ActiveProjectService, EntityEditorService } from 'app/core';
import { RoleService } from '../../shared/role.service';
import { PropertyService } from '../../shared/property.service';
import { UtilitiesService } from '../../shared/utilities.service';



@Component({
  selector: 'gv-te-ent-role-set',
  templateUrl: './te-ent-role-set.component.html',
  styleUrls: ['./te-ent-role-set.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('expanded', style({
        height: '*',
      })),
      state('collapsed', style({
        height: '0px',
        overflow: 'hidden'
      })),
      transition('expanded => collapsed', animate('400ms ease-in-out', keyframes([
        style({
          height: '*',
          overflow: 'hidden',
          offset: 0
        }),
        style({
          height: '0px',
          display: 'hidden',
          offset: 1
        })
      ]))),
      transition('collapsed => expanded', animate('400ms ease-in-out', keyframes([
        style({
          height: '0px',
          overflow: 'hidden',
          offset: 0
        }),
        style({
          height: '*',
          display: 'hidden',
          offset: 1
        })
      ])))
    ])
  ]
})
export class TeEntRoleSetComponent extends RoleSetComponent implements OnChanges, OnInit {

  /**
  * Inputs
  */

  // The parent TemporalEntity
  @Input() parentTeEnt: InfTemporalEntity;

  //the role that is parent of the parent temporal entity
  @Input() parentRole: InfRole;

  // Array of children RoleComponents
  @ViewChildren(TeEntRoleComponent) roleComponents: QueryList<TeEntRoleComponent>


  constructor(
    eprApi: InfEntityProjectRelApi,
    roleApi: InfRoleApi,
    activeProject: ActiveProjectService,
    roleService: RoleService,
    propertyService: PropertyService,
    util: UtilitiesService,
    public entityEditor: EntityEditorService,
    changeDetector: ChangeDetectorRef
  ) {
    super(eprApi, roleApi, activeProject, roleService, propertyService, util, entityEditor, changeDetector)
  }


  /**
  * get isCircular - returns true if this roles point back to the same peIt
  * as at the root of the nested components 
  *
  * It's useful to prevent circular nesting of the components:
  * PeItEntity > … > Role > TeEnt > … > Role [> PeItEntity <- Stop circle here]
  *
  * @return {boolean}  true=circular, false=not circular
  */
  get isCircular() {

    // Return true, if all of this.roles are identical with the parent role
    // of the parent teEnt.

    if (this.pointTo === 'PeIt') {
      if (this.parentRole) {

        if (this.roles) {
          if (this.roles.length) {
            // If there are roles, we are obviously not in create state.
            // If all of this.roles are identical with the parent role
            // of the parent teEnt return true to say that this is circular

            let count = 0;
            this.roles.forEach(role => {
              if (role.pk_entity == this.parentRole.pk_entity) {

                // If this is a circular role, remove its epr so that it is not
                // two times in the entity tree. This prevents that changing the
                // entity project relation is interfered by this second (unused)
                // role

                delete role.entity_version_project_rels;

                count++;
              }
            })
            if (this.roles.length === count) {
              return true;
            }
          }
        }

        if (
          this.propState === 'create' &&
          this.fkProperty == this.parentRole.fk_property
        ) {

          // If we are in create state
          // and this.fkProperty is identical with the parent role fk_property
          // return true to say that this is circular

          return true;
        }
      }
    }

    return false;
  }


  /**
  * Called when user click on Add a [*]
  */
  startAddingRole() {

    this.rolesInNoProjectVisible = false;

    this.addRoleState = 'selectExisting'

    this.rolesNotInProjectLoading = true;

    const fkProperty = this.property.dfh_pk_property;
    const fkTemporalEntity = this.parentTeEnt.pk_entity;
    const fkProject = this.activeProject.project.pk_project;

    const waitAtLeast = timer(800);
    const apiCall = this.roleApi.alternativesNotInProjectByTeEntPk(fkTemporalEntity, fkProperty, fkProject)

    Observable.combineLatest([waitAtLeast, apiCall])
    .subscribe((results) => {

      this.rolesNotInProjectLoading = false;

      this.rolesInOtherProjects = results[1]
      .filter(role => role.is_in_project_count > 0);

      this.rolesInNoProject = results[1]
      .filter(role => role.is_in_project_count == 0);

      if (results[1].length === 0) {
        this.startCreateNewRole();
      }

    })


  }

  get addButtonVisible(): boolean {

    if (this.cardState === 'collapsed') return false;
    if (this.addRoleState === 'init') return true;

    // TODO add logic according to quantities

    return false;
  }


  /**
  * Called when user clicks on create new
  * Creates a new InfRole of the kind of property of this component
  * and pointing to the parent persistent item
  */
  startCreateNewRole() {
    // this.propStateChange.emit('createRole');

    this.roleToCreate = new InfRole();
    this.roleToCreate.fk_property = this.fkProperty;
    this.roleToCreate.fk_temporal_entity = this.parentTeEnt.pk_entity;

    this.addRoleState = 'createNew';
  }

}
