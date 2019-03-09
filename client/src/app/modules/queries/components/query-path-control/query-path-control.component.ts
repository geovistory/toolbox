import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, forwardRef, Input, OnDestroy, Optional, Self, ViewChildren, QueryList } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { QueryPathSegment } from '../col-def-editor/col-def-editor.component';
import { PropertyOption } from '../property-select/property-select.component';
import { PropertyPathSegmentComponent } from '../property-path-segment/property-path-segment.component';
import { ClassAndTypePathSegmentComponent } from '../class-and-type-path-segment/class-and-type-path-segment.component';



@Component({
  selector: 'gv-query-path-control',
  templateUrl: './query-path-control.component.html',
  styleUrls: ['./query-path-control.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: QueryPathControlComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class QueryPathControlComponent implements OnDestroy, ControlValueAccessor, MatFormFieldControl<QueryPathSegment[]> {
  static nextId = 0;
  @ViewChildren(PropertyPathSegmentComponent) propertyPathSegments: QueryList<PropertyPathSegmentComponent>;
  @ViewChildren(ClassAndTypePathSegmentComponent) classAndTypePathSegments: QueryList<ClassAndTypePathSegmentComponent>;

  @Input() propertyOptions$: BehaviorSubject<PropertyOption[]>;

  model: QueryPathSegment[];

  // emits true on destroy of this component
  autofilled?: boolean;
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'query-path-control';
  id = `query-path-control-${QueryPathControlComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => { };
  onTouched = () => { };

  get empty() {
    return this.model.length ? false : true;
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
  get value(): QueryPathSegment[] | null {

    // TODO: Adapt, when it is invalid and null is returned
    if (!this.model.length) return null;

    return this.model;
  }
  set value(value: QueryPathSegment[] | null) {
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
      ...this.value
    };
    this.onChange(this.value)
  }



  // When user adds a next path segment
  addSegment?() {
    const type = this.model[this.model.length - 1].type === 'classes' ? 'properties' : 'classes';
    this.model.push(new QueryPathSegment({
      type
    }))
    this.onChange(this.model)
  }

  removeSegmentByIndex?(i: number) {
    this.model.splice(i, (this.model.length - 1))
    this.onChange(this.model)
  }

  getPkClassesObservable(i: number): BehaviorSubject<number[]> {
    return this.propertyPathSegments.find(segment => segment.index === (i - 1)).pkClasses$;
  }
  getPropertyOptionsObservable(i: number): BehaviorSubject<PropertyOption[]> {
    if (i === 0) return this.propertyOptions$;
    return this.classAndTypePathSegments.find(segment => segment.index === (i - 1)).propertyOptions$;
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

  writeValue(value: QueryPathSegment[] | null): void {
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
