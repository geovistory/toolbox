import {OntomeProfileMock} from '../gvDB/local-model.helpers';

  export const PROFILE_8_MARITIME_HISTOR_2021_07_09: OntomeProfileMock ={
  "profile": {
    "removed_from_api": false,
    "requested_language": "en",
    "tmsp_last_dfh_update": "2020-01-27T08:03:06.045+00:00",
    "dfh_pk_profile": 8,
    "dfh_profile_label": "Maritime history",
    "dfh_project_label": "Geovistory",
    "dfh_owned_by_project": 6,
    "dfh_profile_definition": "This profile is used to provide specific classes and properties relevant for maritime history, like voyage, ship, etc.",
    "dfh_project_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_profile_definition_language": "en",
    "dfh_is_ongoing_forced_publication": true
  },
  "classes": [
    {
      "tmsp_last_modification": "2021-03-25T20:06:37.47053+00:00",
      "dfh_pk_class": 21,
      "dfh_basic_type": 8,
      "dfh_fk_profile": 8,
      "dfh_class_label": "Person",
      "dfh_fk_namespace": 1,
      "dfh_namespace_uri": null,
      "dfh_profile_label": "Maritime history",
      "dfh_namespace_label": "CIDOC CRM version 6.2",
      "dfh_basic_type_label": "Persistent Item",
      "dfh_class_scope_note": "This class comprises real persons who live or are assumed to have lived.\r\nLegendary figures that may have existed, such as Ulysses and King Arthur, fall into this class if the documentation refers to them as historical figures. In cases where doubt exists as to whether several persons are in fact identical, multiple instances can be created and linked to indicate their relationship. The CRM does not propose a specific form to support reasoning about possible identity.",
      "dfh_class_label_language": "en",
      "dfh_profile_label_language": "en",
      "dfh_namespace_label_language": "en",
      "dfh_class_scope_note_language": "en",
      "dfh_class_identifier_in_namespace": "E21",
      "dfh_profile_association_type": "inferred"
    },
    {
      "tmsp_last_modification": "2021-03-25T20:06:37.47053+00:00",
      "dfh_pk_class": 363,
      "dfh_basic_type": 8,
      "dfh_fk_profile": 8,
      "dfh_class_label": "Geographical Place",
      "dfh_fk_namespace": 3,
      "dfh_namespace_uri": null,
      "dfh_profile_label": "Maritime history",
      "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
      "dfh_basic_type_label": "Persistent Item",
      "dfh_class_scope_note": "This class refers to portions of the surface of the Earth intended as constellations of matter which can be represented by photographs, paintings and maps. The relevant portion of the surface of the Earth can be covered by water (river, sea, ...). The more specific identity of instances of this class is provided by a controlled vocabulary of geographical place types.",
      "dfh_class_label_language": "en",
      "dfh_profile_label_language": "en",
      "dfh_namespace_label_language": "en",
      "dfh_class_scope_note_language": "en",
      "dfh_class_identifier_in_namespace": "C13",
      "dfh_profile_association_type": "inferred"
    },
    {
      "tmsp_last_modification": "2021-03-25T20:06:37.47053+00:00",
      "dfh_pk_class": 522,
      "dfh_basic_type": 8,
      "dfh_fk_profile": 8,
      "dfh_class_label": "Ship",
      "dfh_fk_namespace": 66,
      "dfh_namespace_uri": null,
      "dfh_profile_label": "Maritime history",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_basic_type_label": "Persistent Item",
      "dfh_class_scope_note": "Used to denote a watercraft that travels the world's oceans and other sufficiently deep waterways, carrying passengers or goods, or in support of specialized missions, such as defense, research and fishing.",
      "dfh_class_label_language": "en",
      "dfh_profile_label_language": "en",
      "dfh_namespace_label_language": "en",
      "dfh_class_scope_note_language": "en",
      "dfh_class_identifier_in_namespace": "C2",
      "dfh_profile_association_type": "selected"
    },
    {
      "tmsp_last_modification": "2021-03-25T20:06:37.47053+00:00",
      "dfh_pk_class": 523,
      "dfh_basic_type": 9,
      "dfh_fk_profile": 8,
      "dfh_class_label": "Ship Voyage",
      "dfh_fk_namespace": 66,
      "dfh_namespace_uri": null,
      "dfh_profile_label": "Maritime history",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_basic_type_label": "Temporal Entity",
      "dfh_class_scope_note": "Used to denote a (long) journey, especially by ship, going from a place of departure to a place of arrival.",
      "dfh_class_label_language": "en",
      "dfh_profile_label_language": "en",
      "dfh_namespace_label_language": "en",
      "dfh_class_scope_note_language": "en",
      "dfh_class_identifier_in_namespace": "C1",
      "dfh_profile_association_type": "selected"
    },
    {
      "tmsp_last_modification": "2021-03-25T20:06:37.47053+00:00",
      "dfh_pk_class": 524,
      "dfh_basic_type": 30,
      "dfh_fk_profile": 8,
      "dfh_class_label": "Ship Type",
      "dfh_fk_namespace": 66,
      "dfh_namespace_uri": null,
      "dfh_profile_label": "Maritime history",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_basic_type_label": "Type (controlled vocabulary)",
      "dfh_class_scope_note": "Used to denote a specific type of ship.",
      "dfh_class_label_language": "en",
      "dfh_profile_label_language": "en",
      "dfh_namespace_label_language": "en",
      "dfh_class_scope_note_language": "en",
      "dfh_class_identifier_in_namespace": "C3",
      "dfh_profile_association_type": "selected"
    },
    {
      "tmsp_last_modification": "2021-03-25T20:06:37.47053+00:00",
      "dfh_pk_class": 525,
      "dfh_basic_type": 8,
      "dfh_fk_profile": 8,
      "dfh_class_label": "Shipyard",
      "dfh_fk_namespace": 66,
      "dfh_namespace_uri": null,
      "dfh_profile_label": "Maritime history",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_basic_type_label": "Persistent Item",
      "dfh_class_scope_note": "This class includes institutions specializing in shipbuilding.",
      "dfh_class_label_language": "en",
      "dfh_profile_label_language": "en",
      "dfh_namespace_label_language": "en",
      "dfh_class_scope_note_language": "en",
      "dfh_class_identifier_in_namespace": "C4",
      "dfh_profile_association_type": "selected"
    },
    {
      "tmsp_last_modification": "2021-03-25T20:06:37.47053+00:00",
      "dfh_pk_class": 526,
      "dfh_basic_type": 8,
      "dfh_fk_profile": 8,
      "dfh_class_label": "Economic good",
      "dfh_fk_namespace": 66,
      "dfh_namespace_uri": null,
      "dfh_profile_label": "Maritime history",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_basic_type_label": "Persistent Item",
      "dfh_class_scope_note": "This class comprises instances of physical objects that can be the subject of a commercial activity.\r\n[previous scope note : A commodity or service that satisfies a human need and is the subject of a commercial activity]",
      "dfh_class_label_language": "en",
      "dfh_profile_label_language": "en",
      "dfh_namespace_label_language": "en",
      "dfh_class_scope_note_language": "en",
      "dfh_class_identifier_in_namespace": "C5",
      "dfh_profile_association_type": "selected"
    },
    {
      "tmsp_last_modification": "2021-03-25T20:06:37.47053+00:00",
      "dfh_pk_class": 527,
      "dfh_basic_type": 9,
      "dfh_fk_profile": 8,
      "dfh_class_label": "Transport",
      "dfh_fk_namespace": 66,
      "dfh_namespace_uri": null,
      "dfh_profile_label": "Maritime history",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_basic_type_label": "Temporal Entity",
      "dfh_class_scope_note": " Activity of carrying goods from one place to another using carriages, trains, ships, etc.",
      "dfh_class_label_language": "en",
      "dfh_profile_label_language": "en",
      "dfh_namespace_label_language": "en",
      "dfh_class_scope_note_language": "en",
      "dfh_class_identifier_in_namespace": "C6",
      "dfh_profile_association_type": "selected"
    },
    {
      "tmsp_last_modification": "2021-03-25T20:06:37.47053+00:00",
      "dfh_pk_class": 528,
      "dfh_basic_type": 9,
      "dfh_fk_profile": 8,
      "dfh_class_label": "Stopover",
      "dfh_fk_namespace": 66,
      "dfh_namespace_uri": null,
      "dfh_profile_label": "Maritime history",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_basic_type_label": "Temporal Entity",
      "dfh_class_scope_note": "Short stay in a place while on a journey to somewhere else.",
      "dfh_class_label_language": "en",
      "dfh_profile_label_language": "en",
      "dfh_namespace_label_language": "en",
      "dfh_class_scope_note_language": "en",
      "dfh_class_identifier_in_namespace": "C7",
      "dfh_profile_association_type": "selected"
    },
    {
      "tmsp_last_modification": "2021-03-25T20:06:37.47053+00:00",
      "dfh_pk_class": 529,
      "dfh_basic_type": 8,
      "dfh_fk_profile": 8,
      "dfh_class_label": "VOC Chamber",
      "dfh_fk_namespace": 66,
      "dfh_namespace_uri": null,
      "dfh_profile_label": "Maritime history",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_basic_type_label": "Persistent Item",
      "dfh_class_scope_note": "Used to denote a branch of the Dutch East India Company (VOC). There were six semi-independent 'chambers' that together formed the VOC: Amsterdam, Zeeland (Middelburg), Enkhuizen, Hoorn, Delft and Rotterdam.",
      "dfh_class_label_language": "en",
      "dfh_profile_label_language": "en",
      "dfh_namespace_label_language": "en",
      "dfh_class_scope_note_language": "en",
      "dfh_class_identifier_in_namespace": "C8",
      "dfh_profile_association_type": "selected"
    },
    {
      "tmsp_last_modification": "2021-03-25T20:06:37.47053+00:00",
      "dfh_pk_class": 533,
      "dfh_basic_type": 9,
      "dfh_fk_profile": 8,
      "dfh_class_label": "Shipbuilding",
      "dfh_fk_namespace": 66,
      "dfh_namespace_uri": null,
      "dfh_profile_label": "Maritime history",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_basic_type_label": "Temporal Entity",
      "dfh_class_scope_note": "This class comprises activities that result in instances of C2 Ship coming into existence.",
      "dfh_class_label_language": "en",
      "dfh_profile_label_language": "en",
      "dfh_namespace_label_language": "en",
      "dfh_class_scope_note_language": "en",
      "dfh_class_identifier_in_namespace": "C12",
      "dfh_profile_association_type": "selected"
    },
    {
      "tmsp_last_modification": "2021-03-25T20:06:37.47053+00:00",
      "dfh_pk_class": 535,
      "dfh_basic_type": 9,
      "dfh_fk_profile": 8,
      "dfh_class_label": "Participation",
      "dfh_fk_namespace": 112,
      "dfh_namespace_uri": null,
      "dfh_profile_label": "Maritime history",
      "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
      "dfh_basic_type_label": "Temporal Entity",
      "dfh_class_scope_note": "This class comprises periods of continuous activity of a person participating in an event, be this a battle, voyage, conference, etc. If the participation involves the exercise of a function or holding of an office or rank this can be associated using the is participation with social character – histP28 Proprety. One or more functions can be associated to the same Participation if their time span is identical. It is otherwise preferable to split consecutive holdins of an office in the same event producing several instances of this class. The time-span of this class is equal to or included in the time-span of the related event.",
      "dfh_class_label_language": "en",
      "dfh_profile_label_language": "en",
      "dfh_namespace_label_language": "en",
      "dfh_class_scope_note_language": "en",
      "dfh_class_identifier_in_namespace": "C15",
      "dfh_profile_association_type": "selected"
    }
  ],
  "properties": [
    {
      "removed_from_api": false,
      "requested_language": "en",
      "tmsp_last_dfh_update": "2020-03-05T14:05:26.714+00:00",
      "is_enabled_in_profile": null,
      "dfh_pk_property": 1335,
      "dfh_property_label_language": "en",
      "dfh_property_label": "had departure place",
      "dfh_property_inverse_label": "was departure place of",
      "dfh_property_scope_note_language": "en",
      "dfh_property_scope_note": "This property identifies the C13 Geographical Place which is the departure place of a C1 Ship Voyage.",
      "dfh_is_inherited": false,
      "dfh_property_domain": 523,
      "dfh_domain_instances_min_quantifier": 0,
      "dfh_domain_instances_max_quantifier": -1,
      "dfh_property_range": 363,
      "dfh_range_instances_min_quantifier": 1,
      "dfh_range_instances_max_quantifier": 1,
      "dfh_identity_defining": false,
      "dfh_is_has_type_subproperty": false,
      "dfh_property_identifier_in_namespace": "P1",
      "dfh_namespace_uri": null,
      "dfh_fk_namespace": 66,
      "dfh_namespace_label_language": "en",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_profile_association_type": null,
      "dfh_fk_profile": 8,
      "dfh_profile_label": "Maritime history",
      "dfh_profile_label_language": "en"
    },
    {
      "removed_from_api": false,
      "requested_language": "en",
      "tmsp_last_dfh_update": "2020-03-05T14:05:26.714+00:00",
      "is_enabled_in_profile": null,
      "dfh_pk_property": 1336,
      "dfh_property_label_language": "en",
      "dfh_property_label": "had arrival place",
      "dfh_property_inverse_label": "was arrival place of",
      "dfh_property_scope_note_language": "en",
      "dfh_property_scope_note": "This property identifies the C13 Geographical Place which is the final arrival place of a C1 Ship Voyage.",
      "dfh_is_inherited": false,
      "dfh_property_domain": 523,
      "dfh_domain_instances_min_quantifier": 0,
      "dfh_domain_instances_max_quantifier": -1,
      "dfh_property_range": 363,
      "dfh_range_instances_min_quantifier": 1,
      "dfh_range_instances_max_quantifier": 1,
      "dfh_identity_defining": false,
      "dfh_is_has_type_subproperty": false,
      "dfh_property_identifier_in_namespace": "P2",
      "dfh_namespace_uri": null,
      "dfh_fk_namespace": 66,
      "dfh_namespace_label_language": "en",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_profile_association_type": null,
      "dfh_fk_profile": 8,
      "dfh_profile_label": "Maritime history",
      "dfh_profile_label_language": "en"
    },
    {
      "removed_from_api": false,
      "requested_language": "en",
      "tmsp_last_dfh_update": "2020-03-05T14:05:26.714+00:00",
      "is_enabled_in_profile": null,
      "dfh_pk_property": 1337,
      "dfh_property_label_language": "en",
      "dfh_property_label": "has ship type",
      "dfh_property_inverse_label": "is ship type of",
      "dfh_property_scope_note_language": "en",
      "dfh_property_scope_note": "Associates a ship with the type which defines its identity",
      "dfh_is_inherited": false,
      "dfh_property_domain": 522,
      "dfh_domain_instances_min_quantifier": 0,
      "dfh_domain_instances_max_quantifier": -1,
      "dfh_property_range": 524,
      "dfh_range_instances_min_quantifier": 0,
      "dfh_range_instances_max_quantifier": 1,
      "dfh_identity_defining": false,
      "dfh_is_has_type_subproperty": false,
      "dfh_property_identifier_in_namespace": "P6",
      "dfh_namespace_uri": null,
      "dfh_fk_namespace": 66,
      "dfh_namespace_label_language": "en",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_profile_association_type": null,
      "dfh_fk_profile": 8,
      "dfh_profile_label": "Maritime history",
      "dfh_profile_label_language": "en"
    },
    {
      "removed_from_api": false,
      "requested_language": "en",
      "tmsp_last_dfh_update": "2020-03-05T14:05:26.714+00:00",
      "is_enabled_in_profile": null,
      "dfh_pk_property": 1338,
      "dfh_property_label_language": "en",
      "dfh_property_label": "was carried out by",
      "dfh_property_inverse_label": "had carried out",
      "dfh_property_scope_note_language": "en",
      "dfh_property_scope_note": "This property identifies the C2 Ship by which the C1 Ship Voyage was carried out.",
      "dfh_is_inherited": false,
      "dfh_property_domain": 523,
      "dfh_domain_instances_min_quantifier": 0,
      "dfh_domain_instances_max_quantifier": -1,
      "dfh_property_range": 522,
      "dfh_range_instances_min_quantifier": 1,
      "dfh_range_instances_max_quantifier": 1,
      "dfh_identity_defining": false,
      "dfh_is_has_type_subproperty": false,
      "dfh_property_identifier_in_namespace": "P3",
      "dfh_namespace_uri": null,
      "dfh_fk_namespace": 66,
      "dfh_namespace_label_language": "en",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_profile_association_type": null,
      "dfh_fk_profile": 8,
      "dfh_profile_label": "Maritime history",
      "dfh_profile_label_language": "en"
    },
    {
      "removed_from_api": false,
      "requested_language": "en",
      "tmsp_last_dfh_update": "2020-03-05T14:05:26.714+00:00",
      "is_enabled_in_profile": null,
      "dfh_pk_property": 1339,
      "dfh_property_label_language": "en",
      "dfh_property_label": "took place at",
      "dfh_property_inverse_label": "was place of",
      "dfh_property_scope_note_language": "en",
      "dfh_property_scope_note": "The place where the stopover takes place",
      "dfh_is_inherited": false,
      "dfh_property_domain": 528,
      "dfh_domain_instances_min_quantifier": 0,
      "dfh_domain_instances_max_quantifier": -1,
      "dfh_property_range": 363,
      "dfh_range_instances_min_quantifier": 1,
      "dfh_range_instances_max_quantifier": 1,
      "dfh_identity_defining": false,
      "dfh_is_has_type_subproperty": false,
      "dfh_property_identifier_in_namespace": "P4",
      "dfh_namespace_uri": null,
      "dfh_fk_namespace": 66,
      "dfh_namespace_label_language": "en",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_profile_association_type": null,
      "dfh_fk_profile": 8,
      "dfh_profile_label": "Maritime history",
      "dfh_profile_label_language": "en"
    },
    {
      "removed_from_api": false,
      "requested_language": "en",
      "tmsp_last_dfh_update": "2020-03-05T14:05:26.714+00:00",
      "is_enabled_in_profile": null,
      "dfh_pk_property": 1340,
      "dfh_property_label_language": "en",
      "dfh_property_label": "was part of",
      "dfh_property_inverse_label": "had part",
      "dfh_property_scope_note_language": "en",
      "dfh_property_scope_note": "Associates a stopover with the voyage it is part of",
      "dfh_is_inherited": false,
      "dfh_property_domain": 528,
      "dfh_domain_instances_min_quantifier": 0,
      "dfh_domain_instances_max_quantifier": -1,
      "dfh_property_range": 523,
      "dfh_range_instances_min_quantifier": 1,
      "dfh_range_instances_max_quantifier": 1,
      "dfh_identity_defining": false,
      "dfh_is_has_type_subproperty": false,
      "dfh_property_identifier_in_namespace": "P5",
      "dfh_namespace_uri": null,
      "dfh_fk_namespace": 66,
      "dfh_namespace_label_language": "en",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_profile_association_type": null,
      "dfh_fk_profile": 8,
      "dfh_profile_label": "Maritime history",
      "dfh_profile_label_language": "en"
    },
    {
      "removed_from_api": false,
      "requested_language": "en",
      "tmsp_last_dfh_update": "2020-03-05T14:05:26.714+00:00",
      "is_enabled_in_profile": null,
      "dfh_pk_property": 1341,
      "dfh_property_label_language": "en",
      "dfh_property_label": "has built",
      "dfh_property_inverse_label": "was built by",
      "dfh_property_scope_note_language": "en",
      "dfh_property_scope_note": "This property identifies the C2 Ship that came into existence as a result of an C12 Shipbuilding.",
      "dfh_is_inherited": false,
      "dfh_property_domain": 533,
      "dfh_domain_instances_min_quantifier": 1,
      "dfh_domain_instances_max_quantifier": 1,
      "dfh_property_range": 522,
      "dfh_range_instances_min_quantifier": 1,
      "dfh_range_instances_max_quantifier": -1,
      "dfh_identity_defining": false,
      "dfh_is_has_type_subproperty": false,
      "dfh_property_identifier_in_namespace": "P7",
      "dfh_namespace_uri": null,
      "dfh_fk_namespace": 66,
      "dfh_namespace_label_language": "en",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_profile_association_type": null,
      "dfh_fk_profile": 8,
      "dfh_profile_label": "Maritime history",
      "dfh_profile_label_language": "en"
    },
    {
      "removed_from_api": false,
      "requested_language": "en",
      "tmsp_last_dfh_update": "2020-03-05T14:05:26.714+00:00",
      "is_enabled_in_profile": null,
      "dfh_pk_property": 1342,
      "dfh_property_label_language": "en",
      "dfh_property_label": "carried out by",
      "dfh_property_inverse_label": "performed",
      "dfh_property_scope_note_language": "en",
      "dfh_property_scope_note": "This property identifies the C4 Shipyard that carried out the C12 Shipbuilding.",
      "dfh_is_inherited": false,
      "dfh_property_domain": 533,
      "dfh_domain_instances_min_quantifier": 0,
      "dfh_domain_instances_max_quantifier": -1,
      "dfh_property_range": 525,
      "dfh_range_instances_min_quantifier": 1,
      "dfh_range_instances_max_quantifier": 1,
      "dfh_identity_defining": false,
      "dfh_is_has_type_subproperty": false,
      "dfh_property_identifier_in_namespace": "P8",
      "dfh_namespace_uri": null,
      "dfh_fk_namespace": 66,
      "dfh_namespace_label_language": "en",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_profile_association_type": null,
      "dfh_fk_profile": 8,
      "dfh_profile_label": "Maritime history",
      "dfh_profile_label_language": "en"
    },
    {
      "removed_from_api": false,
      "requested_language": "en",
      "tmsp_last_dfh_update": "2020-03-05T14:05:26.714+00:00",
      "is_enabled_in_profile": null,
      "dfh_pk_property": 1343,
      "dfh_property_label_language": "en",
      "dfh_property_label": "is carried out in the context of",
      "dfh_property_inverse_label": "has carried out",
      "dfh_property_scope_note_language": "en",
      "dfh_property_scope_note": "This property associates the transport activity with one or more voyages in which the activity is carried out",
      "dfh_is_inherited": false,
      "dfh_property_domain": 527,
      "dfh_domain_instances_min_quantifier": 0,
      "dfh_domain_instances_max_quantifier": -1,
      "dfh_property_range": 523,
      "dfh_range_instances_min_quantifier": 0,
      "dfh_range_instances_max_quantifier": -1,
      "dfh_identity_defining": false,
      "dfh_is_has_type_subproperty": false,
      "dfh_property_identifier_in_namespace": "P9",
      "dfh_namespace_uri": null,
      "dfh_fk_namespace": 66,
      "dfh_namespace_label_language": "en",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_profile_association_type": null,
      "dfh_fk_profile": 8,
      "dfh_profile_label": "Maritime history",
      "dfh_profile_label_language": "en"
    },
    {
      "removed_from_api": false,
      "requested_language": "en",
      "tmsp_last_dfh_update": "2020-03-05T14:05:26.714+00:00",
      "is_enabled_in_profile": null,
      "dfh_pk_property": 1345,
      "dfh_property_label_language": "en",
      "dfh_property_label": "is participation in",
      "dfh_property_inverse_label": "(inverse of) is participation in",
      "dfh_property_scope_note_language": "en",
      "dfh_property_scope_note": "This property identifies the event to which the participation is related.",
      "dfh_is_inherited": true,
      "dfh_property_domain": 535,
      "dfh_domain_instances_min_quantifier": 0,
      "dfh_domain_instances_max_quantifier": -1,
      "dfh_property_range": 523,
      "dfh_range_instances_min_quantifier": 1,
      "dfh_range_instances_max_quantifier": 1,
      "dfh_identity_defining": false,
      "dfh_is_has_type_subproperty": false,
      "dfh_property_identifier_in_namespace": "P11",
      "dfh_namespace_uri": null,
      "dfh_fk_namespace": 112,
      "dfh_namespace_label_language": "en",
      "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
      "dfh_profile_association_type": null,
      "dfh_fk_profile": 8,
      "dfh_profile_label": "Maritime history",
      "dfh_profile_label_language": "en"
    },
    {
      "removed_from_api": false,
      "requested_language": "en",
      "tmsp_last_dfh_update": "2020-03-05T14:05:26.714+00:00",
      "is_enabled_in_profile": null,
      "dfh_pk_property": 1354,
      "dfh_property_label_language": "en",
      "dfh_property_label": "has set up",
      "dfh_property_inverse_label": "was set up by",
      "dfh_property_scope_note_language": "en",
      "dfh_property_scope_note": "To supply a ship with all the equipment, crew, food, etc. ",
      "dfh_is_inherited": false,
      "dfh_property_domain": 529,
      "dfh_domain_instances_min_quantifier": 1,
      "dfh_domain_instances_max_quantifier": 1,
      "dfh_property_range": 523,
      "dfh_range_instances_min_quantifier": 0,
      "dfh_range_instances_max_quantifier": -1,
      "dfh_identity_defining": false,
      "dfh_is_has_type_subproperty": false,
      "dfh_property_identifier_in_namespace": "P10",
      "dfh_namespace_uri": null,
      "dfh_fk_namespace": 66,
      "dfh_namespace_label_language": "en",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_profile_association_type": null,
      "dfh_fk_profile": 8,
      "dfh_profile_label": "Maritime history",
      "dfh_profile_label_language": "en"
    },
    {
      "removed_from_api": false,
      "requested_language": "en",
      "tmsp_last_dfh_update": "2020-03-05T14:05:26.714+00:00",
      "is_enabled_in_profile": null,
      "dfh_pk_property": 1358,
      "dfh_property_label_language": "en",
      "dfh_property_label": "carried",
      "dfh_property_inverse_label": "was carried by",
      "dfh_property_scope_note_language": "en",
      "dfh_property_scope_note": "This property associates the transported good",
      "dfh_is_inherited": false,
      "dfh_property_domain": 527,
      "dfh_domain_instances_min_quantifier": 0,
      "dfh_domain_instances_max_quantifier": -1,
      "dfh_property_range": 526,
      "dfh_range_instances_min_quantifier": 1,
      "dfh_range_instances_max_quantifier": -1,
      "dfh_identity_defining": false,
      "dfh_is_has_type_subproperty": false,
      "dfh_property_identifier_in_namespace": "P11",
      "dfh_namespace_uri": null,
      "dfh_fk_namespace": 66,
      "dfh_namespace_label_language": "en",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_profile_association_type": null,
      "dfh_fk_profile": 8,
      "dfh_profile_label": "Maritime history",
      "dfh_profile_label_language": "en"
    },
    {
      "removed_from_api": false,
      "requested_language": "en",
      "tmsp_last_dfh_update": "2020-03-05T14:05:26.714+00:00",
      "is_enabled_in_profile": null,
      "dfh_pk_property": 1359,
      "dfh_property_label_language": "en",
      "dfh_property_label": "participated in",
      "dfh_property_inverse_label": "had as participant",
      "dfh_property_scope_note_language": "en",
      "dfh_property_scope_note": "This property is a shortcut for the  Participation – histC25 temporal entity. It just asserts that someone participated in a voyage in some way and for an undefined timespan.",
      "dfh_is_inherited": false,
      "dfh_property_domain": 21,
      "dfh_domain_instances_min_quantifier": 1,
      "dfh_domain_instances_max_quantifier": -1,
      "dfh_property_range": 523,
      "dfh_range_instances_min_quantifier": 0,
      "dfh_range_instances_max_quantifier": -1,
      "dfh_identity_defining": false,
      "dfh_is_has_type_subproperty": false,
      "dfh_property_identifier_in_namespace": "P12",
      "dfh_namespace_uri": null,
      "dfh_fk_namespace": 66,
      "dfh_namespace_label_language": "en",
      "dfh_namespace_label": "Maritime history ongoing",
      "dfh_profile_association_type": null,
      "dfh_fk_profile": 8,
      "dfh_profile_label": "Maritime history",
      "dfh_profile_label_language": "en"
    }
  ]
}