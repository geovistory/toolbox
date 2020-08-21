import {ClassId} from '../../../../warehouse/primary-ds/FieldsConfigService';
import {ProjectMock} from './ProjectMock';
import {ClassMock} from './ClassMock';

/**
 * Mock data related to classes
 */
export class ClassIdMock {

    static readonly NAMING_ID: ClassId = {
        fkProject: ProjectMock.PROJECT_DE_ID.pkProject,
        pkClass: ClassMock.NAMING_ID
    };
    static readonly PERSON_ID: ClassId = {
        fkProject: ProjectMock.PROJECT_DE_ID.pkProject,
        pkClass: ClassMock.PERSON_ID
    };
    static readonly BIRTH_ID: ClassId = {
        fkProject: ProjectMock.PROJECT_DE_ID.pkProject,
        pkClass: ClassMock.BIRTH_ID
    };
    static readonly UNION_ID: ClassId = {
        fkProject: ProjectMock.PROJECT_DE_ID.pkProject,
        pkClass: ClassMock.UNION_ID
    };

}
