var PropertiesRequiredValidatorDirective_1, PropertySelectComponent_1;
import * as tslib_1 from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Directive, EventEmitter, HostBinding, Input, Optional, Output, Self } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { U } from "projects/app-toolbox/src/app/core/util/util";
import { equals } from 'ramda';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
export function propertiesRequiredCondition(value) {
    const model = value;
    return (!model || !model ||
        [...(model.ingoingProperties || []), ...(model.outgoingProperties || [])].length === 0);
}
/** At least one class or type must be selected */
export function propertiesRequiredValidator() {
    return (control) => {
        return propertiesRequiredCondition(control.value)
            ? { 'propertiesRequired': { value: control.value } } : null;
    };
}
let PropertiesRequiredValidatorDirective = PropertiesRequiredValidatorDirective_1 = class PropertiesRequiredValidatorDirective {
    validate(control) {
        return propertiesRequiredValidator()(control);
    }
};
PropertiesRequiredValidatorDirective = PropertiesRequiredValidatorDirective_1 = tslib_1.__decorate([
    Directive({
        selector: '[gvPropertiesRequired]',
        providers: [{ provide: NG_VALIDATORS, useExisting: PropertiesRequiredValidatorDirective_1, multi: true }]
    })
], PropertiesRequiredValidatorDirective);
export { PropertiesRequiredValidatorDirective };
// tslint:disable: member-ordering
let PropertySelectMatControl = class PropertySelectMatControl {
    constructor(ngControl) {
        this.ngControl = ngControl;
        this.destroy$ = new Subject();
        this.stateChanges = new Subject();
        this.focused = false;
        this.controlType = 'property-select';
        // tslint:disable-next-line: no-use-before-declare
        this.id = `property-select-${PropertySelectComponent.nextId++}`;
        this.describedBy = '';
        this.onChange = (_) => {
            console.log('onChange called before registering');
        };
        this.onTouched = () => { };
        this._required = false;
        this._disabled = false;
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }
    get empty() {
        if (!this.model)
            return true;
        return [
            ...(this.model.outgoingProperties || []),
            ...(this.model.ingoingProperties || [])
        ].length === 0;
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
        // TODO: this._disabled ? this.parts.disable() : this.parts.enable();
        this.stateChanges.next();
    }
    get errorState() {
        return this.ngControl.errors !== null && !!this.ngControl.touched;
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
    writeValue(value) { }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
};
PropertySelectMatControl.nextId = 0;
tslib_1.__decorate([
    Input()
], PropertySelectMatControl.prototype, "placeholder", null);
tslib_1.__decorate([
    Input()
], PropertySelectMatControl.prototype, "required", null);
tslib_1.__decorate([
    Input()
], PropertySelectMatControl.prototype, "disabled", null);
PropertySelectMatControl = tslib_1.__decorate([
    tslib_1.__param(0, Optional()), tslib_1.__param(0, Self())
], PropertySelectMatControl);
// tslint:enable: member-ordering
let PropertySelectComponent = PropertySelectComponent_1 = class PropertySelectComponent extends PropertySelectMatControl {
    constructor(ref, p, ngControl) {
        super(ngControl);
        this.ref = ref;
        this.p = p;
        this.ngControl = ngControl;
        this.dflex = true;
        this.level = 0; // level of component nesting, 0...n
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this.selectionChanged = new EventEmitter();
        this.modelChanged = new EventEmitter();
        this.control = new FormControl();
        this.keys$ = new BehaviorSubject([]);
        this.control.valueChanges.pipe(takeUntil(this.destroy$))
            .subscribe((selected) => {
            this.value = this.createValue(selected);
        });
    }
    get value() {
        // TODO
        if (!this.empty)
            return null;
        return this.model;
    }
    set value(value) {
        if (!equals(this.model, value)) {
            this.model = value;
            this.onChange(this.model);
        }
    }
    get cachedKeys() {
        const keysIn = (this.ingoingProperties || []).map(pk => U.propertyFieldKeyFromParams(pk, false));
        const keysOut = (this.outgoingProperties || []).map(pk => U.propertyFieldKeyFromParams(pk, true));
        return [...keysIn, ...keysOut];
    }
    ngOnInit() {
        combineLatest(this.keys$, this.options$.pipe(filter(o => !!o))).pipe(takeUntil(this.destroy$)).subscribe(([keys, options]) => {
            const controlVal = [];
            options.forEach(o => {
                if (keys.includes(o.propertyFieldKey)) {
                    controlVal.push(o);
                }
            });
            this.control.setValue(controlVal);
        });
    }
    writeValue(value) {
        this.ingoingProperties = !value ? [] : (value.ingoingProperties || []);
        this.outgoingProperties = !value ? [] : (value.outgoingProperties || []);
        this.keys$.next(this.cachedKeys);
    }
    compareWith(a, b) {
        return a && b && a.propertyFieldKey == b.propertyFieldKey;
    }
    createValue(selected) {
        return {
            outgoingProperties: selected.filter(p => p.isOutgoing === true).map(p => p.pk),
            ingoingProperties: selected.filter(p => p.isOutgoing === false).map(p => p.pk),
        };
    }
    onOpenedChange(wasOpened) {
        if (wasOpened) {
            this.focus.emit();
            this.focused = true;
        }
        else {
            this.onTouched();
            this.blur.emit();
            this.focused = false;
        }
    }
};
tslib_1.__decorate([
    HostBinding('class.d-flex')
], PropertySelectComponent.prototype, "dflex", void 0);
tslib_1.__decorate([
    Input()
], PropertySelectComponent.prototype, "level", void 0);
tslib_1.__decorate([
    Input()
], PropertySelectComponent.prototype, "options$", void 0);
tslib_1.__decorate([
    Input()
], PropertySelectComponent.prototype, "rootFormGroup", void 0);
tslib_1.__decorate([
    Input()
], PropertySelectComponent.prototype, "value", null);
tslib_1.__decorate([
    Output()
], PropertySelectComponent.prototype, "blur", void 0);
tslib_1.__decorate([
    Output()
], PropertySelectComponent.prototype, "focus", void 0);
tslib_1.__decorate([
    Output()
], PropertySelectComponent.prototype, "selectionChanged", void 0);
tslib_1.__decorate([
    Output()
], PropertySelectComponent.prototype, "modelChanged", void 0);
PropertySelectComponent = PropertySelectComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'gv-property-select',
        templateUrl: './property-select.component.html',
        styleUrls: ['./property-select.component.scss'],
        providers: [{ provide: MatFormFieldControl, useExisting: PropertySelectComponent_1 }],
    }),
    tslib_1.__param(2, Optional()), tslib_1.__param(2, Self())
], PropertySelectComponent);
export { PropertySelectComponent };
//# sourceMappingURL=property-select.component.js.map