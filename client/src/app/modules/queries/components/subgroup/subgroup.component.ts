
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Optional, Output, QueryList, Self, ViewChildren } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { equals, flatten, keys } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject, zip } from 'rxjs';
import { delay, distinctUntilChanged, map, merge, mergeMap, startWith, takeUntil } from 'rxjs/operators';
import { ClassAndTypeSelectComponent } from '../class-and-type-select/class-and-type-select.component';
import { PropertyFilterComponent } from '../property-filter/property-filter.component';
import { PropertyOption } from '../property-select/property-select.component';
import { FilterTree, FilterTreeData } from '../../containers/query-detail/FilterTree';
interface DynamicFormControl {
  key: string,
  component: 'class-and-type-filter' | 'property-filter' | 'subgroup',
  ctrl: FormControl
}

// tslint:disable: member-ordering
class SubgroupMatControl implements OnDestroy, ControlValueAccessor, MatFormFieldControl<FilterTree>{
  static nextId = 0;

  model: FilterTree;


  // emits true on destroy of this component
  autofilled?: boolean;
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'subgroup';
  // tslint:disable-next-line: no-use-before-declare
  id = `subgroup-${SubgroupComponent.nextId++}`;
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

  get shouldLabelFloat() { return true; }

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

    // TODO: Adapt, when it is invalid and null is returned
    if (!this.empty) return null;

    return this.model;
  }
  set value(value: FilterTree | null) {
    this.model = value;
    this.onChange(this.model)
  }


  formGroup: FormGroup;
  subgroupOperatorCtrl = new FormControl(null, Validators.required);
  dynamicFormControls: DynamicFormControl[] = [];

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    fb: FormBuilder
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.formGroup = fb.group({
      subgroupOperatorCtrl: this.subgroupOperatorCtrl
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


  addClassTypeCtrl(index, data) {
    const f: DynamicFormControl = {
      key: '_' + index,
      component: 'class-and-type-filter',
      ctrl: new FormControl(data) // TODO add subgroup validator
    };
    this.dynamicFormControls.push(f);
    this.formGroup.addControl(f.key, f.ctrl)
  }

  addPropertyCtr(index, data) {
    const f: DynamicFormControl = {
      key: '_' + index,
      component: 'property-filter',
      ctrl: new FormControl(data) // TODO add subgroup validator
    }
    this.dynamicFormControls.push(f);
    this.formGroup.addControl(f.key, f.ctrl)
  }

  addSubgroupCtrl(index, data) {
    const f: DynamicFormControl = {
      key: '_' + index,
      component: 'subgroup',
      ctrl: new FormControl(data) // TODO add subgroup validator
    }
    this.dynamicFormControls.push(f);
    this.formGroup.addControl(f.key, f.ctrl)
  }

  protected addCrtl(child: FilterTree, index: number, data: FilterTreeData) {
    if ((child && child.data && child.data.subgroup)) {
      this.addSubgroupCtrl(index, child);
    } else {
      if (data.subgroup === 'classAndType') {
        this.addClassTypeCtrl(index, child);
      } else if (data.subgroup === 'property') {
        this.addPropertyCtr(index, child);
      }
    }
  }

  protected removeCtrl(index: number) {
    const key = this.dynamicFormControls[index].key;
    this.dynamicFormControls.splice(index, 1)
    this.formGroup.removeControl(key)
  }

  writeValue(value: FilterTree | null): void {
    const data = value && value.data ? value.data : {};
    const children = value && value.children && value.children.length ?
      value.children : [new FilterTree()];



    // remove controls
    this.dynamicFormControls = [];
    const [subgroupOperatorCtrl, ...ctrlsToRemove] = keys(this.formGroup.controls) as string[];
    ctrlsToRemove.forEach(ctrlName => this.formGroup.removeControl(ctrlName))

    // add controls
    children.forEach((child, index) => { this.addCrtl(child, index, data); })

    this.value = {
      data: { operator: 'AND', ...data, },
      children
    };

    // set operator value
    this.subgroupOperatorCtrl.setValue(this.value.data.operator);




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
  selector: 'gv-subgroup',
  templateUrl: './subgroup.component.html',
  styleUrls: ['./subgroup.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: SubgroupComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class SubgroupComponent extends SubgroupMatControl implements OnDestroy, AfterViewInit {

  @ViewChildren(SubgroupComponent) subgroups: QueryList<SubgroupComponent>;
  @ViewChildren(ClassAndTypeSelectComponent) classAndTypeSelects: QueryList<ClassAndTypeSelectComponent>;
  @ViewChildren(PropertyFilterComponent) operatorSelects: QueryList<PropertyFilterComponent>;

  @Input() qtree: FilterTree; // TODO remove this line
  @Input() level = 0; // level of component nesting, 0...n

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  @Input() model: FilterTree;
  @Input() propertyOptions$: Observable<PropertyOption[]>;
  @Input() pkClasses$: Observable<number[]>;
  @Input() hideParentLine = false;


  @Output() remove = new EventEmitter<void>();
  @Output() merge = new EventEmitter<FilterTree>();
  @Output() validChanged = new EventEmitter<boolean>();
  valid: boolean;

  constructor(@Optional() @Self() public ngControl: NgControl,
    fb: FormBuilder) {
    super(ngControl, fb)

    this.formGroup.valueChanges
      .pipe(distinctUntilChanged(equals), delay(0), takeUntil(this.destroy$))
      .subscribe(() => {
        const data: FilterTreeData = (this.value || { data: {} }).data;
        const children: FilterTree[] = []
        keys(this.formGroup.value).forEach(key => {
          const val = this.formGroup.value[key];
          if (key === 'subgroupOperatorCtrl') {
            data.operator = val;
          } else {
            children.push(val)
          }
        })

        this.value = { data, children };
      })
  }


  ngAfterViewInit() {

    const subgroups$ = this.subgroups.changes.pipe(startWith(this.subgroups), map(() => this.subgroups))
    const classAndTypeSelects$ = this.classAndTypeSelects.changes.pipe(startWith(this.classAndTypeSelects), map(() => this.classAndTypeSelects))
    const operatorSelects$ = this.operatorSelects.changes.pipe(startWith(this.operatorSelects), map(() => this.operatorSelects))

    // Observe if there is some invalid child components
    zip(subgroups$, classAndTypeSelects$, operatorSelects$).pipe(
      mergeMap(qlists => {
        const validChangedEmitters = flatten(qlists.map((qlist: QueryList<any>) => qlist.map(a => new BehaviorSubject(a.valid).pipe(merge(a.validChanged)))))
        return combineLatest(validChangedEmitters as any as Observable<boolean>[])
      }),
      takeUntil(this.destroy$)
    ).subscribe(x => {
      // if one of the child components is not true (=valid), set valid to false else to true
      this.setValid((x.filter(y => y !== true).length > 0 ? false : true))
    })
  }

  addSubgroup(i) {
    const childCopy = this.model.children[i];
    this.model.children[i] = new FilterTree({
      subgroup: this.model.data.subgroup,
      operator: 'OR'
    }, [
        childCopy,
        new FilterTree()
      ])

  }

  addSibling() {
    const i = this.value.children.length;
    this.addCrtl(new FilterTree(), i, this.value.data);
  }

  removeChild(i) {
    this.removeCtrl(i);

    if (this.dynamicFormControls.length === 0) this.remove.emit();

    else if (this.model.children.length === 1) this.merge.emit(this.dynamicFormControls[0].ctrl.value);
  }

  mergeChild(i: number, child: FilterTree) {
    this.removeCtrl(i);
    this.addCrtl(child, i, this.value.data);
  }

  setValid(valid: boolean) {
    this.valid = valid
    this.validChanged.emit(this.valid)
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
