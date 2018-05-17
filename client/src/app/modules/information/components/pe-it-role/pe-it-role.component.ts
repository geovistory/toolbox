import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, ChangeDetectionStrategy, forwardRef } from '@angular/core';

import { RoleComponent } from '../role/role.component';
import { ActiveProjectService, EntityEditorService, InfRoleApi, InfTemporalEntity } from 'app/core';
import { EprService } from '../../shared/epr.service';
import { NgRedux, NgReduxModule, WithSubStore } from '@angular-redux/store';
import { RoleActions } from '../role/role.actions';
import { IRoleState } from '../role/role.model';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { TeEntState } from '../te-ent/te-ent.model';
import { Observable } from 'rxjs/Observable';
import { roleReducer } from '../role/role.reducers';
import { PeItRoleService } from '../../shared/pe-it-role.service';
import { StateCreatorService } from '../../shared/state-creator.service';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';

@AutoUnsubscribe()
@WithSubStore({
  localReducer: roleReducer,
  basePathMethodName: 'getBasePath'
})
@Component({
  selector: 'gv-pe-it-role',
  templateUrl: './pe-it-role.component.html',
  styleUrls: ['./pe-it-role.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PeItRoleComponent),
      multi: true
    }
  ]
})
export class PeItRoleComponent extends RoleComponent {

  constructor(
    activeProjectService: ActiveProjectService,
    eprService: EprService,
    ref: ChangeDetectorRef,
    entityEditor: EntityEditorService,
    roleApi: InfRoleApi,
    ngRedux: NgRedux<IRoleState>,
    actions: RoleActions,
    protected stateCreator: StateCreatorService,
    fb: FormBuilder
  ) {
    super(activeProjectService, eprService, ref, entityEditor, roleApi, ngRedux, actions, stateCreator, fb)
  }



}
