import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { TimePrimitive } from 'app/core/date-time/time-primitive';
import { U } from 'app/core/util/util';
import { values } from 'ramda';


@Injectable()
export class ValidationService {

  /** The control must not have invalid child controls. 
   * Good for nesting custom form controls.
   * Pass in the formGroup.controls of the control-component you are testing. 
   * 
   */
  static noInvalidChildrenValidator(childControls: { [key: string]: AbstractControl }): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const ctrls = values(childControls || {})
      return ctrls.filter(ctrl => ctrl.invalid).length > 0
        ? { 'invalidChild': { value: control.value } } : null

    };
  }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
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
      'noItem': 'At least one item is required'
    };

    if (config[validatorName]) return config[validatorName];

    return config[validatorName.split('-')[0]];
  }


  /**
  * This fields are required by field.
  *
  * @param {Array<String>} requiredFields Array with names of required fields
  * @param {string} byField  Name of field that requires other fields
  */
  requiredBy(requiredFields: string[], byField: string): Function {
    return (formGroup: FormGroup): void => {

      // field that requires other fields
      const f = formGroup.controls[byField];

      const errorName = 'requiredBy-' + byField;

      // if this field has a value
      if (f.value) {
        // validate required fields
        requiredFields.forEach(fieldname => {
          const formControl = formGroup.controls[fieldname];
          if ((!formControl.value && formControl.value !== 0) || !formControl.valid) {
            this.addError(formControl, errorName, true)
          }
        })

      } else {
        requiredFields.forEach(fieldname => {
          const formControl = formGroup.controls[fieldname];
          this.removeError(formControl, errorName);
        })
      }

    }
  }




  /**
  * First given TimePrimitive can't begin earlier than second TimePrimitive.
  *
  * @param {string} first Name of field with TimePrimitive value
  * @param {string} firstLabel Label for the first field
  * @param {string} second  Name of field with TimePrimitive value
  * @param {string} secondLabel Laebel for the second field value
  */
  cantBeginBeforeBegin(first: string, firstLabel: string, second: string, secondLabel: string): Function {
    return (formGroup: FormGroup): void => {

      const firstField = formGroup.controls[first];
      const secondField = formGroup.controls[second];

      // if both fields have a value
      if (firstField.value && secondField.value) {

        // get the julian day of the end of the first time primitive
        const firstTp: TimePrimitive = U.infRole2TimePrimitive(firstField.value[0]);
        const firstJulianDay = firstTp.getDateTime().getJulianDay();

        // get the julian day of the begin of the second time primitive
        const secondTp: TimePrimitive = U.infRole2TimePrimitive(secondField.value[0]);
        const secondJulianDay = secondTp.getDateTime().getJulianDay();

        // validate fields

        if (firstJulianDay < secondJulianDay) {
          this.addError(firstField, ('cantBeginBeforeBegin-' + second), {
            fieldLabel: secondLabel
          })
          this.addError(secondField, ('cantBeginAfter-' + first), {
            fieldLabel: firstLabel
          })
        } else {
          this.removeError(firstField, ('cantBeginBeforeBegin-' + second))
          this.removeError(secondField, ('cantBeginAfter-' + first))
        }

      } else {
        this.removeError(firstField, ('cantBeginBeforeBegin-' + second))
        this.removeError(secondField, ('cantBeginAfter-' + first))

      }

    }
  }

  /**
  * First given TimePrimitive can't end before than second TimePrimitive.
  *
  * @param {string} first Name of field with TimePrimitive value
  * @param {string} firstLabel Label for the first field
  * @param {string} second  Name of field with TimePrimitive value
  * @param {string} secondLabel Laebel for the second field value
  */
  cantEndBeforeEnd(first: string, firstLabel: string, second: string, secondLabel: string): Function {
    return (formGroup: FormGroup): void => {

      const firstField = formGroup.controls[first];
      const secondField = formGroup.controls[second];

      // if both fields have a value
      if (firstField.value && secondField.value) {

        // get the julian day of the end of the first time primitive
        const firstTp: TimePrimitive = U.infRole2TimePrimitive(firstField.value[0]);
        const firstJulianDay = firstTp.getDateTime().getEndOf(firstTp.duration).getJulianDay();

        // get the julian day of the begin of the second time primitive
        const secondTp: TimePrimitive = U.infRole2TimePrimitive(secondField.value[0]);
        const secondJulianDay = secondTp.getDateTime().getEndOf(secondTp.duration).getJulianDay();

        // validate fields
        if (firstJulianDay < secondJulianDay) {
          this.addError(firstField, ('cantEndBefore-' + second), {
            fieldLabel: secondLabel
          })
          this.addError(secondField, ('cantEndAfterEnd-' + first), {
            fieldLabel: firstLabel
          })
        } else {
          this.removeError(firstField, ('cantEndBefore-' + second))
          this.removeError(secondField, ('cantEndAfterEnd-' + first))
        }

      } else {
        this.removeError(firstField, ('cantEndBefore-' + second))
        this.removeError(secondField, ('cantEndAfterEnd-' + first))
      }

    }
  }



  /**
  * First given TimePrimitive must begin before second TimePrimitive ends.
  *
  * @param {string} first Name of field with TimePrimitive value
  * @param {string} firstLabel Label for the first field
  * @param {string} second  Name of field with TimePrimitive value
  * @param {string} secondLabel Laebel for the second field value
  */
  mustBeginBeforeEnd(first: string, firstLabel: string, second: string, secondLabel: string): Function {
    return (formGroup: FormGroup): void => {

      const firstField = formGroup.controls[first];
      const secondField = formGroup.controls[second];

      // if both fields have a value
      if (firstField.value && secondField.value) {

        // get the julian day of the begin of the first time primitive
        const firstTp: TimePrimitive = U.infRole2TimePrimitive(firstField.value[0]);
        const firstJulianDay = firstTp.getDateTime().getJulianDay();

        // get the julian day of the end of the second time primitive
        const secondTp: TimePrimitive = U.infRole2TimePrimitive(secondField.value[0]);
        const secondJulianDay = secondTp.getDateTime().getEndOf(secondTp.duration).getJulianDay();

        // validate fields

        if (firstJulianDay >= secondJulianDay) {
          this.addError(firstField, ('mustBeginBeforeEnd-' + second), {
            fieldLabel: secondLabel
          })
          this.addError(secondField, ('mustEndAfterBegin-' + first), {
            fieldLabel: firstLabel
          })
        } else {
          this.removeError(firstField, ('mustBeginBeforeEnd-' + second))
          this.removeError(secondField, ('mustEndAfterBegin-' + first))
        }

      } else {
        this.removeError(firstField, ('mustBeginBeforeEnd-' + second))
        this.removeError(secondField, ('mustEndAfterBegin-' + first))

      }

    }
  }




  /**
  * Add an error to a form control
  *
  * @param  {AbstractControl} formControl
  * @param  {string} errorName
  * @param  {any} errorVal
  */
  addError(formControl: AbstractControl, errorName: string, errorVal: any): void {
    if (formControl.errors) formControl.errors[errorName] = errorVal;
    else {
      const error = {}
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
  removeError(formControl: AbstractControl, errorName: string): void {
    if (formControl.errors && formControl.errors[errorName]) {
      delete formControl.errors[errorName];
    }
    if (formControl.errors && Object.keys(formControl.errors).length === 0) {
      formControl.setErrors(null);
    }
  }

}
