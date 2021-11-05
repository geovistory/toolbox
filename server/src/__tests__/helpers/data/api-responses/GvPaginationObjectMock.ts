import {GvFieldPage, GvPaginationObject, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfStatement, ProInfoProjRel, WarEntityPreview} from '../../../../models'
import {CalendarType} from '../../../../models/entity-preview/CalendarType'
import {Granularity} from '../../../../models/entity-preview/Granularity'
import {StatementWithTarget} from '../../../../models/field-response/gv-statement-with-target'
import {SatementTarget} from '../../../../models/field-response/SatementTarget'
import {GvFieldPageReqMock} from '../api-requests/GvFieldPageReq'
import {DfhApiPropertyMock} from '../gvDB/DfhApiPropertyMock'
import {InfAppellationMock} from '../gvDB/InfAppellationMock'
import {InfDimensionMock} from '../gvDB/InfDimensionMock'
import {InfLangStringMock} from '../gvDB/InfLangStringMock'
import {InfLanguageMock} from '../gvDB/InfLanguageMock'
import {InfPlaceMock} from '../gvDB/InfPlaceMock'
import {InfResourceMock} from '../gvDB/InfResourceMock'
import {InfStatementMock} from '../gvDB/InfStatementMock'
import {InfTimePrimitiveMock} from '../gvDB/InfTimePrimitiveMock'
import {DfhApiProperty, OmitEntity} from '../gvDB/local-model.helpers'
import {ProInfoProjRelMock} from '../gvDB/ProInfoProjRelMock'
import {ProProjectMock} from '../gvDB/ProProjectMock'
import {PubAccountMock} from '../gvDB/PubAccountMock'
import {WarEntityPreviewMock} from '../gvDB/WarEntityPreviewMock'

function createStatementWithTarget(statement: OmitEntity<InfStatement>, projRel: OmitEntity<ProInfoProjRel>, accountId = 1001, target: SatementTarget): StatementWithTarget {
  const isOutgoing = GvFieldPageReqMock.appeTeEnRefersToName.page.isOutgoing
  return {
    isOutgoing,
    ordNum: 0,
    statement,
    target,
    targetClass: target.appellation?.fk_class ??
      target.dimension?.fk_class ??
      target.entity?.fkClass ??
      target.entityPreview?.fk_class ??
      target.langString?.fk_class ??
      target.place?.fk_class ??
      (target.timePrimitive ? 54 : target.timeSpan ? 4 : 0),
    targetLabel: InfAppellationMock.JACK_THE_FOO.string as string,
    projRel
  }
}

export namespace GvPaginationObjectMock {
  export const appeTeEnHasAppeVt: GvPaginationObject = {
    subfieldPages: [
      {
        page: GvFieldPageReqMock.appeTeEnRefersToName.page,
        count: 1,
        paginatedStatements: [

        ],
      }
    ]
  }
  export const appeTeEnUsedInLanguage: GvPaginationObject = {
    subfieldPages: [
      {
        page: GvFieldPageReqMock.appeTeEnUsedInLanguage.page,
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.NAME_1_TO_LANG,
            ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_LANG,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              language: InfLanguageMock.ENGLISH as InfLanguage
            }
          )
        ],
      }
    ],

  }
  export const appeTeEnIsAppeOfPerson: GvPaginationObject = {
    subfieldPages: [
      {
        page: GvFieldPageReqMock.appeTeEnIsAppeOfPerson.page,
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.NAME_1_TO_PERSON,
            ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              entity: {
                fkClass: InfResourceMock.PERSON_1.fk_class,
                pkEntity: InfResourceMock.PERSON_1.pk_entity as number,
              },
              entityPreview: WarEntityPreviewMock.PERSON_1 as WarEntityPreview
            }
          )
        ],
      }
    ],
  }
  export const madridsPresenceWasAtPlace: GvPaginationObject = {
    subfieldPages: [
      {
        page: GvFieldPageReqMock.madridsPresenceWasAtPlace.page,
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.MADRIDS_PRESENCE_WAS_AT_PLACE_123,
            ProInfoProjRelMock.PROJ_1_STMT_MADRIDS_PRESENCE_WAS_AT_PLACE_123,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              place: InfPlaceMock.PLACE_123 as InfPlace,
            }
          )
        ],
      }
    ],
  }
  export const journeyHasDuration: GvPaginationObject = {
    subfieldPages: [
      {
        page: GvFieldPageReqMock.journyeHasDuration.page,
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.ACCOUNT_OF_JOURNEY_HAS_DURATION,
            ProInfoProjRelMock.PROJ_1_STMT_ACCOUNT_OF_JOURNEY_HAS_DURATION,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              dimension: InfDimensionMock.ONE_MONTH as InfDimension,
              entityPreview: WarEntityPreviewMock.TIME_UNIT_ONE_MONTH as WarEntityPreview
            }
          )],
      }
    ],
  }

  export const manifSingletonHasShortTitleMurderer: GvPaginationObject = {
    subfieldPages: [
      {
        page: GvFieldPageReqMock.manifSingletonHasShortTitleMurderer.page,
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER,
            ProInfoProjRelMock.PROJ_1_STMT_MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              langString: InfLangStringMock.EN_SHORT_TITLE_THE_MURDERER as InfLangString,
              language: InfLanguageMock.ENGLISH as InfLanguage
            }
          )],
      }
    ]
  }

  export const shipVoyageAtSomeTimeWithin: GvPaginationObject = {
    subfieldPages: [
      {
        page: GvFieldPageReqMock.shipVoyageAtSomeTimeWithin.page,
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2,
            ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              timePrimitive: {
                duration: InfTimePrimitiveMock.TP_2.duration as Granularity,
                julianDay: InfTimePrimitiveMock.TP_2.julian_day,
                calendar: ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2.calendar as CalendarType,
              }
            }
          )
        ],
      }
    ],
  }
  export const shipVoyageHasTimeSpan: GvPaginationObject = {
    subfieldPages: [
      {
        page: createTimeSpanSubPage(
          InfResourceMock.SHIP_VOYAGE.pk_entity as number,
          DfhApiPropertyMock.EN_71_ONGOING_THROUGHOUT
        ),
        count: 0,
        paginatedStatements: [],
      },
      {
        page: createTimeSpanSubPage(
          InfResourceMock.SHIP_VOYAGE.pk_entity as number,
          DfhApiPropertyMock.EN_72_AT_SOME_TIME_WITHIN
        ),
        count: 0,
        paginatedStatements: [],
      },
      {
        page: createTimeSpanSubPage(
          InfResourceMock.SHIP_VOYAGE.pk_entity as number,
          DfhApiPropertyMock.EN_152_BEGIN_OF_THE_BEGIN
        ),
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5,
            ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              timePrimitive: {
                duration: InfTimePrimitiveMock.TP_5.duration as Granularity,
                julianDay: InfTimePrimitiveMock.TP_5.julian_day,
                calendar: ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5.calendar as CalendarType,
              }
            }
          )
        ],
      },
      {
        page: createTimeSpanSubPage(
          InfResourceMock.SHIP_VOYAGE.pk_entity as number,
          DfhApiPropertyMock.EN_150_END_OF_THE_BEGIN
        ),
        count: 0,
        paginatedStatements: [],
      },
      {
        page: createTimeSpanSubPage(
          InfResourceMock.SHIP_VOYAGE.pk_entity as number,
          DfhApiPropertyMock.EN_151_BEGIN_OF_THE_END
        ),
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4,
            ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              timePrimitive: {
                duration: InfTimePrimitiveMock.TP_4.duration as Granularity,
                julianDay: InfTimePrimitiveMock.TP_4.julian_day,
                calendar: ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4.calendar as CalendarType,
              }
            }
          )
        ],
      },
      {
        page: createTimeSpanSubPage(
          InfResourceMock.SHIP_VOYAGE.pk_entity as number,
          DfhApiPropertyMock.EN_153_END_OF_THE_END
        ),
        count: 0,
        paginatedStatements: [],
      },
    ],

  }

  export const personHasAppeTeEn: GvPaginationObject = {
    subfieldPages: [
      {
        page: GvFieldPageReqMock.person1HasAppeTeEn.page,
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.NAME_1_TO_PERSON,
            ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              entity: {
                fkClass: InfResourceMock.PERSON_1.fk_class,
                pkEntity: InfResourceMock.PERSON_1.pk_entity as number,
              },
              entityPreview: WarEntityPreviewMock.PERSON_1 as WarEntityPreview
            }
          )
        ],
      },
      {
        page: {...GvFieldPageReqMock.appeTeEnRefersToName.page, limit: 1},
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.NAME_1_TO_APPE,
            ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              appellation: InfAppellationMock.JACK_THE_FOO as InfAppellation
            }
          )
        ],
      },
    ],
  }

}

export function createTimeSpanSubPage(sourceEntity: number, property: DfhApiProperty): GvFieldPage {
  return {
    source: {fkInfo: sourceEntity},
    property: {fkProperty: property.dfh_pk_property},
    isOutgoing: true,
    // targetClass: DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class,
    scope: {inProject: ProProjectMock.PROJECT_1.pk_entity as number},
    limit: 1,
    offset: 0
  }
}
