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

import { InfRole } from '../shared/sdk/models/InfRole';
import { RolePointToEnum, RoleComponent, AppellationStdBool } from '../role/role.component';
import { RoleService, DirectedRolesPerProperty } from '../shared/services/role.service';
import { InfEntityProjectRelApi } from '../shared/sdk/services/custom/InfEntityProjectRel';
import { PropertyService } from '../shared/services/property.service';
import { PeItComponent } from '../pe-it/pe-it.component';
import { TeEntComponent } from '../te-ent/te-ent.component';
import { UtilitiesService } from '../shared/services/utilities.service';
import { EntityEditorService } from '../shared/services/entity-editor.service';
import { InfPersistentItem } from '../shared/sdk/models/InfPersistentItem';
import { InfPersistentItemApi } from '../shared/sdk/services/custom/InfPersistentItem';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { InfRoleApi } from '../shared/sdk/services/custom/InfRole';
import { DfhProperty } from '../shared/sdk/models/DfhProperty';
import { PropertyComponent } from '../property/property.component';
import { RoleOfPeItComponent } from '../role-of-pe-it/role-of-pe-it.component';



@Component({
  selector: 'gv-prop-section-of-pe-it',
  templateUrl: './prop-section-of-pe-it.component.html',
  styleUrls: ['./prop-section-of-pe-it.component.scss'],
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
export class PropSectionOfPeItComponent extends PropertyComponent implements OnChanges, OnInit {

  /**
  * Inputs
  */

  // The parent PeIt Entity
  @Input() parentPeIt: InfPersistentItem;

  // Array of children RoleComponents
  @ViewChildren(RoleOfPeItComponent) roleComponents: QueryList<RoleOfPeItComponent>


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
  * Called when user click on Add a [*]
  */
  startAddingRole() {

    this.rolesInNoProjectVisible = false;

    this.addRoleState = 'selectExisting'

    this.rolesNotInProjectLoading = true;

    const fkProperty = this.property.dfh_pk_property;
    const fkEntity = this.parentPeIt.pk_entity;
    const fkProject = this.activeProject.project.pk_project;

    const waitAtLeast = timer(800);
    const apiCall = this.roleApi.alternativesNotInProjectByEntityPk(fkEntity, fkProperty, fkProject)

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

  /**
  * Called when user clicks on create new
  * Creates a new InfRole of the kind of property of this component
  * and pointing to the parent persistent item
  */
  startCreateNewRole() {
    // this.propStateChange.emit('createRole');

    this.roleToCreate = new InfRole();
    this.roleToCreate.fk_property = this.fkProperty;
    this.roleToCreate.fk_entity = this.parentEntityPk;

    this.addRoleState = 'createNew';
  }

  get removeSectionBtnVisible(){
    if(this.roles && (this.roles.length ===0)) return true;

    return false;
  }

}
