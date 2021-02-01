/* eslint-disable @typescript-eslint/camelcase */
import {ProDfhProfileProjRel} from '../../../../models';
import {ProProjectMock} from './ProProjectMock';
import {OmitEntity} from './local-model.helpers';

/**
 * pk_entity prefixed with 100
 */

export class ProDfhProfileProjRelMock {
  static readonly PROJ_1_PROFILE_4: OmitEntity<ProDfhProfileProjRel> = ({
    pk_entity: 1001,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_profile: 4,
    enabled: true
  })

  static readonly PROJ_1_PROFILE_12: OmitEntity<ProDfhProfileProjRel> = ({
    pk_entity: 1001,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_profile: 12,
    enabled: true
  })

}
