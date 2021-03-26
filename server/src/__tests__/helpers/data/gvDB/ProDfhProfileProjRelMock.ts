/* eslint-disable @typescript-eslint/camelcase */
import { ProDfhProfileProjRel } from '../../../../models';
import { OmitEntity } from './local-model.helpers';
import { ProProjectMock } from './ProProjectMock';

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
    pk_entity: 1002,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_profile: 12,
    enabled: true
  })
  static readonly PROJ_1_PROFILE_21: OmitEntity<ProDfhProfileProjRel> = ({
    pk_entity: 1003,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_profile: 21,
    enabled: true
  })

}
