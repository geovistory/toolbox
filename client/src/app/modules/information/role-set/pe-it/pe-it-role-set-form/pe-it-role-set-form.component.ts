import { NgRedux, ObservableStore, WithSubStore } from '@angular-redux/store';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IAppState, InfPersistentItem, InfPersistentItemApi, InfRole, InfRoleApi, InfTemporalEntity } from 'app/core';
import { PeItDetail, RoleDetail, RoleSet } from 'app/core/state/models';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { combineLatest, timer } from 'rxjs';
import { peItReducer } from '../../../data-unit/pe-it/pe-it.reducer';
import { ClassService } from '../../../shared/class.service';
import { StateCreatorService } from '../../../shared/state-creator.service';
import { RoleSetFormBase } from '../../role-set-form.base';
import { RoleSetActions } from '../../role-set.actions';
import { roleSetReducer } from '../../role-set.reducer';
import { StateSettings, createRoleDetail, createRoleSet } from 'app/core/state/services/state-creator';

@AutoUnsubscribe()
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: roleSetReducer
})
@Component({
  selector: 'gv-pe-it-role-set-form',
  templateUrl: './pe-it-role-set-form.component.html',
  styleUrls: ['./pe-it-role-set-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeItRoleSetFormComponent extends RoleSetFormBase {


  @Input() parentPeItPath: string[];

  parentPeItStore: ObservableStore<PeItDetail>;

  submit(): void {
  }

  constructor(
    protected fb: FormBuilder,
    protected ngRedux: NgRedux<IAppState>,
    protected ref: ChangeDetectorRef,
    protected roleApi: InfRoleApi,
    protected stateCreator: StateCreatorService,
    protected actions: RoleSetActions,
    protected classService: ClassService,
    protected peItApi: InfPersistentItemApi,
  ) {
    super(fb, ngRedux, ref, actions)
    console.log('PeItRoleSetFormComponent')

  }

  initRoleSetFormBaseChild(): void {
    this.parentPeItStore = this.ngRedux.configureSubStore(this.parentPeItPath, peItReducer)

    this.loadAlternativeRoles()
  }


  loadAlternativeRoles() {

    const s = this.localStore.getState();
    const ps = this.parentPeItStore.getState();

    const fkProperty = s.property.dfh_pk_property;
    const fkEntity = ps.peIt.pk_entity;
    const fkProject = this.ngRedux.getState().activeProject.pk_project;

    const waitAtLeast = timer(800);
    const apiCall = this.roleApi.alternativesNotInProjectByEntityPk(fkEntity, fkProperty, fkProject)

    this.subs.push(combineLatest([waitAtLeast, apiCall])
      .subscribe((results) => {

        const rolesInOtherProjects = results[1].filter(role => parseInt(role.is_in_project_count, 10) > 0);
        const rolesInNoProject = results[1].filter(role => parseInt(role.is_in_project_count, 10) == 0);


        // update the state
        const roleDetailsInOtherProjects = createRoleSet(
          new RoleSet(this.localStore.getState()), rolesInOtherProjects, this.ngRedux.getState().activeProject.crm, { isViewMode: true }
        )._role_list;
        const roleDetailsInNoProjects = createRoleSet(
          new RoleSet(this.localStore.getState()), rolesInNoProject, this.ngRedux.getState().activeProject.crm, { isViewMode: true }
        )._role_list;
        this.localStore.dispatch(this.actions.alternativeRolesLoaded(
          roleDetailsInOtherProjects,
          roleDetailsInNoProjects
        ))


        if (rolesInOtherProjects.length === 0) {
          this.startCreateNewRole();
        } else {
          this.initAddFormCtrls(roleDetailsInOtherProjects)
        }

      }))

  }


  /**
  * Called when user clicks on create new or when loading alternative roles returned 0 alt. roles
  * Creates a new RoleDetail of the kind of property of this component
  * and pointing to the parent persistent item
  */
  startCreateNewRole() {

    const s = this.localStore.getState();
    const ps = this.parentPeItStore.getState();

    // pi_role that will be created
    const roleToCreate = {

      // the fk_property is defined by the RoleSet
      fk_property: s.property.dfh_pk_property,
      // the fk_entity is defined by the parent PeItDetail
      fk_entity: ps.peIt.pk_entity,

      temporal_entity: {
        fk_class: s.targetClassPk,

        // circular role, that appears from the beginning on, when user creates new pi_role
        te_roles: [
          {
            // the fk_property is defined by the RoleSet
            fk_property: s.property.dfh_pk_property,
            // the fk_entity is defined by the parent PeItDetail
            fk_entity: ps.peIt.pk_entity,
          }
        ]

      } as InfTemporalEntity
    } as InfRole


    const options: RoleDetail = {
      targetClassPk: s.targetClassPk,
      isOutgoing: s.isOutgoing,
      toggle: 'expanded',
      _teEnt: {
        selectPropState: 'init',
      }
    }
    const settings: StateSettings = {
      isCreateMode: true
    }

    // initialize the state
    this.subs.push(this.stateCreator.initializeRoleDetail(roleToCreate, options, settings).subscribe(roleStateToCreate => {

      this.initCreateFormCtrls(roleStateToCreate)

    }))

  }


  createRoles() {
    const s = this.localStore.getState();

    if (this.createForm.valid) {

      // prepare peIt
      const p = new InfPersistentItem(this.parentPeItStore.getState().peIt);
      p.pi_roles = [];

      Object.keys(this.createForm.controls).forEach(key => {
        if (this.createForm.get(key)) {
          // add roles to create to peIt
          p.pi_roles.push(this.createForm.get(key).value)
        }
      })
      // console.log(p)

      // call api
      this.subs.push(this.peItApi.findOrCreatePeIt(this.ngRedux.getState().activeProject.pk_project, p).subscribe(peIts => {
        const roles: InfRole[] = peIts[0].pi_roles;

        // update the form group
        Object.keys(this.createForm.controls).forEach(key => {
          this.createForm.removeControl(key)
        })

        // update the state
        const roleSet = createRoleSet(new RoleSet(this.localStore.getState()), roles, this.ngRedux.getState().activeProject.crm, {})
        this.localStore.dispatch(this.actions.rolesCreated(roleSet._role_list))

      }))
    }
  }

  addRoles() {
    const s = this.localStore.getState();

    if (this.addForm.valid) {

      // get pk_entities of roles selected by user
      const pk_roles = [];
      Object.keys(this.addForm.controls).forEach(key => {
        if (this.addForm.get(key)) {
          // add roles to pk_entity-array
          pk_roles.push(s._role_set_form._role_add_list[key].role.pk_entity)
        }
      })

      this.localStore.dispatch(this.actions.addRolesWithTeEnt(pk_roles))

    }
  }

  /**
  *  called when user cancels to create new roles
  *
  */
  cancelCreateRoles() {

    /** remove the RoleState from state */
    this.localStore.dispatch(this.actions.stopCreateNewRole());

  }

}
