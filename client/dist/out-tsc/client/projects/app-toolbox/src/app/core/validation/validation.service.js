var ValidationService_1;
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TimePrimitive } from "@kleiolab/lib-utils";
import { values } from 'ramda';
import { isValidQuillDoc } from '../quill-doc-validation/validate-quill-doc';
let ValidationService = ValidationService_1 = class ValidationService {
    /** The control must not have invalid child controls.
     * Good for nesting custom form controls.
     * Pass in the formGroup.controls of the control-component you are testing.
     *
     */
    static noInvalidChildrenValidator(childControls) {
        return (control) => {
            const ctrls = values(childControls || {});
            return ctrls.filter(ctrl => ctrl.invalid).length > 0
                ? { 'invalidChild': { value: control.value } } : null;
        };
    }
    /**
     * Validates the length of an array control value
     * @param min minimum allowed length of array
     * @param max maxumum allowed length of array
     */
    static arrayLengthValidator(min, max) {
        return (control) => {
            return control.value.length >= min && control.value.length <= max
                ? null : { 'invalidArrayLength': { value: control.value } };
        };
    }
    /**
     * Validates the qullDoc to have at least one character
     */
    static emptyQuillDocValidator() {
        return (control) => {
            const value = control.value;
            if (!value || !value.quill_doc || !value.quill_doc.ops || value.quill_doc.ops.length < 1
                || (value.quill_doc.ops.length === 1 && value.quill_doc.ops[0].insert === '\n')) {
                return { 'emptyQuillDoc': { value: control.value } };
            }
            return null;
        };
    }
    static appellationValidator() {
        return (control) => {
            const isEmpty = ValidationService_1.emptyQuillDocValidator()(control);
            if (isEmpty)
                return isEmpty;
            const value = control.value.quill_doc;
            if (isValidQuillDoc(value).err) {
                return { 'invalidQuillDoc': { value: control.value } };
            }
            return null;
        };
    }
    static hexColorValidator() {
        return (control) => {
            return /^#[0-9A-F]{6}$/i.test(control.value)
                ? null : { 'invalidHexColor': { value: control.value } };
        };
    }
    static getValidatorErrorMessage(validatorName, validatorValue) {
        const config = {
            'required': 'Required',
            'min': `Minimum is ${validatorValue.min}`,
            'max': `Maximum is ${validatorValue.max}`,
            'dayMax': `Maximum is ${validatorValue.max}`,
            'requiredBy-day': `Required if day is set`,
            'requiredBy-hours': `Required if hours are set`,
            'requiredBy-minutes': `Required if minutes are set`,
            'requiredBy-seconds': `Required if seconds are set`,
            'beforeGregorian': `Gregorian calendar can't be used with dates before October 15th 1582`,
            'cantBeginBeforeBegin': `Can't begin before '${validatorValue.fieldLabel}'`,
            'cantBeginAfter': `Can't begin after '${validatorValue.fieldLabel}'`,
            'cantEndAfterEnd': `Can't end after '${validatorValue.fieldLabel}'`,
            'cantEndBefore': `Can't end before '${validatorValue.fieldLabel}'`,
            'mustBeginBeforeEnd': `Can't be later than '${validatorValue.fieldLabel}'`,
            'mustEndAfterBegin': `Can't be earlier than '${validatorValue.fieldLabel}'`,
            'validateLanguage': `Please select a language`,
            'noItem': 'At least one item is required',
            'invalidHexColor': 'Please choose a valid color.',
        };
        if (config[validatorName])
            return config[validatorName];
        return config[validatorName.split('-')[0]];
    }
    /**
    * This fields are required by field.
    *
    * @param {Array<String>} requiredFields Array with names of required fields
    * @param {string} byField  Name of field that requires other fields
    */
    requiredBy(requiredFields, byField) {
        return (formGroup) => {
            // field that requires other fields
            const f = formGroup.controls[byField];
            const errorName = 'requiredBy-' + byField;
            // if this field has a value
            if (f.value) {
                // validate required fields
                requiredFields.forEach(fieldname => {
                    const formControl = formGroup.controls[fieldname];
                    if ((!formControl.value && formControl.value !== 0) || !formControl.valid) {
                        this.addError(formControl, errorName, true);
                    }
                });
            }
            else {
                requiredFields.forEach(fieldname => {
                    const formControl = formGroup.controls[fieldname];
                    this.removeError(formControl, errorName);
                });
            }
        };
    }
    /**
    * First given TimePrimitive can't begin earlier than second TimePrimitive.
    *
    * @param {string} first Name of field with TimePrimitive value
    * @param {string} firstLabel Label for the first field
    * @param {string} second  Name of field with TimePrimitive value
    * @param {string} secondLabel Laebel for the second field value
    */
    cantBeginBeforeBegin(first, firstLabel, second, secondLabel) {
        return (formGroup) => {
            const firstField = formGroup.controls[first];
            const secondField = formGroup.controls[second];
            // if both fields have a value
            if (firstField.value && secondField.value) {
                // get the julian day of the end of the first time primitive
                const firstTp = new TimePrimitive(firstField.value);
                const firstJulianDay = firstTp.getDateTime().getJulianDay();
                // get the julian day of the begin of the second time primitive
                const secondTp = new TimePrimitive(secondField.value);
                const secondJulianDay = secondTp.getDateTime().getJulianDay();
                // validate fields
                if (firstJulianDay < secondJulianDay) {
                    this.addError(firstField, ('cantBeginBeforeBegin-' + second), {
                        fieldLabel: secondLabel
                    });
                    this.addError(secondField, ('cantBeginAfter-' + first), {
                        fieldLabel: firstLabel
                    });
                }
                else {
                    this.removeError(firstField, ('cantBeginBeforeBegin-' + second));
                    this.removeError(secondField, ('cantBeginAfter-' + first));
                }
            }
            else {
                this.removeError(firstField, ('cantBeginBeforeBegin-' + second));
                this.removeError(secondField, ('cantBeginAfter-' + first));
            }
        };
    }
    /**
    * First given TimePrimitive can't end before than second TimePrimitive.
    *
    * @param {string} first Name of field with TimePrimitive value
    * @param {string} firstLabel Label for the first field
    * @param {string} second  Name of field with TimePrimitive value
    * @param {string} secondLabel Laebel for the second field value
    */
    cantEndBeforeEnd(first, firstLabel, second, secondLabel) {
        return (formGroup) => {
            const firstField = formGroup.controls[first];
            const secondField = formGroup.controls[second];
            // if both fields have a value
            if (firstField.value && secondField.value) {
                // get the julian day of the end of the first time primitive
                const firstTp = new TimePrimitive(firstField.value);
                const firstJulianDay = firstTp.getDateTime().getEndOf(firstTp.duration).getJulianDay();
                // get the julian day of the begin of the second time primitive
                const secondTp = new TimePrimitive(secondField.value);
                const secondJulianDay = secondTp.getDateTime().getEndOf(secondTp.duration).getJulianDay();
                // validate fields
                if (firstJulianDay < secondJulianDay) {
                    this.addError(firstField, ('cantEndBefore-' + second), {
                        fieldLabel: secondLabel
                    });
                    this.addError(secondField, ('cantEndAfterEnd-' + first), {
                        fieldLabel: firstLabel
                    });
                }
                else {
                    this.removeError(firstField, ('cantEndBefore-' + second));
                    this.removeError(secondField, ('cantEndAfterEnd-' + first));
                }
            }
            else {
                this.removeError(firstField, ('cantEndBefore-' + second));
                this.removeError(secondField, ('cantEndAfterEnd-' + first));
            }
        };
    }
    /**
    * First given TimePrimitive must begin before second TimePrimitive ends.
    *
    * @param {string} first Name of field with TimePrimitive value
    * @param {string} firstLabel Label for the first field
    * @param {string} second  Name of field with TimePrimitive value
    * @param {string} secondLabel Laebel for the second field value
    */
    mustBeginBeforeEnd(first, firstLabel, second, secondLabel) {
        return (formGroup) => {
            const firstField = formGroup.controls[first];
            const secondField = formGroup.controls[second];
            // if both fields have a value
            if (firstField.value && secondField.value) {
                // get the julian day of the begin of the first time primitive
                const firstTp = new TimePrimitive(firstField.value);
                const firstJulianDay = firstTp.getDateTime().getJulianDay();
                // get the julian day of the end of the second time primitive
                const secondTp = new TimePrimitive(secondField.value);
                const secondJulianDay = secondTp.getDateTime().getEndOf(secondTp.duration).getJulianDay();
                // validate fields
                if (firstJulianDay >= secondJulianDay) {
                    this.addError(firstField, ('mustBeginBeforeEnd-' + second), {
                        fieldLabel: secondLabel
                    });
                    this.addError(secondField, ('mustEndAfterBegin-' + first), {
                        fieldLabel: firstLabel
                    });
                }
                else {
                    this.removeError(firstField, ('mustBeginBeforeEnd-' + second));
                    this.removeError(secondField, ('mustEndAfterBegin-' + first));
                }
            }
            else {
                this.removeError(firstField, ('mustBeginBeforeEnd-' + second));
                this.removeError(secondField, ('mustEndAfterBegin-' + first));
            }
        };
    }
    /**
    * Add an error to a form control
    *
    * @param  {AbstractControl} formControl
    * @param  {string} errorName
    * @param  {any} errorVal
    */
    addError(formControl, errorName, errorVal) {
        if (formControl.errors)
            formControl.errors[errorName] = errorVal;
        else {
            const error = {};
            error[errorName] = errorVal;
            formControl.setErrors(error);
            formControl.markAsTouched();
        }
    }
    /**
    * Remove an error from a form control
    *
    * @param  {AbstractControl} formControl
    * @param  {string} errorName
    * @param  {any} errorVal
    */
    removeError(formControl, errorName) {
        if (formControl.errors && formControl.errors[errorName]) {
            delete formControl.errors[errorName];
        }
        if (formControl.errors && Object.keys(formControl.errors).length === 0) {
            formControl.setErrors(null);
        }
    }
};
ValidationService = ValidationService_1 = tslib_1.__decorate([
    Injectable()
], ValidationService);
export { ValidationService };
//# sourceMappingURL=validation.service.js.map