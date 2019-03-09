import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, OnDestroy, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PropertyOption } from '../property-select/property-select.component';
import { QueryService } from '../../services/query.service';
import { QueryPathSegment } from '../col-def-editor/col-def-editor.component';



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
export class PropertyPathSegmentComponent implements OnDestroy, ControlValueAccessor, MatFormFieldControl<QueryPathSegment> {
  static nextId = 0;

  model: QueryPathSegment;
  @Input() propertyOptions$: Observable<PropertyOption[]>;
  @Output() remove = new EventEmitter<void>();
  @Input() index: number;

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
    if (!this.model || !this.model.data) return true;
    return [
      ...(this.model.data.ingoingProperties || []),
      ...(this.model.data.outgoingProperties || [])
    ].length === 0;  }

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
  get value(): QueryPathSegment | null {

    // TODO: Adapt, when it is invalid and null is returned
    if (this.empty) return null;

    return this.model;
  }
  set value(value: QueryPathSegment | null) {
    this.model = value;
    this.onChange(this.model)
  }

  // make the selected properties observable in order to pipe them
  // to the target pkClasses, that determin the options user
  // can select on the child path segment
  get selectedProperties() {
    return this.selectedProperties$.value;
  }
  set selectedProperties(val: PropertyOption[]) {
    this.selectedProperties$.next(val)
  }
  selectedProperties$ = new BehaviorSubject<PropertyOption[] | null>(null);

  // the pkClasses get derived from the selctedProperties
  pkClasses$ = new BehaviorSubject<number[] | null>(null);


  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private q: QueryService
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    // Next the new array of pkClasses, when the selected properties change
    this.selectedProperties$.pipe(
      this.q.targetClassesOfPropertyOptions(),
      takeUntil(this.destroy$)
    ).subscribe(pks => {
      this.pkClasses$.next(pks)
    })
  }

  // When user changes the model
  onModelChange(val) {
    this.value = val;
  }

  propertySelectionChange(selection){
    this.selectedProperties = selection;
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

  writeValue(value: QueryPathSegment | null): void {
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
