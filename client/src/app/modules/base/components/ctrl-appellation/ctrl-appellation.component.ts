import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, forwardRef, Input, EventEmitter, Output, OnDestroy, Optional, Self, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { InfAppellation } from "app/core/sdk";
import { QuillDoc } from 'app/modules/quill';
import { QuillEditComponent } from 'app/modules/quill/quill-edit/quill-edit.component';

export type CtrlAppellationModel = InfAppellation;

@Component({
  selector: 'gv-ctrl-appellation',
  templateUrl: './ctrl-appellation.component.html',
  styleUrls: ['./ctrl-appellation.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: CtrlAppellationComponent }],

})
export class CtrlAppellationComponent implements OnDestroy, ControlValueAccessor, MatFormFieldControl<CtrlAppellationModel> {
  static nextId = 0;

  model: CtrlAppellationModel;

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  @ViewChild(QuillEditComponent, { static: false }) quillEditComponent: QuillEditComponent;

  autofilled?: boolean;
  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'ctrl-appellation';
  id = `ctrl-appellation-${CtrlAppellationComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => { };
  onTouched = () => { };

  get empty() {
    return this.model ? false : true;
  }

  get shouldLabelFloat() { return this.focused || !this.empty; }

  errorState = false;

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
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): CtrlAppellationModel | null {
    return this.model;
  }
  set value(value: CtrlAppellationModel | null) {


    if (
      !value || !value.quill_doc || !value.quill_doc.ops || value.quill_doc.ops.length < 1
      || (value.quill_doc.ops.length === 1 && value.quill_doc.ops[0].insert === '\n')
    ) {
      this.model = undefined;
    }
    else {
      this.model = value;
    }

    this.onChange(this.model)
  }





  /*****
   * SPECIFIC IMPLEMENTATIONS
   */

  quillDoc: QuillDoc;
  fkClass: number

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private ref: ChangeDetectorRef
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  valueChange(quillDoc: QuillDoc) {

    this.value = {
      ...this.value,
      fk_class: this.fkClass,
      quill_doc: quillDoc,
    };
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
    this.onFocus()
    this.quillEditComponent.focusOnEnd()
  }

  writeValue(value: CtrlAppellationModel | null): void {
    this.value = value;
    if (value && value.quill_doc) this.quillDoc = value.quill_doc
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
    this.focused = false;
    this.onTouched();
    this.blur.emit()
  }

  onFocus() {
    this.focus.emit()
    this.focused = true;
  }

}
