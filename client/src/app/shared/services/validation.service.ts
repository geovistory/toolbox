import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

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
      'beforeGregorian': `Gregorian calendar can't be used with dates before October 15th 1582`
    };

    return config[validatorName];
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
          if (!formControl.value || !formControl.valid) {
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



  // static creditCardValidator(control) {
  //     // Visa, MasterCard, American Express, Diners Club, Discover, JCB
  //     if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
  //         return null;
  //     } else {
  //         return { 'invalidCreditCard': true };
  //     }
  // }
  //
  // static emailValidator(control) {
  //     // RFC 2822 compliant regex
  //     if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
  //         return null;
  //     } else {
  //         return { 'invalidEmailAddress': true };
  //     }
  // }
  //
  // static passwordValidator(control) {
  //     // {6,100}           - Assert password is between 6 and 100 characters
  //     // (?=.*[0-9])       - Assert a string has at least one number
  //     if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
  //         return null;
  //     } else {
  //         return { 'invalidPassword': true };
  //     }
  // }



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
