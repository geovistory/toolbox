import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgRedux, WithSubStore } from '@angular-redux/store';
import { PeItActions } from '../pe-it.actions';
import { PeItFormBase } from '../pe-it-form.base';
import { peItReducer } from '../pe-it.reducer';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: peItReducer
})
@Component({
  selector: 'gv-pe-it-create-form',
  templateUrl: './pe-it-create-form.component.html',
  styleUrls: ['./pe-it-create-form.component.scss']
})
export class PeItCreateFormComponent extends PeItFormBase {



  formCtrlName = 'persistent_item';

  constructor(
    protected ngRedux: NgRedux<any>,
    protected actions: PeItActions,
    protected fb: FormBuilder

  ) {
    super(ngRedux, actions, fb)
  }

  onInitPeItBaseChild(): void {

    // we call those functions here, since the Form won't be used as form control
    // and thus Base Class will not call this onRegisterChange
    this.initFormCtrls();
    this.subscribeFormChanges();

  }

  // not needed since not used as form control
  writeValue(obj: any): void { }

  subscribeFormChanges(): void {
    this.subs.push(this.formGroup.valueChanges.subscribe(val => {
      var x = val;
    }))

  }

  initFormCtrls(): void {

    this.subs.push(this.peIt$.subscribe(peIt => {
      this.formGroup.addControl(this.formCtrlName, new FormControl(
        peIt,
        [
          Validators.required
        ]
      ))

    }))

    this.subs.push(this.dfhClass$.subscribe(c => {
      var x = c
    }))

  }
  onChange(controlValue: any): void {
    throw new Error("Method not implemented.");
  }
}
