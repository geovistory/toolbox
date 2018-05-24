import {
  Component, OnChanges, OnInit, Input, Output, ViewChildren,
  QueryList, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, forwardRef
} from '@angular/core';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { timer } from 'rxjs/observable/timer';

import { TeEntComponent } from '../te-ent/te-ent.component';
import { RoleSetComponent } from '../role-set/role-set.component';
import { TeEntRoleComponent } from '../te-ent-role/te-ent-role.component';
import { InfTemporalEntity, InfRole, InfEntityProjectRelApi, InfRoleApi, ActiveProjectService, EntityEditorService, Project, DfhClass, InfTemporalEntityApi } from 'app/core';
import { RoleService } from '../../shared/role.service';
import { PropertyService } from '../../shared/property.service';
import { UtilitiesService } from '../../shared/utilities.service';
import { NgRedux, WithSubStore } from '@angular-redux/store';
import { RoleSetActions } from '../role-set/role-set.actions';
import { IRoleSetState, IRoleStates } from '../role-set/role-set.model';
import { roleSetReducer } from '../role-set/role-set.reducer';
import { RoleSetService } from '../../shared/role-set.service';
import { IRoleState } from '../role/role.model';
import { RoleActions } from '../role/role.actions';
import { IRoleSetListState } from '../role-set-list/role-set-list.model';
import { ITeEntState } from '../te-ent/te-ent.model';
import { StateCreatorService } from '../../shared/state-creator.service';
import { ClassService } from '../../shared/class.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { FormBuilder, NG_VALUE_ACCESSOR, FormGroup, Validators, FormControl } from '@angular/forms';
import { StateToDataService } from '../../shared/state-to-data.service';
import { slideInOut } from '../../shared/animations';

@AutoUnsubscribe()
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: roleSetReducer
})
@Component({
  selector: 'gv-te-ent-role-set',
  templateUrl: './te-ent-role-set.component.html',
  styleUrls: ['./te-ent-role-set.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeEntRoleSetComponent),
      multi: true
    }
  ]
})
export class TeEntRoleSetComponent extends RoleSetComponent implements OnInit {

  /**
  * Paths to other slices of the store
  */
  @Input() parentTeEntStatePath: string[];
  parentPeItStatePath: string[];

  parentRoleStatePath: string[]
  /**
   * Local Store Observables
   */


  /**
  * Other Store Observables
  */
  ontoInfoVisible$: Observable<boolean>
  communityStatsVisible$: Observable<boolean>

  roleSetState: IRoleSetState;
  parentTeEntState: ITeEntState;
  parentRoleState: IRoleState;

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
    roleSetService: RoleSetService,
    roleStore: NgRedux<IRoleState>,
    roleActions: RoleActions,
    protected stateCreator: StateCreatorService,
    protected classService: ClassService,
    fb: FormBuilder,
    protected teEntApi: InfTemporalEntityApi
  ) {
    super(eprApi, roleApi, activeProject, roleService, propertyService, util, entityEditor, changeDetector, ngRedux, actions, roleSetService, roleStore, roleActions, stateCreator, classService, fb)
  }

  init() {

    this.initPaths()

    this.initObservablesOutsideLocalStore();

    this.initSubsciptions();

    this.initTeEntRoleSetChild();
  }

  /** 
   * hook for child classes to get called on init
   * never add logic to this method here, since may be overridden by child class.
  */
  initTeEntRoleSetChild(){}
  
  /**
   * init paths to different slices of the store
   */
  initPaths() {
    // transforms e.g. 
    // ['information', 'entityEditor', 'peItState', 'roleSets', '1_ingoing', 'roleStatesInProject', '88899', 'childTeEnt'] to
    // ['information', 'entityEditor', 'peItState']
    this.parentPeItStatePath = this.parentPath.slice(0, (this.parentPath.length - 5));

    // transforms e.g. 
    // ['information', 'entityEditor', 'peItState', 'roleSets', '1_ingoing', 'roleStatesInProject', '88899', 'childTeEnt'] to
    // ['information', 'entityEditor', 'peItState', 'roleSets', '1_ingoing', ]
    this.parentRoleStatePath = this.parentPath.slice(0, (this.parentPath.length - 3));

  }


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
    this.subs.push(this.ngRedux.select<ITeEntState>(this.parentTeEntStatePath).subscribe(d => this.parentTeEntState = d))
    this.subs.push(this.ngRedux.select<IRoleState>(this.parentRoleStatePath).subscribe(d => this.parentRoleState = d))

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

    // // Return true, if all of this.roles are identical with the parent role
    // // of the parent teEnt.

    // if (this.parentRoleState) {
    //   const roles = this.roleSetState.roles;
    //   const parentRole = this.parentRoleState.role;
    //   if (roles && roles.length) {

    //       // If there are roles, we are obviously not in create state.
    //       // If all of this.roles are identical with the parent role
    //       // of the parent teEnt return true to say that this is circular

    //       let count = 0;
    //       roles.forEach(role => {
    //         if (role.pk_entity == parentRole.pk_entity) {

    //           // If this is a circular role, remove its epr so that it is not
    //           // two times in the entity tree. This prevents that changing the
    //           // entity project relation is interfered by this second (unused)
    //           // role

    //           // delete role.entity_version_project_rels;

    //           count++;
    //         }
    //       })
    //       if (roles.length === count) {
    //         return true;
    //       }

    //   }

    //   if (
    //     this.state === 'create' &&
    //     this.fkProperty == parentRole.fk_property
    //   ) {

    //     // If we are in create state
    //     // and this.fkProperty is identical with the parent role fk_property
    //     // return true to say that this is circular

    //     return true;
    //   }
    // }

    return false;
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
    const fkTemporalEntity = this.parentTeEntState.teEnt.pk_entity;
    const fkProject = this.activeProject.project.pk_project;

    // in case we are creating a new peItRole, the intermediate teEnt is not yet persisted and
    // no altenatives can be searched
    if (!fkTemporalEntity) {
      this.startCreateNewRole();
      return;
    }

    const waitAtLeast = timer(800);
    const apiCall = this.roleApi.alternativesNotInProjectByTeEntPk(fkTemporalEntity, fkProperty, fkProject)

    this.subs.push(Observable.combineLatest([waitAtLeast, apiCall])
      .subscribe((results) => {

        const rolesInOtherProjects = results[1].filter(role => role.is_in_project_count > 0);
        const rolesInNoProject = results[1].filter(role => role.is_in_project_count == 0);

        const inOther$ = this.stateCreator.initializeRoleStates(rolesInOtherProjects, 'add', this.roleSetState.isOutgoing)
        const inNo$ = this.stateCreator.initializeRoleStates(rolesInNoProject, 'add', this.roleSetState.isOutgoing)

        this.subs.push(Observable.combineLatest(inOther$, inNo$).subscribe(results => {
          const roleStatesInOtherProjects = results[0], roleStatesInNoProjects = results[1]

          this.localStore.dispatch(this.actions.alternativeRolesLoaded(
            roleStatesInOtherProjects,
            roleStatesInNoProjects
          ))
          if (rolesInOtherProjects.length === 0) {
            this.startCreateNewRole();
          }
        }))

      }))

  }

  // get addButtonVisible(): boolean {

  //  

  //   // TODO add logic according to quantities

  //   return false;
  // }


  /**
  * Called when user clicks on create new
  * Creates a new IRoleStates of the kind of property of this component
  * and pointing to the parent persistent item
  */


  startCreateNewRole() {

    const roleToCreate = new InfRole();
    roleToCreate.fk_property = this.roleSetState.property.dfh_pk_property;
    roleToCreate.fk_temporal_entity = this.parentTeEntState.teEnt.pk_entity;

    this.subs.push(this.classService.getByPk(this.roleSetState.targetClassPk).subscribe(targetDfhClass => {
      const options: IRoleState = { targetDfhClass }

      const state = this.roleSetState.state == 'editable' ? 'create-te-ent-role' : this.roleSetState.state;

      this.stateCreator.initializeRoleState(roleToCreate, state, this.roleSetState.isOutgoing, options).subscribe(roleStateToCreate => {

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
      })
    }))
  }

  createRoles() {
    if (this.formGroup.valid) {

      // prepare peIt 
      const t = new InfTemporalEntity(this.parentTeEntState.teEnt);
      t.te_roles = [];
      Object.keys(this.formGroup.controls).forEach(key => {
        if (this.formGroup.get(key)) {
          // add roles to create to peIt
          t.te_roles.push(this.formGroup.get(key).value)
        }
      })

      // call api
      this.subs.push(this.teEntApi.findOrCreateInfTemporalEntity(this.project.pk_project, t).subscribe(teEnts => {
        const roles: InfRole[] = teEnts[0].te_roles;

        this.subs.push(this.stateCreator.initializeRoleStates(roles, 'editable', this.roleSetState.isOutgoing).subscribe(roleStates => {
          // update the state
          this.localStore.dispatch(this.actions.rolesCreated(roleStates))
        }))

      }))

    }
  }

  /**
* Methods specific to edit state
*/

  /**
   * Start editing a RoleState
   * @param key: the key of the RoleState in the store 
   */
  startEditing(key) {
    const roleset = this.roleSetState.roleStatesInProject[key];

    this.subs.push(this.stateCreator.initializeRoleState(roleset.role, 'edit', roleset.isOutgoing).subscribe(roleState => {
      this.localStore.dispatch(this.actions.startEditingRole(key, roleState))
    }))
  }

    /**
   * Start editing a RoleState
   * @param key: the key of the RoleState in the store 
   */
  stopEditing(key) {
    const roleset = this.roleSetState.roleStatesInProject[key];
    this.subs.push(this.stateCreator.initializeRoleState(roleset.role, 'editable', roleset.isOutgoing).subscribe(roleState => {
      this.localStore.dispatch(this.actions.stopEditingRole(key, roleState))
    }))
  }

  startUpdatingRole(key, role: InfRole) {

    const oldRole = StateToDataService.roleStateToRoleToRelate(this.roleSetState.roleStatesInProject[key]);

    // call api
    this.subs.push(Observable.combineLatest(
      this.roleApi.changeRoleProjectRelation(this.project.pk_project, false, oldRole),
      this.roleApi.findOrCreateInfRole(this.project.pk_project, role)
    ).subscribe(result => {
      const newRoles = result[1];

      this.subs.push(this.stateCreator.initializeRoleStates(newRoles, 'editable', this.roleSetState.isOutgoing).subscribe(roleStates => {
        // update the state
        this.localStore.dispatch(this.actions.updateRole(key, roleStates))
      }))
    }))

  }

}
