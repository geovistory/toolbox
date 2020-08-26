/* eslint-disable @typescript-eslint/camelcase */
import {ProDfhProfileProjRel} from '../../../../models';
import {ProProjectMock} from './ProProjectMock';

/**
 * pk_entity prefixed with 100
 */

export class ProDfhProfileProjRelMock {
  static readonly PROJ_1_PROFILE_4 = new ProDfhProfileProjRel({
    pk_entity: 1001,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_profile: 4,
    enabled: true
  })

}
