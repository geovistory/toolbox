import {DfhApiClass} from "./local-model.helpers"

export class DfhApiClassMock {
  static readonly EN_365_NAMING: DfhApiClass = {
    "pk_entity": 3737,
    "dfh_pk_class": 365,
    "dfh_basic_type": 9,
    "dfh_fk_profile": 5,
    "dfh_class_label": "Appellation in a language (time-indexed)",
    "dfh_fk_namespace": 3,
    "dfh_namespace_uri": null,
    "dfh_profile_label": "Geovistory Basics",
    "dfh_namespace_label": "HistDMI generic classes and properties – ongoing",
    "dfh_basic_type_label": "Temporal Entity",
    "dfh_class_scope_note": "This class refers to the fact that an entity (actor, group, concept, etc.) can be identified using a specific appellation in a language during a given time span.The class does not refer to the activity of continously or repetedly naming an entity with this specific appellation but to the possibility of identifying the entity with the given appellation in a given language.\r\nThe appellation is in this sense a property of the entity at given time and for a given language. The FRBRoo class F52_Name_Use_Activity models the activity actually carried out by a person or a group to use a given appellation, which is a distinct phenomenon. F52_Name_Use_Activity is a subclass of activity while the present class is about the given possibility (by use or by law) of using an appellation for identifying a given entity.",
    "tmsp_last_modification": "2020-07-15T14:27:09.844581+00:00",
    "dfh_class_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_namespace_label_language": "en",
    "dfh_profile_association_type": "selected",
    "dfh_class_scope_note_language": "en",
    "dfh_class_identifier_in_namespace": "C10"
  }

  static readonly EN_523_SHIP_VOYAGE: DfhApiClass = {
    "pk_entity": 3809,
    "dfh_pk_class": 523,
    "dfh_basic_type": 9,
    "dfh_fk_profile": 8,
    "dfh_class_label": "Ship voyage",
    "dfh_fk_namespace": 66,
    "dfh_namespace_uri": null,
    "dfh_profile_label": "Maritime history",
    "dfh_namespace_label": "Maritime history ongoing",
    "dfh_basic_type_label": "Temporal Entity",
    "dfh_class_scope_note": "Used to denote a (long) journey, especially by ship, going from a place of departure to a place of arrival.",
    "tmsp_last_modification": "2020-01-05T07:40:56.599142+00:00",
    "dfh_class_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_namespace_label_language": "en",
    "dfh_profile_association_type": "selected",
    "dfh_class_scope_note_language": "en",
    "dfh_class_identifier_in_namespace": "C1"
  }


  static readonly EN_21_PERSON: DfhApiClass = {
    "pk_entity": 3650,
    "dfh_pk_class": 21,
    "dfh_basic_type": 8,
    "dfh_fk_profile": 4,
    "dfh_class_label": "Person",
    "dfh_fk_namespace": 1,
    "dfh_namespace_uri": null,
    "dfh_profile_label": "Geovistory Generic Historical Information Profile",
    "dfh_namespace_label": "CIDOC CRM version 6.2",
    "dfh_basic_type_label": "Persistent Item",
    "dfh_class_scope_note": "This class comprises real persons who live or are assumed to have lived. Legendary figures that may have existed, such as Ulysses and\n            King Arthur, fall into this class if the documentation refers to them as historical figures. In cases where doubt exists as to whether\n            several persons are in fact identical, multiple instances can be created and linked to indicate their relationship. The CRM does not\n            propose a specific form to support reasoning about possible identity. ",
    "tmsp_last_modification": "2020-07-15T14:27:17.710051+00:00",
    "dfh_class_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_namespace_label_language": "en",
    "dfh_profile_association_type": "selected",
    "dfh_class_scope_note_language": "en",
    "dfh_class_identifier_in_namespace": "E21"
  }

  static readonly EN_40_APPELLATION: DfhApiClass = {
    "pk_entity": 3726,
    "dfh_pk_class": 40,
    "dfh_basic_type": 8,
    "dfh_fk_profile": 5,
    "dfh_class_label": "Appellation",
    "dfh_fk_namespace": 1,
    "dfh_namespace_uri": null,
    "dfh_profile_label": "Geovistory Basics",
    "dfh_namespace_label": "CIDOC CRM version 6.2",
    "dfh_basic_type_label": "Persistent Item",
    "dfh_class_scope_note": "This class comprises signs, either meaningful or not, or arrangements of signs following a specific syntax, that are used or can be\n            used to refer to and identify a specific instance of some class or category within a certain context. Instances of E41 Appellation do not\n            identify things by their meaning, even if they happen to have one, but instead by convention, tradition, or agreement. Instances of E41\n            Appellation are cultural constructs; as such, they have a context, a history, and a use in time and space by some group of users. A given\n            instance of E41 Appellation can have alternative forms, i.e., other instances of E41 Appellation that are always regarded as equivalent\n            independent from the thing it denotes. Specific subclasses of E41 Appellation should be used when instances of E41 Appellation of a\n            characteristic form are used for particular objects. Instances of E49 Time Appellation, for example, which take the form of instances of\n            E50 Date, can be easily recognised. E41 Appellation should not be confused with the act of naming something. Cf. E15 Identifier Assignment ",
    "tmsp_last_modification": "2020-07-15T14:27:09.844581+00:00",
    "dfh_class_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_namespace_label_language": "en",
    "dfh_profile_association_type": "selected",
    "dfh_class_scope_note_language": "en",
    "dfh_class_identifier_in_namespace": "E41"
  }

  static readonly EN_364_GEO_PLACE_TYPE: DfhApiClass = {
    "pk_entity": 3664,
    "dfh_pk_class": 364,
    "dfh_basic_type": 30,
    "dfh_fk_profile": 4,
    "dfh_class_label": "Geographical place type",
    "dfh_fk_namespace": 3,
    "dfh_namespace_uri": null,
    "dfh_profile_label": "Geovistory Generic Historical Information Profile",
    "dfh_namespace_label": "CIDOC CRM Generic Extension for Historical Data Management and Interoperability, ongoing",
    "dfh_basic_type_label": "Type (controlled vocabulary)",
    "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the 'hictC8 Geographical place'.",
    "tmsp_last_modification": "2020-03-07T11:47:40.970195+00:00",
    "dfh_class_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_namespace_label_language": "en",
    "dfh_profile_association_type": "selected",
    "dfh_class_scope_note_language": "en",
    "dfh_class_identifier_in_namespace": "histC9"
  }

  static readonly EN_363_GEO_PLACE: DfhApiClass = {
    "pk_entity": 3663,
    "dfh_pk_class": 363,
    "dfh_basic_type": 8,
    "dfh_fk_profile": 4,
    "dfh_class_label": "Geographical Place",
    "dfh_fk_namespace": 3,
    "dfh_namespace_uri": null,
    "dfh_profile_label": "Geovistory Generic Historical Information Profile",
    "dfh_namespace_label": "CIDOC CRM Generic Extension for Historical Data Management and Interoperability, ongoing",
    "dfh_basic_type_label": "Persistent Item",
    "dfh_class_scope_note": "This class refers to portions of the surface of the Earth intended as constellations of matter which can be represented by photographs, paintings and maps. The relevant portion of the surface of the Earth can be covered by water (river, sea, ...). The more specific identity of instances of this class is provided by a controlled vocabulary of geographical place types.",
    "tmsp_last_modification": "2020-03-07T11:47:40.970195+00:00",
    "dfh_class_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_namespace_label_language": "en",
    "dfh_profile_association_type": "selected",
    "dfh_class_scope_note_language": "en",
    "dfh_class_identifier_in_namespace": "histC8"
  }
  static readonly EN_335_TIME_PRIMITIVE: DfhApiClass = {
    "pk_entity": 3735,
    "dfh_pk_class": 335,
    "dfh_basic_type": 0,
    "dfh_fk_profile": 5,
    "dfh_class_label": "Time Primitive",
    "dfh_fk_namespace": 1,
    "dfh_namespace_uri": null,
    "dfh_profile_label": "Geovistory Basics",
    "dfh_namespace_label": "CIDOC CRM version 6.2",
    "dfh_basic_type_label": null,
    "dfh_class_scope_note": "This class comprises instances of E59 Primitive Value for time that should be implemented with appropriate validation, precision and interval logic to express date ranges relevant to cultural documentation. \r\n \r\nE61 Time Primitive is not further elaborated upon within the model.",
    "tmsp_last_modification": "2020-01-27T08:03:07.706645+00:00",
    "dfh_class_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_namespace_label_language": "en",
    "dfh_profile_association_type": "inferred",
    "dfh_class_scope_note_language": "",
    "dfh_class_identifier_in_namespace": "E61"
  }

  static readonly EN_61_BIRTH: DfhApiClass = {
    "pk_entity": 3652,
    "dfh_pk_class": 61,
    "dfh_basic_type": 9,
    "dfh_fk_profile": 4,
    "dfh_class_label": "Birth",
    "dfh_fk_namespace": 1,
    "dfh_namespace_uri": null,
    "dfh_profile_label": "Geovistory Generic Historical Information Profile",
    "dfh_namespace_label": "CIDOC CRM version 6.2",
    "dfh_basic_type_label": "Temporal Entity",
    "dfh_class_scope_note": "This class comprises the births of human beings. E67 Birth is a biological event focussing on the context of people coming into life.\n            (E63 Beginning of Existence comprises the coming into life of any living beings). Twins, triplets etc. are brought into life by the same\n            E67 Birth event. The introduction of the E67 Birth event as a documentation element allows the description of a range of family\n            relationships in a simple model. Suitable extensions may describe more details and the complexity of motherhood with the intervention of\n            modern medicine. In this model, the biological father is not seen as a necessary participant in the E67 Birth event. ",
    "tmsp_last_modification": "2020-07-15T14:27:17.710051+00:00",
    "dfh_class_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_namespace_label_language": "en",
    "dfh_profile_association_type": "inferred",
    "dfh_class_scope_note_language": "en",
    "dfh_class_identifier_in_namespace": "E67"
  }

  static readonly EN_633_UNION: DfhApiClass = {
    "pk_entity": 3909,
    "dfh_pk_class": 633,
    "dfh_basic_type": 9,
    "dfh_fk_profile": 12,
    "dfh_class_label": "Union",
    "dfh_fk_namespace": 112,
    "dfh_namespace_uri": null,
    "dfh_profile_label": "Biographical basics and family",
    "dfh_namespace_label": "Social and economic life (HistDMI) ongoing",
    "dfh_basic_type_label": "Temporal Entity",
    "dfh_class_scope_note": "[under construction] This class models the fact of the union of two persons for a certain period of time, which may give rise to the birth of children.It is inspired by the GEDCOM modeling used by genealogists (http://fr.wikipedia.org/wiki/Norme_GEDCOM): the \"Union\" class indicates the existence over time of a couple, to which births, adoptions, etc. can be linked. The class \"Union\" models all kinds of relationships, regardless of their legal, emotional or social form, and indicates the time span of their duration (start/end date). Same-sex unions are also to be encoded with this class. A type is used to specify the nature of the union (marriage, common-law union, etc.).\r\n[deprecated and to be replaced by characteristic] If a union has several phases, with successive time spans, we create several instances of the class 'Union', with their respective type and time-span, then we associate them to a global union, for the whole duration of the union by using the property is component of (has component) – histP29 .",
    "tmsp_last_modification": "2020-08-29T07:16:38.971896+00:00",
    "dfh_class_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_namespace_label_language": "en",
    "dfh_profile_association_type": "selected",
    "dfh_class_scope_note_language": "en",
    "dfh_class_identifier_in_namespace": "C9"
  }

  static readonly EN_219_MANIFESTATION_PRODUCT_TYPE: DfhApiClass = {
    "pk_entity": 3732,
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
    "tmsp_last_modification": "2020-07-21T15:41:15.55671+00:00",
    "dfh_class_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_namespace_label_language": "en",
    "dfh_profile_association_type": "selected",
    "dfh_class_scope_note_language": "en",
    "dfh_class_identifier_in_namespace": "F3"
  }

  static readonly EN_220_MANIFESTATION_SINGLETON: DfhApiClass = {
    "pk_entity": 3733,
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
    "tmsp_last_modification": "2020-07-21T15:41:15.55671+00:00",
    "dfh_class_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_namespace_label_language": "en",
    "dfh_profile_association_type": "selected",
    "dfh_class_scope_note_language": "en",
    "dfh_class_identifier_in_namespace": "F4"
  }

  static readonly EN_450_MANIFESTATION_SINGLETON_TYPE: DfhApiClass = {
    "pk_entity": 3740,
    "dfh_pk_class": 450,
    "dfh_basic_type": 30,
    "dfh_fk_profile": 5,
    "dfh_class_label": "Manifestation singleton type",
    "dfh_fk_namespace": 110,
    "dfh_namespace_uri": null,
    "dfh_profile_label": "Geovistory Basics",
    "dfh_namespace_label": "CIDOC CRM supplement (HistDMI) ongoing",
    "dfh_basic_type_label": "Type (controlled vocabulary)",
    "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of 'F4 Manifestation Singleton'.",
    "tmsp_last_modification": "2020-12-21T20:45:14.592171+00:00",
    "dfh_class_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_namespace_label_language": "en",
    "dfh_profile_association_type": "selected",
    "dfh_class_scope_note_language": "en",
    "dfh_class_identifier_in_namespace": "C10"
  }
  static readonly EN_452_TYPE_OF_MANIFESTATION_PRODUCT_TYPE: DfhApiClass = {
    "pk_entity": 3741,
    "dfh_pk_class": 452,
    "dfh_basic_type": 30,
    "dfh_fk_profile": 5,
    "dfh_class_label": "Type of manifestation product type",
    "dfh_fk_namespace": 110,
    "dfh_namespace_uri": null,
    "dfh_profile_label": "Geovistory Basics",
    "dfh_namespace_label": "HistTypes ongoing",
    "dfh_basic_type_label": "Type (controlled vocabulary)",
    "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the Manifestation Product Type – F3 class.",
    "tmsp_last_modification": "2020-07-21T15:41:15.55671+00:00",
    "dfh_class_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_namespace_label_language": "en",
    "dfh_profile_association_type": "selected",
    "dfh_class_scope_note_language": "en",
    "dfh_class_identifier_in_namespace": "C19"
  }
  static readonly EN_218_EXPRESSION: DfhApiClass = {
    "pk_entity": 3731,
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
    "tmsp_last_modification": "2020-07-21T15:41:15.55671+00:00",
    "dfh_class_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_namespace_label_language": "en",
    "dfh_profile_association_type": "selected",
    "dfh_class_scope_note_language": "en",
    "dfh_class_identifier_in_namespace": "F2"
  }
  static readonly EN_244_EXPRESSION_CREATION: DfhApiClass = {
    "pk_entity": 3661,
    "dfh_pk_class": 244,
    "dfh_basic_type": 9,
    "dfh_fk_profile": 4,
    "dfh_class_label": "Expression Creation",
    "dfh_fk_namespace": 6,
    "dfh_namespace_uri": null,
    "dfh_profile_label": "Geovistory Generic Historical Information Profile",
    "dfh_namespace_label": "FRBRoo version 2.4",
    "dfh_basic_type_label": "Temporal Entity",
    "dfh_class_scope_note": "This class comprises activities that result in instances of F2 Expression coming into existence. This class characterises the\n\t\t\texternalisation of an Individual Work. Although F2 Expression is an abstract entity, a conceptual object, the creation of an expression\n\t\t\tinevitably also affects the physical world: when you scribble the first draft of a poem on a sheet of paper, you produce an instance of F4\n\t\t\tManifestation Singleton; F28 Expression Creation is a subclass of E12 Production because the recording of the expression causes a physical\n\t\t\tmodification of the carrying E18 Physical Thing. The work becomes manifest by being expressed on a physical carrier different from the\n\t\t\tcreator’s brain. The spatio-temporal circumstances under which the expression is created are necessarily the same spatio-temporal\n\t\t\tcircumstances under which the first instance of F4 Manifestation Singleton is produced. The mechanisms through which oral tradition (of\n\t\t\tmyths, tales, music, etc.) operates are not further investigated in this model. As far as bibliographic practice is concerned, only those\n\t\t\tinstances of F2 Expression that are externalised on physical carriers other than both the creator’s brain and the auditor’s brain are\n\t\t\ttaken into account (for a discussion of the modelling of oral traditions, see: Nicolas, Yann. ‘Folklore Requirements for Bibliographic\n\t\t\tRecords: oral traditions and FRBR.’ In: Cataloging Classification Quarterly (2005). Vol. 39, No. 3-4. P. 179-195). It is possible to use\n\t\t\tthe P2 has type (is type of) property in order to specify that the creation of a given expression of a given work played a particular role\n\t\t\twith regard to the overall bibliographic history of that work (e.g., that it was the creation of the progenitor expression on which all\n\t\t\tother expressions of the same work are based; or that it was the creation of the critical edition that served as the basis for canonical\n\t\t\treferences to the work). ",
    "tmsp_last_modification": "2020-11-19T08:56:59.307795+00:00",
    "dfh_class_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_namespace_label_language": "en",
    "dfh_profile_association_type": "selected",
    "dfh_class_scope_note_language": "en",
    "dfh_class_identifier_in_namespace": "F28"
  }

  static readonly EN_784_SHORT_TITLE: DfhApiClass = {
    "pk_entity": 8422,
    "dfh_pk_class": 784,
    "dfh_basic_type": 0,
    "dfh_fk_profile": 5,
    "dfh_class_label": "Short title",
    "dfh_fk_namespace": 30,
    "dfh_namespace_uri": null,
    "dfh_profile_label": "Geovistory Basics",
    "dfh_namespace_label": "Geovistory (ongoing)",
    "dfh_basic_type_label": null,
    "dfh_class_scope_note": "An abbreviated form of an appellation or name by which an entity is commonly known and cited, contrasting with the full one which is more descriptive but is too long to be of use in most purposes.\r\nA short title should be used as metadata in the information system while the full appellation is the historical or identifying one.",
    "tmsp_last_modification": "2020-12-21T20:45:14.592171+00:00",
    "dfh_class_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_namespace_label_language": "en",
    "dfh_profile_association_type": "selected",
    "dfh_class_scope_note_language": "en",
    "dfh_class_identifier_in_namespace": "C15"
  }

  static readonly EN_785_TEXT: DfhApiClass = {
    "pk_entity": 8528,
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
    "tmsp_last_modification": "2020-12-21T20:45:14.592171+00:00",
    "dfh_class_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_namespace_label_language": "en",
    "dfh_profile_association_type": "selected",
    "dfh_class_scope_note_language": "en",
    "dfh_class_identifier_in_namespace": "C16"
  }

  static readonly EN_51_PLACE: DfhApiClass = {
    "pk_entity": 3728,
    "dfh_pk_class": 51,
    "dfh_basic_type": 10,
    "dfh_fk_profile": 5,
    "dfh_class_label": "Place",
    "dfh_fk_namespace": 1,
    "dfh_namespace_uri": null,
    "dfh_profile_label": "Geovistory Basics",
    "dfh_namespace_label": "CIDOC CRM version 6.2",
    "dfh_basic_type_label": "Region",
    "dfh_class_scope_note": "This class comprises extents in space, in particular on the surface of the earth, in the pure sense of physics: independent from\r\n            temporal phenomena and matter. The instances of E53 Place are usually determined by reference to the position of “immobile” objects such\r\n            as buildings, cities, mountains, rivers, or dedicated geodetic marks. A Place can be determined by combining a frame of reference and a\r\n            location with respect to this frame. It may be identified by one or more instances of E44 Place Appellation. It is sometimes argued that\r\n            instances of E53 Place are best identified by global coordinates or absolute reference systems. However, relative references are often\r\n            more relevant in the context of cultural documentation and tend to be more precise. In particular, we are often interested in position in\r\n            relation to large, mobile objects, such as ships. For example, the Place at which Nelson died is known with reference to a large mobile\r\n            object – H.M.S Victory. A resolution of this Place in terms of absolute coordinates would require knowledge of the movements of the vessel\r\n            and the precise time of death, either of which may be revised, and the result would lack historical and cultural relevance. Any object can\r\n            serve as a frame of reference for E53 Place determination. The model foresees the notion of a \"section\" of an E19 Physical Object as a\r\n            valid E53 Place determination.",
    "tmsp_last_modification": "2020-12-21T20:45:14.592171+00:00",
    "dfh_class_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_namespace_label_language": "en",
    "dfh_profile_association_type": "inferred",
    "dfh_class_scope_note_language": "en",
    "dfh_class_identifier_in_namespace": "E53"
  }

  static readonly EN_84_PRESENCE: DfhApiClass = {
    "pk_entity": 3730,
    "dfh_pk_class": 84,
    "dfh_basic_type": 10,
    "dfh_fk_profile": 5,
    "dfh_class_label": "Presence",
    "dfh_fk_namespace": 1,
    "dfh_namespace_uri": null,
    "dfh_profile_label": "Geovistory Basics",
    "dfh_namespace_label": "CIDOC CRM version 6.2",
    "dfh_basic_type_label": "Region",
    "dfh_class_scope_note": "This class comprises instances of E92 Spacetime Volume that result from intersection of instances of E92 Spacetime Volume with an\n            instance of E52 Time-Span. The identity of an instance of this class is determined by the identities of the constituing spacetime volume\n            and the time-span. This class can be used to define temporal snapshots at a particular time-span, such as the extent of the Roman Empire\n            at 33 B.C., or the extent occupied by a museum object at rest in an exhibit. In particular, it can be used to define the spatial\n            projection of a spacetime volume during a particular time-span, such as the maximal spatial extent of a flood at some particular hour, or\n            all areas covered by the Poland within the 20th century AD. ",
    "tmsp_last_modification": "2020-12-21T20:45:14.592171+00:00",
    "dfh_class_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_namespace_label_language": "en",
    "dfh_profile_association_type": "selected",
    "dfh_class_scope_note_language": "en",
    "dfh_class_identifier_in_namespace": "E93"
  }

  static readonly EN_50_TIME_SPAN: DfhApiClass = {
    "pk_entity": 3727,
    "dfh_pk_class": 50,
    "dfh_basic_type": 10,
    "dfh_fk_profile": 5,
    "dfh_class_label": "Time-Span",
    "dfh_fk_namespace": 1,
    "dfh_namespace_uri": null,
    "dfh_profile_label": "Geovistory Basics",
    "dfh_namespace_label": "CIDOC CRM version 6.2",
    "dfh_basic_type_label": "Region",
    "dfh_class_scope_note": "This class comprises abstract temporal extents, in the sense of Galilean physics, having a beginning, an end and a duration. Time\n            Span has no other semantic connotations. Time-Spans are used to define the temporal extent of instances of E4 Period, E5 Event and any\n            other phenomena valid for a certain time. An E52 Time-Span may be identified by one or more instances of E49 Time Appellation. Since our\n            knowledge of history is imperfect, instances of E52 Time-Span can best be considered as approximations of the actual Time-Spans of\n            temporal entities. The properties of E52 Time-Span are intended to allow these approximations to be expressed precisely. An extreme case\n            of approximation, might, for example, define an E52 Time-Span having unknown beginning, end and duration. Used as a common E52 Time-Span\n            for two events, it would nevertheless define them as being simultaneous, even if nothing else was known. Automatic processing and querying\n            of instances of E52 Time-Span is facilitated if data can be parsed into an E61 Time Primitive. ",
    "tmsp_last_modification": "2020-12-21T20:45:14.592171+00:00",
    "dfh_class_label_language": "en",
    "dfh_profile_label_language": "en",
    "dfh_namespace_label_language": "en",
    "dfh_profile_association_type": "selected",
    "dfh_class_scope_note_language": "en",
    "dfh_class_identifier_in_namespace": "E52"
  }
}



/**
 * SQL to create mock items
 */

// SELECT concat(
// 	'static readonly ',
// 	UPPER(dfh_class_label_language),
// 	'_',
// 	dfh_pk_class,
// 	'_',
// 	UPPER(REPLACE (dfh_class_label, ' ', '_')),
// 	': DfhApiClass = ',
// 	jsonb_pretty(jsonb_build_object(
//    'pk_entity',pk_entity,
//    'tmsp_last_modification', tmsp_last_modification,
//    'dfh_pk_class',dfh_pk_class,
//    'dfh_class_identifier_in_namespace',dfh_class_identifier_in_namespace,
//    'dfh_class_label_language',dfh_class_label_language,
//    'dfh_class_label',dfh_class_label,
//    'dfh_class_scope_note_language',dfh_class_scope_note_language,
//    'dfh_class_scope_note',dfh_class_scope_note,
//    'dfh_basic_type',dfh_basic_type,
//    'dfh_basic_type_label',dfh_basic_type_label,
//    'dfh_fk_namespace',dfh_fk_namespace,
//    'dfh_namespace_label_language',dfh_namespace_label_language,
//    'dfh_namespace_label',dfh_namespace_label,
//    'dfh_namespace_uri',dfh_namespace_uri,
//    'dfh_profile_association_type',dfh_profile_association_type,
//    'dfh_fk_profile',dfh_fk_profile,
//    'dfh_profile_label_language',dfh_profile_label_language,
//    'dfh_profile_label',dfh_profile_label
//    )))
//    FROM data_for_history.api_class t1
//    WHERE dfh_pk_class = 84
//    AND dfh_profile_association_type='selected'
