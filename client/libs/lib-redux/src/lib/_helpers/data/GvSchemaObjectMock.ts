import { GvPositiveSchemaObject } from '@kleiolab/lib-sdk-lb4';
import { createAppellationProperty, createDefinitionProperty, createHasTimeSpanProperty, transformDfhApiClassToDfhClass, transformDfhApiClassToDfhLabel, transformDfhApiPropertyToDfhLabels, transformDfhApiPropertyToDfhProperty } from '../transformers';
import { DfhApiClassMock } from './auto-gen/gvDB/DfhApiClassMock';
import { DfhApiPropertyMock } from './auto-gen/gvDB/DfhApiPropertyMock';
import { InfLanguageMock } from './auto-gen/gvDB/InfLanguageMock';
import { ProDfhProfileProjRelMock } from './auto-gen/gvDB/ProDfhProfileProjRelMock';
import { ProProjectMock } from './auto-gen/gvDB/ProProjectMock';
import { SysConfigValueMock } from './auto-gen/gvDB/SysConfigValueMock';



/**
 * This schema object should a basic set of classes and properties
 * corresponding to the OntoME profile 'Geovistory Basics'
 */
export const basicClassesAndProperties: GvPositiveSchemaObject = {
  dfh: {
    klass: [
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_365_NAMING),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_785_TEXT),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_40_APPELLATION),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_784_SHORT_TITLE),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_335_TIME_PRIMITIVE),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_21_PERSON),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_50_TIME_SPAN),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_2_TEMPORAL_ENTITY),
    ],
    property: [
      createHasTimeSpanProperty(DfhApiClassMock.EN_365_NAMING.dfh_pk_class),
      createDefinitionProperty(DfhApiClassMock.EN_365_NAMING.dfh_pk_class),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1113_REFERS_TO_NAME),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_71_ONGOING_THROUGHOUT),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_72_AT_SOME_TIME_WITHIN),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_152_BEGIN_OF_THE_BEGIN),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_150_END_OF_THE_BEGIN),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_151_BEGIN_OF_THE_END),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_153_END_OF_THE_END)
    ],
    label: [
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_1113_REFERS_TO_NAME),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_1762_HAS_DEFINITION),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_4_HAS_TIME_SPAN),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_71_ONGOING_THROUGHOUT),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_72_AT_SOME_TIME_WITHIN),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_152_BEGIN_OF_THE_BEGIN),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_150_END_OF_THE_BEGIN),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_151_BEGIN_OF_THE_END),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_153_END_OF_THE_END),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_365_NAMING),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_785_TEXT),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_40_APPELLATION),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_784_SHORT_TITLE),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_335_TIME_PRIMITIVE),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_21_PERSON),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_50_TIME_SPAN),

    ]
  },
  pro: {
    dfh_profile_proj_rel: [
      ProDfhProfileProjRelMock.PROJ_1_PROFILE_4
    ]
  }
}


/**
 * This object should provide the classes and properties
 * for working with Ship Voyage
 */
export const modelOfShipVoyage: GvPositiveSchemaObject = {
  dfh: {
    klass: [
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_523_SHIP_VOYAGE),
    ],
    property: [
    ],
    label: [
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_523_SHIP_VOYAGE),
    ]
  },
  pro: {
    dfh_profile_proj_rel: [
      ProDfhProfileProjRelMock.PROJ_1_PROFILE_4
    ]
  }
}
/**
* This object should provide the class Geov Place Type
*/
export const classGeographicalPlaceType: GvPositiveSchemaObject = {
  dfh: {
    klass: [
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_364_GEO_PLACE_TYPE),
    ],
    property: [
    ],
    label: [
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_364_GEO_PLACE_TYPE),
    ]
  },
  pro: {
    dfh_profile_proj_rel: [
      ProDfhProfileProjRelMock.PROJ_1_PROFILE_4
    ]
  }
}
/**
* This object should provide the class Geov Place
*/
export const classGeographicalPlace: GvPositiveSchemaObject = {
  dfh: {
    klass: [
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_363_GEO_PLACE),
    ],
    property: [
    ],
    label: [
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_363_GEO_PLACE),
    ]
  },
  pro: {
    dfh_profile_proj_rel: [
      ProDfhProfileProjRelMock.PROJ_1_PROFILE_4
    ]
  }
}
/**
  * This object should provide the classes and properties
  * for working with EN_220_MANIFESTATION_SINGLETON
  */
export const fieldsOfManifestationSingleton: GvPositiveSchemaObject = {
  dfh: {
    klass: [
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_450_MANIFESTATION_SINGLETON_TYPE),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_218_EXPRESSION),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_244_EXPRESSION_CREATION),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_784_SHORT_TITLE),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_365_NAMING),
    ],
    property: [
      createAppellationProperty(DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON.dfh_pk_class),

      createDefinitionProperty(DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON.dfh_pk_class),

      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1205_MANIFESTATION_SINGLETON_HAS_TYPE),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1016_MANIFESTATION_SINGLETON_IS_REPRESENTATIVE_FOR),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_992_EXPRESSION_CREATION_CREATED_MANIFESTATION_SINGLETON),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1761_MANIFESTATION_SINGLETON_HAS_SHORT_TITLE),
    ],
    label: [
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_244_EXPRESSION_CREATION),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_450_MANIFESTATION_SINGLETON_TYPE),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_784_SHORT_TITLE),

      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_1762_HAS_DEFINITION),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_1205_MANIFESTATION_SINGLETON_HAS_TYPE),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_1016_MANIFESTATION_SINGLETON_IS_REPRESENTATIVE_FOR),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_992_EXPRESSION_CREATION_CREATED_MANIFESTATION_SINGLETON),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_1761_MANIFESTATION_SINGLETON_HAS_SHORT_TITLE),
    ]
  },
  pro: {
    dfh_profile_proj_rel: [
      ProDfhProfileProjRelMock.PROJ_1_PROFILE_4,
      ProDfhProfileProjRelMock.PROJ_1_PROFILE_21,
    ]
  }
}

export const modelOfPresence: GvPositiveSchemaObject = {
  dfh: {
    klass: [
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_84_PRESENCE),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_51_PLACE),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_363_GEO_PLACE),
    ],
    property: [
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_148_WAS_AT),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_147_WAS_A_PRESENCE_OF_GEO_PLACE),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_145_DURING),
    ],
    label: [
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_148_WAS_AT),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_147_WAS_A_PRESENCE_OF_GEO_PLACE),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_145_DURING),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_84_PRESENCE),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_363_GEO_PLACE),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_51_PLACE),

    ]
  },
  pro: {
    dfh_profile_proj_rel: [
      ProDfhProfileProjRelMock.PROJ_1_PROFILE_4
    ]
  }
}

export const modelOfBirth: GvPositiveSchemaObject = {
  dfh: {
    klass: [
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_61_BIRTH),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_21_PERSON),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_633_UNION),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_50_TIME_SPAN),
    ],
    property: [
      createHasTimeSpanProperty(DfhApiClassMock.EN_61_BIRTH.dfh_pk_class),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1435_STEMS_FROM),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE),
    ],
    label: [
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_4_HAS_TIME_SPAN),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_1435_STEMS_FROM),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_61_BIRTH),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_21_PERSON),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_633_UNION)
    ]
  },
  pro: {
    dfh_profile_proj_rel: [
      ProDfhProfileProjRelMock.PROJ_1_PROFILE_4,
      ProDfhProfileProjRelMock.PROJ_1_PROFILE_12,

    ]
  }
}

export const modelOfAppellationTeEn: GvPositiveSchemaObject = {
  dfh: {
    klass: [
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_365_NAMING),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_40_APPELLATION),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_54_LANGUAGE),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_21_PERSON),
    ],
    property: [
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1112_USED_IN_LANGUAGE),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1113_REFERS_TO_NAME),
    ],
    label: [
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_1112_USED_IN_LANGUAGE),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_1113_REFERS_TO_NAME),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_365_NAMING),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_40_APPELLATION),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_54_LANGUAGE),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_21_PERSON),
    ]
  },
  pro: {
    dfh_profile_proj_rel: [
      ProDfhProfileProjRelMock.PROJ_1_PROFILE_4,
    ]
  }
}

export const modelOfPerson: GvPositiveSchemaObject = {
  dfh: {
    klass: [
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_21_PERSON),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_785_TEXT),
    ],
    property: [
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1762_HAS_DEFINITION),
    ],
    label: [
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_1762_HAS_DEFINITION),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_21_PERSON),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_785_TEXT)
    ]
  },
  pro: {
    dfh_profile_proj_rel: [
      ProDfhProfileProjRelMock.PROJ_1_PROFILE_4,
      ProDfhProfileProjRelMock.PROJ_1_PROFILE_12,

    ]
  }
}

// remark: this mock is for developing form to edit real time-spans!
export const modelOfTimeSpan: GvPositiveSchemaObject = {
  dfh: {
    klass: [
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_61_BIRTH),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_335_TIME_PRIMITIVE),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_50_TIME_SPAN),
    ],
    property: [
      createHasTimeSpanProperty(DfhApiClassMock.EN_61_BIRTH.dfh_pk_class),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_71_ONGOING_THROUGHOUT),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_72_AT_SOME_TIME_WITHIN),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_152_BEGIN_OF_THE_BEGIN),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_150_END_OF_THE_BEGIN),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_151_BEGIN_OF_THE_END),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_153_END_OF_THE_END)
    ],
    label: [
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_4_HAS_TIME_SPAN),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_71_ONGOING_THROUGHOUT),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_72_AT_SOME_TIME_WITHIN),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_152_BEGIN_OF_THE_BEGIN),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_150_END_OF_THE_BEGIN),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_151_BEGIN_OF_THE_END),
      ...transformDfhApiPropertyToDfhLabels(DfhApiPropertyMock.EN_153_END_OF_THE_END),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_61_BIRTH),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_50_TIME_SPAN),

    ]
  },
  pro: {
    dfh_profile_proj_rel: [
      ProDfhProfileProjRelMock.PROJ_1_PROFILE_4
    ]
  }
}


/**
 * If you work with PROJECT_1, this object provides basic schema data:
 * language and project
 */
export const project1: GvPositiveSchemaObject = {
  inf: {
    language: [
      InfLanguageMock.GERMAN
    ]
  },
  pro: {
    project: [
      ProProjectMock.PROJECT_1
    ]
  }
}

/**
 * Provides sys-config (should be as on production or ahead)
 */
export const sysConfig: GvPositiveSchemaObject = {
  sys: {
    config: [
      SysConfigValueMock.SYS_CONFIC_VALID
    ]
  },
}

export const ctrlValueDialog_appellation: GvPositiveSchemaObject = {
  dfh: {
    klass: [transformDfhApiClassToDfhClass(DfhApiClassMock.EN_40_APPELLATION)],
    label: [transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_40_APPELLATION)]
  }
}

export const ctrlValueDialog_dimension: GvPositiveSchemaObject = {
  dfh: {
    klass: [transformDfhApiClassToDfhClass(DfhApiClassMock.EN_689_DURATION)],
    label: [transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_689_DURATION)]
  }
}

export const ctrlValueDialog_langstring: GvPositiveSchemaObject = {
  inf: {
    language: [
      InfLanguageMock.GERMAN,
      InfLanguageMock.FRENCH,
      InfLanguageMock.ENGLISH
    ]
  }
}

export const ctrlValueDialog_timeprimitive: GvPositiveSchemaObject = {
  dfh: {
    klass: [transformDfhApiClassToDfhClass(DfhApiClassMock.EN_335_TIME_PRIMITIVE)],
    label: [transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_335_TIME_PRIMITIVE)]
  }
}
export const GvSchemaObjectMock = {
  basicClassesAndProperties,
  modelOfShipVoyage,
  classGeographicalPlaceType,
  classGeographicalPlace,
  fieldsOfManifestationSingleton,
  modelOfPresence,
  modelOfBirth,
  modelOfAppellationTeEn,
  modelOfPerson,
  modelOfTimeSpan,
  project1,
  sysConfig,
  ctrlValueDialog_appellation,
  ctrlValueDialog_dimension,
  ctrlValueDialog_langstring,
  ctrlValueDialog_timeprimitive
}
