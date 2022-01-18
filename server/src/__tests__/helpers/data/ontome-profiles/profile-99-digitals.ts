import {DfhApiClassMock} from '../gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../gvDB/DfhApiPropertyMock';
import {OntomeProfileMock} from '../gvDB/local-model.helpers';

/**
 * This is a hand made profile for the development of digitals
 */
export const PROFILE_99_DIGITALS: OntomeProfileMock = {
  "profile": {
    "removed_from_api": false,
    "requested_language": "en",
    "tmsp_last_dfh_update": "2020-01-27T08:03:06.045+00:00",
    "dfh_pk_profile": 99,
    "dfh_profile_label": "Digitals",
    "dfh_project_label": "Geovistory",
    "dfh_owned_by_project": 6,
    "dfh_profile_definition": "This is a hand made profile for the development of digitals",
    "dfh_project_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_profile_definition_language": "en",
    "dfh_is_ongoing_forced_publication": true
  },
  "classes": [
    DfhApiClassMock.EN_9905_TABLE_ANNOTATION,
    DfhApiClassMock.EN_9902_TEXT_ANNOTATION,
    DfhApiClassMock.EN_9901_DEFINITION,
    DfhApiClassMock.EN_9903_TRANSCRIPTION,
    DfhApiClassMock.EN_9904_TABLE,
    DfhApiClassMock.EN_9906_TABLE_VALUE,
    DfhApiClassMock.EN_339_STRING,
    DfhApiClassMock.EN_456_CHUNK,
    DfhApiClassMock.EN_521_CELL,
    DfhApiClassMock.EN_784_SHORT_TITLE_IN_99,
    {
      "tmsp_last_modification": "2021-03-25T20:06:37.47053+00:00",
      "dfh_pk_class": 54,
      "dfh_basic_type": 30,
      "dfh_fk_profile": 99,
      "dfh_class_label": "Language",
      "dfh_fk_namespace": 1,
      "dfh_namespace_uri": null,
      "dfh_profile_label": "Geovistory Basics",
      "dfh_namespace_label": "CIDOC CRM version 6.2",
      "dfh_basic_type_label": "Type (controlled vocabulary)",
      "dfh_class_scope_note": "This class is a specialization of E55 Type and comprises the natural languages in the sense of concepts.\r\nThis type is used categorically in the model without reference to instances of it, i.e. the Model does not foresee the description of instances of instances of E56 Language, e.g.: “instances of Mandarin Chinese”.\r\nIt is recommended that internationally or nationally agreed codes and terminology are used to denote instances of E56 Language, such as those defined in ISO 639:1988.",
      "dfh_class_label_language": "en",
      "dfh_profile_label_language": "en",
      "dfh_namespace_label_language": "en",
      "dfh_class_scope_note_language": "en",
      "dfh_class_identifier_in_namespace": "E56",
      "dfh_profile_association_type": "inferred"
    },
    DfhApiClassMock.EN_21_PERSON_IN_99,
    DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON_IN_99,
    DfhApiClassMock.EN_9907_MENTIONING,
    DfhApiClassMock.EN_657_REFERENCE_IN_99,
  ],
  "properties": [
    DfhApiPropertyMock.EN_99001_DEFINITION_HAS_VALUE_VERSION,
    DfhApiPropertyMock.EN_99001_TRANSCRIPTION_HAS_VALUE_VERSION,
    DfhApiPropertyMock.EN_99002_HAS_LANGUAGE,
    DfhApiPropertyMock.EN_99003_HAS_DEFINITION_NEW,
    DfhApiPropertyMock.EN_99004_TEXT_ANNOTATION_IS_ANNOTATION_IN,
    DfhApiPropertyMock.EN_99005_TEXT_ANNOTATION_HAS_SPOT,
    DfhApiPropertyMock.EN_1334_TEXT_ANNOTATION_REFERS_TO,
    DfhApiPropertyMock.EN_99004_TABLE_ANNOTATION_IS_ANNOTATION_IN,
    DfhApiPropertyMock.EN_99005_TABLE_ANNOTATION_HAS_SPOT,
    DfhApiPropertyMock.EN_99006_TABLE_HAS_VALUE,
    DfhApiPropertyMock.EN_1334_TABLE_ANNOTATION_REFERS_TO,

    DfhApiPropertyMock.EN_1216_TRANSCRIPTION_IS_REPRODUCTION_OF,
    DfhApiPropertyMock.EN_1761_TABLE_HAS_SHORT_TITLE,

    DfhApiPropertyMock.EN_99007_MENTIONING_IS_MENTIONED_IN,
    DfhApiPropertyMock.EN_99008_MENTIONING_HAS_REFERENCE,
    DfhApiPropertyMock.EN_99009_MENIONING_MENTIONS
  ]
}
