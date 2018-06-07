import { NgRedux } from '@angular-redux/store';
import { Component, forwardRef } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IAppState, InfEntityProjectRelApi, InfRoleApi } from 'app/core';

import { RoleDetail } from '../../../information.models';
import { RoleActions } from '../../../role/role.actions';
import { slideInOut } from '../../../shared/animations';
import { ClassService } from '../../../shared/class.service';
import { RoleSetService } from '../../../shared/role-set.service';
import { StateCreatorService } from '../../../shared/state-creator.service';
import { RoleSetAddCtrlBase } from '../../role-set-add-ctrl.base';
import { RoleSetActions } from '../../role-set.actions';

@Component({
  selector: 'gv-pe-it-role-set-add-ctrl',
  templateUrl: './pe-it-role-set-add-ctrl.component.html',
  styleUrls: ['./pe-it-role-set-add-ctrl.component.scss'],
  animations: [
    slideInOut
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PeItRoleSetAddCtrlComponent),
      multi: true
    }
  ]
})

export class PeItRoleSetAddCtrlComponent extends RoleSetAddCtrlBase {
  initRoleSetAddCtrlBaseChild(): void {
  }

  init(): void {
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
    protected fb: FormBuilder
  ) {
    super(eprApi, roleApi, ngRedux, actions, roleSetService, roleStore, roleActions, stateCreator, classService, fb)
  }


}
