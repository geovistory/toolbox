import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Optional, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { InfAppellation, QuillDoc, SysConfigFormCtrlType } from '@kleiolab/lib-sdk-lb4';
import { Subject } from 'rxjs';
import { QuillEditComponent } from '../../../../modules/quill/quill-edit/quill-edit.component';
import { MatInputModule } from '@angular/material/input';
import { QuillModule } from '../../../quill/quill.module';
import { NgClass, NgIf } from '@angular/common';

export type CtrlAppellationModel = InfAppellation;

@Component({
    selector: 'gv-ctrl-appellation',
    templateUrl: './ctrl-appellation.component.html',
    styleUrls: ['./ctrl-appellation.component.scss'],
    providers: [{ provide: MatFormFieldControl, useExisting: CtrlAppellationComponent }],
    standalone: true,
    imports: [
        NgClass,
        QuillModule,
        NgIf,
        MatInputModule,
    ],
})
export class CtrlAppellationComponent implements OnDestroy, ControlValueAccessor, MatFormFieldControl<CtrlAppellationModel> {
  static nextId = 0;

  model: CtrlAppellationModel;
  @Input() type: SysConfigFormCtrlType.AppellationEnum = 'true'

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();
  @Output() textChange = new EventEmitter<string>();

  @ViewChild(QuillEditComponent) quillEditComponent: QuillEditComponent;

  autofilled?: boolean;
  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'ctrl-appellation';
  id = `ctrl-appellation-${CtrlAppellationComponent.nextId++}`;
  describedBy = '';

  errorState = false;
  private _placeholder: string;
  private _required = false;
  private _disabled = false;





  /*****
   * SPECIFIC IMPLEMENTATIONS
   */

  quillDoc: QuillDoc;
  fkClass: number

  get empty() {
    return this.model ? false : true;
  }

  get shouldLabelFloat() { return this.focused || !this.empty }

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

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
  onChange = (_: any) => { };
  onTouched = () => { };

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private ref: ChangeDetectorRef
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  valueChange(quillDoc: QuillDoc) {
    this.textChange.emit(quillDoc.ops.map(e => e.insert).join(''));

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

  keydown(event) {
    console.log(event)
  }

}
