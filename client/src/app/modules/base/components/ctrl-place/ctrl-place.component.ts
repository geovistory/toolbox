import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, forwardRef, Input, EventEmitter, Output, OnDestroy, Optional, Self, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject, BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { InfPlace } from 'app/core';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil, tap } from '../../../../../../node_modules/rxjs/operators';

type CtrlModel = InfPlace

@Component({
  selector: 'gv-ctrl-place',
  templateUrl: './ctrl-place.component.html',
  styleUrls: ['./ctrl-place.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: CtrlPlaceComponent }],
})
export class CtrlPlaceComponent implements OnDestroy, ControlValueAccessor, MatFormFieldControl<CtrlModel> {
  static nextId = 0;

  model: CtrlModel;

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  autofilled?: boolean;
  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'ctrl-place';
  id = `ctrl-place-${CtrlPlaceComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => { };
  onTouched = () => { };

  get empty() {
    return this.lat || this.long ? false : true;
  }

  shouldLabelFloat: boolean;

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
  get value(): CtrlModel | null {
    return this.model;
  }
  set value(value: CtrlModel | null) {
    if (value && (value.lat !== 0 && !value.lat) || value && (value.long !== 0 && !value.long)) {
      this.model = undefined
    } else {
      this.model = {
        ...this.initial,
        ...value
      };
    }
    this.onChange(this.model)
    this.value$.next(value)
  }

  @ViewChild('firstInput', { static: true }) firstInput: ElementRef;

  focused$ = new BehaviorSubject(this.focused);
  value$ = new BehaviorSubject(this.model); // needed for rx way of checking should label float
  shouldLabelFloat$: Observable<boolean>; // needed for rx way of checking should label float
  lat: number
  long: number
  fkClass: number
  initial: InfPlace;

  constructor(
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.focused$.pipe(
      takeUntil(this.destroy$),
      filter(f => f !== null),
      debounceTime(20),
      distinctUntilChanged(),
    ).subscribe(focused => {
      console.log('focused', focused)
      if (focused) this.onFocus()
      else this.onBlur()
    })

    this.shouldLabelFloat$ = combineLatest(this.focused$, this.value$).pipe(
      map(([focused, model]) => (!!focused || (model && (model.lat || model.long))) ? true : false),
      tap(x => { this.shouldLabelFloat = x })
    )
  }

  latChanged(lat: number) {
    this.lat = lat
    this.value = {
      ...this.value,
      fk_class: this.fkClass,
      lat,
      long: this.long
    }
  }
  longChanged(long: number) {
    this.long = long
    this.value = {
      ...this.value,
      fk_class: this.fkClass,
      long,
      lat: this.lat
    }
  }


  ngDoCheck(): void {
    if (this.ngControl) {
      this.errorState = this.ngControl.invalid && this.ngControl.touched;
      this.stateChanges.next();
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

  writeValue(value: CtrlModel | null): void {
    this.value = value;
    this.initial = value;
    if (value && value.lat) this.lat = value.lat
    if (value && value.long) this.long = value.long
    if (value && value.fk_class) this.fkClass = value.fk_class
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

  onBlur() {
    this.onTouched();
    this.blur.emit()
    this.focused = false;
  }

  onFocus() {
    this.focus.emit()
    this.focused = true;
  }

  initFocus() {
    this.focused$.next(true)
    setTimeout(() => {
      this.firstInput.nativeElement.focus()
    }, 100);
  }

}
