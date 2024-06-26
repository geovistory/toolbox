
  import {NewDfhApiClass, NewDfhApiProfile, NewDfhApiProperty, OntomeProfileMock} from '../gvDB/local-model.helpers';

  const PROFILE:NewDfhApiProfile = {
  "removed_from_api": false,
  "requested_language": "en",
  "dfh_pk_profile": 8,
  "dfh_profile_label": "Maritime history",
  "dfh_project_label": "Geovistory",
  "dfh_owned_by_project": 6,
  "dfh_profile_definition": "This profile is used to provide specific classes and properties relevant for maritime history, like voyage, ship, etc.",
  "dfh_project_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_profile_definition_language": "en",
  "dfh_is_ongoing_forced_publication": true,
  "dfh_is_root_profile": false,
  "dfh_fk_root_profile": 61
}


  export namespace PROFILE_8_CLASSES {
    
  export const EN_21_PERSON:NewDfhApiClass = {
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
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    20,
    38
  ],
  "dfh_ancestor_classes": [
    1,
    18,
    19,
    64,
    66,
    70,
    83,
    214,
    539,
    881
  ]
}
    

  export const EN_363_GEOGRAPHICAL_PLACE:NewDfhApiClass = {
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
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    25
  ],
  "dfh_ancestor_classes": [
    1,
    18,
    64,
    66,
    70,
    83,
    214,
    539
  ]
}
    

  export const EN_365_APPELLATION_IN_A_LANGUAGE:NewDfhApiClass = {
  "dfh_pk_class": 365,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 8,
  "dfh_class_label": "Appellation in a Language",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Maritime history",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class refers to the fact that an entity (actor, group, concept, etc.) is identified in the context of a social collective, during a given time span, using a specific appellation. This identifying appellation is generally related to the main language used be the social collective, or at least considered as understandable or valid in that context(e.g. a Latin or English appellation in a French speaking context).\r\nAs a subclass of social connotation, this class does not refer to an activity of collectively naming a thing (cf. the FRBRoo:F52_Name_Use_Activity class) but  to the possibility of identifying with that appellation within the given social context or collective.\r\nThe crm: P1 is identified property is a shortcut of the present class directly (i.e. independengly from time and context) linking a crm:E1 Entity to its crmE41 Appellation.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C11",
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    699
  ],
  "dfh_ancestor_classes": [
    1,
    2,
    211,
    214,
    756
  ]
}
    

  export const EN_522_SHIP:NewDfhApiClass = {
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
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    22
  ],
  "dfh_ancestor_classes": [
    1,
    18,
    19,
    23,
    64,
    65,
    66,
    70,
    83,
    214,
    539
  ]
}
    

  export const EN_523_SHIP_VOYAGE:NewDfhApiClass = {
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
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    686
  ],
  "dfh_ancestor_classes": [
    1,
    2,
    4,
    5,
    83,
    214,
    539
  ]
}
    

  export const EN_524_SHIP_TYPE:NewDfhApiClass = {
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
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    53
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    64,
    65,
    70,
    214
  ]
}
    

  export const EN_525_SHIPYARD:NewDfhApiClass = {
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
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    39
  ],
  "dfh_ancestor_classes": [
    1,
    38,
    68,
    70,
    214,
    881
  ]
}
    

  export const EN_526_ECONOMIC_GOOD:NewDfhApiClass = {
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
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    19
  ],
  "dfh_ancestor_classes": [
    1,
    18,
    64,
    66,
    70,
    83,
    214,
    539
  ]
}
    

  export const EN_527_TRANSPORT:NewDfhApiClass = {
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
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    7
  ],
  "dfh_ancestor_classes": [
    1,
    2,
    4,
    5,
    83,
    214,
    539
  ]
}
    

  export const EN_528_STOPOVER:NewDfhApiClass = {
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
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    5
  ],
  "dfh_ancestor_classes": [
    1,
    2,
    4,
    83,
    214,
    539
  ]
}
    

  export const EN_529_VOC_CHAMBER:NewDfhApiClass = {
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
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    39
  ],
  "dfh_ancestor_classes": [
    1,
    38,
    68,
    70,
    214,
    881
  ]
}
    

  export const EN_533_SHIPBUILDING:NewDfhApiClass = {
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
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    12
  ],
  "dfh_ancestor_classes": [
    1,
    2,
    4,
    5,
    7,
    11,
    57,
    83,
    214,
    539
  ]
}
    

  export const EN_535_PARTICIPATION:NewDfhApiClass = {
  "dfh_pk_class": 535,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 8,
  "dfh_class_label": "Participation",
  "dfh_fk_namespace": 112,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Maritime history",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class comprises periods of a more or less active participation of an actor (generally a person but sometimes a group) in an event, be this a battle, voyage, conference, etc. If the participation involves the exercise of a function or holding of an office or rank this can be associated using the sdh-so:P12 is participation in the quality of proprety. One or more functions can be associated to the same Participation if their time span is identical. It is otherwise preferable to split consecutive holdins of an office in the same event producing several instances of this class. The time-span of this class is equal to or included in the time-span of the related event.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C15",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    686
  ],
  "dfh_ancestor_classes": [
    1,
    2,
    4,
    5,
    83,
    214,
    539
  ]
}
    
  }
  export namespace PROFILE_8_PROPERTIES {
    
  export const EN_365_1111_522_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1111,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is appellation for language of",
  "dfh_property_inverse_label": "has appellation for language",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the Appelation for language to the E1 CRM Entity that it identifies.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 365,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 522,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P11",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 8,
  "dfh_profile_label": "Maritime history",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_523_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1111,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is appellation for language of",
  "dfh_property_inverse_label": "has appellation for language",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the Appelation for language to the E1 CRM Entity that it identifies.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 365,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 523,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P11",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 8,
  "dfh_profile_label": "Maritime history",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_524_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1111,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is appellation for language of",
  "dfh_property_inverse_label": "has appellation for language",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the Appelation for language to the E1 CRM Entity that it identifies.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 365,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 524,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P11",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 8,
  "dfh_profile_label": "Maritime history",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_525_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1111,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is appellation for language of",
  "dfh_property_inverse_label": "has appellation for language",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the Appelation for language to the E1 CRM Entity that it identifies.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 365,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 525,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P11",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 8,
  "dfh_profile_label": "Maritime history",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_526_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1111,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is appellation for language of",
  "dfh_property_inverse_label": "has appellation for language",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the Appelation for language to the E1 CRM Entity that it identifies.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 365,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 526,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P11",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 8,
  "dfh_profile_label": "Maritime history",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_527_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1111,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is appellation for language of",
  "dfh_property_inverse_label": "has appellation for language",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the Appelation for language to the E1 CRM Entity that it identifies.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 365,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 527,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P11",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 8,
  "dfh_profile_label": "Maritime history",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_528_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1111,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is appellation for language of",
  "dfh_property_inverse_label": "has appellation for language",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the Appelation for language to the E1 CRM Entity that it identifies.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 365,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 528,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P11",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 8,
  "dfh_profile_label": "Maritime history",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_529_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1111,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is appellation for language of",
  "dfh_property_inverse_label": "has appellation for language",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the Appelation for language to the E1 CRM Entity that it identifies.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 365,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 529,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P11",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 8,
  "dfh_profile_label": "Maritime history",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_533_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1111,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is appellation for language of",
  "dfh_property_inverse_label": "has appellation for language",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the Appelation for language to the E1 CRM Entity that it identifies.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 365,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 533,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P11",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 8,
  "dfh_profile_label": "Maritime history",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_535_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1111,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is appellation for language of",
  "dfh_property_inverse_label": "has appellation for language",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the Appelation for language to the E1 CRM Entity that it identifies.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 365,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 535,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P11",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 8,
  "dfh_profile_label": "Maritime history",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_523_1335_363_HAD_DEPARTURE_PLACE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
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
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_523_1336_363_HAD_ARRIVAL_PLACE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
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
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_522_1337_524_HAS_SHIP_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
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
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_523_1338_522_WAS_CARRIED_OUT_BY:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
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
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_528_1339_363_TOOK_PLACE_AT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
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
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_528_1340_523_WAS_PART_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
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
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1357
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_533_1341_522_HAS_BUILT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
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
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    96
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_533_1342_525_CARRIED_OUT_BY:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
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
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    13
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_527_1343_523_IS_CARRIED_OUT_IN_THE_CONTEXT_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
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
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1357
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_535_1345_523_IS_PARTICIPATION_IN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
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
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_529_1354_523_HAS_SET_UP:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
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
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_527_1358_526_CARRIED:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
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
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_21_1359_523_PARTICIPATED_IN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
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
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    
  }


  export const PROFILE_8_MARITIME_HISTOR_2022_01_18: OntomeProfileMock = {
    profile: PROFILE,
    classes: [
      PROFILE_8_CLASSES.EN_21_PERSON,
PROFILE_8_CLASSES.EN_363_GEOGRAPHICAL_PLACE,
PROFILE_8_CLASSES.EN_365_APPELLATION_IN_A_LANGUAGE,
PROFILE_8_CLASSES.EN_522_SHIP,
PROFILE_8_CLASSES.EN_523_SHIP_VOYAGE,
PROFILE_8_CLASSES.EN_524_SHIP_TYPE,
PROFILE_8_CLASSES.EN_525_SHIPYARD,
PROFILE_8_CLASSES.EN_526_ECONOMIC_GOOD,
PROFILE_8_CLASSES.EN_527_TRANSPORT,
PROFILE_8_CLASSES.EN_528_STOPOVER,
PROFILE_8_CLASSES.EN_529_VOC_CHAMBER,
PROFILE_8_CLASSES.EN_533_SHIPBUILDING,
PROFILE_8_CLASSES.EN_535_PARTICIPATION
    ],
    properties: [
      PROFILE_8_PROPERTIES.EN_365_1111_522_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_8_PROPERTIES.EN_365_1111_523_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_8_PROPERTIES.EN_365_1111_524_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_8_PROPERTIES.EN_365_1111_525_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_8_PROPERTIES.EN_365_1111_526_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_8_PROPERTIES.EN_365_1111_527_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_8_PROPERTIES.EN_365_1111_528_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_8_PROPERTIES.EN_365_1111_529_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_8_PROPERTIES.EN_365_1111_533_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_8_PROPERTIES.EN_365_1111_535_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_8_PROPERTIES.EN_523_1335_363_HAD_DEPARTURE_PLACE,
PROFILE_8_PROPERTIES.EN_523_1336_363_HAD_ARRIVAL_PLACE,
PROFILE_8_PROPERTIES.EN_522_1337_524_HAS_SHIP_TYPE,
PROFILE_8_PROPERTIES.EN_523_1338_522_WAS_CARRIED_OUT_BY,
PROFILE_8_PROPERTIES.EN_528_1339_363_TOOK_PLACE_AT,
PROFILE_8_PROPERTIES.EN_528_1340_523_WAS_PART_OF,
PROFILE_8_PROPERTIES.EN_533_1341_522_HAS_BUILT,
PROFILE_8_PROPERTIES.EN_533_1342_525_CARRIED_OUT_BY,
PROFILE_8_PROPERTIES.EN_527_1343_523_IS_CARRIED_OUT_IN_THE_CONTEXT_OF,
PROFILE_8_PROPERTIES.EN_535_1345_523_IS_PARTICIPATION_IN,
PROFILE_8_PROPERTIES.EN_529_1354_523_HAS_SET_UP,
PROFILE_8_PROPERTIES.EN_527_1358_526_CARRIED,
PROFILE_8_PROPERTIES.EN_21_1359_523_PARTICIPATED_IN
    ]
  }
  