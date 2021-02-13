/* eslint-disable @typescript-eslint/camelcase */
import { ProProjectMock } from './ProProjectMock';
/**
 * pk_entity prefix: 100
 */
export class DatNamespaceMock {
}
DatNamespaceMock.SANDBOX_NAMESPACE = ({
    pk_entity: 1001,
    fk_project: ProProjectMock.SANDBOX_PROJECT.pk_entity,
    standard_label: 'Default Namespace'
});
DatNamespaceMock.NAMESPACE_2 = ({
    pk_entity: 1002,
    fk_project: ProProjectMock.PROJECT_2.pk_entity,
    standard_label: 'Default Namespace'
});
//# sourceMappingURL=DatNamespaceMock.js.map