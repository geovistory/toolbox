import { DfhApiProfile } from '../../../../models'

export class DfhApiProfileMock {
  static readonly GEOVISTORY_BASIC: Partial<DfhApiProfile> = ({
    // "pk_entity": 3725,
    "dfh_pk_profile": 5,
    "removed_from_api": false,
    "dfh_profile_label": "Geovistory Basics",
    "dfh_project_label": "Geovistory",
    "requested_language": "en",
    "dfh_owned_by_project": 6,
    "tmsp_last_dfh_update": "2020-01-27T08:03:06.045+00:00",
    "is_enabled_in_profile": undefined,
    "dfh_profile_definition": "This profile includes classes and properties that are directly implemented in the Geovistory virtual search environment or that represent the foundation of its functionalities. They are always present in the information system.",
    "dfh_date_profile_published": undefined,
    "dfh_profile_label_language": "en",
    "dfh_project_label_language": "en",
    "dfh_date_profile_deprecated": undefined,
    "dfh_profile_definition_language": "en",
    "dfh_is_ongoing_forced_publication": true
  })

  static readonly MARITIME_HISTORY: Partial<DfhApiProfile> = ({
    // "pk_entity": 3804,
    "dfh_pk_profile": 8,
    "removed_from_api": false,
    "dfh_profile_label": "Maritime history",
    "dfh_project_label": "Geovistory",
    "requested_language": "en",
    "dfh_owned_by_project": 6,
    "tmsp_last_dfh_update": "2020-01-05T07:40:55.056+00:00",
    "is_enabled_in_profile": undefined,
    "dfh_profile_definition": "This profile is used to provide specific classes and properties relevant for maritime history, like voyage, ship, etc.",
    "dfh_date_profile_published": undefined,
    "dfh_profile_label_language": "en",
    "dfh_project_label_language": "en",
    "dfh_date_profile_deprecated": undefined,
    "dfh_profile_definition_language": "en",
    "dfh_is_ongoing_forced_publication": true
  });

  static readonly BIOGRAPHY_AND_FAMILY: Partial<DfhApiProfile> = ({
    // "pk_entity": 3841,
    "dfh_pk_profile": 12,
    "removed_from_api": false,
    "dfh_profile_label": "Biographical basics and family",
    "dfh_project_label": "Historical Data Management and Interoperability (HistDMI)",
    "requested_language": "en",
    "dfh_owned_by_project": 8,
    "tmsp_last_dfh_update": "2020-03-19T11:02:08.398+00:00",
    "is_enabled_in_profile": undefined,
    "dfh_profile_definition": "This profile combines classes and properties that identify a person and describe the essential elements of his or her biography",
    "dfh_date_profile_published": undefined,
    "dfh_profile_label_language": "en",
    "dfh_project_label_language": "en",
    "dfh_date_profile_deprecated": undefined,
    "dfh_profile_definition_language": "en",
    "dfh_is_ongoing_forced_publication": true
  });

  static readonly GEOVISTORY_GENERIC_HIST: Partial<DfhApiProfile> = ({
    // "pk_entity": 3648,
    "dfh_pk_profile": 4,
    "removed_from_api": false,
    "dfh_profile_label": "Geovistory Generic Historical Information Profile",
    "dfh_project_label": "Geovistory",
    "requested_language": "en",
    "dfh_owned_by_project": 6,
    "tmsp_last_dfh_update": "2020-03-07T11:47:39.607+00:00",
    "is_enabled_in_profile": undefined,
    "dfh_profile_definition": "This profile collects classes and properties used to model basic or common aspects of historical data.",
    "dfh_date_profile_published": undefined,
    "dfh_profile_label_language": "en",
    "dfh_project_label_language": "en",
    "dfh_date_profile_deprecated": undefined,
    "dfh_profile_definition_language": "en",
    "dfh_is_ongoing_forced_publication": true
  })

}


/**
 * SQL to create mock items
 */
// SELECT jsonb_pretty(jsonb_build_object(
// 'pk_entity', pk_entity,
//   'dfh_pk_profile', dfh_pk_profile,
//   'tmsp_last_dfh_update', tmsp_last_dfh_update,
//   'is_enabled_in_profile', is_enabled_in_profile,
//   'removed_from_api', removed_from_api,
//   'requested_language', requested_language,
//   'dfh_profile_label_language', dfh_profile_label_language,
//   'dfh_profile_label', dfh_profile_label,
//   'dfh_profile_definition_language', dfh_profile_definition_language,
//   'dfh_profile_definition', dfh_profile_definition,
//   'dfh_owned_by_project', dfh_owned_by_project,
//   'dfh_project_label_language', dfh_project_label_language,
//   'dfh_project_label', dfh_project_label,
//   'dfh_is_ongoing_forced_publication', dfh_is_ongoing_forced_publication,
//   'dfh_date_profile_published', dfh_date_profile_published,
//   'dfh_date_profile_deprecated', dfh_date_profile_deprecated
// ))
// FROM data_for_history.api_profile t1
// WHERE dfh_pk_profile = 4

