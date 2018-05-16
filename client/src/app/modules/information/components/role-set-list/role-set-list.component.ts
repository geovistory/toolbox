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
import { PropertyService } from '../../shared/property.service';
import { RoleService } from '../../shared/role.service';
import { EditorStates } from '../../information.models';
import { IRoleSetState, RoleSetState } from '../role-set/role-set.model';
import { AppellationStdBool } from '../role/role.component';
import { NgRedux, select, ObservableStore } from '@angular-redux/store';
import { IRoleSetListState, SelectPropStateType } from '../role-set-list/role-set-list.model';
import { Observable } from 'rxjs/Observable';
import { roleSetListReducer } from './role-set-list-reducer';
import { ClassService } from '../../shared/class.service';
import { RoleSetListActions, roleSetKey } from './role-set-list-actions';
import { IPeItState } from '../../containers/pe-it/pe-it.model';
import { ITeEntState } from '../te-ent/te-ent.model';
import { PeItActions } from '../../containers/pe-it/pe-it.actions';
import { TeEntActions } from '../te-ent/te-ent.actions';
import { RoleSetListService } from '../../shared/role-set-list.service';
import { FormGroup } from '@angular/forms';

export class RoleSetListComponent implements OnInit {

  @Input() parentPath: string[];

  initStore() { } // override this in derived class
  basePath: string[];
  localStore: ObservableStore<IPeItState | ITeEntState>;
  actions: PeItActions | TeEntActions;

  // Since we're observing an array of items, we need to set up a 'trackBy'
  // parameter so Angular doesn't tear down and rebuild the list's DOM every
  // time there's an update.
  getKey(_, item) {
    return item.key;
  }

  @select() state$: Observable<EditorStates>;
  @select() selectPropState$: Observable<SelectPropStateType>;
  @select() fkClass$: Observable<number>;
  @select() dfhClass$: Observable<DfhClass>;
  @select() label$: Observable<string>;
  @select() pkEntity$: Observable<number>
  @select() roles$: Observable<InfRole[]>
  @select() outgoingProperties$: Observable<DfhProperty[]>
  @select() ingoingProperties$: Observable<DfhProperty[]>
  @select() ingoingRoleSets$?: RoleSetState[];
  @select() outgoingRoleSets$?: RoleSetState[];
  @select() parentPeIt$: Observable<InfPersistentItem>;
  @select() propertyToAdd$: Observable<RoleSetState>; // Poperty that is currently chosen in order to add a role of this kind
  @select() roleSets$: Observable<{}>;

  /**
   * class properties filled by observables 
   */
  roleSets: {}

  /**
   * Properties
   */
  formGroup: FormGroup;
  label: string;
  labelInEdit:string;

  constructor(
    protected classService: ClassService,
    private roleService: RoleService,
    private propertyService: PropertyService,
    protected entityEditor: EntityEditorService,
    protected roleSetListService: RoleSetListService,
  ) { }

  ngOnInit() {
    // Initialize the store by one of the derived classes
    this.initStore()

    // Initialize the children in this class
    // this.initChildren() SINGLE_INIT

    // Initializes subscriptions
    this.initSubscriptions()

    // Initialize the rest in the derived class
    this.init()

  }



  // initChildren() {

  //   this.roleSetListService.initChildren(this.fkClass$, this.roles$, this.state$).subscribe(result => {
  //     if (result)
  //       this.localStore.dispatch(this.actions.roleSetsInitialized(result.roleSetsWithRoles, result.ingoingRoleSets, result.outgoingRoleSets))

  //   })

  // }

  private initSubscriptions() {
    this.roleSets$.subscribe(rs =>
      this.roleSets = rs
    )
  }

  // initFkClassAndRoles(fkClass: number, roles: InfRole[] = []) {
  //   this.classService.getByPk(fkClass).subscribe((dfhClass) => {
  //     this.localStore.dispatch(this.actions.fkClassAndRolesInitialized(fkClass, dfhClass, roles))
  //   })
  // }


  init() { }; // hook for child class

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



  /**
  * Method to find out if a property section is already added
  */
  roleSetAdded(roleSetToAdd: RoleSetState): boolean {
    if (!this.roleSets) return false;
    const roleSet: RoleSetState = this.roleSets[roleSetKey(roleSetToAdd)];
    if (roleSet && roleSet.isOutgoing === roleSetToAdd.isOutgoing) return true;
    else return false
  }




  /**
  * Called when the user closes an empty roleSet
  */
  removeRoleSet(key: string) {

    /** remove the roleSet from state */
    this.localStore.dispatch(this.actions.removeRoleSet(key));
    
    /** remove the formControl from form */
    this.formGroup.removeControl(key)
  }

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
