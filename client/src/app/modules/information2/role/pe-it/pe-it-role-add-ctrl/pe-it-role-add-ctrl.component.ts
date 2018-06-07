import { NgRedux } from '@angular-redux/store';
import { Component, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { InfEntityProjectRel, InfRole } from 'app/core';

import { RoleDetail } from '../../../information.models';
import { RoleAddCtrlBase } from '../../role-add-ctrl.base';

@Component({
  selector: 'gv-pe-it-role-add-ctrl',
  templateUrl: './pe-it-role-add-ctrl.component.html',
  styleUrls: ['./pe-it-role-add-ctrl.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PeItRoleAddCtrlComponent),
      multi: true
    }
  ]
})
export class PeItRoleAddCtrlComponent extends RoleAddCtrlBase {

  constructor(
    protected ngRedux: NgRedux<RoleDetail>,
    protected fb: FormBuilder
  ) {
    super(ngRedux, fb)
  }


}
