/* eslint-disable @typescript-eslint/camelcase */
import {InfAppellation} from '../../../../models';
import {DfhApiClassMock} from './DfhApiClassMock';

/**
 * pk_entity prefix: 500
 */

export class InfAppellationMock {
  static readonly JACK_THE_FOO = new InfAppellation({
    pk_entity: 5001,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Jack the foo'
  })
  static readonly JACK = new InfAppellation({
    pk_entity: 5002,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Jack'
  })

}
