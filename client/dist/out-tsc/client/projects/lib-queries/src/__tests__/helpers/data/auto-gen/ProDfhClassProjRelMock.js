import { DfhApiClassMock } from './DfhApiClassMock';
import { ProProjectMock } from './ProProjectMock';
/**
 * pk_entity prefixed with 700
 */
export class ProDfhClassProjRelMock {
}
ProDfhClassProjRelMock.SANDBOX_PERSON = ({
    pk_entity: 7001,
    fk_project: ProProjectMock.SANDBOX_PROJECT.pk_entity,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
    enabled_in_entities: true
});
ProDfhClassProjRelMock.SANDBOX_NAMING = ({
    pk_entity: 7002,
    fk_project: ProProjectMock.SANDBOX_PROJECT.pk_entity,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
    enabled_in_entities: false
});
//# sourceMappingURL=ProDfhClassProjRelMock.js.map