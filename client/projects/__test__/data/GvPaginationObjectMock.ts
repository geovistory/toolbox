import { GvPaginationObject } from '@kleiolab/lib-sdk-lb4';
import { DfhApiClassMock } from './auto-gen/DfhApiClassMock';
import { DfhApiPropertyMock } from './auto-gen/DfhApiPropertyMock';
import { InfAppellationMock } from './auto-gen/InfAppellationMock';
import { InfDimensionMock } from './auto-gen/InfDimensionMock';
import { InfLangStringMock } from './auto-gen/InfLangStringMock';
import { InfLanguageMock } from './auto-gen/InfLanguageMock';
import { InfPersistentItemMock } from './auto-gen/InfPersistentItemMock';
import { InfPlaceMock } from './auto-gen/InfPlaceMock';
import { InfStatementMock } from './auto-gen/InfStatementMock';
import { InfTemporalEntityMock } from './auto-gen/InfTemporalEntityMock';
import { InfTimePrimitiveMock } from './auto-gen/InfTimePrimitiveMock';
import { DfhApiProperty } from './auto-gen/local-model.helpers';
import { ProInfoProjRelMock } from './auto-gen/ProInfoProjRelMock';
import { ProProjectMock } from './auto-gen/ProProjectMock';
import { WarEntityPreviewMock } from './auto-gen/WarEntityPreviewMock';
import { GvLoadSubfieldPageReqMock } from './GvLoadSubfieldPageReq';

export namespace GvPaginationObjectMock {
  export const appeTeEnHasAppeVt: GvPaginationObject = {
    subfieldPages: [
      {
        page: GvLoadSubfieldPageReqMock.appeTeEnRefersToName.page,
        count: 1,
        paginatedStatements: [
          InfStatementMock.NAME_1_TO_APPE.pk_entity
        ],
      }
    ],
    schemas: {
      inf: {
        statement: [
          InfStatementMock.NAME_1_TO_APPE
        ],
        appellation: [
          InfAppellationMock.JACK_THE_FOO
        ]
      },
      pro: {
        info_proj_rel: [
          ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE
        ]
      }
    }
  }
  export const appeTeEnUsedInLanguage: GvPaginationObject = {
    subfieldPages: [
      {
        page: GvLoadSubfieldPageReqMock.appeTeEnUsedInLanguage.page,
        count: 1,
        paginatedStatements: [
          InfStatementMock.NAME_1_TO_LANG.pk_entity
        ],
      }
    ],
    schemas: {
      inf: {
        statement: [
          InfStatementMock.NAME_1_TO_LANG
        ],
        language: [
          InfLanguageMock.ENGLISH
        ]
      },
      pro: {
        info_proj_rel: [
          ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_LANG
        ]
      }
    }
  }

  export const personHasAppeTeEn: GvPaginationObject = {
    subfieldPages: [
      {
        page: GvLoadSubfieldPageReqMock.person1HasAppeTeEn.page,
        count: 1,
        paginatedStatements: [
          InfStatementMock.NAME_1_TO_PERSON.pk_entity
        ],
      },
      {
        page: { ...GvLoadSubfieldPageReqMock.appeTeEnRefersToName.page, limit: 1 },
        count: 1,
        paginatedStatements: [
          InfStatementMock.NAME_1_TO_APPE.pk_entity
        ],
      },
    ],
    schemas: {
      inf: {
        persistent_item: [
          InfPersistentItemMock.PERSON_1
        ],
        temporal_entity: [
          InfTemporalEntityMock.NAMING_1
        ],
        statement: [
          InfStatementMock.NAME_1_TO_PERSON,
          InfStatementMock.NAME_1_TO_APPE
        ],
        appellation: [
          InfAppellationMock.JACK_THE_FOO
        ]
      },
      pro: {
        info_proj_rel: [
          ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE,
          ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON,
        ]
      }
    }
  }

  export const madridsPresenceWasAtPlace: GvPaginationObject = {
    subfieldPages: [
      {
        page: GvLoadSubfieldPageReqMock.madridsPresenceWasAtPlace.page,
        count: 1,
        paginatedStatements: [
          InfStatementMock.MADRIDS_PRESENCE_WAS_AT_PLACE_123.pk_entity
        ],
      }
    ],
    schemas: {
      inf: {
        statement: [
          InfStatementMock.MADRIDS_PRESENCE_WAS_AT_PLACE_123
        ],
        place: [
          InfPlaceMock.PLACE_123
        ]
      },
      pro: {
        info_proj_rel: [
          ProInfoProjRelMock.PROJ_1_STMT_MADRIDS_PRESENCE_WAS_AT_PLACE_123
        ]
      }
    }
  }
  export const journeyHasDuration: GvPaginationObject = {
    subfieldPages: [
      {
        page: GvLoadSubfieldPageReqMock.journyeHasDuration.page,
        count: 1,
        paginatedStatements: [
          InfStatementMock.ACCOUNT_OF_JOURNEY_HAS_DURATION.pk_entity
        ],
      }
    ],
    schemas: {
      inf: {
        statement: [
          InfStatementMock.ACCOUNT_OF_JOURNEY_HAS_DURATION
        ],
        dimension: [
          InfDimensionMock.ONE_MONTH
        ]
      },
      pro: {
        info_proj_rel: [
          ProInfoProjRelMock.PROJ_1_STMT_ACCOUNT_OF_JOURNEY_HAS_DURATION
        ]
      },
      war: {
        entity_preview: [
          WarEntityPreviewMock.TIME_UNIT_ONE_MONTH
        ]
      }
    }
  }
  export const manifSingletonHasShortTitleMurderer: GvPaginationObject = {
    subfieldPages: [
      {
        page: GvLoadSubfieldPageReqMock.manifSingletonHasShortTitleMurderer.page,
        count: 1,
        paginatedStatements: [
          InfStatementMock.MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER.pk_entity
        ],
      }
    ],
    schemas: {
      inf: {
        statement: [
          InfStatementMock.MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER
        ],
        lang_string: [
          InfLangStringMock.EN_SHORT_TITLE_THE_MURDERER
        ],
        language: [
          InfLanguageMock.ENGLISH
        ]
      },
      pro: {
        info_proj_rel: [
          ProInfoProjRelMock.PROJ_1_STMT_MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER
        ]
      },

    }
  }

  export const shipVoyageAtSomeTimeWithin: GvPaginationObject = {
    subfieldPages: [
      {
        page: GvLoadSubfieldPageReqMock.shipVoyageAtSomeTimeWithin.page,
        count: 1,
        paginatedStatements: [
          InfStatementMock.SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2.pk_entity
        ],
      }
    ],
    schemas: {
      inf: {
        statement: [
          InfStatementMock.SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2
        ],
        time_primitive: [
          InfTimePrimitiveMock.TP_2
        ]
      },
      pro: {
        info_proj_rel: [
          ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2
        ]
      },

    }
  }
  export const shipVoyageHasTimeSpan: GvPaginationObject = {
    subfieldPages: [
      {
        page: createTimeSpanSubPage(
          InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
          DfhApiPropertyMock.EN_71_ONGOING_THOUGHOUT
        ),
        count: 0,
        paginatedStatements: [],
      },
      {
        page: createTimeSpanSubPage(
          InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
          DfhApiPropertyMock.EN_72_AT_SOME_TIME_WITHIN
        ),
        count: 0,
        paginatedStatements: [],
      },
      {
        page: createTimeSpanSubPage(
          InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
          DfhApiPropertyMock.EN_152_BEGIN_OF_THE_BEGIN
        ),
        count: 1,
        paginatedStatements: [
          InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5.pk_entity
        ],
      },
      {
        page: createTimeSpanSubPage(
          InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
          DfhApiPropertyMock.EN_150_END_OF_THE_BEGIN
        ),
        count: 0,
        paginatedStatements: [],
      },
      {
        page: createTimeSpanSubPage(
          InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
          DfhApiPropertyMock.EN_151_BEGIN_OF_THE_END
        ),
        count: 1,
        paginatedStatements: [
          InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4.pk_entity
        ],
      },
      {
        page: createTimeSpanSubPage(
          InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
          DfhApiPropertyMock.EN_153_END_OF_THE_END
        ),
        count: 0,
        paginatedStatements: [],
      },
    ],
    schemas: {
      inf: {
        statement: [
          InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4,
          InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5
        ],
        time_primitive: [
          InfTimePrimitiveMock.TP_4,
          InfTimePrimitiveMock.TP_5
        ]
      },
      pro: {
        info_proj_rel: [
          ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4,
          ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5
        ]
      },

    }
  }
}

export function createTimeSpanSubPage(sourceEntity: number, property: DfhApiProperty) {
  return {
    fkSourceEntity: sourceEntity,
    fkProperty: property.dfh_pk_property,
    isOutgoing: true,
    targetClass: DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class,
    scope: { inProject: ProProjectMock.PROJECT_1.pk_entity },
    limit: 1,
    offset: 0
  }
}
