import { Component, OnInit, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { WithSubStore, NgRedux } from '@angular-redux/store';
import { PeItActions } from '../pe-it.actions';
import { InfPersistentItem, InfTemporalEntity, U } from 'app/core';
import { PeItCtrlBase } from '../pe-it-ctrl.base';
import { peItReducer } from '../pe-it.reducer';

@WithSubStore({
  basePathMethodName:'getBasePath',
  localReducer: peItReducer
})
@Component({
  selector: 'gv-pe-it-create-ctrl',
  templateUrl: './pe-it-create-ctrl.component.html',
  styleUrls: ['./pe-it-create-ctrl.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PeItCreateCtrlComponent),
      multi: true
    }
  ]
})
export class PeItCreateCtrlComponent extends PeItCtrlBase {

  // the data model of this control
  peIt: InfPersistentItem;

  constructor(
    protected ngRedux: NgRedux<any>,
    protected actions: PeItActions,
    protected fb: FormBuilder

  ) {
    super(ngRedux, actions, fb)
  }


  initFormCtrls(): void {
    // add controls for each roleSet of _roleSet_list
    this.subs.push(this._roleSet_list$.subscribe(roleSetList => {
      Object.keys(roleSetList).forEach((key) => {
        if (roleSetList[key]) {

          this.formGroup.addControl(key, new FormControl(
            roleSetList[key].roles,
            [
              Validators.required
            ]
          ))
        }

      })
    }))

  }




  subscribeFormChanges(): void {
    
    const s = this.localStore.getState();

    this.subs.push(
      this.formGroup.valueChanges.subscribe(val => {

        // build a peIt with all pi_roles given by the form's controls 
        let peIt = new InfPersistentItem();

        peIt.pi_roles = [];
        Object.keys(this.formGroup.controls).forEach(key => {
          if (this.formGroup.get(key)) {
            peIt.pi_roles = [...peIt.pi_roles, ...this.formGroup.get(key).value]
          }
        })

        peIt.fk_class = s.dfhClass.dfh_pk_class;

        // try to retrieve a appellation label
        const displayAppeUse: InfTemporalEntity = U.getDisplayAppeLabelOfPeIt(peIt)
        this.labelInEdit = U.getDisplayAppeLabelOfTeEnt(displayAppeUse);

        if (this.formGroup.valid) {
          // send the peIt the parent form
          this.onChange(peIt)
        }
        else {
          this.onChange(null)
        }
      })
    )

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
  }

  onInitPeItBaseChild(): void { }


}
