import { Component, OnInit, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { RoleBase } from '../../role.base';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RoleDetail } from 'app/core/models';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'gv-pe-it-role-create-ctrl',
  templateUrl: './pe-it-role-create-ctrl.component.html',
  styleUrls: ['./pe-it-role-create-ctrl.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PeItRoleCreateCtrlComponent),
      multi: true
    }
  ]
})
export class PeItRoleCreateCtrlComponent extends RoleBase {

  init(): void {

  }

  constructor(
    protected ngRedux: NgRedux<RoleDetail>,
    protected fb: FormBuilder
  ) {
    super(ngRedux, fb)
  }

}
