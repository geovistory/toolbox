import { BasicStatementItem } from './BasicStatementItem';
export interface LanguageItem extends BasicStatementItem {
    fkClass: number;
    label: string;
}
