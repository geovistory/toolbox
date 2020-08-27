/* eslint-disable @typescript-eslint/camelcase */
import {ProInfoProjRel} from '../../../../models';
import {InfPersistentItemMock} from './InfPersistentItemMock';
import {InfStatementMock} from './InfStatementMock';
import {InfTemporalEntityMock} from './InfTemporalEntityMock';
import {ProProjectMock} from './ProProjectMock';
import {PubAccountMock} from './PubAccountMock';
import {InfTimePrimitiveMock} from './InfTimePrimitiveMock';

/**
 * pk_entity prefixed with 200
 */

export class ProInfoProjRelMock {
  static readonly PROJ_1_PERSON_1 = new ProInfoProjRel({
    pk_entity: 2001,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfPersistentItemMock.PERSON_1.pk_entity,
    fk_last_modifier:PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_NAMING_1 = new ProInfoProjRel({
    pk_entity: 2002,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfTemporalEntityMock.NAMING_1.pk_entity,
    fk_last_modifier:PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_STMT_NAME_1_TO_APPE = new ProInfoProjRel({
    pk_entity: 2003,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.NAME_1_TO_APPE.pk_entity,
    fk_last_modifier:PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_STMT_NAME_1_TO_PERSON = new ProInfoProjRel({
    pk_entity: 2004,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.NAME_1_TO_PERSON.pk_entity,
    fk_last_modifier:PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_MADRID = new ProInfoProjRel({
    pk_entity: 2005,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfPersistentItemMock.GEO_PLACE_MADRID.pk_entity,
    fk_last_modifier:PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_CITY_TYPE = new ProInfoProjRel({
    pk_entity: 2006,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfPersistentItemMock.GEO_PLACE_TYPE_CITY.pk_entity,
    fk_last_modifier:PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_NAMING_CITY = new ProInfoProjRel({
    pk_entity: 2007,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfTemporalEntityMock.NAMING_CITY.pk_entity,
    fk_last_modifier:PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_STMT_MADRID_HAS_GEO_PLACE_CITY_TYPE = new ProInfoProjRel({
    pk_entity: 2008,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.MADRID_HAS_GEO_PLACE_TYPE_CITY.pk_entity,
    fk_last_modifier:PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_STMT_NAMING_CITY_TO_APPE_CITY = new ProInfoProjRel({
    pk_entity: 2009,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.NAMING_CITY_TO_APPE_CITY.pk_entity,
    fk_last_modifier:PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_STMT_NAMING_CITY_TO_GEO_PLACE_TYPE = new ProInfoProjRel({
    pk_entity: 2010,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.NAMING_CITY_TO_GEO_PLACE_TYPE.pk_entity,
    fk_last_modifier:PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_SHIP_VOYAGE = new ProInfoProjRel({
    pk_entity: 2011,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfTemporalEntityMock.SHIP_VOYAGE.pk_entity,
    fk_last_modifier:PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

  static readonly PROJ_1_STMT_SHIP_VOYAGE_ONGOING_THROUGHOUT_TP_1 = new ProInfoProjRel({
    pk_entity: 2012,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: InfStatementMock.SHIP_VOYAGE_ONGOING_THROUGHOUT_TP_1.pk_entity,
    calendar: 'gregorian', // or 'julian'
    fk_last_modifier:PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })

}
