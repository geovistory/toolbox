import { Component, OnInit, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { WithSubStore, NgRedux } from '@angular-redux/store';
import { PeItActions } from '../pe-it.actions';
import { InfPersistentItem, InfTemporalEntity, U, InfEntityProjectRel } from 'app/core';
import { PeItCtrlBase } from '../pe-it-ctrl.base';

@Component({
  selector: 'gv-pe-it-add-ctrl',
  templateUrl: './pe-it-add-ctrl.component.html',
  styleUrls: ['./pe-it-add-ctrl.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PeItAddCtrlComponent),
      multi: true
    }
  ]
})
export class PeItAddCtrlComponent extends PeItCtrlBase {

  ctrlsInitialized = false;

  // the data model of this control
  peIt: InfPersistentItem;

  constructor(
    protected ngRedux: NgRedux<any>,
    protected actions: PeItActions,
    protected fb: FormBuilder,
    protected ref: ChangeDetectorRef
  ) {
    super(ngRedux, actions, fb)
    console.log('PeItAddCtrlComponent')

  }

  onInitPeItBaseChild(): void {
    this.initFormCtrls()
  }


  initFormCtrls(): void {
    if (this.localStore.getState()) {

      // add controls for each roleSet of _roleSet_list
      const roleSetList = this.localStore.getState()._roleSet_list;

      // this.subs.push(this._roleSet_list$.subscribe(roleSetList => {
      if (roleSetList)
        Object.keys(roleSetList).forEach((key) => {
          if (roleSetList[key]) {

            this.formGroup.addControl(key, new FormControl(null, [Validators.required]))
          }

        })

      this.ctrlsInitialized = true;
    }

  }



  subscribeFormChanges(): void {

    this.subs.push(this.formGroup.valueChanges.subscribe(val => {

      // build a peIt with all pi_roles given by the form's controls 
      let peIt = new InfPersistentItem(this.peItState.peIt);

      peIt.pi_roles = [];
      Object.keys(this.formGroup.controls).forEach(key => {
        if (this.formGroup.get(key)) {
          const val = this.formGroup.get(key).value;
          if (val)
            peIt.pi_roles = [...peIt.pi_roles, ...val]

        }
      })


      // create the epr
      peIt.entity_version_project_rels = [{
        is_in_project: true,
      } as InfEntityProjectRel];


      // try to retrieve a appellation label
      const displayAppeUse: InfTemporalEntity = U.getDisplayAppeLabelOfPeIt(peIt)
      this.labelInEdit = U.getDisplayAppeLabelOfTeEnt(displayAppeUse);
      this.ref.detectChanges()

      if (this.formGroup.valid) {
        // send the peIt the parent form
        this.onChange(peIt)
      }
      else {
        this.onChange(null)
      }
    }))

  }


  initFormCtrlValues() {
    if (this.localStore.getState()) {

      // add values to controls for each roleSet of _roleSet_list
      const roleSetList = this.localStore.getState()._roleSet_list;

      if (roleSetList)
        Object.keys(roleSetList).forEach((key) => {
          if (roleSetList[key]) {
            this.formGroup.get(key).setValue(roleSetList[key].roles)
          }
        })
    }
  }


  /**
   * gets replaced by angular on registerOnChange
   * This function helps to type the onChange function for the use in this class.
   */
  onChange(peIt: InfPersistentItem | null) {
    console.error('called before registerOnChange')
  };


  writeValue(peIt: InfPersistentItem): void {
    this.peIt = peIt ? peIt : new InfPersistentItem();

    if (this.ctrlsInitialized)
      this.initFormCtrlValues()
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;

    this.subscribeFormChanges();

  }



}
