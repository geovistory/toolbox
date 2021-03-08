import {GvLoadSubentitySubfieldPageReq, SysConfigValueObjectType} from '@kleiolab/lib-sdk-lb4';
import {DfhApiPropertyMock} from '../gvDB/DfhApiPropertyMock'
import {DfhApiClassMock} from '../gvDB/DfhApiClassMock'

export namespace GvLoadSubentitySubfieldPageReqMock {



  export const appeTeEnRefersToName: GvLoadSubentitySubfieldPageReq = {
    subfieldType: {
      appellation: 'true' as unknown as SysConfigValueObjectType.AppellationEnum
    },
    page: {
      fkProperty: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
      isOutgoing: true,
      targetClass: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
      isCircular: false,
      limit: 7,
      offset: 0
    }
  }

  export const appeTeEnHasDefinition: GvLoadSubentitySubfieldPageReq = {
    subfieldType: {
      langString: 'true' as unknown as SysConfigValueObjectType.AppellationEnum
    },
    page: {
      fkProperty: DfhApiPropertyMock.EN_1762_HAS_DEFINITION.dfh_pk_property,
      isOutgoing: true,
      targetClass: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
      isCircular: false,
      limit: 1,
      offset: 0,
    }
  }

  export const appeTeEnHasTimeSpan: GvLoadSubentitySubfieldPageReq = {
    subfieldType: {
      timeSpan: 'true' as unknown as SysConfigValueObjectType.AppellationEnum
    },
    page: {
      fkProperty: DfhApiPropertyMock.EN_4_HAS_TIME_SPAN.dfh_pk_property,
      isOutgoing: true,
      targetClass: DfhApiClassMock.EN_50_TIME_SPAN.dfh_pk_class,
      isCircular: false,
      limit: 1,
      offset: 0,
    }
  }
  export const appeTeEnIsAppeOfPerson: GvLoadSubentitySubfieldPageReq = {
    subfieldType: {
      entityPreview: 'true' as unknown as SysConfigValueObjectType.AppellationEnum
    },
    page: {
      fkProperty: DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON.dfh_pk_property,
      isOutgoing: true,
      targetClass: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
      isCircular: true,
      limit: 1,
      offset: 0,
    }
  }


}
