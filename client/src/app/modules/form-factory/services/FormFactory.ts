import { FormGroup } from '@angular/forms';
import { FormGroupFactory } from '../core/form-group-factory';
export class FormFactory {
    constructor(public formGroup: FormGroup, public formGroupFactory: FormGroupFactory) { }
    markAllAsTouched() {
        this.formGroupFactory.markAllAsTouched();
    }
}
