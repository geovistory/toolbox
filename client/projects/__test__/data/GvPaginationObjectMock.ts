import { GvPaginationObject } from '@kleiolab/lib-sdk-lb4';
import { InfAppellationMock } from './auto-gen/InfAppellationMock';
import { InfPersistentItemMock } from './auto-gen/InfPersistentItemMock';
import { InfStatementMock } from './auto-gen/InfStatementMock';
import { InfTemporalEntityMock } from './auto-gen/InfTemporalEntityMock';
import { ProInfoProjRelMock } from './auto-gen/ProInfoProjRelMock';
import { GvLoadSubfieldPageReqMock } from './GvLoadSubfieldPageReq';

export namespace GvPaginationObjectMock {
  export const appeTeEnHasAppeVt: GvPaginationObject = {
    subfieldPages: [
      {
        page: GvLoadSubfieldPageReqMock.appeTeEnHasAppeVt.page,
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
        page: GvLoadSubfieldPageReqMock.appeTeEnHasAppeVt.page,
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
}
