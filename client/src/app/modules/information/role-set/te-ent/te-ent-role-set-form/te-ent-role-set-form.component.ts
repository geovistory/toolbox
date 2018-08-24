import { WithSubStore, NgRedux, ObservableStore } from '@angular-redux/store';
import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { RoleSetFormBase } from '../../role-set-form.base';
import { roleSetReducer } from '../../role-set.reducer';
import { IAppState, InfRoleApi, InfRole, InfTemporalEntity, InfTemporalEntityApi, InfEntityProjectRel } from 'app/core';
import { RoleSetActions } from '../../role-set.actions';
import { teEntReducer } from '../../../data-unit/te-ent/te-ent.reducer';
import { TeEntDetail, RoleDetail } from 'app/core/models';
import { timer ,  Observable, combineLatest } from 'rxjs';
import { StateCreatorService, StateSettings } from '../../../shared/state-creator.service';
import { ClassService } from '../../../shared/class.service';


@AutoUnsubscribe()
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: roleSetReducer
})
@Component({
  selector: 'gv-te-ent-role-set-form',
  templateUrl: './te-ent-role-set-form.component.html',
  styleUrls: ['./te-ent-role-set-form.component.scss']
})
export class TeEntRoleSetFormComponent extends RoleSetFormBase {


  @Input() parentTeEntPath: string[];

  parentTeEntStore: ObservableStore<TeEntDetail>;

  constructor(
    protected ngRedux: NgRedux<IAppState>,
    protected ref: ChangeDetectorRef,
    protected fb: FormBuilder,
    protected actions: RoleSetActions,
    protected roleApi: InfRoleApi,
    protected stateCreator: StateCreatorService,
    protected classService: ClassService,
    private teEntApi: InfTemporalEntityApi

  ) {
    super(fb, ngRedux, ref, actions)

  }

  submit() {
    // (click)="createRoles()"
  }

  initRoleSetFormBaseChild(): void {
    this.parentTeEntStore = this.ngRedux.configureSubStore(this.parentTeEntPath, teEntReducer)

    this.loadAlternativeRoles()
  }


  loadAlternativeRoles() {

    const s = this.localStore.getState();
    const ps = this.parentTeEntStore.getState();

    const fkProperty = s.property.dfh_pk_property;
    const fkTemporalEntity = ps.teEnt.pk_entity;
    const fkProject = this.ngRedux.getState().activeProject.pk_project;

    const waitAtLeast = timer(800);
    const apiCall = this.roleApi.alternativesNotInProjectByTeEntPk(fkTemporalEntity, fkProperty, fkProject)

    this.subs.push(combineLatest([waitAtLeast, apiCall])
      .subscribe((results) => {

        const rolesInOtherProjects = results[1].filter(role => parseInt(role.is_in_project_count) > 0);
        const rolesInNoProject = results[1].filter(role => parseInt(role.is_in_project_count) == 0);

        const inOther$ = this.stateCreator.initializeRoleDetails(rolesInOtherProjects, { isOutgoing: s.isOutgoing })
        const inNo$ = this.stateCreator.initializeRoleDetails(rolesInNoProject, { isOutgoing: s.isOutgoing })

        combineLatest(inOther$, inNo$).subscribe(results => {
          const roleStatesInOtherProjects = results[0], roleStatesInNoProjects = results[1]

          this.localStore.dispatch(this.actions.alternativeRolesLoaded(
            roleStatesInOtherProjects,
            roleStatesInNoProjects
          ))


          if (rolesInOtherProjects.length === 0) {
            this.startCreateNewRole();
          } else {
            this.initAddFormCtrls(roleStatesInOtherProjects)
          }

        })
      }))

  }


  /**
  * Called when user clicks on create new or when loading alternative roles returned 0 alt. roles
  * Creates a new RoleDetail of the kind of property of this component
  * and pointing to the parent persistent item
  */
  startCreateNewRole() {

    const s = this.localStore.getState();
    const ps = this.parentTeEntStore.getState();

    const roleToCreate = {
      fk_property: s.property.dfh_pk_property,
      fk_temporal_entity: ps.teEnt.pk_entity,
    } as InfRole;

    const options: RoleDetail = { targetClassPk: s.targetClassPk, isOutgoing: s.isOutgoing }
    const settings: StateSettings = { isCreateMode: true }

    // initialize the state
    this.subs.push(this.stateCreator.initializeRoleDetail(roleToCreate, options, settings).subscribe(roleStateToCreate => {

      this.initCreateFormCtrls(roleStateToCreate)

    }))

  }


  createRoles() {
    const s = this.localStore.getState();

    if (this.createForm.valid) {

      // prepare teEnt 
      const t = new InfTemporalEntity(this.parentTeEntStore.getState().teEnt);
      t.te_roles = [];

      Object.keys(this.createForm.controls).forEach(key => {
        if (this.createForm.get(key)) {
          let role: InfRole = this.createForm.get(key).value;
          role.entity_version_project_rels = [{ is_in_project: true } as InfEntityProjectRel]
          // add roles to create to peIt
          t.te_roles.push(role)
        }
      })

      // call api
      this.subs.push(this.teEntApi.findOrCreateInfTemporalEntity(this.ngRedux.getState().activeProject.pk_project, t).subscribe(teEnts => {
        const roles: InfRole[] = teEnts[0].te_roles;


        // update the form group
        Object.keys(this.createForm.controls).forEach(key => {
          this.createForm.removeControl(key)
        })

        // update the state
        this.subs.push(this.stateCreator.initializeRoleDetails(roles, { isOutgoing: s.isOutgoing }).subscribe(roleStates => {
          this.localStore.dispatch(this.actions.rolesCreated(roleStates))
        }))

      }))
    }
  }

  addRoles() {
    const s = this.localStore.getState();

    if (this.addForm.valid) {

      // prepare teEnt 
      const p = new InfTemporalEntity(this.parentTeEntStore.getState().teEnt);
      p.te_roles = [];

      Object.keys(this.addForm.controls).forEach(key => {
        if (this.addForm.get(key)) {
          // add roles to create to teEnt
          p.te_roles.push(this.addForm.get(key).value)
        }
      })

      // call api
      this.subs.push(this.teEntApi.changeTeEntProjectRelation(this.ngRedux.getState().activeProject.pk_project, true, p).subscribe(teEnt => {
        const roles: InfRole[] = teEnt[0].te_roles;

        // update the form group
        Object.keys(this.addForm.controls).forEach(key => {
          this.addForm.removeControl(key)
        })


        // update the state
        this.subs.push(this.stateCreator.initializeRoleDetails(roles, { isOutgoing: s.isOutgoing }).subscribe(roleStates => {
          this.localStore.dispatch(this.actions.rolesCreated(roleStates))
        }))

      }))
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
