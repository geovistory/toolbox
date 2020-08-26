/* eslint-disable @typescript-eslint/camelcase */
import {ProProject} from '../../../../models';
import {InfLanguageMock} from './InfLanguageMock';
import {PK_DEFAULT_CONFIG_PROJECT} from '../../../../warehouse/Warehouse';

/**
 * pk_entity prefix: 300
 */
export class ProProjectMock {

  static readonly DEFAULT_PROJECT = new ProProject({
    pk_entity: PK_DEFAULT_CONFIG_PROJECT,
    fk_language: InfLanguageMock.GERMAN.pk_entity
  })

  static readonly PROJECT_1 = new ProProject({
    pk_entity: 3001,
    fk_language: InfLanguageMock.GERMAN.pk_entity
  })

}
