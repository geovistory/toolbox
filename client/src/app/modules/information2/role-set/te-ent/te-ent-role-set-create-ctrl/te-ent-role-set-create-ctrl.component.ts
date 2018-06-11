import { NgRedux } from '@angular-redux/store';
import { Component, forwardRef } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, FormControl, Validators } from '@angular/forms';
import { IAppState, InfEntityProjectRelApi, InfRoleApi, InfTemporalEntityApi, InfRole } from 'app/core';

import { RoleDetail, RoleDetailList } from '../../../information.models';
import { RoleActions } from '../../../role/role.actions';
import { slideInOut } from '../../../shared/animations';
import { ClassService } from '../../../shared/class.service';
import { RoleSetService } from '../../../shared/role-set.service';
import { StateCreatorService, StateSettings } from '../../../shared/state-creator.service';
import { RoleSetActions } from '../../role-set.actions';
import { TeEntRoleSetBase } from '../te-ent-role-set.base';

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
export class TeEntRoleSetCreateCtrlComponent extends TeEntRoleSetBase {


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
    teEntApi: InfTemporalEntityApi

  ) {
    super(eprApi, roleApi, ngRedux, actions, roleSetService, roleStore, roleActions, stateCreator, classService, fb, teEntApi)
  }

  startCreateRole() {
    const roleToCreate = new InfRole();
    roleToCreate.fk_property = this.roleSetState.property.dfh_pk_property;
    roleToCreate.fk_temporal_entity = this.parentTeEntState.teEnt.pk_entity;

    this.subs.push(this.classService.getByPk(this.roleSetState.targetClassPk).subscribe(targetDfhClass => {
      const options: RoleDetail = {
        targetDfhClass,
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
    }))
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
