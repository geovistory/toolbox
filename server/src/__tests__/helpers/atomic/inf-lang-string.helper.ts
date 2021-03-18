import { InfLangString } from '../../../models';
import { InfLangStringRepository, InfStatementRepository, InfLanguageRepository } from '../../../repositories';
import { testdb } from "../testdb";
import { dealWithPkEntity } from './_sequences.helper';

function createInfLangStringRepo() {
    let infStatementRepo: InfStatementRepository;
    let infLanguageRepository: InfLanguageRepository;
    return new InfLangStringRepository(testdb,
        async () => infStatementRepo,
        async () => infLanguageRepository
    )
}

export async function createInfLangString(item: Partial<InfLangString>) {
    return createInfLangStringRepo().create(await dealWithPkEntity(item, 'information'));
}
