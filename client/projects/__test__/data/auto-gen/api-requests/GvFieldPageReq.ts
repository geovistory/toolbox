import {GvFieldPageReq, SysConfigValueObjectType} from '@kleiolab/lib-sdk-lb4';
import {ProProjectMock} from '../gvDB/ProProjectMock'
import {InfStatementMock} from '../gvDB/InfStatementMock'
import {InfTemporalEntityMock} from '../gvDB/InfTemporalEntityMock'
import {DfhApiPropertyMock} from '../gvDB/DfhApiPropertyMock'
import {DfhApiClassMock} from '../gvDB/DfhApiClassMock'
import {InfPersistentItemMock} from '../gvDB/InfPersistentItemMock'
import {GvSubentityFieldPageReqMock} from './GvSubentityFieldPageReq'

export namespace GvFieldPageReqMock {


  export const person1HasAppeTeEn: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    page: {
      fkSourceEntity: InfStatementMock.NAME_1_TO_PERSON.fk_object_info,
      fkProperty: InfStatementMock.NAME_1_TO_PERSON.fk_property,
      isOutgoing: false,

      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    },
    targets: {
      [DfhApiClassMock.EN_365_NAMING.dfh_pk_class]: {
        temporalEntity: [
          {
            ...GvSubentityFieldPageReqMock.appeTeEnRefersToName,
            page: {
              ...GvSubentityFieldPageReqMock.appeTeEnRefersToName.page,
              ...{limit: 1, offset: 0}
            }
          }
        ]
      }
    },
  }

  export const appeTeEnRefersToName: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class]: {
        appellation: 'true' as unknown as SysConfigValueObjectType.AppellationEnum
      }
    },
    page: {
      fkSourceEntity: InfStatementMock.NAME_1_TO_APPE.fk_subject_info,
      fkProperty: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }

  export const madridsPresenceWasAtPlace: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_51_PLACE.dfh_pk_class]: {
        place: 'true' as unknown as SysConfigValueObjectType.AppellationEnum
      }
    },
    page: {
      fkSourceEntity: InfTemporalEntityMock.MADRIDS_PRESENCE.pk_entity,
      fkProperty: DfhApiPropertyMock.EN_148_WAS_AT.dfh_pk_property,
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }


  export const journyeHasDuration: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_689_DURATION.dfh_pk_class]: {
        dimension: {
          measurementUnitClass: DfhApiClassMock.EN_689_DURATION.dfh_pk_class
        }
      }
    },
    page: {
      fkSourceEntity: InfPersistentItemMock.ACCOUNT_OF_JOURNEY.pk_entity,
      fkProperty: DfhApiPropertyMock.EN_1613_HAS_DURATION.dfh_pk_property,
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }
  export const manifSingletonHasShortTitleMurderer: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_784_SHORT_TITLE.dfh_pk_class]: {
        langString: 'true' as unknown as SysConfigValueObjectType.AppellationEnum
      }
    },
    page: {
      fkSourceEntity: InfPersistentItemMock.MANIF_SINGLETON_THE_MURDERER.pk_entity,
      fkProperty: DfhApiPropertyMock.EN_1761_MANIFESTATION_SINGLETON_HAS_SHORT_TITLE.dfh_pk_property,
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }


  export const appeTeEnUsedInLanguage: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_54_LANGUAGE.dfh_pk_class]: {
        language: 'true' as unknown as SysConfigValueObjectType.AppellationEnum
      }
    },
    page: {
      fkSourceEntity: InfTemporalEntityMock.NAMING_1.pk_entity,
      fkProperty: DfhApiPropertyMock.EN_1112_USED_IN_LANGUAGE.dfh_pk_property,
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }


  export const shipVoyageAtSomeTimeWithin: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class]: {
        timePrimitive: 'true' as unknown as SysConfigValueObjectType.AppellationEnum
      }
    },
    page: {
      fkSourceEntity: InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
      fkProperty: DfhApiPropertyMock.EN_72_AT_SOME_TIME_WITHIN.dfh_pk_property,
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }

  export const shipVoyageHasTimeSpan: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_50_TIME_SPAN.dfh_pk_class]: {
        timeSpan: 'true' as unknown as SysConfigValueObjectType.AppellationEnum
      }
    },
    page: {
      fkSourceEntity: InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
      fkProperty: DfhApiPropertyMock.EN_4_HAS_TIME_SPAN.dfh_pk_property,
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 1,
      offset: 0
    }
  }


}
