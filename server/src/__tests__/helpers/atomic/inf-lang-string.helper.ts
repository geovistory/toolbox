import {InfLangString} from '../../../models';
import {InfLangStringRepository, InfLanguageRepository, InfStatementRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntity} from './_sequences.helper';

function createInfLangStringRepo() {
  let infStatementRepo: InfStatementRepository;
  let infLanguageRepo: InfLanguageRepository;
  return new InfLangStringRepository(
    TestDbFactory.datasource,
    async () => infStatementRepo,
    async () => infLanguageRepo,
  )

}

export async function createInfLangString(item: Partial<InfLangString>) {
  return createInfLangStringRepo().create(await dealWithPkEntity(item, 'information'));
}

export async function updateInfLangString(id: number, item: Partial<InfLangString>) {
  return createInfLangStringRepo().updateById(id, item);
}

export async function deleteInfLangString(id: number) {
  return createInfLangStringRepo().deleteById(id);
}
