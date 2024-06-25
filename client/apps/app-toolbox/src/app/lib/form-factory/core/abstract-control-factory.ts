import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FactoryType, StatusChange } from './form-factory.models';



export abstract class AbstractControlFactory {
    factoryType: FactoryType;
    formArray?: UntypedFormArray;
    formGroup?: UntypedFormGroup;
    formControl?: UntypedFormControl;
    valueChanges$ = new BehaviorSubject(undefined);
    statusChanges$ = new BehaviorSubject<StatusChange>(undefined);

    abstract markAllAsTouched();

}
