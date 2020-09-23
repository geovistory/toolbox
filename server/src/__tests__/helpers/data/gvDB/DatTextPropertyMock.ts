/* eslint-disable @typescript-eslint/camelcase */
import {DatTextProperty} from '../../../../models';
import {InfLanguageMock} from './InfLanguageMock';
import {DatNamespaceMock} from './DatNamespaceMock';

/**
 * pk_entity prefix: 500
 */
export class DatTextPropertyMock {
  static readonly NAME = new DatTextProperty({
    pk_entity: 5000,
    string: 'Name',
    fk_language: InfLanguageMock.ENGLISH.pk_entity,
    fk_namespace: DatNamespaceMock.NAMESPACE_2.pk_entity
  })

  static readonly BIRTHDATE = new DatTextProperty({
    pk_entity: 5001,
    string: 'Birthdate',
    fk_language: InfLanguageMock.ENGLISH.pk_entity,
    fk_namespace: DatNamespaceMock.NAMESPACE_2.pk_entity
  })
}
