import { WithSubStore, NgRedux } from '@angular-redux/store';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { RoleSetFormBase } from '../../role-set-form.base';
import { roleSetReducer } from '../../role-set.reducer';
import { IAppState } from 'app/core';


@AutoUnsubscribe()
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: roleSetReducer
})
@Component({
  selector: 'gv-te-ent-role-set-form',
  templateUrl: './te-ent-role-set-form.component.html',
  styleUrls: ['./te-ent-role-set-form.component.scss']
})
export class TeEntRoleSetFormComponent  extends RoleSetFormBase {
  initRoleSetFormBaseChild(): void {
    throw new Error("Method not implemented.");
  }

  constructor(
    protected ngRedux: NgRedux<IAppState>,
    protected ref: ChangeDetectorRef,
    protected fb: FormBuilder) {
    super(fb,ngRedux,ref)

  }

  submit() {
    // (click)="createRoles()"
  }

}
