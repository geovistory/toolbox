import { InfLanguage } from '../../../models';
import { InfLanguageRepository } from '../../../repositories';
import { testdb } from "../testdb";
import { dealWithPkEntity } from './_sequences.helper';

function createInfLanguageRepo() {
  return new InfLanguageRepository(
    testdb
  )
}

export async function createInfLanguage(item: Partial<InfLanguage>) {
  return createInfLanguageRepo().create(await dealWithPkEntity(item, 'information'))
}
