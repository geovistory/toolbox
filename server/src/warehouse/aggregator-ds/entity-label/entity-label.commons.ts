import {LabelPart} from '../../../models';
import {createInfResource} from '../../../__tests__/helpers/atomic/inf-resource.helper';
import {InfResourceMock} from '../../../__tests__/helpers/data/gvDB/InfResourceMock';
import {createProInfoProjRel} from '../../../__tests__/helpers/atomic/pro-info-proj-rel.helper';
import {ProInfoProjRelMock} from '../../../__tests__/helpers/data/gvDB/ProInfoProjRelMock';
import {createInfStatement} from '../../../__tests__/helpers/atomic/inf-statement.helper';
import {InfStatementMock} from '../../../__tests__/helpers/data/gvDB/InfStatementMock';
import {createProEntityLabelConfig} from '../../../__tests__/helpers/atomic/pro-entity-label-config.helper';
import {ProEntityLabelConfigMock} from '../../../__tests__/helpers/data/gvDB/ProEntityLabelConfigMock';

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

export const labelPartsForAppeInLang365: LabelPart[] = [
    {
        ordNum: 1,
        field: {
            fkProperty: 1113,
            isOutgoing: true,
            nrOfStatementsInLabel: 1
        }
    }
]
export const labelPartsForNormalEntities: LabelPart[] = [
    {
        ordNum: 1,
        field: {
            fkProperty: 1111,
            isOutgoing: false,
            nrOfStatementsInLabel: 1
        }
    }
]

export const ENTITY_LABEL_MAX_LENGTH = 311;


export namespace EntityLabel {
    export async function createInfinitLabel() {
        // TeEn
        const birth = await createInfResource(InfResourceMock.BIRTH_1);
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_BIRTH);

        // Stmts
        await createInfStatement(InfStatementMock.BIRTH_1_BROUGHT_INTO_LIFE_PERSON_1);
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_BIRTH_1_BROUGHT_INTO_LIFE_PERON_1);

        await createProEntityLabelConfig(ProEntityLabelConfigMock.C61_BIRTH_PROJECT_DEFAULT)
        await createProEntityLabelConfig(ProEntityLabelConfigMock.C21_PERSON_INFINIT_LABEL_PROJECT_DEFAULT)
        return {birth};
    }

}
