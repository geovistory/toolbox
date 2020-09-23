/* eslint-disable @typescript-eslint/camelcase */
import {InfPersistentItem} from '../../../../models';
import {DfhApiClassMock} from './DfhApiClassMock';

/**
 * pk_entity prefix: 200
 */
export class InfPersistentItemMock {
  static readonly PERSON_1 = new InfPersistentItem({
    pk_entity: 2001,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
  })

  static readonly GEO_PLACE_MADRID = new InfPersistentItem({
    pk_entity: 2002,
    fk_class: DfhApiClassMock.EN_363_GEO_PLACE.dfh_pk_class,
  })

  static readonly GEO_PLACE_TYPE_CITY = new InfPersistentItem({
    pk_entity: 2003,
    fk_class: DfhApiClassMock.EN_364_GEO_PLACE_TYPE.dfh_pk_class,
  })

  static readonly ALBERT_IV = new InfPersistentItem({
    pk_entity: 2004,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
  })

  static readonly RUDOLF = new InfPersistentItem({
    pk_entity: 2005,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
  })

}
