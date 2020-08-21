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

}
