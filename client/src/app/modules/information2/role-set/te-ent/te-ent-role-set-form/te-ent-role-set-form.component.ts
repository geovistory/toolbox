import { WithSubStore } from '@angular-redux/store';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { RoleSetFormBase } from '../../role-set-form.base';
import { roleSetReducer } from '../../role-set.reducer';


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

  constructor(protected fb: FormBuilder) {
    super(fb)

  }

  submit() {
    // (click)="createRoles()"
  }

}
