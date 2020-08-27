import { ProjectEntity } from '../../../../warehouse/primary-ds/PEntityService';
import { PEntityId } from '../../../../warehouse/primary-ds/PEntityService';
/**
 * Mock data related to entities
 */
export class EntityMock {

    // Naming 1

    static readonly NAME_1: ProjectEntity = {
        entityType: 'teEn',
        fkProject: 591,
        pkEntity: 22,
        fkClass: 365,
    };
    static readonly NAME_1_ID: PEntityId = {
        fkProject: EntityMock.NAME_1.fkProject,
        pkEntity: EntityMock.NAME_1.pkEntity
    };

    // Naming 2

    static readonly NAME_2: ProjectEntity = {
        entityType: 'teEn',
        fkProject: 591,
        pkEntity: 23,
        fkClass: 365,
    };
    static readonly NAME_2_ID: PEntityId = {
        fkProject: EntityMock.NAME_2.fkProject,
        pkEntity: EntityMock.NAME_2.pkEntity
    };

    // Naming 3
    static readonly NAME_3: ProjectEntity = {
        entityType: 'teEn',
        fkProject: 591,
        pkEntity: 24,
        fkClass: 365,
    }
    static readonly NAME_3_ID: PEntityId = {
        fkProject: EntityMock.NAME_3.fkProject,
        pkEntity: EntityMock.NAME_3.pkEntity
    }


    // Person 1

    static readonly PERS_1: ProjectEntity = {
        entityType: 'peIt',
        fkProject: 591,
        pkEntity: 33,
        fkClass: 21,
    };
    static readonly PERS_1_ID: PEntityId = {
        fkProject: EntityMock.PERS_1.fkProject,
        pkEntity: EntityMock.PERS_1.pkEntity
    };


    // Person 2
    static readonly PERS_2: ProjectEntity = {
        entityType: 'peIt',
        fkProject: 591,
        pkEntity: 34,
        fkClass: 21,
    }
    static readonly PERS_2_ID: PEntityId = {
        fkProject: EntityMock.PERS_2.fkProject,
        pkEntity: EntityMock.PERS_2.pkEntity
    }


    // Person 3
    static readonly PERS_3: ProjectEntity = {
        entityType: 'peIt',
        fkProject: 591,
        pkEntity: 35,
        fkClass: 21,
    }
    static readonly PERS_3_ID: PEntityId = {
        fkProject: EntityMock.PERS_3.fkProject,
        pkEntity: EntityMock.PERS_3.pkEntity
    }


    // Birth 1
    static readonly BIRTH_1: ProjectEntity = {
        entityType: 'teEn',
        fkProject: 591,
        pkEntity: 41,
        fkClass: 61,
    }
    static readonly BIRTH_1_ID: PEntityId = {
        fkProject: EntityMock.BIRTH_1.fkProject,
        pkEntity: EntityMock.BIRTH_1.pkEntity
    }


    // UNION 1
    static readonly UNION_1: ProjectEntity = {
        entityType: 'teEn',
        fkProject: 591,
        pkEntity: 51,
        fkClass: 66, // ??
    }
    static readonly UNION_1_ID: PEntityId = {
        fkProject: EntityMock.UNION_1.fkProject,
        pkEntity: EntityMock.UNION_1.pkEntity
    }

}
