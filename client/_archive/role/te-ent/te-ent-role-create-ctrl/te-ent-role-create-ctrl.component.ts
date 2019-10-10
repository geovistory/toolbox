import { NgRedux } from '@angular-redux/store';
import { Component, forwardRef } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';

import { RoleDetail } from 'app/core/state/models';
import { RoleBase } from '../../role.base';

@Component({
  selector: 'gv-te-ent-role-create-ctrl',
  templateUrl: './te-ent-role-create-ctrl.component.html',
  styleUrls: ['./te-ent-role-create-ctrl.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeEntRoleCreateCtrlComponent),
      multi: true
    }
  ]
})
export class TeEntRoleCreateCtrlComponent extends RoleBase {

  init(): void {

  }
  constructor(
    protected ngRedux: NgRedux<RoleDetail>,
    protected fb: FormBuilder
  ) {
    super(ngRedux, fb)
  }

}
