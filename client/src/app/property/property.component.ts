import {
  Component, OnChanges, AfterViewInit, Input, Output, ViewChildren,
  QueryList, EventEmitter, ChangeDetectorRef
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { InformationRole } from '../shared/sdk/models/InformationRole';
import { RolePointToEnum, RoleComponent, AppellationStdBool } from '../role/role.component';
import { RoleService } from '../shared/services/role.service';
import { EntityVersionProjectRelApi } from '../shared/sdk/services/custom/EntityVersionProjectRel';
import { PropertyService, Property } from '../shared/services/property.service';
import { PeItComponent } from '../pe-it/pe-it.component';
import { TeEntComponent } from '../te-ent/te-ent.component';
import { UtilitiesService } from '../shared/services/utilities.service';
import { KeyboardService } from '../shared/services/keyboard.service';
import { PersistentItemVersion } from '../shared/sdk/models/PersistentItemVersion';
import { PersistentItemVersionApi } from '../shared/sdk/services/custom/PersistentItemVersion';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { InformationRoleApi } from '../shared/sdk/services/custom/InformationRole';
import { Appellation } from '../shared/sdk/models/Appellation';




@Component({
  selector: 'gv-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnChanges, AfterViewInit {

  /**
  * Inputs
  */

  // fk_property that all roles of this kind should have
  @Input() fkProperty: string;

  // roles of one kind (with the same fk_property)
  @Input() roles: InformationRole[];

  //the role that is parent of the parent temporal entity
  @Input() parentRole: InformationRole;

  // The parent entity of this property is domain if true and range if false
  @Input() isOutgoing: boolean;

  // point to TeEnt or PeIt
  @Input() pointTo: string;

  // primary key of the parent entity
  @Input() parentEntityPk: number;

  // The parent PeIt Entity
  @Input() parentPeIt: PersistentItemVersion;

  /**
  * set propState - The state of this component
  *
  * @param  {state} state string 'view', 'add' or 'create'
  */
  @Input() set propState(state: string) {
    this._propState = state;
  };

  /**
  * Outputs
  */

  @Output() propStateChange: EventEmitter<string> = new EventEmitter();

  @Output() readyToCreate: EventEmitter<InformationRole[]> = new EventEmitter;

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;

  @Output() rolesAdded: EventEmitter<InformationRole[]> = new EventEmitter;

  // emit appellation and a flag to say if this is the standard appellation
  @Output() appeChange: EventEmitter<AppellationStdBool> = new EventEmitter;

  /**
  * Properties
  */

  // the property
  property: Property;

  // Array of children RoleComponents
  @ViewChildren(RoleComponent) roleComponents: QueryList<RoleComponent>

  // the roleComponent that is currently the standard alternative
  standardRoleC: RoleComponent;

  // max. mumber of possible alternatives -1=infinite
  maxAlternatives: number;

  // If ui allows to choose standard alternative for property
  hasStandard: boolean;

  // thisComponent
  thisComponent = this;

  // state of this components (has getter and setter)
  private _propState: string;

  // role to create, when creating a new role
  roleToCreate: InformationRole;

  rolesToCreate: InformationRole[];

  isReadyToCreate: boolean;


  constructor(
    private eprApi: EntityVersionProjectRelApi,
    private roleApi: InformationRoleApi,
    private activeProject: ActiveProjectService,
    private roleService: RoleService,
    private propertyService: PropertyService,
    private util: UtilitiesService,
    public keyboard: KeyboardService,
    private changeDetector: ChangeDetectorRef
  ) { }


  /**
  * Methods
  */

  ngOnChanges() {
    this.property = this.propertyService.getPropertyByPkProperty(this.fkProperty);
  }

  ngAfterViewInit() {
    this.roleComponents.forEach(roleComponent => {
      if (
        roleComponent
        && roleComponent.role
        && roleComponent.role.entity_version_project_rels
        && roleComponent.role.entity_version_project_rels.length
        && roleComponent.role.entity_version_project_rels[0].is_standard_in_project) {
        this.standardRoleC = roleComponent;
      }
    });
  }


  get propState(): string {
    return this._propState;
  }


  /**
  * returns the pk_class of the target class.
  * if this.isOutgoing === true, return the range class
  * if this.isOutgoing === false, return the domain class 
  *
  * @return {string}  pk of the target class
  */
  get pkTargetClass(): string {

    if (this.isOutgoing === true) return this.property.fk_range_class;

    if (this.isOutgoing === false) return this.property.fk_domain_class;

  }


  /**
  * returns the label of the property, depending on the direction of the
  * property (is it an outgoing or an ingoing property) and the cardinality
  * (can there be only one role instance ore multiple).
  *
  * @return {string}  label of the property
  */
  get roleLabel() {
    if (this.isOutgoing) {
      if (this.property.rangeCardinalityMax === 1) {
        return this.property.label.sg;
      }
      return this.property.label.pl;
    } else if (this.isOutgoing === false) {
      if (this.property.domainCardinalityMax === 1) {
        return this.property.label_inversed.sg;
      }
      return this.property.label_inversed.pl;
    } else {
      // TODO Error
      console.log('isOutgoing is not defined')
    }
  }

  get roleLabelObj() {
    if (this.isOutgoing) {
      return this.property.label;
    } else if (this.isOutgoing === false) {
      return this.property.label_inversed;
    } else {
      return undefined;
    }
  }

  get addButtonVisible(): boolean {
    if (this.pointTo === 'TeEnt') return true;
    // if(this.state === 'add') return false;
    //
    // if (this.addingName) return false;

    return false;
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

          // If there are roles, we are obviously not in create state.
          // If all of this.roles are identical with the parent role
          // of the parent teEnt return true to say that this is circular

          let count = 0;
          this.roles.forEach(role => {
            if (role.pk_entity == this.parentRole.pk_entity) {
              count++;
            }
          })
          if (this.roles.length === count) {
            return true;
          }

        }

        if (
          this.propState === 'create' &&
          this.fkProperty === this.parentRole.fk_property
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
  * changeStandardRole - Make another child role the standard role for
  * the active project.
  *
  * @param  {RoleComponent} roleC     RoleComponent of the role that wants to be standard
  * @return {void}
  */
  changeStandardRole(roleC: RoleComponent) {

    let observables = [];

    // set loadingStdChange flag of the given component
    roleC.loadingStdChange = true;

    // Create observable of api call to make the given role new standard

    observables.push(this.eprApi.patchAttributes(
      roleC.epr.pk_entity_version_project_rel,
      {
        is_standard_in_project: true
      }
    ))

    // If there is a old standard Role to disable

    if (this.standardRoleC) {

      // set loadingStdChange flag of the standardRoleComponent

      this.standardRoleC.loadingStdChange = true;

      // Create observable of api call to disable the old standard

      observables.push(this.eprApi.patchAttributes(
        this.standardRoleC.epr.pk_entity_version_project_rel,
        {
          is_standard_in_project: false
        }
      ))
    }

    Observable.combineLatest(observables)
      .subscribe(
      (value) => {

        // update the data in client memory
        roleC.epr = value[0];
        if (value[1]) this.standardRoleC.epr = value[1];

        // unset loadingStdChange flag of both components
        roleC.loadingStdChange = false;
        this.standardRoleC.loadingStdChange = false;

        // update this.standardRoleC
        this.standardRoleC = roleC;
      })

  }



  /**
  * Methods specific to create state
  */

  /**
  * Called when user clicks on create new
  * Creates a new InformationRole of the kind of property of this component
  * and pointing to the parent persistent item
  */
  startCreateNewRole() {
    this.propStateChange.emit('createRole');

    this.roleToCreate = new InformationRole();
    this.roleToCreate.fk_property = this.fkProperty;
    this.roleToCreate.fk_entity = this.parentEntityPk;

  }


  /**
  * Called when the users clicks on cancel to stop creating a new role
  */
  cancelCreateNewRole() {

    this.propStateChange.emit('selectRoles');

    this.roleToCreate = undefined;

  }


  get maxCardinality() {
    if (this.isOutgoing) return this.property.rangeCardinalityMax;
    else if (this.isOutgoing === false) return this.property.domainCardinalityMax;
    else console.log('isOutgoing is not defined')
  }

  get minCardinality() {
    if (this.isOutgoing) return this.property.rangeCardinalityMin;
    else if (this.isOutgoing === false) return this.property.domainCardinalityMin;
    else console.log('isOutgoing is not defined')
  }


  /**
  * called when a role pointing to a peIt is ready to create
  *
  * emits readyToCreate() if
  * - all roleComponents have isReadyToCreate==true
  * - roleComponents.length >= minCardinality
  * - roleComponents.length =< maxCardinality
  *
  * @param {InformationRole} role
  */
  roleReadyToCreate(role) {

    this.rolesToCreate = [];

    let allValid = true;

    this.roleComponents.forEach(roleComponent => {

      if (!roleComponent.isReadyToCreate) allValid = false;

      this.rolesToCreate.push(roleComponent.role);

    })

    if (
      allValid &&
      this.rolesToCreate.length >= this.minCardinality &&
      this.rolesToCreate.length <= this.maxCardinality
    ) {

      this.isReadyToCreate = true;
      this.changeDetector.detectChanges()

      this.readyToCreate.emit(this.rolesToCreate);

    }

  }


  /**
  * called when a role pointing to a peIt is not ready to create
  */
  roleNotReadyToCreate() {

    this.isReadyToCreate = false;
    this.changeDetector.detectChanges()

    this.notReadyToCreate.emit();

  }

  persistEntitiesToCreate() {

    this.rolesToCreate.forEach((role) => {
      role.fk_entity = this.parentPeIt.pk_entity;
    })

    this.roleApi.findOrCreateInformationRole(
      this.activeProject.project.pk_project,
      this.rolesToCreate[0]
    ).subscribe(newRoles => {

      this.rolesAdded.emit(newRoles);

      this.roleToCreate = undefined;
    })

  }


  /**
   * Methods for event bubbeling
   */

  emitAppeChange(appeStd: AppellationStdBool) {
    this.appeChange.emit(appeStd)
  }

}
