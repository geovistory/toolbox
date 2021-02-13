var CtrlAppellationComponent_1;
import * as tslib_1 from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, EventEmitter, Output, Optional, Self, ViewChild } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { QuillEditComponent } from 'projects/app-toolbox/src/app/modules/quill/quill-edit/quill-edit.component';
let CtrlAppellationComponent = CtrlAppellationComponent_1 = class CtrlAppellationComponent {
    constructor(ngControl, ref) {
        this.ngControl = ngControl;
        this.ref = ref;
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        this.stateChanges = new Subject();
        this.focused = false;
        this.controlType = 'ctrl-appellation';
        this.id = `ctrl-appellation-${CtrlAppellationComponent_1.nextId++}`;
        this.describedBy = '';
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this.errorState = false;
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
        this.stateChanges.next();
    }
    get value() {
        return this.model;
    }
    set value(value) {
        if (!value || !value.quill_doc || !value.quill_doc.ops || value.quill_doc.ops.length < 1
            || (value.quill_doc.ops.length === 1 && value.quill_doc.ops[0].insert === '\n')) {
            this.model = undefined;
        }
        else {
            this.model = value;
        }
        this.onChange(this.model);
    }
    valueChange(quillDoc) {
        this.value = Object.assign({}, this.value, { fk_class: this.fkClass, quill_doc: quillDoc });
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
        this.onFocus();
        this.quillEditComponent.focusOnEnd();
    }
    writeValue(value) {
        this.value = value;
        if (value && value.quill_doc)
            this.quillDoc = value.quill_doc;
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
        this.focused = false;
        this.onTouched();
        this.blur.emit();
    }
    onFocus() {
        this.focus.emit();
        this.focused = true;
    }
};
CtrlAppellationComponent.nextId = 0;
tslib_1.__decorate([
    Output()
], CtrlAppellationComponent.prototype, "blur", void 0);
tslib_1.__decorate([
    Output()
], CtrlAppellationComponent.prototype, "focus", void 0);
tslib_1.__decorate([
    ViewChild(QuillEditComponent, { static: false })
], CtrlAppellationComponent.prototype, "quillEditComponent", void 0);
tslib_1.__decorate([
    Input()
], CtrlAppellationComponent.prototype, "placeholder", null);
tslib_1.__decorate([
    Input()
], CtrlAppellationComponent.prototype, "required", null);
tslib_1.__decorate([
    Input()
], CtrlAppellationComponent.prototype, "disabled", null);
tslib_1.__decorate([
    Input()
], CtrlAppellationComponent.prototype, "value", null);
CtrlAppellationComponent = CtrlAppellationComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'gv-ctrl-appellation',
        templateUrl: './ctrl-appellation.component.html',
        styleUrls: ['./ctrl-appellation.component.scss'],
        providers: [{ provide: MatFormFieldControl, useExisting: CtrlAppellationComponent_1 }],
    }),
    tslib_1.__param(0, Optional()), tslib_1.__param(0, Self())
], CtrlAppellationComponent);
export { CtrlAppellationComponent };
//# sourceMappingURL=ctrl-appellation.component.js.map