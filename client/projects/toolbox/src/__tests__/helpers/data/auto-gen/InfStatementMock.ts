/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/camelcase */
import { InfStatement } from 'projects/toolbox/src/app/core/sdk-lb4';
import { DatDigitalMock } from './DatDigitalMock';
import { DfhApiPropertyMock } from './DfhApiPropertyMock';
import { InfAppellationMock } from './InfAppellationMock';
import { InfPersistentItemMock } from './InfPersistentItemMock';
import { InfTemporalEntityMock } from './InfTemporalEntityMock';
import { InfTimePrimitiveMock } from './InfTimePrimitiveMock';
import { TabCellXMock } from './TabCellXMock';
import { DatChunkMock } from './DatChunkMock';

/**
 * pk_entity prefix: 300
 */
export class InfStatementMock {

  static readonly NAME_1_TO_PERSON: Partial<InfStatement> = ({
    pk_entity: 3001,
    fk_subject_info: InfTemporalEntityMock.NAMING_1.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.PERSON_1.pk_entity,
  })

  static readonly NAME_1_TO_APPE: Partial<InfStatement> = ({
    pk_entity: 3002,
    fk_subject_info: InfTemporalEntityMock.NAMING_1.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.JACK_THE_FOO.pk_entity,
  })

  static readonly NAMING_CITY_TO_APPE_CITY: Partial<InfStatement> = ({
    pk_entity: 3003,
    fk_subject_info: InfTemporalEntityMock.NAMING_1_CITY.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.CITY.pk_entity,
  })

  static readonly NAMING_CITY_TO_GEO_PLACE_TYPE: Partial<InfStatement> = ({
    pk_entity: 3004,
    fk_subject_info: InfTemporalEntityMock.NAMING_1_CITY.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.GEO_PLACE_TYPE_CITY.pk_entity,
  })

  static readonly MADRID_HAS_GEO_PLACE_TYPE_CITY: Partial<InfStatement> = ({
    pk_entity: 3005,
    fk_subject_info: InfPersistentItemMock.GEO_PLACE_MADRID.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.GEO_PLACE_TYPE_CITY.pk_entity,
  })


  static readonly SHIP_VOYAGE_ONGOING_THROUGHOUT_TP_1: Partial<InfStatement> = ({
    pk_entity: 3006,
    fk_subject_info: InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_71_ONGOING_THOUGHOUT.dfh_pk_property,
    fk_object_info: InfTimePrimitiveMock.TP_1.pk_entity,
  })

  static readonly SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2: Partial<InfStatement> = ({
    pk_entity: 3007,
    fk_subject_info: InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_72_AT_SOME_TIME_WITHIN.dfh_pk_property,
    fk_object_info: InfTimePrimitiveMock.TP_2.pk_entity,
  })

  static readonly SHIP_VOYAGE_END_OF_THE_BEGIN_TP_3: Partial<InfStatement> = ({
    pk_entity: 3008,
    fk_subject_info: InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_150_END_OF_THE_BEGIN.dfh_pk_property,
    fk_object_info: InfTimePrimitiveMock.TP_3.pk_entity,
  })

  static readonly SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4: Partial<InfStatement> = ({
    pk_entity: 3009,
    fk_subject_info: InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_151_BEGIN_OF_THE_END.dfh_pk_property,
    fk_object_info: InfTimePrimitiveMock.TP_4.pk_entity,
  })

  static readonly SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5: Partial<InfStatement> = ({
    pk_entity: 3010,
    fk_subject_info: InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_152_BEGIN_OF_THE_BEGIN.dfh_pk_property,
    fk_object_info: InfTimePrimitiveMock.TP_5.pk_entity,
  })

  static readonly SHIP_VOYAGE_END_OF_THE_END_TP_6: Partial<InfStatement> = ({
    pk_entity: 3011,
    fk_subject_info: InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_153_END_OF_THE_END.dfh_pk_property,
    fk_object_info: InfTimePrimitiveMock.TP_6.pk_entity,
  })

  static readonly BIRTH_1_BROUGHT_INTO_LIFE_PERSON_1: Partial<InfStatement> = ({
    pk_entity: 3012,
    fk_subject_info: InfTemporalEntityMock.BIRTH_1.pk_entity,
    fk_property: DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.PERSON_1.pk_entity,
  })


  static readonly BIRTH_1_STEMS_FROM_UNION_1: Partial<InfStatement> = ({
    pk_entity: 3013,
    fk_subject_info: InfTemporalEntityMock.BIRTH_1.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1435_STEMS_FROM.dfh_pk_property,
    fk_object_info: InfTemporalEntityMock.UNION_1.pk_entity,
  })


  static readonly UNOIN_1_HAS_PARTNER_1: Partial<InfStatement> = ({
    pk_entity: 3014,
    fk_subject_info: InfTemporalEntityMock.UNION_1.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1436_HAS_PARTNER.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.PERSON_1.pk_entity,
  })

  static readonly NAMING_2_STADT_TO_APPE_STADT: Partial<InfStatement> = ({
    pk_entity: 3015,
    fk_subject_info: InfTemporalEntityMock.NAMING_2_STADT.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.STADT.pk_entity,
  })

  static readonly NAMING_2_STADT_TO_GEO_PLACE_TYPE: Partial<InfStatement> = ({
    pk_entity: 3016,
    fk_subject_info: InfTemporalEntityMock.NAMING_2_STADT.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.GEO_PLACE_TYPE_CITY.pk_entity,
  })

  static readonly NAMING_1_ONGOING_THROUGHOUT_TP_1: Partial<InfStatement> = ({
    pk_entity: 3017,
    fk_subject_info: InfTemporalEntityMock.NAMING_1.pk_entity,
    fk_property: DfhApiPropertyMock.EN_71_ONGOING_THOUGHOUT.dfh_pk_property,
    fk_object_info: InfTimePrimitiveMock.TP_1.pk_entity,
  })

  static readonly NAMING_ALBERT_TO_APPE_ALBERT: Partial<InfStatement> = ({
    pk_entity: 3018,
    fk_subject_info: InfTemporalEntityMock.ALBERT_IV_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.ALERT_IV.pk_entity,
  })

  static readonly NAMING_RUDOLF_TO_APPE_RUDOLF: Partial<InfStatement> = ({
    pk_entity: 3019,
    fk_subject_info: InfTemporalEntityMock.RUDOLF_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.RUDOLF.pk_entity,
  })

  static readonly NAMING_ALBERT_TO_PEIT_ALBERT: Partial<InfStatement> = ({
    pk_entity: 3020,
    fk_subject_info: InfTemporalEntityMock.ALBERT_IV_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.ALBERT_IV.pk_entity,
  })

  static readonly NAMING_RUDOLF_TO_PEIT_RUDOLF: Partial<InfStatement> = ({
    pk_entity: 3021,
    fk_subject_info: InfTemporalEntityMock.RUDOLF_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.RUDOLF.pk_entity,
  })

  static readonly CELL_RUDOLF_NAME_REFERS8_TO_RUDOLF: Partial<InfStatement> = ({
    pk_entity: 3022,
    fk_subject_tables_cell: TabCellXMock.FEATURE_X_2_1.pk_cell,
    fk_property: 1334,
    fk_object_info: InfPersistentItemMock.RUDOLF.pk_entity,
  })

  static readonly NAMING_HABS_EMP_TO_PEIT_HABS_EMP: Partial<InfStatement> = ({
    pk_entity: 3023,
    fk_subject_info: InfTemporalEntityMock.HABSBOURG_EMPIRE_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.HABS_EMP_MANIF_PROD_TYPE.pk_entity,
  })

  static readonly NAMING_HABS_EMP_TO_APPE_HABS_EMP: Partial<InfStatement> = ({
    pk_entity: 3024,
    fk_subject_info: InfTemporalEntityMock.HABSBOURG_EMPIRE_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.SOURCE_HABSBOURG_EMPIRE.pk_entity,
  })

  static readonly DIGITAL_BIRTHDATES_IS_REPRODUCTION_OF_HABS_EMP: Partial<InfStatement> = ({
    pk_entity: 3025,
    fk_subject_data: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1216_IS_REPRODUCTION_OF.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.HABS_EMP_EXPR.pk_entity,
  })

  static readonly HABS_EMP_CARRIERS_PROVIDED_BY: Partial<InfStatement> = ({
    pk_entity: 3026,
    fk_subject_info: InfPersistentItemMock.HABS_EMP_EXPR.pk_entity,
    fk_property: DfhApiPropertyMock.EN_979_CARRIERS_PROVIDED_BY.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.HABS_EMP_MANIF_PROD_TYPE.pk_entity,
  })

  static readonly DIGITAL_RANDOM_IS_REPRODUCTION_OF_HABS_EMP: Partial<InfStatement> = ({
    pk_entity: 3027,
    fk_subject_data: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1216_IS_REPRODUCTION_OF.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.HABS_EMP_EXPR.pk_entity,
  })

  static readonly DIGITAL_TEXT_IS_REPRO_OF_HABS_EMP: Partial<InfStatement> = ({
    pk_entity: 3028,
    fk_subject_data: DatDigitalMock.DIGITAL_TEXT_RODOLF_FOO.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1216_IS_REPRODUCTION_OF.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.HABS_EMP_EXPR.pk_entity,
  })

  static readonly CHUNK_RUDOLF_REFERS_TO_RUDOLF: Partial<InfStatement> = ({
    pk_entity: 3029,
    fk_subject_data: DatChunkMock.RUDOLF.pk_entity,
    fk_property: 1334,
    fk_object_info: InfPersistentItemMock.RUDOLF.pk_entity,
  })

  static readonly HABS_EMP_EXPR_MENTIONS_RUDOLF: Partial<InfStatement> = ({
    pk_entity: 3030,
    fk_subject_info: InfPersistentItemMock.HABS_EMP_EXPR.pk_entity,
    fk_property: 1218,
    fk_object_info: InfPersistentItemMock.RUDOLF.pk_entity,
  })


  static readonly NAMING_JEAN_TO_APPE_JEAN: Partial<InfStatement> = ({
    pk_entity: 3031,
    fk_subject_info: InfTemporalEntityMock.JEAN_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.JEAN.pk_entity,
  })
  static readonly NAMING_HANS_TO_APPE_HANS: Partial<InfStatement> = ({
    pk_entity: 3032,
    fk_subject_info: InfTemporalEntityMock.HANS_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.HANS.pk_entity,
  })
  static readonly NAMING_PIERRE_TO_APPE_PIERRE: Partial<InfStatement> = ({
    pk_entity: 3033,
    fk_subject_info: InfTemporalEntityMock.PIERRE_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.PIERRE.pk_entity,
  })
  static readonly NAMING_ANGELA_TO_APPE_ANGELA: Partial<InfStatement> = ({
    pk_entity: 3034,
    fk_subject_info: InfTemporalEntityMock.ANGELA_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.ANGELA.pk_entity,
  })

  static readonly NAMING_JEAN_TO_PEIT_JEAN: Partial<InfStatement> = ({
    pk_entity: 3035,
    fk_subject_info: InfTemporalEntityMock.JEAN_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.JEAN.pk_entity,
  })
  static readonly NAMING_PIERRE_TO_PEIT_PIERRE: Partial<InfStatement> = ({
    pk_entity: 3036,
    fk_subject_info: InfTemporalEntityMock.PIERRE_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.PIERRE.pk_entity,
  })
  static readonly NAMING_HANS_TO_PEIT_HANS: Partial<InfStatement> = ({
    pk_entity: 3037,
    fk_subject_info: InfTemporalEntityMock.HANS_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.HANS.pk_entity,
  })
  static readonly NAMING_ANGELA_TO_PEIT_ANGELA: Partial<InfStatement> = ({
    pk_entity: 3038,
    fk_subject_info: InfTemporalEntityMock.ANGELA_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.ANGELA.pk_entity,
  })

  static readonly NAMING_UNIONS_TO_PEIT_UNIONS: Partial<InfStatement> = ({
    pk_entity: 3039,
    fk_subject_info: InfTemporalEntityMock.UNIONS_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.UNIONS_MANIF_PROD_TYPE.pk_entity,
  })

  static readonly NAMING_UNIONS_TO_APPE_UNIONS: Partial<InfStatement> = ({
    pk_entity: 3040,
    fk_subject_info: InfTemporalEntityMock.UNIONS_NAMING.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.SOURCE_UNIONS.pk_entity,
  })

  static readonly DIGITAL_UNIONS_IS_REPRODUCTION_OF_UNIONS: Partial<InfStatement> = ({
    pk_entity: 3041,
    fk_subject_data: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1216_IS_REPRODUCTION_OF.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.UNIONS_EXPR.pk_entity,
  })

  static readonly UNIONS_CARRIERS_PROVIDED_BY: Partial<InfStatement> = ({
    pk_entity: 3042,
    fk_subject_info: InfPersistentItemMock.UNIONS_EXPR.pk_entity,
    fk_property: DfhApiPropertyMock.EN_979_CARRIERS_PROVIDED_BY.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.UNIONS_MANIF_PROD_TYPE.pk_entity,
  })

  static readonly CELL_JEAN_NAME_REFERS8_TO_JEAN: Partial<InfStatement> = ({
    pk_entity: 3043,
    fk_subject_tables_cell: TabCellXMock.FEATURE_X_UNIONS_JEAN.pk_cell,
    fk_property: 1334,
    fk_object_info: InfPersistentItemMock.JEAN.pk_entity,
  })

  static readonly CELL_UNION_PEOPLE_RUDOLF_NAME_REFERS8_TO_RUDOLF: Partial<InfStatement> = ({
    pk_entity: 3044,
    fk_subject_tables_cell: TabCellXMock.FEATURE_X_UNIONS_RUDOLPH.pk_cell,
    fk_property: 1334,
    fk_object_info: InfPersistentItemMock.RUDOLF.pk_entity,
  })

  static readonly CELL_UNION_UNION_RUDOLF_NAME_REFERS8_TO_RUDOLF: Partial<InfStatement> = ({
    pk_entity: 3045,
    fk_subject_tables_cell: TabCellXMock.FEATURE_X_UNIONS_ANGELA_UNION.pk_cell,
    fk_property: 1334,
    fk_object_info: InfPersistentItemMock.RUDOLF.pk_entity,
  })

  static readonly CELL_UNION_PEOPLE_ANGELA_NAME_REFERS_TO_ANGELA: Partial<InfStatement> = ({
    pk_entity: 3046,
    fk_subject_tables_cell: TabCellXMock.FEATURE_X_UNIONS_ANGELA.pk_cell,
    fk_property: 1334,
    fk_object_info: InfPersistentItemMock.ANGELA.pk_entity,
  })

  static readonly CELL_UNION_UNION_ALBERT_NAME_REFERS_TO_RUDOLPH: Partial<InfStatement> = ({
    pk_entity: 3047,
    fk_subject_tables_cell: TabCellXMock.FEATURE_X_UNIONS_ALBERT_UNION.pk_cell,
    fk_property: 1334,
    fk_object_info: InfPersistentItemMock.RUDOLF.pk_entity,
  })

  static readonly CELL_UNION_PEOPLE_ALBERT_NAME_REFERS_TO_RUDOLPH: Partial<InfStatement> = ({
    pk_entity: 3048,
    fk_subject_tables_cell: TabCellXMock.FEATURE_X_UNIONS_ALBERT.pk_cell,
    fk_property: 1334,
    fk_object_info: InfPersistentItemMock.RUDOLF.pk_entity,
  })


  static readonly UNOIN_1_HAS_PARTNER_2: Partial<InfStatement> = ({
    pk_entity: 3049,
    fk_subject_info: InfTemporalEntityMock.UNION_1.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1436_HAS_PARTNER.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.ALBERT_IV.pk_entity,
  })

  static readonly NAMING_ALBERT_2_TO_APPE_ALBERT: Partial<InfStatement> = ({
    pk_entity: 3050,
    fk_subject_info: InfTemporalEntityMock.ALBERT_IV_NAMING_2.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.ALBERT.pk_entity,
  })

  static readonly NAMING_ALBERT_2_TO_PEIT_ALBERT: Partial<InfStatement> = ({
    pk_entity: 3051,
    fk_subject_info: InfTemporalEntityMock.ALBERT_IV_NAMING_2.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.ALBERT_IV.pk_entity,
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
