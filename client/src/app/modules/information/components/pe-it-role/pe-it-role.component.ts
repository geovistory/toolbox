import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

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

@AutoUnsubscribe()
@WithSubStore({
  localReducer: roleReducer,
  basePathMethodName: 'getBasePath'
})
@Component({
  selector: 'gv-pe-it-role',
  templateUrl: './pe-it-role.component.html',
  styleUrls: ['./pe-it-role.component.scss']
})
export class PeItRoleComponent extends RoleComponent implements OnInit {

  constructor(
    activeProjectService: ActiveProjectService,
    eprService: EprService,
    ref: ChangeDetectorRef,
    entityEditor: EntityEditorService,
    roleApi: InfRoleApi,
    ngRedux: NgRedux<IRoleState>,
    actions: RoleActions
  ) {
    super(activeProjectService, eprService, ref, entityEditor, roleApi, ngRedux, actions)
  }


  initChildren() {
    Observable.zip(
      this.role$,
      this.state$
    ).subscribe(result => {
      if (result["0"] && result["1"]) {
        const childTeEnt = new TeEntState({
          teEnt: new InfTemporalEntity(result["0"].temporal_entity),
          state: result["1"],
          toggle: 'collapsed',
          selectPropState: 'init'
        })
        this.localStore.dispatch(this.actions.childTeEntInitialized(childTeEnt))
      }
    })
  }
}
