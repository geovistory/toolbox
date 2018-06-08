import { NgRedux } from '@angular-redux/store';
import { Component, ViewChild, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { InfPersistentItem, InfTemporalEntity, U } from 'app/core';

import { PeItFormBase } from '../pe-it-form.base';
import { PeItActions } from '../pe-it.actions';

@Component({
  selector: 'gv-pe-it-add-form',
  templateUrl: './pe-it-add-form.component.html',
  styleUrls: ['./pe-it-add-form.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PeItAddFormComponent extends PeItFormBase {

  peIt: InfPersistentItem;

  @ViewChild('f') form: NgForm;

  @Output() formChange: EventEmitter<NgForm> = new EventEmitter();

  formCtrlName = 'persistent_item';

  constructor(
    protected ngRedux: NgRedux<any>,
    protected actions: PeItActions,
    protected fb: FormBuilder,
    protected ref: ChangeDetectorRef

  ) {
    super(ngRedux, actions, fb)


  }

  onInitPeItBaseChild(): void {

    this.subs.push(
      this.form.valueChanges.subscribe(val => {
        const displayAppeUse: InfTemporalEntity = U.getFirstAppeTeEntOfPeIt(val.peIt)
        this.labelInEdit = U.getDisplayAppeLabelOfTeEnt(displayAppeUse);

        this.formChange.emit(this.form)

        // this.ref.detectChanges()

      })
    )



  }


  submit() {
    console.log(this.form.value)
  }

  // not needed since not used as form control
  writeValue(obj: any): void { }

  initFormCtrls(): void { }

  onChange(controlValue: any): void {
    throw new Error("Method not implemented.");
  }
}
