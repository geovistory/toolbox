import {testdb} from '../../../datasources/testdb.datasource';
import {ProProject} from '../../../models';
import {DatNamespaceRepository} from '../../../repositories';

export async function createNamespace(project: ProProject) {
  return new DatNamespaceRepository(testdb)
    .create({fk_project: project.pk_entity, standard_label: 'Default Namespace'});
}
