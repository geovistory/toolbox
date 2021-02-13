import { PK_DEFAULT_CONFIG_PROJECT } from './local-model.helpers';
import { InfLanguageMock } from './InfLanguageMock';
/**
 * pk_entity prefix: 300
 */
export class ProProjectMock {
}
ProProjectMock.DEFAULT_PROJECT = ({
    pk_entity: PK_DEFAULT_CONFIG_PROJECT,
    fk_language: InfLanguageMock.GERMAN.pk_entity
});
ProProjectMock.PROJECT_1 = ({
    pk_entity: 3001,
    fk_language: InfLanguageMock.GERMAN.pk_entity
});
ProProjectMock.PROJECT_2 = ({
    pk_entity: 3002,
    fk_language: InfLanguageMock.ENGLISH.pk_entity
});
ProProjectMock.PROJECT_3 = ({
    pk_entity: 3003,
    fk_language: InfLanguageMock.ENGLISH.pk_entity
});
ProProjectMock.SANDBOX_PROJECT = ({
    pk_entity: 375232,
    fk_language: InfLanguageMock.ENGLISH.pk_entity
});
//# sourceMappingURL=ProProjectMock.js.map