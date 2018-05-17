import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import { InfLanguage, InfLanguageApi } from 'app/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';



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


  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private languageApi: InfLanguageApi
  ) {

  }

  ngOnInit() {

    function validateLanguage(c: FormControl) {

      // if no lang or just a string
      if (!c.value ||  typeof c.value === 'string') {

        // return error
        return {
          validateLanguage: {
            valid: false
          }
        }
      }
      // else there is no error
      else {
        return null;
      }

    }

    const formControl = new FormControl(
      this.language,
      [
        validateLanguage
      ]);

    this.formGroup = this.fb.group({
      language: formControl
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
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.languageApi.queryByString(term)
          .do(() => this.searchFailed = false)
          .catch(() => {
            this.searchFailed = true;
            return Observable.of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed);

  formatter = (x) => x.notes;

  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(language: InfLanguage): void {

    this.language = language

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
