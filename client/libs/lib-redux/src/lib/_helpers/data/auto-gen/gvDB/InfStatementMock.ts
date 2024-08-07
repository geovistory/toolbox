/* eslint-disable @typescript-eslint/naming-convention */
import {InfStatement} from '@kleiolab/lib-sdk-lb4';
import {P_1216_IS_REPRODUCTION_OF_ID, P_1762_HAS_DEFINITION_ID, P_1864_HAS_VALUE_VERSION_ID, P_1872_IS_ANNOTATED_IN_ID, P_1874_AT_POSITION_ID, P_1875_ANNOTATED_ENTITY_ID, P_1879_HAS_VALUE_ID} from '../ontome-ids';
import {DatDigitalMock} from './DatDigitalMock';
import {DfhApiPropertyMock} from './DfhApiPropertyMock';
import {InfAppellationMock} from './InfAppellationMock';
import {InfDimensionMock} from './InfDimensionMock';
import {InfLangStringMock} from './InfLangStringMock';
import {InfLanguageMock} from './InfLanguageMock';
import {InfPlaceMock} from './InfPlaceMock';
import {InfResourceMock} from './InfResourceMock';
import {InfTimePrimitiveMock} from './InfTimePrimitiveMock';
import {OmitEntity} from './local-model.helpers';
import {TabCellXMock} from './TabCellXMock';

/**
 * pk_entity prefix: 300
 */
export class InfStatementMock {

  static readonly NAME_1_TO_PERSON: OmitEntity<InfStatement> = ({
    pk_entity: 3001,
    fk_subject_info: InfResourceMock.NAMING_1.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfResourceMock.PERSON_1.pk_entity,
  })

  static readonly NAME_1_TO_APPE: OmitEntity<InfStatement> = ({
    pk_entity: 3002,
    fk_subject_info: InfResourceMock.NAMING_1.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.JACK_THE_FOO.pk_entity,
  })

  static readonly NAMING_CITY_TO_APPE_CITY: OmitEntity<InfStatement> = ({
    pk_entity: 3003,
    fk_subject_info: InfResourceMock.NAMING_1_CITY.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.CITY.pk_entity,
  })

  static readonly NAMING_CITY_TO_GEO_PLACE_TYPE: OmitEntity<InfStatement> = ({
    pk_entity: 3004,
    fk_subject_info: InfResourceMock.NAMING_1_CITY.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfResourceMock.GEO_PLACE_TYPE_CITY.pk_entity,
  })

  static readonly MADRID_HAS_GEO_PLACE_TYPE_CITY: OmitEntity<InfStatement> = ({
    pk_entity: 3005,
    fk_subject_info: InfResourceMock.GEO_PLACE_MADRID.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE.dfh_pk_property,
    fk_object_info: InfResourceMock.GEO_PLACE_TYPE_CITY.pk_entity,
  })


  static readonly SHIP_VOYAGE_ONGOING_THROUGHOUT_TP_1: OmitEntity<InfStatement> = ({
    pk_entity: 3006,
    fk_subject_info: InfResourceMock.SHIP_VOYAGE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_71_ONGOING_THROUGHOUT.dfh_pk_property,
    fk_object_info: InfTimePrimitiveMock.TP_1.pk_entity,
  })

  static readonly SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2: OmitEntity<InfStatement> = ({
    pk_entity: 3007,
    fk_subject_info: InfResourceMock.SHIP_VOYAGE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_72_AT_SOME_TIME_WITHIN.dfh_pk_property,
    fk_object_info: InfTimePrimitiveMock.TP_2.pk_entity,
  })

  static readonly SHIP_VOYAGE_END_OF_THE_BEGIN_TP_3: OmitEntity<InfStatement> = ({
    pk_entity: 3008,
    fk_subject_info: InfResourceMock.SHIP_VOYAGE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_150_END_OF_THE_BEGIN.dfh_pk_property,
    fk_object_info: InfTimePrimitiveMock.TP_3.pk_entity,
  })

  static readonly SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4: OmitEntity<InfStatement> = ({
    pk_entity: 3009,
    fk_subject_info: InfResourceMock.SHIP_VOYAGE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_151_BEGIN_OF_THE_END.dfh_pk_property,
    fk_object_info: InfTimePrimitiveMock.TP_4.pk_entity,
  })

  static readonly SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5: OmitEntity<InfStatement> = ({
    pk_entity: 3010,
    fk_subject_info: InfResourceMock.SHIP_VOYAGE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_152_BEGIN_OF_THE_BEGIN.dfh_pk_property,
    fk_object_info: InfTimePrimitiveMock.TP_5.pk_entity,
  })

  static readonly SHIP_VOYAGE_END_OF_THE_END_TP_6: OmitEntity<InfStatement> = ({
    pk_entity: 3011,
    fk_subject_info: InfResourceMock.SHIP_VOYAGE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_153_END_OF_THE_END.dfh_pk_property,
    fk_object_info: InfTimePrimitiveMock.TP_6.pk_entity,
  })

  static readonly BIRTH_1_BROUGHT_INTO_LIFE_PERSON_1: OmitEntity<InfStatement> = ({
    pk_entity: 3012,
    fk_subject_info: InfResourceMock.BIRTH_1.pk_entity,
    fk_property: DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_pk_property,
    fk_object_info: InfResourceMock.PERSON_1.pk_entity,
  })


  static readonly BIRTH_1_STEMS_FROM_UNION_1: OmitEntity<InfStatement> = ({
    pk_entity: 3013,
    fk_subject_info: InfResourceMock.BIRTH_1.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1435_STEMS_FROM.dfh_pk_property,
    fk_object_info: InfResourceMock.UNION_1.pk_entity,
  })


  static readonly UNOIN_1_HAS_PARTNER_1: OmitEntity<InfStatement> = ({
    pk_entity: 3014,
    fk_subject_info: InfResourceMock.UNION_1.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1436_HAS_PARTNER.dfh_pk_property,
    fk_object_info: InfResourceMock.PERSON_1.pk_entity,
  })

  static readonly NAMING_2_STADT_TO_APPE_STADT: OmitEntity<InfStatement> = ({
    pk_entity: 3015,
    fk_subject_info: InfResourceMock.NAMING_2_STADT.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.STADT.pk_entity,
  })

  static readonly NAMING_2_STADT_TO_GEO_PLACE_TYPE: OmitEntity<InfStatement> = ({
    pk_entity: 3016,
    fk_subject_info: InfResourceMock.NAMING_2_STADT.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfResourceMock.GEO_PLACE_TYPE_CITY.pk_entity,
  })

  static readonly NAMING_1_ONGOING_THROUGHOUT_TP_1: OmitEntity<InfStatement> = ({
    pk_entity: 3017,
    fk_subject_info: InfResourceMock.NAMING_1.pk_entity,
    fk_property: DfhApiPropertyMock.EN_71_ONGOING_THROUGHOUT.dfh_pk_property,
    fk_object_info: InfTimePrimitiveMock.TP_1.pk_entity,
  })

  static readonly NAMING_ALBERT_TO_APPE_ALBERT: OmitEntity<InfStatement> = ({
    pk_entity: 3018,
    fk_subject_info: InfResourceMock.ALBERT_IV_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.ALERT_IV.pk_entity,
  })

  static readonly NAMING_RUDOLF_TO_APPE_RUDOLF: OmitEntity<InfStatement> = ({
    pk_entity: 3019,
    fk_subject_info: InfResourceMock.RUDOLF_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.RUDOLF.pk_entity,
  })

  static readonly NAMING_ALBERT_TO_PEIT_ALBERT: OmitEntity<InfStatement> = ({
    pk_entity: 3020,
    fk_subject_info: InfResourceMock.ALBERT_IV_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfResourceMock.ALBERT_IV.pk_entity,
  })

  static readonly NAMING_RUDOLF_TO_PEIT_RUDOLF: OmitEntity<InfStatement> = ({
    pk_entity: 3021,
    fk_subject_info: InfResourceMock.RUDOLF_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfResourceMock.RUDOLF.pk_entity,
  })

  static readonly CELL_RUDOLF_NAME_REFERS8_TO_RUDOLF: OmitEntity<InfStatement> = ({
    pk_entity: 3022,
    fk_subject_tables_cell: TabCellXMock.FEATURE_X_2_1.pk_cell,
    fk_property: 1334,
    fk_object_info: InfResourceMock.RUDOLF.pk_entity,
  })

  static readonly NAMING_HABS_EMP_TO_PEIT_HABS_EMP: OmitEntity<InfStatement> = ({
    pk_entity: 3023,
    fk_subject_info: InfResourceMock.HABSBOURG_EMPIRE_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfResourceMock.HABS_EMP_MANIF_PROD_TYPE.pk_entity,
  })

  static readonly NAMING_HABS_EMP_TO_APPE_HABS_EMP: OmitEntity<InfStatement> = ({
    pk_entity: 3024,
    fk_subject_info: InfResourceMock.HABSBOURG_EMPIRE_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.SOURCE_HABSBOURG_EMPIRE.pk_entity,
  })

  static readonly DIGITAL_BIRTHDATES_IS_REPRODUCTION_OF_HABS_EMP: OmitEntity<InfStatement> = ({
    pk_entity: 3025,
    fk_subject_data: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1216_IS_REPRODUCTION_OF.dfh_pk_property,
    fk_object_info: InfResourceMock.HABS_EMP_EXPR.pk_entity,
  })

  static readonly HABS_EMP_CARRIERS_PROVIDED_BY: OmitEntity<InfStatement> = ({
    pk_entity: 3026,
    fk_subject_info: InfResourceMock.HABS_EMP_EXPR.pk_entity,
    fk_property: DfhApiPropertyMock.EN_979_CARRIERS_PROVIDED_BY.dfh_pk_property,
    fk_object_info: InfResourceMock.HABS_EMP_MANIF_PROD_TYPE.pk_entity,
  })

  static readonly DIGITAL_RANDOM_IS_REPRODUCTION_OF_HABS_EMP: OmitEntity<InfStatement> = ({
    pk_entity: 3027,
    fk_subject_data: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1216_IS_REPRODUCTION_OF.dfh_pk_property,
    fk_object_info: InfResourceMock.HABS_EMP_EXPR.pk_entity,
  })

  static readonly TRANSCRIPTION_IS_REPRO_OF_HABS_EMP: OmitEntity<InfStatement> = ({
    pk_entity: 3028,
    fk_subject_info: InfResourceMock.TRANSCRIPTION_RODOLF_FOO.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1216_IS_REPRODUCTION_OF.dfh_pk_property,
    fk_object_info: InfResourceMock.HABS_EMP_EXPR.pk_entity,
  })

  static readonly HABS_EMP_EXPR_MENTIONS_RUDOLF: OmitEntity<InfStatement> = ({
    pk_entity: 3030,
    fk_subject_info: InfResourceMock.HABS_EMP_EXPR.pk_entity,
    fk_property: 1218,
    fk_object_info: InfResourceMock.RUDOLF.pk_entity,
  })


  static readonly NAMING_JEAN_TO_APPE_JEAN: OmitEntity<InfStatement> = ({
    pk_entity: 3031,
    fk_subject_info: InfResourceMock.JEAN_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.JEAN.pk_entity,
  })
  static readonly NAMING_HANS_TO_APPE_HANS: OmitEntity<InfStatement> = ({
    pk_entity: 3032,
    fk_subject_info: InfResourceMock.HANS_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.HANS.pk_entity,
  })
  static readonly NAMING_PIERRE_TO_APPE_PIERRE: OmitEntity<InfStatement> = ({
    pk_entity: 3033,
    fk_subject_info: InfResourceMock.PIERRE_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.PIERRE.pk_entity,
  })
  static readonly NAMING_ANGELA_TO_APPE_ANGELA: OmitEntity<InfStatement> = ({
    pk_entity: 3034,
    fk_subject_info: InfResourceMock.ANGELA_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.ANGELA.pk_entity,
  })

  static readonly NAMING_JEAN_TO_PEIT_JEAN: OmitEntity<InfStatement> = ({
    pk_entity: 3035,
    fk_subject_info: InfResourceMock.JEAN_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfResourceMock.JEAN.pk_entity,
  })
  static readonly NAMING_PIERRE_TO_PEIT_PIERRE: OmitEntity<InfStatement> = ({
    pk_entity: 3036,
    fk_subject_info: InfResourceMock.PIERRE_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfResourceMock.PIERRE.pk_entity,
  })
  static readonly NAMING_HANS_TO_PEIT_HANS: OmitEntity<InfStatement> = ({
    pk_entity: 3037,
    fk_subject_info: InfResourceMock.HANS_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfResourceMock.HANS.pk_entity,
  })
  static readonly NAMING_ANGELA_TO_PEIT_ANGELA: OmitEntity<InfStatement> = ({
    pk_entity: 3038,
    fk_subject_info: InfResourceMock.ANGELA_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfResourceMock.ANGELA.pk_entity,
  })

  static readonly NAMING_UNIONS_TO_PEIT_UNIONS: OmitEntity<InfStatement> = ({
    pk_entity: 3039,
    fk_subject_info: InfResourceMock.UNIONS_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfResourceMock.UNIONS_MANIF_PROD_TYPE.pk_entity,
  })

  static readonly NAMING_UNIONS_TO_APPE_UNIONS: OmitEntity<InfStatement> = ({
    pk_entity: 3040,
    fk_subject_info: InfResourceMock.UNIONS_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.SOURCE_UNIONS.pk_entity,
  })

  static readonly DIGITAL_UNIONS_IS_REPRODUCTION_OF_UNIONS: OmitEntity<InfStatement> = ({
    pk_entity: 3041,
    fk_subject_data: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1216_IS_REPRODUCTION_OF.dfh_pk_property,
    fk_object_info: InfResourceMock.UNIONS_EXPR.pk_entity,
  })

  static readonly UNIONS_CARRIERS_PROVIDED_BY: OmitEntity<InfStatement> = ({
    pk_entity: 3042,
    fk_subject_info: InfResourceMock.UNIONS_EXPR.pk_entity,
    fk_property: DfhApiPropertyMock.EN_979_CARRIERS_PROVIDED_BY.dfh_pk_property,
    fk_object_info: InfResourceMock.UNIONS_MANIF_PROD_TYPE.pk_entity,
  })

  static readonly CELL_JEAN_NAME_REFERS8_TO_JEAN: OmitEntity<InfStatement> = ({
    pk_entity: 3043,
    fk_subject_tables_cell: TabCellXMock.FEATURE_X_UNIONS_JEAN.pk_cell,
    fk_property: 1334,
    fk_object_info: InfResourceMock.JEAN.pk_entity,
  })

  static readonly CELL_UNION_PEOPLE_RUDOLF_NAME_REFERS8_TO_RUDOLF: OmitEntity<InfStatement> = ({
    pk_entity: 3044,
    fk_subject_tables_cell: TabCellXMock.FEATURE_X_UNIONS_RUDOLPH.pk_cell,
    fk_property: 1334,
    fk_object_info: InfResourceMock.RUDOLF.pk_entity,
  })

  static readonly CELL_UNION_UNION_RUDOLF_NAME_REFERS8_TO_RUDOLF: OmitEntity<InfStatement> = ({
    pk_entity: 3045,
    fk_subject_tables_cell: TabCellXMock.FEATURE_X_UNIONS_ANGELA_UNION.pk_cell,
    fk_property: 1334,
    fk_object_info: InfResourceMock.RUDOLF.pk_entity,
  })

  static readonly CELL_UNION_PEOPLE_ANGELA_NAME_REFERS_TO_ANGELA: OmitEntity<InfStatement> = ({
    pk_entity: 3046,
    fk_subject_tables_cell: TabCellXMock.FEATURE_X_UNIONS_ANGELA.pk_cell,
    fk_property: 1334,
    fk_object_info: InfResourceMock.ANGELA.pk_entity,
  })

  static readonly CELL_UNION_UNION_ALBERT_NAME_REFERS_TO_RUDOLPH: OmitEntity<InfStatement> = ({
    pk_entity: 3047,
    fk_subject_tables_cell: TabCellXMock.FEATURE_X_UNIONS_ALBERT_UNION.pk_cell,
    fk_property: 1334,
    fk_object_info: InfResourceMock.RUDOLF.pk_entity,
  })

  static readonly CELL_UNION_PEOPLE_ALBERT_NAME_REFERS_TO_RUDOLPH: OmitEntity<InfStatement> = ({
    pk_entity: 3048,
    fk_subject_tables_cell: TabCellXMock.FEATURE_X_UNIONS_ALBERT.pk_cell,
    fk_property: 1334,
    fk_object_info: InfResourceMock.RUDOLF.pk_entity,
  })


  static readonly UNOIN_1_HAS_PARTNER_2: OmitEntity<InfStatement> = ({
    pk_entity: 3049,
    fk_subject_info: InfResourceMock.UNION_1.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1436_HAS_PARTNER.dfh_pk_property,
    fk_object_info: InfResourceMock.ALBERT_IV.pk_entity,
  })

  static readonly NAMING_ALBERT_2_TO_APPE_ALBERT: OmitEntity<InfStatement> = ({
    pk_entity: 3050,
    fk_subject_info: InfResourceMock.ALBERT_IV_NAMING_2.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.ALBERT.pk_entity,
  })

  static readonly NAMING_ALBERT_2_TO_PEIT_ALBERT: OmitEntity<InfStatement> = ({
    pk_entity: 3051,
    fk_subject_info: InfResourceMock.ALBERT_IV_NAMING_2.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfResourceMock.ALBERT_IV.pk_entity,
  })

  static readonly MADRIDS_PRESENCE_WAS_AT_PLACE_123: OmitEntity<InfStatement> = ({
    pk_entity: 3052,
    fk_subject_info: InfResourceMock.MADRIDS_PRESENCE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_148_WAS_AT.dfh_pk_property,
    fk_object_info: InfPlaceMock.PLACE_123.pk_entity,
  })

  static readonly MADRIDS_PRESENCE_WAS_PRESENCE_OF: OmitEntity<InfStatement> = ({
    pk_entity: 3053,
    fk_subject_info: InfResourceMock.MADRIDS_PRESENCE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_147_WAS_A_PRESENCE_OF_GEO_PLACE.dfh_pk_property,
    fk_object_info: InfResourceMock.GEO_PLACE_MADRID.pk_entity,
  })

  static readonly ACCOUNT_OF_JOURNEY_HAS_DURATION: OmitEntity<InfStatement> = ({
    pk_entity: 3054,
    fk_subject_info: InfResourceMock.ACCOUNT_OF_JOURNEY.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1613_HAS_DURATION.dfh_pk_property,
    fk_object_info: InfDimensionMock.ONE_MONTH.pk_entity,
  })


  static readonly MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER: OmitEntity<InfStatement> = ({
    pk_entity: 3055,
    fk_subject_info: InfResourceMock.MANIF_SINGLETON_THE_MURDERER.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1761_MANIFESTATION_SINGLETON_HAS_SHORT_TITLE.dfh_pk_property,
    fk_object_info: InfLangStringMock.EN_SHORT_TITLE_THE_MURDERER.pk_entity,
  })

  static readonly NAME_1_TO_LANG: OmitEntity<InfStatement> = ({
    pk_entity: 3056,
    fk_subject_info: InfResourceMock.NAMING_1.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1112_USED_IN_LANGUAGE.dfh_pk_property,
    fk_object_info: InfLanguageMock.ENGLISH.pk_entity,
  })


  static readonly EXPR_PORTION_CHAPTER_1_IS_PART_OF_HABS_EMP_EXPR: OmitEntity<InfStatement> = ({
    pk_entity: 3057,
    fk_subject_info: InfResourceMock.EXPRESSION_PORTION_HABS_EMP_CHAPTER_1.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1317_IS_PART_OF.dfh_pk_property,
    fk_object_info: InfResourceMock.HABS_EMP_EXPR.pk_entity,
  })
  static readonly EXPR_PORTION_CHAPTER_2_IS_PART_OF_EXPR_PORTION_CHAPTER_1: OmitEntity<InfStatement> = ({
    pk_entity: 3058,
    fk_subject_info: InfResourceMock.EXPRESSION_PORTION_HABS_EMP_CHAPTER_2.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1317_IS_PART_OF.dfh_pk_property,
    fk_object_info: InfResourceMock.EXPRESSION_PORTION_HABS_EMP_CHAPTER_1.pk_entity,
  })

  static readonly NAME_1_TO_TYPE: OmitEntity<InfStatement> = ({
    pk_entity: 3059,
    fk_subject_info: InfResourceMock.NAMING_1.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1430_HAS_APPELLATION_FOR_LANGUAGE_TYPE.dfh_pk_property,
    fk_object_info: InfResourceMock.APPE_IN_LANG_TYPE_FIRST_NAME.pk_entity,
  })

  static readonly NAME_2_TO_PERSON: OmitEntity<InfStatement> = ({
    pk_entity: 3060,
    fk_subject_info: InfResourceMock.NAMING_2.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfResourceMock.PERSON_1.pk_entity,
  })

  static readonly NAME_2_TO_APPE: OmitEntity<InfStatement> = ({
    pk_entity: 3061,
    fk_subject_info: InfResourceMock.NAMING_2.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.JACK.pk_entity,
  })
  // static readonly EXPRESSION_MENTIONS_RUDOLF: OmitEntity<InfStatement> = ({
  //   pk_entity: 3062,
  //   fk_subject_info: InfResourceMock.HABS_EMP_EXPR.pk_entity,
  //   fk_property: DfhApiPropertyMock.EN_1218_MENTIONS.dfh_pk_property,
  //   fk_object_info: InfResourceMock.RUDOLF.pk_entity,
  // })

  // static readonly MENTIONS_STMT_HAS_EXACT_REFERENCE: OmitEntity<InfStatement> = ({
  //   pk_entity: 3063,
  //   fk_subject_info: InfStatementMock.EXPRESSION_MENTIONS_RUDOLF.pk_entity,
  //   fk_property_of_property: 1,
  //   fk_object_info: InfLangStringMock.EN_PAGE_1.pk_entity,
  // })

  static readonly DEFINITION_1_HAS_VALUE_VERSION_1: OmitEntity<InfStatement> = ({
    pk_entity: 3061,
    fk_subject_info: InfResourceMock.DEFINITION_1.pk_entity,
    fk_property: P_1864_HAS_VALUE_VERSION_ID,
    fk_object_info: InfAppellationMock.VALUE_VERSION_1.pk_entity,
  })
  static readonly DEFINITION_1_HAS_VALUE_VERSION_2: OmitEntity<InfStatement> = ({
    pk_entity: 3062,
    fk_subject_info: InfResourceMock.DEFINITION_1.pk_entity,
    fk_property: P_1864_HAS_VALUE_VERSION_ID,
    fk_object_info: InfAppellationMock.VALUE_VERSION_2.pk_entity,
  })

  static readonly TRANSCRIPTION_RODOLF_HAS_VALUE_VERSION: OmitEntity<InfStatement> = ({
    pk_entity: 3063,
    fk_subject_info: InfResourceMock.TRANSCRIPTION_RODOLF_FOO.pk_entity,
    fk_property: P_1864_HAS_VALUE_VERSION_ID,
    fk_object_info: InfAppellationMock.TEXT_VALUE_RODOLF_FOO_V1.pk_entity,
  })

  static readonly ANNOTATION_RUDOLF_HAS_SPOT: OmitEntity<InfStatement> = ({
    pk_entity: 3064,
    fk_subject_info: InfResourceMock.ANNOTATION_RUDOLF.pk_entity,
    fk_property: P_1874_AT_POSITION_ID,
    fk_object_info: InfAppellationMock.CHUNK_RUDOLF.pk_entity,
  })

  static readonly ANNOTATION_RUDOLF_REFERS_TO_RUDOLF: OmitEntity<InfStatement> = ({
    pk_entity: 3065,
    fk_subject_info: InfResourceMock.ANNOTATION_RUDOLF.pk_entity,
    fk_property: P_1875_ANNOTATED_ENTITY_ID,
    fk_object_info: InfResourceMock.RUDOLF.pk_entity,
  })
  static readonly ANNOTATION_RUDOLF_IS_ANNOTATED_IN: OmitEntity<InfStatement> = ({
    pk_entity: 3066,
    fk_subject_info: InfResourceMock.ANNOTATION_RUDOLF.pk_entity,
    fk_property: P_1872_IS_ANNOTATED_IN_ID,
    fk_object_info: InfResourceMock.TRANSCRIPTION_RODOLF_FOO.pk_entity,
  })

  static readonly TABLE_1_HAS_VALUE_TABLE_UNOIN: OmitEntity<InfStatement> = ({
    pk_entity: 3067,
    fk_subject_info: InfResourceMock.TABLE_1.pk_entity,
    fk_property: P_1879_HAS_VALUE_ID,
    fk_object_data: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
  })


  static readonly ANNOTATION_ANGELA_HAS_SPOT: OmitEntity<InfStatement> = ({
    pk_entity: 3068,
    fk_subject_info: InfResourceMock.ANNOTATION_ANGELA.pk_entity,
    fk_property: P_1874_AT_POSITION_ID,
    fk_object_tables_cell: TabCellXMock.FEATURE_X_UNIONS_ANGELA.pk_cell,
  })

  static readonly ANNOTATION_ANGELA_REFERS_TO_ANGELA: OmitEntity<InfStatement> = ({
    pk_entity: 3069,
    fk_subject_info: InfResourceMock.ANNOTATION_ANGELA.pk_entity,
    fk_property: P_1875_ANNOTATED_ENTITY_ID,
    fk_object_info: InfResourceMock.ANGELA.pk_entity,
  })
  static readonly ANNOTATION_ANGELA_IS_ANNOTATED_IN: OmitEntity<InfStatement> = ({
    pk_entity: 3070,
    fk_subject_info: InfResourceMock.ANNOTATION_ANGELA.pk_entity,
    fk_property: P_1872_IS_ANNOTATED_IN_ID,
    fk_object_info: InfResourceMock.TABLE_1.pk_entity,
  })
  static readonly PERSON_1_HAS_DEFINITION: OmitEntity<InfStatement> = ({
    pk_entity: 3071,
    fk_subject_info: InfResourceMock.PERSON_1.pk_entity,
    fk_property: P_1762_HAS_DEFINITION_ID,
    fk_object_info: InfResourceMock.DEFINITION_1.pk_entity,
  })

  static readonly HIDDEN_TRANSCRIPTION_IS_REPRO_OF_CHAPTER_1: OmitEntity<InfStatement> = ({
    pk_entity: 3072,
    fk_subject_info: InfResourceMock.HIDDEN_TRANSCRIPTION_CHAPTER_1.pk_entity,
    fk_property: P_1216_IS_REPRODUCTION_OF_ID,
    fk_object_info: InfResourceMock.EXPRESSION_PORTION_HABS_EMP_CHAPTER_1.pk_entity,
  })
  static readonly SHARED_TRANSCRIPTION_IS_REPRO_OF_CHAPTER_1: OmitEntity<InfStatement> = ({
    pk_entity: 3073,
    fk_subject_info: InfResourceMock.TRANSCRIPTION_RODOLF_FOO.pk_entity,
    fk_property: P_1216_IS_REPRODUCTION_OF_ID,
    fk_object_info: InfResourceMock.EXPRESSION_PORTION_HABS_EMP_CHAPTER_1.pk_entity,
  })

}


/**
 * SQL to create mock items
 */
// SELECT jsonb_pretty(jsonb_build_object(
//   'pk_entity',pk_entity,
//   'tmsp_last_modification', tmsp_last_modification,
//   'dfh_pk_class',dfh_pk_class,
//   'dfh_class_identifier_in_namespace',dfh_class_identifier_in_namespace,
//   'dfh_class_label_language',dfh_class_label_language,
//   'dfh_class_label',dfh_class_label,
//   'dfh_class_scope_note_language',dfh_class_scope_note_language,
//   'dfh_class_scope_note',dfh_class_scope_note,
//   'dfh_basic_type',dfh_basic_type,
//   'dfh_basic_type_label',dfh_basic_type_label,
//   'dfh_fk_namespace',dfh_fk_namespace,
//   'dfh_namespace_label_language',dfh_namespace_label_language,
//   'dfh_namespace_label',dfh_namespace_label,
//   'dfh_namespace_uri',dfh_namespace_uri,
//   'dfh_profile_association_type',dfh_profile_association_type,
//   'dfh_fk_profile',dfh_fk_profile,
//   'dfh_profile_label_language',dfh_profile_label_language,
//   'dfh_profile_label',dfh_profile_label
//   ))
//   FROM data_for_history.api_class t1
//   WHERE dfh_pk_class = 365
//   AND dfh_profile_association_type='selected'
