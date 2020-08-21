/* eslint-disable @typescript-eslint/camelcase */
import {InfTemporalEntity} from '../../../../models';
import {DfhApiClassMock} from './DfhApiClassMock';

/**
 * pk_entity prefix: 400
 */
export class InfTemporalEntityMock {
  static readonly NAMING_1 = new InfTemporalEntity({
    pk_entity: 4001,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

}
