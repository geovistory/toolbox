import { Component, OnInit, forwardRef } from '@angular/core';
import { RoleSetBase } from '../../role-set.base';
import { InfEntityProjectRelApi, InfRoleApi, IAppState } from 'app/core';
import { NgRedux } from '@angular-redux/store';
import { RoleSetActions } from '../../role-set.actions';
import { RoleSetService } from '../../../shared/role-set.service';
import { RoleActions } from '../../../role/role.actions';
import { StateCreatorService } from '../../../shared/state-creator.service';
import { ClassService } from '../../../shared/class.service';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RoleSet, RoleDetail } from '../../../information.models';
import { slideInOut } from '../../../shared/animations';
import { RoleSetApiEpics } from '../../role-set.epics';

@Component({
  selector: 'gv-pe-it-role-set-create-ctrl',
  templateUrl: './pe-it-role-set-create-ctrl.component.html',
  styleUrls: ['./pe-it-role-set-create-ctrl.component.scss'],
  animations: [
    slideInOut
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PeItRoleSetCreateCtrlComponent),
      multi: true
    }
  ]
})
export class PeItRoleSetCreateCtrlComponent extends RoleSetBase  {

  init(): void {
  }

  constructor(
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
    protected fb: FormBuilder
  ) {
    super(epics, eprApi, roleApi, ngRedux, actions, roleSetService, roleStore, roleActions, stateCreator, classService, fb)
  }


}
