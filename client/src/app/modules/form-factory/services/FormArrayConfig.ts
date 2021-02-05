import { ValidatorFn } from '@angular/forms';
export interface FormArrayConfig<A> {
    data: A; // custom data depending on implementation
    placeholder: string;
    isList?: boolean;
    required?: boolean;
    maxLength?: number;
    validators?: ValidatorFn[];
    initValue?: any[]; // initial value of the array
    // If this is a list, the number defines how many children are added on init
    addOnInit?: number;
    mapValue: (d) => any;
}
