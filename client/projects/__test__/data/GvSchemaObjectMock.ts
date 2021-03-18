import { GvPositiveSchemaObject } from '@kleiolab/lib-sdk-lb4';
import { createAppellationProperty, transformDfhApiClassToDfhClass, transformDfhApiClassToDfhLabel, transformDfhApiPropertyToDfhLabel, transformDfhApiPropertyToDfhProperty } from '../helpers/transformers';
import { DfhApiClassMock } from './auto-gen/gvDB/DfhApiClassMock';
import { DfhApiPropertyMock } from './auto-gen/gvDB/DfhApiPropertyMock';
import { InfLanguageMock } from './auto-gen/gvDB/InfLanguageMock';
import { ProDfhProfileProjRelMock } from './auto-gen/gvDB/ProDfhProfileProjRelMock';
import { ProProjectMock } from './auto-gen/gvDB/ProProjectMock';
import { SysConfigValueMock } from './auto-gen/gvDB/SysConfigValueMock';

/**
 * Objects to feed the client redux store with mockdata
 * be it for testing pipes (lib-queries) or sanboxes (app-toolbox)
 */
export namespace GvSchemaObjectMock {

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
      ],
      property: [
        transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON),
        transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1113_REFERS_TO_NAME),
        transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1762_HAS_DEFINITION),
        transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_4_HAS_TIME_SPAN),
        transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_71_ONGOING_THOUGHOUT),
        transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_72_AT_SOME_TIME_WITHIN),
        transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_152_BEGIN_OF_THE_BEGIN),
        transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_150_END_OF_THE_BEGIN),
        transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_151_BEGIN_OF_THE_END),
        transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_153_END_OF_THE_END)
      ],
      label: [
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON),
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_1113_REFERS_TO_NAME),
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_1762_HAS_DEFINITION),
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_4_HAS_TIME_SPAN),
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_71_ONGOING_THOUGHOUT),
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_72_AT_SOME_TIME_WITHIN),
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_152_BEGIN_OF_THE_BEGIN),
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_150_END_OF_THE_BEGIN),
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_151_BEGIN_OF_THE_END),
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_153_END_OF_THE_END),
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

        transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1762_HAS_DEFINITION),

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
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_1205_MANIFESTATION_SINGLETON_HAS_TYPE),
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_1016_MANIFESTATION_SINGLETON_IS_REPRESENTATIVE_FOR),
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_992_EXPRESSION_CREATION_CREATED_MANIFESTATION_SINGLETON),
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_1761_MANIFESTATION_SINGLETON_HAS_SHORT_TITLE),
      ]
    },
    pro: {
      dfh_profile_proj_rel: [
        ProDfhProfileProjRelMock.PROJ_1_PROFILE_4
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
      ],
      label: [
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_148_WAS_AT),
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_147_WAS_A_PRESENCE_OF_GEO_PLACE),
        transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_84_PRESENCE),
        transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_363_GEO_PLACE),
        transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_51_PLACE)
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
      ],
      property: [
        transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1435_STEMS_FROM),
        transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE),
      ],
      label: [
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_1435_STEMS_FROM),
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE),
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
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON),
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_1762_HAS_DEFINITION),
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

}
