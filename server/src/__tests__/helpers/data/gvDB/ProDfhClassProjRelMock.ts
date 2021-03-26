/* eslint-disable @typescript-eslint/camelcase */
import { ProDfhClassProjRel } from '../../../../models';
import { DfhApiClassMock } from './DfhApiClassMock';
import { ProProjectMock } from './ProProjectMock';

/**
 * pk_entity prefixed with 700
 */

export class ProDfhClassProjRelMock {
    static readonly SANDBOX_PERSON: Partial<ProDfhClassProjRel> = ({
        pk_entity: 7001,
        fk_project: ProProjectMock.SANDBOX_PROJECT.pk_entity,
        fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
        enabled_in_entities: true
    })

    static readonly SANDBOX_NAMING: Partial<ProDfhClassProjRel> = ({
        pk_entity: 7002,
        fk_project: ProProjectMock.SANDBOX_PROJECT.pk_entity,
        fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
        enabled_in_entities: false
    })

}
