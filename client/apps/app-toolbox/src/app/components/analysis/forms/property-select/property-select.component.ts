import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, Directive, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Optional, Output, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NG_VALIDATORS, NgControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validator, ValidatorFn } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { PropertyOption, PropertySelectModel } from '@kleiolab/lib-redux';
import { QueryFilter } from '@kleiolab/lib-sdk-lb4';
import { U } from '@kleiolab/lib-utils';
import { equals } from 'ramda';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ActiveProjectService } from '../../../../services/active-project.service';

export function propertiesRequiredCondition(value): boolean {
  const model: PropertySelectModel = value;
  return (
    !model || !model ||
    [...(model.ingoingProperties || []), ...(model.outgoingProperties || [])].length === 0
  );
}
/** At least one class or type must be selected */
export function propertiesRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return propertiesRequiredCondition(control.value)
      ? { 'propertiesRequired': { value: control.value } } : null
  };
}

@Directive({
  selector: '[gvPropertiesRequired]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PropertiesRequiredValidatorDirective, multi: true }],
  standalone: true
})
export class PropertiesRequiredValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    return propertiesRequiredValidator()(control);
  }
}


// tslint:disable: member-ordering
@Directive()
abstract class PropertySelectMatControl implements OnDestroy, ControlValueAccessor, MatFormFieldControl<PropertySelectModel> {
  abstract value: PropertySelectModel | null;
  static nextId = 0;
  @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;

  model: PropertySelectModel;
  // the flattened selection
  // selected: TreeNode<TreeNodeData>[]

  // emits true on destroy of this component
  autofilled?: boolean;
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'property-select';
  // tslint:disable-next-line: no-use-before-declare
  id = `property-select-${PropertySelectComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => {
    console.log('onChange called before registering')
  };
  onTouched = () => { };

  get empty() {
    if (!this.model) return true;
    return [
      ...(this.model.outgoingProperties || []),
      ...(this.model.ingoingProperties || [])
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


  get errorState() {
    return this.ngControl.errors !== null && !!this.ngControl.touched;
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
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
    this.matSelect.open()
  }

  writeValue(value: PropertySelectModel | null): void { }

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
  selector: 'gv-property-select',
  templateUrl: './property-select.component.html',
  styleUrls: ['./property-select.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: PropertySelectComponent }],
  standalone: true,
  imports: [
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    MatOptionModule,
    AsyncPipe,
  ],
})
export class PropertySelectComponent extends PropertySelectMatControl implements OnDestroy, OnInit {

  @HostBinding('class.d-flex') dflex = true;

  @Input() level = 0; // level of component nesting, 0...n

  @Input() options$: Observable<PropertyOption[]>;

  @Input() rootFormGroup: UntypedFormGroup;

  @Input()
  get value(): PropertySelectModel | null {
    // TODO
    if (!this.empty) return null;

    return this.model;
  }
  set value(value: PropertySelectModel | null) {
    if (!equals(this.model, value)) {
      this.model = value;
      this.onChange(this.model)
    }
  }

  get cachedKeys() {
    const keysIn = (this.ingoingProperties || []).map(pk => U.propertyFieldKeyFromParams(pk, false))
    const keysOut = (this.outgoingProperties || []).map(pk => U.propertyFieldKeyFromParams(pk, true))
    return [...keysIn, ...keysOut]
  }

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();
  @Output() selectionChanged = new EventEmitter<PropertyOption[]>();
  @Output() modelChanged = new EventEmitter<QueryFilter>();

  control = new UntypedFormControl();

  keys$ = new BehaviorSubject<string[]>([])


  // selected: PropertyOption[];
  ingoingProperties: number[]
  outgoingProperties: number[]
  constructor(private ref: ChangeDetectorRef, public p: ActiveProjectService,
    @Optional() @Self() public override ngControl: NgControl
  ) {
    super(ngControl)
    this.control.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((selected: PropertyOption[]) => {
        this.value = this.createValue(selected)
      })
  }

  ngOnInit() {

    combineLatest(this.keys$, this.options$.pipe(filter(o => !!o))).pipe(
      takeUntil(this.destroy$)
    ).subscribe(([keys, options]) => {
      const controlVal: PropertyOption[] = []
      options.forEach(o => {
        if (keys.includes(o.propertyFieldKey)) {
          controlVal.push(o)
        }
      })
      this.control.setValue(controlVal)
    })
  }

  override writeValue(value: PropertySelectModel | null): void {
    this.ingoingProperties = !value ? [] : (value.ingoingProperties || []);
    this.outgoingProperties = !value ? [] : (value.outgoingProperties || []);

    this.keys$.next(this.cachedKeys)
  }

  compareWith(a: PropertyOption, b: PropertyOption) {
    return a && b && a.propertyFieldKey == b.propertyFieldKey;

  }


  createValue(selected: PropertyOption[]): PropertySelectModel {
    return {
      outgoingProperties: selected.filter(p => p.isOutgoing === true).map(p => p.pk),
      ingoingProperties: selected.filter(p => p.isOutgoing === false).map(p => p.pk),
    }
  }


  onOpenedChange(wasOpened) {
    if (wasOpened) {
      this.focus.emit()
      this.focused = true;
    } else {
      this.onTouched();
      this.blur.emit()
      this.focused = false;
    }
  }



}
