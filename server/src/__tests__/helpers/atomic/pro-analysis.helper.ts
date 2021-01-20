import {ProAnalysis} from '../../../models';
import {ProAnalysisRepository} from '../../../repositories';
import {testdb} from "../testdb";
import {dealWithPkEntity} from './_sequences.helper';

export function createProAnalysisRepo() {
    return new ProAnalysisRepository(testdb)
}

export async function createProAnalysis(item: Partial<ProAnalysis>) {
    return createProAnalysisRepo().create(await dealWithPkEntity(item, 'projects'))
}

export async function updateProAnalysis(id: number, item: Partial<ProAnalysis>) {
    return createProAnalysisRepo().updateById(id, item);
  }

  export async function deleteProAnalysis(id: number) {
    return createProAnalysisRepo().deleteById(id);
  }
