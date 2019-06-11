import { ValidationService } from './validation.service';
import { Directive, Input, NgModule, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, FormGroup, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Directive({
  selector: '[gvNoInvalidChildren]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NoInvalidChildrenDirective, multi: true }]
})
export class NoInvalidChildrenDirective implements Validator {
  @Input() gvNoInvalidChildren: { [key: string]: FormGroup }
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
  ]
})
export class EqualValidator implements Validator {
  
  @Input('validateEqual') public validateEqual: string
  @Input('reverse') public reverse: string

  constructor() { }

  private get isReverse() {
    if (!this.reverse) return false;
    return this.reverse === 'true' ? true : false;
  }
  validate(c: AbstractControl): { [key: string]: any } {
    // self value
    let v = c.value;
    // control value
    let e = c.root.get(this.validateEqual);

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


const directives = [
  NoInvalidChildrenDirective,
  EqualValidator
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: directives,
  exports: directives
})
export class ValidationDirectivesModule { }
