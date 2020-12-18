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
    string: 'Jack the foo',
  })
  static readonly JACK = new InfAppellation({
    pk_entity: 5002,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Jack'
  })
  static readonly CITY = new InfAppellation({
    pk_entity: 5003,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'City'
  })
  static readonly STADT = new InfAppellation({
    pk_entity: 5004,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Stadt'
  })
  static readonly ALERT_IV = new InfAppellation({
    pk_entity: 5005,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Albert IV'
  })
  static readonly RUDOLF = new InfAppellation({
    pk_entity: 5006,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Rudolf of Habsbourg'
  })
  static readonly JEAN = new InfAppellation({
    pk_entity: 5007,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Jean'
  })
  static readonly HANS = new InfAppellation({
    pk_entity: 5008,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Hans'
  })
  static readonly PIERRE = new InfAppellation({
    pk_entity: 5009,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Pierre'
  })
  static readonly ANGELA = new InfAppellation({
    pk_entity: 5010,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Angela'
  })
  static readonly SOURCE_HABSBOURG_EMPIRE = new InfAppellation({
    pk_entity: 5011,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Habsbourg Empire'
  })
  static readonly SOURCE_UNIONS = new InfAppellation({
    pk_entity: 5012,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Unions'
  })
  static readonly ALBERT = new InfAppellation({
    pk_entity: 5013,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Albert'
  })

}
