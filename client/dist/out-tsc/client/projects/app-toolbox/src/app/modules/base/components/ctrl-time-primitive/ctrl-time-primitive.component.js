var CtrlTimePrimitiveComponent_1;
import * as tslib_1 from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Optional, Output, Self, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { JulianDateTime } from '@kleiolab/lib-utils';
import { GregorianDateTime } from '@kleiolab/lib-utils';
import { TimePrimitive } from "@kleiolab/lib-utils";
import { takeUntil } from 'rxjs/operators';
let CtrlTimePrimitiveComponent = CtrlTimePrimitiveComponent_1 = class CtrlTimePrimitiveComponent {
    constructor(ngControl, fb, validationService) {
        this.ngControl = ngControl;
        this.fb = fb;
        this.validationService = validationService;
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        this.stateChanges = new Subject();
        this.focused = false;
        this.errorState = false;
        this.controlType = 'ctrl-time-primitive';
        this.id = `ctrl-time-primitive-${CtrlTimePrimitiveComponent_1.nextId++}`;
        this.describedBy = '';
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this._required = false;
        this._disabled = false;
        this.calendar = 'julian';
        // custom logic
        this.gregorianDateTime = new GregorianDateTime();
        this.julianDateTime = new JulianDateTime();
        this.fieldNames = ['year', 'month', 'day', 'hours', 'minutes', 'seconds'];
        this.editingCalendar = false;
        this.timeInputsVisible = false;
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
        this.form = this.fb.group({
            calendar: null,
            year: [null, [Validators.required, Validators.min(-4713), Validators.max(3000)]],
            month: [null, [Validators.min(1), Validators.max(12)]],
            day: [null, Validators.min(1)],
            hours: [null, [Validators.min(0), Validators.max(23)]],
            minutes: [null, [Validators.min(0), Validators.max(59)]],
            seconds: [null, [Validators.min(0), Validators.max(59)]]
        }, {
            validator: this.validateForm(this)
        });
        this.form.valueChanges.subscribe(val => {
            if (this.form.invalid) {
                this.value = undefined;
            }
            else {
                if (this.calendar === 'gregorian') {
                    this.julianDay = this.gregorianDateTime.getJulianDay();
                    this.duration = this.gregorianDateTime.getGranularity();
                }
                else if (this.calendar === 'julian') {
                    this.julianDay = this.julianDateTime.getJulianDay();
                    this.duration = this.julianDateTime.getGranularity();
                }
                this.value = Object.assign({}, this.value, { julian_day: this.julianDay, duration: this.duration, calendar: this.calendar });
            }
        });
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
        if (!value || !value.calendar || !value.julian_day || !value.duration) {
            this.model = undefined;
        }
        else {
            this.model = value;
        }
        this.onChange(this.model);
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
        this.openMenu();
        this.onFocus();
    }
    writeValue(value) {
        this.value = value;
        if (value) {
            if (value.calendar) {
                this.calendar = value.calendar;
                this.calendarGivenByWriteValue = true;
            }
            if (value.duration)
                this.duration = value.duration;
            if (value.julian_day)
                this.julianDay = value.julian_day;
            const timePrimitive = new TimePrimitive({
                calendar: this.calendar,
                julianDay: this.julianDay,
                duration: this.duration,
            });
            const dt = timePrimitive.getDateTime(this.calendar);
            switch (timePrimitive.duration) {
                case '1 year':
                    this.setFormValue(dt.year);
                    break;
                case '1 month':
                    this.setFormValue(dt.year, dt.month);
                    break;
                case '1 day':
                    this.setFormValue(dt.year, dt.month, dt.day);
                    break;
                case '1 hour':
                    this.setFormValue(dt.year, dt.month, dt.day, dt.hours);
                    break;
                case '1 minute':
                    this.setFormValue(dt.year, dt.month, dt.day, dt.hours, dt.minutes);
                    break;
                case '1 second':
                    this.setFormValue(dt.year, dt.month, dt.day, dt.hours, dt.minutes, dt.seconds);
                    break;
            }
        }
        else {
            this.clearForm();
        }
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
    /**
     * Custom functions
     */
    ngAfterViewInit() {
        if (this.autofocus)
            setTimeout(() => { this.trigger.openMenu(); });
        this.trigger.onMenuOpen.pipe(takeUntil(this.destroy$)).subscribe(() => {
            setTimeout(() => { this.yearInput.nativeElement.focus(); });
        });
    }
    hasValueImmediatelyBefore(fieldN) {
        const fieldBefore = this.fieldNames[(this.fieldNames.indexOf(fieldN) - 1)];
        return (this.form.controls[fieldBefore].value || this.form.controls[fieldBefore].value === 0);
    }
    hasValue(fieldN) {
        return (this.form.controls[fieldN].value || this.form.controls[fieldN].value === 0);
    }
    hasValueAfter(fieldN) {
        const startIndex = this.fieldNames.indexOf(fieldN) + 1;
        for (let i = startIndex; i < this.fieldNames.length; i++) {
            if (this.form.controls[this.fieldNames[i]].value || this.form.controls[fieldN].value === 0)
                return true;
        }
        return false;
    }
    fieldIsVisible(field) {
        return (this.hasValueImmediatelyBefore(field) || this.hasValue(field) || this.hasValueAfter(field));
    }
    get monthVisible() {
        return this.fieldIsVisible('month');
    }
    get dayVisible() {
        return this.fieldIsVisible('day');
    }
    get addTimeBtnVisible() {
        return (this.fieldIsVisible('hours') && !this.timeInputsVisible);
    }
    get removeTimeBtnVisible() {
        return (this.hoursVisible && !this.fieldIsVisible('minutes'));
    }
    get hoursVisible() {
        return (this.fieldIsVisible('hours') && this.timeInputsVisible);
    }
    get minutesVisible() {
        return (this.fieldIsVisible('minutes') && this.timeInputsVisible);
    }
    get secondsVisible() {
        return (this.fieldIsVisible('seconds') && this.timeInputsVisible);
    }
    get editCalBtnVisible() {
        // show btn only if both cals are possible (first condition)
        // or if the control was already changed by user (second condition)
        if (this.julianDay >= 2299161
            || this.form.controls.calendar.hasError('beforeGregorian'))
            return true;
        return false;
    }
    setFormValue(year = null, month = null, day = null, hours = null, minutes = null, seconds = null) {
        this.form.setValue({
            calendar: this.calendar,
            year,
            month,
            day,
            hours,
            minutes,
            seconds
        });
    }
    /**
    * Validate the form and update the component's values
    */
    validateForm(component) {
        return (fg) => {
            // get fields
            const yearField = fg.controls['year'];
            const monthField = fg.controls['month'];
            const dayField = fg.controls['day'];
            const hoursField = fg.controls['hours'];
            const minutesField = fg.controls['minutes'];
            const secondsField = fg.controls['seconds'];
            const calendarField = fg.controls['calendar'];
            // If day is set, month is required
            this.validationService.requiredBy(['month'], 'day')(fg);
            this.validationService.requiredBy(['day'], 'hours')(fg);
            this.validationService.requiredBy(['hours'], 'minutes')(fg);
            this.validationService.requiredBy(['minutes'], 'seconds')(fg);
            // AUTO ADAPT CALENDAR
            // if calendar field is pristine, and form is dirty (user changed a value), and the value was
            // not set by an existing statement (statement.pk_entity) fit calendar to the date
            // according to the switch-day of 2299161 (1582-10-4/1582-10-15)
            if (calendarField.pristine && fg.dirty && !this.calendarGivenByWriteValue) {
                const g = new GregorianDateTime();
                g.year = yearField.value;
                g.month = monthField.value;
                g.day = dayField.value;
                if (g.getJulianDay() >= 2299161 && calendarField.value !== 'gregorian') {
                    calendarField.setValue('gregorian');
                }
                else if (g.getJulianDay() < 2299161 && calendarField.value !== 'julian') {
                    calendarField.setValue('julian');
                }
            }
            else if (calendarField.dirty && yearField.value && monthField.value && dayField.value) {
                // RECALC DATE ON USER CHANGE CALENDAR
                // if calendar is dirty, the value got changed manually, and year, month,
                // and day are valid, recalculate the date
                // if user changed from gregorian to julian
                if (component.calendar === 'gregorian' && calendarField.value === 'julian' && calendarField.valid) {
                    const g = new GregorianDateTime();
                    g.year = yearField.value;
                    g.month = monthField.value;
                    g.day = dayField.value;
                    const julianDay = g.getJulianDay();
                    if (julianDay >= 2299161) {
                        const j = new JulianDateTime();
                        j.fromJulianDay(julianDay);
                        component.calendar = 'julian';
                        fg.patchValue({
                            calendar: 'julian',
                            year: j.year,
                            month: j.month,
                            day: j.day
                        });
                    }
                }
                else if (component.calendar === 'julian' && calendarField.value === 'gregorian') {
                    // else if user changed from julian to gregorian
                    const j = new JulianDateTime();
                    j.year = yearField.value;
                    j.month = monthField.value;
                    j.day = dayField.value;
                    const g = new GregorianDateTime();
                    g.fromJulianDay(j.getJulianDay());
                    component.calendar = 'gregorian';
                    fg.patchValue({
                        calendar: 'gregorian',
                        year: g.year,
                        month: g.month,
                        day: g.day
                    });
                }
            }
            // set calendar
            component.calendar = calendarField.value;
            let lengthOfMonth;
            if (calendarField.value === 'gregorian') {
                // Set gregorianDateTime values
                component.gregorianDateTime.year = yearField.value;
                component.gregorianDateTime.month = monthField.value;
                component.gregorianDateTime.day = dayField.value;
                component.gregorianDateTime.hours = hoursField.value;
                component.gregorianDateTime.minutes = minutesField.value;
                component.gregorianDateTime.seconds = secondsField.value;
                lengthOfMonth = component.gregorianDateTime.lengthOfMonth();
            }
            else if (calendarField.value === 'julian') {
                // Set julianDateTime values
                component.julianDateTime.year = yearField.value;
                component.julianDateTime.month = monthField.value;
                component.julianDateTime.day = dayField.value;
                component.julianDateTime.hours = hoursField.value;
                component.julianDateTime.minutes = minutesField.value;
                component.julianDateTime.seconds = secondsField.value;
                lengthOfMonth = component.julianDateTime.lengthOfMonth();
            }
            if (dayField.value > lengthOfMonth) {
                // Validate day is in length of month
                this.validationService.addError(dayField, 'dayMax', { 'max': lengthOfMonth });
            }
            else {
                this.validationService.removeError(dayField, 'dayMax');
            }
            // Valdiate that date not before introduction of gregorian calendar
            if (calendarField.value === 'gregorian' && yearField.value) {
                const julianDay = component.gregorianDateTime.getJulianDay();
                const errorName = 'beforeGregorian';
                if (julianDay < 2299161) {
                    this.validationService.addError(calendarField, errorName, true);
                }
                else {
                    this.validationService.removeError(calendarField, errorName);
                }
            }
        };
    }
    closeMenu() {
        this.trigger.closeMenu();
    }
    openMenu() {
        this.trigger.openMenu();
    }
    clearForm() {
        this.calendar = 'julian';
        this.setFormValue();
    }
};
CtrlTimePrimitiveComponent.nextId = 0;
tslib_1.__decorate([
    ViewChild(MatMenuTrigger, { static: true })
], CtrlTimePrimitiveComponent.prototype, "trigger", void 0);
tslib_1.__decorate([
    ViewChild('yearInput', { static: true })
], CtrlTimePrimitiveComponent.prototype, "yearInput", void 0);
tslib_1.__decorate([
    Output()
], CtrlTimePrimitiveComponent.prototype, "blur", void 0);
tslib_1.__decorate([
    Output()
], CtrlTimePrimitiveComponent.prototype, "focus", void 0);
tslib_1.__decorate([
    Input()
], CtrlTimePrimitiveComponent.prototype, "autofocus", void 0);
tslib_1.__decorate([
    Input()
], CtrlTimePrimitiveComponent.prototype, "placeholder", null);
tslib_1.__decorate([
    Input()
], CtrlTimePrimitiveComponent.prototype, "required", null);
tslib_1.__decorate([
    Input()
], CtrlTimePrimitiveComponent.prototype, "disabled", null);
tslib_1.__decorate([
    Input()
], CtrlTimePrimitiveComponent.prototype, "value", null);
CtrlTimePrimitiveComponent = CtrlTimePrimitiveComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'gv-ctrl-time-primitive',
        templateUrl: './ctrl-time-primitive.component.html',
        styleUrls: ['./ctrl-time-primitive.component.css'],
        providers: [{ provide: MatFormFieldControl, useExisting: CtrlTimePrimitiveComponent_1 }],
    }),
    tslib_1.__param(0, Optional()), tslib_1.__param(0, Self())
], CtrlTimePrimitiveComponent);
export { CtrlTimePrimitiveComponent };
//# sourceMappingURL=ctrl-time-primitive.component.js.map