/* eslint-disable @typescript-eslint/camelcase */
import {InfStatement} from '../../../../models';
import {DfhApiPropertyMock} from './DfhApiPropertyMock';
import {InfAppellationMock} from './InfAppellationMock';
import {InfPersistentItemMock} from './InfPersistentItemMock';
import {InfTemporalEntityMock} from './InfTemporalEntityMock';

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
