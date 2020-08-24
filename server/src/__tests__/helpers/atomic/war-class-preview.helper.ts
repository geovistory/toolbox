import {testdb} from '../../../datasources/testdb.datasource';
import {WarClassPreview} from '../../../models';
import {WarClassPreviewRepository} from '../../../repositories';

function createWarClassPreviewRepo() {
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
