import {InfLangString} from '../../../models';
import {InfLangStringRepository, InfLanguageRepository, InfStatementRepository} from '../../../repositories';
import {testdb} from "../testdb";
import {dealWithPkEntity} from './_sequences.helper';

function createInfLangStringRepo() {
  let infStatementRepo: InfStatementRepository;
  let infLanguageRepo: InfLanguageRepository;
  return new InfLangStringRepository(
    testdb,
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
