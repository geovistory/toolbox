import { NgRedux } from '@angular-redux/store';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { InfEntityProjectRel, InfRole } from 'app/core';
import { RoleBase } from '../../role.base';
import { RoleDetail } from 'app/core/state/models';
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

  isStandard: boolean;
  isInProject: boolean;

  init(): void {
  }


  constructor(
    protected ngRedux: NgRedux<RoleDetail>,
    protected fb: FormBuilder,
    protected ref: ChangeDetectorRef
  ) {
    super(ngRedux, fb, ref)

  }

  initForm() {
    this.formGroup = this.fb.group({
      'is_in_project': new FormControl()
    });
  }

  initFormCtrlValues() {
    this.formGroup.get('is_in_project').setValue(this.isInProject)
  }

  emitVal() {
    // send the changes to the parent form
    if (this.formGroup.valid) {
   
      this.isInProject = this.formGroup.get('is_in_project').value;

      const role = new InfRole(this.role);

      // create the epr unless it is a circular role
      if (this.localStore.getState().isCircular !== true) {
        role.entity_version_project_rels = [{
          is_in_project: this.isInProject,
          is_standard_in_project: this.isStandard,
          calendar: role.community_favorite_calendar
        } as InfEntityProjectRel];
      }

      this.onChange(role);
    }
    else {
      this.onChange(null)
    }

  }


  initRoleAddCtrlBaseChild(): void {
  }


}
