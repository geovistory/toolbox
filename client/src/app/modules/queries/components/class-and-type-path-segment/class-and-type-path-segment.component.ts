import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, OnDestroy, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilterTreeData } from '../../containers/query-detail/query-detail.component';
import { QueryService } from '../../services/query.service';
import { ClassesAndTypes } from '../class-and-type-filter/class-and-type-filter.component';
import { QueryPathSegment } from '../col-def-editor/col-def-editor.component';
import { PropertyOption } from '../property-select/property-select.component';



@Component({
  selector: 'gv-class-and-type-path-segment',
  templateUrl: './class-and-type-path-segment.component.html',
  styleUrls: ['./class-and-type-path-segment.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: ClassAndTypePathSegmentComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class ClassAndTypePathSegmentComponent implements OnDestroy, ControlValueAccessor, MatFormFieldControl<QueryPathSegment> {
  static nextId = 0;
  @Input() index: number;
  @Output() remove = new EventEmitter<void>();
  @Input() pkClasses$: Observable<number[]>;
  
  model: QueryPathSegment;

  // emits true on destroy of this component
  autofilled?: boolean;
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'class-and-type-path-segment';
  id = `class-and-type-path-segment-${ClassAndTypePathSegmentComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => { };
  onTouched = () => { };

  get empty() {
    if (!this.model || !this.model.data) return true;
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

    // TODO implement some disable state
    // this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): QueryPathSegment | null {

    // TODO: Adapt, when it is invalid and null is returned
    if (!this.empty) return null;

    return this.model;
  }
  set value(value: QueryPathSegment | null) {
    this.model = value;
    this.onChange(this.model)
  }


  selectedClassesAndTypes$ = new BehaviorSubject<ClassesAndTypes | null>(null);

  // the propertyOptions get derived from the selectedClasses
  propertyOptions$ = new BehaviorSubject<PropertyOption[] | null>(null);

  get selectedClassesAndTypes() {
    return this.selectedClassesAndTypes$.value;
  }
  set selectedClassesAndTypes(val: ClassesAndTypes) {
    this.selectedClassesAndTypes$.next(val)
  }


  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private q: QueryService
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.selectedClassesAndTypes$.pipe(
      this.q.propertiesOfClassesAndTypes(),
      takeUntil(this.destroy$)
    ).subscribe(propertyOptions => {
      this.propertyOptions$.next(propertyOptions)
    })

  }

  // when tree data changes (object without children)
  treeDataChange(treeData: FilterTreeData) {
    this.selectedClassesAndTypes = {
      classes: treeData.classes || [],
      types: treeData.types || []
    };
  }

  // When user changes the model
  onModelChange(val) {
    this.value = val;
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
