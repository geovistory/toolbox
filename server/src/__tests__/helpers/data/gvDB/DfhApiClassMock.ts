import {DfhApiClass} from '../../atomic/dfh-api-class.helper';

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
}



/**
 * SQL to create mock items
 */
// SELECT jsonb_pretty(jsonb_build_object(
//   'pk_entity',pk_entity,
//   'tmsp_last_modification', tmsp_last_modification,
//   'dfh_pk_class',dfh_pk_class,
//   'dfh_class_identifier_in_namespace',dfh_class_identifier_in_namespace,
//   'dfh_class_label_language',dfh_class_label_language,
//   'dfh_class_label',dfh_class_label,
//   'dfh_class_scope_note_language',dfh_class_scope_note_language,
//   'dfh_class_scope_note',dfh_class_scope_note,
//   'dfh_basic_type',dfh_basic_type,
//   'dfh_basic_type_label',dfh_basic_type_label,
//   'dfh_fk_namespace',dfh_fk_namespace,
//   'dfh_namespace_label_language',dfh_namespace_label_language,
//   'dfh_namespace_label',dfh_namespace_label,
//   'dfh_namespace_uri',dfh_namespace_uri,
//   'dfh_profile_association_type',dfh_profile_association_type,
//   'dfh_fk_profile',dfh_fk_profile,
//   'dfh_profile_label_language',dfh_profile_label_language,
//   'dfh_profile_label',dfh_profile_label
//   ))
//   FROM data_for_history.api_class t1
//   WHERE dfh_pk_class = 365
//   AND dfh_profile_association_type='selected'
