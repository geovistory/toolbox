import { Component, OnDestroy, Input, OnInit, forwardRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subject, Observable, combineLatest } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent, InfTextProperty, U, FieldLabel, CollapsedExpanded } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { TextPropertyFieldAPIEpics } from './api/text-property-field.epics';
import { TextPropertyFieldAPIActions } from './api/text-property-field.actions';
import { textPropertyListReducer } from './api/text-property-field.reducer';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { TextPropertyField } from 'app/core/state/models/text-property-field';
import { TextPropertyDetailList } from 'app/core/state/models/text-property-detail-list';
import { isCreateContext } from 'app/core/state/services/state-creator';
import { first, takeUntil } from 'rxjs/operators';
import { slideInOut } from '../../shared/animations';
import { dropLast } from 'ramda';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: textPropertyListReducer
})
@Component({
  selector: 'gv-text-property-field',
  templateUrl: './text-property-field.component.html',
  styleUrls: ['./text-property-field.component.css'],
  animations: [slideInOut],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextPropertyFieldComponent),
      multi: true
    }
  ],
})
export class TextPropertyFieldComponent extends TextPropertyFieldAPIActions implements OnInit, OnDestroy, SubstoreComponent, ControlValueAccessor {


  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<TextPropertyField>;

  // path to the substore
  @Input() basePath: string[];

  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() toggle$: Observable<CollapsedExpanded>;
  @select() createOrAdd$: Observable<any>;
  @select() textPropertyDetailList$: Observable<TextPropertyDetailList>;
  @select() pkUiContext$: Observable<number>;
  @select() fkClassField$: Observable<number>;
  isCreateContext$: Observable<boolean>;
  addButtonVisible$: Observable<boolean>;
  showFieldHeader$: Observable<boolean>;
  label$: Observable<FieldLabel>;
  pkConcernedEntity: number;

  // Emits when form is touched
  @Output() touched = new EventEmitter<void>();

  key;

  // Create Form when used as form control
  formGroup: FormGroup;
  submitted = false;


  constructor(
    protected rootEpics: RootEpics,
    private epics: TextPropertyFieldAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    fb: FormBuilder
  ) {
    super()
    this.formGroup = fb.group({})

  }

  getBasePath = () => this.basePath;

  getKey(_, item) {
    this.key = item.key;
    return item.key;
  }

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, textPropertyListReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    this.isCreateContext$ = this.pkUiContext$.map(pk => isCreateContext(pk));
    this.addButtonVisible$ = this.isCreateContext$.map(bool => !bool);
    this.showFieldHeader$ = this.createOrAdd$.map(bool => !bool);
    this.ngRedux.select<number>([...dropLast(2, this.basePath), 'pkEntity']).takeUntil(this.destroy$).subscribe(
      d => { this.pkConcernedEntity = d }
    )

    this.label$ = this.ngRedux.select(['activeProject', 'crm', 'fieldList', this.basePath[this.basePath.length - 1], 'label'])

    combineLatest(this.isCreateContext$, this.textPropertyDetailList$)
      .pipe(
        first((vals) => (vals.filter(val => val === undefined).length === 0)),
        takeUntil(this.destroy$)
      )
      .subscribe(d => {
        const isCreateContext = d[0], textPropList = d[1];
        if (isCreateContext) {
          // Init form controls for create mode
          U.obj2KeyValueArr(textPropList).forEach(obj => {
            this.formGroup.addControl(obj.key, new FormControl(null, [Validators.required]))
          })

        } else {
          this.formGroup.addControl('createNew', new FormControl(null, [Validators.required]))
        }
      })


  }

  ngOnDestroy() {
    // this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  /**
   * create new text property
   */
  submitCreateForm() {
    this.submitted = true;
    if (this.formGroup.valid) {
      const infTextProperty = new InfTextProperty({
        fk_concerned_entity: this.pkConcernedEntity,
        ...this.formGroup.value.createNew,
        fk_class_field: this.localStore.getState().fkClassField,
        entity_version_project_rels: [{ is_in_project: true }]
      })
      console.log(JSON.stringify(infTextProperty))
      this.create(infTextProperty);
    }
  }

  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/

  // triggered when form changes
  subscribeToFormChanges() {
    this.formGroup.valueChanges.subscribe(vals => {
      this.validateAndEmit()
    });
  };

  // validates and emits onChange
  validateAndEmit() {
    if (this.formGroup.valid) {
      this.onChange(U.obj2Arr(this.formGroup.value).map((textProp: InfTextProperty) => {
        textProp.fk_class_field = this.localStore.getState().fkClassField
        return textProp;
      }))
    } else {
      this.onChange(null)
    }
  }

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   *
   */
  writeValue(textProperty: InfTextProperty[]): void {

  }


  /**
   * Allows Angular to register a function to call when the model changes.
   * Save the function as a property to call later here.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;

    this.subscribeToFormChanges();

  }

  /**
   * gets replaced by angular on registerOnChange
   * This function helps to type the onChange function for the use in this class.
   */
  onChange = (txtProperties: InfTextProperty[] | null) => {
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
