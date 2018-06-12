import { NgRedux } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IAppState, InfEntityProjectRelApi, InfRole, InfRoleApi, InfTemporalEntity, InfTemporalEntityApi } from 'app/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable } from 'rxjs/Observable';

import { RoleDetail, RoleDetailList, TeEntDetail, RoleSet } from '../../../information.models';
import { RoleActions } from '../../../role/role.actions';
import { slideInOut } from '../../../shared/animations';
import { ClassService } from '../../../shared/class.service';
import { RoleSetService } from '../../../shared/role-set.service';
import { StateCreatorService } from '../../../shared/state-creator.service';
import { RoleSetAddCtrlBase } from '../../role-set-add-ctrl.base';
import { RoleSetActions } from '../../role-set.actions';
import { RoleSetBase } from '../../role-set.base';

@AutoUnsubscribe()
@Component({
  selector: 'gv-te-ent-role-set-editable',
  templateUrl: './te-ent-role-set-editable.component.html',
  styleUrls: ['./te-ent-role-set-editable.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TeEntRoleSetEditableComponent extends RoleSetBase {

  /**
    * Paths to other slices of the store
    */
  @Input() parentTeEntStatePath: string[];
  parentPeItStatePath: string[];

  parentRoleDetailPath: string[]

  /**
   * Other Store Observables
   */
  ontoInfoVisible$: Observable<boolean>
  communityStatsVisible$: Observable<boolean>

  roleSetState: RoleSet;
  parentTeEntState: TeEntDetail;
  parentRoleDetail: RoleDetail;


  constructor(
    protected eprApi: InfEntityProjectRelApi,
    protected roleApi: InfRoleApi,
    protected ngRedux: NgRedux<IAppState>,
    protected actions: RoleSetActions,
    protected roleSetService: RoleSetService,
    protected roleStore: NgRedux<RoleDetail>,
    protected roleActions: RoleActions,
    protected stateCreator: StateCreatorService,
    protected classService: ClassService,
    protected fb: FormBuilder,
    protected teEntApi: InfTemporalEntityApi
  ) {
    super(eprApi, roleApi, ngRedux, actions, roleSetService, roleStore, roleActions, stateCreator, classService, fb)
  }

  init(): void {
    this.initPaths()
  
    this.initObservablesOutsideLocalStore();
  
    this.initSubsciptions();
  }

  /**
        * init paths to different slices of the store
        */
  initPaths() {
    // transforms e.g. 
    // ['information', 'entityEditor', 'peItState', 'roleSets', '1_ingoing', '_role_list', '88899', 'childTeEnt'] to
    // ['information', 'entityEditor', 'peItState']
    this.parentPeItStatePath = this.parentPath.slice(0, (this.parentPath.length - 5));

    // transforms e.g. 
    // ['information', 'entityEditor', 'peItState', 'roleSets', '1_ingoing', '_role_list', '88899', 'childTeEnt'] to
    // ['information', 'entityEditor', 'peItState', 'roleSets', '1_ingoing', ]
    this.parentRoleDetailPath = this.parentPath.slice(0, (this.parentPath.length - 3));

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
    this.subs.push(this.ngRedux.select<TeEntDetail>(this.parentTeEntStatePath).subscribe(d => this.parentTeEntState = d))
    this.subs.push(this.ngRedux.select<RoleDetail>(this.parentRoleDetailPath).subscribe(d => this.parentRoleDetail = d))

  }

  /**
  * Called when user click on Add a [*]
  * 
  * Searches alternative roles.
  * If no alternative roles used by at least one project found, continue creating new role directly.
  */
  startAddingRole() {


    this.localStore.dispatch(this.actions.startAddingRole())


  }



  /**
  * Called when user clicks on create new
  * Creates a new RoleDetailList of the kind of property of this component
  * and pointing to the parent persistent item
  */


  startCreateNewRole() {

    const roleToCreate = new InfRole();
    roleToCreate.fk_property = this.roleSetState.property.dfh_pk_property;
    roleToCreate.fk_temporal_entity = this.parentTeEntState.teEnt.pk_entity;

    this.subs.push(this.classService.getByPk(this.roleSetState.targetClassPk).subscribe(targetDfhClass => {
      const options: RoleDetail = { targetDfhClass, isOutgoing: this.roleSetState.isOutgoing }

      this.stateCreator.initializeRoleDetail(roleToCreate, options).subscribe(roleStateToCreate => {

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
        const roleStatesToCreate: RoleDetailList = {};
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

        this.subs.push(this.stateCreator.initializeRoleDetails(roles, { isOutgoing: this.roleSetState.isOutgoing }).subscribe(roleStates => {
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
   * Start editing a RoleDetail
   * @param key: the key of the RoleDetail in the store 
   */
  startEditing(key) {
    const roleset = this.roleSetState._role_list[key];

    this.subs.push(this.stateCreator.initializeRoleDetail(roleset.role, { isOutgoing: roleset.isOutgoing }).subscribe(roleState => {
      this.localStore.dispatch(this.actions.startEditingRole(key, roleState))
    }))
  }

  /**
  * Start editing a RoleDetail
  * @param key: the key of the RoleDetail in the store 
  */
  stopEditing(key) {
    const roleset = this.roleSetState._role_list[key];
    this.subs.push(this.stateCreator.initializeRoleDetail(roleset.role, { isOutgoing: roleset.isOutgoing }).subscribe(roleState => {
      this.localStore.dispatch(this.actions.stopEditingRole(key, roleState))
    }))
  }

  startUpdatingRole(key, role: InfRole) {

    console.error('implement the following lines')
    // const oldRole = StateToDataService.roleStateToRoleToRelate(this.roleSetState._role_list[key]);

    // // call api
    // this.subs.push(Observable.combineLatest(
    //     this.roleApi.changeRoleProjectRelation(this.project.pk_project, false, oldRole),
    //     this.roleApi.findOrCreateInfRole(this.project.pk_project, role)
    // ).subscribe(result => {
    //     const newRoles = result[1];

    //     this.subs.push(this.stateCreator.initializeRoleDetails(newRoles,  this.roleSetState.isOutgoing).subscribe(roleStates => {
    //         // update the state
    //         this.localStore.dispatch(this.actions.updateRole(key, roleStates))
    //     }))
    // }))

  }

}
