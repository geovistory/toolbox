import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

import { InfRole, InfPersistentItem, DfhProperty, EntityEditorService, DfhClass } from 'app/core';
import { DirectionAwareProperty, PropertyService } from '../../shared/property.service';
import { RoleService } from '../../shared/role.service';
import { EditorStates } from '../../information.models';
import { IRoleSetState, RoleSetState } from '../role-set/role-set.model';
import { AppellationStdBool } from '../role/role.component';
import { NgRedux, select, ObservableStore } from '@angular-redux/store';
import { IRoleSetListState, SelectPropStateType } from '../role-set-list/role-set-list.model';
import { Observable } from 'rxjs/Observable';
import { roleSetListReducer } from './role-set-list-reducer';
import { ClassService } from '../../shared/class.service';
import { RoleSetListActions } from './role-set-list-actions';
import { IPeItState } from '../../containers/pe-it/pe-it.model';
import { ITeEntState } from '../te-ent/te-ent.model';
import { PeItActions } from '../../containers/pe-it/pe-it.actions';
import { TeEntActions } from '../te-ent/te-ent.actions';

export class RoleSetListComponent implements OnInit {

  @Input() parentPath: string[];

  initStore() { } // override this in derived class
  basePath: string[];
  localStore: ObservableStore<IPeItState | ITeEntState>;
  actions: PeItActions | TeEntActions;

  // Since we're observing an array of items, we need to set up a 'trackBy'
  // parameter so Angular doesn't tear down and rebuild the list's DOM every
  // time there's an update.
  getKey(_, roleSet: IRoleSetState) {
    return roleSet.fkProperty;
  }

  @select() state$: Observable<EditorStates>;
  @select() selectPropState$: Observable<SelectPropStateType>;

  @select() fkClass$: Observable<number>;
  @select() dfhClass$: Observable<DfhClass>;
  @select() pkEntity$: Observable<number>
  @select() roles$: Observable<InfRole[]>
  @select() outgoingProperties$: Observable<DfhProperty[]>
  @select() ingoingProperties$: Observable<DfhProperty[]>
  @select() ingoingPropertiesToAdd$?: DirectionAwareProperty[];
  @select() outgoingPropertiesToAdd$?: DirectionAwareProperty[];
  @select() parentPeIt$: Observable<InfPersistentItem>

  @select() propertyToAdd$: Observable<DirectionAwareProperty>; // Poperty that is currently chosen in order to add a role of this kind

  @select() roleSets$: Observable<RoleSetState[]>


  constructor(
    protected classService: ClassService,
    private roleService: RoleService,
    private propertyService: PropertyService,
    protected entityEditor: EntityEditorService,
  ) { }

  ngOnInit() {
    // Initialize the store by one of the derived classes
    this.initStore()

    // Initialize the children in this class
    this.initChildren()

    // Initialize the rest in the derived class
    this.init()

  }



  initChildren() {

    // Wait for the fkClass to be ready
    this.fkClass$
      .subscribe(fkClass => {
        if (fkClass)
          Observable.zip(
            // Generate ingoing and outgoing properties
            this.classService.getIngoingProperties(fkClass),
            this.classService.getOutgoingProperties(fkClass),
            this.roles$,
            this.state$
          ).subscribe(result => {
            const ingoingProperties = result[0];
            const outgoingProperties = result[1];
            const roles = result[2];
            const state = result[3];

            // Generate Direction Aware Properties (they appear in the select/dropdown to add new RoleSet)
            const ingoingPropertiesToAdd = this.propertyService.toDirectionAwareProperties(false, ingoingProperties)
            const outgoingPropertiesToAdd = this.propertyService.toDirectionAwareProperties(true, outgoingProperties)

            // Generate roleSets (like e.g. the names-section, the birth-section or the detailed-name secition)
            const options: IRoleSetState = { state: state }
            const roleSetStates = this.roleService.toRoleSetStates(roles, ingoingProperties, outgoingProperties, options)

            // Dispatch
            this.localStore.dispatch(this.actions.roleSetsInitialized(ingoingProperties, outgoingProperties, roleSetStates, ingoingPropertiesToAdd, outgoingPropertiesToAdd))

          })
      })
  }

  initFkClassAndRoles(fkClass: number, roles: InfRole[] = []) {
    this.classService.getByPk(fkClass).subscribe((dfhClass) => {
      this.localStore.dispatch(this.actions.fkClassAndRolesInitialized(fkClass, dfhClass, roles))
    })
  }


  init() { };

  /** ************
   * User Interactions 
   ****************/

  startSelectProperty() {
    this.localStore.dispatch(this.actions.startSelectProperty())
  }

  stopSelectProperty() {
    this.localStore.dispatch(this.actions.stopSelectProperty())
  }

  /**
  * called, when user selected a the kind of property to add
  */
  startSelectRoles() {

    // add a role set

    this.propertyToAdd$.subscribe(propertyToAdd => {

      const newRoleSetState: RoleSetState = {
        isOutgoing: propertyToAdd.isOutgoing,
        property: propertyToAdd.property,
        fkProperty: propertyToAdd.property.dfh_pk_property,
        roles: []
      }

      this.roleSets$.subscribe(roleSets => {

        roleSets[newRoleSetState.fkProperty] = newRoleSetState;

        this.localStore.dispatch(this.actions.startSelectRoles(roleSets))
      })
    })

  }















  /**
  * Inputs
  */




  /**
  * Outputs
  */


  // // emit appellation and a flag to say if this is the standard appellation
  // @Output() appeChange: EventEmitter<AppellationStdBool> = new EventEmitter;

  // // emit to say that adding informaion is finished
  // @Output() stopAddingInformation: EventEmitter<void> = new EventEmitter();

  // // emit to say that the roles have been updated
  // @Output() rolesUpdated: EventEmitter<InfRole[]> = new EventEmitter();


  /**
  * Properties
  */


  /**
  * addButtonVisible
  *
  * @return {bookean}  true if add button should be visible
  */
  // addButtonVisible(state) {

  //   if (state === 'selectProp') return false;
  //   if (state === 'add') return false;
  //   if (state === 'create') return false;
  //   if (state === 'add-pe-it') return false;

  //   return true;
  // }


  // /**
  // * called, when user selected a the kind of property to add
  // */
  // startSelectRoles() {
  //   if (this.propertyToAdd)
  //     this.selectPropState = 'init';

  //   // add a property sections

  //   const newPropertySection: RoleSets = {
  //     isOutgoing: this.propertyToAdd.isOutgoing,
  //     fkProperty: this.propertyToAdd.property.dfh_pk_property,
  //     roles: []
  //   }

  //   this.roleSets.push(newPropertySection);

  //   this.propertyToAdd = null;

  // }



  // /**
  // * Method to find out if a property section is already added
  // */
  // propSectionAdded(directionAwareProp: DirectionAwareProperty): boolean {
  //   return (this.roleSets.find(drpp => {
  //     return (
  //       drpp.isOutgoing == directionAwareProp.isOutgoing &&
  //       drpp.fkProperty == directionAwareProp.property.dfh_pk_property
  //     )
  //   })) ? true : false;
  // }


  // /**
  // * Called when the user closes an empty property section
  // */
  // onRemovePropertySectionReq(propSection: IRoleSetState) {
  //   var index = this.roleSets.indexOf(propSection, 0);
  //   if (index > -1) {
  //     this.roleSets.splice(index, 1);
  //   }
  // }

  // /**
  // * called when a child propertComponent has added new roles
  // */
  // onRolesAdded(roles) {

  //   this.selectPropState = 'init';

  //   this.stopAddingInformation.emit()


  //   this.roles = this.roles.concat(roles);

  //   this.setRoleSets(this.roles);

  // }

  // /**
  // * called when a role (and its children) are updated
  // */
  // onRolesUpdated(updatedRoles: InfRole[]) {
  //   for (let i = 0; i < this.roles.length; i++) {
  //     const r = this.roles[i];
  //     for (let j = 0; j < updatedRoles.length; j++) {
  //       const ur = updatedRoles[j];
  //       if (r.pk_entity == ur.pk_entity) {
  //         this.roles[i] = ur;
  //       }
  //     }
  //   }

  //   this.rolesUpdated.emit(this.roles);
  // }




}
