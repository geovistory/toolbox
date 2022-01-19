
  import {NewDfhApiClass, NewDfhApiProfile, NewDfhApiProperty, OntomeProfileMock} from '../gvDB/local-model.helpers';

  const PROFILE:NewDfhApiProfile = {
  "removed_from_api": false,
  "requested_language": "en",
  "dfh_pk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_project_label": "Semantic Data for Humanities and Social Sciences (SDHSS)",
  "dfh_owned_by_project": 8,
  "dfh_profile_definition": "This profile includes classes and properties that express interactions between people and memberships of people in groups or organisations.",
  "dfh_project_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_profile_definition_language": "en",
  "dfh_is_ongoing_forced_publication": true,
  "dfh_is_root_profile": false,
  "dfh_fk_root_profile": 70
}


  export namespace PROFILE_16_CLASSES {
    
  export const EN_21_PERSON:NewDfhApiClass = {
  "dfh_pk_class": 21,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 16,
  "dfh_class_label": "Person",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
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
    

  export const EN_68_GROUP:NewDfhApiClass = {
  "dfh_pk_class": 68,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 16,
  "dfh_class_label": "Group",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises any gatherings or organizations of E39 Actors that act collectively or in a similar way due to any form of unifying relationship. In the wider sense this class also comprises official positions which used to be regarded in certain contexts as one actor, independent of the current holder of the office, such as the president of a country. In such cases, it may happen that the Group never had more than one member. A joint pseudonym (i.e., a name that seems indicative of an individual but that is actually used as a persona by two or more people) is a particular case of E74 Group.\r\nA gathering of people becomes an E74 Group when it exhibits organizational characteristics usually typified by a set of ideas or beliefs held in common, or actions performed together. These might be communication, creating some common artifact, a common purpose such as study, worship, business, sports, etc. Nationality can be modeled as membership in an E74 Group (cf. HumanML markup). Married couples and other concepts of family are regarded as particular examples of E74 Group.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E74",
  "dfh_profile_association_type": "selected",
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
    

  export const EN_78_JOINING:NewDfhApiClass = {
  "dfh_pk_class": 78,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 16,
  "dfh_class_label": "Joining",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class comprises the activities that result in an instance of E39 Actor becoming a member of an instance of E74 Group. This class does not imply initiative by either party. It may be the initiative of a third party.\r\nTypical scenarios include becoming a member of a social organisation, becoming employee of a company, marriage, the adoption of a child by a family and the inauguration of somebody into an official position.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E85",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    7,
    685
  ],
  "dfh_ancestor_classes": [
    1,
    2,
    4,
    5,
    83,
    211,
    214,
    539,
    756,
    887
  ]
}
    

  export const EN_79_LEAVING:NewDfhApiClass = {
  "dfh_pk_class": 79,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 16,
  "dfh_class_label": "Leaving",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class comprises the activities that result in an instance of E39 Actor to be disassociated from an instance of E74 Group. This class does not imply initiative by either party. It may be the initiative of a third party.\r\nTypical scenarios include the termination of membership in a social organisation, ending the employment at a company, divorce, and the end of tenure of somebody in an official position.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E86",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    7,
    685
  ],
  "dfh_ancestor_classes": [
    1,
    2,
    4,
    5,
    83,
    211,
    214,
    539,
    756,
    887
  ]
}
    

  export const EN_334_SOCIAL_RELATIONSHIP:NewDfhApiClass = {
  "dfh_pk_class": 334,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 16,
  "dfh_class_label": "Social Relationship",
  "dfh_fk_namespace": 112,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class models the phenomenon of a social relation between people, groups or countries as it is perceived in the context of shared intention. In other words, this class does not model a physical interaction of actors in space and time (for persons this interaction is modelled with the C18 Persons' Interaction class) but the perception of a phenomenon like frienship, marriage, apprenticeship, etc. that happens in the minds and the social space.\r\nEach relationship generally involves only two instances of one or more classes. If more then two instances are involved (e.g. multilateral political relationships) the unity of time and social space must be given. If different persons or groups are socially interreladed at different times, or perceived as such in different social contexts, several instances of this class must be produced and provided with appropriate types.\r\nIf the relationship is symmetrical, the histP32 involves partner property has to be used in order to associate the partners of the relationship. If the relationship is oriented from a source to a target (the partners having a different position in the relationship), the properties histP49 has relationship source and histP50 has relationship target will be used. This generic treatment allows to express a direction of the relationship. The meaning of the direction will be explicitly defined in the controlled vocabulary of relationship types.\r\nGiven their different meanings, it is absolutely necessary to avoid mixing the two types of relationships: either use the hist:P32 property or the hist:P49 / hist:P50 – they are disjoint.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C3",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    769
  ],
  "dfh_ancestor_classes": [
    1,
    2,
    211,
    214,
    699,
    756
  ]
}
    

  export const EN_363_GEOGRAPHICAL_PLACE:NewDfhApiClass = {
  "dfh_pk_class": 363,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 16,
  "dfh_class_label": "Geographical Place",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
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
  "dfh_fk_profile": 16,
  "dfh_class_label": "Appellation in a Language",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
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
    

  export const EN_442_MEMBERSHIP:NewDfhApiClass = {
  "dfh_pk_class": 442,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 16,
  "dfh_class_label": "Membership",
  "dfh_fk_namespace": 112,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class models the fact that a person or an organization belongs to a group during a given time span",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C5",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    769
  ],
  "dfh_ancestor_classes": [
    1,
    2,
    211,
    214,
    699,
    756
  ]
}
    

  export const EN_451_GROUP_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 451,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 16,
  "dfh_class_label": "Group type",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the 'crm:E74 Group'.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C9",
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
    

  export const EN_535_PARTICIPATION:NewDfhApiClass = {
  "dfh_pk_class": 535,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 16,
  "dfh_class_label": "Participation",
  "dfh_fk_namespace": 112,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
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
    

  export const EN_608_MEMBERSHIP_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 608,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 16,
  "dfh_class_label": "Membership Type",
  "dfh_fk_namespace": 112,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of C5 Membership.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C6",
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
    

  export const EN_632_SOCIAL_RELATIONSHIP_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 632,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 16,
  "dfh_class_label": "Social Relationship Type",
  "dfh_fk_namespace": 112,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the histC6 Relationship class.\r\nIf the relationship is oriented from a source to a target (the partners having a different position in the relationship), the properties histP49 has relationship source and histP50 has relationship target will be used. This generic treatment allows to express a direction of the relationship. The meaning of the direction will be explicitly defined in the definition of the terms in the controlled vocabulary of social relationship types.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C4",
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
    

  export const EN_633_UNION:NewDfhApiClass = {
  "dfh_pk_class": 633,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 16,
  "dfh_class_label": "Union",
  "dfh_fk_namespace": 112,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
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
    539,
    686
  ]
}
    

  export const EN_634_TYPE_OF_UNION:NewDfhApiClass = {
  "dfh_pk_class": 634,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 16,
  "dfh_class_label": "Type of Union",
  "dfh_fk_namespace": 112,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the class Union – histC31.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C10",
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
    

  export const EN_698_SOCIAL_ROLE:NewDfhApiClass = {
  "dfh_pk_class": 698,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 16,
  "dfh_class_label": "Social Role",
  "dfh_fk_namespace": 112,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "A social role is a qualification of an actor that provides it with social power, i.e. some rights and duties related to the role, like a king, the president of an Academy, etc.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C12",
  "dfh_profile_association_type": "inferred",
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
    

  export const EN_702_PERSONS_INTERACTION:NewDfhApiClass = {
  "dfh_pk_class": 702,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 16,
  "dfh_class_label": "Persons' Interaction",
  "dfh_fk_namespace": 112,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class models the interaction of persons in time and physical (generally geographical) space. It is disjoint with the C3 Social Relationship class which models the interaction in time and the social space, i.e. the space of a collective state of mind and shared social representations.\r\nThe interaction is not restricted to a quantity of persons (a meeting can be modelled with this class) but there must be a unity in time and space for all the participants if the involved persons are more than two. If a person joins the interaction at a later moment than the beginning, the C15 Participation class can be used.\r\nAs a subclass of C4 Phase the social interaction can be a collection of different sorts of specific interactions, in space and time, unified by a general view. In this case, the space of the interaction, generally the geographical place, is the maximal projection in space of the whole interaction.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C18",
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
  export namespace PROFILE_16_PROPERTIES {
    
  export const EN_78_131_21_JOINED:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 131,
  "dfh_property_label_language": "en",
  "dfh_property_label": "joined",
  "dfh_property_inverse_label": "was joined by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property identifies the instance of E39 Actor that becomes member of a E74 Group in an E85 Joining.\r\nJoining events allow for describing people becoming members of a group with a more detailed path from E74 Group through P144 joined with (gained member by), E85 Joining, P143 joined (was joined by) to E39 Actor, compared to the shortcut offered by P107 has current or former member (is current or former member of).",
  "dfh_is_inherited": true,
  "dfh_property_domain": 78,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 21,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P143",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    10
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_78_132_68_JOINED_WITH:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 132,
  "dfh_property_label_language": "en",
  "dfh_property_label": "joined with",
  "dfh_property_inverse_label": "gained member by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property identifies the instance of E74 Group of which an instance of E39 Actor becomes a member through an instance of E85 Joining.\r\nAlthough a Joining activity normally concerns only one instance of E74 Group, it is possible to imagine circumstances under which becoming member of one Group implies becoming member of another Group as well.\r\nJoining events allow for describing people becoming members of a group with a more detailed path from E74 Group through P144 joined with (gained member by), E85 Joining, P143 joined (was joined by) to E39 Actor, compared to the shortcut offered by P107 has current or former member (is current or former member of).The property P144.1 kind of member can be used to specify the type of membership or the role the member has in the group.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 78,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 68,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P144",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    10
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_79_133_21_SEPARATED:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 133,
  "dfh_property_label_language": "en",
  "dfh_property_label": "separated",
  "dfh_property_inverse_label": "left by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property identifies the instance of E39 Actor that leaves an instance of E74 Group through an instance of E86\n            Leaving.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 79,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 21,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P145",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    10
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_79_134_68_SEPARATED_FROM:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 134,
  "dfh_property_label_language": "en",
  "dfh_property_label": "separated from",
  "dfh_property_inverse_label": "lost member by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property identifies the instance of E74 Group an instance of E39 Actor leaves through an instance of E86 Leaving.\r\nAlthough a Leaving activity normally concerns only one instance of E74 Group, it is possible to imagine circumstances under which leaving one E74 Group implies leaving another E74 Group as well.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 79,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 68,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P146",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    10
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_78_1040_442_EFFECTS:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1040,
  "dfh_property_label_language": "en",
  "dfh_property_label": "effects",
  "dfh_property_inverse_label": "is the result of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates a sdh:C42 Intentional Event, happening in the mind of one or more persons, with the sdh:C27 Intentional Situation that has been effected or initiated by it. Different intentional events can contribute to the origin of the same instance of an intentional situation and one intentional event can produce several intentional situations.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 78,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 442,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P3",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_79_1041_442_ENDS:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1041,
  "dfh_property_label_language": "en",
  "dfh_property_label": "ends",
  "dfh_property_inverse_label": "is ended by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "\r\nThis property associates a sdh:C42 Intentional Event, happening in the mind of one or more persons, with the sdh:C27 Intentional Situation that it directly oder indirectly ends. Different intentional events can contribute to the end of the same instance of an intentional situation and one intentional event can end several intentional situations.\r\n",
  "dfh_is_inherited": true,
  "dfh_property_domain": 79,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 442,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P4",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_21_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 21,
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
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_68_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 68,
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
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_78_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 78,
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
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_79_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 79,
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
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_334_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 334,
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
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_442_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 442,
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
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
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
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_633_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 633,
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
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_702_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 702,
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
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_442_1188_21_WAS_A_MEMBERSHIP_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1188,
  "dfh_property_label_language": "en",
  "dfh_property_label": "was a membership of",
  "dfh_property_inverse_label": "had a membership",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates to the Temporal Entity the Actor (individual or group) that is member of a group",
  "dfh_is_inherited": true,
  "dfh_property_domain": 442,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 21,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P1",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 112,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_442_1189_68_WAS_MEMBERSHIP_IN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1189,
  "dfh_property_label_language": "en",
  "dfh_property_label": "was membership in",
  "dfh_property_inverse_label": "was the membership group of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the group concerned by the membership",
  "dfh_is_inherited": false,
  "dfh_property_domain": 442,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 68,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P2",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 112,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_68_1204_451_HAS_GROUP_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1204,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has group type",
  "dfh_property_inverse_label": "is group type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates a group with the type which defines its identity",
  "dfh_is_inherited": false,
  "dfh_property_domain": 68,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 451,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P7",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_535_1344_21_IS_PARTICIPATION_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1344,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is participation of",
  "dfh_property_inverse_label": "(inverse of) is participation of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the actor (person or group) participating in the event. Only one actor can be added per class instance.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 535,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 21,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P10",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 112,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    13
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_535_1346_698_IS_PARTICIPATION_IN_THE_QUALITY_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1346,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is participation in the quality of",
  "dfh_property_inverse_label": "is quality of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "The function exercised or office/rank hold by the actor participating in the event. E.g. someone participating in an international conference not as a private person but as an ambassador of a state. More then one instance of this property per event and the same actor are possible but in this case the time span must be the same for all of them. Otherwise different instances of the class Participation should be created.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 535,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 698,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P12",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 112,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_334_1409_21_INVOLVES_PARTNER:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1409,
  "dfh_property_label_language": "en",
  "dfh_property_label": "involves partner",
  "dfh_property_inverse_label": "(inverse of) involves partner",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates to the relationship the persons or groups involved in it.\r\nEach relationship generally involves only two instances of one or more classes. Informal relationships like commercial relations or friendship should be restricted to two persistent items per instance. Therefore, the range quantifiers sould be: 2,2.\r\nRelationships involving more than two partners could be used to express multi-lateral agreements, treaties, etc. although it is preferable to treat structured relationships between several entities as membership in a group. This is mandatory if the duration of the relationship is not the same for all partners.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 334,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 21,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P15",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 112,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_442_1413_608_HAS_MEMBERSHIP_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1413,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has membership type",
  "dfh_property_inverse_label": "is membership type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates a membership with the type which defines its identity, making clear the kind of membership that is intended (legal, informal, nationality, etc.).",
  "dfh_is_inherited": false,
  "dfh_property_domain": 442,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 608,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P3",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 112,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_334_1434_632_HAS_RELATIONSHIP_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1434,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has relationship type",
  "dfh_property_inverse_label": "is relationship type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates a social relationship with the type which defines its identity",
  "dfh_is_inherited": false,
  "dfh_property_domain": 334,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 632,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P16",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 112,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
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
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
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
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_334_1445_21_HAS_RELATIONSHIP_SOURCE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1445,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has relationship source",
  "dfh_property_inverse_label": "is source in relationship",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates to the relationhips the actor being at its source, i.e. the starting vertex in a directed relationship",
  "dfh_is_inherited": true,
  "dfh_property_domain": 334,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 21,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P17",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 112,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_334_1446_21_HAS_RELATIONSHIP_TARGET:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1446,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has relationship target",
  "dfh_property_inverse_label": "is target in relationship",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates to the relationhips the actor being its target, i.e. the vertex at the end of a directed relationship",
  "dfh_is_inherited": true,
  "dfh_property_domain": 334,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 21,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P18",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 112,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_702_1599_363_TOOK_PLACE_AT:NewDfhApiProperty = {
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
  "dfh_property_domain": 702,
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
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    7
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_702_1784_21_IS_INTERACTION_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1784,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is interaction of",
  "dfh_property_inverse_label": "interacts in",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the two or more persons involved in the interaction. If more than two persons are involved in one instance of an interaction, e.g. in the case of a meeting, there must be a unity in time and space for all the participants. If a person joins the interaction at a later moment than the beginning, or leaves before the end, the C15 Participation class can be used.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 702,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 21,
  "dfh_range_instances_min_quantifier": 2,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P41",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 112,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 16,
  "dfh_profile_label": "Interactions, Social Relationships and Memberships of Persons",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    
  }


  export const PROFILE_16_INTERACTIONS_S_2022_01_18: OntomeProfileMock = {
    profile: PROFILE,
    classes: [
      PROFILE_16_CLASSES.EN_21_PERSON,
PROFILE_16_CLASSES.EN_68_GROUP,
PROFILE_16_CLASSES.EN_78_JOINING,
PROFILE_16_CLASSES.EN_79_LEAVING,
PROFILE_16_CLASSES.EN_334_SOCIAL_RELATIONSHIP,
PROFILE_16_CLASSES.EN_363_GEOGRAPHICAL_PLACE,
PROFILE_16_CLASSES.EN_365_APPELLATION_IN_A_LANGUAGE,
PROFILE_16_CLASSES.EN_442_MEMBERSHIP,
PROFILE_16_CLASSES.EN_451_GROUP_TYPE,
PROFILE_16_CLASSES.EN_535_PARTICIPATION,
PROFILE_16_CLASSES.EN_608_MEMBERSHIP_TYPE,
PROFILE_16_CLASSES.EN_632_SOCIAL_RELATIONSHIP_TYPE,
PROFILE_16_CLASSES.EN_633_UNION,
PROFILE_16_CLASSES.EN_634_TYPE_OF_UNION,
PROFILE_16_CLASSES.EN_698_SOCIAL_ROLE,
PROFILE_16_CLASSES.EN_702_PERSONS_INTERACTION
    ],
    properties: [
      PROFILE_16_PROPERTIES.EN_78_131_21_JOINED,
PROFILE_16_PROPERTIES.EN_78_132_68_JOINED_WITH,
PROFILE_16_PROPERTIES.EN_79_133_21_SEPARATED,
PROFILE_16_PROPERTIES.EN_79_134_68_SEPARATED_FROM,
PROFILE_16_PROPERTIES.EN_78_1040_442_EFFECTS,
PROFILE_16_PROPERTIES.EN_79_1041_442_ENDS,
PROFILE_16_PROPERTIES.EN_365_1111_21_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_16_PROPERTIES.EN_365_1111_68_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_16_PROPERTIES.EN_365_1111_78_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_16_PROPERTIES.EN_365_1111_79_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_16_PROPERTIES.EN_365_1111_334_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_16_PROPERTIES.EN_365_1111_442_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_16_PROPERTIES.EN_365_1111_535_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_16_PROPERTIES.EN_365_1111_633_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_16_PROPERTIES.EN_365_1111_702_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_16_PROPERTIES.EN_442_1188_21_WAS_A_MEMBERSHIP_OF,
PROFILE_16_PROPERTIES.EN_442_1189_68_WAS_MEMBERSHIP_IN,
PROFILE_16_PROPERTIES.EN_68_1204_451_HAS_GROUP_TYPE,
PROFILE_16_PROPERTIES.EN_535_1344_21_IS_PARTICIPATION_OF,
PROFILE_16_PROPERTIES.EN_535_1346_698_IS_PARTICIPATION_IN_THE_QUALITY_OF,
PROFILE_16_PROPERTIES.EN_334_1409_21_INVOLVES_PARTNER,
PROFILE_16_PROPERTIES.EN_442_1413_608_HAS_MEMBERSHIP_TYPE,
PROFILE_16_PROPERTIES.EN_334_1434_632_HAS_RELATIONSHIP_TYPE,
PROFILE_16_PROPERTIES.EN_633_1436_21_HAD_PARTNER,
PROFILE_16_PROPERTIES.EN_633_1437_634_HAS_TYPE_OF_UNION,
PROFILE_16_PROPERTIES.EN_334_1445_21_HAS_RELATIONSHIP_SOURCE,
PROFILE_16_PROPERTIES.EN_334_1446_21_HAS_RELATIONSHIP_TARGET,
PROFILE_16_PROPERTIES.EN_702_1599_363_TOOK_PLACE_AT,
PROFILE_16_PROPERTIES.EN_702_1784_21_IS_INTERACTION_OF
    ]
  }
  