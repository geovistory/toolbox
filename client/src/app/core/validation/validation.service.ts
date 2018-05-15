import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { TimePrimitive } from 'app/core';

@Injectable()
export class ValidationService {


  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Required',
      'min': `Minimum is ${validatorValue.min}`,
      'max': `Maximum is ${validatorValue.max}`,
      'dayMax': `Maximum is ${validatorValue.max}`,
      'requiredBy-day': `Required if day is set`,
      'requiredBy-hours': `Required if hours are set`,
      'requiredBy-minutes': `Required if minutes are set`,
      'requiredBy-seconds': `Required if seconds are set`,
      'beforeGregorian': `Gregorian calendar can't be used with dates before October 15th 1582`,
      'mustEndBefore': `Must end before ${validatorValue.fieldLabel}`,
      'mustStartAfter': `Must start after ${validatorValue.fieldLabel}`,
      'mustBeginBeforeEnd': `Must begin before ${validatorValue.fieldLabel} ends`,
      'mustEndAfterBegin': `Must end after ${validatorValue.fieldLabel} begins`,
      'validateLanguage': `Please select a language`
    };

    if(config[validatorName]) return config[validatorName];

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
      let f = formGroup.controls[byField];

      var errorName = 'requiredBy-' + byField;

      // if this field has a value
      if (f.value) {
        // validate required fields
        requiredFields.forEach(fieldname => {
          var formControl = formGroup.controls[fieldname];
          if ((!formControl.value && formControl.value !== 0) || !formControl.valid) {
            this.addError(formControl, errorName, true)
          }
        })

      } else {
        requiredFields.forEach(fieldname => {
          var formControl = formGroup.controls[fieldname];
          this.removeError(formControl, errorName);
        })
      }

    }
  }




  /**
  * First given TimePrimitive must end before second TimePrimitive.
  *
  * @param {string} first Name of field with TimePrimitive value
  * @param {string} firstLabel Label for the first field
  * @param {string} second  Name of field with TimePrimitive value
  * @param {string} secondLabel Laebel for the second field value
  */
  mustNotIntersect(first: string, firstLabel:string, second: string, secondLabel:string): Function {
    return (formGroup: FormGroup): void => {

      let firstField = formGroup.controls[first];
      let secondField = formGroup.controls[second];

      // if both fields have a value
      if (firstField.value && secondField.value) {

        // get the julian day of the end of the first time primitive
        const firstTp: TimePrimitive = firstField.value;
        const firstJulianDay = firstTp.getDateTime().getEndOf(firstTp.duration).getJulianDay();

        // get the julian day of the begin of the second time primitive
        const secondTp: TimePrimitive = secondField.value;
        const secondJulianDay = secondTp.getDateTime().getJulianDay();

        // validate fields

        if (firstJulianDay > secondJulianDay) {
          this.addError(firstField, ('mustEndBefore-' + second), {
            fieldLabel: secondLabel
          })
          this.addError(secondField, ('mustStartAfter-' + first), {
            fieldLabel: firstLabel
          })
        }else{
          this.removeError(firstField, ('mustEndBefore-' + second))
          this.removeError(secondField, ('mustStartAfter-' + first))
        }

      } else {
        this.removeError(firstField, ('mustEndBefore-' + second))
        this.removeError(secondField, ('mustStartAfter-' + first))

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
    mustBeginBeforeEnd(first: string, firstLabel:string, second: string, secondLabel:string): Function {
      return (formGroup: FormGroup): void => {

        let firstField = formGroup.controls[first];
        let secondField = formGroup.controls[second];

        // if both fields have a value
        if (firstField.value && secondField.value) {

          // get the julian day of the begin of the first time primitive
          const firstTp: TimePrimitive = firstField.value;
          const firstJulianDay = firstTp.getDateTime().getJulianDay();

          // get the julian day of the end of the second time primitive
          const secondTp: TimePrimitive = secondField.value;
          const secondJulianDay = secondTp.getDateTime().getEndOf(secondTp.duration).getJulianDay();

          // validate fields

          if (firstJulianDay > secondJulianDay) {
            this.addError(firstField, ('mustBeginBeforeEnd-' + second), {
              fieldLabel: secondLabel
            })
            this.addError(secondField, ('mustEndAfterBegin-' + first), {
              fieldLabel: firstLabel
            })
          }else{
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
    if (formControl.errors)
      formControl.errors[errorName] = errorVal;
    else {
      var error = {}
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
    if (formControl.errors && formControl.errors[errorName])
      delete formControl.errors[errorName];
    if (formControl.errors && Object.keys(formControl.errors).length === 0)
      formControl.setErrors(null);
  }

}
