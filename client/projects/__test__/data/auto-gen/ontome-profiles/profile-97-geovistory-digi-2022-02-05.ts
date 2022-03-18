
  import {NewDfhApiClass, NewDfhApiProfile, NewDfhApiProperty, OntomeProfileMock} from '../gvDB/local-model.helpers';

  const PROFILE:NewDfhApiProfile = {
  "removed_from_api": false,
  "requested_language": "en",
  "dfh_pk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_project_label": "Geovistory",
  "dfh_owned_by_project": 6,
  "dfh_profile_definition": "This profile contains classes and properties used for the treatment of Digitals in Geovistory. They will later be moved to the profile Geovistory Basics.",
  "dfh_project_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_profile_definition_language": "en",
  "dfh_is_ongoing_forced_publication": true,
  "dfh_is_root_profile": false,
  "dfh_fk_root_profile": 96
}


  export namespace PROFILE_97_CLASSES {
    
  export const EN_1_CRM_ENTITY:NewDfhApiClass = {
  "dfh_pk_class": 1,
  "dfh_basic_type": 0,
  "dfh_fk_profile": 97,
  "dfh_class_label": "CRM Entity",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
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
    

  export const EN_54_LANGUAGE:NewDfhApiClass = {
  "dfh_pk_class": 54,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 97,
  "dfh_class_label": "Language",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
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
    

  export const EN_218_EXPRESSION:NewDfhApiClass = {
  "dfh_pk_class": 218,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 97,
  "dfh_class_label": "Expression",
  "dfh_fk_namespace": 6,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
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
    

  export const EN_219_MANIFESTATION_PRODUCT_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 219,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 97,
  "dfh_class_label": "Manifestation Product Type",
  "dfh_fk_namespace": 6,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_namespace_label": "FRBRoo version 2.4",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises the definitions of publication products.\r\nAn instance of F3 Manifestation Product Type is the “species”, and all copies of a given object are “specimens” of it. An instance of F3 Manifestation Product Type defines all of the features or traits that instances of F5 Item normally display in order that they may be recognised as copies of a particular publication. However, due to production problems or subsequent events, one or more instances of F5 Item may not exhibit all these features or traits; yet such instances still retain their relationship to the same instance of F3 Manifestation Product Type.\r\nThe features that characterise a given instance of F3 Manifestation Product Type include: one instance of F24 Publication Expression, containing one or more than one instance of F2 Expression, reflecting the authors’ content of the manifestation and all additional input by the publisher; and the appropriate types of physical features for that form of the object. For example, hardcover and paperback are two distinct publications (i.e. two distinct instances of F3 Manifestation Product Type) even though authorial and editorial content are otherwise identical in both publications. The activity of cataloguing aims at the most accurate listing of features or traits of an instance of F3 Manifestation Product Type that are sufficient to distinguish it from another instance of F3 Manifestation Product Type.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "F3",
  "dfh_profile_association_type": "inferred",
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
  "dfh_fk_profile": 97,
  "dfh_class_label": "Manifestation Singleton",
  "dfh_fk_namespace": 6,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
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
    

  export const EN_221_ITEM:NewDfhApiClass = {
  "dfh_pk_class": 221,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 97,
  "dfh_class_label": "Item",
  "dfh_fk_namespace": 6,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_namespace_label": "FRBRoo version 2.4",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises physical objects (printed books, scores, CDs, DVDs, CD-ROMS, etc.) that carry a F24 Publication Expression and\n\t\t\twere produced by an industrial process involving an F3 Manifestation Product Type. ",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "F5",
  "dfh_profile_association_type": "inferred",
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
  "dfh_fk_profile": 97,
  "dfh_class_label": "Serial Work",
  "dfh_fk_namespace": 6,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_namespace_label": "FRBRoo version 2.4",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises works that are, or have been, planned to result in sequences of Expressions or Manifestations with common features. Whereas a work can acquire new members during the time it evolves, Expressions and Manifestations are identified with a certain state achieved at a particular point in time. Therefore there is in general no single Expression or Manifestation representing a complete serial work, unless the serial work has ended.\r\nSerial Works may or may not have a plan for an overall expression.\r\nThe retrospective reprinting of all issues of a Serial Work at once, in the form of a monograph, is regarded to be another member of a Complex Work, which contains the Serial Work and the Individual Work realised in the monograph. This does not make the monograph part of the Serial Work.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "F18",
  "dfh_profile_association_type": "inferred",
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
    

  export const EN_339_STRING:NewDfhApiClass = {
  "dfh_pk_class": 339,
  "dfh_basic_type": 0,
  "dfh_fk_profile": 97,
  "dfh_class_label": "String",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
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
    

  export const EN_456_CHUNK:NewDfhApiClass = {
  "dfh_pk_class": 456,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 97,
  "dfh_class_label": "Chunk",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "Chunks are intended here in the sense of NLP, i.e. as the result of shallow parsing or chunking: a sentence is analyzed with the aim of identifying constituent parts of sentences (nouns, verbs, adjectives, etc.) and then of linking them to higher order units that have discrete grammatical meanings (noun groups or phrases, verb groups, etc.). Chunks are therefore groups of tokens, generally below the sentence level. They can be used to identify noun phrases, especially in the process of named entities recognition",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C2",
  "dfh_profile_association_type": "inferred",
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
    

  export const EN_502_WEB_REQUEST:NewDfhApiClass = {
  "dfh_pk_class": 502,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 97,
  "dfh_class_label": "Web Request",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class models a web request in form of a URI/URL/SPARQL query etc. sent into the web in the sense of a \"message describing an atomic operation to be carried out in the context of a specified resource\" (Web Characterization Terminology & Definitions Sheet). Sending a web request into the web will produce, if the corresponding resource exists, a web response in the form of an HTML document, a picture, a RDF graph or an error message.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C4",
  "dfh_profile_association_type": "inferred",
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
  "dfh_fk_profile": 97,
  "dfh_class_label": "Expression portion",
  "dfh_fk_namespace": 74,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "The instances of this class are portions or sections of expressions defined by a user. Usually they correspond to a recognizable structure in the document but they can also be arbitrarily defined. Therefore the identity of the portion is provided by the definition adopted by the user in order to cut it out.\r\nIf an expression or expression portion is split on different carriers (e.g. the first part of the copy of a letter is found in the end of volume I and the second part of the copy in the beginning of volume II) then the portion is related to both volumes as carriers of the one relevant expression. In this case the Expression portion will be associated as part of two different Expression instances",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C2",
  "dfh_profile_association_type": "inferred",
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
    

  export const EN_521_CELL:NewDfhApiClass = {
  "dfh_pk_class": 521,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 97,
  "dfh_class_label": "Cell",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "A cell in a table in a database",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C7",
  "dfh_profile_association_type": "inferred",
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
    

  export const EN_657_REFERENCE:NewDfhApiClass = {
  "dfh_pk_class": 657,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 97,
  "dfh_class_label": "Reference",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "Description of the location of a segment within a larger unit, such as the page reference within a book.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C11",
  "dfh_profile_association_type": "inferred",
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
    

  export const EN_784_SHORT_TITLE:NewDfhApiClass = {
  "dfh_pk_class": 784,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 97,
  "dfh_class_label": "Short title",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "An abbreviated form of an appellation or name by which an entity is commonly known and cited, contrasting with the full one which is more descriptive but is too long to be of use in most purposes.\r\nA short title should be used as metadata in the information system while the full appellation is the historical or identifying one.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C15",
  "dfh_profile_association_type": "inferred",
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
  "dfh_fk_profile": 97,
  "dfh_class_label": "Text",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
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
    

  export const EN_898_TABLE:NewDfhApiClass = {
  "dfh_pk_class": 898,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 97,
  "dfh_class_label": "Table",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "\r\n\r\nInstances of this class are all the tables created by Geovistory users.\r\n\r\n",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C18",
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
    

  export const EN_899_DEFINITION:NewDfhApiClass = {
  "dfh_pk_class": 899,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 97,
  "dfh_class_label": "Definition",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "A definition, being an instance of this class, is a text describing an entity with the aim to best identify the entity, i.e. to distinguish it from others.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C19",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    785
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    32,
    64,
    65,
    66,
    67,
    70,
    81,
    82,
    214,
    455,
    517
  ]
}
    

  export const EN_900_COMMENT:NewDfhApiClass = {
  "dfh_pk_class": 900,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 97,
  "dfh_class_label": "Comment",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "A comment is an expression about an entity or the work related to that entity made by a geovistory user. It may address the team colleagues of that user or the public audience.  ",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C20",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    785
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    32,
    64,
    65,
    66,
    67,
    70,
    81,
    82,
    214,
    455,
    517
  ]
}
    

  export const EN_903_TEXT_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 903,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 97,
  "dfh_class_label": "Text type",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "The type of a text.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C23",
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
    

  export const EN_904_COMMENT_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 904,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 97,
  "dfh_class_label": "Comment type",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "Type of a comment.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C24",
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
    

  export const EN_933_ANNOTATION_IN_TEXT:NewDfhApiClass = {
  "dfh_pk_class": 933,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 97,
  "dfh_class_label": "Annotation in Text",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This is a subclass of annotation and restricted to annotations in quill texts, as used in geovistory.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C26",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    932
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    64,
    65,
    70,
    81,
    214
  ]
}
    

  export const EN_934_ANNOTATION_IN_TABLE:NewDfhApiClass = {
  "dfh_pk_class": 934,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 97,
  "dfh_class_label": "Annotation in Table",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This subclass is needed in order to provide the correct inherited properties for the production of annotations in tables.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C27",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    932
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    64,
    65,
    70,
    81,
    214
  ]
}
    

  export const EN_935_MENTIONING:NewDfhApiClass = {
  "dfh_pk_class": 935,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 97,
  "dfh_class_label": "Mentioning",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "A mentioning is connecting an entity with a target, that mentions the entity. The target may be one out of: Expression Portion, Manifestation Singleton, Manifestation Product Type, Web Request, Serial Work, Item. \r\nIt has been a decided to connect Manifestation Singleton, Manifestation Product Type, Web Request, Serial Work, Item directly, instead of the F2 Expression, for usability reasons in Geovistory.  \r\nIn order describe, where the entity is mentioned within the target, there is a property to a reference that allows to describe the location in free text.\r\nThis class is similar to the annotation class of the Web Annotation Vocabulary: the property to the mentioned entity corresponds to hasBody, the properties to the target and the reference correspond to hasTarget.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C28",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    932
  ],
  "dfh_ancestor_classes": [
    1,
    27,
    64,
    65,
    70,
    81,
    214
  ]
}
    

  export const EN_936_TABLE_VALUE:NewDfhApiClass = {
  "dfh_pk_class": 936,
  "dfh_basic_type": 0,
  "dfh_fk_profile": 97,
  "dfh_class_label": "Table Value",
  "dfh_fk_namespace": 30,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_basic_type_label": null,
  "dfh_class_scope_note": "The value of a table containing all cells organized in columns and rows.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C29",
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    337
  ],
  "dfh_ancestor_classes": [
    214
  ]
}
    
  }
  export namespace PROFILE_97_PROPERTIES {
    
  export const EN_785_63_54_HAS_LANGUAGE:NewDfhApiProperty = {
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
  "dfh_property_domain": 785,
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
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_898_63_54_HAS_LANGUAGE:NewDfhApiProperty = {
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
  "dfh_property_domain": 898,
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
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_899_63_54_HAS_LANGUAGE:NewDfhApiProperty = {
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
  "dfh_property_domain": 899,
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
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_900_63_54_HAS_LANGUAGE:NewDfhApiProperty = {
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
  "dfh_property_domain": 900,
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
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_785_1216_218_IS_REPRODUCTION_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1216,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is reproduction of",
  "dfh_property_inverse_label": "has reproduction",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates a digital objet with the source expression (i.e. the symbolic and propositional content it is a source of) it is a reproduction of. The  many to many cardinality is the consequence of the possibility to reproduce different sources at the same time, e.g. different version of a handwritten document in a critical edition.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 785,
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
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    146
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_785_1216_503_IS_REPRODUCTION_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1216,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is reproduction of",
  "dfh_property_inverse_label": "has reproduction",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates a digital objet with the source expression (i.e. the symbolic and propositional content it is a source of) it is a reproduction of. The  many to many cardinality is the consequence of the possibility to reproduce different sources at the same time, e.g. different version of a handwritten document in a critical edition.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 785,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 503,
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
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    146
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_898_1216_218_IS_REPRODUCTION_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1216,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is reproduction of",
  "dfh_property_inverse_label": "has reproduction",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates a digital objet with the source expression (i.e. the symbolic and propositional content it is a source of) it is a reproduction of. The  many to many cardinality is the consequence of the possibility to reproduce different sources at the same time, e.g. different version of a handwritten document in a critical edition.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 898,
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
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    146
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_898_1216_503_IS_REPRODUCTION_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1216,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is reproduction of",
  "dfh_property_inverse_label": "has reproduction",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates a digital objet with the source expression (i.e. the symbolic and propositional content it is a source of) it is a reproduction of. The  many to many cardinality is the consequence of the possibility to reproduce different sources at the same time, e.g. different version of a handwritten document in a critical edition.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 898,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 503,
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
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    146
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_521_1334_502_REFERS_TO:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1334,
  "dfh_property_label_language": "en",
  "dfh_property_label": "refers to",
  "dfh_property_inverse_label": "is referred to by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property indicates that a digital object as a whole, i.e. its propositional and symbolic content, refers as a whole to one and only one entity. As a general rule this property applies to a digital object fragment like a cell, chunk or spot.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 521,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 502,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P9",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1218
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_785_1761_784_HAS_SHORT_TITLE:NewDfhApiProperty = {
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
  "dfh_property_domain": 785,
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
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_898_1761_784_HAS_SHORT_TITLE:NewDfhApiProperty = {
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
  "dfh_property_domain": 898,
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
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_899_1761_784_HAS_SHORT_TITLE:NewDfhApiProperty = {
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
  "dfh_property_domain": 899,
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
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_1_1762_899_HAS_DEFINITION:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1762,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has definition",
  "dfh_property_inverse_label": "is definition of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates to an entity a definition which describes the essential elements allowing its identification",
  "dfh_is_inherited": true,
  "dfh_property_domain": 1,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 899,
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
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1766
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_1_1763_900_HAS_COMMENT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1763,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has comment",
  "dfh_property_inverse_label": "is comment about",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property adds a comment about the entity in natural language allowing humans to add any kind of remark, note or even discussion about the entity.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 1,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 900,
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
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1766
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_785_1864_339_HAS_VALUE_VERSION:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1864,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has value version",
  "dfh_property_inverse_label": "is value version of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property (a data property in OWL) provides the symbolic content, i.e. the string, to the text class. Since texts are usually created and reworked in a redactional process, multiple versions of the same text may exist. This property allows to provide multiple string versions to the same text (e.g. with multiple data properties in OWL). It is a question of implementation, how to order these version in historical chronology and how to express, what the current version is.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 785,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 339,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P20",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_899_1864_339_HAS_VALUE_VERSION:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1864,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has value version",
  "dfh_property_inverse_label": "is value version of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property (a data property in OWL) provides the symbolic content, i.e. the string, to the text class. Since texts are usually created and reworked in a redactional process, multiple versions of the same text may exist. This property allows to provide multiple string versions to the same text (e.g. with multiple data properties in OWL). It is a question of implementation, how to order these version in historical chronology and how to express, what the current version is.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 899,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 339,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P20",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_900_1864_339_HAS_VALUE_VERSION:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1864,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has value version",
  "dfh_property_inverse_label": "is value version of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property (a data property in OWL) provides the symbolic content, i.e. the string, to the text class. Since texts are usually created and reworked in a redactional process, multiple versions of the same text may exist. This property allows to provide multiple string versions to the same text (e.g. with multiple data properties in OWL). It is a question of implementation, how to order these version in historical chronology and how to express, what the current version is.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 900,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 339,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P20",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_785_1865_903_HAS_TEXT_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1865,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has text type",
  "dfh_property_inverse_label": "is text type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates a Text with the type which defines its identity",
  "dfh_is_inherited": false,
  "dfh_property_domain": 785,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 903,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P21",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_900_1866_904_HAS_COMMENT_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1866,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has comment type",
  "dfh_property_inverse_label": "is comment type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property has the same intension as the has type P2 property but the extension of domain/range classes is different.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 900,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 904,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P22",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_933_1872_785_IS_ANNOTATED_IN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1872,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is annotated in",
  "dfh_property_inverse_label": "has annotation",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Relates an annotation with the digital, it is annotating.\r\nThis is similar to the property hasTarget (IRI: http://www.w3.org/ns/oa#hasTarget) of the Web Annotation Vocabulary.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 933,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 785,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P23",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_933_1872_899_IS_ANNOTATED_IN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1872,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is annotated in",
  "dfh_property_inverse_label": "has annotation",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Relates an annotation with the digital, it is annotating.\r\nThis is similar to the property hasTarget (IRI: http://www.w3.org/ns/oa#hasTarget) of the Web Annotation Vocabulary.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 933,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 899,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P23",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_933_1872_900_IS_ANNOTATED_IN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1872,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is annotated in",
  "dfh_property_inverse_label": "has annotation",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Relates an annotation with the digital, it is annotating.\r\nThis is similar to the property hasTarget (IRI: http://www.w3.org/ns/oa#hasTarget) of the Web Annotation Vocabulary.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 933,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 900,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P23",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_934_1872_898_IS_ANNOTATED_IN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1872,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is annotated in",
  "dfh_property_inverse_label": "has annotation",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Relates an annotation with the digital, it is annotating.\r\nThis is similar to the property hasTarget (IRI: http://www.w3.org/ns/oa#hasTarget) of the Web Annotation Vocabulary.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 934,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 898,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P23",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_933_1874_456_AT_POSITION:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1874,
  "dfh_property_label_language": "en",
  "dfh_property_label": "at position",
  "dfh_property_inverse_label": "is spot of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Relates an annotation with the spot (the exact position like a string in a text, cell in a table, a spot on an image) it is annotating. How the spot is defined, is up to the implementation.\r\nThis is similar to the property hasTarget (IRI: http://www.w3.org/ns/oa#hasTarget) and the different types of Selectors of the Web Annotation Vocabulary.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 933,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 456,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P24",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_934_1874_521_AT_POSITION:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1874,
  "dfh_property_label_language": "en",
  "dfh_property_label": "at position",
  "dfh_property_inverse_label": "is spot of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Relates an annotation with the spot (the exact position like a string in a text, cell in a table, a spot on an image) it is annotating. How the spot is defined, is up to the implementation.\r\nThis is similar to the property hasTarget (IRI: http://www.w3.org/ns/oa#hasTarget) and the different types of Selectors of the Web Annotation Vocabulary.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 934,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 521,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P24",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_933_1875_1_ANNOTATED_ENTITY:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1875,
  "dfh_property_label_language": "en",
  "dfh_property_label": "annotated entity",
  "dfh_property_inverse_label": "is annotated by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Relates an annotation with the entity, it refers to.\r\nThis is similar to the property hasBody (IRI: http://www.w3.org/ns/oa#hasBody) of the Web Annotation Vocabulary.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 933,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 1,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P25",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_934_1875_1_ANNOTATED_ENTITY:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1875,
  "dfh_property_label_language": "en",
  "dfh_property_label": "annotated entity",
  "dfh_property_inverse_label": "is annotated by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Relates an annotation with the entity, it refers to.\r\nThis is similar to the property hasBody (IRI: http://www.w3.org/ns/oa#hasBody) of the Web Annotation Vocabulary.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 934,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 1,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P25",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_935_1876_1_MENTIONS:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1876,
  "dfh_property_label_language": "en",
  "dfh_property_label": "mentions",
  "dfh_property_inverse_label": "is mentioned in",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Relates a mentioning with the entity, it mentions.\r\nThis is similar to the property hasBody (IRI: http://www.w3.org/ns/oa#hasBody) of the Web Annotation Vocabulary.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 935,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 1,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P26",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_935_1877_219_IS_MENTIONED_IN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1877,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is mentioned in",
  "dfh_property_inverse_label": "mentions",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Relates a mentioning with the target, that mentions the entity.\r\nThis is similar to the property hasTarget (IRI: http://www.w3.org/ns/oa#hasTarget) of the Web Annotation Vocabulary.\r\nREMARK: The range class should be F2 Expression, but for usability reasons it has been decided to select the source classes directly.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 935,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 219,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P27",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_935_1877_220_IS_MENTIONED_IN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1877,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is mentioned in",
  "dfh_property_inverse_label": "mentions",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Relates a mentioning with the target, that mentions the entity.\r\nThis is similar to the property hasTarget (IRI: http://www.w3.org/ns/oa#hasTarget) of the Web Annotation Vocabulary.\r\nREMARK: The range class should be F2 Expression, but for usability reasons it has been decided to select the source classes directly.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 935,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 220,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P27",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_935_1877_221_IS_MENTIONED_IN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1877,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is mentioned in",
  "dfh_property_inverse_label": "mentions",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Relates a mentioning with the target, that mentions the entity.\r\nThis is similar to the property hasTarget (IRI: http://www.w3.org/ns/oa#hasTarget) of the Web Annotation Vocabulary.\r\nREMARK: The range class should be F2 Expression, but for usability reasons it has been decided to select the source classes directly.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 935,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 221,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P27",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_935_1877_234_IS_MENTIONED_IN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1877,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is mentioned in",
  "dfh_property_inverse_label": "mentions",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Relates a mentioning with the target, that mentions the entity.\r\nThis is similar to the property hasTarget (IRI: http://www.w3.org/ns/oa#hasTarget) of the Web Annotation Vocabulary.\r\nREMARK: The range class should be F2 Expression, but for usability reasons it has been decided to select the source classes directly.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 935,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 234,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P27",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_935_1877_502_IS_MENTIONED_IN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1877,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is mentioned in",
  "dfh_property_inverse_label": "mentions",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Relates a mentioning with the target, that mentions the entity.\r\nThis is similar to the property hasTarget (IRI: http://www.w3.org/ns/oa#hasTarget) of the Web Annotation Vocabulary.\r\nREMARK: The range class should be F2 Expression, but for usability reasons it has been decided to select the source classes directly.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 935,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 502,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P27",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_935_1877_503_IS_MENTIONED_IN:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1877,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is mentioned in",
  "dfh_property_inverse_label": "mentions",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Relates a mentioning with the target, that mentions the entity.\r\nThis is similar to the property hasTarget (IRI: http://www.w3.org/ns/oa#hasTarget) of the Web Annotation Vocabulary.\r\nREMARK: The range class should be F2 Expression, but for usability reasons it has been decided to select the source classes directly.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 935,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 503,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P27",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_935_1878_657_AT_POSITION:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1878,
  "dfh_property_label_language": "en",
  "dfh_property_label": "at position",
  "dfh_property_inverse_label": "(inverse of) at position",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Relates a mentioning with a description of the exact position of the mentioning.\r\nThis is similar to the property hasTarget (IRI: http://www.w3.org/ns/oa#hasTarget) and the different types of Selectors of the Web Annotation Vocabulary.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 935,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 657,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P28",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_898_1879_936_HAS_VALUE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1879,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has value",
  "dfh_property_inverse_label": "is value of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property (a data property in OWL) provides the symbolic content, i.e. the table with all it cells organized in rows and columns, to the table class.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 898,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 936,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P29",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 30,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Geovistory (ongoing)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 97,
  "dfh_profile_label": "Geovistory Digitals (Temporary) ongoing",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    
  }


  export const PROFILE_97_GEOVISTORY_DIGI_2022_02_05: OntomeProfileMock = {
    profile: PROFILE,
    classes: [
      PROFILE_97_CLASSES.EN_1_CRM_ENTITY,
PROFILE_97_CLASSES.EN_54_LANGUAGE,
PROFILE_97_CLASSES.EN_218_EXPRESSION,
PROFILE_97_CLASSES.EN_219_MANIFESTATION_PRODUCT_TYPE,
PROFILE_97_CLASSES.EN_220_MANIFESTATION_SINGLETON,
PROFILE_97_CLASSES.EN_221_ITEM,
PROFILE_97_CLASSES.EN_234_SERIAL_WORK,
PROFILE_97_CLASSES.EN_339_STRING,
PROFILE_97_CLASSES.EN_456_CHUNK,
PROFILE_97_CLASSES.EN_502_WEB_REQUEST,
PROFILE_97_CLASSES.EN_503_EXPRESSION_PORTION,
PROFILE_97_CLASSES.EN_521_CELL,
PROFILE_97_CLASSES.EN_657_REFERENCE,
PROFILE_97_CLASSES.EN_784_SHORT_TITLE,
PROFILE_97_CLASSES.EN_785_TEXT,
PROFILE_97_CLASSES.EN_898_TABLE,
PROFILE_97_CLASSES.EN_899_DEFINITION,
PROFILE_97_CLASSES.EN_900_COMMENT,
PROFILE_97_CLASSES.EN_903_TEXT_TYPE,
PROFILE_97_CLASSES.EN_904_COMMENT_TYPE,
PROFILE_97_CLASSES.EN_933_ANNOTATION_IN_TEXT,
PROFILE_97_CLASSES.EN_934_ANNOTATION_IN_TABLE,
PROFILE_97_CLASSES.EN_935_MENTIONING,
PROFILE_97_CLASSES.EN_936_TABLE_VALUE
    ],
    properties: [
      PROFILE_97_PROPERTIES.EN_785_63_54_HAS_LANGUAGE,
PROFILE_97_PROPERTIES.EN_898_63_54_HAS_LANGUAGE,
PROFILE_97_PROPERTIES.EN_899_63_54_HAS_LANGUAGE,
PROFILE_97_PROPERTIES.EN_900_63_54_HAS_LANGUAGE,
PROFILE_97_PROPERTIES.EN_785_1216_218_IS_REPRODUCTION_OF,
PROFILE_97_PROPERTIES.EN_785_1216_503_IS_REPRODUCTION_OF,
PROFILE_97_PROPERTIES.EN_898_1216_218_IS_REPRODUCTION_OF,
PROFILE_97_PROPERTIES.EN_898_1216_503_IS_REPRODUCTION_OF,
PROFILE_97_PROPERTIES.EN_521_1334_502_REFERS_TO,
PROFILE_97_PROPERTIES.EN_785_1761_784_HAS_SHORT_TITLE,
PROFILE_97_PROPERTIES.EN_898_1761_784_HAS_SHORT_TITLE,
PROFILE_97_PROPERTIES.EN_899_1761_784_HAS_SHORT_TITLE,
PROFILE_97_PROPERTIES.EN_1_1762_899_HAS_DEFINITION,
PROFILE_97_PROPERTIES.EN_1_1763_900_HAS_COMMENT,
PROFILE_97_PROPERTIES.EN_785_1864_339_HAS_VALUE_VERSION,
PROFILE_97_PROPERTIES.EN_899_1864_339_HAS_VALUE_VERSION,
PROFILE_97_PROPERTIES.EN_900_1864_339_HAS_VALUE_VERSION,
PROFILE_97_PROPERTIES.EN_785_1865_903_HAS_TEXT_TYPE,
PROFILE_97_PROPERTIES.EN_900_1866_904_HAS_COMMENT_TYPE,
PROFILE_97_PROPERTIES.EN_933_1872_785_IS_ANNOTATED_IN,
PROFILE_97_PROPERTIES.EN_933_1872_899_IS_ANNOTATED_IN,
PROFILE_97_PROPERTIES.EN_933_1872_900_IS_ANNOTATED_IN,
PROFILE_97_PROPERTIES.EN_934_1872_898_IS_ANNOTATED_IN,
PROFILE_97_PROPERTIES.EN_933_1874_456_AT_POSITION,
PROFILE_97_PROPERTIES.EN_934_1874_521_AT_POSITION,
PROFILE_97_PROPERTIES.EN_933_1875_1_ANNOTATED_ENTITY,
PROFILE_97_PROPERTIES.EN_934_1875_1_ANNOTATED_ENTITY,
PROFILE_97_PROPERTIES.EN_935_1876_1_MENTIONS,
PROFILE_97_PROPERTIES.EN_935_1877_219_IS_MENTIONED_IN,
PROFILE_97_PROPERTIES.EN_935_1877_220_IS_MENTIONED_IN,
PROFILE_97_PROPERTIES.EN_935_1877_221_IS_MENTIONED_IN,
PROFILE_97_PROPERTIES.EN_935_1877_234_IS_MENTIONED_IN,
PROFILE_97_PROPERTIES.EN_935_1877_502_IS_MENTIONED_IN,
PROFILE_97_PROPERTIES.EN_935_1877_503_IS_MENTIONED_IN,
PROFILE_97_PROPERTIES.EN_935_1878_657_AT_POSITION,
PROFILE_97_PROPERTIES.EN_898_1879_936_HAS_VALUE
    ]
  }
  