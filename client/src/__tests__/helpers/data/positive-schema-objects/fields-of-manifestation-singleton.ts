import { GvSchemaObject } from 'app/core/sdk-lb4';
import { DfhApiClassMock } from '../auto-gen/DfhApiClassMock';
import { DfhApiPropertyMock } from '../auto-gen/DfhApiPropertyMock';
import { ProDfhProfileProjRelMock } from '../auto-gen/ProDfhProfileProjRelMock';
import { transformDfhApiClassToDfhClass, transformDfhApiClassToDfhLabel, transformDfhApiPropertyToDfhLabel, transformDfhApiPropertyToDfhProperty } from '../transformers';


export const fieldsOfManifestationSingleton: GvSchemaObject = {
  dfh: {
    klass: [
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_244_EXPRESSION_CREATION),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_450_MANIFESTATION_SINGLETON_TYPE),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_784_SHORT_TITLE),
    ],
    property: [
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
