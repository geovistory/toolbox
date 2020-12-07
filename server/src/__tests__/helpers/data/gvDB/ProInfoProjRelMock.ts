/* eslint-disable @typescript-eslint/camelcase */
import {ProInfoProjRel} from '../../../../models';
import {InfPersistentItemMock} from './InfPersistentItemMock';
import {InfStatementMock} from './InfStatementMock';
import {InfTemporalEntityMock} from './InfTemporalEntityMock';
import {ProProjectMock} from './ProProjectMock';
import {PubAccountMock} from './PubAccountMock';

/**
 * pk_entity prefixed with 200
 */

export class ProInfoProjRelMock {
  static readonly PROJ_1_PERSON_1 = new ProInfoProjRel({
    pk_entity: 2001,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfPersistentItemMock.PERSON_1.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_NAMING_1 = new ProInfoProjRel({
    pk_entity: 2002,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfTemporalEntityMock.NAMING_1.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_STMT_NAME_1_TO_APPE = new ProInfoProjRel({
    pk_entity: 2003,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.NAME_1_TO_APPE.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_STMT_NAME_1_TO_PERSON = new ProInfoProjRel({
    pk_entity: 2004,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.NAME_1_TO_PERSON.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_MADRID = new ProInfoProjRel({
    pk_entity: 2005,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfPersistentItemMock.GEO_PLACE_MADRID.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_CITY_TYPE = new ProInfoProjRel({
    pk_entity: 2006,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfPersistentItemMock.GEO_PLACE_TYPE_CITY.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_NAMING_CITY = new ProInfoProjRel({
    pk_entity: 2007,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfTemporalEntityMock.NAMING_1_CITY.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_STMT_MADRID_HAS_GEO_PLACE_CITY_TYPE = new ProInfoProjRel({
    pk_entity: 2008,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.MADRID_HAS_GEO_PLACE_TYPE_CITY.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_STMT_NAMING_CITY_TO_APPE_CITY = new ProInfoProjRel({
    pk_entity: 2009,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.NAMING_CITY_TO_APPE_CITY.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_STMT_NAMING_CITY_TO_GEO_PLACE_TYPE = new ProInfoProjRel({
    pk_entity: 2010,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.NAMING_CITY_TO_GEO_PLACE_TYPE.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_SHIP_VOYAGE = new ProInfoProjRel({
    pk_entity: 2011,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_STMT_SHIP_VOYAGE_ONGOING_THROUGHOUT_TP_1 = new ProInfoProjRel({
    pk_entity: 2012,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.SHIP_VOYAGE_ONGOING_THROUGHOUT_TP_1.pk_entity,
    calendar: 'gregorian', // or 'julian'
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_STMT_SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2 = new ProInfoProjRel({
    pk_entity: 2013,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2.pk_entity,
    calendar: 'gregorian', // or 'julian'
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_STMT_SHIP_VOYAGE_END_OF_THE_BEGIN_TP_3 = new ProInfoProjRel({
    pk_entity: 2014,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.SHIP_VOYAGE_END_OF_THE_BEGIN_TP_3.pk_entity,
    calendar: 'gregorian', // or 'julian'
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4 = new ProInfoProjRel({
    pk_entity: 2015,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4.pk_entity,
    calendar: 'gregorian', // or 'julian'
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5 = new ProInfoProjRel({
    pk_entity: 2016,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5.pk_entity,
    calendar: 'julian', // or 'gregorian'
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_STMT_SHIP_VOYAGE_END_OF_THE_END_TP_6 = new ProInfoProjRel({
    pk_entity: 2017,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.SHIP_VOYAGE_END_OF_THE_END_TP_6.pk_entity,
    calendar: 'julian', // or 'gregorian'
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_STMT_BIRTH_1_BROUGHT_INTO_LIFE_PERON_1 = new ProInfoProjRel({
    pk_entity: 2018,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.BIRTH_1_BROUGHT_INTO_LIFE_PERSON_1.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })
  static readonly PROJ_1_STMT_BIRTH_1_STEMS_FROM_UNION_1 = new ProInfoProjRel({
    pk_entity: 2019,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.BIRTH_1_STEMS_FROM_UNION_1.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_BIRTH = new ProInfoProjRel({
    pk_entity: 2020,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfTemporalEntityMock.BIRTH_1.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_UNION_1 = new ProInfoProjRel({
    pk_entity: 2021,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfTemporalEntityMock.UNION_1.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_STMT_UNOIN_1_HAS_PARTNER_1 = new ProInfoProjRel({
    pk_entity: 2022,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.UNOIN_1_HAS_PARTNER_1.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true,
    ord_num_of_range: 2
  })

  static readonly SANDBOX_ALBERT_IV = new ProInfoProjRel({
    pk_entity: 2023,
    fk_project: ProProjectMock.SANDBOX_PROJECT.pk_entity,
    fk_entity: InfPersistentItemMock.ALBERT_IV.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly SANDBOX_ALBERT_IV_NAMING = new ProInfoProjRel({
    pk_entity: 2024,
    fk_project: ProProjectMock.SANDBOX_PROJECT.pk_entity,
    fk_entity: InfStatementMock.NAMING_ALBERT_TO_PEIT_ALBERT.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly SANDBOX_RUDOLF = new ProInfoProjRel({
    pk_entity: 2025,
    fk_project: ProProjectMock.SANDBOX_PROJECT.pk_entity,
    fk_entity: InfPersistentItemMock.RUDOLF.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly SANDBOX_RUDOLF_NAMING = new ProInfoProjRel({
    pk_entity: 2026,
    fk_project: ProProjectMock.SANDBOX_PROJECT.pk_entity,
    fk_entity: InfStatementMock.NAMING_RUDOLF_TO_PEIT_RUDOLF.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_STMT_UNOIN_1_HAS_PARTNER_2 = new ProInfoProjRel({
    pk_entity: 2027,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.UNOIN_1_HAS_PARTNER_2.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true,
    ord_num_of_range: 1
  })

  static readonly PROJ_1_ALBERT_IV = new ProInfoProjRel({
    pk_entity: 2028,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfPersistentItemMock.ALBERT_IV.pk_entity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })
}
