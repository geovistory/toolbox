import {EntityLabelConfig} from '../../../../warehouse/primary-ds/EntityLabelConfigService';
import {ClassId} from '../../../../warehouse/primary-ds/FieldsConfigService';
import {ClassMock} from './ClassMock';
import {ProjectMock} from './ProjectMock';

/**
 * Mock data related to classes
 */
export class EntityLabelConfigMock {

    // Naming

    static readonly NAMING_ID: ClassId = {
        fkProject: ProjectMock.PROJECT_DE_ID.pkProject,
        pkClass: ClassMock.NAMING_ID
    }

    static readonly NAMING_1_STMT_VAL: EntityLabelConfig = {
        fkClass: ClassMock.NAMING_ID,
        labelParts: [{
            field: {
                fkProperty: 1113,
                isOutgoing: true,
                nrOfStatementsInLabel: 1
            },
            ordNum: 1,
        }]
    }

    static readonly NAMING_2_STMT_VAL: EntityLabelConfig = {
        fkClass: ClassMock.NAMING_ID,
        labelParts: [{
            field: {
                fkProperty: 1113,
                isOutgoing: true,
                nrOfStatementsInLabel: 2
            },
            ordNum: 1,
        }]
    }

    // Person

    static readonly PERSON_ID: ClassId = {
        fkProject: ProjectMock.PROJECT_DE_ID.pkProject,
        pkClass: ClassMock.PERSON_ID
    }

    static readonly PERSON_1_STMT_VAL: EntityLabelConfig = {
        fkClass: ClassMock.PERSON_ID,
        labelParts: [{
            field: {
                fkProperty: 1111,
                isOutgoing: false,
            },
            ordNum: 1,
        }]
    }
    static readonly PERSON_2_STMT_VAL: EntityLabelConfig = {
        fkClass: ClassMock.PERSON_ID,
        labelParts: [{
            field: {
                fkProperty: 1111,
                isOutgoing: false,
                nrOfStatementsInLabel: 2
            },
            ordNum: 1,
        }]
    }

    // Birth
    static readonly BIRTH_ID: ClassId = {
        fkProject: ProjectMock.PROJECT_DE_ID.pkProject,
        pkClass: ClassMock.BIRTH_ID
    }
    static readonly BIRTH_VAL: EntityLabelConfig = {
        fkClass: ClassMock.BIRTH_ID,
        labelParts: [{
            field: {
                fkProperty: 41,
                isOutgoing: true,
                nrOfStatementsInLabel: 1
            },
            ordNum: 1,
        }]
    }

    // Union

    static readonly UNION_ID: ClassId = {
        fkProject: ProjectMock.PROJECT_DE_ID.pkProject,
        pkClass: ClassMock.UNION_ID
    }

    static readonly UNION_VAL: EntityLabelConfig = {
        fkClass: ClassMock.UNION_ID,
        labelParts: [{
            field: {
                fkProperty: 52,
                isOutgoing: true,
                nrOfStatementsInLabel: 2

            },
            ordNum: 1,
        }]
    }


}
