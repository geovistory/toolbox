import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { slideInOut } from '../../../shared/animations';
import { NG_VALUE_ACCESSOR, FormBuilder } from '@angular/forms';
import { RoleSetBase } from '../../role-set.base';
import { InfEntityProjectRelApi, InfRoleApi } from 'app/core';
import { RoleSet, RoleDetail } from '../../../information.models';
import { NgRedux } from '@angular-redux/store';
import { RoleSetActions } from '../../role-set.actions';
import { RoleSetService } from '../../../shared/role-set.service';
import { RoleActions } from '../../../role/role.actions';
import { StateCreatorService } from '../../../shared/state-creator.service';
import { ClassService } from '../../../shared/class.service';
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
    protected ngRedux: NgRedux<RoleSet>,
    protected actions: RoleSetActions,
    protected roleSetService: RoleSetService,
    protected roleStore: NgRedux<RoleDetail>,
    protected roleActions: RoleActions,
    protected stateCreator: StateCreatorService,
    protected classService: ClassService,
    protected fb: FormBuilder
  ) {
    super(eprApi, roleApi, ngRedux, actions, roleSetService, roleStore, roleActions, stateCreator, classService, fb)
  }


}
