import {testdb} from "../testdb";
import {InfAppellation} from '../../../models';
import {InfAppellationRepository, InfStatementRepository, ProInfoProjRelRepository} from '../../../repositories';
import {dealWithPkEntity} from './_sequences.helper';
import {clone} from 'ramda';
import {OmitEntity} from '../data/gvDB/local-model.helpers';

function createInfAppellationRepo() {
  let infStatementRepo: InfStatementRepository;
  let proInfoProjRelRepo: ProInfoProjRelRepository;
  return new InfAppellationRepository(
    testdb,
    async () => infStatementRepo,
    async () => proInfoProjRelRepo,
  )
}

export async function createInfAppellation(item: OmitEntity<InfAppellation>) {
  const i = clone(item);
  // make sure only quill_doc or string is provided.
  if (item.quill_doc && item.string) {
    i.quill_doc = undefined;
  }
  return createInfAppellationRepo().create(await dealWithPkEntity(i, 'information'));
}
