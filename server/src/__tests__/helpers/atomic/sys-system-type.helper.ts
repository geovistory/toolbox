import { testdb } from "../testdb";
import { SysSystemTypeRepository } from '../../../repositories';

export async function createType(name: string, id: number, definition: string): Promise<void> {
  await testdb.execute("SELECT setval('system.entity_pk_entity_seq', " + (id - 1) + ", true);");
  await new SysSystemTypeRepository(testdb).create({ definition: definition });
}