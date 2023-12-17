import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, UntypedFormGroup, Validator } from '@angular/forms';
import { ValidationService } from './validation.service';


@Directive({
  selector: '[validAppellation]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AppellationValidatorDirective, multi: true }],
  standalone: true
})
export class AppellationValidatorDirective implements Validator {
  @Input() validAppellation: { [key: string]: UntypedFormGroup }

  validate(control: AbstractControl): { [key: string]: any } | null {
    return ValidationService.appellationValidator()(control);
  }
}

@Directive({
  selector: '[gvNoInvalidChildren]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NoInvalidChildrenDirective, multi: true }],
  standalone: true
})
export class NoInvalidChildrenDirective implements Validator {
  @Input() gvNoInvalidChildren: { [key: string]: UntypedFormGroup }
  validate(control: AbstractControl): { [key: string]: any } | null {
    return ValidationService.noInvalidChildrenValidator(this.gvNoInvalidChildren)(control);
  }
}

@Directive({
  selector: '[validateEqual]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EqualValidator), multi: true
    }
  ],
  standalone: true
})
export class EqualValidator implements Validator {

  @Input() public validateEqual: string
  @Input() public reverse: string

  constructor() { }

  private get isReverse() {
    if (!this.reverse) return false;
    return this.reverse === 'true' ? true : false;
  }
  validate(c: AbstractControl): { [key: string]: any } {
    // self value
    const v = c.value;
    // control value
    const e = c.root.get(this.validateEqual);

    // value not equal
    if (e && v !== e.value && !this.isReverse) return {
      validateEqual: false
    }
    // value equal and reverse
    if (e && v === e.value && this.isReverse) {
      delete e.errors['validateEqual'];
      if (!Object.keys(e.errors).length) e.setErrors(null);
    }
    // value not equal and reverse
    if (e && v !== e.value && this.isReverse) {
      e.setErrors({ validateEqual: false })
    }
    return null;
  }
}
