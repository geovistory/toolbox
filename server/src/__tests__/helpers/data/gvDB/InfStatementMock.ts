/* eslint-disable @typescript-eslint/camelcase */
import {InfStatement} from '../../../../models';
import {DfhApiPropertyMock} from './DfhApiPropertyMock';
import {InfAppellationMock} from './InfAppellationMock';
import {InfPersistentItemMock} from './InfPersistentItemMock';
import {InfTemporalEntityMock} from './InfTemporalEntityMock';
import {InfTimePrimitiveMock} from './InfTimePrimitiveMock';

/**
 * pk_entity prefix: 300
 */
export class InfStatementMock {

  static readonly NAME_1_TO_PERSON = new InfStatement({
    pk_entity: 3001,
    fk_subject_info: InfTemporalEntityMock.NAMING_1.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.PERSON_1.pk_entity,
  })

  static readonly NAME_1_TO_APPE = new InfStatement({
    pk_entity: 3002,
    fk_subject_info: InfTemporalEntityMock.NAMING_1.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.JACK_THE_FOO.pk_entity,
  })

  static readonly NAMING_CITY_TO_APPE_CITY = new InfStatement({
    pk_entity: 3003,
    fk_subject_info: InfTemporalEntityMock.NAMING_CITY.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
    fk_object_info: InfAppellationMock.CITY.pk_entity,
  })

  static readonly NAMING_CITY_TO_GEO_PLACE_TYPE = new InfStatement({
    pk_entity: 3004,
    fk_subject_info: InfTemporalEntityMock.NAMING_CITY.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.GEO_PLACE_TYPE_CITY.pk_entity,
  })

  static readonly MADRID_HAS_GEO_PLACE_TYPE_CITY = new InfStatement({
    pk_entity: 3005,
    fk_subject_info: InfPersistentItemMock.GEO_PLACE_MADRID.pk_entity,
    fk_property: DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE.dfh_pk_property,
    fk_object_info: InfPersistentItemMock.GEO_PLACE_TYPE_CITY.pk_entity,
  })


  static readonly SHIP_VOYAGE_ONGOING_THROUGHOUT_TP_1 = new InfStatement({
    pk_entity: 3006,
    fk_subject_info: InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_71_ONGOING_THOUGHOUT.dfh_pk_property,
    fk_object_info: InfTimePrimitiveMock.TP_1.pk_entity,
  })

  static readonly SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2 = new InfStatement({
    pk_entity: 3007,
    fk_subject_info: InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_72_AT_SOME_TIME_WITHIN.dfh_pk_property,
    fk_object_info: InfTimePrimitiveMock.TP_2.pk_entity,
  })

  static readonly SHIP_VOYAGE_END_OF_THE_BEGIN_TP_3 = new InfStatement({
    pk_entity: 3008,
    fk_subject_info: InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_150_END_OF_THE_BEGIN.dfh_pk_property,
    fk_object_info: InfTimePrimitiveMock.TP_3.pk_entity,
  })

  static readonly SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4 = new InfStatement({
    pk_entity: 3009,
    fk_subject_info: InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_151_BEGIN_OF_THE_END.dfh_pk_property,
    fk_object_info: InfTimePrimitiveMock.TP_4.pk_entity,
  })

  static readonly SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5 = new InfStatement({
    pk_entity: 3010,
    fk_subject_info: InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_152_BEGIN_OF_THE_BEGIN.dfh_pk_property,
    fk_object_info: InfTimePrimitiveMock.TP_5.pk_entity,
  })

  static readonly SHIP_VOYAGE_END_OF_THE_END_TP_6 = new InfStatement({
    pk_entity: 3011,
    fk_subject_info: InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
    fk_property: DfhApiPropertyMock.EN_153_END_OF_THE_END.dfh_pk_property,
    fk_object_info: InfTimePrimitiveMock.TP_6.pk_entity,
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