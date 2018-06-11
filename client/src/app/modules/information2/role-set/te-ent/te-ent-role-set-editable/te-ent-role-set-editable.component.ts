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
    teEntApi: InfTemporalEntityApi
  ) {
    super(eprApi, roleApi, ngRedux, actions, roleSetService, roleStore, roleActions, stateCreator, classService, fb, teEntApi)
  }

  /**
  * Called when user click on Add a [*]
  * 
  * Searches alternative roles.
  * If no alternative roles used by at least one project found, continue creating new role directly.
  */
  startAddingRole() {


    this.localStore.dispatch(this.actions.startAddingRole())


  }

}
