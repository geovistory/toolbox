import { Component, Input, ChangeDetectorRef, Output, EventEmitter, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { RoleSetComponent } from '../role-set/role-set.component';
import { InfAppellation, InfRole, DfhProperty, ActiveProjectService, EntityEditorService, InfRoleApi, InfEntityProjectRel, InfLanguage, InfTemporalEntity, Project } from 'app/core';
import { EprService } from '../../shared/epr.service';
import { ObservableStore, select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { EditorStates, CollapsedExpanded } from '../../information.models';
import { RoleActions } from './role.actions';
import { IRoleState } from './role.model';
import { roleReducer } from './role.reducers';
import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { IRoleStates, IRoleSetState } from '../role-set/role-set.model';
import { RoleService } from '../../shared/role.service';
import { StateCreatorService } from '../../shared/state-creator.service';
import { FormGroup, Validators, FormControl, ControlValueAccessor, FormBuilder } from '@angular/forms';
import { ɵPRE_STYLE } from '@angular/animations';
import { equals } from 'ramda';

export enum RolePointToEnum {
  PeIt = "PeIt",
  TeEnt = "TeEnt"
};

export interface AppellationStdBool {
  appellation: InfAppellation;
  isDisplayRoleInProject: boolean;
  isMostPopular?: boolean;
  role?: InfRole;
}

export class RoleComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() parentPath: string[];
  @Input() intermediatePathSegment: string;
  @Input() index: string;
  localStore: ObservableStore<IRoleState>;

  getBasePath = () => {
    const segment = this.intermediatePathSegment ? this.intermediatePathSegment : 'roleStatesInProject';

    return this.index ?
      [... this.parentPath, segment, this.index] :
      null
  };

  basePath: string[]

  @select() role$: Observable<InfRole>;
  @select() isOutgoing$: Observable<boolean>;
  @select() state$: Observable<EditorStates>;
  @select() toggle$: Observable<CollapsedExpanded>;
  @select() isStandardRoleToAdd$: Observable<boolean>;
  @select() isDisplayRoleForDomain$: Observable<boolean>;
  @select() isDisplayRoleForRange$: Observable<boolean>;
  @select() roleToAdd$: Observable<InfRole>;
  @select() changingDisplayRole$: Observable<boolean>;
  @select() targetDfhClass$: Observable<boolean>;
  @select() isReadyToCreate$: Observable<boolean>;
  @select() isCircular$: Observable<boolean>;

  isDisplayRoleInProject$: ReplaySubject<boolean> = new ReplaySubject();

  property$: Observable<DfhProperty>;
  activeProject$: Observable<Project>;
  activeProject: Project;

  roleState: IRoleState;
  parentRoleSetState: IRoleSetState;

  // names of child states and of the RoleState object with the key of the value within the child state 
  childStatesConfig: { [key: string]: { nameInState: string, nameInApi: string } } = {
    'childTeEnt': {
      nameInState: 'teEnt',
      nameInApi: 'temporal_entity'
    },
    'appeState': {
      nameInState: 'appellation',
      nameInApi: 'appellation'
    },
    'langState': {
      nameInState: 'language',
      nameInApi: 'language'
    },
    'timePrimitiveState': {
      nameInState: 'timePrimitive',
      nameInApi: 'time_primitive'
    },
    'peItState': {
      nameInState: 'peIt',
      nameInApi: 'fk_entity'
    }
  };

  formControlName: string;
  formControl: FormControl;

  subs: Subscription[] = []

  /**
  * Outputs
  */

  @Output() onRequestStandard: EventEmitter<{ roleState: IRoleState, key: string }> = new EventEmitter();

  @Output() roleCreated: EventEmitter<IRoleState> = new EventEmitter();

  constructor(
    protected activeProjectService: ActiveProjectService,
    private eprService: EprService,
    private ref: ChangeDetectorRef,
    public entityEditor: EntityEditorService,
    protected roleApi: InfRoleApi,
    protected ngRedux: NgRedux<IRoleState>,
    protected actions: RoleActions,
    protected stateCreator: StateCreatorService,
    private fb: FormBuilder
  ) {
    // create the formGroup used by the form to edit the role
    this.formGroup = this.fb.group({});

  }
  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }
  ngOnInit() {

    this.initSubscriptions();

    // this.initState();

    // add a control for the child of the role
    Object.keys(this.childStatesConfig).forEach((key) => {
      if (this.roleState[key]) {


        const childStateConfig = this.childStatesConfig[key]
        this.formControlName = childStateConfig.nameInApi;
        const formControlValue = this.roleState[key][childStateConfig.nameInState];
        this.formControl = new FormControl(
          formControlValue,
          [
            Validators.required
          ]
        )

        // subscribe to form control changes 
        this.subs.push(this.formControl.valueChanges.subscribe(val => {

          // send the changes to the parent form
          if (this.formControl.valid) {

            // build a InfRole
            let role: InfRole = new InfRole(this.roleState.role);

            // add the value to the role
            role[this.formControlName] = this.formGroup.get(this.formControlName).value

            // if this is not a leaf peIt
            if (this.formControlName !== 'fk_entity') {

              // add also the fk_class
              role[this.formControlName].fk_class = (val && val.fk_class) ? val.fk_class : this.roleState.targetDfhClass.dfh_pk_class;
            }

            this.onChange(role)
          }
          else {
            this.onChange(null)
          }

          // // update the redux state, if the form value differs from the state value 
          // this.localStore.dispatch(this.actions.infRoleUpdated(role))
          // if (!equals(this.roleState.role, role)) {
          // }          

        }))

        this.formGroup.addControl(this.formControlName, this.formControl)

      }
    })

    this.init();
  }

  init() { }

  // initState() {
  //   this.state$.subscribe(state => {


  //     if ((state === 'create' || state === 'create-te-ent' || state === 'create-pe-it')) {
  //       this.initRoleToCreate()
  //     }

  //     if (state === 'add' || state === 'add-pe-it' || state === 'create-pe-it') {
  //       this.initRoleToAdd(state)
  //     }


  //     // this.initChildren(); SINGLE_INIT
  //   })

  // }

  initChildren() { }


  initRoleToCreate() {
    this.subs.push(this.property$.subscribe(property => {
      const roleToCreate = new InfRole();
      roleToCreate.fk_property = property.dfh_pk_property;
      this.localStore.dispatch(this.actions.infRoleUpdated(roleToCreate))
    }))
  }

  initRoleToAdd(state) {
    this.subs.push(Observable.zip(
      this.activeProject$, this.role$, this.isStandardRoleToAdd$
    )
      .subscribe(result => {
        const activeProject = result[0], role = result[1], isStandardRoleToAdd = result[2];

        // make a copy
        const roleToAdd = new InfRole(role);

        let eprToAdd = new InfEntityProjectRel({
          fk_project: this.activeProjectService.project.pk_project,
          fk_entity_version_concat: role.pk_entity_version_concat
        })

        if (
          (state === 'add-pe-it' || state === 'create-pe-it') && isStandardRoleToAdd
        ) {
          eprToAdd.is_standard_in_project = true;
        }

        // add an epr
        roleToAdd.entity_version_project_rels = [eprToAdd]

        this.localStore.dispatch(this.actions.infRoleUpdated(roleToAdd))
      }))
  }


  initSubscriptions() {
    this.basePath = this.getBasePath();
    this.localStore = this.ngRedux.configureSubStore(this.basePath, roleReducer);

    this.property$ = this.ngRedux.select<DfhProperty>([...this.parentPath, 'property']);
    this.activeProject$ = this.ngRedux.select<Project>('activeProject');

    this.subs.push(this.ngRedux.select<IRoleSetState>([...this.parentPath]).subscribe(d => this.parentRoleSetState = d));
    this.subs.push(this.activeProject$.subscribe(d => this.activeProject = d));
    this.subs.push(this.localStore.select<IRoleState>('').subscribe(d => this.roleState = d))

    // Observe if this role is a display role for the project
    // since this depends on the isOutgoing and the corresponding
    // - isDisplayRoleForDomain or isDisplayRoleForRange -
    // this value can be calculated allways on the fly
    this.subs.push(this.isOutgoing$.subscribe(isOutgoing => {
      if (isOutgoing === true) {
        this.subs.push(this.isDisplayRoleForDomain$.subscribe(bool => {
          this.isDisplayRoleInProject$.next(bool);
        }))
      } else if (isOutgoing === false) {
        this.subs.push(this.isDisplayRoleForRange$.subscribe(bool => {
          this.isDisplayRoleInProject$.next(bool);
        }))
      }
    }))

  }


  /**
  * requestStandard - tells the parent Property that it wants to become standard
  */
  requestStandard(): void {
    this.onRequestStandard.emit({ roleState: this.roleState, key: this.index });
  }

  log(a) {
    console.log(a)
  }


  //   /**
  //   * Inputs
  //   */

  //  @Input() role: InfRole;

  //  @Input() isOutgoing: boolean;

  //  @Input() pointTo: string;

  //  @Input() roleState: 'view' | 'editable' | 'edit' | 'create' | 'add' | 'add-pe-it' | 'create-te-ent' | 'create-pe-it';

  //  @Input() pkTargetClass: string;

  //  @Input() fkProperty: number;

  //  @Input() parentProperty: DfhProperty;

  //  // If true, the UI for communiy statistics is visible
  //  @Input() communityStatsVisible: boolean;

  //  // If true, CRM info is visible in UI
  //  @Input() ontoInfoVisible: boolean;

  //  // true for latest modified role with highest is_standard_in_project_count
  //  @Input() isStandardRoleToAdd: boolean;


  //  @Output() readyToCreate: EventEmitter<InfRole> = new EventEmitter;

  //  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;

  //  // emit appellation and a flag to say if this is the standard appellation
  //  @Output() appeChange: EventEmitter<AppellationStdBool> = new EventEmitter;

  //  @Output() readyToAdd: EventEmitter<InfRole> = new EventEmitter();



  //  /**
  //  * Properties
  //  */

  //  // Used in add-pe-it state
  //  roleToAdd: InfRole;

  //  // Flag to disable the standard toggle button while loading 
  //  loadingStdChange: boolean = false;

  //  // true if the role is ready to create (only for create state)
  //  isReadyToCreate: boolean;

  //  // If the role points to a teEnt with a child appellation
  //  appellation: InfAppellation;

  //  private _isDisplayRoleInProject: boolean;










  /**
  * get the entity project relation between this role and active project
  */
  // get epr(): InfEntityProjectRel {
  //   return this.eprService.getEprOfEntity(this.role);
  // }


  // /**
  // * set the entity project relation between this role and active project
  // */
  // set epr(epr: InfEntityProjectRel) {
  //   this.eprService.updateEprOfEntity(this.role, epr);
  //   this.isDisplayRoleInProject = this.epr.is_standard_in_project;
  //   // this.ref.detectChanges();
  // }


  /**
  * returns true if the UI to see and edit standard in project status should
  * be visible.
  *
  * @return {boolean}  true = UI for standard in project is visible
  */
  // get standardInProjectVisible(): boolean {
  //   return true;
  // }


  // /**
  // * returns true if this is the standard role for this kind and this project
  // *
  // * @return {boolen}  description
  // */
  // get isDisplayRoleInProject(): boolean {
  //   return this._isDisplayRoleInProject;
  // }

  // set isDisplayRoleInProject(bool: boolean) {
  //   this._isDisplayRoleInProject = bool;

  //   if (this.appellation) {
  //     this.appeChange.emit({
  //       appellation: this.appellation,
  //       isDisplayRoleInProject: bool
  //     })
  //   }

  //   // Add other emits here if other things need to be emitted on std change
  // }




  // /**
  // * createRole - called when user confirms to create a role (with all children)
  // *
  // */
  // createRole() {

  //   // findOrCreate the InfRole
  //   this.roleApi.findOrCreateInfRole(
  //     this.activeProject.pk_project,
  //     this.roleState.role
  //   ).subscribe(newRole => {

  //     // create RoleState with child PeItState of selected peIt
  //     this.stateCreator.initializeRoleState(newRole[0], 'editable', this.roleState.isOutgoing)
  //       .subscribe(roleState => {

  //         // add the initialized peItState to the new RoleState
  //         roleState.peItState = this.roleState.peItState;

  //         // emit the RoleState to TeEntRoleSet
  //         this.roleCreated.emit(roleState);

  //         // remove this RoleState (which was only for create)
  //         this.localStore.dispatch(this.actions.roleStateRemoved())
  //       });
  //   })


  // }




  teEntReadyToCreate(teEnt: InfTemporalEntity) {

    // this.role.temporal_entity = teEnt;

    // this.isReadyToCreate = true;

    // this.readyToCreate.emit(this.role);

  }


  teEntNotReadyToCreate() {

    // this.isReadyToCreate = false;

    // this.notReadyToCreate.emit()

  }



  /**
  * Methods specific to add-pe-it state
  */


  /**
  * Called when the user selects the role to add to project
  */
  select() {

    // // change value in epr
    // this.roleToAdd.entity_version_project_rels[0].is_in_project = true;

    // // emit it
    // this.readyToAdd.emit(this.roleToAdd);

  }

  /**
  * Called when the user deselects the role to not add it to project
  */
  deselect() {

    // // change value in epr
    // this.roleToAdd.entity_version_project_rels[0].is_in_project = false;

    // // emit it
    // this.readyToAdd.emit(this.roleToAdd);

  }

  onAppeReadyToAdd(appellation: InfAppellation) {

    // // add appe to role
    // this.roleToAdd.appellation = appellation;

    // // emit it
    // this.readyToAdd.emit(this.roleToAdd);

  }


  onLangReadyToAdd(language: InfLanguage) {

    // // add appe to role
    // this.roleToAdd.language = language;

    // // emit it
    // this.readyToAdd.emit(this.roleToAdd);

  }

  onTeEntReadyToAdd(teEntToAdd: InfTemporalEntity) {
    // // add appe to role
    // this.roleToAdd.temporal_entity = teEntToAdd;

    // // emit it
    // this.readyToAdd.emit(this.roleToAdd);
  }


  /**
  * Methods for event bubbeling
  */

  emitAppeChange(appeStd: AppellationStdBool) {
    // appeStd.isDisplayRoleInProject = this.isDisplayRoleInProject;
    // appeStd.role = this.role;
    // this.appellation = appeStd.appellation;
    // this.appeChange.emit(appeStd)
  }




  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/
  formGroup: FormGroup;

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(role: InfRole): void {

    // the model is taken from the state on init

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
  onChange = (peIt: InfRole | null) => {
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
