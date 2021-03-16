import { GvFieldProperty } from '@kleiolab/lib-sdk-lb4';
export interface FieldBase {
    label: string;
    ontoInfoUrl: string;
    ontoInfoLabel: string;
    property: GvFieldProperty;
    isHasTypeField: boolean;
    isOutgoing: boolean;
    sourceClass: number;
    sourceClassLabel: string;
    targetMinQuantity: number;
    targetMaxQuantity: number;
    sourceMinQuantity: number;
    sourceMaxQuantity: number;
    identityDefiningForSource: boolean;
    identityDefiningForTarget: boolean;
}
