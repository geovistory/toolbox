import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit, EventEmitter, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { IAppState, InfEntityAssociation, PeItDetail, SubstoreComponent } from 'app/core';
import { EntityAssociationDetail } from 'app/core/state/models/entity-association-detail';
import { RootEpics } from 'app/core/store/epics';
import { Observable, Subject } from 'rxjs';
import { EntityAssociationAPIEpics } from '../api/entity-association.epics';
import { entityAssociationReducer } from '../api/entity-association.reducer';
import { EntityAssociationAPIActions } from '../api/entity-association.actions';


@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: entityAssociationReducer
})
@Component({
  selector: 'gv-entity-association-create-ctrl',
  templateUrl: './entity-association-create-ctrl.component.html',
  styleUrls: ['./entity-association-create-ctrl.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntityAssociationCreateCtrlComponent),
      multi: true
    }
  ]
})
export class EntityAssociationCreateCtrlComponent extends EntityAssociationAPIActions implements OnInit, OnDestroy, SubstoreComponent, ControlValueAccessor {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<EntityAssociationDetail>;

  // path to the substore
  @Input() basePath: string[];

  // emits on touch of form
  @Output() touched: EventEmitter<void> = new EventEmitter();

  // select observables of substore properties
  @select() _peIt$: Observable<PeItDetail>;

  formGroup: FormGroup;

  constructor(
    protected rootEpics: RootEpics,
    private epics: EntityAssociationAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    protected fb: FormBuilder
  ) {
    super()
    this.formGroup = fb.group({});
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, entityAssociationReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
    this.initFormCtrls();
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  initFormCtrls(): void {
    // add peIt control
    this._peIt$.takeUntil(this.destroy$).subscribe((peItDetail) => {
      if (peItDetail) {
        this.formGroup.addControl('_peItCtrl', new FormControl(peItDetail.peIt, [Validators.required]))
      }
    })

  }



  subscribeFormChanges(): void {

    const s = this.localStore.getState();

    this.formGroup.valueChanges.takeUntil(this.destroy$).subscribe(val => {


      if (this.formGroup.valid) {
        // build a ea given by the form's controls
        const ea = new InfEntityAssociation({
          ...s.entityAssociation
        });

        if (s.isOutgoing && val._peItCtrl) ea.range_pe_it = val._peItCtrl;
        if (s.isOutgoing === false && val._peItCtrl) ea.domain_pe_it = val._peItCtrl;

        // send the peIt the parent form
        this.onChange(ea)
      } else {
        this.onChange(null)
      }
    })


  }


  /****************************************
 *  ControlValueAccessor implementation *
 ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(role: InfEntityAssociation): void {

  }


  /**
   * Allows Angular to register a function to call when the model changes.
   * Save the function as a property to call later here.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;

    this.subscribeFormChanges();

  }

  /**
   * gets replaced by angular on registerOnChange
   * This function helps to type the onChange function for the use in this class.
   */
  onChange = (role: InfEntityAssociation | null) => {
    console.error('called before registerOnChange')
  };

  /**
   * Allows Angular to register a function to call when the input has been touched.
   * Save the function as a property to call later here.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * gets replaced by angular on registerOnTouched
   * Call this function when the form has been touched.
   */
  onTouched = () => {
  };

  markAsTouched() {
    this.onTouched()
    this.touched.emit()
  }

}
