import { NgRedux } from '@angular-redux/store';
import { Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { IAppState, ProInfoProjRelApi, InfRole, InfRoleApi } from 'app/core';
import { RoleDetail, PropertyField, TeEntDetail } from 'app/core/state/models';
import { StateSettings, createRoleDetail } from 'app/core/state/services/state-creator';
import { Observable } from 'rxjs';
import { RootEpics } from '../../../../../core/store/epics';
import { RoleActions } from '../../../role/role.actions';
import { slideInOut } from '../../../shared/animations';
import { ClassService } from '../../../shared/class.service';
import { PropertyFieldService } from '../../../shared/property-field.service';
import { PropertyFieldCreateCtrlBase } from '../../property-field-create-ctrl.base';
import { PropertyFieldActions } from '../../property-field.actions';
import { PropertyFieldApiEpics } from '../../property-field.epics';


@Component({
  selector: 'gv-te-ent-property-field-create-ctrl',
  templateUrl: './te-ent-property-field-create-ctrl.component.html',
  styleUrls: ['./te-ent-property-field-create-ctrl.component.scss'],
  animations: [
    slideInOut
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeEntPropertyFieldCreateCtrlComponent),
      multi: true
    }
  ]
})
export class TeEntPropertyFieldCreateCtrlComponent extends PropertyFieldCreateCtrlBase {


  /**
      * Paths to other slices of the store
      */
  @Input() parentTeEntStatePath: string[];
  parentPeItStatePath: string[];

  parentRoleDetailPath: string[]

  /**
   * Other Store Observables
   */
  showOntoInfo$: Observable<boolean>
  showCommunityStats$: Observable<boolean>

  propertyFieldState: PropertyField;
  parentTeEntState: TeEntDetail;
  parentRoleDetail: RoleDetail;


  constructor(
    protected rootEpics: RootEpics,
    protected epics: PropertyFieldApiEpics,
    protected eprApi: ProInfoProjRelApi,
    protected roleApi: InfRoleApi,
    public ngRedux: NgRedux<IAppState>,
    protected actions: PropertyFieldActions,
    protected propertyFieldService: PropertyFieldService,
    protected roleStore: NgRedux<RoleDetail>,
    protected roleActions: RoleActions,
    protected classService: ClassService,
    protected fb: FormBuilder,

  ) {
    super(rootEpics, epics, eprApi, roleApi, ngRedux, actions, propertyFieldService, roleStore, roleActions, classService, fb)
  }

  initPropertyFieldCreateCtrlBaseChild() {

    this.initPaths()

    this.initObservablesOutsideLocalStore();

    this.initSubsciptions();

  }

  /**
     * init paths to different slices of the store
     */
  initPaths() {
    // transforms e.g.
    // ['information', 'entityEditor', 'peItState', 'propertyFields', '1_ingoing', '_role_list', '88899', 'childTeEnt'] to
    // ['information', 'entityEditor', 'peItState']
    this.parentPeItStatePath = this.parentPath.slice(0, (this.parentPath.length - 5));

    // transforms e.g.
    // ['information', 'entityEditor', 'peItState', 'propertyFields', '1_ingoing', '_role_list', '88899', 'childTeEnt'] to
    // ['information', 'entityEditor', 'peItState', 'propertyFields', '1_ingoing', ]
    this.parentRoleDetailPath = this.parentPath.slice(0, (this.parentPath.length - 3));

  }


  /**
   * init observables to other slices of the store than the local store
   * (to select observables from local store, use @select decorator)
   */
  initObservablesOutsideLocalStore() {
    this.showOntoInfo$ = this.ngRedux.select<boolean>([...this.parentPeItStatePath, 'showOntoInfo']);
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
    roleToCreate.fk_property = this.propertyFieldState.property.dfh_pk_property;
    roleToCreate.fk_temporal_entity = this.parentTeEntState.teEnt.pk_entity;

    const options: RoleDetail = {
      targetClassPk: this.propertyFieldState.targetClassPk,
      isOutgoing: this.propertyFieldState.isOutgoing
    }
    const settings: StateSettings = {
      pkUiContext: this.localStore.getState().pkUiContext
    }

    const roleDetailToCreate = createRoleDetail(options, roleToCreate, this.ngRedux.getState().activeProject.crm, settings)

    /** add a form control */
    const formControlName = 'new_role_' + this.createFormControlCount;
    this.createFormControlCount++;
    this.formGroup.addControl(formControlName, new FormControl(
      roleDetailToCreate.role,
      [
        Validators.required
      ]
    ))

    /** update the state */
    this.localStore.dispatch(this.actions.addRoleToRoleList(formControlName, roleDetailToCreate))

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
