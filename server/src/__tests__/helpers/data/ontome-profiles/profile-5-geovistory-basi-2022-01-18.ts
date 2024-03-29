
  import {NewDfhApiClass, NewDfhApiProfile, NewDfhApiProperty, OntomeProfileMock} from '../gvDB/local-model.helpers';

  const PROFILE:NewDfhApiProfile = {
  "removed_from_api": false,
  "requested_language": "en",
  "dfh_pk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_project_label": "Geovistory",
  "dfh_owned_by_project": 6,
  "dfh_profile_definition": "This profile includes classes and properties that are directly implemented in the Geovistory virtual search environment or that represent the foundation of its functionalities. They are always present in the information system.",
  "dfh_project_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_profile_definition_language": "en",
  "dfh_is_ongoing_forced_publication": true,
  "dfh_is_root_profile": false,
  "dfh_fk_root_profile": 52
}


  export namespace PROFILE_5_CLASSES {
    
  export const EN_1_CRM_ENTITY:NewDfhApiClass = {
  "dfh_pk_class": 1,
  "dfh_basic_type": 0,
  "dfh_fk_profile": 5,
  "dfh_class_label": "CRM Entity",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": null,
  "dfh_class_scope_note": "This class comprises all things in the universe of discourse of the CIDOC Conceptual Reference Model.\r\n\r\nIt is an abstract concept providing for three general properties:\r\nIdentification by name or appellation, and in particular by a preferred identifier\r\nClassification by type, allowing further refinement of the specific subclass an instance belongs to\r\nAttachment of free text for the expression of anything not captured by formal properties\r\n\r\nWith the exception of E59 Primitive Value, all other classes within the CRM are directly or indirectly specialisations of E1 CRM Entity.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E1",
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    214
  ],
  "dfh_ancestor_classes": []
}
    

  export const EN_2_TEMPORAL_ENTITY:NewDfhApiClass = {
  "dfh_pk_class": 2,
  "dfh_basic_type": 0,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Temporal Entity",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": null,
  "dfh_class_scope_note": "This class comprises all phenomena, such as the instances of E4 Periods, E5 Events and states, which happen over a limited extent in time. This extent in time must be contiguous, i.e., without gaps. In case the defining kinds of phenomena for an instance of E2 Temporal Entity cease to happen, and occur later again at another time, we regard that the former E2 Temporal Entity has ended and a new instance has come into existence. In more intuitive terms, the same event cannot happen twice.\r\nIn some contexts, these are also called perdurants. This class is disjoint from E77 Persistent Item. This is an abstract class and has no direct instances. E2 Temporal Entity is specialized into E4 Period, which applies to a particular geographic area (defined with a greater or lesser degree of precision), and E3 Condition State, which applies to instances of E18 Physical Thing.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E2",
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    1,
    380
  ],
  "dfh_ancestor_classes": [
    214
  ]
}
    

  export const EN_21_PERSON:NewDfhApiClass = {
  "dfh_pk_class": 21,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Person",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
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
    

  export const EN_40_APPELLATION:NewDfhApiClass = {
  "dfh_pk_class": 40,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Appellation",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises signs, either meaningful or not, or arrangements of signs following a specific syntax, that are used or can be used to refer to and identify a specific instance of some class or category within a certain context.\r\nInstances of E41 Appellation do not identify things by their meaning, even if they happen to have one, but instead by convention, tradition, or agreement. Instances of E41 Appellation are cultural constructs; as such, they have a context, a history, and a use in time and space by some group of users. A given instance of E41 Appellation can have alternative forms, i.e., other instances of E41 Appellation that are always regarded as equivalent independent from the thing it denotes.\r\nSpecific subclasses of E41 Appellation should be used when instances of E41 Appellation of a characteristic form are used for particular objects. Instances of E49 Time Appellation, for example, which take the form of instances of E50 Date, can be easily recognised.\r\nE41 Appellation should not be confused with the act of naming something. Cf. E15 Identifier Assignment",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E41",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    82
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    64,
    65,
    66,
    70,
    214
  ]
}
    

  export const EN_41_IDENTIFIER:NewDfhApiClass = {
  "dfh_pk_class": 41,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Identifier",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
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
    

  export const EN_50_TIME_SPAN:NewDfhApiClass = {
  "dfh_pk_class": 50,
  "dfh_basic_type": 10,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Time-Span",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Region",
  "dfh_class_scope_note": "This class comprises abstract temporal extents, in the sense of Galilean physics, having a beginning, an end and a duration.\r\nTime Span has no other semantic connotations. Time-Spans are used to define the temporal extent of instances of E4 Period, E5 Event and any other phenomena valid for a certain time. An E52 Time-Span may be identified by one or more instances of E49 Time Appellation.\r\nSince our knowledge of history is imperfect, instances of E52 Time-Span can best be considered as approximations of the actual Time-Spans of temporal entities. The properties of E52 Time-Span are intended to allow these approximations to be expressed precisely. An extreme case of approximation, might, for example, define an E52 Time-Span having unknown beginning, end and duration. Used as a common E52 Time-Span for two events, it would nevertheless define them as being simultaneous, even if nothing else was known.\r\nAutomatic processing and querying of instances of E52 Time-Span is facilitated if data can be parsed into an E61 Time Primitive.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E52",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    1,
    539
  ],
  "dfh_ancestor_classes": [
    214
  ]
}
    

  export const EN_51_PLACE:NewDfhApiClass = {
  "dfh_pk_class": 51,
  "dfh_basic_type": 10,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Place",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Region",
  "dfh_class_scope_note": "This class comprises extents in space, in particular on the surface of the earth, in the pure sense of physics: independent from temporal phenomena and matter.\r\nThe instances of E53 Place are usually determined by reference to the position of “immobile” objects such as buildings, cities, mountains, rivers, or dedicated geodetic marks. A Place can be determined by combining a frame of reference and a location with respect to this frame. It may be identified by one or more instances of E44 Place Appellation.\r\nIt is sometimes argued that instances of E53 Place are best identified by global coordinates or absolute reference systems. However, relative references are often more relevant in the context of cultural documentation and tend to be more precise. In particular, we are often interested in position in relation to large, mobile objects, such as ships. For example, the Place at which Nelson died is known with reference to a large mobile object – H.M.S Victory. A resolution of this Place in terms of absolute coordinates would require knowledge of the movements of the vessel and the precise time of death, either of which may be revised, and the result would lack historical and cultural relevance.\r\nAny object can serve as a frame of reference for E53 Place determination. The model foresees the notion of a \"section\" of an E19 Physical Object as a valid E53 Place determination.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E53",
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    1,
    539
  ],
  "dfh_ancestor_classes": [
    214
  ]
}
    

  export const EN_54_LANGUAGE:NewDfhApiClass = {
  "dfh_pk_class": 54,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 5,
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
    

  export const EN_71_COLLECTION:NewDfhApiClass = {
  "dfh_pk_class": 71,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Collection",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises aggregations of instances of E18 Physical Thing that are assembled and maintained (\"curated\" and \"preserved\", in museological terminology) by one or more instances of E39 Actor over time for a specific purpose and audience, and according to a particular collection development plan.\r\nItems may be added or removed from an E78 Collection in pursuit of this plan. This class should not be confused with the E39 Actor maintaining the E78 Collection often referred to with the name of the E78 Collection (e.g. “The Wallace Collection decided…”).\r\nCollective objects in the general sense, like a tomb full of gifts, a folder with stamps or a set of chessmen, should be documented as instances of E19 Physical Object, and not as instances of E78 Collection. This is because they form wholes either because they are physically bound together or because they are kept together for their functionality.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E78",
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
    

  export const EN_84_PRESENCE:NewDfhApiClass = {
  "dfh_pk_class": 84,
  "dfh_basic_type": 10,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Presence",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Region",
  "dfh_class_scope_note": "This class comprises instances of E92 Spacetime Volume that result from intersection of instances of E92 Spacetime Volume with an instance of E52 Time-Span. The identity of an instance of this class is determined by the identities of the constituing spacetime volume and the time-span.\r\nThis class can be used to define temporal snapshots at a particular time-span, such as the extent of the Roman Empire at 33 B.C., or the extent occupied by a museum object at rest in an exhibit. In particular, it can be used to define the spatial projection of a spacetime volume during a particular time-span, such as the maximal spatial extent of a flood at some particular hour, or all areas covered by the Poland within the 20th century AD.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E93",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    83
  ],
  "dfh_ancestor_classes": [
    1,
    214,
    539
  ]
}
    

  export const EN_218_EXPRESSION:NewDfhApiClass = {
  "dfh_pk_class": 218,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Expression",
  "dfh_fk_namespace": 6,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "FRBRoo version 2.4",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises the intellectual or artistic realisations of works in the form of identifiable immaterial objects, such as texts, poems, jokes, musical or choreographic notations, movement pattern, sound pattern, images, multimedia objects, or any combination of such forms that have objectively recognisable structures. The substance of F2 Expression is signs.\r\nExpressions cannot exist without a physical carrier, but do not depend on a specific physical carrier and can exist on one or more carriers simultaneously. Carriers may include human memory.\r\nInasmuch as the form of F2 Expression is an inherent characteristic of the F2 Expression, any change in form (e.g., from alpha-numeric notation to spoken word, a poem created in capitals and rendered in lower case) is a new F2 Expression. Similarly, changes in the intellectual conventions or instruments that are employed to express a work (e.g., translation from one language to another) result in the creation of a new F2 Expression. Thus, if a text is revised or modified, the resulting F2 Expression is considered to be a new F2 Expression. Minor changes, such as corrections of spelling and punctuation, etc., are normally considered variations within the same F2 Expression. On a practical level, the degree to which distinctions are made between variant expressions of a work will depend to some extent on the nature of the F1 Work itself, and on the anticipated needs of users.\r\nThe genre of the work may provide an indication of which features are essential to the expression. In some cases, aspects of physical form, such as typeface and page layout, are not integral to the intellectual or artistic realisation of the work as such, and therefore are not distinctive criteria for the respective expressions. For another work, features such as layout may be essential. For instance, the author or a graphic designer may wrap a poem around an image.\r\nAn expression of a work may include expressions of other works within it. For instance, an anthology of poems is regarded as a work in its own right that makes use of expressions of the individual poems that have been selected and ordered as part of an intellectual process. This does not make the contents of the aggregated expressions part of this work, but only parts of the resulting expression.\r\nIf an instance of F2 Expression is of a specific form, such as text, image, etc., it may be simultaneously instantiated in the specific classes representing these forms in CIDOC CRM. Thereby one can make use of the more specific properties of these classes, such as language (which is applicable to instances of E33 Linguistic Object only).",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "F2",
  "dfh_profile_association_type": "selected",
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
    

  export const EN_219_MANIFESTATION_PRODUCT_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 219,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Manifestation Product Type",
  "dfh_fk_namespace": 6,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "FRBRoo version 2.4",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises the definitions of publication products.\r\nAn instance of F3 Manifestation Product Type is the “species”, and all copies of a given object are “specimens” of it. An instance of F3 Manifestation Product Type defines all of the features or traits that instances of F5 Item normally display in order that they may be recognised as copies of a particular publication. However, due to production problems or subsequent events, one or more instances of F5 Item may not exhibit all these features or traits; yet such instances still retain their relationship to the same instance of F3 Manifestation Product Type.\r\nThe features that characterise a given instance of F3 Manifestation Product Type include: one instance of F24 Publication Expression, containing one or more than one instance of F2 Expression, reflecting the authors’ content of the manifestation and all additional input by the publisher; and the appropriate types of physical features for that form of the object. For example, hardcover and paperback are two distinct publications (i.e. two distinct instances of F3 Manifestation Product Type) even though authorial and editorial content are otherwise identical in both publications. The activity of cataloguing aims at the most accurate listing of features or traits of an instance of F3 Manifestation Product Type that are sufficient to distinguish it from another instance of F3 Manifestation Product Type.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "F3",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    53,
    66
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
    

  export const EN_220_MANIFESTATION_SINGLETON:NewDfhApiClass = {
  "dfh_pk_class": 220,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Manifestation Singleton",
  "dfh_fk_namespace": 6,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "FRBRoo version 2.4",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises physical objects that each carry an instance of F2 Expression, and that were produced as unique objects, with no\n\t\t\tsiblings intended in the course of their production. It should be noted that if all but one copy of a given publication are destroyed,\n\t\t\tthen that copy does not become an instance of F4 Manifestation Singleton, because it was produced together with sibling copies, even\n\t\t\tthough it now happens to be unique. Examples of instances of F4 Manifestation Singleton include manuscripts, preparatory sketches and the\n\t\t\tfinal clean draft sent by an author or a composer to a publisher. ",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "F4",
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
    

  export const EN_221_ITEM:NewDfhApiClass = {
  "dfh_pk_class": 221,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Item",
  "dfh_fk_namespace": 6,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "FRBRoo version 2.4",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises physical objects (printed books, scores, CDs, DVDs, CD-ROMS, etc.) that carry a F24 Publication Expression and\n\t\t\twere produced by an industrial process involving an F3 Manifestation Product Type. ",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "F5",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    264
  ],
  "dfh_ancestor_classes": [
    1,
    18,
    19,
    22,
    23,
    64,
    65,
    66,
    70,
    77,
    83,
    214,
    539
  ]
}
    

  export const EN_234_SERIAL_WORK:NewDfhApiClass = {
  "dfh_pk_class": 234,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Serial Work",
  "dfh_fk_namespace": 6,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "FRBRoo version 2.4",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises works that are, or have been, planned to result in sequences of Expressions or Manifestations with common features. Whereas a work can acquire new members during the time it evolves, Expressions and Manifestations are identified with a certain state achieved at a particular point in time. Therefore there is in general no single Expression or Manifestation representing a complete serial work, unless the serial work has ended.\r\nSerial Works may or may not have a plan for an overall expression.\r\nThe retrospective reprinting of all issues of a Serial Work at once, in the form of a monograph, is regarded to be another member of a Complex Work, which contains the Serial Work and the Individual Work realised in the monograph. This does not make the monograph part of the Serial Work.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "F18",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    231,
    235
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    64,
    65,
    70,
    81,
    214,
    217,
    232
  ]
}
    

  export const EN_335_TIME_PRIMITIVE:NewDfhApiClass = {
  "dfh_pk_class": 335,
  "dfh_basic_type": 0,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Time Primitive",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": null,
  "dfh_class_scope_note": "This class comprises instances of E59 Primitive Value for time that should be implemented with appropriate validation, precision and interval logic to express date ranges relevant to cultural documentation.\r\nE61 Time Primitive is not further elaborated upon within the model.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E61",
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    337
  ],
  "dfh_ancestor_classes": [
    214
  ]
}
    

  export const EN_338_NUMBER:NewDfhApiClass = {
  "dfh_pk_class": 338,
  "dfh_basic_type": 0,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Number",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": null,
  "dfh_class_scope_note": "This class comprises any encoding of computable (algebraic) values such as integers, real numbers, complex numbers, vectors, tensors etc., including intervals of these values to express limited precision.\r\nNumbers are fundamentally distinct from identifiers in continua, such as instances of E50 Date and E47 Spatial Coordinate, even though their encoding may be similar. Instances of E60 Number can be combined with each other in algebraic operations to yield other instances of E60 Number, e.g., 1+1=2. Identifiers in continua may be combined with numbers expressing distances to yield new identifiers, e.g., 1924-01-31 + 2 days = 1924-02-02. Cf. E54 Dimension",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E60",
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    337
  ],
  "dfh_ancestor_classes": [
    214
  ]
}
    

  export const EN_339_STRING:NewDfhApiClass = {
  "dfh_pk_class": 339,
  "dfh_basic_type": 0,
  "dfh_fk_profile": 5,
  "dfh_class_label": "String",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": null,
  "dfh_class_scope_note": "This class comprises the instances of E59 Primitive Values used for documentation such as free text strings, bitmaps, vector graphics, etc.\r\nE62 String is not further elaborated upon within the model",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E62",
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    337
  ],
  "dfh_ancestor_classes": [
    214
  ]
}
    

  export const EN_363_GEOGRAPHICAL_PLACE:NewDfhApiClass = {
  "dfh_pk_class": 363,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Geographical Place",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
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
  "dfh_fk_profile": 5,
  "dfh_class_label": "Geographical Place Type",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
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
    

  export const EN_365_APPELLATION_IN_A_LANGUAGE:NewDfhApiClass = {
  "dfh_pk_class": 365,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Appellation in a Language",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class refers to the fact that an entity (actor, group, concept, etc.) is identified in the context of a social collective, during a given time span, using a specific appellation. This identifying appellation is generally related to the main language used be the social collective, or at least considered as understandable or valid in that context(e.g. a Latin or English appellation in a French speaking context).\r\nAs a subclass of social connotation, this class does not refer to an activity of collectively naming a thing (cf. the FRBRoo:F52_Name_Use_Activity class) but  to the possibility of identifying with that appellation within the given social context or collective.\r\nThe crm: P1 is identified property is a shortcut of the present class directly (i.e. independengly from time and context) linking a crm:E1 Entity to its crmE41 Appellation.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C11",
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
    

  export const EN_441_CONSTRUCTION:NewDfhApiClass = {
  "dfh_pk_class": 441,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Construction",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
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
    

  export const EN_444_SOCIAL_QUALITY_OF_AN_ACTOR:NewDfhApiClass = {
  "dfh_pk_class": 444,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Social Quality of an Actor",
  "dfh_fk_namespace": 112,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
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
    

  export const EN_445_ARGUMENT:NewDfhApiClass = {
  "dfh_pk_class": 445,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Argument",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class expresses the fact that a point is presented to support or oppose the validity of a property. As a subclass of Attribute Assignment – E13 each instance expresses a statement by a person in favour or against the truthfulness of a property, this at the given time. Using the appropriate properties, one or more sources for the argument can be provided, and also the method used (literal reading, reasoning, inference, ...), the value of the statement (true, false, ...) and the strength of it.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C12",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    13
  ],
  "dfh_ancestor_classes": [
    1,
    2,
    4,
    5,
    7,
    83,
    214,
    539
  ]
}
    

  export const EN_450_MANIFESTATION_SINGLETON_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 450,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Manifestation Singleton Type",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of F4 Manifestation Singleton.",
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
    

  export const EN_452_TYPE_OF_MANIFESTATION_PRODUCT_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 452,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Type of manifestation product type",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the Manifestation Product Type – F3 class.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C8",
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
    

  export const EN_454_EXPRESSION_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 454,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Expression Type",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the Expression – F2 class.",
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
    

  export const EN_455_GEOVISTORY_DIGITAL:NewDfhApiClass = {
  "dfh_pk_class": 455,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "[Geovistory] Digital",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "Any kind of digital object",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C1",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    67,
    517
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
    

  export const EN_456_CHUNK:NewDfhApiClass = {
  "dfh_pk_class": 456,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Chunk",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "Chunks are intended here in the sense of NLP, i.e. as the result of shallow parsing or chunking: a sentence is analyzed with the aim of identifying constituent parts of sentences (nouns, verbs, adjectives, etc.) and then of linking them to higher order units that have discrete grammatical meanings (noun groups or phrases, verb groups, etc.). Chunks are therefore groups of tokens, generally below the sentence level. They can be used to identify noun phrases, especially in the process of named entities recognition",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C2",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    455
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    64,
    65,
    66,
    67,
    70,
    81,
    82,
    214,
    517
  ]
}
    

  export const EN_457_SPOT:NewDfhApiClass = {
  "dfh_pk_class": 457,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Spot",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class identifies portions of audiovisual digital objects like pictures, video, etc.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C3",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    455
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    64,
    65,
    66,
    67,
    70,
    81,
    82,
    214,
    517
  ]
}
    

  export const EN_459_ARGUMENT_S_METHOD:NewDfhApiClass = {
  "dfh_pk_class": 459,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Argument's method",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize the method used to produce an Argument – histC15.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C13",
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
    

  export const EN_502_WEB_REQUEST:NewDfhApiClass = {
  "dfh_pk_class": 502,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Web Request",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class models a web request in form of a URI/URL/SPARQL query etc. sent into the web in the sense of a \"message describing an atomic operation to be carried out in the context of a specified resource\" (Web Characterization Terminology & Definitions Sheet). Sending a web request into the web will produce, if the corresponding resource exists, a web response in the form of an HTML document, a picture, a RDF graph or an error message.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C4",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
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
    

  export const EN_503_EXPRESSION_PORTION:NewDfhApiClass = {
  "dfh_pk_class": 503,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Expression portion",
  "dfh_fk_namespace": 74,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "The instances of this class are portions or sections of expressions defined by a user. Usually they correspond to a recognizable structure in the document but they can also be arbitrarily defined. Therefore the identity of the portion is provided by the definition adopted by the user in order to cut it out.\r\nIf an expression or expression portion is split on different carriers (e.g. the first part of the copy of a letter is found in the end of volume I and the second part of the copy in the beginning of volume II) then the portion is related to both volumes as carriers of the one relevant expression. In this case the Expression portion will be associated as part of two different Expression instances",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C2",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    218
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    30,
    64,
    65,
    66,
    67,
    70,
    81,
    82,
    214
  ]
}
    

  export const EN_516_EXPRESSION_PORTION_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 516,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Expression Portion Type",
  "dfh_fk_namespace": 74,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the geovC5 Expression portion class.",
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
    

  export const EN_518_EXPRESSION_FRAGMENT:NewDfhApiClass = {
  "dfh_pk_class": 518,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Expression fragment",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "Expression fragment are small portions of text identified by a chunk (one or a few words) or a cell in a table of semi-structured data. An expression fragment can also be defined by a spot on a picture.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C6",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    503
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    30,
    64,
    65,
    66,
    67,
    70,
    81,
    82,
    214,
    218
  ]
}
    

  export const EN_519_ITEM_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 519,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Item Type",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of F5 Item.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C5",
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
    

  export const EN_520_ENTITY_QUALITY_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 520,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Entity Quality Type",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "\r\nThis class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the C1 Entity Quality class.\r\n",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C20",
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
    

  export const EN_521_CELL:NewDfhApiClass = {
  "dfh_pk_class": 521,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Cell",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "A cell in a table in a database",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C7",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    455
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    64,
    65,
    66,
    67,
    70,
    81,
    82,
    214,
    517
  ]
}
    

  export const EN_607_WEB_REQUEST_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 607,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Web request type",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the 'geovC4 Web request'.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C8",
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
    

  export const EN_630_APPELLATION_IN_A_LANGUAGE_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 630,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Appellation in a Language Type",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the C7 Appellation in a language (Temporal Entity) class.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C12",
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
    

  export const EN_635_TAG:NewDfhApiClass = {
  "dfh_pk_class": 635,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Tag",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "A user defined concept beloinging to his/her research agenda. A specific implementation will be provided.",
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
    

  export const EN_657_REFERENCE:NewDfhApiClass = {
  "dfh_pk_class": 657,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Reference",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "Description of the location of a segment within a larger unit, such as the page reference within a book.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C11",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    218
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    30,
    64,
    65,
    66,
    67,
    70,
    81,
    82,
    214
  ]
}
    

  export const EN_689_DURATION:NewDfhApiClass = {
  "dfh_pk_class": 689,
  "dfh_basic_type": 10,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Duration",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Region",
  "dfh_class_scope_note": "A time length. A duration is a specialisation of E54 Dimension providing a measure of time.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C1",
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
    

  export const EN_690_TIME_UNIT:NewDfhApiClass = {
  "dfh_pk_class": 690,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Time unit",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "A measurement unit of durations and periods of time like second, hour, day, year or century",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C2",
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    53,
    56
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
  "dfh_fk_profile": 5,
  "dfh_class_label": "Social Role",
  "dfh_fk_namespace": 112,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
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
    

  export const EN_707_NUMERIC_DIMENSION:NewDfhApiClass = {
  "dfh_pk_class": 707,
  "dfh_basic_type": 10,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Numeric dimension",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Region",
  "dfh_class_scope_note": " \r\n\r\nA numeric dimension is a specialisation of the crm:E54 Dimension class modeling measured quantities like the number (of items) or a percentage, that have, strictly speaking, no measurement unit but need to be specified by a type in order to capture the meaning of the measured value. E.g. 10 has not the same meaning as number (of items) or percentage. A specific vocabulary will allow to distinguish between the different scenarios.\r\n",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C11",
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
    

  export const EN_708_NUMERIC_DIMENSION_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 708,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Numeric dimension type",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class model the type of a numeric dimension without measurement unit. Its instances, like number (of items), percentage, permille (per thousand), etc. allow to understand the meaning of the measured quantity.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C12",
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
    

  export const EN_783_UNIFORM_RESOURCE_LOCATOR_URL_:NewDfhApiClass = {
  "dfh_pk_class": 783,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Uniform Resource Locator (URL)",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "A Uniform Resource Locator (URL), colloquially termed a web address, is a reference to a web resource that specifies its location on a computer network and a mechanism for retrieving it. A URL is a specific type of Uniform Resource Identifier (URI).",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C14",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    41
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    40,
    64,
    65,
    66,
    70,
    82,
    214
  ]
}
    

  export const EN_784_SHORT_TITLE:NewDfhApiClass = {
  "dfh_pk_class": 784,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Short title",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "An abbreviated form of an appellation or name by which an entity is commonly known and cited, contrasting with the full one which is more descriptive but is too long to be of use in most purposes.\r\nA short title should be used as metadata in the information system while the full appellation is the historical or identifying one.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C15",
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
    

  export const EN_785_TEXT:NewDfhApiClass = {
  "dfh_pk_class": 785,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Text",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "Instances of this class are all the texts written by Geovistory users, whether they are reproductions of sources, descriptive notices of entities, stories, etc.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C16",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    32,
    455
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    64,
    65,
    66,
    67,
    70,
    81,
    82,
    214,
    517
  ]
}
    

  export const EN_827_IDENTIFIER_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 827,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Identifier Type",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
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
    

  export const EN_867_ASSERTED_ACTOR_S_ROLE:NewDfhApiClass = {
  "dfh_pk_class": 867,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Asserted Actor's Role",
  "dfh_fk_namespace": 74,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "The social quality or social role of an actor in relation to an expression and according to it. E.g. the author of a text as appearing in the text (even if historical research shows this person was not the real author of the text).\r\nThis class can be used in order to associate authors, scientific editors, contributors, etc. to texts (expressions, expressions portions, etc.) in the sense of structured bibliographic references.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C9",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    81
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
    

  export const EN_868_PERSON_APPELLATION_IN_A_LANGUAGE:NewDfhApiClass = {
  "dfh_pk_class": 868,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Person Appellation in a Language",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "The appellation of a person in its differents forms, e.g. forename, family name, nickname, etc. These are distinguished using specific Person Appellation Types.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C38",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    365
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
    

  export const EN_869_PERSON_APPELLATION_IN_A_LANGUAGE_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 869,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Person Appellation in a Language Type",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "The type of a person's appellation, e.g. a forename, nickname, etc.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C39",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    630
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
    

  export const EN_870_BIBLIOGRAPHIC_CITATION:NewDfhApiClass = {
  "dfh_pk_class": 870,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Bibliographic Citation",
  "dfh_fk_namespace": 74,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "An appellation of a book, article, web page, or other published item, allowing to clearly identify the resource and therefore typically including author, title, source, abstract and/or related information",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C10",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    32,
    40
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    64,
    65,
    66,
    67,
    70,
    81,
    82,
    214
  ]
}
    

  export const EN_871_CITATION_STYLE:NewDfhApiClass = {
  "dfh_pk_class": 871,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Citation Style",
  "dfh_fk_namespace": 74,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "Format type for bibliographic entries dependent on the discipline and/or language of the bibliographic citation (e.g. MLA, Chicago, APA, InfoClio français sans majuscules, etc.)",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C11",
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
    

  export const EN_872_BELONGING_TO_A_COLLECTION:NewDfhApiClass = {
  "dfh_pk_class": 872,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Belonging to a collection",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class expresses the fact that a physical thing is kept by an actor in a collection during a given time span. Although the given thing is generally kept physically in the collection, as a part of it, this class focuses on the social fact, i.e. the fact that the given thing is considered as kept in the collection. The thing may have been lent to another museum and therefore not be physically present but still be considered as belonging to the collection. An appropriate type will clarify the meaning of the keeping.\r\nThe archive reference concerning the specific physical thing at a given time, including the name of the collection and the identifier of the object held in it, can be used as the appellation of an instance of the Belonging to a collection class. The validity of the identifier in the context of the given belonging to a collection can be explicitly expressed using the crm-sup:C23 Identification class.\r\nThe kept thing and the collection are identity defining and must be provided in order to identify the Belonging. The actor in charge of the keeping is optional and can be associated to the collection using the crm:E87 Curation Activity class. Another actor could have rights, e.g. property, upon  to the kept Physical Thing and this will be expressed using the sdh-so:C14 - Subjection to a Right or Obligation  class.\r\nThe concerned collection can be defined at different levels. The highest one is the whole collection of a library or museum. As a matter of fact, it is relevant to distinguish the museum as an organisation (the actor) from its collection as the whole of the objects in its custody. The concerned physical thing can be declared as being kept inside the general collection, or in a more specific subcollection. Each subcollection, or subcollection of subcollection (as a subclass of physical thing), can be declared as belonging to a parent collection. This allows to establish a hierarchy of the different collections and series held e.g. in an archive.\r\n ",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C25",
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
    

  export const EN_873_COLLECTION_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 873,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Collection Type",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the crm:E78 Collection class.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C26",
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
    

  export const EN_874_MANIFESTATION_SINGLETON_APPELLATION_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 874,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 5,
  "dfh_class_label": "Manifestation Singleton Appellation Type",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "The type of an appellation for language of a Manifestation Singleton",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C17",
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    53,
    630
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
  export namespace PROFILE_5_PROPERTIES {
    
  export const EN_219_1_870_IS_IDENTIFIED_BY:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is identified by",
  "dfh_property_inverse_label": "identifies",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property describes the naming or identification of any real world item by a name or any other identifier.\r\nThis property is intended for identifiers in general use, which form part of the world the model intends to describe, and not merely for internal database identifiers which are specific to a technical system, unless these latter also have a more general use outside the technical context. This property includes in particular identification by mathematical expressions such as coordinate systems used for the identification of instances of E53 Place. The property does not reveal anything about when, where and by whom this identifier was used. A more detailed representation can be made using the fully developed (i.e. indirect) path through E15 Identifier Assignment.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 219,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 870,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P1",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376,
    1774
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_503_1_870_IS_IDENTIFIED_BY:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is identified by",
  "dfh_property_inverse_label": "identifies",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property describes the naming or identification of any real world item by a name or any other identifier.\r\nThis property is intended for identifiers in general use, which form part of the world the model intends to describe, and not merely for internal database identifiers which are specific to a technical system, unless these latter also have a more general use outside the technical context. This property includes in particular identification by mathematical expressions such as coordinate systems used for the identification of instances of E53 Place. The property does not reveal anything about when, where and by whom this identifier was used. A more detailed representation can be made using the fully developed (i.e. indirect) path through E15 Identifier Assignment.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 503,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 870,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P1",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376,
    1774
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_2_4_50_HAS_TIME_SPAN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 4,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has time-span",
  "dfh_property_inverse_label": "is time-span of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property describes the temporal confinement of an instance of an E2 Temporal Entity.\r\nThe related E52 Time-Span is understood as the real Time-Span during which the phenomena were active, which make up the temporal entity instance. It does not convey any other meaning than a positioning on the “time-line” of chronology. The Time-Span in turn is approximated by a set of dates (E61 Time Primitive). A temporal entity can have in reality only one Time-Span, but there may exist alternative opinions about it, which we would express by assigning multiple Time-Spans. Related temporal entities may share a Time-Span. Time-Spans may have completely unknown dates but other descriptions by which we can infer knowledge.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 2,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 50,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P4",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_870_63_54_HAS_LANGUAGE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 63,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has language",
  "dfh_property_inverse_label": "is language of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property describes the E56 Language of an E33 Linguistic Object.\r\nLinguistic Objects are composed in one or more human Languages. This property allows these languages to be documented.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 870,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 54,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P72",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_50_71_335_ONGOING_THROUGHOUT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 71,
  "dfh_property_label_language": "en",
  "dfh_property_label": "ongoing throughout",
  "dfh_property_inverse_label": "(inverse of) ongoing throughout",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property describes the minimum period of time covered by an E52 Time-Span.\r\nSince Time-Spans may not have precisely known temporal extents, the CRM supports statements about the minimum and maximum temporal extents of Time-Spans. This property allows a Time-Span’s minimum temporal extent (i.e. its inner boundary) to be assigned an E61 Time Primitive value. Time Primitives are treated by the CRM as application or system specific date intervals, and are not further analysed.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 50,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 335,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P81",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_50_72_335_AT_SOME_TIME_WITHIN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 72,
  "dfh_property_label_language": "en",
  "dfh_property_label": "at some time within",
  "dfh_property_inverse_label": "(inverse of) at some time within",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property describes the maximum period of time within which an E52 Time-Span falls.\r\nSince Time-Spans may not have precisely known temporal extents, the CRM supports statements about the minimum and maximum temporal extents of Time-Spans. This property allows a Time-Span’s maximum temporal extent (i.e. its outer boundary) to be assigned an E61 Time Primitive value. Time Primitives are treated by the CRM as application or system specific date intervals, and are not further analysed.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 50,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 335,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P82",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_707_78_338_HAS_VALUE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 78,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has value",
  "dfh_property_inverse_label": "(inverse of) has value",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property allows an E54 Dimension to be approximated by an E60 Number primitive.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 707,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 338,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P90",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_516_115_516_HAS_BROADER_TERM:NewDfhApiProperty = {
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
  "dfh_property_domain": 516,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 516,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_630_115_630_HAS_BROADER_TERM:NewDfhApiProperty = {
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
  "dfh_property_domain": 630,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 630,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_635_115_635_HAS_BROADER_TERM:NewDfhApiProperty = {
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
  "dfh_property_domain": 635,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 635,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_84_145_50_DURING:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 145,
  "dfh_property_label_language": "en",
  "dfh_property_label": "during",
  "dfh_property_inverse_label": "was time-span of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property relates an E93 Presence with an arbitrary E52 Time-Span that defines the section of the spacetime volume that this instance of E93 Presence is related to by P166 was a presence of (had presence) that is concerned by this instance of E93 Presence.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 84,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 50,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P164",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_84_147_363_WAS_A_PRESENCE_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 147,
  "dfh_property_label_language": "en",
  "dfh_property_label": "was a presence of",
  "dfh_property_inverse_label": "had presence",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property relates an E93 Presence with the STV it is part of… ",
  "dfh_is_inherited": true,
  "dfh_property_domain": 84,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 363,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P166",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_84_147_441_WAS_A_PRESENCE_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 147,
  "dfh_property_label_language": "en",
  "dfh_property_label": "was a presence of",
  "dfh_property_inverse_label": "had presence",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property relates an E93 Presence with the STV it is part of… ",
  "dfh_is_inherited": true,
  "dfh_property_domain": 84,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 441,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P166",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_84_148_51_WAS_AT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 148,
  "dfh_property_label_language": "en",
  "dfh_property_label": "was at",
  "dfh_property_inverse_label": "was place of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property points to a wider area in which my thing /event was… ",
  "dfh_is_inherited": false,
  "dfh_property_domain": 84,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 51,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P167",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_50_150_335_END_OF_THE_BEGIN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 150,
  "dfh_property_label_language": "en",
  "dfh_property_label": "end of the begin",
  "dfh_property_inverse_label": "(inverse of) end of the begin",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This is defined as the first boundary of the property P81",
  "dfh_is_inherited": false,
  "dfh_property_domain": 50,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 335,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P81a",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    71
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_50_151_335_BEGIN_OF_THE_END:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 151,
  "dfh_property_label_language": "en",
  "dfh_property_label": "begin of the end",
  "dfh_property_inverse_label": "(inverse of) begin of the end",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This is defined as the second boundary of the property P81",
  "dfh_is_inherited": false,
  "dfh_property_domain": 50,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 335,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P81b",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    71
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_50_152_335_BEGIN_OF_THE_BEGIN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 152,
  "dfh_property_label_language": "en",
  "dfh_property_label": "begin of the begin",
  "dfh_property_inverse_label": "(inverse of) begin of the begin",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This is defined as the first boundary of the property P82",
  "dfh_is_inherited": false,
  "dfh_property_domain": 50,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 335,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P82a",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    72
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_50_153_335_END_OF_THE_END:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 153,
  "dfh_property_label_language": "en",
  "dfh_property_label": "end of the end",
  "dfh_property_inverse_label": "(inverse of) end of the end",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This is defined as the second boundary of the property P82",
  "dfh_is_inherited": false,
  "dfh_property_domain": 50,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 335,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P82b",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    72
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_218_979_219_CARRIERS_PROVIDED_BY:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 979,
  "dfh_property_label_language": "en",
  "dfh_property_label": "carriers provided by",
  "dfh_property_inverse_label": "comprises carriers of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates a publication, i.e. an instance of F3 Manifestation Product Type, with an instance of F2 Expression, which all exemplars of that publication should carry, as long as they are recognised as complete exemplars of that publication. Typically, this property is observed on one exemplar of a publication, and extrapolated to all other exemplars of the same publication.\r\nThis property is a shortcut of: F2 Expression P165i is incorporated in F24 Publication Expression CLR6i should be carried by F3 Manifestation Product Type.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 218,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 219,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "R4",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 6,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "FRBRoo version 2.4",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    116
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_221_982_219_IS_EXAMPLE_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 982,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is example of",
  "dfh_property_inverse_label": "has example",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates a publication with one of its exemplars.\r\nIt is a shortcut of the more developed path: F5 Item R28i was produced by F32 Carrier Production R26 produced things of type (was produced by): F3 Manifestation Product Type.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 221,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 219,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "R7",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 6,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "FRBRoo version 2.4",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_220_1016_218_IS_REPRESENTATIVE_MANIFESTATION_SINGLETON_FOR:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1016,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is representative manifestation singleton for",
  "dfh_property_inverse_label": "has representative manifestation singleton",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property identifies an instance of Manifestation Singleton that has been declared as the unique representative for an instance of F2 Expression by some bibliographic agency.\r\nThis property identifies an instance of F4 Manifestation Singleton that has been chosen as the most characteristic Manifestation Singleton of the instance of F2 Expression of which it is a manifestation.\r\nIdentifying an instance of F4 Manifestation Singleton that is representative for an instance of F2 Expression makes it possible in turn to identify an instance of F2 Expression that is representative for an instance of F1 Work, and to decide what should be regarded as the title of the work.\r\nThe title of an Expression may not be one taken from a representative Manifestation Product Type or Manifestation Singleton.\r\nA given expression can have more than one representative Manifestation Singleton.\r\nIt is a shortcut for the more developed path: F2 Expression R48i was assigned by F41 Representative Manifestation Assignment R53 assigned F4 Manifestation Singleton.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 220,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 218,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "R42",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 6,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "FRBRoo version 2.4",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    116
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_1_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1111,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is appellation for language of",
  "dfh_property_inverse_label": "has appellation for language",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the Appelation for language to the E1 CRM Entity that it identifies.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 365,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 1,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_41_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 41,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_71_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 71,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_218_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 218,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_219_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 219,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_220_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 220,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_221_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 221,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_234_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 234,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_363_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 363,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_364_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 364,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_445_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 445,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_450_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 450,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_452_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 452,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_454_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 454,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_455_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 455,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_456_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 456,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_457_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 457,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_502_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 502,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_503_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 503,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_516_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 516,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_518_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 518,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_519_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 519,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_520_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 520,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_521_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 521,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_607_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 607,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_630_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 630,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_635_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 635,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_657_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 657,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_783_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 783,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_784_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 784,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_785_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 785,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_867_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 867,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_868_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 868,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_869_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 869,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_870_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 870,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1111_872_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_range": 872,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_868_1111_21_IS_APPELLATION_FOR_LANGUAGE_OF:NewDfhApiProperty = {
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
  "dfh_property_domain": 868,
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1112_54_USED_IN_LANGUAGE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1112,
  "dfh_property_label_language": "en",
  "dfh_property_label": "used in language",
  "dfh_property_inverse_label": "(inverse of) used in language",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the language for which the appellation is a valid identifier of an entity for a given time span",
  "dfh_is_inherited": false,
  "dfh_property_domain": 365,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 54,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P12",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_868_1112_54_USED_IN_LANGUAGE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1112,
  "dfh_property_label_language": "en",
  "dfh_property_label": "used in language",
  "dfh_property_inverse_label": "(inverse of) used in language",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the language for which the appellation is a valid identifier of an entity for a given time span",
  "dfh_is_inherited": true,
  "dfh_property_domain": 868,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 54,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P12",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1113_40_REFERS_TO_NAME:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1113,
  "dfh_property_label_language": "en",
  "dfh_property_label": "refers to name",
  "dfh_property_inverse_label": "(inverse of) refers to name",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the Appelation for language to the E41 Appelation that refers to it.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 365,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 40,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P13",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_868_1113_40_REFERS_TO_NAME:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1113,
  "dfh_property_label_language": "en",
  "dfh_property_label": "refers to name",
  "dfh_property_inverse_label": "(inverse of) refers to name",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the Appelation for language to the E41 Appelation that refers to it.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 868,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 40,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": true,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P13",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_220_1205_450_HAS_MANIFESTATION_SINGLETON_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1205,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has manifestation singleton type",
  "dfh_property_inverse_label": "is manifestation singleton type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates a manifestation singleton with the type which defines its identity",
  "dfh_is_inherited": false,
  "dfh_property_domain": 220,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 450,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P6",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_219_1206_452_HAS_TYPE_OF_MANIFESTATION_PRODUCT_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1206,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has type of manifestation product type",
  "dfh_property_inverse_label": "is type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates a manifestation product type with the type which defines its identity",
  "dfh_is_inherited": false,
  "dfh_property_domain": 219,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 452,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P5",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_218_1214_454_HAS_EXPRESSION_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1214,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has expression type",
  "dfh_property_inverse_label": "is expression type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates an expression with the type which defines its identity",
  "dfh_is_inherited": false,
  "dfh_property_domain": 218,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 454,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P4",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_455_1216_218_IS_REPRODUCTION_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1216,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is reproduction of",
  "dfh_property_inverse_label": "has reproduction",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates a digital objet with the source expression (i.e. the symbolic and propositional content it is a source of) it is a reproduction of. The  many to many cardinality is the consequence of the possibility to reproduce different sources at the same time, e.g. different version of a handwritten document in a critical edition.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 455,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 218,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P1",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    146
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_445_1246_459_HAS_ARGUMENT_METHOD:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1246,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has argument method",
  "dfh_property_inverse_label": "is argument method of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates an Argument – histC15 with the method (in the sense of a type) which was used to produce this argument.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 445,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 459,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P15",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    30
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_218_1305_502_IS_SERVER_RESPONSE_TO_REQUEST:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1305,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is server response to request",
  "dfh_property_inverse_label": "has server response",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the Expression (Text, picture, graph, etc.) sent back by a server responding to a web request.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 218,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 502,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P4",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_218_1316_221_HAS_CARRIER_PROVIDED_BY:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1316,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has carrier provided by",
  "dfh_property_inverse_label": "provides carrier to",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "[to be improved] In the Geovistory namespace, this property associates a F2 Expression with the specific F5 Item in which it's found as carrier of this new expression wchihc is added, e.g. manuscript notes of a reader in a book. This expression is therefore independent from the Expression printed in the book conceived as a Manifestation Product Type. This kind of items contains two or more expressions: e.g. the one of the book and the ones of the readers.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 218,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 221,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P5",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_503_1317_218_IS_PART_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1317,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is part of",
  "dfh_property_inverse_label": "has as part",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates an expression portion with the expression section (in some cases more then one) it is composed of",
  "dfh_is_inherited": false,
  "dfh_property_domain": 503,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 218,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P4",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    94
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_503_1317_503_IS_PART_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1317,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is part of",
  "dfh_property_inverse_label": "has as part",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates an expression portion with the expression section (in some cases more then one) it is composed of",
  "dfh_is_inherited": true,
  "dfh_property_domain": 503,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 503,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P4",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    94
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_518_1317_503_IS_PART_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1317,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is part of",
  "dfh_property_inverse_label": "has as part",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates an expression portion with the expression section (in some cases more then one) it is composed of",
  "dfh_is_inherited": true,
  "dfh_property_domain": 518,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 503,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P4",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    94
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_503_1320_516_HAS_EXPRESSION_PORTION_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1320,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has expression portion type",
  "dfh_property_inverse_label": "is expression portion type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates an Expression portion with the type which defines its identity",
  "dfh_is_inherited": false,
  "dfh_property_domain": 503,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 516,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P5",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_221_1321_519_HAS_ITEM_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1321,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has item type",
  "dfh_property_inverse_label": "is item type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates an Item (F5) with the type which defines its identity",
  "dfh_is_inherited": false,
  "dfh_property_domain": 221,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 519,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P2",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_502_1323_607_HAS_WEB_REQUEST_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1323,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has web request type",
  "dfh_property_inverse_label": "is web request type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates a Web request (geovC4) with the type which defines its identity",
  "dfh_is_inherited": false,
  "dfh_property_domain": 502,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 607,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P8",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1430_630_HAS_APPELLATION_FOR_LANGUAGE_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1430,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has appellation for language type",
  "dfh_property_inverse_label": "is appellation for language type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates Appellation for language – histC10 with the type which defines its identity",
  "dfh_is_inherited": false,
  "dfh_property_domain": 365,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 630,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P14",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_365_1430_874_HAS_APPELLATION_FOR_LANGUAGE_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1430,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has appellation for language type",
  "dfh_property_inverse_label": "is appellation for language type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates Appellation for language – histC10 with the type which defines its identity",
  "dfh_is_inherited": true,
  "dfh_property_domain": 365,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 874,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P14",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_868_1430_869_HAS_APPELLATION_FOR_LANGUAGE_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1430,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has appellation for language type",
  "dfh_property_inverse_label": "is appellation for language type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates Appellation for language – histC10 with the type which defines its identity",
  "dfh_is_inherited": true,
  "dfh_property_domain": 868,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 869,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P14",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_1_1440_635_TAGGED_BY:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1440,
  "dfh_property_label_language": "en",
  "dfh_property_label": "tagged by",
  "dfh_property_inverse_label": "tags",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property expresses the epistemological perspective of a researcher or project associating any entity with a tag related to the own research agenda",
  "dfh_is_inherited": false,
  "dfh_property_domain": 1,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 635,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P12",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_1_1499_1_HAS_TO_BE_MERGED_WITH:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1499,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has to be merged with",
  "dfh_property_inverse_label": "has to be preferred to",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property states that the entity in the domain position is the same as the one in the range of the property, inside the same information system. This means these entities are duplicates. The direction of the property allows to assert that the domain entity has to be deprecated and the domain entity to be preferred.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 1,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 1,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P13",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_689_1612_690_HAS_TIME_UNIT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1612,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has time unit",
  "dfh_property_inverse_label": "is time unit of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates a duration with its time unit",
  "dfh_is_inherited": false,
  "dfh_property_domain": 689,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 690,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P10",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    79
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_707_1635_708_HAS_NUMERIC_DIMENSION_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1635,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has numeric dimension type",
  "dfh_property_inverse_label": "is numeric dimension type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": " \r\n\r\nAssociates a numeric dimension with its type (by analogy with the unit of measurement for distinguishing quantities having none).\r\n",
  "dfh_is_inherited": false,
  "dfh_property_domain": 707,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 708,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P11",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    79
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_502_1760_783_HAS_WEB_ADDRESS:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1760,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has web address",
  "dfh_property_inverse_label": "is web addess of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property identifies the web request by the URL that was used to make the web request.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 502,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 783,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P16",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_219_1761_784_HAS_SHORT_TITLE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1761,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has short title",
  "dfh_property_inverse_label": "is short title of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates to an entity an abbreviated or usual name of it. This is not a historical name and the usage should be restricted to the metadata of an entity in the information system.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 219,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 784,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P17",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_220_1761_784_HAS_SHORT_TITLE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1761,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has short title",
  "dfh_property_inverse_label": "is short title of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates to an entity an abbreviated or usual name of it. This is not a historical name and the usage should be restricted to the metadata of an entity in the information system.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 220,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 784,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P17",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_221_1761_784_HAS_SHORT_TITLE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1761,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has short title",
  "dfh_property_inverse_label": "is short title of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates to an entity an abbreviated or usual name of it. This is not a historical name and the usage should be restricted to the metadata of an entity in the information system.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 221,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 784,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P17",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_502_1761_784_HAS_SHORT_TITLE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1761,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has short title",
  "dfh_property_inverse_label": "is short title of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates to an entity an abbreviated or usual name of it. This is not a historical name and the usage should be restricted to the metadata of an entity in the information system.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 502,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 784,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P17",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_1_1762_785_HAS_DEFINITION:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1762,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has definition",
  "dfh_property_inverse_label": "is definition of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates to an entity a definition which describes the essential elements allowing its identification",
  "dfh_is_inherited": false,
  "dfh_property_domain": 1,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 785,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P18",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_1_1763_785_HAS_COMMENT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1763,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has comment",
  "dfh_property_inverse_label": "is comment about",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property adds a comment about the entity in natural language allowing humans to add any kind of remark, note or even discussion about the entity.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 1,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 785,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P19",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_867_1837_21_IS_ROLE_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1837,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is role of",
  "dfh_property_inverse_label": "has role",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the actor concerned by the role in relation to the expression",
  "dfh_is_inherited": true,
  "dfh_property_domain": 867,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 21,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P15",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_867_1838_503_IS_ASSERTED_BY:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1838,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is asserted by",
  "dfh_property_inverse_label": "asserts",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the expression asserting the role of an actor in relation to itself, e.g. the authorship of the expression.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 867,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 503,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P16",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_867_1839_444_IS_DEFINED_BY:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1839,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is defined by",
  "dfh_property_inverse_label": "defines",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the generic social quality defining the actor's role in relation to the expression and as expressed by it, e.g. being the author, editor, etc.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 867,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 444,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P17",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_867_1840_698_IS_QUALIFIED_BY:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1840,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is qualified by",
  "dfh_property_inverse_label": "qualifies",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the specific social role or function, modelled as a social actor, that defines the precise role of the actor in relation to the expression and as defined by it, e.g. being the author of a letter in the role of the ambassador of a king.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 867,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 698,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P18",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_870_1841_871_HAS_STYLE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1841,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has style",
  "dfh_property_inverse_label": "is style of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates a bibliographic citation to a manifestation product type that it identifies. Insofar as different styles and forms of citation are possible, more then one citation can be profided to identify the same resource.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 870,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 871,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P19",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
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
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_41_1843_339_HAS_VALUE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1843,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has value",
  "dfh_property_inverse_label": "is value of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property (a data property in OWL) provides the symbolic content, i.e. the string, to the appellation class",
  "dfh_is_inherited": true,
  "dfh_property_domain": 41,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 339,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P21",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_783_1843_339_HAS_VALUE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1843,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has value",
  "dfh_property_inverse_label": "is value of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property (a data property in OWL) provides the symbolic content, i.e. the string, to the appellation class",
  "dfh_is_inherited": true,
  "dfh_property_domain": 783,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 339,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P21",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_870_1843_339_HAS_VALUE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1843,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has value",
  "dfh_property_inverse_label": "is value of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property (a data property in OWL) provides the symbolic content, i.e. the string, to the appellation class",
  "dfh_is_inherited": true,
  "dfh_property_domain": 870,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 339,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P21",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_872_1844_71_IS_ABOUT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1844,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is about",
  "dfh_property_inverse_label": "belongs to",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the physical thingh kept in the collection",
  "dfh_is_inherited": true,
  "dfh_property_domain": 872,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 71,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P22",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_872_1844_220_IS_ABOUT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1844,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is about",
  "dfh_property_inverse_label": "belongs to",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the physical thingh kept in the collection",
  "dfh_is_inherited": true,
  "dfh_property_domain": 872,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 220,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P22",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_872_1844_221_IS_ABOUT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1844,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is about",
  "dfh_property_inverse_label": "belongs to",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the physical thingh kept in the collection",
  "dfh_is_inherited": true,
  "dfh_property_domain": 872,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 221,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P22",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_872_1845_71_BELONGS_TO:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1845,
  "dfh_property_label_language": "fr",
  "dfh_property_label": "belongs to",
  "dfh_property_inverse_label": "is concerned by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the collection in which the physical thing is kept",
  "dfh_is_inherited": false,
  "dfh_property_domain": 872,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 71,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P23",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_71_1846_873_HAS_IDENTITY_DEFINING_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1846,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has identity defining type",
  "dfh_property_inverse_label": "is identity defining type",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": " \r\n\r\nThis property associates any entity with a type which defines its identity. Unlike the crm:P2 has type property the range maximal quantity is restricted to one because the only associated type defines the identity of the entity.\r\n",
  "dfh_is_inherited": true,
  "dfh_property_domain": 71,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 873,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P24",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 5,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    
  }


  export const PROFILE_5_GEOVISTORY_BASI_2022_01_18: OntomeProfileMock = {
    profile: PROFILE,
    classes: [
      PROFILE_5_CLASSES.EN_1_CRM_ENTITY,
PROFILE_5_CLASSES.EN_2_TEMPORAL_ENTITY,
PROFILE_5_CLASSES.EN_21_PERSON,
PROFILE_5_CLASSES.EN_40_APPELLATION,
PROFILE_5_CLASSES.EN_41_IDENTIFIER,
PROFILE_5_CLASSES.EN_50_TIME_SPAN,
PROFILE_5_CLASSES.EN_51_PLACE,
PROFILE_5_CLASSES.EN_54_LANGUAGE,
PROFILE_5_CLASSES.EN_71_COLLECTION,
PROFILE_5_CLASSES.EN_84_PRESENCE,
PROFILE_5_CLASSES.EN_218_EXPRESSION,
PROFILE_5_CLASSES.EN_219_MANIFESTATION_PRODUCT_TYPE,
PROFILE_5_CLASSES.EN_220_MANIFESTATION_SINGLETON,
PROFILE_5_CLASSES.EN_221_ITEM,
PROFILE_5_CLASSES.EN_234_SERIAL_WORK,
PROFILE_5_CLASSES.EN_335_TIME_PRIMITIVE,
PROFILE_5_CLASSES.EN_338_NUMBER,
PROFILE_5_CLASSES.EN_339_STRING,
PROFILE_5_CLASSES.EN_363_GEOGRAPHICAL_PLACE,
PROFILE_5_CLASSES.EN_364_GEOGRAPHICAL_PLACE_TYPE,
PROFILE_5_CLASSES.EN_365_APPELLATION_IN_A_LANGUAGE,
PROFILE_5_CLASSES.EN_441_CONSTRUCTION,
PROFILE_5_CLASSES.EN_444_SOCIAL_QUALITY_OF_AN_ACTOR,
PROFILE_5_CLASSES.EN_445_ARGUMENT,
PROFILE_5_CLASSES.EN_450_MANIFESTATION_SINGLETON_TYPE,
PROFILE_5_CLASSES.EN_452_TYPE_OF_MANIFESTATION_PRODUCT_TYPE,
PROFILE_5_CLASSES.EN_454_EXPRESSION_TYPE,
PROFILE_5_CLASSES.EN_455_GEOVISTORY_DIGITAL,
PROFILE_5_CLASSES.EN_456_CHUNK,
PROFILE_5_CLASSES.EN_457_SPOT,
PROFILE_5_CLASSES.EN_459_ARGUMENT_S_METHOD,
PROFILE_5_CLASSES.EN_502_WEB_REQUEST,
PROFILE_5_CLASSES.EN_503_EXPRESSION_PORTION,
PROFILE_5_CLASSES.EN_516_EXPRESSION_PORTION_TYPE,
PROFILE_5_CLASSES.EN_518_EXPRESSION_FRAGMENT,
PROFILE_5_CLASSES.EN_519_ITEM_TYPE,
PROFILE_5_CLASSES.EN_520_ENTITY_QUALITY_TYPE,
PROFILE_5_CLASSES.EN_521_CELL,
PROFILE_5_CLASSES.EN_607_WEB_REQUEST_TYPE,
PROFILE_5_CLASSES.EN_630_APPELLATION_IN_A_LANGUAGE_TYPE,
PROFILE_5_CLASSES.EN_635_TAG,
PROFILE_5_CLASSES.EN_657_REFERENCE,
PROFILE_5_CLASSES.EN_689_DURATION,
PROFILE_5_CLASSES.EN_690_TIME_UNIT,
PROFILE_5_CLASSES.EN_698_SOCIAL_ROLE,
PROFILE_5_CLASSES.EN_707_NUMERIC_DIMENSION,
PROFILE_5_CLASSES.EN_708_NUMERIC_DIMENSION_TYPE,
PROFILE_5_CLASSES.EN_783_UNIFORM_RESOURCE_LOCATOR_URL_,
PROFILE_5_CLASSES.EN_784_SHORT_TITLE,
PROFILE_5_CLASSES.EN_785_TEXT,
PROFILE_5_CLASSES.EN_827_IDENTIFIER_TYPE,
PROFILE_5_CLASSES.EN_867_ASSERTED_ACTOR_S_ROLE,
PROFILE_5_CLASSES.EN_868_PERSON_APPELLATION_IN_A_LANGUAGE,
PROFILE_5_CLASSES.EN_869_PERSON_APPELLATION_IN_A_LANGUAGE_TYPE,
PROFILE_5_CLASSES.EN_870_BIBLIOGRAPHIC_CITATION,
PROFILE_5_CLASSES.EN_871_CITATION_STYLE,
PROFILE_5_CLASSES.EN_872_BELONGING_TO_A_COLLECTION,
PROFILE_5_CLASSES.EN_873_COLLECTION_TYPE,
PROFILE_5_CLASSES.EN_874_MANIFESTATION_SINGLETON_APPELLATION_TYPE
    ],
    properties: [
      PROFILE_5_PROPERTIES.EN_219_1_870_IS_IDENTIFIED_BY,
PROFILE_5_PROPERTIES.EN_503_1_870_IS_IDENTIFIED_BY,
PROFILE_5_PROPERTIES.EN_2_4_50_HAS_TIME_SPAN,
PROFILE_5_PROPERTIES.EN_870_63_54_HAS_LANGUAGE,
PROFILE_5_PROPERTIES.EN_50_71_335_ONGOING_THROUGHOUT,
PROFILE_5_PROPERTIES.EN_50_72_335_AT_SOME_TIME_WITHIN,
PROFILE_5_PROPERTIES.EN_707_78_338_HAS_VALUE,
PROFILE_5_PROPERTIES.EN_516_115_516_HAS_BROADER_TERM,
PROFILE_5_PROPERTIES.EN_630_115_630_HAS_BROADER_TERM,
PROFILE_5_PROPERTIES.EN_635_115_635_HAS_BROADER_TERM,
PROFILE_5_PROPERTIES.EN_84_145_50_DURING,
PROFILE_5_PROPERTIES.EN_84_147_363_WAS_A_PRESENCE_OF,
PROFILE_5_PROPERTIES.EN_84_147_441_WAS_A_PRESENCE_OF,
PROFILE_5_PROPERTIES.EN_84_148_51_WAS_AT,
PROFILE_5_PROPERTIES.EN_50_150_335_END_OF_THE_BEGIN,
PROFILE_5_PROPERTIES.EN_50_151_335_BEGIN_OF_THE_END,
PROFILE_5_PROPERTIES.EN_50_152_335_BEGIN_OF_THE_BEGIN,
PROFILE_5_PROPERTIES.EN_50_153_335_END_OF_THE_END,
PROFILE_5_PROPERTIES.EN_218_979_219_CARRIERS_PROVIDED_BY,
PROFILE_5_PROPERTIES.EN_221_982_219_IS_EXAMPLE_OF,
PROFILE_5_PROPERTIES.EN_220_1016_218_IS_REPRESENTATIVE_MANIFESTATION_SINGLETON_FOR,
PROFILE_5_PROPERTIES.EN_363_1110_364_HAS_GEOGRAPHICAL_PLACE_TYPE,
PROFILE_5_PROPERTIES.EN_365_1111_1_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_41_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_71_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_218_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_219_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_220_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_221_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_234_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_363_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_364_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_445_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_450_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_452_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_454_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_455_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_456_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_457_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_502_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_503_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_516_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_518_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_519_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_520_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_521_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_607_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_630_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_635_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_657_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_783_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_784_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_785_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_867_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_868_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_869_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_870_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1111_872_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_868_1111_21_IS_APPELLATION_FOR_LANGUAGE_OF,
PROFILE_5_PROPERTIES.EN_365_1112_54_USED_IN_LANGUAGE,
PROFILE_5_PROPERTIES.EN_868_1112_54_USED_IN_LANGUAGE,
PROFILE_5_PROPERTIES.EN_365_1113_40_REFERS_TO_NAME,
PROFILE_5_PROPERTIES.EN_868_1113_40_REFERS_TO_NAME,
PROFILE_5_PROPERTIES.EN_220_1205_450_HAS_MANIFESTATION_SINGLETON_TYPE,
PROFILE_5_PROPERTIES.EN_219_1206_452_HAS_TYPE_OF_MANIFESTATION_PRODUCT_TYPE,
PROFILE_5_PROPERTIES.EN_218_1214_454_HAS_EXPRESSION_TYPE,
PROFILE_5_PROPERTIES.EN_455_1216_218_IS_REPRODUCTION_OF,
PROFILE_5_PROPERTIES.EN_445_1246_459_HAS_ARGUMENT_METHOD,
PROFILE_5_PROPERTIES.EN_218_1305_502_IS_SERVER_RESPONSE_TO_REQUEST,
PROFILE_5_PROPERTIES.EN_218_1316_221_HAS_CARRIER_PROVIDED_BY,
PROFILE_5_PROPERTIES.EN_503_1317_218_IS_PART_OF,
PROFILE_5_PROPERTIES.EN_503_1317_503_IS_PART_OF,
PROFILE_5_PROPERTIES.EN_518_1317_503_IS_PART_OF,
PROFILE_5_PROPERTIES.EN_503_1320_516_HAS_EXPRESSION_PORTION_TYPE,
PROFILE_5_PROPERTIES.EN_221_1321_519_HAS_ITEM_TYPE,
PROFILE_5_PROPERTIES.EN_502_1323_607_HAS_WEB_REQUEST_TYPE,
PROFILE_5_PROPERTIES.EN_1_1355_1_SAME_AS_ENTITY,
PROFILE_5_PROPERTIES.EN_365_1430_630_HAS_APPELLATION_FOR_LANGUAGE_TYPE,
PROFILE_5_PROPERTIES.EN_365_1430_874_HAS_APPELLATION_FOR_LANGUAGE_TYPE,
PROFILE_5_PROPERTIES.EN_868_1430_869_HAS_APPELLATION_FOR_LANGUAGE_TYPE,
PROFILE_5_PROPERTIES.EN_1_1440_635_TAGGED_BY,
PROFILE_5_PROPERTIES.EN_1_1499_1_HAS_TO_BE_MERGED_WITH,
PROFILE_5_PROPERTIES.EN_689_1612_690_HAS_TIME_UNIT,
PROFILE_5_PROPERTIES.EN_707_1635_708_HAS_NUMERIC_DIMENSION_TYPE,
PROFILE_5_PROPERTIES.EN_502_1760_783_HAS_WEB_ADDRESS,
PROFILE_5_PROPERTIES.EN_219_1761_784_HAS_SHORT_TITLE,
PROFILE_5_PROPERTIES.EN_220_1761_784_HAS_SHORT_TITLE,
PROFILE_5_PROPERTIES.EN_221_1761_784_HAS_SHORT_TITLE,
PROFILE_5_PROPERTIES.EN_502_1761_784_HAS_SHORT_TITLE,
PROFILE_5_PROPERTIES.EN_1_1762_785_HAS_DEFINITION,
PROFILE_5_PROPERTIES.EN_1_1763_785_HAS_COMMENT,
PROFILE_5_PROPERTIES.EN_41_1783_827_HAS_IDENTIFIER_TYPE,
PROFILE_5_PROPERTIES.EN_867_1837_21_IS_ROLE_OF,
PROFILE_5_PROPERTIES.EN_867_1838_503_IS_ASSERTED_BY,
PROFILE_5_PROPERTIES.EN_867_1839_444_IS_DEFINED_BY,
PROFILE_5_PROPERTIES.EN_867_1840_698_IS_QUALIFIED_BY,
PROFILE_5_PROPERTIES.EN_870_1841_871_HAS_STYLE,
PROFILE_5_PROPERTIES.EN_1_1842_41_SAME_AS_URI,
PROFILE_5_PROPERTIES.EN_41_1843_339_HAS_VALUE,
PROFILE_5_PROPERTIES.EN_783_1843_339_HAS_VALUE,
PROFILE_5_PROPERTIES.EN_870_1843_339_HAS_VALUE,
PROFILE_5_PROPERTIES.EN_872_1844_71_IS_ABOUT,
PROFILE_5_PROPERTIES.EN_872_1844_220_IS_ABOUT,
PROFILE_5_PROPERTIES.EN_872_1844_221_IS_ABOUT,
PROFILE_5_PROPERTIES.EN_872_1845_71_BELONGS_TO,
PROFILE_5_PROPERTIES.EN_71_1846_873_HAS_IDENTITY_DEFINING_TYPE
    ]
  }
  