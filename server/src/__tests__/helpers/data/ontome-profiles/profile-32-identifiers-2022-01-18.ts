
  import {NewDfhApiClass, NewDfhApiProfile, NewDfhApiProperty, OntomeProfileMock} from '../gvDB/local-model.helpers';

  const PROFILE:NewDfhApiProfile = {
  "removed_from_api": false,
  "requested_language": "en",
  "dfh_pk_profile": 32,
  "dfh_profile_label": "Identifiers",
  "dfh_project_label": "Geovistory",
  "dfh_owned_by_project": 6,
  "dfh_profile_definition": "This profile collects classes and properties used to associate identifiers to resources",
  "dfh_project_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_profile_definition_language": "en",
  "dfh_is_ongoing_forced_publication": true,
  "dfh_is_root_profile": false,
  "dfh_fk_root_profile": 69
}


  export namespace PROFILE_32_CLASSES {
    
  export const EN_1_CRM_ENTITY:NewDfhApiClass = {
  "dfh_pk_class": 1,
  "dfh_basic_type": 0,
  "dfh_fk_profile": 32,
  "dfh_class_label": "CRM Entity",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Identifiers",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": null,
  "dfh_class_scope_note": "This class comprises all things in the universe of discourse of the CIDOC Conceptual Reference Model.\r\n\r\nIt is an abstract concept providing for three general properties:\r\nIdentification by name or appellation, and in particular by a preferred identifier\r\nClassification by type, allowing further refinement of the specific subclass an instance belongs to\r\nAttachment of free text for the expression of anything not captured by formal properties\r\n\r\nWith the exception of E59 Primitive Value, all other classes within the CRM are directly or indirectly specialisations of E1 CRM Entity.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E1",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    214
  ],
  "dfh_ancestor_classes": []
}
    

  export const EN_21_PERSON:NewDfhApiClass = {
  "dfh_pk_class": 21,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 32,
  "dfh_class_label": "Person",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Identifiers",
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
    

  export const EN_41_IDENTIFIER:NewDfhApiClass = {
  "dfh_pk_class": 41,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 32,
  "dfh_class_label": "Identifier",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Identifiers",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises strings or codes assigned to instances of E1 CRM Entity in order to identify them uniquely and permanently\n            within the context of one or more organisations. Such codes are often known as inventory numbers, registration codes, etc. and are\n            typically composed of alphanumeric sequences. The class E42 Identifier is not normally used for machine-generated identifiers used for\n            automated processing unless these are also used by human agents.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E42",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    40
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    64,
    65,
    66,
    70,
    82,
    214
  ]
}
    

  export const EN_68_GROUP:NewDfhApiClass = {
  "dfh_pk_class": 68,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 32,
  "dfh_class_label": "Group",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Identifiers",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises any gatherings or organizations of E39 Actors that act collectively or in a similar way due to any form of unifying relationship. In the wider sense this class also comprises official positions which used to be regarded in certain contexts as one actor, independent of the current holder of the office, such as the president of a country. In such cases, it may happen that the Group never had more than one member. A joint pseudonym (i.e., a name that seems indicative of an individual but that is actually used as a persona by two or more people) is a particular case of E74 Group.\r\nA gathering of people becomes an E74 Group when it exhibits organizational characteristics usually typified by a set of ideas or beliefs held in common, or actions performed together. These might be communication, creating some common artifact, a common purpose such as study, worship, business, sports, etc. Nationality can be modeled as membership in an E74 Group (cf. HumanML markup). Married couples and other concepts of family are regarded as particular examples of E74 Group.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E74",
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    38,
    853
  ],
  "dfh_ancestor_classes": [
    1,
    70,
    214,
    881
  ]
}
    

  export const EN_363_GEOGRAPHICAL_PLACE:NewDfhApiClass = {
  "dfh_pk_class": 363,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 32,
  "dfh_class_label": "Geographical Place",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Identifiers",
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
    

  export const EN_656_NAMESPACE:NewDfhApiClass = {
  "dfh_pk_class": 656,
  "dfh_basic_type": 0,
  "dfh_fk_profile": 32,
  "dfh_class_label": "Namespace",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Identifiers",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": null,
  "dfh_class_scope_note": "A namespace is a set or collection of unique symbols that refer to objects (material, conceptual or digital) and allow to identify them clearly and uniquely.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C10",
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [],
  "dfh_ancestor_classes": []
}
    

  export const EN_826_IDENTIFICATION:NewDfhApiClass = {
  "dfh_pk_class": 826,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 32,
  "dfh_class_label": "Identification",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Identifiers",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class models the quality of an identifier being a valid identifier for a resource in a given context. The context (institution, etc.) is directly associated to the identifier",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C23",
  "dfh_profile_association_type": "selected",
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
    

  export const EN_827_IDENTIFIER_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 827,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 32,
  "dfh_class_label": "Identifier Type",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Identifiers",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "A type of identifier( URI, social security number, etc.)",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C24",
  "dfh_profile_association_type": "inferred",
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
    
  }
  export namespace PROFILE_32_PROPERTIES {
    
  export const EN_1_1355_1_SAME_AS_ENTITY:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1355,
  "dfh_property_label_language": "en",
  "dfh_property_label": "same as entity",
  "dfh_property_inverse_label": "same as",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property expresses the fact that the domain Geovistory entity is considered to be the same as the resource referred to by the range Geovistory entity. As a general rule, the entities should not be in the same class (in this case the geov:P13  has to be merged with property), the difference conceptualization depending on the rich semantic model.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 1,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 1,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P10",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 32,
  "dfh_profile_label": "Identifiers",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_41_1500_656_BELONGS_TO:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1500,
  "dfh_property_label_language": "en",
  "dfh_property_label": "belongs to",
  "dfh_property_inverse_label": "is namespace of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property asserts that a given identifier is valid inside a specific namespace",
  "dfh_is_inherited": false,
  "dfh_property_domain": 41,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 656,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P14",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 32,
  "dfh_profile_label": "Identifiers",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_41_1781_826_IS_VALID_IDENTIFIER_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1781,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is valid identifier of",
  "dfh_property_inverse_label": "concerns identifier",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates the validity temporal quality to the identifier",
  "dfh_is_inherited": false,
  "dfh_property_domain": 41,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 826,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P18",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 32,
  "dfh_profile_label": "Identifiers",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_826_1782_21_IS_IDENTIFICATION_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1782,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is identification of",
  "dfh_property_inverse_label": "has identification",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the resources concerned by the identification",
  "dfh_is_inherited": true,
  "dfh_property_domain": 826,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 21,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P18",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 32,
  "dfh_profile_label": "Identifiers",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_826_1782_68_IS_IDENTIFICATION_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1782,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is identification of",
  "dfh_property_inverse_label": "has identification",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the resources concerned by the identification",
  "dfh_is_inherited": true,
  "dfh_property_domain": 826,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 68,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P18",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 32,
  "dfh_profile_label": "Identifiers",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_826_1782_363_IS_IDENTIFICATION_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1782,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is identification of",
  "dfh_property_inverse_label": "has identification",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the resources concerned by the identification",
  "dfh_is_inherited": true,
  "dfh_property_domain": 826,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 363,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P18",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 32,
  "dfh_profile_label": "Identifiers",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_41_1783_827_HAS_IDENTIFIER_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1783,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has identifier type",
  "dfh_property_inverse_label": "is identifier type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates the string defining the identity of the identifier",
  "dfh_is_inherited": false,
  "dfh_property_domain": 41,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 827,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P19",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 32,
  "dfh_profile_label": "Identifiers",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_1_1842_41_SAME_AS_URI:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1842,
  "dfh_property_label_language": "en",
  "dfh_property_label": "same as URI",
  "dfh_property_inverse_label": "same as",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates an entity with a persistent identifier in an external namespace. It is equivalent to the owl:sameAs property but applied to a specific information system in which the entity receives an identifier (domain of the property). This property states that a resource in the world (person, concept, physical object, etc.) modelled as instance in the information system is the same as the one referred to by a persitent identifier (generally a URI) in an external namespace (e.g. VIAF).\r\nThis property should NOT be used to associate URL, generic identifiers, etc. that are not persistent and public as URIs are.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 1,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 41,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P20",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 32,
  "dfh_profile_label": "Identifiers",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    
  }


  export const PROFILE_32_IDENTIFIERS_2022_01_18: OntomeProfileMock = {
    profile: PROFILE,
    classes: [
      PROFILE_32_CLASSES.EN_1_CRM_ENTITY,
PROFILE_32_CLASSES.EN_21_PERSON,
PROFILE_32_CLASSES.EN_41_IDENTIFIER,
PROFILE_32_CLASSES.EN_68_GROUP,
PROFILE_32_CLASSES.EN_363_GEOGRAPHICAL_PLACE,
PROFILE_32_CLASSES.EN_656_NAMESPACE,
PROFILE_32_CLASSES.EN_826_IDENTIFICATION,
PROFILE_32_CLASSES.EN_827_IDENTIFIER_TYPE
    ],
    properties: [
      PROFILE_32_PROPERTIES.EN_1_1355_1_SAME_AS_ENTITY,
PROFILE_32_PROPERTIES.EN_41_1500_656_BELONGS_TO,
PROFILE_32_PROPERTIES.EN_41_1781_826_IS_VALID_IDENTIFIER_OF,
PROFILE_32_PROPERTIES.EN_826_1782_21_IS_IDENTIFICATION_OF,
PROFILE_32_PROPERTIES.EN_826_1782_68_IS_IDENTIFICATION_OF,
PROFILE_32_PROPERTIES.EN_826_1782_363_IS_IDENTIFICATION_OF,
PROFILE_32_PROPERTIES.EN_41_1783_827_HAS_IDENTIFIER_TYPE,
PROFILE_32_PROPERTIES.EN_1_1842_41_SAME_AS_URI
    ]
  }
  