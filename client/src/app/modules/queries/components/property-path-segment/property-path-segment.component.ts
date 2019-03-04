import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, forwardRef, Input, OnDestroy, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject, Observable } from 'rxjs';
import { ColDefTree } from '../col-def-editor/col-def-editor.component';



@Component({
  selector: 'gv-property-path-segment',
  templateUrl: './property-path-segment.component.html',
  styleUrls: ['./property-path-segment.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: PropertyPathSegmentComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class PropertyPathSegmentComponent implements OnDestroy, ControlValueAccessor, MatFormFieldControl<ColDefTree> {
  static nextId = 0;

  model: ColDefTree;
  @Input() selectedClasses$: Observable<number[]>

  // emits true on destroy of this component
  autofilled?: boolean;
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'property-path-segment';
  id = `property-path-segment-${PropertyPathSegmentComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => { };
  onTouched = () => { };

  get empty() {
    return this.model && this.model.data && this.model.data.label ? false : true;
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

    // TODO implement some disable state
    // this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): ColDefTree | null {

    // TODO: Adapt, when it is invalid and null is returned
    if (!this.model || !this.model.data || !this.model.data.label) return null;

    return this.model;
  }
  set value(value: ColDefTree | null) {
    this.model = value;
  }


  constructor(
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  // TODO: Adapt way of changing the value
  newFoo(val) {
    this.value = {
      foo: val
    };
    this.onChange(this.value)
  }

  addChild(){
    this.model.children.push(new ColDefTree({}))
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

  writeValue(value: ColDefTree | null): void {
    this.value = value;
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
