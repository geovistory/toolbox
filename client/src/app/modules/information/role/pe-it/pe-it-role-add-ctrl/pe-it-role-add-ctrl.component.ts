import { NgRedux } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, forwardRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';

import { RoleDetail } from 'app/core/state/models';
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
    protected fb: FormBuilder,
    protected ref: ChangeDetectorRef
  ) {
    super(ngRedux, fb, ref)
    console.log('PeItRoleAddCtrlComponent')
    
  }
  
  initRoleAddCtrlBaseChild(): void {
  }

}
