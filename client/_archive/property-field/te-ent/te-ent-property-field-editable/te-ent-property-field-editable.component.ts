import { NgRedux, ObservableStore } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IAppState, ProInfoProjRelApi, InfRole, InfRoleApi, InfTemporalEntity, InfTemporalEntityApi } from 'app/core';
import { RoleDetail, RoleDetailList, PropertyField, TeEntDetail } from 'app/core/state/models';
import { getCreateOfEditableContext, StateSettings, createRoleDetail, createRoleDetailList } from 'app/core/state/services/state-creator';
import { RootEpics } from 'app/core/store/epics';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { dropLast } from 'ramda';
import { Observable } from 'rxjs';
import { RoleActions } from '../../../role/role.actions';
import { slideInOut } from '../../../shared/animations';
import { ClassService } from '../../../shared/class.service';
import { PropertyFieldService } from '../../../shared/property-field.service';
import { PropertyFieldActions } from '../../property-field.actions';
import { PropertyFieldBase } from '../../property-field.base';
import { PropertyFieldApiEpics } from '../../property-field.epics';
import { propertyFieldReducer } from '../../property-field.reducer';


@AutoUnsubscribe({
  blackList: ['destroy$']
})
@Component({
  selector: 'gv-te-ent-property-field-editable',
  templateUrl: './te-ent-property-field-editable.component.html',
  styleUrls: ['./te-ent-property-field-editable.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeEntPropertyFieldEditableComponent extends PropertyFieldBase {

  /**
    * Paths to other slices of the store
    */
  @Input() parentTeEntStatePath: string[];
  @Input() asPeItChild: boolean;

  parentPeItStatePath: string[];
  peItPropertyFieldStore: ObservableStore<PropertyField>;

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
    protected teEnApi: InfTemporalEntityApi
  ) {
    super(rootEpics, epics, eprApi, roleApi, ngRedux, actions, propertyFieldService, roleStore, roleActions, classService, fb)
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
    // ['information', '_peIt_editable', '_fields', '_1_ingoing', '_role_list', '_88899', '_teEnt'] to
    // ['information', '_peIt_editable']
    this.parentPeItStatePath = this.parentPath.slice(0, (this.parentPath.length - 5));

    // transforms e.g.
    // ['information', '_peIt_editable', '_fields', '_1_ingoing', '_role_list', '_88899', '_teEnt'] to
    // ['information', '_peIt_editable', '_fields', '_1_ingoing', ]
    this.parentRoleDetailPath = this.parentPath.slice(0, (this.parentPath.length - 3));

    this.peItPropertyFieldStore = this.ngRedux.configureSubStore(dropLast(3, this.parentPath), propertyFieldReducer)

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
    roleToCreate.fk_property = this.propertyFieldState.property.dfh_pk_property;
    roleToCreate.fk_temporal_entity = this.parentTeEntState.teEnt.pk_entity;

    const options: RoleDetail = { targetClassPk: this.propertyFieldState.targetClassPk, isOutgoing: this.propertyFieldState.isOutgoing };
    const settings: StateSettings = {
      pkUiContext: getCreateOfEditableContext(this.localStore.getState().pkUiContext)
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
    const roleStatesToCreate: RoleDetailList = {};
    roleStatesToCreate[formControlName] = roleDetailToCreate;
    this.localStore.dispatch(this.actions.startCreateNewRole(roleStatesToCreate))
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
      this.subs.push(this.teEnApi.findOrCreateInfTemporalEntity(this.project.pk_project, t).subscribe(teEnts => {
        const roles: InfRole[] = teEnts[0].te_roles;

        const roleDetailList = createRoleDetailList(this.propertyFieldState, roles, this.ngRedux.getState().activeProject.crm, { pkUiContext: this.propertyFieldState.pkUiContext })
        this.localStore.dispatch(this.actions.rolesCreated(roleDetailList))

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
    const propertyField = this.propertyFieldState._role_list[key];
    const roleDetail = createRoleDetail(propertyField, propertyField.role, this.ngRedux.getState().activeProject.crm, { pkUiContext: this.propertyFieldState.pkUiContext })
    this.localStore.dispatch(this.actions.startEditingRole(key, roleDetail))
  }

  /**
  * Start editing a RoleDetail
  * @param key: the key of the RoleDetail in the store
  */
  stopEditing(key) {
    const propertyField = this.propertyFieldState._role_list[key];
    const roleDetail = createRoleDetail(propertyField, propertyField.role, this.ngRedux.getState().activeProject.crm, { pkUiContext: this.propertyFieldState.pkUiContext })
    this.localStore.dispatch(this.actions.stopEditingRole(key, roleDetail))
  }


  enableDrag() {
    if (this.asPeItChild) {

      if (this.peItPropertyFieldStore.getState().dragEnabled) this.peItPropertyFieldStore.dispatch(this.actions.disableDrag())

      if (!this.localStore.getState().dragEnabled) this.localStore.dispatch(this.actions.enableDrag())
    }
  }

  disableDrag() {
    if (this.asPeItChild) {

      if (!this.peItPropertyFieldStore.getState().dragEnabled) this.peItPropertyFieldStore.dispatch(this.actions.enableDrag())

      if (this.localStore.getState().dragEnabled) this.localStore.dispatch(this.actions.disableDrag())
    }
  }

}