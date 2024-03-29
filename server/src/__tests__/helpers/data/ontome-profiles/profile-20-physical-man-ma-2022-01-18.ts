
  import {NewDfhApiClass, NewDfhApiProfile, NewDfhApiProperty, OntomeProfileMock} from '../gvDB/local-model.helpers';

  const PROFILE:NewDfhApiProfile = {
  "removed_from_api": false,
  "requested_language": "en",
  "dfh_pk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_project_label": "Semantic Data for Humanities and Social Sciences (SDHSS)",
  "dfh_owned_by_project": 8,
  "dfh_profile_definition": "This profile collects classes and properties useful for describing physical objects, their properties and evolution in space and in time",
  "dfh_project_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_profile_definition_language": "en",
  "dfh_is_ongoing_forced_publication": true,
  "dfh_is_root_profile": false,
  "dfh_fk_root_profile": 43
}


  export namespace PROFILE_20_CLASSES {
    
  export const EN_12_PRODUCTION:NewDfhApiClass = {
  "dfh_pk_class": 12,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Production",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class comprises activities that are designed to, and succeed in, creating one or more new items.\r\nIt specializes the notion of modification into production. The decision as to whether or not an object is regarded as new is context sensitive. Normally, items are considered “new” if there is no obvious overall similarity between them and the consumed items and material used in their production. In other cases, an item is considered “new” because it becomes relevant to documentation by a modification. For example, the scribbling of a name on a potsherd may make it a voting token. The original potsherd may not be worth documenting, in contrast to the inscribed one.\r\nThis entity can be collective: the printing of a thousand books, for example, would normally be considered a single event.\r\nAn event should also be documented using E81 Transformation if it results in the destruction of one or more objects and the simultaneous production of others using parts or material from the originals. In this case, the new items have separate identities and matter is preserved, but identity is not.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E12",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    11,
    57,
    382
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
    

  export const EN_21_PERSON:NewDfhApiClass = {
  "dfh_pk_class": 21,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Person",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
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
  "dfh_fk_profile": 20,
  "dfh_class_label": "Man-Made Object",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises physical objects purposely created by human activity.\r\nNo assumptions are made as to the extent of modification required to justify regarding an object as man-made. For example, an inscribed piece of rock or a preserved butterfly are both regarded as instances of E22 Man-Made Object.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E22",
  "dfh_profile_association_type": "selected",
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
    

  export const EN_24_MAN_MADE_FEATURE:NewDfhApiClass = {
  "dfh_pk_class": 24,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Man-Made Feature",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises physical features that are purposely created by human activity, such as scratches, artificial caves, artificial water channels, etc.\r\nNo assumptions are made as to the extent of modification required to justify regarding a feature as man-made. For example, rock art or even “cup and ring” carvings on bedrock a regarded as types of E25 Man-Made Feature.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E25",
  "dfh_profile_association_type": "inferred",
  "dfh_parent_classes": [
    23,
    25,
    385
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
    

  export const EN_53_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 53,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Type",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of CRM classes. Instances of E55 Type represent concepts in contrast to instances of E41 Appellation which are used to name instances of CRM classes.\r\nE55 Type is the CRM’s interface to domain specific ontologies and thesauri. These can be represented in the CRM as subclasses of E55 Type, forming hierarchies of terms, i.e. instances of E55 Type linked via P127 has broader term (has narrower term). Such hierarchies may be extended with additional properties.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E55",
  "dfh_profile_association_type": "inferred",
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
    

  export const EN_55_MATERIAL:NewDfhApiClass = {
  "dfh_pk_class": 55,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Material",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class is a specialization of E55 Type and comprises the concepts of materials.\r\nInstances of E57 Material may denote properties of matter before its use, during its use, and as incorporated in an object, such as ultramarine powder, tempera paste, reinforced concrete. Discrete pieces of raw-materials kept in museums, such as bricks, sheets of fabric, pieces of metal, should be modelled individually in the same way as other objects. Discrete used or processed pieces, such as the stones from Nefer Titi's temple, should be modelled as parts (cf. P46 is composed of).\r\nThis type is used categorically in the model without reference to instances of it, i.e. the Model does not foresee the description of instances of instances of E57 Material, e.g.: “instances of gold”.\r\nIt is recommended that internationally or nationally agreed codes and terminology are used.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E57",
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
    

  export const EN_72_PART_ADDITION:NewDfhApiClass = {
  "dfh_pk_class": 72,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Part Addition",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class comprises activities that result in an instance of E24 Physical Man-Made Thing being increased, enlarged or augmented by the addition of a part.\r\nTypical scenarios include the attachment of an accessory, the integration of a component, the addition of an element to an aggregate object, or the accessioning of an object into a curated E78 Collection. Objects to which parts are added are, by definition, man-made, since the addition of a part implies a human activity. Following the addition of parts, the resulting man-made assemblages are treated objectively as single identifiable wholes, made up of constituent or component parts bound together either physically (for example the engine becoming a part of the car), or by sharing a common purpose (such as the 32 chess pieces that make up a chess set). This class of activities forms a basis for reasoning about the history and continuity of identity of objects that are integrated into other objects over time, such as precious gemstones being repeatedly incorporated into different items of jewellery, or cultural artifacts being added to different museum instances of E78 Collection over their lifespan.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E79",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    11
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
    

  export const EN_73_PART_REMOVAL:NewDfhApiClass = {
  "dfh_pk_class": 73,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Part Removal",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class comprises the activities that result in an instance of E18 Physical Thing being decreased by the removal of a part.\r\nTypical scenarios include the detachment of an accessory, the removal of a component or part of a composite object, or the deaccessioning of an object from a curated E78 Collection. If the E80 Part Removal results in the total decomposition of the original object into pieces, such that the whole ceases to exist, the activity should instead be modelled as an E81 Transformation, i.e. a simultaneous destruction and production. In cases where the part removed has no discernible identity prior to its removal but does have an identity subsequent to its removal, the activity should be regarded as both E80 Part Removal and E12 Production. This class of activities forms a basis for reasoning about the history, and continuity of identity over time, of objects that are removed from other objects, such as precious gemstones being extracted from different items of jewelry, or cultural artifacts being deaccessioned from different museum collections over their lifespan.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E80",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    11,
    366
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
    

  export const EN_76_TYPE_CREATION:NewDfhApiClass = {
  "dfh_pk_class": 76,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Type Creation",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class comprises activities formally defining new types of items.\r\nIt is typically a rigorous scholarly or scientific process that ensures a type is exhaustively described and appropriately named. In some cases, particularly in archaeology and the life sciences, E83 Type Creation requires the identification of an exemplary specimen and the publication of the type definition in an appropriate scholarly forum. The activity of E83 Type Creation is central to research in the life sciences, where a type would be referred to as a “taxon,” the type description as a “protologue,” and the exemplary specimens as “orgininal element” or “holotype”.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E83",
  "dfh_profile_association_type": "selected",
  "dfh_parent_classes": [
    59
  ],
  "dfh_ancestor_classes": [
    1,
    2,
    4,
    5,
    7,
    57,
    83,
    211,
    214,
    539,
    756,
    887
  ]
}
    

  export const EN_81_PROPOSITIONAL_OBJECT:NewDfhApiClass = {
  "dfh_pk_class": 81,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Propositional Object",
  "dfh_fk_namespace": 1,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_basic_type_label": "Persistent Item",
  "dfh_class_scope_note": "This class comprises immaterial items, including but not limited to stories, plots, procedural prescriptions, algorithms, laws of physics or images that are, or represent in some sense, sets of propositions about real or imaginary things and that are documented as single units or serve as topics of discourse.\r\nThis class also comprises items that are “about” something in the sense of a subject. In the wider sense, this class includes expressions of psychological value such as non-figural art and musical themes. However, conceptual items such as types and classes are not instances of E89 Propositional Object. This should not be confused with the definition of a type, which is indeed an instance of E89 Propositional Object.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "E89",
  "dfh_profile_association_type": "inferred",
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
    

  export const EN_363_GEOGRAPHICAL_PLACE:NewDfhApiClass = {
  "dfh_pk_class": 363,
  "dfh_basic_type": 8,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Geographical Place",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
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
    

  export const EN_677_MAN_MADE_OBJECT_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 677,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Man-Made Object Type",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the E22 Man-Made Object class.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C4",
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
    

  export const EN_707_NUMERIC_DIMENSION:NewDfhApiClass = {
  "dfh_pk_class": 707,
  "dfh_basic_type": 10,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Numeric dimension",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
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
  "dfh_fk_profile": 20,
  "dfh_class_label": "Numeric dimension type",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
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
    

  export const EN_709_LENGTH:NewDfhApiClass = {
  "dfh_pk_class": 709,
  "dfh_basic_type": 10,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Length",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Region",
  "dfh_class_scope_note": "A measure of length. A lenght is a specialisation of E54 Dimension providing a measure of distance, height, etc.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C13",
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
    

  export const EN_710_LENGTH_MEASUREMENT_UNIT:NewDfhApiClass = {
  "dfh_pk_class": 710,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Length measurement unit",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "A measurement unit of length like mile, inch, meter, micron, etc.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C14",
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
    

  export const EN_711_WEIGHT:NewDfhApiClass = {
  "dfh_pk_class": 711,
  "dfh_basic_type": 10,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Weight",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
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
  "dfh_fk_profile": 20,
  "dfh_class_label": "Weight measurement unit",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
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
    

  export const EN_713_AREA:NewDfhApiClass = {
  "dfh_pk_class": 713,
  "dfh_basic_type": 10,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Area",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Region",
  "dfh_class_scope_note": "Measurable amount of space of a flat surface",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C17",
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
    

  export const EN_714_AREA_MEASUREMENT_UNIT:NewDfhApiClass = {
  "dfh_pk_class": 714,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Area measurement unit",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "The measurement unit of an area, e.g. a square yard, acre, square meter, hectare, etc.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C18",
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
    

  export const EN_715_VOLUME_MEASUREMENT_UNIT:NewDfhApiClass = {
  "dfh_pk_class": 715,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Volume measurement unit",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": "A measurement unit of volume, like pint, liter, gallon, etc.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C19",
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
  "dfh_fk_profile": 20,
  "dfh_class_label": "Volume",
  "dfh_fk_namespace": 110,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_basic_type_label": "Region",
  "dfh_class_scope_note": "Amount of space that an object fills or a container has",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C20",
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
    

  export const EN_726_PHYSICAL_COMPONENT:NewDfhApiClass = {
  "dfh_pk_class": 726,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Physical Component",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class comprises compositions of instances of crm:E18 Physical Thing out of their component elements and is therefore equivalent to the crm:P46 is composed of property but adds a time-indexed dimension to the composition relation, expressing the presence of parts only during a portion of the lifespan of a physical thing. The crm:P46 property is therefore a shortcut of this class and assumes implicitly that a part is present during the whole life of a physical thing.\r\nParthood : https://en.wiktionary.org/wiki/parthood ; https://plato.stanford.edu/entries/mereology/ \r\nThis class can be specifically useful for dealing with the belonging of objects to a crm:E78 Collection (the composed, main physical thing) during a particular time-span.\r\nThis class is modeled as a subclass of sdh;C1 Entity Quality and therefore instances of the crm:E5 Event class can initiate —crm:P8 effects quality (result from)— or end —crm:P9 ends (is ended by)— a different composition of a physical thing. In the case of instances of crm:E24 Physical Man-Made Thing, instances of crm:E79 Part Addition and crm:E80 Part Removal can be produced.\r\nComponent elements, since they are themselves instances of crm:E18 Physical Thing, may be further analysed into sub-components, thereby creating a hierarchy of part decomposition, related to time.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C22",
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
    

  export const EN_727_USE:NewDfhApiClass = {
  "dfh_pk_class": 727,
  "dfh_basic_type": 9,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Use",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_basic_type_label": "Temporal Entity",
  "dfh_class_scope_note": "This class models the fact that an actor employs something or someone for some purpose for a more or less long period of time. Use is modelled as a phase and therefore includes many actions and activities, as well as possible interruptions, but remains active or at least virtually possible during the indicated period.",
  "dfh_class_label_language": "en",
  "dfh_profile_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_class_scope_note_language": "en",
  "dfh_class_identifier_in_namespace": "C23",
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
    

  export const EN_728_USE_TYPE:NewDfhApiClass = {
  "dfh_pk_class": 728,
  "dfh_basic_type": 30,
  "dfh_fk_profile": 20,
  "dfh_class_label": "Use type",
  "dfh_fk_namespace": 3,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_basic_type_label": "Type (controlled vocabulary)",
  "dfh_class_scope_note": " \r\n\r\nThis class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the 'C23 Use' class.\r\n",
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
    
  }
  export namespace PROFILE_20_PROPERTIES {
    
  export const EN_12_13_21_CARRIED_OUT_BY:NewDfhApiProperty = {
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
  "dfh_property_domain": 12,
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
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    10
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_22_42_55_CONSISTS_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 42,
  "dfh_property_label_language": "en",
  "dfh_property_label": "consists of",
  "dfh_property_inverse_label": "is incorporated in",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property identifies the instances of E57 Materials of which an instance of E18 Physical Thing is composed.\r\nAll physical things consist of physical materials. P45 consists of (is incorporated in) allows the different Materials to be recorded. P45 consists of (is incorporated in) refers here to observed Material as opposed to the consumed raw material.\r\nA Material, such as a theoretical alloy, may not have any physical instances",
  "dfh_is_inherited": true,
  "dfh_property_domain": 22,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 55,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P45",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_22_43_22_IS_COMPOSED_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 43,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is composed of",
  "dfh_property_inverse_label": "forms part of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property allows instances of E18 Physical Thing to be analysed into component elements.\r\nComponent elements, since they are themselves instances of E18 Physical Thing, may be further analysed into sub-components, thereby creating a hierarchy of part decomposition. An instance of E18 Physical Thing may be shared between multiple wholes, for example two buildings may share a common wall. This property does not specify when and for how long a component element resided in the respective whole. If a component is not part of a whole from the beginning of existence or until the end of existence of the whole, the classes E79 Part Addition and E90 Part Removal can be used to document when a component became part of a particular whole and/or when it stopped being a part of it. For the time-span of being part of the respective whole, the component is completely contained in the place the whole occupies.\r\nThis property is intended to describe specific components that are individually documented, rather than general aspects. Overall descriptions of the structure of an instance of E18 Physical Thing are captured by the P3 has note property.\r\nThe instances of E57 Material of which an item of E18 Physical Thing is composed should be documented using P45 consists of (is incorporated in).",
  "dfh_is_inherited": true,
  "dfh_property_domain": 22,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 22,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P46",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_22_89_53_HAD_AS_GENERAL_USE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 89,
  "dfh_property_label_language": "en",
  "dfh_property_label": "had as general use",
  "dfh_property_inverse_label": "was use of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property links an instance of E70 Thing to an E55 Type of usage.\r\nIt allows the relationship between particular things, both physical and immaterial, and general methods and techniques of use to be documented. Thus it can be asserted that a baseball bat had a general use for sport and a specific use for threatening people during the Great Train Robbery.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 22,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 53,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P101",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_12_96_22_HAS_PRODUCED:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 96,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has produced",
  "dfh_property_inverse_label": "was produced by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property identifies the E24 Physical Man-Made Thing that came into existence as a result of an E12 Production.\r\nThe identity of an instance of E24 Physical Man-Made Thing is not defined by its matter, but by its existence as a subject of documentation. An E12 Production can result in the creation of multiple instances of E24 Physical Man-Made Thing.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 12,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 22,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P108",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    29,
    80,
    1083
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_12_96_24_HAS_PRODUCED:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 96,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has produced",
  "dfh_property_inverse_label": "was produced by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property identifies the E24 Physical Man-Made Thing that came into existence as a result of an E12 Production.\r\nThe identity of an instance of E24 Physical Man-Made Thing is not defined by its matter, but by its existence as a subject of documentation. An E12 Production can result in the creation of multiple instances of E24 Physical Man-Made Thing.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 12,
  "dfh_domain_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_property_range": 24,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P108",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    29,
    80,
    1083
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_72_98_22_AUGMENTED:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 98,
  "dfh_property_label_language": "en",
  "dfh_property_label": "augmented",
  "dfh_property_inverse_label": "was augmented by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property identifies the E24 Physical Man-Made Thing that is added to (augmented) in an E79 Part Addition.\r\nAlthough a Part Addition event normally concerns only one item of Physical Man-Made Thing, it is possible to imagine circumstances under which more than one item might be added to (augmented). For example, the artist Jackson Pollock trailing paint onto multiple canvasses.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 72,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 22,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P110",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    29
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_72_99_22_ADDED:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 99,
  "dfh_property_label_language": "en",
  "dfh_property_label": "added",
  "dfh_property_inverse_label": "was added by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property identifies the E18 Physical Thing that is added during an E79 Part Addition activity ",
  "dfh_is_inherited": true,
  "dfh_property_domain": 72,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 22,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P111",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 1,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM version 6.2",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    11,
    15
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_677_115_677_HAS_BROADER_TERM:NewDfhApiProperty = {
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
  "dfh_property_domain": 677,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 677,
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
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_728_115_728_HAS_BROADER_TERM:NewDfhApiProperty = {
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
  "dfh_property_domain": 728,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 728,
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
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_22_1598_677_HAS_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1598,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has type",
  "dfh_property_inverse_label": "is type of man-made object",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates a man-made object with the type which defines its identity",
  "dfh_is_inherited": false,
  "dfh_property_domain": 22,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 677,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P1",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_12_1599_363_TOOK_PLACE_AT:NewDfhApiProperty = {
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
  "dfh_property_domain": 12,
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
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    7
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
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    79
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_709_1636_710_HAS_MEASUREMENT_UNIT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1636,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has measurement unit",
  "dfh_property_inverse_label": "is measurement unit of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates a lenght with its measurement unit",
  "dfh_is_inherited": false,
  "dfh_property_domain": 709,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 710,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P12",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    79
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
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    79
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_713_1638_714_HAS_MEASUREMENT_UNIT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1638,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has measurement unit",
  "dfh_property_inverse_label": "is measurement unit of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates an area with its measurement unit",
  "dfh_is_inherited": false,
  "dfh_property_domain": 713,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 714,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P14",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    79
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_716_1639_715_HAS_MEASUREMENT_UNIT:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1639,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has measurement unit",
  "dfh_property_inverse_label": "is measurement unit of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates a volume with its measurement unit",
  "dfh_is_inherited": false,
  "dfh_property_domain": 716,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 715,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P15",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    79
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_72_1653_726_EFFECTS_QUALITY:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1653,
  "dfh_property_label_language": "en",
  "dfh_property_label": "effects quality",
  "dfh_property_inverse_label": "result from",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates an event to the quality that it effects or initiates. Different events can contribute to the origin of the same quality and one event can produce several qualities, in one or more entities.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 72,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 726,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P8",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_73_1654_726_ENDS:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1654,
  "dfh_property_label_language": "en",
  "dfh_property_label": "ends",
  "dfh_property_inverse_label": "is ended by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates an event to the quality that it directly oder indirectly ends. Different events can contribute to the end of the same quality and one event can end several qualities, in one or more entitites.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 73,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 726,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": -1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P9",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_726_1655_22_BELONGS_TO:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1655,
  "dfh_property_label_language": "en",
  "dfh_property_label": "belongs to",
  "dfh_property_inverse_label": "has component",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the main physical entity concerned by the composition, i. e. the one that has one or more parts.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 726,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 22,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P27",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_726_1656_22_HAS_PART:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1656,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has part",
  "dfh_property_inverse_label": "is part of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the part of a physical thing that composes it during a given time-span",
  "dfh_is_inherited": true,
  "dfh_property_domain": 726,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 22,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P28",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_22_1657_677_IS_COMPOSED_OF_PART_OF_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1657,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is composed of part of type",
  "dfh_property_inverse_label": "is type of part of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property models components of physical objects that are not identified as individuals but just as types. It extends the crm:P46 is composed of property to more general situation where the identification of each part of a physical thing is not identified as such.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 22,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 677,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P17",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 110,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "SDHSS CIDOC CRM supplement – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_727_1658_728_HAS_USE_TYPE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1658,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has use type",
  "dfh_property_inverse_label": "is use type of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": " \r\n\r\nAssociates an usewith the type which defines its identity\r\n",
  "dfh_is_inherited": false,
  "dfh_property_domain": 727,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 728,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": true,
  "dfh_property_identifier_in_namespace": "P29",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    2
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_727_1659_21_IS_USE_BY_ACTOR:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1659,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is use by actor",
  "dfh_property_inverse_label": "makes use of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "Associates the actor using the persistent item. The actor being identity defining for this class, the maximum cardinality is one.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 727,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 21,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P30",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    

  export const EN_727_1660_81_HAS_PURPOSE:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1660,
  "dfh_property_label_language": "en",
  "dfh_property_label": "has purpose",
  "dfh_property_inverse_label": "is purpose of",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates a propositional object defining the purpose of the use",
  "dfh_is_inherited": false,
  "dfh_property_domain": 727,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 81,
  "dfh_range_instances_min_quantifier": 0,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P31",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [],
  "dfh_ancestor_properties": []
}
    

  export const EN_727_1661_22_IS_USE_OF:NewDfhApiProperty = {
  "removed_from_api": false,
  "requested_language": "en",
  "is_enabled_in_profile": null,
  "dfh_pk_property": 1661,
  "dfh_property_label_language": "en",
  "dfh_property_label": "is use of",
  "dfh_property_inverse_label": "is used by",
  "dfh_property_scope_note_language": "en",
  "dfh_property_scope_note": "This property associates the persistent item that is the object of the used. As an identifying property, the maximum cardinality is one, the use concerning just one object.",
  "dfh_is_inherited": true,
  "dfh_property_domain": 727,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_domain_instances_max_quantifier": -1,
  "dfh_property_range": 22,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_range_instances_max_quantifier": 1,
  "dfh_identity_defining": false,
  "dfh_is_has_type_subproperty": false,
  "dfh_property_identifier_in_namespace": "P32",
  "dfh_namespace_uri": null,
  "dfh_fk_namespace": 3,
  "dfh_namespace_label_language": "en",
  "dfh_namespace_label": "CIDOC CRM Top-Level Extension for Humanities and Social sciences (SDHSS)  – ongoing",
  "dfh_profile_association_type": null,
  "dfh_fk_profile": 20,
  "dfh_profile_label": "Physical man-made objects and basic information about them",
  "dfh_profile_label_language": "en",
  "dfh_parent_properties": [
    1376
  ],
  "dfh_ancestor_properties": []
}
    
  }


  export const PROFILE_20_PHYSICAL_MAN_MA_2022_01_18: OntomeProfileMock = {
    profile: PROFILE,
    classes: [
      PROFILE_20_CLASSES.EN_12_PRODUCTION,
PROFILE_20_CLASSES.EN_21_PERSON,
PROFILE_20_CLASSES.EN_22_MAN_MADE_OBJECT,
PROFILE_20_CLASSES.EN_24_MAN_MADE_FEATURE,
PROFILE_20_CLASSES.EN_53_TYPE,
PROFILE_20_CLASSES.EN_55_MATERIAL,
PROFILE_20_CLASSES.EN_72_PART_ADDITION,
PROFILE_20_CLASSES.EN_73_PART_REMOVAL,
PROFILE_20_CLASSES.EN_76_TYPE_CREATION,
PROFILE_20_CLASSES.EN_81_PROPOSITIONAL_OBJECT,
PROFILE_20_CLASSES.EN_363_GEOGRAPHICAL_PLACE,
PROFILE_20_CLASSES.EN_677_MAN_MADE_OBJECT_TYPE,
PROFILE_20_CLASSES.EN_707_NUMERIC_DIMENSION,
PROFILE_20_CLASSES.EN_708_NUMERIC_DIMENSION_TYPE,
PROFILE_20_CLASSES.EN_709_LENGTH,
PROFILE_20_CLASSES.EN_710_LENGTH_MEASUREMENT_UNIT,
PROFILE_20_CLASSES.EN_711_WEIGHT,
PROFILE_20_CLASSES.EN_712_WEIGHT_MEASUREMENT_UNIT,
PROFILE_20_CLASSES.EN_713_AREA,
PROFILE_20_CLASSES.EN_714_AREA_MEASUREMENT_UNIT,
PROFILE_20_CLASSES.EN_715_VOLUME_MEASUREMENT_UNIT,
PROFILE_20_CLASSES.EN_716_VOLUME,
PROFILE_20_CLASSES.EN_726_PHYSICAL_COMPONENT,
PROFILE_20_CLASSES.EN_727_USE,
PROFILE_20_CLASSES.EN_728_USE_TYPE
    ],
    properties: [
      PROFILE_20_PROPERTIES.EN_12_13_21_CARRIED_OUT_BY,
PROFILE_20_PROPERTIES.EN_22_42_55_CONSISTS_OF,
PROFILE_20_PROPERTIES.EN_22_43_22_IS_COMPOSED_OF,
PROFILE_20_PROPERTIES.EN_22_89_53_HAD_AS_GENERAL_USE,
PROFILE_20_PROPERTIES.EN_12_96_22_HAS_PRODUCED,
PROFILE_20_PROPERTIES.EN_12_96_24_HAS_PRODUCED,
PROFILE_20_PROPERTIES.EN_72_98_22_AUGMENTED,
PROFILE_20_PROPERTIES.EN_72_99_22_ADDED,
PROFILE_20_PROPERTIES.EN_677_115_677_HAS_BROADER_TERM,
PROFILE_20_PROPERTIES.EN_728_115_728_HAS_BROADER_TERM,
PROFILE_20_PROPERTIES.EN_22_1598_677_HAS_TYPE,
PROFILE_20_PROPERTIES.EN_12_1599_363_TOOK_PLACE_AT,
PROFILE_20_PROPERTIES.EN_707_1635_708_HAS_NUMERIC_DIMENSION_TYPE,
PROFILE_20_PROPERTIES.EN_709_1636_710_HAS_MEASUREMENT_UNIT,
PROFILE_20_PROPERTIES.EN_711_1637_712_HAS_MEASUREMENT_UNIT,
PROFILE_20_PROPERTIES.EN_713_1638_714_HAS_MEASUREMENT_UNIT,
PROFILE_20_PROPERTIES.EN_716_1639_715_HAS_MEASUREMENT_UNIT,
PROFILE_20_PROPERTIES.EN_72_1653_726_EFFECTS_QUALITY,
PROFILE_20_PROPERTIES.EN_73_1654_726_ENDS,
PROFILE_20_PROPERTIES.EN_726_1655_22_BELONGS_TO,
PROFILE_20_PROPERTIES.EN_726_1656_22_HAS_PART,
PROFILE_20_PROPERTIES.EN_22_1657_677_IS_COMPOSED_OF_PART_OF_TYPE,
PROFILE_20_PROPERTIES.EN_727_1658_728_HAS_USE_TYPE,
PROFILE_20_PROPERTIES.EN_727_1659_21_IS_USE_BY_ACTOR,
PROFILE_20_PROPERTIES.EN_727_1660_81_HAS_PURPOSE,
PROFILE_20_PROPERTIES.EN_727_1661_22_IS_USE_OF
    ]
  }
  