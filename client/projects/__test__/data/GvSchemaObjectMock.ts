import { GvSchemaObject } from '@kleiolab/lib-sdk-lb4';
import { transformDfhApiClassToDfhClass, transformDfhApiClassToDfhLabel, transformDfhApiPropertyToDfhLabel, transformDfhApiPropertyToDfhProperty } from '../helpers/transformers';
import { DfhApiClassMock } from './auto-gen/DfhApiClassMock';
import { DfhApiPropertyMock } from './auto-gen/DfhApiPropertyMock';
import { InfLanguageMock } from './auto-gen/InfLanguageMock';
import { ProDfhProfileProjRelMock } from './auto-gen/ProDfhProfileProjRelMock';
import { ProProjectMock } from './auto-gen/ProProjectMock';
import { SysConfigValueMock } from './auto-gen/SysConfigValueMock';

export namespace GvSchemaObjectMock {

  /**
   * This schema object should a basic set of classes and properties
   * corresponding to the OntoME profile 'Geovistory Basics'
   */
  export const basicClassesAndProperties: GvSchemaObject = {
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

      ],
      label: [
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON),
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_1113_REFERS_TO_NAME),
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_1762_HAS_DEFINITION),
        transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_4_HAS_TIME_SPAN),
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
   * for working with EN_220_MANIFESTATION_SINGLETON
   */
  export const fieldsOfManifestationSingleton: GvSchemaObject = {
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
        transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF),
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

  /**
   * If you work with PROJECT_1, this object provides basic schema data:
   * language and project
   */
  export const project1: GvSchemaObject = {
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
  export const sysConfig: GvSchemaObject = {
    sys: {
      config: [
        SysConfigValueMock.SYS_CONFIC_VALID
      ]
    },
  }

}
