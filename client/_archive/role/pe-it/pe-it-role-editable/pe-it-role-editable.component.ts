import { Component, OnInit } from '@angular/core';
import { NgRedux, WithSubStore } from '@angular-redux/store';
import { RoleDetail } from 'app/core/state/models';
import { FormBuilder } from '@angular/forms';
import { RoleBase } from '../../role.base';
import { roleReducer } from '../../role.reducers';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: roleReducer
})
@Component({
  selector: 'gv-pe-it-role-editable',
  templateUrl: './pe-it-role-editable.component.html',
  styleUrls: ['./pe-it-role-editable.component.scss']
})
export class PeItRoleEditableComponent extends RoleBase {

  init(): void {

  }

  constructor(
    protected ngRedux: NgRedux<RoleDetail>,
    protected fb: FormBuilder
  ) {
    super(ngRedux, fb)
  }

}
