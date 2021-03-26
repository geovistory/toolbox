import { infTimePrimToTimePrimWithCal } from '@kleiolab/lib-queries';
import { TimePrimitiveWithCal } from '@kleiolab/lib-sdk-lb4';
import { StatementWithTarget } from 'projects/lib-queries/src/lib/queries/models/StatementWithTarget';
import { DfhApiClassMock } from './auto-gen/gvDB/DfhApiClassMock';
import { InfAppellationMock } from './auto-gen/gvDB/InfAppellationMock';
import { InfDimensionMock } from './auto-gen/gvDB/InfDimensionMock';
import { InfLangStringMock } from './auto-gen/gvDB/InfLangStringMock';
import { InfLanguageMock } from './auto-gen/gvDB/InfLanguageMock';
import { InfPlaceMock } from './auto-gen/gvDB/InfPlaceMock';
import { InfStatementMock } from './auto-gen/gvDB/InfStatementMock';
import { InfTemporalEntityMock } from './auto-gen/gvDB/InfTemporalEntityMock';
import { InfTimePrimitiveMock } from './auto-gen/gvDB/InfTimePrimitiveMock';
import { ProInfoProjRelMock } from './auto-gen/gvDB/ProInfoProjRelMock';
import { WarEntityPreviewMock } from './auto-gen/gvDB/WarEntityPreviewMock';

export namespace StatementWithTargetMock {
  export const appeTeEnHasAppeVtWithTarget: StatementWithTarget = {
    statement: InfStatementMock.NAME_1_TO_APPE,
    projRel: ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE,
    ordNum: ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE.ord_num_of_range,
    isOutgoing: true,
    targetLabel: InfAppellationMock.JACK_THE_FOO.string,
    targetClass: InfAppellationMock.JACK_THE_FOO.fk_class,
    target: {
      appellation: InfAppellationMock.JACK_THE_FOO
    }
  }
  export const appeTeEnUsedInLanguage: StatementWithTarget = {
    statement: InfStatementMock.NAME_1_TO_LANG,
    projRel: ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_LANG,
    ordNum: ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_LANG.ord_num_of_range,
    isOutgoing: true,
    targetLabel: InfLanguageMock.ENGLISH.notes,
    targetClass: InfLanguageMock.ENGLISH.fk_class,
    target: {
      language: InfLanguageMock.ENGLISH
    }
  }
  export const person1HasAppeTeEnWithTarget: StatementWithTarget = {
    statement: InfStatementMock.NAME_1_TO_PERSON,
    projRel: ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON,
    ordNum: ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON.ord_num_of_domain,
    isOutgoing: false,
    targetLabel: '',
    targetClass: InfTemporalEntityMock.NAMING_1.fk_class,
    target: {
      entity: {
        pkEntity: InfTemporalEntityMock.NAMING_1.pk_entity,
        fkClass: InfTemporalEntityMock.NAMING_1.fk_class,
      }
    }
  }
  export const madridsPresenceWasAtPlace: StatementWithTarget = {
    statement: InfStatementMock.MADRIDS_PRESENCE_WAS_AT_PLACE_123,
    projRel: ProInfoProjRelMock.PROJ_1_STMT_MADRIDS_PRESENCE_WAS_AT_PLACE_123,
    ordNum: ProInfoProjRelMock.PROJ_1_STMT_MADRIDS_PRESENCE_WAS_AT_PLACE_123.ord_num_of_range,
    isOutgoing: true,
    targetLabel: `WGS84: ${InfPlaceMock.PLACE_123.lat}°, ${InfPlaceMock.PLACE_123.long}°`,
    targetClass: InfPlaceMock.PLACE_123.fk_class,
    target: {
      place: InfPlaceMock.PLACE_123
    }
  }
  export const journeyHasDuration: StatementWithTarget = {
    statement: InfStatementMock.ACCOUNT_OF_JOURNEY_HAS_DURATION,
    projRel: ProInfoProjRelMock.PROJ_1_STMT_ACCOUNT_OF_JOURNEY_HAS_DURATION,
    ordNum: ProInfoProjRelMock.PROJ_1_STMT_ACCOUNT_OF_JOURNEY_HAS_DURATION.ord_num_of_range,
    isOutgoing: true,
    targetLabel: `${InfDimensionMock.ONE_MONTH.numeric_value} ${WarEntityPreviewMock.TIME_UNIT_ONE_MONTH.entity_label}`,
    targetClass: InfDimensionMock.ONE_MONTH.fk_class,
    target: {
      dimension: InfDimensionMock.ONE_MONTH
    }
  }
  export const manifSingletonHasShortTitleMurderer: StatementWithTarget = {
    statement: InfStatementMock.MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER,
    projRel: ProInfoProjRelMock.PROJ_1_STMT_MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER,
    ordNum: ProInfoProjRelMock.PROJ_1_STMT_MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER.ord_num_of_range,
    isOutgoing: true,
    targetLabel: `${InfLangStringMock.EN_SHORT_TITLE_THE_MURDERER.string} (${InfLanguageMock.ENGLISH.iso6391})`,
    targetClass: InfLangStringMock.EN_SHORT_TITLE_THE_MURDERER.fk_class,
    target: {
      langString: InfLangStringMock.EN_SHORT_TITLE_THE_MURDERER
    }
  }
  export const shipVoyageAtSomeTimeWithin: StatementWithTarget = {
    statement: InfStatementMock.SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2,
    projRel: ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2,
    ordNum: ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2.ord_num_of_range,
    isOutgoing: true,
    targetLabel: `Oct 31, 1756`,
    targetClass: InfTimePrimitiveMock.TP_2.fk_class,
    target: {
      timePrimitive: infTimePrimToTimePrimWithCal(
        InfTimePrimitiveMock.TP_2,
        ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2.calendar as TimePrimitiveWithCal.CalendarEnum
      )
    }
  }

  export const shipVoyageBeginOfBegin: StatementWithTarget = {
    statement: InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5,
    projRel: ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5,
    ordNum: ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5.ord_num_of_range,
    isOutgoing: true,
    targetLabel: `Oct 31, 1756`,
    targetClass: InfTimePrimitiveMock.TP_5.fk_class,
    target: {
      timePrimitive: infTimePrimToTimePrimWithCal(
        InfTimePrimitiveMock.TP_5,
        ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5.calendar as TimePrimitiveWithCal.CalendarEnum
      )
    }
  }
  export const shipVoyageBeginOfEnd: StatementWithTarget = {
    statement: InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4,
    projRel: ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4,
    ordNum: ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4.ord_num_of_range,
    isOutgoing: true,
    targetLabel: `Oct 31, 1756`,
    targetClass: InfTimePrimitiveMock.TP_4.fk_class,
    target: {
      timePrimitive: infTimePrimToTimePrimWithCal(
        InfTimePrimitiveMock.TP_4,
        ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4.calendar as TimePrimitiveWithCal.CalendarEnum
      )
    }
  }

  export const shipVoyageHasTimeSpan: StatementWithTarget = {
    statement: { fk_object_info: InfTemporalEntityMock.SHIP_VOYAGE.pk_entity }, // InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4,
    projRel: undefined, // ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4,
    ordNum: undefined, // ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4.ord_num_of_range,
    isOutgoing: true,
    targetLabel: `Oct 23, 1756 – Nov 2, 1756`,
    targetClass: DfhApiClassMock.EN_50_TIME_SPAN.dfh_pk_class,
    target: {
      timeSpan: {
        subfields: [
          {
            subfield: {
              property: { fkProperty: 71 },
              isOutgoing: true,
              source: { fkInfo: 4004 },
              scope: {
                inProject: 3001
              }
            },
            count: 0,
            statements: []
          },
          {
            subfield: {
              property: { fkProperty: 72 },
              isOutgoing: true,
              source: { fkInfo: 4004 },
              scope: {
                inProject: 3001
              }
            },
            count: 0,
            statements: []
          },
          {
            subfield: {
              property: { fkProperty: 150 },
              isOutgoing: true,
              source: { fkInfo: 4004 },
              scope: {
                inProject: 3001
              }
            },
            count: 0,
            statements: []
          },
          {
            subfield: {
              property: { fkProperty: 151 },
              isOutgoing: true,
              source: { fkInfo: 4004 },
              scope: {
                inProject: 3001
              }
            },
            count: 1,
            statements: [{
              ordNum: undefined,
              statement: {
                pk_entity: 3009,
                fk_subject_info: 4004,
                fk_property: 151,
                fk_object_info: 6004
              },
              isOutgoing: true,
              targetLabel: 'Nov 2, 1756',
              targetClass: 335,
              target: {
                timePrimitive: {
                  julianDay: 2362732,
                  duration: '1 day',
                  calendar: 'gregorian'
                }
              },
              projRel: {
                pk_entity: 2015,
                fk_project: 3001,
                fk_entity: 3009,
                calendar: 'gregorian',
                fk_last_modifier: 1001,
                is_in_project: true
              }
            }]
          },
          {
            subfield: {
              property: { fkProperty: 152 },
              isOutgoing: true,
              source: { fkInfo: 4004 },
              scope: {
                inProject: 3001
              }
            },
            count: 1,
            statements: [{
              ordNum: undefined,
              statement: {
                pk_entity: 3010,
                fk_subject_info: 4004,
                fk_property: 152,
                fk_object_info: 6005
              },
              isOutgoing: true,
              targetLabel: 'Oct 23, 1756',
              targetClass: 335,
              target: {
                timePrimitive: {
                  julianDay: 2362733,
                  duration: '1 day',
                  calendar: 'julian'
                }
              },
              projRel: {
                pk_entity: 2016,
                fk_project: 3001,
                fk_entity: 3010,
                calendar: 'julian',
                fk_last_modifier: 1001,
                is_in_project: true
              }
            }]
          },
          {
            subfield: {
              property: { fkProperty: 153 },
              isOutgoing: true,
              source: { fkInfo: 4004 },
              scope: {
                inProject: 3001
              }
            },
            count: 0,
            statements: []
          }],
        preview: {
          p82a: infTimePrimToTimePrimWithCal(
            InfTimePrimitiveMock.TP_5,
            ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5.calendar as TimePrimitiveWithCal.CalendarEnum
          ),
          p81b: infTimePrimToTimePrimWithCal(
            InfTimePrimitiveMock.TP_4,
            ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4.calendar as TimePrimitiveWithCal.CalendarEnum
          )
        }
      }
    }
  }
}
