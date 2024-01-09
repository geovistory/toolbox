import {clone} from 'ramda';
import {InfAppellation} from '../../../models';
import {InfAppellationRepository, InfStatementRepository, ProInfoProjRelRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {OmitEntity} from '../data/gvDB/local-model.helpers';
import {dealWithPkEntity} from './_sequences.helper';

function createInfAppellationRepo() {
  let infStatementRepo: InfStatementRepository;
  let proInfoProjRelRepo: ProInfoProjRelRepository;
  return new InfAppellationRepository(
    TestDbFactory.datasource,
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
