import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren, Optional, Self, Directive } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelectChange } from '@angular/material/select';
import { ActiveProjectService } from 'app/core';
import { propertyFieldKeyFromParams } from 'app/core/state/services/state-creator';
import { equals, uniq } from 'ramda';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { FilterTree } from '../../containers/query-detail/query-detail.component';
import { ControlValueAccessor, NgControl, ValidatorFn, AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { TreeNodeData } from '../class-and-type-select/class-and-type-select.component';
import { TreeNode } from '@angular/router/src/utils/tree';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

export interface PropertyOption { propertyFieldKey: string, isOutgoing: boolean, pk: number, label: string };

export interface PropertySelectModel {
  outgoingProperties?: number[]
  ingoingProperties?: number[]
}

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
  providers: [{ provide: NG_VALIDATORS, useExisting: PropertiesRequiredValidatorDirective, multi: true }]
})
export class PropertiesRequiredValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    return propertiesRequiredValidator()(control);
  }
}


// tslint:disable: member-ordering
class PropertySelectMatControl implements OnDestroy, ControlValueAccessor, MatFormFieldControl<PropertySelectModel> {
  value: PropertySelectModel;
  static nextId = 0;

  model: PropertySelectModel;
  // the flattened selection
  selected: TreeNode<TreeNodeData>[]

  // emits true on destroy of this component
  autofilled?: boolean;
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'property-select';
  // tslint:disable-next-line: no-use-before-declare
  id = `property-select-${PropertySelectComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => { };
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
    // TODO: implement this

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
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class PropertySelectComponent extends PropertySelectMatControl implements AfterViewInit, OnDestroy, OnInit {

  @HostBinding('class.d-flex') dflex = true;

  @Input() level = 0; // level of component nesting, 0...n
  @Input() qtree: FilterTree; // TODO: remove this line
  @Input() options$: Observable<PropertyOption[]>;

  @Input()
  get value(): PropertySelectModel | null {
    // TODO
    if (!this.empty) return null;

    return this.model;
  }
  set value(value: PropertySelectModel | null) {
    this.model = value;
    this.onChange(this.model)
  }

  // @Input() filterTreeData$: Observable<FilterTreeData>;
  // @Input() selectedClasses$: Observable<number[]>;

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();
  @Output() selectionChanged = new EventEmitter<PropertyOption[]>();
  @Output() modelChanged = new EventEmitter<FilterTree>();

  @ViewChildren(MatOption) matOptions: QueryList<MatOption>;

  selected$: Observable<PropertyOption[]>;

  // selected: PropertyOption[];

  constructor(private ref: ChangeDetectorRef, public p: ActiveProjectService,
    @Optional() @Self() public ngControl: NgControl
  ) {
    super(ngControl)
  }

  ngOnInit() {
    const compare = (a, b) => {
      return false;
    }
    this.options$.pipe(
      distinctUntilChanged(compare),
      filter(options => !!options),
      map(options => options.filter(option => {
        const selectedIds = this.getSelectedIds();
        const thisId = option.propertyFieldKey
        return selectedIds.indexOf(thisId) > -1
      }))
    ).subscribe(selected => {
      this.setSelectedIds(selected);
      // this.selectionChanged.emit(selected);
    })


  }
  ngAfterViewInit() {

    this.reselectMatOptions();

    this.matOptions.changes.pipe(
      // distinctUntilChanged(compare),
      takeUntil(this.destroy$)
    ).subscribe(matOptions => {
      this.reselectMatOptions();
    })

  }

  writeValue(value: PropertySelectModel | null): void {

    this.value = value;
    this.reselectMatOptions();
  }


  reselectMatOptions() {
    if (this.matOptions && this.matOptions.length) {
      let changed = false;
      this.matOptions.forEach(matOption => {
        if (
          this.getSelectedIds().indexOf(matOption.id) > -1
          && !matOption.selected
        ) {
          matOption.select()
          changed = true;

        };
      });
      if (changed) this.ref.detectChanges()
    }
  }

  selectionChange(e: MatSelectChange) {

    const newSelection = uniq(e.value) as PropertyOption[];

    if (!equals(this.createSelectedIds(newSelection), this.getSelectedIds())) {
      this.setSelectedIds(newSelection)
    }
    this.selectionChanged.emit(newSelection);
  }

  private createSelectedIds(selected: PropertyOption[]): string[] {
    if (!selected) return [];
    return selected.map(x => x.propertyFieldKey);
  }

  private getSelectedIds(): string[] {
    return [
      ...((this.model || {}).ingoingProperties || []).map(pk => propertyFieldKeyFromParams(pk, false)),
      ...((this.model || {}).outgoingProperties || []).map(pk => propertyFieldKeyFromParams(pk, true)),
    ]
  }

  setSelectedIds(selected: PropertyOption[]) {
    this.value = {
      ...this.model,
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
