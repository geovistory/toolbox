/* eslint-disable @typescript-eslint/camelcase */
import {InfPersistentItem} from '@kleiolab/lib-sdk-lb4';
import {DfhApiClassMock} from './DfhApiClassMock';
import {OmitEntity} from './local-model.helpers';

/**
 * pk_entity prefix: 200
 */
export class InfPersistentItemMock {
  static readonly PERSON_1: OmitEntity<InfPersistentItem> = ({
    pk_entity: 2001,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
  })

  static readonly GEO_PLACE_MADRID: OmitEntity<InfPersistentItem> = ({
    pk_entity: 2002,
    fk_class: DfhApiClassMock.EN_363_GEO_PLACE.dfh_pk_class,
  })

  static readonly GEO_PLACE_TYPE_CITY: OmitEntity<InfPersistentItem> = ({
    pk_entity: 2003,
    fk_class: DfhApiClassMock.EN_364_GEO_PLACE_TYPE.dfh_pk_class,
  })

  static readonly ALBERT_IV: OmitEntity<InfPersistentItem> = ({
    pk_entity: 2004,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
  })

  static readonly RUDOLF: OmitEntity<InfPersistentItem> = ({
    pk_entity: 2005,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
  })

  static readonly JEAN: OmitEntity<InfPersistentItem> = ({
    pk_entity: 2006,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
  })

  static readonly HANS: OmitEntity<InfPersistentItem> = ({
    pk_entity: 2007,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
  })

  static readonly PIERRE: OmitEntity<InfPersistentItem> = ({
    pk_entity: 2008,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
  })

  static readonly ANGELA: OmitEntity<InfPersistentItem> = ({
    pk_entity: 2009,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
  })

  static readonly HABS_EMP_MANIF_PROD_TYPE: OmitEntity<InfPersistentItem> = ({
    pk_entity: 2010,
    fk_class: DfhApiClassMock.EN_219_MANIFESTATION_PRODUCT_TYPE.dfh_pk_class,
  })

  static readonly HABS_EMP_EXPR: OmitEntity<InfPersistentItem> = ({
    pk_entity: 2011,
    fk_class: DfhApiClassMock.EN_218_EXPRESSION.dfh_pk_class,
  })

  static readonly UNIONS_MANIF_PROD_TYPE: OmitEntity<InfPersistentItem> = ({
    pk_entity: 2012,
    fk_class: DfhApiClassMock.EN_219_MANIFESTATION_PRODUCT_TYPE.dfh_pk_class,
  })

  static readonly UNIONS_EXPR: OmitEntity<InfPersistentItem> = ({
    pk_entity: 2013,
    fk_class: DfhApiClassMock.EN_218_EXPRESSION.dfh_pk_class,
  })

  static readonly VOTTABLE_MANIF_PROD_TYPE: OmitEntity<InfPersistentItem> = ({
    pk_entity: 2014,
    fk_class: DfhApiClassMock.EN_219_MANIFESTATION_PRODUCT_TYPE.dfh_pk_class,
  })

  static readonly VOTTABLE_EXPR: OmitEntity<InfPersistentItem> = ({
    pk_entity: 2015,
    fk_class: DfhApiClassMock.EN_218_EXPRESSION.dfh_pk_class,
  })

  static readonly ACCOUNT_OF_JOURNEY: OmitEntity<InfPersistentItem> = ({
    pk_entity: 2016,
    fk_class: DfhApiClassMock.EN_691_ACCOUNT_OF_A_JOURNEY_OR_STAY.dfh_pk_class,
  })

  static readonly TIME_UNIT_MONTH: OmitEntity<InfPersistentItem> = ({
    pk_entity: 2017,
    fk_class: DfhApiClassMock.EN_690_TIME_UNIT.dfh_pk_class,
  })


  static readonly MANIF_SINGLETON_THE_MURDERER: OmitEntity<InfPersistentItem> = ({
    pk_entity: 2018,
    fk_class: DfhApiClassMock.EN_219_MANIFESTATION_PRODUCT_TYPE.dfh_pk_class,
  })
}