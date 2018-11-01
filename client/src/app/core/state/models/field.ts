import { FieldType, CollapsedExpanded } from './types';
import { FieldLabel } from './field-label';

export abstract class Field {
    type?: FieldType;
    label?: FieldLabel;
    fkClassField?: number;
    pkUiContext?: number;

    toggle?: CollapsedExpanded;
    loading?: boolean;

    roles?; // TODO: rename this to "value" and implement value to all defered classes
}
