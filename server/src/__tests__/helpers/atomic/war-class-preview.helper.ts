import { testdb } from "../testdb";
import {WarClassPreview} from '../../../models';
import {WarClassPreviewRepository} from '../../../repositories';

export function createWarClassPreviewRepo() {
  return new WarClassPreviewRepository(
    testdb,
  )
}

export async function createWarClassPreview(classPreview: WarClassPreview) {
  return createWarClassPreviewRepo().create(classPreview);
}

export async function getWarClassPreview(fkClass: number, fkProject: number) {
  return createWarClassPreviewRepo().find({
    where: {
      and: [
        {fk_project: {eq: fkProject}},
        {fk_class: {eq: fkClass}},
      ]
    }
  });
}
