import {GvLoadSubfieldPageReq, TrueEnum} from '../../../../models'
import {ProProjectMock} from '../gvDB/ProProjectMock'
import {InfStatementMock} from '../gvDB/InfStatementMock'
import {InfTemporalEntityMock} from '../gvDB/InfTemporalEntityMock'
import {DfhApiPropertyMock} from '../gvDB/DfhApiPropertyMock'
import {DfhApiClassMock} from '../gvDB/DfhApiClassMock'
import {InfPersistentItemMock} from '../gvDB/InfPersistentItemMock'
import {GvLoadSubentitySubfieldPageReqMock} from './GvLoadSubentitySubfieldPageReq'

export namespace GvLoadSubfieldPageReqMock {


  export const person1HasAppeTeEn: GvLoadSubfieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    page: {
      fkSourceEntity: InfStatementMock.NAME_1_TO_PERSON.fk_object_info,
      fkProperty: InfStatementMock.NAME_1_TO_PERSON.fk_property,
      isOutgoing: false,
      targetClass: InfTemporalEntityMock.NAMING_1.fk_class,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    },
    subfieldType: {
      temporalEntity: [
        {
          ...GvLoadSubentitySubfieldPageReqMock.appeTeEnRefersToName,
          page: {
            ...GvLoadSubentitySubfieldPageReqMock.appeTeEnRefersToName.page,
            ...{limit: 1, offset: 0}
          }
        }
      ]
    },
  }

  export const appeTeEnRefersToName: GvLoadSubfieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    subfieldType: {
      appellation: TrueEnum.true
    },
    page: {
      fkSourceEntity: InfStatementMock.NAME_1_TO_APPE.fk_subject_info,
      fkProperty: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
      isOutgoing: true,
      targetClass: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }

  export const madridsPresenceWasAtPlace: GvLoadSubfieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    subfieldType: {
      place: TrueEnum.true
    },
    page: {
      fkSourceEntity: InfTemporalEntityMock.MADRIDS_PRESENCE.pk_entity,
      fkProperty: DfhApiPropertyMock.EN_148_WAS_AT.dfh_pk_property,
      isOutgoing: true,
      targetClass: DfhApiClassMock.EN_51_PLACE.dfh_pk_class,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }


  export const journyeHasDuration: GvLoadSubfieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    subfieldType: {
      dimension: {
        measurementUnitClass: DfhApiClassMock.EN_689_DURATION.dfh_pk_class
      }
    },
    page: {
      fkSourceEntity: InfPersistentItemMock.ACCOUNT_OF_JOURNEY.pk_entity,
      fkProperty: DfhApiPropertyMock.EN_1613_HAS_DURATION.dfh_pk_property,
      isOutgoing: true,
      targetClass: DfhApiClassMock.EN_689_DURATION.dfh_pk_class,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }
  export const manifSingletonHasShortTitleMurderer: GvLoadSubfieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    subfieldType: {
      langString: TrueEnum.true
    },
    page: {
      fkSourceEntity: InfPersistentItemMock.MANIF_SINGLETON_THE_MURDERER.pk_entity,
      fkProperty: DfhApiPropertyMock.EN_1761_MANIFESTATION_SINGLETON_HAS_SHORT_TITLE.dfh_pk_property,
      isOutgoing: true,
      targetClass: DfhApiClassMock.EN_784_SHORT_TITLE.dfh_pk_class,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }


  export const appeTeEnUsedInLanguage: GvLoadSubfieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    subfieldType: {
      language: TrueEnum.true
    },
    page: {
      fkSourceEntity: InfTemporalEntityMock.NAMING_1.pk_entity,
      fkProperty: DfhApiPropertyMock.EN_1112_USED_IN_LANGUAGE.dfh_pk_property,
      isOutgoing: true,
      targetClass: DfhApiClassMock.EN_54_LANGUAGE.dfh_pk_class,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }


  export const shipVoyageAtSomeTimeWithin: GvLoadSubfieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    subfieldType: {
      timePrimitive: TrueEnum.true
    },
    page: {
      fkSourceEntity: InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
      fkProperty: DfhApiPropertyMock.EN_72_AT_SOME_TIME_WITHIN.dfh_pk_property,
      isOutgoing: true,
      targetClass: DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }

  export const shipVoyageHasTimeSpan: GvLoadSubfieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    subfieldType: {
      timeSpan: TrueEnum.true
    },
    page: {
      fkSourceEntity: InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
      fkProperty: DfhApiPropertyMock.EN_4_HAS_TIME_SPAN.dfh_pk_property,
      isOutgoing: true,
      targetClass: DfhApiClassMock.EN_50_TIME_SPAN.dfh_pk_class,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 1,
      offset: 0
    }
  }


}
