import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationService } from 'projects/app-toolbox/src/app/core/validation/validation.service';

type FrameworkTypes = 'material' | 'bootstrap'

@Component({
  selector: 'gv-control-messages',
  templateUrl: './control-messages.component.html'
})
export class ControlMessagesComponent {
  @Input() control: AbstractControl;
  @Input() framework: FrameworkTypes = 'bootstrap';

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
