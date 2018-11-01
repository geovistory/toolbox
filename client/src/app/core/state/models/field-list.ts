import { Field } from './field';

export class FieldList {
    [keyInState: string]: Field;

    constructor(data?: FieldList) {
        Object.assign(this, data);
    }
}

