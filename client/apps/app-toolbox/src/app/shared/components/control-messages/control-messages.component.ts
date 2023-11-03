import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationService } from '../../../core/validation/validation.service';


@Component({
  selector: 'gv-control-messages',
  templateUrl: './control-messages.component.html'
})
export class ControlMessagesComponent {
  @Input() control: AbstractControl;

  constructor() { }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}
