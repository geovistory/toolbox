import { NgRedux } from '@angular-redux/store';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { InfEntityProjectRel, InfRole } from 'app/core';

import { RoleDetail } from '../information.models';
import { RoleBase } from './role.base';

export class RoleAddCtrlBase extends RoleBase {

  isStandard: boolean;
  isInProject: boolean;

  init(): void {
  }

  constructor(
    protected ngRedux: NgRedux<RoleDetail>,
    protected fb: FormBuilder
  ) {
    super(ngRedux, fb)

    this.formControlName = 'role_ctrl';
    this.initFormCtrls()
  }


  initFormCtrls() {

    this.formGroup.addControl(this.formControlName, new FormControl(null, [Validators.required]))

    this.formGroup.addControl('is_in_project', new FormControl())


  }


  subscribeFormChanges() {
    // subscribe to form control changes 
    this.subs.push(this.formGroup.valueChanges.subscribe(() => {
      this.isInProject = this.formGroup.get('is_in_project').value;
      this.emitVal();
    }))
  }

  emitVal() {
    // send the changes to the parent form
    if (this.formGroup.valid) {
      const role: InfRole = this.formGroup.get(this.formControlName).value;

      // create the epr
      role.entity_version_project_rels = [{
        is_in_project: this.isInProject,
        is_standard_in_project: this.isStandard
      } as InfEntityProjectRel];

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

    this.formGroup.get(this.formControlName).setValue(role)

  }


  makeStandard() {
    this.isStandard = true;

    this.formGroup.get('is_in_project').disable()

    this.emitVal();
  }


}
