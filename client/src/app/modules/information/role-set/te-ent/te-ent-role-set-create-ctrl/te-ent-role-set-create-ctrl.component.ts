import { NgRedux } from '@angular-redux/store';
import { Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { IAppState, InfEntityProjectRelApi, InfRole, InfRoleApi, InfTemporalEntityApi } from 'app/core';
import { Observable } from 'rxjs';

import { RoleDetail, RoleSet, TeEntDetail } from '../../../information.models';
import { RoleActions } from '../../../role/role.actions';
import { slideInOut } from '../../../shared/animations';
import { ClassService } from '../../../shared/class.service';
import { RoleSetService } from '../../../shared/role-set.service';
import { StateCreatorService, StateSettings } from '../../../shared/state-creator.service';
import { RoleSetAddCtrlBase } from '../../role-set-add-ctrl.base';
import { RoleSetActions } from '../../role-set.actions';
import { RoleSetCreateCtrlBase } from '../../role-set-create-ctrl.base';
import { RoleSetApiEpics } from '../../role-set.epics';
import { RootEpics } from '../../../../../core/store/epics';

@Component({
  selector: 'gv-te-ent-role-set-create-ctrl',
  templateUrl: './te-ent-role-set-create-ctrl.component.html',
  styleUrls: ['./te-ent-role-set-create-ctrl.component.scss'],
  animations: [
    slideInOut
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeEntRoleSetCreateCtrlComponent),
      multi: true
    }
  ]
})
export class TeEntRoleSetCreateCtrlComponent extends RoleSetCreateCtrlBase {


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
    protected rootEpics: RootEpics,
    protected epics: RoleSetApiEpics,
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
    teEntApi: InfTemporalEntityApi

  ) {
    super(rootEpics, epics, eprApi, roleApi, ngRedux, actions, roleSetService, roleStore, roleActions, stateCreator, classService, fb)
  }

  initRoleSetCreateCtrlBaseChild() {

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

  startCreateRole() {
    const roleToCreate = new InfRole();
    roleToCreate.fk_property = this.roleSetState.property.dfh_pk_property;
    roleToCreate.fk_temporal_entity = this.parentTeEntState.teEnt.pk_entity;

    const options: RoleDetail = {
      targetClassPk: this.roleSetState.targetClassPk,
      isOutgoing: this.roleSetState.isOutgoing
    }
    const settings: StateSettings = {
      isCreateMode: true
    }

    this.stateCreator.initializeRoleDetail(roleToCreate, options, settings).subscribe(roleStateToCreate => {

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
      this.localStore.dispatch(this.actions.addRoleToRoleList(formControlName, roleStateToCreate))
    })

  }

  /**
* called when user cancels to create one specific role
*
*/
  cancelCreateRole(key) {

    /** remove the form control from form */
    this.formGroup.removeControl(key)

    /** remove the RoleState from state */
    this.localStore.dispatch(this.actions.removeRoleFromRoleList(key));

  }


}
