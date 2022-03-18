/* eslint-disable @typescript-eslint/camelcase */

import {DatNamespace} from '../../../../models';
import {ProProjectMock} from './ProProjectMock';

/**
 * pk_entity prefix: 100
 */
export class DatNamespaceMock {

    static readonly SANDBOX_NAMESPACE: Partial<DatNamespace> = ({
        pk_entity: 1001,
        fk_project: ProProjectMock.SANDBOX_PROJECT.pk_entity,
        standard_label: 'Default Namespace'
    })

    static readonly NAMESPACE_2: Partial<DatNamespace> = ({
        pk_entity: 1002,
        fk_project: ProProjectMock.PROJECT_2.pk_entity,
        standard_label: 'Default Namespace'
    })
    static readonly NAMESPACE_1: Partial<DatNamespace> = ({
        pk_entity: 1001,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        standard_label: 'Default Namespace'
    })
}
