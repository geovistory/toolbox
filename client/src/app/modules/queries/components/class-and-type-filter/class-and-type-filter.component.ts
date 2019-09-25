import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Directive, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Optional, Output, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { TreeNode } from 'app/shared/components/tree-checklist/tree-checklist.component';
import { equals, keys } from 'ramda';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil, tap, delay } from 'rxjs/operators';
import { FilterTree, FilterTreeData } from '../../containers/query-detail/FilterTree';
import { QueryService } from '../../services/query.service';
import { ClassAndTypeSelectModel, classOrTypeRequiredCondition, classOrTypeRequiredValidator, TreeNodeData } from '../class-and-type-select/class-and-type-select.component';
import { PropertyOption } from '../property-select/property-select.component';

interface DynamicFormControl {
  key: string,
  ctrl: FormControl
}

/** At least one class or type must be selected */
export function classAndTypeFilterRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const model: FilterTree = control.value;
    return model && model.data && classOrTypeRequiredCondition(model.data)
      ? { 'classAndTypeFilterRequired': { value: control.value } } : null
  };
}

@Directive({
  selector: '[gvClassAndTypeFilterRequired]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ClassAndTypeFilterRequiredValidatorDirective, multi: true }]
})
export class ClassAndTypeFilterRequiredValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    return classAndTypeFilterRequiredValidator()(control);
  }
}

// tslint:disable: member-ordering
class ClassAndTypeFilterMatControl implements OnDestroy, ControlValueAccessor, MatFormFieldControl<FilterTree> {
  static nextId = 0;

  model: FilterTree;
  // the flattened selection
  selected: TreeNode<TreeNodeData>[]

  // emits true on destroy of this component
  autofilled?: boolean;
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'class-and-type-filter';
  // tslint:disable-next-line: no-use-before-declare
  id = `class-and-type-filter-${ClassAndTypeFilterComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => { };
  onTouched = () => { };

  get empty() {
    if (!this.model || !this.model.data) return true;
    return [
      ...(this.model.data.classes || []),
      ...(this.model.data.types || [])
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
  get value(): FilterTree | null {
    // TODO
    if (!this.empty) return null;

    return this.model;
  }
  set value(value: FilterTree | null) {
    this.model = value;

    this.onChange(this.model)
  }

  get errorState() {
    return this.ngControl.errors !== null && !!this.ngControl.touched;
  }

  formGroup: FormGroup;
  classAndTypeCtrl: FormControl;
  dynamicFormControls: DynamicFormControl[] = [];

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    fb: FormBuilder
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.classAndTypeCtrl = new FormControl(null, classOrTypeRequiredValidator())
    this.formGroup = fb.group({
      classAndTypeCtrl: this.classAndTypeCtrl
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

  writeValue(value: FilterTree | null): void {
    const data = !value ? {} : !value.data ? {} : value.data;
    const children = !value ? [] : !value.children ? [] : value.children;
    this.value = { data, children };


    // remove controls
    this.dynamicFormControls = [];
    const [classAndTypeCtrl, ...ctrlsToRemove] = keys(this.formGroup.controls) as string[];
    ctrlsToRemove.forEach(ctrlName => this.formGroup.removeControl(ctrlName))

    // add controls
    children.forEach((child, index) => { this.addCrtl(index, child); })

    // set this class and type select value
    this.classAndTypeCtrl.setValue(data)
  }

  protected addCrtl(index: number, child: FilterTree) {
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
  selector: 'gv-class-and-type-filter',
  templateUrl: './class-and-type-filter.component.html',
  styleUrls: ['./class-and-type-filter.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: ClassAndTypeFilterComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class ClassAndTypeFilterComponent extends ClassAndTypeFilterMatControl implements OnInit, OnDestroy {
  @HostBinding('class.d-flex') dflex = true;
  @HostBinding('class.flex-column') flexcolumn = true;

  @Input() qtree; // TODO remove this line
  @Input() level = 0; // level of nesting, 0...n

  @Input() pkClasses$: Observable<number[]>;
  @Input() showRemoveBtn = true;

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  @Output() validChanged = new EventEmitter<boolean>();

  selectedClassesAndTypes$ = new BehaviorSubject<ClassAndTypeSelectModel | null>(null);

  // the propertyOptions get derived from the selectedClasses
  propertyOptions$ = new BehaviorSubject<PropertyOption[] | null>(null);

  get selectedClassesAndTypes() {
    return this.selectedClassesAndTypes$.value;
  }
  set selectedClassesAndTypes(val: ClassAndTypeSelectModel) {
    this.selectedClassesAndTypes$.next(val)
  }

  valid = false;


  constructor(
    private q: QueryService,
    @Optional() @Self() public ngControl: NgControl,
    fb: FormBuilder
  ) {
    super(ngControl, fb)



    this.formGroup.valueChanges
      .pipe(
        delay(0),
        takeUntil(this.destroy$))
      .subscribe(vals => {
        const data = this.classAndTypeCtrl.value;
        const children = this.dynamicFormControls.map(c => vals[c.key])
        this.value = {
          ...this.model,
          data,
          children
        }

        if (!equals(this.selectedClassesAndTypes$.value, data)) {
          this.treeDataChange(data)
        }
      })
  }

  ngOnInit() {

    this.selectedClassesAndTypes$.pipe(
      tap((d) => {
        if (this.level === 0) {
          const l = this.level
        } else {
          const l = this.level
        }

      }),
      this.q.propertiesOfClassesAndTypes(this.level),
      tap((d) => {
        if (this.level === 0) {
          if (d !== null && d.length === 0) {
            // Problem
            const x = 'problem'
          }
          const l = this.level
        } else {
          const l = this.level
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe(propertyOptions => {
      this.propertyOptions$.next(propertyOptions)
    })

  }

  addChild() {
    const child = new FilterTree({ subgroup: 'property' })
    this.addCrtl(this.dynamicFormControls.length, child)

  }

  removeChild(i) {
    this.removeCtrl(i)
  }

  setValid(valid) {
    this.valid = valid;
    this.validChanged.emit(this.valid)
  }

  treeDataChange(treeData: FilterTreeData) {

    this.selectedClassesAndTypes = {
      classes: treeData ? treeData.classes || [] : [],
      types: treeData ? treeData.types || [] : []
    };
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
