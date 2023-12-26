import { ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
export interface FormControlConfig<M> {
    placeholder: string;
    data: M; // custom data depending on implementation
    required: boolean;
    disabled$?: BehaviorSubject<boolean>;
    validators?: ValidatorFn[];
    initValue?; // initial value of the control
    mapValue: (d) => any;
    // gets called when removed
    removeHook?: () => any;
}
