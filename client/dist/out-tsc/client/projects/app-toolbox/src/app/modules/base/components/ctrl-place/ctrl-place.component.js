var CtrlPlaceComponent_1;
import * as tslib_1 from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, EventEmitter, Output, Optional, Self, ViewChild } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs/operators';
let CtrlPlaceComponent = CtrlPlaceComponent_1 = class CtrlPlaceComponent {
    constructor(ngControl) {
        this.ngControl = ngControl;
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        this.stateChanges = new Subject();
        this.focused = false;
        this.errorState = false;
        this.controlType = 'ctrl-place';
        this.id = `ctrl-place-${CtrlPlaceComponent_1.nextId++}`;
        this.describedBy = '';
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this._required = false;
        this._disabled = false;
        this.focused$ = new BehaviorSubject(this.focused);
        this.value$ = new BehaviorSubject(this.model); // needed for rx way of checking should label float
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
        this.focused$.pipe(takeUntil(this.destroy$), filter(f => f !== null), debounceTime(20), distinctUntilChanged()).subscribe(focused => {
            console.log('focused', focused);
            if (focused)
                this.onFocus();
            else
                this.onBlur();
        });
        this.shouldLabelFloat$ = combineLatest(this.focused$, this.value$).pipe(map(([focused, model]) => (!!focused || (model && (model.lat || model.long))) ? true : false), tap(x => { this.shouldLabelFloat = x; }));
    }
    get empty() {
        return this.lat || this.long ? false : true;
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
        if (value && (value.lat !== 0 && !value.lat) || value && (value.long !== 0 && !value.long)) {
            this.model = undefined;
        }
        else {
            this.model = Object.assign({}, this.initial, value);
        }
        this.onChange(this.model);
        this.value$.next(value);
    }
    latChanged(lat) {
        this.lat = lat;
        this.value = Object.assign({}, this.value, { fk_class: this.fkClass, lat, long: this.long });
    }
    longChanged(long) {
        this.long = long;
        this.value = Object.assign({}, this.value, { fk_class: this.fkClass, long, lat: this.lat });
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
        this.initial = value;
        if (value && value.lat)
            this.lat = value.lat;
        if (value && value.long)
            this.long = value.long;
        if (value && value.fk_class)
            this.fkClass = value.fk_class;
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
    initFocus() {
        this.focused$.next(true);
        setTimeout(() => {
            this.firstInput.nativeElement.focus();
        }, 100);
    }
};
CtrlPlaceComponent.nextId = 0;
tslib_1.__decorate([
    Output()
], CtrlPlaceComponent.prototype, "blur", void 0);
tslib_1.__decorate([
    Output()
], CtrlPlaceComponent.prototype, "focus", void 0);
tslib_1.__decorate([
    Input()
], CtrlPlaceComponent.prototype, "placeholder", null);
tslib_1.__decorate([
    Input()
], CtrlPlaceComponent.prototype, "required", null);
tslib_1.__decorate([
    Input()
], CtrlPlaceComponent.prototype, "disabled", null);
tslib_1.__decorate([
    Input()
], CtrlPlaceComponent.prototype, "value", null);
tslib_1.__decorate([
    ViewChild('firstInput', { static: true })
], CtrlPlaceComponent.prototype, "firstInput", void 0);
CtrlPlaceComponent = CtrlPlaceComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'gv-ctrl-place',
        templateUrl: './ctrl-place.component.html',
        styleUrls: ['./ctrl-place.component.css'],
        providers: [{ provide: MatFormFieldControl, useExisting: CtrlPlaceComponent_1 }],
    }),
    tslib_1.__param(0, Optional()), tslib_1.__param(0, Self())
], CtrlPlaceComponent);
export { CtrlPlaceComponent };
//# sourceMappingURL=ctrl-place.component.js.map