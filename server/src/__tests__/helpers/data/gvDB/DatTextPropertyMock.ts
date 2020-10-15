/* eslint-disable @typescript-eslint/camelcase */
import { DatColumn, DatTextProperty } from '../../../../models';
import { DatColumnMock } from './DatColumnMock';
import { DatNamespaceMock } from './DatNamespaceMock';
import { InfLanguageMock } from './InfLanguageMock';
import { SysSystemTypeMock } from './SysSystemTypeMock';

/**
 * pk_entity prefix: 500
 */
export class DatTextPropertyMock {
  static readonly NAME = new DatTextProperty({
    pk_entity: 5000,
    string: 'Name',
    fk_language: InfLanguageMock.ENGLISH.pk_entity,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_system_type: SysSystemTypeMock.LABEL_OF_DATA_RECORD.pk_entity,
    fk_entity: DatColumnMock.COL_NAMES.pk_entity
  })

  static readonly BIRTHDATE = new DatTextProperty({
    pk_entity: 5001,
    string: 'Birthdate',
    fk_language: InfLanguageMock.ENGLISH.pk_entity,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_system_type: SysSystemTypeMock.LABEL_OF_DATA_RECORD.pk_entity,
    fk_entity: DatColumnMock.COL_DATES.pk_entity
  })

  static readonly RND1 = new DatTextProperty({
    pk_entity: 5002,
    string: 'Random col 1 - string',
    fk_language: InfLanguageMock.ENGLISH.pk_entity,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_system_type: SysSystemTypeMock.LABEL_OF_DATA_RECORD.pk_entity,
    fk_entity: DatColumnMock.COL_RND1.pk_entity
  })

  static readonly RND2 = new DatTextProperty({
    pk_entity: 5003,
    string: 'Random col 1 - number',
    fk_language: InfLanguageMock.ENGLISH.pk_entity,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_system_type: SysSystemTypeMock.LABEL_OF_DATA_RECORD.pk_entity,
    fk_entity: DatColumnMock.COL_RND2.pk_entity
  })
}
