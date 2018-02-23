import {
  Component, OnChanges, Input, Output, ViewChildren,
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

import { InfRole } from '../shared/sdk/models/InfRole';
import { RolePointToEnum, RoleComponent, AppellationStdBool } from '../role/role.component';
import { RoleService } from '../shared/services/role.service';
import { InfEntityProjectRelApi } from '../shared/sdk/services/custom/InfEntityProjectRel';
import { PropertyService } from '../shared/services/property.service';
import { PeItComponent } from '../pe-it/pe-it.component';
import { TeEntComponent } from '../te-ent/te-ent.component';
import { UtilitiesService } from '../shared/services/utilities.service';
import { KeyboardService } from '../shared/services/keyboard.service';
import { InfPersistentItem } from '../shared/sdk/models/InfPersistentItem';
import { InfPersistentItemApi } from '../shared/sdk/services/custom/InfPersistentItem';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { InfRoleApi } from '../shared/sdk/services/custom/InfRole';
import { DfhProperty } from '../shared/sdk/models/DfhProperty';



@Component({
  selector: 'gv-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('expanded', style({
        height: '*',
      })),
      state('collapsed', style({
        height: '0px',
        'padding-top': '0',
        'padding-bottom': '0',
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
          'padding-top': '0',
          'padding-bottom': '0',
          offset: 1
        })
      ]))),
      transition('collapsed => expanded', animate('400ms ease-in-out', keyframes([
        style({
          height: '0px',
          overflow: 'hidden',
          'padding-top': '0',
          'padding-bottom': '0',
          offset: 0
        }),
        style({
          height: '*',
          display: 'hidden',
          'padding-top': '0.5rem',
          'padding-bottom': '0.5rem',
          offset: 1
        })
      ])))
    ])
  ]
})
export class PropertyComponent implements OnChanges {

  /**
  * Inputs
  */

  // fk_property that all roles of this kind should have
  @Input() fkProperty: number;

  // roles of one kind (with the same fk_property)
  @Input() roles: InfRole[];

  //the role that is parent of the parent temporal entity
  @Input() parentRole: InfRole;

  // The parent entity of this property is domain if true and range if false
  @Input() isOutgoing: boolean;

  // point to TeEnt or PeIt
  @Input() pointTo: string;

  // primary key of the parent entity
  @Input() parentEntityPk: number;

  // The parent PeIt Entity
  @Input() parentPeIt: InfPersistentItem;

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

  @Output() readyToCreate: EventEmitter<InfRole[]> = new EventEmitter;

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;

  @Output() rolesAdded: EventEmitter<InfRole[]> = new EventEmitter;

  // emit appellation and a flag to say if this is the standard appellation
  @Output() appeChange: EventEmitter<AppellationStdBool> = new EventEmitter;

  @Output() readyToAdd: EventEmitter<InfRole[]> = new EventEmitter();

  @Output() notReadyToAdd: EventEmitter<void> = new EventEmitter();

  /**
  * Properties
  */

  // the property
  property: DfhProperty;

  // Array of children RoleComponents
  @ViewChildren(RoleComponent) roleComponents: QueryList<RoleComponent>

  // state of the card below the header
  cardState = 'expanded';

  // max. mumber of possible alternatives -1=infinite
  maxAlternatives: number;

  // If ui allows to choose standard alternative for property
  hasStandard: boolean;

  // thisComponent
  thisComponent = this;

  // state of this components (has getter and setter)
  private _propState: string;

  // role to create, when creating a new role
  roleToCreate: InfRole;

  rolesToCreate: InfRole[];

  // roles to add, when in add-pe-it state
  rolesToAdd: InfRole[] = [];

  isReadyToCreate: boolean;

  constructor(
    private eprApi: InfEntityProjectRelApi,
    private roleApi: InfRoleApi,
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
    this.propertyService.getPropertyByPkProperty(this.fkProperty).subscribe((prop: DfhProperty) => {
      this.property = prop;
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
  * @return {number}  pk of the target class
  */
  get pkTargetClass(): number {

    if (this.isOutgoing === true) return this.property.dfh_has_range;

    if (this.isOutgoing === false) return this.property.dfh_has_domain;

  }


  /**
  * returns the label of the property, depending on the direction of the
  * property (is it an outgoing or an ingoing property) and the cardinality
  * (can there be only one role instance ore multiple).
  *
  * @return {string}  label of the property
  */
  get roleLabel():string {
    if (this.isOutgoing) {
      if (this.property.dfh_range_instances_max_quantifier === 1) {

        // TODO return label singular (this.property.label.sg)

        return this.property.labels.find(l => l.notes === 'label.sg').dfh_label;

      }

      // TODO return label plural (this.property.label.pl)

      return this.property.labels.find(l => l.notes === 'label.pl').dfh_label;

    } else if (this.isOutgoing === false) {
      if (this.property.dfh_domain_instances_max_quantifier === 1) {

        // TODO return inversed label singular (this.property.label_inversed.sg)
        return this.property.labels.find(l => l.notes === 'label_inversed.sg').dfh_label;

      }

      // TODO return inversed label plural (this.property.label_inversed.pl)
      return this.property.labels.find(l => l.notes === 'label_inversed.pl').dfh_label;

    } else {
      // TODO Error
      console.log('isOutgoing is not defined')
    }
  }

  get roleLabelObj() {
    if (this.isOutgoing) {

      // TODO return an object containing label.pl and label.sg
      return {
        'sg': this.property.labels.find(l => l.notes === 'label.sg').dfh_label,
        'pl': this.property.labels.find(l => l.notes === 'label.pl').dfh_label
      }

    } else if (this.isOutgoing === false) {

      // TODO return an object containing inversed_label.pl and inversed_label.sg

      return {
        'sg': this.property.labels.find(l => l.notes === 'label_inversed.sg').dfh_label,
        'pl': this.property.labels.find(l => l.notes === 'label_inversed.pl').dfh_label
      };

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

    // Get all standard Roles to disable (should be only one)

    const rolesToChange = [];

    this.roleComponents.forEach(roleComponent => {
      if (roleComponent && roleComponent.isStandardInProject) {

        // set loadingStdChange flag of the RoleComponent
        roleComponent.loadingStdChange = true;

        // push the role Component to an array that will be used later
        rolesToChange.push(roleComponent);

        // Create observable of api call to disable the old standard
        observables.push(this.eprApi.patchAttributes(
          roleComponent.epr.pk_entity_version_project_rel,
          {
            is_standard_in_project: false
          }
        ))

      }
    });

    Observable.combineLatest(observables)
      .subscribe(
      (value) => {

        // update the epr of the new Std in client memory
        roleC.epr = value[0];
        roleC.isStandardInProject = value[0].is_standard_in_project;

        // unset loadingStdChange flag
        roleC.loadingStdChange = false;

        // update the epr of old Std Roles (should be only one) in client memory
        for (let i = 0; i < rolesToChange.length; i++) {
          rolesToChange[i].epr = value[i + 1];
          rolesToChange[i].isStandardInProject = value[i + 1].is_standard_in_project;

          // unset loadingStdChange flag
          rolesToChange[i].loadingStdChange = false;

        }

      })

  }



  /**
  * Methods specific to create state
  */

  /**
  * Called when user clicks on cancel select roles
  */
  cancelSelectRoles() {
    this.propStateChange.emit('selectProp');
  }


  /**
  * Called when user clicks on create new
  * Creates a new InfRole of the kind of property of this component
  * and pointing to the parent persistent item
  */
  startCreateNewRole() {
    this.propStateChange.emit('createRole');

    this.roleToCreate = new InfRole();
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
    if (this.isOutgoing) return this.property.dfh_range_instances_max_quantifier;
    else if (this.isOutgoing === false) return this.property.dfh_domain_instances_max_quantifier;
    else console.log('isOutgoing is not defined')
  }

  get minCardinality() {
    if (this.isOutgoing) return this.property.dfh_range_instances_min_quantifier;
    else if (this.isOutgoing === false) return this.property.dfh_domain_instances_min_quantifier;
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
  * @param {InfRole} role
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

    this.roleApi.findOrCreateInfRole(
      this.activeProject.project.pk_project,
      this.rolesToCreate[0]
    ).subscribe(newRoles => {

      this.rolesAdded.emit(newRoles);

      this.roleToCreate = undefined;
    })

  }


  onRoleReadyToAdd(role: InfRole) {

    let exists = false;

    // replace if existing (this happens when user changes epr settings)
    for (let i = 0; i < this.rolesToAdd.length; i++) {
      if (this.rolesToAdd[i].pk_entity === role.pk_entity) {
        this.rolesToAdd[i] = role;
        exists = true;
      }
    }

    // else push it
    if (!exists) {
      this.rolesToAdd.push(role);
    }

    // count number of roles that are selected to be in project
    const inProjectCount = this.rolesToAdd.filter(role =>
      role.entity_version_project_rels[0].is_in_project
    ).length

    // check if this number is according to cardinality definition
    if (
      inProjectCount >= this.minCardinality &&
      inProjectCount <= this.maxCardinality
    ) {
      this.readyToAdd.emit(this.rolesToAdd);
    }
    else {
      this.notReadyToAdd.emit();
    }


  }



  /**
  * toggleCardBody - toggles the state of the card in order to collapse or
  * expand the card in the UI
  */
  toggleCardBody() {
    this.cardState = this.cardState === 'expanded' ? 'collapsed' : 'expanded';
  }


  /**
  * Methods for event bubbeling
  */

  emitAppeChange(appeStd: AppellationStdBool) {
    this.appeChange.emit(appeStd)
  }

}
