import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, forwardRef, Input, EventEmitter, Output, OnDestroy, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { CtrlTimeSpanDialogComponent, CtrlTimeSpanDialogData, CtrlTimeSpanDialogResult } from './ctrl-time-span-dialog/ctrl-time-span-dialog.component';
import { takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { TimeSpan } from 'app/core';

export type CtrlTimeSpanModel = CtrlTimeSpanDialogResult

@Component({
  selector: 'gv-ctrl-time-span',
  templateUrl: './ctrl-time-span.component.html',
  styleUrls: ['./ctrl-time-span.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: CtrlTimeSpanComponent }],
})
export class CtrlTimeSpanComponent implements OnDestroy, ControlValueAccessor, MatFormFieldControl<CtrlTimeSpanModel> {
  static nextId = 0;

  model: CtrlTimeSpanModel;

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  autofilled?: boolean;
  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'ctrl-time-span';
  id = `ctrl-time-span-${CtrlTimeSpanComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => { };
  onTouched = () => { };

  get empty() {
    return this.model ? false : true;
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
  get value(): CtrlTimeSpanModel | null {
    return this.model;
  }
  set value(value: CtrlTimeSpanModel | null) {
    if (
      !value || (!value[72] && !value[152] && !value[153] && !value[71] && !value[150] && !value[151])
    ) {
      this.model = undefined
    } else {
      this.model = value;
    }
    this.onChange(this.model)
    this.timeSpan = TimeSpan.fromTimeSpanDialogData(value)
  }


  timeSpan: TimeSpan;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private dialog: MatDialog,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }



  }

  openModal() {
    if (!this.disabled) {
      const data: CtrlTimeSpanDialogData = {
        timePrimitives: this.value
      }

      this.onFocus()

      const ref = this.dialog.open(CtrlTimeSpanDialogComponent, {
        width: '600px',
        data
      });

      ref.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result: CtrlTimeSpanDialogResult) => {
        if (result) this.value = result
        this.onBlur()
      });
    }
  }

  // TODO: Adapt way of changing the value
  newFoo(val: CtrlTimeSpanDialogResult) {
    this.value = val;
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


  onContainerClick() {
    this.openModal()
    this.onFocus()
  }

  writeValue(value: CtrlTimeSpanModel | null): void {
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
