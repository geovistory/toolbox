import { BasicStatementItem } from './BasicStatementItem';
export interface PlaceItem extends BasicStatementItem {
    fkClass: number;
    label: string;
}
