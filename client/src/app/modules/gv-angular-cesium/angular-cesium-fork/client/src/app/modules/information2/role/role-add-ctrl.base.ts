import { NgRedux } from '@angular-redux/store';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { InfEntityProjectRel, InfRole } from 'app/core';

import { RoleDetail } from '../information.models';
import { RoleBase } from './role.base';
import { ChangeDetectorRef } from '@angular/core';

export abstract class RoleAddCtrlBase extends RoleBase {

  isStandard: boolean;
  isInProject: boolean;
  role: InfRole;

  init(): void {
    this.initRoleAddCtrlBaseChild()
  }

  abstract initRoleAddCtrlBaseChild(): void;

  constructor(
    protected ngRedux: NgRedux<RoleDetail>,
    protected fb: FormBuilder,
    protected ref: ChangeDetectorRef
  ) {
    super(ngRedux, fb)

    this.formControlName = 'role_ctrl';

    this.initForm();


  }

  initForm() {
    this.formGroup = this.fb.group({
      [this.formControlName]: new FormControl(this.role, [Validators.required]),
      'is_in_project': new FormControl()
    });
  }


  initFormCtrlValues() {

    this.formGroup.get(this.formControlName).setValue(this.role)

    // this.formGroup.get('is_in_project').setValue(this.isInProject)
    // get control for the epr option "is_in_project"
    const isInProjectCtrl = this.formGroup.get('is_in_project');

    // update its value
    isInProjectCtrl.setValue(this.isInProject)

    // // if this is not standard, enable the is in project ctrl
    // if (this.isStandard) isInProjectCtrl.disable()
    // else isInProjectCtrl.enable();

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

      const role = new InfRole(this.formGroup.get(this.formControlName).value);


      // create the epr unless it is a circular role
      if (this.localStore.getState().isCircular !== true) {
        role.entity_version_project_rels = [{
          is_in_project: this.isInProject,
          is_standard_in_project: this.isStandard
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
    this.role = role;

    if (
      role && role.entity_version_project_rels && role.entity_version_project_rels[0] &&
      this.localStore.getState() &&
      this.localStore.getState().isCircular !== true
    ) {
      // add a control for the epr option "is_standard_in_project" (is_display_role_for_range)
      this.isStandard = role.entity_version_project_rels[0].is_standard_in_project
      this.isInProject = role.entity_version_project_rels[0].is_in_project;
    }

    // this.formGroup.get(this.formControlName).setValue(role)
    // the model is taken from the state on init
    this.initFormCtrlValues()

    this.ref.detectChanges()
  }

  /**
   * Allows Angular to register a function to call when the model changes.
   * Save the function as a property to call later here.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;

    this.subscribeFormChanges();


  }

  makeStandard() {
    this.isStandard = true;

    // this.formGroup.get('is_in_project').disable()

    this.emitVal();
  }




}
