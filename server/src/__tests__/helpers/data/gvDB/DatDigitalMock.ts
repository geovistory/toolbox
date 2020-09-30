/* eslint-disable @typescript-eslint/camelcase */

import {DatDigital} from '../../../../models';
import {DatNamespaceMock} from './DatNamespaceMock';
import {SysSystemTypeMock} from './SysSystemTypeMock';

/**
 * pk_entity prefix: 200
 */
export class DatDigitalMock {
    static readonly DIGITAL_BIRTHDATES = new DatDigital({
        pk_entity: 2001,
        fk_namespace: DatNamespaceMock.NAMESPACE_2.pk_entity,
        fk_system_type: SysSystemTypeMock.DIGITAL_TABLE.pk_entity,
        string: '',
    })
}
