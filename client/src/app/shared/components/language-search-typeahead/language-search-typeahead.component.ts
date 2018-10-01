import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InfLanguage, InfLanguageApi } from 'app/core';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, mergeMap, merge } from 'rxjs/operators';


@Component({
  selector: 'gv-language-search-typeahead',
  templateUrl: './language-search-typeahead.component.html',
  styleUrls: ['./language-search-typeahead.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LanguageSearchTypeaheadComponent),
      multi: true
    }
  ],
})
export class LanguageSearchTypeaheadComponent implements OnInit, ControlValueAccessor {

  //Language search
  public languageSearch: any;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => {
    this.searching = false
  });

  @Input() language: InfLanguage;

  @Output() languageChange = new EventEmitter();

  @Output() touched: EventEmitter<void> = new EventEmitter();

  searchTerm$ = new Subject<string>();

  formGroup: FormGroup;

  formControl: FormControl;

  constructor(
    private fb: FormBuilder,
    private languageApi: InfLanguageApi
  ) {
    function validateLanguage(c: FormControl) {

      // if no lang or just a string
      if (!c.value || typeof c.value === 'string') {

        // return error
        return {
          validateLanguage: {
            valid: false
          }
        }
      } else {
        // else there is no error
        return null;
      }

    }

    this.formControl = new FormControl(
      this.language,
      [
        validateLanguage
      ]);



  }

  ngOnInit() {

    this.formGroup = this.fb.group({
      language: this.formControl
    })

    this.formGroup.valueChanges.subscribe(val => {
      if (this.formGroup.valid) {
        this.languageChange.emit(new InfLanguage(val.language));
        this.onChange(new InfLanguage(val.language))
      } else {
        this.languageChange.emit();
        this.onChange(null)
      }
    })


  }


  search = (text$: Observable<string>) =>
    text$.pipe(
      merge(this.searchTerm$),
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
    );



  focus() {
    this.searchTerm$.next('');
  }

  formatter = (x) => x.notes;

  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(language: InfLanguage): void {

    this.formControl.setValue(language)

  }

  /**
   * Allows Angular to register a function to call when the model changes.
   * Save the function as a property to call later here.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * gets replaced by angular on registerOnChange
   * This function helps to type the onChange function for the use in this class.
   */
  onChange = (language: InfLanguage | null) => {
  };

  /**
   * Allows Angular to register a function to call when the input has been touched.
   * Save the function as a property to call later here.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * gets replaced by angular on registerOnTouched
   * Call this function when the form has been touched.
   */
  onTouched = () => {
  };


}
