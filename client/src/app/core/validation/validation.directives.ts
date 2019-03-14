import { ValidationService } from './validation.service';
import { Directive, Input, NgModule } from '@angular/core';
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

const directives = [
  NoInvalidChildrenDirective
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NoInvalidChildrenDirective
  ],
  exports: [
    NoInvalidChildrenDirective
  ]
})
export class ValidationDirectivesModule { }
