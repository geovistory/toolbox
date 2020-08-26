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

}
