import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, UntypedFormGroup, Validator } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Directive({
  selector: '[validAppellation]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AppellationValidatorDirective, multi: true }],
  standalone: true
})
export class AppellationValidatorDirective implements Validator {
  @Input() validAppellation: { [key: string]: UntypedFormGroup; };

  validate(control: AbstractControl): { [key: string]: any; } | null {
    return ValidationService.appellationValidator()(control);
  }
}
