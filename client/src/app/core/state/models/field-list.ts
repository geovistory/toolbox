import { Field } from './field';
import { PropertyField } from './property-field';

export class FieldList {
    [keyInState: string]: Field | PropertyField;

    constructor(data?: FieldList) {
        Object.assign(this, data);
    }
}

