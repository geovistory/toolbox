var LanguageSearchTypeaheadComponent_1;
import * as tslib_1 from "tslib";
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InfLanguage } from '@kleiolab/lib-sdk-lb3';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, merge } from 'rxjs/operators';
let LanguageSearchTypeaheadComponent = LanguageSearchTypeaheadComponent_1 = class LanguageSearchTypeaheadComponent {
    constructor(fb, languageApi) {
        this.fb = fb;
        this.languageApi = languageApi;
        this.searching = false;
        this.searchFailed = false;
        this.hideSearchingWhenUnsubscribed = new Observable(() => () => {
            this.searching = false;
        });
        this.languageChange = new EventEmitter();
        this.touched = new EventEmitter();
        this.searchTerm$ = new Subject();
        this.onChangeRegistered = false;
        this.search = (text$) => text$.pipe(merge(this.searchTerm$), debounceTime(200), distinctUntilChanged(), tap(() => this.searching = true), switchMap(term => this.languageApi.queryByString(term).pipe(tap(() => this.searchFailed = false), catchError(() => {
            this.searchFailed = true;
            return of([]);
        }))), tap(() => this.searching = false));
        this.formatter = (x) => x.notes;
        /**
         * gets replaced by angular on registerOnChange
         * This function helps to type the onChange function for the use in this class.
         */
        this.onChange = (language) => {
            console.error('called before registerOnChange');
        };
        /**
         * gets replaced by angular on registerOnTouched
         * Call this function when the form has been touched.
         */
        this.onTouched = () => {
        };
        function validateLanguage(c) {
            // if no lang or just a string
            if (!c.value || typeof c.value === 'string') {
                // return error
                return {
                    validateLanguage: {
                        valid: false
                    }
                };
            }
            else {
                // else there is no error
                return null;
            }
        }
        this.formControl = new FormControl(this.language, [
            validateLanguage
        ]);
    }
    ngOnInit() {
        this.formGroup = this.fb.group({
            language: this.formControl
        });
        this.formGroup.valueChanges.subscribe(val => {
            this.validateAndEmit();
        });
    }
    validateAndEmit() {
        if (this.onChangeRegistered) {
            if (this.formGroup.valid) {
                this.languageChange.emit(new InfLanguage(this.formGroup.value.language));
                this.onChange(new InfLanguage(this.formGroup.value.language));
            }
            else {
                this.languageChange.emit();
                this.onChange(null);
            }
        }
    }
    focus() {
        this.searchTerm$.next('');
    }
    /****************************************
     *  ControlValueAccessor implementation *
     ****************************************/
    /**
     * Allows Angular to update the model.
     * Update the model and changes needed for the view here.
     */
    writeValue(language) {
        this.formControl.setValue(language);
        this.validateAndEmit();
    }
    /**
     * Allows Angular to register a function to call when the model changes.
     * Save the function as a property to call later here.
     */
    registerOnChange(fn) {
        this.onChange = fn;
        this.onChangeRegistered = true;
        this.validateAndEmit();
    }
    /**
     * Allows Angular to register a function to call when the input has been touched.
     * Save the function as a property to call later here.
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
};
tslib_1.__decorate([
    Input()
], LanguageSearchTypeaheadComponent.prototype, "language", void 0);
tslib_1.__decorate([
    Output()
], LanguageSearchTypeaheadComponent.prototype, "languageChange", void 0);
tslib_1.__decorate([
    Output()
], LanguageSearchTypeaheadComponent.prototype, "touched", void 0);
LanguageSearchTypeaheadComponent = LanguageSearchTypeaheadComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'gv-language-search-typeahead',
        templateUrl: './language-search-typeahead.component.html',
        styleUrls: ['./language-search-typeahead.component.scss'],
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => LanguageSearchTypeaheadComponent_1),
                multi: true
            }
        ],
    })
], LanguageSearchTypeaheadComponent);
export { LanguageSearchTypeaheadComponent };
//# sourceMappingURL=language-search-typeahead.component.js.map