
  import {NewDfhApiClass, NewDfhApiProfile, NewDfhApiProperty, OntomeProfileMock} from '../gvDB/local-model.helpers';

  const PROFILE:NewDfhApiProfile = {
  "removed_from_api": false,
  "requested_language": "en",
  "dfh_pk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_project_label": "Geovistory",
  "dfh_owned_by_project": 6,
  "dfh_profile_definition": "This profile collects classes and properties used to model basic or common aspects of historical data.",
  "dfh_project_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_profile_definition_language": "en",
  "dfh_is_ongoing_forced_publication": true,
  "dfh_is_root_profile": false,
  "dfh_fk_root_profile": 48
}


  export namespace PROFILE_4_CLASSES {
    
  export const EN_5_EVENT:NewDfhApiClass = {
  "dfh_pk_class": 5,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Event",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class comprises changes of states in cultural, social or physical systems, regardless of scale, brought about by a series or group of coherent physical, cultural, technological or legal phenomena. Such changes of state will affect instances of E77 Persistent Item or its subclasses.\r\nThe distinction between an E5 Event and an E4 Period is partly a question of the scale of observation. Viewed at a coarse level of detail, an E5 Event is an ‘instantaneous’ change of state. At a fine level, the E5 Event can be analysed into its component phenomena within a space and time frame, and as such can be seen as an E4 Period. The reverse is not necessarily the case: not all instances of E4 Period give rise to a noteworthy change of state.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E5",
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    4
  ],
  "dfh_ancestor_classes": [
    1,
    2,
    83,
    214,
    539
  ]
}
    

  export const EN_21_PERSON:NewDfhApiClass = {
  "dfh_pk_class": 21,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Person",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
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
    

  export const EN_53_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 53,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Type",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of CRM classes. Instances of E55 Type represent concepts in contrast to instances of E41 Appellation which are used to name instances of CRM classes.\r\nE55 Type is the CRM’s interface to domain specific ontologies and thesauri. These can be represented in the CRM as subclasses of E55 Type, forming hierarchies of terms, i.e. instances of E55 Type linked via P127 has broader term (has narrower term). Such hierarchies may be extended with additional properties.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E55",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    27
  ],
  "dfh_ancestor_classes": [
    1,
    64,
    65,
    70,
    214
  ]
}
    

  export const EN_60_FORMATION:NewDfhApiClass = {
  "dfh_pk_class": 60,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Formation",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class comprises events that result in the formation of a formal or informal E74 Group of people, such as a club, society, association, corporation or nation.\r\nE66 Formation does not include the arbitrary aggregation of people who do not act as a collective. The formation of an instance of E74 Group does not require that the group is populated with members at the time of formation. In order to express the joining of members at the time of formation, the respective activity should be simultaneously an instance of both E66 Formation and E85 Joining.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E66",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    7,
    57,
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
    

  export const EN_62_DISSOLUTION:NewDfhApiClass = {
  "dfh_pk_class": 62,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Dissolution",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class comprises the events that result in the formal or informal termination of an E74 Group of people.\r\nIf the dissolution was deliberate, the Dissolution event should also be instantiated as an E7 Activity.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E68",
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
    

  export const EN_63_DEATH:NewDfhApiClass = {
  "dfh_pk_class": 63,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Death",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
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
    

  export const EN_68_GROUP:NewDfhApiClass = {
  "dfh_pk_class": 68,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Group",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
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
  "dfh_fk_profile": 4,
  "dfh_class_label": "Joining",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
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
  "dfh_fk_profile": 4,
  "dfh_class_label": "Leaving",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
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
    

  export const EN_212_GEOGRAPHICAL_LOCATION_OF_A_PHYSICAL_THING:NewDfhApiClass = {
  "dfh_pk_class": 212,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Geographical Location of a Physical Thing",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
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
    

  export const EN_218_EXPRESSION:NewDfhApiClass = {
  "dfh_pk_class": 218,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Expression",
  "dfh_fk_namespace": 6,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_namespace_label": "FRBRoo version 2.4",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises the intellectual or artistic realisations of works in the form of identifiable immaterial objects, such as texts, poems, jokes, musical or choreographic notations, movement pattern, sound pattern, images, multimedia objects, or any combination of such forms that have objectively recognisable structures. The substance of F2 Expression is signs.\r\nExpressions cannot exist without a physical carrier, but do not depend on a specific physical carrier and can exist on one or more carriers simultaneously. Carriers may include human memory.\r\nInasmuch as the form of F2 Expression is an inherent characteristic of the F2 Expression, any change in form (e.g., from alpha-numeric notation to spoken word, a poem created in capitals and rendered in lower case) is a new F2 Expression. Similarly, changes in the intellectual conventions or instruments that are employed to express a work (e.g., translation from one language to another) result in the creation of a new F2 Expression. Thus, if a text is revised or modified, the resulting F2 Expression is considered to be a new F2 Expression. Minor changes, such as corrections of spelling and punctuation, etc., are normally considered variations within the same F2 Expression. On a practical level, the degree to which distinctions are made between variant expressions of a work will depend to some extent on the nature of the F1 Work itself, and on the anticipated needs of users.\r\nThe genre of the work may provide an indication of which features are essential to the expression. In some cases, aspects of physical form, such as typeface and page layout, are not integral to the intellectual or artistic realisation of the work as such, and therefore are not distinctive criteria for the respective expressions. For another work, features such as layout may be essential. For instance, the author or a graphic designer may wrap a poem around an image.\r\nAn expression of a work may include expressions of other works within it. For instance, an anthology of poems is regarded as a work in its own right that makes use of expressions of the individual poems that have been selected and ordered as part of an intellectual process. This does not make the contents of the aggregated expressions part of this work, but only parts of the resulting expression.\r\nIf an instance of F2 Expression is of a specific form, such as text, image, etc., it may be simultaneously instantiated in the specific classes representing these forms in CIDOC CRM. Thereby one can make use of the more specific properties of these classes, such as language (which is applicable to instances of E33 Linguistic Object only).",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "F2",
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    30,
    67
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    64,
    65,
    66,
    70,
    81,
    82,
    214
  ]
}
    

  export const EN_220_MANIFESTATION_SINGLETON:NewDfhApiClass = {
  "dfh_pk_class": 220,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Manifestation Singleton",
  "dfh_fk_namespace": 6,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_namespace_label": "FRBRoo version 2.4",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises physical objects that each carry an instance of F2 Expression, and that were produced as unique objects, with no\n\t\t\tsiblings intended in the course of their production. It should be noted that if all but one copy of a given publication are destroyed,\n\t\t\tthen that copy does not become an instance of F4 Manifestation Singleton, because it was produced together with sibling copies, even\n\t\t\tthough it now happens to be unique. Examples of instances of F4 Manifestation Singleton include manuscripts, preparatory sketches and the\n\t\t\tfinal clean draft sent by an author or a composer to a publisher. ",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "F4",
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
    

  export const EN_244_EXPRESSION_CREATION:NewDfhApiClass = {
  "dfh_pk_class": 244,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Expression Creation",
  "dfh_fk_namespace": 6,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_namespace_label": "FRBRoo version 2.4",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class comprises activities that result in instances of F2 Expression coming into existence. This class characterises the externalisation of an Individual Work.\r\nAlthough F2 Expression is an abstract entity, a conceptual object, the creation of an expression inevitably also affects the physical world: when you scribble the first draft of a poem on a sheet of paper, you produce an instance of F4 Manifestation Singleton; F28 Expression Creation is a subclass of E12 Production because the recording of the expression causes a physical modification of the carrying E18 Physical Thing. The work becomes manifest by being expressed on a physical carrier different from the creator’s brain. The spatio-temporal circumstances under which the expression is created are necessarily the same spatio-temporal circumstances under which the first instance of F4 Manifestation Singleton is produced. The mechanisms through which oral tradition (of myths, tales, music, etc.) operates are not further investigated in this model. As far as bibliographic practice is concerned, only those instances of F2 Expression that are externalised on physical carriers other than both the creator’s brain and the auditor’s brain are taken into account (for a discussion of the modelling of oral traditions, see: Nicolas, Yann. ‘Folklore Requirements for Bibliographic Records: oral traditions and FRBR.’ In: Cataloging Classification Quarterly (2005). Vol. 39, No. 3-4. P. 179-195).\r\nIt is possible to use the P2 has type (is type of) property in order to specify that the creation of a given expression of a given work played a particular role with regard to the overall bibliographic history of that work (e.g., that it was the creation of the progenitor expression on which all other expressions of the same work are based; or that it was the creation of the critical edition that served as the basis for canonical references to the work).",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "F28",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    12,
    59
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
    211,
    214,
    539,
    756,
    887
  ]
}
    

  export const EN_332_ACTIVITY_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 332,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Activity Type",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the crm:E7 Activity class.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C3",
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
    

  export const EN_363_GEOGRAPHICAL_PLACE:NewDfhApiClass = {
  "dfh_pk_class": 363,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Geographical Place",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class refers to portions of the surface of the Earth intended as constellations of matter which can be represented by photographs, paintings and maps. The relevant portion of the surface of the Earth can be covered by water (river, sea, ...). The more specific identity of instances of this class is provided by a controlled vocabulary of geographical place types.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C13",
  "dfh_profile_association_type": "selected",
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
    

  export const EN_364_GEOGRAPHICAL_PLACE_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 364,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Geographical Place Type",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the 'hictC8 Geographical place'.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C14",
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
    

  export const EN_441_CONSTRUCTION:NewDfhApiClass = {
  "dfh_pk_class": 441,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Construction",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises instances of man-made things such as freestanding buildings, components of buildings, and complexes of buildings, but also all man-made parts of infrastructure (roads, lamp post, dams, etc.)",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C17",
  "dfh_profile_association_type": "selected",
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
    

  export const EN_442_MEMBERSHIP:NewDfhApiClass = {
  "dfh_pk_class": 442,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Membership",
  "dfh_fk_namespace": 112,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
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
    

  export const EN_443_CONSTRUCTION_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 443,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Construction Type",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the 'histC11 Built work class'.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C18",
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
    

  export const EN_444_SOCIAL_QUALITY_OF_AN_ACTOR:NewDfhApiClass = {
  "dfh_pk_class": 444,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Social Quality of an Actor",
  "dfh_fk_namespace": 112,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "Professional, political, religious or whatever social quality of an actor, be it a person or a group, as it is perceived from the point of view of the representations of a human community. The Social Quality is a socially constructed concept (in the sense of crm:E55 Type) and it is used to socially classify individuals in the perspective of the community. \r\nThis class is not to be confused with the sdh-so:C12 Social Actor class which models clearly (and often legally) defined social roles and functions of actors and should be exclusively used for these use cases. Social roles are formalisations of social qualities in relation to social actors.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C2",
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    706
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    53,
    64,
    65,
    70,
    214
  ]
}
    

  export const EN_449_GEOGRAPHICAL_LOCATION_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 449,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Geographical Location Type",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
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
    

  export const EN_451_GROUP_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 451,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Group type",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the 'crm:E74 Group'.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C9",
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
    

  export const EN_608_MEMBERSHIP_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 608,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Membership Type",
  "dfh_fk_namespace": 112,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_namespace_label": "Social, legal and economic life (SDHSS) ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of C5 Membership.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C6",
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
    

  export const EN_717_MONETARY_AMOUNT:NewDfhApiClass = {
  "dfh_pk_class": 717,
  "dfh_basic_type": 10,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Monetary amount",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Region",
  "dfh_class_scope_note": "This class models any measurable monetary value. It is equivalent to the crm:E97 Monetary amount class, defined as \"This class comprises quantities of monetary possessions or obligations in terms of their nominal value with respect to a particular currency. [...]\" in CIDOC CRM version 6.2.9.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C21",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    52
  ],
  "dfh_ancestor_classes": [
    1,
    214,
    539
  ]
}
    

  export const EN_718_CURRENCY:NewDfhApiClass = {
  "dfh_pk_class": 718,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Currency",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class models a social object allowing to standardize the money used in a community or country. It is equivalent to crm:E98 currency defined as \"This class comprises the units in which a monetary system, supported by an administrative authority or other community, quantifies and arithmetically compares all monetary amounts declared in the unit. [...]\" in CIDOC CRM version 6.2.9.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C22",
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    56
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    53,
    64,
    65,
    70,
    214
  ]
}
    

  export const EN_838_EVENT_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 838,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Event Type",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the crm:E5 Event class.\r\nThis kind of types are useful for providing the identity of generic instances of the Event class. If specific properties related to a specific  Event type are needed, then a subclass of Event should be produced.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C34",
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
    

  export const EN_839_LOCATION_REASON:NewDfhApiClass = {
  "dfh_pk_class": 839,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 4,
  "dfh_class_label": "Location Reason",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
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
  export namespace PROFILE_4_PROPERTIES {
    
  export const EN_63_7_363_TOOK_PLACE_ON_OR_WITHIN:NewDfhApiProperty = {
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
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_60_83_68_HAS_FORMED:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 83,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has formed",
  "dfh_property_inverse_label": "was formed by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property links the founding or E66 Formation for an E74 Group with the Group itself.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 60,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 68,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P95",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    80
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_62_87_68_DISSOLVED:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 87,
  "dfh_property_label_language": "en",
  "dfh_property_label": "dissolved",
  "dfh_property_inverse_label": "was dissolved by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property links the disbanding or E68 Dissolution of an E74 Group to the Group itself.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 62,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 68,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P99",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    10,
    81
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
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    81,
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_212_107_212_MEETS_IN_TIME_WITH:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 107,
  "dfh_property_label_language": "en",
  "dfh_property_label": "meets in time with",
  "dfh_property_inverse_label": "is met in time by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property indicates that one E2 Temporal Entity immediately follows another.\r\nIt implies a particular order between the two entities: if A meets in time with B, then A must precede B.\r\nThis property is only necessary if the relevant time spans are unknown (otherwise the relationship can be calculated). This property is the same as the \"meets / met-by\" relationships of Allen’s temporal logic (Allen, 1983, pp. 832-843).",
  "dfh_is_inherited": true,
  "dfh_property_domain": 212,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 212,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P119",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_212_108_212_OCCURS_BEFORE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 108,
  "dfh_property_label_language": "en",
  "dfh_property_label": "occurs before",
  "dfh_property_inverse_label": "occurs after",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property identifies the relative chronological sequence of two temporal entities.\r\nIt implies that a temporal gap exists between the end of A and the start of B. This property is only necessary if the relevant time spans are unknown (otherwise the relationship can be calculated).\r\nThis property is the same as the \"before / after\" relationships of Allen’s temporal logic (Allen, 1983, pp. 832-843).",
  "dfh_is_inherited": true,
  "dfh_property_domain": 212,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 212,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P120",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_332_115_332_HAS_BROADER_TERM:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 115,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has broader term",
  "dfh_property_inverse_label": "has narrower term",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property identifies a super-Type to which an E55 Type is related.\r\nIt allows Types to be organised into hierarchies. This is the sense of \"broader term generic (BTG)\" as defined in ISO 2788",
  "dfh_is_inherited": true,
  "dfh_property_domain": 332,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 332,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P127",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_364_115_364_HAS_BROADER_TERM:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 115,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has broader term",
  "dfh_property_inverse_label": "has narrower term",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property identifies a super-Type to which an E55 Type is related.\r\nIt allows Types to be organised into hierarchies. This is the sense of \"broader term generic (BTG)\" as defined in ISO 2788",
  "dfh_is_inherited": true,
  "dfh_property_domain": 364,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 364,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P127",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_444_115_444_HAS_BROADER_TERM:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 115,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has broader term",
  "dfh_property_inverse_label": "has narrower term",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property identifies a super-Type to which an E55 Type is related.\r\nIt allows Types to be organised into hierarchies. This is the sense of \"broader term generic (BTG)\" as defined in ISO 2788",
  "dfh_is_inherited": true,
  "dfh_property_domain": 444,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 444,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P127",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

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
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    10
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_78_131_68_JOINED:NewDfhApiProperty = {
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
  "dfh_property_range": 68,
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
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
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
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
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
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    10
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_79_133_68_SEPARATED:NewDfhApiProperty = {
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
  "dfh_property_range": 68,
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
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
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
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    10
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_60_139_68_WAS_FORMED_FROM:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 139,
  "dfh_property_label_language": "en",
  "dfh_property_label": "was formed from",
  "dfh_property_inverse_label": "participated in",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates an instance of E66 Formation with an instance of E74 Group from which the new group was formed\n            preserving a sense of continuity such as in mission, membership or tradition. ",
  "dfh_is_inherited": false,
  "dfh_property_domain": 60,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 68,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P151",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    10
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_244_991_218_CREATED:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 991,
  "dfh_property_label_language": "en",
  "dfh_property_label": "created",
  "dfh_property_inverse_label": "was created by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the expression that was first externalised during a particular creation event with that particular creation\n\t\t\tevent.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 244,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 218,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "R17",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 6,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "FRBRoo version 2.4",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    82
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_244_992_220_CREATED:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 992,
  "dfh_property_label_language": "en",
  "dfh_property_label": "created",
  "dfh_property_inverse_label": "was created by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates an instance of F28 Expression Creation with the first physical objects in which the resulting instance of F2\n\t\t\tExpression was embodied.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 244,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 220,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "R18",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 6,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "FRBRoo version 2.4",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    96
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
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_363_1110_364_HAS_GEOGRAPHICAL_PLACE_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1110,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has geographical place type",
  "dfh_property_inverse_label": "is geographical place type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates a geographical place with the type which defines its identity",
  "dfh_is_inherited": false,
  "dfh_property_domain": 363,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 364,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P20",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
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
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_212_1177_68_IS_LOCATION_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 68,
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
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_212_1177_441_IS_LOCATION_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 441,
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
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
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
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
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
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
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
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_441_1190_443_HAS_BUILT_WORK_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1190,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has built work type",
  "dfh_property_inverse_label": "is type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates histC11 Built work with the type which defines its identity",
  "dfh_is_inherited": false,
  "dfh_property_domain": 441,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 443,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P9",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_5_1203_838_HAS_EVENT_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1203,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has event type",
  "dfh_property_inverse_label": "is event type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates an event (crm:E5) with the type which defines its identity",
  "dfh_is_inherited": false,
  "dfh_property_domain": 5,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 838,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P47",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
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
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_5_1357_5_IS_COMPONENT_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1357,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is component of",
  "dfh_property_inverse_label": "has component",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property indicates that the domain temporal entity is a part of a more complex range temporal entity, e.g. a simple event (domain) can be a component of a complex one (range), like a process. If the component or child instance belongs to the same class as the parent one, and if some instances of properties are not explicitely provided in the child instance, this means they are identical (i.e. 'inherited') from the parent instance.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 5,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 5,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P5",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
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
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_717_1640_718_HAS_CURRENCY:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1640,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has currency",
  "dfh_property_inverse_label": "was currency of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates a monetary amount with its currency and is equivalent to crm:P180 has currency as defined in CIDOC CRM version 6.2.9.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 717,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 718,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P16",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    79
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
  "dfh_fk_profile": 4,
  "dfh_profile_label": "Geovistory Generic Historical Information Profile",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    
  }


  export const PROFILE_4_GEOVISTORY_GENE_2022_02_09: OntomeProfileMock = {
    profile: PROFILE,
    classes: [
      PROFILE_4_CLASSES.EN_5_EVENT,
PROFILE_4_CLASSES.EN_21_PERSON,
PROFILE_4_CLASSES.EN_53_TYPE,
PROFILE_4_CLASSES.EN_60_FORMATION,
PROFILE_4_CLASSES.EN_62_DISSOLUTION,
PROFILE_4_CLASSES.EN_63_DEATH,
PROFILE_4_CLASSES.EN_68_GROUP,
PROFILE_4_CLASSES.EN_78_JOINING,
PROFILE_4_CLASSES.EN_79_LEAVING,
PROFILE_4_CLASSES.EN_212_GEOGRAPHICAL_LOCATION_OF_A_PHYSICAL_THING,
PROFILE_4_CLASSES.EN_218_EXPRESSION,
PROFILE_4_CLASSES.EN_220_MANIFESTATION_SINGLETON,
PROFILE_4_CLASSES.EN_244_EXPRESSION_CREATION,
PROFILE_4_CLASSES.EN_332_ACTIVITY_TYPE,
PROFILE_4_CLASSES.EN_363_GEOGRAPHICAL_PLACE,
PROFILE_4_CLASSES.EN_364_GEOGRAPHICAL_PLACE_TYPE,
PROFILE_4_CLASSES.EN_441_CONSTRUCTION,
PROFILE_4_CLASSES.EN_442_MEMBERSHIP,
PROFILE_4_CLASSES.EN_443_CONSTRUCTION_TYPE,
PROFILE_4_CLASSES.EN_444_SOCIAL_QUALITY_OF_AN_ACTOR,
PROFILE_4_CLASSES.EN_449_GEOGRAPHICAL_LOCATION_TYPE,
PROFILE_4_CLASSES.EN_451_GROUP_TYPE,
PROFILE_4_CLASSES.EN_608_MEMBERSHIP_TYPE,
PROFILE_4_CLASSES.EN_717_MONETARY_AMOUNT,
PROFILE_4_CLASSES.EN_718_CURRENCY,
PROFILE_4_CLASSES.EN_838_EVENT_TYPE,
PROFILE_4_CLASSES.EN_839_LOCATION_REASON
    ],
    properties: [
      PROFILE_4_PROPERTIES.EN_63_7_363_TOOK_PLACE_ON_OR_WITHIN,
PROFILE_4_PROPERTIES.EN_60_83_68_HAS_FORMED,
PROFILE_4_PROPERTIES.EN_62_87_68_DISSOLVED,
PROFILE_4_PROPERTIES.EN_63_88_21_WAS_DEATH_OF,
PROFILE_4_PROPERTIES.EN_212_107_212_MEETS_IN_TIME_WITH,
PROFILE_4_PROPERTIES.EN_212_108_212_OCCURS_BEFORE,
PROFILE_4_PROPERTIES.EN_332_115_332_HAS_BROADER_TERM,
PROFILE_4_PROPERTIES.EN_364_115_364_HAS_BROADER_TERM,
PROFILE_4_PROPERTIES.EN_444_115_444_HAS_BROADER_TERM,
PROFILE_4_PROPERTIES.EN_78_131_21_JOINED,
PROFILE_4_PROPERTIES.EN_78_131_68_JOINED,
PROFILE_4_PROPERTIES.EN_78_132_68_JOINED_WITH,
PROFILE_4_PROPERTIES.EN_79_133_21_SEPARATED,
PROFILE_4_PROPERTIES.EN_79_133_68_SEPARATED,
PROFILE_4_PROPERTIES.EN_79_134_68_SEPARATED_FROM,
PROFILE_4_PROPERTIES.EN_60_139_68_WAS_FORMED_FROM,
PROFILE_4_PROPERTIES.EN_244_991_218_CREATED,
PROFILE_4_PROPERTIES.EN_244_992_220_CREATED,
PROFILE_4_PROPERTIES.EN_212_1066_449_HAS_LOCATION_TYPE,
PROFILE_4_PROPERTIES.EN_363_1110_364_HAS_GEOGRAPHICAL_PLACE_TYPE,
PROFILE_4_PROPERTIES.EN_212_1177_21_IS_LOCATION_OF,
PROFILE_4_PROPERTIES.EN_212_1177_68_IS_LOCATION_OF,
PROFILE_4_PROPERTIES.EN_212_1177_441_IS_LOCATION_OF,
PROFILE_4_PROPERTIES.EN_212_1178_363_IS_RELATIVE_TO,
PROFILE_4_PROPERTIES.EN_442_1188_21_WAS_A_MEMBERSHIP_OF,
PROFILE_4_PROPERTIES.EN_442_1189_68_WAS_MEMBERSHIP_IN,
PROFILE_4_PROPERTIES.EN_441_1190_443_HAS_BUILT_WORK_TYPE,
PROFILE_4_PROPERTIES.EN_5_1203_838_HAS_EVENT_TYPE,
PROFILE_4_PROPERTIES.EN_68_1204_451_HAS_GROUP_TYPE,
PROFILE_4_PROPERTIES.EN_5_1357_5_IS_COMPONENT_OF,
PROFILE_4_PROPERTIES.EN_442_1413_608_HAS_MEMBERSHIP_TYPE,
PROFILE_4_PROPERTIES.EN_717_1640_718_HAS_CURRENCY,
PROFILE_4_PROPERTIES.EN_212_1798_839_HAS_LOCATION_REASON
    ]
  }
  