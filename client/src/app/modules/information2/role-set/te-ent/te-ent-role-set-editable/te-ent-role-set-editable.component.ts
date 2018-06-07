import { NgRedux } from '@angular-redux/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IAppState, InfEntityProjectRelApi, InfRole, InfRoleApi, InfTemporalEntity, InfTemporalEntityApi } from 'app/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';

import { RoleDetail, RoleDetailList } from '../../../information.models';
import { RoleActions } from '../../../role/role.actions';
import { ClassService } from '../../../shared/class.service';
import { RoleSetService } from '../../../shared/role-set.service';
import { StateCreatorService } from '../../../shared/state-creator.service';
import { RoleSetActions } from '../../role-set.actions';
import { TeEntRoleSetBase } from '../te-ent-role-set.base';
import { slideInOut } from '../../../shared/animations';

@AutoUnsubscribe()
@Component({
  selector: 'gv-te-ent-role-set-editable',
  templateUrl: './te-ent-role-set-editable.component.html',
  styleUrls: ['./te-ent-role-set-editable.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TeEntRoleSetEditableComponent extends TeEntRoleSetBase {


  initTeEntRoleSetChild(): void {
  }

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
    private teEntApi: InfTemporalEntityApi
  ) {
    super(eprApi, roleApi, ngRedux, actions, roleSetService, roleStore, roleActions, stateCreator, classService, fb)
  }



    /**
    * Called when user click on Add a [*]
    * 
    * Searches alternative roles.
    * If no alternative roles used by at least one project found, continue creating new role directly.
    */
   startAddingRole() {


    this.localStore.dispatch(this.actions.startAddingRole())


    const fkProperty = this.roleSet.property.dfh_pk_property;
    const fkTemporalEntity = this.parentTeEntState.teEnt.pk_entity;
    const fkProject = this.ngRedux.getState().activeProject.pk_project;

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

            const inOther$ = this.stateCreator.initializeRoleDetails(rolesInOtherProjects, this.roleSet.isOutgoing)
            const inNo$ = this.stateCreator.initializeRoleDetails(rolesInNoProject, this.roleSet.isOutgoing)

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


/**
* Called when user clicks on create new
* Creates a new RoleDetailList of the kind of property of this component
* and pointing to the parent persistent item
*/


startCreateNewRole() {

    const roleToCreate = new InfRole();
    roleToCreate.fk_property = this.roleSet.property.dfh_pk_property;
    roleToCreate.fk_temporal_entity = this.parentTeEntState.teEnt.pk_entity;

    this.subs.push(this.classService.getByPk(this.roleSet.targetClassPk).subscribe(targetDfhClass => {
        const options: RoleDetail = { targetDfhClass }

        this.stateCreator.initializeRoleDetail(roleToCreate, this.roleSet.isOutgoing, options).subscribe(roleStateToCreate => {

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

            this.subs.push(this.stateCreator.initializeRoleDetails(roles, this.roleSet.isOutgoing).subscribe(roleStates => {
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
      const roleset = this.roleSet._role_list[key];

      this.subs.push(this.stateCreator.initializeRoleDetail(roleset.role,  roleset.isOutgoing).subscribe(roleState => {
          this.localStore.dispatch(this.actions.startEditingRole(key, roleState))
      }))
  }

  /**
 * Start editing a RoleDetail
 * @param key: the key of the RoleDetail in the store 
 */
  stopEditing(key) {
      const roleset = this.roleSet._role_list[key];
      this.subs.push(this.stateCreator.initializeRoleDetail(roleset.role, roleset.isOutgoing).subscribe(roleState => {
          this.localStore.dispatch(this.actions.stopEditingRole(key, roleState))
      }))
  }

  startUpdatingRole(key, role: InfRole) {

      console.error('implement the following lines')
      // const oldRole = StateToDataService.roleStateToRoleToRelate(this.roleSet._role_list[key]);

      // // call api
      // this.subs.push(Observable.combineLatest(
      //     this.roleApi.changeRoleProjectRelation(this.project.pk_project, false, oldRole),
      //     this.roleApi.findOrCreateInfRole(this.project.pk_project, role)
      // ).subscribe(result => {
      //     const newRoles = result[1];

      //     this.subs.push(this.stateCreator.initializeRoleDetails(newRoles,  this.roleSet.isOutgoing).subscribe(roleStates => {
      //         // update the state
      //         this.localStore.dispatch(this.actions.updateRole(key, roleStates))
      //     }))
      // }))

  }
}
