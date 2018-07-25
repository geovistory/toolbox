import { NgRedux, WithSubStore } from '@angular-redux/store';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { InfTemporalEntity, U, UiContext } from 'app/core';

import { PeItFormBase } from '../pe-it-form.base';
import { PeItActions } from '../pe-it.actions';
import { peItReducer } from '../pe-it.reducer';
import { StateCreatorService } from '../../../shared/state-creator.service';

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

  @ViewChild('f') form: NgForm;

  @Input() createBtn:boolean;
  @Input() cancelBtn:boolean;
  @Output() formChange: EventEmitter<NgForm> = new EventEmitter();

  formCtrlName = 'persistent_item';

  uiContext: UiContext;

  constructor(
    protected ngRedux: NgRedux<any>,
    protected actions: PeItActions,
    protected fb: FormBuilder,
    protected stateCreator: StateCreatorService
  ) {
    super(ngRedux, actions, fb, stateCreator)

    this.subscribeFormChanges();

  }

  onInitPeItBaseChild(): void {

    this.subs.push(
      this.form.valueChanges.subscribe(val => {
        const displayAppeUse: InfTemporalEntity = U.getFirstAppeTeEntOfPeIt(val.peIt)
        this.labelInEdit = U.getDisplayAppeLabelOfTeEnt(displayAppeUse);
        this.formChange.emit(this.form)
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
