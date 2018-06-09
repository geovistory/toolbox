
import { NgRedux } from '@angular-redux/store';
import { Component, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IAppState, InfEntityProjectRelApi, InfRoleApi, InfTemporalEntityApi } from 'app/core';

import { RoleDetail } from '../../../information.models';
import { RoleActions } from '../../../role/role.actions';
import { slideInOut } from '../../../shared/animations';
import { ClassService } from '../../../shared/class.service';
import { RoleSetService } from '../../../shared/role-set.service';
import { StateCreatorService } from '../../../shared/state-creator.service';
import { RoleSetActions } from '../../role-set.actions';
import { TeEntRoleSetBase } from '../te-ent-role-set.base';

@Component({
  selector: 'gv-te-ent-role-set-add-ctrl',
  templateUrl: './te-ent-role-set-add-ctrl.component.html',
  styleUrls: ['./te-ent-role-set-add-ctrl.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    slideInOut
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeEntRoleSetAddCtrlComponent),
      multi: true
    }
  ]
})
export class TeEntRoleSetAddCtrlComponent extends TeEntRoleSetBase {


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
    console.log('TeEntRoleSetAddCtrlComponent')
  }


}