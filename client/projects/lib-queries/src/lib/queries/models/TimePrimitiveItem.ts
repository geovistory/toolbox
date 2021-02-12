import { TimePrimitive } from '@kleiolab/lib-utils';
import { BasicStatementItem } from './BasicStatementItem';
export interface TimePrimitiveItem extends BasicStatementItem {
    fkClass: number;
    label: string;
    timePrimitive: TimePrimitive;
}
