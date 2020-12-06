import {LabelPart} from '../../../models';

export interface EntityLabelVal {
    entityLabel?: string;
    labelMissing: boolean;
}
export interface LabelPartKeys {
    pkEntity: number,
    property: number
    direction: string
    fielOrdNum: number
    stmtOrdNum: number
    condition: boolean
    fkEntity: number
}
export interface LabelPartCustom {
    targetLabel: string,
    fkTarget: number,
}

export const labelPartsForAppeInLang365:LabelPart[]=[
    {
        ordNum: 1,
        field: {
            fkProperty: 1113,
            isOutgoing: true,
            nrOfStatementsInLabel: 1
        }
    }
]
export const labelPartsForNormalEntities:LabelPart[]=[
    {
        ordNum: 1,
        field: {
            fkProperty: 1111,
            isOutgoing: false,
            nrOfStatementsInLabel: 1
        }
    }
]
