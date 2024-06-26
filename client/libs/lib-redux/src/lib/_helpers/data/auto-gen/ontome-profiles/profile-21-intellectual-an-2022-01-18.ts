
  import {NewDfhApiClass, NewDfhApiProfile, NewDfhApiProperty, OntomeProfileMock} from '../gvDB/local-model.helpers';

  const PROFILE:NewDfhApiProfile = {
  "removed_from_api": false,
  "requested_language": "en",
  "dfh_pk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_project_label": "Intellectual and literary life (SDHSS)",
  "dfh_owned_by_project": 47,
  "dfh_profile_definition": "This profile gathers classes and properties that model general aspects of literary and intellectual life, like writing, publishing, corresponding, etc. ",
  "dfh_project_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_profile_definition_language": "en",
  "dfh_is_ongoing_forced_publication": true,
  "dfh_is_root_profile": false,
  "dfh_fk_root_profile": 38
}


  export namespace PROFILE_21_CLASSES {
    
  export const EN_21_PERSON:NewDfhApiClass = {
  "dfh_pk_class": 21,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Person",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
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
    

  export const EN_22_MAN_MADE_OBJECT:NewDfhApiClass = {
  "dfh_pk_class": 22,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Man-Made Object",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises physical objects purposely created by human activity.\r\nNo assumptions are made as to the extent of modification required to justify regarding an object as man-made. For example, an inscribed piece of rock or a preserved butterfly are both regarded as instances of E22 Man-Made Object.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E22",
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    19,
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
    

  export const EN_55_MATERIAL:NewDfhApiClass = {
  "dfh_pk_class": 55,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Material",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class is a specialization of E55 Type and comprises the concepts of materials.\r\nInstances of E57 Material may denote properties of matter before its use, during its use, and as incorporated in an object, such as ultramarine powder, tempera paste, reinforced concrete. Discrete pieces of raw-materials kept in museums, such as bricks, sheets of fabric, pieces of metal, should be modelled individually in the same way as other objects. Discrete used or processed pieces, such as the stones from Nefer Titi's temple, should be modelled as parts (cf. P46 is composed of).\r\nThis type is used categorically in the model without reference to instances of it, i.e. the Model does not foresee the description of instances of instances of E57 Material, e.g.: “instances of gold”.\r\nIt is recommended that internationally or nationally agreed codes and terminology are used.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E57",
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
    

  export const EN_68_GROUP:NewDfhApiClass = {
  "dfh_pk_class": 68,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Group",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
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
    

  export const EN_81_PROPOSITIONAL_OBJECT:NewDfhApiClass = {
  "dfh_pk_class": 81,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Propositional Object",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises immaterial items, including but not limited to stories, plots, procedural prescriptions, algorithms, laws of physics or images that are, or represent in some sense, sets of propositions about real or imaginary things and that are documented as single units or serve as topics of discourse.\r\nThis class also comprises items that are “about” something in the sense of a subject. In the wider sense, this class includes expressions of psychological value such as non-figural art and musical themes. However, conceptual items such as types and classes are not instances of E89 Propositional Object. This should not be confused with the definition of a type, which is indeed an instance of E89 Propositional Object.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E89",
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
    

  export const EN_217_WORK:NewDfhApiClass = {
  "dfh_pk_class": 217,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Work",
  "dfh_fk_namespace": 6,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_namespace_label": "FRBRoo version 2.4",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises distinct concepts or combinations of concepts identified in artistic and intellectual expressions, such as poems, stories or musical compositions. Such concepts may appear in the course of the coherent evolution of an original idea into one or more expressions that are dominated by the original idea. A Work may be elaborated by one or more Actors simultaneously or over time. The substance of Work is ideas. A Work may have members that are works in their own right.\r\nA Work can be either individual or complex. If it is individual its concept is completely realised in a single F22 Self-Contained Expression. If it is complex its concept is embedded in an F15 Complex Work. An F15 Complex Work consists of alternative members that are either F15 Complex Works themselves or F14 Individual Works.\r\nA Work is the product of an intellectual process of one or more persons, yet only indirect evidence about it is at our hands. This can be contextual information such as the existence of an order for a work, reflections of the creators themselves that are documented somewhere, and finally the expressions of the work created. As ideas normally take shape during discussion, elaboration and implementation, it is not reasonable to assume that a work starts with a complete concept. In some cases, it can be very difficult or impossible to define the whole of the concept of a work at a particular time. The objective evidence for such a notion can only be based on a stage of expressions at a given time. In this sense, the sets of ideas that constitute particular self-contained expressions may be regarded as a kind of “snap-shot” of a work.\r\nA Work may include the concept of aggregating expressions of other works into a new expression. For instance, an anthology of poems is regarded as a work in its own right that makes use of expressions of the individual poems that have been selected and ordered as part of an intellectual process. This does not make the contents of the aggregated expressions part of this work, but only parts of the resulting expression.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "F1",
  "dfh_profile_association_type": "inferred",
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
    

  export const EN_218_EXPRESSION:NewDfhApiClass = {
  "dfh_pk_class": 218,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Expression",
  "dfh_fk_namespace": 6,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
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
  "dfh_fk_profile": 21,
  "dfh_class_label": "Manifestation Product Type",
  "dfh_fk_namespace": 6,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
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
  "dfh_fk_profile": 21,
  "dfh_class_label": "Manifestation Singleton",
  "dfh_fk_namespace": 6,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
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
  "dfh_fk_profile": 21,
  "dfh_class_label": "Expression Creation",
  "dfh_fk_namespace": 6,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
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
    

  export const EN_363_GEOGRAPHICAL_PLACE:NewDfhApiClass = {
  "dfh_pk_class": 363,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Geographical Place",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
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
    

  export const EN_454_EXPRESSION_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 454,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Expression Type",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
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
    

  export const EN_503_EXPRESSION_PORTION:NewDfhApiClass = {
  "dfh_pk_class": 503,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Expression portion",
  "dfh_fk_namespace": 74,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
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
    

  export const EN_676_EXPRESSION_PUBLICATION_EVENT:NewDfhApiClass = {
  "dfh_pk_class": 676,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Expression Publication Event",
  "dfh_fk_namespace": 74,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class models the event of the publication of any kind of frbroo:E2 Expression (an illustrated text, musical scores, music on a DVD, etc.) on a medium produced in multiple exemplars, generally by replication with mechanical means. The publication date is considered as the one when the medium exemplars where made available to the public so that the symbolic content (text, music, drawings, etc.) can be viewed, or listened, by the public. The publication place is the geographical place where the copies of the medium first became public, or from where the exemplars of the publication where sent out, generally but not always the publisher's or printer's domicile.\r\nThe publisher or printer (person or group) are associated using the inherited crm:P14 carried out by property. If one wishes to express more precise roles for the editors, one can use the sdh-so:C15 Participation class providing specific social qualities or roles to the actors.\r\nBoth date and place can be different from the ones expressed in the book itself insofar as this class models the event of publication as such and not the bibliographical properties (metadata) that should be associated to the Manifestation Product Type – F3  class.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C1",
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
    

  export const EN_677_MAN_MADE_OBJECT_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 677,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Man-Made Object Type",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the E22 Man-Made Object class.",
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
    

  export const EN_689_DURATION:NewDfhApiClass = {
  "dfh_pk_class": 689,
  "dfh_basic_type": 10,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Duration",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
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
    

  export const EN_711_WEIGHT:NewDfhApiClass = {
  "dfh_pk_class": 711,
  "dfh_basic_type": 10,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Weight",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Region",
  "dfh_class_scope_note": "Amount a thing weighs",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C15",
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
    

  export const EN_712_WEIGHT_MEASUREMENT_UNIT:NewDfhApiClass = {
  "dfh_pk_class": 712,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Weight measurement unit",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "The measurement unit of weight, like pound, kilogram, etc.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C16",
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
    

  export const EN_716_VOLUME:NewDfhApiClass = {
  "dfh_pk_class": 716,
  "dfh_basic_type": 10,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Volume",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Region",
  "dfh_class_scope_note": "Amount of space that an object fills or a container has",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C20",
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    52
  ],
  "dfh_ancestor_classes": [
    1,
    214,
    539
  ]
}
    

  export const EN_721_PROCEDURE:NewDfhApiClass = {
  "dfh_pk_class": 721,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Procedure",
  "dfh_fk_namespace": 74,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "A particular way of accomplishing something expressed as a series of steps followed in a definite order. A procedure is modeled as a propositional object  because the emphasis is on its content, its steps and the elements they imply and not its formulation. This makes the main difference with the crm:Design or Procedure – E29 class. In other words, the same procedure could be expressed in different texts, with different formulations, or simply shared by oral tradition, which would be attested in different ways",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C4",
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
    

  export const EN_722_STEP:NewDfhApiClass = {
  "dfh_pk_class": 722,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Step",
  "dfh_fk_namespace": 74,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "A specific part of a procedure defining an action, proceeding, or measure occurring as one in a serie. This class models a proposition expressing the process of doing something in order to make something happen or to deal with a situation.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C5",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    721
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
    

  export const EN_723_COMPONENT:NewDfhApiClass = {
  "dfh_pk_class": 723,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Component",
  "dfh_fk_namespace": 74,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "A constituent part, an element or ingredient.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C6",
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
    

  export const EN_724_PROCEDURE_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 724,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Procedure type",
  "dfh_fk_namespace": 74,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts, often in form of verbs, used to characterize instances of the 'Procedure' class and to define their identity. A procedure can be about chemical production, or astronomical obervation, or performance of music with a specific instrument, etc.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C7",
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
    

  export const EN_725_STEP_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 725,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 21,
  "dfh_class_label": "Step type",
  "dfh_fk_namespace": 74,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts, often in form of verbs, used to characterize instances of the 'Step' class and define their identity.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C8",
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
  export namespace PROFILE_21_PROPERTIES {
    
  export const EN_244_13_21_CARRIED_OUT_BY:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 13,
  "dfh_property_label_language": "en",
  "dfh_property_label": "carried out by",
  "dfh_property_inverse_label": "performed",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property describes the active participation of an E39 Actor in an E7 Activity.\r\nIt implies causal or legal responsibility. The P14.1 in the role of property of the property allows the nature of an Actor’s participation to be specified.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 244,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 21,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P14",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    10
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_676_13_21_CARRIED_OUT_BY:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 13,
  "dfh_property_label_language": "en",
  "dfh_property_label": "carried out by",
  "dfh_property_inverse_label": "performed",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property describes the active participation of an E39 Actor in an E7 Activity.\r\nIt implies causal or legal responsibility. The P14.1 in the role of property of the property allows the nature of an Actor’s participation to be specified.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 676,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 21,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P14",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    10
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_676_13_68_CARRIED_OUT_BY:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 13,
  "dfh_property_label_language": "en",
  "dfh_property_label": "carried out by",
  "dfh_property_inverse_label": "performed",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property describes the active participation of an E39 Actor in an E7 Activity.\r\nIt implies causal or legal responsibility. The P14.1 in the role of property of the property allows the nature of an Actor’s participation to be specified.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 676,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 68,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P14",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    10
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_721_117_22_IS_ABOUT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 117,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is about",
  "dfh_property_inverse_label": "is subject of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property documents that an E89 Propositional Object has as subject an instance of E1 CRM Entity.\r\nThis differs from P67 refers to (is referred to by), which refers to an E1 CRM Entity, in that it describes the primary subject or subjects of an E89 Propositional Object.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 721,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 22,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P129",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    58
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_721_117_677_IS_ABOUT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 117,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is about",
  "dfh_property_inverse_label": "is subject of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property documents that an E89 Propositional Object has as subject an instance of E1 CRM Entity.\r\nThis differs from P67 refers to (is referred to by), which refers to an E1 CRM Entity, in that it describes the primary subject or subjects of an E89 Propositional Object.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 721,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 677,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P129",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    58
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_721_136_722_HAS_COMPONENT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 136,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has component",
  "dfh_property_inverse_label": "is component of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates an instance of E89 Propositional Object with a structural part of it that is by itself an instance of\n            E89 Propositional Object.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 721,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 722,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P148",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_722_136_722_HAS_COMPONENT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 136,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has component",
  "dfh_property_inverse_label": "is component of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates an instance of E89 Propositional Object with a structural part of it that is by itself an instance of\n            E89 Propositional Object.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 722,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 722,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P148",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
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
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    82
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_244_991_503_CREATED:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 991,
  "dfh_property_label_language": "en",
  "dfh_property_label": "created",
  "dfh_property_inverse_label": "was created by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the expression that was first externalised during a particular creation event with that particular creation\n\t\t\tevent.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 244,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 503,
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
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    82
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_676_991_218_CREATED:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 991,
  "dfh_property_label_language": "en",
  "dfh_property_label": "created",
  "dfh_property_inverse_label": "was created by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the expression that was first externalised during a particular creation event with that particular creation\n\t\t\tevent.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 676,
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
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
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
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    96
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_244_993_217_CREATED_A_REALISATION_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 993,
  "dfh_property_label_language": "en",
  "dfh_property_label": "created a realisation of",
  "dfh_property_inverse_label": "was realised through",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates an instance of F28 Expression Creation with the corresponding instance of F14 Individual Work or an instance\n\t\t\tof F15 Complex Work of which the corresponding instance of F14 Individual Work is a member.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 244,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 217,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "R19",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 6,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "FRBRoo version 2.4",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    15
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_218_1015_219_HAS_REPRESENTATIVE_MANIFESTATION_PRODUCT_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1015,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has representative manifestation product type",
  "dfh_property_inverse_label": "is representative manifestation product type for",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property identifies an instance of F3 Manifestation Product Type that has been chosen as the most characteristic Manifestation Product Type of the instance of F2 Expression of which it is a manifestation.\r\nIdentifying an instance of F3 Manifestation Product Type that is representative for an instance of F2 Expression makes it possible in turn to identify an instance of F2 Expression that is representative for an instance of F1 Work, and to decide what should be regarded as the title of the work.\r\nThe title of an Expression may not be one taken from a representative Manifestation Product Type or Manifestation Singleton.\r\nA given expression can have more than one Representative Manifestation Product Type.\r\nR41 has representative manifestation product type is a shortcut of the more developed path F2 Expression R48i was assigned by F41 Representative Manifestation Assignment R49 assigned F3 Manifestation Product Type.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 218,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 219,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "R41",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 6,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "FRBRoo version 2.4",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    979
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_676_1595_218_USED_SPECIFIC_EXPRESSION:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1595,
  "dfh_property_label_language": "en",
  "dfh_property_label": "used specific expression",
  "dfh_property_inverse_label": "was used for",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property identifies a specific instance of F2 Expression used in order to carry out an instance of C1 Print publication event.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 676,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 218,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P1",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    15
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_676_1596_219_CREATED_MANIFESTATION:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1596,
  "dfh_property_label_language": "en",
  "dfh_property_label": "created manifestation",
  "dfh_property_inverse_label": "was created by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property allows a F3 Manifestation Product Type to be linked to the C1 Print publication event that created it. The publication of a print brings virtually into existence the bibliographic reference intented as the identifying appellation of the collection of all exemplars created according to this model, in one edition of a work, i.e. a F3 Manifestation Product Type.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 676,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 219,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P2",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    82
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_676_1597_21_PUBLISHED_THE_WORK_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1597,
  "dfh_property_label_language": "en",
  "dfh_property_label": "published the work of",
  "dfh_property_inverse_label": "had his work published by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the publication with the author or authors of the printed expression, in the sense of the person(s) responsible for the intellectual content of the expression having been published. If one wishes to express more precise roles, one can use the sdh-so:C15 Participation class providing specific social qualities or roles to the actors.\r\nShortcut of: C1 Print publication event R19 created a realization of F1 Work R16 was initiated by F27 Work conception P14 carried out by E39 Actor P14.1 has role Author",
  "dfh_is_inherited": true,
  "dfh_property_domain": 676,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 21,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P3",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_676_1597_68_PUBLISHED_THE_WORK_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1597,
  "dfh_property_label_language": "en",
  "dfh_property_label": "published the work of",
  "dfh_property_inverse_label": "had his work published by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the publication with the author or authors of the printed expression, in the sense of the person(s) responsible for the intellectual content of the expression having been published. If one wishes to express more precise roles, one can use the sdh-so:C15 Participation class providing specific social qualities or roles to the actors.\r\nShortcut of: C1 Print publication event R19 created a realization of F1 Work R16 was initiated by F27 Work conception P14 carried out by E39 Actor P14.1 has role Author",
  "dfh_is_inherited": true,
  "dfh_property_domain": 676,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 68,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P3",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_244_1599_363_TOOK_PLACE_AT:NewDfhApiProperty = {
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
  "dfh_property_domain": 244,
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
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    7
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_676_1599_363_TOOK_PLACE_AT:NewDfhApiProperty = {
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
  "dfh_property_domain": 676,
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
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    7
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_711_1637_712_HAS_MEASUREMENT_UNIT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1637,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has measurement unit",
  "dfh_property_inverse_label": "is measurement unit of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates a weight with its measurement unit",
  "dfh_is_inherited": false,
  "dfh_property_domain": 711,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 712,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P13",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    79
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_722_1644_723_REQUIRES_THE_USE_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1644,
  "dfh_property_label_language": "en",
  "dfh_property_label": "requires the use of",
  "dfh_property_inverse_label": "is required by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates to the prodedure step the components that have to be used",
  "dfh_is_inherited": false,
  "dfh_property_domain": 722,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 723,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P6",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_723_1645_55_HAS_MATERIAL:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1645,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has material",
  "dfh_property_inverse_label": "is material of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Defines the material of the component",
  "dfh_is_inherited": false,
  "dfh_property_domain": 723,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 55,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P7",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_723_1646_716_HAS_VOLUME:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1646,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has volume",
  "dfh_property_inverse_label": "is volume of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates the volume of the component",
  "dfh_is_inherited": false,
  "dfh_property_domain": 723,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 716,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P8",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_721_1647_689_HAS_PLANNED_DURATION:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1647,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has planned duration",
  "dfh_property_inverse_label": "is planned duration of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates the planned or foreseen duration.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 721,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 689,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P9",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_722_1647_689_HAS_PLANNED_DURATION:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1647,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has planned duration",
  "dfh_property_inverse_label": "is planned duration of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates the planned or foreseen duration.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 722,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 689,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P9",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_723_1648_711_HAS_WEIGHT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1648,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has weight",
  "dfh_property_inverse_label": "is weight of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates the weight of the component",
  "dfh_is_inherited": false,
  "dfh_property_domain": 723,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 711,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P10",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_722_1649_722_SHALL_BE_PERFORMED_AFTER:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1649,
  "dfh_property_label_language": "en",
  "dfh_property_label": "shall be performed after",
  "dfh_property_inverse_label": "shall be performed before",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property indicates the order in which the steps of a procedure are to be carried out.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 722,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 722,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P11",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_722_1650_725_HAS_STEP_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1650,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has step type",
  "dfh_property_inverse_label": "is step type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates a step (an action) with the type which defines its identity, usually in the form of a verb",
  "dfh_is_inherited": false,
  "dfh_property_domain": 722,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 725,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P12",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_721_1651_724_HAS_PROCEDURE_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1651,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has procedure type",
  "dfh_property_inverse_label": "is procedure type",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates a procedure with the type which defines its identity.",
  "dfh_is_inherited": false,
  "dfh_property_domain": 721,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 724,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P13",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_722_1652_22_FORESEES_THE_USE_OF_SPECIFIC_OBJECT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1652,
  "dfh_property_label_language": "en",
  "dfh_property_label": "foresees the use of specific object",
  "dfh_property_inverse_label": "is foreseen for",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Modeled in a similar way as crm:P16 used specific object, this property specifies the tools, instruments, etc. to be used in a specific procedure step.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 722,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 22,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P14",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_722_1652_677_FORESEES_THE_USE_OF_SPECIFIC_OBJECT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1652,
  "dfh_property_label_language": "en",
  "dfh_property_label": "foresees the use of specific object",
  "dfh_property_inverse_label": "is foreseen for",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Modeled in a similar way as crm:P16 used specific object, this property specifies the tools, instruments, etc. to be used in a specific procedure step.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 722,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 677,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P14",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 74,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "Intellectual and Literary Life – ongoing (SDHSS)",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 21,
  "dfh_profile_label": "Intellectual and literary life",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    
  }


  export const PROFILE_21_INTELLECTUAL_AN_2022_01_18: OntomeProfileMock = {
    profile: PROFILE,
    classes: [
      PROFILE_21_CLASSES.EN_21_PERSON,
PROFILE_21_CLASSES.EN_22_MAN_MADE_OBJECT,
PROFILE_21_CLASSES.EN_55_MATERIAL,
PROFILE_21_CLASSES.EN_68_GROUP,
PROFILE_21_CLASSES.EN_81_PROPOSITIONAL_OBJECT,
PROFILE_21_CLASSES.EN_217_WORK,
PROFILE_21_CLASSES.EN_218_EXPRESSION,
PROFILE_21_CLASSES.EN_219_MANIFESTATION_PRODUCT_TYPE,
PROFILE_21_CLASSES.EN_220_MANIFESTATION_SINGLETON,
PROFILE_21_CLASSES.EN_244_EXPRESSION_CREATION,
PROFILE_21_CLASSES.EN_363_GEOGRAPHICAL_PLACE,
PROFILE_21_CLASSES.EN_454_EXPRESSION_TYPE,
PROFILE_21_CLASSES.EN_503_EXPRESSION_PORTION,
PROFILE_21_CLASSES.EN_676_EXPRESSION_PUBLICATION_EVENT,
PROFILE_21_CLASSES.EN_677_MAN_MADE_OBJECT_TYPE,
PROFILE_21_CLASSES.EN_689_DURATION,
PROFILE_21_CLASSES.EN_711_WEIGHT,
PROFILE_21_CLASSES.EN_712_WEIGHT_MEASUREMENT_UNIT,
PROFILE_21_CLASSES.EN_716_VOLUME,
PROFILE_21_CLASSES.EN_721_PROCEDURE,
PROFILE_21_CLASSES.EN_722_STEP,
PROFILE_21_CLASSES.EN_723_COMPONENT,
PROFILE_21_CLASSES.EN_724_PROCEDURE_TYPE,
PROFILE_21_CLASSES.EN_725_STEP_TYPE
    ],
    properties: [
      PROFILE_21_PROPERTIES.EN_244_13_21_CARRIED_OUT_BY,
PROFILE_21_PROPERTIES.EN_676_13_21_CARRIED_OUT_BY,
PROFILE_21_PROPERTIES.EN_676_13_68_CARRIED_OUT_BY,
PROFILE_21_PROPERTIES.EN_721_117_22_IS_ABOUT,
PROFILE_21_PROPERTIES.EN_721_117_677_IS_ABOUT,
PROFILE_21_PROPERTIES.EN_721_136_722_HAS_COMPONENT,
PROFILE_21_PROPERTIES.EN_722_136_722_HAS_COMPONENT,
PROFILE_21_PROPERTIES.EN_244_991_218_CREATED,
PROFILE_21_PROPERTIES.EN_244_991_503_CREATED,
PROFILE_21_PROPERTIES.EN_676_991_218_CREATED,
PROFILE_21_PROPERTIES.EN_244_992_220_CREATED,
PROFILE_21_PROPERTIES.EN_244_993_217_CREATED_A_REALISATION_OF,
PROFILE_21_PROPERTIES.EN_218_1015_219_HAS_REPRESENTATIVE_MANIFESTATION_PRODUCT_TYPE,
PROFILE_21_PROPERTIES.EN_676_1595_218_USED_SPECIFIC_EXPRESSION,
PROFILE_21_PROPERTIES.EN_676_1596_219_CREATED_MANIFESTATION,
PROFILE_21_PROPERTIES.EN_676_1597_21_PUBLISHED_THE_WORK_OF,
PROFILE_21_PROPERTIES.EN_676_1597_68_PUBLISHED_THE_WORK_OF,
PROFILE_21_PROPERTIES.EN_244_1599_363_TOOK_PLACE_AT,
PROFILE_21_PROPERTIES.EN_676_1599_363_TOOK_PLACE_AT,
PROFILE_21_PROPERTIES.EN_711_1637_712_HAS_MEASUREMENT_UNIT,
PROFILE_21_PROPERTIES.EN_722_1644_723_REQUIRES_THE_USE_OF,
PROFILE_21_PROPERTIES.EN_723_1645_55_HAS_MATERIAL,
PROFILE_21_PROPERTIES.EN_723_1646_716_HAS_VOLUME,
PROFILE_21_PROPERTIES.EN_721_1647_689_HAS_PLANNED_DURATION,
PROFILE_21_PROPERTIES.EN_722_1647_689_HAS_PLANNED_DURATION,
PROFILE_21_PROPERTIES.EN_723_1648_711_HAS_WEIGHT,
PROFILE_21_PROPERTIES.EN_722_1649_722_SHALL_BE_PERFORMED_AFTER,
PROFILE_21_PROPERTIES.EN_722_1650_725_HAS_STEP_TYPE,
PROFILE_21_PROPERTIES.EN_721_1651_724_HAS_PROCEDURE_TYPE,
PROFILE_21_PROPERTIES.EN_722_1652_22_FORESEES_THE_USE_OF_SPECIFIC_OBJECT,
PROFILE_21_PROPERTIES.EN_722_1652_677_FORESEES_THE_USE_OF_SPECIFIC_OBJECT
    ]
  }
  