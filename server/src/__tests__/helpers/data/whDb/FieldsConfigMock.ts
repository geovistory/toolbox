import {PClassId, FieldsConfig} from '../../../../warehouse/primary-ds/FieldsConfigService';
import {ClassMock} from './ClassMock';
import {DfhClassLabelMock} from './DfhClassLabelMock';
import {ProjectMock} from './ProjectMock';

/**
 * Mock data related to classes
 */
export class FieldsConfigMock {


    static readonly NAMING_ID: PClassId = {
        fkProject: ProjectMock.PROJECT_DE_ID.pkProject,
        pkClass: ClassMock.NAMING_ID
    }

    static readonly NAMING_VAL: FieldsConfig = {
        fkClass: ClassMock.NAMING_ID,
        fields: [{
            fkProperty: 1113,
            isOutgoing: true,
            ordNum: 1,
        }]
    }

    static readonly UNION_ID: PClassId = {
        fkProject: ProjectMock.PROJECT_DE_ID.pkProject,
        pkClass: ClassMock.UNION_ID
    }
    static readonly UNION_VAL: FieldsConfig = {
        fkClass: DfhClassLabelMock.UNION_EN_ID.pkClass,
        fields: [{
            fkProperty: 52,
            isOutgoing: true,
            ordNum: 1,
        }]
    }

}
