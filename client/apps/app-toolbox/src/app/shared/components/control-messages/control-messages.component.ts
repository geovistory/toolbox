import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationService } from '../../../core/validation/validation.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';


@Component({
    selector: 'gv-control-messages',
    templateUrl: './control-messages.component.html',
    standalone: true,
    imports: [NgIf, MatFormFieldModule]
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
