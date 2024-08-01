import {
  GvFieldPage,
  GvPaginationObject,
  InfAppellation,
  InfDimension,
  InfLangString,
  InfLanguage,
  InfPlace,
  InfResource,
  InfStatement,
  InfTimePrimitive,
  ProInfoProjRel,
  SatementTarget,
  StatementWithTarget,
  WarEntityPreview,
} from '@kleiolab/lib-sdk-lb4';
import { GvFieldPageReqMock } from '../api-requests/GvFieldPageReq';
import { DfhApiPropertyMock } from '../gvDB/DfhApiPropertyMock';
import { InfAppellationMock } from '../gvDB/InfAppellationMock';
import { InfDimensionMock } from '../gvDB/InfDimensionMock';
import { InfLangStringMock } from '../gvDB/InfLangStringMock';
import { InfLanguageMock } from '../gvDB/InfLanguageMock';
import { InfPlaceMock } from '../gvDB/InfPlaceMock';
import { InfResourceMock } from '../gvDB/InfResourceMock';
import { InfStatementMock } from '../gvDB/InfStatementMock';
import {
  DEFAULT_DURATION,
  InfTimePrimitiveMock,
} from '../gvDB/InfTimePrimitiveMock';
import { NewDfhApiProperty, OmitEntity } from '../gvDB/local-model.helpers';
import { ProInfoProjRelMock } from '../gvDB/ProInfoProjRelMock';
import { ProProjectMock } from '../gvDB/ProProjectMock';
import { PubAccountMock } from '../gvDB/PubAccountMock';
import { WarEntityPreviewMock } from '../gvDB/WarEntityPreviewMock';

export function createStatementWithTarget(
  statement: OmitEntity<InfStatement>,
  accountId = 1001,
  target: SatementTarget,
  isOutgoing: boolean,
  projRel?: OmitEntity<ProInfoProjRel>
): StatementWithTarget {
  let targetLabel = '';
  if (target.appellation) {
    targetLabel = target.appellation?.string ?? '';
  } else if (target.dimension) {
    targetLabel = `${target.dimension.dimension.numeric_value} ${target.dimension?.unitPreview?.entity_label}`; // todo add  ${unitPreview.entity_label}
  } else if (target.langString) {
    targetLabel = `${target.langString.langString.string} (${target.langString.language.iso6391})`; // todo add
  } else if (target.language) {
    targetLabel = `${target.language.notes ?? target.language.iso6391}`; // todo add  (${language.iso6391})
  } else if (target.entity) {
    targetLabel = `${target.entity.entityPreview?.entity_label}`;
  } else if (target.timePrimitive) {
    targetLabel = `todo`; // todo
  } else if (target.place) {
    targetLabel = `WGS84: ${target.place.lat}°, ${target.place.long}°`; // todo
  }
  return {
    isOutgoing,
    ordNum: isOutgoing ? projRel?.ord_num_of_range : projRel?.ord_num_of_domain,
    statement,
    target,
    targetClass:
      target.appellation?.fk_class ??
      target.dimension?.dimension.fk_class ??
      target.entity?.resource.fk_class ??
      target.langString?.langString?.fk_class ??
      target.language?.fk_class ??
      target.place?.fk_class ??
      target.timePrimitive?.infTimePrimitive.fk_class ??
      -1,
    targetLabel,
    projRel,
  };
}

const appeTeEnHasAppeVt: GvPaginationObject = {
  subfieldPages: [
    {
      page: GvFieldPageReqMock.appeTeEnRefersToName.page,
      count: 1,
      paginatedStatements: [
        createStatementWithTarget(
          InfStatementMock.NAME_1_TO_APPE,
          PubAccountMock.GAETAN_VERIFIED.id,
          {
            appellation: InfAppellationMock.JACK_THE_FOO as InfAppellation,
          },
          true,
          ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE
        ),
      ],
    },
  ],
};

const appeTeEnHasAppeVtEmpty: GvPaginationObject = {
  subfieldPages: [
    {
      page: GvFieldPageReqMock.appeTeEnRefersToName.page,
      count: 0,
      paginatedStatements: [],
    },
  ],
};
const appeTeEnUsedInLanguage: GvPaginationObject = {
  subfieldPages: [
    {
      page: GvFieldPageReqMock.appeTeEnUsedInLanguage.page,
      count: 1,
      paginatedStatements: [
        createStatementWithTarget(
          InfStatementMock.NAME_1_TO_LANG,
          PubAccountMock.GAETAN_VERIFIED.id,
          {
            language: InfLanguageMock.ENGLISH as InfLanguage,
          },
          true,
          ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_LANG
        ),
      ],
    },
  ],
};
const appeTeEnIsAppeOfPerson: GvPaginationObject = {
  subfieldPages: [
    {
      page: GvFieldPageReqMock.appeTeEnIsAppeOfPerson.page,
      count: 1,
      paginatedStatements: [
        createStatementWithTarget(
          InfStatementMock.NAME_1_TO_PERSON,
          PubAccountMock.GAETAN_VERIFIED.id,
          {
            entity: {
              resource: InfResourceMock.PERSON_1 as InfResource,
              entityPreview: WarEntityPreviewMock.PERSON_1 as WarEntityPreview,
            },
          },
          true,
          ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON
        ),
      ],
    },
  ],
};
const madridsPresenceWasAtPlace: GvPaginationObject = {
  subfieldPages: [
    {
      page: GvFieldPageReqMock.madridsPresenceWasAtPlace.page,
      count: 1,
      paginatedStatements: [
        createStatementWithTarget(
          InfStatementMock.MADRIDS_PRESENCE_WAS_AT_PLACE_123,
          PubAccountMock.GAETAN_VERIFIED.id,
          {
            place: InfPlaceMock.PLACE_123 as InfPlace,
          },
          true,
          ProInfoProjRelMock.PROJ_1_STMT_MADRIDS_PRESENCE_WAS_AT_PLACE_123
        ),
      ],
    },
  ],
};
const journeyHasDuration: GvPaginationObject = {
  subfieldPages: [
    {
      page: GvFieldPageReqMock.journyeHasDuration.page,
      count: 1,
      paginatedStatements: [
        createStatementWithTarget(
          InfStatementMock.ACCOUNT_OF_JOURNEY_HAS_DURATION,
          PubAccountMock.GAETAN_VERIFIED.id,
          {
            dimension: {
              dimension: InfDimensionMock.ONE_MONTH as InfDimension,
              unitPreview:
                WarEntityPreviewMock.TIME_UNIT_ONE_MONTH as WarEntityPreview,
            },
          },
          true,
          ProInfoProjRelMock.PROJ_1_STMT_ACCOUNT_OF_JOURNEY_HAS_DURATION
        ),
      ],
    },
  ],
};

const manifSingletonHasShortTitleMurderer: GvPaginationObject = {
  subfieldPages: [
    {
      page: GvFieldPageReqMock.manifSingletonHasShortTitleMurderer.page,
      count: 1,
      paginatedStatements: [
        createStatementWithTarget(
          InfStatementMock.MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER,
          PubAccountMock.GAETAN_VERIFIED.id,
          {
            langString: {
              langString:
                InfLangStringMock.EN_SHORT_TITLE_THE_MURDERER as InfLangString,
              language: InfLanguageMock.ENGLISH as InfLanguage,
            },
          },
          true,
          ProInfoProjRelMock.PROJ_1_STMT_MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER
        ),
      ],
    },
  ],
};

const shipVoyageAtSomeTimeWithin: GvPaginationObject = {
  subfieldPages: [
    {
      page: GvFieldPageReqMock.shipVoyageAtSomeTimeWithin.page,
      count: 1,
      paginatedStatements: [
        createStatementWithTarget(
          InfStatementMock.SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2,
          PubAccountMock.GAETAN_VERIFIED.id,
          {
            timePrimitive: {
              infTimePrimitive: InfTimePrimitiveMock.TP_2 as InfTimePrimitive,
              timePrimitive: {
                duration:
                  InfTimePrimitiveMock.TP_2.duration ?? DEFAULT_DURATION,
                julianDay: InfTimePrimitiveMock.TP_2.julian_day,
                calendar: InfTimePrimitiveMock.TP_2.calendar,
              },
            },
          },
          true,
          ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2
        ),
      ],
    },
  ],
};
const shipVoyageHasTimeSpan: GvPaginationObject = {
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
          PubAccountMock.GAETAN_VERIFIED.id,

          {
            timePrimitive: {
              infTimePrimitive: InfTimePrimitiveMock.TP_5 as InfTimePrimitive,
              timePrimitive: {
                duration:
                  InfTimePrimitiveMock.TP_5.duration ?? DEFAULT_DURATION,
                julianDay: InfTimePrimitiveMock.TP_5.julian_day,
                calendar: InfTimePrimitiveMock.TP_5.calendar,
              },
            },
          },
          true,
          ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5
        ),
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
          PubAccountMock.GAETAN_VERIFIED.id,
          {
            timePrimitive: {
              infTimePrimitive: InfTimePrimitiveMock.TP_4 as InfTimePrimitive,
              timePrimitive: {
                duration:
                  InfTimePrimitiveMock.TP_4.duration ?? DEFAULT_DURATION,
                julianDay: InfTimePrimitiveMock.TP_4.julian_day,
                calendar: InfTimePrimitiveMock.TP_4.calendar,
              },
            },
          },
          true,
          ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4
        ),
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
};

const personHasAppeTeEn: GvPaginationObject = {
  subfieldPages: [
    {
      page: {
        ...GvFieldPageReqMock.person1HasAppeTeEn.page,
        isOutgoing: false,
      },
      count: 1,
      paginatedStatements: [
        createStatementWithTarget(
          InfStatementMock.NAME_1_TO_PERSON,
          PubAccountMock.GAETAN_VERIFIED.id,
          {
            entity: {
              resource: InfResourceMock.NAMING_1 as InfResource,
              entityPreview: WarEntityPreviewMock.NAMING_1 as WarEntityPreview,
            },
          },
          false,
          ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON
        ),
      ],
    },
    {
      page: {
        ...GvFieldPageReqMock.appeTeEnRefersToName.page,
        limit: 1,
      },
      count: 1,
      paginatedStatements: [
        createStatementWithTarget(
          InfStatementMock.NAME_1_TO_APPE,
          PubAccountMock.GAETAN_VERIFIED.id,
          {
            appellation: InfAppellationMock.JACK_THE_FOO as InfAppellation,
          },
          true,
          ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE
        ),
      ],
    },
  ],
};
const personHasTwoAppeTeEn: GvPaginationObject = {
  subfieldPages: [
    {
      page: {
        ...GvFieldPageReqMock.person1HasAppeTeEn.page,
        isOutgoing: false,
      },
      count: 2,
      paginatedStatements: [
        createStatementWithTarget(
          InfStatementMock.NAME_1_TO_PERSON,
          PubAccountMock.GAETAN_VERIFIED.id,
          {
            entity: {
              resource: InfResourceMock.NAMING_1 as InfResource,
              entityPreview: WarEntityPreviewMock.NAMING_1 as WarEntityPreview,
            },
          },
          false,
          ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON
        ),
        createStatementWithTarget(
          InfStatementMock.NAME_2_TO_PERSON,
          PubAccountMock.GAETAN_VERIFIED.id,
          {
            entity: {
              resource: InfResourceMock.NAMING_2 as InfResource,
              entityPreview: WarEntityPreviewMock.NAMING_2 as WarEntityPreview,
            },
          },
          false,
          ProInfoProjRelMock.PROJ_1_STMT_NAME_2_TO_PERSON
        ),
      ],
    },
    {
      page: { ...GvFieldPageReqMock.appeTeEnRefersToName.page, limit: 1 },
      count: 1,
      paginatedStatements: [
        createStatementWithTarget(
          InfStatementMock.NAME_1_TO_APPE,
          PubAccountMock.GAETAN_VERIFIED.id,
          {
            appellation: InfAppellationMock.JACK_THE_FOO as InfAppellation,
          },
          true,
          ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE
        ),
      ],
    },
    {
      page: { ...GvFieldPageReqMock.appeTeEn2RefersToName.page, limit: 1 },
      count: 1,
      paginatedStatements: [
        createStatementWithTarget(
          InfStatementMock.NAME_2_TO_APPE,
          PubAccountMock.GAETAN_VERIFIED.id,
          {
            appellation: InfAppellationMock.JACK as InfAppellation,
          },
          true,
          ProInfoProjRelMock.PROJ_1_STMT_NAME_2_TO_APPE
        ),
      ],
    },
  ],
};
// const statementOfStatementHasExactReference: GvPaginationObject = {
//   subfieldPages: [
//     {
//       page: GvFieldPageReqMock.statementOfStatementHasExactReference.page,
//       count: 1,
//       paginatedStatements: [
//         createStatementWithTarget(
//           InfStatementMock.MENTIONS_STMT_HAS_EXACT_REFERENCE,
//           PubAccountMock.GAETAN_VERIFIED.id,
//           {
//             langString: {
//               langString: InfLangStringMock.EN_PAGE_1 as InfLangString,
//               language: InfLanguageMock.ENGLISH as InfLanguage
//             }
//           },
//           true,
//           ProInfoProjRelMock.PROJ_1_STMT_MENTIONS_STMT_HAS_EXACT_REFERENCE,
//         )],
//     }
//   ]
// }

const definitionHasValueVersion: GvPaginationObject = {
  subfieldPages: [
    {
      page: GvFieldPageReqMock.definitionHasValueVersion.page,
      count: 1,
      paginatedStatements: [
        createStatementWithTarget(
          InfStatementMock.DEFINITION_1_HAS_VALUE_VERSION_2,
          PubAccountMock.GAETAN_VERIFIED.id,
          {
            appellation: InfAppellationMock.VALUE_VERSION_2 as InfAppellation,
          },
          true,
          ProInfoProjRelMock.PROJ_1_STMT_DEFINITION_1_HAS_VALUE_VERSION_2
        ),
      ],
    },
  ],
};

export const GvPaginationObjectMock = {
  appeTeEnHasAppeVt,
  appeTeEnHasAppeVtEmpty,
  appeTeEnUsedInLanguage,
  appeTeEnIsAppeOfPerson,
  madridsPresenceWasAtPlace,
  journeyHasDuration,
  manifSingletonHasShortTitleMurderer,
  shipVoyageAtSomeTimeWithin,
  shipVoyageHasTimeSpan,
  personHasAppeTeEn,
  personHasTwoAppeTeEn,
  definitionHasValueVersion,
};

export function createTimeSpanSubPage(
  sourceEntity: number,
  property: NewDfhApiProperty
): GvFieldPage {
  return {
    source: { fkInfo: sourceEntity },
    property: { fkProperty: property.dfh_pk_property },
    isOutgoing: true,
    // targetClass: DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class,
    scope: { inProject: ProProjectMock.PROJECT_1.pk_entity as number },
    limit: 1,
    offset: 0,
  };
}
