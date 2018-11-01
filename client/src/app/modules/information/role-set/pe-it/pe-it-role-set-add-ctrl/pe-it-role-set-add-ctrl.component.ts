import { NgRedux } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IAppState, InfEntityProjectRelApi, InfRoleApi } from 'app/core';
import { RoleDetail } from 'app/core/state/models';
import { RootEpics } from '../../../../../core/store/epics';
import { RoleActions } from '../../../role/role.actions';
import { slideInOut } from '../../../shared/animations';
import { ClassService } from '../../../shared/class.service';
import { RoleSetService } from '../../../shared/role-set.service';
import { PropertyFieldAddCtrlBase } from '../../role-set-add-ctrl.base';
import { PropertyFieldActions } from '../../role-set.actions';
import { PropertyFieldApiEpics } from '../../role-set.epics';


@Component({
  selector: 'gv-pe-it-role-set-add-ctrl',
  templateUrl: './pe-it-role-set-add-ctrl.component.html',
  styleUrls: ['./pe-it-role-set-add-ctrl.component.scss'],
  animations: [
    slideInOut
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PeItPropertyFieldAddCtrlComponent),
      multi: true
    }
  ]
})

export class PeItPropertyFieldAddCtrlComponent extends PropertyFieldAddCtrlBase {
  initRoleSetAddCtrlBaseChild(): void {
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
    console.log('PeItRoleSetAddCtrlComponent')
  }


}
