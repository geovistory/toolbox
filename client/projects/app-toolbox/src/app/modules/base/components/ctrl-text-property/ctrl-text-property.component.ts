import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, forwardRef, Input, EventEmitter, Output, OnDestroy, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { InfLanguage } from '@kleiolab/lib-sdk-lb3';
import { InfTextProperty } from '@kleiolab/lib-sdk-lb3';
import { QuillDoc } from '../../../quill';
import { takeUntil, filter, distinctUntilChanged, debounceTime, map, tap } from 'rxjs/operators';

type CtrlModel = InfTextProperty

@Component({
  selector: 'gv-ctrl-text-property',
  templateUrl: './ctrl-text-property.component.html',
  styleUrls: ['./ctrl-text-property.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: CtrlTextPropertyComponent }],
})
export class CtrlTextPropertyComponent implements OnDestroy, ControlValueAccessor, MatFormFieldControl<CtrlModel> {
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
  controlType = 'ctrl-text-property';
  id = `ctrl-text-property-${CtrlTextPropertyComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => { };
  onTouched = () => { };

  get empty() {
    return this.model ? false : true;
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

    if (
      !value || !this.isValidQuillDoc(value.quill_doc)
      || !value.fk_language
    ) {
      this.model = undefined;
    }
    else {
      this.model = value;
    }

    this.onChange(this.model)
    this.value$.next(value)

  }


  focused$ = new BehaviorSubject(null);
  value$ = new BehaviorSubject(this.model); // needed for rx way of checking should label float
  shouldLabelFloat$: Observable<boolean>; // needed for rx way of checking should label float

  fkLanguage: number
  fkClassField: number
  quillDoc: QuillDoc
  fkEntity: number

  langCtrl = new FormControl()

  constructor(
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.langCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((lang: InfLanguage) => {
      this.languageChange(lang ? lang.pk_entity : undefined)
    })

    this.focused$.pipe(
      takeUntil(this.destroy$),
      filter(f => f !== null),
      debounceTime(20),
      distinctUntilChanged(),
    ).subscribe(focused => {
      console.log('focused', focused)
      if (focused) this.onFocus()
      else if (focused === false) this.onBlur()
    })
    this.shouldLabelFloat$ = combineLatest(this.focused$, this.value$).pipe(
      map(([focused, value]) => (!!focused || (value && (value.fk_language || this.isValidQuillDoc(value.quill_doc)))) ? true : false),
      tap(x => { this.shouldLabelFloat = x })
    )
    this.shouldLabelFloat$.pipe(takeUntil(this.destroy$)).subscribe()
  }

  quillDocChange(quillDoc: QuillDoc) {
    this.quillDoc = quillDoc
    this.updateComposedValue()

  }

  languageChange(fkLanguage: number) {
    this.fkLanguage = fkLanguage
    this.updateComposedValue()
  }

  updateComposedValue() {
    let composed = {}
    if (this.fkClassField) composed = { ...composed, fk_class_field: this.fkClassField }
    if (this.fkEntity) composed = { ...composed, fk_concerned_entity: this.fkEntity }
    this.value = {
      ...this.value,
      fk_language: this.fkLanguage,
      quill_doc: this.quillDoc,
      ...composed
    };
  }

  isValidQuillDoc(qillDoc: QuillDoc): boolean {
    if (!this.quillDoc || !this.quillDoc.ops || this.quillDoc.ops.length < 1
      || (this.quillDoc.ops.length === 1 && this.quillDoc.ops[0].insert === '\n')) {
      return false
    }
    return true
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
    if (value && value.quill_doc) this.quillDoc = value.quill_doc
    if (value && value.fk_class_field) this.fkClassField = value.fk_class_field
    if (value && value.fk_language) this.fkLanguage = value.fk_language
    if (value && value.fk_concerned_entity) this.fkEntity = value.fk_concerned_entity
    this.langCtrl.setValue(value ? value.language : null)

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
