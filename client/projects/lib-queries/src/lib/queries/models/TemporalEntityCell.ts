import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { StatementItem } from './StatementItem';
export interface TemporalEntityCell {
    pkProperty: number;
    isOutgoing: boolean;
    label: string;
    entityPreview: WarEntityPreview;
    items?: StatementItem[];
    firstItem?: StatementItem;
    itemsCount: number;
    isTimeSpan?: boolean;
}
