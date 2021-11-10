import {GvSubentitFieldPageReq} from '@kleiolab/lib-sdk-lb4';
import {TrueEnum} from '../enums/TrueEnum';
import {DfhApiClassMock} from '../gvDB/DfhApiClassMock'
import {DfhApiPropertyMock} from '../gvDB/DfhApiPropertyMock'

export namespace GvSubentityFieldPageReqMock {



  export const appeTeEnRefersToName: GvSubentitFieldPageReq = {
    targets: {
      [DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class]: {
        appellation: TrueEnum.true
      }
    },
    page: {
      property: {fkProperty: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property},
      isOutgoing: true,
      isCircular: false,
      limit: 7,
      offset: 0
    }
  }

  export const appeTeEnHasDefinition: GvSubentitFieldPageReq = {
    targets: {
      [DfhApiClassMock.EN_365_NAMING.dfh_pk_class]: {
        langString: TrueEnum.true
      }
    },
    page: {
      property: {fkProperty: DfhApiPropertyMock.EN_1762_HAS_DEFINITION.dfh_pk_property},
      isOutgoing: true,
      isCircular: false,
      limit: 1,
      offset: 0,
    }
  }

  export const appeTeEnHasTimeSpan: GvSubentitFieldPageReq = {
    targets: {
      [DfhApiClassMock.EN_50_TIME_SPAN.dfh_pk_class]: {
        timeSpan: TrueEnum.true
      }
    },
    page: {
      property: {fkProperty: DfhApiPropertyMock.EN_4_HAS_TIME_SPAN.dfh_pk_property},
      isOutgoing: true,
      isCircular: false,
      limit: 1,
      offset: 0,
    }
  }
  export const appeTeEnIsAppeOfPerson: GvSubentitFieldPageReq = {
    targets: {
      [DfhApiClassMock.EN_21_PERSON.dfh_pk_class]: {
        entityPreview: TrueEnum.true
      }
    },
    page: {
      property: {fkProperty: DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON.dfh_pk_property},
      isOutgoing: true,
      isCircular: true,
      limit: 1,
      offset: 0,
    }
  }


}
