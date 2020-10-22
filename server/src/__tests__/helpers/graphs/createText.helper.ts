import {createDatChunk} from '../atomic/dat-chunk.helper';
import {createDatDigital} from '../atomic/dat-digital.helper';
import {createInfStatement} from '../atomic/inf-statement.helper';
import {DatChunkMock} from '../data/gvDB/DatChunkMock';
import {DatDigitalMock} from '../data/gvDB/DatDigitalMock';
import {InfStatementMock} from '../data/gvDB/InfStatementMock';

export async function createTextAndAnnotation() {
  await createDatDigital(DatDigitalMock.DIGITAL_TEXT_RODOLF_FOO)
  await createDatChunk(DatChunkMock.RUDOLF)

  const infStmtIsRepro = await createInfStatement(InfStatementMock.DIGITAL_TEXT_IS_REPRO_OF_HABS_EMP)
  const infStmtRefersTo = await createInfStatement(InfStatementMock.CHUNK_RUDOLF_REFERS_TO_RUDOLF)
  const infStmtMentions = await createInfStatement(InfStatementMock.HABS_EMP_EXPR_MENTIONS_RUDOLF)


  return {
    stmts: [infStmtIsRepro, infStmtRefersTo, infStmtMentions]
  }
}
