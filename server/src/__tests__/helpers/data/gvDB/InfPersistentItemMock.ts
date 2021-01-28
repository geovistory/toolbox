/* eslint-disable @typescript-eslint/camelcase */
import { InfPersistentItem } from '../../../../models';
import { DfhApiClassMock } from './DfhApiClassMock';

/**
 * pk_entity prefix: 200
 */
export class InfPersistentItemMock {
  static readonly PERSON_1: Partial<InfPersistentItem> = ({
    pk_entity: 2001,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
  })

  static readonly GEO_PLACE_MADRID: Partial<InfPersistentItem> = ({
    pk_entity: 2002,
    fk_class: DfhApiClassMock.EN_363_GEO_PLACE.dfh_pk_class,
  })

  static readonly GEO_PLACE_TYPE_CITY: Partial<InfPersistentItem> = ({
    pk_entity: 2003,
    fk_class: DfhApiClassMock.EN_364_GEO_PLACE_TYPE.dfh_pk_class,
  })

  static readonly ALBERT_IV: Partial<InfPersistentItem> = ({
    pk_entity: 2004,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
  })

  static readonly RUDOLF: Partial<InfPersistentItem> = ({
    pk_entity: 2005,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
  })

  static readonly JEAN: Partial<InfPersistentItem> = ({
    pk_entity: 2006,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
  })

  static readonly HANS: Partial<InfPersistentItem> = ({
    pk_entity: 2007,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
  })

  static readonly PIERRE: Partial<InfPersistentItem> = ({
    pk_entity: 2008,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
  })

  static readonly ANGELA: Partial<InfPersistentItem> = ({
    pk_entity: 2009,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
  })

  static readonly HABS_EMP_MANIF_PROD_TYPE: Partial<InfPersistentItem> = ({
    pk_entity: 2010,
    fk_class: DfhApiClassMock.EN_219_MANIFESTATION_PRODUCT_TYPE.dfh_pk_class,
  })

  static readonly HABS_EMP_EXPR: Partial<InfPersistentItem> = ({
    pk_entity: 2011,
    fk_class: DfhApiClassMock.EN_218_EXPRESSION.dfh_pk_class,
  })

  static readonly UNIONS_MANIF_PROD_TYPE: Partial<InfPersistentItem> = ({
    pk_entity: 2012,
    fk_class: DfhApiClassMock.EN_219_MANIFESTATION_PRODUCT_TYPE.dfh_pk_class,
  })

  static readonly UNIONS_EXPR: Partial<InfPersistentItem> = ({
    pk_entity: 2013,
    fk_class: DfhApiClassMock.EN_218_EXPRESSION.dfh_pk_class,
  })
}
