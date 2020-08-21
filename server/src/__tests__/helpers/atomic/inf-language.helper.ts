/* eslint-disable @typescript-eslint/camelcase */
import {testdb} from '../../../datasources/testdb.datasource';
import {InfLanguage} from '../../../models';
import {InfLanguageRepository} from '../../../repositories';
import {dealWithPkEntity} from './_sequences.helper';

function createInfLanguageRepo() {
  return new InfLanguageRepository(
    testdb
  )
}

let initialized = false;

const languages = [
  {name: "German", id: 18605, code: 'ger'},
  {name: "English", id: 18889, code: 'eng'},
  {name: "French", id: 19008, code: 'fra'},
  {name: "Italian", id: 19703, code: 'ita'}
]

export namespace AtmLanguages {
  export const GERMAN = {name: "German", id: 18605, code: 'ger'}
  export const ENGLISH = {name: "English", id: 18889, code: 'eng'}
  export const FRENCH = {name: "French", id: 19008, code: 'fra'}
  export const ITALIAN = {name: "Italian", id: 19703, code: 'ita'}
}


export function resetLanguageInitialization() {
  initialized = false;
}

export async function createLanguages() {
  if (initialized) return;

  for (const lang of languages) {
    await testdb.execute("SELECT setval('information.entity_pk_entity_seq', " + (lang.id - 1) + ", true);");
    await createInfLanguageRepo().create({pk_language: lang.code, notes: lang.name});
  }
  initialized = true;
}

export async function getLanguage(name: string): Promise<InfLanguage> {
  await createLanguages();
  if (languages.filter(l => l.name === name).length === 0) throw new Error('This language is not set in the tests yet')

  // begin
  // this is a workaround of line 35. For some reason that I (gmu) do not understand at that very moment there is nothing in the db. Can be tested with line 30
  //console.log('SQL result:', JSON.stringify(await testdb.execute("SELECT * FROM information.language where notes='English'")));
  const target = languages.filter(l => l.name === name)[0];
  return new InfLanguage({pk_language: target.code, pk_entity: target.id, notes: target.name});
  // end

  //replacement of
  // return (await new InfLanguageRepository(testdb).findOne({where: {notes: name}})) as InfLanguage;
}

export async function createInfLanguage(item: Partial<InfLanguage>) {
  return createInfLanguageRepo().create(await dealWithPkEntity(item, 'information'))
}
