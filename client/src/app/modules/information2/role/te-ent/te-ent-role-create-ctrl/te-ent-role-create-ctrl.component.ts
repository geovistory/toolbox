import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormBuilder } from '@angular/forms';
import { RoleBase } from '../../role.base';
import { NgRedux } from '@angular-redux/store';
import { RoleDetail } from '../../../information.models';

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

  constructor(
    protected ngRedux: NgRedux<RoleDetail>,
    protected fb: FormBuilder
  ) {
    super(ngRedux, fb)
  }

}
