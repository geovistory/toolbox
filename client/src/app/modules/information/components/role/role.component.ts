import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { RoleSetComponent } from '../role-set/role-set.component';
import { InfAppellation, InfRole, DfhProperty, ActiveProjectService, EntityEditorService, InfRoleApi, InfEntityProjectRel, InfLanguage, InfTemporalEntity, Project } from 'app/core';
import { EprService } from '../../shared/epr.service';
import { ObservableStore, select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { EditorStates, CollapsedExpanded } from '../../information.models';
import { RoleActions } from './role.actions';
import { IRoleState } from './role.model';
import { roleReducer } from './role.reducers';
import { BehaviorSubject } from 'rxjs';
import { IRoleStates, IRoleSetState } from '../role-set/role-set.model';
import { RoleService } from '../../shared/role.service';
import { StateToDataService } from '../../shared/state-to-data.service';
import { StateCreatorService } from '../../shared/state-creator.service';

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

export class RoleComponent implements OnInit {
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

  isDisplayRoleInProject: boolean;

  property$: Observable<DfhProperty>;
  activeProject$: Observable<Project>;
  activeProject: Project;

  roleState: IRoleState;
  parentRoleSetState: IRoleSetState;

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
    protected stateCreator: StateCreatorService
  ) { }

  ngOnInit() {

    this.initSubscriptions();

    // this.initState();

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
    this.property$.subscribe(property => {
      const roleToCreate = new InfRole();
      roleToCreate.fk_property = property.dfh_pk_property;
      this.localStore.dispatch(this.actions.roleToCreateUpdated(roleToCreate))
    })
  }

  initRoleToAdd(state) {
    Observable.zip(
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

        this.localStore.dispatch(this.actions.roleToAddUpdated(roleToAdd))
      })
  }


  initSubscriptions() {
    this.basePath = this.getBasePath();
    this.localStore = this.ngRedux.configureSubStore(this.basePath, roleReducer);

    this.property$ = this.ngRedux.select<DfhProperty>([...this.parentPath, 'property']);
    this.activeProject$ = this.ngRedux.select<Project>('activeProject');

    this.ngRedux.select<IRoleSetState>([...this.parentPath]).subscribe(d => this.parentRoleSetState = d);
    this.activeProject$.subscribe(d => this.activeProject = d);
    this.localStore.select<IRoleState>('').subscribe(d => this.roleState = d)

    // Observe if this role is a display role for the project
    // since this depends on the isOutgoing and the corresponding
    // - isDisplayRoleForDomain or isDisplayRoleForRange -
    // this value can be calculated allways on the fly
    this.isOutgoing$.subscribe(isOutgoing => {
      if (isOutgoing === true) {
        this.isDisplayRoleForDomain$.subscribe(bool => {
          this.isDisplayRoleInProject = bool;
        })
      } else if (isOutgoing === false) {
        this.isDisplayRoleForRange$.subscribe(bool => {
          this.isDisplayRoleInProject = bool;
        })
      }
    })

  }


  /**
  * requestStandard - tells the parent Property that it wants to become standard
  */
  requestStandard(): void {
    this.onRequestStandard.emit({ roleState: this.roleState, key: this.index });
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

   @Output() roleCreationCanceled: EventEmitter<void> = new EventEmitter();


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




  /**
  * createRole - called when user confirms to create a role (with all children)
  *
  */
  createRole() {

    // findOrCreate the InfRole
    this.roleApi.findOrCreateInfRole(
      this.activeProject.pk_project,
      this.roleState.role
    ).subscribe(newRole => {

      // create RoleState with child PeItState of selected peIt
      this.stateCreator.initializeRoleState(newRole[0], 'editable', this.roleState.isOutgoing)
      .subscribe(roleState=>{
        
        // add the initialized peItState to the new RoleState
        roleState.peItState = this.roleState.peItState;

        // emit the RoleState to TeEntRoleSet
        this.roleCreated.emit(roleState);

        // remove this RoleState (which was only for create)
        this.localStore.dispatch(this.actions.roleStateRemoved())
      });
    })


  }

  /**
  * cancelCreateRole - called when user cancels to create a role
  *
  */
  cancelCreateRole() {

    this.localStore.dispatch(this.actions.roleStateRemoved());

    this.roleCreationCanceled.emit()
  }


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
  * removeFromProject - called when user removes a role (nested) from project
  */
  removeFromProject() {
    if (RoleService.isDisplayRole(this.roleState.isOutgoing, this.roleState.isDisplayRoleForDomain, this.roleState.isDisplayRoleForRange)) {
      alert("You can't remove the standard item. Make another item standard and try again.")
    } else {

      const roleToRemove = StateToDataService.roleStateToRoleToRelate(this.roleState)

      console.log(roleToRemove)

      this.roleApi.changeRoleProjectRelation(
        this.activeProject.pk_project, false, roleToRemove
      ).subscribe(result => {
        const removedRole: InfRole = result[0]
        this.localStore.dispatch(this.actions.roleStateRemoved())
      })
    }
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


}
