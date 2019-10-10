import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { IAppState, InfRole } from 'app/core';
import { RoleDetailList, PropertyField, FieldLabel } from 'app/core/state/models';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable, Subscription } from 'rxjs';
import { propertyFieldReducer } from '../../property-field.reducer';

@AutoUnsubscribe()
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: propertyFieldReducer
})
@Component({
  selector: 'gv-ex-time-property-field-create-ctrl',
  templateUrl: './ex-time-property-field-create-ctrl.component.html',
  styleUrls: ['./ex-time-property-field-create-ctrl.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExTimePropertyFieldCreateCtrlComponent),
      multi: true
    }
  ]
})
export class ExTimePropertyFieldCreateCtrlComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() parentPath: string[];
  @Input() parentTeEntStatePath: string[];

  @Output() onRemovePropertyField: EventEmitter<void> = new EventEmitter();

  @Input() index: string;
  getBasePath = () => this.index ?
    [...this.parentPath, '_fields', this.index] :
    null;
  basePath: string[];
  localStore: ObservableStore<PropertyField>;


  // Since we're observing an array of items, we need to set up a 'trackBy'
  // parameter so Angular doesn't tear down and rebuild the list's DOM every
  // time there's an update.
  getKey(_, item) {
    return item.key;
  }

  /**
   * Local store Observables
   */
  // @select() roles$: Observable<InfRole[]>
  // @select() property$: Observable<DfhProperty>
  // @select() fkProperty$: Observable<number>
  // @select() isOutgoing$: Observable<boolean>
  // @select() parentPeIt$: Observable<InfPersistentItem>
  // @select() parentEntityPk$: Observable<number>
  // @select() toggle$: Observable<CollapsedExpanded>
  // @select() rolesNotInProjectLoading$: Observable<boolean>;

  @select() label$: Observable<FieldLabel>
  @select() _role_list$: Observable<RoleDetailList>
  // @select() _property_field_form$: Observable<PropertyFieldForm>

  subs: Subscription[] = []; // for unsubscribe onDestroy
  formGroup: FormGroup; // formGroup to create roles

  constructor(
    protected ngRedux: NgRedux<IAppState>,
    protected fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), propertyFieldReducer);
    this.basePath = this.getBasePath();

    this.initForm()

  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }


  /**
 * Inits the formGroup used in template.
 */
  initForm() {
    //   create the formGroup used to create/edit the propertyField's InfRole[]
    this.formGroup = this.fb.group({});

    const roleList: RoleDetailList = this.localStore.getState()._role_list;
    // add controls for each child propertyField
    if (roleList)
      Object.keys(roleList).forEach((key) => {
        if (roleList[key]) {
          this.formGroup.addControl(key, new FormControl(null, [Validators.required]))
        }
      })
  }

  initFormValue() {
    const roleList: RoleDetailList = this.localStore.getState()._role_list;
    // add controls for each child propertyField
    if (roleList)
      Object.keys(roleList).forEach((key) => {
        if (roleList[key]) {
          this.formGroup.get(key).setValue(roleList[key].role)
        }
      })
  }

  /**
   * Subcscibes to form value changes
   */
  initFormSubscription() {
    this.subs.push(this.formGroup.valueChanges.subscribe(val => {
      this.emitVal()
    }))

  }

  emitVal() {
    if (this.formGroup.valid) {

      // build a array of InfRole
      let roles: InfRole[] = [];
      Object.keys(this.formGroup.controls).forEach(key => {
        if (this.formGroup.get(key)) {
          roles.push(this.formGroup.get(key).value)
        }
      })

      // send the peIt the parent form
      this.onChange(roles)
    }
    else {
      this.onChange(null)
    }
  }

  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(roles: InfRole[]): void {

    this.initFormValue()

  }


  /**
   * Allows Angular to register a function to call when the model changes.
   * Save the function as a property to call later here.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;

    this.initFormSubscription();

    this.emitVal()

  }

  /**
   * gets replaced by angular on registerOnChange
   * This function helps to type the onChange function for the use in this class.
   */
  onChange = (peIt: InfRole[] | null) => {
    console.warn('Oups: onChange got called before this.registerOnChange() was called')
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

  @Output() touched: EventEmitter<void> = new EventEmitter();

}
