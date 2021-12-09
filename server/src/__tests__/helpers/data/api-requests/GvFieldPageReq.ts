import {GvFieldPageReq} from '../../../../models'
import {TrueEnum} from '../../../../models/enums/TrueEnum'
import {DfhApiClassMock} from '../gvDB/DfhApiClassMock'
import {DfhApiPropertyMock} from '../gvDB/DfhApiPropertyMock'
import {InfResourceMock} from '../gvDB/InfResourceMock'
import {InfStatementMock} from '../gvDB/InfStatementMock'
import {ProProjectMock} from '../gvDB/ProProjectMock'
import {GvSubentityFieldPageReqMock} from './GvSubentityFieldPageReq'

export namespace GvFieldPageReqMock {


  export const person1HasAppeTeEn: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    page: {
      source: {fkInfo: InfStatementMock.NAME_1_TO_PERSON.fk_object_info},
      property: {fkProperty: InfStatementMock.NAME_1_TO_PERSON.fk_property},
      isOutgoing: false,

      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    },
    targets: {
      [DfhApiClassMock.EN_365_NAMING.dfh_pk_class]: {
        nestedResource: [
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
        appellation: TrueEnum.true
      }
    },
    page: {
      source: {fkInfo: InfStatementMock.NAME_1_TO_APPE.fk_subject_info},
      property: {fkProperty: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property},
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }

  export const appeTeEn2RefersToName: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class]: {
        appellation: TrueEnum.true
      }
    },
    page: {
      source: {fkInfo: InfStatementMock.NAME_2_TO_APPE.fk_subject_info},
      property: {fkProperty: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property},
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }
  export const appeTeEnIsAppeOfPerson: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_21_PERSON.dfh_pk_class]: {
        entityPreview: TrueEnum.true
      }
    },
    page: {
      source: {fkInfo: InfStatementMock.NAME_1_TO_APPE.fk_subject_info},
      property: {fkProperty: DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON.dfh_pk_property},
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 1,
      offset: 0,
    }
  }

  export const madridsPresenceWasAtPlace: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_51_PLACE.dfh_pk_class]: {
        place: TrueEnum.true
      }
    },
    page: {
      source: {fkInfo: InfResourceMock.MADRIDS_PRESENCE.pk_entity},
      property: {fkProperty: DfhApiPropertyMock.EN_148_WAS_AT.dfh_pk_property},
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
      source: {fkInfo: InfResourceMock.ACCOUNT_OF_JOURNEY.pk_entity},
      property: {fkProperty: DfhApiPropertyMock.EN_1613_HAS_DURATION.dfh_pk_property},
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
        langString: TrueEnum.true
      }
    },
    page: {
      source: {fkInfo: InfResourceMock.MANIF_SINGLETON_THE_MURDERER.pk_entity},
      property: {fkProperty: DfhApiPropertyMock.EN_1761_MANIFESTATION_SINGLETON_HAS_SHORT_TITLE.dfh_pk_property},
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
        language: TrueEnum.true
      }
    },
    page: {
      source: {fkInfo: InfResourceMock.NAMING_1.pk_entity},
      property: {fkProperty: DfhApiPropertyMock.EN_1112_USED_IN_LANGUAGE.dfh_pk_property},
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
        timePrimitive: TrueEnum.true
      }
    },
    page: {
      source: {fkInfo: InfResourceMock.SHIP_VOYAGE.pk_entity},
      property: {fkProperty: DfhApiPropertyMock.EN_72_AT_SOME_TIME_WITHIN.dfh_pk_property},
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }

  export const statementOfStatementHasExactReference: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_785_TEXT.dfh_pk_class]: {
        langString: TrueEnum.true
      }
    },
    page: {
      source: {fkInfo: InfStatementMock.EXPRESSION_MENTIONS_RUDOLF.pk_entity},
      property: {fkPropertyOfProperty: 1},
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }

  // export const shipVoyageHasTimeSpan: GvFieldPageReq = {
  //   pkProject: ProProjectMock.PROJECT_1.pk_entity,
  //   targets: {
  //     [DfhApiClassMock.EN_50_TIME_SPAN.dfh_pk_class]: {
  //       timeSpan: TrueEnum.true
  //     }
  //   },
  //   page: {
  //     source: {fkInfo: InfResourceMock.SHIP_VOYAGE.pk_entity},
  //     property: {fkProperty: DfhApiPropertyMock.EN_4_HAS_TIME_SPAN.dfh_pk_property},
  //     isOutgoing: true,
  //     scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
  //     limit: 1,
  //     offset: 0
  //   }
  // }


}
