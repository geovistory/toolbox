import { NgRedux } from '@angular-redux/store';
import { Component, forwardRef } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IAppState, InfEntityProjectRelApi, InfRoleApi } from 'app/core';
import { RoleDetail } from 'app/core/state/models';
import { RootEpics } from 'app/core/store/epics';
import { RoleActions } from '../../../role/role.actions';
import { slideInOut } from '../../../shared/animations';
import { ClassService } from '../../../shared/class.service';
import { RoleSetService } from '../../../shared/role-set.service';
import { PropertyFieldActions } from '../../role-set.actions';
import { PropertyFieldBase } from '../../role-set.base';
import { PropertyFieldApiEpics } from '../../role-set.epics';

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
      useExisting: forwardRef(() => PeItPropertyFieldCreateCtrlComponent),
      multi: true
    }
  ]
})
export class PeItPropertyFieldCreateCtrlComponent extends PropertyFieldBase  {

  init(): void {
  }

  constructor(
    protected rootEpics: RootEpics,
    protected epics: PropertyFieldApiEpics,
    protected eprApi: InfEntityProjectRelApi,
    protected roleApi: InfRoleApi,
    public ngRedux: NgRedux<IAppState>,
    protected actions: PropertyFieldActions,
    protected roleSetService: RoleSetService,
    protected roleStore: NgRedux<RoleDetail>,
    protected roleActions: RoleActions,
    protected classService: ClassService,
    protected fb: FormBuilder
  ) {
    super(rootEpics, epics, eprApi, roleApi, ngRedux, actions, roleSetService, roleStore, roleActions, classService, fb)
  }


}
