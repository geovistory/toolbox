import { NgRedux } from '@angular-redux/store';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output, ViewChild, Input } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { InfTemporalEntity, U, InfPersistentItemApi, InfPersistentItem } from 'app/core';

import { PeItFormBase } from '../pe-it-form.base';
import { PeItActions } from '../pe-it.actions';

@Component({
  selector: 'gv-pe-it-add-form',
  templateUrl: './pe-it-add-form.component.html',
  styleUrls: ['./pe-it-add-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeItAddFormComponent extends PeItFormBase {

  peIt: InfPersistentItem; // ngForm model

  @ViewChild('f') form: NgForm;

  @Input() addBtn:boolean;
  @Input() cancelBtn:boolean;

  @Output() formChange: EventEmitter<NgForm> = new EventEmitter();
  @Output() added: EventEmitter<InfPersistentItem> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formCtrlName = 'persistent_item';

  constructor(
    protected ngRedux: NgRedux<any>,
    protected actions: PeItActions,
    protected fb: FormBuilder,
    protected ref: ChangeDetectorRef,
    protected peItApi: InfPersistentItemApi

  ) {
    super(ngRedux, actions, fb)
    console.log('PeItAddFormComponent')

  }

  onInitPeItBaseChild(): void {

    this.subs.push(
      this.form.valueChanges.subscribe(val => {
        const displayAppeUse: InfTemporalEntity = U.getFirstAppeTeEntOfPeIt(val.peIt)
        this.labelInEdit = U.getDisplayAppeLabelOfTeEnt(displayAppeUse);

        this.formChange.emit(this.form)
        console.log('add form value', this.form.value)
        this.ref.detectChanges()

      })
    )



  }


  submit() {

    this.peItApi.changePeItProjectRelation(
      this.ngRedux.getState().activeProject.pk_project,
      true,
      this.form.value.peIt
    ).subscribe((resultingPeIt:InfPersistentItem) =>{
      this.added.emit(resultingPeIt)
    })

  }

  // not needed since not used as form control
  writeValue(obj: any): void { }

  initFormCtrls(): void { }

  onChange(controlValue: any): void {
    throw new Error("Method not implemented.");
  }
}
