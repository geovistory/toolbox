/* eslint-disable @typescript-eslint/camelcase */

import { DatChunk } from '@kleiolab/lib-sdk-lb4';
import { DatNamespaceMock } from './DatNamespaceMock';
import { DatDigitalMock } from './DatDigitalMock';

/**
 * pk_entity prefix: 600
 */
export class DatChunkMock {
  static readonly RUDOLF: Partial<DatChunk> = ({
    pk_entity: 6001,
    fk_entity_version: 1,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_text: DatDigitalMock.DIGITAL_TEXT_RODOLF_FOO.pk_text,
    quill_doc: { "ops": [{ "insert": "R", "attributes": { "charid": "1" } }, { "insert": "u", "attributes": { "charid": "2" } }, { "insert": "d", "attributes": { "charid": "3" } }, { "insert": "o", "attributes": { "charid": "4" } }, { "insert": "l", "attributes": { "charid": "5" } }, { "insert": "f", "attributes": { "charid": "6" } },], "latestId": 12 },
  })

}
