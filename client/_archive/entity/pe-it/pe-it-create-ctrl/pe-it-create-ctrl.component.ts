
import {takeUntil} from 'rxjs/operators';
import { NgRedux, WithSubStore } from '@angular-redux/store';
import { Component, forwardRef, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { InfPersistentItem, InfTemporalEntity, U, UiContext, SysConfig, IAppState } from 'app/core';
import { PeItCtrlBase } from '../pe-it-ctrl.base';
import { PeItActions } from '../pe-it.actions';
import { peItReducer } from '../pe-it.reducer';
import { RootEpics } from 'app/core/store/epics';
import { EntityAPIEpics } from '../../entity.epics';

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

  // Emits peIt also when the form is not valid.
  // useful e.g. for parent component to retrieve some string and search for existing peIts
  @Output() onValueChange = new EventEmitter<InfPersistentItem>();

  constructor(
    protected ngRedux: NgRedux<IAppState>,
    protected actions: PeItActions,
    protected fb: FormBuilder,
    protected rootEpics: RootEpics,
    protected entityEpics: EntityAPIEpics,
    private ref: ChangeDetectorRef
  ) {
    super(ngRedux, actions, fb, rootEpics, entityEpics)
  }


  initFormCtrls(): void {
    // add type control
    this._type$.pipe(takeUntil(this.destroy$)).subscribe((typeDetail) => {
      if (typeDetail && typeDetail._typeCtrl) {
        this.formGroup.addControl('_typeCtrl', new FormControl(typeDetail._typeCtrl.entityAssociation))
      }
    })
    // add controls for each propertyField of _fields
    this._fields$.pipe(takeUntil(this.destroy$)).subscribe(propertyFieldList => {
      U.obj2KeyValueArr(propertyFieldList).forEach(item => {
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

    this.formGroup.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => {

      // build a peIt with all pi_roles given by the form's controls
      const peIt = new InfPersistentItem();

      peIt.pi_roles = [];
      peIt.text_properties = [];
      peIt.domain_entity_associations = [];


      Object.keys(this.formGroup.controls).forEach(key => {

        const field = this.ngRedux.getState().activeProject.crm.fieldList[key];

        if (key == '_typeCtrl') {
          peIt.domain_entity_associations = [
            ...peIt.domain_entity_associations,
            ...this.formGroup.get(key).value
          ]
        } else if (field.type === 'TextPropertyField') {

          peIt.text_properties = [...peIt.text_properties, ...this.formGroup.get(key).value]

        } else if (field.type === 'PropertyField') {

          peIt.pi_roles = [...peIt.pi_roles, ...this.formGroup.get(key).value]

        }
      })

      peIt.fk_class = s.fkClass;

      // try to retrieve a appellation label
      const displayAppeUse: InfTemporalEntity = U.getDisplayAppeLabelOfPeIt(peIt)
      this.labelInEdit = U.getDisplayAppeLabelOfTeEnt(displayAppeUse);

      // emit the peIt, also if not valid
      this.onValueChange.emit(peIt);

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