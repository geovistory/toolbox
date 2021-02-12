import { InfLanguage } from '@kleiolab/lib-sdk-lb4';
import { InfTextProperty } from '@kleiolab/lib-sdk-lb4';
import { ItemBasics } from './ItemBasics';
export interface TextPropertyItem extends ItemBasics {
    textProperty: InfTextProperty;
    language: InfLanguage;
}
