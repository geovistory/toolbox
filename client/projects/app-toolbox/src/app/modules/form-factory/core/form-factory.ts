import { UntypedFormGroup } from '@angular/forms';
import { FormGroupFactory } from './form-group-factory';
export class FormFactory {
  constructor(public formGroup: UntypedFormGroup, public formGroupFactory: FormGroupFactory) { }
  markAllAsTouched() {
    this.formGroupFactory.markAllAsTouched();
  }
}
