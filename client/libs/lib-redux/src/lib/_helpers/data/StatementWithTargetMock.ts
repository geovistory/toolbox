import { InfTimePrimitive, StatementWithTarget, TimePrimitiveWithCal } from '@kleiolab/lib-sdk-lb4';
import { InfAppellationMock } from './auto-gen/gvDB/InfAppellationMock';
import { InfDimensionMock } from './auto-gen/gvDB/InfDimensionMock';
import { InfLangStringMock } from './auto-gen/gvDB/InfLangStringMock';
import { InfLanguageMock } from './auto-gen/gvDB/InfLanguageMock';
import { InfPlaceMock } from './auto-gen/gvDB/InfPlaceMock';
import { InfResourceMock } from './auto-gen/gvDB/InfResourceMock';
import { InfStatementMock } from './auto-gen/gvDB/InfStatementMock';
import { InfTimePrimitiveMock } from './auto-gen/gvDB/InfTimePrimitiveMock';
import { ProInfoProjRelMock } from './auto-gen/gvDB/ProInfoProjRelMock';
import { WarEntityPreviewMock } from './auto-gen/gvDB/WarEntityPreviewMock';

function infTimePrimToTimePrimWithCal(infTimePrim: InfTimePrimitive): TimePrimitiveWithCal {
  return {
    julianDay: infTimePrim.julian_day,
    duration: infTimePrim.duration,
    calendar: infTimePrim.calendar,
  }
}

const appeTeEnHasAppeVtWithTarget: StatementWithTarget = {
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
const appeTeEnUsedInLanguage: StatementWithTarget = {
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
const person1HasAppeTeEnWithTarget: StatementWithTarget = {
  statement: InfStatementMock.NAME_1_TO_PERSON,
  projRel: ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON,
  ordNum: ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON.ord_num_of_domain,
  isOutgoing: false,
  targetLabel: 'Jack the foo',
  targetClass: InfResourceMock.NAMING_1.fk_class,
  target: {
    entity: { resource: InfResourceMock.NAMING_1, entityPreview: WarEntityPreviewMock.NAMING_1 }
  }
}
const madridsPresenceWasAtPlace: StatementWithTarget = {
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
const journeyHasDuration: StatementWithTarget = {
  statement: InfStatementMock.ACCOUNT_OF_JOURNEY_HAS_DURATION,
  projRel: ProInfoProjRelMock.PROJ_1_STMT_ACCOUNT_OF_JOURNEY_HAS_DURATION,
  ordNum: ProInfoProjRelMock.PROJ_1_STMT_ACCOUNT_OF_JOURNEY_HAS_DURATION.ord_num_of_range,
  isOutgoing: true,
  targetLabel: `${InfDimensionMock.ONE_MONTH.numeric_value} ${WarEntityPreviewMock.TIME_UNIT_ONE_MONTH.entity_label}`,
  targetClass: InfDimensionMock.ONE_MONTH.fk_class,
  target: {
    dimension: { dimension: InfDimensionMock.ONE_MONTH, unitPreview: WarEntityPreviewMock.TIME_UNIT_ONE_MONTH }
  }
}
const manifSingletonHasShortTitleMurderer: StatementWithTarget = {
  statement: InfStatementMock.MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER,
  projRel: ProInfoProjRelMock.PROJ_1_STMT_MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER,
  ordNum: ProInfoProjRelMock.PROJ_1_STMT_MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER.ord_num_of_range,
  isOutgoing: true,
  targetLabel: `${InfLangStringMock.EN_SHORT_TITLE_THE_MURDERER.string} (${InfLanguageMock.ENGLISH.iso6391})`,
  targetClass: InfLangStringMock.EN_SHORT_TITLE_THE_MURDERER.fk_class,
  target: {
    langString: {
      langString: InfLangStringMock.EN_SHORT_TITLE_THE_MURDERER,
      language: InfLanguageMock.ENGLISH
    }
  }
}
const shipVoyageAtSomeTimeWithin: StatementWithTarget = {
  statement: InfStatementMock.SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2,
  projRel: ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2,
  ordNum: ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2.ord_num_of_range,
  isOutgoing: true,
  targetLabel: 'todo', // `Oct 31, 1756`,
  targetClass: InfTimePrimitiveMock.TP_2.fk_class,
  target: {
    timePrimitive: {
      timePrimitive: infTimePrimToTimePrimWithCal(
        InfTimePrimitiveMock.TP_2,
        // ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2.calendar as TimePrimitiveWithCal.CalendarEnum
      ),
      infTimePrimitive: InfTimePrimitiveMock.TP_2
    }
  }
}

const shipVoyageBeginOfBegin: StatementWithTarget = {
  statement: InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5,
  projRel: ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5,
  ordNum: ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5.ord_num_of_range,
  isOutgoing: true,
  targetLabel: 'todo', // `Oct 31, 1756`,
  targetClass: InfTimePrimitiveMock.TP_5.fk_class,
  target: {
    timePrimitive: {
      timePrimitive: infTimePrimToTimePrimWithCal(
        InfTimePrimitiveMock.TP_5,
        // ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5.calendar as TimePrimitiveWithCal.CalendarEnum
      ),
      infTimePrimitive: InfTimePrimitiveMock.TP_5
    }
  }
}
const shipVoyageBeginOfEnd: StatementWithTarget = {
  statement: InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4,
  projRel: ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4,
  ordNum: ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4.ord_num_of_range,
  isOutgoing: true,
  targetLabel: 'todo', // `Oct 31, 1756`,
  targetClass: InfTimePrimitiveMock.TP_4.fk_class,
  target:
  {
    timePrimitive: {
      timePrimitive: infTimePrimToTimePrimWithCal(
        InfTimePrimitiveMock.TP_4,
        // ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4.calendar as TimePrimitiveWithCal.CalendarEnum
      ),
      infTimePrimitive: InfTimePrimitiveMock.TP_4
    }
  }
}
const unionHasPartner: StatementWithTarget = {
  statement: InfStatementMock.UNOIN_1_HAS_PARTNER_1,
  projRel: ProInfoProjRelMock.PROJ_1_STMT_UNOIN_1_HAS_PARTNER_1,
  ordNum: ProInfoProjRelMock.PROJ_1_STMT_UNOIN_1_HAS_PARTNER_1.ord_num_of_range,
  isOutgoing: true,
  targetLabel: WarEntityPreviewMock.PERSON_1.entity_label, // `Oct 31, 1756`,
  targetClass: WarEntityPreviewMock.PERSON_1.fk_class,
  target:
  {
    entity: {
      entityPreview: WarEntityPreviewMock.PERSON_1,
      resource: InfResourceMock.PERSON_1,
    }
  }
}

export const StatementWithTargetMock = {
  appeTeEnHasAppeVtWithTarget,
  appeTeEnUsedInLanguage,
  person1HasAppeTeEnWithTarget,
  madridsPresenceWasAtPlace,
  journeyHasDuration,
  manifSingletonHasShortTitleMurderer,
  shipVoyageAtSomeTimeWithin,
  shipVoyageBeginOfBegin,
  shipVoyageBeginOfEnd,
  unionHasPartner,
}
