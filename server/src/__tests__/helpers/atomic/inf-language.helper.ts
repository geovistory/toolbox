import {InfLanguage} from '../../../models';
import {InfLanguageRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntity} from './_sequences.helper';

function createInfLanguageRepo() {
  return new InfLanguageRepository(
    TestDbFactory.datasource
  )
}

export async function createInfLanguage(item: Partial<InfLanguage>) {
  return createInfLanguageRepo().create(await dealWithPkEntity(item, 'information'))
}
