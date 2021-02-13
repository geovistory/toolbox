import { InfLanguage } from '@kleiolab/lib-sdk-lb4';
import { BasicStatementItem } from './BasicStatementItem';
export interface LangStringItem extends BasicStatementItem {
    fkClass: number;
    label: string;
    fkLanguage: number;
    language: InfLanguage;
}
