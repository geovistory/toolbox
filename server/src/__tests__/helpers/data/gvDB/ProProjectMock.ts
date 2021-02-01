/* eslint-disable @typescript-eslint/camelcase */
import {ProProject} from '../../../../models';
import {PK_DEFAULT_CONFIG_PROJECT, OmitEntity} from './local-model.helpers';
import {InfLanguageMock} from './InfLanguageMock';

/**
 * pk_entity prefix: 300
 */
export class ProProjectMock {

  static readonly DEFAULT_PROJECT: OmitEntity<ProProject> = ({
    pk_entity: PK_DEFAULT_CONFIG_PROJECT,
    fk_language: InfLanguageMock.GERMAN.pk_entity
  })

  static readonly PROJECT_1: OmitEntity<ProProject> = ({
    pk_entity: 3001,
    fk_language: InfLanguageMock.GERMAN.pk_entity
  })

  static readonly PROJECT_2: OmitEntity<ProProject> = ({
    pk_entity: 3002,
    fk_language: InfLanguageMock.ENGLISH.pk_entity
  })

  static readonly PROJECT_3: OmitEntity<ProProject> = ({
    pk_entity: 3003,
    fk_language: InfLanguageMock.ENGLISH.pk_entity
  })

  static readonly SANDBOX_PROJECT: OmitEntity<ProProject> = ({
    pk_entity: 375232,
    fk_language: InfLanguageMock.ENGLISH.pk_entity
  })

}
