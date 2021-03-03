/* eslint-disable @typescript-eslint/camelcase */
import {InfPlace} from '../../../../models';
import {DfhApiClassMock} from './DfhApiClassMock';
import {OmitEntity} from './local-model.helpers';

/**
 * pk_entity prefix: 700
 */

export class InfPlaceMock {
  static readonly PLACE_123: OmitEntity<InfPlace> = {
    pk_entity: 7001,
    fk_class: DfhApiClassMock.EN_51_PLACE.dfh_pk_class,
    lat: 123,
    long: 123
  }

}
