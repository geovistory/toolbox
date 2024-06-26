import {InfResource} from '@kleiolab/lib-sdk-lb4';
import {C_365_APPELLATION_IN_A_LANGUAGE_ID, C_785_TEXT_ID, C_898_TABLE_ID, C_899_DEFINITION_ID, C_933_ANNOTATION_IN_TEXT_ID, C_934_ANNOTATION_IN_TABLE_ID} from '../ontome-ids';
import {DfhApiClassMock} from './DfhApiClassMock';
import {OmitEntity} from './local-model.helpers';

/**
 * pk_entity prefix: 400
 */
export class InfResourceMock {
  static readonly PERSON_1: OmitEntity<InfResource> = ({
    pk_entity: 2001,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly GEO_PLACE_MADRID: OmitEntity<InfResource> = ({
    pk_entity: 2002,
    fk_class: DfhApiClassMock.EN_363_GEO_PLACE.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly GEO_PLACE_TYPE_CITY: OmitEntity<InfResource> = ({
    pk_entity: 2003,
    fk_class: DfhApiClassMock.EN_364_GEO_PLACE_TYPE.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly ALBERT_IV: OmitEntity<InfResource> = ({
    pk_entity: 2004,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly RUDOLF: OmitEntity<InfResource> = ({
    pk_entity: 2005,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly JEAN: OmitEntity<InfResource> = ({
    pk_entity: 2006,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly HANS: OmitEntity<InfResource> = ({
    pk_entity: 2007,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly PIERRE: OmitEntity<InfResource> = ({
    pk_entity: 2008,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly ANGELA: OmitEntity<InfResource> = ({
    pk_entity: 2009,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly HABS_EMP_MANIF_PROD_TYPE: OmitEntity<InfResource> = ({
    pk_entity: 2010,
    fk_class: DfhApiClassMock.EN_219_MANIFESTATION_PRODUCT_TYPE.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly HABS_EMP_EXPR: OmitEntity<InfResource> = ({
    pk_entity: 2011,
    fk_class: DfhApiClassMock.EN_218_EXPRESSION.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly UNIONS_MANIF_PROD_TYPE: OmitEntity<InfResource> = ({
    pk_entity: 2012,
    fk_class: DfhApiClassMock.EN_219_MANIFESTATION_PRODUCT_TYPE.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly UNIONS_EXPR: OmitEntity<InfResource> = ({
    pk_entity: 2013,
    fk_class: DfhApiClassMock.EN_218_EXPRESSION.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly VOTTABLE_MANIF_PROD_TYPE: OmitEntity<InfResource> = ({
    pk_entity: 2014,
    fk_class: DfhApiClassMock.EN_219_MANIFESTATION_PRODUCT_TYPE.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly VOTTABLE_EXPR: OmitEntity<InfResource> = ({
    pk_entity: 2015,
    fk_class: DfhApiClassMock.EN_218_EXPRESSION.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly ACCOUNT_OF_JOURNEY: OmitEntity<InfResource> = ({
    pk_entity: 2016,
    fk_class: DfhApiClassMock.EN_691_ACCOUNT_OF_A_JOURNEY_OR_STAY.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly TIME_UNIT_MONTH: OmitEntity<InfResource> = ({
    pk_entity: 2017,
    fk_class: DfhApiClassMock.EN_690_TIME_UNIT.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })


  static readonly MANIF_SINGLETON_THE_MURDERER: OmitEntity<InfResource> = ({
    pk_entity: 2018,
    fk_class: DfhApiClassMock.EN_219_MANIFESTATION_PRODUCT_TYPE.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly NAMING_1: OmitEntity<InfResource> = ({
    pk_entity: 4001,
    fk_class: C_365_APPELLATION_IN_A_LANGUAGE_ID,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly NAMING_1_CITY: OmitEntity<InfResource> = ({
    pk_entity: 4002,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly NAMING_2_STADT: OmitEntity<InfResource> = ({
    pk_entity: 4003,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly SHIP_VOYAGE: OmitEntity<InfResource> = ({
    pk_entity: 4004,
    fk_class: DfhApiClassMock.EN_523_SHIP_VOYAGE.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly BIRTH_1: OmitEntity<InfResource> = ({
    pk_entity: 4005,
    fk_class: DfhApiClassMock.EN_61_BIRTH.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly UNION_1: OmitEntity<InfResource> = ({
    pk_entity: 4006,
    fk_class: DfhApiClassMock.EN_633_UNION.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly ALBERT_IV_NAMING: OmitEntity<InfResource> = ({
    pk_entity: 4007,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly RUDOLF_NAMING: OmitEntity<InfResource> = ({
    pk_entity: 4008,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly JEAN_NAMING: OmitEntity<InfResource> = ({
    pk_entity: 4009,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly HANS_NAMING: OmitEntity<InfResource> = ({
    pk_entity: 4010,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly PIERRE_NAMING: OmitEntity<InfResource> = ({
    pk_entity: 4011,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly ANGELA_NAMING: OmitEntity<InfResource> = ({
    pk_entity: 4012,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly HABSBOURG_EMPIRE_NAMING: OmitEntity<InfResource> = ({
    pk_entity: 4013,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly UNIONS_NAMING: OmitEntity<InfResource> = ({
    pk_entity: 4014,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly ALBERT_IV_NAMING_2: OmitEntity<InfResource> = ({
    pk_entity: 4015,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly VOTTABLE_NAMING: OmitEntity<InfResource> = ({
    pk_entity: 4016,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly MADRIDS_PRESENCE: OmitEntity<InfResource> = ({
    pk_entity: 4017,
    fk_class: DfhApiClassMock.EN_51_PLACE.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly EXPRESSION_PORTION_HABS_EMP_CHAPTER_1: OmitEntity<InfResource> = ({
    pk_entity: 4018,
    fk_class: DfhApiClassMock.EN_503_EXPRESSION_PORTION.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })
  static readonly EXPRESSION_PORTION_HABS_EMP_CHAPTER_2: OmitEntity<InfResource> = ({
    pk_entity: 4019,
    fk_class: DfhApiClassMock.EN_503_EXPRESSION_PORTION.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly APPE_IN_LANG_TYPE_FIRST_NAME: OmitEntity<InfResource> = ({
    pk_entity: 4020,
    fk_class: DfhApiClassMock.EN_630_APPELLATION_IN_A_LANGUAGE_TYPE.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })
  static readonly APPE_IN_LANG_TYPE_LAST_NAME: OmitEntity<InfResource> = ({
    pk_entity: 4021,
    fk_class: DfhApiClassMock.EN_630_APPELLATION_IN_A_LANGUAGE_TYPE.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly VOLUME_UNIT_CUBIC_METER: OmitEntity<InfResource> = ({
    pk_entity: 4022,
    fk_class: DfhApiClassMock.EN_715_VOLUME_MEASUREMENT_UNIT.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly GEO_PLACE_TYPE_VILLAGE: OmitEntity<InfResource> = ({
    pk_entity: 4023,
    fk_class: DfhApiClassMock.EN_364_GEO_PLACE_TYPE.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly NAMING_2: OmitEntity<InfResource> = ({
    pk_entity: 4024,
    fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly DEFINITION_1: OmitEntity<InfResource> = ({
    pk_entity: 4025,
    fk_class: C_899_DEFINITION_ID,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly TYPE_OF_MANIF_PROD_TYPE_BOOK: OmitEntity<InfResource> = ({
    pk_entity: 4026,
    fk_class: DfhApiClassMock.EN_452_TYPE_OF_MANIFESTATION_PRODUCT_TYPE.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })
  static readonly TYPE_OF_MANIF_PROD_TYPE_JOURNAL: OmitEntity<InfResource> = ({
    pk_entity: 4027,
    fk_class: DfhApiClassMock.EN_452_TYPE_OF_MANIFESTATION_PRODUCT_TYPE.dfh_pk_class,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })
  static readonly TRANSCRIPTION_RODOLF_FOO: OmitEntity<InfResource> = ({
    pk_entity: 4028,
    fk_class: C_785_TEXT_ID,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })
  static readonly ANNOTATION_RUDOLF: OmitEntity<InfResource> = ({
    pk_entity: 4029,
    fk_class: C_933_ANNOTATION_IN_TEXT_ID,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })

  static readonly TABLE_1: OmitEntity<InfResource> = ({
    pk_entity: 4030,
    fk_class: C_898_TABLE_ID,
    community_visibility: {toolbox: false, dataApi: false, website: false}
  })
  static readonly ANNOTATION_ANGELA: OmitEntity<InfResource> = ({
    pk_entity: 4031,
    fk_class: C_934_ANNOTATION_IN_TABLE_ID,
    community_visibility: {toolbox: true, dataApi: true, website: true}
  })
  static readonly HIDDEN_TRANSCRIPTION_CHAPTER_1: OmitEntity<InfResource> = ({
    pk_entity: 4032,
    fk_class: C_785_TEXT_ID,
    community_visibility: {toolbox: false, dataApi: false, website: false}
  })
}
