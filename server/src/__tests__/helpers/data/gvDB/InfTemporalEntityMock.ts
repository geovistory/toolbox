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

  static readonly NAMING_CITY = new InfTemporalEntity({
    pk_entity: 4002,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
  })

  static readonly SHIP_VOYAGE = new InfTemporalEntity({
    pk_entity: 4003,
    fk_class: DfhApiClassMock.EN_523_SHIP_VOYAGE.dfh_pk_class,
  })

}