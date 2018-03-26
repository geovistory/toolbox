import {
  OnChanges, OnInit, Input, Output, ViewChildren,
  QueryList, EventEmitter, ChangeDetectorRef
} from '@angular/core';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { timer } from 'rxjs/observable/timer';

import { PeItComponent } from '../pe-it/pe-it.component';
import { TeEntComponent } from '../te-ent/te-ent.component';
import { RolePointToEnum, RoleComponent, AppellationStdBool } from '../role/role.component';
import { DirectedRolesPerProperty, RoleService } from '../../shared/role.service';
import { InfRole, DfhProperty, InfEntityProjectRelApi, InfRoleApi, ActiveProjectService, EntityEditorService } from 'app/core';
import { PropertyService } from '../../shared/property.service';
import { UtilitiesService } from '../../shared/utilities.service';


export class PropertyComponent implements OnChanges, OnInit {


  @Input() propertySection: DirectedRolesPerProperty;

  // fk_property that all roles of this kind should have
  @Input() fkProperty: number;

  // roles of one kind (with the same fk_property)
  @Input() roles: InfRole[];

  // The parent entity of this property is domain if true and range if false
  @Input() isOutgoing: boolean;

  // point to TeEnt or PeIt
  @Input() pointTo: string;

  // primary key of the parent entity
  @Input() parentEntityPk: number;

  // If true, the UI for communiy statistics is visible
  @Input() communityStatsVisible: boolean;

  // If true, CRM info is visible in UI
  @Input() ontoInfoVisible: boolean;

  /**
  * set propState - The state of this component
  *
  * @param  {state} state string 'view', 'add' or 'create'
  */
  @Input() set propState(state: string) {
    this._propState = state;
  };

  // state of the card below the header
  @Input() cardState:'collapsed'|'expanded';


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

  @Output() removePropertySectionReq: EventEmitter<DirectedRolesPerProperty> = new EventEmitter();

  /**
  * Properties
  */

  // the property
  property: DfhProperty;


  // max. mumber of possible alternatives -1=infinite
  maxAlternatives: number;

  // If ui allows to choose standard alternative for property
  hasStandard: boolean;

  // thisComponent
  thisComponent = this;

  // state of this components (has getter and setter)
  protected _propState: string;

  // role to create, when creating a new role
  roleToCreate: InfRole;

  rolesToCreate: InfRole[];

  isReadyToCreate: boolean;

  // roles to add, when in add-pe-it state
  rolesToAdd: InfRole[] = [];

  // roles used by other projects in repo but not in this project
  rolesInOtherProjects: InfRole[];

  // roles not used by no project
  rolesInNoProject: InfRole[];

  // if true, roles used by no project are visible
  rolesInNoProjectVisible: boolean;

  // true while loading rolesInOtherProjects via api call
  rolesNotInProjectLoading: boolean;

  // isReadyToAddRoles
  get isReadyToAddRoles(): boolean {
    return (this.rolesToAdd.filter(r => {
      return r.entity_version_project_rels[0].is_in_project
    }).length > 0)
  }

  // add role state
  addRoleState: string = 'init'; //init, selectExisting, createNew

  // Latest modified role alternative with highest is_standard_in_project_count
  mostPopularRole: InfRole;

  roleComponents;

  constructor(
    private eprApi: InfEntityProjectRelApi,
    protected roleApi: InfRoleApi,
    protected activeProject: ActiveProjectService,
    private roleService: RoleService,
    private propertyService: PropertyService,
    private util: UtilitiesService,
    public entityEditor: EntityEditorService,
    private changeDetector: ChangeDetectorRef
  ) { }


  /**
  * Methods
  */

  ngOnChanges() {
    if (this.fkProperty)
      this.propertyService.getPropertyByPkProperty(this.fkProperty).subscribe((prop: DfhProperty) => {
        this.property = prop;
      });
  }

  ngOnInit() {
    if (this.propState == 'add-pe-it')
      this.sortRolesByPopularity();

    this.cardState = 'collapsed';
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
  get roleLabel(): string {
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
        roleC.role.is_standard_in_project_count++;

        // unset loadingStdChange flag
        roleC.loadingStdChange = false;

        // update the epr of old Std Roles (should be only one) in client memory
        for (let i = 0; i < rolesToChange.length; i++) {

          if (
            rolesToChange[i].isStandardInProject === true
            && value[i + 1].is_standard_in_project === false
          ) {
            rolesToChange[i].role.is_standard_in_project_count--;
          }

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

    this.addRoleState = 'init';

    this.propStateChange.emit('selectProp');
  }





  /**
  * Called when the users clicks on cancel to stop creating a new role
  */
  cancelCreateNewRole() {

    this.propStateChange.emit('selectRoles');

    this.addRoleState = 'init';

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

    let rolesValid = true;
    if (this.roleComponents) {

      this.roleComponents.forEach(roleComponent => {

        if (!roleComponent.isReadyToCreate) rolesValid = false;

        this.rolesToCreate.push(roleComponent.role);

      })

      const quantityValid = this.propertyService.validateQuantity(
        this.rolesToCreate.length,
        this.property,
        this.isOutgoing
      )

      if (rolesValid && quantityValid) {

        this.isReadyToCreate = true;

        this.changeDetector.detectChanges()

        this.readyToCreate.emit(this.rolesToCreate);

      }

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

  persistEntitiesToCreate(fkEntity) {

    this.rolesToCreate.forEach((role) => {
      role.fk_entity = fkEntity;
    })

    this.roleApi.findOrCreateInfRole(
      this.activeProject.project.pk_project,
      this.rolesToCreate[0]
    ).subscribe(newRoles => {

      this.rolesAdded.emit(newRoles);

      this.roleToCreate = undefined;
    })

  }

  /**
  * Called when user click on close (only if no roles available)
  */

  removePropertySection() {
    this.removePropertySectionReq.emit(this.propertySection);
  }

  /**
  *  called when user cancels creating a new role
  */
  onRoleCreationCanceled() {
    this.addRoleState = 'init';
  }

  /**
  * called when user created a new role
  */
  onRoleCreated(role: InfRole) {
    this.roles.push(role);
    this.addRoleState = 'init';
  }


  /**
  * called when user removed a role from project
  */
  onRoleRemoved(removedRole: InfRole) {
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].pk_entity === removedRole.pk_entity) {
        this.roles.splice(i, 1);
        break;
      }
    }
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

    // // count number of roles that are selected to be in project
    // const inProjectCount = this.rolesToAdd.filter(role =>
    //   role.entity_version_project_rels[0].is_in_project
    // ).length
    //
    // const quantityValid = this.propertyService.validateQuantity(
    //   inProjectCount,
    //   this.property,
    //   this.isOutgoing
    // )
    //
    // // check if this number is according to quantity definition
    // if (quantityValid) {
    // this.readyToAdd.emit(this.rolesToAdd);
    // }
    // else {
    //   this.notReadyToAdd.emit();
    // }

    this.readyToAdd.emit(this.rolesToAdd);


  }



  /**
  * addSelectedRolesToProject - called when user wants to add roles and
  * all children to project
  *
  * @return {type}  description
  */
  addSelectedRolesToProject() {

    let observables = [];
    this.rolesToAdd.forEach(role => {
      if (role.entity_version_project_rels[0].is_in_project) {
        observables.push(this.roleApi.changeRoleProjectRelation(
          this.activeProject.project.pk_project, true, role)
        );
      }

    })

    Observable.combineLatest(observables)
      .subscribe(results => {
        results.forEach((result: InfRole[]) => {

          let addedRole = result[0];

          addedRole.is_in_project_count++;

          this.roles.push(addedRole);

          this.addRoleState = 'init';
        })
      })
  }

  /**
  * toggleCardBody - toggles the state of the card in order to collapse or
  * expand the card in the UI
  */
  toggleCardBody() {
    this.cardState = this.cardState === 'expanded' ? 'collapsed' : 'expanded';
  }


  /**
  * set the role that has highest is_standard_in_project_count and, if more
  * than one role have the same highest is_standard_in_project_count, the
  * latest modified role
  *
  * @return {type}  description
  */
  sortRolesByPopularity() {

    // sort by is_standard_in_project_count and
    this.roles.sort((roleA, roleB) => {
      var a = roleA.is_standard_in_project_count
      var b = roleB.is_standard_in_project_count

      if (a < b) {
        return 1;
      }
      if (a > b) {
        return -1;
      }
      // a muss gleich b sein
      return 0;
    })

    this.mostPopularRole = this.roles[0];
  }

  /**
  * Methods for event bubbeling
  */

  emitAppeChange(appeStd: AppellationStdBool) {

    appeStd.isMostPopular = (this.mostPopularRole == appeStd.role);

    this.appeChange.emit(appeStd)
  }

}
