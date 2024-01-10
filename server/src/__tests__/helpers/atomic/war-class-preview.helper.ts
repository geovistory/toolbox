import {WarClassPreview} from '../../../models';
import {WarClassPreviewRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';

export function createWarClassPreviewRepo() {
  return new WarClassPreviewRepository(
    TestDbFactory.datasource,
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
