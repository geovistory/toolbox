import { NgRedux } from '@angular-redux/store';
import { Component, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';

import { RoleDetail } from '../../../information.models';
import { RoleAddCtrlBase } from '../../role-add-ctrl.base';


@Component({
  selector: 'gv-te-ent-role-add-ctrl',
  templateUrl: './te-ent-role-add-ctrl.component.html',
  styleUrls: ['./te-ent-role-add-ctrl.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeEntRoleAddCtrlComponent),
      multi: true
    }
  ]
})
export class TeEntRoleAddCtrlComponent extends RoleAddCtrlBase {

  initRoleAddCtrlBaseChild(): void {
  }


  constructor(
    protected ngRedux: NgRedux<RoleDetail>,
    protected fb: FormBuilder,
    protected ref: ChangeDetectorRef
  ) {
    super(ngRedux, fb, ref)
    console.log('TeEntRoleAddCtrlComponent')
  }

}
