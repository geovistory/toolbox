import {
  OnChanges, OnInit, Input, Output, ViewChildren,
  QueryList, EventEmitter, ChangeDetectorRef
} from '@angular/core';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { timer } from 'rxjs/observable/timer';
import { indexBy } from 'ramda'

import { TeEntComponent } from '../te-ent/te-ent.component';
import { RoleService } from '../../shared/role.service';
import { InfRole, DfhProperty, InfEntityProjectRelApi, InfRoleApi, ActiveProjectService, EntityEditorService, InfPersistentItem, Project } from 'app/core';
import { PropertyService } from '../../shared/property.service';
import { UtilitiesService } from '../../shared/utilities.service';
import { EditorStates, CollapsedExpanded } from '../../information.models';
import { ObservableStore, NgRedux, select } from '@angular-redux/store';
import { IRoleSetState, IRoleStates } from './role-set.model';
import { RoleSetActions, roleStateKey } from './role-set.actions';
import { roleSetReducer } from './role-set.reducer';
import { isObject } from 'util';
import { IRoleState, RoleState } from '../role/role.model';
import { AppellationStdBool } from '../role/role.component';
import { RoleSetService } from '../../shared/role-set.service';
import { RoleActions } from '../role/role.actions';
import { roleReducer } from '../role/role.reducers';
import { IRoleSetListState } from '../role-set-list/role-set-list.model';
import { roleSetListReducer } from '../role-set-list/role-set-list-reducer';
import { StateCreatorService } from '../../shared/state-creator.service';
import { ClassService } from '../../shared/class.service';
import { ControlValueAccessor, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

export type RoleSetLabelObj = {
  default: string
  pl: string
  sg: string
}

export class RoleSetComponent implements OnInit, ControlValueAccessor {

  @Input() parentPath: string[];

  @Input() index: string;
  getBasePath = () => this.index ?
    [... this.parentPath, 'roleSets', this.index] :
    null;
  basePath: string[];
  localStore: ObservableStore<IRoleSetState>;

  parentStore: ObservableStore<IRoleSetListState>
  addButtonVisible: boolean = true;

  /**
  * Paths to other slices of the store
  */

  // Since we're observing an array of items, we need to set up a 'trackBy'
  // parameter so Angular doesn't tear down and rebuild the list's DOM every
  // time there's an update.
  getKey(_, item) {
    return item.tkey;
  }

  /**
   * Local store Observables
   */
  @select() roles$: Observable<InfRole[]>
  @select() property$: Observable<DfhProperty>
  @select() fkProperty$: Observable<number>
  @select() isOutgoing$: Observable<boolean>
  @select() parentPeIt$: Observable<InfPersistentItem>
  @select() parentEntityPk$: Observable<number>
  @select() state$: Observable<EditorStates>;
  @select() toggle$: Observable<CollapsedExpanded>
  @select() label$: Observable<RoleSetLabelObj>
  @select() rolesNotInProjectLoading$: Observable<boolean>;

  //Roles that are added to the project
  @select() roleStatesInProject$: Observable<IRoleStates>
  @select() roleStatesInProjectVisible$: Observable<boolean>

  //Roles that are added to at least one other project
  @select() roleStatesInOtherProjects$: Observable<IRoleStates>
  @select() roleStatesInOtherProjectsVisible$: Observable<boolean>

  //Roles that are in no project (that have been removed from at least the project that created it)
  @select() roleStatesInNoProject$: Observable<IRoleStates>
  @select() roleStatesInNoProjectVisible$: Observable<boolean>

  //Roles currently being created
  @select() roleStatesToCreate$: Observable<IRoleState>
  @select() roleStatesToCreateVisible$: Observable<boolean>


  /**
  * Other Store Observables
  */


  roleStatesInProject: IRoleStates
  project: Project;
  roleSetState: IRoleSetState;


  /**
   * Properties
   */

  formGroup: FormGroup; // formGroup to create roles
  formValPath: string[];
  createFormControlCount: number = 0;

  /**
   * Outputs
   */

  @Output() onRemoveRoleSet: EventEmitter<void> = new EventEmitter();

  constructor(
    private eprApi: InfEntityProjectRelApi,
    protected roleApi: InfRoleApi,
    protected activeProject: ActiveProjectService,
    private roleService: RoleService,
    protected propertyService: PropertyService,
    private util: UtilitiesService,
    public entityEditor: EntityEditorService,
    private changeDetector: ChangeDetectorRef,
    protected ngRedux: NgRedux<IRoleSetState>,
    protected actions: RoleSetActions,
    private roleSetService: RoleSetService,
    private roleStore: NgRedux<IRoleState>,
    private roleActions: RoleActions,
    protected stateCreator: StateCreatorService,
    protected classService: ClassService,
    protected fb: FormBuilder
  ) {

    // create the formGroup used to create/edit the roleSet's InfRole[]
    this.formGroup = this.fb.group({});

    // subscribe to form changes here
    this.formGroup.valueChanges.subscribe(val => {
      if (this.formGroup.valid) {

        // build a array of InfRole
        let roles: InfRole[] = [];
        Object.keys(this.formGroup.controls).forEach(key => {
          if (this.formGroup.get(key)) {
            roles.push(this.formGroup.get(key).value)
          }
        })

        // send the peIt the parent form
        this.onChange(roles)
      }
      else {
        this.onChange(null)
      }
    })
  }


  /**
  * Methods
  */

  temp:Subscription;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), roleSetReducer);
    this.basePath = this.getBasePath();


    /** prepare the formGroup */
    this.formValPath = [...this.basePath, 'formGroup'];

    // /** subscribe here for changes in the create-roles-form  */
    // this.formGroup.valueChanges.subscribe(val => {

    // })

    // this.parentStore = this.roleSetListStore.configureSubStore(this.parentPath, roleSetListReducer);
    this.roleStatesInProject$.subscribe(d => this.roleStatesInProject = d)

    this.ngRedux.select<Project>('activeProject').subscribe(d => this.project = d);

    this.localStore.select<IRoleSetState>('').subscribe(d => this.roleSetState = d)

    this.temp = Observable.combineLatest(this.toggle$, this.roleStatesToCreate$, this.roleStatesInProject$).subscribe(res => {
      const toggle = res[0], roleStatesToCreate = res[1], roleStatesInProject = res[2];

      if(this.roleSetState){
        // count roles of this roleSet that are in the project or currently being created 
        const rolesCount = Object.keys(roleStatesToCreate || {}).length + Object.keys(roleStatesInProject || {}).length;
        
        // check if more roles would be possible in this role set
        const moreRolesPossible = this.roleSetService.moreRolesPossible(rolesCount, this.roleSetState);
        
        // assign the add button visibility
        this.addButtonVisible = (toggle === 'expanded' && moreRolesPossible);
      }
    })

    // this.initProperty()

    // this.initChildren() SINGLE_INIT

    this.init();


    // if (state) {
    //   if (state == 'add-pe-it')
    //     this.sortRolesByPopularity();
    // }

  }

  init() { } // hook for child classes

  ngOnDestroy(){
    this.temp;
  }


  // initProperty() {
  //   /** init property */
  //   Observable.combineLatest(
  //     this.fkProperty$,
  //     this.isOutgoing$
  //   ).subscribe(result => {
  //     const fkProperty = result[0]
  //     const isOutgoing = result[1]

  //     if (fkProperty && (isOutgoing != undefined))
  //       // Load the dfh property
  //       this.propertyService.getPropertyByPkProperty(fkProperty).subscribe((prop: DfhProperty) => {

  //         this.localStore.dispatch(this.actions.propertyLoaded(prop));

  //         /** init the label */
  //         this.initLabel(isOutgoing, prop);

  //         /** init the pk target class */
  //         this.initPkTargetClass(isOutgoing, prop);

  //       });
  //   })

  // }



  // /**
  //  * initializes the label of the property, depending on the direction of the
  //  * property (is it an outgoing or an ingoing property) and the cardinality
  //  * (can there be only one role instance ore multiple).
  //  */
  // initLabel(isOutgoing: boolean, property: DfhProperty) {

  //   const label = this.propertyService.createLabelObject(property, isOutgoing);

  //   this.localStore.dispatch(this.actions.labelUpdated(label))

  // }

  //   initChildren() {

  //     Observable.zip(
  //       this.roles$,
  //       this.state$,
  //       this.isOutgoing$
  //     ).subscribe(result => {
  //       const roles = result["0"], state = result["1"], isOutgoing = result["2"];

  //       const roleStates = this.roleSetService.createChildren(roles, state, isOutgoing);

  //       if (roleStates){
  //         this.localStore.dispatch(this.actions.childRolesUpdated(roleStates))
  //       }
  //     })

  // }




  /**
  * Called when the users clicks on cancel to stop creating a new roleset
  */
  removeRoleSet() {
    this.onRemoveRoleSet.emit()
  }







  // // // point to TeEnt or PeIt
  // // @Input() pointTo: string;

  // // // primary key of the parent entity
  // // @Input() parentEntityPk: number;

  // // // If true, the UI for communiy statistics is visible
  // // @Input() communityStatsVisible: boolean;

  // // // If true, CRM info is visible in UI
  // // @Input() ontoInfoVisible: boolean;

  // /**
  // * set state - The state of this component
  // *
  // * @param  {state} state string 'view', 'add' or 'create'
  // */
  // @Input() state: EditorStates;

  // // state of the card below the header
  // @Input() cardState: 'collapsed' | 'expanded';




  /**
  * Outputs
  */

  //  @Output() stateChange: EventEmitter<string> = new EventEmitter();

  //  @Output() readyToCreate: EventEmitter<InfRole[]> = new EventEmitter;

  //  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;

  //  @Output() rolesAdded: EventEmitter<InfRole[]> = new EventEmitter;

  //  // emit appellation and a flag to say if this is the standard appellation
  //  @Output() appeChange: EventEmitter<AppellationStdBool> = new EventEmitter;

  //  @Output() readyToAdd: EventEmitter<InfRole[]> = new EventEmitter();

  //  @Output() notReadyToAdd: EventEmitter<void> = new EventEmitter();

  //  @Output() removePropertySectionReq: EventEmitter<IRoleSetState> = new EventEmitter();

  //  @Output() rolesUpdated: EventEmitter<InfRole[]> = new EventEmitter();




  // // add role state
  // addRoleState: string = 'init'; //init, selectExisting, createNew

  // // Latest modified role alternative with highest is_standard_in_project_count
  // mostPopularRole: InfRole;

  // roleComponents;

  // // the property
  // property: DfhProperty;

  // // max. mumber of possible alternatives -1=infinite
  // maxAlternatives: number;

  // // If ui allows to choose standard alternative for property
  // hasStandard: boolean;

  // // thisComponent
  // thisComponent = this;

  // // role to create, when creating a new role
  // roleToCreate: InfRole;

  // rolesToCreate: InfRole[];

  // isReadyToCreate: boolean;

  // // roles to add, when in add-pe-it state
  // rolesToAdd: InfRole[] = [];

  // // roles used by other projects in repo but not in this project
  // rolesInOtherProjects: InfRole[];

  // // roles not used by no project
  // rolesInNoProject: InfRole[];

  // // if true, roles used by no project are visible
  // rolesInNoProjectVisible: boolean;

  // // true while loading rolesInOtherProjects via api call
  // rolesNotInProjectLoading: boolean;

  // isReadyToAddRoles
  // get isReadyToAddRoles(): boolean {
  //   return (this.rolesToAdd.filter(r => {
  //     return r.entity_version_project_rels[0].is_in_project
  //   }).length > 0)
  // }






  /**
  * changeStandardRole - Make another child role the standard role for
  * the active project.
  *
  * @param key  the key of the child RoleState in the store tree
  * @return {void}
  */
  changeStandardRole(input: { roleState: IRoleState, key: string }) {

    let observables = [];


    // set loadingStdChange flag of the given child Role
    const inputRoleStore = this.getChildRoleStore(input.key)

    inputRoleStore.dispatch(this.roleActions.changeDisplayRoleLoading(true))

    // Create observable of api call to make the given role new standard

    observables.push(this.eprApi.patchAttributes(
      input.roleState.role.entity_version_project_rels[0].pk_entity_version_project_rel,
      {
        is_standard_in_project: true
      }
    ))

    // Get all Display Roles to disable (should be only one)

    const rolesToChange: IRoleState[] = [];

    Object.keys(this.roleStatesInProject).forEach(key => {
      const roleState: IRoleState = this.roleStatesInProject[key];
      const isDisplayRole = RoleService.isDisplayRole(roleState.isOutgoing, roleState.isDisplayRoleForDomain, roleState.isDisplayRoleForRange)
      if (roleState && isDisplayRole) {

        // set loadingStdChange flag of the RoleState
        this.getChildRoleStore(key).dispatch(this.roleActions.changeDisplayRoleLoading(true))

        // push the RoleState to an array that will be used later
        rolesToChange.push(roleState);

        // Create observable of api call to disable the old standard
        observables.push(this.eprApi.patchAttributes(
          roleState.role.entity_version_project_rels[0].pk_entity_version_project_rel,
          {
            is_standard_in_project: false
          }
        ))
      }
    });

    Observable.combineLatest(observables)
      .subscribe(
        (value) => {

          // update the epr of the new Std in store
          const isDisplayRole = value[0].is_standard_in_project,
            isOutgoing = input.roleState.isOutgoing;
          inputRoleStore.dispatch(this.roleActions.changeDisplayRoleSucceeded(isDisplayRole, isOutgoing))

          // update the former display role states (should be only one) in store 
          for (let i = 0; i < rolesToChange.length; i++) {
            const isDisplayRole = RoleService.isDisplayRole(rolesToChange[i].isOutgoing, rolesToChange[i].isDisplayRoleForDomain, rolesToChange[i].isDisplayRoleForRange)
            this.getChildRoleStore(roleStateKey(rolesToChange[i])).dispatch(this.roleActions.changeDisplayRoleSucceeded(false, rolesToChange[i].isOutgoing))
          }

        })

  }


  getChildRoleStore(key): ObservableStore<IRoleState> {
    return this.roleStore.configureSubStore([... this.basePath, 'roleStatesInProject', key], roleReducer);
  }


  /**
  * Methods specific to create state
  */


  /**
  * Called when user clicks on cancel select roles
  */
  cancelSelectRoles() {

    // this.addRoleState = 'init';

    // this.stateChange.emit('selectProp');
  }



  // get maxCardinality() {
  //   if (this.isOutgoing) return this.property.dfh_range_instances_max_quantifier;
  //   else if (this.isOutgoing === false) return this.property.dfh_domain_instances_max_quantifier;
  //   else console.log('isOutgoing is not defined')
  // }

  // get minCardinality() {
  //   if (this.isOutgoing) return this.property.dfh_range_instances_min_quantifier;
  //   else if (this.isOutgoing === false) return this.property.dfh_domain_instances_min_quantifier;
  //   else console.log('isOutgoing is not defined')
  // }


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

    // this.rolesToCreate = [];

    // let rolesValid = true;
    // if (this.roleComponents) {

    //   this.roleComponents.forEach(roleComponent => {

    //     if (!roleComponent.isReadyToCreate) rolesValid = false;

    //     this.rolesToCreate.push(roleComponent.role);

    //   })

    //   const quantityValid = this.propertyService.validateQuantity(
    //     this.rolesToCreate.length,
    //     this.property,
    //     this.isOutgoing
    //   )

    //   if (rolesValid && quantityValid) {

    //     this.isReadyToCreate = true;

    //     this.changeDetector.detectChanges()

    //     this.readyToCreate.emit(this.rolesToCreate);

    //   }

    // }

  }

  /**
  * called when a role pointing to a peIt is not ready to create
  */
  roleNotReadyToCreate() {

    // this.isReadyToCreate = false;
    // this.changeDetector.detectChanges()

    // this.notReadyToCreate.emit();

  }

  persistEntitiesToCreate(fkEntity) {

    // this.rolesToCreate.forEach((role) => {
    //   role.fk_entity = fkEntity;
    // })

    // this.roleApi.findOrCreateInfRole(
    //   this.activeProject.project.pk_project,
    //   this.rolesToCreate[0]
    // ).subscribe(newRoles => {

    //   this.rolesAdded.emit(newRoles);

    //   this.roleToCreate = undefined;
    // })

  }

  /**
  * Called when user click on close (only if no roles available)
  */

  removePropertySection() {
    // this.removePropertySectionReq.emit(this.propertySection);
  }

  /**
  * called when user cancels to create one specific role
  *
  */
  cancelCreateRole(key) {

    /** remove the RoleState from state */
    const roleStates = Object.assign({}, this.roleSetState.roleStatesToCreate);
    delete roleStates[key];
    this.localStore.dispatch(this.actions.roleCreationCancelled(roleStates));

    /** remove the form control from form */
    this.formGroup.removeControl(key)

  }

  /**
  *  called when user cancels to create new roles
  *
  */
  cancelCreateRoles() {

    /** remove all form controls from form */
    Object.keys(this.roleSetState.roleStatesToCreate).forEach(key => {
      this.formGroup.removeControl(key)
    })

    /** remove the RoleState from state */
    this.localStore.dispatch(this.actions.stopCreateNewRole());

  }





  createRoles() {
    console.log(this.roleSetState.formGroup)
  }

  /**
  * called when user created a new role
  */
  onRoleCreated(roleState: IRoleState) {
    const newRoleSetStates: IRoleStates = {
      ...this.roleSetState.roleStatesInProject,
      ...indexBy(roleStateKey, [roleState])
    }

    this.localStore.dispatch(this.actions.roleSetUpdated(newRoleSetStates))
    this.localStore.dispatch(this.actions.stopCreateNewRole())

    // this.roles.push(role);
    // this.addRoleState = 'init';

  }


  /**
  * called when user removed a role from project
  */
  onRoleRemoved(removedRole: InfRole) {
    // for (let i = 0; i < this.roles.length; i++) {
    //   if (this.roles[i].pk_entity === removedRole.pk_entity) {
    //     this.roles.splice(i, 1);
    //     break;
    //   }
    // }
  }

  /**
  * called when user updates a role (or its children)
  */
  onRoleUpdated(updatedRole: InfRole) {
    // for (let i = 0; i < this.roles.length; i++) {
    //   if (this.roles[i].pk_entity === updatedRole.pk_entity) {
    //     this.roles[i] = updatedRole;
    //     this.rolesUpdated.emit(this.roles)
    //     break;
    //   }
    // }
  }


  onRoleReadyToAdd(role: InfRole) {

    // let exists = false;

    // // replace if existing (this happens when user changes epr settings)
    // for (let i = 0; i < this.rolesToAdd.length; i++) {
    //   if (this.rolesToAdd[i].pk_entity === role.pk_entity) {
    //     this.rolesToAdd[i] = role;
    //     exists = true;
    //   }
    // }

    // // else push it
    // if (!exists) {
    //   this.rolesToAdd.push(role);
    // }

    // // // count number of roles that are selected to be in project
    // // const inProjectCount = this.rolesToAdd.filter(role =>
    // //   role.entity_version_project_rels[0].is_in_project
    // // ).length
    // //
    // // const quantityValid = this.propertyService.validateQuantity(
    // //   inProjectCount,
    // //   this.property,
    // //   this.isOutgoing
    // // )
    // //
    // // // check if this number is according to quantity definition
    // // if (quantityValid) {
    // // this.readyToAdd.emit(this.rolesToAdd);
    // // }
    // // else {
    // //   this.notReadyToAdd.emit();
    // // }

    // this.readyToAdd.emit(this.rolesToAdd);


  }



  /**
  * addSelectedRolesToProject - called when user wants to add roles and
  * all children to project
  *
  * @return {type}  description
  */
  addSelectedRolesToProject() {

    // let observables = [];
    // this.rolesToAdd.forEach(role => {
    //   if (role.entity_version_project_rels[0].is_in_project) {
    //     observables.push(this.roleApi.changeRoleProjectRelation(
    //       this.activeProject.project.pk_project, true, role)
    //     );
    //   }

    // })

    // Observable.combineLatest(observables)
    //   .subscribe(results => {
    //     results.forEach((result: InfRole[]) => {

    //       let addedRole = result[0];

    //       addedRole.is_in_project_count++;

    //       this.roles.push(addedRole);

    //       this.addRoleState = 'init';
    //     })
    //   })
  }

  /**
  * toggleCardBody - toggles the state of the card in order to collapse or
  * expand the card in the UI
  */
  toggleCardBody() {
    this.localStore.dispatch(this.actions.toggle())
  }


  /**
  * set the role that has highest is_standard_in_project_count and, if more
  * than one role have the same highest is_standard_in_project_count, the
  * latest modified role
  *
  * @return {type}  description
  */
  sortRolesByPopularity() {

    // // sort by is_standard_in_project_count and
    // this.roles.sort((roleA, roleB) => {
    //   var a = roleA.is_standard_in_project_count
    //   var b = roleB.is_standard_in_project_count

    //   if (a < b) {
    //     return 1;
    //   }
    //   if (a > b) {
    //     return -1;
    //   }
    //   // a muss gleich b sein
    //   return 0;
    // })

    // this.mostPopularRole = this.roles[0];
  }



  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(roles: InfRole[]): void {

    let formCtrlDefs: { [controlName: string]: any } = {};
    let formCrtlsToRemove: string[] = [];

    // add controls for each child roleSet
    if (this.roleSetState.roleStatesInProject)
      Object.keys(this.roleSetState.roleStatesInProject).forEach((key) => {
        if (this.roleSetState.roleStatesInProject[key]) {

          this.formGroup.addControl(key, new FormControl(
            this.roleSetState.roleStatesInProject[key].role,
            [
              Validators.required
            ]
          ))
        }
        else {
          formCrtlsToRemove.push(key);
        }
      })

    // remove control of removed chiild state
    formCrtlsToRemove.forEach(key => {
      this.formGroup.removeControl(key);
    })

  }


  /**
   * Allows Angular to register a function to call when the model changes.
   * Save the function as a property to call later here.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * gets replaced by angular on registerOnChange
   * This function helps to type the onChange function for the use in this class.
   */
  onChange = (peIt: InfRole[] | null) => {
  };

  /**
 * Allows Angular to register a function to call when the input has been touched.
 * Save the function as a property to call later here.
 */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
  * gets replaced by angular on registerOnTouched
  * Call this function when the form has been touched.
  */
  onTouched = () => {
  };

  markAsTouched() {
    this.onTouched()
    this.touched.emit()
  }

  @Output() touched: EventEmitter<void> = new EventEmitter();

}
