import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, forwardRef, Input, EventEmitter, Output, OnDestroy, Optional, Self, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject, BehaviorSubject, of, Observable } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { InfLanguage } from "projects/toolbox/src/app/core/sdk";
import { InfLanguageApi } from "projects/toolbox/src/app/core/sdk";
import { MatInput, MatAutocompleteTrigger } from '@angular/material';

export type CtrlLanguageModel = InfLanguage;

@Component({
  selector: 'gv-ctrl-language',
  templateUrl: './ctrl-language.component.html',
  styleUrls: ['./ctrl-language.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: CtrlLanguageComponent }],
})
export class CtrlLanguageComponent implements OnDestroy, ControlValueAccessor, MatFormFieldControl<CtrlLanguageModel> {
  static nextId = 0;

  model: CtrlLanguageModel;
  @ViewChild(MatInput, { static: false }) matInput: MatInput;
  @ViewChild(MatAutocompleteTrigger, { static: false }) matAutocompleteTrigger: MatAutocompleteTrigger;

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  autofilled?: boolean;
  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'ctrl-language';
  id = `ctrl-language-${CtrlLanguageComponent.nextId++}`;
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
  get value(): CtrlLanguageModel | null {
    return this.model;
  }
  set value(value: CtrlLanguageModel | null) {
    if (!value || !value.pk_entity) {
      this.model = undefined
    } else {
      this.model = value;
    }

    this.onChange(this.model)
  }


  formControl = new FormControl(null);
  searchTerm$ = new BehaviorSubject<string>('');
  searching = false;
  searchFailed = false
  options$: Observable<InfLanguage[]>

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private languageApi: InfLanguageApi

  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.formControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.value = value;
    })

    this.options$ = this.searchTerm$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.languageApi.queryByString(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )
  }

  searchTermChanged(term) {
    this.searchTerm$.next(term)
  }
  displayFn(lang?: InfLanguage): string | undefined {
    return lang ? lang.notes : undefined;
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
    // TODO: implement this
    this.matInput.focus()
    setTimeout(() => {
      this.matAutocompleteTrigger.openPanel()
    })
    // this.onFocus()
    // this.searchTerm$.next('')

  }

  writeValue(value: CtrlLanguageModel | null): void {
    this.formControl.setValue(value);
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
    if (this.empty) this.formControl.setValue(undefined)
  }

  onFocus() {
    this.focus.emit()
    this.searchTerm$.next('')
    this.focused = true;
  }

}
