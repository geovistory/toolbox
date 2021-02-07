import { GvSchemaObject } from 'app/core/sdk-lb4';
import { DfhApiClassMock } from '../auto-gen/DfhApiClassMock';
import { DfhApiPropertyMock } from '../auto-gen/DfhApiPropertyMock';
import { ProDfhProfileProjRelMock } from '../auto-gen/ProDfhProfileProjRelMock';
import { transformDfhApiClassToDfhClass, transformDfhApiClassToDfhLabel, transformDfhApiPropertyToDfhLabel, transformDfhApiPropertyToDfhProperty } from '../transformers';


export const basicClassesAndProperties: GvSchemaObject = {
  dfh: {
    klass: [
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_365_NAMING),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_785_TEXT),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_40_APPELLATION),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_784_SHORT_TITLE),
      transformDfhApiClassToDfhClass(DfhApiClassMock.EN_335_TIME_PRIMITIVE),
    ],
    property: [
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF),
      transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1762_HAS_DEFINITION),

    ],
    label: [
      transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_1111_IS_APPE_OF),
      transformDfhApiPropertyToDfhLabel(DfhApiPropertyMock.EN_1762_HAS_DEFINITION),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_365_NAMING),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_785_TEXT),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_40_APPELLATION),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_784_SHORT_TITLE),
      transformDfhApiClassToDfhLabel(DfhApiClassMock.EN_335_TIME_PRIMITIVE),
    ]
  },
  pro: {
    dfh_profile_proj_rel: [
      ProDfhProfileProjRelMock.PROJ_1_PROFILE_4
    ]
  }
}
