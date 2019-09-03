
import {takeUntil} from 'rxjs/operators';
import { NgRedux } from '@angular-redux/store';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { SysConfig, ProInfoProjRel, InfPersistentItem, InfTemporalEntity, U, UiContext } from 'app/core';
import { PeItCtrlBase } from '../pe-it-ctrl.base';
import { PeItActions } from '../pe-it.actions';
import { RootEpics } from 'app/core/store/epics';
import { EntityAPIEpics } from '../../entity.epics';

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

  uiContext: UiContext;


  constructor(
    protected ngRedux: NgRedux<any>,
    protected actions: PeItActions,
    protected fb: FormBuilder,
    protected ref: ChangeDetectorRef,
    protected rootEpics: RootEpics,
    protected entityEpics: EntityAPIEpics
  ) {
    super(ngRedux, actions, fb, rootEpics, entityEpics)
    console.log('PeItAddCtrlComponent')

  }

  onInitPeItBaseChild(): void {

    this.uiContext = this.classConfig.uiContexts[SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE];

    this.initFormCtrls()
  }


  initFormCtrls(): void {
    if (this.localStore.getState()) {

      // add controls for each propertyField of _fields
      const propertyFieldList = this.localStore.getState()._fields;

      // this.subs.push(this._fields$.subscribe(propertyFieldList => {
      if (propertyFieldList) {
        Object.keys(propertyFieldList).forEach((key) => {
          if (propertyFieldList[key]) {

            this.formGroup.addControl(key, new FormControl(null, [Validators.required]))
          }

        })
      }

      this.ctrlsInitialized = true;
    }

  }



  subscribeFormChanges(): void {

    this.formGroup.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(formVal => {

      // build a peIt with all pi_roles given by the form's controls
      const peIt = new InfPersistentItem(this.peItState.peIt);

      peIt.pi_roles = [];
      Object.keys(this.formGroup.controls).forEach(key => {
        if (this.formGroup.get(key)) {
          const val = this.formGroup.get(key).value;
          if (val) peIt.pi_roles = [...peIt.pi_roles, ...val]

        }
      })


      // create the epr
      peIt.entity_version_project_rels = [{
        is_in_project: true,
      } as ProInfoProjRel];


      // try to retrieve a appellation label
      const displayAppeUse: InfTemporalEntity = U.getDisplayAppeLabelOfPeIt(peIt)
      this.labelInEdit = U.getDisplayAppeLabelOfTeEnt(displayAppeUse);
      this.ref.detectChanges()

      if (this.formGroup.valid) {
        // send the peIt the parent form
        this.onChange(peIt)
      } else {
        this.onChange(null)
      }
    })

  }


  initFormCtrlValues() {
    if (this.localStore.getState()) {

      // add values to controls for each propertyField of _fields
      const propertyFieldList = this.localStore.getState()._fields;

      if (propertyFieldList) {
        Object.keys(propertyFieldList).forEach((key) => {
          if (propertyFieldList[key]) {
            this.formGroup.get(key).setValue(propertyFieldList[key].roles)
          }
        })
      }
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

    if (this.ctrlsInitialized) this.initFormCtrlValues()
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;

    this.subscribeFormChanges();

  }



}
