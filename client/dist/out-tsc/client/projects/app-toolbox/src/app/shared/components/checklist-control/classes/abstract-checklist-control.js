import * as tslib_1 from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Input, Optional, Self } from '@angular/core';
import { Subject } from 'rxjs';
let AbstractChecklistControl = class AbstractChecklistControl {
    /** MaFormFieldControl end */
    constructor(s, ngControl) {
        this.s = s;
        this.ngControl = ngControl;
        /** MaFormFieldControl start */
        this.id = `AbstractChecklistControl-${AbstractChecklistControl.nextId++}`;
        this.stateChanges = new Subject();
        this._required = false;
        this._disabled = false;
        this.describedBy = '';
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }
    get focused() {
        return this._focused;
    }
    set focused(value) {
        this._focused = value;
        this.stateChanges.next();
    }
    get empty() {
        return this.s.isEmpty();
    }
    get shouldLabelFloat() {
        if (!!this.focused)
            return true;
        if (!this.empty)
            return true;
        return false;
    }
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(value) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    get value() {
        return this.model;
    }
    set value(value) {
        this.model = value;
        this.onChange(this.model);
    }
    setDescribedByIds(ids) {
        this.describedBy = ids.join(' ');
    }
    onContainerClick(event) {
        // TODO: implement this
    }
    get errorState() {
        return this.ngControl.errors !== null && !!this.ngControl.touched;
    }
    ngOnInit() {
        if (!this.nestedTree$) {
            throw new Error('You must provide nestedTree$ input');
        }
        this.s.dataSource.data = [];
        this.nestedTree$.subscribe(tree => {
            this.s.dataSource.data = tree;
        });
    }
    /** Control Value Accessor start */
    writeValue(m) {
        this.s.selectNodesByData(this.controlModelToDataArray(m));
    }
    registerOnChange(fn) {
        this.onChange = fn;
        this.s.selectionChange$.subscribe(ds => {
            this.onChange(this.dataArrayToControlModel(ds));
        });
    }
    onChange(m) {
        throw new Error('Called befor registerOnChange');
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    onTouch() {
        throw new Error('Called befor registerOnTouched');
    }
};
AbstractChecklistControl.nextId = 0;
tslib_1.__decorate([
    Input()
], AbstractChecklistControl.prototype, "nestedTree$", void 0);
tslib_1.__decorate([
    Input()
], AbstractChecklistControl.prototype, "placeholder", null);
tslib_1.__decorate([
    Input()
], AbstractChecklistControl.prototype, "required", null);
tslib_1.__decorate([
    Input()
], AbstractChecklistControl.prototype, "disabled", null);
AbstractChecklistControl = tslib_1.__decorate([
    tslib_1.__param(1, Optional()), tslib_1.__param(1, Self())
], AbstractChecklistControl);
export { AbstractChecklistControl };
//# sourceMappingURL=abstract-checklist-control.js.map