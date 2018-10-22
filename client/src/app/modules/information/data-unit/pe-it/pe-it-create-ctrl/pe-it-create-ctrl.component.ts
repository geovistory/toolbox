import { NgRedux, WithSubStore } from '@angular-redux/store';
import { Component, forwardRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { InfPersistentItem, InfTemporalEntity, U, UiContext } from 'app/core';
import { PeItCtrlBase } from '../pe-it-ctrl.base';
import { PeItActions } from '../pe-it.actions';
import { peItReducer } from '../pe-it.reducer';
import { RootEpics } from 'app/core/store/epics';
import { DataUnitAPIEpics } from '../../data-unit.epics';

@WithSubStore({
  basePathMethodName: 'getBasePath',
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

  uiContext: UiContext;

  constructor(
    protected ngRedux: NgRedux<any>,
    protected actions: PeItActions,
    protected fb: FormBuilder,
    protected rootEpics: RootEpics,
    protected dataUnitEpics: DataUnitAPIEpics,
    private ref: ChangeDetectorRef
  ) {
    super(ngRedux, actions, fb, rootEpics, dataUnitEpics)
  }


  initFormCtrls(): void {
    // add type control
    this._type$.takeUntil(this.destroy$).subscribe((typeDetail) => {
      if (typeDetail && typeDetail._typeCtrl) {
        this.formGroup.addControl('_typeCtrl', new FormControl(typeDetail._typeCtrl.entityAssociation))
      }
    })
    // add controls for each roleSet of _children    
    this._children$.takeUntil(this.destroy$).subscribe(roleSetList => {
      U.obj2KeyValueArr(roleSetList).forEach(item => {
        this.formGroup.addControl(item.key, new FormControl(
          item.value.roles,
          [
            Validators.required
          ]
        ))
      })

      this.ref.detectChanges()
    })

  }


  subscribeFormChanges(): void {

    const s = this.localStore.getState();

    this.formGroup.valueChanges.takeUntil(this.destroy$).subscribe(val => {

      // build a peIt with all pi_roles given by the form's controls
      const peIt = new InfPersistentItem();

      peIt.pi_roles = [];
      peIt.domain_entity_associations = [];
      Object.keys(this.formGroup.controls).forEach(key => {
        if (key == '_typeCtrl') {
          peIt.domain_entity_associations = [
            ...peIt.domain_entity_associations,
            ...this.formGroup.get(key).value
          ]
        } else if (this.formGroup.get(key)) {
          peIt.pi_roles = [...peIt.pi_roles, ...this.formGroup.get(key).value]
        }
      })

      peIt.fk_class = s.fkClass;

      // try to retrieve a appellation label
      const displayAppeUse: InfTemporalEntity = U.getDisplayAppeLabelOfPeIt(peIt)
      this.labelInEdit = U.getDisplayAppeLabelOfTeEnt(displayAppeUse);

      if (this.formGroup.valid) {
        // send the peIt the parent form
        this.onChange(peIt)
      } else {
        this.onChange(null)
      }
    })


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
