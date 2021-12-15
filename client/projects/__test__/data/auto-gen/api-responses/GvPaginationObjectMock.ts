import {GvFieldPageReq, GvPaginationObject, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfStatement, InfTimePrimitive, ProInfoProjRel, WarEntityPreview} from '@kleiolab/lib-sdk-lb4';
import {TrueEnum} from '../enums/TrueEnum';
import {StatementWithTarget} from '@kleiolab/lib-sdk-lb4';
import {SatementTarget} from '@kleiolab/lib-sdk-lb4';
import {GvFieldPageReqMock} from '../api-requests/GvFieldPageReq'
import {DfhApiClassMock} from '../gvDB/DfhApiClassMock'
import {DfhApiPropertyMock} from '../gvDB/DfhApiPropertyMock'
import {InfAppellationMock} from '../gvDB/InfAppellationMock'
import {InfDimensionMock} from '../gvDB/InfDimensionMock'
import {InfLangStringMock} from '../gvDB/InfLangStringMock'
import {InfLanguageMock} from '../gvDB/InfLanguageMock'
import {InfPlaceMock} from '../gvDB/InfPlaceMock'
import {InfResourceMock} from '../gvDB/InfResourceMock'
import {InfStatementMock} from '../gvDB/InfStatementMock'
import {DEFAULT_CAL, DEFAULT_DURATION, InfTimePrimitiveMock} from '../gvDB/InfTimePrimitiveMock'
import {DfhApiProperty, OmitEntity} from '../gvDB/local-model.helpers'
import {ProInfoProjRelMock} from '../gvDB/ProInfoProjRelMock'
import {ProProjectMock} from '../gvDB/ProProjectMock'
import {PubAccountMock} from '../gvDB/PubAccountMock'
import {WarEntityPreviewMock} from '../gvDB/WarEntityPreviewMock'

export function createStatementWithTarget(statement: OmitEntity<InfStatement>, accountId = 1001, target: SatementTarget, isOutgoing: boolean, projRel?: OmitEntity<ProInfoProjRel>): StatementWithTarget {

  let targetLabel = ''
  if (target.appellation) {
    targetLabel = target.appellation?.string ?? ''
  }
  else if (target.dimension) {
    targetLabel = `${target.dimension.dimension.numeric_value} ${target.dimension?.unitPreview?.entity_label}` // todo add  ${unitPreview.entity_label}
  }
  else if (target.langString) {
    targetLabel = `${target.langString.langString.string} (${target.langString.language.iso6391})` // todo add
  }
  else if (target.language) {
    targetLabel = `${target.language.notes ?? target.language.iso6391}` // todo add  (${language.iso6391})
  }
  else if (target.entity) {
    targetLabel = `${target.entity.entityPreview?.entity_label}`
  }
  else if (target.timePrimitive) {
    targetLabel = `todo` // todo
  }
  else if (target.place) {
    targetLabel = `WGS84: ${target.place.lat}°, ${target.place.long}°`    // todo
  }
  return {
    isOutgoing,
    ordNum: isOutgoing ? projRel?.ord_num_of_range : projRel?.ord_num_of_domain,
    statement,
    target,
    targetClass: target.appellation?.fk_class ??
      target.dimension?.dimension.fk_class ??
      target.entity?.resource.fk_class ??
      target.langString?.langString?.fk_class ??
      target.language?.fk_class ??
      target.place?.fk_class ??
      target.timePrimitive?.infTimePrimitive.fk_class ??
      -1,
    targetLabel,
    projRel
  }
}

export namespace GvPaginationObjectMock {
  export const appeTeEnHasAppeVt: GvPaginationObject = {
    subfieldPages: [
      {
        req: GvFieldPageReqMock.appeTeEnRefersToName,
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.NAME_1_TO_APPE,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              appellation: InfAppellationMock.JACK_THE_FOO as InfAppellation
            },
            true,
            ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE,
          )
        ],
      }
    ]
  }

  export const appeTeEnHasAppeVtEmpty: GvPaginationObject = {
    subfieldPages: [
      {
        req: GvFieldPageReqMock.appeTeEnRefersToName,
        count: 0,
        paginatedStatements: [],
      }
    ]
  }
  export const appeTeEnUsedInLanguage: GvPaginationObject = {
    subfieldPages: [
      {
        req: GvFieldPageReqMock.appeTeEnUsedInLanguage,
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.NAME_1_TO_LANG,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              language: InfLanguageMock.ENGLISH as InfLanguage
            },
            true,
            ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_LANG,
          )
        ],
      }
    ],

  }
  export const appeTeEnIsAppeOfPerson: GvPaginationObject = {
    subfieldPages: [
      {
        req: GvFieldPageReqMock.appeTeEnIsAppeOfPerson,
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.NAME_1_TO_PERSON,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              entity: {
                resource: InfResourceMock.PERSON_1 as InfResource,
                entityPreview: WarEntityPreviewMock.PERSON_1 as WarEntityPreview
              }
            },
            true,
            ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON,
          )
        ],
      }
    ],
  }
  export const madridsPresenceWasAtPlace: GvPaginationObject = {
    subfieldPages: [
      {
        req: GvFieldPageReqMock.madridsPresenceWasAtPlace,
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.MADRIDS_PRESENCE_WAS_AT_PLACE_123,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              place: InfPlaceMock.PLACE_123 as InfPlace,
            },
            true,
            ProInfoProjRelMock.PROJ_1_STMT_MADRIDS_PRESENCE_WAS_AT_PLACE_123,
          )
        ],
      }
    ],
  }
  export const journeyHasDuration: GvPaginationObject = {
    subfieldPages: [
      {
        req: GvFieldPageReqMock.journyeHasDuration,
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.ACCOUNT_OF_JOURNEY_HAS_DURATION,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              dimension: {
                dimension: InfDimensionMock.ONE_MONTH as InfDimension,
                unitPreview: WarEntityPreviewMock.TIME_UNIT_ONE_MONTH as WarEntityPreview
              }
            },
            true,
            ProInfoProjRelMock.PROJ_1_STMT_ACCOUNT_OF_JOURNEY_HAS_DURATION,
          )],
      }
    ],
  }

  export const manifSingletonHasShortTitleMurderer: GvPaginationObject = {
    subfieldPages: [
      {
        req: GvFieldPageReqMock.manifSingletonHasShortTitleMurderer,
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              langString: {
                langString: InfLangStringMock.EN_SHORT_TITLE_THE_MURDERER as InfLangString,
                language: InfLanguageMock.ENGLISH as InfLanguage
              }
            },
            true,
            ProInfoProjRelMock.PROJ_1_STMT_MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER,
          )],
      }
    ]
  }

  export const shipVoyageAtSomeTimeWithin: GvPaginationObject = {
    subfieldPages: [
      {
        req: GvFieldPageReqMock.shipVoyageAtSomeTimeWithin,
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              timePrimitive: {
                infTimePrimitive: InfTimePrimitiveMock.TP_2 as InfTimePrimitive,
                timePrimitive: {
                  duration: InfTimePrimitiveMock.TP_2.duration ?? DEFAULT_DURATION,
                  julianDay: InfTimePrimitiveMock.TP_2.julian_day,
                  calendar: ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2.calendar ?? DEFAULT_CAL,
                }
              }
            },
            true,
            ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2,
          )
        ],
      }
    ],
  }
  export const shipVoyageHasTimeSpan: GvPaginationObject = {
    subfieldPages: [
      {
        req: createTimeSpanSubPage(
          InfResourceMock.SHIP_VOYAGE.pk_entity as number,
          DfhApiPropertyMock.EN_71_ONGOING_THROUGHOUT
        ),
        count: 0,
        paginatedStatements: [],
      },
      {
        req: createTimeSpanSubPage(
          InfResourceMock.SHIP_VOYAGE.pk_entity as number,
          DfhApiPropertyMock.EN_72_AT_SOME_TIME_WITHIN
        ),
        count: 0,
        paginatedStatements: [],
      },
      {
        req: createTimeSpanSubPage(
          InfResourceMock.SHIP_VOYAGE.pk_entity as number,
          DfhApiPropertyMock.EN_152_BEGIN_OF_THE_BEGIN
        ),
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5,
            PubAccountMock.GAETAN_VERIFIED.id,

            {
              timePrimitive: {
                infTimePrimitive: InfTimePrimitiveMock.TP_5 as InfTimePrimitive,
                timePrimitive: {
                  duration: InfTimePrimitiveMock.TP_5.duration ?? DEFAULT_DURATION,
                  julianDay: InfTimePrimitiveMock.TP_5.julian_day,
                  calendar: ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5.calendar ?? DEFAULT_CAL,
                }
              }
            },
            true,
            ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5,
          )
        ],
      },
      {
        req: createTimeSpanSubPage(
          InfResourceMock.SHIP_VOYAGE.pk_entity as number,
          DfhApiPropertyMock.EN_150_END_OF_THE_BEGIN
        ),
        count: 0,
        paginatedStatements: [],
      },
      {
        req: createTimeSpanSubPage(
          InfResourceMock.SHIP_VOYAGE.pk_entity as number,
          DfhApiPropertyMock.EN_151_BEGIN_OF_THE_END
        ),
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              timePrimitive: {
                infTimePrimitive: InfTimePrimitiveMock.TP_4 as InfTimePrimitive,
                timePrimitive: {
                  duration: InfTimePrimitiveMock.TP_4.duration ?? DEFAULT_DURATION,
                  julianDay: InfTimePrimitiveMock.TP_4.julian_day,
                  calendar: ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4.calendar ?? DEFAULT_CAL,
                }
              }
            },
            true,
            ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4,
          )
        ],
      },
      {
        req: createTimeSpanSubPage(
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
        req: {
          ...GvFieldPageReqMock.person1HasAppeTeEn,
          page: {...GvFieldPageReqMock.person1HasAppeTeEn.page, isOutgoing: false},
        },
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.NAME_1_TO_PERSON,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              entity: {
                resource: InfResourceMock.NAMING_1 as InfResource,
                entityPreview: WarEntityPreviewMock.NAMING_1 as WarEntityPreview
              }
            },
            false,
            ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON,
          )
        ],
      },
      {
        req: {
          ...GvFieldPageReqMock.appeTeEnRefersToName,
          page: {...GvFieldPageReqMock.appeTeEnRefersToName.page, limit: 1},
        },
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.NAME_1_TO_APPE,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              appellation: InfAppellationMock.JACK_THE_FOO as InfAppellation
            },
            true,
            ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE,
          )
        ],
      },
    ],
  }
  export const personHasTwoAppeTeEn: GvPaginationObject = {
    subfieldPages: [
      {
        req: {
          ...GvFieldPageReqMock.person1HasAppeTeEn,
          page: {...GvFieldPageReqMock.person1HasAppeTeEn.page, isOutgoing: false},
        },
        count: 2,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.NAME_1_TO_PERSON,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              entity: {
                resource: InfResourceMock.NAMING_1 as InfResource,
                entityPreview: WarEntityPreviewMock.NAMING_1 as WarEntityPreview
              }
            },
            false,
            ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON,
          ),
          createStatementWithTarget(
            InfStatementMock.NAME_2_TO_PERSON,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              entity: {
                resource: InfResourceMock.NAMING_2 as InfResource,
                entityPreview: WarEntityPreviewMock.NAMING_2 as WarEntityPreview
              }
            },
            false,
            ProInfoProjRelMock.PROJ_1_STMT_NAME_2_TO_PERSON,
          )
        ],
      },
      {
        req: {
          ...GvFieldPageReqMock.appeTeEnRefersToName,
          page: {...GvFieldPageReqMock.appeTeEnRefersToName.page, limit: 1},
        },
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.NAME_1_TO_APPE,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              appellation: InfAppellationMock.JACK_THE_FOO as InfAppellation
            },
            true,
            ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE,
          )
        ],
      },
      {
        req: {
          ...GvFieldPageReqMock.appeTeEn2RefersToName,
          page: {...GvFieldPageReqMock.appeTeEn2RefersToName.page, limit: 1},
        },
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.NAME_2_TO_APPE,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              appellation: InfAppellationMock.JACK as InfAppellation
            },
            true,
            ProInfoProjRelMock.PROJ_1_STMT_NAME_2_TO_APPE,
          )
        ],
      },
    ],
  }
  export const statementOfStatementHasExactReference: GvPaginationObject = {
    subfieldPages: [
      {
        req: GvFieldPageReqMock.statementOfStatementHasExactReference,
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.MENTIONS_STMT_HAS_EXACT_REFERENCE,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              langString: {
                langString: InfLangStringMock.EN_PAGE_1 as InfLangString,
                language: InfLanguageMock.ENGLISH as InfLanguage
              }
            },
            true,
            ProInfoProjRelMock.PROJ_1_STMT_MENTIONS_STMT_HAS_EXACT_REFERENCE,
          )],
      }
    ]
  }


  export const definitionHasValueVersion: GvPaginationObject = {
    subfieldPages: [
      {
        req: GvFieldPageReqMock.definitionHasValueVersion,
        count: 1,
        paginatedStatements: [
          createStatementWithTarget(
            InfStatementMock.DEFINITION_1_HAS_VALUE_VERSION_2,
            ProInfoProjRelMock.PROJ_1_STMT_DEFINITION_1_HAS_VALUE_VERSION_2,
            PubAccountMock.GAETAN_VERIFIED.id,
            {
              appellation: InfAppellationMock.VALUE_VERSION_2 as InfAppellation
            },
            true
          )],
      }
    ],
  }
}





export function createTimeSpanSubPage(sourceEntity: number, property: DfhApiProperty): GvFieldPageReq {
  return {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class]: {
        timePrimitive: TrueEnum.true
      }
    },
    page: {
      source: {fkInfo: sourceEntity},
      property: {fkProperty: property.dfh_pk_property},
      isOutgoing: true,
      // targetClass: DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity as number},
      limit: 1,
      offset: 0
    }
  }
}
