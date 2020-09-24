/* eslint-disable @typescript-eslint/camelcase */

import { DatNamespace } from '../../../../models';
import { ProProjectMock } from './ProProjectMock';

/**
 * pk_entity prefix: 100
 */
export class DatNamespaceMock {
    static readonly NAMESPACE_2 = new DatNamespace({
        pk_entity: 1001,
        fk_project: ProProjectMock.PROJECT_2.pk_entity,
        standard_label: 'Default Namespace'
    })
}
