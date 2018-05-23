import {
  OnChanges, OnInit, Input, Output, ViewChildren,
  QueryList, EventEmitter, ChangeDetectorRef, OnDestroy
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
import { Subscription, ReplaySubject } from 'rxjs';
import { StateToDataService } from '../../shared/state-to-data.service';

export type RoleSetLabelObj = {
  default: string
  pl: string
  sg: string
}

export class RoleSetComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() parentPath: string[];

  @Input() index: string;
  getBasePath = () => this.index ?
    [... this.parentPath, 'roleSets', this.index] :
    null;
  basePath: string[];
  localStore: ObservableStore<IRoleSetState>;

  addButtonVisible: boolean = true;
  removeRoleSetBtnVisible: boolean = false;

  /**
  * Paths to other slices of the store
  */

  // Since we're observing an array of items, we need to set up a 'trackBy'
  // parameter so Angular doesn't tear down and rebuild the list's DOM every
  // time there's an update.
  getKey(_, item) {
    return item.key;
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
  subs: Subscription[] = []; // for unsubscribe onDestroy

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
    this.subs.push(this.formGroup.valueChanges.subscribe(val => {
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
    }))

  }


  /**
  * Methods
  */
  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), roleSetReducer);
    this.basePath = this.getBasePath();


    /** prepare the formGroup */
    this.formValPath = [...this.basePath, 'formGroup'];



    // /** subscribe here for changes in the create-roles-form  */
    // this.formGroup.valueChanges.subscribe(val => {

    // })

    this.subs.push(this.roleStatesInProject$.subscribe(d => { this.roleStatesInProject = d; }))

    this.subs.push(this.ngRedux.select<Project>('activeProject').subscribe(d => this.project = d));

    this.subs.push(this.localStore.select<IRoleSetState>('').subscribe(d => {
      this.roleSetState = d

      let formCtrlDefs: { [controlName: string]: any } = {};
      let formCrtlsToRemove: string[] = [];

      // add controls for each child roleSet
      if (this.roleSetState && this.roleSetState.roleStatesInProject)
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

    }));

    this.subs.push(Observable.combineLatest(this.toggle$, this.roleStatesToCreate$, this.roleStatesInProject$).subscribe(res => {
      const toggle = res[0], roleStatesToCreate = res[1], roleStatesInProject = res[2];

      if (this.roleSetState) {
        // count roles of this roleSet that are in the project or currently being created 
        const rolesCount = Object.keys(roleStatesToCreate || {}).length + Object.keys(roleStatesInProject || {}).length;

        // check if more roles would be possible in this role set
        const moreRolesPossible = this.roleSetService.moreRolesPossible(rolesCount, this.roleSetState);

        // assign the add button visibility
        this.addButtonVisible = (toggle === 'expanded' && moreRolesPossible);

        this.removeRoleSetBtnVisible = ((!roleStatesToCreate || roleStatesToCreate == {}) && (!roleStatesInProject || roleStatesInProject == {}));
      }
    }))

    // this.initProperty()

    // this.initChildren() SINGLE_INIT

    this.init();


    // if (state) {
    //   if (state == 'add-pe-it')
    //     this.sortRolesByPopularity();
    // }

  }

  init() { } // hook for child classes

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }




  /**
  * Called when the users clicks on cancel to stop creating a new roleset
  */
  removeRoleSet() {
    this.onRemoveRoleSet.emit()
  }



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

    this.subs.push(Observable.combineLatest(observables)
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

        }))

  }


  getChildRoleStore(key): ObservableStore<IRoleState> {
    return this.roleStore.configureSubStore([... this.basePath, 'roleStatesInProject', key], roleReducer);
  }


  /**
  * Methods specific to create state
  */


  /**
  * called when user cancels to create one specific role
  *
  */
  cancelCreateRole(key) {

    /** remove the form control from form */
    this.formGroup.removeControl(key)

    /** remove the RoleState from state */
    const roleStates = Object.assign({}, this.roleSetState.roleStatesToCreate);
    delete roleStates[key];
    this.localStore.dispatch(this.actions.roleCreationCancelled(roleStates));

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


  /**
  * removeFromProject - called when user removes a role (nested) from project
  */
  removeFromProject(key: string) {
    const roleState = this.roleSetState.roleStatesInProject[key];
    if (RoleService.isDisplayRole(roleState.isOutgoing, roleState.isDisplayRoleForDomain, roleState.isDisplayRoleForRange)) {
      alert("You can't remove the standard item. Make another item standard and try again.")
    } else {

      const roleToRemove = StateToDataService.roleStateToRoleToRelate(roleState)

      console.log(roleToRemove)

      this.subs.push(this.roleApi.changeRoleProjectRelation(
        this.project.pk_project, false, roleToRemove
      ).subscribe(result => {
        this.localStore.dispatch(this.actions.roleRemovedFromProject(key))
      }))
    }
  }




  /**
  * toggleCardBody - toggles the state of the card in order to collapse or
  * expand the card in the UI
  */
  toggleCardBody() {
    this.localStore.dispatch(this.actions.toggle())
  }



  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(roles: InfRole[]): void {


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
