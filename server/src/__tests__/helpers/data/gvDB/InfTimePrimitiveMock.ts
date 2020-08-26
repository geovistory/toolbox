/* eslint-disable @typescript-eslint/camelcase */
import {InfTimePrimitive} from '../../../../models';
import {DfhApiClassMock} from './DfhApiClassMock';

/**
 * pk_entity prefix: 600
 */

export class InfTimePrimitiveMock {
  static readonly JACK_THE_FOO = new InfTimePrimitive({
    pk_entity: 6001,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Jack the foo'
  })
  static readonly JACK = new InfTimePrimitive({
    pk_entity: 6002,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Jack'
  })
  static readonly CITY = new InfTimePrimitive({
    pk_entity: 6003,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'City'
  })

}
