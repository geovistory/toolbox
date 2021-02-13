var CtrlTimeSpanComponent_1;
import * as tslib_1 from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, EventEmitter, Output, Optional, Self } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { CtrlTimeSpanDialogComponent } from './ctrl-time-span-dialog/ctrl-time-span-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { TimeSpanUtil } from '@kleiolab/lib-utils';
let CtrlTimeSpanComponent = CtrlTimeSpanComponent_1 = class CtrlTimeSpanComponent {
    constructor(ngControl, dialog) {
        this.ngControl = ngControl;
        this.dialog = dialog;
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        this.stateChanges = new Subject();
        this.focused = false;
        this.errorState = false;
        this.controlType = 'ctrl-time-span';
        this.id = `ctrl-time-span-${CtrlTimeSpanComponent_1.nextId++}`;
        this.describedBy = '';
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this._required = false;
        this._disabled = false;
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
        if (!value || (!value[72] && !value[152] && !value[153] && !value[71] && !value[150] && !value[151])) {
            this.model = undefined;
        }
        else {
            this.model = value;
        }
        this.onChange(this.model);
        this.timeSpan = TimeSpanUtil.fromTimeSpanDialogData(value);
    }
    openModal() {
        if (!this.disabled) {
            const data = {
                timePrimitives: this.value
            };
            this.onFocus();
            const ref = this.dialog.open(CtrlTimeSpanDialogComponent, {
                width: '600px',
                data
            });
            ref.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
                if (result)
                    this.value = result;
                this.onBlur();
            });
        }
    }
    // TODO: Adapt way of changing the value
    newFoo(val) {
        this.value = val;
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
        this.openModal();
        this.onFocus();
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
};
CtrlTimeSpanComponent.nextId = 0;
tslib_1.__decorate([
    Output()
], CtrlTimeSpanComponent.prototype, "blur", void 0);
tslib_1.__decorate([
    Output()
], CtrlTimeSpanComponent.prototype, "focus", void 0);
tslib_1.__decorate([
    Input()
], CtrlTimeSpanComponent.prototype, "placeholder", null);
tslib_1.__decorate([
    Input()
], CtrlTimeSpanComponent.prototype, "required", null);
tslib_1.__decorate([
    Input()
], CtrlTimeSpanComponent.prototype, "disabled", null);
tslib_1.__decorate([
    Input()
], CtrlTimeSpanComponent.prototype, "value", null);
CtrlTimeSpanComponent = CtrlTimeSpanComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'gv-ctrl-time-span',
        templateUrl: './ctrl-time-span.component.html',
        styleUrls: ['./ctrl-time-span.component.css'],
        providers: [{ provide: MatFormFieldControl, useExisting: CtrlTimeSpanComponent_1 }],
    }),
    tslib_1.__param(0, Optional()), tslib_1.__param(0, Self())
], CtrlTimeSpanComponent);
export { CtrlTimeSpanComponent };
//# sourceMappingURL=ctrl-time-span.component.js.map