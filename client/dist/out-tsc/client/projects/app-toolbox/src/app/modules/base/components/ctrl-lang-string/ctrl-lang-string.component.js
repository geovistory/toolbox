var CtrlLangStringComponent_1;
import * as tslib_1 from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, EventEmitter, Output, Optional, Self } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { takeUntil, filter, distinctUntilChanged, debounceTime, map, tap } from 'rxjs/operators';
let CtrlLangStringComponent = CtrlLangStringComponent_1 = class CtrlLangStringComponent {
    constructor(ngControl) {
        this.ngControl = ngControl;
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        this.stateChanges = new Subject();
        this.focused = false;
        this.errorState = false;
        this.controlType = 'ctrl-lang-string';
        this.id = `ctrl-lang-string-${CtrlLangStringComponent_1.nextId++}`;
        this.describedBy = '';
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this._required = false;
        this._disabled = false;
        this.focused$ = new BehaviorSubject(null);
        this.value$ = new BehaviorSubject(this.model); // needed for rx way of checking should label float
        this.langCtrl = new FormControl();
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
        this.langCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((lang) => {
            this.languageChange(lang ? lang.pk_entity : undefined);
        });
        this.focused$.pipe(takeUntil(this.destroy$), filter(f => f !== null), debounceTime(20), distinctUntilChanged()).subscribe(focused => {
            console.log('focused', focused);
            if (focused)
                this.onFocus();
            else if (focused === false)
                this.onBlur();
        });
        this.shouldLabelFloat$ = combineLatest(this.focused$, this.value$).pipe(map(([focused, value]) => (!!focused || (value && (value.fk_language || this.isValidQuillDoc(value.quill_doc)))) ? true : false), tap(x => { this.shouldLabelFloat = x; }));
        this.shouldLabelFloat$.pipe(takeUntil(this.destroy$)).subscribe();
    }
    get empty() {
        return this.model ? false : true;
    }
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
        if (!value || !this.isValidQuillDoc(value.quill_doc)
            || !value.fk_language) {
            this.model = undefined;
        }
        else {
            this.model = value;
        }
        this.onChange(this.model);
        this.value$.next(value);
    }
    quillDocChange(quillDoc) {
        this.quillDoc = quillDoc;
        this.updateComposedValue();
    }
    languageChange(fkLanguage) {
        this.fkLanguage = fkLanguage;
        this.updateComposedValue();
    }
    updateComposedValue() {
        this.value = Object.assign({}, this.value, { fk_language: this.fkLanguage, quill_doc: this.quillDoc });
    }
    isValidQuillDoc(qillDoc) {
        if (!this.quillDoc || !this.quillDoc.ops || this.quillDoc.ops.length < 1
            || (this.quillDoc.ops.length === 1 && this.quillDoc.ops[0].insert === '\n')) {
            return false;
        }
        return true;
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
    onContainerClick(event) {
        // TODO: implement this
    }
    writeValue(value) {
        this.value = value;
        if (value && value.quill_doc)
            this.quillDoc = value.quill_doc;
        if (value && value.fk_language)
            this.fkLanguage = value.fk_language;
        this.langCtrl.setValue(value ? value.language : null);
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
    }
    onFocus() {
        this.focus.emit();
        this.focused = true;
    }
};
CtrlLangStringComponent.nextId = 0;
tslib_1.__decorate([
    Output()
], CtrlLangStringComponent.prototype, "blur", void 0);
tslib_1.__decorate([
    Output()
], CtrlLangStringComponent.prototype, "focus", void 0);
tslib_1.__decorate([
    Input()
], CtrlLangStringComponent.prototype, "placeholder", null);
tslib_1.__decorate([
    Input()
], CtrlLangStringComponent.prototype, "required", null);
tslib_1.__decorate([
    Input()
], CtrlLangStringComponent.prototype, "disabled", null);
tslib_1.__decorate([
    Input()
], CtrlLangStringComponent.prototype, "value", null);
CtrlLangStringComponent = CtrlLangStringComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'gv-ctrl-lang-string',
        templateUrl: './ctrl-lang-string.component.html',
        styleUrls: ['./ctrl-lang-string.component.css'],
        providers: [{ provide: MatFormFieldControl, useExisting: CtrlLangStringComponent_1 }],
    }),
    tslib_1.__param(0, Optional()), tslib_1.__param(0, Self())
], CtrlLangStringComponent);
export { CtrlLangStringComponent };
//# sourceMappingURL=ctrl-lang-string.component.js.map