import { NgRedux } from '@angular-redux/store';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { InfEntityProjectRel, InfRole } from 'app/core';
import { RoleBase } from '../../role.base';
import { RoleDetail } from '../../../information.models';


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
export class TeEntRoleAddCtrlComponent extends RoleBase {

  isStandard: boolean;
  isInProject: boolean;

  init(): void {
  }


  constructor(
    protected ngRedux: NgRedux<RoleDetail>,
    protected fb: FormBuilder,
    protected ref: ChangeDetectorRef
  ) {
    super(ngRedux, fb)

    this.initFormCtrls()
  }


  initFormCtrls() {

    this.formGroup.addControl('is_in_project', new FormControl())

  }


  subscribeFormChanges() {
    // subscribe to form control changes 
    this.subs.push(this.formGroup.valueChanges.subscribe(() => {
      this.emitVal();
    }))
  }

  emitVal() {
    // send the changes to the parent form
    if (this.formGroup.valid) {
   
      this.isInProject = this.formGroup.get('is_in_project').value;

      const role = new InfRole(this.roleState.role);

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


  /**
 * Allows Angular to update the model.
 * Update the model and changes needed for the view here.
 */
  writeValue(role: InfRole): void {

    if (
      role &&
      this.localStore.getState() &&
      this.localStore.getState().isCircular !== true
    ) {
      // add a control for the epr option "is_standard_in_project" (is_display_role_for_range)
      this.isStandard = role.entity_version_project_rels[0].is_standard_in_project
      this.isInProject = role.entity_version_project_rels[0].is_in_project;

      // get control for the epr option "is_in_project"
      const isInProjectCtrl = this.formGroup.get('is_in_project');

      // update its value
      isInProjectCtrl.setValue(this.isInProject)

      // if this is not standard, enable the is in project ctrl
      if (this.isStandard) isInProjectCtrl.disable()
      else isInProjectCtrl.enable();
    }

    this.ref.detectChanges()
  }


  makeStandard() {
    this.isStandard = true;

    this.formGroup.get('is_in_project').disable()

    this.emitVal();
  }


}
