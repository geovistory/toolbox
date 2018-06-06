import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, NgForm } from '@angular/forms';
import { NgRedux, WithSubStore } from '@angular-redux/store';
import { PeItActions } from '../pe-it.actions';
import { PeItFormBase } from '../pe-it-form.base';
import { peItReducer } from '../pe-it.reducer';
import { InfPersistentItem, U, InfTemporalEntity } from 'app/core';

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

  peIt: InfPersistentItem;

  @ViewChild('f') form: NgForm;

  formCtrlName = 'persistent_item';

  constructor(
    protected ngRedux: NgRedux<any>,
    protected actions: PeItActions,
    protected fb: FormBuilder

  ) {
    super(ngRedux, actions, fb)

    this.subscribeFormChanges();

  }

  onInitPeItBaseChild(): void {

    this.subs.push(
      this.form.valueChanges.subscribe(val => {
        const displayAppeUse: InfTemporalEntity = U.getFirstAppeTeEntOfPeIt(val.peIt)
        this.labelInEdit = U.getDisplayAppeLabelOfTeEnt(displayAppeUse);
      })
    )

  }


  submit(){
    console.log(this.form.value)
  }

  // not needed since not used as form control
  writeValue(obj: any): void { }

  subscribeFormChanges(): void { }

  initFormCtrls(): void { }

  onChange(controlValue: any): void {
    throw new Error("Method not implemented.");
  }
}
