/* eslint-disable @typescript-eslint/camelcase */
import {DatNamespace} from '../../../models';
import {DatNamespaceRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntity} from './_sequences.helper';

function createDatNamespaceRepo() {
  return new DatNamespaceRepository(TestDbFactory.datasource)
}

export async function createDatNamespace(item: Partial<DatNamespace>) {
  return createDatNamespaceRepo().create(await dealWithPkEntity(item, 'data'));
}

export async function updateDatNamespace(id: number, item: Partial<DatNamespace>) {
  return createDatNamespaceRepo().updateById(id, item);
}

export async function deleteDatNamespace(id: number) {
  return createDatNamespaceRepo().deleteById(id);
}
