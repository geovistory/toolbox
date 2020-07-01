import {DefaultCrudRepository} from '@loopback/repository';
import {ProProject, ProProjectRelations} from '../models';
import {Postgres1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProProjectRepository extends DefaultCrudRepository<
  ProProject,
  typeof ProProject.prototype.pk_entity,
  ProProjectRelations
> {
  constructor(
    @inject('datasources.postgres1') dataSource: Postgres1DataSource,
  ) {
    super(ProProject, dataSource);
  }
}
