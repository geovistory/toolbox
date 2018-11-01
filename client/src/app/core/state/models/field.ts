import { FieldType } from './types';
import { FieldLabel } from './field-label';

export abstract class Field {
    type?: FieldType;
    label?: FieldLabel;
    fkClassField?: number;

    roles?; // TODO: rename this to "value" and implement value to all defered classes
}
