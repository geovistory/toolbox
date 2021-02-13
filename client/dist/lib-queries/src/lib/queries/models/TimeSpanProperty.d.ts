import { Subfield } from './Subfield';
import { TimePrimitiveItem } from './TimePrimitiveItem';
export interface TimeSpanProperty {
    listDefinition: Subfield;
    items: TimePrimitiveItem[];
}
