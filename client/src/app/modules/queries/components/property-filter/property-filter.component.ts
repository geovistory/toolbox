import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, Component, Directive, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Optional, Output, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelectChange } from '@angular/material/select';
import { ActiveProjectService } from 'app/core';
import { equals, keys, pick } from 'ramda';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { delay, map, takeUntil } from 'rxjs/operators';
import { QueryFilter } from "../../containers/query-detail/FilterTree";
import { QueryService } from '../../services/query.service';
import { propertiesRequiredCondition, propertiesRequiredValidator, PropertyOption } from '../property-select/property-select.component';

interface DynamicFormControl {
  key: string,
  ctrl: FormControl
}

/** At least one class or type must be selected */
export function propertyFilterRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const model: QueryFilter = control.value;
    return model && model.data && propertiesRequiredCondition(model.data)
      ? { 'propertyFilterRequired': { value: control.value } } : null
  };
}

@Directive({
  selector: '[gvPropertyFilterRequired]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PropertyFilterRequiredValidatorDirective, multi: true }]
})
export class PropertyFilterRequiredValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    return propertyFilterRequiredValidator()(control);
  }
}


// tslint:disable: member-ordering
class PropertyFilterMatControl implements OnDestroy, ControlValueAccessor, MatFormFieldControl<QueryFilter> {
  static nextId = 0;

  model: QueryFilter;
  // the flattened selection
  // selected: TreeNode<TreeNodeData>[]

  // emits true on destroy of this component
  autofilled?: boolean;
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'property-filter';
  // tslint:disable-next-line: no-use-before-declare
  id = `property-filter-${PropertyFilterComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => { };
  onTouched = () => { };

  get empty() {
    if (!this.model || !this.model.data) return true;
    return [
      ...(this.model.data.ingoingProperties || []),
      ...(this.model.data.outgoingProperties || [])
    ].length === 0;
  }

  get shouldLabelFloat() { return this.focused || !this.empty; }

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);

    // TODO: this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): QueryFilter | null {
    // TODO
    if (!this.empty) return null;

    return this.model;
  }
  set value(value: QueryFilter | null) {
    if (!equals(this.model, value)) {
      this.model = value;
      this.onChange(this.model)
    }
  }

  get errorState() {
    return this.ngControl.errors !== null && !!this.ngControl.touched;
  }

  get defaultOperatorOption() {
    return this.operatorOptions[0].value
  }

  formGroup: FormGroup;
  operatorCtrl: FormControl;
  propertyCtrl: FormControl;
  dynamicFormControls: DynamicFormControl[] = [];
  operatorOptions = [
    { value: 'IS', label: 'has / is' },
    { value: 'IS NOT', label: 'has not / is not' },
  ]


  constructor(
    @Optional() @Self() public ngControl: NgControl,
    fb: FormBuilder
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.operatorCtrl = new FormControl(this.defaultOperatorOption, Validators.required)
    this.propertyCtrl = new FormControl(null, propertiesRequiredValidator());
    this.formGroup = fb.group({
      operatorCtrl: this.operatorCtrl,
      propertyCtrl: this.propertyCtrl
    })

  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }


  onContainerClick(event: MouseEvent) {
    // TODO: implement this

  }

  writeValue(value: QueryFilter | null): void {
    const data = !value ? {} : !value.data ? {} : value.data;
    const children = !value ? [] : !value.children ? [] : value.children;

    this.value = { data, children };

    this.propertyCtrl.setValue(pick(['ingoingProperties', 'outgoingProperties'], data))
    this.operatorCtrl.setValue(data.operator || this.defaultOperatorOption)

    // remove controls
    this.dynamicFormControls = [];
    const [propertyCtrl, operatorCtrl, ...ctrlsToRemove] = keys(this.formGroup.controls) as string[];
    ctrlsToRemove.forEach(ctrlName => this.formGroup.removeControl(ctrlName))


    // add controls
    children.forEach((child, index) => { this.addCrtl(index, child); })

  }


  protected addCrtl(index: number, child: QueryFilter) {
    const f: DynamicFormControl = {
      key: '_' + index,
      ctrl: new FormControl(child)
    }
    this.dynamicFormControls.push(f);
    this.formGroup.addControl(f.key, f.ctrl)
  }

  protected removeCtrl(index: number) {
    const key = this.dynamicFormControls[index].key;
    this.dynamicFormControls.splice(index, 1)
    this.formGroup.removeControl(key)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
// tslint:enable: member-ordering

@Component({
  selector: 'gv-property-filter',
  templateUrl: './property-filter.component.html',
  styleUrls: ['./property-filter.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: PropertyFilterComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class PropertyFilterComponent extends PropertyFilterMatControl implements OnInit, OnDestroy, AfterViewInit {
  @HostBinding('class.d-flex') dflex = true;
  @HostBinding('class.flex-column') flexcolumn = true;

  @Input() level = 0; // level of component nesting, 0...n
  @Input() qtree: QueryFilter; // TODO remove this line
  @Input() model: QueryFilter;
  @Input() propertyOptions$: Observable<PropertyOption[]>;


  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  @Output() validChanged = new EventEmitter<boolean>();

  pkProperties: number[];

  // the pkClasses get derived from the selctedProperties
  pkClasses$ = new BehaviorSubject<number[] | null>(null);

  selectedOperator;

  selectedProperties$ = new BehaviorSubject<PropertyOption[] | null>(null);


  get selectedProperties() {
    return this.selectedProperties$.value;
  }
  set selectedProperties(val: PropertyOption[]) {
    this.selectedProperties$.next(val)
  }

  valid: boolean;

  showAddSubqueryBtn$: Observable<boolean>


  constructor(public p: ActiveProjectService, private q: QueryService,
    fb: FormBuilder,
    @Optional() @Self() public ngControl: NgControl) {
    super(ngControl, fb)

    this.formGroup.valueChanges
      .pipe(
        delay(0),
        takeUntil(this.destroy$))
      .subscribe(values => {
        const data = {
          operator: this.operatorCtrl.value,
          ...this.propertyCtrl.value
        }
        const children = this.dynamicFormControls.map(c => c.ctrl.value)
        const newVal = {
          ...this.value,
          data,
          children
        }

        if (!equals(this.value, newVal)) {

          this.value = newVal

          this.selectedProperties = this.q.propertyModelToPropertyOptions(this.propertyCtrl.value);
        }

      })

    this.showAddSubqueryBtn$ = merge(this.operatorCtrl.statusChanges, this.propertyCtrl.statusChanges).pipe(
      delay(0),
      map(() => (this.operatorCtrl.valid && this.propertyCtrl.valid))
    )

  }

  ngOnInit() {

    this.selectedProperties$.pipe(
      this.q.targetClassesOfPropertyOptions(),
      takeUntil(this.destroy$)
    ).subscribe(pks => {
      this.pkClasses$.next(pks)
    })

    if (this.model && this.model.data && this.model.data.operator) {
      this.selectedOperator = this.model.data.operator;
    }

  }

  ngAfterViewInit() {
    // this.setValid();
  }


  addChild() {
    const child = new QueryFilter({ subgroup: 'classAndType' })
    this.addCrtl(this.dynamicFormControls.length, child)
  }

  removeChild(i) {
    this.removeCtrl(i)
  }

  // selection of the operator changed
  operatorSelectionChange(e: MatSelectChange) {
    const val = e.value;
    this.model.data = {
      ...this.model.data,
      operator: val
    }
  }


  onOpenedChange(wasOpened) {
    if (wasOpened) {
      this.onFocus()
    } else {
      this.onBlur();
    }
  }

  onBlur() {
    this.onTouched();
    this.blur.emit()
    this.focused = false;
  }

  onFocus() {
    this.focus.emit()
    this.focused = true;
  }



}
