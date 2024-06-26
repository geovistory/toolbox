
  import {NewDfhApiClass, NewDfhApiProfile, NewDfhApiProperty, OntomeProfileMock} from '../gvDB/local-model.helpers';

  const PROFILE:NewDfhApiProfile = {
  "removed_from_api": false,
  "requested_language": "en",
  "dfh_pk_profile": 12,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_project_label": "Semantic Data for Humanities and Social Sciences (SDHSS)",
  "dfh_owned_by_project": 8,
  "dfh_profile_definition": "This profile provides classes and properties tha describe essential apects of a persons life, like birth, death, marriage, family relationships.",
  "dfh_project_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_profile_definition_language": "en",
  "dfh_is_ongoing_forced_publication": true,
  "dfh_is_root_profile": false,
  "dfh_fk_root_profile": 53
}


  export namespace PROFILE_12_CLASSES {
    
  export const EN_21_PERSON:NewDfhApiClass = {
  "dfh_pk_class": 21,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 12,
  "dfh_class_label": "Person",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises real persons who live or are assumed to have lived.\r\nLegendary figures that may have existed, such as Ulysses and King Arthur, fall into this class if the documentation refers to them as historical figures. In cases where doubt exists as to whether several persons are in fact identical, multiple instances can be created and linked to indicate their relationship. The CRM does not propose a specific form to support reasoning about possible identity.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E21",
  "dfh_profile_association_type": "selected",
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
    

  export const EN_61_BIRTH:NewDfhApiClass = {
  "dfh_pk_class": 61,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 12,
  "dfh_class_label": "Birth",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class comprises the births of human beings. E67 Birth is a biological event focussing on the context of people coming into life. (E63 Beginning of Existence comprises the coming into life of any living beings).\r\nTwins, triplets etc. are brought into life by the same E67 Birth event. The introduction of the E67 Birth event as a documentation element allows the description of a range of family relationships in a simple model. Suitable extensions may describe more details and the complexity of motherhood with the intervention of modern medicine. In this model, the biological father is not seen as a necessary participant in the E67 Birth event.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E67",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    57
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
    

  export const EN_63_DEATH:NewDfhApiClass = {
  "dfh_pk_class": 63,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 12,
  "dfh_class_label": "Death",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class comprises the deaths of human beings.If a person is killed, their death should be instantiated as E69 Death and as E7 Activity. The death or perishing of other living beings should be documented using E64 End of Existence.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E69",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    58
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
    

  export const EN_212_GEOGRAPHICAL_LOCATION_OF_A_PHYSICAL_THING:NewDfhApiClass = {
  "dfh_pk_class": 212,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 12,
  "dfh_class_label": "Geographical Location of a Physical Thing",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class comprises geographical locations of instances of the crm:E18 Physical Thing class and subclasses, during a given time span, intended as their situation in relation to a place on the surface of the Earth. If the precise location of a physical thing at a given moment is not known, it can be located in a relative position with respect to a geographical place, providing a direction and distance.\r\nA location can also be a presence or inclusion in the given place, e.g. a geographical place situated within another or a person staying in a city. The geographical location of an object situated in a cave in the heart of a mountain, in a submarine or in a balloon has to be expressed in relation to geographical places situated on the surface of the earth or the seas. The location in relation to a building or other kind of construction is also possible using the correspondent property. In this case, the geographical location is provided by the geographical position of the construction itself.\r\nThis class is modelled as a subclass of sdh:C1 Entity Quality insofar as it does not represent a phenomenon in the sense of a spatio-temporal interaction of entities, i.e. a crm:E5 Event, but the position of a physical thing in relation to a geographical place intended as a time related quality. The intended spatial location is the main or macro position of the phisical thing during the given time-span. This means that the provided location is generally observable during the intended time-span even if at some point in time the entity is to be found in another location, e.g. a person going for a walk in the countryside, or an antique vase being loaned to another museum for an exhibition. If one needs to express these localisations of shorter duration, other instances of this same class must be created.\r\nA dedicated vocabulary of types will allow to distinguish the different types of locations (e.g. presence in, inclusion, adjacency, outside of, etc.). In addition, a specific property allows to add the reason(s) for the localisation. This or these reason(s) are to be considered as valid for the whole period of localisation. For more complex situations, several instances of this same class or, rather, of other classes will be used to express the chronological evolution of the motivations of the geographical location of a physical entity. Furthermore, it should be noted that this class is explicitly aimed at expressing a physical location. To capture an official domicile, legal seat of an actor, etc. the sdh-so:C28 Social Location of an Actor class must be used.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C15",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    211
  ],
  "dfh_ancestor_classes": [
    1,
    2,
    214
  ]
}
    

  export const EN_340_PHYSICAL_THING_LIFE:NewDfhApiClass = {
  "dfh_pk_class": 340,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 12,
  "dfh_class_label": "Physical Thing Life",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class comprises all the crm:E5 Events in which an instance of crm:E18 Physical Thing participates during its life. This class therefore models the phenomenon of the existence of an object or, more precisely, the collection of events that make up the existence and life of a physical thing, be this a person, a physical object, etc.\r\nConceptual and social objects are not in the scope of this class.\r\nThe life of a physical thing is started and ended by events. If these two ends are not known, the time-span of this class will provide the period of life known with certainty as well as the possible outer bounds, in addition to the life span duration if known. In this sense it corresponds to the notion of floruit commonly used in historical research and generally related to persons.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C19",
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
    

  export const EN_363_GEOGRAPHICAL_PLACE:NewDfhApiClass = {
  "dfh_pk_class": 363,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 12,
  "dfh_class_label": "Geographical Place",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Biographical basics and family",
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
    

  export const EN_441_CONSTRUCTION:NewDfhApiClass = {
  "dfh_pk_class": 441,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 12,
  "dfh_class_label": "Construction",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises instances of man-made things such as freestanding buildings, components of buildings, and complexes of buildings, but also all man-made parts of infrastructure (roads, lamp post, dams, etc.)",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C17",
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    23
  ],
  "dfh_ancestor_classes": [
    1,
    18,
    64,
    65,
    66,
    70,
    83,
    214,
    539
  ]
}
    

  export const EN_449_GEOGRAPHICAL_LOCATION_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 449,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 12,
  "dfh_class_label": "Geographical Location Type",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": " \r\n\r\nThis class groups the concepts (expressed as types) that provide the identity of the Geographical location, e.g. inclusion, presence in, proximity, etc., i.e. the type of location.\r\nBeware not to confuse the type of a location with its reasons, e.g. a trading trip of a merchant, territorial belonging of a province, etc.\r\n",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C16",
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
    

  export const EN_629_GENDER:NewDfhApiClass = {
  "dfh_pk_class": 629,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 12,
  "dfh_class_label": "Gender",
  "dfh_fk_namespace": 112,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "\"Gender is the state of being male or female in relation to the social and cultural roles that are considered appropriate for men and women\" (Collins).",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C11",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    444
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    53,
    64,
    65,
    70,
    214,
    706
  ]
}
    

  export const EN_633_UNION:NewDfhApiClass = {
  "dfh_pk_class": 633,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 12,
  "dfh_class_label": "Union",
  "dfh_fk_namespace": 112,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "[under construction] This class models the fact of the union of two persons for a certain period of time, which may give rise to the birth of children.It is inspired by the GEDCOM modeling used by genealogists (http://fr.wikipedia.org/wiki/Norme_GEDCOM): the \"Union\" class indicates the existence over time of a couple, to which births, adoptions, etc. can be linked. The class \"Union\" models all kinds of relationships, regardless of their legal, emotional or social form, and indicates the time span of their duration (start/end date). Same-sex unions are also to be encoded with this class. A type is used to specify the nature of the union (marriage, common-law union, etc.).\r\n[deprecated and to be replaced by characteristic] If a union has several phases, with successive time spans, we create several instances of the class 'Union', with their respective type and time-span, then we associate them to a global union, for the whole duration of the union by using the property is component of (has component) – histP29 .",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C9",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    702
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
    

  export const EN_634_TYPE_OF_UNION:NewDfhApiClass = {
  "dfh_pk_class": 634,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 12,
  "dfh_class_label": "Type of Union",
  "dfh_fk_namespace": 112,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the class Union – histC31.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C10",
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
    

  export const EN_839_LOCATION_REASON:NewDfhApiClass = {
  "dfh_pk_class": 839,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 12,
  "dfh_class_label": "Location Reason",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class groups the concepts (expressed as types) that give the reason for the location of an object in relation to a geographical place at a given time (trading trip of a merchant, territorial belonging of a province, etc.).The reason for the location should not be confused with its type (inclusion, presence in, proximity, etc.)",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C35",
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
  export namespace PROFILE_12_PROPERTIES {
    
  export const EN_61_7_363_TOOK_PLACE_ON_OR_WITHIN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 7,
  "dfh_property_label_language": "en",
  "dfh_property_label": "took place on or within",
  "dfh_property_inverse_label": "witnessed",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property describes the location of an instance of E4 Period with respect to an E19 Physical Object. P8 took place on or within (witnessed) is a shortcut of the more fully developed path from E4 Period through P7 took place at, E53 Place, P156 occupies (is occupied by) to E18 Physical Thing.\r\nIt describes a period that can be located with respect to the space defined by an E19 Physical Object such as a ship or a building. The precise geographical location of the object during the period in question may be unknown or unimportant.For example, the French and German armistice of 22 June 1940 was signed in the same railway carriage as the armistice of 11 November 1918.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 61,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 363,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P8",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 12,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_61_7_441_TOOK_PLACE_ON_OR_WITHIN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 7,
  "dfh_property_label_language": "en",
  "dfh_property_label": "took place on or within",
  "dfh_property_inverse_label": "witnessed",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property describes the location of an instance of E4 Period with respect to an E19 Physical Object. P8 took place on or within (witnessed) is a shortcut of the more fully developed path from E4 Period through P7 took place at, E53 Place, P156 occupies (is occupied by) to E18 Physical Thing.\r\nIt describes a period that can be located with respect to the space defined by an E19 Physical Object such as a ship or a building. The precise geographical location of the object during the period in question may be unknown or unimportant.For example, the French and German armistice of 22 June 1940 was signed in the same railway carriage as the armistice of 11 November 1918.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 61,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 441,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P8",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 12,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_63_7_441_TOOK_PLACE_ON_OR_WITHIN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 7,
  "dfh_property_label_language": "en",
  "dfh_property_label": "took place on or within",
  "dfh_property_inverse_label": "witnessed",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property describes the location of an instance of E4 Period with respect to an E19 Physical Object. P8 took place on or within (witnessed) is a shortcut of the more fully developed path from E4 Period through P7 took place at, E53 Place, P156 occupies (is occupied by) to E18 Physical Thing.\r\nIt describes a period that can be located with respect to the space defined by an E19 Physical Object such as a ship or a building. The precise geographical location of the object during the period in question may be unknown or unimportant.For example, the French and German armistice of 22 June 1940 was signed in the same railway carriage as the armistice of 11 November 1918.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 63,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 441,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P8",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 12,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_61_86_21_BROUGHT_INTO_LIFE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 86,
  "dfh_property_label_language": "en",
  "dfh_property_label": "brought into life",
  "dfh_property_inverse_label": "was born",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property links an E67Birth event to an E21 Person in the role of offspring.\r\nTwins, triplets etc. are brought into life by the same Birth event. This is not intended for use with general Natural History material, only people. There is no explicit method for modelling conception and gestation except by using extensions.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 61,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 21,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P98",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 12,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    80,
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_63_88_21_WAS_DEATH_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 88,
  "dfh_property_label_language": "en",
  "dfh_property_label": "was death of",
  "dfh_property_inverse_label": "died in",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property property links an E69 Death event to the E21 Person that died.\r\nA Death event may involve multiple people, for example in the case of a battle or disaster.This is not intended for use with general Natural History material, only people.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 63,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 21,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P100",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 12,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    81,
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_212_1066_449_HAS_LOCATION_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1066,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has location type",
  "dfh_property_inverse_label": "is location type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates a geographical localisation with the type which defines its identity, i.e. inclusion, proximity, presence in, etc.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 212,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 449,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P19",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 12,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_212_1177_21_IS_LOCATION_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1177,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is location of",
  "dfh_property_inverse_label": "has location",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property identifies a crm:E18 Physical Thing localized at some place during the given time span of a C15 Geographical Location.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 212,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 21,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P17",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 12,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_212_1178_363_IS_RELATIVE_TO:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1178,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is relative to",
  "dfh_property_inverse_label": "is location of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the C15 Geographical location with the C13 Geographical place related to it.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 212,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 363,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P15",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 12,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_340_1414_21_IS_LIFE_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1414,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is life of",
  "dfh_property_inverse_label": "has life",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the physical thing to its life as the collection of events in the physical world it is involved in during its existence.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 340,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 21,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P26",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 12,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_21_1429_629_HAS_GENDER:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1429,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has gender",
  "dfh_property_inverse_label": "is gender of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates a person with his/hers gender. Insofar as this property is timeless, it has to be considered as a shortcut for a TeEn expressing the evolution of gender over time (as subclass of Time-related Persistent Item Characteristic – histC1). Also the quantifier on the gender side is open to different possibilities.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 21,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 629,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P23",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 112,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 12,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_61_1435_633_STEMMED_FROM:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1435,
  "dfh_property_label_language": "en",
  "dfh_property_label": "stemmed from",
  "dfh_property_inverse_label": "resulted in",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property models the biological origin of a birth from the physical union of the parents. This is the common scenario. For more specific situations, like adoption or artificial procreation, a more suitable model should be applied.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 61,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 633,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P22",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 112,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 12,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_633_1436_21_HAD_PARTNER:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1436,
  "dfh_property_label_language": "en",
  "dfh_property_label": "had partner",
  "dfh_property_inverse_label": "was partner in",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the two (always two) instances of E21 Person participating to the C9 Union.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 633,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 21,
  "dfh_range_instances_min_quantifier": 2,
  "dfh_range_instances_max_quantifier": 2,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P20",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 112,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 12,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_633_1437_634_HAS_TYPE_OF_UNION:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1437,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has type of union",
  "dfh_property_inverse_label": "is type of union of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates a C9 Union with the C10 Type of Union which defines its identity.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 633,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 634,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P21",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 112,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 12,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_21_1439_363_HAS_ITS_ORIGINS_IN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1439,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has its origins in",
  "dfh_property_inverse_label": "is origin of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates a person to the geographical region or place he/she comes from, in the sense of unspecified origin. If this place or region is the place where the person was born, it would be preferable to use a E67 Birth event",
  "dfh_is_inherited": false,
  "dfh_property_domain": 21,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 363,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P24",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 112,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 12,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_63_1599_363_TOOK_PLACE_AT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1599,
  "dfh_property_label_language": "en",
  "dfh_property_label": "took place at",
  "dfh_property_inverse_label": "was place of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property specifies the geographical place where an instance of E4 Period happened.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 63,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 363,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P6",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 12,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    7
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_212_1798_839_HAS_LOCATION_REASON:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1798,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has location reason",
  "dfh_property_inverse_label": "is reason of location",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates a physical location with the concept (as type) that explains ist motive",
  "dfh_is_inherited": false,
  "dfh_property_domain": 212,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 839,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P46",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 12,
  "dfh_profile_label": "Biographical basics and family",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    
  }


  export const PROFILE_12_BIOGRAPHICAL_BA_2022_02_09: OntomeProfileMock = {
    profile: PROFILE,
    classes: [
      PROFILE_12_CLASSES.EN_21_PERSON,
PROFILE_12_CLASSES.EN_61_BIRTH,
PROFILE_12_CLASSES.EN_63_DEATH,
PROFILE_12_CLASSES.EN_212_GEOGRAPHICAL_LOCATION_OF_A_PHYSICAL_THING,
PROFILE_12_CLASSES.EN_340_PHYSICAL_THING_LIFE,
PROFILE_12_CLASSES.EN_363_GEOGRAPHICAL_PLACE,
PROFILE_12_CLASSES.EN_441_CONSTRUCTION,
PROFILE_12_CLASSES.EN_449_GEOGRAPHICAL_LOCATION_TYPE,
PROFILE_12_CLASSES.EN_629_GENDER,
PROFILE_12_CLASSES.EN_633_UNION,
PROFILE_12_CLASSES.EN_634_TYPE_OF_UNION,
PROFILE_12_CLASSES.EN_839_LOCATION_REASON
    ],
    properties: [
      PROFILE_12_PROPERTIES.EN_61_7_363_TOOK_PLACE_ON_OR_WITHIN,
PROFILE_12_PROPERTIES.EN_61_7_441_TOOK_PLACE_ON_OR_WITHIN,
PROFILE_12_PROPERTIES.EN_63_7_441_TOOK_PLACE_ON_OR_WITHIN,
PROFILE_12_PROPERTIES.EN_61_86_21_BROUGHT_INTO_LIFE,
PROFILE_12_PROPERTIES.EN_63_88_21_WAS_DEATH_OF,
PROFILE_12_PROPERTIES.EN_212_1066_449_HAS_LOCATION_TYPE,
PROFILE_12_PROPERTIES.EN_212_1177_21_IS_LOCATION_OF,
PROFILE_12_PROPERTIES.EN_212_1178_363_IS_RELATIVE_TO,
PROFILE_12_PROPERTIES.EN_340_1414_21_IS_LIFE_OF,
PROFILE_12_PROPERTIES.EN_21_1429_629_HAS_GENDER,
PROFILE_12_PROPERTIES.EN_61_1435_633_STEMMED_FROM,
PROFILE_12_PROPERTIES.EN_633_1436_21_HAD_PARTNER,
PROFILE_12_PROPERTIES.EN_633_1437_634_HAS_TYPE_OF_UNION,
PROFILE_12_PROPERTIES.EN_21_1439_363_HAS_ITS_ORIGINS_IN,
PROFILE_12_PROPERTIES.EN_63_1599_363_TOOK_PLACE_AT,
PROFILE_12_PROPERTIES.EN_212_1798_839_HAS_LOCATION_REASON
    ]
  }
  