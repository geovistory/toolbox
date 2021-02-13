import { BasicStatementItem } from './BasicStatementItem';
export interface AppellationItem extends BasicStatementItem {
    fkClass: number;
    label: string;
}
