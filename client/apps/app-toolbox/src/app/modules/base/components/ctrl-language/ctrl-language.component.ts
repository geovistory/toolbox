import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, OnDestroy, Optional, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NgControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteTrigger, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldControl } from '@angular/material/form-field';
import { InfLanguage, LanguagesService } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, takeUntil, tap } from 'rxjs/operators';
import { MatOptionModule } from '@angular/material/core';
import { NgFor, AsyncPipe } from '@angular/common';

export type CtrlLanguageModel = InfLanguage;

@Component({
    selector: 'gv-ctrl-language',
    templateUrl: './ctrl-language.component.html',
    styleUrls: ['./ctrl-language.component.css'],
    providers: [{ provide: MatFormFieldControl, useExisting: CtrlLanguageComponent }],
    standalone: true,
    imports: [
        MatInputModule,
        FormsModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        NgFor,
        MatOptionModule,
        AsyncPipe,
    ],
})
export class CtrlLanguageComponent implements OnDestroy, ControlValueAccessor, MatFormFieldControl<CtrlLanguageModel> {

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

    // TODO implement some disable state
    // this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }

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
  static nextId = 0;

  model: CtrlLanguageModel;
  @ViewChild(MatInput) matInput: MatInput;
  @ViewChild(MatAutocompleteTrigger) matAutocompleteTrigger: MatAutocompleteTrigger;

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
  private _placeholder: string;
  private _required = false;
  private _disabled = false;


  formControl = new UntypedFormControl(null);
  searchTerm$ = new BehaviorSubject<string>('');
  searching = false;
  searchFailed = false
  options$: Observable<InfLanguage[]>
  onChange = (_: any) => { };
  onTouched = () => { };

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private languageApi: LanguagesService,

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
        this.languageApi.findLanguagesControllerSearchInLanguages(term).pipe(
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
