import { Component, OnInit } from '@angular/core';
import { RoleSetBase } from '../../role-set.base';
import { InfEntityProjectRelApi, InfRoleApi, IAppState, InfTemporalEntityApi } from 'app/core';
import { NgRedux } from '@angular-redux/store';
import { RoleSetActions } from '../../role-set.actions';
import { RoleSetService } from '../../../shared/role-set.service';
import { RoleDetail } from 'app/core/state/models';
import { RoleActions } from '../../../role/role.actions';
import { ClassService } from '../../../shared/class.service';
import { FormBuilder } from '@angular/forms';
import { RoleSetApiEpics } from '../../role-set.epics';
import { RootEpics } from 'app/core/store/epics';

@Component({
  selector: 'gv-ex-time-role-set-editable',
  templateUrl: './ex-time-role-set-editable.component.html',
  styleUrls: ['./ex-time-role-set-editable.component.scss']
})
export class ExTimeRoleSetEditableComponent extends RoleSetBase {


  constructor(
    protected rootEpics: RootEpics,
    protected epics: RoleSetApiEpics,
    protected eprApi: InfEntityProjectRelApi,
    protected roleApi: InfRoleApi,
    public ngRedux: NgRedux<IAppState>,
    protected actions: RoleSetActions,
    protected roleSetService: RoleSetService,
    protected roleStore: NgRedux<RoleDetail>,
    protected roleActions: RoleActions,
    protected classService: ClassService,
    protected fb: FormBuilder,
    protected teEntApi: InfTemporalEntityApi
  ) {
    super(rootEpics, epics, eprApi, roleApi, ngRedux, actions, roleSetService, roleStore, roleActions, classService, fb)
  }

  init(): void {

  }
}
