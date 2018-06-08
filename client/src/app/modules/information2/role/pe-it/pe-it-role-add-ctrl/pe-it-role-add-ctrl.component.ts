import { NgRedux } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';

import { RoleDetail } from '../../../information.models';
import { RoleAddCtrlBase } from '../../role-add-ctrl.base';

@Component({
  selector: 'gv-pe-it-role-add-ctrl',
  templateUrl: './pe-it-role-add-ctrl.component.html',
  styleUrls: ['./pe-it-role-add-ctrl.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
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
