import { NgRedux } from '@angular-redux/store';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { InfPersistentItem, InfTemporalEntity, U } from 'app/core';

import { PeItFormBase } from '../pe-it-form.base';
import { PeItActions } from '../pe-it.actions';

@Component({
  selector: 'gv-pe-it-add-form',
  templateUrl: './pe-it-add-form.component.html',
  styleUrls: ['./pe-it-add-form.component.scss']
})
export class PeItAddFormComponent extends PeItFormBase {

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
