import {
  Component, OnChanges, OnInit, Input, Output, ViewChildren,
  QueryList, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, forwardRef
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

import { TeEntComponent } from '../te-ent/te-ent.component';
import { RoleSetComponent } from '../role-set/role-set.component';
import { PeItRoleComponent } from '../pe-it-role/pe-it-role.component';
import { InfPersistentItem, InfEntityProjectRelApi, InfRoleApi, ActiveProjectService, EntityEditorService, InfRole, DfhProperty, Project, InfTemporalEntity, InfPersistentItemApi } from 'app/core';
import { RoleService } from '../../shared/role.service';
import { PropertyService } from '../../shared/property.service';
import { UtilitiesService } from '../../shared/utilities.service';
import { WithSubStore, ObservableStore, NgRedux, select } from '@angular-redux/store';
import { EditorStates, CollapsedExpanded } from '../../information.models';
import { roleSetReducer } from '../role-set/role-set.reducer';
import { IRoleSetState, IRoleStates } from '../role-set/role-set.model';
import { RoleSetActions } from '../role-set/role-set.actions';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { IPeItState } from '../../containers/pe-it/pe-it.model';
import { peItReducer } from '../../containers/pe-it/pe-it.reducer';
import { PeItActions } from '../../containers/pe-it/pe-it.actions';
import { RoleSetService } from '../../shared/role-set.service';
import { IRoleState } from '../role/role.model';
import { RoleActions } from '../role/role.actions';
import { IRoleSetListState } from '../role-set-list/role-set-list.model';
import { StateCreatorService } from '../../shared/state-creator.service';
import { ClassService } from '../../shared/class.service';
import { FormBuilder, NG_VALUE_ACCESSOR, FormGroup, FormControl, Validators } from '@angular/forms';

@AutoUnsubscribe()
@WithSubStore({
  localReducer: roleSetReducer,
  basePathMethodName: 'getBasePath'
})
@Component({
  selector: 'gv-pe-it-role-set',
  templateUrl: './pe-it-role-set.component.html',
  styleUrls: ['./pe-it-role-set.component.scss'],
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PeItRoleSetComponent),
      multi: true
    }
  ]
})

export class PeItRoleSetComponent extends RoleSetComponent {

  // Array of children RoleComponents
  @ViewChildren(PeItRoleComponent) roleComponents: QueryList<PeItRoleComponent>


  /**
  * Paths to other slices of the store
  */
  parentPeItStatePath: string[];


  /**
   * Stores to other slices of the store
   */
  // parentPeItStore:ObservableStore<IPeItState>

  /**
   * Other store Observables
   */

  ontoInfoVisible$: Observable<boolean>
  communityStatsVisible$: Observable<boolean>


  // needed on this. scope for user interactions where we can't add subcriptions on each click
  property: DfhProperty;
  parentPeIt: InfPersistentItem;
  fkProject: number
  parentPeItState: IPeItState;


  constructor(
    eprApi: InfEntityProjectRelApi,
    roleApi: InfRoleApi,
    activeProject: ActiveProjectService,
    roleService: RoleService,
    propertyService: PropertyService,
    util: UtilitiesService,
    public entityEditor: EntityEditorService,
    changeDetector: ChangeDetectorRef,
    ngRedux: NgRedux<IRoleSetState>,
    actions: RoleSetActions,
    private peItRedux: NgRedux<IPeItState>,
    private peItActions: PeItActions,
    roleSetService: RoleSetService,
    roleStore: NgRedux<IRoleState>,
    roleActions: RoleActions,
    protected stateCreator: StateCreatorService,
    protected classService: ClassService,
    fb: FormBuilder,
    private peItApi: InfPersistentItemApi,
  ) {
    super(eprApi, roleApi, activeProject, roleService, propertyService, util, entityEditor, changeDetector, ngRedux, actions, roleSetService, roleStore, roleActions, stateCreator, classService, fb)

  }


  init() {

    this.initPaths()

    // this.initStores()

    this.initObservablesOutsideLocalStore();

    this.initSubsciptions();

  }

  /**
   * init paths to different slices of the store
   */
  initPaths() {
    this.parentPeItStatePath = this.parentPath;
  }

  /**
 * init stores to different slices of the store
 */
  // initStores() {
  // this.parentPeItStore = this.peItRedux.configureSubStore(this.parentPeItStatePath, peItReducer);
  // }

  /**
   * init observables to other slices of the store than the local store
   * (to select observables from local store, use @select decorator)
   */
  initObservablesOutsideLocalStore() {
    this.ontoInfoVisible$ = this.ngRedux.select<boolean>([...this.parentPeItStatePath, 'ontoInfoVisible']);
  }

  /**
   * init subscriptions to observables in the store
   * subscribe all here, so it is only subscribed once on init and not multiple times on user interactions
   */
  initSubsciptions() {
    this.subs.push(this.property$.subscribe(p => this.property = p))
    this.subs.push(this.ngRedux.select<InfPersistentItem>([...this.parentPeItStatePath, 'peIt']).subscribe(i => this.parentPeIt = i))
    this.subs.push(this.ngRedux.select<IPeItState>(this.parentPath).subscribe(d => this.parentPeItState = d))
    this.subs.push(this.ngRedux.select<Project>('activeProject').subscribe(p => this.fkProject = p.pk_project))



  }


  /**
  * Called when user click on Add a [*]
  * 
  * Searches alternative roles.
  * If no alternative roles used by at least one project found, continue creating new role directly.
  */
  startAddingRole() {


    this.localStore.dispatch(this.actions.startAddingRole())

    const fkProperty = this.roleSetState.property.dfh_pk_property;
    const fkEntity = this.parentPeItState.peIt.pk_entity;
    const fkProject = this.activeProject.project.pk_project;

    const waitAtLeast = timer(800);
    const apiCall = this.roleApi.alternativesNotInProjectByEntityPk(fkEntity, fkProperty, fkProject)

    this.subs.push(Observable.combineLatest([waitAtLeast, apiCall])
      .subscribe((results) => {

        const rolesInOtherProjects = results[1].filter(role => role.is_in_project_count > 0);
        const rolesInNoProject = results[1].filter(role => role.is_in_project_count == 0);

        const inOther$ = this.stateCreator.initializeRoleStates(rolesInOtherProjects, 'add', this.roleSetState.isOutgoing)
        const inNo$ = this.stateCreator.initializeRoleStates(rolesInNoProject, 'add', this.roleSetState.isOutgoing)

        Observable.combineLatest(inOther$, inNo$).subscribe(results => {
          const roleStatesInOtherProjects = results[0], roleStatesInNoProjects = results[1]

          this.localStore.dispatch(this.actions.alternativeRolesLoaded(
            roleStatesInOtherProjects,
            roleStatesInNoProjects
          ))

          if (rolesInOtherProjects.length === 0) {
            this.startCreateNewRole();
          }

        })
      }))

  }


  /**
  * Called when user clicks on create new
  * Creates a new IRoleStates of the kind of property of this component
  * and pointing to the parent persistent item
  */


  startCreateNewRole() {


    this.subs.push(this.classService.getByPk(this.roleSetState.targetClassPk).subscribe(targetDfhClass => {

      const roleToCreate = new InfRole();
      roleToCreate.fk_property = this.roleSetState.property.dfh_pk_property;
      roleToCreate.fk_entity = this.parentPeItState.peIt.pk_entity;

      let teEnt = new InfTemporalEntity;
      teEnt.fk_class = targetDfhClass.dfh_pk_class;
      roleToCreate.temporal_entity = teEnt;

      const options: IRoleState = {
        targetDfhClass,
        toggle: 'expanded'
      }

      this.subs.push(this.stateCreator.initializeRoleState(roleToCreate, 'create-pe-it-role', this.roleSetState.isOutgoing, options).subscribe(roleStateToCreate => {

        /** add a form control */
        const formControlName = 'new_role_' + this.createFormControlCount;
        this.createFormControlCount++;
        this.formGroup.addControl(formControlName, new FormControl(
          roleStateToCreate.role,
          [
            Validators.required
          ]
        ))

        /** update the state */
        const roleStatesToCreate: IRoleStates = {};
        roleStatesToCreate[formControlName] = roleStateToCreate;
        this.localStore.dispatch(this.actions.startCreateNewRole(roleStatesToCreate))
      }))
    })
    )
  }


  createRoles() {
    if (this.formGroup.valid) {

      // prepare peIt 
      const p = new InfPersistentItem(this.parentPeIt);
      p.pi_roles = [];

      Object.keys(this.formGroup.controls).forEach(key => {
        if (this.formGroup.get(key)) {
          // add roles to create to peIt
          p.pi_roles.push(this.formGroup.get(key).value)
        }
      })

      // call api
      this.subs.push(this.peItApi.findOrCreatePeIt(this.project.pk_project, p).subscribe(peIts => {
        const roles: InfRole[] = peIts[0].pi_roles;

        // update the form group
        Object.keys(this.formGroup.controls).forEach(key => {
          this.formGroup.removeControl(key)
        })


        // update the state
        this.subs.push(this.stateCreator.initializeRoleStates(roles, 'editable', this.roleSetState.isOutgoing).subscribe(roleStates => {
          this.localStore.dispatch(this.actions.rolesCreated(roleStates))
        }))

      }))
    }
  }


}

