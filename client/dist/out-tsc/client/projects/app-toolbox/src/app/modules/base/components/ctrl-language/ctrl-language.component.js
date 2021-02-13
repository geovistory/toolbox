var CtrlLanguageComponent_1;
import * as tslib_1 from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, EventEmitter, Output, Optional, Self, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { MatInput, MatAutocompleteTrigger } from '@angular/material';
let CtrlLanguageComponent = CtrlLanguageComponent_1 = class CtrlLanguageComponent {
    constructor(ngControl, languageApi) {
        this.ngControl = ngControl;
        this.languageApi = languageApi;
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        this.stateChanges = new Subject();
        this.focused = false;
        this.errorState = false;
        this.controlType = 'ctrl-language';
        this.id = `ctrl-language-${CtrlLanguageComponent_1.nextId++}`;
        this.describedBy = '';
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this._required = false;
        this._disabled = false;
        this.formControl = new FormControl(null);
        this.searchTerm$ = new BehaviorSubject('');
        this.searching = false;
        this.searchFailed = false;
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
        this.formControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
            this.value = value;
        });
        this.options$ = this.searchTerm$.pipe(debounceTime(200), distinctUntilChanged(), tap(() => this.searching = true), switchMap(term => this.languageApi.queryByString(term).pipe(tap(() => this.searchFailed = false), catchError(() => {
            this.searchFailed = true;
            return of([]);
        }))), tap(() => this.searching = false));
    }
    get empty() {
        return this.model ? false : true;
    }
    get shouldLabelFloat() { return this.focused || !this.empty; }
    get placeholder() { return this._placeholder; }
    set placeholder(value) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    get required() { return this._required; }
    set required(value) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    get disabled() { return this._disabled; }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        // TODO implement some disable state
        // this._disabled ? this.parts.disable() : this.parts.enable();
        this.stateChanges.next();
    }
    get value() {
        return this.model;
    }
    set value(value) {
        if (!value || !value.pk_entity) {
            this.model = undefined;
        }
        else {
            this.model = value;
        }
        this.onChange(this.model);
    }
    searchTermChanged(term) {
        this.searchTerm$.next(term);
    }
    displayFn(lang) {
        return lang ? lang.notes : undefined;
    }
    ngDoCheck() {
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
    setDescribedByIds(ids) {
        this.describedBy = ids.join(' ');
    }
    onContainerClick() {
        // TODO: implement this
        this.matInput.focus();
        setTimeout(() => {
            this.matAutocompleteTrigger.openPanel();
        });
        // this.onFocus()
        // this.searchTerm$.next('')
    }
    writeValue(value) {
        this.formControl.setValue(value);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    onBlur() {
        this.onTouched();
        this.blur.emit();
        this.focused = false;
        if (this.empty)
            this.formControl.setValue(undefined);
    }
    onFocus() {
        this.focus.emit();
        this.searchTerm$.next('');
        this.focused = true;
    }
};
CtrlLanguageComponent.nextId = 0;
tslib_1.__decorate([
    ViewChild(MatInput, { static: false })
], CtrlLanguageComponent.prototype, "matInput", void 0);
tslib_1.__decorate([
    ViewChild(MatAutocompleteTrigger, { static: false })
], CtrlLanguageComponent.prototype, "matAutocompleteTrigger", void 0);
tslib_1.__decorate([
    Output()
], CtrlLanguageComponent.prototype, "blur", void 0);
tslib_1.__decorate([
    Output()
], CtrlLanguageComponent.prototype, "focus", void 0);
tslib_1.__decorate([
    Input()
], CtrlLanguageComponent.prototype, "placeholder", null);
tslib_1.__decorate([
    Input()
], CtrlLanguageComponent.prototype, "required", null);
tslib_1.__decorate([
    Input()
], CtrlLanguageComponent.prototype, "disabled", null);
tslib_1.__decorate([
    Input()
], CtrlLanguageComponent.prototype, "value", null);
CtrlLanguageComponent = CtrlLanguageComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'gv-ctrl-language',
        templateUrl: './ctrl-language.component.html',
        styleUrls: ['./ctrl-language.component.css'],
        providers: [{ provide: MatFormFieldControl, useExisting: CtrlLanguageComponent_1 }],
    }),
    tslib_1.__param(0, Optional()), tslib_1.__param(0, Self())
], CtrlLanguageComponent);
export { CtrlLanguageComponent };
//# sourceMappingURL=ctrl-language.component.js.map