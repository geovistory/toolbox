var CtrlTypeComponent_1;
import * as tslib_1 from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Optional, Output, Self, ViewChild } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { sortAbc } from 'projects/app-toolbox/src/app/core';
import { combineLatestOrEmpty } from 'projects/app-toolbox/src/app/core/util/combineLatestOrEmpty';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
let CtrlTypeComponent = CtrlTypeComponent_1 = class CtrlTypeComponent {
    constructor(ngControl, i, ap, b) {
        this.ngControl = ngControl;
        this.i = i;
        this.ap = ap;
        this.b = b;
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        this.stateChanges = new Subject();
        this.focused = false;
        this.errorState = false;
        this.controlType = 'ctrl-type';
        this.id = `ctrl-type-${CtrlTypeComponent_1.nextId++}`;
        this.describedBy = '';
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this._required = false;
        this._disabled = false;
        this.value$ = new BehaviorSubject(null);
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
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
        this.model = value;
        this.onChange(this.model === -1 ? undefined : this.model);
        this.value$.next(value);
    }
    ngOnInit() {
        if (!this.pkTypeClass)
            throw new Error('You must provide a this.pkTypeClass');
        if (!this.pkTypedClass)
            throw new Error('You must provide a this.pkTypedClass');
        this.typeLabel$ = this.value$.pipe(switchMap(pkType => this.ap.streamEntityPreview(pkType).pipe(map(preview => preview.entity_label))));
        this.typeOptions$ = this.b.pipePersistentItemPksByClass(this.pkTypeClass).pipe(switchMap(typePks => combineLatestOrEmpty(typePks.map(pkType => this.ap.streamEntityPreview(pkType).pipe(map(preview => ({
            label: preview.entity_label, data: { pkClass: this.pkTypedClass, pkType }
        }))))).pipe(sortAbc(node => node.label), map(options => [{ label: '--- No Type ---', data: { pkType: -1, pkClass: null } }, ...options]))));
    }
    // TODO: Adapt way of changing the value
    onSelect(e) {
        this.value = e.value;
    }
    ngAfterViewInit() {
        if (this.autoopen)
            setTimeout(() => { this.matSelect.open(); });
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
        this.matSelect.open();
    }
    writeValue(value) {
        this.value = value;
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
    menuToggled(opened) {
        if (opened)
            this.onFocus();
        else
            this.onBlur();
    }
    clearForm() {
        this.value = undefined;
    }
};
CtrlTypeComponent.nextId = 0;
tslib_1.__decorate([
    ViewChild(MatSelect, { static: true })
], CtrlTypeComponent.prototype, "matSelect", void 0);
tslib_1.__decorate([
    Output()
], CtrlTypeComponent.prototype, "blur", void 0);
tslib_1.__decorate([
    Output()
], CtrlTypeComponent.prototype, "focus", void 0);
tslib_1.__decorate([
    Input()
], CtrlTypeComponent.prototype, "pkTypeClass", void 0);
tslib_1.__decorate([
    Input()
], CtrlTypeComponent.prototype, "pkTypedClass", void 0);
tslib_1.__decorate([
    Input()
], CtrlTypeComponent.prototype, "autoopen", void 0);
tslib_1.__decorate([
    Input()
], CtrlTypeComponent.prototype, "placeholder", null);
tslib_1.__decorate([
    Input()
], CtrlTypeComponent.prototype, "required", null);
tslib_1.__decorate([
    Input()
], CtrlTypeComponent.prototype, "disabled", null);
tslib_1.__decorate([
    Input()
], CtrlTypeComponent.prototype, "value", null);
CtrlTypeComponent = CtrlTypeComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'gv-ctrl-type',
        templateUrl: './ctrl-type.component.html',
        styleUrls: ['./ctrl-type.component.css'],
        providers: [{ provide: MatFormFieldControl, useExisting: CtrlTypeComponent_1 }],
    }),
    tslib_1.__param(0, Optional()), tslib_1.__param(0, Self())
], CtrlTypeComponent);
export { CtrlTypeComponent };
//# sourceMappingURL=ctrl-type.component.js.map